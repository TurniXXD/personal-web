import { useRef } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { getProjects } from "@/lib/site-data";
import { getDisplayHostname } from "@/lib/url";
import { companyLinks } from "@/components/scene/config";
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
      className="work-dialog"
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
        {projects.map((project) => {
          const projectHostname = getDisplayHostname(project.url);

          return (
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
                  <small>{projectHostname}</small>
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
    </div>
  );
};
