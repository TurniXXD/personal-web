"use client";

import styles from "./interactive-hero-art.module.css";

import { useEffect, useRef } from "react";
import {
  BarChart3,
  Bot,
  Boxes,
  Code2,
  Gauge,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useTranslations } from "next-intl";

type ClampParams = {
  max: number;
  min: number;
  value: number;
};

type PointerMoveHandler = (event: PointerEvent) => void;

const clamp = ({ value, min, max }: ClampParams) =>
  Math.min(Math.max(value, min), max);

export function InteractiveHeroArt() {
  const artRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("homeUi.heroVisual");

  useEffect(() => {
    const art = artRef.current;
    if (!art) return;
    const hero = art.closest<HTMLElement>(".hero");
    if (!hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let targetX = 0;
    let targetY = 0;
    let targetScroll = 0;
    let currentX = 0;
    let currentY = 0;
    let currentFloatX = 0;
    let currentFloatY = 0;
    let currentScroll = 0;
    let frame = 0;
    let pointerInsideHero = false;

    const render = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      currentFloatX += (targetX - currentFloatX) * 0.055;
      currentFloatY += (targetY - currentFloatY) * 0.055;
      currentScroll += (targetScroll - currentScroll) * 0.07;

      art.style.setProperty("--hero-window-x", `${currentX * 16}px`);
      art.style.setProperty(
        "--hero-window-y",
        `${currentY * 12 - currentScroll * 48}px`,
      );
      art.style.setProperty(
        "--hero-window-rotate-x",
        `${currentY * -0.8 - currentScroll * 0.8}deg`,
      );
      art.style.setProperty(
        "--hero-window-rotate-y",
        `${currentX + currentScroll * 0.6}deg`,
      );
      art.style.setProperty("--hero-ambient-one-x", `${currentX * -18}px`);
      art.style.setProperty(
        "--hero-ambient-one-y",
        `${currentY * -14 - currentScroll * 30}px`,
      );
      art.style.setProperty("--hero-ambient-two-x", `${currentX * 14}px`);
      art.style.setProperty(
        "--hero-ambient-two-y",
        `${currentY * 12 + currentScroll * 22}px`,
      );
      art.style.setProperty(
        "--hero-ambient-one-scale",
        `${1 + currentScroll * 0.04}`,
      );
      art.style.setProperty(
        "--hero-ambient-two-scale",
        `${1 + currentScroll * 0.07}`,
      );
      art.style.setProperty("--hero-orbit-one-x", `${currentX * -10}px`);
      art.style.setProperty(
        "--hero-orbit-one-y",
        `${currentY * -8 - currentScroll * 28}px`,
      );
      art.style.setProperty("--hero-orbit-two-x", `${currentX * 8}px`);
      art.style.setProperty(
        "--hero-orbit-two-y",
        `${currentY * 6 + currentScroll * 64}px`,
      );
      art.style.setProperty(
        "--hero-orbit-one-scale",
        `${1 + currentScroll * 0.02}`,
      );
      art.style.setProperty(
        "--hero-orbit-two-scale",
        `${1 + currentScroll * 0.04}`,
      );
      art.style.setProperty(
        "--hero-float-top-x",
        `${currentFloatX * 22 + currentScroll * 14}px`,
      );
      art.style.setProperty(
        "--hero-float-top-y",
        `${currentFloatY * 16 - currentScroll * 54}px`,
      );
      art.style.setProperty(
        "--hero-float-middle-x",
        `${currentFloatX * -18 - currentScroll * 12}px`,
      );
      art.style.setProperty(
        "--hero-float-middle-y",
        `${currentFloatY * -13 - currentScroll * 38}px`,
      );
      art.style.setProperty(
        "--hero-float-bottom-x",
        `${currentFloatX * 15 + currentScroll * 10}px`,
      );
      art.style.setProperty(
        "--hero-float-bottom-y",
        `${currentFloatY * -10 - currentScroll * 30}px`,
      );
      art.style.setProperty("--hero-sidebar-y", `${currentScroll * -16}px`);
      art.style.setProperty("--hero-stats-y", `${currentScroll * 8}px`);
      art.style.setProperty("--hero-chart-y", `${currentScroll * 18}px`);

      const isMoving =
        Math.abs(targetX - currentX) > 0.001 ||
        Math.abs(targetY - currentY) > 0.001 ||
        Math.abs(targetX - currentFloatX) > 0.001 ||
        Math.abs(targetY - currentFloatY) > 0.001 ||
        Math.abs(targetScroll - currentScroll) > 0.001;

      frame = isMoving ? window.requestAnimationFrame(render) : 0;
    };

    const scheduleRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const updateScroll = () => {
      targetScroll = clamp({
        value: window.scrollY / Math.max(hero.offsetHeight * 0.68, 1),
        min: 0,
        max: 1,
      });
      scheduleRender();
    };

    const handlePointerMove: PointerMoveHandler = (event) => {
      if (event.pointerType === "touch") return;
      const rect = hero.getBoundingClientRect();
      const isInsideHero =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInsideHero) {
        if (!pointerInsideHero) return;
        pointerInsideHero = false;
        targetX = 0;
        targetY = 0;
        scheduleRender();
        return;
      }

      pointerInsideHero = true;
      targetX = clamp({
        value: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        min: -1,
        max: 1,
      });
      targetY = clamp({
        value: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
        min: -1,
        max: 1,
      });
      scheduleRender();
    };

    const handleWindowBlur = () => {
      pointerInsideHero = false;
      targetX = 0;
      targetY = 0;
      scheduleRender();
    };

    updateScroll();
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("scroll", updateScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={`${styles["hero-art"]} relative grid min-h-[29rem] place-items-center [perspective:75rem] max-[900px]:hidden`}
      aria-hidden="true"
      ref={artRef}
    >
      <div
        className={`${styles["hero-art__ambient"]} ${styles["hero-art__ambient--one"]} pointer-events-none absolute top-[8%] right-[3%] size-[24rem] rounded-full bg-primary/10 blur-3xl`}
      />
      <div
        className={`${styles["hero-art__ambient"]} ${styles["hero-art__ambient--two"]} pointer-events-none absolute bottom-[6%] left-[8%] size-72 rounded-full bg-secondary blur-3xl`}
      />
      <div
        className={`${styles["hero-art__orbit-layer"]} ${styles["hero-art__orbit-layer--one"]} pointer-events-none absolute inset-0 z-[1] grid place-items-center will-change-transform`}
      >
        <div
          className={`${styles["hero-art__orbit"]} ${styles["hero-art__orbit--one"]} relative size-[29rem] rounded-full border border-primary/15 max-[1100px]:size-[26rem]`}
        >
          <span className="absolute top-[-0.25rem] left-[calc(50%-0.25rem)] size-2 rounded-full bg-primary shadow-[0_0_0_0.32rem_rgba(79,93,224,0.1)]" />
        </div>
      </div>
      <div
        className={`${styles["hero-art__orbit-layer"]} ${styles["hero-art__orbit-layer--two"]} pointer-events-none absolute inset-0 z-[1] grid place-items-center will-change-transform`}
      >
        <div
          className={`${styles["hero-art__orbit"]} ${styles["hero-art__orbit--two"]} relative size-[38rem] rounded-full border border-primary/15 max-[1100px]:size-[34rem]`}
        >
          <span className="absolute top-[-0.25rem] left-[calc(50%-0.25rem)] size-2 rounded-full bg-primary shadow-[0_0_0_0.32rem_rgba(79,93,224,0.1)]" />
        </div>
      </div>

      <div
        className={`${styles["hero-art__window-layer"]} relative z-[2] grid w-full place-items-center will-change-transform`}
      >
        <div className="relative w-[min(94%,31rem)] -rotate-2 overflow-hidden rounded-[1.25rem] border border-border-card bg-card shadow-[0_2rem_4.5rem_rgba(36,46,94,0.15),0_0.25rem_1rem_rgba(36,46,94,0.06)]">
          <div className="flex min-h-10 items-center gap-1.5 border-b border-border-soft bg-background/80 px-4 [&>span]:size-1.5 [&>span]:rounded-full [&>span]:bg-border [&>span:first-child]:bg-primary/60">
            <span />
            <span />
            <span />
            <i className="ml-auto font-mono text-ui-2xs not-italic text-ink-soft">
              {t("product")}
            </i>
          </div>

          <div className="grid min-h-[21rem] grid-cols-[7rem_minmax(0,1fr)]">
            <aside
              className={`${styles["hero-art__sidebar"]} border-r border-border-soft bg-background/75 px-2.5 py-4 will-change-transform`}
            >
              <div className="mb-5 flex items-center gap-2 px-1.5 text-[0.62rem] font-extrabold text-ink-strong">
                <span className="grid size-6 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles size={12} strokeWidth={2.2} />
                </span>
                {t("productName")}
              </div>
              <div className="grid gap-1 text-[0.57rem] font-semibold text-ink-soft">
                <span className="flex items-center gap-2 rounded-lg bg-secondary px-2 py-2 text-primary">
                  <LayoutDashboard size={12} />
                  {t("navigation.dashboard")}
                </span>
                <span className="flex items-center gap-2 px-2 py-2">
                  <BarChart3 size={12} />
                  {t("navigation.analytics")}
                </span>
                <span className="flex items-center gap-2 px-2 py-2">
                  <Workflow size={12} />
                  {t("navigation.automations")}
                </span>
                <span className="flex items-center gap-2 px-2 py-2">
                  <Boxes size={12} />
                  {t("navigation.integrations")}
                </span>
              </div>
            </aside>

            <div className="min-w-0 bg-card px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[1rem] font-extrabold tracking-[-0.035em] text-ink-strong">
                    {t("title")}
                  </p>
                  <p className="mt-1 text-[0.56rem] text-ink-soft">
                    {t("subtitle")}
                  </p>
                </div>
                <span className="rounded-lg border border-border-soft bg-background px-2.5 py-1.5 text-[0.53rem] font-semibold text-ink-muted">
                  {t("period")}
                </span>
              </div>

              <div
                className={`${styles["hero-art__stats"]} mt-4 grid grid-cols-3 gap-2 will-change-transform`}
              >
                <div className="rounded-xl border border-border-soft bg-background/65 p-2.5">
                  <span className="text-[0.52rem] text-ink-soft">
                    {t("metrics.users.label")}
                  </span>
                  <strong className="mt-1.5 block text-[0.95rem] tracking-[-0.04em] text-ink-strong">
                    {t("metrics.users.value")}
                  </strong>
                  <small className="mt-1 block text-[0.5rem] font-bold text-emerald-500">
                    {t("metrics.users.change")}
                  </small>
                </div>
                <div className="rounded-xl border border-border-soft bg-background/65 p-2.5">
                  <span className="text-[0.52rem] text-ink-soft">
                    {t("metrics.conversions.label")}
                  </span>
                  <strong className="mt-1.5 block text-[0.95rem] tracking-[-0.04em] text-ink-strong">
                    {t("metrics.conversions.value")}
                  </strong>
                  <small className="mt-1 block text-[0.5rem] font-bold text-emerald-500">
                    {t("metrics.conversions.change")}
                  </small>
                </div>
                <div className="rounded-xl border border-border-soft bg-background/65 p-2.5">
                  <span className="text-[0.52rem] text-ink-soft">
                    {t("metrics.time.label")}
                  </span>
                  <strong className="mt-1.5 block text-[0.95rem] tracking-[-0.04em] text-ink-strong">
                    {t("metrics.time.value")}
                  </strong>
                  <small className="mt-1 block text-[0.5rem] font-bold text-emerald-500">
                    {t("metrics.time.change")}
                  </small>
                </div>
              </div>

              <div
                className={`${styles["hero-art__chart"]} mt-3 rounded-xl border border-border-soft bg-background/55 px-3 pt-3 pb-2 will-change-transform`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.52rem] font-semibold text-ink-muted">
                    {t("chartLabel")}
                  </span>
                  <span className="rounded-full bg-primary px-2 py-1 text-[0.49rem] font-bold text-primary-foreground shadow-sm">
                    {t("chartChange")}
                  </span>
                </div>
                <svg
                  className="mt-1 h-[5.6rem] w-full overflow-visible"
                  viewBox="0 0 320 112"
                  fill="none"
                >
                  <defs>
                    <linearGradient
                      id="hero-chart-fill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop stopColor="var(--brand)" stopOpacity="0.22" />
                      <stop
                        offset="1"
                        stopColor="var(--brand)"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M6 94C31 91 34 63 60 70C82 76 88 98 112 86C135 74 143 42 169 48C189 53 191 73 211 70C235 66 235 41 261 48C279 53 292 40 314 31V108H6V94Z"
                    fill="url(#hero-chart-fill)"
                  />
                  <path
                    className={styles["hero-art__chart-line"]}
                    d="M6 94C31 91 34 63 60 70C82 76 88 98 112 86C135 74 143 42 169 48C189 53 191 73 211 70C235 66 235 41 261 48C279 53 292 40 314 31"
                    stroke="var(--brand)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="314" cy="31" r="4" fill="var(--brand)" />
                  <circle
                    cx="314"
                    cy="31"
                    r="8"
                    fill="var(--brand)"
                    fillOpacity="0.14"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${styles["hero-art__floating"]} ${styles["hero-art__floating--top"]} absolute top-2 right-0 z-[3] flex max-w-[11.5rem] items-start gap-2.5 rounded-2xl border border-border-soft bg-card/95 p-3 shadow-[0_1rem_2.2rem_rgba(36,46,94,0.11)] backdrop-blur-sm will-change-transform`}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
          <Bot size={15} />
        </span>
        <span>
          <strong className="block text-[0.66rem] text-ink-strong">
            {t("cards.automation.title")}
          </strong>
          <small className="mt-1 block text-[0.52rem] leading-[1.4] text-ink-soft">
            {t("cards.automation.description")}
          </small>
        </span>
      </div>

      <div
        className={`${styles["hero-art__floating"]} ${styles["hero-art__floating--middle"]} absolute bottom-[2.8rem] left-0 z-[3] flex max-w-[11.5rem] items-start gap-2.5 rounded-2xl border border-border-soft bg-card/95 p-3 shadow-[0_1rem_2.2rem_rgba(36,46,94,0.11)] backdrop-blur-sm will-change-transform`}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
          <Code2 size={15} />
        </span>
        <span>
          <strong className="block text-[0.66rem] text-ink-strong">
            {t("cards.applications.title")}
          </strong>
          <small className="mt-1 block text-[0.52rem] leading-[1.4] text-ink-soft">
            {t("cards.applications.description")}
          </small>
        </span>
      </div>

      <div
        className={`${styles["hero-art__floating"]} ${styles["hero-art__floating--bottom"]} absolute right-0 bottom-0 z-[3] flex max-w-[11.5rem] items-start gap-2.5 rounded-2xl border border-border-soft bg-card/95 p-3 shadow-[0_1rem_2.2rem_rgba(36,46,94,0.11)] backdrop-blur-sm will-change-transform`}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
          <ShieldCheck size={15} />
        </span>
        <span>
          <strong className="flex items-center gap-1.5 text-[0.66rem] text-ink-strong">
            {t("cards.audits.title")}
            <Gauge size={11} className="text-primary" />
          </strong>
          <small className="mt-1 block text-[0.52rem] leading-[1.4] text-ink-soft">
            {t("cards.audits.description")}
          </small>
        </span>
      </div>
    </div>
  );
}
