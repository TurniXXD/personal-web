import type { Locale } from "@/lib/site/content";
import type { ReferralRequestIntent } from "@/lib/referrals/request";

type FormCopy = {
  title: string;
  text: string;
  name: string;
  email: string;
  company: string;
  companyPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  failure: string;
  configurationError: string;
  privacy: string;
  privacyLink: string;
  errors: {
    required: string;
    invalidEmail: string;
    tooLong: string;
  };
};

export const referralRequestCopy: Record<
  Locale,
  Record<ReferralRequestIntent, FormCopy>
> = {
  cs: {
    link: {
      title: "Kam vám mám odkaz poslat?",
      text: "Vyplňte své jméno a e-mail. Podepsaný doporučovací odkaz vám pošlu přímo do schránky.",
      name: "Jméno a příjmení",
      email: "E-mail pro zaslání odkazu",
      company: "Firma (nepovinné)",
      companyPlaceholder: "Název firmy",
      message: "Zpráva",
      messagePlaceholder: "",
      submit: "Poslat můj odkaz",
      sending: "Připravuji odkaz…",
      success: "Hotovo. Osobní doporučovací odkaz jsem vám poslal e-mailem.",
      failure:
        "Odkaz se nepodařilo odeslat. Zkuste to znovu nebo mi napište přímo.",
      configurationError:
        "Automatické odeslání teď není dostupné. Napište mi prosím přímo.",
      privacy: "Údaje použiji pouze pro vytvoření odkazu a správu doporučení.",
      privacyLink: "Zpracování osobních údajů",
      errors: {
        required: "Vyplňte toto pole.",
        invalidEmail: "Zadejte platný e-mail.",
        tooLong: "Text je příliš dlouhý.",
      },
    },
    partnership: {
      title: "Napište mi o spolupráci",
      text: "Napište mi, jaké klienty potkáváte a jak by vám dlouhodobá spolupráce měla fungovat.",
      name: "Jméno a příjmení",
      email: "Váš e-mail",
      company: "Firma (nepovinné)",
      companyPlaceholder: "Název firmy nebo studia",
      message: "Jak si spolupráci představujete?",
      messagePlaceholder:
        "Napište pár slov o své práci, typech klientů a představě o spolupráci.",
      submit: "Odeslat zájem o partnerství",
      sending: "Odesílám…",
      success: "Děkuji. Ozvu se vám a partnerství společně probereme.",
      failure:
        "Zprávu se nepodařilo odeslat. Zkuste to znovu nebo mi napište přímo.",
      configurationError:
        "Formulář teď není dostupný. Napište mi prosím přímo.",
      privacy: "Údaje použiji pouze pro odpověď a navazující komunikaci.",
      privacyLink: "Zpracování osobních údajů",
      errors: {
        required: "Vyplňte toto pole.",
        invalidEmail: "Zadejte platný e-mail.",
        tooLong: "Text je příliš dlouhý.",
      },
    },
  },
  en: {
    link: {
      title: "Where should I send your link?",
      text: "Enter your name and email. I will send your signed referral link straight to your inbox.",
      name: "Full name",
      email: "Email for your link",
      company: "Company (optional)",
      companyPlaceholder: "Company name",
      message: "Message",
      messagePlaceholder: "",
      submit: "Send my link",
      sending: "Preparing your link…",
      success: "Done. Your personal referral link has been sent by email.",
      failure:
        "The link could not be sent. Please try again or email me directly.",
      configurationError:
        "Automatic delivery is unavailable right now. Please email me directly.",
      privacy:
        "I use these details only to create your link and manage referrals.",
      privacyLink: "Privacy notice",
      errors: {
        required: "Please fill in this field.",
        invalidEmail: "Enter a valid email address.",
        tooLong: "This text is too long.",
      },
    },
    partnership: {
      title: "Tell me about a partnership",
      text: "Tell me what kinds of clients you meet and how you would like an ongoing partnership to work.",
      name: "Full name",
      email: "Your email",
      company: "Company (optional)",
      companyPlaceholder: "Company or studio name",
      message: "How do you see us working together?",
      messagePlaceholder:
        "Share a few words about your work, client types, and partnership idea.",
      submit: "Send partnership inquiry",
      sending: "Sending…",
      success: "Thank you. I will get back to you to discuss the partnership.",
      failure:
        "The message could not be sent. Please try again or email me directly.",
      configurationError:
        "The form is unavailable right now. Please email me directly.",
      privacy:
        "I use these details only to reply and continue the conversation.",
      privacyLink: "Privacy notice",
      errors: {
        required: "Please fill in this field.",
        invalidEmail: "Enter a valid email address.",
        tooLong: "This text is too long.",
      },
    },
  },
};
