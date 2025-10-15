import { NextResponse } from "next/server"
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio-data"
import type { Project } from "@/types/portfolio"

export async function GET() {
  try {
    const data = getPortfolioData()
    return NextResponse.json(data.projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const project: Project = await request.json()
    const data = getPortfolioData()
    
    // Generate new ID
    const maxId = data.projects.reduce((max, proj) => Math.max(max, parseInt(proj.id)), 0)
    project.id = String(maxId + 1)
    
    data.projects.unshift(project)
    savePortfolioData(data)
    
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const project: Project = await request.json()
    const data = getPortfolioData()
    
    const index = data.projects.findIndex((proj) => proj.id === project.id)
    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    
    data.projects[index] = project
    savePortfolioData(data)
    
    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
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
    data.projects = data.projects.filter((proj) => proj.id !== id)
    savePortfolioData(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

