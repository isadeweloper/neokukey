import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — branded "N" monogram (iOS applies its own rounding).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#5c3d2e",
          color: "#faf7f2",
          fontSize: 120,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        N
      </div>
    ),
    { ...size },
  );
}
