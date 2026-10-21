import type { Locale } from "@/lib/content";

type WebApplicationHeroVisualProps = {
  locale: Locale;
};

export const WebApplicationHeroVisual = ({
  locale,
}: WebApplicationHeroVisualProps) => (
  <div
    className="service-hero-visual service-hero-visual--web"
    data-web-visual="animated-charts"
    aria-hidden="true"
  >
    <div className="web-visual__browser">
      <div className="web-visual__bar">
        <span />
        <span />
        <span />
        <div />
      </div>
      <div className="web-visual__body">
        <div className="web-visual__sidebar">
          <b />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="web-visual__workspace">
          <div className="web-visual__heading">
            <div>
              <small>
                {locale === "cs" ? "ANALYTICKÝ PŘEHLED" : "ANALYTICS OVERVIEW"}
              </small>
              <strong>
                {locale === "cs"
                  ? "Výkon v reálném čase"
                  : "Real-time performance"}
              </strong>
            </div>
            <span className="web-visual__live">
              <i /> LIVE
            </span>
          </div>

          <div className="web-visual__metrics">
            <div className="web-visual__metric">
              <span>{locale === "cs" ? "Návštěvy" : "Visits"}</span>
              <strong>24 680</strong>
              <small>+18,4 %</small>
              <svg viewBox="0 0 80 24" preserveAspectRatio="none">
                <path
                  pathLength="1"
                  d="M2 20 14 15 25 17 38 8 49 12 63 5 78 3"
                />
              </svg>
            </div>
            <div className="web-visual__metric">
              <span>{locale === "cs" ? "Konverze" : "Conversions"}</span>
              <strong>7,8 %</strong>
              <small>+2,1 %</small>
              <svg viewBox="0 0 80 24" preserveAspectRatio="none">
                <path
                  pathLength="1"
                  d="M2 18 14 19 26 13 39 15 51 7 63 10 78 2"
                />
              </svg>
            </div>
          </div>

          <div className="web-visual__charts">
            <div className="web-visual__line-chart">
              <div className="web-visual__chart-heading">
                <span>
                  {locale === "cs" ? "Aktivita uživatelů" : "User activity"}
                </span>
                <strong>+24,8 %</strong>
              </div>
              <svg viewBox="0 0 320 132" preserveAspectRatio="none">
                <defs>
                  <linearGradient
                    id="web-chart-fill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0" stopColor="#6977ff" stopOpacity="0.22" />
                    <stop offset="1" stopColor="#6977ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <g className="web-visual__chart-grid">
                  <path d="M0 22H320" />
                  <path d="M0 54H320" />
                  <path d="M0 86H320" />
                  <path d="M0 118H320" />
                </g>
                <path
                  className="web-visual__chart-area"
                  d="M0 112C25 106 42 96 64 99S101 75 126 78s43-28 67-20 37 20 62 1 42-33 65-41v114H0Z"
                />
                <path
                  className="web-visual__chart-line"
                  pathLength="1"
                  d="M0 112C25 106 42 96 64 99S101 75 126 78s43-28 67-20 37 20 62 1 42-33 65-41"
                />
                <g className="web-visual__chart-points">
                  <circle cx="64" cy="99" r="3" />
                  <circle cx="126" cy="78" r="3" />
                  <circle cx="193" cy="58" r="3" />
                  <circle cx="255" cy="59" r="3" />
                  <circle cx="318" cy="19" r="3" />
                </g>
              </svg>
            </div>

            <div className="web-visual__chart-stack">
              <div className="web-visual__donut-card">
                <svg viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="16" pathLength="100" />
                  <circle
                    className="web-visual__donut-value"
                    cx="21"
                    cy="21"
                    r="16"
                    pathLength="100"
                  />
                </svg>
                <span>
                  <strong>76 %</strong>
                  <small>{locale === "cs" ? "splněno" : "complete"}</small>
                </span>
              </div>
              <div className="web-visual__bars">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
