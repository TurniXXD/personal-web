"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  TurnstileWidget,
  turnstileEnabled,
} from "@/components/turnstile-widget";
import type { CommunityCopy, Locale } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterSocialSection({
  locale,
  enabled,
  showNewsletter = false,
  instagramUrl,
  linkedinUrl,
  githubUrl,
  content,
  privacyHref,
  privacyLabel,
}: {
  locale: Locale;
  enabled: boolean;
  showNewsletter?: boolean;
  instagramUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  content: CommunityCopy;
  privacyHref: string;
  privacyLabel: string;
}) {
  const t = content;
  const [status, setStatus] = useState<Status>("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || status === "loading") return;
    if (turnstileEnabled && !turnstileToken) return;
    setStatus("loading");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          consent: data.get("consent") === "on",
          company: data.get("company"),
          locale,
          turnstileToken,
        }),
      });
      if (!response.ok) throw new Error("subscription_failed");
      form.reset();
      setTurnstileToken("");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setTurnstileToken("");
      setTurnstileResetKey((key) => key + 1);
    }
  }

  return (
    <section
      className="section community-section"
      id="newsletter"
      aria-labelledby="community-title"
    >
      <div className="site-container">
        <ScrollReveal className="section-heading community-section__heading">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 id="community-title">{t.title}</h2>
            <p className="section-intro">{t.description}</p>
          </div>
        </ScrollReveal>
        {showNewsletter ? (
          <ScrollReveal className="community-grid" stagger>
            <div className="newsletter-card">
              <Mail size={25} strokeWidth={1.8} aria-hidden="true" />
              <h3>{t.newsletterTitle}</h3>
              <p>{t.newsletterText}</p>
              <form
                onSubmit={handleSubmit}
                aria-describedby="newsletter-status"
                data-clarity-mask="true"
              >
                <div className="newsletter-card__field">
                  <label htmlFor={`newsletter-email-${locale}`}>
                    {t.emailLabel}
                  </label>
                  <div>
                    <input
                      id={`newsletter-email-${locale}`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t.emailPlaceholder}
                      required
                      disabled={!enabled || status === "loading"}
                    />
                    <button
                      type="submit"
                      disabled={
                        !enabled ||
                        status === "loading" ||
                        (turnstileEnabled && !turnstileToken)
                      }
                    >
                      {status === "loading" ? t.submitting : t.submit}
                    </button>
                  </div>
                </div>
                <label className="newsletter-card__consent">
                  <input
                    name="consent"
                    type="checkbox"
                    required
                    disabled={!enabled || status === "loading"}
                  />
                  <span>
                    {t.consent} <a href={privacyHref}>{privacyLabel}</a>
                  </span>
                </label>
                <input
                  className="newsletter-card__honeypot"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <TurnstileWidget
                  locale={locale}
                  action="newsletter"
                  onTokenChange={setTurnstileToken}
                  resetKey={turnstileResetKey}
                />
              </form>
              <p
                className={`newsletter-card__status newsletter-card__status--${status}`}
                id="newsletter-status"
                aria-live="polite"
              >
                {!enabled
                  ? t.unavailable
                  : status === "success"
                    ? t.success
                    : status === "error"
                      ? t.error
                      : ""}
              </p>
            </div>
          </ScrollReveal>
        ) : null}
        <ScrollReveal className="social-platform-grid" stagger>
          {[
            {
              label: "LinkedIn",
              description: t.linkedinText,
              href: linkedinUrl,
              Icon: Linkedin,
            },
            {
              label: "Instagram",
              description: t.instagramText,
              href: instagramUrl,
              Icon: Instagram,
            },
            {
              label: "GitHub",
              description: t.githubText,
              href: githubUrl,
              Icon: Github,
            },
          ].map(({ label, description, href, Icon }) => (
            <a
              className="social-platform-card"
              href={href}
              key={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon size={25} strokeWidth={1.8} aria-hidden="true" />
              <Icon
                className="social-platform-card__watermark"
                size={150}
                strokeWidth={1.1}
                aria-hidden="true"
              />
              <strong>{label}</strong>
              <span className="social-platform-card__description">
                {description}
              </span>
              <em className="social-platform-card__action">
                {locale === "cs" ? "Zjistit více" : "Learn more"}
                <ArrowUpRight
                  className="social-platform-card__arrow"
                  size={18}
                  aria-hidden="true"
                />
              </em>
            </a>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
