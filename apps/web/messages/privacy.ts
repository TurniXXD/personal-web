import type { Locale } from "@/lib/site/content";
import { siteConfig } from "@/lib/site/config";

const { email, phoneDisplay } = siteConfig.contact;
const { registrationNumber, address } = siteConfig.business;

type PrivacySection = {
  title: string;
  paragraphs: string[];
  links?: { href: string; label: string }[];
};
type PrivacyCopy = {
  title: string;
  description: string;
  eyebrow: string;
  contactLabel: string;
  updated: string;
  sections: PrivacySection[];
  authority: string;
};

export const privacyCopy: Record<Locale, PrivacyCopy> = {
  cs: {
    title: "Zpracování osobních údajů",
    description:
      "Informace o tom, jak Jakub Vantuch zpracovává údaje z poptávek, partnerských dotazů, newsletteru, doporučovacích odkazů a analytiky na vantuch.dev.",
    eyebrow: "SOUKROMÍ A ÚDAJE",
    contactLabel: "Dotazy k osobním údajům:",
    updated: "Účinné od 10. 11. 2026",
    sections: [
      {
        title: "Kdo údaje zpracovává",
        paragraphs: [
          `Správcem osobních údajů získaných prostřednictvím tohoto webu je Jakub Vantuch, IČO ${registrationNumber}, se sídlem ${address}, fyzická osoba podnikající zapsaná v živnostenském rejstříku. V otázkách zpracování mě můžete kontaktovat na ${email} nebo telefonu ${phoneDisplay}.`,
        ],
      },
      {
        title: "Poptávky a komunikace",
        paragraphs: [
          "Když mi napíšete přes kontaktní formulář, zpracuji vaše jméno, e-mail, případně telefon a text zprávy, abych mohl odpovědět, probrat zadání a připravit případnou nabídku. Spolu s nimi zaznamenám, ze které stránky webu jste psali a o jakou službu nebo typ poptávky jde. Tyto údaje se ukládají do mého CRM Twenty; o nové poptávce mi přijde e-mailové upozornění přes službu Resend a vám přes ni pošlu potvrzení o přijetí s kopií zprávy.",
          "Právním základem je jednání o možné smlouvě na vaši žádost (čl. 6 odst. 1 písm. b GDPR); u firemní komunikace a správy obchodní korespondence také můj oprávněný zájem (čl. 6 odst. 1 písm. f GDPR). Povinné je pouze jméno, e-mail a zpráva. Bez nich nemohu na poptávku odpovědět.",
        ],
      },
      {
        title: "Newsletter",
        paragraphs: [
          `Pokud se přihlásíte k newsletteru, zpracovávám váš e-mail za účelem zasílání vybraných článků, projektů a praktických poznatků. Právním základem je váš souhlas (čl. 6 odst. 1 písm. a GDPR), který můžete kdykoli odvolat pomocí odkazu pro odhlášení v každé zprávě nebo e-mailem na ${email}.`,
          "E-mail je uchováván do odhlášení odběru. Pro správu souhlasu a doručování může být použit externí newsletterový poskytovatel uvedený při aktivaci odběru; formulář na webu zůstává do jeho nakonfigurování neaktivní.",
        ],
      },
      {
        title: "Doporučení klienta",
        paragraphs: [
          "Na stránce Doporučit klienta není formulář pro zadávání kontaktů na jiné firmy nebo osoby.",
          "Pokud si formulářem vyžádáte osobní doporučovací odkaz, zpracuji vaše jméno a e-mail k vytvoření odkazu, jeho automatickému doručení a správě doporučení. Poptávku odesílá sám zájemce a jeho údaje zpracovávám podle oddílu Poptávky a komunikace.",
          "Pokud zájemce použije doporučovací odkaz, mohu k jeho poptávce v CRM přiřadit ověřený identifikátor doporučitele, abych mohl posoudit doporučení a případnou odměnu. Bez odkazu může zájemce doporučitele sám uvést při úvodním hovoru.",
          "Pro evidenci doporučení se opírám o oprávněný zájem (čl. 6 odst. 1 písm. f GDPR).",
          "Pokud mi přes formulář pro partnery na stejné stránce pošlete dotaz na dlouhodobou spolupráci, zpracuji vaše jméno, e-mail, případně název firmy a text zprávy, abych mohl odpovědět a spolupráci domluvit. Údaje se ukládají do CRM Twenty a e-mailové upozornění mi přijde přes Resend. Právním základem je jednání o možné smlouvě na vaši žádost (čl. 6 odst. 1 písm. b GDPR) a můj oprávněný zájem na správě obchodní komunikace (čl. 6 odst. 1 písm. f GDPR). Povinné je jméno, e-mail a zpráva.",
          "Pokud vznikne nárok na odměnu, zpracuji také údaje potřebné k její výplatě, například jméno nebo obchodní firmu, adresu, IČO, číslo bankovního účtu a údaje z vystaveného dokladu. Právním základem je plnění dohody o odměně (čl. 6 odst. 1 písm. b GDPR) a splnění účetních a daňových povinností (čl. 6 odst. 1 písm. c GDPR).",
        ],
      },
      {
        title: "Doporučovací odkazy a technický provoz",
        paragraphs: [
          "Pokud přijdete na web s parametrem ?ref, prohlížeč identifikátor doporučení přečte, odstraní ho z adresy stránky a odešle ho jen spolu s ověřením doporučení a s kontaktním formulářem na této stránce. Do vašeho zařízení se neukládá žádná cookie ani jiný záznam, proto se doporučení přiřadí jen k poptávce odeslané ze stránky, na kterou odkaz vedl.",
          "Identifikátor ověřuji na serveru. Zpracování slouží k evidenci doporučení a opírá se o oprávněný zájem (čl. 6 odst. 1 písm. f GDPR).",
          "Při návštěvě webu může poskytovatel hostingu Vercel zpracovávat technické údaje potřebné pro doručení stránky a zabezpečení provozu, například IP adresu a údaje o požadavku. Cloudflare Turnstile chrání formuláře před zneužitím a při ověření může zpracovat technické údaje o zařízení a požadavku.",
          "Stránku Akce plní bot z veřejných stránek pořadatelů. Hledaný text a filtry se předávají mé vlastní službě s přehledem akcí jen kvůli zobrazení výsledků a s vaší osobou je nespojuji. Odkazy na akce vedou na stránky pořadatelů a tlačítko Přidat do kalendáře otevře Google Kalendář s údaji o akci; na těchto stránkách platí podmínky jejich provozovatelů.",
        ],
        links: [
          {
            href: "https://www.cloudflare.com/en-gb/turnstile-privacy-policy/",
            label: "Cloudflare Turnstile Privacy Addendum",
          },
        ],
      },
      {
        title: "Cookies, analytika a diagnostika",
        paragraphs: [
          "Po vašem souhlasu používám Microsoft Clarity a Cloudflare Web Analytics k pochopení používání webu a jeho zlepšování. Clarity zaznamenává interakce se stránkou (pohyb, kliknutí, posouvání) s maskováním obsahu formulářů. Právním základem je váš souhlas (čl. 6 odst. 1 písm. a GDPR), který můžete kdykoli změnit nebo odvolat přes odkaz Nastavení cookies v patičce.",
          "Nezbytný záznam: vantuch_cookie_consent_v1 v místním úložišti prohlížeče uchovává vaši volbu cookies po dobu 180 dní, poté se vás web zeptá znovu.",
          "Analytické cookies (jen po souhlasu): _clck (Microsoft Clarity, 1 rok) a _clsk (Microsoft Clarity, 1 den) v doméně vantuch.dev a cookies Microsoftu v doméně clarity.ms, například MUID (1 rok). Clarity uchovává záznamy relací 30 dní a souhrnné statistiky nejvýše 13 měsíců. Cloudflare Web Analytics cookies nepoužívá. Při odvolání souhlasu cookies _clck a _clsk smažu a analytika se přestane načítat.",
          "Pro diagnostiku chyb používám Sentry s vypnutým výchozím odesíláním osobních údajů. Služba může zpracovat technické informace o chybě, prohlížeči a požadavku, které jsou nutné pro nalezení a opravu problémů, a nepoužívá cookies. Opírám se o oprávněný zájem na bezpečném a funkčním webu (čl. 6 odst. 1 písm. f GDPR).",
        ],
        links: [
          {
            href: "https://privacy.microsoft.com/cs-cz/privacystatement",
            label: "Prohlášení Microsoftu o zásadách ochrany osobních údajů",
          },
        ],
      },
      {
        title: "Komu mohou být údaje zpřístupněny",
        paragraphs: [
          "Pro provoz webu využívám Vercel, pro ochranu formulářů a analytiku Cloudflare, pro analytiku Microsoft Clarity, pro diagnostiku Sentry a pro doručování zpráv a upozornění Resend. CRM Twenty, ve kterém eviduji poptávky a doporučení, provozuji na vlastním serveru v České republice; přístup k němu chrání Cloudflare. Po aktivaci newsletteru zde doplním také konkrétního poskytovatele jeho rozesílání.",
          "Tito poskytovatelé mohou mít přístup jen k údajům potřebným pro příslušnou službu. Na stránce doporučení nesbírám kontakty na třetí osoby a údaje třetím stranám neprodávám.",
        ],
      },
      {
        title: "Předávání údajů mimo EU",
        paragraphs: [
          "Vercel, Cloudflare, Microsoft, Sentry a Resend jsou společnosti se sídlem v USA a údaje mohou zpracovávat i mimo Evropský hospodářský prostor. Předání se opírá o rozhodnutí Evropské komise o odpovídající ochraně pro rámec EU-US Data Privacy Framework, u kterého jsou tyto společnosti certifikované, případně o standardní smluvní doložky schválené Evropskou komisí.",
        ],
        links: [
          {
            href: "https://www.dataprivacyframework.gov/list",
            label: "Seznam certifikovaných organizací Data Privacy Framework",
          },
        ],
      },
      {
        title: "Jak dlouho údaje uchovávám",
        paragraphs: [
          "Údaje uchovávám po dobu potřebnou k vyřízení poptávky či doporučení a následné komunikaci. Pokud ze spolupráce vznikne smluvní vztah nebo nárok na odměnu, mohou být nezbytné údaje uchovávány déle pro splnění právních povinností a ochranu právních nároků. Účetní a daňové doklady uchovávám po dobu stanovenou účetními a daňovými předpisy, zpravidla 5 až 10 let.",
          "Údaje, které už nejsou pro tyto účely potřebné, odstraním.",
        ],
      },
      {
        title: "Vaše práva",
        paragraphs: [
          "Můžete požádat o přístup k údajům, jejich opravu, výmaz nebo omezení zpracování; v příslušných případech také o přenositelnost. Proti zpracování založenému na oprávněném zájmu můžete vznést námitku. Udělený souhlas můžete kdykoli odvolat; zákonnost zpracování před odvoláním tím není dotčena.",
          "Na tomto webu nepoužívám automatizované rozhodování, které by vůči vám mělo právní nebo obdobně významné účinky.",
          `Se žádostí mi napište na ${email}. Máte také právo podat stížnost u Úřadu pro ochranu osobních údajů.`,
        ],
      },
    ],
    authority: "Úřad pro ochranu osobních údajů",
  },
  en: {
    title: "Privacy notice",
    description:
      "How Jakub Vantuch processes enquiry, partnership, newsletter, referral-link, and analytics data on vantuch.dev.",
    eyebrow: "PRIVACY AND DATA",
    contactLabel: "Questions about your data:",
    updated: "Effective from 10 November 2026",
    sections: [
      {
        title: "Who processes your data",
        paragraphs: [
          `Jakub Vantuch, a sole trader registered in the Czech Trade Register, Company ID ${registrationNumber}, with registered address ${address}, is the controller of personal data collected through this website. You can contact me about data processing at ${email} or ${phoneDisplay}.`,
        ],
      },
      {
        title: "Enquiries and communication",
        paragraphs: [
          "When you use the contact form, I process your name, email, optional phone number, and message to reply, discuss your project, and potentially prepare an offer. I also record which page of the site you wrote from and the service or type of enquiry. These details are stored in my Twenty CRM; I receive an email notification through Resend, and Resend also sends you a confirmation of receipt with a copy of your message.",
          "The legal basis is taking steps towards a possible contract at your request (GDPR Article 6(1)(b)); for business correspondence and its management, I also rely on legitimate interests (Article 6(1)(f)). Only your name, email, and message are required. Without them, I cannot respond.",
        ],
      },
      {
        title: "Newsletter",
        paragraphs: [
          `If you subscribe to the newsletter, I process your email to send selected articles, projects, and practical insights. The legal basis is your consent (GDPR Article 6(1)(a)), which you can withdraw at any time through the unsubscribe link in each message or by emailing ${email}.`,
          "The email is retained until you unsubscribe. An external newsletter provider may be used to manage consent and delivery and will be identified when subscriptions are enabled; the website form remains inactive until that provider is configured.",
        ],
      },
      {
        title: "Client referrals",
        paragraphs: [
          "The Refer a client page has no form for entering another business's or person's contact details.",
          "If you request a personal referral link through the form, I process your name and email to create the link, deliver it automatically, and manage referrals. The prospective client submits their own enquiry; I process their details as described under Enquiries and communication.",
          "If a prospective client uses a referral link, I may attach the verified referrer identifier to their enquiry in the CRM to assess the referral and any reward. Without a link, the client may name the referrer during the introductory call.",
          "I rely on legitimate interests for referral records (GDPR Article 6(1)(f)).",
          "If you send a long-term partnership enquiry through the partner form on the same page, I process your name, email, optional company name, and message to reply and arrange the partnership. The details are stored in Twenty CRM and I receive an email notification through Resend. The legal basis is taking steps towards a possible contract at your request (GDPR Article 6(1)(b)) and my legitimate interest in managing business correspondence (Article 6(1)(f)). Your name, email, and message are required.",
          "If a reward becomes due, I also process the details needed to pay it, such as your name or business name, address, company ID, bank account number, and invoice details. The legal basis is performing the reward arrangement (GDPR Article 6(1)(b)) and meeting accounting and tax obligations (Article 6(1)(c)).",
        ],
      },
      {
        title: "Referral links and technical operation",
        paragraphs: [
          "If you arrive with a ?ref URL parameter, your browser reads the referral identifier, removes it from the page address, and sends it only to verify the referral and with the contact form on that page. No cookie or other record is stored on your device, so the referral applies only to an enquiry sent from the page the link opened.",
          "I verify the identifier on the server. This processing supports referral records and is based on legitimate interests (GDPR Article 6(1)(f)).",
          "The hosting provider Vercel may process technical details needed to deliver and secure the site, such as an IP address and request data. Cloudflare Turnstile protects forms from abuse and may process technical device and request details during verification.",
          "A bot fills the Events page from organisers' public pages. Your search text and filters are passed to my own events service only to show results, and I do not link them to you. Event links lead to the organisers' pages, and the Add to calendar button opens Google Calendar with the event details; the operators' own terms apply on those pages.",
        ],
        links: [
          {
            href: "https://www.cloudflare.com/en-gb/turnstile-privacy-policy/",
            label: "Cloudflare Turnstile Privacy Addendum",
          },
        ],
      },
      {
        title: "Cookies, analytics and diagnostics",
        paragraphs: [
          "With your consent, I use Microsoft Clarity and Cloudflare Web Analytics to understand how the website is used and improve it. Clarity records interactions with the page (movement, clicks, scrolling) with form content masked. The legal basis is your consent (GDPR Article 6(1)(a)), which you can change or withdraw at any time through Cookie settings in the footer.",
          "Essential record: vantuch_cookie_consent_v1 in your browser's local storage keeps your cookie choice for 180 days, after which the website asks again.",
          "Analytics cookies (only with consent): _clck (Microsoft Clarity, 1 year) and _clsk (Microsoft Clarity, 1 day) on vantuch.dev, and Microsoft cookies on clarity.ms such as MUID (1 year). Clarity keeps session recordings for 30 days and aggregated statistics for up to 13 months. Cloudflare Web Analytics does not use cookies. When you withdraw consent, I delete _clck and _clsk and analytics stops loading.",
          "I use Sentry to diagnose errors, with default personal-data transmission disabled. The service may process technical details about an error, browser, and request that are needed to find and fix problems, and it does not use cookies. I rely on my legitimate interest in a secure, working website (GDPR Article 6(1)(f)).",
        ],
        links: [
          {
            href: "https://privacy.microsoft.com/en-gb/privacystatement",
            label: "Microsoft Privacy Statement",
          },
        ],
      },
      {
        title: "Who may receive the data",
        paragraphs: [
          "I use Vercel to host the website, Cloudflare for form protection and analytics, Microsoft Clarity for analytics, Sentry for diagnostics, and Resend for messages and notifications. I run Twenty CRM, where I keep enquiries and referrals, on my own server in the Czech Republic, with access protected by Cloudflare. When the newsletter is enabled, I will also identify its delivery provider here.",
          "These providers may access only the information needed for their respective services. I do not collect third-party contact details on the referral page or sell information to third parties.",
        ],
      },
      {
        title: "Transfers outside the EU",
        paragraphs: [
          "Vercel, Cloudflare, Microsoft, Sentry, and Resend are based in the United States and may process data outside the European Economic Area. These transfers rely on the European Commission's adequacy decision for the EU-US Data Privacy Framework, under which these companies are certified, or on the European Commission's standard contractual clauses.",
        ],
        links: [
          {
            href: "https://www.dataprivacyframework.gov/list",
            label: "Data Privacy Framework list of certified organisations",
          },
        ],
      },
      {
        title: "How long I retain data",
        paragraphs: [
          "I keep data for as long as needed to handle an enquiry or referral and related communication. If a contract or referral reward results, necessary details may be kept longer to meet legal obligations and defend legal claims. Accounting and tax records are kept for the period required by accounting and tax law, usually 5 to 10 years.",
          "I remove details when they are no longer needed for those purposes.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "You may request access, correction, erasure, or restriction of your data and, where applicable, portability. You may object to processing based on legitimate interests. You may withdraw consent at any time; this does not affect processing carried out before the withdrawal.",
          "I do not use automated decision-making on this site that produces legal or similarly significant effects for you.",
          `Contact me at ${email} to exercise your rights. You may also lodge a complaint with the Czech Data Protection Authority.`,
        ],
      },
    ],
    authority: "Czech Data Protection Authority",
  },
};
