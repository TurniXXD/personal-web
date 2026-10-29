import type { ServiceDetailCopy } from "@/lib/services/detail-content";
import csDetail from "../cs/crm";

export default {
  ...csDetail,
  meta: {
    title: "CRM and customer management | Jakub Vantuch",
    description:
      "Contacts, enquiries, sales cases and follow-up tasks in one clear workflow.",
  },
  name: "CRM and customer management",
  hero: {
    eyebrow: "CRM AND CUSTOMER WORK",
    title: "Keep every enquiry and next step under control.",
    description:
      "Contacts, communication history and commercial cases for teams that no longer want to search through email and spreadsheets.",
    primary: "Discuss customer management",
    secondary: "How CRM helps",
  },
  visual: {
    badge: "COMMERCIAL OVERVIEW",
    title: "Every contact has context and a next step",
    items: ["New enquiry", "Follow-up task", "Closed case"],
  },
  benefits: {
    eyebrow: "TEAM VALUE",
    title: "Fewer missed follow-ups and more shared context.",
    description:
      "CRM should support the team's real work rather than adding administration.",
    items: [
      {
        title: "One source for data",
        description:
          "Contacts, companies, enquiries and communication stay connected.",
      },
      {
        title: "Clear next steps",
        description:
          "Tasks, deadlines and ownership are visible to the right people.",
      },
      {
        title: "Less routine",
        description:
          "Selected administration can be automated after conditions are verified.",
      },
    ],
  },
  workflow: {
    eyebrow: "HOW IT WORKS",
    title: "Every enquiry receives an owner, status and next step.",
    description:
      "The workflow reflects the length and complexity of your sales process.",
    steps: [
      {
        title: "Contact intake",
        description:
          "An enquiry arrives from the website or is added manually.",
      },
      {
        title: "Qualification",
        description: "Important data, priority and ownership are added.",
      },
      {
        title: "Follow-up",
        description: "The team plans tasks and stores relevant history.",
      },
      {
        title: "Outcome",
        description:
          "The case closes and data remains available for future care.",
      },
    ],
  },
  sections: [
    {
      id: "features",
      eyebrow: "SOLUTION OPTIONS",
      title: "CRM shaped around the process you manage.",
      items: [
        {
          title: "Contacts and companies",
          description:
            "Structured details, relationships and cooperation history.",
        },
        {
          title: "Sales pipeline",
          description: "Statuses, values and expected next steps.",
        },
        {
          title: "Tasks and reminders",
          description: "Follow-up work with dates and ownership.",
        },
        {
          title: "Integrations",
          description:
            "Enquiry intake and data exchange with supported systems.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "REAL-WORLD EXAMPLES",
    title: "Clear customer care from first contact onward.",
    description:
      "The scope can range from a simple register to a connected sales process.",
    items: [
      {
        title: "Service company",
        description: "Every enquiry has an owner, date and resolution history.",
      },
      {
        title: "B2B sales",
        description:
          "The team shares sales case status and planned follow-ups.",
      },
      {
        title: "Recurring services",
        description: "Customer history helps prepare relevant future care.",
      },
    ],
  },
  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "CRM should simplify, not slow the team down.",
    items: [
      {
        question: "Do I need a custom CRM?",
        answer:
          "Not always. Configuring an existing service may be better. Custom software makes sense for specific processes or deeper integrations.",
      },
      {
        question: "Can spreadsheet data be imported?",
        answer:
          "Yes, when it is consistent and safely structured. Data should be reviewed and cleaned first.",
      },
      {
        question: "Can CRM connect to the website?",
        answer:
          "Yes. Validated forms can create contacts and cases when the target CRM provides a suitable interface.",
      },
      {
        question: "How is personal data handled?",
        answer:
          "Data scope, access, retention and deletion are designed around the processing purpose and internal rules.",
      },
    ],
  },
  finalCta: {
    eyebrow: "LET'S TALK",
    title: "Would you like a clearer customer workflow?",
    description:
      "Tell me how enquiries are received and handled today. Together we can find an appropriate solution.",
    action: "Discuss CRM",
  },
} satisfies ServiceDetailCopy;
