"use client"

import { useEffect, useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedText } from "@/lib/localized-text"
import { BlurReveal } from "@/components/blur-reveal"
import type { PortfolioData } from "@/types/portfolio"

export default function InfoPage() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const { locale } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    fetch("/api/portfolio").then(res => res.json()).then(setData)
  }, [])

  useEffect(() => {
    if (!data?.experiences) return

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const triggerPoint = window.scrollY + windowHeight * 0.35

      let foundIndex = 0

      data.experiences.forEach((_, index) => {
        const el = experienceRefs.current[index]
        if (el && triggerPoint >= el.offsetTop - 100) {
          foundIndex = index
        }
      })

      setActiveIndex(foundIndex)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [data])

  if (!data) return null
  const { personalInfo, experiences, skills } = data

  // Extract year from period string (first 4 digits)
  const getYear = (period: string) => {
    const match = period.match(/\d{4}/)
    return match ? match[0] : ""
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr_400px] gap-16 relative">

          {/* Sticky Ruler Timeline */}
          <div className="hidden lg:block sticky top-32 self-start">
            <div className="flex flex-col gap-5 py-6">
              {experiences.map((exp, i) => {
                const year = getYear(exp.year)
                const isActive = i === activeIndex
                return (
                  <button
                    key={exp.id}
                    onClick={() => {
                      const el = experienceRefs.current[i]
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
                    }}
                    className="flex items-center gap-3 text-left transition-all duration-500 ease-out cursor-pointer"
                    style={{ opacity: isActive ? 1 : 0.2 }}
                  >
                    <div
                      className="h-[2px] shrink-0 transition-all duration-500 ease-out"
                      style={{
                        width: isActive ? "2rem" : "0.75rem",
                        backgroundColor: isActive ? "#ea580c" : "currentColor",
                      }}
                    />
                    <span
                      className="font-medium tabular-nums whitespace-nowrap transition-all duration-500 ease-out"
                      style={{
                        color: isActive ? "#ea580c" : "inherit",
                        fontSize: isActive ? "0.95rem" : "0.7rem",
                      }}
                    >
                      {year}
                    </span>
                  </button>
                )
              })}
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
                <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">
                  {locale === 'en' ? 'Experience' : 'Experiência'}
                </h2>
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
                        <span className="text-muted-foreground font-medium text-sm opacity-50">{exp.year}</span>
                        <div>
                          <h3 className="text-2xl font-medium mb-2 group-hover:text-orange-500 transition-colors">{exp.company}</h3>
                          <p className="text-lg text-foreground mb-4">{getLocalizedText(exp.role, locale)}</p>
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {getLocalizedText(exp.description, locale)}
                          </p>
                          {exp.tech && exp.tech.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {exp.tech.map(t => (
                                <span key={t} className="text-xs uppercase tracking-wider text-muted-foreground/60 border border-border/50 px-2 py-1">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </BlurReveal>
                  </div>
                ))}
              </div>
            </section>

            <section className="min-h-[40vh]">
               <BlurReveal>
                  <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">
                    {locale === 'en' ? 'Expertise' : 'Competências'}
                  </h2>
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
