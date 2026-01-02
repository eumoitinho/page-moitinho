"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProjectList } from "@/components/project-list"
import { Footer } from "@/components/footer"
import type { PortfolioData } from "@/types/portfolio"

export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        setPortfolioData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to load portfolio data:", error)
        setLoading(false)
      })
  }, [])

  if (loading || !portfolioData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  const { personalInfo, projects, socials } = portfolioData

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background overflow-hidden md:overflow-auto">
      <Header />
      <Hero personalInfo={personalInfo} />
      <ProjectList projects={projects} />
      


    </main>
  )
}
