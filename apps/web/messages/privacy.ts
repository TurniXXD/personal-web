import type { Locale } from "@/lib/site/content";
import { siteConfig } from "@/lib/site/config";

const { email, phoneDisplay } = siteConfig.contact;

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
  sections: PrivacySection[];
  authority: string;
};

export const privacyCopy: Record<Locale, PrivacyCopy> = {
  cs: {
    title: "Zpracování osobních údajů",
    description:
      "Informace o tom, jak Jakub Vantuch zpracovává údaje z poptávek, newsletteru a doporučovacích odkazů na vantuch.dev.",
    eyebrow: "SOUKROMÍ A ÚDAJE",
    contactLabel: "Dotazy k osobním údajům:",
    sections: [
      {
        title: "Kdo údaje zpracovává",
        paragraphs: [
          `Správcem osobních údajů získaných prostřednictvím tohoto webu je Jakub Vantuch. V otázkách zpracování mě můžete kontaktovat na ${email} nebo telefonu ${phoneDisplay}.`,
        ],
      },
      {
        title: "Poptávky a komunikace",
        paragraphs: [
          "Když mi napíšete přes kontaktní formulář, zpracuji vaše jméno, e-mail, případně telefon a text zprávy, abych mohl odpovědět, probrat zadání a připravit případnou nabídku. Tyto údaje se ukládají do mého CRM Twenty; o nové poptávce mi může přijít také e-mailové upozornění přes službu Resend.",
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
          "Na stránce Doporučit klienta není formulář pro zadávání kontaktů na jiné firmy nebo osoby. Pokud si formulářem vyžádáte osobní doporučovací odkaz, zpracuji vaše jméno a e-mail k vytvoření odkazu, jeho automatickému doručení a správě doporučení. Poptávku odesílá sám zájemce a jeho údaje zpracovávám podle oddílu Poptávky a komunikace.",
          "Pokud zájemce použije doporučovací odkaz, mohu k jeho poptávce v CRM přiřadit ověřený identifikátor doporučitele za účelem posouzení doporučení a případné odměny. Bez odkazu může zájemce doporučitele sám uvést na úvodním callu. Pro evidenci doporučení se opírám o oprávněný zájem (čl. 6 odst. 1 písm. f GDPR).",
        ],
      },
      {
        title: "Referral odkazy a technický provoz",
        paragraphs: [
          "Pokud přijdete na web s parametrem ?ref, uložím do HTTP-only cookie vantuch_referral identifikátor doporučení na nejvýše 30 dní. Díky tomu lze při pozdějším odeslání poptávky přiřadit doporučení bez toho, aby se ve formuláři zobrazovaly údaje doporučujícího. Identifikátor ověřuji na serveru. Zpracování slouží k evidenci doporučení a opírá se o oprávněný zájem (čl. 6 odst. 1 písm. f GDPR).",
          "Při návštěvě webu může poskytovatel hostingu Vercel zpracovávat technické údaje potřebné pro doručení stránky a zabezpečení provozu, například IP adresu a údaje o požadavku. Cloudflare Turnstile chrání formuláře před zneužitím a při ověření může zpracovat technické údaje o zařízení a požadavku.",
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
          "Po vašem souhlasu používám Microsoft Clarity a Cloudflare Web Analytics k pochopení používání webu a jeho zlepšování. Clarity může ukládat analytické cookies a zaznamenávat interakce se stránkou. Souhlas můžete kdykoli změnit přes odkaz Nastavení cookies v patičce.",
          "Pro diagnostiku chyb používám Sentry s vypnutým výchozím odesíláním osobních údajů. Služba může zpracovat technické informace o chybě, prohlížeči a požadavku, které jsou nutné pro nalezení a opravu problémů.",
        ],
      },
      {
        title: "Komu mohou být údaje zpřístupněny",
        paragraphs: [
          "Pro provoz webu využívám Vercel, pro ochranu formulářů a analytiku Cloudflare, pro analytiku Microsoft Clarity, pro diagnostiku Sentry, pro zpracování poptávek CRM Twenty a pro doručování zpráv a upozornění Resend. Po aktivaci newsletteru zde doplním také konkrétního poskytovatele jeho rozesílání. Tito poskytovatelé mohou mít přístup jen k údajům potřebným pro příslušnou službu. Na stránce doporučení nesbírám kontakty na třetí osoby. Neprodávám údaje třetím stranám.",
        ],
      },
      {
        title: "Jak dlouho údaje uchovávám",
        paragraphs: [
          "Údaje uchovávám po dobu potřebnou k vyřízení poptávky či doporučení a následné komunikaci. Pokud ze spolupráce vznikne smluvní vztah nebo nárok na odměnu, mohou být nezbytné údaje uchovávány déle pro splnění právních povinností a ochranu právních nároků. Údaje, které už nejsou pro tyto účely potřebné, odstraním. Referral cookie automaticky expiruje nejpozději po 30 dnech.",
        ],
      },
      {
        title: "Vaše práva",
        paragraphs: [
          `Můžete požádat o přístup k údajům, jejich opravu, výmaz nebo omezení zpracování; v příslušných případech také o přenositelnost. Proti zpracování založenému na oprávněném zájmu můžete vznést námitku. Na tomto webu nepoužívám automatizované rozhodování, které by vůči vám mělo právní nebo obdobně významné účinky. Se žádostí mi napište na ${email}. Máte také právo podat stížnost u Úřadu pro ochranu osobních údajů.`,
        ],
      },
    ],
    authority: "Úřad pro ochranu osobních údajů",
  },
  en: {
    title: "Privacy notice",
    description:
      "How Jakub Vantuch processes inquiry, newsletter, and referral-link data on vantuch.dev.",
    eyebrow: "PRIVACY AND DATA",
    contactLabel: "Questions about your data:",
    sections: [
      {
        title: "Who processes your data",
        paragraphs: [
          `Jakub Vantuch is the controller of personal data collected through this website. You can contact me about data processing at ${email} or ${phoneDisplay}.`,
        ],
      },
      {
        title: "Inquiries and communication",
        paragraphs: [
          "When you use the contact form, I process your name, email, optional phone number, and message to reply, discuss your project, and potentially prepare an offer. These details are stored in my Twenty CRM; I may also receive an email notification through Resend.",
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
          "The Refer a client page has no form for entering another business's or person's contact details. If you request a personal referral link through the form, I process your name and email to create the link, deliver it automatically, and manage referrals. The prospective client submits their own inquiry; I process their details as described under Inquiries and communication.",
          "If a prospective client uses a referral link, I may attach the verified referrer identifier to their inquiry in the CRM to assess the referral and any reward. Without a link, the client may name the referrer on the introductory call. I rely on legitimate interests for referral records (GDPR Article 6(1)(f)).",
        ],
      },
      {
        title: "Referral links and technical operation",
        paragraphs: [
          "If you arrive with a ?ref URL parameter, I store the referral identifier in an HTTP-only cookie called vantuch_referral for up to 30 days. This lets me attribute a later inquiry without displaying the referrer's details in the form. I verify the identifier on the server. This processing supports referral records and is based on legitimate interests (GDPR Article 6(1)(f)).",
          "The hosting provider Vercel may process technical details needed to deliver and secure the site, such as an IP address and request data. Cloudflare Turnstile protects forms from abuse and may process technical device and request details during verification.",
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
          "With your consent, I use Microsoft Clarity and Cloudflare Web Analytics to understand how the website is used and improve it. Clarity may store analytics cookies and record interactions with the page. You can change your choice at any time through Cookie settings in the footer.",
          "I use Sentry to diagnose errors, with default personal-data transmission disabled. The service may process technical details about an error, browser, and request that are needed to find and fix problems.",
        ],
      },
      {
        title: "Who may receive the data",
        paragraphs: [
          "I use Vercel to host the website, Cloudflare for form protection and analytics, Microsoft Clarity for analytics, Sentry for diagnostics, Twenty CRM for inquiries, and Resend for messages and notifications. When the newsletter is enabled, I will also identify its delivery provider here. These providers may access only the information needed for their respective services. I do not collect third-party contact details on the referral page or sell information to third parties.",
        ],
      },
      {
        title: "How long I retain data",
        paragraphs: [
          "I keep data for as long as needed to handle an inquiry or referral and related communication. If a contract or referral reward results, necessary details may be kept longer to meet legal obligations and defend legal claims. I remove details when they are no longer needed for those purposes. The referral cookie expires after no more than 30 days.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          `You may request access, correction, erasure, or restriction of your data and, where applicable, portability. You may object to processing based on legitimate interests. I do not use automated decision-making on this site that produces legal or similarly significant effects for you. Contact me at ${email} to exercise your rights. You may also lodge a complaint with the Czech Data Protection Authority.`,
        ],
      },
    ],
    authority: "Czech Data Protection Authority",
  },
};
