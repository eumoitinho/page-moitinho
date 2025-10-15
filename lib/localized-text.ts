import type { LocalizedText } from "@/types/portfolio"
import type { Locale } from "./i18n"

export function getLocalizedText(text: LocalizedText | string, locale: Locale): string {
  // Se é string simples, retorna ela
  if (typeof text === "string") {
    return text
  }
  
  // Se é objeto localizado, retorna no idioma correto
  return text[locale] || text.en || ""
}

export function createLocalizedText(enText: string, ptText?: string): LocalizedText {
  return {
    en: enText,
    pt: ptText || enText,
  }
}

