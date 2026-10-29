import {
  ArrowRight,
  ChartNoAxesCombined,
  Check,
  Database,
  Mail,
} from "lucide-react";
import { ActionLink } from "@vantuch/ui";
import { useTranslations } from "next-intl";
import { AutomationCatalog } from "@/components/automation/automation-catalog";
import {
  ContactBlock,
  SiteFooter,
  SiteHeader,
} from "@/components/layout/site-chrome";
import {
  automationPageCopy,
  getAutomationExamples,
} from "@/lib/automation/content";
import { StructuredDataScript } from "@/components/shared/structured-data-script";
import { createAutomationStructuredData } from "@/lib/seo/structured-data";
import type { Locale } from "@/lib/site/content";

type AutomationPageProps = { locale: Locale };

export const AutomationPage = ({ locale }: AutomationPageProps) => {
  const ui = useTranslations("automationUi");
  const content = automationPageCopy[locale];
  const examples = getAutomationExamples(locale);
  const structuredData = createAutomationStructuredData({
    name: content.meta.title,
    description: content.meta.description,
  });

  return (
    <>
      <SiteHeader locale={locale} path="/automatizace" />
      <StructuredDataScript data={structuredData} />
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
            <AutomationCatalog examples={examples} content={content.catalog} />
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
          topic={ui("serviceName")}
          requestType="automation"
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
};
