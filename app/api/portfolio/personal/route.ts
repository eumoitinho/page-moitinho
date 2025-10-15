import { NextResponse } from "next/server"
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio-data"
import type { PersonalInfo } from "@/types/portfolio"

export async function GET() {
  try {
    const data = getPortfolioData()
    return NextResponse.json(data.personalInfo)
  } catch (error) {
    console.error("Error fetching personal info:", error)
    return NextResponse.json({ error: "Failed to fetch personal info" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const personalInfo: PersonalInfo = await request.json()
    const data = getPortfolioData()
    
    data.personalInfo = personalInfo
    savePortfolioData(data)
    
    return NextResponse.json(personalInfo)
  } catch (error) {
    console.error("Error updating personal info:", error)
    return NextResponse.json({ error: "Failed to update personal info" }, { status: 500 })
  }
}

