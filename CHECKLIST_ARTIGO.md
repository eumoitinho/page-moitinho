# 🔍 Checklist: Artigo não aparece no site

## Seu artigo está salvo! ✅
```json
{
  "title": "Teste",
  "published": true  ← CORRETO!
}
```

## Passos para ver o artigo:

### 1️⃣ Recarregue a página principal
```
Pressione Ctrl + F5 (ou Cmd + Shift + R no Mac)
no http://localhost:3000
```

### 2️⃣ Clique no botão "Articles"
```
┌──────────────────────────────────┐
│                                  │
│  [Seu Portfolio]      [→ Articles] ← CLIQUE AQUI
│                                  │
└──────────────────────────────────┘
```
O botão está no **lado direito da tela** com uma seta →

### 3️⃣ Veja a animação
A hero deve deslizar para esquerda e mostrar seus artigos!

## ⚠️ Possíveis Problemas:

### Problema 1: Página não recarregou
**Solução:** Ctrl + F5 (limpa cache)

### Problema 2: Não clicou no botão
**Solução:** Procure o botão "Articles" com seta → no lado direito

### Problema 3: Servidor parou
**Solução:** 
```bash
npm run dev
```

## 🧪 Teste Rápido:

1. Abra: http://localhost:3000
2. Veja se tem o botão "Articles" no lado direito
3. Clique nele
4. A página deve deslizar mostrando artigos

## 📸 Como deve ficar:

**Antes de clicar:**
```
[Portfolio normal]                    [→ Articles]
```

**Depois de clicar:**
```
              [Articles Section]      [← volta]
              ┌─────────────────┐
              │ Teste           │
              │ uhul            │
              │ Dev • 1 min     │
              └─────────────────┘
```

Tente agora e me diga o que acontece!
