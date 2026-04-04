import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d+$/;

function getString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = getString(formData.get("name"));
  const email = getString(formData.get("email"));
  const phone = getString(formData.get("phone"));
  const message = getString(formData.get("message"));

  const formErrors = {
    ...(!name && { name: "required" }),
    ...(!email
      ? { email: "required" }
      : !EMAIL_REGEX.test(email) && { email: "invalidEmail" }),
    ...(phone && !PHONE_REGEX.test(phone) && { phone: "invalidPhone" }),
    ...(!message && { message: "required" }),
  };

  if (Object.values(formErrors).some(Boolean)) {
    return NextResponse.json({ ok: false, formErrors }, { status: 400 });
  }

  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        message: "missingApiKey",
      },
      { status: 500 },
    );
  }

  const html = `
    <div>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        ${phone ? `<li><strong>Tel:</strong> ${phone}</li>` : ""}
      </ul>
      <p>${message}</p>
    </div>
  `;

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: "contact@vantuch.dev" }],
          subject: "New contact from personal web",
        },
      ],
      from: { email: "contact@vantuch.dev" },
      reply_to: { email, name },
      content: [
        {
          type: "text/html",
          value: html,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("SendGrid error:", errorText);

    return NextResponse.json(
      {
        ok: false,
        message: "sendFailed",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, message: "success" });
}
