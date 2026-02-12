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
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-none transition-all duration-300">
      <div className="max-w-[1600px] mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        <div className="flex items-center">
          <Link href="/" className="text-sm font-medium hover:text-muted-foreground transition-colors uppercase tracking-widest">
            @eumoitinho
          </Link>
        </div>
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link href="/work" className="hidden md:inline-block hover:text-muted-foreground transition-colors">
            {t("work")}
          </Link>
          <Link href="/bio" className="hidden md:inline-block hover:text-muted-foreground transition-colors">
            Bio
          </Link>
          <Link href="/info" className="hidden md:inline-block hover:text-muted-foreground transition-colors">
            {t("intro")}
          </Link>
          <Link href="/contact" className="hidden md:inline-block hover:text-muted-foreground transition-colors">
            {t("letsConnect")}
          </Link>
          <div className="pl-4 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <button
            className="md:hidden p-1 hover:text-muted-foreground transition-colors"
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
          <div className="flex flex-col px-6 py-6 gap-5 text-sm font-medium">
            <Link
              href="/work"
              onClick={() => setMenuOpen(false)}
              className="hover:text-muted-foreground transition-colors"
            >
              {t("work")}
            </Link>
            <Link
              href="/bio"
              onClick={() => setMenuOpen(false)}
              className="hover:text-muted-foreground transition-colors"
            >
              Bio
            </Link>
            <Link
              href="/info"
              onClick={() => setMenuOpen(false)}
              className="hover:text-muted-foreground transition-colors"
            >
              {t("intro")}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-muted-foreground transition-colors"
            >
              {t("letsConnect")}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
