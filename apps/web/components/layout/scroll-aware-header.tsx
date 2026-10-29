"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollDirection = "down" | "up" | null;
type ScrollAwareHeaderProps = { children: ReactNode };

const DOWN_DISTANCE_BEFORE_HIDE = 24;
const UP_DISTANCE_BEFORE_SHOW = 4;

export function ScrollAwareHeader({ children }: ScrollAwareHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastScrollY = window.scrollY;
    let direction: ScrollDirection = null;
    let directionStartY = lastScrollY;
    let frame = 0;

    const setVisibility = (visibility: "hidden" | "visible") => {
      if (header.dataset.scrollState !== visibility) {
        header.dataset.scrollState = visibility;
      }
    };

    const update = () => {
      frame = 0;
      const scrollY = Math.max(window.scrollY, 0);
      const nextDirection: ScrollDirection =
        scrollY > lastScrollY ? "down" : scrollY < lastScrollY ? "up" : null;
      const navigationIsOpen = Boolean(
        header.querySelector(
          'details[open], [data-slot="dropdown-menu-trigger"][data-state="open"]',
        ),
      );

      if (scrollY <= 8 || navigationIsOpen || header.matches(":focus-within")) {
        setVisibility("visible");
        direction = null;
        directionStartY = scrollY;
      } else if (nextDirection) {
        if (nextDirection !== direction) {
          direction = nextDirection;
          directionStartY = lastScrollY;
        }

        const distance = Math.abs(scrollY - directionStartY);
        if (direction === "down" && distance >= DOWN_DISTANCE_BEFORE_HIDE) {
          setVisibility("hidden");
        } else if (direction === "up" && distance >= UP_DISTANCE_BEFORE_SHOW) {
          setVisibility("visible");
        }
      }

      lastScrollY = scrollY;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const showForKeyboardFocus = () => setVisibility("visible");

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    header.addEventListener("focusin", showForKeyboardFocus);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      header.removeEventListener("focusin", showForKeyboardFocus);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className="site-header border-b border-[rgba(114,129,202,0.13)] bg-white/87 backdrop-blur-[18px]"
      data-scroll-state="visible"
      ref={headerRef}
    >
      {children}
    </header>
  );
}
