import Image from "next/image";
import {
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  Code2,
  FileText,
  Layers3,
  Mail,
  MessageCircle,
  Mouse,
  Share2,
  ShieldCheck,
  ShoppingCart,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import { ActionLink } from "@vantuch/ui";
import { copy, localizedPath, type Locale } from "@/lib/content";
import { ContactBlock, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ContentCard } from "@/components/content-card";
import { InteractiveHeroArt } from "@/components/interactive-hero-art";
import { NewsletterSocialSection } from "@/components/newsletter-social-section";
import { ProjectGrid } from "@/components/project-grid";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TechnicalBackground } from "@/components/technical-background";
import { TestimonialsSection } from "@/components/testimonials-section";
import { siteConfig } from "@/lib/site-config";

const serviceIcons = [Code2, Workflow, Bot] as const;
const serviceIds = ["websites", "automation", "ai"] as const;
const serviceRoutes = [
  "/sluzby/webove-aplikace",
  "/automatizace",
  "/sluzby/ai-reseni",
] as const;
const automationCategoryIcons = [
  Mail,
  ShoppingCart,
  Share2,
  FileText,
  Workflow,
  ChartNoAxesCombined,
] as const;

type MarketingPageProps = { locale: Locale };

export const MarketingPage = ({ locale }: MarketingPageProps) => {
  const t = copy[locale];
  const newsletterEnabled = Boolean(process.env.NEWSLETTER_WEBHOOK_URL?.trim());
  const newsletterVisible = process.env.NEWSLETTER_VISIBLE === "true";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://vantuch.dev/#person",
        name: "Jakub Vantuch",
        url: "https://vantuch.dev",
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
        "@id": "https://vantuch.dev/#business",
        name: "Jakub Vantuch",
        url: "https://vantuch.dev",
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phoneHref,
        description: t.meta.description,
        areaServed: { "@type": "Country", name: "Czech Republic" },
        founder: { "@id": "https://vantuch.dev/#person" },
        serviceType: t.services.items.map((service) => service.title),
      },
    ],
  };

  return (
    <>
      <SiteHeader locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="site-container hero__grid">
            <div className="hero__content">
              <p className="eyebrow">
                <span className="eyebrow__line" />
                {t.hero.eyebrow}
              </p>
              <h1 id="hero-title">
                {t.hero.title} <span>{t.hero.highlight}</span>
              </h1>
              <p className="hero__description">{t.hero.description}</p>
              <div className="hero__actions">
                <ActionLink
                  href={localizedPath(locale, "#contact")}
                  className="ui-action--icon-message"
                >
                  {t.hero.primary}{" "}
                  <MessageCircle size={18} aria-hidden="true" />
                </ActionLink>
                <ActionLink
                  href={localizedPath(locale, "#work")}
                  variant="secondary"
                  className="ui-action--icon-layers"
                >
                  {t.hero.secondary} <Layers3 size={18} aria-hidden="true" />
                </ActionLink>
              </div>
              <div className="hero__proof">
                <span>
                  <UserRoundCheck size={17} aria-hidden="true" />
                  {t.hero.experience}
                </span>
                <span>
                  <Workflow size={17} aria-hidden="true" />
                  {t.hero.availability}
                </span>
                <span>
                  <ShieldCheck size={17} aria-hidden="true" />
                  {t.hero.casesProof}
                </span>
              </div>
            </div>
            <InteractiveHeroArt />
          </div>
          <a
            className="hero__scroll"
            href={localizedPath(locale, "#services")}
            aria-label={t.nav.services}
          >
            <Mouse size={20} aria-hidden="true" />
          </a>
        </section>

        <section
          className="section services-section"
          id="services"
          aria-labelledby="services-title"
        >
          <TechnicalBackground variant="services" />
          <div className="site-container">
            <ScrollReveal className="section-heading">
              <div>
                <p className="eyebrow">{t.services.eyebrow}</p>
                <h2 id="services-title">{t.services.title}</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal className="service-grid" stagger>
              {t.services.items.map((service, index) => {
                const Icon = serviceIcons[index];
                return (
                  <ContentCard
                    className="service-card"
                    href={localizedPath(locale, serviceRoutes[index])}
                    id={`service-${serviceIds[index]}`}
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    icon={
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    }
                    tags={service.tags}
                    action={
                      <>
                        {t.services.more}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </>
                    }
                  />
                );
              })}
            </ScrollReveal>
          </div>
        </section>

        <section
          className="section automation-section"
          id="automation"
          aria-labelledby="automation-title"
        >
          <TechnicalBackground variant="automation" />
          <div className="site-container">
            <ScrollReveal className="automation-section__intro">
              <p className="eyebrow">{t.automation.eyebrow}</p>
              <h2 id="automation-title">{t.automation.title}</h2>
              <p>{t.automation.description}</p>
            </ScrollReveal>
            <ScrollReveal className="automation-category-grid" stagger>
              {t.automation.items.map((item, index) => {
                const Icon = automationCategoryIcons[index];
                return (
                  <ContentCard
                    className="automation-category-card"
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    icon={
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    }
                  />
                );
              })}
            </ScrollReveal>
            <ScrollReveal className="automation-section__cta">
              <ActionLink
                href={localizedPath(locale, "/automatizace")}
                variant="secondary"
                className="ui-action--icon-layers"
              >
                {t.automation.cta}
                <Layers3 size={18} aria-hidden="true" />
              </ActionLink>
            </ScrollReveal>
          </div>
        </section>

        <section
          className="section work-section"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="site-container">
            <ScrollReveal className="section-heading">
              <div>
                <p className="eyebrow">{t.work.eyebrow}</p>
                <h2 id="work-title">
                  {t.work.title} <span>{t.work.titleHighlight}</span>
                </h2>
              </div>
            </ScrollReveal>
            <ProjectGrid locale={locale} timeline />
          </div>
        </section>

        <section
          className="section process-section"
          id="process"
          aria-labelledby="process-title"
        >
          <div className="site-container">
            <ScrollReveal className="section-heading">
              <div>
                <p className="eyebrow">{t.process.eyebrow}</p>
                <h2 id="process-title">{t.process.title}</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal className="process-grid" stagger>
              {t.process.steps.map((step) => (
                <article className="process-step" key={step.number}>
                  <span className="process-step__number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </ScrollReveal>
          </div>
        </section>

        <section
          className="section about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="site-container about-section__grid">
            <ScrollReveal className="about-section__portrait-reveal">
              <figure className="about-section__portrait">
                <div>
                  <Image
                    src="/images/jakub-vantuch.jpg"
                    alt={
                      locale === "cs"
                        ? "Portrét Jakuba Vantucha"
                        : "Portrait of Jakub Vantuch"
                    }
                    width={950}
                    height={1280}
                    sizes="(max-width: 900px) 90vw, 390px"
                  />
                </div>
              </figure>
            </ScrollReveal>
            <ScrollReveal className="about-section__body" delay={60}>
              <p className="eyebrow">{t.about.eyebrow}</p>
              <h2 id="about-title">{t.about.title}</h2>
              {t.about.intro ? (
                <p className="about-section__intro">{t.about.intro}</p>
              ) : null}
              <p>{t.about.text}</p>
              <p>{t.about.detail}</p>
            </ScrollReveal>
          </div>
        </section>

        <TestimonialsSection locale={locale} />
        <NewsletterSocialSection
          locale={locale}
          enabled={newsletterEnabled}
          showNewsletter={newsletterVisible}
          instagramUrl={siteConfig.social.instagram}
          linkedinUrl={siteConfig.social.linkedin}
          githubUrl={siteConfig.social.github}
          content={t.community}
          privacyHref={localizedPath(locale, "/privacy")}
          privacyLabel={t.footer.privacy}
        />
        <ContactBlock locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
};
