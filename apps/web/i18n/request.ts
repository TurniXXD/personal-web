import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  const [messages, site] = await Promise.all([
    import(`../messages/${locale}.json`).then((module) => module.default),
    import(`../messages/site/${locale}.ts`).then((module) => module.default),
  ]);

  return { locale, messages: { ...messages, site } };
});
