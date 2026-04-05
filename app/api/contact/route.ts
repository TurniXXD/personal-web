import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?\d{7,15}$/;
const DEFAULT_FROM_EMAIL = "Jakub Vantuch <onboarding@resend.dev>";
const DEFAULT_TO_EMAIL = "contact@vantuch.dev";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

const getString = (value: unknown) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const escapeHtml = (value: string) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
};

export const POST = async (request: Request) => {
  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "invalidBody",
      },
      { status: 400 },
    );
  }

  const name = getString(body.name);
  const email = getString(body.email);
  const phone = getString(body.phone);
  const message = getString(body.message);

  const formErrors = {
    ...(!name && { name: "required" }),
    ...(!email
      ? { email: "required" }
      : !EMAIL_REGEX.test(email) && { email: "invalidEmail" }),
    ...(phone && !PHONE_REGEX.test(phone) && { phone: "invalidPhone" }),
    ...(!message && { message: "required" }),
  };

  if (Object.keys(formErrors).length > 0) {
    return NextResponse.json({ ok: false, formErrors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        message: "missingApiKey",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL ?? DEFAULT_TO_EMAIL;

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedPhone = escapeHtml(phone);
  const escapedMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const html = `
    <div>
      <ul>
        <li><strong>Name:</strong> ${escapedName}</li>
        <li><strong>Email:</strong> ${escapedEmail}</li>
        ${phone ? `<li><strong>Phone:</strong> ${escapedPhone}</li>` : ""}
      </ul>
      <p>${escapedMessage}</p>
    </div>
  `;

  const text = [
    "New contact from personal web",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    "",
    message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: "New contact from personal web",
    html,
    text,
    replyTo: email,
  });

  if (error) {
    console.error("Resend error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "sendFailed",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, message: "success" });
};
