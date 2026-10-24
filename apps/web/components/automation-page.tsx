import {
  ArrowRight,
  ChartNoAxesCombined,
  Check,
  Database,
  Mail,
} from "lucide-react";
import { ActionLink } from "@vantuch/ui";
import { AutomationCatalog } from "@/components/automation-catalog";
import { AutomationScrollStory } from "@/components/automation-scroll-story";
import { ContactBlock, SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  automationPageCopy,
  getAutomationExamples,
} from "@/lib/automation-content";
import type { Locale } from "@/lib/content";

type AutomationPageProps = { locale: Locale };

export const AutomationPage = ({ locale }: AutomationPageProps) => {
  const content = automationPageCopy[locale];
  const examples = getAutomationExamples(locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.meta.title,
    description: content.meta.description,
    provider: {
      "@type": "Person",
      name: "Jakub Vantuch",
      url: "https://vantuch.dev",
    },
    areaServed: { "@type": "Country", name: "Czech Republic" },
    serviceType: [
      "Business process automation",
      "Systems integration",
      "AI solutions",
      "Automated reporting",
    ],
  };

  return (
    <>
      <SiteHeader locale={locale} path="/automatizace" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main-content">
        <section
          className="automation-page-hero"
          aria-labelledby="automation-page-hero-title"
        >
          <div className="site-container automation-page-hero__grid">
            <div className="automation-page-hero__content">
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 id="automation-page-hero-title">
                {content.hero.title} <span>{content.hero.highlight}</span>
              </h1>
              <p className="automation-page-hero__description">
                {content.hero.description}
              </p>
              <div className="automation-page-hero__actions">
                <ActionLink href="#contact">
                  {content.hero.primary}{" "}
                  <ArrowRight size={18} aria-hidden="true" />
                </ActionLink>
                <ActionLink href="#examples" variant="secondary">
                  {content.hero.secondary}
                </ActionLink>
              </div>
            </div>
            <div className="automation-page-hero__visual">
              <div className="automation-page-hero__visual-head">
                <p className="eyebrow">{content.hero.visualEyebrow}</p>
                <h2>{content.hero.visualTitle}</h2>
              </div>
              <ul>
                {[Database, Mail, ChartNoAxesCombined].map((Icon, index) => (
                  <li key={content.hero.visualItems[index]}>
                    <span className="automation-page-hero__visual-icon">
                      <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span>{content.hero.visualItems[index]}</span>
                    <span
                      className="automation-page-hero__visual-check"
                      aria-hidden="true"
                    >
                      <Check size={16} strokeWidth={2.5} />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="automation-page-hero__visual-note">
                {content.hero.visualNote}
              </p>
            </div>
          </div>
        </section>

        <AutomationScrollStory locale={locale} />

        <section
          className="section automation-catalog"
          id="examples"
          aria-labelledby="automation-catalog-title"
        >
          <div className="site-container">
            <div className="automation-catalog__heading">
              <p className="eyebrow">{content.catalog.eyebrow}</p>
              <h2 id="automation-catalog-title">{content.catalog.title}</h2>
              <p>{content.catalog.description}</p>
            </div>
            <AutomationCatalog
              locale={locale}
              examples={examples}
              content={content.catalog}
            />
          </div>
        </section>

        <section
          className="section automation-process"
          aria-labelledby="automation-process-title"
        >
          <div className="site-container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{content.process.eyebrow}</p>
                <h2 id="automation-process-title">{content.process.title}</h2>
              </div>
            </div>
            <div className="process-grid">
              {content.process.steps.map((step) => (
                <article className="process-step" key={step.number}>
                  <span className="process-step__number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ContactBlock
          locale={locale}
          title={content.contactTitle}
          topic={
            locale === "cs" ? "Automatizace procesů" : "Process automation"
          }
          requestType="automation"
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
};
