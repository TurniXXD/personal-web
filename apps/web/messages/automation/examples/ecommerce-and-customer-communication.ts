import type { LocalizedExample } from "@/lib/automation/content";

export default [
  {
    id: "abandoned-cart",
    number: "01",
    categories: ["email-marketing", "ecommerce"],
    icon: "shopping-cart",
    cs: {
      title: "Připomeňte zákazníkům nedokončený nákup",
      description:
        "Citlivě naváže na košík, který zákazník opustil před dokončením objednávky.",
      trigger: "Zákazník opustí košík po zadání kontaktních údajů.",
      workflow: [
        "Nedokončený nákup",
        "Kontrola souhlasu a objednávky",
        "Připomínka e-mailem",
        "Návrat do košíku",
      ],
      benefit: "Pomáhá získat zpět část nedokončených objednávek.",
      details: [
        "Ověří, zda objednávka mezitím nebyla dokončena.",
        "Při splnění podmínek odešle personalizovanou připomínku a případný follow-up.",
        "Umožní sledovat návraty a dokončené nákupy.",
      ],
      note: "Odeslání se řídí udělenými souhlasy a pravidly pro obchodní komunikaci.",
    },
    en: {
      title: "Remind customers about an unfinished purchase",
      description:
        "Follow up carefully when a customer leaves a checkout before completing the order.",
      trigger: "A customer leaves the cart after entering contact details.",
      workflow: [
        "Unfinished purchase",
        "Consent and order check",
        "Email reminder",
        "Return to cart",
      ],
      benefit: "Helps recover some unfinished orders.",
      details: [
        "Checks whether the order was completed in the meantime.",
        "Sends a permitted personalised reminder and optional follow-up.",
        "Tracks returns and completed purchases.",
      ],
      note: "Sending follows consent and applicable marketing rules.",
    },
  },
  {
    id: "product-review",
    number: "02",
    categories: ["email-marketing", "ecommerce"],
    icon: "star",
    cs: {
      title: "Získejte více hodnocení od zákazníků",
      description:
        "Po doručení objednávky požádá zákazníka ve vhodný čas o hodnocení produktu.",
      trigger: "Objednávka je označena jako doručená.",
      workflow: [
        "Doručená objednávka",
        "Časová prodleva",
        "Žádost o hodnocení",
        "Recenze",
      ],
      benefit: "Pravidelný sběr zpětné vazby bez ručního rozesílání e-mailů.",
      details: [
        "Sleduje doručení a počká nastavitelný počet dní.",
        "Odkáže přímo na zakoupený produkt a zabrání duplicitním žádostem.",
      ],
    },
    en: {
      title: "Collect more customer reviews",
      description:
        "Ask for a product review at an appropriate time after delivery.",
      trigger: "An order is marked as delivered.",
      workflow: ["Delivered order", "Delay", "Review request", "Review"],
      benefit: "Regular feedback collection without manual email sending.",
      details: [
        "Tracks delivery and waits a configurable number of days.",
        "Links to the purchased product and prevents duplicate requests.",
      ],
    },
  },
  {
    id: "related-products",
    number: "03",
    categories: ["ecommerce", "ai-documents"],
    icon: "package-plus",
    usesAi: true,
    cs: {
      title: "Automaticky doporučujte související produkty",
      description:
        "Analyzujte nákupní chování zákazníků a automaticky doporučujte produkty, které se často kupují společně.",
      trigger: "Zákazník zakoupí vybraný produkt.",
      workflow: [
        "Nákup produktu",
        "AI analýza nákupního chování",
        "Výběr souvisejících produktů",
        "Personalizované doporučení",
      ],
      benefit:
        "Relevantní doporučení, která mohou zvýšit hodnotu objednávky i podpořit další nákup.",
      details: [
        "AI vyhodnotí, které produkty zákazníci často nakupují společně.",
        "Doporučení lze zobrazit v e-shopu nebo využít v následné komunikaci.",
      ],
      examples: [
        "Kávovar → vhodná káva a údržba",
        "Fotoaparát → kompatibilní karta nebo pouzdro",
        "Spotřební zboží → připomínka doplnění zásob",
      ],
    },
    en: {
      title: "Automatically recommend related products",
      description:
        "Analyse customer purchasing behaviour and automatically recommend products that are frequently bought together.",
      trigger: "A customer buys a selected product.",
      workflow: [
        "Product purchase",
        "AI purchase behaviour analysis",
        "Related product selection",
        "Personalised recommendation",
      ],
      benefit:
        "Relevant recommendations that can increase order value and encourage another purchase.",
      details: [
        "AI evaluates which products customers frequently buy together.",
        "Recommendations can appear in the store or be used in follow-up communication.",
      ],
      examples: [
        "Coffee machine → coffee and maintenance items",
        "Camera → compatible card or case",
        "Consumable → replenishment reminder",
      ],
    },
  },
  {
    id: "welcome-series",
    number: "04",
    categories: ["email-marketing"],
    icon: "user-plus",
    cs: {
      title: "Přivítejte nové zákazníky automaticky",
      description:
        "Připraví konzistentní úvodní komunikaci po registraci nebo přihlášení k odběru.",
      trigger: "Nový zákazník se zaregistruje nebo přihlásí k newsletteru.",
      workflow: [
        "Registrace",
        "Uvítací e-mail",
        "Užitečné informace",
        "Další relevantní komunikace",
      ],
      benefit: "Konzistentní komunikace s novými zákazníky.",
      details: [
        "Rozdělí sérii do několika srozumitelných kroků.",
        "Ukončí nebo upraví tok podle chování zákazníka.",
      ],
    },
    en: {
      title: "Welcome new customers automatically",
      description:
        "Prepare consistent onboarding after a signup or subscription.",
      trigger: "A customer creates an account or subscribes.",
      workflow: [
        "Signup",
        "Welcome email",
        "Useful information",
        "Relevant follow-up",
      ],
      benefit: "Consistent communication with new customers.",
      details: [
        "Splits onboarding into clear steps.",
        "Adapts or stops the flow based on customer activity.",
      ],
    },
  },
  {
    id: "customer-reactivation",
    number: "05",
    categories: ["email-marketing"],
    icon: "user-search",
    cs: {
      title: "Připomeňte se zákazníkům, kteří dlouho nenakoupili",
      description:
        "Vybere neaktivní zákazníky a připraví pro ně relevantní komunikaci.",
      trigger: "Zákazník po nastavenou dobu nenakoupil.",
      workflow: [
        "Období neaktivity",
        "Výběr zákazníků",
        "Relevantní nabídka",
        "Vyhodnocení",
      ],
      benefit: "Pomáhá znovu oslovit stávající zákazníky.",
      details: [
        "Délka neaktivity se nastaví podle nákupního cyklu.",
        "Komunikace se odesílá pouze zákazníkům, u kterých jsou splněné potřebné podmínky.",
      ],
    },
    en: {
      title: "Reconnect with customers who have not purchased recently",
      description:
        "Select inactive customers and prepare relevant communication.",
      trigger: "A customer has not purchased for a configured period.",
      workflow: [
        "Inactivity period",
        "Customer selection",
        "Relevant offer",
        "Evaluation",
      ],
      benefit: "Helps reconnect with existing customers.",
      details: [
        "Timing follows the purchase cycle.",
        "Messages are sent only when the required conditions are met.",
      ],
    },
  },
  {
    id: "sales-follow-up",
    number: "06",
    categories: ["email-marketing", "business-processes"],
    icon: "mail-check",
    cs: {
      title: "Nezapomínejte na rozpracované obchodní příležitosti",
      description:
        "Pohlídá nabídky a poptávky, na které druhá strana zatím nereagovala.",
      trigger: "Po odeslání nabídky nepřijde v nastaveném čase odpověď.",
      workflow: [
        "Odeslaná nabídka",
        "Čekání na odpověď",
        "Připomínka",
        "Aktualizace CRM",
      ],
      benefit: "Méně zapomenutých poptávek a obchodních příležitostí.",
      details: [
        "Zkontroluje stav příležitosti před odesláním.",
        "Po reakci zastaví připomínky a aktualizuje CRM.",
      ],
    },
    en: {
      title: "Keep unfinished sales opportunities moving",
      description:
        "Watch proposals and enquiries that have not received a response.",
      trigger: "No reply arrives within a configured period after a proposal.",
      workflow: [
        "Proposal sent",
        "Wait for response",
        "Reminder",
        "CRM update",
      ],
      benefit: "Fewer forgotten enquiries and sales opportunities.",
      details: [
        "Checks opportunity status before sending.",
        "Stops reminders after a response and updates the CRM.",
      ],
    },
  },
  {
    id: "back-in-stock",
    number: "07",
    categories: ["ecommerce", "email-marketing"],
    icon: "bell",
    cs: {
      title: "Informujte zákazníky, když je produkt opět skladem",
      description:
        "Upozorní zájemce ve chvíli, kdy se změní dostupnost produktu.",
      trigger: "Skladová zásoba sledovaného produktu se obnoví.",
      workflow: [
        "Nedostupný produkt",
        "Zájem zákazníka",
        "Změna zásoby",
        "Upozornění",
      ],
      benefit: "Zákazník nemusí dostupnost kontrolovat ručně.",
      details: [
        "Uloží zájem o konkrétní variantu.",
        "Před odesláním znovu ověří dostupnost.",
      ],
    },
    en: {
      title: "Notify customers when a product is back in stock",
      description:
        "Alert interested customers when product availability changes.",
      trigger: "Stock for a watched product is replenished.",
      workflow: [
        "Unavailable product",
        "Customer interest",
        "Stock change",
        "Notification",
      ],
      benefit: "Customers do not need to check availability manually.",
      details: [
        "Stores interest in a specific variant.",
        "Checks availability again before sending.",
      ],
    },
  },
  {
    id: "order-status",
    number: "08",
    categories: ["ecommerce", "email-marketing"],
    icon: "truck",
    cs: {
      title: "Informujte zákazníky o průběhu objednávky",
      description:
        "Odešle srozumitelnou zprávu při důležitých změnách stavu objednávky.",
      trigger: "Objednávka vznikne nebo změní stav.",
      workflow: [
        "Nová objednávka",
        "Změna stavu",
        "Automatická zpráva",
        "Informovaný zákazník",
      ],
      benefit: "Méně rutinních dotazů na stav objednávky.",
      details: [
        "Překládá interní stavy do srozumitelných zpráv.",
        "Neodesílá duplicitní notifikace.",
      ],
    },
    en: {
      title: "Keep customers informed about their order",
      description:
        "Send a clear message when an important order status changes.",
      trigger: "An order is created or changes status.",
      workflow: [
        "New order",
        "Status change",
        "Automatic message",
        "Informed customer",
      ],
      benefit: "Fewer routine questions about order status.",
      details: [
        "Turns internal states into clear messages.",
        "Avoids duplicate notifications.",
      ],
    },
  },
  {
    id: "risky-orders",
    number: "09",
    categories: ["ecommerce", "business-processes"],
    icon: "shield-alert",
    cs: {
      title: "Odhalte objednávky, které potřebují pozornost",
      description:
        "Označí neúplné nebo neobvyklé objednávky ke kontrole pracovníkem.",
      trigger: "Nová objednávka nesplní některé z nastavených pravidel.",
      workflow: [
        "Nová objednávka",
        "Kontrola pravidel",
        "Označení výjimky",
        "Kontrola pracovníkem",
      ],
      benefit: "Rychlejší řešení problematických objednávek.",
      details: [
        "Kontroluje chybějící údaje, hodnotu či opakované problémy s doručením.",
        "Výsledek je podnět ke kontrole, nikoli konečný verdikt o podvodu.",
      ],
    },
    en: {
      title: "Find orders that need attention",
      description: "Flag incomplete or unusual orders for human review.",
      trigger: "A new order fails one of the configured rules.",
      workflow: ["New order", "Rule check", "Exception flag", "Human review"],
      benefit: "Faster handling of problematic orders.",
      details: [
        "Checks missing data, unusual values or repeated delivery issues.",
        "A flag prompts review; it is not a definitive fraud decision.",
      ],
    },
  },
] satisfies LocalizedExample[];
