import type { CaseStudy } from './types';

/**
 * Tutory: site institucional (abr–out 2026). Fontes: monorepo tutory-site (git log, relatório interno de
 * 15/09/2026) e o site em produção. Prints feitos em 18–19/10/2026, sem moldura de device.
 * A identidade visual tem case próprio em ./tutory-brand.ts.
 */
const tutorySite: CaseStudy = {
  "pt": {
    "slug": "tutory-site",
    "accent": "#3B7BF5",
    "kicker": "Case Study — 2026",
    "title": "Tutory: site",
    "subtitle": "Com a marca nova aprovada, o site institucional saiu do WordPress para um monorepo em Astro: 14 páginas, no ar em 63 dias, Lighthouse 100 e pronto para ser lido e citado por IAs. Design e código por uma pessoa.",
    "cover": {
      "src": "/cases/tutory-site/cover.webp",
      "alt": "Três telas do site novo da Tutory, home, Hub e Mentoria, lado a lado sobre azul elétrico"
    },
    "meta": [
      {
        "label": "Cliente",
        "value": "Tutory · EdTech, Brasília"
      },
      {
        "label": "Período",
        "value": "Abr — Out 2026"
      },
      {
        "label": "Papel",
        "value": "Design engineer, solo"
      },
      {
        "label": "Frentes",
        "value": "Site · Migração · SEO/GEO · Conteúdo"
      },
      {
        "label": "Entrega",
        "value": "No ar desde 18 jun 2026"
      }
    ],
    "stats": [
      {
        "value": "63 dias",
        "label": "do primeiro commit ao site no ar"
      },
      {
        "value": "14",
        "label": "páginas, migradas do WordPress com 301"
      },
      {
        "value": "247",
        "label": "commits no site em seis meses"
      },
      {
        "value": "100",
        "label": "acessibilidade Lighthouse (de 84)"
      },
      {
        "value": "−82%",
        "label": "no peso das imagens (159 → 28 MB)"
      },
      {
        "value": "2 → 20",
        "label": "sessões vindas de assistentes de IA em 30 dias"
      }
    ],
    "intro": [
      "Depois do rebranding, faltava o lugar onde a marca mais aparece: o site. O de 2025 rodava em WordPress com Elementor e falava de features. O time comercial contava outra história nas calls, a de um ecossistema com três produtos, milhares de mentores, um podcast e um evento próprio.",
      "Meu trabalho foi construir esse site do zero em Astro, migrar tudo do WordPress sem perder uma URL, tratar performance e acessibilidade como feature e preparar cada página para ser lida por pessoas e por IAs. Design e código saíram das mesmas mãos, com o cliente decidindo a cada etapa."
    ],
    "roleLabel": "O que eu fiz",
    "roleList": [
      "Arquitetura de informação",
      "Design das 14 páginas",
      "Site em Astro + React",
      "Migração do WordPress",
      "Performance e acessibilidade",
      "SEO técnico e GEO",
      "Analytics e consentimento",
      "Fluxo de conteúdo"
    ],
    "sections": [
      {
        "kicker": "01 — O gap",
        "title": "Quem chegava, via uma ferramenta.",
        "body": [
          "O site de 2025 abria com uma tabela comparativa, um botão laranja de \"conheça os planos\" e a promessa de ser \"a melhor plataforma do mercado para coaches\". Rodava em WordPress com Elementor, sobre PHP 7.4, e carregava um item de menu em 404, uma página de rascunho exposta na navegação, UTMs fixas no código e spam injetado no servidor.",
          "Antes de desenhar, mapeei o site antigo página a página e transcrevi calls de vendas reais. O contraste virou o terceiro slide do deck de marca: o problema nunca foi o produto. A Tutory cresceu além do que a marca conseguia transmitir."
        ],
        "image": {
          "src": "/cases/tutory-site/gap.webp",
          "alt": "Print do site antigo da Tutory em preto e branco ao lado da home nova em cores",
          "caption": "O site de 2025 (WordPress) e a home de 2026 (Astro). Mesma empresa, mesmo nome."
        }
      },
      {
        "kicker": "02 — O site",
        "title": "Um site à altura do ecossistema",
        "body": [
          "Com a marca aprovada, o site começou em 16 de abril e foi ao ar em 18 de junho: 63 dias, 14 páginas, um monorepo em Astro com ilhas React só onde há movimento. A home conta a história do ecossistema em sequência: hero com um anel 3D de cartões sobre a foto do casal, uma frase que se revela palavra a palavra ao rolar, os números, o gráfico de crescimento e três blocos de produto que trocam como cortinas.",
          "Por baixo, o trabalho invisível: 301 de cada URL do WordPress, Consent Mode v2 com tudo negado por padrão (LGPD), tag manager só no domínio de produção, CTAs ligados ao Typebot que alimenta o CRM e um modal de agendamento com dez gatilhos. Nenhum formulário próprio: o time comercial já vivia no WhatsApp e no CRM, e o site respeita isso."
        ],
        "showcase": {
          "frame": "flat",
          "url": "tutory.com.br",
          "items": [
            {
              "src": "/cases/tutory-site/site-hero.webp",
              "alt": "Home da Tutory: título O Ecossistema que potencializa os maiores mentores e infoprodutores educacionais do Brasil, com cartões 3D sobre a foto de um casal",
              "label": "Home",
              "meta": "tutory.com.br",
              "caption": "O anel de cartões gira em 3D sobre a foto. No celular, vira um letreiro horizontal."
            },
            {
              "src": "/cases/tutory-site/site-mentoria.webp",
              "alt": "Bloco Tutory Mentoria: sua mentoria sob controle, com cartões de cronograma sobre foto de dois alunos",
              "label": "Tutory Mentoria",
              "meta": "bloco parallax",
              "size": "half"
            },
            {
              "src": "/cases/tutory-site/hub-marquee-poster.webp",
              "video": {
                "src": "/cases/tutory-site/hub-marquee.mp4"
              },
              "alt": "Vídeo: bloco Tutory Hub em azul elétrico com a esteira diagonal de telas do produto deslizando em loop",
              "label": "Tutory Hub",
              "meta": "vídeo · bloco parallax",
              "size": "half",
              "caption": "A esteira de cartões do produto desliza em três colunas com ritmos diferentes; aqui em loop de 30 s."
            },
            {
              "src": "/cases/tutory-site/site-orbita.webp",
              "alt": "Seção A plataforma escolhida pelos maiores do Brasil, com logos de clientes orbitando o símbolo",
              "label": "A plataforma escolhida",
              "meta": "órbita de logos",
              "size": "half"
            },
            {
              "src": "/cases/tutory-site/site-precos.webp",
              "alt": "Seção Um produto para cada fase do seu negócio, com os cartões Mentoria, Hub e Academy",
              "label": "Um produto para cada fase",
              "meta": "#precos",
              "size": "half"
            },
            {
              "src": "/cases/tutory-site/placas-poster.webp",
              "video": {
                "src": "/cases/tutory-site/placas.mp4",
                "webm": "/cases/tutory-site/placas.webm"
              },
              "alt": "Vídeo: as placas Ouro, Diamante, Ruby, Esmeralda e Prata rolam em letreiro; um clique na Diamante abre a ficha da conquista num painel lateral",
              "label": "Placas da Mentoria",
              "meta": "vídeo · /produtos/mentoria",
              "size": "half",
              "caption": "As placas Prata, Ouro, Diamante, Ruby e Esmeralda rolam em letreiro; o clique abre a ficha da conquista."
            },
            {
              "src": "/cases/tutory-site/pagina-hub-maia.webp",
              "alt": "Seção Maia, a inteligência que amplifica o que você ensina, com um chat de IA animado",
              "label": "Maia, a IA da Hub",
              "meta": "/produtos/hub",
              "size": "half"
            }
          ]
        },
        "galleryTitle": "Mobile",
        "gallery": [
          {
            "src": "/cases/tutory-site/mobile-home.webp",
            "alt": "Home da Tutory no celular"
          },
          {
            "src": "/cases/tutory-site/mobile-hub.webp",
            "alt": "Página da Tutory Hub no celular"
          },
          {
            "src": "/cases/tutory-site/mobile-mentoria.webp",
            "alt": "Bloco da Tutory Mentoria no celular"
          }
        ],
        "galleryCaption": "Home, Hub e Mentoria no celular: mesmas animações, só transform e opacity, sem travar."
      },
      {
        "kicker": "03 — Performance, SEO e GEO",
        "title": "Rápido para pessoas, legível para máquinas",
        "body": [
          "Performance foi tratada como feature: imagens de 159 MB para 28 MB, 50 fotos convertidas para WebP, a textura de ruído de 2,2 MB para 60 KB, largura e altura em todas as imagens para zerar o salto de layout, e 55 das 57 ilhas da home deixando de hidratar no carregamento. Acessibilidade subiu de 84 para 100 no Lighthouse, com 100 também em SEO e boas práticas.",
          "E como cada vez mais gente pergunta a uma IA qual plataforma usar, o site foi preparado para ser lido e citado por assistentes: robots.txt liberando GPTBot, ClaudeBot, PerplexityBot e Google-Extended, llms.txt e llms-full.txt gerados em runtime, versão .md de cada guia, IndexNow para o Bing e dados estruturados em todas as páginas. Em 30 dias, o OAI-SearchBot passou 938 vezes e o ClaudeBot, 864. O canal \"assistentes de IA\" saiu de 2 para 20 sessões e a taxa de eventos-chave por sessão subiu de 0,68% para 1,22%."
        ],
        "image": {
          "src": "/cases/tutory-site/seo.webp",
          "alt": "Três cartões com trechos do robots.txt, do JSON-LD e do llms.txt do site, sobre fundo azul",
          "caption": "robots.txt, JSON-LD e llms.txt do site em produção, e as notas do Lighthouse."
        }
      },
      {
        "kicker": "04 — Conteúdo",
        "title": "Publicar sem depender de ninguém",
        "body": [
          "O blog, os cases e os guias precisavam de um fluxo que o time de marketing tocasse sozinho. Testei três. Um fork do Sveltia CMS traduzido para pt-BR durou uma semana. Um CMS próprio em Astro SSR com Postgres, editor, biblioteca de mídia e deploy automático durou dois meses. O terceiro era o mais simples: conteúdo em markdown no repositório, publicado por pull request.",
          "O mais simples venceu porque era o que o time realmente usava. Quando o ritmo real se mostrou um artigo por semana, escrito com ajuda de IA e revisado em PR, a camada de CMS virou custo sem retorno: banco, uploads, login, cota. Desliguei em setembro. Hoje são 19 artigos, 6 cases e 4 guias, cada guia com uma versão em markdown feita para as IAs."
        ],
        "showcase": {
          "frame": "flat",
          "start": 0,
          "items": [
            {
              "src": "/cases/tutory-site/pagina-blog.webp",
              "alt": "Página Publicações com o artigo em destaque Sua loja no Instagram está aberta ou fechada?",
              "label": "Publicações",
              "meta": "/blog",
              "size": "half"
            },
            {
              "src": "/cases/tutory-site/pagina-guias.webp",
              "alt": "Página Guias com dois guias em destaque sobre mentoria para concursos e cronograma de estudos",
              "label": "Guias",
              "meta": "/guias · também em .md",
              "size": "half"
            }
          ]
        }
      },
      {
        "kicker": "05 — Resultado",
        "title": "A mesma empresa, enfim reconhecível",
        "body": [
          "Em 63 dias, a Tutory saiu de um site de WordPress que falava de features para 14 páginas que contam a história do ecossistema do jeito que o time comercial sempre contou, com a marca nova em cada detalhe.",
          "O site segue evoluindo em produção, 247 commits até outubro, com artigos novos, área do professor e ajustes de hero, sem nunca ter saído do ar."
        ]
      }
    ],
    "outcomesLabel": "Resultados",
    "outcomesTitle": "O que mudou para o negócio",
    "outcomes": [
      "Site novo no ar em 63 dias, 14 páginas, migrado do WordPress com 301",
      "Lighthouse 100 em acessibilidade, SEO e boas práticas (acessibilidade vinha de 84)",
      "Imagens 82% mais leves e 55 de 57 ilhas sem hidratar no carregamento",
      "Pronto para IAs: robots, llms.txt, dados estruturados e IndexNow",
      "Canal \"assistentes de IA\" de 2 para 20 sessões; eventos-chave por sessão de 0,68% para 1,22%",
      "Conteúdo publicado pelo time por pull request, sem CMS para manter"
    ],
    "stackLabel": "Stack",
    "stack": [
      "Astro 6",
      "React",
      "TypeScript",
      "Tailwind CSS 4",
      "Motion · Lenis",
      "Vercel",
      "GTM · Consent Mode v2",
      "Typebot",
      "schema.org · llms.txt"
    ],
    "cta": {
      "heading": "Seu site ainda fala de features?",
      "sub": "Eu construo o site que conta a história do jeito que o seu time conta: design, código, migração e SEO.",
      "label": "Falar comigo"
    },
    "ui": {
      "back": "Voltar aos projetos",
      "visit": "Visitar o site"
    },
    "liveUrl": "https://www.tutory.com.br",
    "seo": {
      "title": "Tutory: site — Case Study · Wellington Mota",
      "description": "Site institucional da Tutory em Astro: 14 páginas, migração do WordPress com 301, Lighthouse 100, Consent Mode v2 e pronto para ser citado por IAs. Do primeiro commit ao ar em 63 dias."
    }
  },
  "en": {
    "slug": "tutory-site",
    "accent": "#3B7BF5",
    "kicker": "Case Study — 2026",
    "title": "Tutory: website",
    "subtitle": "With the new brand approved, the institutional website left WordPress for an Astro monorepo: 14 pages, live in 63 days, Lighthouse 100 and ready to be read and cited by AIs. Design and code by one person.",
    "cover": {
      "src": "/cases/tutory-site/cover.webp",
      "alt": "Three screens of the new Tutory website, home, Hub and Mentoria, side by side on electric blue"
    },
    "meta": [
      {
        "label": "Client",
        "value": "Tutory · EdTech, Brasília"
      },
      {
        "label": "Period",
        "value": "Apr — Oct 2026"
      },
      {
        "label": "Role",
        "value": "Design engineer, solo"
      },
      {
        "label": "Fronts",
        "value": "Website · Migration · SEO/GEO · Content"
      },
      {
        "label": "Shipped",
        "value": "Live since Jun 18, 2026"
      }
    ],
    "stats": [
      {
        "value": "63 days",
        "label": "from first commit to the site going live"
      },
      {
        "value": "14",
        "label": "pages, migrated from WordPress with 301s"
      },
      {
        "value": "247",
        "label": "commits on the site in six months"
      },
      {
        "value": "100",
        "label": "Lighthouse accessibility (from 84)"
      },
      {
        "value": "−82%",
        "label": "image weight (159 → 28 MB)"
      },
      {
        "value": "2 → 20",
        "label": "sessions from AI assistants in 30 days"
      }
    ],
    "intro": [
      "After the rebranding, what was missing was the place where the brand shows up most: the website. The 2025 site ran on WordPress with Elementor and talked about features. The sales team told another story on calls, that of an ecosystem with three products, thousands of mentors, a podcast and its own event.",
      "My job was to build that site from scratch in Astro, migrate everything from WordPress without losing a URL, treat performance and accessibility as features and prepare every page to be read by people and by AIs. Design and code came from the same hands, with the client deciding at every step."
    ],
    "roleLabel": "What I did",
    "roleList": [
      "Information architecture",
      "Design of the 14 pages",
      "Astro + React website",
      "WordPress migration",
      "Performance and accessibility",
      "Technical SEO and GEO",
      "Analytics and consent",
      "Content workflow"
    ],
    "sections": [
      {
        "kicker": "01 — The gap",
        "title": "Whoever arrived saw a tool.",
        "body": [
          "The 2025 site opened with a comparison table, an orange \"see the plans\" button and the promise of being \"the best platform on the market for coaches\". It ran on WordPress with Elementor, over PHP 7.4, and carried a 404 menu item, a draft page exposed in the navigation, hard-coded UTMs and spam injected on the server.",
          "Before designing, I mapped the old site page by page and transcribed real sales calls. The contrast became the third slide of the brand deck: the problem was never the product. Tutory had grown beyond what the brand could convey."
        ],
        "image": {
          "src": "/cases/tutory-site/gap.webp",
          "alt": "Screenshot of the old Tutory website in black and white next to the new home page in color",
          "caption": "The 2025 site (WordPress) and the 2026 home (Astro). Same company, same name."
        }
      },
      {
        "kicker": "02 — The website",
        "title": "A website worthy of the ecosystem",
        "body": [
          "With the brand approved, the site started on April 16 and went live on June 18: 63 days, 14 pages, an Astro monorepo with React islands only where things move. The home tells the ecosystem story in sequence: a hero with a 3D ring of cards over the couple’s photo, a sentence that reveals word by word as you scroll, the numbers, the growth chart and three product blocks that switch like curtains.",
          "Underneath, the invisible work: a 301 for every WordPress URL, Consent Mode v2 with everything denied by default (LGPD), tag manager only on the production domain, CTAs wired to the Typebot that feeds the CRM and a scheduling modal with ten triggers. No forms of its own: the sales team already lived on WhatsApp and the CRM, and the site respects that."
        ],
        "showcase": {
          "frame": "flat",
          "url": "tutory.com.br",
          "items": [
            {
              "src": "/cases/tutory-site/site-hero.webp",
              "alt": "Tutory home: headline The ecosystem that empowers Brazil’s top mentors and educational creators, with 3D cards over a couple’s photo",
              "label": "Home",
              "meta": "tutory.com.br",
              "caption": "The ring of cards spins in 3D over the photo. On phones, it becomes a horizontal marquee."
            },
            {
              "src": "/cases/tutory-site/site-mentoria.webp",
              "alt": "Tutory Mentoria block: your mentoring under control, with schedule cards over a photo of two students",
              "label": "Tutory Mentoria",
              "meta": "parallax block",
              "size": "half"
            },
            {
              "src": "/cases/tutory-site/hub-marquee-poster.webp",
              "video": {
                "src": "/cases/tutory-site/hub-marquee.mp4"
              },
              "alt": "Video: Tutory Hub block in electric blue with the diagonal conveyor of product screens sliding in a loop",
              "label": "Tutory Hub",
              "meta": "video · parallax block",
              "size": "half",
              "caption": "The conveyor of product cards drifts in three columns at different rhythms; here as a 30 s loop."
            },
            {
              "src": "/cases/tutory-site/site-orbita.webp",
              "alt": "Section The platform chosen by Brazil’s biggest, with client logos orbiting the symbol",
              "label": "The chosen platform",
              "meta": "logo orbit",
              "size": "half"
            },
            {
              "src": "/cases/tutory-site/site-precos.webp",
              "alt": "Section A product for every stage of your business, with the Mentoria, Hub and Academy cards",
              "label": "A product for every stage",
              "meta": "#precos",
              "size": "half"
            },
            {
              "src": "/cases/tutory-site/placas-poster.webp",
              "video": {
                "src": "/cases/tutory-site/placas.mp4",
                "webm": "/cases/tutory-site/placas.webm"
              },
              "alt": "Video: the Gold, Diamond, Ruby, Emerald and Silver plaques scroll in a marquee; a click on Diamond opens the achievement sheet in a side panel",
              "label": "Mentoria plaques",
              "meta": "video · /produtos/mentoria",
              "size": "half",
              "caption": "The Silver, Gold, Diamond, Ruby and Emerald plaques scroll in a marquee; a click opens the achievement sheet."
            },
            {
              "src": "/cases/tutory-site/pagina-hub-maia.webp",
              "alt": "Section Maia, the intelligence that amplifies what you teach, with an animated AI chat",
              "label": "Maia, the Hub’s AI",
              "meta": "/produtos/hub",
              "size": "half"
            }
          ]
        },
        "galleryTitle": "Mobile",
        "gallery": [
          {
            "src": "/cases/tutory-site/mobile-home.webp",
            "alt": "Tutory home on a phone"
          },
          {
            "src": "/cases/tutory-site/mobile-hub.webp",
            "alt": "Tutory Hub page on a phone"
          },
          {
            "src": "/cases/tutory-site/mobile-mentoria.webp",
            "alt": "Tutory Mentoria block on a phone"
          }
        ],
        "galleryCaption": "Home, Hub and Mentoria on a phone: same animations, transform and opacity only, no jank."
      },
      {
        "kicker": "03 — Performance, SEO and GEO",
        "title": "Fast for people, readable for machines",
        "body": [
          "Performance was treated as a feature: images from 159 MB to 28 MB, 50 photos converted to WebP, the noise texture from 2.2 MB to 60 KB, width and height on every image to kill layout shift, and 55 of the home’s 57 islands no longer hydrating on load. Accessibility went from 84 to 100 on Lighthouse, with 100 on SEO and best practices too.",
          "And since more and more people ask an AI which platform to use, the site was prepared to be read and cited by assistants: robots.txt allowing GPTBot, ClaudeBot, PerplexityBot and Google-Extended, llms.txt and llms-full.txt generated at runtime, a .md version of every guide, IndexNow for Bing and structured data on every page. In 30 days, OAI-SearchBot came by 938 times and ClaudeBot 864. The \"AI assistants\" channel went from 2 to 20 sessions and the key-event rate per session rose from 0.68% to 1.22%."
        ],
        "image": {
          "src": "/cases/tutory-site/seo.webp",
          "alt": "Three cards with excerpts of the site’s robots.txt, JSON-LD and llms.txt on a blue background",
          "caption": "robots.txt, JSON-LD and llms.txt from the production site, plus the Lighthouse scores."
        }
      },
      {
        "kicker": "04 — Content",
        "title": "Publishing without depending on anyone",
        "body": [
          "The blog, the cases and the guides needed a workflow the marketing team could run alone. I tried three. A Sveltia CMS fork translated to pt-BR lasted a week. A custom CMS on Astro SSR with Postgres, an editor, a media library and automatic deploys lasted two months. The third was the simplest: content as markdown in the repository, published through pull requests.",
          "The simplest one won because it was the one the team actually used. Once the real pace turned out to be one article a week, written with AI help and reviewed in a PR, the CMS layer became cost without return: database, uploads, login, quotas. I switched it off in September. Today there are 19 articles, 6 cases and 4 guides, each guide with a markdown version made for AIs."
        ],
        "showcase": {
          "frame": "flat",
          "start": 0,
          "items": [
            {
              "src": "/cases/tutory-site/pagina-blog.webp",
              "alt": "Publications page with the featured article Is your Instagram shop open or closed?",
              "label": "Publications",
              "meta": "/blog",
              "size": "half"
            },
            {
              "src": "/cases/tutory-site/pagina-guias.webp",
              "alt": "Guides page with two featured guides on mentoring for public exams and study schedules",
              "label": "Guides",
              "meta": "/guias · also as .md",
              "size": "half"
            }
          ]
        }
      },
      {
        "kicker": "05 — Outcome",
        "title": "The same company, finally recognizable",
        "body": [
          "In 63 days, Tutory went from a WordPress site that talked about features to 14 pages that tell the ecosystem story the way the sales team always told it, with the new brand in every detail.",
          "The site keeps evolving in production, 247 commits through October, with new articles, a teacher area and hero adjustments, without ever going offline."
        ]
      }
    ],
    "outcomesLabel": "Results",
    "outcomesTitle": "What changed for the business",
    "outcomes": [
      "New site live in 63 days, 14 pages, migrated from WordPress with 301s",
      "Lighthouse 100 on accessibility, SEO and best practices (accessibility was 84)",
      "Images 82% lighter and 55 of 57 islands not hydrating on load",
      "Ready for AIs: robots, llms.txt, structured data and IndexNow",
      "\"AI assistants\" channel from 2 to 20 sessions; key events per session from 0.68% to 1.22%",
      "Content published by the team through pull requests, with no CMS to maintain"
    ],
    "stackLabel": "Stack",
    "stack": [
      "Astro 6",
      "React",
      "TypeScript",
      "Tailwind CSS 4",
      "Motion · Lenis",
      "Vercel",
      "GTM · Consent Mode v2",
      "Typebot",
      "schema.org · llms.txt"
    ],
    "cta": {
      "heading": "Does your website still talk about features?",
      "sub": "I build the website that tells the story the way your team tells it: design, code, migration and SEO.",
      "label": "Get in touch"
    },
    "ui": {
      "back": "Back to projects",
      "visit": "Visit the site"
    },
    "liveUrl": "https://www.tutory.com.br",
    "seo": {
      "title": "Tutory: website — Case Study · Wellington Mota",
      "description": "Tutory’s institutional website in Astro: 14 pages, WordPress migration with 301s, Lighthouse 100, Consent Mode v2 and ready to be cited by AIs. From first commit to live in 63 days."
    }
  }
};

export default tutorySite;
