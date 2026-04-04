/* eslint-disable @next/next/no-img-element */

import { useTranslations } from "next-intl";

type ProjectPreviewProps = {
  name: string;
  url: string;
  imgUrl: string;
};

export function ProjectPreview({ name, url, imgUrl }: ProjectPreviewProps) {
  const t = useTranslations("WorkDialog");
  const hostname = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const accent = hostname.length % 3;
  const accentClass =
    accent === 0
      ? "work-dialog__preview--violet"
      : accent === 1
        ? "work-dialog__preview--cyan"
        : "work-dialog__preview--blue";



        
  return (
    <div
      className={`work-dialog__preview ${accentClass}${imgUrl ? " work-dialog__preview--image" : ""}`}
    >
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={`${name} preview`}
          className="work-dialog__preview-image"
        />
      ) : (
        <>
          <div className="work-dialog__browser">
            <span />
            <span />
            <span />
          </div>
          <div className="work-dialog__hero">
            <div className="work-dialog__hero-copy">
              <strong>{name}</strong>
              <small>{hostname}</small>
            </div>
            <div className="work-dialog__hero-badge">{t("previewBadge")}</div>
          </div>
          <div className="work-dialog__preview-grid">
            <div className="work-dialog__preview-panel work-dialog__preview-panel--wide" />
            <div className="work-dialog__preview-panel" />
            <div className="work-dialog__preview-panel" />
            <div className="work-dialog__preview-line" />
            <div className="work-dialog__preview-line work-dialog__preview-line--short" />
          </div>
        </>
      )}
    </div>
  );
}
