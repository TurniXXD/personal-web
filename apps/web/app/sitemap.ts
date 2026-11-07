import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/lib/site/content";
import { DEFAULT_EVENT_FILTERS } from "@/lib/events/event-filters";
import type { EventItem } from "@/lib/events/event-model";
import { isIndexableEvent } from "@/lib/events/event-status";
import { getEvents } from "@/lib/events/events-data";
import { serviceDetailSlugs } from "@/lib/services/detail-content";
import {
  SITE_PATH,
  eventDetailPath,
  serviceDetailPath,
} from "@/lib/site/routes";

const siteUrl = "https://vantuch.dev";
// Bounded crawl of the cursor-paginated API (up to 500 upcoming events).
const SITEMAP_EVENT_PAGES = 5;
const SITEMAP_EVENT_PAGE_SIZE = 100;

type SitemapEntryParams = {
  path: string;
  changeFrequency: "daily" | "monthly";
  priority: { cs: number; en: number };
  lastModified?: string;
};

const localizedEntries = ({
  path,
  changeFrequency,
  priority,
  lastModified,
}: SitemapEntryParams): MetadataRoute.Sitemap => {
  const languages = {
    cs: `${siteUrl}${path || "/"}`,
    en: `${siteUrl}/en${path}`,
    "x-default": `${siteUrl}${path || "/"}`,
  };
  const shared = {
    changeFrequency,
    alternates: { languages },
    ...(lastModified ? { lastModified } : {}),
  };
  return [
    { url: languages.cs, priority: priority.cs, ...shared },
    { url: languages.en, priority: priority.en, ...shared },
  ];
};

/** Upcoming published events; a CMS outage keeps the static sitemap valid. */
const loadSitemapEvents = async (): Promise<EventItem[]> => {
  const events: EventItem[] = [];
  let cursor: string | null = null;
  try {
    for (let page = 0; page < SITEMAP_EVENT_PAGES; page += 1) {
      const result = await getEvents({
        filters: DEFAULT_EVENT_FILTERS,
        cursor,
        limit: SITEMAP_EVENT_PAGE_SIZE,
      });
      events.push(...result.events);
      cursor = result.nextCursor;
      if (!cursor) break;
    }
  } catch {
    // Reported by the data layer; event URLs return on the next revalidation.
  }
  return events.filter(isIndexableEvent);
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [
    SITE_PATH.home,
    SITE_PATH.automation,
    SITE_PATH.services.webApplications,
    SITE_PATH.services.ai,
    ...serviceDetailSlugs.map(serviceDetailPath),
    SITE_PATH.contact,
    ...caseStudySlugs.map((slug) => `${SITE_PATH.work}/${slug}`),
    SITE_PATH.referral,
    SITE_PATH.privacy,
  ];

  const baseEntries = paths.flatMap((path, index) =>
    localizedEntries({
      path,
      changeFrequency: "monthly",
      priority: index === 0 ? { cs: 1, en: 0.9 } : { cs: 0.7, en: 0.7 },
    }),
  );

  const eventEntries = [
    ...localizedEntries({
      path: SITE_PATH.events,
      changeFrequency: "daily",
      priority: { cs: 0.8, en: 0.6 },
    }),
    ...(await loadSitemapEvents()).flatMap((event) =>
      localizedEntries({
        path: eventDetailPath(event.slug),
        changeFrequency: "daily",
        priority: { cs: 0.6, en: 0.5 },
        lastModified: event.updatedAt ?? undefined,
      }),
    ),
  ];

  return [...baseEntries, ...eventEntries];
}
