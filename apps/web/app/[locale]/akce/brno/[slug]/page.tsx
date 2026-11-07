import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { EventDetailPage } from "@/components/events/event-detail-page";
import { routing } from "@/i18n/routing";
import { DEFAULT_EVENT_FILTERS } from "@/lib/events/event-filters";
import { truncateText } from "@/lib/events/event-format";
import { optimizableEventImage } from "@/lib/events/event-images";
import type { EventItem } from "@/lib/events/event-model";
import { isIndexableEvent } from "@/lib/events/event-status";
import {
  getEventBySlug,
  getEventCategories,
  getEvents,
} from "@/lib/events/events-data";
import { localizedPath } from "@/lib/site/content";
import { eventDetailPath } from "@/lib/site/routes";

const RELATED_EVENTS_LIMIT = 4;

type EventRouteProps = {
  params: Promise<{ locale: string; slug: string }>;
};

// Pages render on first request and are then cached (ISR); the CMS fetches
// themselves revalidate every 15 minutes or on the publish webhook.
export const revalidate = 900;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

const loadEvent = async (params: EventRouteProps["params"]) => {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // Contract or network failures throw to the error boundary; a stale ISR
  // page keeps being served while the CMS is unavailable.
  const event = await getEventBySlug(slug);
  if (!event) notFound();
  return { locale, event };
};

export async function generateMetadata({
  params,
}: EventRouteProps): Promise<Metadata> {
  const { locale, event } = await loadEvent(params);
  const t = await getTranslations({ locale, namespace: "events.meta" });
  const path = eventDetailPath(event.slug);
  const canonical = localizedPath(locale, path);
  const title = t("detailTitle", { title: event.title });
  const description = truncateText(
    event.summary ?? t("detailFallbackDescription", { title: event.title }),
    160,
  );
  const image = optimizableEventImage(event.imageUrl);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { cs: path, en: `/en${path}`, "x-default": path },
    },
    robots: isIndexableEvent(event)
      ? undefined
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      ...(image ? { images: [{ url: image, alt: event.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

const loadRelatedEvents = async (event: EventItem): Promise<EventItem[]> => {
  if (!event.category) return [];
  try {
    const page = await getEvents({
      filters: { ...DEFAULT_EVENT_FILTERS, category: event.category },
      limit: RELATED_EVENTS_LIMIT + 1,
    });
    return page.events
      .filter((related) => related.slug !== event.slug)
      .slice(0, RELATED_EVENTS_LIMIT);
  } catch {
    // Reported by the data layer; related events are optional.
    return [];
  }
};

export default async function EventRoute({ params }: EventRouteProps) {
  const { locale, event } = await loadEvent(params);
  setRequestLocale(locale);

  const [categories, relatedEvents] = await Promise.all([
    getEventCategories().catch(() => []),
    loadRelatedEvents(event),
  ]);

  return (
    <EventDetailPage
      locale={locale}
      event={event}
      categoryLabels={Object.fromEntries(
        categories.map((category) => [category.slug, category.label]),
      )}
      relatedEvents={relatedEvents}
    />
  );
}
