"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"

const order = ["light", "dark", "system"] as const
type Theme = (typeof order)[number]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-8 h-8 flex items-center justify-center opacity-50 cursor-default">
        <Sun className="w-4 h-4" />
      </button>
    )
  }

  const current = (order as readonly string[]).includes(theme as string) ? (theme as Theme) : "system"
  const next = order[(order.indexOf(current) + 1) % order.length]

  const Icon = current === "light" ? Sun : current === "dark" ? Moon : Monitor
  const label =
    current === "light"
      ? "Theme: light. Switch to dark."
      : current === "dark"
      ? "Theme: dark. Switch to system."
      : "Theme: system. Switch to light."

  return (
    <button
      onClick={() => setTheme(next)}
      className="w-8 h-8 flex items-center justify-center hover:text-muted-foreground transition-colors cursor-pointer"
      aria-label={label}
      title={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}
