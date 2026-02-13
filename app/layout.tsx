import type React from "react"
import type { Metadata } from "next"
import { Geist, Playfair_Display, Space_Grotesk, Space_Mono } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
  weight: ["400", "700"],
})

const BASE_URL = "https://moitinho.dev"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "João Vitor Moitinho — Tech Lead & Full-stack Developer",
    template: "%s | Moitinho",
  },
  description:
    "Tech Lead & Full-stack Developer from Brazil. Building high-performance web applications with Next.js, React, TypeScript and Node.js.",
  keywords: [
    "João Vitor Moitinho",
    "Full-stack Developer",
    "Tech Lead",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web Developer Brazil",
  ],
  authors: [{ name: "João Vitor Moitinho", url: BASE_URL }],
  creator: "João Vitor Moitinho",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "pt_BR",
    url: BASE_URL,
    siteName: "Moitinho — Portfolio",
    title: "João Vitor Moitinho — Tech Lead & Full-stack Developer",
    description:
      "Tech Lead & Full-stack Developer from Brazil. Building high-performance web applications with Next.js, React, TypeScript and Node.js.",
  },
  twitter: {
    card: "summary_large_image",
    title: "João Vitor Moitinho — Tech Lead & Full-stack Developer",
    description:
      "Tech Lead & Full-stack Developer from Brazil. Building high-performance web applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "João Vitor Moitinho",
              url: BASE_URL,
              image: `${BASE_URL}/profile-photo.jpg`,
              jobTitle: "Tech Lead & Full-stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "NineTwo Performance",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Curitiba",
                addressRegion: "Paraná",
                addressCountry: "BR",
              },
              sameAs: [
                "https://github.com/eumoitinho",
                "https://linkedin.com/in/joaovitormoitinho",
                "https://behance.net/eumoitinho",
              ],
              knowsAbout: [
                "React", "Next.js", "TypeScript", "Node.js",
                "Vue.js", "Java", "Azure", "Docker",
                "PostgreSQL", "Tailwind CSS",
              ],
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
