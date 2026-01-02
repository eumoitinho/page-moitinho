"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedText } from "@/lib/localized-text"
import Link from "next/link"
import type { PortfolioData, Project } from "@/types/portfolio"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function ProjectPage() {
  const { id } = useParams()
  const { locale } = useLanguage()
  const router = useRouter()
  const [data, setData] = useState<PortfolioData | null>(null)
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    fetch("/api/portfolio")
      .then(res => res.json())
      .then((portfolioData: PortfolioData) => {
        setData(portfolioData)
        const foundProject = portfolioData.projects.find(p => p.id === id)
        if (foundProject) {
          setProject(foundProject)
        } else {
             // Fallback: try finding by matching slug in URL parts if ID isn't direct
             // For now, assume ID matches. If not found, redirect.
             router.push("/")
        }
      })
  }, [id, router])

  if (!data || !project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-foreground border-t-transparent rounded-full" />
      </div>
    )
  }

  // Helper to extract "What I did" - for now, map skills or split description if applicable.
  // Since we don't have a dedicated field, we'll format the presentation.
  
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      
      <article className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          {locale === 'en' ? "Back to Works" : "Voltar para Projetos"}
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
          {/* Main Content */}
          <div className="space-y-12">
            <div>
              <div className="flex flex-wrap gap-4 mb-6">
                 <span className="px-3 py-1 border border-border rounded-full text-sm text-muted-foreground">
                    {project.category}
                 </span>
                 <span className="px-3 py-1 border border-border rounded-full text-sm text-muted-foreground">
                    {project.type}
                 </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-medium mb-8 leading-tight">
                {getLocalizedText(project.title, locale)}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {getLocalizedText(project.description, locale)}
              </p>
            </div>
            
            <div className="aspect-video bg-muted relative overflow-hidden rounded-sm">
               {project.image && (
                 <img 
                   src={project.image} 
                   alt={getLocalizedText(project.title, locale)} 
                   className="object-cover w-full h-full"
                 />
               )}
            </div>

            {/* "What I Did" / Skills section */}
            <div className="border-t border-border pt-12">
               <h2 className="text-2xl font-medium mb-6">
                 {locale === 'en' ? "What I Did / Technologies" : "O que eu fiz / Tecnologias"}
               </h2>
               <div className="flex flex-wrap gap-4">
                  {project.skills.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-secondary text-secondary-foreground text-lg rounded-md">
                      {skill}
                    </span>
                  ))}
               </div>
            </div>

          </div>

          {/* Sidebar / CTA */}
          <div className="lg:sticky lg:top-32 h-fit space-y-12">
             <div className="p-8 border border-border space-y-8">
                <div>
                   <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Project Link</h3>
                   <a 
                     href={project.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-xl font-medium hover:text-orange-500 transition-colors inline-flex items-center gap-2"
                   >
                     {locale === 'en' ? "Visit Live Site" : "Ver Site Online"}
                     <ExternalLink className="w-5 h-5" />
                   </a>
                </div>

                <div className="h-[1px] bg-border" />

                <div>
                   <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Interested?</h3>
                   <p className="text-muted-foreground mb-6">
                     {locale === 'en' 
                       ? "Like what you see? Let's discuss how we can build something similar for you."
                       : "Gostou do que viu? Vamos discutir como podemos construir algo similar para você."}
                   </p>
                   <a 
                      href={`https://wa.me/5541995034442?text=Hi, came from project ${getLocalizedText(project.title, 'en')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full block text-center px-6 py-4 bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
                   >
                      {locale === 'en' ? "Start a Project" : "Iniciar Projeto"}
                   </a>
                </div>
             </div>
          </div>
        </div>
      </article>

      <Footer personalInfo={data.personalInfo} socials={data.socials} />
    </main>
  )
}
