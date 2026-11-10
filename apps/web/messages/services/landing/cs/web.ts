import type { ServicePageCopy } from "@/lib/services/landing-content";

export default {
  meta: {
    title: "Weby a webové aplikace na míru | Jakub Vantuch",
    description:
      "Návrh a vývoj moderních firemních webů, klientských portálů a webových aplikací na míru včetně integrací a dlouhodobé podpory.",
  },
  hero: {
    eyebrow: "WEBY A APLIKACE",
    title: "Webové aplikace na míru.",
    description:
      "Navrhuji a vyvíjím moderní webové stránky, klientské portály a aplikace na míru. Od prvního návrhu až po nasazení a dlouhodobý rozvoj.",
    primary: "Probrat projekt",
    secondary: "Prohlédnout projekty",
  },
  offering: {
    eyebrow: "CO MOHU VYTVOŘIT",
    title: "Co pro vás mohu vytvořit",
    description:
      "Rozsah i technologie volím podle cíle projektu, způsobu správy a systémů, které už používáte.",
    items: [
      {
        icon: "browser",
        title: "Firemní weby",
        description:
          "Profesionální weby, které pomáhají získávat zákazníky, budují důvěru a díky přehlednému designu usnadňují cestu od návštěvy k poptávce.",
        href: "/sluzby/firemni-weby",
      },
      {
        icon: "layout",
        title: "Webové aplikace",
        description:
          "Aplikace a interní systémy, které zjednodušují každodenní práci, šetří čas a pomáhají firmám efektivněji řídit jejich procesy.",
        href: "/sluzby/webove-aplikace-na-miru",
      },
      {
        icon: "store",
        title: "E-shopy na Shoptetu",
        description:
          "E-shopy na platformě Shoptet, které spojují atraktivní vzhled, jednoduchý nákup a snadnou správu.",
        href: "/sluzby/shoptet",
      },
      {
        icon: "shield",
        title: "Audit aplikací vytvořených pomocí AI",
        description:
          "Kontrola bezpečnosti, výkonu a kvality aplikací vytvořených pomocí AI. Pomůžu také s opravami a dokončením MVP.",
        href: "/sluzby/audit-ai-aplikaci",
      },
    ],
  },
  projects: {
    eyebrow: "VYBRANÉ REALIZACE",
    title: "Vybrané projekty",
    description:
      "Ukázky webů, aplikací a portálů, na jejichž vývoji jsem se podílel.",
  },
  related: {
    eyebrow: "SOUVISEJÍCÍ SLUŽBY",
    title: "Řešení lze propojit i s dalšími oblastmi.",
    note: {
      title: "Potřebujete pomoci i s marketingem?",
      description:
        "Rád vám doporučím specialisty na SEO, online reklamu nebo obsahový marketing, kteří mohou na technické řešení navázat.",
    },
    items: [
      {
        title: "Automatizace procesů",
        description: "Propojení webu s komunikací a firemními procesy.",
        href: "/automatizace",
      },
      {
        title: "AI řešení",
        description: "Praktická práce s dokumenty, daty a interními znalostmi.",
        href: "/sluzby/ai-reseni",
      },
      {
        title: "Audit aplikací vytvořených pomocí AI",
        description:
          "Kontrola, opravy a dokončení aplikace vytvořené pomocí AI.",
        href: "/sluzby/audit-ai-aplikaci",
      },
    ],
  },
  contactTitle: "Pojďme probrat váš web nebo aplikaci.",
} satisfies ServicePageCopy;
