"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

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
    <html lang="cs">
      <body>
        <main style={{ padding: "3rem", fontFamily: "system-ui, sans-serif" }}>
          <h1>Stránku se nepodařilo načíst.</h1>
          <p>Zkuste to prosím znovu. / Please try again.</p>
          <button type="button" onClick={reset}>
            Zkusit znovu / Try again
          </button>
        </main>
      </body>
    </html>
  );
}
