import type { ServiceDetailCopy } from "../../service-detail-content";

export default {
  meta: {
    title: "E-shopy na Shoptetu a úpravy na míru | Jakub Vantuch",
    description:
      "Návrh, úpravy a integrace Shoptet e-shopů s důrazem na nákupní cestu, správu a měření.",
  },
  name: "E-shopy na Shoptetu",
  hero: {
    eyebrow: "E-SHOPY NA SHOPTETU",
    title: "Shoptet, kde se zákazník neztratí.",
    description:
      "Pro nové i zavedené obchody, které chtějí přehlednější vzhled, lepší nákupní cestu a smysluplná napojení.",
    primary: "Probrat e-shop",
    secondary: "Jak probíhá úprava",
  },
  visual: {
    badge: "NÁKUPNÍ CESTA",
    title: "Od produktu k dokončené objednávce",
    items: ["Přehledný katalog", "Jasný detail produktu", "Jednoduchý košík"],
  },
  benefits: {
    eyebrow: "PŘÍNOS PRO E-SHOP",
    title: "Lepší nákupní zkušenost bez zbytečné složitosti.",
    description:
      "Úpravy navrhuji podle sortimentu, zákazníků a reálných možností platformy Shoptet.",
    items: [
      {
        title: "Srozumitelná nabídka",
        description:
          "Kategorie, filtry a produktové stránky pomáhají s výběrem.",
      },
      {
        title: "Důvěryhodný vzhled",
        description:
          "Vizuální úpravy sjednotí e-shop se značkou a podporují rozhodování.",
      },
      {
        title: "Efektivnější provoz",
        description:
          "Dostupná napojení mohou omezit ruční práci s objednávkami a daty.",
      },
    ],
  },
  workflow: {
    eyebrow: "POSTUP REALIZACE",
    title: "Úpravy vycházejí z reálné nákupní cesty.",
    description:
      "Nejdřív ověřím možnosti tarifu, doplňků a dostupných rozhraní Shoptetu.",
    steps: [
      {
        title: "Audit a cíle",
        description:
          "Projdu sortiment, cílové zákazníky a problematická místa.",
      },
      {
        title: "Návrh změn",
        description: "Určíme priority pro vzhled, obsah, katalog a integrace.",
      },
      {
        title: "Úpravy a nastavení",
        description: "Změny připravím a ověřím v bezpečném rozsahu.",
      },
      {
        title: "Měření a rozvoj",
        description: "Sledujeme důležité kroky a plánujeme další zlepšení.",
      },
    ],
  },
  sections: [
    {
      id: "moznosti",
      eyebrow: "CO LZE ŘEŠIT",
      title: "Vzhled, obsah i provozní návaznosti.",
      items: [
        {
          title: "Úpravy šablony",
          description: "Barvy, typografie, komponenty a responzivní zobrazení.",
        },
        {
          title: "Katalog a produkty",
          description:
            "Struktura kategorií, parametry, varianty a prezentace produktů.",
        },
        {
          title: "Nákupní cesta",
          description:
            "Košík, důvěryhodné informace a odstranění zbytečných překážek.",
        },
        {
          title: "Doplňky a integrace",
          description:
            "Napojení pouze tam, kde jsou podporovaná a přinášejí provozní hodnotu.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "PŘÍKLADY VYUŽITÍ",
    title: "Od nového obchodu po cílené zlepšení.",
    description: "Rozsah přizpůsobím stavu e-shopu.",
    items: [
      {
        title: "Nový e-shop",
        description:
          "Nastavení struktury, vzhledu, katalogu a základního měření.",
      },
      {
        title: "Redesign",
        description:
          "Sjednocení značky a zpřehlednění klíčových částí bez změny platformy.",
      },
      {
        title: "Provozní napojení",
        description:
          "Ověřené propojení dostupných služeb, které omezí ruční přepisování.",
      },
    ],
  },
  faq: {
    eyebrow: "ČASTÉ DOTAZY",
    title: "Co ověřit u Shoptetu.",
    items: [
      {
        question: "Lze upravit každý prvek e-shopu?",
        answer:
          "Rozsah závisí na šabloně, tarifu a možnostech Shoptetu. Před návrhem vždy ověřím, co je bezpečně a dlouhodobě udržitelné.",
      },
      {
        question: "Pomůžete i s importem produktů?",
        answer:
          "Ano, pokud jsou zdrojová data dostatečně kvalitní a Shoptet podporuje požadovaný způsob importu.",
      },
      {
        question: "Lze napojit účetnictví nebo sklad?",
        answer:
          "Záleží na konkrétním systému, dostupném doplňku nebo API. Možnosti nejdřív prověřím.",
      },
      {
        question: "Je součástí i analytika?",
        answer:
          "Může být. Nastavíme měření klíčových kroků nákupní cesty s ohledem na souhlasy a soukromí.",
      },
    ],
  },
  related: ["firemni-weby", "darkove-poukazy"],
  finalCta: {
    eyebrow: "POJĎME TO PROBRAT",
    title: "Máte představu, co byste chtěli vytvořit?",
    description:
      "Popište mi svůj nápad nebo současný problém. Společně zjistíme, jaké řešení pro vás dává smysl.",
    action: "Nezávazně probrat projekt",
  },
} satisfies ServiceDetailCopy;
