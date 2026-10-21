import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, ExternalLink, MessageCircle } from "lucide-react";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ActionLink, Pill } from "@vantuch/ui";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { routing } from "@/i18n/routing";
import {
  caseStudyProjects,
  caseStudySlugs,
  copy,
  localizedPath,
  type CaseStudySlug,
} from "@/lib/content";

type Props = { params: Promise<{ locale: string; slug: string }> };

function isCaseStudySlug(value: string): value is CaseStudySlug {
  return caseStudySlugs.includes(value as CaseStudySlug);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudySlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isCaseStudySlug(slug)) notFound();

  const project = caseStudyProjects[slug];
  const content = copy[locale].cases[slug];
  const title = project.name + " | " + copy[locale].meta.title;
  const canonical = localizedPath(locale, "/work/" + slug);

  return {
    title,
    description: content.summary,
    alternates: {
      canonical,
      languages: {
        cs: "/work/" + slug,
        en: "/en/work/" + slug,
        "x-default": "/work/" + slug,
      },
    },
    openGraph: {
      title,
      description: content.summary,
      url: canonical,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isCaseStudySlug(slug)) notFound();

  const t = copy[locale];
  const project = caseStudyProjects[slug];
  const content = t.cases[slug];
  const nextSlug = caseStudySlugs[(caseStudySlugs.indexOf(slug) + 1) % caseStudySlugs.length];
  const nextProject = caseStudyProjects[nextSlug];

  return (
    <>
      <SiteHeader locale={locale} path={"/work/" + slug} />
      <main>
        <article className="case-detail">
          <div className="site-container">
            <a
              className="case-detail__back text-link"
              href={localizedPath(locale, "#work")}
            >
              <ArrowLeft size={17} aria-hidden="true" /> {t.casePage.back}
            </a>
            <div className="case-detail__heading">
              <div className="case-detail__intro">
                <div className="case-detail__meta">
                  <Pill>{content.category}</Pill>
                  {project.partner && (
                    <p className="case-detail__partner">
                      {t.casePage.partner}{" "}
                      <a
                        href={project.partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.partner.name}
                      </a>
                    </p>
                  )}
                </div>
                <h1>{project.name}</h1>
                <p className="case-detail__summary">{content.summary}</p>
              </div>
              <a
                className="text-link"
                href={project.website}
                target="_blank"
                rel="noreferrer"
              >
                {t.casePage.visit} <ExternalLink size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="case-detail__image">
              <Image
                src={project.image}
                alt={project.name + " website preview"}
                fill
                sizes="(max-width: 720px) 92vw, 1100px"
                priority
              />
            </div>
            <div className="case-detail__content">
              <section aria-labelledby="case-challenge">
                <h2 id="case-challenge">{t.casePage.challenge}</h2>
                <p>{content.challenge}</p>
              </section>
              <section className="case-detail__contribution" aria-labelledby="case-role">
                <h2 id="case-role">{t.casePage.role}</h2>
                  <ul>
                    {content.role.map((item) => (
                      <li key={item}>
                        <Check size={18} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
              </section>
              <section className="case-detail__outcome" aria-labelledby="case-result">
                <h2 id="case-result">{t.casePage.result}</h2>
                <p>{content.result}</p>
              </section>
            </div>
            <div className="case-detail__closing">
              <div className="case-detail__stack">
                <strong>{t.casePage.stack}</strong>
                <div className="case-detail__stack-tags">
                  {project.stack.map((technology) => (
                    <Pill key={technology}>{technology}</Pill>
                  ))}
                </div>
              </div>
              <div className="case-detail__cta">
                <p className="eyebrow">{t.casePage.ctaEyebrow}</p>
                <h2>{t.casePage.ctaTitle}</h2>
                <p>{t.casePage.ctaText}</p>
                <ActionLink
                  href={localizedPath(locale, "#contact")}
                  className="ui-action--icon-message"
                >
                  {t.nav.consultation}
                  <MessageCircle size={17} aria-hidden="true" />
                </ActionLink>
              </div>
              <nav className="case-detail__navigation" aria-label={t.casePage.next}>
                <a href={localizedPath(locale, "/work/" + nextSlug)}>
                  <span>{t.casePage.next}</span>
                  {nextProject.name} <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a href={localizedPath(locale, "#work")}>{t.casePage.all}</a>
              </nav>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
