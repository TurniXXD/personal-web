import type { Locale } from "@/lib/site/content";

export const contactPageCopy = {
  cs: {
    meta: {
      title: "Kontakt | Jakub Vantuch",
      description:
        "Kontaktujte Jakuba Vantucha ohledně vývoje webu, aplikace, automatizace nebo AI řešení.",
    },
    title: "Kontakt",
    directContact: "Přímý kontakt",
    telegramContact: "Telegram · @turnix",
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
    title: "Contact",
    directContact: "Direct contact",
    telegramContact: "Telegram · @turnix",
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
