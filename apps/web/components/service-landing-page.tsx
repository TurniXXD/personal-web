import {
  ArrowRight,
  AppWindow,
  Bot,
  Boxes,
  ChartNoAxesCombined,
  Code2,
  CreditCard,
  FileScan,
  Gauge,
  LayoutDashboard,
  Mail,
  MessagesSquare,
  Network,
  Plug,
  Settings2,
  Store,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { ActionLink } from "@vantuch/ui";
import { AiHeroVisual } from "@/components/ai-hero-visual";
import { ContentCard } from "@/components/content-card";
import { ProjectGrid } from "@/components/project-grid";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ContactBlock, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WebApplicationHeroVisual } from "@/components/web-application-hero-visual";
import { localizedPath, type Locale } from "@/lib/content";
import {
  servicePageCopy,
  type ServiceIconName,
  type ServicePageKind,
} from "@/lib/service-content";

type ServiceLandingPageProps = {
  kind: ServicePageKind;
  locale: Locale;
};

const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  browser: AppWindow,
  blocks: Boxes,
  layout: LayoutDashboard,
  plug: Plug,
  bot: Bot,
  message: MessagesSquare,
  mail: Mail,
  "file-scan": FileScan,
  chart: ChartNoAxesCombined,
  network: Network,
  gauge: Gauge,
  code: Code2,
  "credit-card": CreditCard,
  settings: Settings2,
  store: Store,
  users: UsersRound,
};

export const ServiceLandingPage = ({
  kind,
  locale,
}: ServiceLandingPageProps) => {
  const content = servicePageCopy[kind][locale];
  const route =
    kind === "web" ? "/sluzby/webove-aplikace" : "/sluzby/ai-reseni";
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
    url: `https://vantuch.dev${localizedPath(locale, route)}`,
  };

  return (
    <>
      <SiteHeader locale={locale} path={route} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <main className={`service-page service-page--${kind}`}>
        <section className="service-hero" aria-labelledby="service-hero-title">
          <div className="site-container service-hero__grid">
            <div className="service-hero__content">
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 id="service-hero-title">{content.hero.title}</h1>
              <p className="service-hero__description">
                {content.hero.description}
              </p>
              <div className="service-hero__actions">
                <ActionLink href="#contact">
                  {content.hero.primary}{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </ActionLink>
                {content.hero.secondary && (
                  <ActionLink href="#projects" variant="secondary">
                    {content.hero.secondary}
                  </ActionLink>
                )}
              </div>
            </div>
            {kind === "web" ? (
              <WebApplicationHeroVisual locale={locale} />
            ) : (
              <AiHeroVisual locale={locale} />
            )}
          </div>
        </section>

        <section
          className="section service-offering"
          id="use-cases"
          aria-labelledby="service-offering-title"
        >
          <div className="site-container">
            <ScrollReveal className="service-section-heading">
              {kind === "web" && (
                <p className="eyebrow">{content.offering.eyebrow}</p>
              )}
              <h2 id="service-offering-title">{content.offering.title}</h2>
              {content.offering.description && (
                <p>{content.offering.description}</p>
              )}
            </ScrollReveal>
            <ScrollReveal className="service-offering__grid" stagger>
              {content.offering.items.map((item) => {
                const Icon = serviceIcons[item.icon];
                return (
                  <ContentCard
                    className="service-offering-card"
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
          </div>
        </section>

        {content.benefits && (
          <section
            className="section service-benefits"
            aria-labelledby="service-benefits-title"
          >
            <div className="site-container service-benefits__layout">
              <ScrollReveal className="service-section-heading">
                <p className="eyebrow">{content.benefits.eyebrow}</p>
                <h2 id="service-benefits-title">{content.benefits.title}</h2>
                <p>{content.benefits.description}</p>
              </ScrollReveal>
              <ScrollReveal className="service-benefits__list" stagger>
                {content.benefits.items.map((item, index) => (
                  <div key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </section>
        )}

        {content.projects && (
          <section
            className="section service-projects"
            id="projects"
            aria-labelledby="service-projects-title"
          >
            <div className="site-container">
              <ScrollReveal className="service-section-heading">
                <p className="eyebrow">{content.projects.eyebrow}</p>
                <h2 id="service-projects-title">{content.projects.title}</h2>
                <p>{content.projects.description}</p>
              </ScrollReveal>
              <ProjectGrid locale={locale} className="service-projects__grid" />
            </div>
          </section>
        )}

        {content.flow && (
          <section
            className="section service-flow service-flow--ai"
            aria-labelledby="service-flow-title"
          >
            <div className="site-container">
              <ScrollReveal className="service-section-heading">
                <p className="eyebrow">{content.flow.eyebrow}</p>
                <h2 id="service-flow-title">{content.flow.title}</h2>
                <p>{content.flow.description}</p>
              </ScrollReveal>
              <ScrollReveal className="service-flow__diagram" stagger>
                {content.flow.steps.map((step, index) => (
                  <div className="service-flow__step" key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                    {index < content.flow!.steps.length - 1 && (
                      <ArrowRight size={19} aria-hidden="true" />
                    )}
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </section>
        )}

        <section
          className={`section service-process${kind === "ai" ? " service-process--ai" : ""}`}
          aria-labelledby="service-process-title"
        >
          <div className="site-container">
            <ScrollReveal className="service-section-heading">
              <p className="eyebrow">{content.process.eyebrow}</p>
              <h2 id="service-process-title">{content.process.title}</h2>
              <p>{content.process.description}</p>
            </ScrollReveal>
            <ScrollReveal className="service-process__grid" stagger>
              {content.process.steps.map((step) => (
                <article className="service-process-step" key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {content.related && (
          <section
            className="section service-related"
            aria-labelledby="service-related-title"
          >
            <div className="site-container service-related__layout">
              <ScrollReveal className="service-section-heading">
                <p className="eyebrow">{content.related.eyebrow}</p>
                <h2 id="service-related-title">{content.related.title}</h2>
              </ScrollReveal>
              <div className="service-related__content">
                <ScrollReveal className="service-related__links" stagger>
                  {content.related.items.map((item) => (
                    <a href={localizedPath(locale, item.href)} key={item.href}>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.description}</small>
                      </span>
                      <ArrowRight size={18} aria-hidden="true" />
                    </a>
                  ))}
                </ScrollReveal>
                {content.related.note && (
                  <ScrollReveal className="service-related__note">
                    <h3>{content.related.note.title}</h3>
                    <p>{content.related.note.description}</p>
                  </ScrollReveal>
                )}
              </div>
            </div>
          </section>
        )}

        <ContactBlock locale={locale} title={content.contactTitle} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
};
