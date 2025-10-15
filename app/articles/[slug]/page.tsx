"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Article } from "@/types/portfolio"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedText } from "@/lib/localized-text"

export default function ArticlePage() {
  const { t, locale } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const res = await fetch(`/api/portfolio/articles/${params.slug}`)
        if (res.ok) {
          const data = await res.json()
          setArticle(data)
        } else {
          router.push("/")
        }
      } catch (error) {
        console.error("Error loading article:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [params.slug, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">{t("loading") || "Loading..."}</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with Back Button */}
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("back")}
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Cover Image */}
        {article.coverImage && (
          <div className="mb-8 sm:mb-12 -mx-4 sm:mx-0">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-64 sm:h-96 object-cover sm:rounded-xl"
            />
          </div>
        )}

        {/* Article Header */}
        <div className="mb-8 sm:mb-12">
          {/* Category */}
          {article.category && (
            <div className="mb-4">
              <span className="inline-flex items-center text-xs sm:text-sm font-medium px-3 py-1 bg-muted-foreground/10 border border-muted-foreground/20 rounded-full">
                {article.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-4 sm:mb-6">
            {getLocalizedText(article.title, locale)}
          </h1>

          {/* Excerpt */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
            {getLocalizedText(article.excerpt, locale)}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
            <time>{new Date(article.publishedAt).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}</time>
            <span>•</span>
            <span>{article.readTime} {t("readTime")}</span>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 border border-border rounded-full hover:border-muted-foreground/50 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8 sm:mb-12"></div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: getLocalizedText(article.content, locale) }}
        />

        {/* Divider */}
        <div className="border-t border-border mt-12 sm:mt-16 mb-8"></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("backToHome")}
          </Link>

          <div className="text-sm text-muted-foreground">
            {t("updatedOn")} {new Date(article.updatedAt).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US")}
          </div>
        </div>
      </article>
    </div>
  )
}

