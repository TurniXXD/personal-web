import type { LocalizedExample } from "@/lib/automation/content";

export default [
  {
    id: "trend-monitoring",
    number: "10",
    categories: ["social", "data-reporting"],
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
    categories: ["social"],
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
    categories: ["social", "data-reporting"],
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
    categories: ["social"],
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
    categories: ["ai-documents", "business-processes"],
    icon: "receipt",
    usesAi: true,
    cs: {
      title: "Přestaňte ručně přepisovat údaje z faktur",
      description:
        "Údaje z faktur se automaticky přenesou do účetního systému, takže je nemusíte ručně přepisovat.",
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
        "Invoice details are transferred to your accounting software automatically, so you do not have to retype them.",
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
    categories: ["ai-documents", "business-processes"],
    icon: "inbox",
    usesAi: true,
    cs: {
      title: "Roztřiďte příchozí e-maily automaticky",
      description:
        "Příchozí e-maily se automaticky roztřídí a dostanou ke správnému člověku, včetně návrhu odpovědi.",
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
        "Incoming emails are sorted and sent to the right person automatically, together with a suggested reply.",
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
    categories: ["ai-documents"],
    icon: "library",
    usesAi: true,
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
    categories: ["business-processes"],
    icon: "database",
    cs: {
      title: "Mějte každou poptávku rovnou na správném místě",
      description:
        "Údaje z webového formuláře se automaticky uloží k zákazníkovi a správný kolega dostane upozornění.",
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
      title: "Keep every enquiry in the right place",
      description:
        "Details from your website form are saved to the customer automatically and the right colleague is notified.",
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
    categories: ["business-processes"],
    icon: "refresh",
    cs: {
      title: "Mějte stejné a aktuální údaje ve všech aplikacích",
      description:
        "Změna v jednom systému se automaticky propíše do ostatních, takže nic nemusíte přepisovat dvakrát.",
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
      title: "Keep your data consistent and up to date across applications",
      description:
        "A change in one system is reflected in the others automatically, so you never have to enter it twice.",
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
    categories: ["business-processes"],
    icon: "list-todo",
    cs: {
      title: "Nenechte důležité úkoly zapadnout",
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
      title: "Never let an important task slip through",
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
] satisfies LocalizedExample[];
