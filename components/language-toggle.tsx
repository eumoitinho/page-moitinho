"use client"

import * as React from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === "en" ? "pt" : "en")}
      className="cursor-pointer hover:bg-transparent font-medium"
    >
      {locale === "en" ? "PT" : "EN"}
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}
