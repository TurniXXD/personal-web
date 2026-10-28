import type { ServicePageCopy } from "../service-content";

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
        title: "Audit vibecoded aplikací",
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
  process: {
    eyebrow: "JAK PROBÍHÁ SPOLUPRÁCE",
    title: "Jak probíhá spolupráce",
    description:
      "Od prvního rozhovoru po spuštění máte přehled o postupu i dalších krocích.",
    steps: [
      {
        number: "01",
        title: "Konzultace a pochopení potřeb",
        description:
          "Ujasníme si cíle, uživatele, obsah a návaznosti projektu.",
      },
      {
        number: "02",
        title: "Návrh řešení",
        description:
          "Navrhnu strukturu, rozsah, technologie a postup realizace.",
      },
      {
        number: "03",
        title: "Vývoj a průběžná zpětná vazba",
        description:
          "Projekt vzniká po částech a průběžně společně ladíme výsledek.",
      },
      {
        number: "04",
        title: "Testování a nasazení",
        description:
          "Ověřím funkčnost, responzivitu a připravím bezpečné spuštění.",
      },
      {
        number: "05",
        title: "Další rozvoj a podpora",
        description:
          "Po spuštění mohu řešení spravovat a rozvíjet podle nových potřeb.",
      },
    ],
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
        description: "Propojení webu s komunikací a firemními workflow.",
        href: "/automatizace",
      },
      {
        title: "AI řešení",
        description: "Praktická práce s dokumenty, daty a interními znalostmi.",
        href: "/sluzby/ai-reseni",
      },
      {
        title: "Audit vibecoded aplikací",
        description:
          "Kontrola, opravy a dokončení aplikace vytvořené pomocí AI.",
        href: "/sluzby/audit-ai-aplikaci",
      },
    ],
  },
  contactTitle: "Pojďme probrat váš web nebo aplikaci.",
} satisfies ServicePageCopy;
