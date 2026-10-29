import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { routing } from "@/i18n/routing";
import { copy } from "@/lib/site/content";
import "@fontsource-variable/sora";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@vantuch/ui/styles.css";
import "@/app/globals.css";

const siteUrl = "https://vantuch.dev";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const content = copy[locale];
  const canonical = locale === "en" ? "/en" : "/";

  return {
    metadataBase: new URL(siteUrl),
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical,
      languages: { cs: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      type: "website",
      url: canonical,
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      alternateLocale: locale === "cs" ? ["en_US"] : ["cs_CZ"],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          {children}
          <CookieConsent
            locale={locale}
            clarityProjectId={process.env.CLARITY_PROJECT_ID?.trim()}
            cloudflareAnalyticsToken={process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim()}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
