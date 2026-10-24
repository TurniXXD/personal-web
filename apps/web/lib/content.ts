import { projectImages } from "@vantuch/ui/project-images";

export type Locale = "cs" | "en";
export const caseStudySlugs = [
  "robe",
  "kinedok",
  "revizio",
  "my213",
  "ondrasek",
] as const;
export type CaseStudySlug = (typeof caseStudySlugs)[number];

export const caseStudyProjects = {
  robe: {
    name: "Robe",
    image: projectImages.robe,
    website: "https://www.robe.cz/",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    partner: { name: "Appio", url: "https://appio.dev/" },
  },
  kinedok: {
    name: "Kinedok",
    image: projectImages.kinedok,
    website: "https://kinedok.net/",
    stack: ["Next.js", "TypeScript", "CMS"],
    partner: { name: "Appio", url: "https://appio.dev/" },
  },
  revizio: {
    name: "Revizio",
    image: projectImages.revizio,
    website: "https://www.revizio.app/",
    stack: ["React", "TypeScript", "UX"],
    partner: null,
  },
  my213: {
    name: "My213",
    image: projectImages.my213,
    website: "https://www.my213.cz/",
    stack: ["React", "TypeScript", "APIs"],
    partner: { name: "Pro Rocketeers", url: "https://www.prorocketeers.com/" },
  },
  ondrasek: {
    name: "Ondrášek",
    image: projectImages.ondrasek,
    website: "https://www.ondrasek.cz/",
    stack: ["Next.js", "TypeScript", "CMS"],
    partner: { name: "Pro Rocketeers", url: "https://www.prorocketeers.com/" },
  },
} as const;

export const caseStudyTimeline: Record<
  CaseStudySlug,
  { startYear: number; endYear: number | null }
> = {
  robe: { startYear: 2024, endYear: null },
  kinedok: { startYear: 2025, endYear: null },
  revizio: { startYear: 2023, endYear: 2025 },
  my213: { startYear: 2022, endYear: 2023 },
  ondrasek: { startYear: 2021, endYear: 2022 },
};

export const caseStudyTimelineSlugs = [...caseStudySlugs].sort(
  (a, b) => caseStudyTimeline[b].startYear - caseStudyTimeline[a].startYear,
);

type Service = { title: string; description: string; tags: string[] };
type ProcessStep = { number: string; title: string; description: string };
export type CommunityCopy = {
  eyebrow: string;
  title: string;
  description: string;
  newsletterTitle: string;
  newsletterText: string;
  emailLabel: string;
  emailPlaceholder: string;
  consent: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
  unavailable: string;
  socialTitle: string;
  socialText: string;
  linkedinText: string;
  instagramText: string;
  githubText: string;
};
type CaseCopy = {
  category: string;
  summary: string;
  challenge: string;
  role: string[];
  result: string;
};
type SiteCopy = {
  meta: { title: string; description: string };
  nav: {
    services: string;
    automation: string;
    work: string;
    process: string;
    about: string;
    contact: string;
    consultation: string;
    language: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primary: string;
    secondary: string;
    experience: string;
    availability: string;
    casesProof: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    more: string;
    items: Service[];
  };
  automation: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    items: Array<{ title: string; description: string }>;
  };
  work: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    viewCase: string;
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: ProcessStep[];
  };
  about: {
    eyebrow: string;
    title: string;
    intro?: string;
    text: string;
    detail: string;
  };
  community: CommunityCopy;
  audit: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    email: string;
    phone: string;
  };
  casePage: {
    back: string;
    challenge: string;
    role: string;
    result: string;
    stack: string;
    visit: string;
    partner: string;
    next: string;
    all: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaText: string;
  };
  footer: {
    line: string;
    community: string;
    referral: string;
    privacy: string;
    copyright: string;
  };
  cases: Record<CaseStudySlug, CaseCopy>;
};

export const copy: Record<Locale, SiteCopy> = {
  cs: {
    meta: {
      title: "Jakub Vantuch | Digital Solutions Consultant",
      description:
        "Navrhuji webové aplikace, automatizace a AI řešení, která firmám šetří čas a zjednodušují každodenní práci.",
    },
    nav: {
      services: "Služby",
      automation: "Automatizace",
      work: "Projekty",
      process: "Spolupráce",
      about: "O mně",
      contact: "Kontakt",
      consultation: "Probrat projekt",
      language: "English",
    },
    hero: {
      eyebrow: "WEBY · AUTOMATIZACE · SYSTÉMY · AI",
      title: "Technologie, které firmám",
      highlight: "šetří čas a pomáhají růst.",
      description:
        "Pomáhám firmám zefektivnit každodenní práci pomocí moderních webových řešení, automatizace a AI. Od analýzy problému přes vývoj až po dlouhodobou správu.",
      primary: "Probrat projekt",
      secondary: "Prohlédnout realizace",
      experience: "Osobní přístup",
      availability: "Kompletní realizace",
      casesProof: "Dlouhodobá podpora",
    },
    services: {
      eyebrow: "CO MŮŽEME ZLEPŠIT",
      title: "Co pro vás můžu vytvořit.",
      intro: "Řešení vybírám podle toho, co firmě opravdu pomůže.",
      more: "Zjistit více",
      items: [
        {
          title: "Weby a aplikace",
          description:
            "Moderní weby, klientské portály a firemní aplikace na míru.",
          tags: ["Firemní weby", "Portály", "Interní aplikace"],
        },
        {
          title: "Automatizace procesů",
          description:
            "Propojení systémů, automatická komunikace a méně opakující se práce.",
          tags: ["CRM integrace", "API", "Zpracování poptávek"],
        },
        {
          title: "AI řešení",
          description:
            "Práce s dokumenty, analýza dat a asistenti propojení s firemními systémy.",
          tags: ["Dokumenty", "AI asistenti", "Analýza dat"],
        },
      ],
    },
    automation: {
      eyebrow: "AUTOMATIZACE V PRAXI",
      title: "Co můžete automatizovat?",
      description:
        "Od komunikace se zákazníky přes marketing až po interní firemní procesy. Podívejte se, kde vám automatizace mohou ušetřit práci.",
      cta: "Prohlédnout příklady automatizací",
      items: [
        {
          title: "E-mailové automatizace",
          description:
            "Opuštěné košíky, připomínky, následné e-maily a komunikace po nákupu.",
        },
        {
          title: "E-shop a zákazníci",
          description:
            "Doporučování produktů, získávání recenzí a automatizace zákaznické péče.",
        },
        {
          title: "Sociální sítě",
          description:
            "Monitoring trendů, příprava příspěvků a plánování publikování obsahu.",
        },
        {
          title: "AI a dokumenty",
          description:
            "Zpracování faktur, objednávek a dalších dokumentů bez ručního přepisování.",
        },
        {
          title: "Propojení systémů",
          description:
            "Automatická synchronizace CRM, e-shopu, účetnictví a interních aplikací.",
        },
        {
          title: "Data a reporting",
          description:
            "Pravidelné reporty, upozornění na změny a přehledy důležitých výsledků.",
        },
      ],
    },
    work: {
      eyebrow: "VYBRANÉ PROJEKTY",
      title: "Projekty, na kterých",
      titleHighlight: "jsem pracoval.",
      viewCase: "Detail projektu",
    },
    process: {
      eyebrow: "04 / SPOLUPRÁCE",
      title: "Od prvního rozhovoru po spuštění.",
      intro: "Jasný postup, průběžná komunikace a žádné zbytečné komplikace.",
      steps: [
        {
          number: "01",
          title: "Poznáme vaše potřeby",
          description:
            "Probereme, jak fungujete, co vás trápí a čeho chcete dosáhnout.",
        },
        {
          number: "02",
          title: "Navrhnu postup",
          description:
            "Připravím návrh řešení, odhad ceny a harmonogram realizace.",
        },
        {
          number: "03",
          title: "Vývoj a zpětná vazba",
          description:
            "Průběžně vám ukazuji výsledky a společně ladíme detaily.",
        },
        {
          number: "04",
          title: "Spuštění a další rozvoj",
          description:
            "Hotové řešení nasadím a podle potřeby zajistím podporu i další úpravy.",
        },
      ],
    },
    about: {
      eyebrow: "KDO ZA TÍM STOJÍ",
      title: "Za každým projektem stojím osobně.",
      intro: "Ahoj,\njsem Jakub Vantuch.",
      text: "Už více než 5 let se věnuji vývoji webů, aplikací a automatizací. Pomáhám firmám vytvářet digitální řešení, která jim usnadňují práci a dávají smysl i z dlouhodobého hlediska.",
      detail:
        "Na projektu spolupracujete přímo se mnou – od prvního rozhovoru až po spuštění. Zakládám si na otevřené komunikaci, kvalitním provedení a řešeních, která lze dál rozvíjet.",
    },
    community: {
      eyebrow: "ZŮSTAŇME V KONTAKTU",
      title: "Sledujte, na čem pracuji.",
      description:
        "Sdílím své projekty, zkušenosti z vývoje a praktické tipy k webům, automatizacím a AI.",
      newsletterTitle: "Jednou měsíčně do e-mailu.",
      newsletterText:
        "Výběr zajímavých projektů, praktických poznatků a technologií, které stojí za pozornost.",
      emailLabel: "Váš e-mail",
      emailPlaceholder: "vy@firma.cz",
      consent:
        "Souhlasím se zasíláním newsletteru a se zpracováním e-mailu pro tento účel.",
      submit: "Přihlásit k odběru",
      submitting: "Přihlašuji…",
      success: "Hotovo. Potvrzení najdete v e-mailu.",
      error: "Odběr se nepodařilo uložit. Zkuste to prosím znovu.",
      unavailable:
        "Odběr právě připravuji. Do té doby mě můžete sledovat na LinkedInu.",
      socialTitle: "Sledujte, na čem pracuji.",
      socialText:
        "Sdílím své projekty, zkušenosti z vývoje a praktické tipy k webům, automatizacím a AI.",
      linkedinText: "Projekty a zkušenosti",
      instagramText: "Ze zákulisí vývoje",
      githubText: "Kód a open source",
    },
    audit: {
      eyebrow: "ÚVODNÍ ANALÝZA",
      title: "Nevíte, co automatizovat jako první?",
      text: "Společně projdeme váš současný proces, najdeme místa, kde firma ztrácí čas, a navrhneme nejjednodušší technické řešení.",
      cta: "Probrat možnosti",
    },
    contact: {
      eyebrow: "POJĎME TO PROBRAT",
      title: "Co můžeme společně zlepšit?",
      text: "Popište mi, co vás ve firmě brzdí nebo co byste chtěli posunout dál. Probereme vaše cíle, možnosti řešení a další postup.",
      email: "Napsat e-mail",
      phone: "Zavolat",
    },
    casePage: {
      back: "Zpět na reference",
      challenge: "Výzva",
      role: "Moje role",
      result: "Výsledek",
      stack: "Technologie",
      visit: "Navštívit web",
      partner: "Ve spolupráci s",
      next: "Další projekt",
      all: "Všechny reference",
      ctaEyebrow: "MÁTE PODOBNÝ PROJEKT?",
      ctaTitle: "Pojďme vytvořit něco, co bude fungovat i pro vás.",
      ctaText:
        "Napište mi, co potřebujete vyřešit. Společně probereme možnosti.",
    },
    footer: {
      line: "Digital Solutions Consultant",
      community: "Komunita a sociální sítě",
      referral: "Doporučit klienta",
      privacy: "Zpracování osobních údajů",
      copyright: "Všechna práva vyhrazena.",
    },
    cases: {
      robe: {
        category: "Produktový web",
        summary:
          "Vývoj a modernizace produktového webu pro výrobce profesionální světelné techniky.",
        challenge:
          "Široká nabídka profesionální světelné techniky potřebuje přehlednou prezentaci a průběžně aktualizovaný produktový i redakční obsah.",
        role: [
          "Vývoj produktových a obsahových stránek",
          "Modernizace frontendové architektury",
          "Integrace CMS a dynamického obsahu",
        ],
        result:
          "Návštěvníci mohou procházet produkty a související informace na jednom webu; tým má zázemí pro jejich správu.",
      },
      kinedok: {
        category: "Obsahová platforma",
        summary:
          "Vývoj platformy propojující dokumentární filmy, promítací místa a jejich diváky.",
        challenge:
          "Návštěvníci potřebují snadno najít aktuální program a místo promítání, zatímco tým musí průběžně udržovat rozmanitý obsah.",
        role: [
          "Frontend vývoj stránek a programových přehledů",
          "Propojení dynamického obsahu",
          "Responzivní rozhraní",
          "Údržba a další rozvoj",
        ],
        result:
          "Program a obsah jsou dostupné v jednotné podobě napříč zařízeními a lze je průběžně spravovat.",
      },
      revizio: {
        category: "Webová aplikace",
        summary:
          "Aplikace, pro správu revizní agendy a práci s normami a šablonami revizí.",
        challenge:
          "Revizní agenda zahrnuje mnoho záznamů a kroků, ve kterých musí firmy i technici rychle a spolehlivě orientovat.",
        role: [
          "Vývoj aplikačního frontendu",
          "Návrh a úpravy uživatelského rozhraní",
          "Přehledové a pracovní obrazovky",
          "Průběžný rozvoj produktu",
        ],
        result:
          "Uživatelé mají revizní informace a navazující postupy pohromadě v jedné aplikaci.",
      },
      my213: {
        category: "Klientský portál",
        summary:
          "Vývoj klientského portálu pro přehlednou správu požadavků a práci s daty.",
        challenge:
          "Vícekrokové úkoly a datové vstupy potřebují srozumitelné rozhraní, ve kterém uživatel vždy ví, co má udělat dál.",
        role: [
          "Vývoj frontendových částí portálu",
          "Uživatelské postupy a formuláře",
          "Práce s datovými vstupy",
          "Integrace s navazujícími systémy",
        ],
        result:
          "Uživatelé mohou projít souvisejícími kroky a spravovat potřebné informace na jednom místě.",
      },
      ondrasek: {
        category: "Prezentační web",
        summary:
          "Tvorba firemního webu s přehlednou prezentací produktů, služeb a společnosti.",
        challenge:
          "Rozsáhlý obsah organizace potřeboval srozumitelnou strukturu a responzivní prezentaci, ve které návštěvníci rychle najdou důležité informace.",
        role: [
          "Frontend vývoj",
          "Struktura a prezentace obsahu",
          "Responzivní rozhraní",
          "Technické základy SEO",
        ],
        result:
          "Vznikl přehledný web, který zpřístupňuje důležitý obsah napříč zařízeními a lze jej průběžně spravovat.",
      },
    },
  },
  en: {
    meta: {
      title: "Jakub Vantuch | Digital Solutions Consultant",
      description:
        "I design web applications, automation, and AI solutions that save businesses time and simplify everyday work.",
    },
    nav: {
      services: "Services",
      automation: "Automation",
      work: "Projects",
      process: "Collaboration",
      about: "About",
      contact: "Contact",
      consultation: "Discuss your project",
      language: "Čeština",
    },
    hero: {
      eyebrow: "WEBSITES · AUTOMATION · SYSTEMS · AI",
      title: "Technology that helps businesses",
      highlight: "save time and grow.",
      description:
        "I help businesses streamline their everyday work with modern web solutions, automation, and AI. From analysing the problem through development to long-term support.",
      primary: "Discuss your project",
      secondary: "Explore my work",
      experience: "Personal approach",
      availability: "Complete delivery",
      casesProof: "Long-term support",
    },
    services: {
      eyebrow: "WHAT WE CAN IMPROVE",
      title: "What I can create for you.",
      intro:
        "I choose the solution around what will actually help your business.",
      more: "Learn more",
      items: [
        {
          title: "Websites & applications",
          description:
            "Modern websites, client portals, and custom business applications.",
          tags: ["Company websites", "Portals", "Internal apps"],
        },
        {
          title: "Process automation",
          description:
            "Connected systems, automated communication, and less repetitive work.",
          tags: ["CRM integration", "APIs", "Enquiry processing"],
        },
        {
          title: "AI solutions",
          description:
            "Document workflows, data analysis, and assistants connected to company systems.",
          tags: ["Documents", "AI assistants", "Data analysis"],
        },
      ],
    },
    automation: {
      eyebrow: "AUTOMATION IN PRACTICE",
      title: "What can you automate?",
      description:
        "From customer communication and marketing to internal business processes. Explore where automation can save you work.",
      cta: "Explore automation examples",
      items: [
        {
          title: "Email automation",
          description:
            "Abandoned baskets, reminders, follow-up emails, and post-purchase communication.",
        },
        {
          title: "E-commerce and customers",
          description:
            "Product recommendations, review collection, and automated customer care.",
        },
        {
          title: "Social media",
          description:
            "Trend monitoring, post preparation, and scheduled content publishing.",
        },
        {
          title: "AI and documents",
          description:
            "Processing invoices, orders, and other documents without manual retyping.",
        },
        {
          title: "Connected systems",
          description:
            "Automatic synchronisation of CRM, e-commerce, accounting, and internal applications.",
        },
        {
          title: "Data and reporting",
          description:
            "Scheduled reports, change alerts, and clear views of important results.",
        },
      ],
    },
    work: {
      eyebrow: "SELECTED WORK",
      title: "Projects I have",
      titleHighlight: "worked on.",
      viewCase: "View case study",
    },
    process: {
      eyebrow: "04 / COLLABORATION",
      title: "From the first conversation to launch.",
      intro:
        "A clear process, regular communication, and no needless complexity.",
      steps: [
        {
          number: "01",
          title: "We understand your needs",
          description:
            "We discuss how you work, what is holding you back, and what you want to achieve.",
        },
        {
          number: "02",
          title: "I propose the approach",
          description:
            "I prepare a solution proposal, price estimate, and delivery schedule.",
        },
        {
          number: "03",
          title: "Development and feedback",
          description:
            "I show you the results as we go, and together we refine the details.",
        },
        {
          number: "04",
          title: "Launch and further development",
          description:
            "I launch the completed solution and provide support and further updates as needed.",
        },
      ],
    },
    about: {
      eyebrow: "WHO YOU WILL WORK WITH",
      title: "I stand behind every project personally.",
      intro: "Hello, I am Jakub Vantuch.",
      text: "For more than five years, I have been developing websites, applications, and automation. I help businesses create digital solutions that make their work easier and continue to make sense in the long term.",
      detail:
        "You work directly with me throughout the project — from our first conversation to launch. I believe in open communication, quality work, and solutions that can continue to evolve.",
    },
    community: {
      eyebrow: "LET'S STAY IN TOUCH",
      title: "Follow what I'm working on.",
      description:
        "I share my projects, development experience, and practical tips about websites, automation, and AI.",
      newsletterTitle: "Once a month, by email.",
      newsletterText:
        "A selection of interesting projects, practical insights, and technologies worth your attention.",
      emailLabel: "Your email",
      emailPlaceholder: "you@company.com",
      consent:
        "I agree to receive the newsletter and to the processing of my email for this purpose.",
      submit: "Subscribe",
      submitting: "Subscribing…",
      success: "Done. Check your email for confirmation.",
      error: "I could not save your subscription. Please try again.",
      unavailable:
        "The newsletter is being prepared. In the meantime, follow me on LinkedIn.",
      socialTitle: "Follow what I'm working on.",
      socialText:
        "I share my projects, development experience, and practical tips about websites, automation, and AI.",
      linkedinText: "Projects and experience",
      instagramText: "Behind the scenes of development",
      githubText: "Code and open source",
    },
    audit: {
      eyebrow: "INITIAL REVIEW",
      title: "Not sure what to automate first?",
      text: "Together, we review your current process, find where the business is losing time, and outline the simplest technical solution.",
      cta: "Discuss the options",
    },
    contact: {
      eyebrow: "LET’S TALK",
      title: "What can we improve together?",
      text: "Tell me what is holding your business back or what you would like to take further. We will discuss your goals, possible solutions, and the next steps.",
      email: "Send an email",
      phone: "Call me",
    },
    casePage: {
      back: "Back to case studies",
      challenge: "Challenge",
      role: "My role",
      result: "Result",
      stack: "Technology",
      visit: "Visit website",
      partner: "In collaboration with",
      next: "Next project",
      all: "All case studies",
      ctaEyebrow: "HAVE A SIMILAR PROJECT?",
      ctaTitle: "Let’s create something that works for you too.",
      ctaText:
        "Tell me what you need to solve. Together, we will discuss the options.",
    },
    footer: {
      line: "Digital Solutions Consultant",
      community: "Community and social media",
      referral: "Refer a client",
      privacy: "Privacy notice",
      copyright: "All rights reserved.",
    },
    cases: {
      robe: {
        category: "Product website",
        summary:
          "Development and modernisation of a product website for a professional lighting manufacturer.",
        challenge:
          "A broad catalogue of professional lighting equipment needs a clear presentation and regularly updated product and editorial content.",
        role: [
          "Product and editorial page development",
          "Modernisation of the frontend architecture",
          "CMS and dynamic content integration",
        ],
        result:
          "Visitors can explore products and related information in one place, while the team has a way to manage that content.",
      },
      kinedok: {
        category: "Content platform",
        summary:
          "A content platform bringing documentary films, programmes, and screening venues together.",
        challenge:
          "Visitors need to find the current programme and screening venues easily, while the team must continuously maintain a wide range of content.",
        role: [
          "Frontend development for pages and programme views",
          "Dynamic content integration",
          "Responsive interface",
          "Maintenance and continued development",
        ],
        result:
          "Programmes and content are available in a consistent format across devices and can be kept up to date.",
      },
      revizio: {
        category: "Web application",
        summary:
          "An application that brings inspection work and records into a single interface.",
        challenge:
          "Inspection work involves many records and steps that businesses and technicians need to navigate with confidence.",
        role: [
          "Application frontend development",
          "User interface design and refinement",
          "Overview and workflow screens",
          "Continued product development",
        ],
        result:
          "Users have inspection information and related workflows together in one application.",
      },
      my213: {
        category: "Client portal",
        summary:
          "A client portal that guides users through tasks and brings related data together.",
        challenge:
          "Multi-step tasks and data entry need an interface that makes the next action clear.",
        role: [
          "Frontend development for the portal",
          "User flows and forms",
          "Work with data inputs",
          "Integrations with connected systems",
        ],
        result:
          "Users can complete related steps and manage the information they need in one place.",
      },
      ondrasek: {
        category: "Presentation website",
        summary:
          "A clear company website showcasing Ondrášek’s products and services.",
        challenge:
          "The organisation's broad content needed a clear structure and a responsive presentation that helps visitors find essential information quickly.",
        role: [
          "Frontend development",
          "Content structure and presentation",
          "Responsive interface",
          "Technical SEO foundations",
        ],
        result:
          "The result is a clear, maintainable website that makes important content accessible across devices.",
      },
    },
  },
};

export function localizedPath(locale: Locale, path = "") {
  const home = locale === "en" ? "/en" : "/";
  if (!path) return home;
  if (path.startsWith("#")) return home + path;
  return (locale === "en" ? "/en" : "") + path;
}
