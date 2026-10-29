import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/services/service-landing-page";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/site/content";
import { servicePageCopy } from "@/lib/services/landing-content";

type AiSolutionsRouteProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: AiSolutionsRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const content = servicePageCopy.ai[locale];
  const canonical = localizedPath(locale, "/sluzby/ai-reseni");

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical,
      languages: {
        cs: "/sluzby/ai-reseni",
        en: "/en/sluzby/ai-reseni",
        "x-default": "/sluzby/ai-reseni",
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

export default async function AiSolutionsRoute({
  params,
}: AiSolutionsRouteProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <ServiceLandingPage kind="ai" locale={locale} />;
}
