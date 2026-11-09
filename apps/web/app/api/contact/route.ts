import { Resend } from "resend";
import { randomUUID } from "node:crypto";
import { apiErrorResponse } from "@/lib/api/error-response";
import {
  readContactLocale,
  readContactRequestContext,
  validateContactInput,
} from "@/lib/contact/submission";
import { buildContactConfirmation } from "@/lib/contact/confirmation-email";
import { readReferralToken } from "@/lib/referrals/token";
import { resolveContactReferral } from "@/lib/referrals/contact-attribution";
import { rateLimit } from "@/lib/api/rate-limit";
import { siteConfig } from "@/lib/site/config";
import {
  configuredTwenty,
  twentyErrorContext,
  twentyErrorTags,
} from "@/lib/integrations/twenty";
import { resendTemplate } from "@/lib/integrations/resend-templates";
import { verifyTurnstile } from "@/lib/contact/turnstile";
import { sentryLogger } from "@/lib/observability/sentry-logger";

const defaultFrom = "Jakub Vantuch <onboarding@resend.dev>";
const endpoint = "contact";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const limited = rateLimit(request, endpoint, {
    limit: 10,
    windowMs: 10 * 60 * 1_000,
  });
  if (limited) return limited;

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 16_000) {
      return apiErrorResponse({
        body: { ok: false, message: "tooLarge" },
        status: 413,
        code: "too_large",
        endpoint,
        message: "Contact request body is too large",
      });
    }
    body = JSON.parse(raw);
  } catch {
    return apiErrorResponse({
      body: { ok: false, message: "invalidBody" },
      status: 400,
      code: "invalid_body",
      endpoint,
      message: "Contact request body is invalid",
    });
  }

  if (body && typeof body === "object" && "fax" in body && body.fax) {
    return Response.json({ ok: true });
  }

  const { input, errors } = validateContactInput(body);
  const locale = readContactLocale(body);
  const requestContext = readContactRequestContext(body);
  if (Object.keys(errors).length > 0) {
    return apiErrorResponse({
      body: { ok: false, formErrors: errors },
      status: 400,
      code: "validation_failed",
      endpoint,
      message: "Contact request validation failed",
      context: { invalidFields: Object.keys(errors) },
    });
  }

  const turnstile = await verifyTurnstile(
    body && typeof body === "object" && "turnstileToken" in body
      ? body.turnstileToken
      : undefined,
    "contact",
  );
  if (!turnstile.ok) {
    const notConfigured = turnstile.reason === "notConfigured";
    return apiErrorResponse({
      body: {
        ok: false,
        message: notConfigured ? "notConfigured" : "turnstileFailed",
      },
      status: notConfigured ? 503 : 400,
      code: notConfigured ? "turnstile_not_configured" : "turnstile_failed",
      endpoint,
      message: "Contact Turnstile verification failed",
      reported: true,
    });
  }

  // Resend is the required delivery channel. Twenty is best effort: when it
  // is missing or failing, the lead still reaches the owner by email.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return apiErrorResponse({
      body: { ok: false, message: "notConfigured" },
      status: 503,
      code: "delivery_not_configured",
      endpoint,
      message: "Contact delivery is not configured",
      context: { missingEnvironmentVariables: ["RESEND_API_KEY"] },
    });
  }

  const twenty = configuredTwenty();
  if (!twenty) {
    sentryLogger({
      type: "warning",
      message: "Twenty is not configured; contact is delivered by email only",
      context: {
        endpoint,
        missingEnvironmentVariables: [
          "TWENTY_BASE_URL",
          "TWENTY_API_KEY",
          "TWENTY_CF_ACCESS_CLIENT_ID",
          "TWENTY_CF_ACCESS_CLIENT_SECRET",
        ].filter((name) => !process.env[name]?.trim()),
      },
      tags: { endpoint, operation: "contact-crm" },
      fingerprint: ["contact", "crm-not-configured"],
    });
  }

  const token = readReferralToken(body);
  const referral = twenty
    ? await resolveContactReferral({
        token,
        secret: process.env.TWENTY_REFERRAL_SECRET,
        findPersonById: (id) => twenty.findPersonById(id),
      })
    : {};
  const referrer = referral.referrer;
  if (referral.issue) {
    sentryLogger({
      type: referral.issue === "lookupFailed" ? "error" : "warning",
      error: referral.error,
      message: "Contact referral attribution skipped",
      context: {
        endpoint,
        reason: referral.issue,
        ...twentyErrorContext(referral.error),
      },
      tags: { endpoint, ...twentyErrorTags(referral.error) },
      fingerprint: ["contact", "referral-attribution", referral.issue],
    });
  }

  const requestedId =
    body && typeof body === "object" && "submissionId" in body
      ? body.submissionId
      : undefined;
  const submissionId =
    typeof requestedId === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      requestedId,
    )
      ? requestedId
      : randomUUID();
  let savedToCrm = false;
  if (twenty) {
    try {
      await twenty.saveContact(input, submissionId, referrer, requestContext);
      savedToCrm = true;
    } catch (error) {
      // A CRM outage must not block the enquiry; it is still emailed below.
      sentryLogger({
        type: "error",
        error,
        message: "Twenty contact persistence failed; delivering by email only",
        context: { endpoint, ...twentyErrorContext(error) },
        tags: {
          endpoint,
          operation: "contact-crm",
          ...twentyErrorTags(error),
        },
        fingerprint: ["contact", "crm-persistence"],
      });
    }
  }

  const entries = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone],
    ["Request type", requestContext.type],
    ["Requested service", requestContext.subject],
    ["Source page", requestContext.sourcePath],
    ["Referrer's email", referrer?.emails?.primaryEmail ?? ""],
    ["CRM", savedToCrm ? "" : "Not saved to Twenty – add the lead manually"],
    ["Message", input.message],
  ] as const;
  const text = entries
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
  const html = `<h1>New website contact</h1><dl>${entries
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value).replaceAll("\n", "<br />")}</dd>`,
    )
    .join("")}</dl>`;

  const template = resendTemplate("contactNotification", {
    NAME: input.name,
    SENDER_EMAIL: input.email,
    PHONE: input.phone,
    REQUEST_TYPE: requestContext.type ?? "",
    REQUESTED_SERVICE: requestContext.subject ?? "",
    SOURCE_PAGE: requestContext.sourcePath ?? "",
    REFERRER_EMAIL: referrer?.emails?.primaryEmail ?? "",
    MESSAGE: input.message,
  });

  try {
    const resend = new Resend(apiKey);
    const subjectName = input.name.replaceAll(/[\r\n]+/g, " ");
    const subjectPrefix = savedToCrm ? "" : "[Not in CRM] ";
    const { error } = await resend.emails.send(
      {
        from: process.env.RESEND_FROM_EMAIL ?? defaultFrom,
        to: [process.env.RESEND_TO_EMAIL ?? siteConfig.contact.email],
        replyTo: input.email,
        subject: `${subjectPrefix}New website contact: ${subjectName}`,
        // The Resend template cannot show the CRM state, so a lead missing
        // from Twenty uses the inline body that lists it.
        ...(template && savedToCrm ? { template } : { text, html }),
      },
      { idempotencyKey: `web-contact/${submissionId}` },
    );
    if (error) {
      return apiErrorResponse({
        body: { ok: false, message: "sendFailed" },
        status: 502,
        code: "email_delivery_failed",
        endpoint,
        message: "Contact email delivery failed",
        error: new Error("Resend rejected contact email delivery"),
      });
    }

    const confirmation = buildContactConfirmation(
      locale,
      input.name,
      input.message,
    );
    const confirmationTemplate = resendTemplate(
      locale === "cs" ? "contactConfirmationCs" : "contactConfirmationEn",
      { NAME: input.name, MESSAGE: input.message },
    );
    try {
      const result = await resend.emails.send(
        {
          from: process.env.RESEND_FROM_EMAIL ?? defaultFrom,
          to: [input.email],
          replyTo: siteConfig.contact.email,
          ...(confirmationTemplate
            ? { subject: confirmation.subject, template: confirmationTemplate }
            : confirmation),
        },
        { idempotencyKey: `web-contact-confirmation/${submissionId}` },
      );
      if (result.error) throw new Error("Resend rejected contact confirmation");
    } catch {
      // The owner was notified (and the enquiry saved when Twenty is up). A retry would
      // duplicate the submission, so report the confirmation failure only.
      sentryLogger({
        type: "warning",
        message: "Contact confirmation email delivery failed",
        context: { endpoint },
        tags: { endpoint, operation: "contact-confirmation" },
        fingerprint: ["contact", "confirmation-delivery"],
      });
    }
  } catch (error) {
    return apiErrorResponse({
      body: { ok: false, message: "sendFailed" },
      status: 502,
      code: "email_delivery_failed",
      endpoint,
      message: "Contact email delivery failed",
      error,
    });
  }

  return Response.json({ ok: true });
}
