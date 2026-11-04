"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/browser";
import { usePathname } from "next/navigation";
import messages from "@/messages/global-error.json";
import { localeFromPathname } from "@/lib/site/locale-from-pathname";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const locale = localeFromPathname(usePathname());
  const copy = messages[locale];

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang={locale}>
      <body>
        <main className="global-error-page">
          <div className="global-error-page__card">
            <p className="global-error-page__label">{copy.label}</p>
            <h1>{copy.title}</h1>
            <p>{copy.description}</p>
            <button
              className="ui-action ui-action--primary"
              type="button"
              onClick={reset}
            >
              {copy.action}
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
