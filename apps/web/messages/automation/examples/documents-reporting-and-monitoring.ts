import type { LocalizedExample } from "@/lib/automation/content";

export default [
  {
    id: "document-generation",
    number: "20",
    categories: ["business-processes", "ai-documents"],
    icon: "file-stack",
    cs: {
      title: "Připravujte nabídky a dokumenty bez ručního přepisování",
      description:
        "Z údajů, které už máte, vznikne hotová nabídka nebo dokument připravený ke kontrole.",
      trigger: "V CRM nebo formuláři jsou připravené potřebné údaje.",
      workflow: [
        "Data z CRM",
        "Šablona",
        "Generování dokumentu",
        "Kontrola a odeslání",
      ],
      benefit: "Rychlejší příprava opakujících se dokumentů.",
      details: [
        "Kontroluje povinná pole před vytvořením dokumentu.",
        "Uchová verzi a před odesláním vyžádá schválení, pokud je potřeba.",
      ],
    },
    en: {
      title: "Prepare proposals and documents without retyping data",
      description:
        "Turn details you already have into a finished proposal or document ready for review.",
      trigger: "The CRM or form contains all required data.",
      workflow: [
        "CRM data",
        "Template",
        "Document generation",
        "Review and sending",
      ],
      benefit: "Faster preparation of repeated documents.",
      details: [
        "Checks required fields before generation.",
        "Stores a version and requests approval before sending where needed.",
      ],
    },
  },
  {
    id: "business-reports",
    number: "21",
    categories: ["data-reporting", "business-processes"],
    icon: "chart",
    cs: {
      title: "Dostávejte pravidelný přehled o výsledcích firmy",
      description:
        "Pravidelně získáte srozumitelný souhrn výsledků bez ručního spojování tabulek.",
      trigger: "Nastane pravidelný termín reportu.",
      workflow: [
        "Firemní data",
        "Automatický sběr",
        "Vyhodnocení",
        "E-mailový report",
      ],
      benefit: "Přehled bez ručního sestavování tabulek.",
      details: [
        "Sjednotí data z dohodnutých zdrojů.",
        "Upozorní na chybějící data a zachová dohledatelný výpočet.",
      ],
    },
    en: {
      title: "Receive a regular overview of business results",
      description:
        "Receive a clear summary of your results regularly without manually combining spreadsheets.",
      trigger: "A scheduled reporting date arrives.",
      workflow: [
        "Business data",
        "Automatic collection",
        "Evaluation",
        "Email report",
      ],
      benefit: "An overview without manually assembling spreadsheets.",
      details: [
        "Combines data from agreed sources.",
        "Flags missing data and keeps calculations traceable.",
      ],
    },
  },
  {
    id: "change-alerts",
    number: "22",
    categories: ["data-reporting", "business-processes"],
    icon: "activity",
    cs: {
      title: "Zjistěte včas, když se něco důležitého změní",
      description:
        "Dostanete upozornění, když se sledované výsledky neobvykle změní nebo překročí důležitou hranici.",
      trigger: "Hodnota překročí nastavenou podmínku nebo se výrazně odchýlí.",
      workflow: [
        "Sledovaná data",
        "Vyhodnocení podmínek",
        "Zjištěná změna",
        "Upozornění",
      ],
      benefit: "Rychlejší reakce na důležité změny.",
      details: [
        "Pravidla se přizpůsobí typu dat a běžnému provozu.",
        "Upozornění obsahuje kontext, nikoli pouze samotné číslo.",
      ],
    },
    en: {
      title: "Know when something important changes",
      description:
        "Get an alert when tracked results change unexpectedly or cross an important threshold.",
      trigger: "A value crosses a rule or deviates significantly.",
      workflow: [
        "Monitored data",
        "Condition evaluation",
        "Detected change",
        "Alert",
      ],
      benefit: "Faster response to important changes.",
      details: [
        "Rules adapt to the data type and normal operation.",
        "Alerts include context rather than only a number.",
      ],
    },
  },
  {
    id: "market-monitoring",
    number: "23",
    categories: ["data-reporting"],
    icon: "radar",
    cs: {
      title: "Sledujte změny na trhu bez každodenního hledání",
      description:
        "Pravidelně získáte souhrn důležitých změn z vybraných veřejných zdrojů.",
      trigger: "Pravidelná kontrola zdrojů nebo nově publikovaná informace.",
      workflow: ["Veřejné zdroje", "Sledování změn", "Vyhodnocení", "Souhrn"],
      benefit: "Pravidelný přehled o relevantních změnách na trhu.",
      details: [
        "Sleduje dohodnuté stránky, produkty, ceny či oborové zprávy.",
        "Zvýrazní změny a připojí odkaz na původní zdroj.",
      ],
      examples: [
        "Veřejné změny cen",
        "Nově zveřejněné produkty",
        "Oborové zprávy",
        "Oznámené služby",
      ],
      note: "Sběr musí respektovat pravidla přístupu a omezení jednotlivých zdrojů.",
    },
    en: {
      title: "Track market changes without daily searching",
      description:
        "Receive a regular summary of important changes from selected public sources.",
      trigger: "A scheduled source check or newly published information.",
      workflow: [
        "Public sources",
        "Change monitoring",
        "Evaluation",
        "Summary",
      ],
      benefit: "A regular overview of relevant market changes.",
      details: [
        "Watches agreed pages, products, prices or industry news.",
        "Highlights changes and links to the original source.",
      ],
      examples: [
        "Public price changes",
        "New products",
        "Industry news",
        "Announced services",
      ],
      note: "Collection must respect source access rules and restrictions.",
    },
  },
] satisfies LocalizedExample[];
