import { ArrowLeft, RotateCcw } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ActionLink } from "@vantuch/ui";
import { EventListItems } from "@/components/events/event-list-items";
import { EventResultsList } from "@/components/events/event-results-list";
import { EventsState } from "@/components/events/events-state";
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
    <EventResultsList
      initialCount={page.events.length}
      nextHref={
        page.nextCursor
          ? eventListHref(basePath, filters, page.nextCursor)
          : null
      }
      laterPage={Boolean(cursor)}
      categoryLabels={categoryLabels}
      firstPageLink={
        cursor ? (
          <a
            href={eventListHref(basePath, filters)}
            className="inline-flex min-h-11 items-center gap-1.5 text-ui-sm font-bold text-[#4656cb] underline underline-offset-[0.18em] hover:text-primary"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            {t("pagination.first")}
          </a>
        ) : undefined
      }
    >
      <EventListItems
        events={page.events}
        locale={locale}
        categoryLabels={categoryLabels}
      />
    </EventResultsList>
  );
}
