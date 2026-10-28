import type { ServiceDetailCopy } from "../../service-detail-content";

export default {
  meta: {
    title: "Webové aplikace a interní systémy na míru | Jakub Vantuch",
    description:
      "Vývoj webových aplikací, klientských portálů a interních systémů, které zjednodušují firemní procesy.",
  },
  name: "Webové aplikace",
  hero: {
    eyebrow: "WEBOVÉ APLIKACE",
    title: "Nástroj postavený přesně pro způsob, jakým pracujete.",
    description:
      "Interní systémy, zákaznické portály a dashboardy pro firmy, kterým běžné tabulky nebo hotové nástroje přestávají stačit.",
    primary: "Probrat aplikaci",
    secondary: "Jak řešení funguje",
  },
  visual: {
    badge: "PRACOVNÍ PŘEHLED",
    title: "Všechny důležité kroky na jednom místě",
    items: ["Role a oprávnění", "Stavy a úkoly", "Přehledné reporty"],
  },
  benefits: {
    eyebrow: "PŘÍNOS PRO TÝM",
    title: "Méně ruční práce a lepší přehled o každém případu.",
    description:
      "Aplikace kopíruje reálný proces firmy a propojí informace, které dnes žijí na více místech.",
    items: [
      {
        title: "Jednotný pracovní postup",
        description: "Tým vidí stejné stavy, odpovědnosti a další kroky.",
      },
      {
        title: "Méně chyb",
        description:
          "Validace a automatické kontroly omezí opakované přepisování dat.",
      },
      {
        title: "Prostor pro růst",
        description:
          "Funkce lze rozvíjet podle nových potřeb a zpětné vazby uživatelů.",
      },
    ],
  },
  workflow: {
    eyebrow: "JAK ŘEŠENÍ FUNGUJE",
    title: "Od vstupu dat po jasný další krok.",
    description:
      "Konkrétní workflow navrhnu podle vašeho procesu, rolí a návazných systémů.",
    steps: [
      {
        title: "Příjem požadavku",
        description:
          "Data přijdou z formuláře, importu nebo napojeného systému.",
      },
      {
        title: "Zpracování",
        description: "Aplikace hlídá povinné údaje, stav a odpovědnou osobu.",
      },
      {
        title: "Spolupráce",
        description: "Uživatelé pracují podle rolí a vidí relevantní historii.",
      },
      {
        title: "Výsledek a report",
        description: "Hotový případ se uzavře a promítne do přehledu.",
      },
    ],
  },
  sections: [
    {
      id: "funkce",
      eyebrow: "MOŽNOSTI ŘEŠENÍ",
      title: "Aplikace může růst spolu s vaším procesem.",
      items: [
        {
          title: "Uživatelské role",
          description:
            "Rozdílný přístup pro administrátory, zaměstnance, partnery nebo klienty.",
        },
        {
          title: "Dashboardy",
          description:
            "Aktuální stav zakázek, úkolů, termínů nebo obchodních případů.",
        },
        {
          title: "Notifikace",
          description:
            "Upozornění na změny, termíny a situace vyžadující pozornost.",
        },
        {
          title: "Integrace",
          description:
            "Napojení na CRM, účetnictví, platby nebo další dostupná API.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "PŘÍKLADY VYUŽITÍ",
    title: "Když firma potřebuje vlastní pracovní prostředí.",
    description:
      "Každý příklad začíná mapováním skutečného procesu, ne seznamem funkcí.",
    items: [
      {
        title: "Klientský portál",
        description:
          "Klient sleduje požadavky, dokumenty a postup bez e-mailového chaosu.",
      },
      {
        title: "Interní agenda",
        description:
          "Tým spravuje případy, termíny a odpovědnosti v jednotném rozhraní.",
      },
      {
        title: "Provozní dashboard",
        description:
          "Vedení vidí stav práce a důležité výjimky bez ručního reportingu.",
      },
    ],
  },
  faq: {
    eyebrow: "ČASTÉ DOTAZY",
    title: "Než začneme vyvíjet.",
    items: [
      {
        question: "Musím mít přesné technické zadání?",
        answer:
          "Ne. Stačí popsat současný postup, problémy a očekávaný výsledek. Funkční zadání připravím společně s vámi.",
      },
      {
        question: "Lze aplikaci napojit na naše nástroje?",
        answer:
          "Často ano, pokud poskytují vhodné API nebo jiný bezpečný způsob výměny dat. Možnosti vždy nejdřív ověřím.",
      },
      {
        question: "Jak řešíte přístupy uživatelů?",
        answer:
          "Podle projektu nastavím přihlášení, role a oprávnění tak, aby každý viděl jen to, co potřebuje.",
      },
      {
        question: "Lze začít menší verzí?",
        answer:
          "Ano. Doporučuji začít klíčovým workflow, ověřit ho v provozu a další funkce přidávat podle přínosu.",
      },
    ],
  },
  related: ["firemni-weby", "vernostni-programy"],
  finalCta: {
    eyebrow: "POJĎME TO PROBRAT",
    title: "Máte představu, co byste chtěli vytvořit?",
    description:
      "Popište mi svůj nápad nebo současný problém. Společně zjistíme, jaké řešení pro vás dává smysl.",
    action: "Nezávazně probrat projekt",
  },
} satisfies ServiceDetailCopy;
