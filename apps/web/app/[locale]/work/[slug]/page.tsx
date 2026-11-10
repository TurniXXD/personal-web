import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ActionLink, Pill } from "@vantuch/ui";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";
import { routing } from "@/i18n/routing";
import {
  caseStudyProjects,
  caseStudySlugs,
  caseStudyTimeline,
  copy,
  localizedPath,
  type CaseStudySlug,
} from "@/lib/site/content";

type CaseStudyPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function isCaseStudySlug(value: string): value is CaseStudySlug {
  return caseStudySlugs.includes(value as CaseStudySlug);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudySlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
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
        en: localizedPath("en", "/work/" + slug),
        "x-default": "/work/" + slug,
      },
    },
    openGraph: {
      siteName: "Jakub Vantuch",
      title,
      description: content.summary,
      url: canonical,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isCaseStudySlug(slug)) notFound();
  setRequestLocale(locale);

  const t = copy[locale];
  const common = await getTranslations({ locale, namespace: "common" });
  const project = caseStudyProjects[slug];
  const period = caseStudyTimeline[slug];
  const content = t.cases[slug];
  const nextSlug =
    caseStudySlugs[(caseStudySlugs.indexOf(slug) + 1) % caseStudySlugs.length];
  const nextProject = caseStudyProjects[nextSlug];

  return (
    <>
      <SiteHeader locale={locale} path={"/work/" + slug} />
      <main id="main-content">
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
                sizes="(max-width: 960px) 92vw, 880px"
                priority
              />
            </div>
            <div className="case-detail__body grid grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-x-16 gap-y-10 pt-16 max-[900px]:grid-cols-1 max-[900px]:pt-10">
              <dl className="case-detail__facts m-0 grid content-start gap-6 border-t border-ink-strong pt-5">
                <div>
                  <dt className="font-mono text-ui-xs font-bold tracking-ui text-ink-soft uppercase">
                    {t.casePage.period}
                  </dt>
                  <dd className="m-0 mt-1.5 text-body font-semibold text-ink-strong">
                    <time dateTime={String(period.startYear)}>
                      {period.startYear}
                    </time>
                    {" – "}
                    {period.endYear === null ? (
                      common("present")
                    ) : (
                      <time dateTime={String(period.endYear)}>
                        {period.endYear}
                      </time>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-ui-xs font-bold tracking-ui text-ink-soft uppercase">
                    {t.casePage.stack}
                  </dt>
                  <dd className="case-detail__stack-tags m-0 mt-2 flex flex-wrap items-start gap-[0.45rem]">
                    {project.stack.map((technology) => (
                      <Pill key={technology}>{technology}</Pill>
                    ))}
                  </dd>
                </div>
              </dl>
              <div className="case-detail__content grid gap-10">
                <section
                  className="border-t border-border-card pt-5"
                  aria-labelledby="case-challenge"
                >
                  <h2
                    id="case-challenge"
                    className="m-0 mb-3 text-[1.35rem] leading-snug"
                  >
                    {t.casePage.challenge}
                  </h2>
                  <p className="m-0 max-w-[42rem] text-body leading-copy text-ink-muted">
                    {content.challenge}
                  </p>
                </section>
                <section
                  className="case-detail__contribution border-t border-border-card pt-5"
                  aria-labelledby="case-role"
                >
                  <h2
                    id="case-role"
                    className="m-0 mb-4 text-[1.35rem] leading-snug"
                  >
                    {t.casePage.role}
                  </h2>
                  <ul className="m-0 grid list-none gap-3 p-0">
                    {content.role.map((item) => (
                      <li
                        className="flex gap-2.5 text-body leading-normal text-ink-muted"
                        key={item}
                      >
                        <Check
                          className="mt-0.5 shrink-0 text-primary"
                          size={18}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
                <section
                  className="case-detail__outcome border-t border-border-card pt-5"
                  aria-labelledby="case-result"
                >
                  <h2
                    id="case-result"
                    className="m-0 mb-3 text-[1.35rem] leading-snug"
                  >
                    {t.casePage.result}
                  </h2>
                  <p className="m-0 max-w-[42rem] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-ink-strong">
                    {content.result}
                  </p>
                </section>
              </div>
            </div>
            <div className="case-detail__closing">
              <div className="case-detail__cta">
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
              <nav
                className="case-detail__navigation"
                aria-label={t.casePage.next}
              >
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
