import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#1e1c4a",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#9c99e0",
            fontSize: "LQ".length > 2 ? 8 : 11,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          {"LQ"}
        </span>
      </div>
    ),
    { ...size }
  );
}
