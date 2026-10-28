import type { ServiceDetailCopy } from "../../service-detail-content";

export default {
  meta: {
    title: "API a integrace firemních systémů | Jakub Vantuch",
    description:
      "Bezpečné propojení firemních systémů, synchronizace dat a dohled nad chybami integrace.",
  },
  name: "API a integrace",
  hero: {
    eyebrow: "API A INTEGRACE",
    title: "Propojte systémy, které dnes fungují každý zvlášť.",
    description:
      "Spolehlivý přenos dat mezi webem, CRM, účetnictvím, platbami a dalšími nástroji s dostupným rozhraním.",
    primary: "Probrat integraci",
    secondary: "Jak probíhá propojení",
  },
  visual: {
    badge: "SYSTÉMY PROPOJENY",
    title: "Data se předají bez ručního přepisování",
    items: ["Web nebo aplikace", "Ověřený přenos", "Cílový systém"],
  },
  benefits: {
    eyebrow: "PŘÍNOS PRO PROVOZ",
    title: "Aktuálnější data a méně opakované administrativy.",
    description:
      "Integrace navrhuji s ohledem na výpadky, opakované požadavky a dohledatelnost změn.",
    items: [
      {
        title: "Méně přepisování",
        description:
          "Informace se předávají mezi podporovanými systémy automaticky.",
      },
      {
        title: "Lepší konzistence",
        description: "Jasně určený zdroj dat omezuje rozdíly mezi nástroji.",
      },
      {
        title: "Kontrola chyb",
        description:
          "Monitoring a logy pomáhají včas odhalit neúspěšný přenos.",
      },
    ],
  },
  workflow: {
    eyebrow: "JAK INTEGRACE FUNGUJE",
    title: "Každý přenos má pravidla, kontrolu a bezpečný návrat.",
    description:
      "Dostupnost závisí na API a podmínkách konkrétních poskytovatelů.",
    steps: [
      {
        title: "Zdrojová událost",
        description: "Objednávka, formulář nebo změna stavu spustí proces.",
      },
      {
        title: "Ověření dat",
        description: "Systém zkontroluje formát, oprávnění a povinné údaje.",
      },
      {
        title: "Bezpečný přenos",
        description: "Data se odešlou podporovaným a chráněným rozhraním.",
      },
      {
        title: "Potvrzení a monitoring",
        description:
          "Výsledek se uloží, chyby se zaznamenají a mohou se opakovat.",
      },
    ],
  },
  sections: [
    {
      id: "odolnost",
      eyebrow: "SPOLEHLIVOST",
      title: "Integrace musí počítat i s tím, že něco není dostupné.",
      tone: "soft",
      items: [
        {
          title: "Opakování požadavků",
          description: "Dočasný výpadek nemusí znamenat ztrátu dat.",
        },
        {
          title: "Ochrana proti duplicitám",
          description: "Stejná událost se nezpracuje nekontrolovaně vícekrát.",
        },
        {
          title: "Monitoring",
          description: "Důležité chyby jsou viditelné a dohledatelné.",
        },
        {
          title: "Bezpečný přístup",
          description:
            "Klíče, oprávnění a osobní údaje se spravují podle účelu.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "PŘÍKLADY VYUŽITÍ",
    title: "Propojení tam, kde dává provozní smysl.",
    description: "Předem ověřím dostupná rozhraní a limity.",
    items: [
      {
        title: "Web → CRM",
        description:
          "Ověřená poptávka založí kontakt a obchodní případ bez ručního přepisu.",
      },
      {
        title: "Platba → služba",
        description: "Potvrzená platba bezpečně aktivuje navazující proces.",
      },
      {
        title: "Sklad → e-shop",
        description:
          "Dostupná data o zásobách se synchronizují podle pravidel systému.",
      },
    ],
  },
  faq: {
    eyebrow: "ČASTÉ DOTAZY",
    title: "Nejdřív ověřit, potom slibovat.",
    items: [
      {
        question: "Lze propojit libovolné dva systémy?",
        answer:
          "Ne vždy. Oba systémy musí poskytovat vhodné API, export nebo jinou podporovanou cestu. Možnosti ověřím před návrhem.",
      },
      {
        question: "Co se stane při výpadku?",
        answer:
          "Podle rizika lze použít frontu, opakování a upozornění. Cílem je, aby chyba byla dohledatelná a data se neztratila.",
      },
      {
        question: "Jak se chrání přístupové údaje?",
        answer:
          "Tajné klíče nepatří do klientského prohlížeče ani zdrojového kódu. Ukládají se v chráněném prostředí a používají s minimálním oprávněním.",
      },
      {
        question: "Lze integraci později rozšířit?",
        answer:
          "Ano, pokud s tím návrh počítá a cílové systémy potřebné možnosti podporují.",
      },
    ],
  },
  related: ["webove-aplikace-na-miru", "vernostni-programy", "shoptet"],
  finalCta: {
    eyebrow: "POJĎME TO PROBRAT",
    title: "Máte představu, co byste chtěli propojit?",
    description:
      "Popište mi současný postup a používané nástroje. Ověříme, jaké řešení je realistické a přínosné.",
    action: "Nezávazně probrat integraci",
  },
} satisfies ServiceDetailCopy;
