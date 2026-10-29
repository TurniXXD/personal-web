import type { ServiceDetailCopy } from "@/lib/services/detail-content";
import csDetail from "../cs/api-integrace";

export default {
  ...csDetail,
  meta: {
    title: "APIs and business system integrations | Jakub Vantuch",
    description:
      "Secure system connections, data synchronisation and visibility into integration errors.",
  },
  name: "APIs and integrations",
  hero: {
    eyebrow: "APIS AND INTEGRATIONS",
    title: "Connect systems that currently work in isolation.",
    description:
      "Reliable data exchange between websites, CRM, accounting, payment services and other tools with supported interfaces.",
    primary: "Discuss an integration",
    secondary: "How connections work",
  },
  visual: {
    badge: "SYSTEMS CONNECTED",
    title: "Data moves without repeated manual entry",
    items: [
      "Website or application",
      "Verified transfer",
      "Destination system",
    ],
  },
  benefits: {
    eyebrow: "OPERATIONAL VALUE",
    title: "More current data and less repetitive administration.",
    description:
      "Integrations account for outages, repeated requests and traceability.",
    items: [
      {
        title: "Less retyping",
        description:
          "Information moves between supported systems automatically.",
      },
      {
        title: "Better consistency",
        description:
          "A defined source of truth reduces differences between tools.",
      },
      {
        title: "Error visibility",
        description: "Monitoring and logs reveal unsuccessful transfers.",
      },
    ],
  },
  workflow: {
    eyebrow: "HOW AN INTEGRATION WORKS",
    title: "Every transfer has rules, validation and a safe recovery path.",
    description: "Availability depends on each provider's API and terms.",
    steps: [
      {
        title: "Source event",
        description: "An order, form or status change starts the process.",
      },
      {
        title: "Data validation",
        description:
          "Format, permissions and required information are checked.",
      },
      {
        title: "Secure transfer",
        description: "Data is sent through a supported protected interface.",
      },
      {
        title: "Confirmation and monitoring",
        description: "The outcome is stored and failures can be retried.",
      },
    ],
  },
  sections: [
    {
      id: "reliability",
      eyebrow: "RELIABILITY",
      title: "A connection must expect temporary failure.",
      tone: "soft",
      items: [
        {
          title: "Request retries",
          description: "A temporary outage does not have to lose data.",
        },
        {
          title: "Duplicate protection",
          description:
            "The same event is not processed repeatedly without control.",
        },
        {
          title: "Monitoring",
          description: "Important failures are visible and traceable.",
        },
        {
          title: "Secure access",
          description:
            "Keys, permissions and personal data are handled for their intended purpose.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "REAL-WORLD EXAMPLES",
    title: "Connections where they bring operational value.",
    description: "Available interfaces and limits are verified in advance.",
    items: [
      {
        title: "Website to CRM",
        description:
          "A validated enquiry creates a contact and commercial case.",
      },
      {
        title: "Payment to service",
        description: "A confirmed payment safely activates the next process.",
      },
      {
        title: "Stock to store",
        description:
          "Available inventory data synchronises under defined rules.",
      },
    ],
  },
  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "Verify first, promise second.",
    items: [
      {
        question: "Can any two systems be connected?",
        answer:
          "Not always. Both need a suitable API, export or supported data path. I verify this before proposing a solution.",
      },
      {
        question: "What happens during an outage?",
        answer:
          "Depending on risk, the design can use queues, retries and alerts so failures remain visible and data is not silently lost.",
      },
      {
        question: "How are credentials protected?",
        answer:
          "Secrets never belong in browser code or the repository. They are stored securely and used with minimal permissions.",
      },
      {
        question: "Can the integration be extended later?",
        answer:
          "Yes, when the design allows for it and the connected services support the required capability.",
      },
    ],
  },
  finalCta: {
    eyebrow: "LET'S TALK",
    title: "Which systems would you like to connect?",
    description:
      "Tell me about the current process and tools. We will verify what solution is realistic and valuable.",
    action: "Discuss the integration",
  },
} satisfies ServiceDetailCopy;
