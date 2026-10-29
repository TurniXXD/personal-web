"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/browser";
import messages from "@/messages/global-error.json";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="mul">
      <body>
        <main className="global-error-page">
          <div className="global-error-page__card">
            <p className="global-error-page__label">{messages.label}</p>
            <h1>{messages.title}</h1>
            <p>{messages.description}</p>
            <button
              className="ui-action ui-action--primary"
              type="button"
              onClick={reset}
            >
              {messages.action}
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
