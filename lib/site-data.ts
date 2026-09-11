import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Mail,
  Sparkles,
  UserRoundSearch,
} from "lucide-react";

export type RouteItem = {
  id: SectionId;
  title: string;
  icon: LucideIcon;
  summary: string;
  command: string;
};

export type SectionId = "about" | "work" | "capabilities" | "contact";

export const SECTION_IDS: SectionId[] = [
  "about",
  "work",
  "capabilities",
  "contact",
];

export type Project = {
  name: string;
  url?: string;
  imgUrl: string;
  meta?: string;
  description: string;
  imageFit?: "cover" | "contain";
  isAppio?: boolean;
  isProRocketeers?: boolean;
};

export type CapabilityCard = {
  title: string;
  summary: string;
  items: string[];
  accent: "violet" | "cyan" | "blue";
};

type Translator = (
  key: string,
  values?: Record<string, string | number>,
) => string;

export const getRouteItems = (t: Translator): RouteItem[] => [
  {
    id: "about",
    title: t("about.title"),
    icon: UserRoundSearch,
    summary: t("about.summary"),
    command: t("about.command"),
  },
  {
    id: "work",
    title: t("work.title"),
    icon: BriefcaseBusiness,
    summary: t("work.summary"),
    command: t("work.command"),
  },
  {
    id: "capabilities",
    title: t("capabilities.title"),
    icon: Sparkles,
    summary: t("capabilities.summary"),
    command: t("capabilities.command"),
  },
  {
    id: "contact",
    title: t("contact.title"),
    icon: Mail,
    summary: t("contact.summary"),
    command: t("contact.command"),
  },
];

export const isSectionId = (
  value: string | null | undefined,
): value is SectionId => SECTION_IDS.includes(value as SectionId);

export const getSectionFromNavigationParam = (
  value: string | null | undefined,
): SectionId | null => (isSectionId(value) ? value : null);

export const getProjects = (t: Translator): Project[] => [
  {
    name: t("projects.robe"),
    url: "https://www.robe.cz/",
    imgUrl: "/images/work/robe.png",
    description: t("projectDescriptions.robe"),
    isAppio: true,
  },
  {
    name: t("projects.kinedok"),
    url: "https://kinedok.net/",
    imgUrl: "/images/work/kinedok.png",
    description: t("projectDescriptions.kinedok"),
    isAppio: true,
  },
  {
    name: t("projects.revizio"),
    url: "https://www.revizio.app/",
    imgUrl: "/images/work/revizio.png",
    description: t("projectDescriptions.revizio"),
  },
  {
    name: t("projects.mycopod"),
    imgUrl: "/images/work/mycopod.png",
    meta: t("projectMeta.mycopod"),
    description: t("projectDescriptions.mycopod"),
    imageFit: "contain",
  },
  {
    name: t("projects.my213"),
    url: "https://www.my213.cz/",
    imgUrl: "/images/work/my213.png",
    description: t("projectDescriptions.my213"),
    isProRocketeers: true,
  },
  {
    name: t("projects.ondrasek"),
    url: "https://www.ondrasek.cz/",
    imgUrl: "/images/work/ondrasek.png",
    description: t("projectDescriptions.ondrasek"),
    isProRocketeers: true,
  },
];

export const getCapabilityCards = (t: Translator): CapabilityCard[] => [
  {
    title: t("cards.softwareEngineering.title"),
    summary: t("cards.softwareEngineering.summary"),
    items: [
      t("cards.softwareEngineering.items.react"),
      t("cards.softwareEngineering.items.next"),
      t("cards.softwareEngineering.items.typescript"),
      t("cards.softwareEngineering.items.node"),
      t("cards.softwareEngineering.items.go"),
    ],
    accent: "violet",
  },
  {
    title: t("cards.dataAnalysis.title"),
    summary: t("cards.dataAnalysis.summary"),
    items: [
      t("cards.dataAnalysis.items.python"),
      t("cards.dataAnalysis.items.sql"),
      t("cards.dataAnalysis.items.statistics"),
      t("cards.dataAnalysis.items.visualization"),
      t("cards.dataAnalysis.items.processing"),
    ],
    accent: "cyan",
  },
  {
    title: t("cards.backendSystems.title"),
    summary: t("cards.backendSystems.summary"),
    items: [
      t("cards.backendSystems.items.apis"),
      t("cards.backendSystems.items.postgresql"),
      t("cards.backendSystems.items.systemDesign"),
      t("cards.backendSystems.items.integrations"),
    ],
    accent: "blue",
  },
  {
    title: t("cards.hardwarePrototyping.title"),
    summary: t("cards.hardwarePrototyping.summary"),
    items: [
      t("cards.hardwarePrototyping.items.esp32"),
      t("cards.hardwarePrototyping.items.sensors"),
      t("cards.hardwarePrototyping.items.electronics"),
      t("cards.hardwarePrototyping.items.printing"),
      t("cards.hardwarePrototyping.items.cad"),
    ],
    accent: "violet",
  },
  {
    title: t("cards.biologyResearch.title"),
    summary: t("cards.biologyResearch.summary"),
    items: [
      t("cards.biologyResearch.items.mathematicalBiology"),
      t("cards.biologyResearch.items.biomedicine"),
      t("cards.biologyResearch.items.experimentalWork"),
    ],
    accent: "cyan",
  },
  {
    title: t("cards.infrastructure.title"),
    summary: t("cards.infrastructure.summary"),
    items: [
      t("cards.infrastructure.items.docker"),
      t("cards.infrastructure.items.linux"),
      t("cards.infrastructure.items.cicd"),
      t("cards.infrastructure.items.networking"),
    ],
    accent: "violet",
  },
];
