import type { ServicePageCopy } from "@/lib/services/landing-content";
import csAi from "../cs/ai";

export default {
  ...csAi,
  meta: {
    title: "Practical AI solutions for businesses | Jakub Vantuch",
    description:
      "AI integrations for document processing, data analysis and business automation, designed around reliability and responsible data handling.",
  },
  hero: {
    eyebrow: "AI SOLUTIONS",
    title: "Artificial intelligence with a practical purpose.",
    description:
      "I help businesses use AI for documents, data and everyday processes.",
    primary: "Discuss an AI solution",
  },
  offering: {
    eyebrow: "PRACTICAL USES",
    title: "Where AI can help",
    items: [
      {
        icon: "bot",
        title: "AI assistants",
        description:
          "Search information across company documents and knowledge bases.",
      },
      {
        icon: "message",
        title: "Website chatbots",
        description:
          "Chatbots connected to website content, products or company knowledge that answer visitors and hand over enquiries.",
      },
      {
        icon: "mail",
        title: "Personalised emails",
        description:
          "Relevant emails created from customer behaviour, communication history and available data.",
      },
      {
        icon: "file-scan",
        title: "Document processing",
        description:
          "Automatically extract data from invoices, forms and PDFs.",
      },
      {
        icon: "chart",
        title: "Data analysis",
        description: "Classify, summarise and evaluate business information.",
      },
      {
        icon: "network",
        title: "AI integrations",
        description: "Connect AI with internal systems and business workflows.",
      },
    ],
  },
  related: {
    eyebrow: "RELATED SERVICE",
    title: "Have you already built an application with AI?",
    description:
      "A prototype often works for a demo but needs a review before real users. I go through it and prepare a plan of fixes.",
    items: [
      {
        title: "AI application audit",
        description:
          "I can review it, finish it and prepare it for production.",
        points: [
          "Application security",
          "Data and privacy",
          "Code quality and architecture",
          "Deployment and infrastructure",
        ],
        href: "/sluzby/audit-ai-aplikaci",
      },
    ],
  },
  contactTitle: "Let's discuss whether AI makes sense for your business.",
} satisfies ServicePageCopy;
