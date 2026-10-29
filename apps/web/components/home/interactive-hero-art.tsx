"use client";

import styles from "./interactive-hero-art.module.css";

import { useEffect, useRef } from "react";
import { Blocks, Code2, Workflow } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function InteractiveHeroArt() {
  const artRef = useRef<HTMLDivElement>(null);

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
    let currentScroll = 0;
    let frame = 0;
    let pointerInsideHero = false;

    const render = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      currentScroll += (targetScroll - currentScroll) * 0.1;

      art.style.setProperty("--hero-window-x", `${currentX * 24}px`);
      art.style.setProperty(
        "--hero-window-y",
        `${currentY * 18 - currentScroll * 12}px`,
      );
      art.style.setProperty("--hero-window-rotate-x", `${currentY * -1.2}deg`);
      art.style.setProperty("--hero-window-rotate-y", `${currentX * 1.5}deg`);
      art.style.setProperty("--hero-orbit-one-x", `${currentX * -16}px`);
      art.style.setProperty(
        "--hero-orbit-one-y",
        `${currentY * -12 - currentScroll * 18}px`,
      );
      art.style.setProperty("--hero-orbit-two-x", `${currentX * 12}px`);
      art.style.setProperty(
        "--hero-orbit-two-y",
        `${currentY * 10 + currentScroll * 8}px`,
      );
      art.style.setProperty(
        "--hero-orbit-one-scale",
        `${1 + currentScroll * 0.035}`,
      );
      art.style.setProperty(
        "--hero-orbit-two-scale",
        `${1 + currentScroll * 0.065}`,
      );
      art.style.setProperty(
        "--hero-float-top-x",
        `${currentX * 36 + currentScroll * 22}px`,
      );
      art.style.setProperty(
        "--hero-float-top-y",
        `${currentY * 28 - currentScroll * 26}px`,
      );
      art.style.setProperty(
        "--hero-float-bottom-x",
        `${currentX * -28 - currentScroll * 22}px`,
      );
      art.style.setProperty(
        "--hero-float-bottom-y",
        `${currentY * -20 + currentScroll * 22}px`,
      );
      art.style.setProperty("--hero-label-y", `${currentScroll * -10}px`);
      art.style.setProperty("--hero-headline-y", `${currentScroll * -5}px`);
      art.style.setProperty("--hero-diagram-y", `${currentScroll * 5}px`);
      art.style.setProperty("--hero-bars-y", `${currentScroll * 12}px`);
      art.style.setProperty("--hero-scroll-progress", `${currentScroll}`);

      const isMoving =
        Math.abs(targetX - currentX) > 0.001 ||
        Math.abs(targetY - currentY) > 0.001 ||
        Math.abs(targetScroll - currentScroll) > 0.001;

      frame = isMoving ? window.requestAnimationFrame(render) : 0;
    };

    const scheduleRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const updateScroll = () => {
      const rect = art.getBoundingClientRect();
      const travelled = Math.max(0, -rect.top);
      targetScroll = clamp(travelled / Math.max(rect.height, 1), 0, 1);
      scheduleRender();
    };

    const handlePointerMove = (event: PointerEvent) => {
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
      targetX = clamp(
        ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        -1,
        1,
      );
      targetY = clamp(
        ((event.clientY - rect.top) / rect.height - 0.5) * 2,
        -1,
        1,
      );
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
      className={`hero-art ${styles["hero-art"]} relative grid min-h-[29rem] place-items-center [perspective:75rem] max-[900px]:hidden max-[460px]:min-h-60`}
      aria-hidden="true"
      ref={artRef}
    >
      <div
        className={`hero-art__orbit-layer hero-art__orbit-layer--one ${styles["hero-art__orbit-layer"]} ${styles["hero-art__orbit-layer--one"]} pointer-events-none absolute inset-0 grid place-items-center will-change-transform`}
      >
        <div
          className={`hero-art__orbit hero-art__orbit--one ${styles["hero-art__orbit"]} ${styles["hero-art__orbit--one"]} relative size-[28rem] rounded-full border border-[rgba(95,108,255,0.16)] will-change-transform max-[1000px]:size-[23rem] max-[900px]:size-80`}
        >
          <span
            className={`hero-art__planet ${styles["hero-art__planet"]} absolute top-[-0.28rem] left-[calc(50%-0.28rem)] size-[0.55rem] rounded-full bg-primary shadow-[0_0_0_0.35rem_rgba(95,108,255,0.1)]`}
          />
        </div>
      </div>
      <div
        className={`hero-art__orbit-layer hero-art__orbit-layer--two ${styles["hero-art__orbit-layer"]} ${styles["hero-art__orbit-layer--two"]} pointer-events-none absolute inset-0 grid place-items-center will-change-transform`}
      >
        <div
          className={`hero-art__orbit hero-art__orbit--two ${styles["hero-art__orbit"]} ${styles["hero-art__orbit--two"]} relative size-[37rem] rounded-full border border-[rgba(95,108,255,0.16)] will-change-transform max-[1000px]:size-[30rem] max-[900px]:size-[26rem]`}
        >
          <span
            className={`hero-art__planet ${styles["hero-art__planet"]} absolute top-[-0.28rem] left-[calc(50%-0.28rem)] size-[0.55rem] rounded-full bg-primary shadow-[0_0_0_0.35rem_rgba(95,108,255,0.1)]`}
          />
        </div>
      </div>
      <div
        className={`hero-art__window-layer ${styles["hero-art__window-layer"]} relative z-[2] grid w-full place-items-center will-change-transform`}
      >
        <div
          className={`hero-art__window ${styles["hero-art__window"]} relative w-[min(100%,30rem)] -rotate-3 overflow-hidden rounded-[1.35rem] border border-[#cdd3f5] bg-white shadow-[0_34px_75px_rgba(58,66,143,0.18),0_2px_10px_rgba(58,66,143,0.08)] max-[900px]:w-[min(92%,26rem)]`}
        >
          <div className="hero-art__window-bar flex min-h-[2.4rem] items-center gap-[0.34rem] border-b border-[#e6e9fb] bg-[#f9faff] px-4 [&>i]:ml-auto [&>i]:font-mono [&>i]:text-[0.62rem] [&>i]:not-italic [&>i]:text-[#9ca4c6] [&>span]:size-[0.42rem] [&>span]:rounded-full [&>span]:bg-[#c7ceeb] [&>span:first-child]:bg-[#a8afff]">
            <span />
            <span />
            <span />
            <i>vantuch.dev</i>
          </div>
          <div className="hero-art__window-body px-[2.2rem] pt-[2.4rem] pb-10 max-[900px]:p-6 max-[460px]:p-[1.2rem]">
            <span
              className={`hero-art__mini-label ${styles["hero-art__mini-label"]} inline-block font-mono text-[0.62rem] font-bold tracking-[0.12em] text-primary will-change-transform`}
            >
              BUILD / CONNECT / GROW
            </span>
            <div
              className={`hero-art__headline ${styles["hero-art__headline"]} my-[1.4rem] mb-[2.3rem] grid gap-[0.65rem] will-change-transform [&>span]:h-4 [&>span]:rounded-[0.3rem] [&>span]:bg-[#222a49] [&>span:first-child]:w-[83%] [&>span:last-child]:w-[61%]`}
            >
              <span />
              <span />
            </div>
            <div
              className={`hero-art__diagram ${styles["hero-art__diagram"]} flex items-center justify-between will-change-transform [&>div]:grid [&>div]:size-[3.7rem] [&>div]:place-items-center [&>div]:rounded-2xl [&>div]:border [&>div]:border-[#dfe3fc] [&>div]:bg-[#f5f6ff] [&>div]:text-primary max-[460px]:[&>div]:size-[2.7rem] max-[460px]:[&>div]:rounded-xl`}
            >
              <div>
                <Code2 size={21} />
              </div>
              <span className="hero-art__connection h-0.5 flex-1 bg-[repeating-linear-gradient(90deg,#b1baff_0_5px,transparent_5px_10px)]" />
              <div>
                <Workflow size={21} />
              </div>
              <span className="hero-art__connection h-0.5 flex-1 bg-[repeating-linear-gradient(90deg,#b1baff_0_5px,transparent_5px_10px)]" />
              <div>
                <Blocks size={21} />
              </div>
            </div>
            <div
              className={`hero-art__bars ${styles["hero-art__bars"]} mt-[2.2rem] grid gap-2 will-change-transform [&>span]:h-[0.45rem] [&>span]:rounded-full [&>span]:bg-[#e6e9fa] [&>span:nth-child(2)]:w-[82%] [&>span:nth-child(3)]:w-[56%]`}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`hero-art__floating hero-art__floating--top ${styles["hero-art__floating"]} ${styles["hero-art__floating--top"]} absolute top-6 right-0 z-[3] flex items-center gap-[0.55rem] rounded-[0.8rem] border border-border-soft bg-white px-[0.9rem] py-[0.7rem] font-mono text-body font-extrabold text-primary shadow-[0_16px_32px_rgba(77,84,150,0.12)] will-change-transform [&>span]:text-ui-2xs [&>span]:tracking-ui [&>span]:text-[#3e4768] max-[900px]:top-0 max-[900px]:right-[0.3rem] max-[460px]:px-[0.6rem] max-[460px]:py-[0.45rem] max-[460px]:text-ui-xs max-[460px]:[&>span]:text-[0.55rem]`}
      >
        01 <span>WEB</span>
      </div>
      <div
        className={`hero-art__floating hero-art__floating--middle ${styles["hero-art__floating"]} ${styles["hero-art__floating--middle"]} absolute top-[49%] right-[-1.3rem] z-[3] flex items-center gap-[0.55rem] rounded-[0.8rem] border border-border-soft bg-white px-[0.9rem] py-[0.7rem] font-mono text-body font-extrabold text-primary shadow-[0_16px_32px_rgba(77,84,150,0.12)] will-change-transform [&>span]:text-ui-2xs [&>span]:tracking-ui [&>span]:text-[#3e4768] max-[460px]:px-[0.6rem] max-[460px]:py-[0.45rem] max-[460px]:text-ui-xs max-[460px]:[&>span]:text-[0.55rem]`}
      >
        02 <span>AUTOMATION</span>
      </div>
      <div
        className={`hero-art__floating hero-art__floating--bottom ${styles["hero-art__floating"]} ${styles["hero-art__floating--bottom"]} absolute bottom-[1.2rem] left-[-1.2rem] z-[3] flex items-center gap-[0.55rem] rounded-[0.8rem] border border-border-soft bg-white px-[0.9rem] py-[0.7rem] font-mono text-body font-extrabold text-primary shadow-[0_16px_32px_rgba(77,84,150,0.12)] will-change-transform [&>span]:text-ui-2xs [&>span]:tracking-ui [&>span]:text-[#3e4768] max-[900px]:bottom-0 max-[900px]:left-0 max-[460px]:px-[0.6rem] max-[460px]:py-[0.45rem] max-[460px]:text-ui-xs max-[460px]:[&>span]:text-[0.55rem]`}
      >
        03 <span>SYSTEMS</span>
      </div>
    </div>
  );
}
