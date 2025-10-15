# ✅ Animação Corrigida!

## Problema:
A animação estava indo além dos artigos (100% em vez de 50%)

## Solução Aplicada:
```diff
- showArticles ? "-translate-x-full" : "translate-x-0"
+ showArticles ? "-translate-x-1/2" : "translate-x-0"
```

## O que mudou:
- **Antes:** `-translate-x-full` = move 100% (passava dos artigos)
- **Agora:** `-translate-x-1/2` = move 50% (para exatamente nos artigos)

## Como funciona:
```
┌──────────────────────────────────────────────┐
│ Portfolio (50%)  │  Articles (50%)           │
│                  │                           │
│ [Clica →]        │                           │
└──────────────────────────────────────────────┘
        ↓
Move 50% para esquerda ←
        ↓
┌──────────────────────────────────────────────┐
│  Articles (50%)           │ Portfolio (50%)  │
│                           │                  │
│  ✅ PARA AQUI!            │                  │
└──────────────────────────────────────────────┘
```

## Agora você pode:
1. Recarregue a página (Ctrl + F5)
2. Clique no botão "Articles"
3. A página para exatamente na seção de artigos!

**Problema resolvido! 🎯**
