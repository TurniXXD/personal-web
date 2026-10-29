import type { Locale } from "@/lib/site/content";

type ReferralEmailCopy = {
  companyLabel: string;
  greeting: string;
  instructions: string;
  introduction: string;
  partnershipTitle: string;
  subject: string;
};

export const referralEmailCopy: Record<Locale, ReferralEmailCopy> = {
  cs: {
    companyLabel: "Firma",
    greeting: "Dobrý den",
    instructions:
      "Pošlete jej zájemci. Doporučení se přiřadí, když přes odkaz otevře web a odešle vlastní poptávku.",
    introduction: "zde je váš osobní doporučovací odkaz:",
    partnershipTitle: "Zájem o partnerskou spolupráci",
    subject: "Váš osobní doporučovací odkaz",
  },
  en: {
    companyLabel: "Company",
    greeting: "Hello",
    instructions:
      "Share it with a prospective client. The referral is attributed when they open the site through the link and submit their own inquiry.",
    introduction: "here is your personal referral link:",
    partnershipTitle: "Partnership inquiry",
    subject: "Your personal referral link",
  },
};
