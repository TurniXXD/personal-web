"use client";

import { useEffect, useRef } from "react";
import {
  BookOpenCheck,
  Bot,
  ChartNoAxesCombined,
  Check,
  FileSpreadsheet,
  ReceiptText,
  ScrollText,
} from "lucide-react";
import type { Locale } from "@/lib/content";

type AiHeroVisualProps = {
  locale: Locale;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

export const AiHeroVisual = ({ locale }: AiHeroVisualProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!root || reducedMotion.matches) {
      return;
    }

    const parts = Array.from(
      root.querySelectorAll<HTMLElement>("[data-ai-visual-part]"),
    );
    let frame = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    let start = 0;
    let distance = 1;
    let movementScale = 1;

    const applyProgress = (progress: number) => {
      root.style.setProperty("--ai-visual-progress", progress.toFixed(4));
      root.dataset.scrollProgress = progress.toFixed(3);

      parts.forEach((part) => {
        const x = Number(part.dataset.x ?? 0) * progress * movementScale;
        const y = Number(part.dataset.y ?? 0) * progress * movementScale;
        const rotate = Number(part.dataset.rotate ?? 0) * progress;
        const scale = 1 + Number(part.dataset.scale ?? 0) * progress;
        part.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
      });
    };

    const animate = () => {
      currentProgress += (targetProgress - currentProgress) * 0.15;

      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
        applyProgress(currentProgress);
        frame = 0;
        return;
      }

      applyProgress(currentProgress);
      frame = window.requestAnimationFrame(animate);
    };

    const updateTarget = () => {
      targetProgress = clamp((window.scrollY - start) / distance, 0, 1);
      if (!frame) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const measure = () => {
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      start = Math.max(0, rootTop - Math.min(390, window.innerHeight * 0.44));
      distance = clamp(root.offsetHeight * 0.72, 260, 420);
      movementScale = clamp(root.offsetWidth / 520, 0.62, 1);
      updateTarget();
    };

    const layout = root.closest<HTMLElement>(".service-hero__grid");
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(root);
    if (layout) {
      resizeObserver.observe(layout);
    }

    applyProgress(0);
    measure();
    void document.fonts?.ready.then(measure);
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", measure);
      resizeObserver.disconnect();
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="service-hero-visual service-hero-visual--ai"
      data-ai-visual="scroll-apart"
      data-scroll-progress="0.000"
      aria-hidden="true"
    >
      <div className="ai-pipeline__inputs" data-ai-visual-part data-x="-18">
        <span className="ai-pipeline__label">
          {locale === "cs" ? "Vstupy" : "Inputs"}
        </span>
        <div className="ai-pipeline__input ai-pipeline__input--invoice">
          <ReceiptText size={19} />
          <span>{locale === "cs" ? "Faktury" : "Invoices"}</span>
          <small>PDF</small>
        </div>
        <div className="ai-pipeline__input ai-pipeline__input--contract">
          <ScrollText size={19} />
          <span>{locale === "cs" ? "Smlouvy" : "Contracts"}</span>
          <small>DOCX</small>
        </div>
        <div className="ai-pipeline__input ai-pipeline__input--data">
          <FileSpreadsheet size={19} />
          <span>{locale === "cs" ? "Firemní data" : "Business data"}</span>
          <small>XLSX</small>
        </div>
      </div>

      <div
        className="ai-pipeline__core"
        data-ai-visual-part
        data-y="-4"
        data-scale="0.035"
      >
        <span className="ai-pipeline__core-icon">
          <Bot size={28} />
        </span>
        <strong>AI pipeline</strong>
        <span>
          {locale === "cs"
            ? "čtení · extrakce · kontrola"
            : "read · extract · review"}
        </span>
        <div className="ai-pipeline__core-status">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="ai-pipeline__outputs" data-ai-visual-part data-x="20">
        <span className="ai-pipeline__label">
          {locale === "cs" ? "Zpracované výstupy" : "Processed outputs"}
        </span>
        <div className="ai-pipeline__output ai-pipeline__output--invoice">
          <ReceiptText size={17} />
          <span>
            <strong>{locale === "cs" ? "Faktura" : "Invoice"}</strong>
            <small>{locale === "cs" ? "8 položek" : "8 line items"}</small>
          </span>
          <Check size={14} />
        </div>
        <div className="ai-pipeline__output ai-pipeline__output--contract">
          <ScrollText size={17} />
          <span>
            <strong>{locale === "cs" ? "Smlouva" : "Contract"}</strong>
            <small>{locale === "cs" ? "shrnutí" : "summary"}</small>
          </span>
          <Check size={14} />
        </div>
        <div className="ai-pipeline__output ai-pipeline__output--analysis">
          <ChartNoAxesCombined size={17} />
          <span>
            <strong>{locale === "cs" ? "Analýza" : "Analysis"}</strong>
            <small>{locale === "cs" ? "3 zjištění" : "3 insights"}</small>
          </span>
          <Check size={14} />
        </div>
        <div className="ai-pipeline__output ai-pipeline__output--docs">
          <BookOpenCheck size={17} />
          <span>
            <strong>{locale === "cs" ? "Dokumentace" : "Documentation"}</strong>
            <small>{locale === "cs" ? "připravena" : "ready"}</small>
          </span>
          <Check size={14} />
        </div>
      </div>
    </div>
  );
};
