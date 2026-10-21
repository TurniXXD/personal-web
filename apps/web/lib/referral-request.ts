import type { Locale } from "@/lib/content";

export type ReferralRequestIntent = "link" | "partnership";
export type ReferralRequestField = "name" | "email" | "company" | "message";
export type ReferralRequestError = "required" | "invalidEmail" | "tooLong";
export type ReferralRequestErrors = Partial<
  Record<ReferralRequestField, ReferralRequestError>
>;

export type ReferralRequestInput = {
  intent: ReferralRequestIntent;
  locale: Locale;
  name: string;
  email: string;
  company: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export function validateReferralRequest(value: unknown): {
  input: ReferralRequestInput;
  errors: ReferralRequestErrors;
} {
  const body =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const intent = body.intent === "partnership" ? "partnership" : "link";
  const input: ReferralRequestInput = {
    intent,
    locale: body.locale === "en" ? "en" : "cs",
    name: text(body.name),
    email: text(body.email).toLowerCase(),
    company: text(body.company),
    message: text(body.message),
  };
  const errors: ReferralRequestErrors = {};
  const limits = {
    name: 120,
    email: 254,
    company: 160,
    message: 3000,
  } as const;

  for (const field of Object.keys(limits) as ReferralRequestField[]) {
    if (input[field].length > limits[field]) errors[field] = "tooLong";
  }
  if (!input.name) errors.name = "required";
  if (!input.email) errors.email = "required";
  else if (!errors.email && !emailPattern.test(input.email)) {
    errors.email = "invalidEmail";
  }
  if (intent === "partnership" && !input.message) {
    errors.message = "required";
  }

  return { input, errors };
}
