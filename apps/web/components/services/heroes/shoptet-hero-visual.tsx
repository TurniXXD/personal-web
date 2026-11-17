import coreHeroStyles from "./service-core-hero.module.css";
import heroStyles from "./shoptet-hero.module.css";
import { PointerReactiveHeroVisual } from "./pointer-reactive-hero-visual";
import type { HeroVisualProps } from "./hero-visual-props";
import { customHeroCopy } from "@/messages/services/hero-visuals";
import { Check, CreditCard, PackageCheck, ShoppingBag } from "lucide-react";

export const ShoptetHeroVisual = ({
  locale,
  ariaLabel,
  badge,
  items,
}: HeroVisualProps) => {
  const copy = customHeroCopy[locale].shoptet;

  return (
    <PointerReactiveHeroVisual
      className={`service-detail-visual service-custom-hero service-core-hero--shoptet ${coreHeroStyles.root} ${heroStyles.shoptetRoot}`}
      ariaLabel={ariaLabel}
    >
      <article
        className={heroStyles.storeWindow}
        data-core-hero="shoptet-store"
        aria-hidden="true"
      >
        <header className={heroStyles.storeBar}>
          <strong>{copy.store}</strong>
          <small>{badge}</small>
          <span>
            <ShoppingBag size={16} />
            <i data-core-hero-animation="basket-count">1</i>
          </span>
        </header>
        <div className={heroStyles.productLayout}>
          <div className={heroStyles.productVisual}>
            <span>{copy.category}</span>
            <div className={heroStyles.productShape}>
              <i />
              <ShoppingBag size={58} strokeWidth={1.35} />
            </div>
            <div className={heroStyles.productThumbs}>
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className={heroStyles.productCopy}>
            <small>{items[0]}</small>
            <strong>{copy.product}</strong>
            <div className={heroStyles.productRating}>
              <span>★★★★★</span>
              <small>4.9</small>
            </div>
            <p>{items[1]}</p>
            <b>{copy.price}</b>
            <span className={heroStyles.productAction}>
              <ShoppingBag size={16} />
              {copy.action}
            </span>
            <div className={heroStyles.checkoutNote}>
              <CreditCard size={14} />
              <span>{copy.checkout}</span>
              <PackageCheck size={14} />
            </div>
          </div>
        </div>
      </article>
      <div
        className={heroStyles.cartToast}
        aria-hidden="true"
        data-core-hero-animation="cart-toast"
      >
        <span>
          <Check size={15} />
        </span>
        <div>
          <strong>{copy.added}</strong>
          <small>
            {copy.basket} · {copy.price}
          </small>
        </div>
        <ShoppingBag size={20} />
      </div>
    </PointerReactiveHeroVisual>
  );
};
