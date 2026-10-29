import type { ServiceDetailCopy } from "@/lib/services/detail-content";

export default {
  meta: {
    title: "Online dárkové poukazy s platbou a PDF | Jakub Vantuch",
    description:
      "Online prodej dárkových poukazů, bezpečné ověření platby, automatické PDF a správa uplatnění.",
  },
  name: "Dárkové poukazy",
  hero: {
    eyebrow: "DÁRKOVÉ POUKAZY",
    title: "Dárkové poukazy bez starostí.",
    description:
      "Zákazník vybere poukaz, zaplatí online a automaticky obdrží PDF e-mailem. Vy máte přehled o prodeji, platnosti i uplatnění.",
    primary: "Chci prodávat dárkové poukazy",
    secondary: "Jak funguje prodej poukazů",
  },
  visual: {
    badge: "POUKAZ PŘIPRAVEN",
    title: "Zaplacený, vygenerovaný a dohledatelný",
    items: ["Unikátní kód", "PDF s QR kódem", "Stav uplatnění"],
  },
  benefits: {
    eyebrow: "PŘÍNOS PRO PROVOZ",
    title: "Prodávejte 24/7 bez ručního vystavování.",
    description:
      "Od zaplacení přes vytvoření PDF až po uplatnění má zákazník jednoduchou cestu a vy přehled nad každým poukazem.",
    items: [
      {
        title: "Pohodlný nákup",
        description:
          "Zákazník vybere poukaz, věnování i příjemce z telefonu nebo počítače.",
      },
      {
        title: "Automatické doručení",
        description:
          "Po ověřené platbě systém připraví PDF a odešle e-mail nebo bezpečný odkaz.",
      },
      {
        title: "Kontrolované uplatnění",
        description:
          "Obsluha ověří stav a potvrdí čerpání v chráněném rozhraní.",
      },
    ],
  },
  workflow: {
    eyebrow: "CESTA ZÁKAZNÍKA",
    title: "Od výběru po bezpečné uplatnění.",
    description:
      "Poukaz vzniká až po potvrzení platby serverem, nikdy jen podle návratu zákazníka na stránku s úspěchem.",
    steps: [
      {
        title: "Výběr poukazu",
        description: "Zákazník zvolí hodnotu nebo konkrétní službu.",
      },
      {
        title: "Údaje a věnování",
        description: "Doplní příjemce, odesílatele a volitelnou osobní zprávu.",
      },
      {
        title: "Online platba",
        description:
          "Platba proběhne přes vybranou podporovanou platební bránu.",
      },
      {
        title: "Vystavení poukazu",
        description: "Systém vytvoří jedinečný kód, stav a dobu platnosti.",
      },
      {
        title: "PDF a e-mail",
        description:
          "Vygeneruje značkové PDF a odešle přílohu nebo bezpečný odkaz.",
      },
      {
        title: "Kontrola obsluhou",
        description: "Zaměstnanec načte QR kód nebo zadá kód poukazu.",
      },
      {
        title: "Uplatnění",
        description:
          "Po ověření oprávněná obsluha potvrdí úplné nebo sjednané částečné čerpání.",
      },
    ],
  },
  demo: "voucher",
  demoCopy: {
    eyebrow: "INTERAKTIVNÍ UKÁZKA",
    title: "Sestavte si dárkový poukaz.",
  },
  sections: [
    {
      id: "typy",
      eyebrow: "TYPY POUKAZŮ",
      title: "Nabídka může odpovídat vašim službám i způsobu prodeje.",
      description:
        "Konkrétní varianty závisí na zvoleném řešení a obchodních podmínkách.",
      items: [
        {
          title: "Pevná hodnota",
          description: "Předem připravené částky s jasnou cenou a platností.",
        },
        {
          title: "Vlastní hodnota",
          description:
            "Zákazník zadá částku v povoleném rozmezí, pokud je tato možnost součástí řešení.",
        },
        {
          title: "Konkrétní služba",
          description:
            "Poukaz je vystaven na masáž, proceduru, menu nebo jinou službu.",
        },
        {
          title: "Propagační poukaz",
          description:
            "Speciální nabídka s vlastními pravidly a omezenou dobou prodeje.",
        },
        {
          title: "Osobní věnování",
          description: "Volitelný odesílatel, příjemce a zpráva na poukazu.",
        },
        {
          title: "Nastavitelná platnost",
          description:
            "Doba platnosti a podmínky se řídí zvolenou konfigurací a pravidly firmy.",
        },
      ],
    },
    {
      id: "pdf",
      eyebrow: "PDF POUKAZ",
      title: "Poukaz, který odpovídá vaší značce a obsahuje vše podstatné.",
      items: [
        {
          title: "Vzhled a logo",
          description: "Design navazuje na vizuální styl provozovny.",
        },
        {
          title: "Hodnota nebo služba",
          description: "Zákazník i obsluha jasně vidí, na co je poukaz určen.",
        },
        {
          title: "Unikátní kód a QR",
          description:
            "Kód identifikuje poukaz, ale sám o sobě neopravňuje k uplatnění.",
        },
        {
          title: "Platnost a pokyny",
          description:
            "Datum expirace a srozumitelný postup rezervace či využití.",
        },
        {
          title: "Osobní zpráva",
          description: "Volitelné věnování a údaje příjemce.",
        },
        {
          title: "Doručení",
          description: "Stažení PDF a e-mailová příloha nebo chráněný odkaz.",
        },
      ],
    },
    {
      id: "znacka-a-zazitek",
      eyebrow: "ZNAČKA A ZÁŽITEK",
      title: "Poukaz, který působí jako přirozená součást vaší značky.",
      tone: "navy",
      layout: "list",
      description:
        "Od nákupu po předání dárku může každý detail navazovat na váš vizuální styl i způsob, jakým komunikujete se zákazníky.",
      items: [
        {
          title: "Vzhled podle vaší značky",
          description:
            "Barvy, logo a typografie navazují na web i prostředí provozovny.",
        },
        {
          title: "Osobní věnování",
          description:
            "Zákazník může doplnit příjemce, odesílatele a vlastní zprávu.",
        },
        {
          title: "Jasné informace",
          description:
            "Hodnota, platnost i postup rezervace jsou srozumitelné na první pohled.",
        },
        {
          title: "V mobilu i k vytištění",
          description:
            "Poukaz se dobře předává digitálně a zároveň vypadá reprezentativně na papíře.",
        },
      ],
    },
    {
      id: "sprava",
      eyebrow: "SPRÁVA PRO FIRMU",
      title: "Každý poukaz má dohledatelný stav a historii.",
      tone: "soft",
      items: [
        {
          title: "Seznam a vyhledávání",
          description:
            "Filtry podle kódu, data, typu, hodnoty a aktuálního stavu.",
        },
        {
          title: "Stavy poukazu",
          description:
            "Čeká na platbu, aktivní, uplatněný, expirovaný nebo zrušený podle zvoleného řešení.",
        },
        {
          title: "Historie uplatnění",
          description: "Kdo, kdy a v jakém rozsahu poukaz uplatnil.",
        },
        {
          title: "Opětovné odeslání",
          description:
            "Oprávněný pracovník může znovu odeslat e-mail nebo odkaz.",
        },
        {
          title: "Ruční vystavení a zrušení",
          description: "Pouze s odpovídajícím oprávněním a auditním záznamem.",
        },
        {
          title: "Základní reporty",
          description: "Přehled prodeje, aktivních poukazů a uplatnění.",
        },
      ],
    },
    {
      id: "uplatneni",
      eyebrow: "UPLATNĚNÍ POUKAZU",
      title: "Rychlá kontrola pro obsluhu, ochrana proti dvojímu čerpání.",
      items: [
        {
          title: "1. Předložení",
          description: "Zákazník ukáže PDF, vytištěný poukaz nebo samotný kód.",
        },
        {
          title: "2. Načtení",
          description: "Obsluha naskenuje QR kód nebo zadá identifikátor.",
        },
        {
          title: "3. Ověření",
          description:
            "Systém zkontroluje platnost, stav a případný dostupný zůstatek.",
        },
        {
          title: "4. Potvrzení",
          description:
            "Oprávněný zaměstnanec potvrdí čerpání a systém bezpečně aktualizuje stav.",
        },
      ],
    },
    {
      id: "email",
      eyebrow: "E-MAILOVÉ DORUČENÍ",
      title: "Zákazník dostane poukaz po potvrzené platbě.",
      description:
        "Lze použít značkovou šablonu, PDF přílohu nebo bezpečný odkaz, opětovné odeslání a základní sledování výsledku doručení. Nelze zaručit umístění ve schránce příjemce.",
      items: [
        {
          title: "Automatická zpráva",
          description: "Odejde až po bezpečně potvrzené platbě.",
        },
        {
          title: "Značková šablona",
          description:
            "Vzhled e-mailu navazuje na provozovnu a vysvětluje další kroky.",
        },
        {
          title: "Příloha nebo odkaz",
          description:
            "Zvolený způsob doručení respektuje bezpečnost a omezení poskytovatele.",
        },
      ],
    },
    {
      id: "podminky",
      eyebrow: "OBCHODNÍ A PRÁVNÍ NÁVAZNOSTI",
      title: "Technické řešení musí respektovat vaše podmínky.",
      tone: "soft",
      layout: "list",
      items: [
        {
          title: "Platnost a storno",
          description:
            "Délku platnosti, zrušení a vrácení je potřeba sladit s obchodními podmínkami a platným právem.",
        },
        {
          title: "Daně a evidence",
          description:
            "Daňové zacházení nelze určit obecně; ověřte ho podle typu poukazu a svého účetního režimu.",
        },
        {
          title: "Informace pro zákazníka",
          description:
            "Nákupní proces má jasně vysvětlit cenu, platnost, uplatnění a kontakt pro řešení potíží.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "PRO KOHO SE HODÍ",
    title: "Poukazy pro služby, zážitky i lokální provozy.",
    description:
      "Nabídka a pravidla se vždy přizpůsobují konkrétnímu podnikání.",
    items: [
      {
        title: "Masážní nebo wellness studio",
        description:
          "Zákazník koupí konkrétní proceduru nebo hodnotový poukaz jako dárek.",
      },
      {
        title: "Salon a kadeřnictví",
        description:
          "Poukaz lze vystavit na službu nebo částku a ověřit přímo u recepce.",
      },
      {
        title: "Restaurace a lokální služba",
        description:
          "Online nákup zpřístupní poukazy i zákazníkům mimo otevírací dobu.",
      },
    ],
  },
  faq: {
    eyebrow: "ČASTÉ DOTAZY",
    title: "Co je dobré vyjasnit před spuštěním prodeje.",
    items: [
      {
        question: "Může si zákazník koupit poukaz přímo na webu?",
        answer:
          "Ano. Může vybrat typ, doplnit údaje a přejít na podporovanou platební bránu.",
      },
      {
        question: "Dostane poukaz automaticky e-mailem?",
        answer:
          "Ano, po bezpečném potvrzení platby může systém připravit PDF a odeslat přílohu nebo odkaz. Doručení do hlavní schránky ale nelze garantovat.",
      },
      {
        question: "Mohu použít vlastní grafický design?",
        answer:
          "Ano. PDF i e-mail mohou vycházet z vaší značky a obsahovat potřebné údaje a pokyny.",
      },
      {
        question: "Jak funguje platba kartou?",
        answer:
          "Platbu zpracuje vybraný poskytovatel. Systém vystaví poukaz až po ověřené serverové informaci o úspěšné platbě.",
      },
      {
        question: "Jak ověřím platnost poukazu?",
        answer:
          "Oprávněná obsluha načte QR nebo zadá kód a uvidí stav, platnost a historii. QR kód sám nic neuplatní.",
      },
      {
        question: "Lze poukaz uplatnit jen částečně?",
        answer:
          "U hodnotových poukazů je to možné navrhnout, pokud je částečné čerpání součástí dohodnutého rozsahu a evidence.",
      },
      {
        question: "Mohu prodávat poukazy na konkrétní služby?",
        answer:
          "Ano. Poukaz může označovat konkrétní službu, variantu nebo předem definovanou hodnotu.",
      },
      {
        question: "Potřebuji speciální čtečku QR kódů?",
        answer:
          "Ne nutně. Často stačí telefon nebo tablet obsluhy. Samostatnou čtečku lze prověřit podle provozu.",
      },
      {
        question: "Jaké jsou průběžné náklady?",
        answer:
          "Záleží na hostingu, objemu transakcí, platební bráně, e-mailové službě a podpoře. Přesný odhad připravím podle zvoleného řešení.",
      },
    ],
  },
  related: ["firemni-weby", "shoptet"],
  finalCta: {
    eyebrow: "POJĎME TO PROBRAT",
    title: "Chcete prodávat poukazy bez ručního vystavování?",
    description:
      "Popište mi typy poukazů, současný web a způsob uplatnění. Společně navrhneme bezpečný nákupní i provozní proces.",
    action: "Probrat dárkové poukazy",
  },
} satisfies ServiceDetailCopy;
