import {
  DEFAULT_EVENT_TIME_ZONE,
  type CmsEventCategory,
  type EventCategory,
  type EventItem,
  type EventStatus,
  type FreeFoodAvailability,
} from "./event-model.ts";

const EVENT_STATUSES = [
  "scheduled",
  "cancelled",
  "postponed",
] as const satisfies readonly EventStatus[];
const FREE_FOOD_VALUES = [
  "yes",
  "no",
  "unknown",
] as const satisfies readonly FreeFoodAvailability[];

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const text = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
};

const booleanOrNull = (value: unknown): boolean | null =>
  typeof value === "boolean" ? value : null;

export const toValidIsoDate = (value: unknown): string | null => {
  if (typeof value !== "string" || !value.trim()) return null;
  const time = Date.parse(value);
  return Number.isNaN(time) ? null : new Date(time).toISOString();
};

/** Only http(s) URLs may become links; anything else is treated as missing. */
export const toSafeHttpUrl = (value: unknown): string | null => {
  const candidate = text(value);
  if (!candidate) return null;
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
};

export const toValidTimeZone = (value: unknown): string => {
  const candidate = text(value);
  if (!candidate) return DEFAULT_EVENT_TIME_ZONE;
  try {
    new Intl.DateTimeFormat("en", { timeZone: candidate });
    return candidate;
  } catch {
    return DEFAULT_EVENT_TIME_ZONE;
  }
};

const oneOf = <Value extends string>(
  value: unknown,
  allowed: readonly Value[],
  fallback: Value,
): Value => (allowed.includes(value as Value) ? (value as Value) : fallback);

/**
 * Maps one CMS event to the UI model. Returns `null` when the item lacks the
 * title required to render it.
 */
export const mapCmsEvent = (raw: unknown): EventItem | null => {
  if (!isRecord(raw)) return null;
  const title = text(raw.title);
  if (!title) return null;

  const startsAt = toValidIsoDate(raw.startsAt);
  const endsAtCandidate = toValidIsoDate(raw.endsAt);
  const endsAt =
    startsAt && endsAtCandidate && endsAtCandidate > startsAt
      ? endsAtCandidate
      : null;

  const category = text(raw.category) ?? "";
  const categories = [
    ...new Set(
      (Array.isArray(raw.categories) ? raw.categories : []).flatMap(
        (value) => text(value) ?? [],
      ),
    ),
  ];

  return {
    title,
    startsAt,
    endsAt,
    timezone: toValidTimeZone(raw.timezone),
    city: text(raw.city) ?? "",
    venueName: text(raw.venueName),
    address: text(raw.address),
    category,
    // Older payloads carry only the primary category.
    categories: categories.length ? categories : category ? [category] : [],
    sourceUrl: toSafeHttpUrl(raw.sourceUrl),
    isFree: booleanOrNull(raw.isFree),
    freeFood: oneOf(raw.freeFood, FREE_FOOD_VALUES, "unknown"),
    status: oneOf(raw.status, EVENT_STATUSES, "scheduled"),
  };
};

export const mapCmsCategory = (raw: unknown): CmsEventCategory | null => {
  if (!isRecord(raw)) return null;
  const slug = text(raw.slug);
  if (!slug) return null;
  return { slug, label: text(raw.label) ?? slug, labelCs: text(raw.labelCs) };
};

/** Picks the CMS translation for the locale, falling back to the English label. */
export const localizeEventCategory = (
  category: CmsEventCategory,
  locale: string,
): EventCategory => ({
  slug: category.slug,
  label: (locale === "cs" ? category.labelCs : null) ?? category.label,
});

/** Free food is shown only when the source explicitly confirms it. */
export const hasVerifiedFreeFood = (event: Pick<EventItem, "freeFood">) =>
  event.freeFood === "yes";
