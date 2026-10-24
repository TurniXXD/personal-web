import { getLocale } from "next-intl/server";
import { ActionLink } from "@vantuch/ui";
import { localizedPath, type Locale } from "@/lib/content";

export default async function NotFound() {
  const locale = ((await getLocale()) === "en" ? "en" : "cs") satisfies Locale;

  return (
    <main id="main-content" className="not-found-page">
      <div className="not-found-page__card">
        <p className="not-found-page__code">404</p>
        <h1>
          {locale === "cs"
            ? "Tahle stránka tu není."
            : "This page is not here."}
        </h1>
        <p>
          {locale === "cs"
            ? "Odkaz může být zastaralý nebo se stránka přesunula. Vraťte se na úvod a pokračujte odtud."
            : "The link may be outdated or the page may have moved. Return home and continue from there."}
        </p>
        <ActionLink href={localizedPath(locale)}>
          {locale === "cs" ? "Zpět na úvod" : "Back to home"}
        </ActionLink>
      </div>
    </main>
  );
}
