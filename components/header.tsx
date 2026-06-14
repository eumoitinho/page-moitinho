"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

const EASE = [0.22, 1, 0.36, 1] as const

const CONTACT = {
  email: "joao@moitinho.dev",
  phoneLabel: "+55 41 99503-4442",
  phoneHref: "https://wa.me/5541995034442",
}

const SOCIALS = [
  { name: "GitHub", url: "https://github.com/eumoitinho" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/eumoitinho" },
  { name: "Behance", url: "https://www.behance.net/joaomoitinh1" },
]

export function Header() {
  const { t, locale } = useLanguage()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: locale === "en" ? "Home" : "Início" },
    { href: "/work", label: t("work") },
    { href: "/bio", label: "Bio" },
    { href: "/articles", label: t("articles") },
    { href: "/contact", label: t("connect") },
  ]

  // Inline links shown in the top bar (Home lives only inside the overlay)
  const topLinks = navItems.filter((item) => item.href !== "/")

  // Lock body scroll while the overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Close when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top bar */}
      <nav
        className={`relative z-50 flex items-center justify-between gap-4 px-6 py-5 transition-colors duration-300 md:px-9 ${
          menuOpen ? "bg-transparent" : "border-b border-border bg-background"
        }`}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="shrink-0 text-[20px] font-semibold tracking-[-0.04em] text-foreground"
        >
          moitinho<span className="align-super text-[0.5em]">®</span>
        </Link>

        {/* Inline links spread across the bar (desktop) */}
        <motion.div
          animate={{ opacity: menuOpen ? 0 : 1 }}
          transition={{ duration: 0.25, ease: EASE }}
          className={`hidden flex-1 items-center justify-evenly md:flex ${
            menuOpen ? "pointer-events-none" : ""
          }`}
        >
          {topLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[17px] font-semibold tracking-[-0.04em] transition-colors ${
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </motion.div>

        {/* Right cluster: toggles + hamburger */}
        <div className="flex shrink-0 items-center gap-3">
          <motion.div
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.25, ease: EASE }}
            className={`flex items-center gap-1 ${menuOpen ? "pointer-events-none" : ""}`}
          >
            <LanguageToggle />
            <ThemeToggle />
          </motion.div>

          {/* Hamburger / close */}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative ml-1 flex h-6 w-11 items-center justify-center"
          >
            <motion.span
              className="absolute h-[2px] w-11 rounded-full bg-foreground"
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
            <motion.span
              className="absolute h-[2px] w-11 rounded-full bg-foreground"
              animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-background px-6 pb-10 pt-28 md:px-9 md:pb-14"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              className="flex flex-1 flex-col items-center justify-center gap-1"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: -40 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group relative block overflow-hidden px-2 text-center"
                  >
                    <span className="block text-[44px] font-semibold leading-[1.15] tracking-[-0.06em] text-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full sm:text-6xl md:text-7xl">
                      {item.label}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 flex translate-y-full items-center justify-center text-[44px] font-semibold leading-[1.15] tracking-[-0.06em] text-muted-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 sm:text-6xl md:text-7xl"
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
              className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            >
              <div className="flex flex-col gap-2">
                <a
                  href={CONTACT.phoneHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[18px] font-medium tracking-[-0.04em] text-foreground transition-opacity hover:opacity-70"
                >
                  {CONTACT.phoneLabel}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-2.5 text-[26px] font-semibold tracking-[-0.05em] text-foreground md:text-[34px]"
                >
                  <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-foreground transition-transform duration-300 group-hover:rotate-90">
                    <span className="absolute h-2 w-[2px] bg-background" />
                    <span className="absolute h-[2px] w-2 bg-background" />
                  </span>
                  <span className="border-b-2 border-foreground pb-0.5">{CONTACT.email}</span>
                </a>
              </div>

              <div className="flex items-center gap-6">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium tracking-[-0.04em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {social.name}
                  </a>
                ))}
              </div>

              <p className="text-[14px] font-medium tracking-[-0.04em] text-muted-foreground opacity-70">
                © {new Date().getFullYear()} Moitinho
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
