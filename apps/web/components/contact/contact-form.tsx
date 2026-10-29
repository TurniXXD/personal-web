"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { localizedPath, type Locale } from "@/lib/site/content";
import { contactFormCopy } from "@/messages/contact/form";
import { getAutomationExamples } from "@/lib/automation/content";
import {
  TurnstileWidget,
  turnstileEnabled,
} from "@/components/contact/turnstile-widget";
import {
  validateContactInput,
  type ContactErrors,
  type ContactField,
  type ContactInput,
  type ContactRequestType,
} from "@/lib/contact/submission";

type Status = "idle" | "sending" | "success" | "failure" | "configurationError";

type ContactFormProps = {
  initialTopic?: string;
  locale: Locale;
  requestType?: ContactRequestType;
};

function fieldValue(data: FormData, name: string): string {
  return String(data.get(name) ?? "");
}

function readInput(data: FormData): ContactInput {
  return {
    name: fieldValue(data, "name"),
    email: fieldValue(data, "email"),
    phone: fieldValue(data, "phone"),
    message: fieldValue(data, "message"),
  };
}

export function ContactForm({
  locale,
  initialTopic,
  requestType = initialTopic ? "service" : "general",
}: ContactFormProps) {
  const t = contactFormCopy[locale];
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [referralApplied, setReferralApplied] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [requestSubject, setRequestSubject] = useState(
    initialTopic?.trim() ?? "",
  );
  const [resolvedRequestType, setResolvedRequestType] =
    useState<ContactRequestType>(requestType);
  const submissionId = useRef(crypto.randomUUID());
  const errorFor = (field: ContactField) =>
    errors[field] ? t.errors[errors[field]] : undefined;

  useEffect(() => {
    const controller = new AbortController();
    async function loadReferrer() {
      try {
        const response = await fetch("/api/referrer", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) return;
        const result = await response.json();
        setReferralApplied(result.referralApplied === true);
      } catch {
        // The server still verifies any referral cookie on submission.
      }
    }
    void loadReferrer();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get("tema")?.trim() || initialTopic?.trim();
    const automation = params.get("automation")?.trim();
    const selectedAutomation = automation
      ? getAutomationExamples(locale).find(
          (example) => example.id === automation,
        )?.title
      : null;
    const subject = selectedAutomation ?? topic ?? "";
    setRequestSubject(subject);
    setResolvedRequestType(
      selectedAutomation ? "automation" : subject ? requestType : "general",
    );
  }, [initialTopic, locale, requestType]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const { input, errors: nextErrors } = validateContactInput(readInput(data));
    setErrors(nextErrors);
    setStatus("idle");

    const firstError = Object.keys(nextErrors)[0] as ContactField | undefined;
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    if (turnstileEnabled && !turnstileToken) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          fax: fieldValue(data, "fax"),
          submissionId: submissionId.current,
          turnstileToken,
          request: {
            type: resolvedRequestType,
            subject: requestSubject,
            sourcePath: window.location.pathname,
          },
        }),
      });
      const result = await response.json();
      if (response.ok && result.ok === true) {
        form.reset();
        setTurnstileToken("");
        submissionId.current = crypto.randomUUID();
        setErrors({});
        setStatus("success");
      } else if (response.status === 400 && result.formErrors) {
        const serverErrors = result.formErrors as ContactErrors;
        setErrors(serverErrors);
        setStatus("idle");
        const firstServerError = Object.keys(serverErrors)[0] as
          ContactField | undefined;
        if (firstServerError)
          form
            .querySelector<HTMLElement>(`[name="${firstServerError}"]`)
            ?.focus();
      } else {
        setStatus(
          result.message === "notConfigured" ? "configurationError" : "failure",
        );
      }
    } catch {
      setStatus("failure");
    } finally {
      setTurnstileToken("");
      setTurnstileResetKey((key) => key + 1);
    }
  }

  return (
    <form
      className="contact-form"
      noValidate
      onSubmit={handleSubmit}
      aria-label={t.title}
      data-clarity-mask="true"
    >
      <h3>{t.title}</h3>
      {referralApplied && (
        <p className="contact-form__referral">
          <CheckCircle2 size={18} aria-hidden="true" />
          {t.referralApplied}
        </p>
      )}
      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor="contact-name">
            {t.name} <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <small id="contact-name-error">{errorFor("name")}</small>
          )}
        </div>
        <div className="contact-form__field">
          <label htmlFor="contact-email">
            {t.email} <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <small id="contact-email-error">{errorFor("email")}</small>
          )}
        </div>
        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor="contact-phone">{t.phone}</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          />
          {errors.phone && (
            <small id="contact-phone-error">{errorFor("phone")}</small>
          )}
        </div>
        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor="contact-message">
            {t.message} <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder={t.messagePlaceholder}
            rows={4}
            maxLength={3000}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
          />
          {errors.message && (
            <small id="contact-message-error">{errorFor("message")}</small>
          )}
        </div>
      </div>
      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor="contact-fax">Fax</label>
        <input
          id="contact-fax"
          name="fax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="form-privacy-notice">
        {t.privacyNotice}{" "}
        <a href={localizedPath(locale, "/privacy")}>{t.privacyLink}</a>.
      </p>
      <TurnstileWidget
        action="contact"
        onTokenChange={setTurnstileToken}
        resetKey={turnstileResetKey}
      />
      <button
        className="ui-action ui-action--primary ui-action--icon-send contact-form__submit"
        type="submit"
        disabled={status === "sending" || (turnstileEnabled && !turnstileToken)}
      >
        {status === "sending" ? t.sending : t.submit}{" "}
        <Send size={18} aria-hidden="true" />
      </button>
      {status === "success" && (
        <p className="contact-form__message" role="status">
          {t.success}
        </p>
      )}
      {(status === "failure" || status === "configurationError") && (
        <p
          className="contact-form__message contact-form__message--error"
          role="alert"
        >
          {status === "configurationError" ? t.configurationError : t.failure}
        </p>
      )}
    </form>
  );
}
