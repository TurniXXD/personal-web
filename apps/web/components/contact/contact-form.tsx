"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Send, TriangleAlert } from "lucide-react";
import { localizedPath, type Locale } from "@/lib/site/content";
import { contactFormCopy } from "@/messages/contact/form";
import { getAutomationExamples } from "@/lib/automation/content";
import { FormTextField } from "@/components/shared/form-text-field";
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
  emailHref: string;
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

type SubmissionFeedbackProps = {
  tone: "success" | "error";
  title: string;
  message: string;
  emailHref?: string;
  emailAction?: string;
};

function SubmissionFeedback({
  tone,
  title,
  message,
  emailHref,
  emailAction,
}: SubmissionFeedbackProps) {
  const success = tone === "success";

  return (
    <div
      className={`relative mt-4 overflow-hidden rounded-2xl border px-4 py-4 shadow-[0_12px_32px_rgba(36,46,94,0.08)] ${
        success
          ? "border-[#cde6dc] bg-[linear-gradient(135deg,#f2faf6_0%,#ffffff_72%)] text-[#234c3e]"
          : "border-[#f0cad5] bg-[linear-gradient(135deg,#fff3f6_0%,#ffffff_72%)] text-[#7d2341]"
      }`}
      role={success ? "status" : "alert"}
    >
      <span
        className={`absolute inset-y-0 left-0 w-1 ${success ? "bg-[#3f8169]" : "bg-[#b53b60]"}`}
        aria-hidden="true"
      />
      <div className="flex items-start gap-3">
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-full ${
            success ? "bg-[#dcefe7]" : "bg-[#f7dce4]"
          }`}
          aria-hidden="true"
        >
          {success ? <CheckCircle2 size={21} /> : <TriangleAlert size={21} />}
        </span>
        <div className="min-w-0 pt-0.5">
          <strong className="block text-sm font-semibold tracking-[-0.01em]">
            {title}
          </strong>
          <p className="mt-1 text-[0.8rem] leading-relaxed text-current/80">
            {message}
          </p>
          {emailAction && emailHref && (
            <a
              className="mt-2 inline-flex items-center gap-1 rounded-md text-[0.78rem] font-semibold underline decoration-current/30 underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2"
              href={emailHref}
            >
              {emailAction}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

let referralToken: string | null | undefined;

/**
 * The `?ref` token of the landing URL, read once per page load and then removed
 * from the address bar so it is not shared or recorded. Nothing is stored on
 * the device, so attribution applies to forms sent from the landing page.
 */
function landingReferralToken() {
  if (referralToken !== undefined) return referralToken ?? undefined;
  const url = new URL(window.location.href);
  referralToken = url.searchParams.get("ref")?.trim() || null;
  if (url.searchParams.has("ref")) {
    url.searchParams.delete("ref");
    window.history.replaceState(window.history.state, "", url);
  }
  return referralToken ?? undefined;
}

export function ContactForm({
  emailHref,
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
    const token = landingReferralToken();
    if (!token) return;
    const controller = new AbortController();
    async function loadReferrer() {
      try {
        const response = await fetch("/api/referrer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referralToken: token }),
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) return;
        const result = await response.json();
        setReferralApplied(result.referralApplied === true);
      } catch {
        // The server verifies the token again on submission.
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
          locale,
          fax: fieldValue(data, "fax"),
          submissionId: submissionId.current,
          turnstileToken,
          referralToken: landingReferralToken(),
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
        <FormTextField
          id="contact-name"
          name="name"
          label={t.name}
          type="text"
          autoComplete="name"
          maxLength={120}
          className="contact-form__field"
          error={errors.name ? errorFor("name") : undefined}
          required
        />
        <FormTextField
          id="contact-email"
          name="email"
          label={t.email}
          type="email"
          autoComplete="email"
          maxLength={254}
          className="contact-form__field"
          error={errors.email ? errorFor("email") : undefined}
          required
        />
        <FormTextField
          id="contact-phone"
          name="phone"
          label={t.phone}
          type="tel"
          autoComplete="tel"
          maxLength={40}
          className="contact-form__field contact-form__field--wide"
          error={errors.phone ? errorFor("phone") : undefined}
        />
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
        <SubmissionFeedback
          tone="success"
          title={t.successTitle}
          message={t.success}
        />
      )}
      {(status === "failure" || status === "configurationError") && (
        <SubmissionFeedback
          tone="error"
          title={
            status === "configurationError"
              ? t.configurationErrorTitle
              : t.failureTitle
          }
          message={
            status === "configurationError" ? t.configurationError : t.failure
          }
          emailHref={emailHref}
          emailAction={t.emailAction}
        />
      )}
    </form>
  );
}
