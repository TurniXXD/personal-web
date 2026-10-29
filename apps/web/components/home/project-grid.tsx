import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import {
  caseStudyProjects,
  caseStudySlugs,
  caseStudyTimeline,
  caseStudyTimelineSlugs,
  copy,
  localizedPath,
  type Locale,
} from "@/lib/site/content";

type ProjectGridProps = {
  locale: Locale;
  className?: string;
  timeline?: boolean;
};

const timelineLevelClasses = [
  "[--timeline-level:0]",
  "[--timeline-level:1]",
  "[--timeline-level:2]",
  "[--timeline-level:3]",
  "[--timeline-level:4]",
] as const;

export const ProjectGrid = ({
  locale,
  className,
  timeline = false,
}: ProjectGridProps) => {
  const t = useTranslations("common");
  const content = copy[locale];
  const projects = timeline ? caseStudyTimelineSlugs : caseStudySlugs;

  return (
    <ScrollReveal
      className={[
        "case-grid grid grid-cols-5 items-start gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1",
        timeline && "case-grid--timeline",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      stagger
    >
      {projects.map((slug, index) => {
        const project = caseStudyProjects[slug];
        const projectCopy = content.cases[slug];

        const card = (
          <article
            className="case-card group self-start overflow-hidden rounded-[1.35rem] border border-border-card bg-white shadow-[0_16px_40px_rgba(47,59,125,0.055)] transition-[border-color,box-shadow] duration-[180ms] hover:border-primary hover:shadow-[0_18px_44px_rgba(62,72,156,0.12)] focus-within:border-primary"
            data-project={slug}
            key={slug}
          >
            <a
              className="case-card__link block text-inherit focus-visible:outline-[3px] focus-visible:outline-[rgba(95,108,255,0.35)] focus-visible:outline-offset-3"
              href={localizedPath(locale, `/work/${slug}`)}
            >
              <div className="case-card__image relative m-[0.35rem] block aspect-[16/10] overflow-hidden rounded-[1.05rem] bg-[#e8eaf5]">
                <Image
                  className="object-cover object-top transition-transform duration-700 ease-out"
                  src={project.image}
                  alt={`${project.name} — ${projectCopy.category}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 600px) calc(100vw - 2rem), (max-width: 1000px) 45vw, 280px"
                />
              </div>
              <div className="case-card__body block px-4 pt-[0.8rem] pb-[0.9rem] max-[600px]:pt-3 max-[600px]:pb-4">
                <h3 className="m-0 text-[clamp(1.25rem,1.7vw,1.6rem)] tracking-[-0.045em]">
                  {project.name}
                </h3>
                <p className="case-card__description mt-[0.45rem] block text-ui-sm leading-[1.55] text-[#596484] max-[600px]:text-body-sm max-[600px]:leading-[1.6]">
                  {projectCopy.summary}
                </p>
                <span className="case-card__action">
                  {t("learnMore")}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </div>
            </a>
          </article>
        );

        return timeline ? (
          <div
            className={`project-timeline__item group/timeline relative min-w-0 ${timelineLevelClasses[index] ?? timelineLevelClasses[0]}`}
            key={slug}
          >
            <div className="project-timeline__milestone relative h-[5.5rem] pt-[calc(0.85rem+var(--timeline-level)*0.65rem)] pr-2 pb-0 pl-4 font-mono text-[0.58rem] leading-[1.6] font-extrabold tracking-[0.06em] text-primary uppercase before:absolute before:top-[calc(var(--timeline-level)*0.65rem)] before:right-[-1rem] before:left-0 before:h-[0.65rem] before:border-t before:border-r before:border-[#aab4ff] before:content-[''] group-last/timeline:before:right-0 group-last/timeline:before:border-r-0 max-[1000px]:h-auto max-[1000px]:min-h-9 max-[1000px]:pt-0 max-[1000px]:pr-0 max-[1000px]:pb-3 max-[1000px]:pl-0 max-[1000px]:before:hidden">
              <span
                className="project-timeline__node absolute top-[calc(var(--timeline-level)*0.65rem-0.2rem)] left-4 size-[0.45rem] bg-primary shadow-[0_0_0_0.24rem_rgba(95,108,255,0.1)] max-[1000px]:top-[0.28rem] max-[1000px]:right-[-1.6rem] max-[1000px]:left-auto"
                aria-hidden="true"
              />
              <span>
                <time dateTime={String(caseStudyTimeline[slug].startYear)}>
                  {caseStudyTimeline[slug].startYear}
                </time>
                {" – "}
                {caseStudyTimeline[slug].endYear === null ? (
                  t("present")
                ) : (
                  <time dateTime={String(caseStudyTimeline[slug].endYear)}>
                    {caseStudyTimeline[slug].endYear}
                  </time>
                )}
              </span>
            </div>
            {card}
          </div>
        ) : (
          card
        );
      })}
    </ScrollReveal>
  );
};
