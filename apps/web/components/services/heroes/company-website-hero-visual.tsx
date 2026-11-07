import coreHeroStyles from "./service-core-hero.module.css";
import { PointerReactiveHeroVisual } from "./pointer-reactive-hero-visual";
import type { HeroVisualProps } from "./hero-visual-props";
import { customHeroCopy } from "@/messages/services/hero-visuals";
import { Building2, CheckCircle2, Menu, MousePointer2 } from "lucide-react";

export const CompanyWebsiteHeroVisual = ({
  locale,
  ariaLabel,
  badge,
  items,
}: HeroVisualProps) => {
  const copy = customHeroCopy[locale].company;

  return (
    <PointerReactiveHeroVisual
      className={`service-detail-visual service-custom-hero service-core-hero--company ${coreHeroStyles.root} ${coreHeroStyles.companyRoot}`}
      ariaLabel={ariaLabel}
    >
      <div className={coreHeroStyles.companyHalo} aria-hidden="true" />
      <article
        className={coreHeroStyles.websiteBrowser}
        data-core-hero="company-website"
        aria-hidden="true"
      >
        <header className={coreHeroStyles.browserBar}>
          <div className={coreHeroStyles.browserDots}>
            <i />
            <i />
            <i />
          </div>
          <span>vasefirma.cz</span>
          <Menu size={14} />
        </header>
        <div className={coreHeroStyles.websitePage}>
          <nav className={coreHeroStyles.websiteNav}>
            <strong>
              <Building2 size={15} />
              {copy.brand}
            </strong>
            <small>{copy.navigation}</small>
          </nav>
          <div className={coreHeroStyles.websiteHero}>
            <div className={coreHeroStyles.websiteCopy}>
              <small>{badge}</small>
              <strong>{ariaLabel}</strong>
              <p>{items[0]}</p>
              <span>{copy.action}</span>
            </div>
            <div className={coreHeroStyles.websiteArtwork}>
              <i />
              <i />
              <Building2 size={42} />
            </div>
          </div>
          <div className={coreHeroStyles.websiteProof}>
            {items.slice(1).map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </article>
      <span
        className={coreHeroStyles.websiteCursor}
        aria-hidden="true"
        data-core-hero-animation="website-cursor"
      >
        <MousePointer2 size={24} />
      </span>
      <div className={coreHeroStyles.websiteEnquiry} aria-hidden="true">
        <CheckCircle2 size={18} />
        <div>
          <strong>{copy.enquiry}</strong>
          <small>{copy.enquiryNote}</small>
        </div>
      </div>
    </PointerReactiveHeroVisual>
  );
};
