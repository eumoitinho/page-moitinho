"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedText } from "@/lib/localized-text"
import type { PersonalInfo, Project, Social } from "@/types/portfolio"

/* ── Animation constants ── */
const EASE = [0.16, 1, 0.3, 1] as const
const DURATION = 0.7

/* ── Reusable scroll-reveal wrapper ── */
function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Project Card ── */
function ProjectCard({
  project,
  locale,
  aspectClass,
}: {
  project: Project
  locale: string
  aspectClass: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={`/work/${project.id}`}
      className="group block relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${aspectClass} overflow-hidden`}>
        {project.image ? (
          <img
            src={isHovered && project.gifImage ? project.gifImage : project.image}
            alt={getLocalizedText(project.title, locale as "en" | "pt")}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <span className="text-muted-foreground text-sm tracking-wider">
              {getLocalizedText(project.title, locale as "en" | "pt")}
            </span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#0a0908]/0 group-hover:bg-[#0a0908]/60 transition-all duration-500 flex items-end p-6 opacity-0 group-hover:opacity-100">
          <div className="flex items-center gap-2 text-white drop-shadow-lg">
            <span className="text-base font-semibold tracking-tight">
              {getLocalizedText(project.title, locale as "en" | "pt")}
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ── Main component ── */
interface WorksEditorialProps {
  personalInfo: PersonalInfo
  projects: Project[]
  socials: Social[]
}

export function WorksEditorial({ personalInfo, projects, socials }: WorksEditorialProps) {
  const { locale } = useLanguage()
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (locale === "en") {
      if (hour < 12) setGreeting("Good morning")
      else if (hour < 18) setGreeting("Good afternoon")
      else setGreeting("Good evening")
    } else {
      if (hour < 12) setGreeting("Bom dia")
      else if (hour < 18) setGreeting("Boa tarde")
      else setGreeting("Boa noite")
    }
  }, [locale])

  const featuredProjects = projects.filter((p) => p.featured)
  const allProjects = projects

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-8">
        <div className="flex flex-col gap-24">

          {/* ═══ HERO SECTION ═══ */}
          <section className="flex flex-col gap-12">
            {/* Hero content */}
            <div className="max-w-3xl space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION, delay: 0.1, ease: EASE }}
              >
                <span className="text-lg md:text-xl text-muted-foreground block mb-3">
                  {greeting}.
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1]">
                  {locale === "en"
                    ? `I'm ${personalInfo.name}.`
                    : `Eu sou ${personalInfo.name}.`}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION, delay: 0.2, ease: EASE }}
                className="space-y-3"
              >
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {getLocalizedText(personalInfo.description, locale as "en" | "pt")}
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl hidden md:block">
                  {locale === "en"
                    ? `Currently at ${personalInfo.currentCompany} as ${getLocalizedText(personalInfo.currentRole, "en")}. Based in ${personalInfo.location}.`
                    : `Atualmente na ${personalInfo.currentCompany} como ${getLocalizedText(personalInfo.currentRole, "pt")}. Baseado em ${personalInfo.location}.`}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION, delay: 0.3, ease: EASE }}
                className="pt-4 flex flex-col sm:flex-row gap-4 items-start"
              >
                <Link
                  href="/info"
                  className="inline-flex items-center gap-2 text-base font-medium hover:text-[#0130B4] transition-colors group"
                >
                  {locale === "en" ? "More Information" : "Mais Informações"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="flex gap-4 items-center sm:pl-6 sm:border-l border-border/50">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-[#0130B4] transition-colors uppercase tracking-wider"
                  >
                    Resume (EN)
                  </a>
                  <span className="text-muted-foreground/30">•</span>
                  <a
                    href="/curriculum.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-[#0130B4] transition-colors uppercase tracking-wider"
                  >
                    Currículo (PT)
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Image grid - first row */}
            {featuredProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION, delay: 0.4, ease: EASE }}
                className="flex gap-4 w-full"
              >
                {featuredProjects[0] && (
                  <div className="flex-[2] min-w-0">
                    <ProjectCard
                      project={featuredProjects[0]}
                      locale={locale}
                      aspectClass="aspect-[1.55/1]"
                    />
                  </div>
                )}
                {featuredProjects[1] && (
                  <div className="flex-1 min-w-0 hidden md:block">
                    <ProjectCard
                      project={featuredProjects[1]}
                      locale={locale}
                      aspectClass="aspect-[0.78/1]"
                    />
                  </div>
                )}
                {featuredProjects[2] && (
                  <div className="flex-1 min-w-0 hidden md:block">
                    <ProjectCard
                      project={featuredProjects[2]}
                      locale={locale}
                      aspectClass="aspect-[0.78/1]"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </section>

          {/* ═══ ALL PROJECTS SECTION ═══ */}
          {allProjects.length > 3 && (
            <section>
              <Reveal y={20}>
                <div className="flex items-end justify-between mb-8">
                  <h2 className="text-sm text-muted-foreground tracking-tight">
                    {locale === "en" ? "Selected work" : "Trabalhos selecionados"}
                  </h2>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {locale === "en" ? "View all" : "Ver todos"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allProjects.slice(3).map((project, i) => (
                  <Reveal key={project.id} delay={0.05 * Math.min(i, 6)} y={20}>
                    <ProjectCard
                      project={project}
                      locale={locale}
                      aspectClass="aspect-[1.4/1]"
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* ═══ FOOTER ═══ */}
          <footer className="pt-16">
            <Reveal y={20}>
              <div className="flex flex-col gap-12">
                {/* CTA */}
                <div>
                  <h2 className="text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.1] tracking-[-0.03em] text-foreground mb-6">
                    {locale === "en" ? <>Let&rsquo;s work together.</> : <>Vamos trabalhar juntos.</>}
                  </h2>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>

                {/* Bottom row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-8 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} {personalInfo.name} {personalInfo.lastName}
                  </span>
                  <div className="flex gap-6">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <div className="h-8" />
          </footer>

        </div>
      </div>
    </div>
  )
}
