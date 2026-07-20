# Roadmap de Visibilidade — ser encontrado por headhunters

**Objetivo:** fazer com que recrutadores e headhunters (Brasil e exterior) encontrem
o Wellington de forma orgânica, e que o portfólio converta quando encontrado.

**Posicionamento-âncora (usar igual em todos os canais):**
> Product Engineer que faz as duas pontas — pesquisa e design no Figma até React/TypeScript
> em produção — com IA em produção (agentes, evals, prompts versionados), não vibe coding.

---

## Diagnóstico: por que NÃO Google Ads

| Canal | Onde o headhunter realmente procura | Veredito |
|---|---|---|
| Google Ads | Ninguém pesquisa "portfólio de product engineer" para contratar | ❌ Descartado |
| LinkedIn Recruiter | É a ferramenta padrão de sourcing | ✅ Prioridade 1 |
| GitHub | Sourcing técnico | ✅ Prioridade 3 |
| Plataformas de talento | Vagas remotas internacionais | ✅ Prioridade 4 |

Google Ads cobra por clique de qualquer pessoa e não permite segmentar
"recrutador tech buscando design engineer". A intenção de busca não existe.
O único caso defensável seria dar lance no próprio nome — e isso o SEO resolve de graça.

**Onde investir dinheiro, se for investir:** LinkedIn Premium (ver quem visitou o
perfil + InMail para recrutadores). Rende mais que qualquer anúncio.

---

## FASE 1 — SEO técnico do site

**Problema atual:** o site tem título, descrição e Open Graph básicos, mas falta o
essencial para preview de link e para o Google entender quem é a pessoa.

| Item | Status | Impacto |
|---|---|---|
| `canonical` | Faltando | Evita conteúdo duplicado EN/PT |
| `og:image` | **Faltando** | Link no LinkedIn sai sem imagem → baixo CTR |
| `og:url` | Faltando | Preview correto |
| Twitter Card | Faltando | Preview no X |
| JSON-LD `Person` | **Faltando** | Google entende nome, cargo, skills, redes |
| `hreflang` | ✅ Já existe | — |

**Ação:** adicionar tudo no `src/layouts/Layout.astro`, com os dados vindo do i18n.

---

## FASE 2 — Imagem de compartilhamento (OG image)

Sem `og:image`, todo link compartilhado no LinkedIn/WhatsApp aparece sem imagem —
é o maior assassino de CTR quando você manda o portfólio para um recrutador.

**Ação:** gerar `public/og-image.png` (1200×630) no visual do site: fundo escuro,
nome em Inter bold, cargo + AI Specialist com o gradient, selo/monograma.

---

## FASE 3 — Descoberta: sitemap, robots e llms.txt

| Arquivo | Para quê |
|---|---|
| `sitemap.xml` | Google indexa as duas versões (EN/PT) |
| `robots.txt` | Libera crawl + aponta o sitemap |
| `llms.txt` | **Novo padrão**: ChatGPT/Claude/Perplexity leem para responder sobre você |

O `llms.txt` importa cada vez mais: recrutadores usam LLMs para pesquisar candidatos.
Um `llms.txt` bem escrito faz o modelo descrever você com precisão em vez de alucinar.

---

## FASE 4 — Build, deploy e validação

1. `npm run build` local
2. Deploy na Vercel (`vercel --prod`)
3. Validar preview do link (LinkedIn Post Inspector)
4. Validar schema (Google Rich Results Test)
5. Submeter sitemap no Google Search Console

---

## FASE 5 — LinkedIn (prioridade máxima)

É aqui que 80% do resultado acontece. O LinkedIn Recruiter filtra por campos
específicos — preencher esses campos é literalmente o que te faz aparecer na busca.

### 5.1 Headline
Recheada com os termos que recrutador filtra. Modelo:
> Product Engineer · Design Engineer | React, TypeScript, Next.js | Design Systems |
> AI Engineering (Agents, RAG, Evals) | Remote

### 5.2 Seção "Sobre"
Primeiras 2 linhas são o que aparece sem clicar em "ver mais" — colocar o gancho ali.
Fechar com call-to-action + link do portfólio.

### 5.3 Skills (crítico)
O Recruiter filtra pesadamente por Skills. Preencher o máximo (50), priorizando:
`React` `TypeScript` `Next.js` `Node.js` `Design Systems` `UX Research` `Figma`
`Front-End Development` `Product Design` `Prompt Engineering` `RAG` `LLM` `Tailwind CSS`

### 5.4 Open to Work
Ativar em modo **"apenas recrutadores"** — aparece na busca do Recruiter sem
sinalizar publicamente para o empregador atual.

### 5.5 Featured
Fixar: portfólio (userexperience.com.br), Behance e os artigos do Medium.

### 5.6 Perfil em inglês
Recrutador internacional busca em inglês. O site já é EN por padrão — o LinkedIn
deve seguir a mesma lógica.

### 5.7 Cadência de conteúdo
1 post por semana. Reaproveitar os artigos do Medium — é o que mantém o perfil
circulando no feed dos recrutadores.

---

## FASE 6 — GitHub

- README de perfil com o mesmo posicionamento
- Repos fixados (incluindo este portfólio)
- Bio + link do site + localização

---

## FASE 7 — Plataformas de talento

Onde vaga remota internacional realmente circula:

| Plataforma | Foco |
|---|---|
| Wellfound (AngelList) | Startups, remoto internacional |
| Arc.dev | Devs remotos, curadoria |
| Toptal | Alto padrão, processo seletivo |
| Braintrust | Freelance/contrato sem taxa |
| Read.cv | Comunidade design+eng |
| Behance | ✅ Já ativo com projetos reais |

---

## FASE 8 — Métricas de acompanhamento

| Métrica | Onde | Meta 90 dias |
|---|---|---|
| Visualizações do perfil | LinkedIn | +200% |
| Aparições em busca | LinkedIn ("search appearances") | Acompanhar semanal |
| Visitas orgânicas | Vercel Analytics | Crescimento constante |
| Posição para "Wellington Mota" | Google | Top 1 |
| InMails de recrutador | LinkedIn | ≥ 2/mês |

---

## Checklist de execução

- [ ] Fase 1 — SEO técnico (canonical, OG, Twitter, JSON-LD)
- [ ] Fase 2 — og-image.png 1200×630
- [ ] Fase 3 — sitemap.xml, robots.txt, llms.txt
- [ ] Fase 4 — build + deploy + validação
- [ ] Fase 5 — LinkedIn (headline, sobre, skills, open-to-work, featured)
- [ ] Fase 6 — GitHub profile
- [ ] Fase 7 — cadastro nas plataformas
- [ ] Fase 8 — Search Console + acompanhamento mensal
