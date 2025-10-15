import { NextResponse } from "next/server"
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio-data"
import type { Experience } from "@/types/portfolio"

export async function GET() {
  try {
    const data = getPortfolioData()
    return NextResponse.json(data.experiences)
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const experience: Experience = await request.json()
    const data = getPortfolioData()
    
    // Generate new ID
    const maxId = data.experiences.reduce((max, exp) => Math.max(max, parseInt(exp.id)), 0)
    experience.id = String(maxId + 1)
    
    data.experiences.unshift(experience)
    savePortfolioData(data)
    
    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    console.error("Error creating experience:", error)
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const experience: Experience = await request.json()
    const data = getPortfolioData()
    
    const index = data.experiences.findIndex((exp) => exp.id === experience.id)
    if (index === -1) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }
    
    data.experiences[index] = experience
    savePortfolioData(data)
    
    return NextResponse.json(experience)
  } catch (error) {
    console.error("Error updating experience:", error)
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 })
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
    data.experiences = data.experiences.filter((exp) => exp.id !== id)
    savePortfolioData(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting experience:", error)
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
  }
}

