import Link from "next/link";
import { Building2, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "cn";
import {
  EventCategoryBadge,
  EventFreeFoodBadge,
  EventPriceBadge,
  EventStatusBadge,
} from "@/components/events/event-badges";
import { EventCalendarAction } from "@/components/events/event-calendar-action";
import { EventCover } from "@/components/events/event-cover";
import type { EventItem } from "@/lib/events/event-model";
import {
  formatEventDateRange,
  formatEventLocation,
  truncateText,
  type EventLocale,
} from "@/lib/events/event-format";
import { localizedPath } from "@/lib/site/content";
import { SITE_ORIGIN, eventDetailPath } from "@/lib/site/routes";

const SUMMARY_MAX_LENGTH = 170;

type EventCardProps = {
  event: EventItem;
  locale: EventLocale;
  categoryLabel: string;
  headingLevel?: "h2" | "h3";
};

/**
 * Whole-card navigation uses a stretched title link (`after:inset-0`), so the
 * calendar action stays a sibling link instead of nesting inside an anchor.
 */
export function EventCard({
  event,
  locale,
  categoryLabel,
  headingLevel: Heading = "h3",
}: EventCardProps) {
  const t = useTranslations("events.card");
  const href = localizedPath(locale, eventDetailPath(event.slug));
  const date = formatEventDateRange(event, locale);
  const location = formatEventLocation(event);

  return (
    <article
      data-event-card={event.slug}
      data-event-status={event.status}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-border-card bg-card shadow-[0_16px_40px_rgba(47,59,125,0.045)] transition-[border-color,box-shadow] duration-200 hover:border-[#c6ceff] hover:shadow-[0_18px_44px_rgba(47,59,125,0.09)] has-[[data-event-card-link]:focus-visible]:border-primary has-[[data-event-card-link]:focus-visible]:outline-[3px] has-[[data-event-card-link]:focus-visible]:outline-offset-4 has-[[data-event-card-link]:focus-visible]:outline-[#5f6cff45]"
    >
      <EventCover
        event={event}
        locale={locale}
        alt=""
        sizes="(min-width: 1280px) 280px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col gap-3 p-5 max-[600px]:p-[1.1rem]">
        <div className="flex flex-wrap items-center gap-1.5">
          {categoryLabel ? <EventCategoryBadge label={categoryLabel} /> : null}
          <EventStatusBadge status={event.status} />
        </div>
        {date && event.startsAt ? (
          <time
            dateTime={event.startsAt}
            className="font-mono text-ui-xs leading-[1.5] font-bold tracking-[0.04em] text-[#4654d4]"
          >
            {date}
          </time>
        ) : (
          <p className="m-0 font-mono text-ui-xs font-bold text-ink-muted">
            {t("dateUnknown")}
          </p>
        )}
        <Heading
          className={cn(
            "m-0 text-[1.08rem] leading-[1.32] font-semibold tracking-[-0.03em] text-ink-strong transition-colors duration-200 group-hover:text-primary",
            event.status === "cancelled" && "line-through decoration-1",
          )}
        >
          <Link
            href={href}
            data-event-card-link
            className="outline-none after:absolute after:inset-0 after:z-0 after:content-['']"
          >
            {event.title}
          </Link>
        </Heading>
        {event.summary ? (
          <p className="m-0 line-clamp-3 text-body-sm leading-[1.6] text-[#596484]">
            {truncateText(event.summary, SUMMARY_MAX_LENGTH)}
          </p>
        ) : null}
        {location || event.organizerName ? (
          <dl className="m-0 grid gap-1.5 text-ui-sm leading-[1.45] text-ink-muted">
            {location ? (
              <div className="flex min-w-0 items-start gap-1.5">
                <dt className="shrink-0 pt-px">
                  <MapPin size={14} aria-hidden="true" />
                  <span className="sr-only">{t("venue")}</span>
                </dt>
                <dd className="m-0 min-w-0 [overflow-wrap:anywhere]">
                  {location}
                </dd>
              </div>
            ) : null}
            {event.organizerName ? (
              <div className="flex min-w-0 items-start gap-1.5">
                <dt className="shrink-0 pt-px">
                  <Building2 size={14} aria-hidden="true" />
                  <span className="sr-only">{t("organizer")}</span>
                </dt>
                <dd className="m-0 min-w-0 [overflow-wrap:anywhere]">
                  {event.organizerName}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}
        <div className="flex flex-wrap gap-1.5 empty:hidden">
          <EventPriceBadge event={event} locale={locale} />
          <EventFreeFoodBadge event={event} />
        </div>
        <div className="relative z-10 mt-auto pt-2">
          <EventCalendarAction
            event={event}
            eventUrl={`${SITE_ORIGIN}${href}`}
          />
        </div>
      </div>
    </article>
  );
}
