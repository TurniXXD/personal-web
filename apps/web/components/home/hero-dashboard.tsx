import styles from "./hero-dashboard.module.css";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  Layers,
  LayoutGrid,
  Settings,
} from "lucide-react";

const metrics = ["activeUsers", "conversions", "timeSaved"] as const;

// Ends at (592, 22); the live point is placed at the same spot in CSS.
const chartLine =
  "M8 128C59 128 59 80 110 80C150 80 150 102 190 102C245 102 245 48 300 48C340 48 340 82 380 82C425 82 425 52 470 52C500 52 500 58 530 58C561 58 561 22 592 22";

export const HeroDashboard = () => {
  const t = useTranslations("homeUi.heroVisual");

  return (
    <div className={styles["hero-dashboard__stage"]} data-home-hero-dashboard>
      <div className={styles["hero-dashboard__browser"]}>
        <div className={styles["hero-dashboard__bar"]}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles["hero-dashboard__body"]}>
          <div className={styles["hero-dashboard__sidebar"]}>
            <span data-active="true">
              <LayoutGrid />
            </span>
            <span>
              <BarChart3 />
            </span>
            <span>
              <Layers />
            </span>
            <span>
              <Settings />
            </span>
          </div>
          <div className={styles["hero-dashboard__workspace"]}>
            <div className={styles["hero-dashboard__heading"]}>
              <div>
                <strong>{t("title")}</strong>
                <small>{t("subtitle")}</small>
              </div>
              <span className={styles["hero-dashboard__range"]}>
                {t("range")} <ChevronDown />
              </span>
            </div>

            <div className={styles["hero-dashboard__metrics"]}>
              {metrics.map((metric) => (
                <div
                  className={styles["hero-dashboard__metric"]}
                  data-hero-dashboard-part="metric"
                  key={metric}
                >
                  <span>{t(`metrics.${metric}.label`)}</span>
                  <strong>{t(`metrics.${metric}.value`)}</strong>
                  <small data-hero-dashboard-part="trend">
                    <ArrowUpRight />
                    {t(`metrics.${metric}.trend`)}
                  </small>
                </div>
              ))}
            </div>

            <div
              className={styles["hero-dashboard__line-chart"]}
              data-hero-dashboard-part="line-chart"
            >
              <div className={styles["hero-dashboard__plot"]}>
                <svg viewBox="0 0 600 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient
                      id="hero-dashboard-chart-fill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0" stopColor="#5b62f0" stopOpacity="0.24" />
                      <stop offset="1" stopColor="#5b62f0" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    className={styles["hero-dashboard__chart-area"]}
                    d={`${chartLine}V150H8Z`}
                  />
                  <path
                    className={styles["hero-dashboard__chart-line"]}
                    data-hero-dashboard-part="chart-line"
                    pathLength="1"
                    d={chartLine}
                  />
                </svg>
                <span
                  className={styles["hero-dashboard__chart-point"]}
                  data-hero-dashboard-part="chart-point"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
