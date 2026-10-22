import type { Locale } from "@/lib/content";

export const allServiceDetailSlugs = [
  "firemni-weby",
  "webove-aplikace-na-miru",
  "shoptet",
  "cms",
  "api-integrace",
  "vernostni-programy",
  "webova-analytika",
  "crm",
  "darkove-poukazy",
] as const;

export type ServiceDetailSlug = (typeof allServiceDetailSlugs)[number];

export const serviceDetailSlugs = [
  "firemni-weby",
  "webove-aplikace-na-miru",
  "shoptet",
  "vernostni-programy",
  "darkove-poukazy",
] as const satisfies readonly ServiceDetailSlug[];

export type PublicServiceDetailSlug = (typeof serviceDetailSlugs)[number];

export type ServiceDetailItem = {
  title: string;
  description: string;
  note?: string;
};

export type ServiceDetailSection = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "soft" | "navy";
  layout?: "cards" | "list";
  items: ServiceDetailItem[];
};

export type ServiceDetailCopy = {
  meta: { title: string; description: string };
  name: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
  visual: {
    badge: string;
    title: string;
    items: string[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceDetailItem[];
  };
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ServiceDetailItem[];
  };
  demo?: "loyalty" | "voucher";
  demoCopy?: {
    eyebrow: string;
    title: string;
    description?: string;
  };
  sections: ServiceDetailSection[];
  useCases: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceDetailItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  related: ServiceDetailSlug[];
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  };
};

const cs = {
  "firemni-weby": {
    meta: {
      title: "Firemní weby, které podporují obchod | Jakub Vantuch",
      description:
        "Návrh a vývoj firemních webů, které budují důvěru, přivádějí poptávky a snadno se spravují.",
    },
    name: "Firemní weby",
    hero: {
      eyebrow: "FIREMNÍ WEBY",
      title: "Web, který srozumitelně ukáže, proč si vybrat právě vás.",
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
          description:
            "Ověřím formuláře, rychlost, zařízení i základní měření.",
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
            description:
              "Úprava obsahu, médií a služeb s odpovídajícími rolemi.",
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
  },
  "webove-aplikace-na-miru": {
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
          description:
            "Uživatelé pracují podle rolí a vidí relevantní historii.",
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
  },
  shoptet: {
    meta: {
      title: "E-shopy na Shoptetu a úpravy na míru | Jakub Vantuch",
      description:
        "Návrh, úpravy a integrace Shoptet e-shopů s důrazem na nákupní cestu, správu a měření.",
    },
    name: "E-shopy na Shoptetu",
    hero: {
      eyebrow: "E-SHOPY NA SHOPTETU",
      title: "E-shop, ve kterém se zákazník snadno rozhodne a nakoupí.",
      description:
        "Pro nové i zavedené obchody, které chtějí přehlednější vzhled, lepší nákupní cestu a smysluplná napojení.",
      primary: "Probrat e-shop",
      secondary: "Jak probíhá úprava",
    },
    visual: {
      badge: "NÁKUPNÍ CESTA",
      title: "Od produktu k dokončené objednávce",
      items: ["Přehledný katalog", "Jasný detail produktu", "Jednoduchý košík"],
    },
    benefits: {
      eyebrow: "PŘÍNOS PRO E-SHOP",
      title: "Lepší nákupní zkušenost bez zbytečné složitosti.",
      description:
        "Úpravy navrhuji podle sortimentu, zákazníků a reálných možností platformy Shoptet.",
      items: [
        {
          title: "Srozumitelná nabídka",
          description:
            "Kategorie, filtry a produktové stránky pomáhají s výběrem.",
        },
        {
          title: "Důvěryhodný vzhled",
          description:
            "Vizuální úpravy sjednotí e-shop se značkou a podporují rozhodování.",
        },
        {
          title: "Efektivnější provoz",
          description:
            "Dostupná napojení mohou omezit ruční práci s objednávkami a daty.",
        },
      ],
    },
    workflow: {
      eyebrow: "POSTUP REALIZACE",
      title: "Úpravy vycházejí z reálné nákupní cesty.",
      description:
        "Nejdřív ověřím možnosti tarifu, doplňků a dostupných rozhraní Shoptetu.",
      steps: [
        {
          title: "Audit a cíle",
          description:
            "Projdu sortiment, cílové zákazníky a problematická místa.",
        },
        {
          title: "Návrh změn",
          description:
            "Určíme priority pro vzhled, obsah, katalog a integrace.",
        },
        {
          title: "Úpravy a nastavení",
          description: "Změny připravím a ověřím v bezpečném rozsahu.",
        },
        {
          title: "Měření a rozvoj",
          description: "Sledujeme důležité kroky a plánujeme další zlepšení.",
        },
      ],
    },
    sections: [
      {
        id: "moznosti",
        eyebrow: "CO LZE ŘEŠIT",
        title: "Vzhled, obsah i provozní návaznosti.",
        items: [
          {
            title: "Úpravy šablony",
            description:
              "Barvy, typografie, komponenty a responzivní zobrazení.",
          },
          {
            title: "Katalog a produkty",
            description:
              "Struktura kategorií, parametry, varianty a prezentace produktů.",
          },
          {
            title: "Nákupní cesta",
            description:
              "Košík, důvěryhodné informace a odstranění zbytečných překážek.",
          },
          {
            title: "Doplňky a integrace",
            description:
              "Napojení pouze tam, kde jsou podporovaná a přinášejí provozní hodnotu.",
          },
        ],
      },
    ],
    useCases: {
      eyebrow: "PŘÍKLADY VYUŽITÍ",
      title: "Od nového obchodu po cílené zlepšení.",
      description: "Rozsah přizpůsobím stavu e-shopu.",
      items: [
        {
          title: "Nový e-shop",
          description:
            "Nastavení struktury, vzhledu, katalogu a základního měření.",
        },
        {
          title: "Redesign",
          description:
            "Sjednocení značky a zpřehlednění klíčových částí bez změny platformy.",
        },
        {
          title: "Provozní napojení",
          description:
            "Ověřené propojení dostupných služeb, které omezí ruční přepisování.",
        },
      ],
    },
    faq: {
      eyebrow: "ČASTÉ DOTAZY",
      title: "Co ověřit u Shoptetu.",
      items: [
        {
          question: "Lze upravit každý prvek e-shopu?",
          answer:
            "Rozsah závisí na šabloně, tarifu a možnostech Shoptetu. Před návrhem vždy ověřím, co je bezpečně a dlouhodobě udržitelné.",
        },
        {
          question: "Pomůžete i s importem produktů?",
          answer:
            "Ano, pokud jsou zdrojová data dostatečně kvalitní a Shoptet podporuje požadovaný způsob importu.",
        },
        {
          question: "Lze napojit účetnictví nebo sklad?",
          answer:
            "Záleží na konkrétním systému, dostupném doplňku nebo API. Možnosti nejdřív prověřím.",
        },
        {
          question: "Je součástí i analytika?",
          answer:
            "Může být. Nastavíme měření klíčových kroků nákupní cesty s ohledem na souhlasy a soukromí.",
        },
      ],
    },
    related: ["firemni-weby", "darkove-poukazy"],
    finalCta: {
      eyebrow: "POJĎME TO PROBRAT",
      title: "Máte představu, co byste chtěli vytvořit?",
      description:
        "Popište mi svůj nápad nebo současný problém. Společně zjistíme, jaké řešení pro vás dává smysl.",
      action: "Nezávazně probrat projekt",
    },
  },
  cms: {
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
          description:
            "Editor vytvoří nebo upraví obsah v definované struktuře.",
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
            description:
              "Strukturovaná pole pro přehlednou prezentaci nabídky.",
          },
          {
            title: "Média",
            description: "Knihovna obrázků a souborů s vhodnými popisy.",
          },
          {
            title: "Uživatelské role",
            description:
              "Oprávnění pro editory, schvalovatele a administrátory.",
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
  },
  "api-integrace": {
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
            description:
              "Stejná událost se nezpracuje nekontrolovaně vícekrát.",
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
  },
  "vernostni-programy": {
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
        "Digitální věrnostní karty, sbírání bodů nebo návštěv a zákaznické odměny. Jednoduchý systém pro vaše zákazníky i obsluhu.",
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
      title: "Pohodlnější pro zákazníka, přehlednější pro provoz.",
      description:
        "Zákazník může kartu otevřít přímo v mobilu. Obsluha pracuje jen s oprávněným rozhraním a každý pohyb je dohledatelný.",
      items: [
        {
          title: "Bez fyzických kartiček",
          description:
            "Karta může fungovat jako mobilní web nebo volitelně jako Wallet pass.",
        },
        {
          title: "Vlastní pravidla",
          description:
            "Body, razítka, návštěvy nebo úrovně lze navrhnout podle vašeho provozu.",
        },
        {
          title: "Přehled a kontrola",
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
    demo: "loyalty",
    demoCopy: {
      eyebrow: "INTERAKTIVNÍ UKÁZKA",
      title: "Vyzkoušejte si digitální věrnostní kartu.",
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
            description:
              "Různé úrovně mohou nabízet odlišné výhody a pravidla.",
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
            title: "Opravy a audit",
            description:
              "Ruční korekce vyžaduje oprávnění a zanechá dohledatelný záznam.",
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
          question:
            "Lze systém propojit s rezervačním nebo pokladním systémem?",
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
  },
  "webova-analytika": {
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
            description:
              "Vývoj návštěv, nejčastější vstupní stránky a zařízení.",
          },
          {
            title: "Kontaktní formuláře",
            description:
              "Odeslání, chyby a kroky, které formuláři předcházejí.",
          },
          {
            title: "Důležité akce",
            description:
              "Kliknutí na telefon, rezervace, stažení dokumentu nebo nákupní krok.",
          },
          {
            title: "Dashboardy",
            description:
              "Srozumitelné souhrny pro vedení nebo marketingový tým.",
          },
        ],
      },
    ],
    useCases: {
      eyebrow: "PŘÍKLADY VYUŽITÍ",
      title: "Data jako podklad, ne jako automatický slib výsledku.",
      description:
        "Analytika pomáhá odhalit souvislosti; sama nezaručuje růst.",
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
  },
  crm: {
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
            description:
              "Příjem poptávek a předávání dat do dostupných systémů.",
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
  },
  "darkove-poukazy": {
    meta: {
      title: "Online dárkové poukazy s platbou a PDF | Jakub Vantuch",
      description:
        "Online prodej dárkových poukazů, bezpečné ověření platby, automatické PDF a správa uplatnění.",
    },
    name: "Dárkové poukazy",
    hero: {
      eyebrow: "DÁRKOVÉ POUKAZY",
      title: "Prodávejte dárkové poukazy online. Bez ručního vyřizování.",
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
      title: "Prodej může fungovat i mimo otevírací dobu.",
      description:
        "Automatizace omezuje ruční vystavování, ale zachovává bezpečnou kontrolu platby a uplatnění.",
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
          description:
            "Doplní příjemce, odesílatele a volitelnou osobní zprávu.",
        },
        {
          title: "Online platba",
          description:
            "Platba proběhne přes vybranou podporovanou platební bránu.",
        },
        {
          title: "Ověření platby",
          description:
            "Server zpracuje důvěryhodné potvrzení poskytovatele a ochrání se před duplicitou.",
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
      title: "Sestavte si fiktivní dárkový poukaz.",
      description:
        "Ukázka pouze simuluje potvrzenou platbu, vytvoření PDF a uplatnění. Neprovádí platbu, neposílá e-mail ani nevystavuje platný poukaz.",
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
            description:
              "Zákazník i obsluha jasně vidí, na co je poukaz určen.",
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
        id: "platby",
        eyebrow: "PLATBY A SPOLEHLIVOST",
        title: "Poukaz se vystaví až po důvěryhodném potvrzení platby.",
        tone: "navy",
        layout: "list",
        description:
          "GoPay, Comgate a Stripe jsou příklady poskytovatelů. Volba závisí na poplatcích, metodách, požadavcích a vhodnosti pro konkrétní projekt.",
        items: [
          {
            title: "Ověřený webhook",
            description:
              "Systém zpracuje serverové potvrzení a tam, kde je to možné, ověří jeho podpis.",
          },
          {
            title: "Ochrana proti duplicitám",
            description:
              "Opakované doručení stejné události nevystaví další poukaz.",
          },
          {
            title: "Jasné stavy",
            description:
              "Objednávka rozlišuje čekající, zaplacenou, neúspěšnou, zrušenou či refundovanou platbu podle možností poskytovatele.",
          },
          {
            title: "Bezpečné výjimky",
            description:
              "Návrh počítá s přerušenou platbou, vrácením peněz i chargebackem.",
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
            description:
              "Pouze s odpovídajícím oprávněním a auditním záznamem.",
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
            description:
              "Zákazník ukáže PDF, vytištěný poukaz nebo samotný kód.",
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
  },
} satisfies Record<ServiceDetailSlug, ServiceDetailCopy>;

const en = {
  "firemni-weby": {
    ...cs["firemni-weby"],
    meta: {
      title: "Company websites that support sales | Jakub Vantuch",
      description:
        "Design and development of company websites that build trust, generate enquiries and remain easy to manage.",
    },
    name: "Company websites",
    hero: {
      eyebrow: "COMPANY WEBSITES",
      title: "A website that clearly shows why customers should choose you.",
      description:
        "For companies and service businesses that want to look professional, generate relevant enquiries and stay in control of their content.",
      primary: "Discuss a new website",
      secondary: "How it is built",
    },
    visual: {
      badge: "A CLEAR PATH TO ENQUIRY",
      title: "Visitors quickly find what matters",
      items: [
        "Services and benefits",
        "Credible references",
        "Clear contact route",
      ],
    },
    benefits: {
      eyebrow: "BUSINESS VALUE",
      title: "A professional presentation with a clear commercial purpose.",
      description:
        "I do not treat the website as a digital brochure. Its structure, content and contact journey reflect the people you want to reach.",
      items: [
        {
          title: "Greater trust",
          description:
            "A consistent visual style and clear content strengthen credibility.",
        },
        {
          title: "Better enquiries",
          description:
            "Visitors understand the offer and know what to do next.",
        },
        {
          title: "Easy management",
          description:
            "Your team can update common content without developer support.",
        },
      ],
    },
    workflow: {
      eyebrow: "HOW IT IS BUILT",
      title: "From business goals to a launched website.",
      description: "Every stage has a tangible output and room for feedback.",
      steps: [
        {
          title: "Goals and customers",
          description: "We clarify the offer, audience and desired actions.",
        },
        {
          title: "Structure and content",
          description: "I design the page hierarchy and visitor journey.",
        },
        {
          title: "Design and development",
          description: "A responsive interface is built around your brand.",
        },
        {
          title: "Testing and launch",
          description:
            "I verify forms, speed, devices and essential measurement.",
        },
      ],
    },
    sections: [
      {
        id: "options",
        eyebrow: "WHAT CAN BE INCLUDED",
        title: "Features aligned with the way your business works.",
        items: [
          {
            title: "Responsive design",
            description: "A clear experience on mobile, tablet and desktop.",
          },
          {
            title: "SEO foundations",
            description:
              "Technical structure, metadata and a meaningful content hierarchy.",
          },
          {
            title: "Forms and bookings",
            description:
              "A contact or booking journey connected to your process.",
          },
          {
            title: "Content management",
            description:
              "Pages, media and services with appropriate editorial roles.",
          },
        ],
      },
    ],
    useCases: {
      eyebrow: "REAL-WORLD EXAMPLES",
      title: "A website designed around a specific business model.",
      description:
        "The scope can range from a focused presentation to a content-rich website.",
      items: [
        {
          title: "Local service",
          description:
            "A studio presents services, prices and team members and guides customers to booking.",
        },
        {
          title: "B2B company",
          description:
            "A manufacturer explains its portfolio and collects qualified enquiries.",
        },
        {
          title: "Specialist business",
          description:
            "The company publishes references, documents and expert content from one CMS.",
        },
      ],
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Useful points before we start.",
      items: [
        {
          question: "Can you help with the content structure?",
          answer:
            "Yes. We decide what visitors need to know and in what order. Copy can be prepared together or with a specialist copywriter.",
        },
        {
          question: "Will I be able to update the website?",
          answer:
            "Yes, when content management is part of the scope. I configure administration so common changes remain safe and straightforward.",
        },
        {
          question: "Can analytics be included?",
          answer:
            "Yes. We define important actions, consent requirements and a suitable tool for your needs.",
        },
        {
          question: "How long does a website take?",
          answer:
            "It depends on scope, content readiness and feedback speed. I prepare a schedule after the initial consultation.",
        },
      ],
    },
    finalCta: {
      eyebrow: "LET'S TALK",
      title: "Do you have an idea of what you would like to create?",
      description:
        "Tell me about your idea or current problem. Together we will determine what solution makes sense.",
      action: "Discuss the project",
    },
  },
  "webove-aplikace-na-miru": {
    ...cs["webove-aplikace-na-miru"],
    meta: {
      title: "Custom web applications and internal systems | Jakub Vantuch",
      description:
        "Web applications, customer portals and internal systems that simplify business processes.",
    },
    name: "Web applications",
    hero: {
      eyebrow: "WEB APPLICATIONS",
      title: "A tool built around the way your team actually works.",
      description:
        "Internal systems, customer portals and dashboards for companies that have outgrown spreadsheets or off-the-shelf tools.",
      primary: "Discuss an application",
      secondary: "How it works",
    },
    visual: {
      badge: "WORK OVERVIEW",
      title: "Every important step in one place",
      items: ["Roles and permissions", "Statuses and tasks", "Clear reporting"],
    },
    benefits: {
      eyebrow: "VALUE FOR THE TEAM",
      title: "Less manual work and better visibility into every case.",
      description:
        "The application follows the real business process and connects information currently spread across tools.",
      items: [
        {
          title: "One workflow",
          description: "The team shares statuses, ownership and next steps.",
        },
        {
          title: "Fewer errors",
          description:
            "Validation and automated checks reduce repetitive data entry.",
        },
        {
          title: "Room to grow",
          description: "Features can evolve with feedback and changing needs.",
        },
      ],
    },
    workflow: {
      eyebrow: "HOW IT WORKS",
      title: "From incoming data to a clear next action.",
      description:
        "The workflow is designed around your process, roles and connected systems.",
      steps: [
        {
          title: "Request intake",
          description: "Data arrives from a form, import or connected system.",
        },
        {
          title: "Processing",
          description:
            "The application validates required information, status and ownership.",
        },
        {
          title: "Collaboration",
          description:
            "Users work according to their roles and see relevant history.",
        },
        {
          title: "Outcome and report",
          description: "Completed work is closed and reflected in reporting.",
        },
      ],
    },
    sections: [
      {
        id: "features",
        eyebrow: "SOLUTION OPTIONS",
        title: "The application can grow with your process.",
        items: [
          {
            title: "User roles",
            description:
              "Different access for administrators, staff, partners and customers.",
          },
          {
            title: "Dashboards",
            description: "Current work, tasks, deadlines and commercial cases.",
          },
          {
            title: "Notifications",
            description:
              "Alerts for changes, deadlines and situations that need attention.",
          },
          {
            title: "Integrations",
            description:
              "Links to CRM, accounting, payments or other supported APIs.",
          },
        ],
      },
    ],
    useCases: {
      eyebrow: "REAL-WORLD EXAMPLES",
      title: "When a business needs its own working environment.",
      description:
        "Every example starts with the actual process, not a feature list.",
      items: [
        {
          title: "Customer portal",
          description:
            "Customers follow requests and documents without email chaos.",
        },
        {
          title: "Internal casework",
          description:
            "The team manages cases, deadlines and responsibilities in one interface.",
        },
        {
          title: "Operations dashboard",
          description:
            "Management sees work status and exceptions without manual reporting.",
        },
      ],
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Before development starts.",
      items: [
        {
          question: "Do I need a detailed technical specification?",
          answer:
            "No. Describe the current process, problems and desired outcome. We will prepare the functional scope together.",
        },
        {
          question: "Can it connect to our current tools?",
          answer:
            "Often yes, if they provide a suitable API or other safe data exchange. I verify the options first.",
        },
        {
          question: "How do user permissions work?",
          answer:
            "Authentication, roles and permissions are designed so each person only sees what they need.",
        },
        {
          question: "Can we start with a smaller version?",
          answer:
            "Yes. I recommend validating the key workflow first and adding features based on actual value.",
        },
      ],
    },
    finalCta: {
      eyebrow: "LET'S TALK",
      title: "Do you have an idea of what you would like to create?",
      description:
        "Tell me about your idea or current problem. Together we will determine what solution makes sense.",
      action: "Discuss the project",
    },
  },
  shoptet: {
    ...cs.shoptet,
    meta: {
      title: "Shoptet store setup and customisation | Jakub Vantuch",
      description:
        "Shoptet store design, customisation and integrations focused on shopping experience, management and measurement.",
    },
    name: "Shoptet stores",
    hero: {
      eyebrow: "SHOPTET STORES",
      title: "A store where customers can decide and buy with confidence.",
      description:
        "For new and established stores that need a clearer design, smoother purchasing journey and useful integrations.",
      primary: "Discuss the store",
      secondary: "How improvements work",
    },
    visual: {
      badge: "SHOPPING JOURNEY",
      title: "From product discovery to a completed order",
      items: ["Clear catalogue", "Useful product detail", "Simple basket"],
    },
    benefits: {
      eyebrow: "STORE VALUE",
      title: "A better buying experience without unnecessary complexity.",
      description:
        "Changes reflect your range, customers and the verified capabilities of Shoptet.",
      items: [
        {
          title: "Clear offer",
          description:
            "Categories, filters and product pages support selection.",
        },
        {
          title: "Credible presentation",
          description: "Visual improvements align the store with your brand.",
        },
        {
          title: "Efficient operations",
          description:
            "Supported integrations can reduce manual order and data work.",
        },
      ],
    },
    workflow: {
      eyebrow: "DELIVERY PROCESS",
      title: "Improvements follow the real shopping journey.",
      description:
        "I first verify the plan, add-ons and available Shoptet interfaces.",
      steps: [
        {
          title: "Review and goals",
          description: "We examine the range, customers and friction points.",
        },
        {
          title: "Change plan",
          description:
            "We prioritise design, content, catalogue and integrations.",
        },
        {
          title: "Implementation",
          description: "Changes are prepared and tested within a safe scope.",
        },
        {
          title: "Measurement and iteration",
          description: "Important steps are monitored and improved over time.",
        },
      ],
    },
    sections: [
      {
        id: "options",
        eyebrow: "WHAT CAN BE IMPROVED",
        title: "Design, content and operational links.",
        items: [
          {
            title: "Template customisation",
            description:
              "Colours, typography, components and responsive behaviour.",
          },
          {
            title: "Catalogue and products",
            description:
              "Categories, parameters, variants and product presentation.",
          },
          {
            title: "Purchase journey",
            description:
              "Basket, trust information and removal of unnecessary friction.",
          },
          {
            title: "Add-ons and integrations",
            description:
              "Only supported connections that bring operational value.",
          },
        ],
      },
    ],
    useCases: {
      eyebrow: "REAL-WORLD EXAMPLES",
      title: "From a new store to focused improvements.",
      description: "The scope reflects the store's current state.",
      items: [
        {
          title: "New store",
          description: "Structure, design, catalogue and essential analytics.",
        },
        {
          title: "Redesign",
          description:
            "A stronger brand and clearer key areas without changing platform.",
        },
        {
          title: "Operational connection",
          description:
            "Verified service integrations that reduce repeated data entry.",
        },
      ],
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "What to verify with Shoptet.",
      items: [
        {
          question: "Can every store element be changed?",
          answer:
            "The scope depends on the template, plan and Shoptet capabilities. I verify what is safe and maintainable before proposing changes.",
        },
        {
          question: "Can you help import products?",
          answer:
            "Yes, when source data is suitable and Shoptet supports the required import path.",
        },
        {
          question: "Can accounting or stock be connected?",
          answer:
            "It depends on the specific system and available add-on or API. I verify the options first.",
        },
        {
          question: "Can analytics be included?",
          answer:
            "Yes. We can measure key buying steps with suitable consent and privacy controls.",
        },
      ],
    },
    finalCta: {
      eyebrow: "LET'S TALK",
      title: "Do you have an idea of what you would like to create?",
      description:
        "Tell me about your idea or current problem. Together we will determine what solution makes sense.",
      action: "Discuss the project",
    },
  },
  cms: {
    ...cs.cms,
    meta: {
      title: "CMS and website content management | Jakub Vantuch",
      description:
        "Clear management of website content, media and publishing permissions for businesses and teams.",
    },
    name: "CMS and content management",
    hero: {
      eyebrow: "CMS AND CONTENT MANAGEMENT",
      title: "Update your website without worrying about breaking it.",
      description:
        "Content management designed around your pages, services, products, media and team roles.",
      primary: "Discuss content management",
      secondary: "How a CMS works",
    },
    visual: {
      badge: "READY TO PUBLISH",
      title: "Edit content without changing the design",
      items: ["Pages and services", "Media", "Roles and approval"],
    },
    benefits: {
      eyebrow: "TEAM VALUE",
      title: "Content changes quickly while the design stays consistent.",
      description:
        "Editors get exactly the options they need for safe daily work.",
      items: [
        {
          title: "Simple updates",
          description: "Edit text, imagery and entries through clear fields.",
        },
        {
          title: "Consistent design",
          description: "Prepared blocks keep the interface coherent.",
        },
        {
          title: "Controlled publishing",
          description:
            "Roles can separate preparation, review and publication.",
        },
      ],
    },
    workflow: {
      eyebrow: "HOW IT WORKS",
      title: "Content follows a clear path from draft to publication.",
      description: "The workflow reflects team size and change sensitivity.",
      steps: [
        {
          title: "Preparation",
          description: "An editor creates or updates structured content.",
        },
        {
          title: "Review",
          description: "A preview shows the result before publication.",
        },
        {
          title: "Approval",
          description: "Selected content can require an authorised reviewer.",
        },
        {
          title: "Publication",
          description:
            "The content safely becomes visible to website visitors.",
        },
      ],
    },
    sections: [
      {
        id: "features",
        eyebrow: "CMS OPTIONS",
        title: "Management aligned with your content.",
        items: [
          {
            title: "Pages and services",
            description: "Structured fields for a clear presentation.",
          },
          {
            title: "Media",
            description: "An image and file library with useful descriptions.",
          },
          {
            title: "User roles",
            description:
              "Permissions for editors, approvers and administrators.",
          },
          {
            title: "Preview and scheduling",
            description: "Review changes and optionally schedule publication.",
          },
        ],
      },
    ],
    useCases: {
      eyebrow: "REAL-WORLD EXAMPLES",
      title: "A CMS shaped around what you publish.",
      description:
        "The content model reflects your information, not the other way around.",
      items: [
        {
          title: "Branch network",
          description:
            "Manage contacts, opening hours and services for each location.",
        },
        {
          title: "Product website",
          description:
            "Products share consistent parameters, media and documents.",
        },
        {
          title: "Expert content",
          description:
            "Articles move through preparation, review and publication.",
        },
      ],
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Management without unnecessary compromise.",
      items: [
        {
          question: "Which CMS do you use?",
          answer:
            "The choice depends on scope, content type, budget and operations. I need to understand your publishing process first.",
        },
        {
          question: "Can several people edit content?",
          answer:
            "Yes. Roles and permissions can differ, with optional approval before publication.",
        },
        {
          question: "Can content be migrated from an old site?",
          answer:
            "Yes, when it can be safely extracted. Larger migrations begin with a source quality review.",
        },
        {
          question: "Will our team receive training?",
          answer:
            "Yes. Handover can include a short training session and practical documentation.",
        },
      ],
    },
    finalCta: {
      eyebrow: "LET'S TALK",
      title: "Do you have an idea of what you would like to create?",
      description:
        "Tell me about your idea or current problem. Together we will determine what solution makes sense.",
      action: "Discuss the project",
    },
  },
  "api-integrace": {
    ...cs["api-integrace"],
    meta: {
      title: "APIs and business system integrations | Jakub Vantuch",
      description:
        "Secure system connections, data synchronisation and visibility into integration errors.",
    },
    name: "APIs and integrations",
    hero: {
      eyebrow: "APIS AND INTEGRATIONS",
      title: "Connect systems that currently work in isolation.",
      description:
        "Reliable data exchange between websites, CRM, accounting, payment services and other tools with supported interfaces.",
      primary: "Discuss an integration",
      secondary: "How connections work",
    },
    visual: {
      badge: "SYSTEMS CONNECTED",
      title: "Data moves without repeated manual entry",
      items: [
        "Website or application",
        "Verified transfer",
        "Destination system",
      ],
    },
    benefits: {
      eyebrow: "OPERATIONAL VALUE",
      title: "More current data and less repetitive administration.",
      description:
        "Integrations account for outages, repeated requests and traceability.",
      items: [
        {
          title: "Less retyping",
          description:
            "Information moves between supported systems automatically.",
        },
        {
          title: "Better consistency",
          description:
            "A defined source of truth reduces differences between tools.",
        },
        {
          title: "Error visibility",
          description: "Monitoring and logs reveal unsuccessful transfers.",
        },
      ],
    },
    workflow: {
      eyebrow: "HOW AN INTEGRATION WORKS",
      title: "Every transfer has rules, validation and a safe recovery path.",
      description: "Availability depends on each provider's API and terms.",
      steps: [
        {
          title: "Source event",
          description: "An order, form or status change starts the process.",
        },
        {
          title: "Data validation",
          description:
            "Format, permissions and required information are checked.",
        },
        {
          title: "Secure transfer",
          description: "Data is sent through a supported protected interface.",
        },
        {
          title: "Confirmation and monitoring",
          description: "The outcome is stored and failures can be retried.",
        },
      ],
    },
    sections: [
      {
        id: "reliability",
        eyebrow: "RELIABILITY",
        title: "A connection must expect temporary failure.",
        tone: "soft",
        items: [
          {
            title: "Request retries",
            description: "A temporary outage does not have to lose data.",
          },
          {
            title: "Duplicate protection",
            description:
              "The same event is not processed repeatedly without control.",
          },
          {
            title: "Monitoring",
            description: "Important failures are visible and traceable.",
          },
          {
            title: "Secure access",
            description:
              "Keys, permissions and personal data are handled for their intended purpose.",
          },
        ],
      },
    ],
    useCases: {
      eyebrow: "REAL-WORLD EXAMPLES",
      title: "Connections where they bring operational value.",
      description: "Available interfaces and limits are verified in advance.",
      items: [
        {
          title: "Website to CRM",
          description:
            "A validated enquiry creates a contact and commercial case.",
        },
        {
          title: "Payment to service",
          description: "A confirmed payment safely activates the next process.",
        },
        {
          title: "Stock to store",
          description:
            "Available inventory data synchronises under defined rules.",
        },
      ],
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Verify first, promise second.",
      items: [
        {
          question: "Can any two systems be connected?",
          answer:
            "Not always. Both need a suitable API, export or supported data path. I verify this before proposing a solution.",
        },
        {
          question: "What happens during an outage?",
          answer:
            "Depending on risk, the design can use queues, retries and alerts so failures remain visible and data is not silently lost.",
        },
        {
          question: "How are credentials protected?",
          answer:
            "Secrets never belong in browser code or the repository. They are stored securely and used with minimal permissions.",
        },
        {
          question: "Can the integration be extended later?",
          answer:
            "Yes, when the design allows for it and the connected services support the required capability.",
        },
      ],
    },
    finalCta: {
      eyebrow: "LET'S TALK",
      title: "Which systems would you like to connect?",
      description:
        "Tell me about the current process and tools. We will verify what solution is realistic and valuable.",
      action: "Discuss the integration",
    },
  },
  "vernostni-programy": {
    ...cs["vernostni-programy"],
    meta: {
      title: "Digital loyalty programmes for local businesses | Jakub Vantuch",
      description:
        "Digital loyalty cards, visits, points and rewards without requiring customers to install an app.",
    },
    name: "Digital loyalty programmes",
    hero: {
      eyebrow: "DIGITAL LOYALTY PROGRAMMES",
      title: "Give customers a reason to return.",
      description:
        "Digital loyalty cards, points or visit collection and customer rewards. A straightforward system for customers and staff.",
      primary: "Design a loyalty programme",
      secondary: "How the digital card works",
    },
    visual: {
      badge: "DIGITAL CARD",
      title: "No plastic card or required app installation",
      items: ["Personal QR code", "Current balance", "Available reward"],
    },
    benefits: {
      eyebrow: "WHY DIGITAL",
      title: "Convenient for customers and clearer for the business.",
      description:
        "Customers can open the card on their phone. Staff use an authorised interface and every balance change is traceable.",
      items: [
        {
          title: "No physical cards",
          description:
            "The card can run as a mobile web page or optionally a Wallet pass.",
        },
        {
          title: "Custom rules",
          description:
            "Points, stamps, visits or tiers can reflect your operation.",
        },
        {
          title: "Visibility and control",
          description:
            "History helps protect rewards from incorrect or unauthorised changes.",
        },
      ],
    },
    workflow: {
      eyebrow: "HOW IT WORKS",
      title: "Four simple steps for customers and staff.",
      description:
        "The customer's QR code identifies them. It never authorises a balance change or redemption by itself.",
      steps: [
        {
          title: "Customer registration",
          description:
            "The customer registers through a simple web form or agreed onboarding flow.",
        },
        {
          title: "Digital loyalty card",
          description:
            "They receive a personal card with a QR code or customer identifier.",
        },
        {
          title: "Visit or purchase recorded",
          description:
            "Authorised staff confirm the transaction and add points, stamps or a visit.",
        },
        {
          title: "Reward redemption",
          description:
            "The customer sees progress and can redeem an eligible reward with staff.",
        },
      ],
    },
    demoCopy: {
      eyebrow: "INTERACTIVE DEMO",
      title: "Try an illustrative digital loyalty card.",
    },
    sections: [
      {
        id: "ways-to-use",
        eyebrow: "THREE WAYS TO USE IT",
        title: "Choose an approach that fits your operation.",
        description:
          "A customer card and staff phone is often the simplest option for a small business.",
        items: [
          {
            title: "Customer card + staff phone",
            description:
              "The customer shows a personal QR code. Staff scan it by phone or tablet, open the record and confirm an eligible transaction.",
            note: "Recommended for small businesses. No dedicated scanner required.",
          },
          {
            title: "Dedicated QR scanner",
            description:
              "At reception or checkout, the scanner identifies the customer and staff confirm the visit or purchase.",
            note: "Compatibility depends on the scanner and point-of-sale setup.",
          },
          {
            title: "QR code at the business",
            description:
              "The customer scans a code to open check-in. An authorised employee or trusted mechanism must confirm the visit.",
            note: "A public static code must never allow unlimited self-awarded points.",
          },
        ],
      },
      {
        id: "programme-types",
        eyebrow: "REWARD CONFIGURATION",
        title: "A loyalty programme can use different rules.",
        description:
          "The exact combination depends on service economics and customer behaviour; not every option is automatically included.",
        items: [
          {
            title: "Stamp card",
            description:
              "For example, every tenth eligible visit earns a reward.",
          },
          {
            title: "Purchase points",
            description: "Points reflect a verified purchase value or service.",
          },
          {
            title: "Membership tiers",
            description: "Levels can provide different benefits and rules.",
          },
          {
            title: "Visit rewards",
            description: "A benefit unlocks after a defined number of visits.",
          },
          {
            title: "Birthday rewards",
            description:
              "Optional personal benefits with appropriate permission and data.",
          },
          {
            title: "Referral rewards",
            description:
              "A benefit is added only after a successful referral is verified.",
          },
        ],
      },
      {
        id: "administration",
        eyebrow: "BUSINESS ADMINISTRATION",
        title: "Staff get speed while management keeps a traceable history.",
        tone: "soft",
        items: [
          {
            title: "Customers and balances",
            description:
              "Customer list, current balance and visit or transaction history.",
          },
          {
            title: "Rewards and redemption",
            description: "Reward rules, availability and redemption history.",
          },
          {
            title: "Staff roles",
            description:
              "Each employee receives permissions appropriate to their work.",
          },
          {
            title: "Corrections and audit",
            description:
              "Manual corrections require permission and leave a traceable record.",
          },
          {
            title: "Basic reporting",
            description:
              "Programme activity without promising a specific commercial outcome.",
          },
          {
            title: "Duplicate protection",
            description:
              "Validation limits repeated credit for the same visit or reward.",
          },
        ],
      },
      {
        id: "integrations",
        eyebrow: "INTEGRATIONS AND EXTENSIONS",
        title: "The programme can connect to tools you already use.",
        description:
          "Availability depends on selected systems, APIs, provider requirements and project scope.",
        items: [
          {
            title: "Apple Wallet / Google Wallet",
            description:
              "Optional mobile wallet passes subject to provider requirements.",
          },
          {
            title: "Bookings and POS",
            description:
              "Verified transactions can update balances where a suitable interface exists.",
          },
          {
            title: "CRM and email",
            description:
              "Consent, segments and notifications can build on customer data.",
          },
          {
            title: "Multiple locations",
            description:
              "Rules, staff and reporting can support a branch network.",
          },
        ],
      },
      {
        id: "security",
        eyebrow: "SECURITY AND PRIVACY",
        title: "Rewards should be convenient, not easy to abuse.",
        tone: "navy",
        layout: "list",
        items: [
          {
            title: "Authorised staff",
            description:
              "Only signed-in employees with the right role can credit or redeem.",
          },
          {
            title: "Secure identification",
            description:
              "A QR code identifies the customer but approves nothing on its own.",
          },
          {
            title: "Traceable changes",
            description:
              "Audit history records credits, corrections and redemptions.",
          },
          {
            title: "Proportionate data",
            description:
              "The system collects only needed data and supports retention and deletion workflows.",
          },
        ],
      },
    ],
    useCases: {
      eyebrow: "WHO IT SUITS",
      title: "For businesses where happy customers naturally return.",
      description: "Rules always reflect the specific service and economics.",
      items: [
        {
          title: "Massage and wellness studio",
          description:
            "Customers collect verified visits and see progress toward a benefit.",
        },
        {
          title: "Beauty or hair salon",
          description: "Rewards support regular care without plastic cards.",
        },
        {
          title: "Café or local service",
          description:
            "Simple digital stamps work on customer and staff phones.",
        },
      ],
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Practical questions before launch.",
      items: [
        {
          question: "Do customers need to install an app?",
          answer:
            "Not necessarily. The card can be a mobile web page. Apple Wallet or Google Wallet can also be assessed.",
        },
        {
          question: "Do I need a QR scanner?",
          answer:
            "No. A staff phone or tablet is usually enough. Dedicated hardware depends on the checkout setup.",
        },
        {
          question: "Can customers use the card on their phone?",
          answer:
            "Yes. They can see their identifier, balance and available rewards in a mobile interface.",
        },
        {
          question: "How are points or visits added?",
          answer:
            "Authorised staff or a verified integration confirms the purchase or visit. The QR code itself does not authorise changes.",
        },
        {
          question: "Can I define my own reward rules?",
          answer:
            "Yes. Rules reflect your operation, with the exact scope agreed for the project.",
        },
        {
          question: "Can it connect to booking or POS systems?",
          answer:
            "Sometimes. The available API, provider terms and data quality must be verified first.",
        },
        {
          question: "What if a customer loses access?",
          answer:
            "Access can be restored after safe identity verification according to the chosen registration method.",
        },
        {
          question: "What does it cost to run?",
          answer:
            "It depends on scope, hosting, user count, integrations and third-party services. I provide an estimate after defining the solution.",
        },
      ],
    },
    finalCta: {
      eyebrow: "DESIGN YOUR PROGRAMME",
      title: "How would you like to reward returning customers?",
      description:
        "Tell me about your operation, visit frequency and current records. Together we can design a clear and secure programme.",
      action: "Discuss a loyalty programme",
    },
  },
  "webova-analytika": {
    ...cs["webova-analytika"],
    meta: {
      title: "Web analytics and enquiry measurement | Jakub Vantuch",
      description:
        "Website traffic, form, customer action and enquiry source measurement with privacy in mind.",
    },
    name: "Web analytics",
    hero: {
      eyebrow: "WEB ANALYTICS",
      title: "Understand what people actually do on your website.",
      description:
        "Measurement of traffic, enquiries and key actions to support decisions with data rather than impressions.",
      primary: "Discuss measurement",
      secondary: "How analytics works",
    },
    visual: {
      badge: "PERFORMANCE OVERVIEW",
      title: "Important events in one place",
      items: ["Traffic", "Enquiries", "Contact source"],
    },
    benefits: {
      eyebrow: "DECISION VALUE",
      title: "Measure what relates to your goal.",
      description:
        "I avoid dashboards full of vanity metrics. We first define the questions the data should answer.",
      items: [
        {
          title: "Visible conversions",
          description:
            "Forms, clicks and important actions have clear definitions.",
        },
        {
          title: "Better attribution",
          description:
            "Available source and visitor journey data can support enquiry evaluation.",
        },
        {
          title: "Privacy-aware",
          description:
            "Tools and consent reflect the purpose and measurement scope.",
        },
      ],
    },
    workflow: {
      eyebrow: "HOW MEASUREMENT IS BUILT",
      title: "From a business question to a useful overview.",
      description: "The result must be understandable to the people using it.",
      steps: [
        {
          title: "Goals",
          description: "We define which actions genuinely matter.",
        },
        {
          title: "Data plan",
          description:
            "Events, parameters and consent requirements are documented.",
        },
        {
          title: "Implementation",
          description:
            "Measurement is deployed and verified with real scenarios.",
        },
        {
          title: "Dashboard",
          description: "Data is organised for regular evaluation.",
        },
      ],
    },
    sections: [
      {
        id: "scope",
        eyebrow: "WHAT CAN BE MEASURED",
        title: "From website visit to enquiry.",
        items: [
          {
            title: "Traffic",
            description: "Visit trends, landing pages and devices.",
          },
          {
            title: "Contact forms",
            description: "Successful submissions, errors and preceding steps.",
          },
          {
            title: "Important actions",
            description: "Phone clicks, bookings, downloads or shopping steps.",
          },
          {
            title: "Dashboards",
            description: "Clear summaries for management or marketing.",
          },
        ],
      },
    ],
    useCases: {
      eyebrow: "REAL-WORLD EXAMPLES",
      title: "Data as evidence, not an automatic promise.",
      description: "Analytics reveals patterns but does not guarantee growth.",
      items: [
        {
          title: "Company website",
          description: "See which services contribute to enquiries.",
        },
        {
          title: "Campaign",
          description:
            "Compare visitor quality and conversions by available source.",
        },
        {
          title: "Online store",
          description:
            "See where customers most often leave the purchase journey.",
        },
      ],
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Useful measurement without false certainty.",
      items: [
        {
          question: "Which analytics tool should I choose?",
          answer:
            "It depends on goals, detail, budget and privacy approach. I recommend a tool after a short assessment.",
        },
        {
          question: "Do I need a cookie banner?",
          answer:
            "It depends on the tools and measurement mode. Consent must be assessed for the specific implementation and legal requirements.",
        },
        {
          question: "Can form submissions be measured?",
          answer:
            "Yes. A successful submission can usually be recorded without sending the message content to analytics.",
        },
        {
          question: "Will analytics guarantee more enquiries?",
          answer:
            "No. It improves evidence for decisions, but outcomes also depend on the offer, traffic and other factors.",
        },
      ],
    },
    finalCta: {
      eyebrow: "LET'S TALK",
      title: "Would you like to know what your website actually delivers?",
      description:
        "Tell me about its goals and current tools. I will propose a proportionate measurement scope.",
      action: "Discuss analytics",
    },
  },
  crm: {
    ...cs.crm,
    meta: {
      title: "CRM and customer management | Jakub Vantuch",
      description:
        "Contacts, enquiries, sales cases and follow-up tasks in one clear workflow.",
    },
    name: "CRM and customer management",
    hero: {
      eyebrow: "CRM AND CUSTOMER WORK",
      title: "Keep every enquiry and next step under control.",
      description:
        "Contacts, communication history and commercial cases for teams that no longer want to search through email and spreadsheets.",
      primary: "Discuss customer management",
      secondary: "How CRM helps",
    },
    visual: {
      badge: "COMMERCIAL OVERVIEW",
      title: "Every contact has context and a next step",
      items: ["New enquiry", "Follow-up task", "Closed case"],
    },
    benefits: {
      eyebrow: "TEAM VALUE",
      title: "Fewer missed follow-ups and more shared context.",
      description:
        "CRM should support the team's real work rather than adding administration.",
      items: [
        {
          title: "One source for data",
          description:
            "Contacts, companies, enquiries and communication stay connected.",
        },
        {
          title: "Clear next steps",
          description:
            "Tasks, deadlines and ownership are visible to the right people.",
        },
        {
          title: "Less routine",
          description:
            "Selected administration can be automated after conditions are verified.",
        },
      ],
    },
    workflow: {
      eyebrow: "HOW IT WORKS",
      title: "Every enquiry receives an owner, status and next step.",
      description:
        "The workflow reflects the length and complexity of your sales process.",
      steps: [
        {
          title: "Contact intake",
          description:
            "An enquiry arrives from the website or is added manually.",
        },
        {
          title: "Qualification",
          description: "Important data, priority and ownership are added.",
        },
        {
          title: "Follow-up",
          description: "The team plans tasks and stores relevant history.",
        },
        {
          title: "Outcome",
          description:
            "The case closes and data remains available for future care.",
        },
      ],
    },
    sections: [
      {
        id: "features",
        eyebrow: "SOLUTION OPTIONS",
        title: "CRM shaped around the process you manage.",
        items: [
          {
            title: "Contacts and companies",
            description:
              "Structured details, relationships and cooperation history.",
          },
          {
            title: "Sales pipeline",
            description: "Statuses, values and expected next steps.",
          },
          {
            title: "Tasks and reminders",
            description: "Follow-up work with dates and ownership.",
          },
          {
            title: "Integrations",
            description:
              "Enquiry intake and data exchange with supported systems.",
          },
        ],
      },
    ],
    useCases: {
      eyebrow: "REAL-WORLD EXAMPLES",
      title: "Clear customer care from first contact onward.",
      description:
        "The scope can range from a simple register to a connected sales process.",
      items: [
        {
          title: "Service company",
          description:
            "Every enquiry has an owner, date and resolution history.",
        },
        {
          title: "B2B sales",
          description:
            "The team shares sales case status and planned follow-ups.",
        },
        {
          title: "Recurring services",
          description: "Customer history helps prepare relevant future care.",
        },
      ],
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "CRM should simplify, not slow the team down.",
      items: [
        {
          question: "Do I need a custom CRM?",
          answer:
            "Not always. Configuring an existing service may be better. Custom software makes sense for specific processes or deeper integrations.",
        },
        {
          question: "Can spreadsheet data be imported?",
          answer:
            "Yes, when it is consistent and safely structured. Data should be reviewed and cleaned first.",
        },
        {
          question: "Can CRM connect to the website?",
          answer:
            "Yes. Validated forms can create contacts and cases when the target CRM provides a suitable interface.",
        },
        {
          question: "How is personal data handled?",
          answer:
            "Data scope, access, retention and deletion are designed around the processing purpose and internal rules.",
        },
      ],
    },
    finalCta: {
      eyebrow: "LET'S TALK",
      title: "Would you like a clearer customer workflow?",
      description:
        "Tell me how enquiries are received and handled today. Together we can find an appropriate solution.",
      action: "Discuss CRM",
    },
  },
  "darkove-poukazy": {
    ...cs["darkove-poukazy"],
    meta: {
      title: "Online gift vouchers with payment and PDF | Jakub Vantuch",
      description:
        "Online gift voucher sales, verified payments, automatic PDFs and redemption management.",
    },
    name: "Gift vouchers",
    hero: {
      eyebrow: "GIFT VOUCHERS",
      title: "Sell gift vouchers online without manual handling.",
      description:
        "Customers choose a voucher, pay online and automatically receive a PDF by email. You can track sales, validity and redemption.",
      primary: "Sell gift vouchers",
      secondary: "How voucher sales work",
    },
    visual: {
      badge: "VOUCHER READY",
      title: "Paid, generated and traceable",
      items: ["Unique code", "PDF with QR code", "Redemption status"],
    },
    benefits: {
      eyebrow: "OPERATIONAL VALUE",
      title: "Sales can continue outside opening hours.",
      description:
        "Automation reduces manual issuance while keeping payment and redemption under secure control.",
      items: [
        {
          title: "Convenient purchase",
          description:
            "Customers choose the voucher, recipient and message on any device.",
        },
        {
          title: "Automatic delivery",
          description:
            "After verified payment, the system prepares a PDF and sends an email or secure link.",
        },
        {
          title: "Controlled redemption",
          description:
            "Staff verify status and confirm use in a protected interface.",
        },
      ],
    },
    workflow: {
      eyebrow: "CUSTOMER JOURNEY",
      title: "From selection to secure redemption.",
      description:
        "A voucher is issued only after server-side payment confirmation, never merely from a browser success redirect.",
      steps: [
        {
          title: "Voucher selection",
          description: "The customer chooses a value or specific service.",
        },
        {
          title: "Recipient and message",
          description:
            "They add recipient, sender and an optional personal note.",
        },
        {
          title: "Online payment",
          description: "Payment is handled by a selected supported provider.",
        },
        {
          title: "Payment verification",
          description:
            "The server processes trusted provider confirmation and prevents duplicates.",
        },
        {
          title: "Voucher issuance",
          description: "A unique code, status and validity period are created.",
        },
        {
          title: "PDF and email",
          description:
            "A branded PDF and email attachment or secure link are prepared.",
        },
        {
          title: "Staff verification",
          description: "Staff scan the QR code or enter the voucher code.",
        },
        {
          title: "Redemption",
          description:
            "Authorised staff confirm full or agreed partial redemption.",
        },
      ],
    },
    demoCopy: {
      eyebrow: "INTERACTIVE DEMO",
      title: "Build a fictional gift voucher.",
      description:
        "The demo only simulates payment confirmation, PDF creation and redemption. It performs no payment, sends no email and issues no valid voucher.",
    },
    sections: [
      {
        id: "types",
        eyebrow: "VOUCHER TYPES",
        title: "The offer can reflect your services and sales model.",
        description:
          "Specific options depend on the selected solution and business terms.",
        items: [
          {
            title: "Fixed value",
            description: "Prepared amounts with a clear price and validity.",
          },
          {
            title: "Custom value",
            description:
              "Customers enter an amount within an allowed range when included in scope.",
          },
          {
            title: "Specific service",
            description:
              "The voucher covers a massage, treatment, meal or another service.",
          },
          {
            title: "Promotional voucher",
            description:
              "A special offer with its own conditions and sales period.",
          },
          {
            title: "Personal message",
            description:
              "Optional sender, recipient and message on the voucher.",
          },
          {
            title: "Configurable validity",
            description:
              "Validity and conditions follow the agreed configuration and business rules.",
          },
        ],
      },
      {
        id: "pdf",
        eyebrow: "PDF VOUCHER",
        title:
          "A voucher that matches your brand and includes essential information.",
        items: [
          {
            title: "Design and logo",
            description: "The voucher follows the business visual identity.",
          },
          {
            title: "Value or service",
            description: "Customer and staff can clearly see what it covers.",
          },
          {
            title: "Unique code and QR",
            description:
              "The code identifies the voucher but does not authorise redemption.",
          },
          {
            title: "Validity and instructions",
            description: "Expiry date and clear booking or redemption steps.",
          },
          {
            title: "Personal message",
            description: "Optional recipient and greeting details.",
          },
          {
            title: "Delivery",
            description: "PDF download plus email attachment or secure link.",
          },
        ],
      },
      {
        id: "payments",
        eyebrow: "PAYMENTS AND RELIABILITY",
        title: "Issue only after trusted payment confirmation.",
        tone: "navy",
        layout: "list",
        description:
          "GoPay, Comgate and Stripe are examples. Selection depends on fees, methods, requirements and project fit.",
        items: [
          {
            title: "Verified webhook",
            description:
              "The server processes provider confirmation and verifies signatures where supported.",
          },
          {
            title: "Duplicate protection",
            description:
              "Repeated delivery of the same event does not issue another voucher.",
          },
          {
            title: "Clear statuses",
            description:
              "Orders distinguish pending, paid, failed, cancelled or refunded states where supported.",
          },
          {
            title: "Safe exceptions",
            description:
              "The design accounts for interrupted payments, refunds and chargebacks.",
          },
        ],
      },
      {
        id: "management",
        eyebrow: "BUSINESS MANAGEMENT",
        title: "Every voucher has a traceable status and history.",
        tone: "soft",
        items: [
          {
            title: "List and search",
            description:
              "Filter by code, date, type, value and current status.",
          },
          {
            title: "Voucher statuses",
            description:
              "Awaiting payment, active, redeemed, expired or cancelled as appropriate.",
          },
          {
            title: "Redemption history",
            description: "Who redeemed the voucher, when and to what extent.",
          },
          {
            title: "Resending",
            description: "Authorised staff can resend an email or link.",
          },
          {
            title: "Manual issue and cancellation",
            description: "Only with appropriate permission and audit history.",
          },
          {
            title: "Basic reporting",
            description: "Sales, active voucher and redemption overview.",
          },
        ],
      },
      {
        id: "redemption",
        eyebrow: "VOUCHER REDEMPTION",
        title: "Fast staff checks with double-redemption protection.",
        items: [
          {
            title: "1. Presentation",
            description: "The customer shows a PDF, printed voucher or code.",
          },
          {
            title: "2. Identification",
            description: "Staff scan the QR code or enter the identifier.",
          },
          {
            title: "3. Validation",
            description:
              "The system checks validity, status and available balance.",
          },
          {
            title: "4. Confirmation",
            description:
              "Authorised staff confirm redemption and the status updates safely.",
          },
        ],
      },
      {
        id: "email",
        eyebrow: "EMAIL DELIVERY",
        title: "Customers receive the voucher after confirmed payment.",
        description:
          "A branded template, attachment or secure link, resending and basic delivery status can be included. Inbox placement cannot be guaranteed.",
        items: [
          {
            title: "Automatic message",
            description: "Sent only after payment has been safely confirmed.",
          },
          {
            title: "Branded template",
            description:
              "The email reflects the business and explains the next steps.",
          },
          {
            title: "Attachment or link",
            description:
              "Delivery reflects security needs and provider constraints.",
          },
        ],
      },
      {
        id: "terms",
        eyebrow: "BUSINESS AND LEGAL CONTEXT",
        title: "The technical solution must follow your terms.",
        tone: "soft",
        layout: "list",
        items: [
          {
            title: "Validity and cancellation",
            description:
              "Validity, cancellation and refunds must align with business terms and applicable law.",
          },
          {
            title: "Tax and records",
            description:
              "Tax treatment cannot be generalised; confirm it for the voucher type and accounting regime.",
          },
          {
            title: "Customer information",
            description:
              "The journey should clearly explain price, validity, redemption and support contact.",
          },
        ],
      },
    ],
    useCases: {
      eyebrow: "WHO IT SUITS",
      title: "Vouchers for services, experiences and local businesses.",
      description: "The offer and rules always reflect the specific business.",
      items: [
        {
          title: "Massage or wellness studio",
          description:
            "Customers buy a specific treatment or value voucher as a gift.",
        },
        {
          title: "Salon or hairdresser",
          description:
            "A service or value voucher can be verified at reception.",
        },
        {
          title: "Restaurant or local service",
          description:
            "Online purchase keeps vouchers available outside opening hours.",
        },
      ],
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "What to clarify before voucher sales launch.",
      items: [
        {
          question: "Can customers buy directly on the website?",
          answer:
            "Yes. They can choose a type, add details and continue to a supported payment provider.",
        },
        {
          question: "Will the voucher arrive automatically by email?",
          answer:
            "After secure payment confirmation, the system can prepare a PDF and send an attachment or link. Inbox placement cannot be guaranteed.",
        },
        {
          question: "Can I use my own design?",
          answer:
            "Yes. The PDF and email can follow your brand while including required details and instructions.",
        },
        {
          question: "How does card payment work?",
          answer:
            "A selected provider processes the payment. The voucher is issued only after trusted server-side confirmation.",
        },
        {
          question: "How do I validate a voucher?",
          answer:
            "Authorised staff scan the QR or enter the code and see status, validity and history. The QR code alone redeems nothing.",
        },
        {
          question: "Can a voucher be partially redeemed?",
          answer:
            "Value vouchers can support partial redemption when included in the agreed scope and records.",
        },
        {
          question: "Can I sell vouchers for specific services?",
          answer:
            "Yes. A voucher can cover a specific service, variant or predefined value.",
        },
        {
          question: "Do I need a QR scanner?",
          answer:
            "Not necessarily. A staff phone or tablet is often enough. Dedicated hardware can be assessed.",
        },
        {
          question: "What are the ongoing costs?",
          answer:
            "They depend on hosting, transaction volume, payment provider, email service and support. I estimate them for the selected solution.",
        },
      ],
    },
    finalCta: {
      eyebrow: "LET'S TALK",
      title: "Would you like to sell vouchers without manual issuance?",
      description:
        "Tell me about voucher types, your current website and redemption process. Together we can design a safe purchase and operations flow.",
      action: "Discuss gift vouchers",
    },
  },
} satisfies Record<ServiceDetailSlug, ServiceDetailCopy>;

export const serviceDetailCopy: Record<
  Locale,
  Record<ServiceDetailSlug, ServiceDetailCopy>
> = { cs, en };

export const isServiceDetailSlug = (
  value: string,
): value is PublicServiceDetailSlug =>
  serviceDetailSlugs.includes(value as PublicServiceDetailSlug);
