"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import type { PortfolioData } from "@/types/portfolio"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedText } from "@/lib/localized-text"

export default function Home() {
  const { locale, setLocale, t } = useLanguage()
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showArticles, setShowArticles] = useState(false)

  useEffect(() => {
    // Load portfolio data
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        setPortfolioData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to load portfolio data:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    } else {
      setIsDark(prefersDark)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const [cvMenuOpen, setCvMenuOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (cvMenuOpen && !target.closest(".cv-menu-container")) {
        setCvMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [cvMenuOpen])

  const downloadResume = async (lang: "en" | "pt") => {
    try {
      setIsDownloading(true)
      // resume is available at /resume.pdf (public/resume.pdf)
      const res = await fetch("/resume.pdf")
      if (!res.ok) throw new Error("Failed to fetch CV")
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      const filename = `JoaoVitor_Moitinho_Silva_CV_${lang === "en" ? "EN" : "PT"}.pdf`
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      alert("Unable to download CV. Please try again.")
    } finally {
      setIsDownloading(false)
      setCvMenuOpen(false)
    }
  }

  if (loading || !portfolioData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Carregando portfólio...</p>
        </div>
      </div>
    )
  }

  const { personalInfo, skills, socials, experiences, projects, articles } = portfolioData

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Back Button - Fixed Left - Only visible on articles section */}
      {showArticles && (
        <button
          onClick={() => setShowArticles(false)}
          className="fixed left-16 sm:left-24 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 group"
          aria-label={t("back")}
        >
          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-border bg-background/80 backdrop-blur-sm hover:border-foreground transition-all duration-300 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {t("back")}
          </span>
        </button>
      )}

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-3"
              aria-label={`Navigate to ${section}`}
            >
              <div
                className={`w-2 h-8 rounded-full transition-all duration-500 ${
                  activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
              <span
                className={`text-sm font-medium whitespace-nowrap transition-all duration-500 ${
                  activeSection === section
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {t(section as any)}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Sliding Container */}
      <div
        className={`flex transition-transform duration-700 ease-in-out ${
          showArticles ? "-translate-x-1/2" : "translate-x-0"
        }`}
        style={{ width: "200%" }}
      >
        {/* Main Content */}
        <div className="w-1/2 flex-shrink-0">
          <main className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 pt-8 sm:pt-0">
        <header
          id="intro"
          ref={(el) => {
            sectionsRef.current[0] = el
          }}
          className="min-h-[calc(100vh-4rem)] sm:min-h-screen flex items-center"
        >
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 w-full">
            <div className="lg:col-span-3 space-y-5 sm:space-y-6 lg:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-xs sm:text-sm text-muted-foreground font-mono tracking-wider">{t("portfolio").toUpperCase()} / 2025</div>
                
                {/* Name with Photo */}
                <div className="flex items-center gap-6">
                  {/* Photo Card */}
                  <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl overflow-hidden border-2 border-border bg-muted/20 hover:border-foreground transition-all duration-300 hover:scale-105">
                    <img
                      src={personalInfo.photoUrl || "/placeholder-user.jpg"}
                      alt={`${personalInfo.name} ${personalInfo.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Name */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                    {personalInfo.name}
                    <br />
                    <span className="text-muted-foreground">{personalInfo.lastName}</span>
                  </h1>
                </div>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  {getLocalizedText(personalInfo.description, locale)}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  {personalInfo.availableForWork && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {t("availableForWork")}
                  </div>
                  )}
                  <div>{personalInfo.location}</div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="relative inline-block cv-menu-container">
                    <button
                      onClick={() => setCvMenuOpen((v) => !v)}
                      className="relative z-10 overflow-hidden transition-transform duration-150 ease-out active:scale-[0.98] text-white bg-neutral-900/60 border-white/20 border rounded-xl py-2.5 px-5 text-sm sm:text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    >
                      <span className="inline-flex items-center gap-2 font-semibold">{t("downloadCV")}</span>
                    </button>

                    {cvMenuOpen ? (
                      <div className="absolute left-0 mt-2 w-40 sm:w-44 bg-popover border border-border rounded-lg shadow-lg p-1.5 sm:p-2 z-50">
                        <button
                          onClick={() => downloadResume("pt")}
                          className="w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded hover:bg-muted-foreground/5"
                        >
                          {t("portuguese")}
                        </button>
                        <button
                          onClick={() => downloadResume("en")}
                          className="w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded hover:bg-muted-foreground/5"
                        >
                          {t("english")}
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <button
                    onClick={toggleTheme}
                    className="p-2.5 sm:p-3 rounded-xl border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-lg"
                    aria-label="Toggle theme"
                  >
                    {isDark ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-foreground sm:w-5 sm:h-5"
                      >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-foreground sm:w-5 sm:h-5"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={() => setLocale(locale === "en" ? "pt" : "en")}
                    className="p-2.5 sm:p-3 rounded-xl border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-lg"
                    aria-label="Change language"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </button>

                  {isDownloading ? <div className="text-sm text-muted-foreground">{t("preparingDownload")}</div> : null}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-12 lg:mt-0">
              <div className="space-y-3 sm:space-y-4">
                <div className="text-xs sm:text-sm text-muted-foreground font-mono">{t("currently").toUpperCase()}</div>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="text-sm sm:text-base text-foreground">{getLocalizedText(personalInfo.currentRole, locale)}</div>
                  <div className="text-sm sm:text-base text-muted-foreground">@ {personalInfo.currentCompany}</div>
                  <div className="text-xs text-muted-foreground">{personalInfo.currentPeriod}</div>
                </div>
              </div>

              {/* Articles Button - Moved here */}
              {!showArticles && (
                <button
                  onClick={() => setShowArticles(true)}
                  className="group flex items-center gap-3 p-4 border border-border rounded-xl hover:border-foreground transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/30 group-hover:bg-foreground/10 transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{t("articles")}</div>
                    <div className="text-xs text-muted-foreground">{articles?.length || 0} {locale === "en" ? "posts" : "posts"}</div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              <div className="space-y-3 sm:space-y-4">
                <div className="text-xs sm:text-sm text-muted-foreground font-mono">{t("focus").toUpperCase()}</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] sm:text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => {
            sectionsRef.current[1] = el
          }}
          className="py-16 sm:py-24 lg:py-32"
        >
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">{t("experience")}</h2>
              <div className="text-xs sm:text-sm text-muted-foreground font-mono">2018 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {experiences.map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 py-5 sm:py-6 lg:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-sm sm:text-base lg:text-xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-2 sm:space-y-3">
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-medium">{getLocalizedText(job.role, locale)}</h3>
                      <div className="text-sm sm:text-base text-muted-foreground">{job.company}</div>
                      {job.location ? <div className="text-xs text-muted-foreground">{job.location}</div> : null}
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">{getLocalizedText(job.description, locale)}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-1.5 sm:gap-2 lg:justify-end mt-1 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] sm:text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => {
            sectionsRef.current[2] = el
          }}
          className="py-16 sm:py-24 lg:py-32"
        >
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">{t("thoughts")}</h2>

            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2">
              {projects.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative overflow-hidden bg-card border border-border rounded-2xl transition-all duration-500 hover:border-muted-foreground/50 hover:shadow-xl ${
                    item.featured ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-4 sm:p-5 lg:p-6 space-y-2.5 sm:space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.category ? (
                        <span className="inline-flex items-center text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 bg-muted-foreground/10 border border-muted-foreground/20 rounded-full">
                          {item.category}
                        </span>
                      ) : null}
                      {item.type ? (
                        <span className="text-[10px] sm:text-xs text-muted-foreground">{item.type}</span>
                      ) : null}
                    </div>
                    <h3 className={`font-medium tracking-tight group-hover:text-muted-foreground transition-colors duration-300 ${
                      item.featured ? "text-lg sm:text-2xl lg:text-3xl" : "text-base sm:text-xl lg:text-2xl"
                    }`}>
                      {getLocalizedText(item.title, locale)}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {getLocalizedText(item.description, locale)}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {item.skills?.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] sm:text-xs text-muted-foreground px-1.5 sm:px-2 py-0.5 sm:py-1 border border-border rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="connect"
          ref={(el) => {
            sectionsRef.current[3] = el
          }}
          className="py-16 sm:py-24 lg:py-32 pb-24 sm:pb-32"
        >
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">{t("letsConnect")}</h2>

              <div className="space-y-6">
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  {t("connectDescription")}
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <Link
                      href={`mailto:${personalInfo.email}`}
                      className="group flex items-center gap-2 sm:gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      <span className="text-sm sm:text-base lg:text-lg break-all">{personalInfo.email}</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                </div>
              </div>
            </div>

              <div className="space-y-5 sm:space-y-6 lg:space-y-8">
              <div className="text-xs sm:text-sm text-muted-foreground font-mono">{t("elsewhere").toUpperCase()}</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {socials.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-3 sm:p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="text-sm sm:text-base text-foreground group-hover:text-muted-foreground transition-colors duration-300">{social.name}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <button className="group p-2.5 sm:p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>
        </div>

        {/* Articles Section */}
        <div className="w-1/2 flex-shrink-0 min-h-screen relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4">{t("articlesTitle")}</h2>
              <p className="text-muted-foreground">{t("articlesSubtitle")}</p>
            </div>

            {articles && articles.length > 0 ? (
              <div className="grid gap-8">
                {articles
                  .filter((article) => article.published)
                  .map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${getLocalizedText(article.slug, locale)}`}
                      className="block group border border-border rounded-xl p-6 hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-lg cursor-pointer"
                    >
                      {article.coverImage && (
                        <img
                          src={article.coverImage}
                          alt={getLocalizedText(article.title, locale)}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                        <time>{new Date(article.publishedAt).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US")}</time>
                        <span>•</span>
                        <span>{article.readTime} {t("readTime")}</span>
                        {article.category && (
                          <>
                            <span>•</span>
                            <span className="px-2 py-0.5 bg-muted-foreground/10 rounded">{article.category}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-2xl font-medium mb-3 group-hover:text-muted-foreground transition-colors">
                        {getLocalizedText(article.title, locale)}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{getLocalizedText(article.excerpt, locale)}</p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 border border-border rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm text-foreground group-hover:gap-3 transition-all">
                        {t("readMore")}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t("noArticles")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
