import { ImageResponse } from "next/og";

export const socialImageSize = { width: 1200, height: 630 };

export function createSocialImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "linear-gradient(135deg, #fbfcff 0%, #eef0ff 55%, #dde3ff 100%)",
        color: "#20284b",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "flex-start",
          border: "2px solid rgba(79, 93, 224, 0.22)",
          borderRadius: "36px",
          background: "rgba(255, 255, 255, 0.86)",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          padding: "64px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#4f5de0",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          VANTUCH.DEV
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-4px",
          }}
        >
          Jakub Vantuch.
        </div>
        <div style={{ color: "#59627f", display: "flex", fontSize: 34 }}>
          Websites, applications, automation and practical AI solutions.
        </div>
      </div>
    </div>,
    socialImageSize,
  );
}
