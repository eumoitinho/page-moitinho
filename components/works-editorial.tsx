"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ArrowRight, MapPin, Circle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedText } from "@/lib/localized-text"
import type { PersonalInfo, Project, Social } from "@/types/portfolio"

/* ── Animation constants ── */
const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const
const DURATION_FAST = 0.4
const DURATION_BASE = 0.7
const DURATION_SLOW = 1.0

/* ── Reusable scroll-reveal wrapper ── */
function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION_BASE, delay, ease: EDITORIAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Grid background ── */
function GridBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(28,28,28,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(28,28,28,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)",
      }}
    />
  )
}

/* ── Featured Case Study Card ── */
function CaseStudyCard({
  project,
  index,
  locale,
  reversed,
}: {
  project: Project
  index: number
  locale: string
  reversed: boolean
}) {
  const num = String(index + 1).padStart(2, "0")
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={project.url || "#"}
      target="_blank"
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border overflow-hidden transition-all`}
        style={{
          borderColor: isHovered ? "var(--editorial-border-dark)" : "var(--editorial-border)",
          boxShadow: isHovered ? "0 8px 30px rgba(28,28,28,0.08)" : "none",
          transitionDuration: "700ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Image side */}
        <div
          className={`aspect-[16/10] lg:aspect-auto overflow-hidden ${reversed ? "lg:order-2" : ""}`}
          style={{ borderRight: reversed ? "none" : "1px solid var(--editorial-border)", borderLeft: reversed ? "1px solid var(--editorial-border)" : "none" }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={getLocalizedText(project.title, locale as "en" | "pt")}
              className="w-full h-full object-cover transition-transform"
              style={{
                transitionDuration: "1200ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                minHeight: "400px",
              }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: "var(--editorial-card-bg)", color: "var(--editorial-muted)", minHeight: "400px" }}
            >
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                No Preview
              </span>
            </div>
          )}
        </div>

        {/* Content side */}
        <div className={`p-8 md:p-12 flex flex-col justify-between ${reversed ? "lg:order-1" : ""}`}>
          <div>
            {/* Number + Category */}
            <div className="flex items-center justify-between mb-8">
              <span
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  color: "var(--editorial-muted)",
                }}
              >
                {num}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--editorial-muted)",
                }}
              >
                {project.type}
              </span>
            </div>

            {/* Title */}
            <h3
              className="mb-5 leading-tight"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                fontWeight: 400,
                color: "var(--editorial-fg)",
                letterSpacing: "-0.02em",
              }}
            >
              {getLocalizedText(project.title, locale as "en" | "pt")}
            </h3>

            {/* Highlight quote */}
            {project.highlight && (
              <div
                className="mb-6 pl-4"
                style={{ borderLeft: "2px solid var(--editorial-accent)" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                    color: "var(--editorial-accent)",
                  }}
                >
                  {getLocalizedText(project.highlight, locale as "en" | "pt")}
                </p>
              </div>
            )}

            {/* Description */}
            <p
              className="mb-8"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "0.88rem",
                lineHeight: 1.7,
                color: "var(--editorial-muted)",
              }}
            >
              {getLocalizedText(project.description, locale as "en" | "pt")}
            </p>

            {/* Skills tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5"
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--editorial-fg)",
                    border: "1px solid var(--editorial-border)",
                    background: "var(--editorial-card-bg)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* View Project link */}
          <div
            className="flex items-center gap-2 pt-6"
            style={{ borderTop: "1px solid var(--editorial-border)" }}
          >
            <span
              className="transition-all"
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: isHovered ? "var(--editorial-accent)" : "var(--editorial-fg)",
                transitionDuration: "400ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {locale === "en" ? "View Project" : "Ver Projeto"}
            </span>
            <ArrowUpRight
              className="w-4 h-4 transition-all"
              style={{
                color: isHovered ? "var(--editorial-accent)" : "var(--editorial-fg)",
                transform: isHovered ? "translate(2px, -2px)" : "translate(0, 0)",
                transitionDuration: "400ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
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

  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundColor: "var(--editorial-bg)",
        color: "var(--editorial-fg)",
      }}
    >
      <GridBackground />

      <div className="relative z-10">
        {/* ═══ HERO ═══ */}
        <section className="pt-32 md:pt-40 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 items-end">
            {/* Name — spans 3 cols */}
            <div className="md:col-span-3">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION_BASE, delay: 0.2, ease: EDITORIAL_EASE }}
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                  color: "var(--editorial-fg)",
                }}
                className="text-[3.5rem] md:text-[5.5rem] lg:text-[7rem]"
              >
                {personalInfo.name}
                <br />
                {personalInfo.lastName}
              </motion.h1>
            </div>

            {/* Meta info — col 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION_BASE, delay: 0.4, ease: EDITORIAL_EASE }}
              className="flex flex-col gap-4"
            >
              {personalInfo.availableForWork && (
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: "var(--editorial-accent)" }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-space-mono)",
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.3em",
                      color: "var(--editorial-accent)",
                    }}
                  >
                    {locale === "en" ? "Available for work" : "Disponível"}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" style={{ color: "var(--editorial-muted)" }} />
                <span
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "var(--editorial-muted)",
                  }}
                >
                  {personalInfo.location}
                </span>
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="transition-colors"
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: "0.7rem",
                  color: "var(--editorial-muted)",
                  transitionDuration: "400ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--editorial-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--editorial-muted)")}
              >
                {personalInfo.email}
              </a>
            </motion.div>
          </div>
        </section>

        {/* ═══ DIVIDER ═══ */}
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DURATION_SLOW, delay: 0.5, ease: EDITORIAL_EASE }}
            style={{
              height: "1px",
              backgroundColor: "var(--editorial-border)",
              transformOrigin: "left",
            }}
          />
        </div>

        {/* ═══ FEATURED WORK HEADER ═══ */}
        <section className="pt-12 pb-8 px-6 md:px-12 max-w-[1400px] mx-auto">
          <Reveal delay={0.6} y={20}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    color: "var(--editorial-fg)",
                  }}
                >
                  {locale === "en" ? "Featured Work" : "Trabalhos em Destaque"}
                </h2>
                <p
                  className="mt-3 max-w-md"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    color: "var(--editorial-muted)",
                  }}
                >
                  {locale === "en"
                    ? "Selected case studies from products I've built end-to-end."
                    : "Estudos de caso selecionados de produtos que construí do início ao fim."}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "var(--editorial-muted)",
                }}
              >
                {String(featuredProjects.length).padStart(2, "0")} {locale === "en" ? "Projects" : "Projetos"}
              </span>
            </div>
          </Reveal>
        </section>

        {/* ═══ DIVIDER ═══ */}
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
          <Reveal delay={0.7} y={0}>
            <div style={{ height: "1px", backgroundColor: "var(--editorial-border)" }} />
          </Reveal>
        </div>

        {/* ═══ FEATURED CASE STUDIES ═══ */}
        <section className="py-12 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="space-y-8">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.id} delay={0.1 * Math.min(index, 4)} y={50}>
                <CaseStudyCard
                  project={project}
                  index={index}
                  locale={locale}
                  reversed={index % 2 !== 0}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══ VIEW ALL PROJECTS ═══ */}
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto pb-12">
          <Reveal y={20}>
            <div
              className="py-8 flex items-center justify-center"
              style={{ borderTop: "1px solid var(--editorial-border)", borderBottom: "1px solid var(--editorial-border)" }}
            >
              <Link
                href="/work"
                className="inline-flex items-center gap-3 group transition-all"
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--editorial-fg)",
                  transitionDuration: "400ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--editorial-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--editorial-fg)")}
              >
                {locale === "en" ? "View All Projects" : "Ver Todos os Projetos"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ═══ FOOTER DIVIDER ═══ */}
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
          <Reveal y={0}>
            <div style={{ height: "1px", backgroundColor: "var(--editorial-border)" }} />
          </Reveal>
        </div>

        {/* ═══ FOOTER CTA ═══ */}
        <footer className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
          <Reveal y={30}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
              {/* CTA text */}
              <div className="md:col-span-2">
                <h2
                  className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[0.95] mb-8"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 400,
                    letterSpacing: "-0.03em",
                    color: "var(--editorial-fg)",
                  }}
                >
                  {locale === "en" ? <>Let&rsquo;s work<br />together.</> : <>Vamos trabalhar<br />juntos.</>}
                </h2>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-block transition-colors"
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    color: "var(--editorial-muted)",
                    borderBottom: "1px solid var(--editorial-border)",
                    paddingBottom: "4px",
                    transitionDuration: "400ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--editorial-accent)"
                    e.currentTarget.style.borderBottomColor = "var(--editorial-accent)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--editorial-muted)"
                    e.currentTarget.style.borderBottomColor = "var(--editorial-border)"
                  }}
                >
                  {personalInfo.email}
                </a>
              </div>

              {/* Socials */}
              <div className="md:col-span-1 md:col-start-4 flex flex-col gap-3">
                <span
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    color: "var(--editorial-muted)",
                  }}
                >
                  {locale === "en" ? "Connect" : "Contato"}
                </span>
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-all"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontSize: "0.95rem",
                      color: "var(--editorial-fg)",
                      transitionDuration: "400ms",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--editorial-accent)"
                      e.currentTarget.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--editorial-fg)"
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    {social.name}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Copyright */}
          <Reveal delay={0.2} y={10}>
            <div
              className="mt-24 pt-8"
              style={{ borderTop: "1px solid var(--editorial-border)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--editorial-muted)",
                }}
              >
                &copy; {new Date().getFullYear()} {personalInfo.name} {personalInfo.lastName}. All rights reserved.
              </span>
            </div>
          </Reveal>
        </footer>
      </div>
    </div>
  )
}
