import type { ServicePageCopy } from "@/lib/services/landing-content";

export default {
  meta: {
    title: "Praktická AI řešení pro firmy | Jakub Vantuch",
    description:
      "AI integrace pro práci s dokumenty, analýzu dat a automatizaci firemních činností s důrazem na spolehlivost a ochranu dat.",
  },
  hero: {
    eyebrow: "AI ŘEŠENÍ",
    title: "Umělá inteligence, která má praktické využití.",
    description:
      "Pomáhám firmám využívat AI při práci s dokumenty, daty a každodenními procesy.",
    primary: "Probrat AI řešení",
  },
  offering: {
    eyebrow: "PRAKTICKÉ VYUŽITÍ",
    title: "Kde může AI pomoci",
    items: [
      {
        icon: "bot",
        title: "AI asistenti",
        description:
          "Vyhledávání informací ve firemních dokumentech a znalostních bázích.",
      },
      {
        icon: "message",
        title: "Chatboti pro web",
        description:
          "Chatboti napojení na obsah webu, produkty nebo firemní znalosti, kteří odpovídají návštěvníkům a předávají poptávky.",
      },
      {
        icon: "mail",
        title: "Personalizované e-maily",
        description:
          "Tvorba relevantních e-mailů podle chování zákazníka, historie komunikace a dostupných dat.",
      },
      {
        icon: "file-scan",
        title: "Zpracování dokumentů",
        description: "Automatické získávání údajů z faktur, formulářů a PDF.",
      },
      {
        icon: "chart",
        title: "Analýza dat",
        description: "Třídění, shrnování a vyhodnocování firemních informací.",
      },
      {
        icon: "network",
        title: "Integrace AI",
        description: "Propojení AI s interními systémy a pracovními postupy.",
      },
    ],
  },
  process: {
    eyebrow: "JAK PROBÍHÁ SPOLUPRÁCE",
    title: "Od problému k ověřenému řešení",
    description:
      "Nejdřív ověřím přínos, kvalitu dat a místa, kde musí zůstat lidská kontrola.",
    steps: [
      {
        number: "01",
        title: "Identifikace problému",
        description: "Určíme problém a očekávaný výsledek.",
      },
      {
        number: "02",
        title: "Analýza možností",
        description: "Prověříme data, rizika a vhodný postup.",
      },
      {
        number: "03",
        title: "Prototyp a ověření",
        description: "Na vzorku ověříme kvalitu a použitelnost.",
      },
      {
        number: "04",
        title: "Integrace",
        description: "Řešení bezpečně propojím s vašimi systémy.",
      },
      {
        number: "05",
        title: "Monitoring a zlepšování",
        description: "Sledujeme kvalitu a průběžně řešení ladíme.",
      },
    ],
  },
  related: {
    eyebrow: "SOUVISEJÍCÍ SLUŽBA",
    title: "Už máte aplikaci vytvořenou pomocí AI?",
    items: [
      {
        title: "Audit AI aplikace",
        description:
          "Pomůžu vám ji zkontrolovat, dokončit a připravit na produkci.",
        href: "/sluzby/audit-ai-aplikaci",
      },
    ],
  },
  contactTitle: "Proberme, zda AI dává smysl právě u vás.",
} satisfies ServicePageCopy;
