import type { ServiceDetailCopy } from "@/lib/services/detail-content";
import csDetail from "../cs/webova-analytika";

export default {
  ...csDetail,
  meta: {
    title: "Web analytics and enquiry measurement | Jakub Vantuch",
    description:
      "Website traffic, form, customer action and enquiry source measurement with privacy in mind.",
  },
  name: "Web analytics",
  hero: {
    eyebrow: "WEB ANALYTICS",
    title: "Understand what people actually do on your website.",
    description:
      "Measurement of traffic, enquiries and key actions to support decisions with data rather than impressions.",
    primary: "Discuss measurement",
    secondary: "How analytics works",
  },
  visual: {
    badge: "PERFORMANCE OVERVIEW",
    title: "Important events in one place",
    items: ["Traffic", "Enquiries", "Contact source"],
  },
  benefits: {
    eyebrow: "DECISION VALUE",
    title: "Measure what relates to your goal.",
    description:
      "I avoid dashboards full of vanity metrics. We first define the questions the data should answer.",
    items: [
      {
        title: "Visible conversions",
        description:
          "Forms, clicks and important actions have clear definitions.",
      },
      {
        title: "Better attribution",
        description:
          "Available source and visitor journey data can support enquiry evaluation.",
      },
      {
        title: "Privacy-aware",
        description:
          "Tools and consent reflect the purpose and measurement scope.",
      },
    ],
  },
  workflow: {
    eyebrow: "HOW MEASUREMENT IS BUILT",
    title: "From a business question to a useful overview.",
    description: "The result must be understandable to the people using it.",
    steps: [
      {
        title: "Goals",
        description: "We define which actions genuinely matter.",
      },
      {
        title: "Data plan",
        description:
          "Events, parameters and consent requirements are documented.",
      },
      {
        title: "Implementation",
        description:
          "Measurement is deployed and verified with real scenarios.",
      },
      {
        title: "Dashboard",
        description: "Data is organised for regular evaluation.",
      },
    ],
  },
  sections: [
    {
      id: "scope",
      eyebrow: "WHAT CAN BE MEASURED",
      title: "From website visit to enquiry.",
      items: [
        {
          title: "Traffic",
          description: "Visit trends, landing pages and devices.",
        },
        {
          title: "Contact forms",
          description: "Successful submissions, errors and preceding steps.",
        },
        {
          title: "Important actions",
          description: "Phone clicks, bookings, downloads or shopping steps.",
        },
        {
          title: "Dashboards",
          description: "Clear summaries for management or marketing.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "REAL-WORLD EXAMPLES",
    title: "Data as evidence, not an automatic promise.",
    description: "Analytics reveals patterns but does not guarantee growth.",
    items: [
      {
        title: "Company website",
        description: "See which services contribute to enquiries.",
      },
      {
        title: "Campaign",
        description:
          "Compare visitor quality and conversions by available source.",
      },
      {
        title: "Online store",
        description:
          "See where customers most often leave the purchase journey.",
      },
    ],
  },
  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "Useful measurement without false certainty.",
    items: [
      {
        question: "Which analytics tool should I choose?",
        answer:
          "It depends on goals, detail, budget and privacy approach. I recommend a tool after a short assessment.",
      },
      {
        question: "Do I need a cookie banner?",
        answer:
          "It depends on the tools and measurement mode. Consent must be assessed for the specific implementation and legal requirements.",
      },
      {
        question: "Can form submissions be measured?",
        answer:
          "Yes. A successful submission can usually be recorded without sending the message content to analytics.",
      },
      {
        question: "Will analytics guarantee more enquiries?",
        answer:
          "No. It improves evidence for decisions, but outcomes also depend on the offer, traffic and other factors.",
      },
    ],
  },
  finalCta: {
    eyebrow: "LET'S TALK",
    title: "Would you like to know what your website actually delivers?",
    description:
      "Tell me about its goals and current tools. I will propose a proportionate measurement scope.",
    action: "Discuss analytics",
  },
} satisfies ServiceDetailCopy;
