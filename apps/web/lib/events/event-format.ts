import type { EventItem } from "./event-model.ts";

export type EventLocale = "cs" | "en";

const INTL_LOCALE: Record<EventLocale, string> = {
  cs: "cs-CZ",
  en: "en-GB",
};

export const intlLocale = (locale: EventLocale) => INTL_LOCALE[locale];

type EventDateInput = Pick<EventItem, "startsAt" | "endsAt" | "timezone">;

const DATE_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

/**
 * Formats the verified start (and end, if the CMS provides one) in the
 * event's own time zone, so DST and visitor time zones cannot shift it.
 * Returns `null` when the start is missing or invalid.
 */
const formatDateRange = (
  event: EventDateInput,
  locale: EventLocale,
  month: "long" | "numeric",
): string | null => {
  if (!event.startsAt) return null;
  const start = new Date(event.startsAt);
  if (Number.isNaN(start.getTime())) return null;

  const formatter = new Intl.DateTimeFormat(intlLocale(locale), {
    ...DATE_TIME_OPTIONS,
    month,
    timeZone: event.timezone,
  });
  const end = event.endsAt ? new Date(event.endsAt) : null;
  if (!end || Number.isNaN(end.getTime()) || end <= start) {
    return formatter.format(start);
  }
  return formatter.formatRange(start, end);
};

export const formatEventDateRange = (
  event: EventDateInput,
  locale: EventLocale,
): string | null => formatDateRange(event, locale, "long");

/** Numeric month on listing cards, preserving the event's time zone. */
export const formatEventCardDateRange = (
  event: EventDateInput,
  locale: EventLocale,
): string | null =>
  formatDateRange(event, locale, "numeric")?.replace(
    /(\d)\.\s+(?=\d)/g,
    "$1.",
  ) ?? null;

type ZonedParts = { dayKey: string; time: string };

/** Calendar day and wall-clock time of an instant in the event time zone. */
const zonedParts = (date: Date, timeZone: string): ZonedParts => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)!.value;
  return {
    dayKey: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
};

/** Verified start and end; an end at midnight belongs to the previous day. */
const cardSchedule = (event: EventDateInput) => {
  if (!event.startsAt) return null;
  const start = new Date(event.startsAt);
  if (Number.isNaN(start.getTime())) return null;
  const startParts = zonedParts(start, event.timezone);
  const rawEnd = event.endsAt ? new Date(event.endsAt) : null;
  const end =
    rawEnd && !Number.isNaN(rawEnd.getTime()) && rawEnd > start ? rawEnd : null;
  if (!end) return { start, startParts, end: null, endParts: null };
  const endTime = zonedParts(end, event.timezone).time;
  const endParts = zonedParts(
    endTime === "00:00" ? new Date(end.getTime() - 60_000) : end,
    event.timezone,
  );
  return { start, startParts, end, endParts: { ...endParts, time: endTime } };
};

const isMultiDay = (schedule: NonNullable<ReturnType<typeof cardSchedule>>) =>
  schedule.endParts !== null &&
  schedule.endParts.dayKey !== schedule.startParts.dayKey;

const isOngoing = (
  schedule: NonNullable<ReturnType<typeof cardSchedule>>,
  now: Date,
) =>
  schedule.end !== null &&
  isMultiDay(schedule) &&
  schedule.start <= now &&
  now < schedule.end;

/** Short date badge; show the year only when it differs in the event zone. */
export const formatEventCardDateBadge = (
  event: EventDateInput,
  locale: EventLocale,
  now: Date = new Date(),
): string | null => {
  if (!event.startsAt) return null;
  const start = new Date(event.startsAt);
  if (Number.isNaN(start.getTime())) return null;
  const parts = new Intl.DateTimeFormat(intlLocale(locale), {
    timeZone: event.timezone,
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(start);
  const get = (type: string) => parts.find((part) => part.type === type)!.value;
  const currentYear = new Intl.DateTimeFormat(intlLocale(locale), {
    timeZone: event.timezone,
    year: "numeric",
  }).format(now);
  return `${get("day")}.${get("month")}.${get("year") === currentYear ? "" : get("year")}`;
};

export type EventCardTime =
  | { kind: "allDay" }
  | { kind: "at"; start: string }
  | { kind: "from"; start: string }
  | { kind: "range"; start: string; end: string };

/**
 * Compact card time. Sources mark "until the end of the day" as 23:59 or
 * midnight, so such an end is never shown as a real closing time.
 */
export const formatEventCardTime = (
  event: EventDateInput,
  _locale: EventLocale,
  now: Date = new Date(),
): EventCardTime | null => {
  const schedule = cardSchedule(event);
  if (!schedule) return null;
  const start = schedule.startParts.time;
  if (!schedule.endParts) return { kind: "at", start };
  const end = schedule.endParts.time;
  const openEnded = end === "23:59" || end === "00:00";
  if (start === "00:00" && openEnded) return { kind: "allDay" };
  // Across several days the end time is not a daily closing time, and the
  // opening hours of a running exhibition or course are not known.
  if (isMultiDay(schedule)) {
    return isOngoing(schedule, now) ? null : { kind: "from", start };
  }
  if (openEnded) return { kind: "from", start };
  return { kind: "range", start, end };
};

/** Short venue and city label; the detail page retains the full address. */
export const formatEventCardLocation = (
  event: Pick<EventItem, "venueName" | "city" | "address">,
): string | null => {
  const venue = event.venueName?.trim();
  const city = event.city?.trim();
  if (venue && city && !venue.toLowerCase().includes(city.toLowerCase()))
    return `${venue}, ${city}`;
  return venue || city || null;
};

/** Numeric day and month for the card cover, e.g. "20.11.". */
export const formatEventDay = (
  event: EventDateInput,
  locale: EventLocale,
): { day: string; month: string } | null => {
  if (!event.startsAt) return null;
  const start = new Date(event.startsAt);
  if (Number.isNaN(start.getTime())) return null;
  const options = { timeZone: event.timezone } as const;
  return {
    day: new Intl.DateTimeFormat(intlLocale(locale), {
      ...options,
      day: "numeric",
    })
      .format(start)
      .replace(/\.$/, ""),
    month: new Intl.DateTimeFormat(intlLocale(locale), {
      ...options,
      month: "numeric",
    })
      .format(start)
      .replace(/\.$/, ""),
  };
};

export type EventPrice =
  | { kind: "free" }
  | { kind: "paid"; amount: string | null }
  | { kind: "unknown" };

/** Pricing as stated by the CMS; never inferred from missing data. */
export const describeEventPrice = (
  event: Pick<EventItem, "isFree" | "price" | "currency">,
  locale: EventLocale,
): EventPrice => {
  if (event.isFree === true) return { kind: "free" };
  if (event.isFree !== false) return { kind: "unknown" };
  if (event.price === null || event.price <= 0) {
    return { kind: "paid", amount: null };
  }
  if (!event.currency) {
    return {
      kind: "paid",
      amount: new Intl.NumberFormat(intlLocale(locale)).format(event.price),
    };
  }
  try {
    return {
      kind: "paid",
      amount: new Intl.NumberFormat(intlLocale(locale), {
        style: "currency",
        currency: event.currency,
        maximumFractionDigits: Number.isInteger(event.price) ? 0 : 2,
      }).format(event.price),
    };
  } catch {
    return {
      kind: "paid",
      amount: `${new Intl.NumberFormat(intlLocale(locale)).format(event.price)} ${event.currency}`,
    };
  }
};

/** Venue, address, and city without repeating identical parts. */
export const formatEventLocation = (
  event: Pick<EventItem, "venueName" | "address" | "city">,
): string | null => {
  const parts: string[] = [];
  for (const part of [event.venueName, event.address, event.city]) {
    if (!part) continue;
    const alreadyIncluded = parts.some((existing) =>
      existing.toLowerCase().includes(part.toLowerCase()),
    );
    if (!alreadyIncluded) parts.push(part);
  }
  return parts.length ? parts.join(", ") : null;
};

export const truncateText = (value: string, maxLength: number) => {
  if (value.length <= maxLength) return value;
  const cut = value.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
};
