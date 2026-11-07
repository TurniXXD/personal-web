import loyaltyHeroStyles from "./loyalty-hero.module.css";
import { PointerReactiveHeroVisual } from "./pointer-reactive-hero-visual";
import type { HeroVisualProps } from "./hero-visual-props";
import { customHeroCopy } from "@/messages/services/hero-visuals";
import { Check, Gift, ScanLine, Sparkles } from "lucide-react";

export const LoyaltyHeroVisual = ({
  locale,
  ariaLabel,
  badge,
  items,
}: HeroVisualProps) => {
  const copy = customHeroCopy[locale].loyalty;

  return (
    <PointerReactiveHeroVisual
      className="service-detail-visual service-custom-hero service-custom-hero--loyalty"
      ariaLabel={ariaLabel}
    >
      <div
        className={`loyalty-hero__glow ${loyaltyHeroStyles["loyalty-hero__glow"]}`}
        aria-hidden="true"
      />
      <div
        className={`loyalty-hero__phone ${loyaltyHeroStyles["loyalty-hero__phone"]}`}
        aria-hidden="true"
      >
        <div
          className={`loyalty-hero__speaker ${loyaltyHeroStyles["loyalty-hero__speaker"]}`}
        />
        <div
          className={`loyalty-hero__screen ${loyaltyHeroStyles["loyalty-hero__screen"]}`}
        >
          <header>
            <div
              className={`loyalty-hero__brand ${loyaltyHeroStyles["loyalty-hero__brand"]}`}
            >
              <span>V</span>
              <div>
                <strong>{copy.card}</strong>
                <small>{copy.member}</small>
              </div>
            </div>
            <Sparkles size={17} />
          </header>
          <div
            className={`loyalty-hero__identity ${loyaltyHeroStyles["loyalty-hero__identity"]}`}
          >
            <span>JV</span>
            <div>
              <small>{badge}</small>
              <strong>{copy.progress}</strong>
            </div>
          </div>
          <div
            className={`loyalty-hero__stamps ${loyaltyHeroStyles["loyalty-hero__stamps"]}`}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <i className={index < 7 ? "is-active" : ""} key={index}>
                {index < 7 ? <Check size={13} /> : index + 1}
              </i>
            ))}
          </div>
          <div
            className={`loyalty-hero__reward ${loyaltyHeroStyles["loyalty-hero__reward"]}`}
          >
            <Gift size={20} />
            <div>
              <small>{copy.reward}</small>
              <strong>{copy.rewardValue}</strong>
            </div>
            <span>3</span>
          </div>
        </div>
      </div>
      <div
        className={`loyalty-hero__scan-card ${loyaltyHeroStyles["loyalty-hero__scan-card"]}`}
        aria-hidden="true"
      >
        <span>
          <ScanLine size={18} />
        </span>
        <div>
          <strong>{copy.ready}</strong>
          <small>{items[0]}</small>
        </div>
        <i />
      </div>
    </PointerReactiveHeroVisual>
  );
};
