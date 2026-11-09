import type { ContactLocale } from "@/lib/contact/submission";

export const contactConfirmationCopy = {
  cs: {
    subject: "Potvrzení přijetí zprávy",
    preheader: "Děkuji za zprávu přes vantuch.dev.",
    greeting: "Dobrý den,",
    received: "děkuji za zprávu. Vaše poptávka mi dorazila.",
    reply: "Ozvu se vám co nejdříve.",
    footer:
      "Tento e-mail potvrzuje odeslání kontaktního formuláře na vantuch.dev.",
  },
  en: {
    subject: "Your message has arrived",
    preheader: "Thanks for getting in touch through vantuch.dev.",
    greeting: "Hello",
    received: "thanks for your message. Your enquiry has reached me.",
    reply: "I'll get back to you soon.",
    footer: "This email confirms a contact form submission on vantuch.dev.",
  },
} as const satisfies Record<ContactLocale, Record<string, string>>;
