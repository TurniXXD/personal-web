import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

type ContactStatus = "idle" | "submitting" | "success" | "error";

type ContactResponse = {
  ok?: boolean;
  message?: string;
  formErrors?: Record<string, string>;
};

const showToast = async (type: "success" | "error", message: string) => {
  const { toast } = await import("sonner");
  toast[type](message);
};

export const useContactForm = () => {
  const t = useTranslations("ContactDialog");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<ContactStatus>("idle");

  const mapErrorCodeToMessage = (code: string) => {
    if (code === "invalidEmail") {
      return t("errors.invalidEmail");
    }

    if (code === "invalidPhone") {
      return t("errors.invalidPhone");
    }

    return t("errors.required");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ContactResponse;

      if (!response.ok) {
        setErrors(
          Object.fromEntries(
            Object.entries(result.formErrors ?? {}).map(([field, code]) => {
              return [field, mapErrorCodeToMessage(code)];
            }),
          ),
        );

        setStatus("error");
        void showToast(
          "error",
          result.message === "missingApiKey"
            ? t("status.missingApiKey")
            : t("status.sendFailed"),
        );

        return;
      }

      form.reset();
      setStatus("success");
      void showToast("success", t("status.success"));
    } catch {
      setStatus("error");
      void showToast("error", t("status.sendFailed"));
    }
  };

  return {
    errors,
    status,
    handleSubmit,
  };
};
