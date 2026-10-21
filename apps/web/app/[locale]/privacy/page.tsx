import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/content";
import { privacyCopy } from "@/lib/privacy-content";
import { contactMailto, siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = privacyCopy[locale];
  const canonical = localizedPath(locale, "/privacy");

  return {
    title: `${t.title} | Jakub Vantuch`,
    description: t.description,
    alternates: {
      canonical,
      languages: { cs: "/privacy", en: "/en/privacy", "x-default": "/privacy" },
    },
    openGraph: {
      title: `${t.title} | Jakub Vantuch`,
      description: t.description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${t.title} | Jakub Vantuch`,
      description: t.description,
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = privacyCopy[locale];

  return (
    <>
      <SiteHeader locale={locale} path="/privacy" />
      <main id="main-content" className="privacy-page">
        <div className="site-container privacy-page__inner">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="privacy-page__lead">{t.description}</p>
          <p className="privacy-page__contact">
            {t.contactLabel}{" "}
            <a href={contactMailto()}>{siteConfig.contact.email}</a>
          </p>
          <div className="privacy-page__sections">
            {t.sections.map((section, index) => (
              <section key={section.title} aria-labelledby={`privacy-${index}`}>
                <h2 id={`privacy-${index}`}>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
          <p className="privacy-page__authority">
            <a href="https://uoou.gov.cz/" target="_blank" rel="noreferrer">
              {t.authority}
            </a>
          </p>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
