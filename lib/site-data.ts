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
  url: string;
  imgUrl: string;
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
    isAppio: true,
  },
  {
    name: t("projects.kinedok"),
    url: "https://kinedok.net/",
    imgUrl: "/images/work/kinedok.png",
    isAppio: true,
  },
  {
    name: t("projects.revizio"),
    url: "https://www.revizio.app/",
    imgUrl: "/images/work/revizio.png",
  },
  {
    name: t("projects.my213"),
    url: "https://www.my213.cz/",
    imgUrl: "/images/work/my213.png",
    isProRocketeers: true,
  },
  {
    name: t("projects.ondrasek"),
    url: "https://www.ondrasek.cz/",
    imgUrl: "/images/work/ondrasek.png",
    isProRocketeers: true,
  },
  {
    name: t("projects.seedr"),
    url: "https://www.prorocketeers.com/startups/seedr",
    imgUrl: "/images/work/seedr.avif",
    isProRocketeers: true,
  },
];

export const getCapabilityCards = (t: Translator): CapabilityCard[] => [
  {
    title: t("cards.productDesign.title"),
    summary: t("cards.productDesign.summary"),
    items: [
      t("cards.productDesign.items.productThinking"),
      t("cards.productDesign.items.uiux"),
      t("cards.productDesign.items.prototyping"),
      t("cards.productDesign.items.clientCommunication"),
    ],
    accent: "violet",
  },
  {
    title: t("cards.frontend.title"),
    summary: t("cards.frontend.summary"),
    items: [
      t("cards.frontend.items.react"),
      t("cards.frontend.items.next"),
      t("cards.frontend.items.typescript"),
      t("cards.frontend.items.performance"),
    ],
    accent: "cyan",
  },
  {
    title: t("cards.backend.title"),
    summary: t("cards.backend.summary"),
    items: [
      t("cards.backend.items.node"),
      t("cards.backend.items.python"),
      t("cards.backend.items.go"),
      t("cards.backend.items.rest"),
      t("cards.backend.items.graphql"),
      t("cards.backend.items.postgresql"),
      t("cards.backend.items.systemDesign"),
    ],
    accent: "blue",
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
