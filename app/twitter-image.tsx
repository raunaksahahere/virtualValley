import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          border: "2px solid #C9A84C",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-2px",
          }}
        >
          VIRTUAL VALLEY
        </div>
        <div style={{ fontSize: 32, color: "#C9A84C", marginTop: 16 }}>
          Premium Digital Agency - India
        </div>
        <div style={{ fontSize: 22, color: "#A3A3A3", marginTop: 12 }}>
          Website Development - Social Media Management - Digital Marketing
        </div>
        <div style={{ fontSize: 18, color: "#525252", marginTop: 24 }}>
          thevirtualvalley.com
        </div>
      </div>
    ),
    size,
  );
}
