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
  process: {
    eyebrow: "HOW WE WORK TOGETHER",
    title: "From a problem to a verified solution",
    description:
      "First, I verify the potential benefit, data quality and where human oversight must remain.",
    steps: [
      {
        number: "01",
        title: "Problem identification",
        description: "We define the problem and intended result.",
      },
      {
        number: "02",
        title: "Feasibility analysis",
        description: "We review the data, risks and suitable approach.",
      },
      {
        number: "03",
        title: "Prototype and validation",
        description: "We verify quality and usefulness on a sample.",
      },
      {
        number: "04",
        title: "Integration",
        description: "I safely connect the solution to your systems.",
      },
      {
        number: "05",
        title: "Monitoring and improvement",
        description: "We monitor quality and refine the solution.",
      },
    ],
  },
  related: {
    eyebrow: "RELATED SERVICE",
    title: "Have you already built an application with AI?",
    items: [
      {
        title: "AI application audit",
        description:
          "I can review it, finish it and prepare it for production.",
        href: "/sluzby/audit-ai-aplikaci",
      },
    ],
  },
  contactTitle: "Let's discuss whether AI makes sense for your business.",
} satisfies ServicePageCopy;
