import styles from "./web-application-hero-visual.module.css";
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

export const WebApplicationHeroVisual = () => {
  const t = useTranslations("webApplicationVisual");

  return (
    <div
      className="service-hero-visual service-hero-visual--web"
      data-web-visual="animated-charts"
      aria-hidden="true"
    >
      <div className={styles["web-visual__stage"]}>
        <div className={styles["web-visual__browser"]}>
          <div className={styles["web-visual__bar"]}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles["web-visual__body"]}>
            <div className={styles["web-visual__sidebar"]}>
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
            <div className={styles["web-visual__workspace"]}>
              <div className={styles["web-visual__heading"]}>
                <div>
                  <strong>{t("title")}</strong>
                  <small>{t("subtitle")}</small>
                </div>
                <span className={styles["web-visual__range"]}>
                  {t("range")} <ChevronDown />
                </span>
              </div>

              <div className={styles["web-visual__metrics"]}>
                {metrics.map((metric) => (
                  <div
                    className={styles["web-visual__metric"]}
                    data-web-visual-part="metric"
                    key={metric}
                  >
                    <span>{t(`metrics.${metric}.label`)}</span>
                    <strong>{t(`metrics.${metric}.value`)}</strong>
                    <small data-web-visual-part="trend">
                      <ArrowUpRight />
                      {t(`metrics.${metric}.trend`)}
                    </small>
                  </div>
                ))}
              </div>

              <div
                className={styles["web-visual__line-chart"]}
                data-web-visual-part="line-chart"
              >
                <div className={styles["web-visual__plot"]}>
                  <svg viewBox="0 0 600 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient
                        id="web-chart-fill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0"
                          stopColor="#5b62f0"
                          stopOpacity="0.24"
                        />
                        <stop offset="1" stopColor="#5b62f0" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      className={styles["web-visual__chart-area"]}
                      d={`${chartLine}V150H8Z`}
                    />
                    <path
                      className={styles["web-visual__chart-line"]}
                      data-web-visual-part="chart-line"
                      pathLength="1"
                      d={chartLine}
                    />
                  </svg>
                  <span
                    className={styles["web-visual__chart-point"]}
                    data-web-visual-part="chart-point"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
