import { useMessages } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Locale, SiteCopy } from "@/lib/site/content";

// The site catalog lives in the next-intl messages under the `site` namespace.
// It stays server-only: the locale layout leaves it out of the client provider.

export function useSiteCopy(): SiteCopy {
  return useMessages().site as unknown as SiteCopy;
}

export async function getSiteCopy(locale: Locale): Promise<SiteCopy> {
  const messages = await getMessages({ locale });
  return messages.site as unknown as SiteCopy;
}
