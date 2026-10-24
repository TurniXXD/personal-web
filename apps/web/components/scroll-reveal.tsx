"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
};

type ScrollRevealStyle = CSSProperties & {
  "--reveal-delay"?: string;
};

export const ScrollReveal = ({
  children,
  className,
  stagger = false,
  delay = 0,
}: ScrollRevealProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "pending" | "visible">(
    "static",
  );

  useEffect(() => {
    const root = rootRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!root || reducedMotion.matches) {
      return;
    }

    setState("pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState("visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8%", threshold: 0.06 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={className}
      data-scroll-reveal="true"
      data-reveal-state={state}
      data-reveal-stagger={stagger ? "true" : undefined}
      style={{ "--reveal-delay": `${delay}ms` } as ScrollRevealStyle}
    >
      {children}
    </div>
  );
};
