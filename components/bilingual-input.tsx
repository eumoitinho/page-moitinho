"use client"

import type { LocalizedText } from "@/types/portfolio"

interface BilingualInputProps {
  label: string
  value: LocalizedText | string
  onChange: (value: LocalizedText) => void
  required?: boolean
  placeholder?: string
  type?: "text" | "textarea"
  rows?: number
}

export default function BilingualInput({
  label,
  value,
  onChange,
  required = false,
  placeholder = "",
  type = "text",
  rows = 4,
}: BilingualInputProps) {
  const currentValue: LocalizedText = typeof value === "string" 
    ? { en: value, pt: value }
    : value

  const handleChange = (lang: "en" | "pt", newValue: string) => {
    onChange({
      en: lang === "en" ? newValue : currentValue.en,
      pt: lang === "pt" ? newValue : currentValue.pt,
    })
  }

  const inputClass = "w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-2">{label} (EN)</label>
        {type === "textarea" ? (
          <textarea
            value={currentValue.en}
            onChange={(e) => handleChange("en", e.target.value)}
            rows={rows}
            className={inputClass}
            placeholder={placeholder}
            required={required}
          />
        ) : (
          <input
            type="text"
            value={currentValue.en}
            onChange={(e) => handleChange("en", e.target.value)}
            className={inputClass}
            placeholder={placeholder}
            required={required}
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">{label} (PT)</label>
        {type === "textarea" ? (
          <textarea
            value={currentValue.pt}
            onChange={(e) => handleChange("pt", e.target.value)}
            rows={rows}
            className={inputClass}
            placeholder={placeholder}
            required={required}
          />
        ) : (
          <input
            type="text"
            value={currentValue.pt}
            onChange={(e) => handleChange("pt", e.target.value)}
            className={inputClass}
            placeholder={placeholder}
            required={required}
          />
        )}
      </div>
    </div>
  )
}

