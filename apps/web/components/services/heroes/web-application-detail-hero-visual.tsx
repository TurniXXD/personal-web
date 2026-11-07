import coreHeroStyles from "./service-core-hero.module.css";
import { PointerReactiveHeroVisual } from "./pointer-reactive-hero-visual";
import type { HeroVisualProps } from "./hero-visual-props";
import { customHeroCopy } from "@/messages/services/hero-visuals";
import {
  BarChart3,
  Bell,
  CheckCircle2,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";

const webAppMetricHeights = [38, 58, 46, 72, 64, 88] as const;

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
