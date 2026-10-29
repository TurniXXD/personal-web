import auditHeroStyles from "./audit-hero.module.css";
import coreHeroStyles from "./service-core-hero.module.css";
import voucherHeroStyles from "./voucher-hero.module.css";
import loyaltyHeroStyles from "./loyalty-hero.module.css";
import { PointerReactiveHeroVisual } from "./pointer-reactive-hero-visual";
import {
  BarChart3,
  Bell,
  Building2,
  Check,
  CheckCircle2,
  CircleAlert,
  Code2,
  CreditCard,
  Gift,
  LayoutDashboard,
  Menu,
  MousePointer2,
  PackageCheck,
  QrCode,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TicketCheck,
  UsersRound,
} from "lucide-react";
import type { Locale } from "@/lib/site/content";

type HeroVisualProps = {
  locale: Locale;
  ariaLabel: string;
  badge: string;
  items: string[];
};

const webAppMetricHeights = [38, 58, 46, 72, 64, 88] as const;

const customHeroCopy = {
  cs: {
    company: {
      brand: "Vaše firma",
      navigation: "Služby  Reference  Kontakt",
      action: "Nezávazná poptávka",
      enquiry: "Nová poptávka",
      enquiryNote: "Kontaktní cesta funguje",
    },
    webApp: {
      workspace: "Provozní přehled",
      today: "Dnes",
      cases: "Aktivní případy",
      team: "Tým online",
      statuses: ["Nový", "Probíhá", "Hotovo"],
      synced: "Data synchronizována",
      notification: "Úkol přiřazen",
    },
    shoptet: {
      store: "NORTH STORE",
      category: "Nová kolekce",
      product: "Městský batoh",
      price: "1 490 Kč",
      action: "Přidat do košíku",
      basket: "Košík",
      added: "Přidáno do košíku",
      checkout: "Bezpečná platba",
    },
    loyalty: {
      card: "Moje věrnostní karta",
      member: "Člen programu",
      progress: "7 z 10 návštěv",
      reward: "Další odměna",
      rewardValue: "Káva zdarma",
      ready: "Připraveno ke skenování",
    },
    voucher: {
      issued: "Poukaz vystaven",
      gift: "Dárkový poukaz",
      value: "2 000 Kč",
      recipient: "Pro radost",
      code: "Kód JV-2486",
      paid: "Platba ověřena",
      delivered: "PDF odesláno",
    },
    audit: {
      review: "Technická kontrola",
      branch: "production-ready",
      findings: "Prioritní zjištění",
      critical: "kritické",
      warning: "k nápravě",
      passed: "v pořádku",
      plan: "Plán nápravy připraven",
    },
  },
  en: {
    company: {
      brand: "Your company",
      navigation: "Services  Work  Contact",
      action: "Start an enquiry",
      enquiry: "New enquiry",
      enquiryNote: "The contact journey works",
    },
    webApp: {
      workspace: "Operations overview",
      today: "Today",
      cases: "Active cases",
      team: "Team online",
      statuses: ["New", "In progress", "Done"],
      synced: "Data synchronised",
      notification: "Task assigned",
    },
    shoptet: {
      store: "NORTH STORE",
      category: "New collection",
      product: "City backpack",
      price: "€59",
      action: "Add to basket",
      basket: "Basket",
      added: "Added to basket",
      checkout: "Secure checkout",
    },
    loyalty: {
      card: "My loyalty card",
      member: "Programme member",
      progress: "7 of 10 visits",
      reward: "Next reward",
      rewardValue: "Free coffee",
      ready: "Ready to scan",
    },
    voucher: {
      issued: "Voucher issued",
      gift: "Gift voucher",
      value: "€80",
      recipient: "A thoughtful gift",
      code: "Code JV-2486",
      paid: "Payment verified",
      delivered: "PDF delivered",
    },
    audit: {
      review: "Technical review",
      branch: "production-ready",
      findings: "Priority findings",
      critical: "critical",
      warning: "to resolve",
      passed: "passed",
      plan: "Remediation plan ready",
    },
  },
} as const;

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

export const WebApplicationDetailHeroVisual = ({
  locale,
  ariaLabel,
  badge,
  items,
}: HeroVisualProps) => {
  const copy = customHeroCopy[locale].webApp;

  return (
    <PointerReactiveHeroVisual
      className={`service-detail-visual service-custom-hero service-core-hero--web-app ${coreHeroStyles.root} ${coreHeroStyles.webAppRoot}`}
      ariaLabel={ariaLabel}
    >
      <article
        className={coreHeroStyles.appWindow}
        data-core-hero="web-application"
        aria-hidden="true"
      >
        <header className={coreHeroStyles.appBar}>
          <div>
            <LayoutDashboard size={16} />
            <strong>{copy.workspace}</strong>
          </div>
          <span>{badge}</span>
        </header>
        <div className={coreHeroStyles.appLayout}>
          <aside className={coreHeroStyles.appSidebar}>
            <i className={coreHeroStyles.appLogo}>V</i>
            <LayoutDashboard size={16} />
            <UsersRound size={16} />
            <BarChart3 size={16} />
            <i className={coreHeroStyles.appAvatar}>JV</i>
          </aside>
          <div className={coreHeroStyles.appDashboard}>
            <div className={coreHeroStyles.appHeading}>
              <div>
                <small>{copy.today}</small>
                <strong>{ariaLabel}</strong>
              </div>
              <Bell size={17} />
            </div>
            <div className={coreHeroStyles.appMetrics}>
              <div>
                <small>{copy.cases}</small>
                <strong>24</strong>
                <span className={coreHeroStyles.metricBars}>
                  {webAppMetricHeights.map((height) => (
                    <i key={height} style={{ height: `${height}%` }} />
                  ))}
                </span>
              </div>
              <div>
                <small>{copy.team}</small>
                <strong>8 / 10</strong>
                <span className={coreHeroStyles.teamAvatars}>
                  <i>AK</i>
                  <i>MV</i>
                  <i>+6</i>
                </span>
              </div>
            </div>
            <div className={coreHeroStyles.appCases}>
              {items.map((item, index) => (
                <div
                  className={coreHeroStyles.appCase}
                  key={item}
                  data-core-hero-animation="app-case"
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                  <small>{copy.statuses[index]}</small>
                </div>
              ))}
            </div>
            <footer className={coreHeroStyles.appSync}>
              <CheckCircle2 size={14} />
              <span>{copy.synced}</span>
              <i />
            </footer>
          </div>
        </div>
      </article>
      <div className={coreHeroStyles.appNotification} aria-hidden="true">
        <span>
          <Bell size={16} />
        </span>
        <div>
          <strong>{copy.notification}</strong>
          <small>{items[1]}</small>
        </div>
      </div>
    </PointerReactiveHeroVisual>
  );
};

export const ShoptetHeroVisual = ({
  locale,
  ariaLabel,
  badge,
  items,
}: HeroVisualProps) => {
  const copy = customHeroCopy[locale].shoptet;

  return (
    <PointerReactiveHeroVisual
      className={`service-detail-visual service-custom-hero service-core-hero--shoptet ${coreHeroStyles.root} ${coreHeroStyles.shoptetRoot}`}
      ariaLabel={ariaLabel}
    >
      <article
        className={coreHeroStyles.storeWindow}
        data-core-hero="shoptet-store"
        aria-hidden="true"
      >
        <header className={coreHeroStyles.storeBar}>
          <strong>{copy.store}</strong>
          <small>{badge}</small>
          <span>
            <ShoppingBag size={16} />
            <i data-core-hero-animation="basket-count">1</i>
          </span>
        </header>
        <div className={coreHeroStyles.productLayout}>
          <div className={coreHeroStyles.productVisual}>
            <span>{copy.category}</span>
            <div className={coreHeroStyles.productShape}>
              <i />
              <ShoppingBag size={58} strokeWidth={1.35} />
            </div>
            <div className={coreHeroStyles.productThumbs}>
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className={coreHeroStyles.productCopy}>
            <small>{items[0]}</small>
            <strong>{copy.product}</strong>
            <div className={coreHeroStyles.productRating}>
              <span>★★★★★</span>
              <small>4.9</small>
            </div>
            <p>{items[1]}</p>
            <b>{copy.price}</b>
            <span className={coreHeroStyles.productAction}>
              <ShoppingBag size={16} />
              {copy.action}
            </span>
            <div className={coreHeroStyles.checkoutNote}>
              <CreditCard size={14} />
              <span>{copy.checkout}</span>
              <PackageCheck size={14} />
            </div>
          </div>
        </div>
      </article>
      <div
        className={coreHeroStyles.cartToast}
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

export const AuditHeroVisual = ({
  locale,
  ariaLabel,
  badge,
  items,
}: HeroVisualProps) => {
  const copy = customHeroCopy[locale].audit;

  return (
    <div
      className="service-detail-visual service-custom-hero service-custom-hero--audit"
      role="img"
      aria-label={ariaLabel}
    >
      <div
        className={`audit-hero__panel ${auditHeroStyles["audit-hero__panel"]}`}
        aria-hidden="true"
      >
        <header>
          <div>
            <span>
              <ShieldCheck size={17} />
            </span>
            <div>
              <strong>{copy.review}</strong>
              <small>{copy.branch}</small>
            </div>
          </div>
          <i>{badge}</i>
        </header>
        <div
          className={`audit-hero__workspace ${auditHeroStyles["audit-hero__workspace"]}`}
        >
          <div
            className={`audit-hero__code ${auditHeroStyles["audit-hero__code"]}`}
          >
            <div
              className={`audit-hero__code-heading ${auditHeroStyles["audit-hero__code-heading"]}`}
            >
              <Code2 size={15} />
              <span>api/auth/route.ts</span>
              <i />
            </div>
            <ol data-audit-code-scan>
              <li>
                <span>const</span> session = <em>await</em> auth();
              </li>
              <li>
                <span>if</span> (!session) return denied();
              </li>
              <li>
                data = <em>await</em> request.json();
              </li>
              <li>validate(data, schema);</li>
              <li>
                <span>return</span> save(data);
              </li>
            </ol>
          </div>
          <aside
            className={`audit-hero__findings ${auditHeroStyles["audit-hero__findings"]}`}
          >
            <strong>{copy.findings}</strong>
            <div className="is-critical" data-audit-finding="critical">
              <CircleAlert size={15} />
              <span>02</span>
              <small>{copy.critical}</small>
            </div>
            <div className="is-warning" data-audit-finding="warning">
              <ScanLine size={15} />
              <span>05</span>
              <small>{copy.warning}</small>
            </div>
            <div className="is-passed" data-audit-finding="passed">
              <Check size={15} />
              <span>18</span>
              <small>{copy.passed}</small>
            </div>
          </aside>
        </div>
        <footer>
          <span>
            <ShieldCheck size={16} />
          </span>
          <div>
            <strong>{copy.plan}</strong>
            <small>{items.join(" · ")}</small>
          </div>
          <i />
        </footer>
      </div>
    </div>
  );
};
