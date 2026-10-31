import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { apiErrorResponse } from "@/lib/api/error-response";
import { localizedPath } from "@/lib/site/content";
import { createReferralToken } from "@/lib/referrals/token";
import { rateLimit } from "@/lib/api/rate-limit";
import { validateReferralRequest } from "@/lib/referrals/request";
import { siteConfig } from "@/lib/site/config";
import { referralEmailCopy } from "@/messages/referrals/email";
import {
  configuredTwenty,
  twentyErrorContext,
  twentyErrorTags,
} from "@/lib/integrations/twenty";
import { verifyTurnstile } from "@/lib/contact/turnstile";

const defaultFrom = "Jakub Vantuch <onboarding@resend.dev>";
const endpoint = "referral-request";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const validSubmissionId = (value: unknown) =>
  typeof value === "string" &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  )
    ? value
    : randomUUID();

export async function POST(request: Request) {
  const limited = rateLimit(request, endpoint, {
    limit: 5,
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
        message: "Referral request body is too large",
      });
    }
    body = JSON.parse(raw);
  } catch {
    return apiErrorResponse({
      body: { ok: false, message: "invalidBody" },
      status: 400,
      code: "invalid_body",
      endpoint,
      message: "Referral request body is invalid",
    });
  }

  if (body && typeof body === "object" && "website" in body && body.website) {
    return Response.json({ ok: true });
  }

  const { input, errors } = validateReferralRequest(body);
  if (Object.keys(errors).length > 0) {
    return apiErrorResponse({
      body: { ok: false, formErrors: errors },
      status: 400,
      code: "validation_failed",
      endpoint,
      message: "Referral request validation failed",
      context: { invalidFields: Object.keys(errors) },
    });
  }

  const turnstile = await verifyTurnstile(
    body && typeof body === "object" && "turnstileToken" in body
      ? body.turnstileToken
      : undefined,
    input.intent === "link" ? "referral_link" : "referral_partner",
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
      message: "Referral request Turnstile verification failed",
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
      "TWENTY_CF_ACCESS_CLIENT_ID",
      "TWENTY_CF_ACCESS_CLIENT_SECRET",
    ].filter((name) => !process.env[name]?.trim());
    return apiErrorResponse({
      body: { ok: false, message: "notConfigured" },
      status: 503,
      code: "delivery_not_configured",
      endpoint,
      message: "Referral delivery is not configured",
      context: { missingEnvironmentVariables: missing },
    });
  }

  const requestedId =
    body && typeof body === "object" && "submissionId" in body
      ? body.submissionId
      : undefined;
  const submissionId = validSubmissionId(requestedId);
  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? defaultFrom;

  if (input.intent === "link") {
    const secret = process.env.TWENTY_REFERRAL_SECRET;
    if (!secret) {
      return apiErrorResponse({
        body: { ok: false, message: "notConfigured" },
        status: 503,
        code: "referral_not_configured",
        endpoint,
        message: "Referral link generation is not configured",
      });
    }

    let person;
    try {
      person = await twenty.ensurePerson(input.name, input.email);
    } catch (error) {
      return apiErrorResponse({
        body: { ok: false, message: "sendFailed" },
        status: 502,
        code: "requester_persistence_failed",
        endpoint,
        message: "Twenty referral requester persistence failed",
        error,
        context: twentyErrorContext(error),
        tags: twentyErrorTags(error),
      });
    }

    let token: string;
    try {
      token = createReferralToken(person.id, secret);
    } catch (error) {
      return apiErrorResponse({
        body: { ok: false, message: "sendFailed" },
        status: 502,
        code: "link_generation_failed",
        endpoint,
        message: "Referral link generation failed",
        error,
      });
    }

    const siteUrl = (process.env.SITE_URL ?? "https://vantuch.dev").replace(
      /\/$/,
      "",
    );
    const referralUrl = `${siteUrl}${localizedPath(input.locale)}?ref=${encodeURIComponent(token)}`;
    const emailCopy = referralEmailCopy[input.locale];
    const subject = emailCopy.subject;
    const text = `${emailCopy.greeting}, ${input.name},\n\n${emailCopy.introduction}\n${referralUrl}\n\n${emailCopy.instructions}\n\nJakub Vantuch`;
    const html = `<p>${emailCopy.greeting}, ${escapeHtml(input.name)},</p><p>${emailCopy.introduction}</p><p><a href="${escapeHtml(referralUrl)}">${escapeHtml(referralUrl)}</a></p><p>${emailCopy.instructions}</p><p>Jakub Vantuch</p>`;

    try {
      const { error } = await resend.emails.send(
        {
          from,
          to: [input.email],
          replyTo: siteConfig.contact.email,
          subject,
          text,
          html,
        },
        { idempotencyKey: `referral-link/${submissionId}` },
      );
      if (error) {
        return apiErrorResponse({
          body: { ok: false, message: "sendFailed" },
          status: 502,
          code: "link_email_delivery_failed",
          endpoint,
          message: "Referral link email delivery failed",
          error: new Error("Resend rejected referral link email delivery"),
        });
      }
    } catch (error) {
      return apiErrorResponse({
        body: { ok: false, message: "sendFailed" },
        status: 502,
        code: "link_email_delivery_failed",
        endpoint,
        message: "Referral link email delivery failed",
        error,
      });
    }

    return Response.json({ ok: true });
  }

  const emailCopy = referralEmailCopy[input.locale];
  const companyLine = input.company
    ? `${emailCopy.companyLabel}: ${input.company}\n`
    : "";
  const partnershipMessage = `${emailCopy.partnershipTitle}\n${companyLine}\n${input.message}`;
  try {
    await twenty.saveContact(
      {
        name: input.name,
        email: input.email,
        phone: "",
        message: partnershipMessage,
      },
      submissionId,
    );
  } catch (error) {
    return apiErrorResponse({
      body: { ok: false, message: "sendFailed" },
      status: 502,
      code: "partnership_persistence_failed",
      endpoint,
      message: "Twenty partnership inquiry persistence failed",
      error,
      context: twentyErrorContext(error),
      tags: twentyErrorTags(error),
    });
  }

  const entries = [
    ["Name", input.name],
    ["Email", input.email],
    ["Company", input.company],
    ["Message", input.message],
  ] as const;
  const text = entries
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
  const html = `<h1>New partnership inquiry</h1><dl>${entries
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value).replaceAll("\n", "<br />")}</dd>`,
    )
    .join("")}</dl>`;

  try {
    const subjectName = input.name.replaceAll(/[\r\n]+/g, " ");
    const { error } = await resend.emails.send(
      {
        from,
        to: [process.env.RESEND_TO_EMAIL ?? siteConfig.contact.email],
        replyTo: input.email,
        subject: `Partnership inquiry: ${subjectName}`,
        text,
        html,
      },
      { idempotencyKey: `partnership/${submissionId}` },
    );
    if (error) {
      return apiErrorResponse({
        body: { ok: false, message: "sendFailed" },
        status: 502,
        code: "partnership_email_delivery_failed",
        endpoint,
        message: "Partnership email delivery failed",
        error: new Error("Resend rejected partnership email delivery"),
      });
    }
  } catch (error) {
    return apiErrorResponse({
      body: { ok: false, message: "sendFailed" },
      status: 502,
      code: "partnership_email_delivery_failed",
      endpoint,
      message: "Partnership email delivery failed",
      error,
    });
  }

  return Response.json({ ok: true });
}
