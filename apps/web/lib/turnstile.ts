import { sentryLogger } from "@/lib/sentry-logger";

type TurnstileResult = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type TurnstileVerification =
  { ok: true } | { ok: false; reason: "notConfigured" | "failed" };

const turnstileFailure = (
  expectedAction: string,
  reason: "notConfigured" | "failed",
  code: string,
  options: {
    error?: unknown;
    type?: "error" | "warning";
    context?: Record<string, unknown>;
  } = {},
): TurnstileVerification => {
  const message = `Turnstile verification failed: ${code}`;
  sentryLogger({
    error:
      (options.type ?? "warning") === "error"
        ? (options.error ?? new Error(message))
        : options.error,
    type: options.type ?? "warning",
    message,
    context: options.context,
    tags: {
      source: "turnstile",
      endpoint: expectedAction,
      error_code: code,
    },
    fingerprint: ["turnstile", expectedAction, code],
  });
  return { ok: false, reason };
};

export async function verifyTurnstile(
  token: unknown,
  expectedAction: string,
): Promise<TurnstileVerification> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  // Optional until provisioned. Partial configuration must never bypass verification.
  if (!secret && !siteKey) return { ok: true };
  if (!secret || !siteKey) {
    return turnstileFailure(
      expectedAction,
      "notConfigured",
      "partial_configuration",
      {
        type: "error",
        context: { hasSecret: Boolean(secret), hasSiteKey: Boolean(siteKey) },
      },
    );
  }

  if (typeof token !== "string" || !token || token.length > 2048) {
    return turnstileFailure(expectedAction, "failed", "invalid_token", {
      context: {
        tokenProvided: typeof token === "string" && token.length > 0,
        tokenTooLong: typeof token === "string" && token.length > 2048,
      },
    });
  }

  const payload: Record<string, string> = {
    secret,
    response: token,
    idempotency_key: crypto.randomUUID(),
  };
  // Hostnames come from trusted configuration, never the request Host header.
  const hostnames = process.env.TURNSTILE_ALLOWED_HOSTNAMES?.split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean) ?? [
    new URL(process.env.SITE_URL || "https://vantuch.dev").hostname,
  ];

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(6_000),
      },
    );
    if (!response.ok) {
      return turnstileFailure(expectedAction, "failed", "upstream_http_error", {
        type: "error",
        context: {
          status: response.status,
          statusText: response.statusText,
        },
      });
    }

    const result = (await response.json()) as TurnstileResult;
    if (
      !result.success ||
      result.action !== expectedAction ||
      !result.hostname ||
      !hostnames.includes(result.hostname.toLowerCase())
    ) {
      return turnstileFailure(expectedAction, "failed", "validation_rejected", {
        context: {
          errorCodes: result["error-codes"] ?? [],
          actionMatches: result.action === expectedAction,
          hostnameAllowed: Boolean(
            result.hostname &&
            hostnames.includes(result.hostname.toLowerCase()),
          ),
        },
      });
    }
    return { ok: true };
  } catch (error) {
    return turnstileFailure(
      expectedAction,
      "failed",
      "verification_request_failed",
      { error, type: "error" },
    );
  }
}
