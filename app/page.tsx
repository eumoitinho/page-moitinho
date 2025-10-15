"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

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

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

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
                <div className="text-xs sm:text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
                  João Vitor
                  <br />
                  <span className="text-muted-foreground">Moitinho</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  Mid‑level Web Developer with a degree in Computer Engineering and a background in
                  graphic design. I build frontends, PWAs and full‑stack solutions that combine
                  <span className="text-foreground"> design</span>, <span className="text-foreground">performance</span>, and
                  <span className="text-foreground"> usability</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Curitiba, Paraná, Brazil</div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="relative inline-block cv-menu-container">
                    <button
                      onClick={() => setCvMenuOpen((v) => !v)}
                      className="relative z-10 overflow-hidden transition-transform duration-150 ease-out active:scale-[0.98] text-white bg-neutral-900/60 border-white/20 border rounded-xl py-2.5 px-5 text-sm sm:text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    >
                      <span className="inline-flex items-center gap-2 font-semibold">Download CV</span>
                    </button>

                    {cvMenuOpen ? (
                      <div className="absolute left-0 mt-2 w-40 sm:w-44 bg-popover border border-border rounded-lg shadow-lg p-1.5 sm:p-2 z-50">
                        <button
                          onClick={() => downloadResume("pt")}
                          className="w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded hover:bg-muted-foreground/5"
                        >
                          Portuguese (PT)
                        </button>
                        <button
                          onClick={() => downloadResume("en")}
                          className="w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded hover:bg-muted-foreground/5"
                        >
                          English (EN)
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

                  {isDownloading ? <div className="text-sm text-muted-foreground">Preparing download…</div> : null}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-12 lg:mt-0">
              <div className="space-y-3 sm:space-y-4">
                <div className="text-xs sm:text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="text-sm sm:text-base text-foreground">Web Developer (Mid)</div>
                  <div className="text-sm sm:text-base text-muted-foreground">@ Ninetwo Performance</div>
                  <div className="text-xs text-muted-foreground">Mar 2025 — Present</div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="text-xs sm:text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "PWA", "Redux", "Node.js", "Firebase"].map((skill) => (
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">Experience</h2>
              <div className="text-xs sm:text-sm text-muted-foreground font-mono">2018 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "Mar 2025 — Present",
                  role: "Web Developer (Mid)",
                  company: "Ninetwo Performance",
                  location: "Curitiba, Brasil",
                  description: `Led prototyping, UI/UX design, and development of e‑commerce platforms, institutional sites, landing pages, and SPAs for clients like Live Academia, Roberto Navarro, Porto de Itapoá, and Rede Web, delivering projects on tight deadlines.
    Developed interactive dashboards for metrics analysis, integrating Google Analytics and Meta Business, enhancing data‑driven decisions.
    Optimized advanced tagging and dashboards for paid traffic, boosting campaign ROI by up to 25%.
    Operated as sole developer, managing full cycle from concept to deployment, ensuring scalability and quality.`,
                  tech: ["React", "Next.js", "TypeScript", "Node.js", "GA4"],
                },
                {
                  year: "Jan 2015 — Present",
                  role: "Founder & Senior Graphic Designer",
                  company: "MSync Creative Studio",
                  location: "Dourados, Brasil",
                  description: `Founded studio specializing in social media, print, motion graphics, and artist portfolios, serving 50+ clients.
    Created press kits and EPKs for artists like Welker (2024), Berg (2023), and Silver Panda (2023), boosting tour visibility.
    Designed promotional materials that increased social engagement by 40%, growing client audiences.
    Managed social platforms and online presence, optimizing organic and paid growth strategies.`,
                  tech: ["Adobe Suite", "Figma", "Illustration"],
                },
                {
                  year: "Aug 2022 — Jan 2025",
                  role: "Senior Social Media Designer",
                  company: "Lemonde Turismo",
                  location: "Campo Grande, Brasil",
                  description: `Produced digital art for travel promotion on social media, raising engagement rates by 35% through visual marketing.
    Built a landing page and Google Sheets API automation, cutting content production time by 50%.
    Optimized campaigns with Meta Business tools and managed Instagram, WhatsApp, Google Business, and Facebook, driving conversions.`,
                  tech: ["Photoshop", "Illustrator", "HTML", "CSS"],
                },
                {
                  year: "Mar 2024 — Jul 2024",
                  role: "Graphic Designer (Contract)",
                  company: "Inspirare Media",
                  location: "Dourados, Brasil",
                  description: `Created social media assets as temporary designer, driving organic interactions.
    Developed strategic content and paid traffic media, enhancing reach and conversions.
    Produced print media for World BT Rio Brilhante 2024 via outsourcing.`,
                  tech: ["Adobe Suite", "Print"],
                },
                {
                  year: "Feb 2022 — Nov 2022",
                  role: "Clinical Engineering Intern",
                  company: "CERDIL",
                  location: "Mato Grosso do Sul, Brasil",
                  description: `Supported maintenance of MRI, CT, and X‑ray systems, achieving 99% operational uptime.
    Gained expertise in PACS systems (Phillips, Siemens, GE), streamlining medical imaging management.
    Collaborated with GE engineers on device maintenance, reducing critical failures.`,
                  tech: ["PACS", "Medical Devices"],
                },
                {
                  year: "Sep 2019 — Feb 2022",
                  role: "Marketing & Design Manager",
                  company: "IncludeMe (Junior Enterprise, UFGD)",
                  location: "Dourados, Brasil",
                  description: `Created visual identities and prospecting projects, strengthening brand and acquiring 20+ clients.
    Implemented Google Workspace for cloud collaboration, boosting team efficiency.
    Applied Kanban and Scrum methodologies, accelerating project deliveries by 30%.`,
                  tech: ["Figma", "Google Workspace", "Agile"],
                },
                {
                  year: "Jul 2018 — Dec 2018",
                  role: "IT Intern",
                  company: "Federal University of Grande Dourados - COIN",
                  location: "Dourados, Brasil",
                  description: `Resolved university system issues, reducing support tickets by 40%.
    Managed Active Directory registrations, securing access for 500+ users.
    Performed preventive maintenance on IT equipment, minimizing downtime.`,
                  tech: ["Active Directory", "Support"],
                },
              ].map((job, index) => (
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
                      <h3 className="text-base sm:text-lg lg:text-xl font-medium">{job.role}</h3>
                      <div className="text-sm sm:text-base text-muted-foreground">{job.company}</div>
                      {job.location ? <div className="text-xs text-muted-foreground">{job.location}</div> : null}
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">Portfolio</h2>

            <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2">
              {[
                {
                  title: "EPK - WELKER 2024",
                  image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/2896a8209254549.Y3JvcCw2OTYsNTQ0LDYwLDI0.png",
                  url: "https://www.behance.net/gallery/209254549/PRESSKIT-WELKER-2024",
                  category: "PRESS KIT",
                  type: "Design & Photography",
                  featured: true,
                  description:
                    "Comprehensive press kit for artist Welker — includes biography, high‑res photography, press images and tour assets used for media outreach and promotional campaigns.",
                  skills: ["Photography", "Graphic Design", "Branding"],
                },
                {
                  title: "Mundial de Beach Tennis - World BT Rio Brilhante ITF®",
                  image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/473506221045579.Y3JvcCwxMjAwLDkzOCwwLDI5.jpg",
                  url: "https://www.behance.net/gallery/221045579/Mundial-de-Beach-Tennis-World-BT-Rio-Brilhante-ITF",
                  category: "EVENT BRANDING",
                  type: "Print & Digital",
                  description:
                    "Visual identity and promotional campaign for the World BT Rio Brilhante ITF event — posters, social cards and print media designed to increase event visibility and ticket sales.",
                  skills: ["Advertising", "Product Design", "Graphic Design"],
                },
                {
                  title: "EPK - Silver Panda 2023",
                  image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/ac80b8175649747.Y3JvcCw3MTMsNTU4LDMxMiwxOTk.png",
                  url: "https://www.behance.net/gallery/175649747/EPK-SILVER-PANDA-2023",
                  category: "PRESS KIT",
                  type: "Graphic Design",
                  description:
                    "Electronic press kit (EPK) and promotional package for Silver Panda — includes release artwork, EPK PDF and social visuals for the 2023 campaign.",
                  skills: ["Graphic Design", "Poster Design"],
                },
                {
                  title: "WELKER - Website",
                  image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/46c5e2220863273.Y3JvcCwyMzgwLDE4NjIsMTQ3Myww.png",
                  url: "https://www.behance.net/gallery/220863273/WELKER-Website",
                  category: "WEB DEVELOPMENT",
                  type: "Design & Development",
                  description:
                    "Responsive website for artist Welker — landing pages for press, tour dates and streaming links, optimized for mobile and SEO.",
                  skills: ["Web Design", "Photography", "Next.js"],
                },
                {
                  title: "Universe - Berg (2023)",
                  image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/6220fd175722695.Y3JvcCwxMTIzLDg3OCwxNTIsNDAz.png",
                  url: "https://www.behance.net/gallery/175722695/SINGLE-COVER-UNIVERSE-BERG-2023",
                  category: "COVER ART",
                  type: "Music Artwork",
                  description:
                    "Single cover art design for 'Universe' by Berg (2023). Artwork created for streaming platforms and social promotion. Metrics: 1.202.000 Spotify streams.",
                  skills: ["Graphic Design", "Illustration", "Advertising"],
                },
                {
                  title: "Rede Web TV — News Portal",
                  image: "https://api.apify.com/v2/key-value-stores/hl9NbYHtINbUwMB3p/records/ji1q6ebtnm4lmfu4.jpeg",
                  url: "https://rwtv.com.br",
                  category: "WEB DEVELOPMENT",
                  type: "Next.js Platform",
                  description:
                    "Developed a high‑performance news portal for Rede Web TV using Next.js 15 and TypeScript. The platform delivers real‑time news to thousands of daily users and serves 15+ cities across multiple regions.",
                  skills: ["Next.js", "Sanity", "SEO", "Localization"],
                },
                {
                  title: "Roberto Navarro — Financial Coach",
                  image: "https://api.apify.com/v2/key-value-stores/hl9NbYHtINbUwMB3p/records/xfhs7lvxdhehm1lv.jpeg",
                  url: "https://robertonavarro.com.br",
                  category: "WEB DEVELOPMENT",
                  type: "SaaS Platform",
                  description:
                    "Built a high‑performance financial coaching platform using Next.js 15, TypeScript and Tailwind CSS. Integrated Vercel Analytics, PostgreSQL and authentication, delivering a conversion‑focused platform with events and WhatsApp integration.",
                  skills: ["Vercel", "PostgreSQL", "Tailwind", "Next.js"],
                },
                {
                  title: "Porto de Itapoá — Port Platform",
                  image: "https://api.apify.com/v2/key-value-stores/hl9NbYHtINbUwMB3p/records/h8f2mgbv9hbrfj2w.jpeg",
                  url: "https://portoitapoa.catalisti.com.br",
                  category: "WEB DEVELOPMENT",
                  type: "Enterprise Platform",
                  description:
                    "Platform for vessel tracking, cargo management and customer portals using Next.js, TypeScript and Tailwind. Implemented interactive dashboards, scheduling integrations and multilingual support.",
                  skills: ["Next.js", "CI/CD", "Tailwind", "Figma"],
                },
                {
                  title: "Live Academia — Gym Network",
                  image: "https://api.apify.com/v2/key-value-stores/hl9NbYHtINbUwMB3p/records/acj6chua1ltmtrmr.jpeg",
                  url: "https://liveacademia.vercel.app",
                  category: "WEB DEVELOPMENT",
                  type: "PWA Platform",
                  description:
                    "Ongoing development of a unified member experience with scheduling, QR check‑in, PWA features and multi‑location management for Live Academia.",
                  skills: ["Next.js", "PWA", "Analytics", "GTM"],
                },
                {
                  title: "Motin Films — Audiovisual Portfolio",
                  image: "https://api.apify.com/v2/key-value-stores/hl9NbYHtINbUwMB3p/records/x5bbjzu0ykwzl140.jpeg",
                  url: "https://motinfilms.com.br",
                  category: "WEB DEVELOPMENT",
                  type: "Creative Portfolio",
                  description:
                    "Cinematic portfolio platform with dynamic video galleries, adaptive streaming and client booking system.",
                  skills: ["Next.js", "Video Optimization", "Streaming"],
                },
                {
                  title: "WELKER — Official Website",
                  image: "/image.png",
                  url: "https://welkermusic.com",
                  category: "WEB DEVELOPMENT",
                  type: "Artist Portfolio",
                  description:
                    "Official website for artist WELKER with bio, press kit, tour dates and streaming links. Built with Next.js for optimal performance and SEO.",
                  skills: ["Next.js", "Design", "SEO"],
                },
                {
                  title: "Skincare Esthetic Beauty — Japan Clinic",
                  image: "/image copy.png",
                  url: "https://skincareestheticbeauty.com",
                  category: "WEB DEVELOPMENT",
                  type: "Beauty & Wellness",
                  description:
                    "Modern e-commerce and booking platform for Japan Clinic skincare services. Features online scheduling, product catalog and customer portal.",
                  skills: ["E-commerce", "Booking System", "UI/UX"],
                },
                {
                  title: "LJ Santos — Law Firm",
                  image: "/image copy 2.png",
                  url: "https://ljsantos.com",
                  category: "WEB DEVELOPMENT",
                  type: "Corporate Website",
                  description:
                    "Professional law firm website with practice areas showcase, attorney profiles and client contact system.",
                  skills: ["Next.js", "Corporate", "Forms"],
                },
                {
                  title: "Diray — Corporate Platform",
                  image: "https://api.apify.com/v2/key-value-stores/hl9NbYHtINbUwMB3p/records/naljyxm1zvll6urx.jpeg",
                  url: "https://diray.com.br",
                  category: "WEB DEVELOPMENT",
                  type: "Corporate Website",
                  description:
                    "Corporate website for Diray with company information, services portfolio and client portal.",
                  skills: ["Next.js", "Corporate", "CMS"],
                },
                {
                  title: "Pedro Barros — Personal Portfolio",
                  image: "https://api.apify.com/v2/key-value-stores/hl9NbYHtINbUwMB3p/records/1yd89xpbekzqy0rk.jpeg",
                  url: "https://pedrobarros.catalisti.com.br",
                  category: "WEB DEVELOPMENT",
                  type: "Personal Brand",
                  description:
                    "Personal portfolio and brand website showcasing work, achievements and professional services.",
                  skills: ["Portfolio", "Design", "Branding"],
                },
                {
                  title: "Provedor Conect — ISP Platform",
                  image: "https://api.apify.com/v2/key-value-stores/hl9NbYHtINbUwMB3p/records/d6aoecjvb58p5gfd.jpeg",
                  url: "https://provedorconect.com.br",
                  category: "WEB DEVELOPMENT",
                  type: "Service Provider",
                  description:
                    "Internet service provider platform with plan showcase, coverage maps and customer support portal.",
                  skills: ["Next.js", "Service Portal", "Maps"],
                },
                {
                  title: "Metal Carbon Hub",
                  image: "https://api.apify.com/v2/key-value-stores/hl9NbYHtINbUwMB3p/records/t6lrfsp14l9l33tw.jpeg",
                  url: "https://www.metalcarbonhub.com.br",
                  category: "WEB DEVELOPMENT",
                  type: "Industrial Platform",
                  description:
                    "Industrial platform for metal and carbon trading hub with market data, product catalog and B2B portal.",
                  skills: ["B2B", "Industrial", "Trading"],
                },
                {
                  title: "Catalisti — Digital Agency",
                  image: "https://api.apify.com/v2/key-value-stores/hl9NbYHtINbUwMB3p/records/uj1sdg8mj9rnk5ao.jpeg",
                  url: "https://catalisti.com.br",
                  category: "WEB DEVELOPMENT",
                  type: "Agency Website",
                  description:
                    "Digital agency showcase with portfolio, services and client case studies. Built with modern web technologies.",
                  skills: ["Agency", "Portfolio", "CMS"],
                },
                {
                  title: "Longo Costa Franco Advocacia",
                  image: "https://api.apify.com/v2/key-value-stores/hl9NbYHtINbUwMB3p/records/k299gn8zqgkagl4l.jpeg",
                  url: "https://legado-advocacia-site-27.vercel.app",
                  category: "WEB DEVELOPMENT",
                  type: "Law Firm",
                  description:
                    "Legal services platform with practice areas, attorney profiles and client intake forms.",
                  skills: ["Legal", "Forms", "CMS"],
                },
              ].map((item, i) => (
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
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {item.description}
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and design.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <Link
                      href="mailto:contato@moitinho.dev"
                      className="group flex items-center gap-2 sm:gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      <span className="text-sm sm:text-base lg:text-lg break-all">contato@moitinho.dev</span>
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
              <div className="text-xs sm:text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { name: "GitHub", handle: "@eumoitinho", url: "https://github.com/eumoitinho" },
                  { name: "LinkedIn", handle: "joaovitormoitinho", url: "https://www.linkedin.com/in/eumoitinho" },
                  { name: "Behance", handle: "eumoitinho", url: "https://www.behance.net/eumoitinho" },
                ].map((social) => (
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

      <div className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
