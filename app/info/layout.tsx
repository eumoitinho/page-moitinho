import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description:
    "Experience, education, certifications and skills of João Vitor Moitinho — Tech Lead & Full-stack Developer.",
  openGraph: {
    title: "About | Moitinho",
    description:
      "Experience, education, certifications and skills of João Vitor Moitinho.",
  },
}

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return children
}
