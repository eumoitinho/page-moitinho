"use client"

import { useState, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"

interface PhotoUploadProps {
  currentPhoto: string
  onPhotoChange: (url: string) => void
}

export default function PhotoUpload({ currentPhoto, onPhotoChange }: PhotoUploadProps) {
  const { t, locale } = useLanguage()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError("")
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Upload failed")
      }

      const { url } = await res.json()
      onPhotoChange(url)
    } catch (err: any) {
      setError(err.message || "Failed to upload photo")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium mb-2">
        {locale === "en" ? "Profile Photo" : "Foto de Perfil"}
      </label>
      
      <div className="flex items-center gap-6">
        {/* Preview */}
        <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 border-border bg-muted/20">
          {currentPhoto ? (
            <img
              src={currentPhoto}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex-1 space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
              {uploading
                ? (locale === "en" ? "Uploading..." : "Enviando...")
                : (locale === "en" ? "Choose Photo" : "Escolher Foto")}
            </button>
            
            {currentPhoto && (
              <button
                type="button"
                onClick={() => onPhotoChange("/placeholder-user.jpg")}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                {locale === "en" ? "Remove" : "Remover"}
              </button>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            {locale === "en" 
              ? "JPG, PNG, GIF or WEBP. Max 5MB."
              : "JPG, PNG, GIF ou WEBP. Máx 5MB."}
          </p>

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}

