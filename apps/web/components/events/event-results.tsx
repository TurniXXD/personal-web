import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ActionLink } from "@vantuch/ui";
import { EventCard } from "@/components/events/event-card";
import { EventsState } from "@/components/events/events-state";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import {
  eventListHref,
  hasActiveEventFilters,
  type EventListQuery,
} from "@/lib/events/event-filters";
import type { EventLocale } from "@/lib/events/event-format";
import { getEvents } from "@/lib/events/events-data";
import { isContentApiError } from "@/lib/integrations/content-api";

type EventResultsProps = {
  locale: EventLocale;
  basePath: string;
  query: EventListQuery;
  categoryLabels: Record<string, string>;
};

/** Loads one API page for the current URL filters and renders it. */
export async function EventResults({
  locale,
  basePath,
  query,
  categoryLabels,
}: EventResultsProps) {
  const t = await getTranslations("events");
  const { filters, cursor } = query;
  const filtered = hasActiveEventFilters(filters);

  let page;
  try {
    page = await getEvents({ filters, cursor });
  } catch (error) {
    // The data layer already reported the failure to Sentry.
    const invalidLink =
      isContentApiError(error) && error.status === 400 && (cursor || filtered);
    return (
      <EventsState
        kind="error"
        title={
          invalidLink ? t("states.invalidTitle") : t("states.unavailableTitle")
        }
        description={
          invalidLink ? t("states.invalidText") : t("states.unavailableText")
        }
        action={
          <ActionLink
            variant="secondary"
            href={
              invalidLink ? basePath : eventListHref(basePath, filters, cursor)
            }
          >
            <RotateCcw size={16} aria-hidden="true" />
            {invalidLink ? t("states.showAll") : t("states.retry")}
          </ActionLink>
        }
      />
    );
  }

  if (page.events.length === 0) {
    return (
      <>
        <p role="status" className="sr-only">
          {t("listing.resultsCount", { count: 0 })}
        </p>
        {filtered || cursor ? (
          <EventsState
            kind="filtered-empty"
            title={t("states.emptyFilteredTitle")}
            description={t("states.emptyFilteredText")}
            action={
              <ActionLink variant="secondary" href={basePath}>
                <RotateCcw size={16} aria-hidden="true" />
                {t("filters.reset")}
              </ActionLink>
            }
          />
        ) : (
          <EventsState
            kind="empty"
            title={t("states.emptyTitle")}
            description={t("states.emptyText")}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p
          role="status"
          className="m-0 text-ui-sm font-bold text-ink-muted"
          data-events-count={page.events.length}
        >
          {cursor ? `${t("listing.laterPage")} · ` : ""}
          {t("listing.resultsCount", { count: page.events.length })}
        </p>
        {page.nextCursor ? (
          <p className="m-0 text-ui-xs text-ink-muted">
            {t("listing.moreAvailable")}
          </p>
        ) : null}
      </div>
      <ul
        role="list"
        className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-events-grid
      >
        {page.events.map((event, index) => (
          <li key={event.slug} className="min-w-0">
            {/* Cards reveal per row, staggered by column (max four columns). */}
            <ScrollReveal className="h-full" delay={(index % 4) * 70}>
              <EventCard
                event={event}
                locale={locale}
                categoryLabel={categoryLabels[event.category] ?? event.category}
              />
            </ScrollReveal>
          </li>
        ))}
      </ul>
      {page.nextCursor || cursor ? (
        <nav
          aria-label={t("pagination.label")}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {cursor ? (
            <a
              href={eventListHref(basePath, filters)}
              className="inline-flex min-h-11 items-center gap-1.5 text-ui-sm font-bold text-[#4656cb] underline underline-offset-[0.18em] hover:text-primary"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              {t("pagination.first")}
            </a>
          ) : null}
          {page.nextCursor ? (
            <ActionLink
              variant="secondary"
              href={eventListHref(basePath, filters, page.nextCursor)}
              rel="next"
              data-events-next
            >
              {t("pagination.next")}
              <ArrowRight size={16} aria-hidden="true" />
            </ActionLink>
          ) : null}
        </nav>
      ) : null}
    </>
  );
}
