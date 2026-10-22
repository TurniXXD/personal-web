import type { Locale } from "@/lib/content";

export type AiUseCaseId =
  | "trends"
  | "social-content"
  | "enquiries"
  | "quotations"
  | "reviews"
  | "recommendations";

export type AiUseCaseVisualRow = {
  label: string;
  value: string;
  meta?: string;
};

export type AiUseCaseSlide = {
  id: AiUseCaseId;
  category: string;
  title: string;
  description: string;
  workflow: string[];
  visual: {
    eyebrow: string;
    title: string;
    rows: AiUseCaseVisualRow[];
    summary: string;
    note?: string;
    preview?: string;
    auxiliary?: string;
  };
};

type LocalizedSlide = {
  id: AiUseCaseId;
  cs: Omit<AiUseCaseSlide, "id">;
  en: Omit<AiUseCaseSlide, "id">;
};

export type AiUseCaseCarouselCopy = {
  navigationLabel: string;
  carouselLabel: string;
  slideLabel: (index: number, title: string) => string;
};

export const aiUseCaseCarouselCopy: Record<Locale, AiUseCaseCarouselCopy> = {
  cs: {
    navigationLabel: "Výběr příkladu využití AI",
    carouselLabel: "Praktické příklady využití AI",
    slideLabel: (index, title) => `Příklad ${index}: ${title}`,
  },
  en: {
    navigationLabel: "Choose an AI use case",
    carouselLabel: "Practical AI use cases",
    slideLabel: (index, title) => `Example ${index}: ${title}`,
  },
};

const slides: LocalizedSlide[] = [
  {
    id: "trends",
    cs: {
      category: "Marketing a průzkum trhu",
      title: "Mějte přehled o trendech ve vašem oboru",
      description:
        "AI sleduje vybrané veřejné zdroje, vyhledává důležité změny a připravuje přehled trendů a příležitostí.",
      workflow: [
        "Sběr veřejných informací",
        "Analýza změn a trendů",
        "Výběr relevantních zjištění",
        "Pravidelný přehled pro firmu",
      ],
      visual: {
        eyebrow: "TÝDENNÍ PŘEHLED",
        title: "Co se mění ve vašem oboru",
        rows: [
          { label: "Firemní automatizace", value: "+28 %", meta: "6 zdrojů" },
          { label: "Zákaznické portály", value: "+17 %", meta: "4 zdroje" },
          { label: "Online samoobsluha", value: "+11 %", meta: "3 zdroje" },
        ],
        summary: "3 témata stojí tento týden za pozornost",
        note: "Ukázková data z veřejných zdrojů",
      },
    },
    en: {
      category: "Marketing and market research",
      title: "Stay on top of trends in your industry",
      description:
        "AI monitors selected public sources, identifies important changes and prepares an overview of trends and opportunities.",
      workflow: [
        "Collect public information",
        "Analyse changes and trends",
        "Select relevant findings",
        "Prepare a regular company briefing",
      ],
      visual: {
        eyebrow: "WEEKLY BRIEFING",
        title: "What is changing in your industry",
        rows: [
          { label: "Business automation", value: "+28%", meta: "6 sources" },
          { label: "Customer portals", value: "+17%", meta: "4 sources" },
          { label: "Online self-service", value: "+11%", meta: "3 sources" },
        ],
        summary: "3 topics are worth your attention this week",
        note: "Illustrative data from public sources",
      },
    },
  },
  {
    id: "social-content",
    cs: {
      category: "Marketing a obsah",
      title: "Připravujte obsah na sociální sítě rychleji",
      description:
        "AI využije firemní novinky, produkty a aktuální témata k přípravě návrhů příspěvků a publikačního plánu.",
      workflow: [
        "Firemní podklady a témata",
        "Návrhy příspěvků pomocí AI",
        "Kontrola a schválení",
        "Zařazení do publikačního kalendáře",
      ],
      visual: {
        eyebrow: "OBSAHOVÝ PLÁN",
        title: "Příspěvky připravené ke kontrole",
        rows: [
          { label: "LinkedIn", value: "Čeká na schválení", meta: "Út 09:00" },
          { label: "Instagram", value: "Schváleno", meta: "St 17:30" },
          { label: "Firemní blog", value: "Rozpracováno", meta: "Pá 08:00" },
        ],
        summary: "Tento týden jsou naplánované 3 výstupy",
        note: "Před zveřejněním vždy proběhne kontrola člověkem",
      },
    },
    en: {
      category: "Marketing and content",
      title: "Prepare social media content faster",
      description:
        "AI uses company news, products and current topics to prepare post drafts and a publishing plan.",
      workflow: [
        "Company materials and topics",
        "AI-assisted post drafts",
        "Review and approval",
        "Add to the publishing calendar",
      ],
      visual: {
        eyebrow: "CONTENT PLAN",
        title: "Posts ready for review",
        rows: [
          { label: "LinkedIn", value: "Awaiting approval", meta: "Tue 09:00" },
          { label: "Instagram", value: "Approved", meta: "Wed 17:30" },
          { label: "Company blog", value: "In progress", meta: "Fri 08:00" },
        ],
        summary: "3 pieces of content are scheduled this week",
        note: "A person reviews every item before publication",
      },
    },
  },
  {
    id: "enquiries",
    cs: {
      category: "Obchod a CRM",
      title: "Proměňte příchozí poptávky v přehledné obchodní příležitosti",
      description:
        "AI rozpozná obsah příchozí poptávky, vytáhne důležité informace a připraví záznam v CRM pro obchodníka.",
      workflow: [
        "Přijetí e-mailu",
        "Rozpoznání požadavku",
        "Získání důležitých údajů",
        "Vytvoření záznamu v CRM",
      ],
      visual: {
        eyebrow: "NOVÁ POPTÁVKA",
        title: "Příležitost připravená pro obchodníka",
        rows: [
          { label: "Firma", value: "Lumen Studio" },
          { label: "Poptávaná služba", value: "Klientský portál" },
          { label: "Rozpočet", value: "150–220 tis. Kč" },
          { label: "Termín", value: "3. čtvrtletí" },
        ],
        summary: "Záznam v CRM je připravený ke kontrole",
        note: "Fiktivní ukázková poptávka",
        preview: "Máme zájem o klientský portál pro naše zákazníky…",
      },
    },
    en: {
      category: "Sales and CRM",
      title: "Turn incoming enquiries into clear sales opportunities",
      description:
        "AI recognises the content of an incoming enquiry, extracts important details and prepares a CRM record for a salesperson.",
      workflow: [
        "Receive the email",
        "Recognise the request",
        "Extract important details",
        "Create a CRM record",
      ],
      visual: {
        eyebrow: "NEW ENQUIRY",
        title: "Opportunity ready for a salesperson",
        rows: [
          { label: "Company", value: "Lumen Studio" },
          { label: "Requested service", value: "Customer portal" },
          { label: "Budget", value: "CZK 150–220k" },
          { label: "Timeline", value: "Q3" },
        ],
        summary: "The CRM record is ready for review",
        note: "Fictional example enquiry",
        preview: "We are interested in a customer portal for our clients…",
      },
    },
  },
  {
    id: "quotations",
    cs: {
      category: "Obchod a administrativa",
      title: "Připravujte cenové nabídky bez zbytečného přepisování",
      description:
        "AI z požadavků zákazníka a firemních podkladů připraví návrh cenové nabídky, který stačí zkontrolovat a schválit.",
      workflow: [
        "Požadavky zákazníka",
        "Načtení ceníku a podkladů",
        "Příprava návrhu nabídky",
        "Kontrola a schválení",
      ],
      visual: {
        eyebrow: "NÁVRH NABÍDKY",
        title: "Cenová nabídka č. 2026-014",
        rows: [
          { label: "Analýza a návrh", value: "12 000 Kč", meta: "1 celek" },
          { label: "Vývoj portálu", value: "84 000 Kč", meta: "168 hodin" },
          { label: "Nasazení a školení", value: "9 500 Kč", meta: "1 celek" },
        ],
        summary: "Celkem 105 500 Kč bez DPH",
        note: "Fiktivní nabídka · návrh čeká na schválení",
      },
    },
    en: {
      category: "Sales and administration",
      title: "Prepare quotations without unnecessary retyping",
      description:
        "AI uses the customer's requirements and company materials to prepare a quotation draft for review and approval.",
      workflow: [
        "Customer requirements",
        "Load pricing and materials",
        "Prepare a quotation draft",
        "Review and approval",
      ],
      visual: {
        eyebrow: "QUOTATION DRAFT",
        title: "Quotation no. 2026-014",
        rows: [
          {
            label: "Analysis and design",
            value: "CZK 12,000",
            meta: "1 package",
          },
          {
            label: "Portal development",
            value: "CZK 84,000",
            meta: "168 hours",
          },
          {
            label: "Launch and training",
            value: "CZK 9,500",
            meta: "1 package",
          },
        ],
        summary: "Total CZK 105,500 excl. VAT",
        note: "Fictional quotation · draft awaiting approval",
      },
    },
  },
  {
    id: "reviews",
    cs: {
      category: "Zákaznická zkušenost",
      title: "Zjistěte, co zákazníci skutečně oceňují",
      description:
        "AI analyzuje recenze a zpětnou vazbu, odhaluje opakující se problémy a připravuje přehled oblastí ke zlepšení.",
      workflow: [
        "Sběr zákaznických recenzí",
        "Analýza témat a sentimentu",
        "Identifikace opakujících se problémů",
        "Přehled doporučených zlepšení",
      ],
      visual: {
        eyebrow: "ANALÝZA RECENZÍ",
        title: "Co zákazníci zmiňují nejčastěji",
        rows: [
          {
            label: "Rychlost doručení",
            value: "92 % pozitivní",
            meta: "48 zmínek",
          },
          {
            label: "Přehlednost nákupu",
            value: "84 % pozitivní",
            meta: "31 zmínek",
          },
          {
            label: "Komunikace",
            value: "Potřebuje pozornost",
            meta: "19 zmínek",
          },
        ],
        summary: "Doporučení: zpřesnit informace o stavu objednávky",
        note: "Fiktivní recenze a souhrn",
        preview:
          "Rychlé doručení, ale chyběla mi průběžná informace o objednávce.",
        auxiliary: "98 recenzí",
      },
    },
    en: {
      category: "Customer experience",
      title: "Discover what customers truly value",
      description:
        "AI analyses reviews and feedback, identifies recurring problems and prepares an overview of areas for improvement.",
      workflow: [
        "Collect customer reviews",
        "Analyse topics and sentiment",
        "Identify recurring problems",
        "Summarise recommended improvements",
      ],
      visual: {
        eyebrow: "REVIEW ANALYSIS",
        title: "What customers mention most often",
        rows: [
          {
            label: "Delivery speed",
            value: "92% positive",
            meta: "48 mentions",
          },
          {
            label: "Checkout clarity",
            value: "84% positive",
            meta: "31 mentions",
          },
          {
            label: "Communication",
            value: "Needs attention",
            meta: "19 mentions",
          },
        ],
        summary: "Recommendation: clarify order status updates",
        note: "Fictional reviews and summary",
        preview: "Fast delivery, but I missed ongoing updates about my order.",
        auxiliary: "98 reviews",
      },
    },
  },
  {
    id: "recommendations",
    cs: {
      category: "E-shop a prodej",
      title: "Doporučujte produkty, které k sobě patří",
      description:
        "Systém analyzuje historii objednávek a vyhodnocuje, které produkty se často nakupují společně. Výsledky využije k aktualizaci doporučení v e-shopu.",
      workflow: [
        "Načtení historie objednávek",
        "Analýza nákupních kombinací",
        "Výběr souvisejících produktů",
        "Aktualizace doporučení v e-shopu",
      ],
      visual: {
        eyebrow: "SOUVISEJÍCÍ PRODUKTY",
        title: "Často nakupované kombinace",
        rows: [
          { label: "Kávovar", value: "Kávová zrna", meta: "často společně" },
          {
            label: "Fotoaparát",
            value: "Paměťová karta",
            meta: "často společně",
          },
          {
            label: "Běžecké boty",
            value: "Sportovní ponožky",
            meta: "často společně",
          },
        ],
        summary: "3 doporučení jsou připravená k aktualizaci v e-shopu",
        note: "Ilustrační příklady, nikoli skutečná analytická data",
      },
    },
    en: {
      category: "E-commerce and sales",
      title: "Recommend products that belong together",
      description:
        "The system analyses order history and evaluates which products are frequently purchased together. The results update recommendations in the online store.",
      workflow: [
        "Load order history",
        "Analyse purchase combinations",
        "Select related products",
        "Update store recommendations",
      ],
      visual: {
        eyebrow: "RELATED PRODUCTS",
        title: "Frequently purchased combinations",
        rows: [
          {
            label: "Coffee machine",
            value: "Coffee beans",
            meta: "often together",
          },
          { label: "Camera", value: "Memory card", meta: "often together" },
          {
            label: "Running shoes",
            value: "Sports socks",
            meta: "often together",
          },
        ],
        summary: "3 recommendations are ready to update in the store",
        note: "Illustrative examples, not real analytics data",
      },
    },
  },
];

export const getAiUseCaseSlides = (locale: Locale): AiUseCaseSlide[] =>
  slides.map(({ id, cs, en }) => ({
    id,
    ...(locale === "cs" ? cs : en),
  }));
