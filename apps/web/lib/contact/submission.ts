export type ContactField = "name" | "email" | "phone" | "message";
export type ContactError =
  "required" | "invalidEmail" | "invalidPhone" | "tooLong";
export type ContactErrors = Partial<Record<ContactField, ContactError>>;

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactRequestType = "general" | "service" | "automation";

export type ContactRequestContext = {
  type: ContactRequestType;
  subject: string;
  sourcePath: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function singleLine(value: unknown, limit: number): string {
  return text(value)
    .replaceAll(/[\r\n]+/g, " ")
    .slice(0, limit);
}

function validPhone(value: string): boolean {
  const digits = value.replaceAll(/\D/g, "");
  return (
    /^[+]?\d[\d\s().-]*$/.test(value) &&
    digits.length >= 7 &&
    digits.length <= 15
  );
}

export function validateContactInput(value: unknown): {
  input: ContactInput;
  errors: ContactErrors;
} {
  const body =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const input: ContactInput = {
    name: text(body.name),
    email: text(body.email),
    phone: text(body.phone),
    message: text(body.message),
  };
  const errors: ContactErrors = {};

  const limits = { name: 120, email: 254, phone: 40, message: 3000 } as const;
  for (const field of Object.keys(limits) as (keyof typeof limits)[]) {
    if (input[field].length > limits[field]) errors[field] = "tooLong";
  }
  if (!input.name) errors.name = "required";
  if (!input.email) errors.email = "required";
  else if (!errors.email && !emailPattern.test(input.email))
    errors.email = "invalidEmail";
  if (input.phone && !errors.phone && !validPhone(input.phone))
    errors.phone = "invalidPhone";
  if (!input.message) errors.message = "required";
  return { input, errors };
}

export function readContactRequestContext(
  value: unknown,
): ContactRequestContext {
  const request =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>).request
      : undefined;
  const fields =
    request && typeof request === "object" && !Array.isArray(request)
      ? (request as Record<string, unknown>)
      : {};
  const type =
    fields.type === "service" || fields.type === "automation"
      ? fields.type
      : "general";

  const sourcePath = singleLine(fields.sourcePath, 300);
  return {
    type,
    subject: singleLine(fields.subject, 160),
    sourcePath: sourcePath.startsWith("/") ? sourcePath : "",
  };
}
