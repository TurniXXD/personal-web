import {
  DEFAULT_EVENT_TIME_ZONE,
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

const finiteNumber = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

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
 * identity required to render or link it (slug, title).
 */
export const mapCmsEvent = (raw: unknown): EventItem | null => {
  if (!isRecord(raw)) return null;
  const slug = text(raw.slug);
  const title = text(raw.title);
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !title) return null;

  const startsAt = toValidIsoDate(raw.startsAt);
  const endsAtCandidate = toValidIsoDate(raw.endsAt);
  const endsAt =
    startsAt && endsAtCandidate && endsAtCandidate > startsAt
      ? endsAtCandidate
      : null;

  return {
    slug,
    title,
    summary: text(raw.summary),
    description: text(raw.description),
    startsAt,
    endsAt,
    timezone: toValidTimeZone(raw.timezone),
    city: text(raw.city) ?? "",
    venueName: text(raw.venueName),
    address: text(raw.address),
    category: text(raw.category) ?? "",
    tags: Array.isArray(raw.tags)
      ? raw.tags.flatMap((tag) => text(tag) ?? [])
      : [],
    organizerName: text(raw.organizerName),
    sourceUrl: toSafeHttpUrl(raw.sourceUrl),
    registrationUrl: toSafeHttpUrl(raw.registrationUrl),
    imageUrl: toSafeHttpUrl(raw.imageUrl),
    isFree: booleanOrNull(raw.isFree),
    price: finiteNumber(raw.price),
    currency: text(raw.currency)?.toUpperCase() ?? null,
    freeFood: oneOf(raw.freeFood, FREE_FOOD_VALUES, "unknown"),
    foodDetails: text(raw.foodDetails),
    status: oneOf(raw.status, EVENT_STATUSES, "scheduled"),
    featured: raw.featured === true,
    updatedAt: toValidIsoDate(raw.updatedAt),
  };
};

export const mapCmsCategory = (raw: unknown): EventCategory | null => {
  if (!isRecord(raw)) return null;
  const slug = text(raw.slug);
  if (!slug) return null;
  return { slug, label: text(raw.label) ?? slug };
};

/** Free food is shown only when the source explicitly confirms it. */
export const hasVerifiedFreeFood = (event: Pick<EventItem, "freeFood">) =>
  event.freeFood === "yes";
