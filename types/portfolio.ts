export interface LocalizedText {
  en: string
  pt: string
}

export interface PersonalInfo {
  name: string
  lastName: string
  title: LocalizedText
  description: LocalizedText
  email: string
  location: string
  availableForWork: boolean
  currentRole: LocalizedText
  currentCompany: string
  currentPeriod: string
  photoUrl?: string
}

export interface Social {
  name: string
  handle: string
  url: string
}

export interface Experience {
  id: string
  year: string
  role: LocalizedText
  company: string
  location: string
  description: LocalizedText
  tech: string[]
}

export interface Project {
  id: string
  title: LocalizedText
  image: string
  url: string
  category: string
  type: string
  featured: boolean
  description: LocalizedText
  skills: string[]
}

export interface Article {
  id: string
  title: LocalizedText
  slug: LocalizedText
  excerpt: LocalizedText
  content: LocalizedText
  coverImage: string
  category: string
  tags: string[]
  publishedAt: string
  updatedAt: string
  published: boolean
  readTime: number
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  skills: string[]
  socials: Social[]
  experiences: Experience[]
  projects: Project[]
  articles: Article[]
}

