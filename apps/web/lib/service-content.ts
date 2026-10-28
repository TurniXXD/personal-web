import csWeb from "./service-copy/csWeb";
import csAi from "./service-copy/csAi";
import enWeb from "./service-copy/enWeb";
import enAi from "./service-copy/enAi";

import type { Locale } from "@/lib/content";

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
