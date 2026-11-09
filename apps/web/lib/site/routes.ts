import type { Locale } from "@/lib/site/content";

export const SITE_ORIGIN = "https://www.vantuch.dev";

export const SITE_PATH = {
  home: "",
  automation: "/automatizace",
  contact: "/kontakt",
  events: "/akce",
  privacy: "/privacy",
  referral: "/doporuceni",
  services: {
    ai: "/sluzby/ai-reseni",
    webApplications: "/sluzby/webove-aplikace",
  },
  sections: {
    about: "#about",
    contact: "#contact",
    process: "#process",
    services: "#services",
    work: "#work",
  },
  work: "/work",
} as const;

export const SERVICE_SLUG = {
  aiApplicationAudit: "audit-ai-aplikaci",
  apiIntegration: "api-integrace",
  cms: "cms",
  companyWebsites: "firemni-weby",
  crm: "crm",
  customWebApplications: "webove-aplikace-na-miru",
  giftVouchers: "darkove-poukazy",
  loyaltyProgrammes: "vernostni-programy",
  shoptet: "shoptet",
  webAnalytics: "webova-analytika",
} as const;

export type ServiceSlug = (typeof SERVICE_SLUG)[keyof typeof SERVICE_SLUG];

export const SERVICE_SLUG_BY_LOCALE: Record<
  Locale,
  Record<ServiceSlug, string>
> = {
  cs: {
    [SERVICE_SLUG.aiApplicationAudit]: "audit-ai-aplikaci",
    [SERVICE_SLUG.apiIntegration]: "api-integrace",
    [SERVICE_SLUG.cms]: "cms",
    [SERVICE_SLUG.companyWebsites]: "firemni-weby",
    [SERVICE_SLUG.crm]: "crm",
    [SERVICE_SLUG.customWebApplications]: "webove-aplikace-na-miru",
    [SERVICE_SLUG.giftVouchers]: "darkove-poukazy",
    [SERVICE_SLUG.loyaltyProgrammes]: "vernostni-programy",
    [SERVICE_SLUG.shoptet]: "shoptet",
    [SERVICE_SLUG.webAnalytics]: "webova-analytika",
  },
  en: {
    [SERVICE_SLUG.aiApplicationAudit]: "ai-application-audit",
    [SERVICE_SLUG.apiIntegration]: "api-integration",
    [SERVICE_SLUG.cms]: "cms",
    [SERVICE_SLUG.companyWebsites]: "company-websites",
    [SERVICE_SLUG.crm]: "crm",
    [SERVICE_SLUG.customWebApplications]: "custom-web-applications",
    [SERVICE_SLUG.giftVouchers]: "gift-vouchers",
    [SERVICE_SLUG.loyaltyProgrammes]: "loyalty-programmes",
    [SERVICE_SLUG.shoptet]: "shoptet",
    [SERVICE_SLUG.webAnalytics]: "web-analytics",
  },
};

export const SERVICE_SECTION_ID = {
  administration: ["administrace", "administration"],
  auditScope: "co-proverim",
  workflow: "jak-to-funguje",
} as const;

export const serviceDetailPath = (slug: ServiceSlug) => `/sluzby/${slug}`;

/**
 * English URL segments for the Czech route folders. Routes are authored with
 * Czech paths (`SITE_PATH`); `localizedPath` and the next-intl pathnames map
 * both read these so links, canonicals and rewrites stay in sync.
 */
const EN_SEGMENT: Record<string, string> = {
  akce: "events",
  automatizace: "automation",
  doporuceni: "referrals",
  kontakt: "contact",
  sluzby: "services",
};

const EN_SERVICE_SEGMENT: Record<string, string> = {
  "ai-reseni": "ai-solutions",
  "webove-aplikace": "web-applications",
  ...SERVICE_SLUG_BY_LOCALE.en,
};

/** Translates a Czech route path (optionally with `?query` or `#hash`) to English. */
export function englishPath(path: string) {
  const suffixStart = path.search(/[?#]/);
  const pathname = suffixStart === -1 ? path : path.slice(0, suffixStart);
  const suffix = suffixStart === -1 ? "" : path.slice(suffixStart);
  const segments = pathname.split("/");
  const [, first, second] = segments;
  if (first && EN_SEGMENT[first]) segments[1] = EN_SEGMENT[first];
  if (first === "sluzby" && second && EN_SERVICE_SEGMENT[second]) {
    segments[2] = EN_SERVICE_SEGMENT[second];
  }
  return segments.join("/") + suffix;
}

/** Resolves an English service slug from the URL back to its stable slug. */
export function serviceSlugFromEnglish(slug: string): ServiceSlug | undefined {
  return (Object.keys(SERVICE_SLUG_BY_LOCALE.en) as ServiceSlug[]).find(
    (key) => SERVICE_SLUG_BY_LOCALE.en[key] === slug,
  );
}

/** next-intl pathnames: internal (Czech folder) path → public path per locale. */
export const LOCALIZED_PATHNAMES = {
  "/": "/",
  "/privacy": "/privacy",
  "/work/[slug]": "/work/[slug]",
  "/akce": { cs: "/akce", en: "/events" },
  "/automatizace": { cs: "/automatizace", en: "/automation" },
  "/doporuceni": { cs: "/doporuceni", en: "/referrals" },
  "/kontakt": { cs: "/kontakt", en: "/contact" },
  "/sluzby/ai-reseni": {
    cs: "/sluzby/ai-reseni",
    en: "/services/ai-solutions",
  },
  "/sluzby/webove-aplikace": {
    cs: "/sluzby/webove-aplikace",
    en: "/services/web-applications",
  },
  "/sluzby/[slug]": { cs: "/sluzby/[slug]", en: "/services/[slug]" },
} as const;
