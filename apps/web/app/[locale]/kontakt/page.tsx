import type { Metadata } from "next";
import { Building2, Clock3, Mail, MapPin, PhoneCall } from "lucide-react";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { routing } from "@/i18n/routing";
import { contactPageCopy } from "@/lib/contact-page-content";
import { localizedPath } from "@/lib/content";
import { contactMailto, contactTel, siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const { meta } = contactPageCopy[locale];
  const canonical = localizedPath(locale, "/kontakt");

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        cs: "/kontakt",
        en: "/en/kontakt",
        "x-default": "/kontakt",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = contactPageCopy[locale];

  return (
    <>
      <SiteHeader locale={locale} path="/kontakt" />
      <main id="main-content" className="contact-page">
        <div className="site-container contact-page__layout">
          <section
            className="contact-page__intro"
            aria-labelledby="contact-page-title"
          >
            <p className="eyebrow">{t.eyebrow}</p>
            <h1 id="contact-page-title">{t.title}</h1>
            <p className="contact-page__lead">{t.intro}</p>
          </section>

          <section className="contact-page__form" aria-label={t.title}>
            <ContactForm locale={locale} />
          </section>

          <section
            className="contact-page__details"
            aria-label={t.directContact}
          >
            <div className="contact-page__group">
              <div className="contact-page__direct">
                <a href={contactMailto()}>
                  <Mail size={19} aria-hidden="true" />
                  <span>{siteConfig.contact.email}</span>
                </a>
                <a href={contactTel()}>
                  <PhoneCall size={19} aria-hidden="true" />
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </a>
                <p>
                  <Clock3 size={19} aria-hidden="true" />
                  <span>{t.phoneAvailability}</span>
                </p>
              </div>
            </div>

            <div className="contact-page__group contact-page__business">
              <h2>{t.businessDetails}</h2>
              <dl>
                <div>
                  <dt>
                    <Building2 size={18} aria-hidden="true" />
                    {t.registrationNumber}
                  </dt>
                  <dd>{siteConfig.business.registrationNumber}</dd>
                </div>
                <div>
                  <dt>{t.registry}</dt>
                  <dd>{t.registryValue}</dd>
                </div>
                <div>
                  <dt>{t.authority}</dt>
                  <dd>{siteConfig.business.authority}</dd>
                </div>
                <div>
                  <dt>
                    <MapPin size={18} aria-hidden="true" />
                    {t.address}
                  </dt>
                  <dd>
                    <address>{siteConfig.business.address}</address>
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
