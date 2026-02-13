"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1
          className="text-[6rem] md:text-[8rem] leading-none font-light tracking-tighter text-muted-foreground/20"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
        >
          Oops
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-3 -mt-4">
          Something went wrong
        </p>
        <p className="text-muted-foreground mb-10">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-block border border-foreground px-8 py-3 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300 cursor-pointer"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
