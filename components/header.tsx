"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-none transition-all duration-300">
      <div className="max-w-[1600px] mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        <div className="flex items-center">
          <Link href="/" className="text-sm font-medium hover:text-muted-foreground transition-colors uppercase tracking-widest">
            João Vitor
          </Link>
        </div>
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link href="/work" className="hidden md:inline-block hover:text-muted-foreground transition-colors">
            {t("work")}
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
        </nav>
      </div>
    </header>
  )
}
