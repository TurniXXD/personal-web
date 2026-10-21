import Image from "next/image";
import { ScrollReveal } from "@/components/scroll-reveal";
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
      className={["case-grid", timeline && "case-grid--timeline", className]
        .filter(Boolean)
        .join(" ")}
      stagger
    >
      {projects.map((slug) => {
        const project = caseStudyProjects[slug];
        const projectCopy = content.cases[slug];

        const card = (
          <article className="case-card" data-project={slug} key={slug}>
            <a
              className="case-card__link"
              href={localizedPath(locale, `/work/${slug}`)}
              aria-label={`${project.name} — ${content.work.viewCase}`}
            >
              <div className="case-card__image">
                <Image
                  src={project.image}
                  alt={`${project.name} — ${projectCopy.category}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 600px) calc(100vw - 2rem), (max-width: 1000px) 45vw, 280px"
                />
              </div>
              <div className="case-card__body">
                <h3>{project.name}</h3>
                <p className="case-card__description">{projectCopy.summary}</p>
              </div>
            </a>
          </article>
        );

        return timeline ? (
          <div className="project-timeline__item" key={slug}>
            <div className="project-timeline__milestone">
              <span className="project-timeline__node" aria-hidden="true" />
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
