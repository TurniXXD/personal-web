"use client";

import {
  Check,
  Mail,
  PackagePlus,
  ShoppingCart,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";
import type { Locale } from "@/lib/content";

type StoryStage = {
  id: "shop" | "crm" | "automation" | "email" | "recommendation";
  label: string;
  icon: LucideIcon;
  title: string;
  status: string;
  description?: string;
};

type StoryCopy = {
  eyebrow: string;
  title: string;
  description: string;
  stages: StoryStage[];
};

type AutomationScrollStoryProps = {
  locale: Locale;
};

type AutomationTileProps = {
  stage: StoryStage;
  index: number;
};

const storyCopy: Record<Locale, StoryCopy> = {
  cs: {
    eyebrow: "JAK FUNGUJE AUTOMATIZACE",
    title: "Jedna objednávka. Několik automatických kroků.",
    description:
      "Propojte e-shop, zákaznická data a komunikaci. Rutinní úkoly pak mohou probíhat automaticky, ve správný čas a bez ručního přepisování.",
    stages: [
      {
        id: "shop",
        label: "E-shop",
        icon: ShoppingCart,
        title: "Nová objednávka",
        status: "Přijato",
      },
      {
        id: "crm",
        label: "CRM",
        icon: Users,
        title: "Zákazník aktualizován",
        status: "Synchronizováno",
      },
      {
        id: "automation",
        label: "Automatizace",
        icon: Workflow,
        title: "Vyhodnocení podmínek",
        status: "Aktivní pravidlo",
      },
      {
        id: "email",
        label: "E-mail",
        icon: Mail,
        title: "Jak jste spokojeni s nákupem?",
        status: "Samostatný follow-up",
        description: "Po doručení objednávky odejde žádost o hodnocení.",
      },
      {
        id: "recommendation",
        label: "Doporučení",
        icon: PackagePlus,
        title: "Mohlo by se vám hodit",
        status: "Samostatný follow-up",
        description:
          "Zákazník může později dostat relevantní doporučení podle svého nákupu.",
      },
    ],
  },
  en: {
    eyebrow: "HOW AUTOMATION WORKS",
    title: "One order. Several automated steps.",
    description:
      "Connect your online store, customer data, and communication. Routine tasks can then run automatically, at the right time, without manual retyping.",
    stages: [
      {
        id: "shop",
        label: "E-commerce",
        icon: ShoppingCart,
        title: "New order",
        status: "Received",
      },
      {
        id: "crm",
        label: "CRM",
        icon: Users,
        title: "Customer updated",
        status: "Synchronized",
      },
      {
        id: "automation",
        label: "Automation",
        icon: Workflow,
        title: "Condition evaluation",
        status: "Active rule",
      },
      {
        id: "email",
        label: "Email",
        icon: Mail,
        title: "How happy are you with your purchase?",
        status: "Separate follow-up",
        description: "A review request is sent after the order is delivered.",
      },
      {
        id: "recommendation",
        label: "Recommendation",
        icon: PackagePlus,
        title: "You may also need",
        status: "Separate follow-up",
        description:
          "Later, the customer can receive a relevant recommendation based on the purchase.",
      },
    ],
  },
};

const tileMotion = [
  { start: 0, end: 0.2, x: 54, y: -48 },
  { start: 0.08, end: 0.32, x: -36, y: 60 },
  { start: 0.27, end: 0.53, x: 20, y: -64 },
  { start: 0.49, end: 0.76, x: -48, y: -36 },
  { start: 0.73, end: 1, x: -32, y: 36 },
] as const;

const lineMotion = [
  { start: 0.08, end: 0.27 },
  { start: 0.27, end: 0.5 },
  { start: 0.5, end: 0.75 },
  { start: 0.74, end: 1 },
] as const;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const segmentProgress = (progress: number, start: number, end: number) =>
  clamp((progress - start) / (end - start));

const AutomationTile = ({ stage, index }: AutomationTileProps) => {
  const Icon = stage.icon;

  return (
    <article
      className="automation-story-tile"
      data-story-tile={index}
      data-story-id={stage.id}
      style={{ "--tile-index": index } as CSSProperties}
    >
      <div className="automation-story-tile__heading">
        <span className="automation-story-tile__icon">
          <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <strong>{stage.label}</strong>
        <span className="automation-story-tile__signal" aria-hidden="true" />
      </div>
      <div className="automation-story-tile__preview">
        <span className="automation-story-tile__status">
          <Check size={12} aria-hidden="true" />
          {stage.status}
        </span>
        <h3>{stage.title}</h3>
      </div>
      {stage.description && <p>{stage.description}</p>}
    </article>
  );
};

export const AutomationScrollStory = ({
  locale,
}: AutomationScrollStoryProps) => {
  const content = storyCopy[locale];
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const staticLayout = window.matchMedia("(max-width: 900px)");
    const tiles = Array.from(
      frame.querySelectorAll<HTMLElement>("[data-story-tile]"),
    );
    const lines = Array.from(
      frame.querySelectorAll<SVGPathElement>("[data-story-line]"),
    );
    let animationFrame = 0;

    const applyProgress = (progress: number, staticMode = false) => {
      const nextStage = staticMode
        ? content.stages.length - 1
        : Math.min(content.stages.length - 1, Math.floor(progress * 5));

      frame.dataset.stage = String(nextStage + 1);
      section.dataset.storyProgress = progress.toFixed(3);
      tiles.forEach((tile, index) => {
        const motion = tileMotion[index];
        const tileProgress = staticMode
          ? 1
          : segmentProgress(progress, motion.start, motion.end);
        tile.style.transform = `translate3d(${motion.x * (1 - tileProgress)}px, ${motion.y * (1 - tileProgress)}px, 0) scale(${0.96 + tileProgress * 0.04})`;
        tile.style.setProperty("--tile-content-progress", String(tileProgress));
        tile.dataset.active = String(index === nextStage);
        tile.dataset.connected = String(staticMode || tileProgress >= 0.98);
      });
      lines.forEach((line, index) => {
        const motion = lineMotion[index];
        const lineProgress = staticMode
          ? 1
          : segmentProgress(progress, motion.start, motion.end);
        line.style.strokeDashoffset = String(1 - lineProgress);
      });
    };

    const update = () => {
      animationFrame = 0;
      if (reducedMotion.matches || staticLayout.matches) {
        section.dataset.storyStatic = "true";
        applyProgress(1, true);
        return;
      }

      delete section.dataset.storyStatic;
      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(
        section.offsetHeight - window.innerHeight,
        1,
      );
      const progress = clamp(-rect.top / scrollRange);

      if (completedRef.current) {
        applyProgress(1);
        return;
      }

      if (progress >= 0.995) {
        const sectionTop = rect.top + window.scrollY;
        completedRef.current = true;
        section.dataset.storyComplete = "true";
        applyProgress(1);
        window.scrollTo({ top: sectionTop, behavior: "instant" });
        return;
      }

      applyProgress(progress);
    };

    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    staticLayout.addEventListener("change", requestUpdate);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      staticLayout.removeEventListener("change", requestUpdate);
    };
  }, [content.stages.length]);

  return (
    <section
      className="automation-scroll-story"
      ref={sectionRef}
      aria-labelledby="automation-story-title"
    >
      <div className="automation-scroll-story__sticky">
        <div className="site-container automation-scroll-story__inner">
          <header className="automation-scroll-story__header">
            <div>
              <p className="eyebrow">{content.eyebrow}</p>
              <h2 id="automation-story-title">{content.title}</h2>
            </div>
            <p>{content.description}</p>
          </header>

          <div className="automation-scroll-story__frame" ref={frameRef}>
            <svg
              className="automation-scroll-story__connectors"
              viewBox="0 0 1000 520"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path data-story-line="0" pathLength="1" d="M210 260H250" />
              <path data-story-line="1" pathLength="1" d="M440 260H480" />
              <path
                data-story-line="2"
                pathLength="1"
                d="M670 260H725V130H770"
              />
              <path
                data-story-line="3"
                pathLength="1"
                d="M670 260H725V390H770"
              />
            </svg>

            <div className="automation-scroll-story__canvas">
              {content.stages.map((stage, index) => (
                <AutomationTile stage={stage} index={index} key={stage.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
