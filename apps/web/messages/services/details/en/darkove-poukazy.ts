import type { ServiceDetailCopy } from "@/lib/services/detail-content";
import csDetail from "../cs/darkove-poukazy";

export default {
  ...csDetail,
  meta: {
    title: "Online gift vouchers with payment and PDF | Jakub Vantuch",
    description:
      "Online gift voucher sales, verified payments, automatic PDFs and redemption management.",
  },
  name: "Gift vouchers",
  hero: {
    eyebrow: "GIFT VOUCHERS",
    title: "Gift vouchers without the hassle.",
    description:
      "Customers choose a voucher, pay online and automatically receive a PDF by email. You can track sales, validity and redemption.",
    primary: "Sell gift vouchers",
    secondary: "How voucher sales work",
  },
  visual: {
    badge: "VOUCHER READY",
    title: "Paid, generated and traceable",
    items: ["Unique code", "PDF with QR code", "Redemption status"],
  },
  benefits: {
    eyebrow: "OPERATIONAL VALUE",
    title: "Sell 24/7 without manual issuance.",
    description:
      "From payment and PDF creation to redemption, customers get a simple journey while you retain visibility over every voucher.",
    items: [
      {
        title: "Convenient purchase",
        description:
          "Customers choose the voucher, recipient and message on any device.",
      },
      {
        title: "Automatic delivery",
        description:
          "After verified payment, the system prepares a PDF and sends an email or secure link.",
      },
      {
        title: "Controlled redemption",
        description:
          "Staff verify status and confirm use in a protected interface.",
      },
    ],
  },
  workflow: {
    eyebrow: "CUSTOMER JOURNEY",
    title: "From selection to secure redemption.",
    description:
      "A voucher is issued only after server-side payment confirmation, never merely from a browser success redirect.",
    steps: [
      {
        title: "Voucher selection",
        description: "The customer chooses a value or specific service.",
      },
      {
        title: "Recipient and message",
        description:
          "They add recipient, sender and an optional personal note.",
      },
      {
        title: "Online payment",
        description: "Payment is handled by a selected supported provider.",
      },
      {
        title: "Voucher issuance",
        description: "A unique code, status and validity period are created.",
      },
      {
        title: "PDF and email",
        description:
          "A branded PDF and email attachment or secure link are prepared.",
      },
      {
        title: "Staff verification",
        description: "Staff scan the QR code or enter the voucher code.",
      },
      {
        title: "Redemption",
        description:
          "Authorised staff confirm full or agreed partial redemption.",
      },
    ],
  },
  demoCopy: {
    eyebrow: "INTERACTIVE DEMO",
    title: "Build a fictional gift voucher.",
  },
  sections: [
    {
      id: "types",
      eyebrow: "VOUCHER TYPES",
      title: "The offer can reflect your services and sales model.",
      description:
        "Specific options depend on the selected solution and business terms.",
      items: [
        {
          title: "Fixed value",
          description: "Prepared amounts with a clear price and validity.",
        },
        {
          title: "Custom value",
          description:
            "Customers enter an amount within an allowed range when included in scope.",
        },
        {
          title: "Specific service",
          description:
            "The voucher covers a massage, treatment, meal or another service.",
        },
        {
          title: "Promotional voucher",
          description:
            "A special offer with its own conditions and sales period.",
        },
        {
          title: "Personal message",
          description: "Optional sender, recipient and message on the voucher.",
        },
        {
          title: "Configurable validity",
          description:
            "Validity and conditions follow the agreed configuration and business rules.",
        },
      ],
    },
    {
      id: "pdf",
      eyebrow: "PDF VOUCHER",
      title:
        "A voucher that matches your brand and includes essential information.",
      items: [
        {
          title: "Design and logo",
          description: "The voucher follows the business visual identity.",
        },
        {
          title: "Value or service",
          description: "Customer and staff can clearly see what it covers.",
        },
        {
          title: "Unique code and QR",
          description:
            "The code identifies the voucher but does not authorise redemption.",
        },
        {
          title: "Validity and instructions",
          description: "Expiry date and clear booking or redemption steps.",
        },
        {
          title: "Personal message",
          description: "Optional recipient and greeting details.",
        },
        {
          title: "Delivery",
          description: "PDF download plus email attachment or secure link.",
        },
      ],
    },
    {
      id: "brand-and-experience",
      eyebrow: "BRAND AND EXPERIENCE",
      title: "A voucher that feels like a natural part of your brand.",
      tone: "navy",
      layout: "list",
      description:
        "From purchase to gifting, every detail can reflect your visual identity and the way you communicate with customers.",
      items: [
        {
          title: "Designed for your brand",
          description:
            "Colours, logo and typography connect naturally with your website and venue.",
        },
        {
          title: "Personal message",
          description:
            "Customers can add a recipient, sender and their own greeting.",
        },
        {
          title: "Clear information",
          description:
            "Value, validity and booking instructions are easy to understand at a glance.",
        },
        {
          title: "Mobile and print ready",
          description:
            "The voucher is easy to share digitally and still looks polished on paper.",
        },
      ],
    },
    {
      id: "management",
      eyebrow: "BUSINESS MANAGEMENT",
      title: "Every voucher has a traceable status and history.",
      tone: "soft",
      items: [
        {
          title: "List and search",
          description: "Filter by code, date, type, value and current status.",
        },
        {
          title: "Voucher statuses",
          description:
            "Awaiting payment, active, redeemed, expired or cancelled as appropriate.",
        },
        {
          title: "Redemption history",
          description: "Who redeemed the voucher, when and to what extent.",
        },
        {
          title: "Resending",
          description: "Authorised staff can resend an email or link.",
        },
        {
          title: "Manual issue and cancellation",
          description: "Only with appropriate permission and audit history.",
        },
        {
          title: "Basic reporting",
          description: "Sales, active voucher and redemption overview.",
        },
      ],
    },
    {
      id: "redemption",
      eyebrow: "VOUCHER REDEMPTION",
      title: "Fast staff checks with double-redemption protection.",
      items: [
        {
          title: "1. Presentation",
          description: "The customer shows a PDF, printed voucher or code.",
        },
        {
          title: "2. Identification",
          description: "Staff scan the QR code or enter the identifier.",
        },
        {
          title: "3. Validation",
          description:
            "The system checks validity, status and available balance.",
        },
        {
          title: "4. Confirmation",
          description:
            "Authorised staff confirm redemption and the status updates safely.",
        },
      ],
    },
    {
      id: "email",
      eyebrow: "EMAIL DELIVERY",
      title: "Customers receive the voucher after confirmed payment.",
      description:
        "A branded template, attachment or secure link, resending and basic delivery status can be included. Inbox placement cannot be guaranteed.",
      items: [
        {
          title: "Automatic message",
          description: "Sent only after payment has been safely confirmed.",
        },
        {
          title: "Branded template",
          description:
            "The email reflects the business and explains the next steps.",
        },
        {
          title: "Attachment or link",
          description:
            "Delivery reflects security needs and provider constraints.",
        },
      ],
    },
    {
      id: "terms",
      eyebrow: "BUSINESS AND LEGAL CONTEXT",
      title: "The technical solution must follow your terms.",
      tone: "soft",
      layout: "list",
      items: [
        {
          title: "Validity and cancellation",
          description:
            "Validity, cancellation and refunds must align with business terms and applicable law.",
        },
        {
          title: "Tax and records",
          description:
            "Tax treatment cannot be generalised; confirm it for the voucher type and accounting regime.",
        },
        {
          title: "Customer information",
          description:
            "The journey should clearly explain price, validity, redemption and support contact.",
        },
      ],
    },
  ],
  useCases: {
    eyebrow: "WHO IT SUITS",
    title: "Vouchers for services, experiences and local businesses.",
    description: "The offer and rules always reflect the specific business.",
    items: [
      {
        title: "Massage or wellness studio",
        description:
          "Customers buy a specific treatment or value voucher as a gift.",
      },
      {
        title: "Salon or hairdresser",
        description: "A service or value voucher can be verified at reception.",
      },
      {
        title: "Restaurant or local service",
        description:
          "Online purchase keeps vouchers available outside opening hours.",
      },
    ],
  },
  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "What to clarify before voucher sales launch.",
    items: [
      {
        question: "Can customers buy directly on the website?",
        answer:
          "Yes. They can choose a type, add details and continue to a supported payment provider.",
      },
      {
        question: "Will the voucher arrive automatically by email?",
        answer:
          "After secure payment confirmation, the system can prepare a PDF and send an attachment or link. Inbox placement cannot be guaranteed.",
      },
      {
        question: "Can I use my own design?",
        answer:
          "Yes. The PDF and email can follow your brand while including required details and instructions.",
      },
      {
        question: "How does card payment work?",
        answer:
          "A selected provider processes the payment. The voucher is issued only after trusted server-side confirmation.",
      },
      {
        question: "How do I validate a voucher?",
        answer:
          "Authorised staff scan the QR or enter the code and see status, validity and history. The QR code alone redeems nothing.",
      },
      {
        question: "Can a voucher be partially redeemed?",
        answer:
          "Value vouchers can support partial redemption when included in the agreed scope and records.",
      },
      {
        question: "Can I sell vouchers for specific services?",
        answer:
          "Yes. A voucher can cover a specific service, variant or predefined value.",
      },
      {
        question: "Do I need a QR scanner?",
        answer:
          "Not necessarily. A staff phone or tablet is often enough. Dedicated hardware can be assessed.",
      },
      {
        question: "What are the ongoing costs?",
        answer:
          "They depend on hosting, transaction volume, payment provider, email service and support. I estimate them for the selected solution.",
      },
    ],
  },
  finalCta: {
    eyebrow: "LET'S TALK",
    title: "Would you like to sell vouchers without manual issuance?",
    description:
      "Tell me about voucher types, your current website and redemption process. Together we can design a safe purchase and operations flow.",
    action: "Discuss gift vouchers",
  },
} satisfies ServiceDetailCopy;
