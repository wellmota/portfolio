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
| Welcome to the Jungle | Tech EU + EUA (absorveu o Otta) |
| Arc.dev | Devs remotos, curadoria |
| Toptal | Alto padrão, processo seletivo |
| Braintrust | Freelance/contrato sem taxa |
| Behance | ✅ Já ativo com projetos reais |
| ~~Read.cv~~ | ❌ Encerrou em 16/05/2025 (time foi para a Perplexity) |

**Textos prontos para colar:** ver `FASE7-PLATAFORMAS.md`.

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

- [x] Fase 1 — SEO técnico (canonical, OG, Twitter, JSON-LD)
- [x] Fase 2 — og-image.png 1200×630
- [x] Fase 3 — sitemap.xml, robots.txt, llms.txt
- [x] Fase 4 — build + deploy + validação
- [~] Fase 5 — LinkedIn (headline, sobre, skills, open-to-work, featured)
- [x] Fase 6 — GitHub profile
- [~] Fase 7 — textos prontos (`FASE7-PLATAFORMAS.md`); cadastro é manual
- [x] Fase 8 — Search Console verificado + sitemap enviado

---

## Progresso da Fase 5 — LinkedIn (20/07/2026)

| Item | Status |
|---|---|
| Headline (AI Engineering, TypeScript, Next.js) | ✅ aplicada |
| Sobre reescrito (estava "Specialties: UX, UI Design...") | ✅ aplicado |
| Skills: TypeScript, Design Systems, Prompt Engineering, LLM, Tailwind CSS | ✅ 5 adicionadas |
| Featured: portfólio com og:image | ✅ fixado |
| Featured: Behance / Medium | ❌ bloqueiam o crawler do LinkedIn |
| Open to Work | ⏭️ pulado a pedido |

### Baseline (antes das mudanças)
Perfil (7d): 11 views · Posts (7d): 11 impressões · Buscas (7d): 4 aparições · 748 seguidores

### Próximos passos
- [ ] Fase 6 — GitHub: README de perfil, repos fixados, bio + link
- [ ] Fase 7 — Wellfound, Arc.dev, Toptal, Braintrust
- [ ] Fase 8 — Google Search Console: submeter sitemap.xml
- [ ] Cadência: 1 post/semana reaproveitando os artigos do Medium

---

## Progresso da Fase 6 — GitHub (20/07/2026)

| Item | Antes | Agora |
|---|---|---|
| Bio | "Aspiring Front-End Developer / Degree / MBA" | Product Engineer & Design Engineer + stack + IA |
| Website | `http://behance.com/...` (sem SSL) | `https://userexperience.com.br` |
| README de perfil | não existia | criado em `wellmota/wellmota` e publicado |
| Repo `portfolio` | privado | **público**, com descrição e 6 tópicos |
| Repos fixados | 4 projetos de estudo (challenges) | `portfolio` |

**Aprendizados:**
- O README de perfil exige clicar em **"Share to Profile"** no repositório especial —
  criar o arquivo não basta.
- O token do `gh` CLI não tem escopo `user`; editar bio/site precisa da interface web
  ou de `gh auth refresh -h github.com -s user`.
- Dos 117 repositórios, quase todos eram privados. 10 foram abertos a seu pedido.

**Pins finais (4, com descrição escrita a partir do README real de cada um):**
`portfolio` · `stay-classic-storefront` · `pizzashop-web` · `desafiofinal-backend-mba`

Optei por 4 pins fortes em vez de 6 preenchidos com desafios de curso.
Pin de projeto de estudo dilui o perfil para quem está avaliando senioridade.

---

## Progresso da Fase 8 — Google Search Console (20/07/2026)

| Item | Status |
|---|---|
| Propriedade `userexperience.com.br` (tipo **Domínio**) | ✅ verificada |
| Método | TXT no DNS, via "Qualquer provedor de DNS" |
| `sitemap.xml` enviado | ✅ **Processado**, 2 páginas encontradas |
| Indexação solicitada: `/` (EN) | ✅ enviada para a fila prioritária |
| Indexação solicitada: `/pt/` | ✅ enviada para a fila prioritária |

**Decisão consciente:** o Search Console oferece verificação automática via login
no GoDaddy. Isso concede ao Google acesso permanente à sua conta de DNS. Usei o
registro TXT manual: mesmo resultado, sem dar essa permissão.

**Estado da indexação no momento da configuração:**
- `/` (EN): "Rastreada, mas não indexada". O Googlebot já tinha passado no mesmo
  dia (10:32). Rastrear e não indexar é normal em site novo, não é erro.
- `/pt/`: "O Google não reconhece o URL". Nunca tinha sido rastreada. O sitemap
  resolve isso.

**Detalhe curioso:** as únicas páginas apontando para o site eram diretórios
automáticos de spam (`findit.co.in`, `mega-remont.pro`). Inofensivo, mas mostra
que até agora nenhum link legítimo apontava para o domínio. Backlink real
(LinkedIn, GitHub, Medium) é o que muda esse quadro.

**Voltar a olhar em:** 27/07/2026 (indexação) e 20/08/2026 (primeiros dados de
Desempenho: consultas, impressões, posição média).

### Métricas para acompanhar mensalmente

| Métrica | Onde | Meta 90 dias |
|---|---|---|
| Páginas indexadas | Search Console → Páginas | 2 de 2 |
| Posição para "Wellington Mota" | Search Console → Desempenho | Top 1 |
| Impressões orgânicas | Search Console → Desempenho | Crescimento constante |
| Visualizações do perfil | LinkedIn | +200% sobre a baseline de 11/7d |
| InMails de recrutador | LinkedIn | ≥ 2/mês |
