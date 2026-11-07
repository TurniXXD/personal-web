"use client";

import { RotateCcw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ActionLink } from "@vantuch/ui";
import { SITE_PATH } from "@/lib/site/routes";

type EventsErrorProps = {
  reset: () => void;
};

/** Shown when the CMS fails before any cached page exists for this route. */
export default function EventsError({ reset }: EventsErrorProps) {
  const t = useTranslations("events.error");
  // Built inline: importing the site copy module would ship every catalog.
  const listingHref =
    useLocale() === "en" ? `/en${SITE_PATH.events}` : SITE_PATH.events;

  return (
    <main id="main-content" className="not-found-page" data-events-error>
      <div className="not-found-page__card" role="alert">
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="ui-action ui-action--primary"
          >
            <RotateCcw size={16} aria-hidden="true" />
            {t("retry")}
          </button>
          <ActionLink variant="secondary" href={listingHref}>
            {t("back")}
          </ActionLink>
        </div>
      </div>
    </main>
  );
}
