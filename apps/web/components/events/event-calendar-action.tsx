import { CalendarPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import type { EventItem } from "@/lib/events/event-model";
import { formatEventLocation } from "@/lib/events/event-format";
import { canAddEventToCalendar } from "@/lib/events/event-status";
import { buildGoogleCalendarUrl } from "@/lib/events/google-calendar";

// Plain join: tailwind-merge treats the custom `text-ui-*` size tokens as
// colors and would drop them next to a text color utility.
const classes = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

type EventCalendarActionProps = {
  event: EventItem;
  /** Absolute URL of the event detail page, included in the details. */
  eventUrl: string;
  className?: string;
};

const actionClasses =
  "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-ui-sm font-bold transition-[background-color,border-color,color] duration-200";

/**
 * Unavailable state is non-interactive text, so nothing focusable is offered.
 *
 * A standalone link (never nested inside the card link) that opens Google
 * Calendar's prefilled template. No OAuth or account access is involved.
 */
export function EventCalendarAction({
  event,
  eventUrl,
  className,
}: EventCalendarActionProps) {
  const t = useTranslations("events.calendar");
  const href = canAddEventToCalendar(event)
    ? buildGoogleCalendarUrl({
        title: event.title,
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        timezone: event.timezone,
        summary: event.summary,
        eventUrl,
        location: formatEventLocation(event),
      })
    : null;

  if (!href) {
    return (
      <span
        aria-disabled="true"
        data-calendar-disabled
        className={classes(
          actionClasses,
          "cursor-not-allowed border-border-soft bg-muted text-ink-muted",
          className,
        )}
      >
        <CalendarPlus size={16} aria-hidden="true" />
        {t("add")}
        <span className="sr-only">
          {" "}
          {event.status === "cancelled" ? t("cancelled") : t("unavailable")}
        </span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-calendar-action
      className={classes(
        actionClasses,
        "border-border-card bg-card text-[#3644b0] hover:border-primary hover:bg-secondary focus-visible:border-primary focus-visible:bg-secondary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff45]",
        className,
      )}
    >
      <CalendarPlus size={16} aria-hidden="true" />
      {t("add")}
      <span className="sr-only"> {t("newWindow")}</span>
    </a>
  );
}
