import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleGauge,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ActionLink } from "@vantuch/ui";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  AuditHeroVisual,
  LoyaltyHeroVisual,
  VoucherHeroVisual,
} from "@/components/service-detail-hero-visuals";
import { ContactBlock, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { localizedPath, type Locale } from "@/lib/content";
import {
  serviceDetailCopy,
  type ServiceDetailSlug,
} from "@/lib/service-detail-content";

type ServiceDetailPageProps = {
  locale: Locale;
  slug: ServiceDetailSlug;
};

const DemoLoading = () => (
  <div className="service-detail-demo__loading" aria-hidden="true" />
);

const LoyaltyAdminPreview = dynamic(
  () =>
    import("@/components/service-detail-demos").then(
      (module) => module.LoyaltyAdminPreview,
    ),
  { loading: DemoLoading },
);
const VoucherDemo = dynamic(
  () =>
    import("@/components/service-detail-demos").then(
      (module) => module.VoucherDemo,
    ),
  { loading: DemoLoading },
);

const DetailHeroVisual = ({ locale, slug }: ServiceDetailPageProps) => {
  const content = serviceDetailCopy[locale][slug];
  const customVisualProps = {
    locale,
    ariaLabel: content.visual.title,
    badge: content.visual.badge,
    items: content.visual.items,
  };

  if (slug === "vernostni-programy") {
    return <LoyaltyHeroVisual {...customVisualProps} />;
  }

  if (slug === "darkove-poukazy") {
    return <VoucherHeroVisual {...customVisualProps} />;
  }

  if (slug === "audit-ai-aplikaci") {
    return <AuditHeroVisual {...customVisualProps} />;
  }

  return (
    <div className="service-detail-visual" aria-label={content.visual.title}>
      <div className="service-detail-visual__window">
        <div className="service-detail-visual__bar">
          <span />
          <span />
          <span />
          <i>{content.visual.badge}</i>
        </div>
        <div className="service-detail-visual__body">
          <div className="service-detail-visual__heading">
            <div>
              <span>{content.name}</span>
              <strong>{content.visual.title}</strong>
            </div>
            <ShieldCheck size={25} aria-hidden="true" />
          </div>
          <div className="service-detail-visual__flow">
            {content.visual.items.map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
                {index < content.visual.items.length - 1 && (
                  <ArrowRight size={16} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <div className="service-detail-visual__signal">
            <CircleGauge size={20} aria-hidden="true" />
            <span>
              {content.visual.signal ??
                (locale === "cs"
                  ? "Řešení přizpůsobené vašemu provozu"
                  : "A solution fitted to your operation")}
            </span>
            <i />
          </div>
        </div>
      </div>
      <div className="service-detail-visual__chip service-detail-visual__chip--top">
        <Sparkles size={16} aria-hidden="true" />
        {content.visual.topChip ?? (locale === "cs" ? "Na míru" : "Tailored")}
      </div>
      <div className="service-detail-visual__chip service-detail-visual__chip--bottom">
        <Layers3 size={16} aria-hidden="true" />
        {content.visual.bottomChip ??
          (locale === "cs" ? "Připravené k rozvoji" : "Ready to evolve")}
      </div>
    </div>
  );
};

export const ServiceDetailPage = ({ locale, slug }: ServiceDetailPageProps) => {
  const content = serviceDetailCopy[locale][slug];
  const path = `/sluzby/${slug}`;
  const sectionPlan =
    slug === "vernostni-programy"
      ? [
          { index: 1, itemLimit: 3 },
          { index: 2, itemLimit: 4 },
        ]
      : slug === "darkove-poukazy"
        ? [
            { index: 0, itemLimit: 3 },
            { index: 2, itemLimit: 4 },
            { index: 3, itemLimit: 4 },
          ]
        : null;
  const visibleSections = sectionPlan
    ? sectionPlan.flatMap(({ index, itemLimit }) => {
        const section = content.sections[index];
        return section
          ? [{ ...section, items: section.items.slice(0, itemLimit) }]
          : [];
      })
    : content.sections;
  const visibleWorkflowSteps =
    slug === "darkove-poukazy"
      ? [0, 2, 4, 6].flatMap((index) => {
          const step = content.workflow.steps[index];
          return step ? [step] : [];
        })
      : content.workflow.steps;
  const visibleFaqItems = ["vernostni-programy", "darkove-poukazy"].includes(
    slug,
  )
    ? content.faq.items.slice(0, 5)
    : content.faq.items;
  const labels =
    locale === "cs"
      ? {
          home: "Domů",
          services: "Weby a aplikace",
          breadcrumb: "Drobečková navigace",
          relatedTitle: "Související služby",
          relatedAction: "Zjistit více",
        }
      : {
          home: "Home",
          services: "Websites and applications",
          breadcrumb: "Breadcrumb navigation",
          relatedTitle: "Related services",
          relatedAction: "Learn more",
        };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: content.name,
        description: content.meta.description,
        provider: {
          "@type": "Person",
          name: "Jakub Vantuch",
          url: "https://vantuch.dev",
        },
        areaServed: { "@type": "Country", name: "Czech Republic" },
        url: `https://vantuch.dev${localizedPath(locale, path)}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: visibleFaqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
  const demoSection =
    content.demo === "voucher" && content.demoCopy ? (
      <section
        className="section service-detail-demo"
        aria-labelledby="service-demo-title"
      >
        <div className="site-container">
          <ScrollReveal className="service-detail-heading">
            <p className="eyebrow">{content.demoCopy.eyebrow}</p>
            <h2 id="service-demo-title">{content.demoCopy.title}</h2>
            {content.demoCopy.description ? (
              <p>{content.demoCopy.description}</p>
            ) : null}
          </ScrollReveal>
          <ScrollReveal>
            <VoucherDemo locale={locale} />
          </ScrollReveal>
        </div>
      </section>
    ) : null;

  return (
    <>
      <SiteHeader locale={locale} path={path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <main
        id="main-content"
        className={`service-detail service-detail--${slug}`}
      >
        <section
          className="service-detail-hero"
          aria-labelledby="service-detail-title"
        >
          <div className="site-container">
            <nav className="service-breadcrumbs" aria-label={labels.breadcrumb}>
              <Link href={localizedPath(locale)}>{labels.home}</Link>
              <span aria-hidden="true">/</span>
              <Link href={localizedPath(locale, "/sluzby/webove-aplikace")}>
                {labels.services}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{content.name}</span>
            </nav>
            <div className="service-detail-hero__grid">
              <div className="service-detail-hero__content">
                <p className="eyebrow">{content.hero.eyebrow}</p>
                <h1 id="service-detail-title">
                  {content.hero.title}
                  {content.hero.highlight ? (
                    <span>{content.hero.highlight}</span>
                  ) : null}
                </h1>
                <p>{content.hero.description}</p>
                <div className="service-detail-hero__actions">
                  <ActionLink href="#contact">
                    {content.hero.primary}{" "}
                    <ArrowRight size={17} aria-hidden="true" />
                  </ActionLink>
                  <ActionLink
                    href={content.hero.secondaryHref ?? "#jak-to-funguje"}
                    variant="secondary"
                  >
                    {content.hero.secondary}
                  </ActionLink>
                </div>
              </div>
              <DetailHeroVisual locale={locale} slug={slug} />
            </div>
          </div>
        </section>

        <section
          className="section service-detail-benefits"
          aria-labelledby="detail-benefits-title"
        >
          <div className="site-container">
            <ScrollReveal className="service-detail-heading">
              <p className="eyebrow">{content.benefits.eyebrow}</p>
              <h2 id="detail-benefits-title">{content.benefits.title}</h2>
              <p>{content.benefits.description}</p>
            </ScrollReveal>
            <ScrollReveal
              className="service-detail-card-grid service-detail-card-grid--three"
              stagger
            >
              {content.benefits.items.map((item, index) => (
                <article className="service-detail-card" key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {demoSection}

        <section
          className="section service-detail-workflow"
          id="jak-to-funguje"
          aria-labelledby="detail-workflow-title"
        >
          <div className="site-container">
            <ScrollReveal className="service-detail-heading">
              <p className="eyebrow">{content.workflow.eyebrow}</p>
              <h2 id="detail-workflow-title">{content.workflow.title}</h2>
              <p>{content.workflow.description}</p>
            </ScrollReveal>
            <ScrollReveal className="service-detail-workflow__grid" stagger>
              {visibleWorkflowSteps.map((step, index) => (
                <article key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {visibleSections.map((section) => (
          <section
            className={`section service-detail-section service-detail-section--${section.tone ?? "light"}`}
            id={section.id}
            aria-labelledby={`service-section-${section.id}`}
            key={section.id}
          >
            <div className="site-container">
              <ScrollReveal className="service-detail-heading">
                <p className="eyebrow">{section.eyebrow}</p>
                <h2 id={`service-section-${section.id}`}>{section.title}</h2>
                {section.description && <p>{section.description}</p>}
              </ScrollReveal>
              <ScrollReveal
                className={`service-detail-card-grid${section.layout === "list" ? " service-detail-card-grid--list" : ""}`}
                stagger
              >
                {section.items.map((item) => (
                  <article className="service-detail-card" key={item.title}>
                    <Check size={18} aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.note && <small>{item.note}</small>}
                  </article>
                ))}
              </ScrollReveal>
              {slug === "vernostni-programy" &&
              ["administrace", "administration"].includes(section.id) ? (
                <ScrollReveal>
                  <LoyaltyAdminPreview locale={locale} />
                </ScrollReveal>
              ) : null}
            </div>
          </section>
        ))}

        {slug !== "darkove-poukazy" && slug !== "vernostni-programy" ? (
          <section
            className="section service-detail-use-cases"
            aria-labelledby="detail-cases-title"
          >
            <div className="site-container service-detail-use-cases__layout">
              <ScrollReveal className="service-detail-heading">
                <p className="eyebrow">{content.useCases.eyebrow}</p>
                <h2 id="detail-cases-title">{content.useCases.title}</h2>
                <p>{content.useCases.description}</p>
              </ScrollReveal>
              <ScrollReveal className="service-detail-use-cases__list" stagger>
                {content.useCases.items.map((item, index) => (
                  <article key={item.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </ScrollReveal>
            </div>
          </section>
        ) : null}

        <section
          className="section service-detail-faq"
          aria-labelledby="detail-faq-title"
        >
          <div className="site-container service-detail-faq__layout">
            <ScrollReveal className="service-detail-heading">
              <p className="eyebrow">{content.faq.eyebrow}</p>
              <h2 id="detail-faq-title">{content.faq.title}</h2>
            </ScrollReveal>
            <ScrollReveal className="service-detail-faq__items" stagger>
              {visibleFaqItems.map((item) => (
                <details key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                    <ChevronDown size={19} aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </ScrollReveal>
          </div>
        </section>

        <section
          className="section service-detail-related"
          aria-labelledby="detail-related-title"
        >
          <div className="site-container">
            <ScrollReveal className="service-detail-heading">
              <h2 id="detail-related-title">{labels.relatedTitle}</h2>
            </ScrollReveal>
            <ScrollReveal className="service-detail-related__grid" stagger>
              {content.related.map((relatedSlug) => {
                const related = serviceDetailCopy[locale][relatedSlug];
                return (
                  <Link
                    className="service-detail-related__card"
                    href={localizedPath(locale, `/sluzby/${relatedSlug}`)}
                    key={relatedSlug}
                  >
                    <span>{related.hero.eyebrow}</span>
                    <h3>{related.name}</h3>
                    <p>{related.meta.description}</p>
                    <strong>
                      {labels.relatedAction}{" "}
                      <ArrowRight size={16} aria-hidden="true" />
                    </strong>
                  </Link>
                );
              })}
            </ScrollReveal>
          </div>
        </section>

        <ContactBlock
          locale={locale}
          eyebrow={content.finalCta.eyebrow}
          title={content.finalCta.title}
          description={content.finalCta.description}
          topic={content.name}
          requestType="service"
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
};
