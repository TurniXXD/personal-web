import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound, permanentRedirect } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/site/content";
import {
  isServiceDetailSlug,
  serviceDetailCopy,
  serviceDetailSlugs,
  type PublicServiceDetailSlug,
} from "@/lib/services/detail-content";
import {
  SERVICE_SLUG_BY_LOCALE,
  serviceDetailPath,
  serviceSlugFromEnglish,
} from "@/lib/site/routes";
import type { Locale } from "@/lib/site/content";

type ServiceDetailRouteProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    serviceDetailSlugs.map((slug) => ({
      locale,
      slug: SERVICE_SLUG_BY_LOCALE[locale][slug],
    })),
  );
}

/** Maps the URL slug (localized for English) to the stable service slug. */
function resolveSlug(
  locale: Locale,
  urlSlug: string,
): PublicServiceDetailSlug | undefined {
  const slug = locale === "en" ? serviceSlugFromEnglish(urlSlug) : urlSlug;
  if (slug && isServiceDetailSlug(slug)) return slug;
  // Earlier English URLs reused the Czech slugs; send them to the new ones.
  if (locale === "en" && isServiceDetailSlug(urlSlug)) {
    permanentRedirect(localizedPath("en", serviceDetailPath(urlSlug)));
  }
  return undefined;
}

export async function generateMetadata({
  params,
}: ServiceDetailRouteProps): Promise<Metadata> {
  const { locale, slug: urlSlug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const slug = resolveSlug(locale, urlSlug);
  if (!slug) notFound();

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
        en: localizedPath("en", route),
        "x-default": route,
      },
    },
    openGraph: {
      siteName: "Jakub Vantuch",
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
  const { locale, slug: urlSlug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const slug = resolveSlug(locale, urlSlug);
  if (!slug) notFound();
  setRequestLocale(locale);

  return <ServiceDetailPage locale={locale} slug={slug} />;
}
