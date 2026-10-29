import { getLocale, getTranslations } from "next-intl/server";
import { ActionLink } from "@vantuch/ui";
import { localizedPath, type Locale } from "@/lib/site/content";

export default async function NotFound() {
  const locale = ((await getLocale()) === "en" ? "en" : "cs") satisfies Locale;
  const t = await getTranslations("notFound");

  return (
    <main id="main-content" className="not-found-page">
      <div className="not-found-page__card">
        <p className="not-found-page__code">404</p>
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
        <ActionLink href={localizedPath(locale)}>{t("action")}</ActionLink>
      </div>
    </main>
  );
}
