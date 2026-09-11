import type { MetadataRoute } from "next";

const siteUrl = "https://www.vantuch.dev";

const languageAlternates = {
  cs: `${siteUrl}/`,
  en: `${siteUrl}/en`,
  "x-default": `${siteUrl}/`,
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: languageAlternates,
      },
    },
    {
      url: `${siteUrl}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: languageAlternates,
      },
    },
  ];
}
