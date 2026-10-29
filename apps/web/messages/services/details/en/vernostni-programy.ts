import type { ServiceDetailCopy } from "@/lib/services/detail-content";
import csDetail from "../cs/vernostni-programy";

export default {
  ...csDetail,
  meta: {
    title: "Digital loyalty programmes for local businesses | Jakub Vantuch",
    description:
      "Digital loyalty cards, visits, points and rewards without requiring customers to install an app.",
  },
  name: "Digital loyalty programmes",
  hero: {
    eyebrow: "DIGITAL LOYALTY PROGRAMMES",
    title: "Give customers a reason to return.",
    description:
      "Encourage repeat visits with a digital card customers open on their phone and staff can manage with ease.",
    primary: "Design a loyalty programme",
    secondary: "How the digital card works",
  },
  visual: {
    badge: "DIGITAL CARD",
    title: "No plastic card or required app installation",
    items: ["Personal QR code", "Current balance", "Available reward"],
  },
  benefits: {
    eyebrow: "WHY DIGITAL",
    title: "More reasons to return, less manual tracking.",
    description:
      "Customers see their progress towards a reward on their phone. You set rules around your operation and retain a clear history of every change.",
    items: [
      {
        title: "Easy for customers",
        description:
          "They open the card from a link on their phone without a required app or plastic card.",
      },
      {
        title: "Rewards that fit your operation",
        description:
          "Points, stamps, visits or tiers can reflect your operation.",
      },
      {
        title: "Programme visibility",
        description:
          "History helps protect rewards from incorrect or unauthorised changes.",
      },
    ],
  },
  workflow: {
    eyebrow: "HOW IT WORKS",
    title: "Four simple steps for customers and staff.",
    description:
      "The customer's QR code identifies them. It never authorises a balance change or redemption by itself.",
    steps: [
      {
        title: "Customer registration",
        description:
          "The customer registers through a simple web form or agreed onboarding flow.",
      },
      {
        title: "Digital loyalty card",
        description:
          "They receive a personal card with a QR code or customer identifier.",
      },
      {
        title: "Visit or purchase recorded",
        description:
          "Authorised staff confirm the transaction and add points, stamps or a visit.",
      },
      {
        title: "Reward redemption",
        description:
          "The customer sees progress and can redeem an eligible reward with staff.",
      },
    ],
  },
  sections: [
    {
      id: "ways-to-use",
      eyebrow: "THREE WAYS TO USE IT",
      title: "Choose an approach that fits your operation.",
      description:
        "A customer card and staff phone is often the simplest option for a small business.",
      items: [
        {
          title: "Customer card + staff phone",
          description:
            "The customer shows a personal QR code. Staff scan it by phone or tablet, open the record and confirm an eligible transaction.",
          note: "Recommended for small businesses. No dedicated scanner required.",
        },
        {
          title: "Dedicated QR scanner",
          description:
            "At reception or checkout, the scanner identifies the customer and staff confirm the visit or purchase.",
          note: "Compatibility depends on the scanner and point-of-sale setup.",
        },
        {
          title: "QR code at the business",
          description:
            "The customer scans a code to open check-in. An authorised employee or trusted mechanism must confirm the visit.",
          note: "A public static code must never allow unlimited self-awarded points.",
        },
      ],
    },
    {
      id: "programme-types",
      eyebrow: "REWARD CONFIGURATION",
      title: "A loyalty programme can use different rules.",
      description:
        "The exact combination depends on service economics and customer behaviour; not every option is automatically included.",
      items: [
        {
          title: "Stamp card",
          description:
            "For example, every tenth eligible visit earns a reward.",
        },
        {
          title: "Purchase points",
          description: "Points reflect a verified purchase value or service.",
        },
        {
          title: "Membership tiers",
          description: "Levels can provide different benefits and rules.",
        },
        {
          title: "Visit rewards",
          description: "A benefit unlocks after a defined number of visits.",
        },
        {
          title: "Birthday rewards",
          description:
            "Optional personal benefits with appropriate permission and data.",
        },
        {
          title: "Referral rewards",
          description:
            "A benefit is added only after a successful referral is verified.",
        },
      ],
    },
    {
      id: "administration",
      eyebrow: "BUSINESS ADMINISTRATION",
      title: "Staff get speed while management keeps a traceable history.",
      tone: "soft",
      items: [
        {
          title: "Customers and balances",
          description:
            "Customer list, current balance and visit or transaction history.",
        },
        {
          title: "Rewards and redemption",
          description: "Reward rules, availability and redemption history.",
        },
        {
          title: "Staff roles",
          description:
            "Each employee receives permissions appropriate to their work.",
        },
        {
          title: "Basic reporting",
          description:
            "Programme activity without promising a specific commercial outcome.",
        },
        {
          title: "Duplicate protection",
          description:
            "Validation limits repeated credit for the same visit or reward.",
        },
      ],
    },
    {
      id: "integrations",
      eyebrow: "INTEGRATIONS AND EXTENSIONS",
      title: "The programme can connect to tools you already use.",
      description:
        "Availability depends on selected systems, APIs, provider requirements and project scope.",
      items: [
        {
          title: "Apple Wallet / Google Wallet",
          description:
            "Optional mobile wallet passes subject to provider requirements.",
        },
        {
          title: "Bookings and POS",
          description:
            "Verified transactions can update balances where a suitable interface exists.",
        },
        {
          title: "CRM and email",
          description:
            "Consent, segments and notifications can build on customer data.",
        },
        {
          title: "Multiple locations",
          description:
            "Rules, staff and reporting can support a branch network.",
        },
      ],
    },
    {
      id: "security",
      eyebrow: "SECURITY AND PRIVACY",
      title: "Rewards should be convenient, not easy to abuse.",
      tone: "navy",
      layout: "list",
      items: [
        {
          title: "Authorised staff",
          description:
            "Only signed-in employees with the right role can credit or redeem.",
        },
        {
          title: "Secure identification",
          description:
            "A QR code identifies the customer but approves nothing on its own.",
        },
        {
          title: "Traceable changes",
          description:
            "Audit history records credits, corrections and redemptions.",
        },
        {
          title: "Proportionate data",
          description:
            "The system collects only needed data and supports retention and deletion workflows.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "WHO IT SUITS",
    title: "For businesses where happy customers naturally return.",
    description: "Rules always reflect the specific service and economics.",
    items: [
      {
        title: "Massage and wellness studio",
        description:
          "Customers collect verified visits and see progress toward a benefit.",
      },
      {
        title: "Beauty or hair salon",
        description: "Rewards support regular care without plastic cards.",
      },
      {
        title: "Café or local service",
        description: "Simple digital stamps work on customer and staff phones.",
      },
    ],
  },
  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "Practical questions before launch.",
    items: [
      {
        question: "Do customers need to install an app?",
        answer:
          "Not necessarily. The card can be a mobile web page. Apple Wallet or Google Wallet can also be assessed.",
      },
      {
        question: "Do I need a QR scanner?",
        answer:
          "No. A staff phone or tablet is usually enough. Dedicated hardware depends on the checkout setup.",
      },
      {
        question: "Can customers use the card on their phone?",
        answer:
          "Yes. They can see their identifier, balance and available rewards in a mobile interface.",
      },
      {
        question: "How are points or visits added?",
        answer:
          "Authorised staff or a verified integration confirms the purchase or visit. The QR code itself does not authorise changes.",
      },
      {
        question: "Can I define my own reward rules?",
        answer:
          "Yes. Rules reflect your operation, with the exact scope agreed for the project.",
      },
      {
        question: "Can it connect to booking or POS systems?",
        answer:
          "Sometimes. The available API, provider terms and data quality must be verified first.",
      },
      {
        question: "What if a customer loses access?",
        answer:
          "Access can be restored after safe identity verification according to the chosen registration method.",
      },
      {
        question: "What does it cost to run?",
        answer:
          "It depends on scope, hosting, user count, integrations and third-party services. I provide an estimate after defining the solution.",
      },
    ],
  },
  finalCta: {
    eyebrow: "DESIGN YOUR PROGRAMME",
    title: "How would you like to reward returning customers?",
    description:
      "Tell me about your operation, visit frequency and current records. Together we can design a clear and secure programme.",
    action: "Discuss a loyalty programme",
  },
} satisfies ServiceDetailCopy;
