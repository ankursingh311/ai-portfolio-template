import { ImageResponse } from "next/og";
import heroData from "@/content/hero.json";
import contactData from "@/content/contact.json";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = `${heroData.name} — ${heroData.title}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#F8F5F1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Terracotta accent bar */}
        <div
          style={{
            width: "48px",
            height: "4px",
            backgroundColor: "#C75C4C",
            marginBottom: "32px",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#9A9590",
            marginBottom: "20px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {heroData.eyebrow}
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "700",
            color: "#0A2540",
            lineHeight: "1.1",
            marginBottom: "16px",
          }}
        >
          {heroData.name}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "20px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#C75C4C",
            fontWeight: "600",
            marginBottom: "28px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {heroData.title}
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "22px",
            color: "#1F2937",
            lineHeight: "1.5",
            maxWidth: "800px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {heroData.headline}
        </div>

        {/* Bottom: location */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontSize: "13px",
            color: "#9A9590",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "1px",
          }}
        >
          {contactData.location.split(".")[0]}
        </div>
      </div>
    ),
    { ...size }
  );
}
