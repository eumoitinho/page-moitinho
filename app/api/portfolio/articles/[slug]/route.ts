import { NextResponse } from "next/server"
import { getPortfolioData } from "@/lib/portfolio-data"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const data = getPortfolioData()
    
    // Buscar artigo comparando com slugs em EN e PT
    const article = data.articles?.find((art) => {
      if (typeof art.slug === "string") {
        return art.slug === slug
      }
      return art.slug.en === slug || art.slug.pt === slug
    })
    
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }
    
    return NextResponse.json(article)
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 })
  }
}

