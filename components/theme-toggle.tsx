"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-12 h-6 rounded-full border border-border flex items-center px-1 opacity-50 cursor-default">
        <span className="w-4 h-4 bg-muted-foreground/20 rounded-full" />
      </button>
    )
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-12 h-6 bg-muted border border-border flex items-center p-0.5 cursor-pointer hover:border-foreground transition-colors group"
      aria-label="Toggle theme"
    >
      <div 
        className={`w-4 h-4 bg-foreground transition-all duration-300 ease-in-out absolute top-1 ${isDark ? "left-[calc(100%-1.25rem)]" : "left-1"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
