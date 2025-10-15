# 📝 Sistema de Artigos - Guia Completo

## ✨ Recursos Implementados

### 🎯 Frontend

1. **Botão "Articles" com Seta**
   - Fixo no lado direito da tela
   - Animação de rotação ao clicar
   - Indica claramente a ação

2. **Animação de Slide Lateral**
   - Hero section desliza suavemente para esquerda
   - Seção de artigos aparece deslizando da direita
   - Transição suave de 700ms

3. **Listagem de Artigos**
   - Cards com imagem de capa
   - Data de publicação e tempo de leitura
   - Categorias e tags
   - Status (Publicado/Rascunho)
   - Design responsivo

### ⚙️ Backend/Admin

1. **Editor Rich Text (TipTap)**
   - Negrito, itálico
   - Títulos (H2, H3)
   - Listas (ordenadas e não ordenadas)
   - Citações
   - Links
   - Imagens
   - Blocos de código

2. **Gerenciamento Completo**
   - Criar novos artigos
   - Editar artigos existentes
   - Excluir artigos
   - Publicar/despublicar
   - Upload de imagens via URL

3. **Recursos Automáticos**
   - Geração automática de slug
   - Cálculo automático de tempo de leitura
   - Timestamps automáticos

## 🚀 Como Usar

### Criar um Novo Artigo

1. Acesse `/admin`
2. Clique na aba "Artigos"
3. Clique em "Novo Artigo"
4. Preencha:
   - **Título**: Título do artigo
   - **Slug**: URL amigável (deixe vazio para gerar automaticamente)
   - **Resumo**: Descrição breve (aparece no card)
   - **Conteúdo**: Use o editor rich text
   - **Imagem de Capa**: URL da imagem (pode ser externa ou local em `/public`)
   - **Categoria**: Ex: "Desenvolvimento", "Design"
   - **Tags**: Separadas por vírgula (ex: "react, nextjs, typescript")
   - **Publicar**: Marque para tornar visível no site

5. Clique em "Salvar"

### Editor Rich Text - Comandos

- **Negrito**: Selecione texto e clique em "B"
- **Itálico**: Selecione texto e clique em "I"
- **Título**: Clique em "H2" ou "H3"
- **Lista**: Clique em "• List" (bullets) ou "1. List" (numerada)
- **Citação**: Clique em "Quote"
- **Link**: Selecione texto, clique em "Link" e insira a URL
- **Imagem**: Clique em "Image" e insira a URL
- **Código**: Clique em "Code" para bloco de código

### Ver Artigos no Site

1. Acesse a página principal (`/`)
2. Clique no botão "Articles" (seta para direita)
3. A hero desliza para esquerda mostrando os artigos
4. Apenas artigos marcados como "Publicados" aparecem

### Gerenciar Artigos Existentes

1. Na aba "Artigos" do admin
2. Veja lista de todos os artigos
3. Status visual:
   - 🟢 Verde = Publicado
   - 🟡 Amarelo = Rascunho
4. Botões:
   - **Editar**: Modificar o artigo
   - **Excluir**: Remover permanentemente

## 🎨 Personalização

### Adicionar Imagens

**Opção 1: URL Externa**
```
https://images.unsplash.com/photo-xyz
```

**Opção 2: Imagem Local**
1. Coloque a imagem em `/public`
2. Use: `/minha-imagem.jpg`

### Categorias Sugeridas

- Desenvolvimento
- Design
- Tutorial
- Pensamentos
- Notícias
- Tecnologia

### Tags Comuns

- react
- nextjs
- typescript
- javascript
- css
- design
- ux
- performance
- seo

## 📊 Dados Salvos

Todos os artigos são salvos em:
```
data/portfolio.json
```

Estrutura de um artigo:
```json
{
  "id": "1",
  "title": "Meu Primeiro Artigo",
  "slug": "meu-primeiro-artigo",
  "excerpt": "Breve descrição...",
  "content": "<p>Conteúdo em HTML...</p>",
  "coverImage": "/cover.jpg",
  "category": "Desenvolvimento",
  "tags": ["react", "nextjs"],
  "publishedAt": "2025-10-15T05:00:00.000Z",
  "updatedAt": "2025-10-15T05:00:00.000Z",
  "published": true,
  "readTime": 5
}
```

## 🔍 SEO e Compartilhamento

### Tempo de Leitura

Calculado automaticamente baseado em:
- 200 palavras por minuto
- Contagem de palavras do conteúdo

### Slug/URL

- Gerado automaticamente do título
- Remove acentos e caracteres especiais
- Substitui espaços por hífens
- Exemplo: "Como Usar React" → "como-usar-react"

## 💡 Dicas

1. **Imagens**: Use imagens de alta qualidade mas otimizadas (< 500KB)
2. **Resumo**: Mantenha entre 100-200 caracteres para melhor visualização
3. **Título**: Use títulos claros e descritivos (max 60 caracteres para SEO)
4. **Tags**: Use 3-5 tags relevantes por artigo
5. **Conteúdo**: Quebre em parágrafos curtos para melhor leitura
6. **Rascunhos**: Desmarque "Publicar" para trabalhar no artigo antes de publicar

## 🐛 Troubleshooting

### Artigo não aparece no site
- Verifique se está marcado como "Publicado"
- Recarregue a página principal

### Imagens não aparecem
- Verifique se a URL está correta
- Teste a URL em uma nova aba do navegador
- Para imagens locais, certifique-se que estão em `/public`

### Editor de texto bugado
- Recarregue a página do admin
- Limpe o cache do navegador

### Formatação perdida ao salvar
- O editor salva em HTML
- A formatação é preservada ao recarregar

## 🚀 Próximos Passos (Opcional)

Para melhorar ainda mais:

1. **Upload de Imagens**: Integrar com serviço de upload (Cloudinary, Uploadcare)
2. **Markdown**: Adicionar suporte para escrita em Markdown
3. **Preview**: Adicionar prévia do artigo antes de salvar
4. **Categorias**: Sistema de categorias fixas com cores
5. **Busca**: Adicionar busca de artigos
6. **Comentários**: Sistema de comentários nos artigos
7. **Visualizações**: Contador de visualizações
8. **Compartilhamento**: Botões de compartilhamento social

---

**Desenvolvido para facilitar a criação de conteúdo! ✍️📚**

