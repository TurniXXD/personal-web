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
    successTitle: "Zpráva je na cestě",
    success: "Děkuji za zprávu. Ozvu se vám co nejdříve.",
    failureTitle: "Odeslání se nezdařilo",
    failure:
      "Zprávu se nepodařilo odeslat. Zkuste to znovu nebo mi napište e-mail.",
    configurationErrorTitle: "Formulář je dočasně nedostupný",
    configurationError:
      "Formulář teď není dostupný. Napište mi prosím přímo na e-mail.",
    emailAction: "Napsat e-mail",
    errors: {
      required: "Toto pole je povinné.",
      invalidEmail: "Zadejte e-mail ve formátu jmeno@firma.cz.",
      invalidPhone:
        "Zadejte 7 až 15 číslic. Můžete použít mezery, +, závorky a pomlčky.",
      tooLong: "Zkraťte text a zkuste to znovu.",
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
    referralApplied: "The referral from your link is attached to this enquiry.",
    privacyNotice:
      "By sending this form, you share these details so I can respond to your enquiry. Read the",
    privacyLink: "Privacy notice",
    submit: "Send message",
    sending: "Sending…",
    successTitle: "Message sent",
    success: "Thanks for your message. I'll get back to you soon.",
    failureTitle: "Message not sent",
    failure:
      "Your message couldn't be sent. Please try again or email me directly.",
    configurationErrorTitle: "Form temporarily unavailable",
    configurationError:
      "The form is unavailable right now. Please email me directly.",
    emailAction: "Send an email",
    errors: {
      required: "This field is required.",
      invalidEmail: "Enter an email address in the format name@example.com.",
      invalidPhone:
        "Enter 7 to 15 digits. You can use spaces, +, parentheses and hyphens.",
      tooLong: "Shorten this text and try again.",
    },
  },
} as const satisfies Record<Locale, object>;
