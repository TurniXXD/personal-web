type TurnstileResult = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type TurnstileVerification =
  { ok: true } | { ok: false; reason: "notConfigured" | "failed" };

export async function verifyTurnstile(
  token: unknown,
  expectedAction: string,
): Promise<TurnstileVerification> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  // Optional until provisioned. Partial configuration must never bypass verification.
  if (!secret && !siteKey) return { ok: true };
  if (!secret || !siteKey) return { ok: false, reason: "notConfigured" };

  if (typeof token !== "string" || !token || token.length > 2048) {
    return { ok: false, reason: "failed" };
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
    if (!response.ok) return { ok: false, reason: "failed" };

    const result = (await response.json()) as TurnstileResult;
    if (
      !result.success ||
      result.action !== expectedAction ||
      !result.hostname ||
      !hostnames.includes(result.hostname.toLowerCase())
    ) {
      console.warn("Turnstile validation failed:", result["error-codes"] ?? []);
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error("Turnstile validation request failed:", error);
    return { ok: false, reason: "failed" };
  }
}
