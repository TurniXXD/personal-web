import { useTranslations } from "next-intl";
import { getAboutCards } from "@/components/pipeline/config";
import type { BaseDialogProps } from "@/components/pipeline/dialogs/types";

export function AboutDialog({
  dialogRef,
  open,
  interactionProps,
}: BaseDialogProps) {
  const t = useTranslations("AboutDialog");
  const aboutCards = getAboutCards(t);

  return (
    <div
      ref={dialogRef}
      data-testid="dialog-about"
      data-open={open ? "true" : "false"}
      className="work-dialog work-dialog--about"
      {...interactionProps}
    >
      <div className="work-dialog__header">
        <strong>{t("title")}</strong>
      </div>
      <div className="about-dialog">
        <div className="about-dialog__list">
          {aboutCards.map((item) => (
            <article
              key={item.title}
              className={`about-dialog__item about-dialog__item--${item.accent}`}
            >
              <div className="about-dialog__icon" aria-hidden="true" />
              <div className="about-dialog__copy">
                <strong>{item.title}</strong>
                <small>{item.summary}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
