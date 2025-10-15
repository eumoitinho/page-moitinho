# 🚀 Iniciar e Usar o Sistema de Artigos

## ▶️ Iniciar o Projeto

```bash
cd /home/moitinho/Documents/Projetos/portfolio
npm run dev
```

Aguarde aparecer:
```
✓ Ready in X.Xs
○ Local: http://localhost:3000
```

## 📝 Criar Seu Primeiro Artigo

### Passo 1: Acessar Admin
1. Abra: `http://localhost:3000/admin`
2. Login com senha: `admin123`
3. Clique na aba **"Artigos"**

### Passo 2: Criar Artigo
1. Clique em **"Novo Artigo"**
2. Preencha:

```
Título: Bem-vindo ao meu blog!
Slug: (deixe vazio - será gerado automaticamente)
Resumo: Primeiro post do meu portfólio com sistema de artigos.
```

### Passo 3: Usar o Editor
- Digite seu conteúdo
- Use a barra de ferramentas:
  - **B** = Negrito
  - **I** = Itálico
  - **H2/H3** = Títulos
  - **• List** = Lista com bullets
  - **Link** = Adicionar link
  - **Image** = Adicionar imagem

Exemplo de conteúdo:
```
Olá! Este é meu primeiro artigo.

Aqui estão algumas coisas que você pode fazer:

- Formatar texto
- Adicionar imagens
- Criar listas
- E muito mais!
```

### Passo 4: Adicionar Detalhes
```
Imagem de Capa: https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d
Categoria: Desenvolvimento
Tags: blog, portfolio, nextjs
☑️ Marcar: Publicar artigo
```

### Passo 5: Salvar
Clique em **"Salvar"**

## 👀 Ver o Artigo no Site

1. Abra nova aba: `http://localhost:3000`
2. Clique no botão **"Articles"** (seta →) no lado direito
3. Veja a animação de slide!
4. Seu artigo aparecerá na lista

## ✏️ Editar Artigo

1. `/admin` → Aba "Artigos"
2. Clique em **"Editar"** no artigo
3. Faça suas alterações
4. Clique em **"Salvar"**

## 🗑️ Excluir Artigo

1. `/admin` → Aba "Artigos"
2. Clique em **"Excluir"** no artigo
3. Confirme a exclusão

## 📊 Status do Artigo

### 🟢 Publicado
- Visível no site
- Aparece quando clica em "Articles"

### 🟡 Rascunho
- NÃO visível no site
- Apenas você vê no admin
- Útil para trabalhar no artigo antes de publicar

## 💡 Dicas Rápidas

### Adicionar Imagem de Capa
- Use Unsplash: `https://unsplash.com`
- Ou coloque em `/public/articles/cover.jpg`
- Use: `/articles/cover.jpg`

### Adicionar Imagem no Conteúdo
1. No editor, clique em **"Image"**
2. Cole a URL da imagem
3. Imagem aparece no texto

### Tags Úteis
```
Para desenvolvimento: react, nextjs, typescript, javascript
Para design: figma, ui, ux, design-system
Para tutoriais: tutorial, guia, passo-a-passo
```

### Categorias Sugeridas
- Desenvolvimento
- Design
- Tutorial
- Pensamentos
- Notícias

## 🎯 Atalhos

| Ação | Atalho |
|------|--------|
| Novo Artigo | `/admin` → Artigos → Novo Artigo |
| Ver Artigos | `/` → Botão "Articles" |
| Editar | `/admin` → Artigos → Editar |

## 🐛 Problemas Comuns

### "Artigo não aparece no site"
✅ Solução: Marque "Publicar artigo" e salve

### "Imagem não carrega"
✅ Solução: Verifique se a URL está correta

### "Formatação sumiu"
✅ Solução: Recarregue a página do admin

## 🎉 Pronto!

Agora você tem um sistema completo de artigos no seu portfólio!

**Happy blogging! 📝✨**
