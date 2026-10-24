const production =
  process.env.VERCEL_ENV === "production" ||
  process.env.VALIDATE_PRODUCTION_ENV === "true";

if (!production) process.exit(0);

const required = [
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
  "TURNSTILE_ALLOWED_HOSTNAMES",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "RESEND_TO_EMAIL",
  "TWENTY_BASE_URL",
  "TWENTY_API_KEY",
  "TWENTY_REFERRAL_SECRET",
  "NEXT_PUBLIC_SENTRY_DSN",
  "SENTRY_ORG",
  "SENTRY_PROJECT",
  "SENTRY_AUTH_TOKEN",
  "CLARITY_PROJECT_ID",
  "CLOUDFLARE_WEB_ANALYTICS_TOKEN",
];

const missing = required.filter((name) => !process.env[name]?.trim());
const problems = [];

if ((process.env.TWENTY_REFERRAL_SECRET?.trim().length ?? 0) < 32) {
  problems.push("TWENTY_REFERRAL_SECRET must contain at least 32 characters");
}

const from = process.env.RESEND_FROM_EMAIL?.trim() ?? "";
if (from.includes("onboarding@resend.dev")) {
  problems.push("RESEND_FROM_EMAIL must use a verified production domain");
}

for (const name of ["SITE_URL", "TWENTY_BASE_URL", "NEXT_PUBLIC_SENTRY_DSN"]) {
  const value = process.env[name]?.trim();
  if (!value) continue;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") problems.push(`${name} must use HTTPS`);
  } catch {
    problems.push(`${name} must be a valid URL`);
  }
}

if (missing.length || problems.length) {
  const details = [
    missing.length ? `Missing: ${missing.join(", ")}` : "",
    ...problems,
  ].filter(Boolean);
  console.error(
    `Production environment validation failed:\n- ${details.join("\n- ")}`,
  );
  process.exit(1);
}

console.log("Production environment validation passed.");
