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
  href: string;
  icon: LucideIcon;
  summary: string;
  command: string;
};

export type SectionId = "about" | "work" | "skills" | "contact";

export type SkillItem = {
  title: string;
  level: string;
  details: string;
};

export type Project = {
  name: string;
  url: string;
  imgUrl: string;
  isAppio?: boolean;
  isRocket?: boolean;
};

export type SkillCard = {
  title: string;
  label: string;
  summary: string;
  items: string[];
  accent: "violet" | "cyan" | "blue";
};

type Translator = (key: string, values?: Record<string, string | number>) => string;

export function getRouteItems(t: Translator): RouteItem[] {
  return [
    {
      id: "about",
      title: t("about.title"),
      href: "/about",
      icon: UserRoundSearch,
      summary: t("about.summary"),
      command: t("about.command"),
    },
    {
      id: "work",
      title: t("work.title"),
      href: "/work",
      icon: BriefcaseBusiness,
      summary: t("work.summary"),
      command: t("work.command"),
    },
    {
      id: "skills",
      title: t("skills.title"),
      href: "/skills",
      icon: Sparkles,
      summary: t("skills.summary"),
      command: t("skills.command"),
    },
    {
      id: "contact",
      title: t("contact.title"),
      href: "/contact",
      icon: Mail,
      summary: t("contact.summary"),
      command: t("contact.command"),
    },
  ];
}

export function getProjects(t: Translator): Project[] {
  return [
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
      isRocket: true,
    },
    {
      name: t("projects.ondrasek"),
      url: "https://www.ondrasek.cz/",
      imgUrl: "/images/work/ondrasek.png",
      isRocket: true,
    },
    {
      name: t("projects.seedr"),
      url: "https://www.prorocketeers.com/startups/seedr",
      imgUrl: "/images/work/seedr.avif",
      isRocket: true,
    },
  ];
}

export function getSkillCards(t: Translator): SkillCard[] {
  return [
    {
      title: t("cards.productDesign.title"),
      label: t("cards.productDesign.label"),
      summary: t("cards.productDesign.summary"),
      items: [
        t("cards.productDesign.items.productThinking"),
        t("cards.productDesign.items.userFlows"),
        t("cards.productDesign.items.uiux"),
        t("cards.productDesign.items.prototyping"),
        t("cards.productDesign.items.clientCommunication"),
      ],
      accent: "violet",
    },
    {
      title: t("cards.frontend.title"),
      label: t("cards.frontend.label"),
      summary: t("cards.frontend.summary"),
      items: [
        t("cards.frontend.items.react"),
        t("cards.frontend.items.next"),
        t("cards.frontend.items.typescript"),
      ],
      accent: "cyan",
    },
    {
      title: t("cards.backend.title"),
      label: t("cards.backend.label"),
      summary: t("cards.backend.summary"),
      items: [
        t("cards.backend.items.node"),
        t("cards.backend.items.python"),
        t("cards.backend.items.go"),
        t("cards.backend.items.rest"),
        t("cards.backend.items.graphql"),
        t("cards.backend.items.websockets"),
        t("cards.backend.items.systemDesign"),
      ],
      accent: "blue",
    },
    {
      title: t("cards.infrastructure.title"),
      label: t("cards.infrastructure.label"),
      summary: t("cards.infrastructure.summary"),
      items: [
        t("cards.infrastructure.items.docker"),
        t("cards.infrastructure.items.linux"),
        t("cards.infrastructure.items.githubActions"),
        t("cards.infrastructure.items.networking"),
        t("cards.infrastructure.items.productionDeployment"),
      ],
      accent: "violet",
    },
    {
      title: t("cards.data.title"),
      label: t("cards.data.label"),
      summary: t("cards.data.summary"),
      items: [
        t("cards.data.items.postgresql"),
        t("cards.data.items.dataModeling"),
      ],
      accent: "blue",
    },
  ];
}
