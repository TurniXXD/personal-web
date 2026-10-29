import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/site/content";
import { privacyCopy } from "@/messages/privacy";
import { contactMailto, siteConfig } from "@/lib/site/config";

type PrivacyPageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
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
      card: "summary_large_image",
      title: `${t.title} | Jakub Vantuch`,
      description: t.description,
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
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
                {section.links?.map((link) => (
                  <p key={link.href}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </p>
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
