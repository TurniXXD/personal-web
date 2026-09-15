import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { getProjects } from "@/lib/site-data";
import { getDisplayHostname } from "@/lib/url";
import { companyLinks } from "@/components/scene/content-config";
import { ProjectPreview } from "@/components/scene/dialogs/project-preview";
import type { BaseDialogProps } from "@/components/scene/dialogs/types";

export const WorkDialog = ({
  dialogRef,
  open,
  interactionProps,
  onClose,
}: BaseDialogProps) => {
  const t = useTranslations("WorkDialog");
  const projects = getProjects((key) => t(key));
  const listRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<number | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = projects[activeProjectIndex] ?? projects[0];

  const activateProject = (index: number) => {
    if (scrollEndTimerRef.current) {
      window.clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = null;
    }

    setActiveProjectIndex((currentIndex) =>
      currentIndex === index ? currentIndex : index,
    );
  };

  useEffect(() => {
    const list = listRef.current;

    if (!list || !open) {
      return;
    }

    const syncActiveProjectFromScroll = () => {
      const projectItems = Array.from(
        list.querySelectorAll<HTMLElement>(".work-dialog__item"),
      );

      if (!projectItems.length) {
        return;
      }

      const listRect = list.getBoundingClientRect();
      const listCenter = listRect.left + listRect.width / 2;
      const closestProjectIndex = projectItems.reduce(
        (closestIndex, item, index) => {
          const itemRect = item.getBoundingClientRect();
          const itemCenter = itemRect.left + itemRect.width / 2;
          const currentDistance = Math.abs(itemCenter - listCenter);
          const closestItem = projectItems[closestIndex];
          const closestRect = closestItem.getBoundingClientRect();
          const closestCenter = closestRect.left + closestRect.width / 2;
          const closestDistance = Math.abs(closestCenter - listCenter);

          return currentDistance < closestDistance ? index : closestIndex;
        },
        0,
      );

      setActiveProjectIndex((currentIndex) =>
        currentIndex === closestProjectIndex
          ? currentIndex
          : closestProjectIndex,
      );
    };

    const syncActiveProjectAfterScroll = () => {
      if (scrollEndTimerRef.current) {
        window.clearTimeout(scrollEndTimerRef.current);
      }

      scrollEndTimerRef.current = window.setTimeout(() => {
        scrollEndTimerRef.current = null;
        syncActiveProjectFromScroll();
      }, 120);
    };

    syncActiveProjectFromScroll();

    list.addEventListener("scroll", syncActiveProjectAfterScroll, {
      passive: true,
    });
    list.addEventListener("scrollend", syncActiveProjectFromScroll);

    return () => {
      if (scrollEndTimerRef.current) {
        window.clearTimeout(scrollEndTimerRef.current);
        scrollEndTimerRef.current = null;
      }

      list.removeEventListener("scroll", syncActiveProjectAfterScroll);
      list.removeEventListener("scrollend", syncActiveProjectFromScroll);
    };
  }, [open]);

  const scrollToEnd = () => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    list.scrollTo({
      left: list.scrollWidth,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={dialogRef}
      data-testid="dialog-work"
      data-open={open ? "true" : "false"}
      className="work-dialog work-dialog--projects"
      {...interactionProps}
    >
      <div className="work-dialog__header">
        <strong>{t("title")}</strong>
        <button
          type="button"
          className="work-dialog__close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X size={18} strokeWidth={2.2} />
        </button>
      </div>
      <button
        type="button"
        className="work-dialog__scroll-button"
        aria-label={t("scrollToEnd")}
        onClick={scrollToEnd}
      >
        <span aria-hidden="true">{"\u00BB"}</span>
      </button>
      <div
        ref={listRef}
        className="work-dialog__list work-dialog__list--scroll-tail"
      >
        {projects.map((project, index) => {
          const projectMeta = project.url
            ? getDisplayHostname(project.url)
            : project.meta;
          const isActive = index === activeProjectIndex;
          const projectPreview = (
            <>
              <ProjectPreview
                name={project.name}
                url={project.url}
                imgUrl={project.imgUrl}
                imageFit={project.imageFit}
              />
              <div className="work-dialog__meta">
                <strong>{project.name}</strong>
                {projectMeta ? <small>{projectMeta}</small> : null}
              </div>
            </>
          );

          return (
            <article
              key={project.name}
              className={classNames(
                "work-dialog__item",
                isActive && "work-dialog__item--active",
              )}
              onFocus={() => activateProject(index)}
              onMouseEnter={() => activateProject(index)}
              onPointerEnter={() => activateProject(index)}
              tabIndex={project.url ? undefined : 0}
            >
              {project.url ? (
                <a
                  className="work-dialog__item-link"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  onFocus={() => activateProject(index)}
                  onMouseEnter={() => activateProject(index)}
                  onPointerEnter={() => activateProject(index)}
                >
                  {projectPreview}
                </a>
              ) : (
                <div
                  className="work-dialog__item-link"
                  onMouseEnter={() => activateProject(index)}
                  onPointerEnter={() => activateProject(index)}
                >
                  {projectPreview}
                </div>
              )}
              <div className="work-dialog__badges">
                {project.isAppio ? (
                  <a
                    className="work-dialog__badge"
                    href={companyLinks.appio.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("companies.appio.label")}
                    <span className="work-dialog__badge-popup">
                      {t("companies.appio.message")}
                    </span>
                  </a>
                ) : null}
                {project.isProRocketeers ? (
                  <a
                    className="work-dialog__badge"
                    href={companyLinks.proRocketeers.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("companies.proRocketeers.label")}
                    <span className="work-dialog__badge-popup">
                      {t("companies.proRocketeers.message")}
                    </span>
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
      {activeProject ? (
        <div className="work-dialog__project-description" aria-live="polite">
          <div className="work-dialog__project-copy">
            <strong>{activeProject.name}</strong>
            <p>{activeProject.description}</p>
            <small>{activeProject.stack}</small>
          </div>
          <div className="work-dialog__project-work">
            <strong>{t("detail.workTitle")}</strong>
            <ul>
              {activeProject.workItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};
