"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Experience, Project, PersonalInfo, Article, LocalizedText } from "@/types/portfolio"
import dynamic from "next/dynamic"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedText } from "@/lib/localized-text"
import BilingualInput from "@/components/bilingual-input"
import PhotoUpload from "@/components/photo-upload"

const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), { ssr: false })

export default function AdminPage() {
  const { t, locale, setLocale } = useLanguage()
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  
  const [activeTab, setActiveTab] = useState<"personal" | "experiences" | "projects" | "articles">("personal")
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check")
      const data = await res.json()
      setAuthenticated(data.authenticated)
      if (data.authenticated) {
        loadData()
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      
      if (res.ok) {
        setAuthenticated(true)
        loadData()
      } else {
        setLoginError("Senha incorreta")
      }
    } catch (error) {
      setLoginError("Erro ao fazer login")
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setAuthenticated(false)
    setPassword("")
  }

  const loadData = async () => {
    const [expRes, projRes, articlesRes, personalRes] = await Promise.all([
      fetch("/api/portfolio/experiences"),
      fetch("/api/portfolio/projects"),
      fetch("/api/portfolio/articles"),
      fetch("/api/portfolio/personal"),
    ])
    
    setExperiences(await expRes.json())
    setProjects(await projRes.json())
    setArticles(await articlesRes.json())
    setPersonalInfo(await personalRes.json())
  }

  const saveExperience = async (experience: Experience) => {
    const method = experience.id ? "PUT" : "POST"
    const res = await fetch("/api/portfolio/experiences", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(experience),
    })
    
    if (res.ok) {
      loadData()
      setEditingExperience(null)
    }
  }

  const deleteExperience = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta experiência?")) return
    
    await fetch(`/api/portfolio/experiences?id=${id}`, { method: "DELETE" })
    loadData()
  }

  const saveProject = async (project: Project) => {
    const method = project.id ? "PUT" : "POST"
    const res = await fetch("/api/portfolio/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })
    
    if (res.ok) {
      loadData()
      setEditingProject(null)
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return
    
    await fetch(`/api/portfolio/projects?id=${id}`, { method: "DELETE" })
    loadData()
  }

  const saveArticle = async (article: Article) => {
    const method = article.id ? "PUT" : "POST"
    const res = await fetch("/api/portfolio/articles", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    })
    
    if (res.ok) {
      loadData()
      setEditingArticle(null)
    }
  }

  const deleteArticle = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este artigo?")) return
    
    await fetch(`/api/portfolio/articles?id=${id}`, { method: "DELETE" })
    loadData()
  }

  const savePersonalInfo = async (info: PersonalInfo) => {
    await fetch("/api/portfolio/personal", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    })
    loadData()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="bg-card border border-border rounded-xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-light">{t("admin")}</h1>
              <p className="text-sm text-muted-foreground">{t("enterPassword")}</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                {t("password")}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            
            {loginError && (
              <div className="text-sm text-red-500">{loginError}</div>
            )}
            
            <button
              type="submit"
              className="w-full bg-foreground text-background py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              {t("login")}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-light">{t("admin")}</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === "en" ? "pt" : "en")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-foreground transition-all text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="font-medium">{locale === "en" ? "EN" : "PT"}</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("viewSite")}
            </a>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("personal")}
            className={`px-4 py-2 -mb-px ${
              activeTab === "personal"
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("personalInfo")}
          </button>
          <button
            onClick={() => setActiveTab("experiences")}
            className={`px-4 py-2 -mb-px ${
              activeTab === "experiences"
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("experiences")}
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 -mb-px ${
              activeTab === "projects"
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("projects")}
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-4 py-2 -mb-px ${
              activeTab === "articles"
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("articles")}
          </button>
        </div>

        {activeTab === "personal" && personalInfo && (
          <PersonalInfoForm initialData={personalInfo} onSave={savePersonalInfo} />
        )}

        {activeTab === "experiences" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light">{t("experiences")}</h2>
              <button
                onClick={() =>
                  setEditingExperience({
                    id: "",
                    year: "",
                    role: { en: "", pt: "" },
                    company: "",
                    location: "",
                    description: { en: "", pt: "" },
                    tech: [],
                  })
                }
                className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
              >
                {t("newExperience")}
              </button>
            </div>

            {editingExperience && (
              <ExperienceForm
                experience={editingExperience}
                onSave={saveExperience}
                onCancel={() => setEditingExperience(null)}
              />
            )}

            <div className="grid gap-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{getLocalizedText(exp.role, locale)}</h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.year}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingExperience(exp)}
                        className="px-3 py-1 text-sm border border-border rounded hover:bg-muted transition-colors"
                      >
                        {t("edit")}
                      </button>
                      <button
                        onClick={() => deleteExperience(exp.id)}
                        className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500/10 transition-colors"
                      >
                        {t("delete")}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{getLocalizedText(exp.description, locale)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light">{t("projects")}</h2>
              <button
                onClick={() =>
                  setEditingProject({
                    id: "",
                    title: { en: "", pt: "" },
                    image: "",
                    url: "",
                    category: "",
                    type: "",
                    featured: false,
                    description: { en: "", pt: "" },
                    skills: [],
                  })
                }
                className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
              >
                {t("newProject")}
              </button>
            </div>

            {editingProject && (
              <ProjectForm
                project={editingProject}
                onSave={saveProject}
                onCancel={() => setEditingProject(null)}
              />
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-card border border-border rounded-lg overflow-hidden">
                  {proj.image && (
                    <img src={proj.image} alt={getLocalizedText(proj.title, locale)} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium">{getLocalizedText(proj.title, locale)}</h3>
                        <p className="text-sm text-muted-foreground">{proj.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="px-3 py-1 text-sm border border-border rounded hover:bg-muted transition-colors"
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => deleteProject(proj.id)}
                          className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500/10 transition-colors"
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{getLocalizedText(proj.description, locale)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "articles" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light">{t("articles")}</h2>
              <button
                onClick={() =>
                  setEditingArticle({
                    id: "",
                    title: { en: "", pt: "" },
                    slug: { en: "", pt: "" },
                    excerpt: { en: "", pt: "" },
                    content: { en: "", pt: "" },
                    coverImage: "",
                    category: "",
                    tags: [],
                    publishedAt: "",
                    updatedAt: "",
                    published: false,
                    readTime: 0,
                  })
                }
                className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
              >
                {t("newArticle")}
              </button>
            </div>

            {editingArticle && (
              <ArticleForm
                article={editingArticle}
                onSave={saveArticle}
                onCancel={() => setEditingArticle(null)}
              />
            )}

            <div className="grid gap-4">
              {articles.map((article) => (
                <div key={article.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium">{getLocalizedText(article.title, locale)}</h3>
                        {article.published ? (
                          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-600 rounded">{t("published")}</span>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-600 rounded">{t("draft")}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{getLocalizedText(article.excerpt, locale)}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{new Date(article.publishedAt || article.updatedAt).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US")}</span>
                        <span>•</span>
                        <span>{article.readTime} min</span>
                        {article.category && (
                          <>
                            <span>•</span>
                            <span>{article.category}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingArticle(article)}
                        className="px-3 py-1 text-sm border border-border rounded hover:bg-muted transition-colors"
                      >
                        {t("edit")}
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500/10 transition-colors"
                      >
                        {t("delete")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PersonalInfoForm({
  initialData,
  onSave,
}: {
  initialData: PersonalInfo
  onSave: (data: PersonalInfo) => void
}) {
  const { t } = useLanguage()
  const [data, setData] = useState(initialData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(data)
  }

  const updateLocalizedField = (field: keyof PersonalInfo, lang: "en" | "pt", value: string) => {
    const currentValue = data[field] as LocalizedText
    setData({
      ...data,
      [field]: {
        en: lang === "en" ? value : currentValue.en,
        pt: lang === "pt" ? value : currentValue.pt,
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium mb-4">{t("basicInfo")}</h3>
        
        <PhotoUpload
          currentPhoto={data.photoUrl || "/placeholder-user.jpg"}
          onPhotoChange={(url) => setData({ ...data, photoUrl: url })}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t("name")}</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t("lastName")}</label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t("title")} (EN)</label>
            <input
              type="text"
              value={typeof data.title === "string" ? data.title : data.title.en}
              onChange={(e) => updateLocalizedField("title", "en", e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t("title")} (PT)</label>
            <input
              type="text"
              value={typeof data.title === "string" ? data.title : data.title.pt}
              onChange={(e) => updateLocalizedField("title", "pt", e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t("descriptionLabel")} (EN)</label>
            <textarea
              value={typeof data.description === "string" ? data.description : data.description.en}
              onChange={(e) => updateLocalizedField("description", "en", e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t("descriptionLabel")} (PT)</label>
            <textarea
              value={typeof data.description === "string" ? data.description : data.description.pt}
              onChange={(e) => updateLocalizedField("description", "pt", e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Localização</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t("email")}</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t("location")}</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="available"
            checked={data.availableForWork}
            onChange={(e) => setData({ ...data, availableForWork: e.target.checked })}
            className="w-4 h-4"
          />
          <label htmlFor="available" className="text-sm font-medium">
            {t("availableForWorkLabel")}
          </label>
        </div>

        <h3 className="text-lg font-medium mb-4 mt-6">{t("currentJob")}</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t("job")} (EN)</label>
            <input
              type="text"
              value={typeof data.currentRole === "string" ? data.currentRole : data.currentRole.en}
              onChange={(e) => updateLocalizedField("currentRole", "en", e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t("job")} (PT)</label>
            <input
              type="text"
              value={typeof data.currentRole === "string" ? data.currentRole : data.currentRole.pt}
              onChange={(e) => updateLocalizedField("currentRole", "pt", e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t("company")}</label>
          <input
            type="text"
            value={data.currentCompany}
            onChange={(e) => setData({ ...data, currentCompany: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t("period")}</label>
          <input
            type="text"
            value={data.currentPeriod}
            onChange={(e) => setData({ ...data, currentPeriod: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Mar 2025 — Present"
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
      >
        {t("saveChanges")}
      </button>
    </form>
  )
}

function ExperienceForm({
  experience,
  onSave,
  onCancel,
}: {
  experience: Experience
  onSave: (data: Experience) => void
  onCancel: () => void
}) {
  const { t } = useLanguage()
  const [data, setData] = useState(experience)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-medium">{data.id ? t("editExperience") : t("newExperience")}</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t("periodLabel")}</label>
          <input
            type="text"
            value={data.year}
            onChange={(e) => setData({ ...data, year: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Mar 2025 — Present"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t("location")}</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Curitiba, Brasil"
            required
          />
        </div>
      </div>

      <BilingualInput
        label={t("jobTitle")}
        value={data.role}
        onChange={(value) => setData({ ...data, role: value })}
        required
      />

      <div>
        <label className="block text-sm font-medium mb-2">{t("company")}</label>
        <input
          type="text"
          value={data.company}
          onChange={(e) => setData({ ...data, company: e.target.value })}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
      </div>

      <BilingualInput
        label={t("descriptionLabel")}
        value={data.description}
        onChange={(value) => setData({ ...data, description: value })}
        type="textarea"
        rows={6}
        placeholder={t("descPlaceholder")}
        required
      />

      <div>
        <label className="block text-sm font-medium mb-2">{t("technologies")}</label>
        <input
          type="text"
          value={data.tech.join(", ")}
          onChange={(e) =>
            setData({ ...data, tech: e.target.value.split(",").map((t) => t.trim()) })
          }
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder={t("techPlaceholder")}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
        >
          {t("save")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  )
}

function ProjectForm({
  project,
  onSave,
  onCancel,
}: {
  project: Project
  onSave: (data: Project) => void
  onCancel: () => void
}) {
  const { t } = useLanguage()
  const [data, setData] = useState(project)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-medium">{data.id ? t("editProject") : t("newProject")}</h3>

      <BilingualInput
        label={t("title")}
        value={data.title}
        onChange={(value) => setData({ ...data, title: value })}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t("category")}</label>
          <input
            type="text"
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="WEB DEVELOPMENT"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t("typeLabel")}</label>
          <input
            type="text"
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Design & Development"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("imageUrl")}</label>
        <input
          type="url"
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("projectUrl")}</label>
        <input
          type="url"
          value={data.url}
          onChange={(e) => setData({ ...data, url: e.target.value })}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
      </div>

      <BilingualInput
        label={t("descriptionLabel")}
        value={data.description}
        onChange={(value) => setData({ ...data, description: value })}
        type="textarea"
        rows={4}
        required
      />

      <div>
        <label className="block text-sm font-medium mb-2">{t("skillsLabel")}</label>
        <input
          type="text"
          value={data.skills.join(", ")}
          onChange={(e) =>
            setData({ ...data, skills: e.target.value.split(",").map((s) => s.trim()) })
          }
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Next.js, Design, SEO"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={data.featured}
          onChange={(e) => setData({ ...data, featured: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="featured" className="text-sm font-medium">
          {t("featuredProject")}
        </label>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
        >
          {t("save")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  )
}


function ArticleForm({
  article,
  onSave,
  onCancel,
}: {
  article: Article
  onSave: (data: Article) => void
  onCancel: () => void
}) {
  const { t } = useLanguage()
  const [data, setData] = useState(article)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(data)
  }

  const updateLocalizedContent = (lang: "en" | "pt", value: string, field: "content") => {
    const currentValue = data[field] as LocalizedText
    setData({
      ...data,
      [field]: {
        en: lang === "en" ? value : currentValue.en,
        pt: lang === "pt" ? value : currentValue.pt,
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-medium">{data.id ? t("editArticle") : t("newArticle")}</h3>

      <BilingualInput
        label={t("title")}
        value={data.title}
        onChange={(value) => setData({ ...data, title: value })}
        required
      />

      <BilingualInput
        label={t("slug")}
        value={data.slug}
        onChange={(value) => setData({ ...data, slug: value })}
        placeholder={t("slugPlaceholder")}
      />
      <p className="text-xs text-muted-foreground -mt-4">{t("slugHelp")}</p>

      <BilingualInput
        label={t("excerpt")}
        value={data.excerpt}
        onChange={(value) => setData({ ...data, excerpt: value })}
        type="textarea"
        rows={3}
        placeholder={t("excerptPlaceholder")}
        required
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium">{t("content")}</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-2 text-muted-foreground">{t("englishVersion")}</label>
            <RichTextEditor
              content={typeof data.content === "string" ? data.content : data.content.en}
              onChange={(content) => updateLocalizedContent("en", content, "content")}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-2 text-muted-foreground">{t("portugueseVersion")}</label>
            <RichTextEditor
              content={typeof data.content === "string" ? data.content : data.content.pt}
              onChange={(content) => updateLocalizedContent("pt", content, "content")}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t("coverImage")}</label>
          <input
            type="url"
            value={data.coverImage}
            onChange={(e) => setData({ ...data, coverImage: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t("category")}</label>
          <input
            type="text"
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder={t("categoryPlaceholder")}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("tags")}</label>
        <input
          type="text"
          value={data.tags.join(", ")}
          onChange={(e) =>
            setData({ ...data, tags: e.target.value.split(",").map((t) => t.trim()).filter((t) => t) })
          }
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder={t("tagsPlaceholder")}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={data.published}
          onChange={(e) => setData({ ...data, published: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="published" className="text-sm font-medium">
          {t("publishHelp")}
        </label>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
        >
          {t("save")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  )
}
