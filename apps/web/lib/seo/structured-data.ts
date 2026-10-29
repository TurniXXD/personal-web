import type { Locale } from "@/lib/site/content";
import { localizedPath } from "@/lib/site/content";
import { siteConfig } from "@/lib/site/config";

const SITE_URL = "https://vantuch.dev";
const PERSON_ID = `${SITE_URL}/#person`;

type HomeStructuredDataProps = {
  description: string;
  serviceTypes: string[];
};

type ServiceStructuredDataProps = {
  description: string;
  locale: Locale;
  name: string;
  path: string;
};

type ServiceDetailStructuredDataProps = ServiceStructuredDataProps & {
  faqItems: Array<{ answer: string; question: string }>;
};

type AutomationStructuredDataProps = Pick<
  ServiceStructuredDataProps,
  "description" | "name"
>;

type StructuredData = Record<string, unknown>;

const createProvider = () => ({
  "@type": "Person",
  name: "Jakub Vantuch",
  url: SITE_URL,
});

const createAreaServed = () => ({
  "@type": "Country",
  name: "Czech Republic",
});

export const createHomeStructuredData = ({
  description,
  serviceTypes,
}: HomeStructuredDataProps): StructuredData => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Jakub Vantuch",
      url: SITE_URL,
      jobTitle: "Digital Solutions Consultant",
      knowsAbout: [
        "Web Development",
        "Business Process Automation",
        "Systems Integration",
        "Custom Software",
        "Private AI",
        "Retrieval-Augmented Generation",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "Jakub Vantuch",
      url: SITE_URL,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phoneHref,
      description,
      areaServed: createAreaServed(),
      founder: { "@id": PERSON_ID },
      serviceType: serviceTypes,
    },
  ],
});

export const createAutomationStructuredData = ({
  description,
  name,
}: AutomationStructuredDataProps): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: createProvider(),
  areaServed: createAreaServed(),
  serviceType: [
    "Business process automation",
    "Systems integration",
    "AI solutions",
    "Automated reporting",
  ],
});

export const createServiceStructuredData = ({
  description,
  locale,
  name,
  path,
}: ServiceStructuredDataProps): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: createProvider(),
  areaServed: createAreaServed(),
  url: `${SITE_URL}${localizedPath(locale, path)}`,
});

export const createServiceDetailStructuredData = ({
  description,
  faqItems,
  locale,
  name,
  path,
}: ServiceDetailStructuredDataProps): StructuredData => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name,
      description,
      provider: createProvider(),
      areaServed: createAreaServed(),
      url: `${SITE_URL}${localizedPath(locale, path)}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
});

export const serializeStructuredData = (data: StructuredData) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
