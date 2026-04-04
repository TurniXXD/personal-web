import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

type ContactStatus = "idle" | "submitting" | "success" | "error";

export function useContactForm() {
  const t = useTranslations("ContactDialog");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        formErrors?: Record<string, string>;
      };

      if (!response.ok) {
        setErrors(
          Object.fromEntries(
            Object.entries(result.formErrors ?? {}).map(([field, code]) => [
              field,
              code === "invalidEmail"
                ? t("errors.invalidEmail")
                : code === "invalidPhone"
                  ? t("errors.invalidPhone")
                  : t("errors.required"),
            ]),
          ),
        );
        setStatus("error");
        setMessage(
          result.message === "missingApiKey"
            ? t("status.missingApiKey")
            : t("status.sendFailed"),
        );
        return;
      }

      form.reset();
      setStatus("success");
      setMessage(t("status.success"));
    } catch {
      setStatus("error");
      setMessage(t("status.sendFailed"));
    }
  }

  return {
    errors,
    status,
    message,
    handleSubmit,
  };
}
