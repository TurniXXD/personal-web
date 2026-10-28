import type { ServiceDetailCopy } from "../../service-detail-content";
import csDetail from "../cs/shoptet";

export default {
  ...csDetail,
  meta: {
    title: "Shoptet store setup and customisation | Jakub Vantuch",
    description:
      "Shoptet store design, customisation and integrations focused on shopping experience, management and measurement.",
  },
  name: "Shoptet stores",
  hero: {
    eyebrow: "SHOPTET STORES",
    title: "A store where customers can decide and buy with confidence.",
    description:
      "For new and established stores that need a clearer design, smoother purchasing journey and useful integrations.",
    primary: "Discuss the store",
    secondary: "How improvements work",
  },
  visual: {
    badge: "SHOPPING JOURNEY",
    title: "From product discovery to a completed order",
    items: ["Clear catalogue", "Useful product detail", "Simple basket"],
  },
  benefits: {
    eyebrow: "STORE VALUE",
    title: "A better buying experience without unnecessary complexity.",
    description:
      "Changes reflect your range, customers and the verified capabilities of Shoptet.",
    items: [
      {
        title: "Clear offer",
        description: "Categories, filters and product pages support selection.",
      },
      {
        title: "Credible presentation",
        description: "Visual improvements align the store with your brand.",
      },
      {
        title: "Efficient operations",
        description:
          "Supported integrations can reduce manual order and data work.",
      },
    ],
  },
  workflow: {
    eyebrow: "DELIVERY PROCESS",
    title: "Improvements follow the real shopping journey.",
    description:
      "I first verify the plan, add-ons and available Shoptet interfaces.",
    steps: [
      {
        title: "Review and goals",
        description: "We examine the range, customers and friction points.",
      },
      {
        title: "Change plan",
        description:
          "We prioritise design, content, catalogue and integrations.",
      },
      {
        title: "Implementation",
        description: "Changes are prepared and tested within a safe scope.",
      },
      {
        title: "Measurement and iteration",
        description: "Important steps are monitored and improved over time.",
      },
    ],
  },
  sections: [
    {
      id: "options",
      eyebrow: "WHAT CAN BE IMPROVED",
      title: "Design, content and operational links.",
      items: [
        {
          title: "Template customisation",
          description:
            "Colours, typography, components and responsive behaviour.",
        },
        {
          title: "Catalogue and products",
          description:
            "Categories, parameters, variants and product presentation.",
        },
        {
          title: "Purchase journey",
          description:
            "Basket, trust information and removal of unnecessary friction.",
        },
        {
          title: "Add-ons and integrations",
          description:
            "Only supported connections that bring operational value.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "REAL-WORLD EXAMPLES",
    title: "From a new store to focused improvements.",
    description: "The scope reflects the store's current state.",
    items: [
      {
        title: "New store",
        description: "Structure, design, catalogue and essential analytics.",
      },
      {
        title: "Redesign",
        description:
          "A stronger brand and clearer key areas without changing platform.",
      },
      {
        title: "Operational connection",
        description:
          "Verified service integrations that reduce repeated data entry.",
      },
    ],
  },
  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "What to verify with Shoptet.",
    items: [
      {
        question: "Can every store element be changed?",
        answer:
          "The scope depends on the template, plan and Shoptet capabilities. I verify what is safe and maintainable before proposing changes.",
      },
      {
        question: "Can you help import products?",
        answer:
          "Yes, when source data is suitable and Shoptet supports the required import path.",
      },
      {
        question: "Can accounting or stock be connected?",
        answer:
          "It depends on the specific system and available add-on or API. I verify the options first.",
      },
      {
        question: "Can analytics be included?",
        answer:
          "Yes. We can measure key buying steps with suitable consent and privacy controls.",
      },
    ],
  },
  finalCta: {
    eyebrow: "LET'S TALK",
    title: "Do you have an idea of what you would like to create?",
    description:
      "Tell me about your idea or current problem. Together we will determine what solution makes sense.",
    action: "Discuss the project",
  },
} satisfies ServiceDetailCopy;
