import type { AutomationPageCopy } from "../automation-content";

export default {
  meta: {
    title: "Custom process automation and AI solutions | Jakub Vantuch",
    description:
      "Email, e-commerce, social monitoring and business process automation, system integrations, AI solutions and practical examples.",
  },
  hero: {
    eyebrow: "AUTOMATION FOR EVERYDAY WORK",
    title: "Let routine work run itself.",
    highlight: "Focus on growth.",
    description:
      "I connect the tools you already use and turn repetitive tasks into a reliable process. Less copying, waiting, and checking every step by hand.",
    primary: "Discuss automation options",
    secondary: "Explore examples",
    visualEyebrow: "WHEN SYSTEMS WORK TOGETHER",
    visualTitle: "More work completed. Fewer manual steps.",
    visualItems: [
      "Data syncs between systems",
      "Messages go out at the right time",
      "Reports stay up to date",
    ],
    visualNote: "You remain in control of the rules and decisions.",
  },
  catalog: {
    eyebrow: "PRACTICAL EXAMPLES",
    title: "Where can automation help?",
    description:
      "Choose an area and explore situations that can be simplified around your systems and business needs.",
    all: "All",
    showMore: "Show more examples",
    categories: {
      "email-marketing": "Email and marketing",
      ecommerce: "E-commerce",
      social: "Social media",
      "ai-documents": "Documents and AI",
      "business-processes": "Business processes",
      "data-reporting": "Data and reporting",
    },
  },
  process: {
    eyebrow: "PROCESS",
    title: "How does the collaboration work?",
    steps: [
      {
        number: "01",
        title: "We discuss your process",
        description:
          "We identify what is handled manually today and where avoidable complications arise.",
      },
      {
        number: "02",
        title: "I propose a solution",
        description: "We choose automation that fits your needs and budget.",
      },
      {
        number: "03",
        title: "I build the automation",
        description:
          "I connect the required systems, implement the logic and test the solution.",
      },
      {
        number: "04",
        title: "We launch and refine it",
        description:
          "We verify the flow in practice and adjust the next steps where needed.",
      },
    ],
  },
  contactTitle: "Not sure what your company could automate?",
} satisfies AutomationPageCopy;
