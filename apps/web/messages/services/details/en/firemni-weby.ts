import type { ServiceDetailCopy } from "@/lib/services/detail-content";
import csDetail from "../cs/firemni-weby";

export default {
  ...csDetail,
  meta: {
    title: "Company websites that support sales | Jakub Vantuch",
    description:
      "Design and development of company websites that build trust, generate enquiries and remain easy to manage.",
  },
  name: "Company websites",
  hero: {
    eyebrow: "COMPANY WEBSITES",
    title: "A website that tells people what you do.",
    description:
      "For companies and service businesses that want to look professional, generate relevant enquiries and stay in control of their content.",
    primary: "Discuss a new website",
    secondary: "How it is built",
  },
  visual: {
    badge: "A CLEAR PATH TO ENQUIRY",
    title: "Visitors quickly find what matters",
    items: [
      "Services and benefits",
      "Credible references",
      "Clear contact route",
    ],
  },
  benefits: {
    eyebrow: "BUSINESS VALUE",
    title: "A professional presentation with a clear commercial purpose.",
    description:
      "I do not treat the website as a digital brochure. Its structure, content and contact journey reflect the people you want to reach.",
    items: [
      {
        title: "Greater trust",
        description:
          "A consistent visual style and clear content strengthen credibility.",
      },
      {
        title: "Better enquiries",
        description: "Visitors understand the offer and know what to do next.",
      },
      {
        title: "Easy management",
        description:
          "Your team can update common content without developer support.",
      },
    ],
  },
  workflow: {
    eyebrow: "HOW IT IS BUILT",
    title: "From business goals to a launched website.",
    description: "Every stage has a tangible output and room for feedback.",
    steps: [
      {
        title: "Goals and customers",
        description: "We clarify the offer, audience and desired actions.",
      },
      {
        title: "Structure and content",
        description: "I design the page hierarchy and visitor journey.",
      },
      {
        title: "Design and development",
        description: "A responsive interface is built around your brand.",
      },
      {
        title: "Testing and launch",
        description:
          "I verify forms, speed, devices and essential measurement.",
      },
    ],
  },
  sections: [
    {
      id: "options",
      eyebrow: "WHAT CAN BE INCLUDED",
      title: "Features aligned with the way your business works.",
      items: [
        {
          title: "Responsive design",
          description: "A clear experience on mobile, tablet and desktop.",
        },
        {
          title: "SEO foundations",
          description:
            "Technical structure, metadata and a meaningful content hierarchy.",
        },
        {
          title: "Forms and bookings",
          description:
            "A contact or booking journey connected to your process.",
        },
        {
          title: "Content management",
          description:
            "Pages, media and services with appropriate editorial roles.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "REAL-WORLD EXAMPLES",
    title: "A website designed around a specific business model.",
    description:
      "The scope can range from a focused presentation to a content-rich website.",
    items: [
      {
        title: "Local service",
        description:
          "A studio presents services, prices and team members and guides customers to booking.",
      },
      {
        title: "B2B company",
        description:
          "A manufacturer explains its portfolio and collects qualified enquiries.",
      },
      {
        title: "Specialist business",
        description:
          "The company publishes references, documents and expert content from one CMS.",
      },
    ],
  },
  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "Useful points before we start.",
    items: [
      {
        question: "Can you help with the content structure?",
        answer:
          "Yes. We decide what visitors need to know and in what order. Copy can be prepared together or with a specialist copywriter.",
      },
      {
        question: "Will I be able to update the website?",
        answer:
          "Yes, when content management is part of the scope. I configure administration so common changes remain safe and straightforward.",
      },
      {
        question: "Can analytics be included?",
        answer:
          "Yes. We define important actions, consent requirements and a suitable tool for your needs.",
      },
      {
        question: "How long does a website take?",
        answer:
          "It depends on scope, content readiness and feedback speed. I prepare a schedule after the initial consultation.",
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
