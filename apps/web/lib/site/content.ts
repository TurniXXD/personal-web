import cs from "@/messages/site/cs";
import en from "@/messages/site/en";

import { projectImages } from "@vantuch/ui/project-images";

export type Locale = "cs" | "en";
export const caseStudySlugs = [
  "robe",
  "kinedok",
  "revizio",
  "my213",
  "ondrasek",
] as const;
export type CaseStudySlug = (typeof caseStudySlugs)[number];

export const caseStudyProjects = {
  robe: {
    name: "Robe",
    image: projectImages.robe,
    website: "https://www.robe.cz/",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    partner: { name: "Appio", url: "https://appio.dev/" },
  },
  kinedok: {
    name: "Kinedok",
    image: projectImages.kinedok,
    website: "https://kinedok.net/",
    stack: ["Next.js", "TypeScript", "CMS"],
    partner: { name: "Appio", url: "https://appio.dev/" },
  },
  revizio: {
    name: "Revizio",
    image: projectImages.revizio,
    website: "https://www.revizio.app/",
    stack: ["React", "TypeScript", "UX"],
    partner: null,
  },
  my213: {
    name: "My213",
    image: projectImages.my213,
    website: "https://www.my213.cz/",
    stack: ["React", "TypeScript", "APIs"],
    partner: { name: "Pro Rocketeers", url: "https://www.prorocketeers.com/" },
  },
  ondrasek: {
    name: "Ondrášek",
    image: projectImages.ondrasek,
    website: "https://www.ondrasek.cz/",
    stack: ["Next.js", "TypeScript", "CMS"],
    partner: { name: "Pro Rocketeers", url: "https://www.prorocketeers.com/" },
  },
} as const;

export const caseStudyTimeline: Record<
  CaseStudySlug,
  { startYear: number; endYear: number | null }
> = {
  robe: { startYear: 2024, endYear: null },
  kinedok: { startYear: 2025, endYear: null },
  revizio: { startYear: 2023, endYear: 2025 },
  my213: { startYear: 2022, endYear: 2023 },
  ondrasek: { startYear: 2021, endYear: 2022 },
};

export const caseStudyTimelineSlugs = [...caseStudySlugs].sort(
  (a, b) => caseStudyTimeline[b].startYear - caseStudyTimeline[a].startYear,
);

type Service = { title: string; description: string; tags: string[] };
type ProcessStep = { number: string; title: string; description: string };
export type CommunityCopy = {
  eyebrow: string;
  title: string;
  description: string;
  newsletterTitle: string;
  newsletterText: string;
  emailLabel: string;
  emailPlaceholder: string;
  consent: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
  unavailable: string;
  socialTitle: string;
  socialText: string;
  linkedinText: string;
  instagramText: string;
  githubText: string;
};
type CaseCopy = {
  category: string;
  summary: string;
  challenge: string;
  role: string[];
  result: string;
};
export type SiteCopy = {
  meta: { title: string; description: string };
  nav: {
    services: string;
    automation: string;
    work: string;
    process: string;
    about: string;
    contact: string;
    consultation: string;
    language: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primary: string;
    secondary: string;
    experience: string;
    availability: string;
    casesProof: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    more: string;
    items: Service[];
  };
  automation: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    items: Array<{ title: string; description: string }>;
  };
  work: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    viewCase: string;
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: ProcessStep[];
  };
  about: {
    eyebrow: string;
    title: string;
    intro?: string;
    text: string;
    detail: string;
  };
  community: CommunityCopy;
  audit: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    email: string;
    phone: string;
  };
  casePage: {
    back: string;
    challenge: string;
    role: string;
    result: string;
    stack: string;
    visit: string;
    partner: string;
    next: string;
    all: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaText: string;
  };
  footer: {
    line: string;
    community: string;
    referral: string;
    privacy: string;
    copyright: string;
  };
  cases: Record<CaseStudySlug, CaseCopy>;
};

export const copy: Record<Locale, SiteCopy> = { cs, en };

export function localizedPath(locale: Locale, path = "") {
  const home = locale === "en" ? "/en" : "/";
  if (!path) return home;
  if (path.startsWith("#")) return home + path;
  return (locale === "en" ? "/en" : "") + path;
}
