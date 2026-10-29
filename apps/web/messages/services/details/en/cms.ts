import type { ServiceDetailCopy } from "@/lib/services/detail-content";
import csDetail from "../cs/cms";

export default {
  ...csDetail,
  meta: {
    title: "CMS and website content management | Jakub Vantuch",
    description:
      "Clear management of website content, media and publishing permissions for businesses and teams.",
  },
  name: "CMS and content management",
  hero: {
    eyebrow: "CMS AND CONTENT MANAGEMENT",
    title: "Update your website without worrying about breaking it.",
    description:
      "Content management designed around your pages, services, products, media and team roles.",
    primary: "Discuss content management",
    secondary: "How a CMS works",
  },
  visual: {
    badge: "READY TO PUBLISH",
    title: "Edit content without changing the design",
    items: ["Pages and services", "Media", "Roles and approval"],
  },
  benefits: {
    eyebrow: "TEAM VALUE",
    title: "Content changes quickly while the design stays consistent.",
    description:
      "Editors get exactly the options they need for safe daily work.",
    items: [
      {
        title: "Simple updates",
        description: "Edit text, imagery and entries through clear fields.",
      },
      {
        title: "Consistent design",
        description: "Prepared blocks keep the interface coherent.",
      },
      {
        title: "Controlled publishing",
        description: "Roles can separate preparation, review and publication.",
      },
    ],
  },
  workflow: {
    eyebrow: "HOW IT WORKS",
    title: "Content follows a clear path from draft to publication.",
    description: "The workflow reflects team size and change sensitivity.",
    steps: [
      {
        title: "Preparation",
        description: "An editor creates or updates structured content.",
      },
      {
        title: "Review",
        description: "A preview shows the result before publication.",
      },
      {
        title: "Approval",
        description: "Selected content can require an authorised reviewer.",
      },
      {
        title: "Publication",
        description: "The content safely becomes visible to website visitors.",
      },
    ],
  },
  sections: [
    {
      id: "features",
      eyebrow: "CMS OPTIONS",
      title: "Management aligned with your content.",
      items: [
        {
          title: "Pages and services",
          description: "Structured fields for a clear presentation.",
        },
        {
          title: "Media",
          description: "An image and file library with useful descriptions.",
        },
        {
          title: "User roles",
          description: "Permissions for editors, approvers and administrators.",
        },
        {
          title: "Preview and scheduling",
          description: "Review changes and optionally schedule publication.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "REAL-WORLD EXAMPLES",
    title: "A CMS shaped around what you publish.",
    description:
      "The content model reflects your information, not the other way around.",
    items: [
      {
        title: "Branch network",
        description:
          "Manage contacts, opening hours and services for each location.",
      },
      {
        title: "Product website",
        description:
          "Products share consistent parameters, media and documents.",
      },
      {
        title: "Expert content",
        description:
          "Articles move through preparation, review and publication.",
      },
    ],
  },
  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "Management without unnecessary compromise.",
    items: [
      {
        question: "Which CMS do you use?",
        answer:
          "The choice depends on scope, content type, budget and operations. I need to understand your publishing process first.",
      },
      {
        question: "Can several people edit content?",
        answer:
          "Yes. Roles and permissions can differ, with optional approval before publication.",
      },
      {
        question: "Can content be migrated from an old site?",
        answer:
          "Yes, when it can be safely extracted. Larger migrations begin with a source quality review.",
      },
      {
        question: "Will our team receive training?",
        answer:
          "Yes. Handover can include a short training session and practical documentation.",
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
