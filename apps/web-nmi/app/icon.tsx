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
          background: "#0a1628",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#4a90d9",
            fontSize: "NMI".length > 2 ? 8 : 11,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          {"NMI"}
        </span>
      </div>
    ),
    { ...size }
  );
}
