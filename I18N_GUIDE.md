# 🌍 Sistema de Internacionalização (i18n) - Guia Completo

## ✅ O Que Foi Implementado

### 1. **Seletor de Idioma** 🗣️
- Botão fixo no canto superior direito
- Alterna entre EN (Inglês) e PT (Português)
- Ícone de idiomas + indicador visual
- Salva preferência no localStorage

### 2. **Botão Articles Reposicionado** 📍
- **ANTES:** `right-4 sm:right-8` (muito no extremo)
- **AGORA:** `right-16 sm:right-24` (mais para dentro)
- Posição melhorada e mais acessível

### 3. **Traduções Completas** 📝
- Todas as seções principais traduzidas
- Navegação, botões, labels
- Mensagens de status
- Artigos e metadata

## 📁 Estrutura de Arquivos

```
portfolio/
├── lib/
│   └── i18n.ts                    # Traduções PT/EN
├── contexts/
│   └── language-context.tsx      # Context Provider
└── app/
    ├── layout.tsx                 # LanguageProvider adicionado
    ├── page.tsx                   # Usa traduções
    └── articles/[slug]/page.tsx   # Usa traduções
```

## 🎯 Como Funciona

### Detecção Automática de Idioma

```typescript
// 1. Verifica localStorage primeiro
const saved = localStorage.getItem("locale")

// 2. Se não tem, detecta do navegador
const browserLang = navigator.language
// "pt-BR" → usa "pt"
// "en-US" → usa "en"

// 3. Salva a escolha
localStorage.setItem("locale", "pt")
```

### Uso no Código

```typescript
import { useLanguage } from "@/contexts/language-context"

function MyComponent() {
  const { t, locale, setLocale } = useLanguage()
  
  return (
    <div>
      <h1>{t("portfolio")}</h1>
      <p>{t("availableForWork")}</p>
    </div>
  )
}
```

## 🗂️ Traduções Disponíveis

### Navegação
- `intro` - Início / Intro
- `work` - Experiência / Work
- `thoughts` - Portfólio / Portfolio
- `connect` - Contato / Connect
- `articles` - Artigos / Articles

### Hero Section
- `portfolio` - PORTFÓLIO / PORTFOLIO
- `availableForWork` - Disponível para trabalho / Available for work
- `currently` - ATUALMENTE / CURRENTLY
- `focus` - FOCO / FOCUS
- `downloadCV` - Baixar Currículo / Download Resume

### Idiomas
- `portuguese` - Português (PT) / Portuguese (PT)
- `english` - Inglês (EN) / English (EN)

### Artigos
- `articlesTitle` - Artigos / Articles
- `articlesSubtitle` - Pensamentos... / Thoughts...
- `noArticles` - Nenhum artigo... / No articles...
- `readMore` - Ler mais / Read more
- `readTime` - min de leitura / min read
- `back` - Voltar / Back
- `backToHome` - Voltar ao início / Back to home
- `updatedOn` - Atualizado em / Updated on

### Seções
- `experience` - Experiência / Experience
- `letsConnect` - Vamos Conversar / Let's Connect
- `connectDescription` - Sempre interessado... / Always interested...
- `elsewhere` - REDES / ELSEWHERE

## 🎨 Componentes Visuais

### Seletor de Idioma
```
┌──────────────────────────────────┐
│                        [🌍 EN] ← │  Clique aqui
└──────────────────────────────────┘
```

Posição: Canto superior direito, fixo

### Botão Articles (Reposicionado)
```
┌──────────────────────────────────┐
│                                  │
│  [Portfolio]       [→]  ← Mais   │
│                  Articles  perto │
│                                  │
└──────────────────────────────────┘
```

**Antes:** `right-8` (muito no extremo)  
**Agora:** `right-24` (mais acessível) ✅

## 🚀 Como Usar

### Trocar Idioma
1. Clique no botão **EN** ou **PT** no canto superior direito
2. A página atualiza instantaneamente
3. Preferência é salva automaticamente

### Adicionar Nova Tradução

1. **Abra:** `lib/i18n.ts`
2. **Adicione em ambos os idiomas:**

```typescript
export const translations = {
  en: {
    // ...
    myNewKey: "My Text",
  },
  pt: {
    // ...
    myNewKey: "Meu Texto",
  },
}
```

3. **Use no componente:**

```typescript
const { t } = useLanguage()
<p>{t("myNewKey")}</p>
```

### Formatar Datas por Idioma

```typescript
const { locale } = useLanguage()

// Formatação automática
date.toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US")

// Resultado:
// PT: 15 de outubro de 2025
// EN: October 15, 2025
```

## 🌐 Idiomas Suportados

Atualmente:
- 🇧🇷 **PT** - Português (Brasil)
- 🇺🇸 **EN** - English (US)

### Adicionar Novo Idioma

1. **Edite tipos:** `lib/i18n.ts`
```typescript
export type Locale = "en" | "pt" | "es" // ← adicione "es"
```

2. **Adicione traduções:**
```typescript
export const translations = {
  en: { ... },
  pt: { ... },
  es: {
    portfolio: "PORTAFOLIO",
    // ... todas as traduções
  }
}
```

3. **Atualize o seletor** no `app/page.tsx`

## 💾 Persistência

### localStorage
```javascript
// Salva automaticamente
localStorage.setItem("locale", "pt")

// Carrega automaticamente ao abrir
const saved = localStorage.getItem("locale")
```

### Detecta do Navegador
Se não tem preferência salva, detecta do navegador:
```javascript
navigator.language
// "pt-BR" → usa "pt"
// "en-US" → usa "en"
// "es-ES" → usa "en" (fallback)
```

## 🎯 Onde as Traduções Aparecem

### ✅ Página Principal
- Navegação lateral
- Hero (Portfolio, Currently, Focus)
- Botão Download CV
- Seção Experience
- Seção Portfolio
- Seção Let's Connect
- Elsewhere/Redes

### ✅ Seção de Artigos
- Título "Articles"
- Subtítulo
- "Ler mais" / "Read more"
- Tempo de leitura
- "Nenhum artigo..."

### ✅ Página de Artigo
- Voltar
- Tempo de leitura
- Data formatada
- "Voltar ao início"
- "Atualizado em"

### 🔜 Admin (Futuro)
Você pode adicionar traduções no admin seguindo o mesmo padrão!

## 📊 Estatísticas

- ✅ 2 idiomas implementados
- ✅ 30+ traduções
- ✅ Detecção automática
- ✅ Persistência em localStorage
- ✅ Type-safe (TypeScript)
- ✅ 0 dependências externas

## 💡 Melhorias Futuras (Opcional)

1. **Mais idiomas:** ES, FR, DE
2. **Tradução de conteúdo:** Permitir artigos em múltiplos idiomas
3. **Detecção por GeoIP:** Sugerir idioma baseado em localização
4. **Admin traduzido:** Painel admin em PT/EN
5. **URL com idioma:** `/pt/articles`, `/en/articles`

## 🔧 API do Hook

```typescript
const { 
  locale,      // "en" | "pt"
  setLocale,   // (locale: "en" | "pt") => void
  t            // (key: string) => string
} = useLanguage()

// Exemplos:
locale                    // "pt"
setLocale("en")          // Muda para inglês
t("portfolio")           // "PORTFOLIO" ou "PORTFÓLIO"
t("availableForWork")    // Tradução automática
```

## ✨ Features Implementadas

✅ **Seletor visual** no topo da página  
✅ **Detecção automática** do navegador  
✅ **Persistência** da escolha  
✅ **Type-safe** com TypeScript  
✅ **Leve** (sem bibliotecas externas)  
✅ **Fácil** de adicionar novas traduções  
✅ **Botão Articles** reposicionado  

## 🎉 Teste Agora!

1. **Recarregue a página:** `Ctrl + F5`
2. **Veja o botão EN/PT** no canto superior direito
3. **Clique para alternar** entre idiomas
4. **Veja tudo traduzir** instantaneamente!

---

**Sistema i18n completo e profissional! 🌍✨**

