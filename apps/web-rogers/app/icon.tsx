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
          background: "#1a0533",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#f72585",
            fontSize: "RN".length > 2 ? 8 : 11,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          {"RN"}
        </span>
      </div>
    ),
    { ...size }
  );
}
