import { defineRouting } from "next-intl/routing";
import { LOCALIZED_PATHNAMES } from "@/lib/site/routes";

export const routing = defineRouting({
  locales: ["cs", "en"],
  defaultLocale: "cs",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: LOCALIZED_PATHNAMES,
});
