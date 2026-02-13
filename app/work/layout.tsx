import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected works by João Vitor Moitinho — web development, e-commerce, SaaS platforms, press kits and more.",
  openGraph: {
    title: "Projects | Moitinho",
    description:
      "Selected works by João Vitor Moitinho — web development, e-commerce, SaaS platforms, press kits and more.",
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children
}
