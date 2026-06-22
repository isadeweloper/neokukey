import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Branded "N" monogram on the NEOKUKEY primary color.
export default function Icon() {
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
          fontSize: 22,
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
