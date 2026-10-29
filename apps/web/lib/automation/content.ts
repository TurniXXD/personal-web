import cs from "@/messages/automation/cs";
import en from "@/messages/automation/en";
import ecommerceAndCustomerCommunication from "@/messages/automation/examples/ecommerce-and-customer-communication";
import socialContentAndBusinessWorkflows from "@/messages/automation/examples/social-content-and-business-workflows";
import documentsReportingAndMonitoring from "@/messages/automation/examples/documents-reporting-and-monitoring";

import type { AutomationIconName } from "@/components/automation/automation-icon";
import type { Locale } from "@/lib/site/content";

export type AutomationCategoryId =
  | "email-marketing"
  | "ecommerce"
  | "social"
  | "ai-documents"
  | "business-processes"
  | "data-reporting";

export type AutomationExample = {
  id: string;
  number: string;
  categories: AutomationCategoryId[];
  icon: AutomationIconName;
  usesAi?: boolean;
  title: string;
  description: string;
  trigger: string;
  workflow: string[];
  benefit: string;
  details: string[];
  examples?: string[];
  note?: string;
};

export type LocalizedExample = Omit<
  AutomationExample,
  | "title"
  | "description"
  | "trigger"
  | "workflow"
  | "benefit"
  | "details"
  | "examples"
  | "note"
> & {
  cs: Omit<
    AutomationExample,
    "id" | "number" | "categories" | "icon" | "usesAi"
  >;
  en: Omit<
    AutomationExample,
    "id" | "number" | "categories" | "icon" | "usesAi"
  >;
};

export type AutomationPageCopy = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primary: string;
    secondary: string;
    visualEyebrow: string;
    visualTitle: string;
    visualItems: [string, string, string];
    visualNote: string;
  };
  catalog: {
    eyebrow: string;
    title: string;
    description: string;
    all: string;
    showMore: string;
    categories: Record<AutomationCategoryId, string>;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: Array<{ number: string; title: string; description: string }>;
  };
  contactTitle: string;
};

export const automationPageCopy: Record<Locale, AutomationPageCopy> = {
  cs,
  en,
};

const examples: LocalizedExample[] = [
  ...ecommerceAndCustomerCommunication,
  ...socialContentAndBusinessWorkflows,
  ...documentsReportingAndMonitoring,
];

export const getAutomationExamples = (locale: Locale): AutomationExample[] =>
  examples.map(({ cs, en, ...shared }) => ({
    ...shared,
    ...(locale === "cs" ? cs : en),
  }));
