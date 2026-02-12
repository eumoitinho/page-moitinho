export type Locale = "en" | "pt"

export const translations = {
  en: {
    // Navigation
    intro: "About",
    work: "Work",
    thoughts: "Portfolio",
    connect: "Connect",
    articles: "Articles",
    
    // Hero
    portfolio: "PORTFOLIO",
    availableForWork: "Available for work",
    currently: "CURRENTLY",
    focus: "FOCUS",
    downloadCV: "Download CV",
    
    // Languages
    portuguese: "Portuguese (PT)",
    english: "English (EN)",
    
    // Experience
    experience: "Experience",
    
    // Articles
    articlesTitle: "Articles",
    articlesSubtitle: "Thoughts, tutorials and reflections on development",
    noArticles: "No articles published yet.",
    readMore: "Read more",
    readTime: "min read",
    back: "Back",
    backToHome: "Back to home",
    updatedOn: "Updated on",
    
    // Connect
    letsConnect: "Contact",
    connectDescription: "Always interested in new opportunities, collaborations, and conversations about technology and design.",
    elsewhere: "ELSEWHERE",
    
    // Admin
    admin: "Admin Panel",
    login: "Login",
    logout: "Logout",
    password: "Password",
    enterPassword: "Enter your password to access the panel",
    personalInfo: "Personal Information",
    experiences: "Experiences",
    projects: "Projects",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    new: "New",
    basicInfo: "Basic Information",
    name: "Name",
    lastName: "Last Name",
    location: "Location",
    email: "Email",
    availableForWorkLabel: "Available for work",
    currentJob: "Current Job",
    job: "Job",
    company: "Company",
    period: "Period",
    saveChanges: "Save Changes",
    newExperience: "New Experience",
    editExperience: "Edit Experience",
    periodLabel: "Period",
    jobTitle: "Job Title",
    descriptionLabel: "Description",
    technologies: "Technologies (comma separated)",
    techPlaceholder: "React, Next.js, TypeScript",
    descPlaceholder: "Describe your responsibilities and achievements...",
    newProject: "New Project",
    editProject: "Edit Project",
    typeLabel: "Type",
    imageUrl: "Image URL",
    projectUrl: "Project URL",
    skillsLabel: "Skills (comma separated)",
    featuredProject: "Featured Project (takes 2 columns)",
    confirmDelete: "Are you sure you want to delete this",
    experience_: "experience",
    project_: "project",
    article_: "article",
    englishVersion: "English (EN)",
    portugueseVersion: "Portuguese (PT)",
    
    // Article Admin
    newArticle: "New Article",
    editArticle: "Edit Article",
    title: "Title",
    slug: "Slug (URL friendly)",
    slugPlaceholder: "my-awesome-article",
    slugHelp: "Leave empty to auto-generate from title",
    excerpt: "Excerpt",
    excerptPlaceholder: "Brief article description...",
    content: "Content",
    coverImage: "Cover Image (URL)",
    category: "Category",
    categoryPlaceholder: "Development, Design, etc.",
    tags: "Tags (comma separated)",
    tagsPlaceholder: "react, nextjs, typescript",
    published: "Published",
    publishHelp: "Publish article (visible on site)",
    draft: "Draft",
    
    // Status messages
    preparingDownload: "Preparing download…",
    viewSite: "View Site",
  },
  pt: {
    // Navegação
    intro: "Sobre",
    work: "Projetos",
    thoughts: "Portfólio",
    connect: "Contato",
    articles: "Artigos",
    
    // Hero
    portfolio: "PORTFÓLIO",
    availableForWork: "Disponível para trabalho",
    currently: "ATUALMENTE",
    focus: "FOCO",
    downloadCV: "Baixar Currículo",
    
    // Idiomas
    portuguese: "Português (PT)",
    english: "Inglês (EN)",
    
    // Experiência
    experience: "Experiência",
    
    // Artigos
    articlesTitle: "Artigos",
    articlesSubtitle: "Pensamentos, tutoriais e reflexões sobre desenvolvimento",
    noArticles: "Nenhum artigo publicado ainda.",
    readMore: "Ler mais",
    readTime: "min de leitura",
    back: "Voltar",
    backToHome: "Voltar ao início",
    updatedOn: "Atualizado em",
    
    // Conectar
    letsConnect: "Contato",
    connectDescription: "Sempre interessado em novas oportunidades, colaborações e conversas sobre tecnologia e design.",
    elsewhere: "REDES",
    
    // Admin
    admin: "Painel Admin",
    login: "Entrar",
    logout: "Sair",
    password: "Senha",
    enterPassword: "Entre com sua senha para acessar o painel",
    personalInfo: "Informações Pessoais",
    experiences: "Experiências",
    projects: "Projetos",
    save: "Salvar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Excluir",
    new: "Novo",
    viewSite: "Ver Site",
    basicInfo: "Informações Básicas",
    name: "Nome",
    lastName: "Sobrenome",
    location: "Localização",
    email: "Email",
    availableForWorkLabel: "Disponível para trabalho",
    currentJob: "Cargo Atual",
    job: "Cargo",
    company: "Empresa",
    period: "Período",
    saveChanges: "Salvar Alterações",
    newExperience: "Nova Experiência",
    editExperience: "Editar Experiência",
    periodLabel: "Período",
    jobTitle: "Cargo",
    descriptionLabel: "Descrição",
    technologies: "Tecnologias (separadas por vírgula)",
    techPlaceholder: "React, Next.js, TypeScript",
    descPlaceholder: "Descreva suas responsabilidades e conquistas...",
    newProject: "Novo Projeto",
    editProject: "Editar Projeto",
    typeLabel: "Tipo",
    imageUrl: "URL da Imagem",
    projectUrl: "URL do Projeto",
    skillsLabel: "Skills (separadas por vírgula)",
    featuredProject: "Projeto em Destaque (ocupa 2 colunas)",
    confirmDelete: "Tem certeza que deseja excluir este",
    experience_: "experiência",
    project_: "projeto",
    article_: "artigo",
    englishVersion: "Inglês (EN)",
    portugueseVersion: "Português (PT)",
    
    // Admin de Artigos
    newArticle: "Novo Artigo",
    editArticle: "Editar Artigo",
    title: "Título",
    slug: "Slug (URL amigável)",
    slugPlaceholder: "meu-artigo-incrivel",
    slugHelp: "Deixe vazio para gerar automaticamente a partir do título",
    excerpt: "Resumo",
    excerptPlaceholder: "Breve descrição do artigo...",
    content: "Conteúdo",
    coverImage: "Imagem de Capa (URL)",
    category: "Categoria",
    categoryPlaceholder: "Desenvolvimento, Design, etc.",
    tags: "Tags (separadas por vírgula)",
    tagsPlaceholder: "react, nextjs, typescript",
    published: "Publicado",
    publishHelp: "Publicar artigo (visível no site)",
    draft: "Rascunho",
    
    // Mensagens de status
    preparingDownload: "Preparando download…",
  },
}

export type TranslationKeys = keyof typeof translations.en

export function getTranslation(locale: Locale, key: TranslationKeys): string {
  return translations[locale][key] || translations.en[key] || key
}

