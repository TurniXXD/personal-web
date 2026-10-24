"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/browser";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="mul">
      <body>
        <main className="global-error-page">
          <div className="global-error-page__card">
            <p className="global-error-page__label">
              NĚCO SE NEPOVEDLO / SOMETHING WENT WRONG
            </p>
            <h1>
              Stránku se nepodařilo načíst. / The page could not be loaded.
            </h1>
            <p>Zkuste načtení zopakovat. / Try loading the page again.</p>
            <button
              className="ui-action ui-action--primary"
              type="button"
              onClick={reset}
            >
              Zkusit znovu / Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
