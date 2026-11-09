import { Suspense } from "react";
import { useTranslations } from "next-intl";
import {
  ContactBlock,
  SiteFooter,
  SiteHeader,
} from "@/components/layout/site-chrome";
import { EventGridSkeleton } from "@/components/events/event-card-skeleton";
import { EventsBackdrop } from "@/components/events/events-backdrop";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
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
  const basePath = localizedPath(locale, SITE_PATH.events);
  const categoryLabels = Object.fromEntries(
    categories.map((category) => [category.slug, category.label]),
  );

  return (
    <>
      <SiteHeader locale={locale} path={SITE_PATH.events} />
      <main
        id="main-content"
        className="relative overflow-x-clip bg-[linear-gradient(145deg,#fff,#f5f7ff)]"
      >
        <EventsBackdrop className="h-[44rem]" />
        {/* Header region stacks above the results so the city list can overlap them. */}
        <div className="relative z-[2]">
          <div className="site-container relative z-[1] pt-[clamp(3rem,7vw,5.5rem)]">
            <ScrollReveal>
              <h1 className="m-0 text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.08] tracking-[-0.06em] text-ink-strong">
                {t("listing.title")}
              </h1>
              <p className="mt-4 mb-0 max-w-[46rem] text-[clamp(1rem,1.6vw,1.15rem)] leading-[1.6] text-ink-muted">
                {t("listing.subtitle")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={90} className="relative z-10">
              <EventFiltersForm
                basePath={basePath}
                filters={query.filters}
                categories={categories}
              />
            </ScrollReveal>
          </div>
        </div>

        <div className="site-container relative z-[1] pb-[clamp(3.5rem,8vw,6rem)]">
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
          <p
            className="mt-10 mb-0 max-w-[46rem] text-ui-sm leading-[1.55] text-ink-muted"
            data-events-disclaimer
          >
            {t("listing.disclaimer")}
          </p>
        </div>
        <ContactBlock
          locale={locale}
          eyebrow={t("cta.eyebrow")}
          title={t("cta.title")}
          description={t("cta.description")}
          topic={t("cta.topic")}
          requestType="service"
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
