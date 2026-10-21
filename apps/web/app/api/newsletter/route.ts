import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  if (typeof data.company === "string" && data.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof data.email === "string" ? data.email.trim() : "";
  const locale = data.locale === "en" ? "en" : "cs";
  if (!emailPattern.test(email) || data.consent !== true) {
    return NextResponse.json(
      { error: "invalid_subscription" },
      { status: 400 },
    );
  }

  const headers: HeadersInit = { "content-type": "application/json" };
  const token = process.env.NEWSLETTER_WEBHOOK_TOKEN?.trim();
  if (token) headers.authorization = `Bearer ${token}`;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, locale, source: "vantuch.dev" }),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "provider_error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
