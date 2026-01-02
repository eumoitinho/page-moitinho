"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedText } from "@/lib/localized-text"

interface HeroProps {
  personalInfo: any
}

export function Hero({ personalInfo }: HeroProps) {
  const [greeting, setGreeting] = useState("Hello")
  const { locale } = useLanguage()

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20">
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight leading-[1.1]">
            <span className="text-muted-foreground block text-2xl md:text-3xl mb-4 font-normal tracking-normal">{greeting}.</span>
            I'm {personalInfo.name}.
          </h1>
          <div className="space-y-4">
             <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
               {getLocalizedText(personalInfo.description, locale)}
             </p>
             <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl hidden md:block">
               {locale === 'en' 
                 ? "Specializing in building exceptional digital experiences. Currently focused on accessible, human-centered products at Ninetwo Performance."
                 : "Especializado em construir experiências digitais excepcionais. Atualmente focado em produtos acessíveis e centrados no ser humano na Ninetwo Performance."}
             </p>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <Link 
              href="/info" 
              className="inline-flex items-center gap-2 text-lg font-medium hover:text-muted-foreground transition-colors group"
            >
              {locale === 'en' ? "More Information" : "Mais Informações"}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <div className="flex gap-4 items-center pl-0 sm:pl-8 border-l-0 sm:border-l border-border/50">
               <a 
                 href="/resume.pdf" 
                 target="_blank"
                 className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
               >
                 Resume (EN)
               </a>
               <span className="text-muted-foreground/30">•</span>
               <a 
                 href="/curriculum.pdf" 
                 target="_blank"
                 className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
               >
                 Currículo (PT)
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
