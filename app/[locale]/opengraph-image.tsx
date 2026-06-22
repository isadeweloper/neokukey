import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const alt = "NEOKUKEY — AI & Automation Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pre-render one OG image per locale at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Brand palette (mirrors globals.css; ImageResponse can't read CSS vars).
const BG = "#f5f0ea";
const FG = "#2a2018";
const ACCENT = "#7a5545";
const MUTED = "#8a7a6a";
const BORDER = "rgba(92, 61, 46, 0.18)";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  const tagline = t("tagline");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "80px 90px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: 14,
            color: FG,
          }}
        >
          NEOKUKEY
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.15,
              color: FG,
              maxWidth: 960,
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 6,
              borderRadius: 3,
              background: ACCENT,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${BORDER}`,
            paddingTop: 28,
            fontSize: 28,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>AI &amp; Automation Studio</div>
          <div style={{ display: "flex" }}>neokukey-59o8.vercel.app</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
