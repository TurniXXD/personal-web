"use client";

import {
  ArrowRight,
  CalendarDays,
  Check,
  FileCheck2,
  Inbox,
  Mail,
  MessageSquareText,
  PackageCheck,
  Quote,
  ShoppingBag,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import {
  aiUseCaseCarouselCopy,
  getAiUseCaseSlides,
  type AiUseCaseSlide,
} from "@/lib/ai-use-case-content";
import type { Locale } from "@/lib/content";
import baseVisualStyles from "./ai-case-visual-base.module.css";
import variantVisualStyles from "./ai-case-visual-variants.module.css";

const visualClass = (classes: string) =>
  `${classes} ${classes
    .split(" ")
    .flatMap((className) => [
      baseVisualStyles[className],
      variantVisualStyles[className],
    ])
    .filter(Boolean)
    .join(" ")}`;

type AiUseCaseCarouselProps = {
  locale: Locale;
};

const AUTO_ROTATION_DELAY = 6_000;

const VisualHeader = ({ slide }: { slide: AiUseCaseSlide }) => (
  <div className={visualClass("ai-case-visual__header")}>
    <span>{slide.visual.eyebrow}</span>
    <strong>{slide.visual.title}</strong>
  </div>
);

const VisualFooter = ({ slide }: { slide: AiUseCaseSlide }) => (
  <div className={visualClass("ai-case-visual__summary")}>
    <Check size={15} strokeWidth={2.4} aria-hidden="true" />
    <strong>{slide.visual.summary}</strong>
  </div>
);

const AiUseCaseVisualization = ({ slide }: { slide: AiUseCaseSlide }) => {
  if (slide.id === "trends") {
    return (
      <figure className={visualClass("ai-case-visual ai-case-visual--trends")}>
        <VisualHeader slide={slide} />
        <div
          className={visualClass("ai-case-trends__chart")}
          aria-hidden="true"
        >
          {[38, 54, 46, 72, 65, 88, 82].map((value, index) => (
            <span key={index} style={{ height: `${value}%` }} />
          ))}
          <TrendingUp size={20} />
        </div>
        <div className={visualClass("ai-case-visual__rows")}>
          {slide.visual.rows.map((row) => (
            <div className={visualClass("ai-case-visual__row")} key={row.label}>
              <span>
                <strong>{row.label}</strong>
                <small>{row.meta}</small>
              </span>
              <b>{row.value}</b>
            </div>
          ))}
        </div>
        <VisualFooter slide={slide} />
      </figure>
    );
  }

  if (slide.id === "social-content") {
    return (
      <figure className={visualClass("ai-case-visual ai-case-visual--social")}>
        <VisualHeader slide={slide} />
        <div className={visualClass("ai-case-social__layout")}>
          <div className={visualClass("ai-case-social__drafts")}>
            {slide.visual.rows.map((row, index) => (
              <article key={row.label}>
                {index === 0 ? (
                  <MessageSquareText size={17} aria-hidden="true" />
                ) : index === 1 ? (
                  <Star size={17} aria-hidden="true" />
                ) : (
                  <FileCheck2 size={17} aria-hidden="true" />
                )}
                <span>
                  <strong>{row.label}</strong>
                  <small>{row.value}</small>
                </span>
                <b>{row.meta}</b>
              </article>
            ))}
          </div>
          <div
            className={visualClass("ai-case-social__calendar")}
            aria-hidden="true"
          >
            <CalendarDays size={18} />
            <div>
              {Array.from({ length: 14 }, (_, index) => (
                <i key={index} data-filled={[2, 5, 9].includes(index)} />
              ))}
            </div>
          </div>
        </div>
        <VisualFooter slide={slide} />
      </figure>
    );
  }

  if (slide.id === "enquiries") {
    return (
      <figure className={visualClass("ai-case-visual ai-case-visual--enquiry")}>
        <VisualHeader slide={slide} />
        <div className={visualClass("ai-case-enquiry__flow")}>
          <article className={visualClass("ai-case-enquiry__email")}>
            <span>
              <Mail size={17} aria-hidden="true" />
              <strong>info@lumen-studio.example</strong>
            </span>
            <p>{slide.visual.preview}</p>
          </article>
          <span
            className={visualClass("ai-case-enquiry__connector")}
            aria-hidden="true"
          >
            <i />
            <ArrowRight size={18} />
          </span>
          <article className={visualClass("ai-case-enquiry__crm")}>
            <span>
              <Inbox size={17} aria-hidden="true" />
              CRM
            </span>
            <div>
              {slide.visual.rows.map((row) => (
                <p key={row.label}>
                  <small>{row.label}</small>
                  <strong>{row.value}</strong>
                </p>
              ))}
            </div>
          </article>
        </div>
        <VisualFooter slide={slide} />
      </figure>
    );
  }

  if (slide.id === "quotations") {
    return (
      <figure
        className={visualClass("ai-case-visual ai-case-visual--quotation")}
      >
        <div className={visualClass("ai-case-quotation__paper")}>
          <VisualHeader slide={slide} />
          <div className={visualClass("ai-case-quotation__customer")}>
            <span />
            <span />
            <span />
          </div>
          <div className={visualClass("ai-case-visual__rows")}>
            {slide.visual.rows.map((row) => (
              <div
                className={visualClass("ai-case-visual__row")}
                key={row.label}
              >
                <span>
                  <strong>{row.label}</strong>
                  <small>{row.meta}</small>
                </span>
                <b>{row.value}</b>
              </div>
            ))}
          </div>
          <div className={visualClass("ai-case-quotation__total")}>
            {slide.visual.summary}
          </div>
        </div>
      </figure>
    );
  }

  if (slide.id === "reviews") {
    return (
      <figure className={visualClass("ai-case-visual ai-case-visual--reviews")}>
        <VisualHeader slide={slide} />
        <div className={visualClass("ai-case-reviews__overview")}>
          <div className={visualClass("ai-case-reviews__score")}>
            <span>4,6</span>
            <div aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={13} fill="currentColor" />
              ))}
            </div>
            <small>{slide.visual.auxiliary}</small>
          </div>
          <Quote size={31} aria-hidden="true" />
          <p>„{slide.visual.preview}“</p>
        </div>
        <div className={visualClass("ai-case-reviews__topics")}>
          {slide.visual.rows.map((row, index) => (
            <article key={row.label}>
              <span>
                <strong>{row.label}</strong>
                <small>{row.meta}</small>
              </span>
              <div aria-hidden="true">
                <i style={{ width: `${[92, 84, 48][index]}%` }} />
              </div>
              <b>{row.value}</b>
            </article>
          ))}
        </div>
        <VisualFooter slide={slide} />
      </figure>
    );
  }

  return (
    <figure
      className={visualClass("ai-case-visual ai-case-visual--recommendations")}
    >
      <VisualHeader slide={slide} />
      <div
        className={visualClass("ai-case-products__orders")}
        aria-hidden="true"
      >
        <span>
          <ShoppingBag size={15} /> 1048
        </span>
        <span>
          <ShoppingBag size={15} /> 1072
        </span>
        <span>
          <ShoppingBag size={15} /> 1103
        </span>
      </div>
      <div className={visualClass("ai-case-products__pairs")}>
        {slide.visual.rows.map((row) => (
          <article key={row.label}>
            <span>
              <PackageCheck size={19} aria-hidden="true" />
              {row.label}
            </span>
            <ArrowRight size={18} aria-hidden="true" />
            <span>
              <PackageCheck size={19} aria-hidden="true" />
              {row.value}
            </span>
            <small>{row.meta}</small>
          </article>
        ))}
      </div>
      <VisualFooter slide={slide} />
    </figure>
  );
};

const WorkflowSteps = ({ steps }: { steps: string[] }) => (
  <ol className="ai-use-case__workflow">
    {steps.map((step, index) => (
      <li key={step}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <strong>{step}</strong>
      </li>
    ))}
  </ol>
);

export const AiUseCaseCarousel = ({ locale }: AiUseCaseCarouselProps) => {
  const copy = aiUseCaseCarouselCopy[locale];
  const slides = getAiUseCaseSlides(locale);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) setIsAutoPlaying(false);

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsAutoPlaying(false);
    };

    reducedMotion.addEventListener("change", handleReducedMotionChange);
    return () =>
      reducedMotion.removeEventListener("change", handleReducedMotionChange);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_ROTATION_DELAY);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, isAutoPlaying, slides.length]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 52) return;
    if (distance > 0) showPrevious();
    else showNext();
  };

  return (
    <section className="section ai-use-cases" aria-label={copy.carouselLabel}>
      <ScrollReveal>
        <div
          className="ai-use-case-carousel w-full border-none bg-transparent [touch-action:pan-y]"
          aria-label={copy.carouselLabel}
          aria-roledescription="carousel"
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
        >
          <div className="ai-use-case-carousel__viewport">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  className="ai-use-case-carousel__slide"
                  id={`ai-use-case-panel-${slide.id}`}
                  key={slide.id}
                  role="group"
                  aria-hidden={!isActive}
                  aria-label={copy.slideLabel(index + 1, slide.title)}
                  aria-live={isActive ? "polite" : undefined}
                  data-active={isActive}
                >
                  <div className="ai-use-case__content">
                    <p className="ai-use-case__category">{slide.category}</p>
                    <h3>{slide.title}</h3>
                    <p className="ai-use-case__description">
                      {slide.description}
                    </p>
                    <WorkflowSteps steps={slide.workflow} />
                  </div>
                  <AiUseCaseVisualization slide={slide} />
                </div>
              );
            })}
          </div>

          <div className="ai-use-case-carousel__footer">
            <div
              className="ai-use-case-carousel__tabs"
              aria-label={copy.navigationLabel}
              role="group"
            >
              {slides.map((slide, index) => (
                <button
                  type="button"
                  aria-pressed={index === activeIndex}
                  aria-label={copy.slideLabel(index + 1, slide.title)}
                  key={slide.id}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsAutoPlaying(false);
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
