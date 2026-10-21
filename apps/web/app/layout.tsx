import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import "@vantuch/ui/styles.css";
import "@/app/globals.css";
import { CookieConsent } from "@/components/cookie-consent";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        {children}
        <CookieConsent
          locale={locale === "en" ? "en" : "cs"}
          clarityProjectId={process.env.CLARITY_PROJECT_ID?.trim()}
          cloudflareAnalyticsToken={process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim()}
        />
      </body>
    </html>
  );
}
