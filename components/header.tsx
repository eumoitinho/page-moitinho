"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-sm transition-all duration-300">
      <div className="max-w-[1280px] mx-auto flex h-[84px] items-center justify-between px-8 md:px-12">
        <Link
          href="/"
          className="font-mono text-[17px] font-medium text-foreground hover:text-muted-foreground transition-colors tracking-tight"
        >
          @eumoitinho
        </Link>
        <nav className="flex items-center gap-9 text-base">
          <Link href="/work" className="hidden md:inline-block text-muted-foreground hover:text-foreground transition-colors tracking-tight">
            {t("work")}
          </Link>
          <Link href="/bio" className="hidden md:inline-block text-muted-foreground hover:text-foreground transition-colors tracking-tight">
            Bio
          </Link>
          <Link href="/info" className="hidden md:inline-block text-muted-foreground hover:text-foreground transition-colors tracking-tight">
            {t("intro")}
          </Link>
          <a
            href="https://calendar.moitinho.dev/joao"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block text-muted-foreground hover:text-foreground transition-colors tracking-tight">
            {t("letsConnect")}
          </a>
          <div className="flex items-center gap-1.5">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <button
            className="md:hidden p-1 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col px-6 py-5 gap-4 text-sm">
            <Link href="/work" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors tracking-tight">
              {t("work")}
            </Link>
            <Link href="/bio" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors tracking-tight">
              Bio
            </Link>
            <Link href="/info" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors tracking-tight">
              {t("intro")}
            </Link>
            <a
              href="https://calendar.moitinho.dev/joao"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors tracking-tight">
              {t("letsConnect")}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
