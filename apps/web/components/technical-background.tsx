"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type TechnicalBackgroundVariant = "services" | "automation";

type TechnicalBackgroundProps = {
  variant: TechnicalBackgroundVariant;
};

type TechnicalPath = {
  d: string;
  delay?: number;
  duration?: number;
};

type TechnicalNode = {
  x: number;
  y: number;
  delay?: number;
};

type AmbientShape = {
  x: number;
  y: number;
  width: number;
  height: number;
  delay?: number;
  rotate?: number;
};

type TechnicalComposition = {
  paths: TechnicalPath[];
  nodes: TechnicalNode[];
  shapes: AmbientShape[];
};

type TechnicalStyle = CSSProperties & {
  "--technical-delay"?: string;
  "--technical-duration"?: string;
  "--technical-x"?: string;
  "--technical-y"?: string;
  "--technical-width"?: string;
  "--technical-height"?: string;
  "--technical-rotate"?: string;
  "--technical-shape-offset"?: string;
};

const compositions: Record<TechnicalBackgroundVariant, TechnicalComposition> = {
  services: {
    paths: [
      { d: "M0 430 H180 V340 H430 V410 H1200", duration: 860 },
      { d: "M430 340 V250 H540", delay: 160, duration: 540 },
    ],
    nodes: [
      { x: 15, y: 68, delay: 560 },
      { x: 35.8, y: 82, delay: 680 },
      { x: 45, y: 50, delay: 790 },
    ],
    shapes: [{ x: 72, y: 7, width: 34, height: 58, rotate: -7 }],
  },
  automation: {
    paths: [],
    nodes: [],
    shapes: [{ x: 4, y: 18, width: 42, height: 52, rotate: 7 }],
  },
};

export const TechnicalBackground = ({ variant }: TechnicalBackgroundProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "pending" | "visible">(
    "static",
  );
  const [shapeState, setShapeState] = useState<
    "static" | "pending" | "visible"
  >("static");
  const composition = compositions[variant];

  useEffect(() => {
    const root = rootRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!root || reducedMotion.matches) {
      return;
    }

    setState("pending");
    setShapeState("pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState("visible");
          setShapeState("visible");
        } else {
          setShapeState("pending");
        }
      },
      { rootMargin: "0px 0px -12%", threshold: 0.08 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`technical-background technical-background--${variant}`}
      data-technical-state={state}
      data-shape-state={shapeState}
      aria-hidden="true"
    >
      <div className="technical-background__shapes">
        {composition.shapes.map((shape, index) => (
          <span
            className="technical-background__shape"
            key={`${variant}-shape-${index}`}
            data-side={shape.x < 50 ? "left" : "right"}
            style={
              {
                "--technical-x": `${shape.x}%`,
                "--technical-y": `${shape.y}%`,
                "--technical-width": `${shape.width}%`,
                "--technical-height": `${shape.height}%`,
                "--technical-delay": `${shape.delay ?? 0}ms`,
                "--technical-rotate": `${shape.rotate ?? 0}deg`,
                "--technical-shape-offset": shape.x < 50 ? "-24vw" : "24vw",
              } as TechnicalStyle
            }
          />
        ))}
      </div>
      <svg
        className="technical-background__lines"
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        focusable="false"
      >
        {composition.paths.map((path, index) => (
          <path
            d={path.d}
            key={`${variant}-path-${index}`}
            pathLength="1"
            style={
              {
                "--technical-delay": `${path.delay ?? 0}ms`,
                "--technical-duration": `${path.duration ?? 800}ms`,
              } as TechnicalStyle
            }
          />
        ))}
      </svg>
      <div className="technical-background__nodes">
        {composition.nodes.map((node, index) => (
          <span
            className="technical-background__node"
            key={`${variant}-node-${index}`}
            style={
              {
                "--technical-x": `${node.x}%`,
                "--technical-y": `${node.y}%`,
                "--technical-delay": `${node.delay ?? 0}ms`,
              } as TechnicalStyle
            }
          />
        ))}
      </div>
    </div>
  );
};
