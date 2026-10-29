import csFiremniWeby from "@/messages/services/details/cs/firemni-weby";
import csWeboveAplikaceNaMiru from "@/messages/services/details/cs/webove-aplikace-na-miru";
import csShoptet from "@/messages/services/details/cs/shoptet";
import csCms from "@/messages/services/details/cs/cms";
import csApiIntegrace from "@/messages/services/details/cs/api-integrace";
import csVernostniProgramy from "@/messages/services/details/cs/vernostni-programy";
import csWebovaAnalytika from "@/messages/services/details/cs/webova-analytika";
import csCrm from "@/messages/services/details/cs/crm";
import csAuditAiAplikaci from "@/messages/services/details/cs/audit-ai-aplikaci";
import csDarkovePoukazy from "@/messages/services/details/cs/darkove-poukazy";
import enFiremniWeby from "@/messages/services/details/en/firemni-weby";
import enWeboveAplikaceNaMiru from "@/messages/services/details/en/webove-aplikace-na-miru";
import enShoptet from "@/messages/services/details/en/shoptet";
import enCms from "@/messages/services/details/en/cms";
import enApiIntegrace from "@/messages/services/details/en/api-integrace";
import enVernostniProgramy from "@/messages/services/details/en/vernostni-programy";
import enWebovaAnalytika from "@/messages/services/details/en/webova-analytika";
import enCrm from "@/messages/services/details/en/crm";
import enAuditAiAplikaci from "@/messages/services/details/en/audit-ai-aplikaci";
import enDarkovePoukazy from "@/messages/services/details/en/darkove-poukazy";

import type { Locale } from "@/lib/site/content";
import { SERVICE_SLUG } from "@/lib/site/routes";

export const allServiceDetailSlugs = [
  SERVICE_SLUG.companyWebsites,
  SERVICE_SLUG.customWebApplications,
  SERVICE_SLUG.shoptet,
  SERVICE_SLUG.cms,
  SERVICE_SLUG.apiIntegration,
  SERVICE_SLUG.loyaltyProgrammes,
  SERVICE_SLUG.webAnalytics,
  SERVICE_SLUG.crm,
  SERVICE_SLUG.aiApplicationAudit,
  SERVICE_SLUG.giftVouchers,
] as const;

export type ServiceDetailSlug = (typeof allServiceDetailSlugs)[number];

export const serviceDetailSlugs = [
  SERVICE_SLUG.companyWebsites,
  SERVICE_SLUG.customWebApplications,
  SERVICE_SLUG.shoptet,
  SERVICE_SLUG.loyaltyProgrammes,
  SERVICE_SLUG.aiApplicationAudit,
  SERVICE_SLUG.giftVouchers,
] as const satisfies readonly ServiceDetailSlug[];

export type PublicServiceDetailSlug = (typeof serviceDetailSlugs)[number];

export type ServiceDetailItem = {
  title: string;
  description: string;
  note?: string;
};

export type ServiceDetailSection = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "soft" | "navy";
  layout?: "cards" | "list";
  items: ServiceDetailItem[];
};

export type ServiceDetailCopy = {
  meta: { title: string; description: string };
  name: string;
  hero: {
    eyebrow: string;
    title: string;
    highlight?: string;
    description: string;
    primary: string;
    secondary: string;
    secondaryHref?: string;
  };
  visual: {
    badge: string;
    title: string;
    items: string[];
    signal?: string;
    topChip?: string;
    bottomChip?: string;
  };
  benefits: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceDetailItem[];
  };
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ServiceDetailItem[];
  };
  demo?: "loyalty" | "voucher";
  demoCopy?: {
    eyebrow: string;
    title: string;
    description?: string;
  };
  sections: ServiceDetailSection[];
  useCases?: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceDetailItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  related: ServiceDetailSlug[];
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  };
};

const cs: Record<ServiceDetailSlug, ServiceDetailCopy> = {
  "firemni-weby": csFiremniWeby,
  "webove-aplikace-na-miru": csWeboveAplikaceNaMiru,
  shoptet: csShoptet,
  cms: csCms,
  "api-integrace": csApiIntegrace,
  "vernostni-programy": csVernostniProgramy,
  "webova-analytika": csWebovaAnalytika,
  crm: csCrm,
  "audit-ai-aplikaci": csAuditAiAplikaci,
  "darkove-poukazy": csDarkovePoukazy,
};

const en: Record<ServiceDetailSlug, ServiceDetailCopy> = {
  "firemni-weby": enFiremniWeby,
  "webove-aplikace-na-miru": enWeboveAplikaceNaMiru,
  shoptet: enShoptet,
  cms: enCms,
  "api-integrace": enApiIntegrace,
  "vernostni-programy": enVernostniProgramy,
  "webova-analytika": enWebovaAnalytika,
  crm: enCrm,
  "audit-ai-aplikaci": enAuditAiAplikaci,
  "darkove-poukazy": enDarkovePoukazy,
};

export const serviceDetailCopy: Record<
  Locale,
  Record<ServiceDetailSlug, ServiceDetailCopy>
> = { cs, en };

export const isServiceDetailSlug = (
  value: string,
): value is PublicServiceDetailSlug =>
  serviceDetailSlugs.includes(value as PublicServiceDetailSlug);
