import { NextResponse } from "next/server"
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio-data"
import type { Article, LocalizedText } from "@/types/portfolio"

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function GET() {
  try {
    const data = getPortfolioData()
    return NextResponse.json(data.articles || [])
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const article: Article = await request.json()
    const data = getPortfolioData()
    
    if (!data.articles) {
      data.articles = []
    }
    
    // Generate new ID
    const maxId = data.articles.reduce((max, art) => Math.max(max, parseInt(art.id)), 0)
    article.id = String(maxId + 1)
    
    // Generate slug from title if not provided (handle LocalizedText)
    const slugValue = article.slug as LocalizedText
    if (!slugValue.en || !slugValue.pt) {
      const titleValue = article.title as LocalizedText
      article.slug = {
        en: slugValue.en || generateSlug(titleValue.en),
        pt: slugValue.pt || generateSlug(titleValue.pt),
      }
    }
    
    // Set timestamps
    const now = new Date().toISOString()
    article.publishedAt = article.publishedAt || now
    article.updatedAt = now
    
    // Calculate read time based on EN content (words per minute: 200)
    const contentValue = article.content as LocalizedText
    const words = contentValue.en.split(/\s+/).length
    article.readTime = Math.max(1, Math.ceil(words / 200))
    
    data.articles.unshift(article)
    savePortfolioData(data)
    
    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error("Error creating article:", error)
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const article: Article = await request.json()
    const data = getPortfolioData()
    
    if (!data.articles) {
      data.articles = []
    }
    
    const index = data.articles.findIndex((art) => art.id === article.id)
    if (index === -1) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }
    
    // Update timestamp
    article.updatedAt = new Date().toISOString()
    
    // Recalculate read time based on EN content
    const contentValue = article.content as LocalizedText
    const words = contentValue.en.split(/\s+/).length
    article.readTime = Math.max(1, Math.ceil(words / 200))
    
    data.articles[index] = article
    savePortfolioData(data)
    
    return NextResponse.json(article)
  } catch (error) {
    console.error("Error updating article:", error)
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }
    
    const data = getPortfolioData()
    if (!data.articles) {
      data.articles = []
    }
    
    data.articles = data.articles.filter((art) => art.id !== id)
    savePortfolioData(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting article:", error)
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
  }
}

