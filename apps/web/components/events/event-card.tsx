import { Clock3, ExternalLink, Globe, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "cn";
import {
  EventCategoryBadge,
  EventFreeFoodBadge,
  EventPriceBadge,
  EventStatusBadge,
} from "@/components/events/event-badges";
import { EventCalendarAction } from "@/components/events/event-calendar-action";
import type { EventItem } from "@/lib/events/event-model";
import {
  formatEventCardDateBadge,
  formatEventCardLocation,
  formatEventCardTime,
  type EventLocale,
} from "@/lib/events/event-format";
import { localizedPath } from "@/lib/site/content";
import { SITE_ORIGIN, SITE_PATH } from "@/lib/site/routes";

type EventCardProps = {
  event: EventItem;
  locale: EventLocale;
  /** Localized labels keyed by category slug (from the CMS categories endpoint). */
  categoryLabels: Record<string, string>;
};

/** Cards stay compact; the remaining categories are still filterable. */
const MAX_CATEGORY_BADGES = 3;

/**
 * Whole-card navigation uses a stretched title link (`after:inset-0`), so the
 * calendar action stays a sibling link instead of nesting inside an anchor.
 */
export function EventCard({ event, locale, categoryLabels }: EventCardProps) {
  const t = useTranslations("events.card");
  // Cards open the organiser's page directly: registration when published,
  // otherwise the source page. Without either the card is not a link.
  const href = event.registrationUrl ?? event.sourceUrl;
  const date = formatEventCardDateBadge(event, locale);
  const time = formatEventCardTime(event, locale);
  const location = formatEventCardLocation(event);
  // The organiser's source page is always credited; it gets its own link when
  // the card itself opens the registration page instead.
  const sourceHost = event.sourceUrl
    ? new URL(event.sourceUrl).hostname.replace(/^www\./, "")
    : null;
  const categoryBadges = event.categories
    .slice(0, MAX_CATEGORY_BADGES)
    .map((slug) => {
      const label = slug === "ai" ? "AI" : (categoryLabels[slug] ?? slug);
      return {
        slug,
        label: label[0].toLocaleUpperCase(locale) + label.slice(1),
      };
    });

  return (
    <article
      data-event-card={event.slug}
      data-event-status={event.status}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-border-card bg-card shadow-[0_16px_40px_rgba(47,59,125,0.045)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-primary hover:bg-[#625bdf] hover:shadow-[0_1.4rem_3.4rem_rgba(66,58,164,0.24)] has-[:focus-visible]:border-primary has-[:focus-visible]:bg-[#625bdf] has-[:focus-visible]:shadow-[0_1.4rem_3.4rem_rgba(66,58,164,0.24)] has-[[data-event-card-link]:focus-visible]:outline-[3px] has-[[data-event-card-link]:focus-visible]:outline-offset-4 has-[[data-event-card-link]:focus-visible]:outline-[#5f6cff45]"
    >
      <div className="flex flex-1 flex-col gap-3 p-5 max-[600px]:p-[1.1rem]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {date && event.startsAt ? (
            <time
              dateTime={event.startsAt}
              data-event-date-badge
              className="inline-flex min-h-7 items-center rounded-full bg-secondary px-2.5 font-mono text-ui-xs font-bold text-primary"
            >
              {date}
            </time>
          ) : (
            <span className="inline-flex min-h-7 items-center rounded-full bg-secondary px-2.5 text-ui-xs font-bold text-primary">
              {t("dateUnknown")}
            </span>
          )}
          <div className="flex flex-wrap items-center gap-1.5">
            {categoryBadges.map((category) => (
              <EventCategoryBadge key={category.slug} label={category.label} />
            ))}
            <EventStatusBadge status={event.status} />
          </div>
        </div>
        <h3
          className={cn(
            "m-0 line-clamp-3 text-[1.12rem] leading-[1.35] font-semibold tracking-[-0.03em] text-ink-strong transition-colors duration-300 group-hover:text-white group-has-[:focus-visible]:text-white",
            event.status === "cancelled" && "line-through decoration-1",
          )}
        >
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-event-card-link
              title={event.title}
              className="outline-none after:absolute after:inset-0 after:z-0 after:content-['']"
            >
              {event.title}
              <ExternalLink
                size={14}
                aria-hidden="true"
                className="ml-1.5 inline-block align-[-0.08em] text-ink-muted transition-colors duration-300 group-hover:text-white group-has-[:focus-visible]:text-white"
              />
              <span className="sr-only"> {t("newWindow")}</span>
            </a>
          ) : (
            event.title
          )}
        </h3>
        <div className="mt-auto flex flex-col gap-3">
          {time || location || sourceHost ? (
            <dl className="m-0 grid gap-1.5 text-ui-sm leading-[1.45] text-ink-muted transition-colors duration-300 group-hover:text-white group-has-[:focus-visible]:text-white">
              {time && event.startsAt ? (
                <div className="flex min-w-0 items-start gap-1.5">
                  <dt className="shrink-0 pt-px">
                    <Clock3 size={14} aria-hidden="true" />
                    <span className="sr-only">{t("time")}</span>
                  </dt>
                  <dd className="m-0 min-w-0">
                    <time dateTime={event.startsAt} data-event-time>
                      {time}
                    </time>
                  </dd>
                </div>
              ) : null}
              {location ? (
                <div className="flex min-w-0 items-start gap-1.5">
                  <dt className="shrink-0 pt-px">
                    <MapPin size={14} aria-hidden="true" />
                    <span className="sr-only">{t("venue")}</span>
                  </dt>
                  <dd
                    className="m-0 min-w-0 line-clamp-2 [overflow-wrap:anywhere]"
                    title={location}
                  >
                    {location}
                  </dd>
                </div>
              ) : null}
              {sourceHost && event.sourceUrl ? (
                <div className="flex min-w-0 items-start gap-1.5">
                  <dt className="shrink-0 pt-px">
                    <Globe size={14} aria-hidden="true" />
                    <span className="sr-only">{t("source")}</span>
                  </dt>
                  <dd className="m-0 min-w-0 truncate" data-event-source>
                    {event.sourceUrl === href ? (
                      sourceHost
                    ) : (
                      <a
                        href={event.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 underline decoration-[rgba(95,108,255,0.35)] underline-offset-2 hover:decoration-current"
                      >
                        {sourceHost}
                        <span className="sr-only"> {t("newWindow")}</span>
                      </a>
                    )}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex min-w-0 flex-wrap items-center gap-1.5 empty:hidden">
              <EventPriceBadge event={event} locale={locale} />
              <EventFreeFoodBadge event={event} />
            </div>
            <EventCalendarAction
              event={event}
              eventUrl={
                href ??
                `${SITE_ORIGIN}${localizedPath(locale, SITE_PATH.events)}`
              }
              iconOnly
              className="relative z-10 ml-auto shrink-0"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
