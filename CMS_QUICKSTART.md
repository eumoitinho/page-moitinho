# 🚀 CMS - Guia Rápido de Início

## Como Acessar o Painel Admin

1. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

2. **Acesse o painel admin:**
   ```
   http://localhost:3000/admin
   ```

3. **Faça login com a senha padrão:**
   ```
   Senha: admin123
   ```

## ⚠️ IMPORTANTE - Alterar Senha

Para alterar a senha do admin, crie/edite o arquivo `.env.local`:

```bash
ADMIN_PASSWORD=sua_senha_segura_aqui
```

Depois reinicie o servidor.

## 📝 O que você pode fazer

### ✅ Gerenciar Informações Pessoais
- Nome, título, descrição
- Email e localização
- Status de disponibilidade
- Cargo e empresa atual
- Skills/tecnologias

### ✅ Gerenciar Experiências Profissionais
- Adicionar novas experiências
- Editar experiências existentes
- Remover experiências
- Reordenar (mais recentes primeiro)

### ✅ Gerenciar Projetos do Portfólio
- Adicionar novos projetos
- Editar projetos existentes
- Remover projetos
- Marcar projetos como destaque (ocupam 2 colunas)
- Adicionar imagens e links

## 💡 Dicas

1. **URLs de Imagens:** Você pode usar:
   - URLs externas (ex: de servidores de imagens)
   - Imagens locais na pasta `/public` (ex: `/minha-imagem.jpg`)

2. **Projetos em Destaque:** Marque a checkbox "Projeto em Destaque" para que o projeto ocupe 2 colunas no grid

3. **Tecnologias:** Separe as tecnologias com vírgulas (ex: `React, Next.js, TypeScript`)

4. **Descrições:** Use quebras de linha para melhorar a legibilidade

5. **Backup:** O arquivo `data/portfolio.json` contém todos seus dados. Faça backup regularmente!

## 🔍 Visualizar Alterações

Após fazer alterações no painel admin:

1. Abra outra aba do navegador
2. Acesse: `http://localhost:3000`
3. Veja suas alterações ao vivo!

## 📂 Onde os Dados são Salvos?

Todos os dados são salvos em:
```
data/portfolio.json
```

Este é um arquivo JSON simples que você pode editar manualmente se necessário.

## 🎯 Fluxo de Trabalho Recomendado

1. Acesse `/admin`
2. Faça as alterações desejadas
3. Clique em "Salvar" ou "Salvar Alterações"
4. Verifique as mudanças em `/` (página principal)
5. Faça backup do `data/portfolio.json` periodicamente

## 🆘 Problemas Comuns

**Não consigo fazer login:**
- Verifique se a senha está correta
- Limpe os cookies do navegador
- Verifique se o `.env.local` existe (se você alterou a senha)

**Alterações não aparecem:**
- Recarregue a página (Ctrl + F5)
- Verifique se clicou em "Salvar"
- Verifique se há erros no console do navegador

**Esqueci minha senha:**
- Delete o arquivo `.env.local` para voltar à senha padrão (`admin123`)
- Ou edite `.env.local` e defina uma nova senha

## 📚 Documentação Completa

Para mais informações, consulte: [`CMS_README.md`](./CMS_README.md)

---

**Desenvolvido para facilitar o gerenciamento do seu portfólio! 💼✨**

