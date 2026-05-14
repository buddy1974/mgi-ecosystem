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
          background: "#011a33",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#FC9D02",
            fontSize: "DF".length > 2 ? 8 : 11,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          {"DF"}
        </span>
      </div>
    ),
    { ...size }
  );
}
