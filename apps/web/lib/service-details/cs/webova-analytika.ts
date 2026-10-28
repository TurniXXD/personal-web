import type { ServiceDetailCopy } from "../../service-detail-content";

export default {
  meta: {
    title: "Webová analytika a měření poptávek | Jakub Vantuch",
    description:
      "Měření návštěvnosti, formulářů, důležitých akcí a zdrojů poptávek s ohledem na soukromí.",
  },
  name: "Webová analytika",
  hero: {
    eyebrow: "WEBOVÁ ANALYTIKA",
    title: "Zjistěte, co lidé na webu skutečně dělají.",
    description:
      "Měření návštěvnosti, poptávek a klíčových kroků, které pomůže rozhodovat podle dat místo dojmů.",
    primary: "Probrat měření",
    secondary: "Jak analytika funguje",
  },
  visual: {
    badge: "PŘEHLED VÝKONU",
    title: "Důležité události na jednom místě",
    items: ["Návštěvnost", "Poptávky", "Zdroj kontaktu"],
  },
  benefits: {
    eyebrow: "PŘÍNOS PRO ROZHODOVÁNÍ",
    title: "Měřte to, co souvisí s vaším cílem.",
    description:
      "Nezahlcuji dashboard metrikami. Nejdřív určíme otázky, na které mají data odpovědět.",
    items: [
      {
        title: "Viditelné konverze",
        description:
          "Formuláře, kliknutí a další důležité akce mají jasnou definici.",
      },
      {
        title: "Lepší atribuce",
        description:
          "U poptávek lze sledovat dostupný zdroj a cestu návštěvníka.",
      },
      {
        title: "Respekt k soukromí",
        description:
          "Volba nástroje a souhlasů odpovídá účelu a rozsahu měření.",
      },
    ],
  },
  workflow: {
    eyebrow: "JAK MĚŘENÍ VZNIKÁ",
    title: "Od obchodní otázky k použitelnému přehledu.",
    description:
      "Výsledek musí být srozumitelný lidem, kteří podle něj rozhodují.",
    steps: [
      {
        title: "Cíle",
        description: "Určíme, co je pro web skutečně důležitá akce.",
      },
      {
        title: "Datový plán",
        description: "Pojmenujeme události, parametry a potřebné souhlasy.",
      },
      {
        title: "Implementace",
        description: "Měření nasadím a ověřím na reálných scénářích.",
      },
      {
        title: "Dashboard",
        description: "Data uspořádám do přehledu pro pravidelné vyhodnocení.",
      },
    ],
  },
  sections: [
    {
      id: "rozsah",
      eyebrow: "CO LZE SLEDOVAT",
      title: "Přehled od návštěvy po poptávku.",
      items: [
        {
          title: "Návštěvnost",
          description: "Vývoj návštěv, nejčastější vstupní stránky a zařízení.",
        },
        {
          title: "Kontaktní formuláře",
          description: "Odeslání, chyby a kroky, které formuláři předcházejí.",
        },
        {
          title: "Důležité akce",
          description:
            "Kliknutí na telefon, rezervace, stažení dokumentu nebo nákupní krok.",
        },
        {
          title: "Dashboardy",
          description: "Srozumitelné souhrny pro vedení nebo marketingový tým.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "PŘÍKLADY VYUŽITÍ",
    title: "Data jako podklad, ne jako automatický slib výsledku.",
    description: "Analytika pomáhá odhalit souvislosti; sama nezaručuje růst.",
    items: [
      {
        title: "Firemní web",
        description: "Firma vidí, které služby vedou k odeslaným poptávkám.",
      },
      {
        title: "Kampaň",
        description:
          "Tým porovná kvalitu návštěv a konverze podle dostupných zdrojů.",
      },
      {
        title: "E-shop",
        description:
          "Přehled ukáže, ve které části nákupní cesty nejčastěji dochází k odchodu.",
      },
    ],
  },
  faq: {
    eyebrow: "ČASTÉ DOTAZY",
    title: "Smysluplné měření bez falešné jistoty.",
    items: [
      {
        question: "Jaký analytický nástroj zvolit?",
        answer:
          "Záleží na cílech, požadované podrobnosti, rozpočtu a přístupu k soukromí. Doporučení připravím až po krátké analýze.",
      },
      {
        question: "Potřebuji cookie lištu?",
        answer:
          "Záleží na použitých nástrojích a režimu měření. Nastavení souhlasů je potřeba posoudit podle konkrétní implementace a právních požadavků.",
      },
      {
        question: "Lze měřit odeslané formuláře?",
        answer:
          "Ano, obvykle lze bezpečně zaznamenat úspěšné odeslání bez ukládání obsahu zprávy do analytiky.",
      },
      {
        question: "Zaručí analytika více poptávek?",
        answer:
          "Ne. Poskytne lepší podklady pro rozhodování a ověření změn, ale výsledek závisí i na nabídce, návštěvnosti a dalších faktorech.",
      },
    ],
  },
  related: ["firemni-weby", "shoptet", "crm"],
  finalCta: {
    eyebrow: "POJĎME TO PROBRAT",
    title: "Chcete vědět, co váš web skutečně přináší?",
    description:
      "Popište mi cíle webu a současné nástroje. Navrhnu přiměřený rozsah měření a přehledu.",
    action: "Nezávazně probrat analytiku",
  },
} satisfies ServiceDetailCopy;
