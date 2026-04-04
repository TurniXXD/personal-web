import { useRef } from "react";
import { useTranslations } from "next-intl";
import { getProjects } from "@/lib/site-data";
import { companyLinks } from "@/components/pipeline/config";
import { ProjectPreview } from "@/components/pipeline/dialogs/project-preview";
import type { BaseDialogProps } from "@/components/pipeline/dialogs/types";

export function WorkDialog({
  dialogRef,
  open,
  interactionProps,
}: BaseDialogProps) {
  const t = useTranslations("WorkDialog");
  const projects = getProjects((key) => t(key));
  const listRef = useRef<HTMLDivElement>(null);

  function scrollToEnd() {
    const list = listRef.current;

    if (!list) {
      return;
    }

    list.scrollTo({
      left: list.scrollWidth,
      behavior: "smooth",
    });
  }

  return (
    <div
      ref={dialogRef}
      data-testid="dialog-work"
      data-open={open ? "true" : "false"}
      className="work-dialog"
      {...interactionProps}
    >
      <div className="work-dialog__header">
        <strong>{t("title")}</strong>
      </div>
      <button
        type="button"
        className="work-dialog__scroll-button"
        aria-label={t("scrollToEnd")}
        onClick={scrollToEnd}
      >
        <span aria-hidden="true">{"\u00BB"}</span>
      </button>
      <div ref={listRef} className="work-dialog__list">
        {projects.map((project) => (
          <article key={project.name} className="work-dialog__item">
            <a
              className="work-dialog__item-link"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              <ProjectPreview
                name={project.name}
                url={project.url}
                imgUrl={project.imgUrl}
              />
              <div className="work-dialog__meta">
                <strong>{project.name}</strong>
                <small>{project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</small>
              </div>
            </a>
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
              {project.isRocket ? (
                <a
                  className="work-dialog__badge"
                  href={companyLinks.prorocketeers.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("companies.prorocketeers.label")}
                  <span className="work-dialog__badge-popup">
                    {t("companies.prorocketeers.message")}
                  </span>
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
