import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";
import { EventGridSkeleton } from "@/components/events/event-card-skeleton";
import { EventFiltersForm } from "@/components/events/event-filters-form";
import { EventResults } from "@/components/events/event-results";
import type { EventCategory } from "@/lib/events/event-model";
import { eventListHref, type EventListQuery } from "@/lib/events/event-filters";
import { localizedPath, type Locale } from "@/lib/site/content";
import { SITE_PATH } from "@/lib/site/routes";

type EventsListingPageProps = {
  locale: Locale;
  query: EventListQuery;
  categories: EventCategory[];
};

export function EventsListingPage({
  locale,
  query,
  categories,
}: EventsListingPageProps) {
  const t = useTranslations("events");
  const chrome = useTranslations("siteChrome");
  const basePath = localizedPath(locale, SITE_PATH.events);
  const categoryLabels = Object.fromEntries(
    categories.map((category) => [category.slug, category.label]),
  );

  return (
    <>
      <SiteHeader locale={locale} path={SITE_PATH.events} />
      <main
        id="main-content"
        className="bg-[linear-gradient(145deg,#fff,#f5f7ff)]"
      >
        <div className="site-container pt-[clamp(3rem,7vw,5.5rem)] pb-[clamp(3.5rem,8vw,6rem)]">
          <header className="max-w-[46rem]">
            <p className="eyebrow">{t("listing.eyebrow")}</p>
            <h1 className="m-0 text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.08] tracking-[-0.06em] text-ink-strong">
              {t("listing.title")}
            </h1>
            <p className="mt-4 mb-0 max-w-[43rem] text-[1.05rem] leading-[1.7] text-[#596484]">
              {t("listing.subtitle")}
            </p>
          </header>

          <EventFiltersForm
            basePath={basePath}
            filters={query.filters}
            categories={categories}
          />

          <section aria-labelledby="events-results-title" className="mt-8">
            <h2 id="events-results-title" className="sr-only">
              {t("listing.resultsLabel")}
            </h2>
            {/* Keyed by the URL state so every filter change shows the skeleton. */}
            <Suspense
              key={eventListHref(basePath, query.filters, query.cursor)}
              fallback={<EventGridSkeleton label={t("filters.updating")} />}
            >
              <EventResults
                locale={locale}
                basePath={basePath}
                query={query}
                categoryLabels={categoryLabels}
              />
            </Suspense>
          </section>

          <p className="mt-14 mb-0 border-t border-border-soft pt-6 text-ui-sm leading-copy text-ink-muted">
            {t("listing.attribution", { brand: chrome("brandName") })}
          </p>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
