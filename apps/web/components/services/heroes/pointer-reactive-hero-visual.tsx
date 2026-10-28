"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

type PointerReactiveHeroVisualProps = {
  ariaLabel: string;
  children: ReactNode;
  className: string;
};

export function PointerReactiveHeroVisual({
  ariaLabel,
  children,
  className,
}: PointerReactiveHeroVisualProps) {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    const hero = visual.closest<HTMLElement>(".service-detail-hero");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hero || reducedMotion.matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;
    let pointerInsideHero = false;

    const render = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      visual.style.cssText = `
        --service-hero-primary-x: ${currentX * 18}px;
        --service-hero-primary-y: ${currentY * 14}px;
        --service-hero-rotate-x: ${currentY * -1.2}deg;
        --service-hero-rotate-y: ${currentX * 1.5}deg;
        --service-hero-secondary-x: ${currentX * -13}px;
        --service-hero-secondary-y: ${currentY * -10}px;
        --service-hero-accent-x: ${currentX * 30}px;
        --service-hero-accent-y: ${currentY * 22}px;
      `;

      const isMoving =
        Math.abs(targetX - currentX) > 0.001 ||
        Math.abs(targetY - currentY) > 0.001;
      frame = isMoving ? window.requestAnimationFrame(render) : 0;
    };

    const scheduleRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
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

    const resetPointer = () => {
      pointerInsideHero = false;
      targetX = 0;
      targetY = 0;
      scheduleRender();
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("blur", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetPointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={className}
      role="img"
      aria-label={ariaLabel}
      ref={visualRef}
      data-pointer-reactive-hero
    >
      {children}
    </div>
  );
}
