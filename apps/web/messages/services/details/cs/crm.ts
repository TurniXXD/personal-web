import type { ServiceDetailCopy } from "@/lib/services/detail-content";

export default {
  meta: {
    title: "CRM a práce se zákazníky | Jakub Vantuch",
    description:
      "Přehled kontaktů, poptávek, obchodních případů a navazujících úkolů v jednom pracovním procesu.",
  },
  name: "CRM a práce se zákazníky",
  hero: {
    eyebrow: "CRM A ZÁKAZNICKÁ AGENDA",
    title: "Mějte každou poptávku a další krok pod kontrolou.",
    description:
      "Přehled kontaktů, historie komunikace a obchodních případů pro týmy, které nechtějí hledat informace v e-mailech a tabulkách.",
    primary: "Probrat zákaznickou agendu",
    secondary: "Jak CRM pomáhá",
  },
  visual: {
    badge: "OBCHODNÍ PŘEHLED",
    title: "Každý kontakt má historii a další krok",
    items: ["Nová poptávka", "Navazující úkol", "Uzavřený případ"],
  },
  benefits: {
    eyebrow: "PŘÍNOS PRO TÝM",
    title: "Méně zapomenutých návazností, více sdíleného kontextu.",
    description:
      "CRM má podporovat reálnou práci týmu, ne přidávat další administrativní vrstvu.",
    items: [
      {
        title: "Jedno místo pro data",
        description: "Kontakt, firma, poptávky a komunikace jsou propojené.",
      },
      {
        title: "Jasné další kroky",
        description:
          "Úkoly, termíny a odpovědnosti jsou viditelné pro správné lidi.",
      },
      {
        title: "Méně rutiny",
        description:
          "Vybrané administrativní kroky lze automatizovat po ověření podmínek.",
      },
    ],
  },
  workflow: {
    eyebrow: "JAK TO FUNGUJE",
    title: "Poptávka dostane vlastníka, stav a další krok.",
    description: "Workflow nastavím podle délky vašeho obchodního procesu.",
    steps: [
      {
        title: "Příjem kontaktu",
        description: "Poptávka dorazí z webu nebo ji pracovník založí ručně.",
      },
      {
        title: "Kvalifikace",
        description: "Doplní se důležité údaje, priorita a odpovědná osoba.",
      },
      {
        title: "Navazující práce",
        description: "Tým plánuje úkoly a ukládá relevantní historii.",
      },
      {
        title: "Výsledek",
        description:
          "Případ se uzavře a data zůstávají dostupná pro další péči.",
      },
    ],
  },
  sections: [
    {
      id: "funkce",
      eyebrow: "MOŽNOSTI ŘEŠENÍ",
      title: "CRM podle procesu, který potřebujete řídit.",
      items: [
        {
          title: "Kontakty a firmy",
          description: "Strukturované údaje, vztahy a historie spolupráce.",
        },
        {
          title: "Obchodní pipeline",
          description: "Přehled stavů, hodnot a očekávaných dalších kroků.",
        },
        {
          title: "Úkoly a připomínky",
          description: "Navazující činnosti s termínem a odpovědnou osobou.",
        },
        {
          title: "Integrace",
          description: "Příjem poptávek a předávání dat do dostupných systémů.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "PŘÍKLADY VYUŽITÍ",
    title: "Přehledná péče od prvního kontaktu dál.",
    description:
      "Rozsah může být od jednoduché evidence po propojený obchodní proces.",
    items: [
      {
        title: "Servisní firma",
        description:
          "Každá poptávka má odpovědnou osobu, termín a historii řešení.",
      },
      {
        title: "B2B obchod",
        description:
          "Tým sdílí stav obchodních případů a plánované návaznosti.",
      },
      {
        title: "Opakované služby",
        description:
          "Historie zákazníka pomáhá připravit relevantní další péči.",
      },
    ],
  },
  faq: {
    eyebrow: "ČASTÉ DOTAZY",
    title: "CRM má zjednodušovat, ne brzdit.",
    items: [
      {
        question: "Potřebuji vlastní CRM?",
        answer:
          "Ne vždy. Někdy je výhodnější správně nastavit existující službu. Vlastní řešení dává smysl, když je proces specifický nebo potřebuje hlubší integrace.",
      },
      {
        question: "Lze převést data z tabulek?",
        answer:
          "Ano, pokud jsou konzistentní a lze bezpečně určit jejich strukturu. Před importem je potřeba data zkontrolovat a vyčistit.",
      },
      {
        question: "Lze CRM propojit s webem?",
        answer:
          "Ano, formuláře mohou po validaci zakládat kontakty a případy, pokud cílové CRM nabízí vhodné rozhraní.",
      },
      {
        question: "Jak se řeší ochrana osobních údajů?",
        answer:
          "Rozsah dat, přístupy, doba uchování a výmaz se navrhují podle účelu zpracování a vašich interních pravidel.",
      },
    ],
  },
  related: ["webova-analytika", "vernostni-programy"],
  finalCta: {
    eyebrow: "POJĎME TO PROBRAT",
    title: "Chcete mít v zákaznické agendě větší pořádek?",
    description:
      "Popište mi, jak dnes přijímáte a zpracováváte poptávky. Společně najdeme přiměřené řešení.",
    action: "Nezávazně probrat CRM",
  },
} satisfies ServiceDetailCopy;
