# Self-Hosted CMS - Portfolio

Sistema de gerenciamento de conteúdo (CMS) self-hosted para seu portfólio.

## 🚀 Características

- ✅ Gerenciamento de informações pessoais
- ✅ CRUD completo de experiências profissionais  
- ✅ CRUD completo de projetos do portfólio
- ✅ Autenticação com senha
- ✅ Interface administrativa intuitiva
- ✅ Dados armazenados em arquivo JSON local
- ✅ Sem dependências de banco de dados externo

## 📁 Estrutura de Arquivos

```
portfolio/
├── data/
│   └── portfolio.json          # Dados do portfólio
├── types/
│   └── portfolio.ts            # Tipos TypeScript
├── lib/
│   └── portfolio-data.ts       # Funções de leitura/escrita
├── app/
│   ├── page.tsx                # Página principal (consome API)
│   ├── admin/
│   │   └── page.tsx            # Painel administrativo
│   └── api/
│       ├── auth/               # Autenticação
│       │   ├── login/
│       │   ├── logout/
│       │   └── check/
│       └── portfolio/          # API do portfólio
│           ├── route.ts        # GET todos os dados
│           ├── personal/       # Informações pessoais
│           ├── experiences/    # Experiências profissionais
│           └── projects/       # Projetos
```

## 🔧 Configuração

### 1. Configurar Senha do Admin

Crie um arquivo `.env.local` na raiz do projeto:

```bash
ADMIN_PASSWORD=sua_senha_segura_aqui
```

**⚠️ IMPORTANTE:** Altere a senha padrão (`admin123`) para uma senha forte em produção!

### 2. Verificar arquivo de dados

O arquivo `data/portfolio.json` contém todos os dados do portfólio. Ele já foi criado com seus dados atuais.

## 🎯 Como Usar

### Acessar o Painel Admin

1. Navegue para: `http://localhost:3000/admin`
2. Entre com a senha configurada no `.env.local`
3. Gerencie seu conteúdo através das abas:
   - **Informações Pessoais**: Nome, título, descrição, etc.
   - **Experiências**: Adicionar, editar ou remover experiências profissionais
   - **Projetos**: Adicionar, editar ou remover projetos do portfólio

### Gerenciar Informações Pessoais

- Nome e sobrenome
- Título profissional
- Descrição (bio)
- Email de contato
- Localização
- Status de disponibilidade
- Cargo atual e empresa

### Gerenciar Experiências

Campos disponíveis:
- Período (ex: "Mar 2025 — Present")
- Cargo
- Empresa
- Localização
- Descrição detalhada
- Tecnologias utilizadas

### Gerenciar Projetos

Campos disponíveis:
- Título
- Categoria (ex: "WEB DEVELOPMENT")
- Tipo (ex: "Design & Development")
- URL da imagem (pode ser externa ou local em `/public`)
- URL do projeto
- Descrição
- Skills/Tecnologias
- Destaque (checkbox para projetos em destaque que ocupam 2 colunas)

## 🔌 API Endpoints

### GET `/api/portfolio`
Retorna todos os dados do portfólio

### GET `/api/portfolio/personal`
Retorna informações pessoais

### PUT `/api/portfolio/personal`
Atualiza informações pessoais

### GET `/api/portfolio/experiences`
Lista todas as experiências

### POST `/api/portfolio/experiences`
Cria nova experiência

### PUT `/api/portfolio/experiences`
Atualiza experiência existente

### DELETE `/api/portfolio/experiences?id={id}`
Remove experiência

### GET `/api/portfolio/projects`
Lista todos os projetos

### POST `/api/portfolio/projects`
Cria novo projeto

### PUT `/api/portfolio/projects`
Atualiza projeto existente

### DELETE `/api/portfolio/projects?id={id}`
Remove projeto

## 🔐 Segurança

### Autenticação

O sistema usa cookies HTTP-only para autenticação:
- Cookie: `admin-auth`
- Duração: 7 dias
- HTTP-Only: Sim
- Secure: Sim (em produção)

### Melhorias Recomendadas para Produção

1. **Usar JWT tokens** ao invés de cookies simples
2. **Hash de senha** com bcrypt
3. **Rate limiting** nas rotas de autenticação
4. **CSRF protection**
5. **Backup automático** do arquivo `portfolio.json`

## 💾 Backup e Restauração

### Fazer Backup

Simplesmente copie o arquivo `data/portfolio.json`:

```bash
cp data/portfolio.json data/backup-$(date +%Y%m%d).json
```

### Restaurar Backup

```bash
cp data/backup-20250101.json data/portfolio.json
```

## 🚀 Deploy

### Vercel/Netlify

O sistema funciona perfeitamente em plataformas serverless. O arquivo JSON é lido/escrito em cada request.

**Nota:** Em ambientes serverless, as alterações no arquivo JSON podem não persistir entre deploys. Para produção, considere:

1. **Usar banco de dados** (PostgreSQL, MongoDB, etc.)
2. **Usar CMS headless** (Sanity, Contentful, etc.)
3. **Usar Storage Service** (AWS S3, Google Cloud Storage, etc.)

### Migrar para Banco de Dados

Para escalar, você pode migrar facilmente os dados para um banco:

```typescript
// Exemplo com Prisma
const data = getPortfolioData()

await prisma.experience.createMany({
  data: data.experiences
})

await prisma.project.createMany({
  data: data.projects
})
```

## 🎨 Personalização

### Adicionar Novos Campos

1. Adicione o campo em `types/portfolio.ts`
2. Atualize o arquivo `data/portfolio.json`
3. Adicione o campo no formulário em `app/admin/page.tsx`
4. Atualize a página principal para exibir o novo campo

### Adicionar Novos Tipos de Conteúdo

1. Crie o tipo em `types/portfolio.ts`
2. Adicione a API route em `app/api/portfolio/`
3. Adicione a aba no painel admin
4. Atualize a página principal

## 📝 Exemplo de Uso da API

```typescript
// Buscar todos os dados
const response = await fetch('/api/portfolio')
const data = await response.json()

// Criar nova experiência
await fetch('/api/portfolio/experiences', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    year: '2025',
    role: 'Developer',
    company: 'Company Name',
    location: 'City, Country',
    description: 'Job description',
    tech: ['React', 'Node.js']
  })
})

// Atualizar projeto
await fetch('/api/portfolio/projects', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: '1',
    title: 'Updated Title',
    // ... outros campos
  })
})

// Deletar experiência
await fetch('/api/portfolio/experiences?id=1', {
  method: 'DELETE'
})
```

## 🐛 Troubleshooting

### Não consigo fazer login
- Verifique se o arquivo `.env.local` existe
- Verifique se a variável `ADMIN_PASSWORD` está configurada
- Tente limpar os cookies do navegador

### Alterações não estão aparecendo
- Verifique se o arquivo `data/portfolio.json` foi atualizado
- Limpe o cache do navegador
- Reinicie o servidor de desenvolvimento

### Erro ao salvar dados
- Verifique permissões de escrita na pasta `data/`
- Verifique se o JSON está válido

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório do projeto.

---

**Desenvolvido com ❤️ usando Next.js 15 e TypeScript**

