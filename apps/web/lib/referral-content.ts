import type { Locale } from "@/lib/content";

type Step = { number: string; title: string; description: string };
type Question = { question: string; answer: string };

type ReferralCopy = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    secondary: string;
    rewardTitle: string;
    rewardDetail: string;
    visualLabel: string;
    referrer: string;
    project: string;
    commission: string;
  };
  how: { eyebrow: string; title: string; steps: Step[] };
  reward: {
    eyebrow: string;
    title: string;
    description: string;
    example: string;
    project: string;
    reward: string;
    note: string;
    conditions: string;
  };
  who: { title: string; text: string };
  fit: { eyebrow: string; title: string; intro: string; examples: string[] };
  link: {
    eyebrow: string;
    title: string;
    intro: string;
    cardEyebrow: string;
    cardTitle: string;
    cardText: string;
    clientTitle: string;
    clientText: string;
    clientCta: string;
    note: string;
  };
  faq: { eyebrow: string; title: string; items: Question[]; note: string };
  partner: {
    eyebrow: string;
    title: string;
    text: string;
  };
};

export const referralCopy: Record<Locale, ReferralCopy> = {
  cs: {
    meta: {
      title: "Doporučte klienta | Jakub Vantuch",
      description:
        "Doporučte mě firmě, která řeší web, automatizaci nebo systém na míru. Odměna platí, pokud klient přijde přes váš osobní odkaz nebo vás zmíní na úvodním callu a vznikne zaplacený projekt.",
    },
    hero: {
      eyebrow: "PROGRAM DOPORUČENÍ",
      title: "Znáte firmu, které bych mohl pomoct?",
      description:
        "Doporučte mě firmě, která potřebuje web, aplikaci nebo automatizaci. Pokud z doporučení vznikne placený projekt, získáte 10 % z přijatých plateb za první projekt.",
      primary: "Doporučit klienta",
      secondary: "Jak to funguje",
      rewardTitle: "Provize za doporučení",
      rewardDetail: "z přijatých plateb za první projekt",
      visualLabel:
        "Úspěšné doporučení přináší provizi 10 % z přijatých plateb za první projekt.",
      referrer: "Doporučení",
      project: "Placený projekt",
      commission: "Vaše provize",
    },
    how: {
      eyebrow: "JEDNODUŠE A NAPŘÍMO",
      title: "Jak doporučení funguje",
      steps: [
        {
          number: "01",
          title: "Získáte svůj odkaz",
          description: "Požádáte mě o osobní doporučovací odkaz.",
        },
        {
          number: "02",
          title: "Předáte ho zájemci",
          description:
            "Odkaz pošlete firmě, která má o spolupráci zájem. Její kontakty mi neposíláte.",
        },
        {
          number: "03",
          title: "Klient se ozve sám",
          description:
            "Sám odešle poptávku. Doporučení přiřadí osobní odkaz, nebo vás klient uvede jako doporučitele na úvodním callu.",
        },
        {
          number: "04",
          title: "Vznikne placený projekt",
          description:
            "Po přijetí platby za první projekt vám náleží 10 % z přijaté částky.",
        },
      ],
    },
    reward: {
      eyebrow: "ODMĚNA ZA DOPORUČENÍ",
      title: "10 % z prvního projektu",
      description:
        "Odměna platí pouze tehdy, když klient přijde přes váš osobní odkaz, nebo vás výslovně zmíní jako doporučitele na úvodním callu. Pokud z toho vznikne projekt, získáte 10 % z plateb, které za první projekt skutečně obdržím. Samotné zaslání cizího kontaktu, nabídka ani podepsaná smlouva nárok nezakládají.",
      example: "Příklad při plném uhrazení projektu",
      project: "Hodnota prvního projektu",
      reward: "Odměna za doporučení",
      note: "Jde o příklad, nikoli o příslib konkrétní zakázky nebo výše platby.",
      conditions: "Podmínky doporučení",
    },
    who: {
      title: "Nemusíte nic prodávat.",
      text: "Stačí poslat odkaz člověku, který má o spolupráci zájem, nebo ho požádat, aby vás zmínil na úvodním callu. Jeho kontaktní údaje nikam nezadáváte; rozhodnutí ozvat se je na něm. Projekt, nabídku i cenu pak řeším přímo s ním.",
    },
    fit: {
      eyebrow: "VHODNÉ PŘÍLEŽITOSTI",
      title: "Koho má smysl doporučit?",
      intro: "Stačí, když v rozhovoru poznáte některou z těchto situací:",
      examples: [
        "Web je zastaralý nebo nepřináší dost poptávek.",
        "Lidé ručně přepisují data mezi několika nástroji.",
        "Opakující se administrativa zabírá zbytečně čas.",
        "Proces stojí na tabulkách, e-mailech a kopírování.",
        "Firma potřebuje interní aplikaci nebo portál.",
        "Současné nástroje spolu nekomunikují nebo přestávají stačit.",
      ],
    },
    link: {
      eyebrow: "PŘEDAT DOPORUČENÍ",
      title: "Odkaz předáte vy. Poptávku pošle klient.",
      intro:
        "Kontaktní údaje firem na této stránce nesbírám. Doporučení se počítá, když klient přijde přes váš osobní odkaz, nebo vás uvede jako doporučitele na úvodním callu.",
      cardEyebrow: "VÁŠ OSOBNÍ ODKAZ",
      cardTitle: "Požádejte o doporučovací odkaz",
      cardText:
        "Vyplňte své údaje a osobní odkaz vám automaticky přijde e-mailem. Pak ho můžete poslat zájemci; pokud přes něj otevře web a odešle vlastní poptávku, doporučení se k ní přiřadí. Neposílejte mi kontakty na jiné firmy.",
      clientTitle: "Jste doporučený klient?",
      clientText:
        "Popište svůj projekt v kontaktním formuláři sami. Pokud nemáte doporučovací odkaz, na úvodním callu řekněte, kdo mě doporučil.",
      clientCta: "Odeslat vlastní poptávku",
      note: "Samotné předání odkazu nebo uvedení firmy bez její vlastní poptávky na odměnu nestačí.",
    },
    faq: {
      eyebrow: "PODMÍNKY BEZ DROBNÉHO PÍSMA",
      title: "Na co se často ptáte",
      items: [
        {
          question: "Kdy vzniká nárok na odměnu?",
          answer:
            "Pokud klient přijde přes váš osobní odkaz nebo vás výslovně uvede jako doporučitele na úvodním callu a následně zaplatí za první projekt, který z kontaktu vznikl.",
        },
        {
          question: "Z čeho se počítá 10 %?",
          answer:
            "Z plateb, které za první projekt od klienta skutečně obdržím — ne ze samotné nabídky nebo smlouvy.",
        },
        {
          question: "Co když klienta už znám?",
          answer:
            "Doporučení musí přinést novou příležitost. Pokud už s firmou jednám o stejném projektu nebo je mým aktivním klientem, odměna se nemusí uplatnit.",
        },
        {
          question: "Mohu poslat kontakt na firmu sám?",
          answer:
            "Ne. Pošlete odkaz přímo zájemci. Ozvat se musí sám; doporučení se přiřadí přes osobní odkaz, nebo když vás zmíní na úvodním callu.",
        },
        {
          question: "Co když klient nepoužije můj odkaz?",
          answer:
            "Nevadí. Stačí, když vás při úvodním callu výslovně uvede jako člověka, který mě doporučil.",
        },
        {
          question: "Kdy dostanu zaplaceno?",
          answer:
            "Po přijetí odpovídající platby od klienta. Konkrétní způsob vyplacení si předem domluvíme.",
        },
        {
          question: "Musím být podnikatel?",
          answer:
            "Způsob vyplacení a potřebné doklady domluvíme podle vaší situace.",
        },
        {
          question: "Co když doporučím více klientů?",
          answer:
            "Každého klienta přiřazeného přes váš odkaz nebo zmínku na úvodním callu posoudím samostatně.",
        },
        {
          question: "Co když firma projekt nerealizuje?",
          answer: "Bez zaplaceného prvního projektu nárok na odměnu nevzniká.",
        },
        {
          question: "Platí odměna i pro další projekty?",
          answer:
            "Tento program se vztahuje na první projekt doporučeného klienta.",
        },
      ],
      note: "Konkrétní způsob vyplacení a případné daňové náležitosti závisí na situaci doporučujícího a domluvíme je individuálně.",
    },
    partner: {
      eyebrow: "PRO PRAVIDELNÁ DOPORUČENÍ",
      title: "Posíláte klienty pravidelně?",
      text: "Pro agentury, designéry a další profesionály, kteří pravidelně potkávají klienty hledající technické řešení, můžeme domluvit dlouhodobější spolupráci.",
    },
  },
  en: {
    meta: {
      title: "Refer a client | Jakub Vantuch",
      description:
        "Refer a business that needs a website, automation, or a custom system. A reward applies if the client uses your personal link or names you on the introductory call and a paid project follows.",
    },
    hero: {
      eyebrow: "REFERRAL PROGRAM",
      title: "Know a business I could help?",
      description:
        "Recommend me to a business that needs a website, application, or automation. If the referral leads to a paid project, you receive 10% of the payments received for that first project.",
      primary: "Refer a client",
      secondary: "How it works",
      rewardTitle: "Referral commission",
      rewardDetail: "of payments received for the first project",
      visualLabel:
        "A successful referral earns a 10% commission on payments received for the first project.",
      referrer: "Referral",
      project: "Paid project",
      commission: "Your commission",
    },
    how: {
      eyebrow: "PERSONAL AND STRAIGHTFORWARD",
      title: "How referrals work",
      steps: [
        {
          number: "01",
          title: "Get your link",
          description: "Ask me for a personal referral link.",
        },
        {
          number: "02",
          title: "Share it with a prospect",
          description:
            "Send it to a business interested in working together. Do not submit its contact details to me.",
        },
        {
          number: "03",
          title: "The client contacts me",
          description:
            "They submit their own inquiry. Your personal link attributes the referral, or the client names you as the referrer on the introductory call.",
        },
        {
          number: "04",
          title: "A paid project follows",
          description:
            "Once I receive payment for the first project, you're entitled to 10% of the amount received.",
        },
      ],
    },
    reward: {
      eyebrow: "REFERRAL REWARD",
      title: "10% of the first project",
      description:
        "The reward applies only when the client arrives through your personal link or explicitly names you as the referrer on the introductory call. If it leads to a project, you receive 10% of payments I actually receive for the first project. Sending someone else's contact details, a proposal, or a signed contract alone does not qualify.",
      example: "Example if the project is paid in full",
      project: "First project value",
      reward: "Referral reward",
      note: "This is an illustration, not a promise of a specific project or payment.",
      conditions: "Referral conditions",
    },
    who: {
      title: "You don't have to sell anything.",
      text: "Just share your link with someone interested or ask them to name you on the introductory call. You don't enter their contact details anywhere; it's their choice to reach out. I'll discuss the project, proposal, and price directly with them.",
    },
    fit: {
      eyebrow: "GOOD OPPORTUNITIES",
      title: "Who should you refer?",
      intro: "Listen for situations like these:",
      examples: [
        "The website is outdated or brings in too few enquiries.",
        "People re-enter data between different tools by hand.",
        "Repeated administration takes too much time.",
        "A process depends on spreadsheets, email, and copy-paste.",
        "The business needs an internal app or portal.",
        "Existing tools do not connect or no longer scale.",
      ],
    },
    link: {
      eyebrow: "PASS ON A REFERRAL",
      title: "You share the link. The client sends the inquiry.",
      intro:
        "This page does not collect other businesses' contact details. A referral counts when the client arrives through your personal link or names you as the referrer on the introductory call.",
      cardEyebrow: "YOUR PERSONAL LINK",
      cardTitle: "Ask for a referral link",
      cardText:
        "Enter your details and your personal link will be sent to you automatically by email. Share it with a prospective client; if they open the site through it and submit their own inquiry, the referral is attributed to you. Do not send me another business's contact details.",
      clientTitle: "Were you referred here?",
      clientText:
        "Send your own project inquiry through the contact form. If you don't have a referral link, name the person who referred you on the introductory call.",
      clientCta: "Send your own inquiry",
      note: "Sharing a link or naming a business without its own inquiry does not qualify for a reward.",
    },
    faq: {
      eyebrow: "CLEAR TERMS",
      title: "Common questions",
      items: [
        {
          question: "When is the reward earned?",
          answer:
            "When the client arrives through your personal link or explicitly names you as the referrer on the introductory call, and then pays for the first project arising from that contact.",
        },
        {
          question: "What is the 10% based on?",
          answer:
            "Payments I actually receive for the first project, not merely a proposal or signed contract.",
        },
        {
          question: "What if I already know the client?",
          answer:
            "The introduction must represent a new opportunity. If I'm already discussing that project with the business or they're an active client, the reward may not apply.",
        },
        {
          question: "Can I send you a business's contact details?",
          answer:
            "No. Share the link with the prospective client instead. They must contact me themselves; the referral is attributed through your link or when they name you on the introductory call.",
        },
        {
          question: "What if the client does not use my link?",
          answer:
            "That is fine. They only need to explicitly name you as the person who referred them during the introductory call.",
        },
        {
          question: "When will I be paid?",
          answer:
            "After the corresponding client payment has arrived. We'll agree on the payout method beforehand.",
        },
        {
          question: "Do I need to run a business?",
          answer:
            "We'll agree on the payout method and any necessary documentation based on your circumstances.",
        },
        {
          question: "What if I refer more than one client?",
          answer:
            "I assess each client attributed through your link or named referral on the introductory call separately.",
        },
        {
          question: "What if the business does not go ahead?",
          answer: "Without a paid first project, no reward becomes due.",
        },
        {
          question: "Does it cover later projects?",
          answer:
            "This program applies to the referred client's first project.",
        },
      ],
      note: "Payout and any tax-related details depend on your circumstances and can be agreed individually.",
    },
    partner: {
      eyebrow: "FOR REGULAR INTRODUCTIONS",
      title: "Refer clients regularly?",
      text: "For agencies, designers, and other professionals who regularly meet clients needing technical delivery, we can discuss a longer-term partnership.",
    },
  },
};
