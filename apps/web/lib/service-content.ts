import type { Locale } from "@/lib/content";

export type ServicePageKind = "web" | "ai";

export type ServiceIconName =
  | "browser"
  | "blocks"
  | "layout"
  | "plug"
  | "bot"
  | "message"
  | "mail"
  | "file-scan"
  | "chart"
  | "network"
  | "gauge"
  | "code"
  | "settings"
  | "store";

type ServiceItem = {
  icon: ServiceIconName;
  title: string;
  description: string;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type RelatedLink = {
  title: string;
  description: string;
  href: string;
};

export type ServicePageCopy = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    secondary?: string;
  };
  offering: {
    eyebrow: string;
    title: string;
    description?: string;
    items: ServiceItem[];
  };
  benefits?: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
  projects?: {
    eyebrow: string;
    title: string;
    description: string;
  };
  flow?: {
    eyebrow: string;
    title: string;
    description: string;
    steps: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  related?: {
    eyebrow: string;
    title: string;
    items: RelatedLink[];
  };
  contactTitle: string;
};

const csWeb: ServicePageCopy = {
  meta: {
    title: "Weby a webové aplikace na míru | Jakub Vantuch",
    description:
      "Návrh a vývoj moderních firemních webů, klientských portálů a webových aplikací na míru včetně integrací a dlouhodobé podpory.",
  },
  hero: {
    eyebrow: "WEBY A APLIKACE",
    title: "Digitální řešení, která rostou s vaším podnikáním.",
    description:
      "Navrhuji a vyvíjím moderní webové stránky, klientské portály a aplikace na míru. Od prvního návrhu až po nasazení a dlouhodobý rozvoj.",
    primary: "Probrat projekt",
    secondary: "Prohlédnout projekty",
  },
  offering: {
    eyebrow: "CO MOHU VYTVOŘIT",
    title: "Co pro vás mohu vytvořit",
    description:
      "Rozsah i technologie volím podle cíle projektu, způsobu správy a systémů, které už používáte.",
    items: [
      {
        icon: "browser",
        title: "Firemní weby",
        description:
          "Moderní responzivní weby s rychlým načítáním, přehlednou strukturou a snadnou správou obsahu.",
      },
      {
        icon: "layout",
        title: "Webové aplikace",
        description:
          "Aplikace na míru, interní systémy, dashboardy a klientské portály pro každodenní práci.",
      },
      {
        icon: "store",
        title: "E-shopy na Shoptetu",
        description:
          "Návrh a realizace Shoptet e-shopů včetně úprav vzhledu, nastavení katalogu a napojení na další služby.",
      },
      {
        icon: "blocks",
        title: "CMS a správa obsahu",
        description:
          "Weby s intuitivní administrací pro úpravu stránek, služeb, produktů a dalšího obsahu.",
      },
      {
        icon: "plug",
        title: "API a integrace",
        description:
          "Propojení webu s externími systémy, databázemi, platebními službami a firemními nástroji.",
      },
    ],
  },
  projects: {
    eyebrow: "VYBRANÉ REALIZACE",
    title: "Vybrané projekty",
    description:
      "Ukázky webů, aplikací a portálů, na jejichž vývoji jsem se podílel.",
  },
  process: {
    eyebrow: "JAK PROBÍHÁ SPOLUPRÁCE",
    title: "Jak probíhá spolupráce",
    description:
      "Od prvního rozhovoru po spuštění máte přehled o postupu i dalších krocích.",
    steps: [
      {
        number: "01",
        title: "Konzultace a pochopení potřeb",
        description:
          "Ujasníme si cíle, uživatele, obsah a návaznosti projektu.",
      },
      {
        number: "02",
        title: "Návrh řešení",
        description:
          "Navrhnu strukturu, rozsah, technologie a postup realizace.",
      },
      {
        number: "03",
        title: "Vývoj a průběžná zpětná vazba",
        description:
          "Projekt vzniká po částech a průběžně společně ladíme výsledek.",
      },
      {
        number: "04",
        title: "Testování a nasazení",
        description:
          "Ověřím funkčnost, responzivitu a připravím bezpečné spuštění.",
      },
      {
        number: "05",
        title: "Další rozvoj a podpora",
        description:
          "Po spuštění mohu řešení spravovat a rozvíjet podle nových potřeb.",
      },
    ],
  },
  related: {
    eyebrow: "SOUVISEJÍCÍ SLUŽBY",
    title: "Řešení lze propojit i s dalšími oblastmi.",
    items: [
      {
        title: "Automatizace procesů",
        description: "Propojení webu s komunikací a firemními workflow.",
        href: "/automatizace",
      },
      {
        title: "AI řešení",
        description: "Praktická práce s dokumenty, daty a interními znalostmi.",
        href: "/sluzby/ai-reseni",
      },
    ],
  },
  contactTitle: "Pojďme probrat váš web nebo aplikaci.",
};

const csAi: ServicePageCopy = {
  meta: {
    title: "Praktická AI řešení pro firmy | Jakub Vantuch",
    description:
      "AI integrace pro práci s dokumenty, analýzu dat a automatizaci firemních činností s důrazem na spolehlivost a ochranu dat.",
  },
  hero: {
    eyebrow: "AI ŘEŠENÍ",
    title: "Umělá inteligence, která má praktické využití.",
    description:
      "Pomáhám firmám využívat AI při práci s dokumenty, daty a každodenními procesy.",
    primary: "Probrat AI řešení",
  },
  offering: {
    eyebrow: "PRAKTICKÉ VYUŽITÍ",
    title: "Kde může AI pomoci",
    items: [
      {
        icon: "bot",
        title: "AI asistenti",
        description:
          "Vyhledávání informací ve firemních dokumentech a znalostních bázích.",
      },
      {
        icon: "message",
        title: "Chatboti pro web",
        description:
          "Chatboti napojení na obsah webu, produkty nebo firemní znalosti, kteří odpovídají návštěvníkům a předávají poptávky.",
      },
      {
        icon: "mail",
        title: "Personalizované e-maily",
        description:
          "Tvorba relevantních e-mailů podle chování zákazníka, historie komunikace a dostupných dat.",
      },
      {
        icon: "file-scan",
        title: "Zpracování dokumentů",
        description: "Automatické získávání údajů z faktur, formulářů a PDF.",
      },
      {
        icon: "chart",
        title: "Analýza dat",
        description: "Třídění, shrnování a vyhodnocování firemních informací.",
      },
      {
        icon: "network",
        title: "Integrace AI",
        description: "Propojení AI s interními systémy a pracovními postupy.",
      },
    ],
  },
  flow: {
    eyebrow: "JAK TO FUNGUJE",
    title: "Od dat k užitečnému výsledku",
    description:
      "AI propojuji s vašimi daty a systémy tak, aby přinášela konkrétní výsledky.",
    steps: [
      "Firemní data",
      "Zpracování AI",
      "Kontrola výsledku",
      "Výstup do systému",
    ],
  },
  process: {
    eyebrow: "JAK PROBÍHÁ SPOLUPRÁCE",
    title: "Od problému k ověřenému řešení",
    description:
      "Nejdřív ověřím přínos, kvalitu dat a místa, kde musí zůstat lidská kontrola.",
    steps: [
      {
        number: "01",
        title: "Identifikace problému",
        description: "Určíme problém a očekávaný výsledek.",
      },
      {
        number: "02",
        title: "Analýza možností",
        description: "Prověříme data, rizika a vhodný postup.",
      },
      {
        number: "03",
        title: "Prototyp a ověření",
        description: "Na vzorku ověříme kvalitu a použitelnost.",
      },
      {
        number: "04",
        title: "Integrace",
        description: "Řešení bezpečně propojím s vašimi systémy.",
      },
      {
        number: "05",
        title: "Monitoring a zlepšování",
        description: "Sledujeme kvalitu a průběžně řešení ladíme.",
      },
    ],
  },
  contactTitle: "Proberme, zda AI dává smysl právě u vás.",
};

const enWeb: ServicePageCopy = {
  ...csWeb,
  meta: {
    title: "Custom websites and web applications | Jakub Vantuch",
    description:
      "Design and development of modern company websites, client portals and custom web applications, including integrations and long-term support.",
  },
  hero: {
    eyebrow: "WEBSITES AND APPLICATIONS",
    title: "Digital solutions that grow with your business.",
    description:
      "I design and build modern websites, client portals and custom applications, from the first concept through launch and long-term development.",
    primary: "Discuss your project",
    secondary: "View projects",
  },
  offering: {
    eyebrow: "WHAT I CAN BUILD",
    title: "What I can create for you",
    description:
      "I choose the scope and technology around the project goal, content workflow and systems you already use.",
    items: [
      {
        icon: "browser",
        title: "Company websites",
        description:
          "Modern responsive websites with fast loading, clear structure and straightforward content management.",
      },
      {
        icon: "layout",
        title: "Web applications",
        description:
          "Custom applications, internal systems, dashboards and client portals for everyday work.",
      },
      {
        icon: "store",
        title: "Shoptet e-commerce stores",
        description:
          "Shoptet store design and implementation, including visual customisation, catalogue setup and connections to other services.",
      },
      {
        icon: "blocks",
        title: "CMS and content management",
        description:
          "Websites with intuitive administration for pages, services, products and other content.",
      },
      {
        icon: "plug",
        title: "APIs and integrations",
        description:
          "Connections to external systems, databases, payment providers and business tools.",
      },
    ],
  },
  projects: {
    eyebrow: "SELECTED WORK",
    title: "Selected projects",
    description:
      "A selection of websites, applications and portals I have helped develop.",
  },
  process: {
    eyebrow: "HOW WE WORK TOGETHER",
    title: "How the collaboration works",
    description:
      "From the first conversation to launch, you have a clear view of progress and next steps.",
    steps: [
      {
        number: "01",
        title: "Consultation and discovery",
        description:
          "We clarify the goals, users, content and project dependencies.",
      },
      {
        number: "02",
        title: "Solution design",
        description:
          "I propose the structure, scope, technology and delivery plan.",
      },
      {
        number: "03",
        title: "Development and feedback",
        description:
          "The project takes shape in stages, with regular feedback along the way.",
      },
      {
        number: "04",
        title: "Testing and launch",
        description:
          "I verify functionality and responsiveness and prepare a safe launch.",
      },
      {
        number: "05",
        title: "Ongoing development and support",
        description:
          "After launch, I can maintain and extend the solution as needs change.",
      },
    ],
  },
  related: {
    eyebrow: "RELATED SERVICES",
    title: "The solution can connect with other areas too.",
    items: [
      {
        title: "Process automation",
        description:
          "Connect your website to communication and business workflows.",
        href: "/automatizace",
      },
      {
        title: "AI solutions",
        description:
          "Practical work with documents, data and internal knowledge.",
        href: "/sluzby/ai-reseni",
      },
    ],
  },
  contactTitle: "Let's discuss your website or application.",
};

const enAi: ServicePageCopy = {
  ...csAi,
  meta: {
    title: "Practical AI solutions for businesses | Jakub Vantuch",
    description:
      "AI integrations for document processing, data analysis and business automation, designed around reliability and responsible data handling.",
  },
  hero: {
    eyebrow: "AI SOLUTIONS",
    title: "Artificial intelligence with a practical purpose.",
    description:
      "I help businesses use AI for documents, data and everyday processes.",
    primary: "Discuss an AI solution",
  },
  offering: {
    eyebrow: "PRACTICAL USES",
    title: "Where AI can help",
    items: [
      {
        icon: "bot",
        title: "AI assistants",
        description:
          "Search information across company documents and knowledge bases.",
      },
      {
        icon: "message",
        title: "Website chatbots",
        description:
          "Chatbots connected to website content, products or company knowledge that answer visitors and hand over enquiries.",
      },
      {
        icon: "mail",
        title: "Personalised emails",
        description:
          "Relevant emails created from customer behaviour, communication history and available data.",
      },
      {
        icon: "file-scan",
        title: "Document processing",
        description:
          "Automatically extract data from invoices, forms and PDFs.",
      },
      {
        icon: "chart",
        title: "Data analysis",
        description: "Classify, summarise and evaluate business information.",
      },
      {
        icon: "network",
        title: "AI integrations",
        description: "Connect AI with internal systems and business workflows.",
      },
    ],
  },
  flow: {
    eyebrow: "HOW IT WORKS",
    title: "From data to a useful result",
    description:
      "I connect AI with your data and systems to produce concrete results.",
    steps: [
      "Business data",
      "AI processing",
      "Result review",
      "Output to a system",
    ],
  },
  process: {
    eyebrow: "HOW WE WORK TOGETHER",
    title: "From a problem to a verified solution",
    description:
      "First, I verify the potential benefit, data quality and where human oversight must remain.",
    steps: [
      {
        number: "01",
        title: "Problem identification",
        description: "We define the problem and intended result.",
      },
      {
        number: "02",
        title: "Feasibility analysis",
        description: "We review the data, risks and suitable approach.",
      },
      {
        number: "03",
        title: "Prototype and validation",
        description: "We verify quality and usefulness on a sample.",
      },
      {
        number: "04",
        title: "Integration",
        description: "I safely connect the solution to your systems.",
      },
      {
        number: "05",
        title: "Monitoring and improvement",
        description: "We monitor quality and refine the solution.",
      },
    ],
  },
  contactTitle: "Let's discuss whether AI makes sense for your business.",
};

export const servicePageCopy: Record<
  ServicePageKind,
  Record<Locale, ServicePageCopy>
> = {
  web: { cs: csWeb, en: enWeb },
  ai: { cs: csAi, en: enAi },
};
