import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error-response";
import { rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const endpoint = "newsletter";

export async function POST(request: Request) {
  const limited = rateLimit(request, endpoint, {
    limit: 5,
    windowMs: 60 * 60 * 1_000,
  });
  if (limited) return limited;

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return apiErrorResponse({
      body: { error: "not_configured" },
      status: 503,
      code: "not_configured",
      endpoint,
      message: "Newsletter webhook is not configured",
    });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return apiErrorResponse({
      body: { error: "invalid_json" },
      status: 400,
      code: "invalid_json",
      endpoint,
      message: "Newsletter request body is invalid JSON",
    });
  }

  if (!payload || typeof payload !== "object") {
    return apiErrorResponse({
      body: { error: "invalid_payload" },
      status: 400,
      code: "invalid_payload",
      endpoint,
      message: "Newsletter request payload is invalid",
    });
  }

  const data = payload as Record<string, unknown>;
  if (typeof data.company === "string" && data.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof data.email === "string" ? data.email.trim() : "";
  const locale = data.locale === "en" ? "en" : "cs";
  if (!emailPattern.test(email) || data.consent !== true) {
    return apiErrorResponse({
      body: { error: "invalid_subscription" },
      status: 400,
      code: "invalid_subscription",
      endpoint,
      message: "Newsletter subscription validation failed",
    });
  }

  const turnstile = await verifyTurnstile(data.turnstileToken, "newsletter");
  if (!turnstile.ok) {
    const notConfigured = turnstile.reason === "notConfigured";
    return apiErrorResponse({
      body: {
        error: notConfigured ? "not_configured" : "turnstile_failed",
      },
      status: notConfigured ? 503 : 400,
      code: notConfigured ? "turnstile_not_configured" : "turnstile_failed",
      endpoint,
      message: "Newsletter Turnstile verification failed",
      reported: true,
    });
  }

  const headers: HeadersInit = { "content-type": "application/json" };
  const token = process.env.NEWSLETTER_WEBHOOK_TOKEN?.trim();
  if (token) headers.authorization = `Bearer ${token}`;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, locale, source: "vantuch.dev" }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      return apiErrorResponse({
        body: { error: "provider_error" },
        status: 502,
        code: "provider_error",
        endpoint,
        message: "Newsletter delivery failed",
        context: {
          providerStatus: response.status,
          providerStatusText: response.statusText,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiErrorResponse({
      body: { error: "provider_error" },
      status: 502,
      code: "provider_unavailable",
      endpoint,
      message: "Newsletter provider is unavailable",
      error,
    });
  }
}
