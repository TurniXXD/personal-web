import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "cs"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
  localeCookie: {
    name: "NEXT_LOCALE",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  },
});

