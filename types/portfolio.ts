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
  highlight?: LocalizedText
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

export interface Education {
  id: string
  year: string
  institution: string
  course: LocalizedText
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  url?: string
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  skills: string[]
  socials: Social[]
  experiences: Experience[]
  education: Education[]
  certifications: Certification[]
  projects: Project[]
  articles: Article[]
}

