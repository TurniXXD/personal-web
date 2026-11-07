import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { EventsListingPage } from "@/components/events/events-listing-page";
import { routing } from "@/i18n/routing";
import {
  hasActiveEventFilters,
  parseEventListQuery,
} from "@/lib/events/event-filters";
import type { EventCategory } from "@/lib/events/event-model";
import { getEventCategories } from "@/lib/events/events-data";
import { localizedPath } from "@/lib/site/content";
import { SITE_PATH } from "@/lib/site/routes";

type EventsRouteProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  params,
  searchParams,
}: EventsRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "events.meta" });
  const query = parseEventListQuery(await searchParams);
  const canonical = localizedPath(locale, SITE_PATH.events);
  // Filtered and paginated variants stay crawlable but are not indexed.
  const faceted = hasActiveEventFilters(query.filters) || query.cursor !== null;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        cs: SITE_PATH.events,
        en: `/en${SITE_PATH.events}`,
        "x-default": SITE_PATH.events,
      },
    },
    robots: faceted ? { index: false, follow: true } : undefined,
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function EventsRoute({
  params,
  searchParams,
}: EventsRouteProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const query = parseEventListQuery(await searchParams);
  // Categories only enrich the filter; their failure is reported by the data
  // layer and must not hide the events themselves.
  const categories: EventCategory[] = await getEventCategories(
    query.filters.city,
  ).catch(() => []);

  return (
    <EventsListingPage locale={locale} query={query} categories={categories} />
  );
}
