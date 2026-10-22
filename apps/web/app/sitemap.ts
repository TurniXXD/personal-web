import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/lib/content";
import { serviceDetailSlugs } from "@/lib/service-detail-content";

const siteUrl = "https://vantuch.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/automatizace",
    "/sluzby/webove-aplikace",
    "/sluzby/ai-reseni",
    ...serviceDetailSlugs.map((slug) => `/sluzby/${slug}`),
    "/kontakt",
    ...caseStudySlugs.map((slug) => `/work/${slug}`),
    "/doporuceni",
    "/privacy",
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
