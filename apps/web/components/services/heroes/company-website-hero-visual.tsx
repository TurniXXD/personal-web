import coreHeroStyles from "./service-core-hero.module.css";
import heroStyles from "./company-website-hero.module.css";
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
      className={`service-detail-visual service-custom-hero service-core-hero--company ${coreHeroStyles.root} ${heroStyles.companyRoot}`}
      ariaLabel={ariaLabel}
    >
      <div className={heroStyles.companyHalo} aria-hidden="true" />
      <article
        className={heroStyles.websiteBrowser}
        data-core-hero="company-website"
        aria-hidden="true"
      >
        <header className={heroStyles.browserBar}>
          <div className={heroStyles.browserDots}>
            <i />
            <i />
            <i />
          </div>
          <span>vasefirma.cz</span>
          <Menu size={14} />
        </header>
        <div className={heroStyles.websitePage}>
          <nav className={heroStyles.websiteNav}>
            <strong>
              <Building2 size={15} />
              {copy.brand}
            </strong>
            <small>{copy.navigation}</small>
          </nav>
          <div className={heroStyles.websiteHero}>
            <div className={heroStyles.websiteCopy}>
              <small>{badge}</small>
              <strong>{ariaLabel}</strong>
              <p>{items[0]}</p>
              <span>{copy.action}</span>
            </div>
            <div className={heroStyles.websiteArtwork}>
              <i />
              <i />
              <Building2 size={42} />
            </div>
          </div>
          <div className={heroStyles.websiteProof}>
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
        className={heroStyles.websiteCursor}
        aria-hidden="true"
        data-core-hero-animation="website-cursor"
      >
        <MousePointer2 size={24} />
      </span>
      <div className={heroStyles.websiteEnquiry} aria-hidden="true">
        <CheckCircle2 size={18} />
        <div>
          <strong>{copy.enquiry}</strong>
          <small>{copy.enquiryNote}</small>
        </div>
      </div>
    </PointerReactiveHeroVisual>
  );
};
