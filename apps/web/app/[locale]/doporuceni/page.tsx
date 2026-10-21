import type { Metadata } from "next";
import { Check, Link2, ListChecks, Mail, MessageSquare } from "lucide-react";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ActionLink } from "@vantuch/ui";
import { ReferralRequestForm } from "@/components/referral-request-form";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { routing } from "@/i18n/routing";
import { localizedPath, type Locale } from "@/lib/content";
import { referralCopy } from "@/lib/referral-content";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const { meta } = referralCopy[locale];
  const canonical = localizedPath(locale, "/doporuceni");

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        cs: "/doporuceni",
        en: "/en/doporuceni",
        "x-default": "/doporuceni",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function ReferralPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = referralCopy[locale as Locale];

  return (
    <>
      <SiteHeader locale={locale} path="/doporuceni" />
      <main>
        <section
          className="hero referral-hero"
          aria-labelledby="referral-title"
        >
          <div className="site-container referral-hero__inner">
            <p className="eyebrow">
              <span className="eyebrow__line" />
              {t.hero.eyebrow}
            </p>
            <h1 id="referral-title">{t.hero.title}</h1>
            <p className="hero__description">{t.hero.description}</p>
            <p className="referral-hero__incentive">
              <strong>10 %</strong>
              <span>{t.hero.rewardLabel}</span>
            </p>
            <div className="hero__actions">
              <ActionLink
                href="#referral-link"
                className="ui-action--icon-link"
              >
                {t.hero.primary} <Link2 size={18} aria-hidden="true" />
              </ActionLink>
              <ActionLink
                href="#how-it-works"
                variant="secondary"
                className="ui-action--icon-list"
              >
                {t.hero.secondary} <ListChecks size={18} aria-hidden="true" />
              </ActionLink>
            </div>
          </div>
        </section>

        <section
          className="section process-section"
          id="how-it-works"
          aria-labelledby="referral-how-title"
        >
          <div className="site-container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.how.eyebrow}</p>
                <h2 id="referral-how-title">{t.how.title}</h2>
              </div>
            </div>
            <div className="process-grid">
              {t.how.steps.map((step) => (
                <article className="process-step" key={step.number}>
                  <span className="process-step__number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section referral-reward"
          aria-labelledby="referral-reward-title"
        >
          <div className="site-container referral-reward__grid">
            <div>
              <p className="eyebrow">{t.reward.eyebrow}</p>
              <h2 id="referral-reward-title">{t.reward.title}</h2>
              <p>{t.reward.description}</p>
              <a
                className="referral-reward__conditions"
                href="#referral-conditions"
              >
                {t.reward.conditions}{" "}
                <ListChecks size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="referral-reward__example">
              <p className="eyebrow">{t.reward.example}</p>
              <div>
                <span>{t.reward.project}</span>
                <strong>100 000 Kč</strong>
              </div>
              <div>
                <span>{t.reward.reward}</span>
                <strong>10 000 Kč</strong>
              </div>
              <small>{t.reward.note}</small>
            </div>
          </div>
        </section>

        <section
          className="section referral-fit"
          aria-labelledby="referral-fit-title"
        >
          <div className="site-container referral-fit__grid">
            <div className="referral-fit__who">
              <h2>{t.who.title}</h2>
              <p>{t.who.text}</p>
            </div>
            <div>
              <p className="eyebrow">{t.fit.eyebrow}</p>
              <h2 id="referral-fit-title">{t.fit.title}</h2>
              <p>{t.fit.intro}</p>
              <ul>
                {t.fit.examples.map((example) => (
                  <li key={example}>
                    <Check size={18} aria-hidden="true" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="section referral-link-section"
          id="referral-link"
          aria-labelledby="referral-link-title"
        >
          <div className="site-container referral-link-section__grid">
            <div className="referral-link-section__intro">
              <p className="eyebrow">{t.link.eyebrow}</p>
              <h2 id="referral-link-title">{t.link.title}</h2>
              <p>{t.link.intro}</p>
            </div>
            <div className="referral-link-card">
              <span className="service-card__icon">
                <Mail size={23} aria-hidden="true" />
              </span>
              <p className="eyebrow">{t.link.cardEyebrow}</p>
              <h3>{t.link.cardTitle}</h3>
              <p>{t.link.cardText}</p>
              <ReferralRequestForm locale={locale} intent="link" />
              <div className="referral-link-card__client">
                <h4>{t.link.clientTitle}</h4>
                <p>{t.link.clientText}</p>
                <a
                  className="text-link"
                  href={localizedPath(locale, "#contact")}
                >
                  {t.link.clientCta}{" "}
                  <MessageSquare size={17} aria-hidden="true" />
                </a>
              </div>
              <small>{t.link.note}</small>
            </div>
          </div>
        </section>

        <section
          className="section referral-faq"
          id="referral-conditions"
          aria-labelledby="referral-faq-title"
        >
          <div className="site-container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.faq.eyebrow}</p>
                <h2 id="referral-faq-title">{t.faq.title}</h2>
              </div>
            </div>
            <div className="referral-faq__list">
              {t.faq.items.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
            <p className="referral-faq__note">{t.faq.note}</p>
          </div>
        </section>

        <section
          className="referral-partner"
          aria-labelledby="referral-partner-title"
        >
          <div className="site-container referral-partner__inner">
            <div className="referral-partner__intro">
              <p className="eyebrow eyebrow--light">{t.partner.eyebrow}</p>
              <h2 id="referral-partner-title">{t.partner.title}</h2>
              <p>{t.partner.text}</p>
            </div>
            <div className="referral-partner__form">
              <ReferralRequestForm locale={locale} intent="partnership" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
