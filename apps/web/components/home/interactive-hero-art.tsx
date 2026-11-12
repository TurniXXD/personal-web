"use client";

import styles from "./interactive-hero-art.module.css";

import { useEffect, useRef } from "react";
import { Bot, Code2, Gauge, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { HeroDashboard } from "@/components/home/hero-dashboard";

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
      data-home-hero-art
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
          className={`relative size-[29rem] rounded-full border border-primary/15 max-[1100px]:size-[26rem]`}
          data-home-hero-orbit
        >
          <span className="absolute top-[-0.25rem] left-[calc(50%-0.25rem)] size-2 rounded-full bg-primary shadow-[0_0_0_0.32rem_rgba(79,93,224,0.1)]" />
        </div>
      </div>
      <div
        className={`${styles["hero-art__orbit-layer"]} ${styles["hero-art__orbit-layer--two"]} pointer-events-none absolute inset-0 z-[1] grid place-items-center will-change-transform`}
      >
        <div
          className={`relative size-[38rem] rounded-full border border-primary/15 max-[1100px]:size-[34rem]`}
          data-home-hero-orbit
        >
          <span className="absolute top-[-0.25rem] left-[calc(50%-0.25rem)] size-2 rounded-full bg-primary shadow-[0_0_0_0.32rem_rgba(79,93,224,0.1)]" />
        </div>
      </div>

      <div
        className={`${styles["hero-art__window-layer"]} relative z-[2] grid w-full place-items-center will-change-transform`}
        data-home-hero-window
      >
        <div className="relative w-[min(94%,31rem)] -rotate-2">
          <HeroDashboard />
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
