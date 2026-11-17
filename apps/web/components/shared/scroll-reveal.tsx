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
  /** Reveal on scroll. Keep this for a few card grids; headings and copy render immediately. */
  animate?: boolean;
  stagger?: boolean;
  delay?: number;
};

type ScrollRevealStyle = CSSProperties & {
  "--reveal-delay"?: string;
};

export const ScrollReveal = ({
  children,
  className,
  animate = false,
  stagger = false,
  delay = 0,
}: ScrollRevealProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "pending" | "visible">(
    "static",
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!animate || !root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    // Content already on screen (or scrolled past) must never be hidden, and
    // neither must a block taller than the viewport (a stacked grid on a
    // phone): a fast scroll would land inside it while it is still hidden.
    const rect = root.getBoundingClientRect();
    if (rect.top < window.innerHeight || rect.height > window.innerHeight) {
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
      { rootMargin: "0px 0px 10% 0px", threshold: 0 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [animate]);

  if (!animate) {
    return <div className={className}>{children}</div>;
  }

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
