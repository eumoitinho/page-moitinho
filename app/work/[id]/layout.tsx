import type { Metadata } from "next"
import portfolioData from "@/data/portfolio.json"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = portfolioData.projects.find((p) => String(p.id) === id)

  if (!project) {
    return { title: "Project Not Found" }
  }

  const title = project.title
  const description =
    typeof project.description === "object"
      ? project.description.en
      : project.description ?? `${title} — project by João Vitor Moitinho`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Moitinho`,
      description,
    },
  }
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children
}
