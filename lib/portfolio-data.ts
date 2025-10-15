import fs from "fs"
import path from "path"
import type { PortfolioData } from "@/types/portfolio"

const dataFilePath = path.join(process.cwd(), "data", "portfolio.json")

export function getPortfolioData(): PortfolioData {
  const fileContents = fs.readFileSync(dataFilePath, "utf8")
  return JSON.parse(fileContents)
}

export function savePortfolioData(data: PortfolioData): void {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8")
}

