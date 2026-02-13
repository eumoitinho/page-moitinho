import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bio",
  description:
    "The person behind the code — a personal look at who João Vitor Moitinho is beyond software engineering.",
  openGraph: {
    title: "Bio | Moitinho",
    description:
      "The person behind the code — a personal look at who João Vitor Moitinho is.",
  },
}

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return children
}
