import type { ServiceDetailCopy } from "@/lib/services/detail-content";

export default {
  meta: {
    title:
      "Digitální věrnostní programy pro služby a provozovny | Jakub Vantuch",
    description:
      "Digitální věrnostní karty, body, návštěvy a odměny bez nutnosti instalovat zákaznickou aplikaci.",
  },
  name: "Digitální věrnostní programy",
  hero: {
    eyebrow: "DIGITÁLNÍ VĚRNOSTNÍ PROGRAMY",
    title: "Dejte zákazníkům důvod se vracet.",
    description:
      "Podpořte opakované návštěvy pomocí digitální karty, kterou zákazník otevře v mobilu a obsluha snadno spravuje.",
    primary: "Navrhnout věrnostní program",
    secondary: "Jak funguje digitální karta",
  },
  visual: {
    badge: "DIGITÁLNÍ KARTA",
    title: "Bez plastové kartičky a nutnosti instalovat aplikaci",
    items: ["Osobní QR kód", "Aktuální stav", "Dostupná odměna"],
  },
  benefits: {
    eyebrow: "PROČ DIGITÁLNĚ",
    title: "Více důvodů k návratu, méně ruční evidence.",
    description:
      "Zákazník vidí svůj postup k odměně v mobilu. Vy nastavíte pravidla podle svého provozu a máte přehled o každé změně.",
    items: [
      {
        title: "Snadné pro zákazníka",
        description:
          "Kartu otevře z odkazu v mobilu bez povinné instalace aplikace nebo plastové kartičky.",
      },
      {
        title: "Odměny podle provozu",
        description:
          "Body, razítka, návštěvy nebo úrovně lze navrhnout podle vašeho provozu.",
      },
      {
        title: "Přehled o programu",
        description:
          "Historie změn pomáhá chránit odměny před chybným či neoprávněným připsáním.",
      },
    ],
  },
  workflow: {
    eyebrow: "JAK TO FUNGUJE",
    title: "Čtyři jednoduché kroky pro zákazníka i obsluhu.",
    description:
      "QR kód zákazníka slouží k identifikaci. Samotný kód nikdy neopravňuje ke změně bodů nebo uplatnění odměny.",
    steps: [
      {
        title: "Registrace zákazníka",
        description:
          "Zákazník se zaregistruje jednoduchým webovým formulářem nebo jiným zvoleným postupem.",
      },
      {
        title: "Digitální věrnostní karta",
        description:
          "Obdrží osobní kartu s QR kódem nebo zákaznickým identifikátorem.",
      },
      {
        title: "Záznam návštěvy či nákupu",
        description:
          "Oprávněný zaměstnanec potvrdí transakci a připíše body, razítko nebo návštěvu.",
      },
      {
        title: "Využití odměny",
        description:
          "Zákazník vidí postup a po splnění pravidel může odměnu uplatnit u obsluhy.",
      },
    ],
  },
  sections: [
    {
      id: "zpusoby-pouziti",
      eyebrow: "TŘI ZPŮSOBY POUŽITÍ",
      title: "Vybereme způsob, který odpovídá vašemu provozu.",
      description:
        "Pro malé provozovny bývá nejjednodušší karta zákazníka a telefon obsluhy.",
      items: [
        {
          title: "Karta zákazníka + telefon obsluhy",
          description:
            "Zákazník ukáže osobní QR kód. Obsluha ho načte telefonem nebo tabletem, otevře záznam a potvrdí oprávněnou transakci.",
          note: "Doporučené pro malé firmy. Není potřeba samostatná čtečka.",
        },
        {
          title: "Samostatná QR čtečka",
          description:
            "U recepce nebo pokladny čtečka identifikuje zákazníka a zaměstnanec následně potvrdí návštěvu či nákup.",
          note: "Kompatibilita závisí na typu čtečky a pokladním řešení.",
        },
        {
          title: "QR kód v provozovně",
          description:
            "Zákazník načte kód u recepce a otevře check-in. Návštěvu musí potvrdit oprávněný pracovník nebo jiný důvěryhodný mechanismus.",
          note: "Veřejný statický kód nikdy nesmí umožnit neomezené připisování bodů.",
        },
      ],
    },
    {
      id: "typy-programu",
      eyebrow: "NASTAVENÍ ODMĚN",
      title: "Věrnostní program může mít různá pravidla.",
      description:
        "Konkrétní kombinace se navrhuje podle ekonomiky služby a chování zákazníků; není automaticky součástí každé realizace.",
      items: [
        {
          title: "Razítková karta",
          description:
            "Například každá desátá oprávněná návštěva přinese odměnu.",
        },
        {
          title: "Body za nákup",
          description:
            "Počet bodů se odvíjí od ověřené hodnoty nákupu nebo služby.",
        },
        {
          title: "Členské úrovně",
          description: "Různé úrovně mohou nabízet odlišné výhody a pravidla.",
        },
        {
          title: "Odměny za návštěvy",
          description:
            "Výhoda se zpřístupní po předem stanoveném počtu návštěv.",
        },
        {
          title: "Narozeniny a výročí",
          description:
            "Volitelné osobní benefity pouze s vhodnými oprávněními a údaji.",
        },
        {
          title: "Odměna za doporučení",
          description:
            "Benefit se připíše až po ověření skutečně dokončeného doporučení.",
        },
      ],
    },
    {
      id: "administrace",
      eyebrow: "SPRÁVA PRO FIRMU",
      title: "Obsluha má rychlý přehled, vedení dohledatelnou historii.",
      tone: "soft",
      items: [
        {
          title: "Zákazníci a zůstatky",
          description:
            "Seznam zákazníků, aktuální stav a historie návštěv nebo transakcí.",
        },
        {
          title: "Odměny a uplatnění",
          description:
            "Definice pravidel, dostupné odměny a historie jejich uplatnění.",
        },
        {
          title: "Role zaměstnanců",
          description:
            "Každý pracovník má oprávnění odpovídající své činnosti.",
        },
        {
          title: "Základní reporty",
          description:
            "Přehled aktivity programu bez slibování konkrétního obchodního výsledku.",
        },
        {
          title: "Ochrana před duplicitami",
          description:
            "Ověření omezuje dvojí připsání stejné návštěvy nebo odměny.",
        },
      ],
    },
    {
      id: "integrace",
      eyebrow: "INTEGRACE A ROZŠÍŘENÍ",
      title: "Program může navázat na nástroje, které už používáte.",
      description:
        "Dostupnost závisí na vybraných systémech, jejich API, podmínkách poskytovatelů a rozsahu projektu.",
      items: [
        {
          title: "Apple Wallet / Google Wallet",
          description:
            "Volitelné přidání karty do mobilní peněženky podle požadavků poskytovatele.",
        },
        {
          title: "Rezervace a pokladna",
          description:
            "Ověřené transakce mohou aktualizovat stav, pokud daný systém nabízí vhodné rozhraní.",
        },
        {
          title: "CRM a e-mail",
          description:
            "Souhlasy, segmenty a notifikace lze řešit v návaznosti na zákaznická data.",
        },
        {
          title: "Více poboček",
          description:
            "Pravidla, zaměstnanci a přehledy lze navrhnout pro síť provozoven.",
        },
      ],
    },
    {
      id: "bezpecnost",
      eyebrow: "BEZPEČNOST A SOUKROMÍ",
      title: "Odměny musí být pohodlné, ne snadno zneužitelné.",
      tone: "navy",
      layout: "list",
      items: [
        {
          title: "Oprávněná obsluha",
          description:
            "Připsání a uplatnění provádí přihlášený zaměstnanec s konkrétní rolí.",
        },
        {
          title: "Bezpečná identifikace",
          description:
            "QR kód identifikuje zákazníka, ale sám o sobě nic neschvaluje.",
        },
        {
          title: "Dohledatelné změny",
          description:
            "Auditní historie zaznamená připsání, opravy i uplatnění odměny.",
        },
        {
          title: "Přiměřená data",
          description:
            "Systém sbírá jen potřebné údaje a počítá s retenční dobou i žádostí o výmaz.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "PRO KOHO SE HODÍ",
    title: "Pro podniky, kde se spokojený zákazník přirozeně vrací.",
    description:
      "Pravidla se vždy přizpůsobují konkrétní službě a její ekonomice.",
    items: [
      {
        title: "Masážní a wellness studio",
        description:
          "Zákazník sbírá ověřené návštěvy a vidí cestu k další výhodě.",
      },
      {
        title: "Kosmetika a kadeřnictví",
        description:
          "Odměna podporuje pravidelnou péči bez plastových kartiček.",
      },
      {
        title: "Kavárna nebo lokální služba",
        description:
          "Jednoduchá digitální razítka fungují na telefonu zákazníka i obsluhy.",
      },
    ],
  },
  faq: {
    eyebrow: "ČASTÉ DOTAZY",
    title: "Praktické otázky před spuštěním programu.",
    items: [
      {
        question: "Potřebují zákazníci instalovat aplikaci?",
        answer:
          "Ne nutně. Karta může fungovat jako mobilní web otevřený z odkazu. Volitelně lze prověřit i přidání do Apple Wallet nebo Google Wallet.",
      },
      {
        question: "Musím kupovat čtečku QR kódů?",
        answer:
          "Ne. Pro menší provozovnu obvykle stačí telefon nebo tablet obsluhy s kamerou. Samostatnou čtečku lze řešit podle pokladního místa a kompatibility.",
      },
      {
        question: "Může zákazník používat kartu přímo v mobilu?",
        answer:
          "Ano. Uvidí svůj identifikátor, aktuální stav i dostupné odměny v rozhraní přizpůsobeném mobilu.",
      },
      {
        question: "Jak se připisují body nebo návštěvy?",
        answer:
          "Po ověření nákupu nebo návštěvy je připíše oprávněný zaměstnanec, případně potvrzená integrace. Samotný QR kód změnu neautorizuje.",
      },
      {
        question: "Mohu nastavit vlastní pravidla odměn?",
        answer:
          "Ano, pravidla se navrhují podle vašeho provozu. Přesný rozsah funkcí bude součástí konkrétního zadání.",
      },
      {
        question: "Lze systém propojit s rezervačním nebo pokladním systémem?",
        answer:
          "Někdy ano. Nejdřív je nutné ověřit dostupné API, pravidla poskytovatele a kvalitu předávaných dat.",
      },
      {
        question: "Co když zákazník ztratí přístup ke kartě?",
        answer:
          "Po bezpečném ověření identity lze přístup obnovit nebo kartu znovu zpřístupnit podle zvoleného způsobu registrace.",
      },
      {
        question: "Kolik stojí provoz věrnostního programu?",
        answer:
          "Záleží na rozsahu, hostingu, počtu uživatelů, integracích a případných službách třetích stran. Konkrétní odhad připravím po upřesnění řešení.",
      },
    ],
  },
  related: ["webove-aplikace-na-miru", "firemni-weby"],
  finalCta: {
    eyebrow: "NAVRHNĚME VÁŠ PROGRAM",
    title: "Máte představu, jak chcete zákazníky odměňovat?",
    description:
      "Popište mi svůj provoz, četnost návštěv a současný způsob evidence. Společně navrhneme bezpečný a srozumitelný program.",
    action: "Probrat věrnostní program",
  },
} satisfies ServiceDetailCopy;
