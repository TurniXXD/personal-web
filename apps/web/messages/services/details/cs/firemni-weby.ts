import type { ServiceDetailCopy } from "@/lib/services/detail-content";

export default {
  meta: {
    title: "Firemní weby, které podporují obchod | Jakub Vantuch",
    description:
      "Návrh a vývoj firemních webů, které budují důvěru, přivádějí poptávky a snadno se spravují.",
  },
  name: "Firemní weby",
  hero: {
    eyebrow: "FIREMNÍ WEBY",
    title: "Web, ze kterého je hned jasné, co děláte.",
    description:
      "Pro firmy a služby, které chtějí působit profesionálně, získávat kvalitní poptávky a mít obsah pod kontrolou.",
    primary: "Probrat nový web",
    secondary: "Jak vzniká",
  },
  visual: {
    badge: "PŘEHLEDNÁ CESTA K POPTÁVCE",
    title: "Návštěvník rychle najde to podstatné",
    items: ["Služby a přínosy", "Důvěryhodné reference", "Jasný kontakt"],
  },
  benefits: {
    eyebrow: "PŘÍNOS PRO FIRMU",
    title: "Profesionální prezentace, která má jasný obchodní cíl.",
    description:
      "Web nestavím jen jako vizitku. Struktura, obsah i kontaktní cesta vycházejí z toho, koho chcete oslovit.",
    items: [
      {
        title: "Větší důvěra",
        description:
          "Jednotný vzhled a srozumitelný obsah podpoří důvěryhodnost firmy.",
      },
      {
        title: "Více relevantních poptávek",
        description:
          "Návštěvník se rychle zorientuje a ví, jak udělat další krok.",
      },
      {
        title: "Snadná správa",
        description:
          "Běžné texty, služby a reference můžete upravovat bez zásahu vývojáře.",
      },
    ],
  },
  workflow: {
    eyebrow: "JAK WEB VZNIKÁ",
    title: "Od cílů firmy k hotovému webu.",
    description:
      "Každá fáze má konkrétní výstup a prostor pro vaši zpětnou vazbu.",
    steps: [
      {
        title: "Cíle a zákazníci",
        description: "Ujasníme si nabídku, cílové skupiny a očekávané akce.",
      },
      {
        title: "Struktura a obsah",
        description: "Navrhnu hierarchii stránek a cestu návštěvníka.",
      },
      {
        title: "Design a vývoj",
        description: "Vznikne responzivní rozhraní v souladu s vaší značkou.",
      },
      {
        title: "Testování a spuštění",
        description: "Ověřím formuláře, rychlost, zařízení i základní měření.",
      },
    ],
  },
  sections: [
    {
      id: "moznosti",
      eyebrow: "CO MŮŽE BÝT SOUČÁSTÍ",
      title: "Funkce podle toho, jak vaše firma pracuje.",
      items: [
        {
          title: "Responzivní design",
          description: "Přehledné zobrazení na mobilu, tabletu i počítači.",
        },
        {
          title: "SEO základy",
          description:
            "Technická struktura, metadata a srozumitelná hierarchie obsahu.",
        },
        {
          title: "Formuláře a rezervace",
          description:
            "Kontaktní nebo rezervační cesta napojená na vaše procesy.",
        },
        {
          title: "Redakční systém",
          description: "Úprava obsahu, médií a služeb s odpovídajícími rolemi.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "PŘÍKLADY VYUŽITÍ",
    title: "Web navržený podle konkrétního způsobu podnikání.",
    description:
      "Rozsah se může pohybovat od menší prezentace po obsahově rozsáhlý web.",
    items: [
      {
        title: "Lokální služba",
        description:
          "Salon potřebuje představit služby, ceny, tým a dovést zákazníka k rezervaci.",
      },
      {
        title: "B2B firma",
        description:
          "Výrobce potřebuje přehledně vysvětlit portfolio a sbírat kvalifikované poptávky.",
      },
      {
        title: "Odborná společnost",
        description:
          "Firma publikuje reference, dokumenty a odborný obsah z jednoho CMS.",
      },
    ],
  },
  faq: {
    eyebrow: "ČASTÉ DOTAZY",
    title: "Co je dobré vědět před začátkem.",
    items: [
      {
        question: "Pomůžete mi i se strukturou obsahu?",
        answer:
          "Ano. Společně určíme, co návštěvník potřebuje vědět a v jakém pořadí. Samotné texty mohu připravit s vámi nebo navázat spolupráci s copywriterem.",
      },
      {
        question: "Budu si moci web upravovat?",
        answer:
          "Ano, pokud je správa obsahu součástí zadání. Administraci nastavím tak, aby běžné úpravy byly bezpečné a přehledné.",
      },
      {
        question: "Je součástí i měření návštěvnosti?",
        answer:
          "Může být. Domluvíme důležité události, souhlasy a vhodný analytický nástroj podle vašich potřeb.",
      },
      {
        question: "Jak dlouho tvorba webu trvá?",
        answer:
          "Záleží na rozsahu, připravenosti obsahu a rychlosti zpětné vazby. Harmonogram stanovím až po úvodní konzultaci.",
      },
    ],
  },
  related: ["shoptet", "webove-aplikace-na-miru"],
  finalCta: {
    eyebrow: "POJĎME TO PROBRAT",
    title: "Máte představu, co byste chtěli vytvořit?",
    description:
      "Popište mi svůj nápad nebo současný problém. Společně zjistíme, jaké řešení pro vás dává smysl.",
    action: "Nezávazně probrat projekt",
  },
} satisfies ServiceDetailCopy;
