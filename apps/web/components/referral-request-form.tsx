"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Handshake, Link2 } from "lucide-react";
import { localizedPath, type Locale } from "@/lib/content";
import {
  validateReferralRequest,
  type ReferralRequestErrors,
  type ReferralRequestField,
  type ReferralRequestIntent,
} from "@/lib/referral-request";
import { referralRequestCopy } from "@/lib/referral-request-content";
import {
  TurnstileWidget,
  turnstileEnabled,
} from "@/components/turnstile-widget";

type Status = "idle" | "sending" | "success" | "failure" | "configurationError";

const fieldValue = (data: FormData, name: string) =>
  String(data.get(name) ?? "");

export function ReferralRequestForm({
  locale,
  intent,
}: {
  locale: Locale;
  intent: ReferralRequestIntent;
}) {
  const t = referralRequestCopy[locale][intent];
  const [errors, setErrors] = useState<ReferralRequestErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const submissionId = useRef(crypto.randomUUID());
  const prefix = `referral-${intent}`;
  const errorFor = (field: ReferralRequestField) =>
    errors[field] ? t.errors[errors[field]] : undefined;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const request = {
      intent,
      locale,
      name: fieldValue(data, "name"),
      email: fieldValue(data, "email"),
      company: fieldValue(data, "company"),
      message: fieldValue(data, "message"),
    };
    const { errors: nextErrors } = validateReferralRequest(request);
    setErrors(nextErrors);
    setStatus("idle");

    const firstError = Object.keys(nextErrors)[0] as
      ReferralRequestField | undefined;
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    if (turnstileEnabled && !turnstileToken) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/referral-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...request,
          website: fieldValue(data, "website"),
          submissionId: submissionId.current,
          turnstileToken,
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
        const serverErrors = result.formErrors as ReferralRequestErrors;
        setErrors(serverErrors);
        setStatus("idle");
        const firstServerError = Object.keys(serverErrors)[0] as
          ReferralRequestField | undefined;
        if (firstServerError) {
          form
            .querySelector<HTMLElement>(`[name="${firstServerError}"]`)
            ?.focus();
        }
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
      className={`referral-request-form referral-request-form--${intent}`}
      noValidate
      onSubmit={handleSubmit}
      aria-label={t.title}
      data-clarity-mask="true"
    >
      <div className="referral-request-form__heading">
        <span aria-hidden="true">
          {intent === "link" ? (
            <Link2 size={21} aria-hidden="true" />
          ) : (
            <Handshake size={21} aria-hidden="true" />
          )}
        </span>
        <div>
          <h3>{t.title}</h3>
          <p>{t.text}</p>
        </div>
      </div>

      <div className="referral-request-form__grid">
        <div className="referral-request-form__field">
          <label htmlFor={`${prefix}-name`}>
            {t.name} <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${prefix}-name`}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${prefix}-name-error` : undefined}
          />
          {errors.name ? (
            <small id={`${prefix}-name-error`}>{errorFor("name")}</small>
          ) : null}
        </div>

        <div className="referral-request-form__field">
          <label htmlFor={`${prefix}-email`}>
            {t.email} <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${prefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? `${prefix}-email-error` : undefined
            }
          />
          {errors.email ? (
            <small id={`${prefix}-email-error`}>{errorFor("email")}</small>
          ) : null}
        </div>

        {intent === "partnership" ? (
          <>
            <div className="referral-request-form__field referral-request-form__field--wide">
              <label htmlFor={`${prefix}-company`}>{t.company}</label>
              <input
                id={`${prefix}-company`}
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={160}
                placeholder={t.companyPlaceholder}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={
                  errors.company ? `${prefix}-company-error` : undefined
                }
              />
              {errors.company ? (
                <small id={`${prefix}-company-error`}>
                  {errorFor("company")}
                </small>
              ) : null}
            </div>
            <div className="referral-request-form__field referral-request-form__field--wide">
              <label htmlFor={`${prefix}-message`}>
                {t.message} <span aria-hidden="true">*</span>
              </label>
              <textarea
                id={`${prefix}-message`}
                name="message"
                rows={4}
                maxLength={3000}
                placeholder={t.messagePlaceholder}
                required
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? `${prefix}-message-error` : undefined
                }
              />
              {errors.message ? (
                <small id={`${prefix}-message-error`}>
                  {errorFor("message")}
                </small>
              ) : null}
            </div>
          </>
        ) : null}
      </div>

      <div className="referral-request-form__honeypot" aria-hidden="true">
        <label htmlFor={`${prefix}-website`}>Website</label>
        <input
          id={`${prefix}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="referral-request-form__privacy">
        {t.privacy}{" "}
        <a href={localizedPath(locale, "/privacy")}>{t.privacyLink}</a>.
      </p>
      <TurnstileWidget
        locale={locale}
        action={intent === "link" ? "referral_link" : "referral_partner"}
        onTokenChange={setTurnstileToken}
        resetKey={turnstileResetKey}
      />
      <button
        type="submit"
        disabled={status === "sending" || (turnstileEnabled && !turnstileToken)}
      >
        {status === "sending" ? t.sending : t.submit}
        {intent === "link" ? (
          <Link2 size={18} aria-hidden="true" />
        ) : (
          <Handshake size={18} aria-hidden="true" />
        )}
      </button>

      {status === "success" ? (
        <p
          className="referral-request-form__status referral-request-form__status--success"
          role="status"
        >
          <CheckCircle2 size={18} aria-hidden="true" />
          {t.success}
        </p>
      ) : null}
      {status === "failure" || status === "configurationError" ? (
        <p
          className="referral-request-form__status referral-request-form__status--error"
          role="alert"
        >
          {status === "configurationError" ? t.configurationError : t.failure}
        </p>
      ) : null}
    </form>
  );
}
