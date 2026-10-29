import { Resend } from "resend";
import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { apiErrorResponse } from "@/lib/api/error-response";
import {
  readContactRequestContext,
  validateContactInput,
} from "@/lib/contact/submission";
import { referralCookie, verifyReferralToken } from "@/lib/referrals/token";
import { rateLimit } from "@/lib/api/rate-limit";
import { siteConfig } from "@/lib/site/config";
import {
  configuredTwenty,
  twentyErrorContext,
} from "@/lib/integrations/twenty";
import { verifyTurnstile } from "@/lib/contact/turnstile";

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

  const apiKey = process.env.RESEND_API_KEY;
  const twenty = configuredTwenty();
  if (!apiKey || !twenty) {
    const missing = [
      "RESEND_API_KEY",
      "TWENTY_BASE_URL",
      "TWENTY_API_KEY",
    ].filter((name) => !process.env[name]?.trim());
    return apiErrorResponse({
      body: { ok: false, message: "notConfigured" },
      status: 503,
      code: "delivery_not_configured",
      endpoint,
      message: "Contact delivery is not configured",
      context: { missingEnvironmentVariables: missing },
    });
  }

  const token = (await cookies()).get(referralCookie)?.value;
  let referrer;
  if (token) {
    const secret = process.env.TWENTY_REFERRAL_SECRET;
    if (!secret)
      return apiErrorResponse({
        body: { ok: false, message: "notConfigured" },
        status: 503,
        code: "referral_not_configured",
        endpoint,
        message: "Contact referral attribution is not configured",
      });
    const referrerId = verifyReferralToken(token, secret);
    if (!referrerId)
      return apiErrorResponse({
        body: { ok: false, message: "invalidReferral" },
        status: 400,
        code: "invalid_referral",
        endpoint,
        message: "Contact referral token is invalid",
      });
    try {
      referrer = await twenty.findPersonById(referrerId);
    } catch (error) {
      return apiErrorResponse({
        body: { ok: false, message: "sendFailed" },
        status: 502,
        code: "referrer_lookup_failed",
        endpoint,
        message: "Twenty referrer lookup failed",
        error,
        context: twentyErrorContext(error),
      });
    }
    if (!referrer?.emails?.primaryEmail)
      return apiErrorResponse({
        body: { ok: false, message: "invalidReferral" },
        status: 400,
        code: "referrer_not_found",
        endpoint,
        message: "Contact referrer was not found",
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
  try {
    await twenty.saveContact(input, submissionId, referrer, requestContext);
  } catch (error) {
    return apiErrorResponse({
      body: { ok: false, message: "sendFailed" },
      status: 502,
      code: "contact_persistence_failed",
      endpoint,
      message: "Twenty contact persistence failed",
      error,
      context: twentyErrorContext(error),
    });
  }

  const entries = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone],
    ["Request type", requestContext.type],
    ["Requested service", requestContext.subject],
    ["Source page", requestContext.sourcePath],
    ["Referrer's email", referrer?.emails?.primaryEmail ?? ""],
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

  try {
    const resend = new Resend(apiKey);
    const subjectName = input.name.replaceAll(/[\r\n]+/g, " ");
    const { error } = await resend.emails.send(
      {
        from: process.env.RESEND_FROM_EMAIL ?? defaultFrom,
        to: [process.env.RESEND_TO_EMAIL ?? siteConfig.contact.email],
        replyTo: input.email,
        subject: `New website contact: ${subjectName}`,
        text,
        html,
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
