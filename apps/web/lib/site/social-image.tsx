import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import csMessages from "@/messages/cs.json";
import enMessages from "@/messages/en.json";
import { copy, type Locale } from "@/lib/site/content";

export const socialImageSize = { width: 1200, height: 630 };

const colors = {
  brand: "#4f5de0",
  brandSoft: "#eef0ff",
  navy: "#20284b",
  muted: "#59617d",
  soft: "#7a84a4",
  border: "#dce2fa",
  success: "#13865b",
  successSoft: "#e3f6ee",
};

const metricIds = ["activeUsers", "conversions", "timeSaved"] as const;
const heroVisual = {
  cs: csMessages.homeUi.heroVisual,
  en: enMessages.homeUi.heroVisual,
} as const;

// Same curve as the homepage hero dashboard (viewBox 600 × 150).
const chartLine =
  "M8 128C59 128 59 80 110 80C150 80 150 102 190 102C245 102 245 48 300 48C340 48 340 82 380 82C425 82 425 52 470 52C500 52 500 58 530 58C561 58 561 22 592 22";

const fontDir = join(process.cwd(), "node_modules/@fontsource/sora/files");

async function loadFonts() {
  const weights = [500, 700, 800] as const;
  const subsets = ["latin", "latin-ext"] as const;
  return Promise.all(
    weights.flatMap((weight) =>
      // Separate family per subset so Czech glyphs keep the requested weight.
      subsets.map(async (subset) => ({
        name: subset === "latin" ? "Sora" : "Sora Ext",
        data: await readFile(
          join(fontDir, `sora-${subset}-${weight}-normal.woff`),
        ),
        weight,
        style: "normal" as const,
      })),
    ),
  );
}

const ArrowUpRight = ({ color, size }: { color: string; size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export async function createSocialImage(locale: Locale) {
  const hero = copy[locale].hero;
  const visual = heroVisual[locale];
  const fonts = await loadFonts();

  return new ImageResponse(
    <div
      style={{
        background:
          "radial-gradient(circle at 88% 12%, rgba(124, 135, 255, 0.34) 0%, rgba(124, 135, 255, 0) 42%), radial-gradient(circle at 64% 100%, rgba(170, 180, 255, 0.4) 0%, rgba(170, 180, 255, 0) 46%), linear-gradient(135deg, #fbfcff 0%, #f2f3ff 60%, #e6e9ff 100%)",
        color: colors.navy,
        display: "flex",
        fontFamily: "Sora, Sora Ext",
        height: "100%",
        position: "relative",
        width: "100%",
      }}
    >
      {/* Faint grid, echoing the site's technical background. */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(79, 93, 224, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 93, 224, 0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          display: "flex",
          inset: 0,
          position: "absolute",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 0 60px 72px",
          width: 640,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              alignItems: "center",
              color: colors.brand,
              display: "flex",
              fontSize: 17,
              fontWeight: 700,
              gap: 12,
              letterSpacing: "1.5px",
            }}
          >
            <div
              style={{
                background: colors.brand,
                borderRadius: 999,
                display: "flex",
                height: 10,
                width: 10,
              }}
            />
            {hero.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 62,
              fontWeight: 800,
              letterSpacing: "-3.2px",
              lineHeight: 1.06,
              marginTop: 30,
            }}
          >
            <div style={{ display: "flex" }}>{hero.title}</div>
            <div style={{ color: colors.brand, display: "flex" }}>
              {hero.highlight}
            </div>
          </div>
        </div>

        <div style={{ alignItems: "center", display: "flex", gap: 16 }}>
          <div
            style={{
              alignItems: "center",
              background: `linear-gradient(135deg, ${colors.brand} 0%, #3a3fb8 100%)`,
              borderRadius: 14,
              color: "#fff",
              display: "flex",
              fontSize: 22,
              fontWeight: 800,
              height: 52,
              justifyContent: "center",
              letterSpacing: "-1px",
              width: 52,
            }}
          >
            JV
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 22, fontWeight: 700 }}>
              Jakub Vantuch
            </div>
            <div
              style={{
                color: colors.soft,
                display: "flex",
                fontSize: 17,
                fontWeight: 500,
              }}
            >
              vantuch.dev
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard card, mirroring the homepage hero visual. */}
      <div
        style={{
          display: "flex",
          flex: 1,
          position: "relative",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.94)",
            border: `2px solid ${colors.border}`,
            borderRadius: 26,
            boxShadow: "0 30px 70px rgba(48, 58, 140, 0.18)",
            display: "flex",
            flexDirection: "column",
            left: 24,
            position: "absolute",
            top: 100,
            width: 512,
          }}
        >
          <div
            style={{
              borderBottom: `2px solid ${colors.border}`,
              display: "flex",
              gap: 8,
              padding: "16px 20px",
            }}
          >
            {["#f3a3ae", "#f5d58e", "#a6dfc2"].map((dot) => (
              <div
                key={dot}
                style={{
                  background: dot,
                  borderRadius: 999,
                  display: "flex",
                  height: 12,
                  width: 12,
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "24px 26px 26px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 24, fontWeight: 700 }}>
                {visual.title}
              </div>
              <div
                style={{
                  color: colors.soft,
                  display: "flex",
                  fontSize: 15,
                  fontWeight: 500,
                  marginTop: 4,
                }}
              >
                {visual.subtitle}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {metricIds.map((id) => {
                const metric = visual.metrics[id];
                return (
                  <div
                    key={id}
                    style={{
                      background: "#f8f9ff",
                      border: `2px solid ${colors.border}`,
                      borderRadius: 16,
                      display: "flex",
                      flex: 1,
                      flexDirection: "column",
                      padding: "14px 14px",
                    }}
                  >
                    <div
                      style={{
                        color: colors.muted,
                        display: "flex",
                        fontSize: 13,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {metric.label}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        fontSize: 30,
                        fontWeight: 800,
                        letterSpacing: "-1.2px",
                        marginTop: 6,
                      }}
                    >
                      {metric.value}
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        color: colors.success,
                        display: "flex",
                        fontSize: 14,
                        fontWeight: 700,
                        gap: 4,
                        marginTop: 4,
                      }}
                    >
                      <ArrowUpRight color={colors.success} size={14} />
                      {metric.trend}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                background: "#f8f9ff",
                border: `2px solid ${colors.border}`,
                borderRadius: 16,
                display: "flex",
                marginTop: 14,
                padding: "14px 12px 8px",
                position: "relative",
              }}
            >
              <svg width={428} height={107} viewBox="0 0 600 150">
                <path
                  d={`${chartLine}V150H8Z`}
                  fill={colors.brand}
                  fillOpacity={0.12}
                />
                <path
                  d={chartLine}
                  fill="none"
                  stroke={colors.brand}
                  strokeWidth={5}
                  strokeLinecap="round"
                />
                <circle
                  cx={592}
                  cy={22}
                  r={9}
                  fill="#fff"
                  stroke={colors.brand}
                  strokeWidth={5}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Floating highlight chip overlapping the card corner. */}
        <div
          style={{
            alignItems: "center",
            background: "#fff",
            border: `2px solid ${colors.border}`,
            borderRadius: 18,
            boxShadow: "0 18px 40px rgba(48, 58, 140, 0.16)",
            display: "flex",
            gap: 12,
            left: -36,
            padding: "12px 18px 12px 12px",
            position: "absolute",
            top: 514,
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: colors.successSoft,
              borderRadius: 12,
              display: "flex",
              height: 40,
              justifyContent: "center",
              width: 40,
            }}
          >
            <ArrowUpRight color={colors.success} size={22} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 18, fontWeight: 700 }}>
              {visual.cards.automation.title}
            </div>
            <div
              style={{
                color: colors.soft,
                display: "flex",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {visual.cards.automation.description}
            </div>
          </div>
        </div>
      </div>
    </div>,
    { ...socialImageSize, fonts },
  );
}
