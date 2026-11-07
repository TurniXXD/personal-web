"use client";

import { useLocale, useTranslations } from "next-intl";
import { ActionLink } from "@vantuch/ui";
import { SITE_PATH } from "@/lib/site/routes";

// A client boundary reads the locale from the intl provider. A server version
// would call `getLocale()`, which falls back to request headers and breaks
// on-demand static generation (ISR) of event pages.
export default function EventNotFound() {
  const t = useTranslations("events.notFound");
  const listingHref =
    useLocale() === "en" ? `/en${SITE_PATH.events}` : SITE_PATH.events;

  return (
    <main id="main-content" className="not-found-page" data-event-not-found>
      <div className="not-found-page__card">
        <p className="not-found-page__code">404</p>
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
        <ActionLink href={listingHref}>{t("action")}</ActionLink>
      </div>
    </main>
  );
}
