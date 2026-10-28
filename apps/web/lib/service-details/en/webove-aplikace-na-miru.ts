import type { ServiceDetailCopy } from "../../service-detail-content";
import csDetail from "../cs/webove-aplikace-na-miru";

export default {
  ...csDetail,
  meta: {
    title: "Custom web applications and internal systems | Jakub Vantuch",
    description:
      "Web applications, customer portals and internal systems that simplify business processes.",
  },
  name: "Web applications",
  hero: {
    eyebrow: "WEB APPLICATIONS",
    title: "An app that fits the way your team works.",
    description:
      "Internal systems, customer portals and dashboards for companies that have outgrown spreadsheets or off-the-shelf tools.",
    primary: "Discuss an application",
    secondary: "How it works",
  },
  visual: {
    badge: "WORK OVERVIEW",
    title: "Every important step in one place",
    items: ["Roles and permissions", "Statuses and tasks", "Clear reporting"],
  },
  benefits: {
    eyebrow: "VALUE FOR THE TEAM",
    title: "Less manual work and better visibility into every case.",
    description:
      "The application follows the real business process and connects information currently spread across tools.",
    items: [
      {
        title: "One workflow",
        description: "The team shares statuses, ownership and next steps.",
      },
      {
        title: "Fewer errors",
        description:
          "Validation and automated checks reduce repetitive data entry.",
      },
      {
        title: "Room to grow",
        description: "Features can evolve with feedback and changing needs.",
      },
    ],
  },
  workflow: {
    eyebrow: "HOW IT WORKS",
    title: "From incoming data to a clear next action.",
    description:
      "The workflow is designed around your process, roles and connected systems.",
    steps: [
      {
        title: "Request intake",
        description: "Data arrives from a form, import or connected system.",
      },
      {
        title: "Processing",
        description:
          "The application validates required information, status and ownership.",
      },
      {
        title: "Collaboration",
        description:
          "Users work according to their roles and see relevant history.",
      },
      {
        title: "Outcome and report",
        description: "Completed work is closed and reflected in reporting.",
      },
    ],
  },
  sections: [
    {
      id: "features",
      eyebrow: "SOLUTION OPTIONS",
      title: "The application can grow with your process.",
      items: [
        {
          title: "User roles",
          description:
            "Different access for administrators, staff, partners and customers.",
        },
        {
          title: "Dashboards",
          description: "Current work, tasks, deadlines and commercial cases.",
        },
        {
          title: "Notifications",
          description:
            "Alerts for changes, deadlines and situations that need attention.",
        },
        {
          title: "Integrations",
          description:
            "Links to CRM, accounting, payments or other supported APIs.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "REAL-WORLD EXAMPLES",
    title: "When a business needs its own working environment.",
    description:
      "Every example starts with the actual process, not a feature list.",
    items: [
      {
        title: "Customer portal",
        description:
          "Customers follow requests and documents without email chaos.",
      },
      {
        title: "Internal casework",
        description:
          "The team manages cases, deadlines and responsibilities in one interface.",
      },
      {
        title: "Operations dashboard",
        description:
          "Management sees work status and exceptions without manual reporting.",
      },
    ],
  },
  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "Before development starts.",
    items: [
      {
        question: "Do I need a detailed technical specification?",
        answer:
          "No. Describe the current process, problems and desired outcome. We will prepare the functional scope together.",
      },
      {
        question: "Can it connect to our current tools?",
        answer:
          "Often yes, if they provide a suitable API or other safe data exchange. I verify the options first.",
      },
      {
        question: "How do user permissions work?",
        answer:
          "Authentication, roles and permissions are designed so each person only sees what they need.",
      },
      {
        question: "Can we start with a smaller version?",
        answer:
          "Yes. I recommend validating the key workflow first and adding features based on actual value.",
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
