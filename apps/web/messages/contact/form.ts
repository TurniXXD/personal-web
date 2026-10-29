import type { Locale } from "@/lib/site/content";

export const contactFormCopy = {
  cs: {
    title: "Pojďme probrat váš projekt",
    name: "Jméno",
    email: "Váš e-mail",
    phone: "Telefon (nepovinné)",
    message: "S čím vám mohu pomoci?",
    messagePlaceholder:
      "Napište mi pár slov o svém projektu nebo nápadu. Více probereme při úvodním hovoru.",
    referralApplied: "Doporučení z odkazu je přiřazeno k této poptávce.",
    privacyNotice:
      "Odesláním formuláře mi předáte uvedené údaje, abych mohl odpovědět na vaši poptávku. Více v dokumentu",
    privacyLink: "Zpracování osobních údajů",
    submit: "Odeslat zprávu",
    sending: "Odesílám…",
    success: "Děkuji za zprávu. Ozvu se vám co nejdříve.",
    failure:
      "Zprávu se nepodařilo odeslat. Zkuste to znovu nebo mi napište e-mail.",
    configurationError:
      "Formulář teď není dostupný. Napište mi prosím přímo na e-mail.",
    errors: {
      required: "Vyplňte toto pole.",
      invalidEmail: "Zadejte platný e-mail.",
      invalidPhone: "Zadejte platné telefonní číslo.",
      tooLong: "Text je příliš dlouhý.",
    },
  },
  en: {
    title: "Let’s discuss your project",
    name: "Name",
    email: "Your email",
    phone: "Phone (optional)",
    message: "How can I help you?",
    messagePlaceholder:
      "Tell me a little about your project or idea. We can discuss the details during an introductory call.",
    referralApplied: "The referral from your link is attached to this inquiry.",
    privacyNotice:
      "By sending this form, you share these details so I can respond to your inquiry. Read the",
    privacyLink: "Privacy notice",
    submit: "Send message",
    sending: "Sending…",
    success: "Thanks for your message. I'll get back to you soon.",
    failure:
      "Your message couldn't be sent. Please try again or email me directly.",
    configurationError:
      "The form is unavailable right now. Please email me directly.",
    errors: {
      required: "Please fill in this field.",
      invalidEmail: "Enter a valid email address.",
      invalidPhone: "Enter a valid phone number.",
      tooLong: "This text is too long.",
    },
  },
} as const satisfies Record<Locale, object>;
