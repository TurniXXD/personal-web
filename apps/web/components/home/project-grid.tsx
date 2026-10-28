import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import styles from "./project-grid.module.css";
import {
  caseStudyProjects,
  caseStudySlugs,
  caseStudyTimeline,
  caseStudyTimelineSlugs,
  copy,
  localizedPath,
  type Locale,
} from "@/lib/content";

type ProjectGridProps = {
  locale: Locale;
  className?: string;
  timeline?: boolean;
};

export const ProjectGrid = ({
  locale,
  className,
  timeline = false,
}: ProjectGridProps) => {
  const content = copy[locale];
  const projects = timeline ? caseStudyTimelineSlugs : caseStudySlugs;

  return (
    <ScrollReveal
      className={[
        `case-grid grid grid-cols-5 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1 ${styles.grid}`,
        timeline && "case-grid--timeline",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      stagger
    >
      {projects.map((slug) => {
        const project = caseStudyProjects[slug];
        const projectCopy = content.cases[slug];

        const card = (
          <article
            className={`case-card group self-start overflow-hidden rounded-[1.35rem] border border-[#dce2fa] bg-white shadow-[0_16px_40px_rgba(47,59,125,0.055)] ${styles.card}`}
            data-project={slug}
            key={slug}
          >
            <a
              className="case-card__link block text-inherit focus-visible:outline-[3px] focus-visible:outline-[rgba(95,108,255,0.35)] focus-visible:outline-offset-3"
              href={localizedPath(locale, `/work/${slug}`)}
            >
              <div className="case-card__image relative m-[0.35rem] block aspect-[16/10] overflow-hidden rounded-[1.05rem] bg-[#e8eaf5]">
                <Image
                  className="object-cover object-top transition-transform duration-[350ms] group-hover:scale-[1.035]"
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
                <p className="case-card__description mt-[0.45rem] block text-[0.76rem] leading-[1.55] text-[#596484] max-[600px]:text-[0.82rem] max-[600px]:leading-[1.6]">
                  {projectCopy.summary}
                </p>
                <span className="case-card__action">
                  {locale === "cs" ? "Zjistit více" : "Learn more"}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </div>
            </a>
          </article>
        );

        return timeline ? (
          <div
            className={`project-timeline__item relative min-w-0 ${styles.timelineItem}`}
            key={slug}
          >
            <div className={`project-timeline__milestone ${styles.milestone}`}>
              <span
                className={`project-timeline__node ${styles.node}`}
                aria-hidden="true"
              />
              <span>
                <time dateTime={String(caseStudyTimeline[slug].startYear)}>
                  {caseStudyTimeline[slug].startYear}
                </time>
                {" – "}
                {caseStudyTimeline[slug].endYear === null ? (
                  locale === "cs" ? (
                    "dosud"
                  ) : (
                    "present"
                  )
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
