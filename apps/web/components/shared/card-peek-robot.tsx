"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import styles from "./card-peek-robot.module.css";

/** Card families the robot can hide behind. Project cards are excluded on purpose. */
import {
  CARD_SELECTOR,
  PEEK_HEIGHT,
  ROBOT_WIDTH,
  cardEdge,
  eventFiltersBusy,
  eventsListingIsEmpty,
  freeAnchor,
  hasRoomAbove,
  isInViewport,
  isUsableCard,
  randomBetween,
  robotBox,
  robotDisabled,
  type Position,
} from "./card-peek-robot-placement";

export { ROBOT_STORAGE_KEY } from "./card-peek-robot-placement";

const FIRST_PEEK_DELAY_MS = 10000;
const NEXT_PEEK_DELAY_MIN_MS = 30000;
const NEXT_PEEK_DELAY_MAX_MS = 45000;
const GRAB_MS = 520;
const PEEK_MS = 4200;
const HIDE_MS = 600;
type Phase = "hidden" | "grab" | "peek" | "hide";

export function CardPeekRobot() {
  const t = useTranslations("cardRobot");
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("hidden");
  const [position, setPosition] = useState<Position | null>(null);
  const [greeting, setGreeting] = useState(false);
  const greetingRef = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || robotDisabled()) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let card: Element | null = null;
    // Anchor along the chosen edge, away from its rounded corners.
    let anchor = 0.5;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Prefer visible cards and avoid repeating the previous card when possible.
    const pickCard = () => {
      if (eventsListingIsEmpty() || eventFiltersBusy()) {
        card = null;
        return;
      }
      const cards = [...document.querySelectorAll(CARD_SELECTOR)]
        .filter(isUsableCard)
        .filter(
          (candidate) =>
            cardEdge(candidate) !== "top" || hasRoomAbove(candidate),
        );
      const visible = cards.filter(isInViewport);
      const pool = visible.length ? visible : cards;
      const candidates =
        pool.length > 1 ? pool.filter((candidate) => candidate !== card) : pool;
      // Start at a random card and take the first one with a free spot.
      const start = Math.floor(Math.random() * candidates.length);
      card = null;
      for (let index = 0; index < candidates.length; index++) {
        const candidate = candidates[(start + index) % candidates.length];
        const free = freeAnchor(candidate);
        if (free === undefined) continue;
        card = candidate;
        anchor = free;
        break;
      }
    };

    const measure = () => {
      if (!card?.isConnected || eventsListingIsEmpty()) return false;
      const rect = card.getBoundingClientRect();
      const edge = cardEdge(card);
      const { top, left } = robotBox(rect, edge, anchor);
      setPosition({
        top: top + window.scrollY,
        left: left + window.scrollX,
        edge,
        // Keep the bubble inside the viewport.
        bubbleAlign:
          left + ROBOT_WIDTH / 2 > window.innerWidth / 2 ? "end" : "start",
      });
      return true;
    };

    const later = (callback: () => void, delay: number) => {
      timer = setTimeout(() => {
        if (!cancelled) callback();
      }, delay);
    };

    const scheduleNext = (delay: number) => later(cycle, delay);

    const hide = () => {
      // Stay while greeting so the bubble does not vanish under the cursor.
      if (greetingRef.current) return later(hide, 800);
      setPhase("hide");
      later(() => {
        setPhase("hidden");
        scheduleNext(
          randomBetween(NEXT_PEEK_DELAY_MIN_MS, NEXT_PEEK_DELAY_MAX_MS),
        );
      }, HIDE_MS);
    };

    function cycle() {
      pickCard();
      if (!card || !isInViewport(card)) return scheduleNext(1500);
      measure();
      setPhase("grab");
      later(() => {
        setPhase("peek");
        later(hide, PEEK_MS);
      }, GRAB_MS);
    }

    // No choreography for reduced motion: the robot simply sits peeking.
    // Cards may stream in after hydration, so placement retries briefly.
    const placeStatic = (attempt = 0) => {
      pickCard();
      if (measure()) return setPhase("peek");
      if (attempt < 10) later(() => placeStatic(attempt + 1), 800);
    };

    if (reducedMotion) {
      placeStatic();
    } else {
      scheduleNext(FIRST_PEEK_DELAY_MS);
    }

    // Filter updates replace the result cards without remounting this layout.
    // Leave as soon as a filter change starts, before the cards are replaced.
    const observer = new MutationObserver(() => {
      if (card && eventFiltersBusy()) {
        card = null;
        if (timer) clearTimeout(timer);
        if (reducedMotion) {
          setPhase("hidden");
          setPosition(null);
          return;
        }
        setPhase((current) => (current === "hidden" ? current : "hide"));
        later(() => {
          setPhase("hidden");
          setPosition(null);
          scheduleNext(
            randomBetween(NEXT_PEEK_DELAY_MIN_MS, NEXT_PEEK_DELAY_MAX_MS),
          );
        }, HIDE_MS);
      } else if (card && (!card.isConnected || eventsListingIsEmpty())) {
        card = null;
        setPhase("hidden");
        setPosition(null);
      } else if (
        reducedMotion &&
        !card &&
        !eventsListingIsEmpty() &&
        !eventFiltersBusy() &&
        document.querySelector("[data-event-card]")
      ) {
        placeStatic();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-busy"],
    });

    const onResize = () => {
      if (card) measure();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      setPhase("hidden");
      setPosition(null);
    };
  }, [mounted, pathname]);

  const setGreetingState = (value: boolean) => {
    greetingRef.current = value;
    setGreeting(value);
  };

  if (!mounted || !position) return null;

  return createPortal(
    <div
      aria-hidden="true"
      data-card-robot
      data-phase={phase}
      data-edge={position.edge}
      data-greeting={greeting ? "true" : undefined}
      className={`${styles.root} pointer-events-none absolute z-40 select-none`}
      style={{
        top: position.top,
        left: position.left,
        width: ROBOT_WIDTH,
        height: PEEK_HEIGHT,
      }}
    >
      <span className={styles.bubble} data-align={position.bubbleAlign}>
        {t("greeting")} <span className={styles.wave}>👋</span>
      </span>
      <div className={styles.window}>
        <div
          className={styles.head}
          data-card-robot-head
          onPointerEnter={() => setGreetingState(true)}
          onPointerLeave={() => setGreetingState(false)}
          onPointerDown={(event) => {
            // Touch has no hover: a tap shows the greeting briefly.
            if (event.pointerType === "mouse") return;
            setGreetingState(true);
            setTimeout(() => setGreetingState(false), 2200);
          }}
        >
          <svg
            viewBox="0 0 58 52"
            width={ROBOT_WIDTH}
            height={52}
            focusable="false"
          >
            <g className={styles.antenna}>
              <line
                x1="29"
                y1="13"
                x2="29"
                y2="5"
                stroke="#5b45d6"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="29" cy="4.5" r="3.6" fill="#ff8fc7" />
            </g>
            <rect x="6" y="12" width="46" height="40" rx="15" fill="#7c5cff" />
            <rect
              x="6"
              y="12"
              width="46"
              height="40"
              rx="15"
              fill="none"
              stroke="#5b45d6"
              strokeWidth="1.5"
            />
            <ellipse
              cx="22"
              cy="18"
              rx="9"
              ry="3"
              fill="#a996ff"
              opacity="0.7"
            />
            <rect x="12" y="21" width="34" height="20" rx="10" fill="#2a2457" />
            <g className={styles.eyes}>
              <ellipse cx="22" cy="31" rx="4.2" ry="5" fill="#fff" />
              <ellipse cx="36" cy="31" rx="4.2" ry="5" fill="#fff" />
              <circle cx="23" cy="32" r="2.2" fill="#2a2457" />
              <circle cx="37" cy="32" r="2.2" fill="#2a2457" />
              <circle cx="21.6" cy="29.6" r="1" fill="#fff" />
              <circle cx="35.6" cy="29.6" r="1" fill="#fff" />
            </g>
            <g
              className={styles.happyEyes}
              fill="none"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
            >
              <path d="M18 33 Q22 26.5 26 33" />
              <path d="M32 33 Q36 26.5 40 33" />
            </g>
            <circle cx="14.5" cy="44" r="2.6" fill="#ff8fc7" opacity="0.75" />
            <circle cx="43.5" cy="44" r="2.6" fill="#ff8fc7" opacity="0.75" />
            <path
              className={styles.mouth}
              d="M25 43.5 Q29 47 33 43.5"
              fill="none"
              stroke="#2a2457"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <g className={styles.grin}>
              <path
                d="M24 42.2 Q29 48.6 34 42.2 Z"
                fill="#2a2457"
                stroke="#2a2457"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path
                d="M27 45.6 Q29 44.4 31 45.6 Q29 46.9 27 45.6 Z"
                fill="#ff8fc7"
              />
            </g>
          </svg>
        </div>
      </div>
      <span className={`${styles.hand} ${styles.handLeft}`} />
      <span className={`${styles.hand} ${styles.handRight}`} />
    </div>,
    document.body,
  );
}
