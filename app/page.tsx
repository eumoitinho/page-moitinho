"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { WorksEditorial } from "@/components/works-editorial"
import type { PortfolioData } from "@/types/portfolio"

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading || !data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-background"
      >
        <div
          className="w-5 h-5 border border-foreground/20 border-t-foreground/60 rounded-full animate-spin"
        />
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-14">
      <Header />
      <WorksEditorial
        personalInfo={data.personalInfo}
        projects={data.projects}
        socials={data.socials}
      />
    </main>
  )
}
