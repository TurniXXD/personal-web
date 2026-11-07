import auditHeroStyles from "./audit-hero.module.css";
import type { HeroVisualProps } from "./hero-visual-props";
import { customHeroCopy } from "@/messages/services/hero-visuals";
import { Check, CircleAlert, Code2, ScanLine, ShieldCheck } from "lucide-react";

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
