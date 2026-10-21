import type { AutomationIconName } from "@/components/automation-icon";
import type { Locale } from "@/lib/content";

export type AutomationCategoryId =
  | "email-marketing"
  | "ecommerce"
  | "social"
  | "ai-documents"
  | "business-processes"
  | "data-reporting";

export type AutomationExample = {
  id: string;
  number: string;
  category: AutomationCategoryId;
  icon: AutomationIconName;
  title: string;
  description: string;
  trigger: string;
  workflow: string[];
  benefit: string;
  details: string[];
  examples?: string[];
  note?: string;
};

type LocalizedExample = Omit<
  AutomationExample,
  | "title"
  | "description"
  | "trigger"
  | "workflow"
  | "benefit"
  | "details"
  | "examples"
  | "note"
> & {
  cs: Omit<AutomationExample, "id" | "number" | "category" | "icon">;
  en: Omit<AutomationExample, "id" | "number" | "category" | "icon">;
};

export type AutomationPageCopy = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    secondary: string;
    visualSteps: string[];
  };
  catalog: {
    eyebrow: string;
    title: string;
    description: string;
    all: string;
    showMore: string;
    categories: Record<AutomationCategoryId, string>;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: Array<{ number: string; title: string; description: string }>;
  };
  contactTitle: string;
};

export const automationPageCopy: Record<Locale, AutomationPageCopy> = {
  cs: {
    meta: {
      title: "Automatizace procesů a AI řešení na míru | Jakub Vantuch",
      description:
        "Automatizace e-mailů, e-shopů, sociálních sítí a firemních procesů. Propojení systémů, AI řešení a praktické ukázky automatizací.",
    },
    hero: {
      eyebrow: "AUTOMATIZACE A AI",
      title: "Méně rutiny. Více času na podnikání.",
      description:
        "Od automatických e-mailů a péče o zákazníky až po chytré propojení firemních systémů. Podívejte se, co všechno lze automatizovat.",
      primary: "Probrat možnosti automatizace",
      secondary: "Prohlédnout příklady",
      visualSteps: ["Proces", "Automatizace", "Přehled"],
    },
    catalog: {
      eyebrow: "PRAKTICKÉ PŘÍKLADY",
      title: "Kde může automatizace pomoci?",
      description:
        "Vyberte oblast a projděte si konkrétní situace, které lze podle používaných systémů a potřeb firmy zjednodušit.",
      all: "Vše",
      showMore: "Zobrazit další příklady",
      categories: {
        "email-marketing": "E-mail a marketing",
        ecommerce: "E-shop",
        social: "Sociální sítě",
        "ai-documents": "AI a dokumenty",
        "business-processes": "Firemní procesy",
        "data-reporting": "Data a reporting",
      },
    },
    process: {
      eyebrow: "POSTUP",
      title: "Jak spolupráce probíhá?",
      steps: [
        {
          number: "01",
          title: "Probereme váš proces",
          description:
            "Zjistíme, co dnes řešíte ručně a kde vznikají zbytečné komplikace.",
        },
        {
          number: "02",
          title: "Navrhnu řešení",
          description:
            "Vybereme automatizace, které dávají smysl vzhledem k vašim potřebám a rozpočtu.",
        },
        {
          number: "03",
          title: "Automatizaci vytvořím",
          description:
            "Propojím potřebné systémy, připravím logiku a řešení otestuji.",
        },
        {
          number: "04",
          title: "Spustíme a doladíme",
          description:
            "Ověříme fungování v praxi a případně upravíme další kroky.",
        },
      ],
    },
    contactTitle: "Nevíte, co by šlo automatizovat právě u vás?",
  },
  en: {
    meta: {
      title: "Custom process automation and AI solutions | Jakub Vantuch",
      description:
        "Email, e-commerce, social monitoring and business process automation, system integrations, AI solutions and practical examples.",
    },
    hero: {
      eyebrow: "AUTOMATION AND AI",
      title: "Less routine. More time for your business.",
      description:
        "From automated emails and customer care to practical connections between business systems. Explore what your company could automate.",
      primary: "Discuss automation options",
      secondary: "Explore examples",
      visualSteps: ["Process", "Automation", "Overview"],
    },
    catalog: {
      eyebrow: "PRACTICAL EXAMPLES",
      title: "Where can automation help?",
      description:
        "Choose an area and explore situations that can be simplified around your systems and business needs.",
      all: "All",
      showMore: "Show more examples",
      categories: {
        "email-marketing": "Email and marketing",
        ecommerce: "E-commerce",
        social: "Social media",
        "ai-documents": "AI and documents",
        "business-processes": "Business processes",
        "data-reporting": "Data and reporting",
      },
    },
    process: {
      eyebrow: "PROCESS",
      title: "How does the collaboration work?",
      steps: [
        {
          number: "01",
          title: "We discuss your process",
          description:
            "We identify what is handled manually today and where avoidable complications arise.",
        },
        {
          number: "02",
          title: "I propose a solution",
          description: "We choose automation that fits your needs and budget.",
        },
        {
          number: "03",
          title: "I build the automation",
          description:
            "I connect the required systems, implement the logic and test the solution.",
        },
        {
          number: "04",
          title: "We launch and refine it",
          description:
            "We verify the flow in practice and adjust the next steps where needed.",
        },
      ],
    },
    contactTitle: "Not sure what your company could automate?",
  },
};

const examples: LocalizedExample[] = [
  {
    id: "abandoned-cart",
    number: "01",
    category: "email-marketing",
    icon: "shopping-cart",
    cs: {
      title: "Připomeňte zákazníkům nedokončený nákup",
      description:
        "Citlivě naváže na košík, který zákazník opustil před dokončením objednávky.",
      trigger: "Zákazník opustí košík po zadání kontaktních údajů.",
      workflow: [
        "Nedokončený nákup",
        "Kontrola souhlasu a objednávky",
        "Připomínka e-mailem",
        "Návrat do košíku",
      ],
      benefit: "Pomáhá získat zpět část nedokončených objednávek.",
      details: [
        "Ověří, zda objednávka mezitím nebyla dokončena.",
        "Při splnění podmínek odešle personalizovanou připomínku a případný follow-up.",
        "Umožní sledovat návraty a dokončené nákupy.",
      ],
      note: "Odeslání se řídí udělenými souhlasy a pravidly pro obchodní komunikaci.",
    },
    en: {
      title: "Remind customers about an unfinished purchase",
      description:
        "Follow up carefully when a customer leaves a checkout before completing the order.",
      trigger: "A customer leaves the cart after entering contact details.",
      workflow: [
        "Unfinished purchase",
        "Consent and order check",
        "Email reminder",
        "Return to cart",
      ],
      benefit: "Helps recover some unfinished orders.",
      details: [
        "Checks whether the order was completed in the meantime.",
        "Sends a permitted personalised reminder and optional follow-up.",
        "Tracks returns and completed purchases.",
      ],
      note: "Sending follows consent and applicable marketing rules.",
    },
  },
  {
    id: "product-review",
    number: "02",
    category: "email-marketing",
    icon: "star",
    cs: {
      title: "Získejte více hodnocení od zákazníků",
      description:
        "Po doručení objednávky požádá zákazníka ve vhodný čas o hodnocení produktu.",
      trigger: "Objednávka je označena jako doručená.",
      workflow: [
        "Doručená objednávka",
        "Časová prodleva",
        "Žádost o hodnocení",
        "Recenze",
      ],
      benefit: "Pravidelný sběr zpětné vazby bez ručního rozesílání e-mailů.",
      details: [
        "Sleduje doručení a počká nastavitelný počet dní.",
        "Odkáže přímo na zakoupený produkt a zabrání duplicitním žádostem.",
      ],
    },
    en: {
      title: "Collect more customer reviews",
      description:
        "Ask for a product review at an appropriate time after delivery.",
      trigger: "An order is marked as delivered.",
      workflow: ["Delivered order", "Delay", "Review request", "Review"],
      benefit: "Regular feedback collection without manual email sending.",
      details: [
        "Tracks delivery and waits a configurable number of days.",
        "Links to the purchased product and prevents duplicate requests.",
      ],
    },
  },
  {
    id: "related-products",
    number: "03",
    category: "email-marketing",
    icon: "package-plus",
    cs: {
      title: "Nabídněte zákazníkům produkty, které se jim mohou hodit",
      description:
        "Po nákupu doporučí vhodné příslušenství, doplněk nebo časově relevantní doplnění zásob.",
      trigger: "Zákazník zakoupí vybraný produkt.",
      workflow: [
        "Nákup produktu",
        "Analýza objednávky",
        "Výběr souvisejících produktů",
        "Personalizovaný e-mail",
      ],
      benefit:
        "Relevantní následná komunikace, která může podpořit opakované nákupy.",
      details: [
        "Doporučení může vycházet z jednoduchých pravidel i pokročilejšího vyhodnocení.",
        "Prodleva i nabídka se nastaví podle typu produktu a nákupního cyklu.",
      ],
      examples: [
        "Kávovar → vhodná káva a údržba",
        "Fotoaparát → kompatibilní karta nebo pouzdro",
        "Spotřební zboží → připomínka doplnění zásob",
      ],
    },
    en: {
      title: "Recommend products customers may find useful",
      description:
        "Suggest suitable accessories, complementary items or timely replenishment after a purchase.",
      trigger: "A customer buys a selected product.",
      workflow: [
        "Product purchase",
        "Order analysis",
        "Related product selection",
        "Personalised email",
      ],
      benefit: "Relevant follow-up that can support repeat purchases.",
      details: [
        "Recommendations may use straightforward rules or more advanced evaluation.",
        "Timing and products are configured around the purchase cycle.",
      ],
      examples: [
        "Coffee machine → coffee and maintenance items",
        "Camera → compatible card or case",
        "Consumable → replenishment reminder",
      ],
    },
  },
  {
    id: "welcome-series",
    number: "04",
    category: "email-marketing",
    icon: "user-plus",
    cs: {
      title: "Přivítejte nové zákazníky automaticky",
      description:
        "Připraví konzistentní úvodní komunikaci po registraci nebo přihlášení k odběru.",
      trigger: "Nový zákazník se zaregistruje nebo přihlásí k newsletteru.",
      workflow: [
        "Registrace",
        "Uvítací e-mail",
        "Užitečné informace",
        "Další relevantní komunikace",
      ],
      benefit: "Konzistentní komunikace s novými zákazníky.",
      details: [
        "Rozdělí sérii do několika srozumitelných kroků.",
        "Ukončí nebo upraví tok podle chování zákazníka.",
      ],
    },
    en: {
      title: "Welcome new customers automatically",
      description:
        "Prepare consistent onboarding after a signup or subscription.",
      trigger: "A customer creates an account or subscribes.",
      workflow: [
        "Signup",
        "Welcome email",
        "Useful information",
        "Relevant follow-up",
      ],
      benefit: "Consistent communication with new customers.",
      details: [
        "Splits onboarding into clear steps.",
        "Adapts or stops the flow based on customer activity.",
      ],
    },
  },
  {
    id: "customer-reactivation",
    number: "05",
    category: "email-marketing",
    icon: "user-search",
    cs: {
      title: "Připomeňte se zákazníkům, kteří dlouho nenakoupili",
      description:
        "Vybere neaktivní zákazníky a připraví pro ně relevantní komunikaci.",
      trigger: "Zákazník po nastavenou dobu nenakoupil.",
      workflow: [
        "Období neaktivity",
        "Výběr zákazníků",
        "Relevantní nabídka",
        "Vyhodnocení",
      ],
      benefit: "Pomáhá znovu oslovit stávající zákazníky.",
      details: [
        "Délka neaktivity se nastaví podle nákupního cyklu.",
        "Komunikace se odesílá pouze zákazníkům, u kterých jsou splněné potřebné podmínky.",
      ],
    },
    en: {
      title: "Reconnect with customers who have not purchased recently",
      description:
        "Select inactive customers and prepare relevant communication.",
      trigger: "A customer has not purchased for a configured period.",
      workflow: [
        "Inactivity period",
        "Customer selection",
        "Relevant offer",
        "Evaluation",
      ],
      benefit: "Helps reconnect with existing customers.",
      details: [
        "Timing follows the purchase cycle.",
        "Messages are sent only when the required conditions are met.",
      ],
    },
  },
  {
    id: "sales-follow-up",
    number: "06",
    category: "email-marketing",
    icon: "mail-check",
    cs: {
      title: "Nezapomínejte na rozpracované obchodní příležitosti",
      description:
        "Pohlídá nabídky a poptávky, na které druhá strana zatím nereagovala.",
      trigger: "Po odeslání nabídky nepřijde v nastaveném čase odpověď.",
      workflow: [
        "Odeslaná nabídka",
        "Čekání na odpověď",
        "Připomínka",
        "Aktualizace CRM",
      ],
      benefit: "Méně zapomenutých poptávek a obchodních příležitostí.",
      details: [
        "Zkontroluje stav příležitosti před odesláním.",
        "Po reakci zastaví připomínky a aktualizuje CRM.",
      ],
    },
    en: {
      title: "Keep unfinished sales opportunities moving",
      description:
        "Watch proposals and enquiries that have not received a response.",
      trigger: "No reply arrives within a configured period after a proposal.",
      workflow: [
        "Proposal sent",
        "Wait for response",
        "Reminder",
        "CRM update",
      ],
      benefit: "Fewer forgotten enquiries and sales opportunities.",
      details: [
        "Checks opportunity status before sending.",
        "Stops reminders after a response and updates the CRM.",
      ],
    },
  },
  {
    id: "back-in-stock",
    number: "07",
    category: "ecommerce",
    icon: "bell",
    cs: {
      title: "Informujte zákazníky, když je produkt opět skladem",
      description:
        "Upozorní zájemce ve chvíli, kdy se změní dostupnost produktu.",
      trigger: "Skladová zásoba sledovaného produktu se obnoví.",
      workflow: [
        "Nedostupný produkt",
        "Zájem zákazníka",
        "Změna zásoby",
        "Upozornění",
      ],
      benefit: "Zákazník nemusí dostupnost kontrolovat ručně.",
      details: [
        "Uloží zájem o konkrétní variantu.",
        "Před odesláním znovu ověří dostupnost.",
      ],
    },
    en: {
      title: "Notify customers when a product is back in stock",
      description:
        "Alert interested customers when product availability changes.",
      trigger: "Stock for a watched product is replenished.",
      workflow: [
        "Unavailable product",
        "Customer interest",
        "Stock change",
        "Notification",
      ],
      benefit: "Customers do not need to check availability manually.",
      details: [
        "Stores interest in a specific variant.",
        "Checks availability again before sending.",
      ],
    },
  },
  {
    id: "order-status",
    number: "08",
    category: "ecommerce",
    icon: "truck",
    cs: {
      title: "Informujte zákazníky o průběhu objednávky",
      description:
        "Odešle srozumitelnou zprávu při důležitých změnách stavu objednávky.",
      trigger: "Objednávka vznikne nebo změní stav.",
      workflow: [
        "Nová objednávka",
        "Změna stavu",
        "Automatická zpráva",
        "Informovaný zákazník",
      ],
      benefit: "Méně rutinních dotazů na stav objednávky.",
      details: [
        "Překládá interní stavy do srozumitelných zpráv.",
        "Neodesílá duplicitní notifikace.",
      ],
    },
    en: {
      title: "Keep customers informed about their order",
      description:
        "Send a clear message when an important order status changes.",
      trigger: "An order is created or changes status.",
      workflow: [
        "New order",
        "Status change",
        "Automatic message",
        "Informed customer",
      ],
      benefit: "Fewer routine questions about order status.",
      details: [
        "Turns internal states into clear messages.",
        "Avoids duplicate notifications.",
      ],
    },
  },
  {
    id: "risky-orders",
    number: "09",
    category: "ecommerce",
    icon: "shield-alert",
    cs: {
      title: "Odhalte objednávky, které potřebují pozornost",
      description:
        "Označí neúplné nebo neobvyklé objednávky ke kontrole pracovníkem.",
      trigger: "Nová objednávka nesplní některé z nastavených pravidel.",
      workflow: [
        "Nová objednávka",
        "Kontrola pravidel",
        "Označení výjimky",
        "Kontrola pracovníkem",
      ],
      benefit: "Rychlejší řešení problematických objednávek.",
      details: [
        "Kontroluje chybějící údaje, hodnotu či opakované problémy s doručením.",
        "Výsledek je podnět ke kontrole, nikoli konečný verdikt o podvodu.",
      ],
    },
    en: {
      title: "Find orders that need attention",
      description: "Flag incomplete or unusual orders for human review.",
      trigger: "A new order fails one of the configured rules.",
      workflow: ["New order", "Rule check", "Exception flag", "Human review"],
      benefit: "Faster handling of problematic orders.",
      details: [
        "Checks missing data, unusual values or repeated delivery issues.",
        "A flag prompts review; it is not a definitive fraud decision.",
      ],
    },
  },
  {
    id: "trend-monitoring",
    number: "10",
    category: "social",
    icon: "trending-up",
    cs: {
      title: "Zjistěte, o čem se právě mluví ve vašem oboru",
      description:
        "Sleduje vybrané veřejné zdroje a připraví přehled vznikajících témat.",
      trigger: "Pravidelný plán sběru nebo nová relevantní zmínka.",
      workflow: [
        "Veřejné zdroje",
        "Sběr dat",
        "Analýza trendů",
        "Pravidelný přehled",
      ],
      benefit: "Méně času stráveného ručním hledáním témat.",
      details: [
        "Sleduje klíčová slova, seskupuje diskuse a shrnuje relevantní zjištění.",
        "Může navrhnout témata pro další obsah; vychází z konceptu projektu Socials Bot.",
      ],
      examples: ["YouTube", "Bluesky", "Hacker News", "Mastodon", "RSS kanály"],
      note: "Dostupnost zdrojů závisí na jejich API, podmínkách použití a veřejném přístupu.",
    },
    en: {
      title: "See what your industry is discussing",
      description:
        "Monitor selected public sources and prepare an overview of emerging topics.",
      trigger: "A scheduled collection or a new relevant mention.",
      workflow: [
        "Public sources",
        "Data collection",
        "Trend analysis",
        "Regular overview",
      ],
      benefit: "Less time spent searching for topics manually.",
      details: [
        "Tracks keywords, groups discussions and summarises relevant findings.",
        "Can suggest content opportunities and builds on the Socials Bot concept.",
      ],
      examples: ["YouTube", "Bluesky", "Hacker News", "Mastodon", "RSS feeds"],
      note: "Source availability depends on APIs, terms of service and public access.",
    },
  },
  {
    id: "social-scheduling",
    number: "11",
    category: "social",
    icon: "calendar-clock",
    cs: {
      title: "Připravujte obsah na sociální sítě efektivněji",
      description:
        "Pomůže s návrhy, úpravou pro různé sítě a plánem publikování.",
      trigger: "Schválené téma nebo položka v obsahovém plánu.",
      workflow: [
        "Témata",
        "Návrhy příspěvků",
        "Schválení",
        "Naplánování publikace",
      ],
      benefit: "Pravidelnější komunikace bez neustálého ručního plánování.",
      details: [
        "Přizpůsobí koncept jednotlivým platformám a připraví harmonogram.",
        "Před publikováním ponechá prostor pro úpravu a schválení člověkem.",
      ],
      note: "Publikování lze napojit pouze tam, kde je dostupná podporovaná integrace.",
    },
    en: {
      title: "Prepare social content more efficiently",
      description:
        "Support drafting, platform adaptation and publication planning.",
      trigger: "An approved topic or content-plan item.",
      workflow: ["Topics", "Post drafts", "Approval", "Publication schedule"],
      benefit: "More consistent communication with less manual planning.",
      details: [
        "Adapts a concept to each platform and prepares a schedule.",
        "Keeps human editing and approval before publication.",
      ],
      note: "Publishing can be connected only where a supported integration is available.",
    },
  },
  {
    id: "brand-mentions",
    number: "12",
    category: "social",
    icon: "at-sign",
    cs: {
      title: "Mějte přehled o tom, kde se mluví o vaší značce",
      description:
        "Shromažďuje dostupné veřejné zmínky a upozorní na relevantní diskuse.",
      trigger: "Ve veřejném zdroji se objeví sledovaný výraz.",
      workflow: ["Veřejné zmínky", "Sběr dat", "Vyhodnocení", "Upozornění"],
      benefit: "Rychlejší přehled o relevantních veřejných diskusích.",
      details: [
        "Filtruje šum podle klíčových slov a zdrojů.",
        "Předá odkaz a kontext pro další posouzení.",
      ],
    },
    en: {
      title: "Track where people mention your brand",
      description:
        "Collect available public mentions and flag relevant discussions.",
      trigger: "A watched term appears in a public source.",
      workflow: ["Public mentions", "Data collection", "Evaluation", "Alert"],
      benefit: "A faster overview of relevant public discussions.",
      details: [
        "Filters noise by keywords and sources.",
        "Provides a link and context for human review.",
      ],
    },
  },
  {
    id: "content-calendar",
    number: "13",
    category: "social",
    icon: "calendar-days",
    cs: {
      title: "Proměňte nápady v konkrétní obsahový plán",
      description:
        "Seskupí podklady a trendy do návrhu témat a publikačního kalendáře.",
      trigger: "Nové podklady, témata nebo pravidelný plánovací termín.",
      workflow: [
        "Podklady a trendy",
        "Návrhy témat",
        "Obsahový kalendář",
        "Schválení",
      ],
      benefit: "Méně času nad plánováním marketingového obsahu.",
      details: [
        "Navrhne témata podle zvolených okruhů a kanálů.",
        "Výstup zůstává návrhem ke kontrole a schválení.",
      ],
    },
    en: {
      title: "Turn ideas into a concrete content plan",
      description:
        "Organise inputs and trends into topics and a publication calendar.",
      trigger: "New inputs, topics or a scheduled planning cycle.",
      workflow: [
        "Inputs and trends",
        "Topic proposals",
        "Content calendar",
        "Approval",
      ],
      benefit: "Less time spent planning marketing content.",
      details: [
        "Suggests topics around selected themes and channels.",
        "The output remains a proposal for review and approval.",
      ],
    },
  },
  {
    id: "invoice-processing",
    number: "14",
    category: "ai-documents",
    icon: "receipt",
    cs: {
      title: "Přestaňte ručně přepisovat údaje z faktur",
      description:
        "Vytěží důležité údaje, zkontroluje je a připraví pro účetní systém.",
      trigger: "Do určené schránky nebo úložiště dorazí faktura.",
      workflow: [
        "Příchozí faktura",
        "Vytěžení údajů",
        "Kontrola",
        "Účetní systém",
      ],
      benefit: "Méně administrativy při zpracování dokladů.",
      details: [
        "Rozpozná potřebná pole a upozorní na chybějící či neobvyklé údaje.",
        "Nejisté případy předá ke kontrole člověkem a schválená data odešle dál.",
      ],
    },
    en: {
      title: "Stop retyping invoice data manually",
      description:
        "Extract important fields, validate them and prepare them for accounting software.",
      trigger: "An invoice arrives in a selected inbox or storage location.",
      workflow: [
        "Incoming invoice",
        "Data extraction",
        "Review",
        "Accounting system",
      ],
      benefit: "Less administration when processing documents.",
      details: [
        "Extracts required fields and flags missing or unusual data.",
        "Routes uncertain cases for human review and sends approved data onwards.",
      ],
    },
  },
  {
    id: "incoming-email",
    number: "15",
    category: "ai-documents",
    icon: "inbox",
    cs: {
      title: "Roztřiďte příchozí e-maily automaticky",
      description:
        "Rozpozná typ požadavku, získá důležité informace a předá ho správnému týmu.",
      trigger: "Do firemní schránky dorazí nový e-mail.",
      workflow: [
        "Příchozí e-mail",
        "Klasifikace",
        "Přiřazení",
        "Návrh odpovědi",
      ],
      benefit: "Rychlejší vyřizování opakujících se požadavků.",
      details: [
        "Kategorizuje zprávu a vytěží údaje potřebné pro další zpracování.",
        "Může připravit návrh odpovědi, který pracovník před odesláním zkontroluje.",
      ],
    },
    en: {
      title: "Sort incoming emails automatically",
      description:
        "Recognise request type, extract important information and route it to the right team.",
      trigger: "A new message arrives in a company inbox.",
      workflow: [
        "Incoming email",
        "Classification",
        "Assignment",
        "Reply draft",
      ],
      benefit: "Faster handling of repeated requests.",
      details: [
        "Categorises the message and extracts data needed for the next step.",
        "Can prepare a draft reply for human review before sending.",
      ],
    },
  },
  {
    id: "document-assistant",
    number: "16",
    category: "ai-documents",
    icon: "library",
    cs: {
      title: "Najděte odpovědi ve firemních dokumentech během chvíle",
      description:
        "Asistent vyhledá dostupné interní podklady a připraví odpověď s odkazy na zdroje.",
      trigger: "Zaměstnanec položí otázku nad firemními znalostmi.",
      workflow: [
        "Dotaz zaměstnance",
        "Vyhledání dokumentů",
        "AI odpověď",
        "Odkaz na zdroj",
      ],
      benefit: "Méně času stráveného hledáním interních informací.",
      details: [
        "Pracuje pouze s dokumenty, ke kterým má uživatel přístup.",
        "U odpovědi zobrazí relevantní zdroje a umožní ověření člověkem.",
      ],
      note: "AI odpověď nemusí být bezchybná; důležité informace je potřeba ověřit ve zdroji.",
    },
    en: {
      title: "Find answers in company documents quickly",
      description:
        "Search accessible internal sources and prepare an answer with source links.",
      trigger: "An employee asks a question about company knowledge.",
      workflow: [
        "Employee question",
        "Document search",
        "AI answer",
        "Source link",
      ],
      benefit: "Less time spent searching for internal information.",
      details: [
        "Uses only documents the user can access.",
        "Shows relevant sources and supports human verification.",
      ],
      note: "AI answers may be incorrect; important information should be checked against the source.",
    },
  },
  {
    id: "form-to-crm",
    number: "17",
    category: "business-processes",
    icon: "database",
    cs: {
      title: "Každá poptávka rovnou na správném místě",
      description:
        "Přenese data z formuláře do CRM, přiřadí odpovědnost a upozorní tým.",
      trigger: "Návštěvník odešle webový formulář.",
      workflow: [
        "Webový formulář",
        "CRM",
        "Přiřazení obchodníkovi",
        "Upozornění",
      ],
      benefit: "Žádné ruční přepisování poptávek.",
      details: [
        "Ověří a normalizuje odeslaná data.",
        "Vytvoří nebo aktualizuje kontakt a uloží historii zpracování.",
      ],
    },
    en: {
      title: "Put every enquiry in the right place",
      description:
        "Move form data to the CRM, assign ownership and notify the team.",
      trigger: "A visitor submits a web form.",
      workflow: ["Web form", "CRM", "Sales assignment", "Notification"],
      benefit: "No manual retyping of enquiries.",
      details: [
        "Validates and normalises submitted data.",
        "Creates or updates the contact and stores processing history.",
      ],
    },
  },
  {
    id: "system-sync",
    number: "18",
    category: "business-processes",
    icon: "refresh",
    cs: {
      title: "Propojte aplikace, které dnes fungují odděleně",
      description:
        "Synchronizuje vybraná data mezi CRM, e-shopem, ERP a interními nástroji.",
      trigger: "Ve zdrojovém systému se změní sledovaný údaj.",
      workflow: [
        "CRM / E-shop / ERP",
        "Integrace",
        "Synchronizace",
        "Aktuální data",
      ],
      benefit: "Méně duplicit a ručních přenosů informací.",
      details: [
        "Určí zdroj pravdy pro jednotlivé typy dat.",
        "Zachytí chyby synchronizace a umožní jejich dohledání.",
      ],
    },
    en: {
      title: "Connect applications that currently work separately",
      description:
        "Synchronise selected data across CRM, e-commerce, ERP and internal tools.",
      trigger: "A watched value changes in the source system.",
      workflow: [
        "CRM / E-commerce / ERP",
        "Integration",
        "Synchronisation",
        "Current data",
      ],
      benefit: "Fewer duplicates and manual data transfers.",
      details: [
        "Defines a source of truth for each data type.",
        "Captures synchronisation errors for review.",
      ],
    },
  },
  {
    id: "task-reminders",
    number: "19",
    category: "business-processes",
    icon: "list-todo",
    cs: {
      title: "Důležité úkoly už nezůstanou zapomenuté",
      description:
        "Pohlídá termíny a připomene úkol správnému člověku ve vhodný čas.",
      trigger: "Úkol se blíží termínu nebo zůstává bez změny stavu.",
      workflow: [
        "Nový úkol",
        "Termín",
        "Automatická připomínka",
        "Aktualizace stavu",
      ],
      benefit: "Lepší přehled o termínech a odpovědnostech.",
      details: [
        "Nastaví pravidla podle typu a priority úkolu.",
        "Po dokončení zastaví další připomínky.",
      ],
    },
    en: {
      title: "Keep important tasks from being forgotten",
      description:
        "Watch deadlines and remind the right person at the right time.",
      trigger: "A task approaches its deadline or remains unchanged.",
      workflow: ["New task", "Deadline", "Automatic reminder", "Status update"],
      benefit: "Better visibility of deadlines and ownership.",
      details: [
        "Sets rules by task type and priority.",
        "Stops further reminders after completion.",
      ],
    },
  },
  {
    id: "document-generation",
    number: "20",
    category: "business-processes",
    icon: "file-stack",
    cs: {
      title: "Generujte nabídky a dokumenty z připravených dat",
      description:
        "Doplní data do schválené šablony a připraví dokument ke kontrole.",
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
      title: "Generate proposals and documents from prepared data",
      description:
        "Fill an approved template and prepare the document for review.",
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
    category: "data-reporting",
    icon: "chart",
    cs: {
      title: "Dostávejte pravidelný přehled o výsledcích firmy",
      description:
        "Spojí vybraná data a v dohodnutém intervalu připraví srozumitelný report.",
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
        "Combine selected data and prepare a clear report on schedule.",
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
    category: "data-reporting",
    icon: "activity",
    cs: {
      title: "Zjistěte včas, když se něco důležitého změní",
      description:
        "Sleduje vybrané metriky a upozorní na neobvyklou nebo významnou změnu.",
      trigger: "Hodnota překročí nastavenou podmínku nebo se výrazně odchýlí.",
      workflow: [
        "Sledovaná data",
        "Kontrola podmínek",
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
        "Monitor selected metrics and flag an unusual or important change.",
      trigger: "A value crosses a rule or deviates significantly.",
      workflow: [
        "Monitored data",
        "Condition check",
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
    category: "data-reporting",
    icon: "radar",
    cs: {
      title: "Sledujte změny na trhu bez každodenního hledání",
      description:
        "Kontroluje dostupné veřejné zdroje a připraví souhrn relevantních změn.",
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
        "Check available public sources and prepare a summary of relevant changes.",
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
];

export const getAutomationExamples = (locale: Locale): AutomationExample[] =>
  examples.map(({ cs, en, ...shared }) => ({
    ...shared,
    ...(locale === "cs" ? cs : en),
  }));
