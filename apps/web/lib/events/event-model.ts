import type { components } from "./cms-api-schema.ts";

/** Event exactly as the public Content API returns it (generated contract). */
export type CmsEvent = components["schemas"]["PublicEvent"];
export type CmsEventCategory =
  components["schemas"]["EventCategoriesResponse"]["data"][number];

export type EventStatus = CmsEvent["status"];
export type FreeFoodAvailability = CmsEvent["freeFood"];

/**
 * Event normalized for rendering. Field semantics follow the CMS contract;
 * values that fail validation (dates, URLs, time zone) become `null` or the
 * documented default instead of leaking into the UI or structured data.
 */
export type EventItem = Pick<
  CmsEvent,
  | "slug"
  | "title"
  | "summary"
  | "description"
  | "city"
  | "venueName"
  | "address"
  | "category"
  | "tags"
  | "organizerName"
  | "isFree"
  | "price"
  | "currency"
  | "freeFood"
  | "foodDetails"
  | "status"
  | "featured"
> & {
  /** ISO instant; `null` when the CMS value is not a valid date. */
  startsAt: string | null;
  /** ISO instant after `startsAt`; `null` when unknown or invalid. */
  endsAt: string | null;
  /** Valid IANA time zone, defaulting to Europe/Prague. */
  timezone: string;
  sourceUrl: string | null;
  registrationUrl: string | null;
  imageUrl: string | null;
  updatedAt: string | null;
};

export type EventCategory = CmsEventCategory;

export type EventListPage = {
  events: EventItem[];
  nextCursor: string | null;
  /** Items dropped because they violated the contract (reported, not shown). */
  skipped: number;
};

export const DEFAULT_EVENT_TIME_ZONE = "Europe/Prague";
