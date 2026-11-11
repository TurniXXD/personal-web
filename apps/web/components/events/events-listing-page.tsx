import { Suspense } from "react";
import { ArrowUpRight, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  ContactBlock,
  SiteFooter,
  SiteHeader,
} from "@/components/layout/site-chrome";
import { EventGridSkeleton } from "@/components/events/event-card-skeleton";
import { BrnoSkyline } from "@/components/events/brno-skyline";
import { EventsBackdrop } from "@/components/events/events-backdrop";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { EventFiltersForm } from "@/components/events/event-filters-form";
import { EventResults } from "@/components/events/event-results";
import { EventsInstagramLink } from "@/components/events/events-instagram-link";
import type { EventCategory } from "@/lib/events/event-model";
import { eventListHref, type EventListQuery } from "@/lib/events/event-filters";
import { localizedPath, type Locale } from "@/lib/site/content";
import { siteConfig } from "@/lib/site/config";
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
          <aside
            aria-labelledby="events-instagram-title"
            data-events-instagram
            className="relative mt-12 flex items-center gap-5 overflow-hidden rounded-[1.5rem] bg-primary px-6 py-5 text-white shadow-[0_1.25rem_3rem_rgba(85,92,240,0.22)] max-[600px]:grid max-[600px]:grid-cols-[3rem_minmax(0,1fr)] max-[600px]:items-center max-[600px]:gap-x-4 max-[600px]:gap-y-4 max-[600px]:px-5 max-[600px]:pt-5 max-[600px]:pb-[6.5rem]"
          >
            <BrnoSkyline className="pointer-events-none absolute right-[15.5rem] bottom-0 h-[72%] w-auto text-[#dce2ff] max-[1000px]:right-[13.5rem] max-[600px]:right-3 max-[600px]:h-[5.5rem] min-[601px]:max-[760px]:hidden" />
            <span
              aria-hidden="true"
              className="relative grid size-12 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10"
            >
              <Instagram size={22} strokeWidth={1.6} />
            </span>
            <div className="relative min-w-0 flex-1 max-[600px]:contents">
              <h2
                id="events-instagram-title"
                className="relative m-0 text-[1.2rem] leading-[1.3] font-medium tracking-[-0.03em] text-white"
              >
                {t("instagram.title")}
              </h2>
              <p className="relative mt-1 mb-0 max-w-[34rem] text-[0.875rem] leading-[1.5] text-white max-[600px]:col-span-2 max-[600px]:mt-0">
                {t("instagram.description")}
              </p>
            </div>
            <EventsInstagramLink
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex min-h-11 shrink-0 items-center justify-self-start rounded-full bg-white px-5 max-[600px]:col-span-2 text-ui-sm font-bold transition-colors duration-200 hover:bg-[#f3f4ff] focus-visible:outline-[3px] focus-visible:outline-offset-3 focus-visible:outline-white/60"
            >
              {/* Global `a { color: inherit }` outranks utilities on the link. */}
              <span className="inline-flex items-center gap-2 text-ink-strong">
                {t("instagram.action")}
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
              <span className="sr-only"> {t("instagram.newWindow")}</span>
            </EventsInstagramLink>
          </aside>
          <hr className="mt-12 mb-0 border-0 border-t border-border-soft" />
          <p
            className="mt-8 mb-0 max-w-[46rem] text-ui-sm leading-[1.55] text-ink-muted"
            data-events-disclaimer
          >
            {t("listing.disclaimer")}
          </p>
        </div>
        <ContactBlock
          locale={locale}
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
