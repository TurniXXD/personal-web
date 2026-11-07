import type { EventItem } from "@/lib/events/event-model";
import { toSchemaEventStatus } from "@/lib/events/event-status";
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

type EventStructuredDataProps = {
  event: EventItem;
  /** Absolute canonical URL of the event detail page. */
  url: string;
  imageUrl: string | null;
};

/**
 * schema.org/Event built strictly from verified CMS fields. Optional
 * properties are omitted, never guessed. Returns `null` without a valid start.
 */
export const createEventStructuredData = ({
  event,
  url,
  imageUrl,
}: EventStructuredDataProps): StructuredData | null => {
  if (!event.startsAt) return null;

  const address: StructuredData = { "@type": "PostalAddress" };
  if (event.address) address.streetAddress = event.address;
  if (event.city) address.addressLocality = event.city;
  const placeName = event.venueName ?? event.address ?? event.city;

  const data: StructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.startsAt,
    eventStatus: toSchemaEventStatus(event.status),
    url,
  };
  if (event.endsAt) data.endDate = event.endsAt;
  if (event.summary) data.description = event.summary;
  if (imageUrl) data.image = [imageUrl];
  if (placeName) {
    data.location = {
      "@type": "Place",
      name: placeName,
      ...(Object.keys(address).length > 1 ? { address } : {}),
    };
  }
  if (event.organizerName) {
    data.organizer = { "@type": "Organization", name: event.organizerName };
  }

  const offerUrl = event.registrationUrl ?? event.sourceUrl ?? url;
  if (event.isFree === true) {
    data.isAccessibleForFree = true;
    data.offers = {
      "@type": "Offer",
      price: 0,
      ...(event.currency ? { priceCurrency: event.currency } : {}),
      url: offerUrl,
    };
  } else if (
    event.isFree === false &&
    event.price !== null &&
    event.price > 0 &&
    event.currency
  ) {
    data.offers = {
      "@type": "Offer",
      price: event.price,
      priceCurrency: event.currency,
      url: offerUrl,
    };
  }

  return data;
};

export const serializeStructuredData = (data: StructuredData) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
