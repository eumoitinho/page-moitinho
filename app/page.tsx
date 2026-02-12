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
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f7f6f2" }}
      >
        <div
          className="w-6 h-6 border border-[#3d7068] border-t-transparent rounded-full animate-spin"
        />
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      <WorksEditorial
        personalInfo={data.personalInfo}
        projects={data.projects}
        socials={data.socials}
      />
    </main>
  )
}
