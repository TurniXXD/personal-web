import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/service-landing-page";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/content";
import { servicePageCopy } from "@/lib/service-content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const content = servicePageCopy.web[locale];
  const canonical = localizedPath(locale, "/sluzby/webove-aplikace");

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical,
      languages: {
        cs: "/sluzby/webove-aplikace",
        en: "/en/sluzby/webove-aplikace",
        "x-default": "/sluzby/webove-aplikace",
      },
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: content.meta.title,
      description: content.meta.description,
    },
  };
}

export default async function WebApplicationsRoute({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return <ServiceLandingPage kind="web" locale={locale} />;
}
