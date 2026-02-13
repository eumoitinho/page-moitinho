"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function NotFound() {
  const { locale } = useLanguage()

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1
          className="text-[8rem] md:text-[12rem] leading-none font-light tracking-tighter text-muted-foreground/20"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          404
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-3 -mt-6">
          {locale === "en" ? "Page not found" : "Página não encontrada"}
        </p>
        <p className="text-muted-foreground mb-10">
          {locale === "en"
            ? "The page you're looking for doesn't exist or has been moved."
            : "A página que você procura não existe ou foi movida."}
        </p>
        <Link
          href="/"
          className="inline-block border border-foreground px-8 py-3 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          {locale === "en" ? "Back to home" : "Voltar ao início"}
        </Link>
      </div>
    </main>
  )
}
