import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "João Vitor Moitinho — Tech Lead & Full-stack Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0f0f0f",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#ea580c",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            João Vitor
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#a3a3a3",
            }}
          >
            Moitinho
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#737373",
              marginTop: "16px",
            }}
          >
            Tech Lead & Full-stack Developer — Curitiba, Brazil
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            fontSize: 20,
            color: "#525252",
          }}
        >
          moitinho.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
