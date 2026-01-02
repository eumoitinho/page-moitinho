"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedText } from "@/lib/localized-text"
import { useRef } from "react"

interface ProjectListProps {
  projects: any[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const { locale } = useLanguage()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section id="work" className="py-24 px-6 md:px-12 overflow-hidden">
      <div className="flex items-end justify-between mb-12">
        <h2 className="text-3xl font-medium">Selected Work</h2>
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="p-3 border border-input rounded-full hover:bg-foreground hover:text-background transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-3 border border-input rounded-full hover:bg-foreground hover:text-background transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:-mx-12 md:px-12"
      >
        {projects.map((project, index) => (
          <Link 
            href={`/work/${project.id}`} 
            key={index}
            className="group relative flex-none w-[85vw] md:w-[600px] snap-center"
          >
            <div className="aspect-[4/3] relative overflow-hidden bg-muted mb-6">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={getLocalizedText(project.title, locale)}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium">{getLocalizedText(project.title, locale)}</h3>
                <ArrowRight className="w-5 h-5 -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-0" />
              </div>
              <p className="text-muted-foreground text-lg">{project.category || "Design / Development"}</p>
            </div>
          </Link>
        ))}
        
        {/* Fillers if few projects */}
        {[1, 2].map((i) => (
          <div key={`filler-${i}`} className="flex-none w-[85vw] md:w-[600px] snap-center opacity-50 grayscale">
             <div className="aspect-[4/3] bg-muted mb-6 flex items-center justify-center">
                <span className="text-muted-foreground">Coming Soon</span>
             </div>
          </div>
        ))}
      </div>
    </section>
  )
}
