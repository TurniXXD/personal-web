import auditHeroStyles from "./audit-hero.module.css";
import voucherHeroStyles from "./voucher-hero.module.css";
import loyaltyHeroStyles from "./loyalty-hero.module.css";
import { PointerReactiveHeroVisual } from "./pointer-reactive-hero-visual";
import {
  Check,
  CircleAlert,
  Code2,
  Gift,
  QrCode,
  ScanLine,
  ShieldCheck,
  Sparkles,
  TicketCheck,
} from "lucide-react";
import type { Locale } from "@/lib/content";

type HeroVisualProps = {
  locale: Locale;
  ariaLabel: string;
  badge: string;
  items: string[];
};

const customHeroCopy = {
  cs: {
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
