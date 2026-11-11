"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type DrawState = "static" | "pending" | "drawing";
type GroupStyle = CSSProperties & { "--draw-delay": string };

const delay = (ms: number): GroupStyle => ({ "--draw-delay": `${ms}ms` });

/**
 * Thin-line Brno skyline (Špilberk on the left, Petrov cathedral on the
 * right) in the brand's technical illustration style. It draws itself once
 * when scrolled into view; without JavaScript or with reduced motion it is
 * shown complete. Purely decorative.
 */
export function BrnoSkyline({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [state, setState] = useState<DrawState>("static");

  useEffect(() => {
    const svg = ref.current;
    if (
      !svg ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }
    setState("pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setState("drawing");
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 120"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      data-draw={state}
      className={["brno-skyline", className].filter(Boolean).join(" ")}
    >
      {/* Horizon and hills */}
      <g style={delay(0)}>
        <path
          pathLength={1}
          d="M0 118H320"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <path
          pathLength={1}
          d="M12 118C30 104 36 90 46 88H112C124 90 132 104 150 118"
          strokeWidth="1.25"
          strokeOpacity="0.7"
        />
        <path
          pathLength={1}
          d="M168 118C184 110 192 102 202 101H286C296 102 304 110 314 118"
          strokeWidth="1.25"
          strokeOpacity="0.7"
        />
      </g>

      {/* Špilberk fortress */}
      <g style={delay(450)}>
        <path
          pathLength={1}
          d="M50 88V74H62V68H66V74H70V68H74V74H78V58H90V74H104V88"
          strokeWidth="1.25"
        />
        <path pathLength={1} d="M78 58L84 52L90 58" strokeWidth="1.25" />
        <path
          pathLength={1}
          d="M56 80H60M94 80H98M83 64V68"
          strokeWidth="1.25"
          strokeOpacity="0.8"
        />
      </g>

      {/* Petrov cathedral: nave, choir and twin towers */}
      <g style={delay(750)}>
        <path pathLength={1} d="M206 101V84L220 76" strokeWidth="1.25" />
        <path pathLength={1} d="M252 76L266 84L284 84V101" strokeWidth="1.25" />
        <path
          pathLength={1}
          d="M266 84V101"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <path
          pathLength={1}
          d="M212 98V90A3 3 0 0 1 218 90V98M272 98V90A3 3 0 0 1 278 90V98"
          strokeWidth="1"
          strokeOpacity="0.8"
        />
        <path
          pathLength={1}
          d="M220 101V46H232V101M240 101V46H252V101"
          strokeWidth="1.25"
        />
        <path
          pathLength={1}
          d="M232 64H240M232 84H240"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <path
          pathLength={1}
          d="M223.5 66V58A2.5 2.5 0 0 1 228.5 58V66M243.5 66V58A2.5 2.5 0 0 1 248.5 58V66"
          strokeWidth="1"
          strokeOpacity="0.8"
        />
      </g>

      {/* Spires */}
      <g style={delay(1100)}>
        <path
          pathLength={1}
          d="M220 46L226 6L232 46M240 46L246 6L252 46"
          strokeWidth="1.25"
        />
        <path
          pathLength={1}
          d="M222.5 30H229.5M242.5 30H249.5"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
      </g>

      {/* Square nodes light up last */}
      <g fill="currentColor" stroke="none" style={delay(1700)}>
        <rect x="4" y="115" width="6" height="6" fillOpacity="0.6" />
        <rect x="157" y="115" width="6" height="6" fillOpacity="0.6" />
        <rect x="310" y="115" width="6" height="6" fillOpacity="0.6" />
        <rect x="224" y="1" width="4" height="4" />
        <rect x="244" y="1" width="4" height="4" />
      </g>
    </svg>
  );
}
