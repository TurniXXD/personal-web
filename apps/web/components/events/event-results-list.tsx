"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ActionLink } from "@vantuch/ui";
import { EventListItems } from "@/components/events/event-list-items";
import type { EventLocale } from "@/lib/events/event-format";
import type { EventItem } from "@/lib/events/event-model";

type EventsPageResponse = {
  events: EventItem[];
  /** Listing query of the following page, or `null` on the last page. */
  nextSearch: string | null;
};

type EventResultsListProps = {
  /** Server-rendered items of the current URL page. */
  children: ReactNode;
  initialCount: number;
  /** No-JavaScript fallback link to the next page. */
  nextHref: string | null;
  laterPage: boolean;
  firstPageLink?: ReactNode;
  categoryLabels: Record<string, string>;
};

/**
 * "More events" appends the next page below the current cards without a
 * navigation, so the URL, scroll position and loaded cards stay put. The
 * link still works as plain pagination without JavaScript.
 */
export function EventResultsList({
  children,
  initialCount,
  nextHref: initialNextHref,
  laterPage,
  firstPageLink,
  categoryLabels,
}: EventResultsListProps) {
  const t = useTranslations("events");
  const locale = useLocale() as EventLocale;
  const listRef = useRef<HTMLUListElement>(null);
  const focusIndexRef = useRef<number | null>(null);
  const [pages, setPages] = useState<EventItem[][]>([]);
  const [count, setCount] = useState(initialCount);
  const [nextHref, setNextHref] = useState(initialNextHref);
  const [failed, setFailed] = useState(false);
  const [isPending, startTransition] = useTransition();

  // When the last page arrives the button disappears; continue on its cards.
  useEffect(() => {
    const index = focusIndexRef.current;
    if (index === null) return;
    focusIndexRef.current = null;
    listRef.current
      ?.querySelectorAll<HTMLElement>(":scope > li")
      [index]?.querySelector<HTMLElement>("[data-event-card-link]")
      ?.focus();
  }, [pages]);

  const onLoadMore = (event: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks open the next page in a new tab.
    if (
      !nextHref ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    if (isPending) return;
    const search = new URL(nextHref, window.location.href).search.slice(1);
    setFailed(false);
    startTransition(async () => {
      let page: EventsPageResponse;
      try {
        const response = await fetch(`/api/events?${search}`, {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error(String(response.status));
        page = await response.json();
      } catch {
        // The route already reported provider failures to Sentry.
        startTransition(() => setFailed(true));
        return;
      }
      startTransition(() => {
        if (!page.nextSearch) focusIndexRef.current = count;
        setPages((current) => [...current, page.events]);
        setCount((current) => current + page.events.length);
        setNextHref(
          page.nextSearch
            ? `${window.location.pathname}?${page.nextSearch}`
            : null,
        );
      });
    });
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p
          role="status"
          className="m-0 text-ui-sm font-bold text-ink-muted"
          data-events-count={count}
        >
          {laterPage ? `${t("listing.laterPage")} · ` : ""}
          {t("listing.resultsCount", { count })}
        </p>
        {nextHref ? (
          <p className="m-0 text-ui-xs text-ink-muted">
            {t("listing.moreAvailable")}
          </p>
        ) : null}
      </div>
      <ul
        ref={listRef}
        role="list"
        aria-busy={isPending}
        className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3"
        data-events-grid
      >
        {children}
        {pages.map((events, index) => (
          <EventListItems
            key={index}
            events={events}
            locale={locale}
            categoryLabels={categoryLabels}
          />
        ))}
      </ul>
      {nextHref || firstPageLink ? (
        <nav
          aria-label={t("pagination.label")}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {firstPageLink}
          {nextHref ? (
            <ActionLink
              variant="secondary"
              href={nextHref}
              rel="next"
              aria-disabled={isPending || undefined}
              onClick={onLoadMore}
              data-events-next
            >
              {isPending ? t("pagination.loading") : t("pagination.next")}
              {isPending ? (
                <LoaderCircle
                  size={16}
                  aria-hidden="true"
                  className="animate-spin motion-reduce:animate-none"
                />
              ) : (
                <ArrowRight size={16} aria-hidden="true" />
              )}
            </ActionLink>
          ) : null}
        </nav>
      ) : null}
      {failed ? (
        <p
          role="alert"
          className="mt-3 mb-0 text-center text-ui-sm text-destructive"
        >
          {t("pagination.loadError")}
        </p>
      ) : null}
    </>
  );
}
