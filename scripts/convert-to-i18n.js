const fs = require('fs');
const path = require('path');

// Ler backup
const backupPath = path.join(__dirname, '../data/portfolio-backup-20251015-024754.json');
const data = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

// Converter para estrutura bilíngue
const converted = {
  personalInfo: {
    name: data.personalInfo.name,
    lastName: data.personalInfo.lastName,
    title: {
      en: data.personalInfo.title,
      pt: "Desenvolvedor Web Pleno"
    },
    description: {
      en: data.personalInfo.description,
      pt: "Desenvolvedor Web Pleno com formação em Engenharia da Computação e experiência em design gráfico. Construo frontends, PWAs e soluções full-stack que combinam design, performance e usabilidade."
    },
    email: data.personalInfo.email,
    location: data.personalInfo.location,
    availableForWork: data.personalInfo.availableForWork,
    currentRole: {
      en: data.personalInfo.currentRole,
      pt: "Desenvolvedor Web (Pleno)"
    },
    currentCompany: data.personalInfo.currentCompany,
    currentPeriod: data.personalInfo.currentPeriod
  },
  skills: data.skills,
  socials: data.socials,
  experiences: data.experiences.map(exp => ({
    ...exp,
    role: {
      en: exp.role,
      pt: exp.role // Mantém igual, pode editar depois
    },
    description: {
      en: exp.description,
      pt: exp.description // Mantém igual, pode editar depois
    }
  })),
  projects: data.projects.map(proj => ({
    ...proj,
    title: {
      en: proj.title,
      pt: proj.title
    },
    description: {
      en: proj.description,
      pt: proj.description
    }
  })),
  articles: data.articles.map(art => ({
    ...art,
    title: {
      en: art.title === "Teste" ? "Test" : art.title,
      pt: art.title
    },
    slug: {
      en: art.slug === "teste" ? "test" : art.slug,
      pt: art.slug
    },
    excerpt: {
      en: art.excerpt === "uhul" ? "yay" : art.excerpt,
      pt: art.excerpt
    },
    content: {
      en: art.content.replace("testeeeee", "testtttt"),
      pt: art.content
    }
  }))
};

// Salvar
const outputPath = path.join(__dirname, '../data/portfolio.json');
fs.writeFileSync(outputPath, JSON.stringify(converted, null, 2), 'utf8');

console.log('✅ Dados convertidos com sucesso!');
console.log(`📊 Experiências: ${converted.experiences.length}`);
console.log(`📊 Projetos: ${converted.projects.length}`);
console.log(`📊 Artigos: ${converted.articles.length}`);

