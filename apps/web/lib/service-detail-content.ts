import csFiremniWeby from "./service-details/cs/firemni-weby";
import csWeboveAplikaceNaMiru from "./service-details/cs/webove-aplikace-na-miru";
import csShoptet from "./service-details/cs/shoptet";
import csCms from "./service-details/cs/cms";
import csApiIntegrace from "./service-details/cs/api-integrace";
import csVernostniProgramy from "./service-details/cs/vernostni-programy";
import csWebovaAnalytika from "./service-details/cs/webova-analytika";
import csCrm from "./service-details/cs/crm";
import csAuditAiAplikaci from "./service-details/cs/audit-ai-aplikaci";
import csDarkovePoukazy from "./service-details/cs/darkove-poukazy";
import enFiremniWeby from "./service-details/en/firemni-weby";
import enWeboveAplikaceNaMiru from "./service-details/en/webove-aplikace-na-miru";
import enShoptet from "./service-details/en/shoptet";
import enCms from "./service-details/en/cms";
import enApiIntegrace from "./service-details/en/api-integrace";
import enVernostniProgramy from "./service-details/en/vernostni-programy";
import enWebovaAnalytika from "./service-details/en/webova-analytika";
import enCrm from "./service-details/en/crm";
import enAuditAiAplikaci from "./service-details/en/audit-ai-aplikaci";
import enDarkovePoukazy from "./service-details/en/darkove-poukazy";

import type { Locale } from "@/lib/content";

export const allServiceDetailSlugs = [
  "firemni-weby",
  "webove-aplikace-na-miru",
  "shoptet",
  "cms",
  "api-integrace",
  "vernostni-programy",
  "webova-analytika",
  "crm",
  "audit-ai-aplikaci",
  "darkove-poukazy",
] as const;

export type ServiceDetailSlug = (typeof allServiceDetailSlugs)[number];

export const serviceDetailSlugs = [
  "firemni-weby",
  "webove-aplikace-na-miru",
  "shoptet",
  "vernostni-programy",
  "audit-ai-aplikaci",
  "darkove-poukazy",
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
