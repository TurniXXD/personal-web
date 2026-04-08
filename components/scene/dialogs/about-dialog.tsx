import classNames from "classnames";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { getAboutCards } from "@/components/scene/config";
import type { BaseDialogProps } from "@/components/scene/dialogs/types";

export const AboutDialog = ({
  dialogRef,
  open,
  interactionProps,
  onClose,
}: BaseDialogProps) => {
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
        <button
          type="button"
          className="work-dialog__close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X size={18} strokeWidth={2.2} />
        </button>
      </div>
      <div className="about-dialog">
        <div className="about-dialog__list">
          {aboutCards.map((item) => (
            <article
              key={item.title}
              className={classNames(
                "about-dialog__item",
                `about-dialog__item--${item.accent}`,
              )}
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
};
