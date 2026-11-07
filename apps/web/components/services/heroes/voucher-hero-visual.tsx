import voucherHeroStyles from "./voucher-hero.module.css";
import { PointerReactiveHeroVisual } from "./pointer-reactive-hero-visual";
import type { HeroVisualProps } from "./hero-visual-props";
import { customHeroCopy } from "@/messages/services/hero-visuals";
import { Check, Gift, QrCode, TicketCheck } from "lucide-react";

export const VoucherHeroVisual = ({
  locale,
  ariaLabel,
  badge,
  items,
}: HeroVisualProps) => {
  const copy = customHeroCopy[locale].voucher;

  return (
    <PointerReactiveHeroVisual
      className="service-detail-visual service-custom-hero service-custom-hero--voucher"
      ariaLabel={ariaLabel}
    >
      <div
        className={`voucher-hero__backdrop ${voucherHeroStyles["voucher-hero__backdrop"]}`}
        aria-hidden="true"
      >
        <Gift size={74} />
      </div>
      <article
        className={`voucher-hero__ticket ${voucherHeroStyles["voucher-hero__ticket"]}`}
        aria-hidden="true"
      >
        <header>
          <div>
            <Gift size={17} />
            <strong>{copy.gift}</strong>
          </div>
          <span>{copy.issued}</span>
        </header>
        <div
          className={`voucher-hero__main ${voucherHeroStyles["voucher-hero__main"]}`}
        >
          <small>{copy.recipient}</small>
          <strong>{copy.value}</strong>
          <p>{items[1]}</p>
        </div>
        <footer>
          <div
            className={`voucher-hero__qr ${voucherHeroStyles["voucher-hero__qr"]}`}
          >
            <QrCode size={54} strokeWidth={1.65} />
          </div>
          <div>
            <small>{copy.code}</small>
            <strong>{badge}</strong>
          </div>
        </footer>
      </article>
      <div
        className={`voucher-hero__status ${voucherHeroStyles["voucher-hero__status"]}`}
        aria-hidden="true"
      >
        <span>
          <Check size={14} />
        </span>
        <div>
          <strong>{copy.paid}</strong>
          <small>{copy.delivered}</small>
        </div>
        <TicketCheck size={22} />
      </div>
    </PointerReactiveHeroVisual>
  );
};
