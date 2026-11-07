import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  CircleAlert,
  ExternalLink,
  MapPin,
  Tag,
  Ticket,
  UtensilsCrossed,
} from "lucide-react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ActionLink } from "@vantuch/ui";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";
import { StructuredDataScript } from "@/components/shared/structured-data-script";
import {
  EventCategoryBadge,
  EventFreeFoodBadge,
  EventPriceBadge,
  EventStatusBadge,
} from "@/components/events/event-badges";
import { EventCalendarAction } from "@/components/events/event-calendar-action";
import { EventCard } from "@/components/events/event-card";
import { EventCover } from "@/components/events/event-cover";
import type { EventItem } from "@/lib/events/event-model";
import {
  describeEventPrice,
  descriptionParagraphs,
  formatEventDateRange,
  formatEventLocation,
} from "@/lib/events/event-format";
import { optimizableEventImage } from "@/lib/events/event-images";
import { hasVerifiedFreeFood } from "@/lib/events/event-mapping";
import { createEventStructuredData } from "@/lib/seo/structured-data";
import { localizedPath, type Locale } from "@/lib/site/content";
import { SITE_ORIGIN, SITE_PATH, eventDetailPath } from "@/lib/site/routes";

type EventDetailPageProps = {
  locale: Locale;
  event: EventItem;
  categoryLabels: Record<string, string>;
  relatedEvents: EventItem[];
};

type DetailRowProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
};

function DetailRow({ icon, label, children }: DetailRowProps) {
  return (
    <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3 gap-y-0.5 border-b border-border-soft py-3.5 first:pt-0 last:border-b-0 last:pb-0">
      <span className="row-span-2 pt-0.5 text-primary" aria-hidden="true">
        {icon}
      </span>
      <dt className="text-ui-xs font-bold tracking-[0.02em] text-ink-muted">
        {label}
      </dt>
      <dd className="m-0 text-body-sm leading-[1.55] text-ink [overflow-wrap:anywhere]">
        {children}
      </dd>
    </div>
  );
}

export function EventDetailPage({
  locale,
  event,
  categoryLabels,
  relatedEvents,
}: EventDetailPageProps) {
  const t = useTranslations("events");
  const path = eventDetailPath(event.slug);
  const canonicalUrl = `${SITE_ORIGIN}${localizedPath(locale, path)}`;
  const listingHref = localizedPath(locale, SITE_PATH.events);
  const date = formatEventDateRange(event, locale);
  const location = formatEventLocation(event);
  const price = describeEventPrice(event, locale);
  const paragraphs = descriptionParagraphs(event.description);
  const categoryLabel = categoryLabels[event.category] ?? event.category;
  const structuredData = createEventStructuredData({
    event,
    url: canonicalUrl,
    imageUrl: optimizableEventImage(event.imageUrl),
  });
  const showRegistration =
    event.registrationUrl !== null && event.status !== "cancelled";

  return (
    <>
      <SiteHeader locale={locale} path={path} />
      <main
        id="main-content"
        className="bg-[linear-gradient(145deg,#fff,#f5f7ff)]"
      >
        <article
          className="site-container pt-[clamp(2rem,5vw,3.5rem)] pb-[clamp(3.5rem,8vw,6rem)]"
          data-event-detail={event.slug}
          data-event-status={event.status}
        >
          <a
            href={listingHref}
            className="inline-flex min-h-11 items-center gap-2 text-ui-sm font-bold text-[#4656cb] hover:text-primary"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t("detail.back")}
          </a>

          {event.status !== "scheduled" ? (
            <p
              data-event-status-notice={event.status}
              className="mt-4 mb-0 flex items-start gap-2 rounded-[0.9rem] border border-[#f3c6cf] bg-[#fdf2f4] px-4 py-3 text-body-sm font-bold text-[#8f1f33]"
            >
              <CircleAlert
                size={18}
                className="mt-px shrink-0"
                aria-hidden="true"
              />
              {event.status === "cancelled"
                ? t("detail.cancelledNotice")
                : t("detail.postponedNotice")}
            </p>
          ) : null}

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                {categoryLabel ? (
                  <EventCategoryBadge label={categoryLabel} />
                ) : null}
                <EventStatusBadge status={event.status} />
                <EventPriceBadge event={event} locale={locale} />
                <EventFreeFoodBadge event={event} />
              </div>
              <h1 className="mt-4 mb-0 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.1] tracking-[-0.055em] text-ink-strong [overflow-wrap:anywhere]">
                {event.title}
              </h1>
              {event.summary ? (
                <p className="mt-4 mb-0 max-w-[43rem] text-[1.05rem] leading-[1.7] text-[#596484]">
                  {event.summary}
                </p>
              ) : null}

              {optimizableEventImage(event.imageUrl) ? (
                <EventCover
                  event={event}
                  locale={locale}
                  alt={event.title}
                  sizes="(min-width: 1024px) 760px, 100vw"
                  priority
                  className="mt-8 rounded-card border border-border-card"
                />
              ) : null}

              <section aria-labelledby="event-about" className="mt-10">
                <h2
                  id="event-about"
                  className="m-0 text-[1.35rem] tracking-[-0.04em] text-ink-strong"
                >
                  {t("detail.about")}
                </h2>
                {paragraphs.length ? (
                  paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="mt-4 mb-0 max-w-[48rem] text-[0.95rem] leading-[1.8] whitespace-pre-line text-[#465073]"
                    >
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="mt-4 mb-0 max-w-[48rem] text-body-sm leading-copy text-ink-muted">
                    {t("detail.noDescription")}
                  </p>
                )}
              </section>

              {event.tags.length ? (
                <section aria-labelledby="event-tags" className="mt-8">
                  <h2
                    id="event-tags"
                    className="m-0 flex items-center gap-2 text-ui-sm font-bold text-ink-muted"
                  >
                    <Tag size={14} aria-hidden="true" />
                    {t("detail.tags")}
                  </h2>
                  <ul
                    role="list"
                    className="mt-3 mb-0 flex list-none flex-wrap gap-1.5 p-0"
                  >
                    {event.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border-soft bg-card px-2.5 py-1 text-ui-xs font-bold text-ink-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            <aside
              aria-label={t("detail.detailsLabel")}
              className="self-start rounded-[1.35rem] border border-border-card bg-card p-5 shadow-[0_16px_40px_rgba(47,59,125,0.06)] lg:sticky lg:top-28"
            >
              <dl className="m-0">
                <DetailRow
                  icon={<CalendarDays size={18} />}
                  label={t("detail.when")}
                >
                  {date && event.startsAt ? (
                    <time dateTime={event.startsAt}>{date}</time>
                  ) : (
                    t("card.dateUnknown")
                  )}
                </DetailRow>
                {location ? (
                  <DetailRow
                    icon={<MapPin size={18} />}
                    label={t("detail.where")}
                  >
                    {location}
                  </DetailRow>
                ) : null}
                {event.organizerName ? (
                  <DetailRow
                    icon={<Building2 size={18} />}
                    label={t("detail.organizer")}
                  >
                    {event.organizerName}
                  </DetailRow>
                ) : null}
                <DetailRow
                  icon={<Ticket size={18} />}
                  label={t("detail.price")}
                >
                  {price.kind === "free"
                    ? t("card.free")
                    : price.kind === "paid"
                      ? (price.amount ?? t("card.paid"))
                      : t("detail.priceUnknown")}
                </DetailRow>
                {hasVerifiedFreeFood(event) || event.foodDetails ? (
                  <DetailRow
                    icon={<UtensilsCrossed size={18} />}
                    label={t("detail.food")}
                  >
                    {hasVerifiedFreeFood(event) ? (
                      <span className="block font-bold">
                        <span aria-hidden="true">🍕 </span>
                        {t("card.freeFood")}
                      </span>
                    ) : null}
                    {event.foodDetails}
                  </DetailRow>
                ) : null}
              </dl>

              <div className="mt-6 grid gap-3">
                {showRegistration && event.registrationUrl ? (
                  <ActionLink
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                    data-event-registration
                  >
                    {t("detail.register")}
                    <ExternalLink size={16} aria-hidden="true" />
                  </ActionLink>
                ) : null}
                <EventCalendarAction
                  event={event}
                  eventUrl={canonicalUrl}
                  className="w-full justify-center"
                />
              </div>

              {event.sourceUrl ? (
                <p className="mt-5 mb-0 border-t border-border-soft pt-4 text-ui-xs leading-[1.6] text-ink-muted">
                  {t("detail.sourceNote")}{" "}
                  <a
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#4656cb] underline underline-offset-[0.18em] hover:text-primary"
                  >
                    {t("detail.source")}
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </p>
              ) : null}
            </aside>
          </div>

          {relatedEvents.length ? (
            <section
              aria-labelledby="event-related"
              className="mt-16 border-t border-border-soft pt-10"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2
                  id="event-related"
                  className="m-0 text-[1.35rem] tracking-[-0.04em] text-ink-strong"
                >
                  {t("detail.related")}
                </h2>
                <a
                  href={listingHref}
                  className="inline-flex min-h-11 items-center gap-1.5 text-ui-sm font-bold text-[#4656cb] hover:text-primary"
                >
                  {t("states.showAll")}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
              <ul
                role="list"
                className="mt-6 mb-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {relatedEvents.map((related) => (
                  <li key={related.slug} className="min-w-0">
                    <EventCard
                      event={related}
                      locale={locale}
                      categoryLabel={
                        categoryLabels[related.category] ?? related.category
                      }
                    />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </main>
      <SiteFooter locale={locale} />
      {structuredData ? <StructuredDataScript data={structuredData} /> : null}
    </>
  );
}
