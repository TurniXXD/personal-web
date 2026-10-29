import type { Locale } from "@/lib/site/content";

export const SITE_PATH = {
  home: "",
  automation: "/automatizace",
  contact: "/kontakt",
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
