import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/site/content";
import {
  isServiceDetailSlug,
  serviceDetailCopy,
  serviceDetailSlugs,
} from "@/lib/services/detail-content";
import { serviceDetailPath } from "@/lib/site/routes";

type ServiceDetailRouteProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    serviceDetailSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: ServiceDetailRouteProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isServiceDetailSlug(slug)) {
    notFound();
  }

  const content = serviceDetailCopy[locale][slug];
  const route = serviceDetailPath(slug);
  const canonical = localizedPath(locale, route);

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical,
      languages: {
        cs: route,
        en: `/en${route}`,
        "x-default": route,
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

export default async function ServiceDetailRoute({
  params,
}: ServiceDetailRouteProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isServiceDetailSlug(slug)) {
    notFound();
  }
  setRequestLocale(locale);

  return <ServiceDetailPage locale={locale} slug={slug} />;
}
