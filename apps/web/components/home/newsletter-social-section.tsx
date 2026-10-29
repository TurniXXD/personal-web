"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import {
  TurnstileWidget,
  turnstileEnabled,
} from "@/components/contact/turnstile-widget";
import type { CommunityCopy, Locale } from "@/lib/site/content";

type Status = "idle" | "loading" | "success" | "error";

type NewsletterSocialSectionProps = {
  content: CommunityCopy;
  enabled: boolean;
  githubUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  locale: Locale;
  privacyHref: string;
  privacyLabel: string;
  showNewsletter?: boolean;
};

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
}: NewsletterSocialSectionProps) {
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
        <ScrollReveal
          className="social-platform-grid grid grid-cols-3 gap-4 max-[900px]:grid-cols-1"
          stagger
        >
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
              className="social-platform-card group relative grid min-h-[6.8rem] grid-cols-[3.25rem_minmax(0,1fr)_1.5rem] grid-rows-2 items-center gap-x-4 overflow-hidden rounded-[1.15rem] border border-[#d8def8] bg-white px-6 py-5 text-primary shadow-[0_0.8rem_2.2rem_rgba(40,53,110,0.04)] transition-[background-color] duration-300 max-[460px]:min-h-[5.5rem] max-[460px]:grid-cols-[2.75rem_minmax(0,1fr)_1.25rem] max-[460px]:gap-x-3 max-[460px]:px-4 max-[460px]:py-4"
              href={href}
              key={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-platform-card__icon col-start-1 row-span-2 grid size-12 place-items-center self-center rounded-[0.85rem] bg-[#f0efff] text-primary group-hover:bg-white/15 group-hover:text-white group-focus-visible:bg-white/15 group-focus-visible:text-white max-[460px]:size-10">
                <Icon size={25} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <Icon
                className="social-platform-card__watermark"
                size={150}
                strokeWidth={1.1}
                aria-hidden="true"
              />
              <strong className="col-start-2 row-start-1 self-end text-[1rem] leading-[1.25] font-bold tracking-[-0.025em] text-ink-strong">
                {label}
              </strong>
              <span className="social-platform-card__description col-start-2 row-start-2 self-start pt-1 text-[0.78rem] leading-[1.4] text-[#6a7596]">
                {description}
              </span>
              <span className="social-platform-card__action col-start-3 row-span-2 row-start-1 grid size-6 place-items-center self-center justify-self-end text-current">
                <ArrowUpRight
                  className="social-platform-card__arrow"
                  size={21}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </span>
            </a>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
