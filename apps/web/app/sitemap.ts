import type { MetadataRoute } from "next";
import { caseStudySlugs, localizedPath } from "@/lib/site/content";
import { serviceDetailSlugs } from "@/lib/services/detail-content";
import { SITE_ORIGIN, SITE_PATH, serviceDetailPath } from "@/lib/site/routes";

const siteUrl = SITE_ORIGIN;
type SitemapEntryParams = {
  path: string;
  changeFrequency: "daily" | "monthly";
  priority: { cs: number; en: number };
};

const localizedEntries = ({
  path,
  changeFrequency,
  priority,
}: SitemapEntryParams): MetadataRoute.Sitemap => {
  const languages = {
    cs: `${siteUrl}${path || "/"}`,
    en: `${siteUrl}${localizedPath("en", path)}`,
    "x-default": `${siteUrl}${path || "/"}`,
  };
  const shared = {
    changeFrequency,
    alternates: { languages },
  };
  return [
    { url: languages.cs, priority: priority.cs, ...shared },
    { url: languages.en, priority: priority.en, ...shared },
  ];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    SITE_PATH.home,
    SITE_PATH.automation,
    SITE_PATH.services.webApplications,
    SITE_PATH.services.ai,
    ...serviceDetailSlugs.map(serviceDetailPath),
    SITE_PATH.contact,
    ...caseStudySlugs.map((slug) => `${SITE_PATH.work}/${slug}`),
    SITE_PATH.referral,
    SITE_PATH.privacy,
  ];

  const baseEntries = paths.flatMap((path, index) =>
    localizedEntries({
      path,
      changeFrequency: "monthly",
      priority: index === 0 ? { cs: 1, en: 0.9 } : { cs: 0.7, en: 0.7 },
    }),
  );

  const eventEntries = localizedEntries({
    path: SITE_PATH.events,
    changeFrequency: "daily",
    priority: { cs: 0.8, en: 0.6 },
  });

  return [...baseEntries, ...eventEntries];
}
