import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/services/service-landing-page";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/site/content";
import { servicePageCopy } from "@/lib/services/landing-content";

type WebApplicationsRouteProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: WebApplicationsRouteProps): Promise<Metadata> {
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
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
    },
  };
}

export default async function WebApplicationsRoute({
  params,
}: WebApplicationsRouteProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <ServiceLandingPage kind="web" locale={locale} />;
}
