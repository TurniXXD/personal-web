import type { Locale } from "@/lib/content";

export const contactPageCopy = {
  cs: {
    meta: {
      title: "Kontakt | Jakub Vantuch",
      description:
        "Kontaktujte Jakuba Vantucha ohledně vývoje webu, aplikace, automatizace nebo AI řešení.",
    },
    eyebrow: "KONTAKT",
    title: "Pojďme probrat váš projekt.",
    intro:
      "Napište mi, co chcete vytvořit nebo zlepšit. Ozvu se vám a společně projdeme cíle, možnosti řešení i další postup.",
    directContact: "Přímý kontakt",
    phoneAvailability:
      "Na mobilu jsem dostupný v pracovní dny od 8:00 do 18:00.",
    businessDetails: "Fakturační údaje",
    registrationNumber: "IČO",
    registry: "Evidence",
    registryValue: "Zapsán v živnostenském rejstříku",
    authority: "Registrující úřad",
    address: "Adresa",
  },
  en: {
    meta: {
      title: "Contact | Jakub Vantuch",
      description:
        "Contact Jakub Vantuch about a website, application, automation, or AI solution.",
    },
    eyebrow: "CONTACT",
    title: "Let’s discuss your project.",
    intro:
      "Tell me what you want to build or improve. I will get back to you so we can discuss your goals, possible solutions, and next steps.",
    directContact: "Direct contact",
    phoneAvailability:
      "I am available by phone from 8:00 to 18:00 on business days.",
    businessDetails: "Business details",
    registrationNumber: "Company ID",
    registry: "Registration",
    registryValue: "Registered in the Czech Trade Register",
    authority: "Registering authority",
    address: "Address",
  },
} as const satisfies Record<Locale, object>;
