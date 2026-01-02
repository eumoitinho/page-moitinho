"use client"

import { useEffect, useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedText } from "@/lib/localized-text"
import { BlurReveal } from "@/components/blur-reveal"
import type { PortfolioData } from "@/types/portfolio"
import { motion } from "framer-motion"

export default function InfoPage() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const { locale } = useLanguage()
  const [activeYear, setActiveYear] = useState<string>("Present")
  const [indicatorY, setIndicatorY] = useState(0)
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    fetch("/api/portfolio").then(res => res.json()).then(setData)
  }, [])

  useEffect(() => {
    if (!data?.experiences) return

    // Set initial year from first experience if available
    if (data.experiences.length > 0) {
      const initialMatch = data.experiences[0].year.match(/\d{4}/)
      if (initialMatch) setActiveYear(initialMatch[0])
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const triggerPoint = scrollY + windowHeight * 0.3

      // Default to "Present" if at the very top
      if (experienceRefs.current[0] && triggerPoint < experienceRefs.current[0].offsetTop) {
         setActiveYear(new Date().getFullYear().toString())
         setIndicatorY(0)
         return
      }

      let foundIndex = -1
      
      data.experiences.forEach((exp, index) => {
        const el = experienceRefs.current[index]
        if (el && triggerPoint >= el.offsetTop - 100) {
           foundIndex = index
        }
      })

      if (foundIndex !== -1) {
         const exp = data.experiences[foundIndex]
         const match = exp.year.match(/\d{4}/)
         const year = match ? match[0] : "2024"
         setActiveYear(year)
         setIndicatorY(foundIndex * 40) 
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [data])

  if (!data) return null
  const { personalInfo, experiences, skills } = data

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr_400px] gap-16 relative">
          
          {/* Sticky Ruler Timeline */}
          <div className="hidden lg:block h-[calc(100vh-200px)] sticky top-32">
             <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border/30" />
             <div className="relative h-full flex flex-col py-10 overflow-hidden">
                <motion.div 
                  className="absolute left-0 flex items-center gap-4 z-10"
                  animate={{ y: indicatorY }}
                  transition={{ type: "spring", stiffness: 50, damping: 15 }}
                  style={{ top: 40 }}
                >
                   <div className="w-12 h-[2px] bg-orange-500" />
                   <span className="text-orange-500 font-medium text-lg tabular-nums">
                     {activeYear}
                   </span>
                </motion.div>

                <div className="space-y-10 opacity-20 pt-10">
                   {experiences.map((_, i) => (
                     <div key={i} className="h-[1px] bg-foreground w-8" />
                   ))}
                   {Array.from({ length: 15 }).map((_, i) => (
                      <div key={`extra-${i}`} className="h-[1px] bg-foreground w-4" />
                   ))}
                </div>
             </div>
          </div>

          {/* Center Column: Content */}
          <div className="space-y-32">
            
            <section className="min-h-[60vh] flex flex-col justify-center">
              <BlurReveal>
                <h1 className="text-4xl md:text-5xl font-medium mb-8 leading-tight">
                  {getLocalizedText(personalInfo.title, locale)}
                </h1>
              </BlurReveal>
              <div className="prose prose-lg dark:prose-invert max-w-none text-xl leading-relaxed text-muted-foreground prose-p:mb-8">
                 <BlurReveal delay={0.1}>
                   <p>{getLocalizedText(personalInfo.description, locale)}</p>
                 </BlurReveal>
                 <BlurReveal delay={0.2}>
                   <p>{locale === 'en' ? "Driven by performance and user experience, I craft digital solutions that leave a lasting impact." : "Movido por performance e experiência do usuário, crio soluções digitais que deixam um impacto duradouro."}</p>
                 </BlurReveal>
              </div>
            </section>

            <section>
              <BlurReveal>
                <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">Experience</h2>
              </BlurReveal>
              <div className="space-y-24">
                {experiences.map((exp, index) => (
                  <div 
                    key={exp.id} 
                    ref={el => { experienceRefs.current[index] = el }}
                    className="scroll-mt-48 relative pl-6 border-l md:border-l-0 border-border md:pl-0"
                  >
                    <BlurReveal delay={0.1}>
                      <div className="group flex flex-col gap-2">
                        <span className="text-muted-foreground font-medium text-sm opacity-50 md:hidden">{exp.year}</span>
                        <div>
                          <h3 className="text-2xl font-medium mb-2 group-hover:text-orange-500 transition-colors">{exp.company}</h3>
                          <p className="text-lg text-foreground mb-4">{getLocalizedText(exp.role, locale)}</p>
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {getLocalizedText(exp.description, locale)}
                          </p>
                        </div>
                      </div>
                    </BlurReveal>
                  </div>
                ))}
              </div>
            </section>

            <section className="min-h-[40vh]">
               <BlurReveal>
                  <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">Expertise</h2>
               </BlurReveal>
               <div className="flex flex-wrap gap-x-8 gap-y-4 mb-24">
                 {skills.map((skill, index) => (
                   <BlurReveal key={skill} delay={index * 0.05} width="fit-content">
                     <span className="text-xl text-foreground/80 hover:text-foreground transition-colors cursor-default">
                       {skill}
                     </span>
                   </BlurReveal>
                 ))}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                 {/* Education */}
                 {data.education && (
                   <div>
                      <BlurReveal>
                        <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-8">
                          {locale === 'en' ? 'Education' : 'Formação'}
                        </h2>
                      </BlurReveal>
                      <div className="space-y-8">
                        {data.education.map((edu) => (
                          <BlurReveal key={edu.id} delay={0.1}>
                            <div className="group">
                              <span className="text-sm text-muted-foreground block mb-1">{edu.year}</span>
                              <h3 className="text-xl font-medium mb-1">{edu.institution}</h3>
                              <p className="text-muted-foreground">{getLocalizedText(edu.course, locale)}</p>
                            </div>
                          </BlurReveal>
                        ))}
                      </div>
                   </div>
                 )}

                 {/* Certifications */}
                 {data.certifications && (
                   <div>
                      <BlurReveal>
                        <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-8">
                          {locale === 'en' ? 'Certifications' : 'Certificações'}
                        </h2>
                      </BlurReveal>
                      <ul className="space-y-4">
                        {data.certifications.map((cert) => (
                          <BlurReveal key={cert.id} delay={0.1}>
                             <li className="flex flex-col">
                               <span className="text-lg font-medium">{cert.name}</span>
                               <span className="text-muted-foreground text-sm">
                                 {cert.issuer} • {cert.year}
                               </span>
                             </li>
                          </BlurReveal>
                        ))}
                      </ul>
                   </div>
                 )}
               </div>
            </section>

          </div>
          <div className="order-first lg:order-last">
             <div className="lg:sticky lg:top-32 aspect-[3/4] bg-muted relative overflow-hidden">
                {personalInfo.photoUrl ? (
                   <img src={personalInfo.photoUrl} alt={personalInfo.name} className="object-cover w-full h-full" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground">
                      Photo
                   </div>
                )}
             </div>
          </div>

        </div>
      </div>
      <Footer personalInfo={personalInfo} socials={data.socials} />
    </main>
  )
}
