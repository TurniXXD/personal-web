import type { Locale } from "@/lib/site/content";

export const localeFromPathname = (pathname: string | null): Locale =>
  pathname === "/en" || pathname?.startsWith("/en/") ? "en" : "cs";
