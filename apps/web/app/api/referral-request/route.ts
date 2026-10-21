import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { localizedPath } from "@/lib/content";
import { createReferralToken } from "@/lib/referral-token";
import { validateReferralRequest } from "@/lib/referral-request";
import { siteConfig } from "@/lib/site-config";
import { configuredTwenty } from "@/lib/twenty";

const defaultFrom = "Jakub Vantuch <onboarding@resend.dev>";

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
      return Response.json({ ok: false, message: "tooLarge" }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return Response.json(
      { ok: false, message: "invalidBody" },
      { status: 400 },
    );
  }

  if (body && typeof body === "object" && "website" in body && body.website) {
    return Response.json({ ok: true });
  }

  const { input, errors } = validateReferralRequest(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, formErrors: errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const twenty = configuredTwenty();
  if (!apiKey || !twenty) {
    console.error(
      "Referral delivery is not configured: RESEND_API_KEY or Twenty configuration is missing.",
    );
    return Response.json(
      { ok: false, message: "notConfigured" },
      { status: 503 },
    );
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
      return Response.json(
        { ok: false, message: "notConfigured" },
        { status: 503 },
      );
    }

    let person;
    try {
      person = await twenty.ensurePerson(input.name, input.email);
    } catch (error) {
      console.error("Twenty referral requester persistence failed:", error);
      return Response.json(
        { ok: false, message: "sendFailed" },
        { status: 502 },
      );
    }

    let token: string;
    try {
      token = createReferralToken(person.id, secret);
    } catch (error) {
      console.error("Referral link generation failed:", error);
      return Response.json(
        { ok: false, message: "sendFailed" },
        { status: 502 },
      );
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
      if (error) throw new Error(error.message);
    } catch (error) {
      console.error("Referral link email delivery failed:", error);
      return Response.json(
        { ok: false, message: "sendFailed" },
        { status: 502 },
      );
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
    console.error("Twenty partnership inquiry persistence failed:", error);
    return Response.json({ ok: false, message: "sendFailed" }, { status: 502 });
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
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Partnership email delivery failed:", error);
    return Response.json({ ok: false, message: "sendFailed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
