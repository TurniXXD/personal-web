"use client";

import styles from "./ai-hero-visual.module.css";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  BookOpenCheck,
  Bot,
  ChartNoAxesCombined,
  Check,
  FileSpreadsheet,
  ReceiptText,
  ScrollText,
} from "lucide-react";
const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const aiInputClass =
  "absolute left-0 grid min-h-14 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[0.48rem] rounded-[0.9rem] border border-border-card bg-white/[0.96] px-[0.7rem] py-[0.68rem] text-primary shadow-[0_12px_30px_rgba(47,59,125,0.075)] [&>small]:font-mono [&>small]:text-[0.46rem] [&>small]:font-bold [&>small]:tracking-[0.06em] [&>small]:text-[#8a94b4] [&>span]:overflow-hidden [&>span]:text-ellipsis [&>span]:whitespace-nowrap [&>span]:text-[0.64rem] [&>span]:font-extrabold [&>span]:text-[#3e496e] max-[600px]:min-h-12 max-[600px]:grid-cols-[auto_minmax(0,1fr)] max-[600px]:gap-[0.35rem] max-[600px]:p-[0.48rem] max-[600px]:[&>small]:hidden max-[600px]:[&>span]:text-[0.53rem] max-[460px]:[&>span]:text-[0.49rem]";

const aiOutputClass =
  "absolute left-0 grid min-h-14 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-[0.9rem] border border-border-card bg-white/[0.96] px-[0.7rem] py-[0.68rem] text-primary shadow-[0_12px_30px_rgba(47,59,125,0.075)] [&>span]:grid [&>span]:min-w-0 [&>span]:gap-[0.08rem] [&_strong]:overflow-hidden [&_strong]:text-ellipsis [&_strong]:whitespace-nowrap [&_strong]:text-[0.61rem] [&_strong]:text-[#303a60] [&_small]:text-[0.49rem] [&_small]:text-[#818ba9] [&>svg:last-child]:text-[#47a685] max-[600px]:min-h-12 max-[600px]:gap-[0.3rem] max-[600px]:p-[0.48rem] max-[600px]:[&_strong]:text-[0.53rem] max-[600px]:[&_small]:text-[0.41rem] max-[600px]:[&>svg:last-child]:hidden max-[460px]:[&_strong]:text-[0.49rem] max-[460px]:[&_small]:hidden";

export const AiHeroVisual = () => {
  const t = useTranslations("aiHeroVisual");
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
      <div
        className="ai-pipeline__inputs absolute inset-y-0 left-0 z-[2] w-[8.8rem] max-[600px]:w-[5.2rem]"
        data-ai-visual-part
        data-x="-18"
      >
        <span className="ai-pipeline__label absolute top-[4%] left-[0.2rem] font-mono text-[0.54rem] font-extrabold tracking-[0.11em] text-primary uppercase max-[600px]:text-[0.43rem]">
          {t("inputs")}
        </span>
        <div
          className={`ai-pipeline__input ai-pipeline__input--invoice top-[16%] ${styles["ai-pipeline__input"]} ${aiInputClass}`}
        >
          <ReceiptText size={19} />
          <span>{t("invoices")}</span>
          <small>PDF</small>
        </div>
        <div
          className={`ai-pipeline__input ai-pipeline__input--contract top-[43%] ${styles["ai-pipeline__input"]} ${styles["ai-pipeline__input--contract"]} ${aiInputClass}`}
        >
          <ScrollText size={19} />
          <span>{t("contracts")}</span>
          <small>DOCX</small>
        </div>
        <div
          className={`ai-pipeline__input ai-pipeline__input--data top-[70%] ${styles["ai-pipeline__input"]} ${styles["ai-pipeline__input--data"]} ${aiInputClass}`}
        >
          <FileSpreadsheet size={19} />
          <span>{t("businessData")}</span>
          <small>XLSX</small>
        </div>
      </div>

      <div
        className={`ai-pipeline__core ${styles["ai-pipeline__core"]} absolute top-[32%] left-[39.5%] z-[4] grid min-h-36 w-[9.5rem] place-items-center rounded-3xl border border-[#aeb7ff] bg-[linear-gradient(145deg,#eef0ff,#fff)] px-[0.8rem] py-4 text-center text-primary shadow-[0_22px_55px_rgba(66,78,173,0.14)] transition-shadow duration-[240ms] [&>strong]:mt-[0.65rem] [&>strong]:text-body-sm [&>strong]:text-[#303a60] [&>span:not(.ai-pipeline__core-icon)]:mt-[0.22rem] [&>span:not(.ai-pipeline__core-icon)]:text-[0.54rem] [&>span:not(.ai-pipeline__core-icon)]:leading-[1.45] [&>span:not(.ai-pipeline__core-icon)]:text-[#737d9b] max-[600px]:top-[34%] max-[600px]:left-[34%] max-[600px]:min-h-[7.5rem] max-[600px]:w-[6.4rem] max-[600px]:px-[0.45rem] max-[600px]:py-3 max-[600px]:[&>strong]:mt-[0.45rem] max-[600px]:[&>strong]:text-[0.69rem] max-[600px]:[&>span:not(.ai-pipeline__core-icon)]:text-[0.43rem] max-[460px]:left-[33%] max-[460px]:w-[6.1rem]`}
        data-ai-visual-part
        data-y="-4"
        data-scale="0.035"
      >
        <span
          className={`ai-pipeline__core-icon ${styles["ai-pipeline__core-icon"]} grid size-12 place-items-center rounded-2xl border border-[rgba(95,108,255,0.3)] bg-[rgba(95,108,255,0.08)] max-[600px]:size-10`}
        >
          <Bot size={28} />
        </span>
        <strong>{t("pipelineName")}</strong>
        <span>{t("pipelineSteps")}</span>
        <div
          className={`ai-pipeline__core-status ${styles["ai-pipeline__core-status"]} mt-[0.65rem] flex gap-[0.3rem] [&>i]:size-[0.3rem] [&>i]:rounded-full [&>i]:bg-[#8390ff] max-[600px]:mt-[0.45rem]`}
        >
          <i />
          <i />
          <i />
        </div>
      </div>

      <div
        className="ai-pipeline__outputs absolute inset-y-0 right-0 z-[2] w-[8.6rem] max-[600px]:w-[5.4rem]"
        data-ai-visual-part
        data-x="20"
      >
        <span className="ai-pipeline__label absolute top-[4%] right-0 w-full text-right font-mono text-[0.54rem] font-extrabold tracking-[0.11em] text-primary uppercase max-[600px]:text-[0.43rem]">
          {t("outputs")}
        </span>
        <div
          className={`ai-pipeline__output ai-pipeline__output--invoice top-[10%] ${styles["ai-pipeline__output"]} ${aiOutputClass}`}
        >
          <ReceiptText size={17} />
          <span>
            <strong>{t("invoice")}</strong>
            <small>{t("lineItems")}</small>
          </span>
          <Check size={14} />
        </div>
        <div
          className={`ai-pipeline__output ai-pipeline__output--contract top-[31%] ${styles["ai-pipeline__output"]} ${styles["ai-pipeline__output--contract"]} ${aiOutputClass}`}
        >
          <ScrollText size={17} />
          <span>
            <strong>{t("contract")}</strong>
            <small>{t("summary")}</small>
          </span>
          <Check size={14} />
        </div>
        <div
          className={`ai-pipeline__output ai-pipeline__output--analysis top-[52%] ${styles["ai-pipeline__output"]} ${styles["ai-pipeline__output--analysis"]} ${aiOutputClass}`}
        >
          <ChartNoAxesCombined size={17} />
          <span>
            <strong>{t("analysis")}</strong>
            <small>{t("insights")}</small>
          </span>
          <Check size={14} />
        </div>
        <div
          className={`ai-pipeline__output ai-pipeline__output--docs top-[73%] ${styles["ai-pipeline__output"]} ${styles["ai-pipeline__output--docs"]} ${aiOutputClass}`}
        >
          <BookOpenCheck size={17} />
          <span>
            <strong>{t("documentation")}</strong>
            <small>{t("ready")}</small>
          </span>
          <Check size={14} />
        </div>
      </div>
    </div>
  );
};
