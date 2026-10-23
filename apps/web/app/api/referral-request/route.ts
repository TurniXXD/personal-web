import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { apiErrorResponse } from "@/lib/api-error-response";
import { localizedPath } from "@/lib/content";
import { createReferralToken } from "@/lib/referral-token";
import { validateReferralRequest } from "@/lib/referral-request";
import { siteConfig } from "@/lib/site-config";
import { configuredTwenty } from "@/lib/twenty";
import { verifyTurnstile } from "@/lib/turnstile";

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
    const isCzech = input.locale === "cs";
    const subject = isCzech
      ? "Váš osobní doporučovací odkaz"
      : "Your personal referral link";
    const text = isCzech
      ? `Dobrý den, ${input.name},\n\nzde je váš osobní doporučovací odkaz:\n${referralUrl}\n\nPošlete jej zájemci. Doporučení se přiřadí, když přes odkaz otevře web a odešle vlastní poptávku.\n\nJakub Vantuch`
      : `Hello ${input.name},\n\nHere is your personal referral link:\n${referralUrl}\n\nShare it with a prospective client. The referral is attributed when they open the site through the link and submit their own inquiry.\n\nJakub Vantuch`;
    const html = `<p>${isCzech ? "Dobrý den" : "Hello"}, ${escapeHtml(input.name)},</p><p>${isCzech ? "zde je váš osobní doporučovací odkaz:" : "here is your personal referral link:"}</p><p><a href="${escapeHtml(referralUrl)}">${escapeHtml(referralUrl)}</a></p><p>${isCzech ? "Pošlete jej zájemci. Doporučení se přiřadí, když přes odkaz otevře web a odešle vlastní poptávku." : "Share it with a prospective client. The referral is attributed when they open the site through the link and submit their own inquiry."}</p><p>Jakub Vantuch</p>`;

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

  const companyLine = input.company ? `Firma: ${input.company}\n` : "";
  const partnershipMessage = `${
    input.locale === "cs"
      ? "Zájem o partnerskou spolupráci"
      : "Partnership inquiry"
  }\n${companyLine}\n${input.message}`;
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
