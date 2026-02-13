import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with João Vitor Moitinho — available for freelance, consulting and full-time opportunities.",
  openGraph: {
    title: "Contact | Moitinho",
    description:
      "Get in touch with João Vitor Moitinho — available for freelance, consulting and full-time opportunities.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
