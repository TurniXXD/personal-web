import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/content";
import {
  isServiceDetailSlug,
  serviceDetailCopy,
  serviceDetailSlugs,
} from "@/lib/service-detail-content";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    serviceDetailSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isServiceDetailSlug(slug)) {
    notFound();
  }

  const content = serviceDetailCopy[locale][slug];
  const route = `/sluzby/${slug}`;
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
      card: "summary",
      title: content.meta.title,
      description: content.meta.description,
    },
  };
}

export default async function ServiceDetailRoute({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isServiceDetailSlug(slug)) {
    notFound();
  }

  return <ServiceDetailPage locale={locale} slug={slug} />;
}
