import type { ServiceDetailCopy } from "../../service-detail-content";

export default {
  meta: {
    title: "CMS a správa obsahu webu | Jakub Vantuch",
    description:
      "Přehledná správa webového obsahu, médií a publikačních oprávnění pro firmy a týmy.",
  },
  name: "CMS a správa obsahu",
  hero: {
    eyebrow: "CMS A SPRÁVA OBSAHU",
    title: "Aktualizujte web bez obav, že něco rozbijete.",
    description:
      "Obsahová správa navržená pro vaše stránky, služby, produkty, média a týmové role.",
    primary: "Probrat správu obsahu",
    secondary: "Jak funguje CMS",
  },
  visual: {
    badge: "OBSAH PŘIPRAVEN K PUBLIKACI",
    title: "Editace bez zásahu do designu",
    items: ["Stránky a služby", "Média", "Role a schvalování"],
  },
  benefits: {
    eyebrow: "PŘÍNOS PRO TÝM",
    title: "Obsah se mění rychle, vzhled zůstává konzistentní.",
    description:
      "Editor dostane přesně ty možnosti, které potřebuje pro bezpečnou každodenní práci.",
    items: [
      {
        title: "Jednoduché úpravy",
        description:
          "Texty, fotografie a položky upravíte v přehledných polích.",
      },
      {
        title: "Jednotný vzhled",
        description: "Předpřipravené bloky udrží design napříč webem.",
      },
      {
        title: "Řízené publikování",
        description:
          "Role a workflow mohou oddělit přípravu, kontrolu a zveřejnění.",
      },
    ],
  },
  workflow: {
    eyebrow: "JAK TO FUNGUJE",
    title: "Obsah má jasnou cestu od konceptu k publikaci.",
    description: "Workflow přizpůsobím velikosti týmu a citlivosti změn.",
    steps: [
      {
        title: "Příprava",
        description: "Editor vytvoří nebo upraví obsah v definované struktuře.",
      },
      {
        title: "Kontrola",
        description: "Náhled ukáže výsledek před zveřejněním.",
      },
      {
        title: "Schválení",
        description: "U vybraného obsahu může změnu potvrdit odpovědná role.",
      },
      {
        title: "Publikace",
        description: "Obsah se bezpečně zobrazí návštěvníkům webu.",
      },
    ],
  },
  sections: [
    {
      id: "funkce",
      eyebrow: "MOŽNOSTI CMS",
      title: "Správa odpovídající typu obsahu.",
      items: [
        {
          title: "Stránky a služby",
          description: "Strukturovaná pole pro přehlednou prezentaci nabídky.",
        },
        {
          title: "Média",
          description: "Knihovna obrázků a souborů s vhodnými popisy.",
        },
        {
          title: "Uživatelské role",
          description: "Oprávnění pro editory, schvalovatele a administrátory.",
        },
        {
          title: "Náhled a plánování",
          description: "Kontrola změn a případné naplánování publikace.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "PŘÍKLADY VYUŽITÍ",
    title: "CMS podle toho, co skutečně publikujete.",
    description: "Datový model přizpůsobím obsahu, ne naopak.",
    items: [
      {
        title: "Síť poboček",
        description:
          "Tým spravuje kontakty, otevírací dobu a služby pro každou pobočku.",
      },
      {
        title: "Produktový web",
        description:
          "Produkty mají jednotné parametry, média a související dokumenty.",
      },
      {
        title: "Odborný obsah",
        description:
          "Články procházejí přípravou, kontrolou a publikací podle rolí.",
      },
    ],
  },
  faq: {
    eyebrow: "ČASTÉ DOTAZY",
    title: "Správa bez zbytečných kompromisů.",
    items: [
      {
        question: "Jaké CMS používáte?",
        answer:
          "Volbu přizpůsobím rozsahu, typu obsahu, rozpočtu a požadavkům na provoz. Nejdřív potřebuji poznat váš publikační proces.",
      },
      {
        question: "Může obsah upravovat více lidí?",
        answer:
          "Ano. Lze nastavit rozdílné role a oprávnění, případně schvalování před publikací.",
      },
      {
        question: "Lze převést obsah ze starého webu?",
        answer:
          "Ano, pokud lze data bezpečně získat. U větších migrací nejdřív prověřím kvalitu a strukturu zdroje.",
      },
      {
        question: "Dostaneme zaškolení?",
        answer:
          "Ano. Součástí předání může být krátké školení a dokumentace pro běžné úpravy.",
      },
    ],
  },
  related: ["firemni-weby", "webove-aplikace-na-miru"],
  finalCta: {
    eyebrow: "POJĎME TO PROBRAT",
    title: "Máte představu, co byste chtěli vytvořit?",
    description:
      "Popište mi svůj nápad nebo současný problém. Společně zjistíme, jaké řešení pro vás dává smysl.",
    action: "Nezávazně probrat projekt",
  },
} satisfies ServiceDetailCopy;
