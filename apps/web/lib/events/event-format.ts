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
export const formatEventDateRange = (
  event: EventDateInput,
  locale: EventLocale,
): string | null => {
  if (!event.startsAt) return null;
  const start = new Date(event.startsAt);
  if (Number.isNaN(start.getTime())) return null;

  const formatter = new Intl.DateTimeFormat(intlLocale(locale), {
    ...DATE_TIME_OPTIONS,
    timeZone: event.timezone,
  });
  const end = event.endsAt ? new Date(event.endsAt) : null;
  if (!end || Number.isNaN(end.getTime()) || end <= start) {
    return formatter.format(start);
  }
  return formatter.formatRange(start, end);
};

/** Compact date for card headers, e.g. "20. 11." / "20 Nov". */
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
    }).format(start),
    month: new Intl.DateTimeFormat(intlLocale(locale), {
      ...options,
      month: "short",
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

/** Splits plain-text CMS descriptions on blank lines. */
export const descriptionParagraphs = (description: string | null) =>
  description
    ? description
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];

export const truncateText = (value: string, maxLength: number) => {
  if (value.length <= maxLength) return value;
  const cut = value.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
};
