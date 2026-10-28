import type { ServiceDetailCopy } from "../../service-detail-content";

export default {
  meta: {
    title: "AI application and vibecoded MVP audits | Jakub Vantuch",
    description:
      "Built an application with AI? I audit security, performance and code quality, fix issues and help complete MVPs for production.",
  },
  name: "Vibecoded application audit",
  hero: {
    eyebrow: "AI APPLICATION AUDIT",
    title: "Built an application with AI?",
    highlight: "I will help you prepare it for production.",
    description:
      "I review your application's security, performance and code quality, identify risks and propose concrete improvements. I can also implement fixes, help with deployment and continue development.",
    primary: "Request an application review",
    secondary: "What I review",
    secondaryHref: "#co-proverim",
  },
  visual: {
    badge: "PRODUCTION READINESS",
    title: "A review focused on real application risks",
    items: ["Security", "Performance", "Code quality"],
    signal: "Illustrative overview of technical audit areas",
    topChip: "Finding priorities",
    bottomChip: "Remediation plan",
  },
  benefits: {
    eyebrow: "WHO THE AUDIT IS FOR",
    title: "Have a prototype, MVP or live application?",
    description:
      "I review what already works, where the risks lie and what you can safely build on.",
    items: [
      {
        title: "An AI-built prototype",
        description:
          "Your app from Lovable, Bolt, Cursor or another AI tool works, and you want to understand its technical state.",
      },
      {
        title: "An MVP before launch",
        description:
          "You need to check critical risks before real customers start using the application.",
      },
      {
        title: "An application already in use",
        description:
          "You are tackling bugs, performance or further development. I keep useful parts and identify what needs improving.",
      },
    ],
  },
  workflow: {
    eyebrow: "AUDIT SCOPE",
    title: "What I review in your application",
    description:
      "I tailor the scope to the project's current state and whether you are preparing a launch, solving a specific problem or improving long-term maintainability.",
    steps: [
      {
        title: "Application security",
        description:
          "Authentication, authorisation, APIs, database permissions, exposed secrets, dependencies and common web vulnerabilities.",
      },
      {
        title: "Performance and optimisation",
        description:
          "Loading, queries, caching, unnecessary requests, resource usage and likely bottlenecks.",
      },
      {
        title: "Code quality and architecture",
        description:
          "Structure, duplication, type safety, dependencies, error handling and technical debt.",
      },
      {
        title: "Data and privacy",
        description:
          "Personal data handling, permissions, retention, consent and technical privacy controls.",
      },
      {
        title: "Deployment and infrastructure",
        description:
          "Hosting, environment configuration, CI/CD, backups, logging, monitoring and deployment reliability.",
      },
      {
        title: "Testing and reliability",
        description:
          "Critical user journeys, automated tests, edge cases, failure handling and regression risks.",
      },
    ],
  },
  sections: [
    {
      id: "audit-process",
      eyebrow: "PROCESS AND DELIVERABLES",
      title: "From the first review to a clear plan of action.",
      description:
        "We agree the scope in advance. The result is a technical assessment, not a penetration test or legal certification.",
      tone: "soft",
      items: [
        {
          title: "01 — Agree the scope",
          description:
            "Show me the application, repository and goals. We set priorities and access needs.",
        },
        {
          title: "02 — Review the application",
          description:
            "I inspect the agreed code and operations, then check critical journeys and risks.",
        },
        {
          title: "03 — Receive clear findings",
          description:
            "I deliver an understandable summary, risk priorities and a recommended order of fixes.",
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "What to know before an audit.",
    items: [
      {
        question: "Do I need the application's source code?",
        answer:
          "Repository access enables a more thorough code audit. Without it, we can agree on a limited external review, but it cannot cover internal architecture and configuration.",
      },
      {
        question: "Will the application need to be rebuilt?",
        answer:
          "Not necessarily. I aim to preserve working parts and change only what is risky, unmaintainable or blocks further development.",
      },
      {
        question: "How much does an audit cost?",
        answer:
          "The price depends on application size, complexity and the agreed scope. I prepare a quote after the initial project assessment.",
      },
      {
        question: "Can you help with GDPR?",
        answer:
          "I can support technical implementation of data access, consent, retention and other privacy controls. Formal legal advice must come from a qualified legal professional.",
      },
    ],
  },
  related: ["webove-aplikace-na-miru", "firemni-weby"],
  finalCta: {
    eyebrow: "LET'S TALK",
    title: "Have an application but are not sure whether it is ready?",
    description:
      "Send me a project link or a short description of what you already have. Together we will identify what works, what needs improvement and how to continue.",
    action: "Discuss my project",
  },
} satisfies ServiceDetailCopy;
