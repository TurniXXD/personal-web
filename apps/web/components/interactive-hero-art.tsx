"use client";

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
    <div className="hero-art" aria-hidden="true" ref={artRef}>
      <div className="hero-art__orbit-layer hero-art__orbit-layer--one">
        <div className="hero-art__orbit hero-art__orbit--one">
          <span className="hero-art__planet" />
        </div>
      </div>
      <div className="hero-art__orbit-layer hero-art__orbit-layer--two">
        <div className="hero-art__orbit hero-art__orbit--two">
          <span className="hero-art__planet" />
        </div>
      </div>
      <div className="hero-art__window-layer">
        <div className="hero-art__window">
          <div className="hero-art__window-bar">
            <span />
            <span />
            <span />
            <i>vantuch.dev</i>
          </div>
          <div className="hero-art__window-body">
            <span className="hero-art__mini-label">BUILD / CONNECT / GROW</span>
            <div className="hero-art__headline">
              <span />
              <span />
            </div>
            <div className="hero-art__diagram">
              <div>
                <Code2 size={21} />
              </div>
              <span className="hero-art__connection" />
              <div>
                <Workflow size={21} />
              </div>
              <span className="hero-art__connection" />
              <div>
                <Blocks size={21} />
              </div>
            </div>
            <div className="hero-art__bars">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
      <div className="hero-art__floating hero-art__floating--top">
        01 <span>WEB</span>
      </div>
      <div className="hero-art__floating hero-art__floating--middle">
        02 <span>AUTOMATION</span>
      </div>
      <div className="hero-art__floating hero-art__floating--bottom">
        03 <span>SYSTEMS</span>
      </div>
    </div>
  );
}
