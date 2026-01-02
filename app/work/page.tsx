"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedText } from "@/lib/localized-text"
import type { PortfolioData } from "@/types/portfolio"

export default function WorkPage() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const { locale } = useLanguage()

  useEffect(() => {
    fetch("/api/portfolio").then(res => res.json()).then(setData)
  }, [])

  if (!data) return null

  const { personalInfo, projects } = data

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-medium mb-16">Selected Work</h1>
        
        <div className="grid grid-cols-1 gap-16">
          {projects.map((project) => (
            <Link 
              key={project.id}
              href={project.url || "#"}
              target="_blank"
              className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={getLocalizedText(project.title, locale)}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-medium group-hover:underline decoration-1 underline-offset-4">
                  {getLocalizedText(project.title, locale)}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {getLocalizedText(project.description, locale)}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.skills.map(skill => (
                    <span key={skill} className="text-xs uppercase tracking-wider border border-border px-3 py-1">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer personalInfo={personalInfo} socials={data.socials} />
    </main>
  )
}
