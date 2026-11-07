import { DEFAULT_EVENT_TIME_ZONE } from "./event-model.ts";

export const GOOGLE_CALENDAR_TEMPLATE_URL =
  "https://calendar.google.com/calendar/render";

/**
 * Used only for the calendar link when the CMS has no end time. It is never
 * displayed or stored as verified event data.
 */
export const CALENDAR_FALLBACK_DURATION_MINUTES = 90;

const DETAILS_SUMMARY_MAX_LENGTH = 800;

export type GoogleCalendarEventParams = {
  title: string;
  startsAt: string | null;
  endsAt?: string | null;
  timezone?: string | null;
  summary?: string | null;
  eventUrl?: string | null;
  location?: string | null;
};

/** Google expects UTC instants as `YYYYMMDDTHHMMSSZ`. */
export const toGoogleCalendarDate = (date: Date) =>
  date
    .toISOString()
    .replace(/\.\d{3}Z$/, "Z")
    .replace(/[-:]/g, "");

const parseDate = (value: string | null | undefined) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const validTimeZone = (value: string | null | undefined) => {
  if (!value) return DEFAULT_EVENT_TIME_ZONE;
  try {
    new Intl.DateTimeFormat("en", { timeZone: value });
    return value;
  } catch {
    return DEFAULT_EVENT_TIME_ZONE;
  }
};

/**
 * Builds a Google Calendar "create event" link. Instants are sent in UTC, so
 * daylight-saving transitions cannot shift the time; `ctz` only selects the
 * zone Google displays. Returns `null` when there is no valid start, so
 * callers can disable the action instead of creating a wrong entry.
 */
export const buildGoogleCalendarUrl = ({
  title,
  startsAt,
  endsAt,
  timezone,
  summary,
  eventUrl,
  location,
}: GoogleCalendarEventParams): string | null => {
  const start = parseDate(startsAt);
  const name = title.trim();
  if (!start || !name) return null;

  const verifiedEnd = parseDate(endsAt);
  const end =
    verifiedEnd && verifiedEnd > start
      ? verifiedEnd
      : new Date(start.getTime() + CALENDAR_FALLBACK_DURATION_MINUTES * 60_000);

  const trimmedSummary = summary?.trim();
  const details = [
    trimmedSummary && trimmedSummary.length > DETAILS_SUMMARY_MAX_LENGTH
      ? `${trimmedSummary.slice(0, DETAILS_SUMMARY_MAX_LENGTH - 1).trimEnd()}…`
      : trimmedSummary,
    eventUrl?.trim(),
  ]
    .filter(Boolean)
    .join("\n\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: name,
    dates: `${toGoogleCalendarDate(start)}/${toGoogleCalendarDate(end)}`,
    ctz: validTimeZone(timezone),
  });
  if (details) params.set("details", details);
  const place = location?.trim();
  if (place) params.set("location", place);

  return `${GOOGLE_CALENDAR_TEMPLATE_URL}?${params.toString()}`;
};
