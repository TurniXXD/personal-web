import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/lib/site/content";
import { serviceDetailSlugs } from "@/lib/services/detail-content";
import { SITE_PATH, serviceDetailPath } from "@/lib/site/routes";

const siteUrl = "https://vantuch.dev";

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

  const baseEntries = paths.flatMap((path, index) => {
    const languages = {
      cs: `${siteUrl}${path || "/"}`,
      en: `${siteUrl}/en${path}`,
      "x-default": `${siteUrl}${path || "/"}`,
    };

    return [
      {
        url: languages.cs,
        changeFrequency: "monthly" as const,
        priority: index === 0 ? 1 : 0.7,
        alternates: { languages },
      },
      {
        url: languages.en,
        changeFrequency: "monthly" as const,
        priority: index === 0 ? 0.9 : 0.7,
        alternates: { languages },
      },
    ];
  });

  return baseEntries;
}
