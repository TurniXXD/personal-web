import type { AutomationPageCopy } from "@/lib/automation/content";

export default {
  meta: {
    title: "Automatizace procesů a AI řešení na míru | Jakub Vantuch",
    description:
      "Automatizace e-mailů, e-shopů, sociálních sítí a firemních procesů. Propojení systémů, AI řešení a praktické ukázky automatizací.",
  },
  hero: {
    eyebrow: "AUTOMATIZACE PRO KAŽDODENNÍ PRÁCI",
    title: "Rutinu nechte běžet.",
    highlight: "Soustřeďte se na růst.",
    description:
      "Propojím nástroje, které už používáte, a opakované úkoly proměním ve spolehlivý proces. Bez zbytečného přepisování, čekání a hlídání každého kroku.",
    primary: "Probrat automatizaci",
    secondary: "Prohlédnout příklady",
    visualEyebrow: "KDYŽ SYSTÉMY SPOLUPRACUJÍ",
    visualTitle: "Více hotové práce. Méně ručních kroků.",
    visualItems: [
      "Data se propisují mezi systémy",
      "Zprávy odcházejí ve správný čas",
      "Přehledy se průběžně aktualizují",
    ],
    visualNote: "Pravidla i kontrola zůstávají ve vašich rukou.",
  },
  catalog: {
    eyebrow: "PRAKTICKÉ PŘÍKLADY",
    title: "Kde může automatizace pomoci?",
    description:
      "Vyberte oblast a projděte si konkrétní situace, které lze podle používaných systémů a potřeb firmy zjednodušit.",
    all: "Vše",
    showMore: "Zobrazit další příklady",
    categories: {
      "email-marketing": "E-mail a marketing",
      ecommerce: "E-shop",
      social: "Sociální sítě",
      "ai-documents": "Dokumenty a AI",
      "business-processes": "Firemní procesy",
      "data-reporting": "Data a reporting",
    },
  },
  process: {
    eyebrow: "POSTUP",
    title: "Jak spolupráce probíhá?",
    steps: [
      {
        number: "01",
        title: "Probereme váš proces",
        description:
          "Zjistíme, co dnes řešíte ručně a kde vznikají zbytečné komplikace.",
      },
      {
        number: "02",
        title: "Navrhnu řešení",
        description:
          "Vybereme automatizace, které dávají smysl vzhledem k vašim potřebám a rozpočtu.",
      },
      {
        number: "03",
        title: "Automatizaci vytvořím",
        description:
          "Propojím potřebné systémy, připravím logiku a řešení otestuji.",
      },
      {
        number: "04",
        title: "Spustíme a doladíme",
        description:
          "Ověříme fungování v praxi a případně upravíme další kroky.",
      },
    ],
  },
  contactTitle: "Nevíte, co by šlo automatizovat právě u vás?",
} satisfies AutomationPageCopy;
