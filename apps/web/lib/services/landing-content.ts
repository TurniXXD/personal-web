import csWeb from "@/messages/services/landing/cs/web";
import csAi from "@/messages/services/landing/cs/ai";
import enWeb from "@/messages/services/landing/en/web";
import enAi from "@/messages/services/landing/en/ai";

import type { Locale } from "@/lib/site/content";

export type ServicePageKind = "web" | "ai";

export type ServiceIconName =
  | "browser"
  | "layout"
  | "bot"
  | "message"
  | "mail"
  | "file-scan"
  | "chart"
  | "network"
  | "gauge"
  | "code"
  | "shield"
  | "settings"
  | "store";

type ServiceItem = {
  icon: ServiceIconName;
  title: string;
  description: string;
  href?: string;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type RelatedLink = {
  title: string;
  description: string;
  href: string;
};

export type ServicePageCopy = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    secondary?: string;
  };
  offering: {
    eyebrow: string;
    title: string;
    description?: string;
    items: ServiceItem[];
  };
  benefits?: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
  projects?: {
    eyebrow: string;
    title: string;
    description: string;
  };
  flow?: {
    eyebrow: string;
    title: string;
    description: string;
    steps: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  related?: {
    eyebrow: string;
    title: string;
    note?: {
      title: string;
      description: string;
    };
    items: RelatedLink[];
  };
  contactTitle: string;
};

export const servicePageCopy: Record<
  ServicePageKind,
  Record<Locale, ServicePageCopy>
> = {
  web: { cs: csWeb, en: enWeb },
  ai: { cs: csAi, en: enAi },
};
