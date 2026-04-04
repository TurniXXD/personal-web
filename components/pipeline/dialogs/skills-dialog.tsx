import { useRef } from "react";
import { useTranslations } from "next-intl";
import { getSkillCards } from "@/lib/site-data";
import type { BaseDialogProps } from "@/components/pipeline/dialogs/types";

export function SkillsDialog({
  dialogRef,
  open,
  interactionProps,
}: BaseDialogProps) {
  const t = useTranslations("CapabilitiesDialog");
  const skillCards = getSkillCards((key) => t(key));
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
      data-testid="dialog-skills"
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
        {skillCards.map((skill) => (
          <article key={skill.title} className="work-dialog__item">
            <div className={`work-dialog__preview work-dialog__preview--${skill.accent}`}>
              <div className="work-dialog__browser">
                <span />
                <span />
                <span />
              </div>
              <div className="work-dialog__hero">
                <div className="work-dialog__hero-copy">
                  <strong>{skill.title}</strong>
                  <small>{skill.label}</small>
                </div>
                <div className="work-dialog__hero-badge">{t("capabilityBadge")}</div>
              </div>
              <div className="work-dialog__preview-grid work-dialog__preview-grid--skills">
                {skill.items.slice(0, 4).map((item) => (
                  <div key={item} className="work-dialog__preview-skillchip">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="work-dialog__meta">
              <strong>{skill.title}</strong>
              <small>{skill.summary}</small>
            </div>
            <div className="work-dialog__badges">
              {skill.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
