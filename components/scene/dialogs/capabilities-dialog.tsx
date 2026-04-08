import classNames from "classnames";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { getCapabilityCards } from "@/lib/site-data";
import type { BaseDialogProps } from "@/components/scene/dialogs/types";

export const CapabilitiesDialog = ({
  dialogRef,
  open,
  interactionProps,
  onClose,
}: BaseDialogProps) => {
  const t = useTranslations("CapabilitiesDialog");
  const capabilityCards = getCapabilityCards((key) => t(key));
  const listRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const list = listRef.current;

    if (!list || !open) {
      setHasOverflow(false);
      return;
    }

    const syncOverflowState = () => {
      setHasOverflow(list.scrollWidth - list.clientWidth > 8);
    };

    syncOverflowState();

    const resizeObserver = new ResizeObserver(syncOverflowState);
    resizeObserver.observe(list);

    window.addEventListener("resize", syncOverflowState);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncOverflowState);
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
      data-testid="dialog-capabilities"
      data-open={open ? "true" : "false"}
      className="work-dialog work-dialog--capabilities"
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
      {hasOverflow ? (
        <button
          type="button"
          className="work-dialog__scroll-button"
          aria-label={t("scrollToEnd")}
          onClick={scrollToEnd}
        >
          <span aria-hidden="true">{"\u00BB"}</span>
        </button>
      ) : null}
      <div
        ref={listRef}
        className={classNames(
          "work-dialog__list",
          hasOverflow && "work-dialog__list--scroll-tail",
        )}
      >
        {capabilityCards.map((capability) => (
          <article key={capability.title} className="work-dialog__item">
            <div className="work-dialog__meta">
              <strong>{capability.title}</strong>
              <small>{capability.summary}</small>
            </div>
            <div className="work-dialog__badges">
              {capability.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
