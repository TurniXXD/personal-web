import type { ServicePageCopy } from "../service-content";
import csWeb from "./csWeb";

export default {
  ...csWeb,
  meta: {
    title: "Custom websites and web applications | Jakub Vantuch",
    description:
      "Design and development of modern company websites, client portals and custom web applications, including integrations and long-term support.",
  },
  hero: {
    eyebrow: "WEBSITES AND APPLICATIONS",
    title: "Custom web applications.",
    description:
      "I design and build modern websites, client portals and custom applications, from the first concept through launch and long-term development.",
    primary: "Discuss your project",
    secondary: "View projects",
  },
  offering: {
    eyebrow: "WHAT I CAN BUILD",
    title: "What I can create for you",
    description:
      "I choose the scope and technology around the project goal, content workflow and systems you already use.",
    items: [
      {
        icon: "browser",
        title: "Company websites",
        description:
          "Professional websites that attract customers, build trust and use clear design to guide visitors from their first visit to an enquiry.",
        href: "/sluzby/firemni-weby",
      },
      {
        icon: "layout",
        title: "Web applications",
        description:
          "Applications and internal systems that simplify everyday work, save time and help companies manage their processes more efficiently.",
        href: "/sluzby/webove-aplikace-na-miru",
      },
      {
        icon: "store",
        title: "Shoptet e-commerce stores",
        description:
          "Shoptet e-commerce stores that combine an attractive design, a simple purchasing experience and easy administration.",
        href: "/sluzby/shoptet",
      },
      {
        icon: "shield",
        title: "Vibecoded application audits",
        description:
          "Security, performance and code quality reviews for applications built with AI, including fixes and MVP completion.",
        href: "/sluzby/audit-ai-aplikaci",
      },
    ],
  },
  projects: {
    eyebrow: "SELECTED WORK",
    title: "Selected projects",
    description:
      "A selection of websites, applications and portals I have helped develop.",
  },
  process: {
    eyebrow: "HOW WE WORK TOGETHER",
    title: "How the collaboration works",
    description:
      "From the first conversation to launch, you have a clear view of progress and next steps.",
    steps: [
      {
        number: "01",
        title: "Consultation and discovery",
        description:
          "We clarify the goals, users, content and project dependencies.",
      },
      {
        number: "02",
        title: "Solution design",
        description:
          "I propose the structure, scope, technology and delivery plan.",
      },
      {
        number: "03",
        title: "Development and feedback",
        description:
          "The project takes shape in stages, with regular feedback along the way.",
      },
      {
        number: "04",
        title: "Testing and launch",
        description:
          "I verify functionality and responsiveness and prepare a safe launch.",
      },
      {
        number: "05",
        title: "Ongoing development and support",
        description:
          "After launch, I can maintain and extend the solution as needs change.",
      },
    ],
  },
  related: {
    eyebrow: "RELATED SERVICES",
    title: "The solution can connect with other areas too.",
    note: {
      title: "Do you also need help with marketing?",
      description:
        "I will be happy to recommend specialists in SEO, online advertising or content marketing who can build on the technical solution.",
    },
    items: [
      {
        title: "Process automation",
        description:
          "Connect your website to communication and business workflows.",
        href: "/automatizace",
      },
      {
        title: "AI solutions",
        description:
          "Practical work with documents, data and internal knowledge.",
        href: "/sluzby/ai-reseni",
      },
      {
        title: "Vibecoded application audits",
        description: "Review, fix and complete an application created with AI.",
        href: "/sluzby/audit-ai-aplikaci",
      },
    ],
  },
  contactTitle: "Let's discuss your website or application.",
} satisfies ServicePageCopy;
