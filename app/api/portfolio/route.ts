import { NextResponse } from "next/server"
import { getPortfolioData } from "@/lib/portfolio-data"

export async function GET() {
  try {
    const data = getPortfolioData()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching portfolio data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

