import { Resend } from "resend";
import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { validateContactInput } from "@/lib/contact-submission";
import { referralCookie, verifyReferralToken } from "@/lib/referral-token";
import { siteConfig } from "@/lib/site-config";
import { configuredTwenty } from "@/lib/twenty";

const defaultFrom = "Jakub Vantuch <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

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

  if (body && typeof body === "object" && "fax" in body && body.fax) {
    return Response.json({ ok: true });
  }

  const { input, errors } = validateContactInput(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, formErrors: errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const twenty = configuredTwenty();
  if (!apiKey || !twenty) {
    console.error(
      "Contact delivery is not configured: RESEND_API_KEY or Twenty configuration is missing.",
    );
    return Response.json(
      { ok: false, message: "notConfigured" },
      { status: 503 },
    );
  }

  const token = (await cookies()).get(referralCookie)?.value;
  let referrer;
  if (token) {
    const secret = process.env.TWENTY_REFERRAL_SECRET;
    if (!secret)
      return Response.json(
        { ok: false, message: "notConfigured" },
        { status: 503 },
      );
    const referrerId = verifyReferralToken(token, secret);
    if (!referrerId)
      return Response.json(
        { ok: false, message: "invalidReferral" },
        { status: 400 },
      );
    try {
      referrer = await twenty.findPersonById(referrerId);
    } catch (error) {
      console.error("Twenty referrer lookup failed:", error);
      return Response.json(
        { ok: false, message: "sendFailed" },
        { status: 502 },
      );
    }
    if (!referrer?.emails?.primaryEmail)
      return Response.json(
        { ok: false, message: "invalidReferral" },
        { status: 400 },
      );
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
    await twenty.saveContact(input, submissionId, referrer);
  } catch (error) {
    console.error("Twenty contact persistence failed:", error);
    return Response.json({ ok: false, message: "sendFailed" }, { status: 502 });
  }

  const entries = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone],
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
      console.error("Contact email delivery failed:", error);
      return Response.json(
        { ok: false, message: "sendFailed" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Contact email delivery failed:", error);
    return Response.json({ ok: false, message: "sendFailed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
