import { ImageResponse } from "next/og"
import portfolioData from "@/data/portfolio.json"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = portfolioData.projects.find((p) => String(p.id) === id)

  const title = project?.title ?? "Project"
  const category = project?.category ?? ""
  const skills = project?.skills?.slice(0, 5).join(" · ") ?? ""

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0f0f0f",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 22,
              color: "#ea580c",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          {skills && (
            <div style={{ fontSize: 24, color: "#737373", marginTop: "8px" }}>
              {skills}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ fontSize: 22, color: "#a3a3a3" }}>
            João Vitor Moitinho
          </div>
          <div style={{ fontSize: 20, color: "#525252" }}>moitinho.dev</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
