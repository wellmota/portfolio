import type { CaseStudy } from './types';

/**
 * Tutory: rebranding + site institucional (mar–out 2026).
 * Fontes: repositório tutory-rebranding (deck v1/v2), monorepo tutory-site (git log, relatório
 * interno de 15/09/2026) e o site em produção. Prints feitos em 18–19/10/2026.
 */
const tutoryRebrand: CaseStudy = {
  pt: {
    slug: 'tutory-rebrand',
    accent: '#3B7BF5',
    kicker: 'Case Study — 2026',
    title: 'Tutory: marca e site',
    subtitle:
      'A Tutory cresceu além do que a marca conseguia transmitir. Em três meses, redesenhei o símbolo, a voz e o site: do primeiro slide do deck ao ar em tutory.com.br, design e código por uma pessoa.',
    cover: {
      src: '/cases/tutory-rebrand/cover.webp',
      alt: 'Monitor inclinado com a home nova da Tutory sobre fundo azul elétrico, ao lado do novo símbolo e da paleta',
    },
    meta: [
      { label: 'Cliente', value: 'Tutory · EdTech, Brasília' },
      { label: 'Período', value: 'Mar — Out 2026' },
      { label: 'Papel', value: 'Brand + design engineer, solo' },
      { label: 'Frentes', value: 'Marca · Deck · Site · SEO/GEO' },
      { label: 'Entrega', value: 'No ar desde 18 jun 2026' },
    ],
    stats: [
      { value: '4 dias', label: 'da primeira proposta à marca aprovada' },
      { value: '37', label: 'slides no deck interativo da marca' },
      { value: '63 dias', label: 'do primeiro commit ao site no ar' },
      { value: '247', label: 'commits no site em seis meses' },
      { value: '100', label: 'acessibilidade Lighthouse (de 84)' },
      { value: '−82%', label: 'no peso das imagens (159 → 28 MB)' },
    ],
    intro: [
      'Por fora, a Tutory era um cérebro azul de contorno arredondado, um site em WordPress e um discurso de features. Por dentro, era um ecossistema com três produtos, milhares de mentores, um podcast e um evento próprio. Quem chegava pelo site via uma ferramenta. Quem ficava, descobria o ecossistema.',
      'Meu trabalho foi fechar essa distância em duas frentes: uma identidade que dissesse o tamanho da empresa e um site que contasse a história do jeito que o time comercial já contava nas calls. Pesquisa, posicionamento, símbolo, deck, design e código saíram das mesmas mãos, com o cliente decidindo a cada etapa.',
    ],
    roleLabel: 'O que eu fiz',
    roleList: [
      'Diagnóstico de marca e site',
      'Arquétipos e posicionamento',
      'Símbolo, paleta e tipografia',
      'Deck interativo em HTML',
      'Geradores 3D (Three.js)',
      'Troféu em Blender',
      'Site em Astro + React',
      'Migração do WordPress',
      'Performance e acessibilidade',
      'SEO técnico e GEO',
      'Fluxo de conteúdo',
    ],
    sections: [
      {
        kicker: '01 — O gap',
        title: 'Quem chegava, via uma ferramenta.',
        body: [
          'O site de 2025 abria com uma tabela comparativa, um botão laranja de "conheça os planos" e a promessa de ser "a melhor plataforma do mercado para coaches". Rodava em WordPress com Elementor, sobre PHP 7.4, e carregava um item de menu em 404, uma página de rascunho exposta na navegação, UTMs fixas no código e spam injetado no servidor.',
          'Antes de desenhar, mapeei o site antigo página a página e transcrevi calls de vendas reais. O contraste virou o terceiro slide do deck de marca: o problema nunca foi o produto. A Tutory cresceu além do que a marca conseguia transmitir.',
        ],
        image: {
          src: '/cases/tutory-rebrand/gap.webp',
          alt: 'Print do site antigo da Tutory em preto e branco ao lado da home nova em cores',
          caption: 'O site de 2025 (WordPress) e a home de 2026 (Astro). Mesma empresa, mesmo nome.',
        },
      },
      {
        kicker: '02 — A marca',
        title: 'O mesmo símbolo. Uma arquitetura nova.',
        body: [
          'Comecei pela personalidade. A Tutory é O Governante, quem define o padrão do mercado, com um traço de O Mágico, quem transforma o que existe em algo que não existia. A primeira proposta, em 27 de março, levou isso ao extremo: uma supernova no lugar do cérebro, paleta de oceano, tipografia de sistema. Era bonita. E era outra empresa.',
          'Quatro dias depois veio a resposta certa: manter o cérebro que todo mundo já reconhecia e reconstruí-lo como arquitetura, duas metades hexagonais em traços retos, cada ângulo calculado. Em volta dele, o azul elétrico como cor da clareza intelectual, o dourado reservado a momentos únicos, Gilroy nos títulos e Manrope no corpo. A voz mudou junto: de "a melhor plataforma para coaches!" para "os melhores mentores do Brasil já escolheram".',
        ],
        showcase: {
          items: [
            {
              src: '/cases/tutory-rebrand/marca-sistema.webp',
              alt: 'Folha do sistema de identidade: símbolo, logotipo, arquétipos, seis cores e duas famílias tipográficas',
              label: 'Sistema de identidade',
              meta: 'símbolo · paleta · tipografia',
              caption: 'Símbolo, logotipo, os dois arquétipos, as seis cores (Abyss, Deep, Electric, Beam, Ice e Gold) e as duas famílias, Gilroy e Manrope, numa folha só.',
            },
            {
              src: '/cases/tutory-rebrand/marca-v1.webp',
              alt: 'Proposta 1 da marca: símbolo em supernova e paleta de oceano, numa placa de vidro segurada contra a luz',
              label: 'Proposta 1 — Supernova',
              meta: '27 mar · descartada',
              size: 'half',
              caption: 'A ruptura total: símbolo novo, paleta de oceano. Linda, e de outra empresa.',
            },
            {
              src: '/cases/tutory-rebrand/marca-v2.webp',
              alt: 'Proposta 2 da marca: cérebro geométrico em azul elétrico, na mesma placa de vidro',
              label: 'Proposta 2 — Arquitetura',
              meta: '31 mar · aprovada',
              size: 'half',
              caption: 'O cérebro redesenhado em azul elétrico. O que a Tutory já era, com a forma à altura.',
            },
            {
              src: '/cases/tutory-rebrand/marca-palco.webp',
              alt: 'Painel de palco com o logotipo Tutory e a assinatura Empowering Intelligence, uma pessoa caminhando à frente',
              label: 'Empowering Intelligence',
              meta: 'painel de palco',
              caption: 'A assinatura nova em escala de evento. A Tutory Experience reúne os maiores mentores do país num dia.',
            },
            {
              src: '/cases/tutory-rebrand/marca-papelaria.webp',
              alt: 'Papelaria da marca: papel timbrado com selo circular, cartões, caderno, envelope e pendrive',
              label: 'Papelaria',
              meta: 'selo · cartões · caderno',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/marca-apple.webp',
              alt: 'Quatro aplicações: logotipo em gradiente, letreiro, ícone de app no iPhone e no Apple Watch',
              label: 'Ícones e dispositivos',
              meta: 'iOS · watch · letreiro',
              size: 'half',
            },
          ],
        },
        galleryTitle: 'Aplicações',
        gallery: [
          { src: '/cases/tutory-rebrand/marca-f1.webp', alt: 'Estande com símbolo em neon azul e carro de corrida com a marca Tutory' },
          { src: '/cases/tutory-rebrand/marca-piloto.webp', alt: 'Piloto de costas com o logotipo Tutory no macacão' },
          { src: '/cases/tutory-rebrand/marca-cracha.webp', alt: 'Crachá preto com o símbolo em cromo e a assinatura Empowering Intelligence' },
          { src: '/cases/tutory-rebrand/marca-trofeu.webp', alt: 'Troféu Tutory Legacy Award: símbolo dourado entre pétalas de vidro sobre base preta' },
        ],
        galleryCaption: 'Estande, uniforme, crachá e o troféu Tutory Legacy Award, modelado em Blender para o evento.',
      },
      {
        kicker: '03 — O deck e as ferramentas',
        title: 'Uma marca que se apresenta sozinha',
        body: [
          'Em vez de um PDF, a marca foi apresentada num deck interativo em HTML puro: 37 slides, 21 deles visíveis e o resto guardado como variações, navegação por setas, roda e toque, versão vertical para celular e link direto para cada slide. A mesma apresentação virou o manual: paleta, tipografia, voz e um slide de downloads com o kit, logos vetoriais e fontes.',
          'Para a marca não se degradar no dia a dia, construí duas ferramentas em Three.js. Um gerador de vidro refrativo extruda o símbolo e renderiza versões em cristal, cromo ou neon (20 formas, 9 estilos, exporta PNG, 4K e GLB). Um gerador de medalhas 3D produz as placas Prata, Ouro, Diamante, Ruby e Esmeralda da Mentoria e sai empacotado como web component: uma tag, e a medalha gira em qualquer página.',
        ],
        showcase: {
          items: [
            {
              src: '/cases/tutory-rebrand/deck.webp',
              alt: 'Monitor com o slide de cores do deck, com os slides de tipografia e de símbolo flutuando ao lado',
              label: 'Deck interativo',
              meta: 'HTML · 37 slides',
              caption: 'O slide de cores em destaque, tipografia e símbolo ao lado. Tudo roda no navegador, sem build.',
            },
            {
              src: '/cases/tutory-rebrand/deck-tipografia.webp',
              alt: 'Slide A voz escrita: Gilroy para títulos, Manrope para corpo, com a escala tipográfica',
              label: 'A voz escrita',
              meta: 'slide 15',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/deck-aplicacoes.webp',
              alt: 'Slide de aplicações em grade: logotipo, letreiro, ícones e papelaria',
              label: 'Aplicações',
              meta: 'slide 08',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/gerador-vidro.webp',
              alt: 'Gerador de vidro refrativo com o símbolo Tutory em cromo escuro e o painel de controles de material',
              label: 'Gerador de vidro',
              meta: 'three.js · png · 4K · glb',
              size: 'half',
              caption: 'Preset "Tutory Symbol": IOR, transmissão, dispersão e clearcoat ajustáveis, semente reproduzível.',
            },
            {
              src: '/cases/tutory-rebrand/gerador-medalha.webp',
              alt: 'Medalha 3D Mentoria Tutory Ruby: anel cromado, face hexagonal azul e texto em volta',
              label: 'Gerador de medalhas',
              meta: 'web component',
              size: 'half',
              caption: 'As placas da Mentoria em 3D de verdade, com anel de texto e reflexos, numa tag HTML.',
            },
          ],
        },
      },
      {
        kicker: '04 — O site',
        title: 'Um site à altura do ecossistema',
        body: [
          'Com a marca aprovada, o site começou em 16 de abril e foi ao ar em 18 de junho: 63 dias, 14 páginas, um monorepo em Astro com ilhas React só onde há movimento. A home conta a história do ecossistema em sequência: hero com um anel 3D de cartões sobre a foto do casal, uma frase que se revela palavra a palavra ao rolar, os números, o gráfico de crescimento e três blocos de produto que trocam como cortinas.',
          'Por baixo, o trabalho invisível: 301 de cada URL do WordPress, Consent Mode v2 com tudo negado por padrão (LGPD), tag manager só no domínio de produção, CTAs ligados ao Typebot que alimenta o CRM e um modal de agendamento com dez gatilhos. Nenhum formulário próprio: o time comercial já vivia no WhatsApp e no CRM, e o site respeita isso.',
        ],
        showcase: {
          url: 'tutory.com.br',
          items: [
            {
              src: '/cases/tutory-rebrand/site-hero.webp',
              alt: 'Home da Tutory: título O Ecossistema que potencializa os maiores mentores e infoprodutores educacionais do Brasil, com cartões 3D sobre a foto de um casal',
              label: 'Home',
              meta: 'tutory.com.br',
              caption: 'O anel de cartões gira em 3D sobre a foto. No celular, vira um letreiro horizontal.',
            },
            {
              src: '/cases/tutory-rebrand/site-mentoria.webp',
              alt: 'Bloco Tutory Mentoria: sua mentoria sob controle, com cartões de cronograma sobre foto de dois alunos',
              label: 'Tutory Mentoria',
              meta: 'bloco parallax',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/site-hub.webp',
              alt: 'Bloco Tutory Hub em azul elétrico com uma esteira de telas do produto',
              label: 'Tutory Hub',
              meta: 'bloco parallax',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/site-orbita.webp',
              alt: 'Seção A plataforma escolhida pelos maiores do Brasil, com logos de clientes orbitando o símbolo',
              label: 'A plataforma escolhida',
              meta: 'órbita de logos',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/site-precos.webp',
              alt: 'Seção Um produto para cada fase do seu negócio, com os cartões Mentoria, Hub e Academy',
              label: 'Um produto para cada fase',
              meta: '#precos',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/pagina-mentoria-placas.webp',
              alt: 'Seção Porque crescer precisa ser celebrado, com as placas Ouro, Diamante, Ruby, Esmeralda e Prata',
              label: 'Placas da Mentoria',
              meta: '/produtos/mentoria',
              size: 'half',
              caption: 'As placas de conquista, com brilho e reflexo de vidro, vêm do mesmo gerador 3D da marca.',
            },
            {
              src: '/cases/tutory-rebrand/pagina-hub-maia.webp',
              alt: 'Seção Maia, a inteligência que amplifica o que você ensina, com um chat de IA animado',
              label: 'Maia, a IA da Hub',
              meta: '/produtos/hub',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/site-mobile.webp',
              alt: 'Três celulares com a home, a página da Hub e o bloco da Mentoria',
              label: 'Mobile',
              meta: '390 × 844',
              caption: 'Home, Hub e Mentoria no celular: mesmas animações, só transform e opacity, sem travar.',
            },
          ],
        },
      },
      {
        kicker: '05 — Performance, SEO e GEO',
        title: 'Rápido para pessoas, legível para máquinas',
        body: [
          'Performance foi tratada como feature: imagens de 159 MB para 28 MB, 50 fotos convertidas para WebP, a textura de ruído de 2,2 MB para 60 KB, largura e altura em todas as imagens para zerar o salto de layout, e 55 das 57 ilhas da home deixando de hidratar no carregamento. Acessibilidade subiu de 84 para 100 no Lighthouse, com 100 também em SEO e boas práticas.',
          'E como cada vez mais gente pergunta a uma IA qual plataforma usar, o site foi preparado para ser lido e citado por assistentes: robots.txt liberando GPTBot, ClaudeBot, PerplexityBot e Google-Extended, llms.txt e llms-full.txt gerados em runtime, versão .md de cada guia, IndexNow para o Bing e dados estruturados em todas as páginas. Em 30 dias, o OAI-SearchBot passou 938 vezes e o ClaudeBot, 864. O canal "assistentes de IA" saiu de 2 para 20 sessões e a taxa de eventos-chave por sessão subiu de 0,68% para 1,22%.',
        ],
        image: {
          src: '/cases/tutory-rebrand/seo.webp',
          alt: 'Três cartões com trechos do robots.txt, do JSON-LD e do llms.txt do site, sobre fundo azul',
          caption: 'robots.txt, JSON-LD e llms.txt do site em produção, e as notas do Lighthouse.',
        },
      },
      {
        kicker: '06 — Conteúdo',
        title: 'Publicar sem depender de ninguém',
        body: [
          'O blog, os cases e os guias precisavam de um fluxo que o time de marketing tocasse sozinho. Testei três. Um fork do Sveltia CMS traduzido para pt-BR durou uma semana. Um CMS próprio em Astro SSR com Postgres, editor, biblioteca de mídia e deploy automático durou dois meses. O terceiro era o mais simples: conteúdo em markdown no repositório, publicado por pull request.',
          'O mais simples venceu porque era o que o time realmente usava. Quando o ritmo real se mostrou um artigo por semana, escrito com ajuda de IA e revisado em PR, a camada de CMS virou custo sem retorno: banco, uploads, login, cota. Desliguei em setembro. Hoje são 19 artigos, 6 cases e 4 guias, cada guia com uma versão em markdown feita para as IAs.',
        ],
        showcase: {
          start: 0,
          items: [
            {
              src: '/cases/tutory-rebrand/pagina-blog.webp',
              alt: 'Página Publicações com o artigo em destaque Sua loja no Instagram está aberta ou fechada?',
              label: 'Publicações',
              meta: '/blog',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/pagina-guias.webp',
              alt: 'Página Guias com dois guias em destaque sobre mentoria para concursos e cronograma de estudos',
              label: 'Guias',
              meta: '/guias · também em .md',
              size: 'half',
            },
          ],
        },
      },
      {
        kicker: '07 — Resultado',
        title: 'A mesma empresa, enfim reconhecível',
        body: [
          'Em três meses, a Tutory saiu de um cérebro arredondado num site de WordPress para uma identidade que assina palco, produto, dashboards internos, crachás e troféu, e para um site que conta a história do ecossistema do jeito que o time comercial sempre contou.',
          'A marca v2 já vive fora do site: o Tutory OS, o Aeroporto de Leads e os painéis internos nasceram nela. E o site segue evoluindo em produção, 247 commits até outubro, com artigos novos, área do professor e ajustes de hero, sem nunca ter saído do ar.',
        ],
      },
    ],
    outcomesLabel: 'Resultados',
    outcomesTitle: 'O que mudou para o negócio',
    outcomes: [
      'Identidade nova aprovada em quatro dias e em uso em todo o ecossistema',
      'Site novo no ar em 63 dias, 14 páginas, migrado do WordPress com 301',
      'Lighthouse 100 em acessibilidade, SEO e boas práticas (acessibilidade vinha de 84)',
      'Imagens 82% mais leves e 55 de 57 ilhas sem hidratar no carregamento',
      'Pronto para IAs: robots, llms.txt, dados estruturados e IndexNow',
      'Deck interativo e geradores 3D mantêm a marca no padrão sem depender de mim',
    ],
    stackLabel: 'Stack',
    stack: ['Illustrator', 'Blender', 'Three.js', 'Astro 6', 'React', 'TypeScript', 'Tailwind CSS 4', 'Motion · Lenis', 'Vercel', 'GTM · Consent Mode v2', 'Typebot', 'schema.org · llms.txt'],
    cta: {
      heading: 'Sua empresa cresceu mais que a sua marca?',
      sub: 'Eu fecho essa distância: posicionamento, identidade, site e SEO, do primeiro slide ao deploy.',
      label: 'Falar comigo',
    },
    ui: { back: 'Voltar aos projetos', visit: 'Visitar o site' },
    liveUrl: 'https://www.tutory.com.br',
    seo: {
      title: 'Tutory: marca e site — Case Study · Wellington Mota',
      description:
        'Rebranding com arquétipos, deck interativo de 37 slides, geradores 3D e um site novo em Astro: do WordPress ao ar em 63 dias, Lighthouse 100 e pronto para ser citado por IAs.',
    },
  },

  en: {
    slug: 'tutory-rebrand',
    accent: '#3B7BF5',
    kicker: 'Case Study — 2026',
    title: 'Tutory: brand and website',
    subtitle:
      'Tutory had outgrown what its brand could say. In three months I redesigned the symbol, the voice and the website: from the first slide of the deck to going live at tutory.com.br, design and code by one person.',
    cover: {
      src: '/cases/tutory-rebrand/cover.webp',
      alt: 'Tilted monitor with the new Tutory home page on an electric blue background, next to the new symbol and palette',
    },
    meta: [
      { label: 'Client', value: 'Tutory · EdTech, Brasília' },
      { label: 'Period', value: 'Mar — Oct 2026' },
      { label: 'Role', value: 'Brand + design engineer, solo' },
      { label: 'Fronts', value: 'Brand · Deck · Website · SEO/GEO' },
      { label: 'Shipped', value: 'Live since Jun 18, 2026' },
    ],
    stats: [
      { value: '4 days', label: 'from first proposal to approved brand' },
      { value: '37', label: 'slides in the interactive brand deck' },
      { value: '63 days', label: 'from first commit to the site going live' },
      { value: '247', label: 'commits on the site in six months' },
      { value: '100', label: 'Lighthouse accessibility (from 84)' },
      { value: '−82%', label: 'image weight (159 → 28 MB)' },
    ],
    intro: [
      'From the outside, Tutory was a rounded blue brain, a WordPress website and a feature pitch. Inside, it was an ecosystem with three products, thousands of mentors, a podcast and its own event. Whoever arrived through the website saw a tool. Whoever stayed discovered the ecosystem.',
      'My job was to close that gap on two fronts: an identity that said how big the company had become, and a website that told the story the way the sales team already told it on calls. Research, positioning, symbol, deck, design and code came from the same hands, with the client deciding at every step.',
    ],
    roleLabel: 'What I did',
    roleList: [
      'Brand and website audit',
      'Archetypes and positioning',
      'Symbol, palette and type',
      'Interactive HTML deck',
      '3D generators (Three.js)',
      'Trophy in Blender',
      'Astro + React website',
      'WordPress migration',
      'Performance and accessibility',
      'Technical SEO and GEO',
      'Content workflow',
    ],
    sections: [
      {
        kicker: '01 — The gap',
        title: 'Whoever arrived saw a tool.',
        body: [
          'The 2025 site opened with a comparison table, an orange "see the plans" button and the promise of being "the best platform on the market for coaches". It ran on WordPress with Elementor, over PHP 7.4, and carried a 404 menu item, a draft page exposed in the navigation, hard-coded UTMs and spam injected on the server.',
          'Before designing, I mapped the old site page by page and transcribed real sales calls. The contrast became the third slide of the brand deck: the problem was never the product. Tutory had grown beyond what the brand could convey.',
        ],
        image: {
          src: '/cases/tutory-rebrand/gap.webp',
          alt: 'Screenshot of the old Tutory website in black and white next to the new home page in color',
          caption: 'The 2025 site (WordPress) and the 2026 home (Astro). Same company, same name.',
        },
      },
      {
        kicker: '02 — The brand',
        title: 'The same symbol. A new architecture.',
        body: [
          'I started with personality. Tutory is The Ruler, the one who sets the market standard, with a streak of The Magician, the one who turns what exists into something that did not. The first proposal, on March 27, took that to the extreme: a supernova instead of the brain, an ocean palette, system typography. It was beautiful. And it was another company.',
          'Four days later came the right answer: keep the brain everyone already recognized and rebuild it as architecture, two hexagonal halves in straight strokes, every angle calculated. Around it, electric blue as the color of intellectual clarity, gold reserved for unique moments, Gilroy for headlines and Manrope for body. The voice changed with it: from "the best platform for coaches!" to "Brazil’s best mentors have already chosen".',
        ],
        showcase: {
          items: [
            {
              src: '/cases/tutory-rebrand/marca-sistema.webp',
              alt: 'Identity system sheet: symbol, wordmark, archetypes, six colors and two type families',
              label: 'Identity system',
              meta: 'symbol · palette · type',
              caption: 'Symbol, wordmark, the two archetypes, the six colors (Abyss, Deep, Electric, Beam, Ice and Gold) and the two families, Gilroy and Manrope, on one sheet.',
            },
            {
              src: '/cases/tutory-rebrand/marca-v1.webp',
              alt: 'Brand proposal 1: supernova symbol and ocean palette on a glass tile held against the light',
              label: 'Proposal 1 — Supernova',
              meta: 'Mar 27 · discarded',
              size: 'half',
              caption: 'The clean break: new symbol, ocean palette. Beautiful, and another company.',
            },
            {
              src: '/cases/tutory-rebrand/marca-v2.webp',
              alt: 'Brand proposal 2: geometric brain in electric blue on the same glass tile',
              label: 'Proposal 2 — Architecture',
              meta: 'Mar 31 · approved',
              size: 'half',
              caption: 'The brain redrawn in electric blue. What Tutory already was, with a form to match.',
            },
            {
              src: '/cases/tutory-rebrand/marca-palco.webp',
              alt: 'Stage panel with the Tutory wordmark and the tagline Empowering Intelligence, a person walking in front',
              label: 'Empowering Intelligence',
              meta: 'stage panel',
              caption: 'The new signature at event scale. Tutory Experience gathers the country’s top mentors for a day.',
            },
            {
              src: '/cases/tutory-rebrand/marca-papelaria.webp',
              alt: 'Brand stationery: letterhead with circular seal, cards, notebook, envelope and USB drive',
              label: 'Stationery',
              meta: 'seal · cards · notebook',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/marca-apple.webp',
              alt: 'Four applications: wordmark on gradient, signage, app icon on iPhone and on Apple Watch',
              label: 'Icons and devices',
              meta: 'iOS · watch · signage',
              size: 'half',
            },
          ],
        },
        galleryTitle: 'Applications',
        gallery: [
          { src: '/cases/tutory-rebrand/marca-f1.webp', alt: 'Stand with the symbol in blue neon and a race car with the Tutory brand' },
          { src: '/cases/tutory-rebrand/marca-piloto.webp', alt: 'Driver from behind with the Tutory wordmark on the suit' },
          { src: '/cases/tutory-rebrand/marca-cracha.webp', alt: 'Black badge with the chrome symbol and the Empowering Intelligence tagline' },
          { src: '/cases/tutory-rebrand/marca-trofeu.webp', alt: 'Tutory Legacy Award trophy: golden symbol between glass petals on a black base' },
        ],
        galleryCaption: 'Stand, uniform, badge and the Tutory Legacy Award trophy, modeled in Blender for the event.',
      },
      {
        kicker: '03 — The deck and the tools',
        title: 'A brand that presents itself',
        body: [
          'Instead of a PDF, the brand was presented in an interactive deck in plain HTML: 37 slides, 21 of them visible and the rest kept as variations, arrow, wheel and touch navigation, a vertical version for phones and a direct link to every slide. The same presentation became the guidelines: palette, type, voice and a downloads slide with the kit, vector logos and fonts.',
          'So the brand would not degrade in daily use, I built two tools in Three.js. A refractive glass generator extrudes the symbol and renders it in crystal, chrome or neon (20 shapes, 9 styles, exports PNG, 4K and GLB). A 3D medal generator produces the Mentoria plaques, Silver, Gold, Diamond, Ruby and Emerald, and ships as a web component: one tag, and the medal spins on any page.',
        ],
        showcase: {
          items: [
            {
              src: '/cases/tutory-rebrand/deck.webp',
              alt: 'Monitor with the deck’s color slide, with the typography and symbol slides floating beside it',
              label: 'Interactive deck',
              meta: 'HTML · 37 slides',
              caption: 'The color slide up front, typography and symbol beside it. Everything runs in the browser, no build step.',
            },
            {
              src: '/cases/tutory-rebrand/deck-tipografia.webp',
              alt: 'Slide The written voice: Gilroy for headlines, Manrope for body, with the type scale',
              label: 'The written voice',
              meta: 'slide 15',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/deck-aplicacoes.webp',
              alt: 'Applications slide in a grid: wordmark, signage, icons and stationery',
              label: 'Applications',
              meta: 'slide 08',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/gerador-vidro.webp',
              alt: 'Refractive glass generator with the Tutory symbol in dark chrome and the material control panel',
              label: 'Glass generator',
              meta: 'three.js · png · 4K · glb',
              size: 'half',
              caption: '"Tutory Symbol" preset: adjustable IOR, transmission, dispersion and clearcoat, with a reproducible seed.',
            },
            {
              src: '/cases/tutory-rebrand/gerador-medalha.webp',
              alt: '3D medal Mentoria Tutory Ruby: chrome ring, blue hexagonal face and text around it',
              label: 'Medal generator',
              meta: 'web component',
              size: 'half',
              caption: 'The Mentoria plaques in real 3D, with a text ring and reflections, in one HTML tag.',
            },
          ],
        },
      },
      {
        kicker: '04 — The website',
        title: 'A website worthy of the ecosystem',
        body: [
          'With the brand approved, the site started on April 16 and went live on June 18: 63 days, 14 pages, an Astro monorepo with React islands only where things move. The home tells the ecosystem story in sequence: a hero with a 3D ring of cards over the couple’s photo, a sentence that reveals word by word as you scroll, the numbers, the growth chart and three product blocks that switch like curtains.',
          'Underneath, the invisible work: a 301 for every WordPress URL, Consent Mode v2 with everything denied by default (LGPD), tag manager only on the production domain, CTAs wired to the Typebot that feeds the CRM and a scheduling modal with ten triggers. No forms of its own: the sales team already lived on WhatsApp and the CRM, and the site respects that.',
        ],
        showcase: {
          url: 'tutory.com.br',
          items: [
            {
              src: '/cases/tutory-rebrand/site-hero.webp',
              alt: 'Tutory home: headline The ecosystem that empowers Brazil’s top mentors and educational creators, with 3D cards over a couple’s photo',
              label: 'Home',
              meta: 'tutory.com.br',
              caption: 'The ring of cards spins in 3D over the photo. On phones, it becomes a horizontal marquee.',
            },
            {
              src: '/cases/tutory-rebrand/site-mentoria.webp',
              alt: 'Tutory Mentoria block: your mentoring under control, with schedule cards over a photo of two students',
              label: 'Tutory Mentoria',
              meta: 'parallax block',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/site-hub.webp',
              alt: 'Tutory Hub block in electric blue with a conveyor of product screens',
              label: 'Tutory Hub',
              meta: 'parallax block',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/site-orbita.webp',
              alt: 'Section The platform chosen by Brazil’s biggest, with client logos orbiting the symbol',
              label: 'The chosen platform',
              meta: 'logo orbit',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/site-precos.webp',
              alt: 'Section A product for every stage of your business, with the Mentoria, Hub and Academy cards',
              label: 'A product for every stage',
              meta: '#precos',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/pagina-mentoria-placas.webp',
              alt: 'Section Because growing deserves celebration, with the Gold, Diamond, Ruby, Emerald and Silver plaques',
              label: 'Mentoria plaques',
              meta: '/produtos/mentoria',
              size: 'half',
              caption: 'The achievement plaques, with glow and glass reflection, come from the brand’s own 3D generator.',
            },
            {
              src: '/cases/tutory-rebrand/pagina-hub-maia.webp',
              alt: 'Section Maia, the intelligence that amplifies what you teach, with an animated AI chat',
              label: 'Maia, the Hub’s AI',
              meta: '/produtos/hub',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/site-mobile.webp',
              alt: 'Three phones with the home, the Hub page and the Mentoria block',
              label: 'Mobile',
              meta: '390 × 844',
              caption: 'Home, Hub and Mentoria on a phone: same animations, transform and opacity only, no jank.',
            },
          ],
        },
      },
      {
        kicker: '05 — Performance, SEO and GEO',
        title: 'Fast for people, readable for machines',
        body: [
          'Performance was treated as a feature: images from 159 MB to 28 MB, 50 photos converted to WebP, the noise texture from 2.2 MB to 60 KB, width and height on every image to kill layout shift, and 55 of the home’s 57 islands no longer hydrating on load. Accessibility went from 84 to 100 on Lighthouse, with 100 on SEO and best practices too.',
          'And since more and more people ask an AI which platform to use, the site was prepared to be read and cited by assistants: robots.txt allowing GPTBot, ClaudeBot, PerplexityBot and Google-Extended, llms.txt and llms-full.txt generated at runtime, a .md version of every guide, IndexNow for Bing and structured data on every page. In 30 days, OAI-SearchBot came by 938 times and ClaudeBot 864. The "AI assistants" channel went from 2 to 20 sessions and the key-event rate per session rose from 0.68% to 1.22%.',
        ],
        image: {
          src: '/cases/tutory-rebrand/seo.webp',
          alt: 'Three cards with excerpts of the site’s robots.txt, JSON-LD and llms.txt on a blue background',
          caption: 'robots.txt, JSON-LD and llms.txt from the production site, plus the Lighthouse scores.',
        },
      },
      {
        kicker: '06 — Content',
        title: 'Publishing without depending on anyone',
        body: [
          'The blog, the cases and the guides needed a workflow the marketing team could run alone. I tried three. A Sveltia CMS fork translated to pt-BR lasted a week. A custom CMS on Astro SSR with Postgres, an editor, a media library and automatic deploys lasted two months. The third was the simplest: content as markdown in the repository, published through pull requests.',
          'The simplest one won because it was the one the team actually used. Once the real pace turned out to be one article a week, written with AI help and reviewed in a PR, the CMS layer became cost without return: database, uploads, login, quotas. I switched it off in September. Today there are 19 articles, 6 cases and 4 guides, each guide with a markdown version made for AIs.',
        ],
        showcase: {
          start: 0,
          items: [
            {
              src: '/cases/tutory-rebrand/pagina-blog.webp',
              alt: 'Publications page with the featured article Is your Instagram shop open or closed?',
              label: 'Publications',
              meta: '/blog',
              size: 'half',
            },
            {
              src: '/cases/tutory-rebrand/pagina-guias.webp',
              alt: 'Guides page with two featured guides on mentoring for public exams and study schedules',
              label: 'Guides',
              meta: '/guias · also as .md',
              size: 'half',
            },
          ],
        },
      },
      {
        kicker: '07 — Outcome',
        title: 'The same company, finally recognizable',
        body: [
          'In three months, Tutory went from a rounded brain on a WordPress site to an identity that signs stages, product, internal dashboards, badges and a trophy, and to a website that tells the ecosystem story the way the sales team always told it.',
          'Brand v2 already lives beyond the site: Tutory OS, the Lead Airport and the internal dashboards were born in it. And the site keeps evolving in production, 247 commits through October, with new articles, a teacher area and hero tweaks, without ever going down.',
        ],
      },
    ],
    outcomesLabel: 'Results',
    outcomesTitle: 'What changed for the business',
    outcomes: [
      'New identity approved in four days and in use across the whole ecosystem',
      'New site live in 63 days, 14 pages, migrated from WordPress with 301s',
      'Lighthouse 100 on accessibility, SEO and best practices (accessibility was 84)',
      'Images 82% lighter and 55 of 57 islands not hydrating on load',
      'Ready for AIs: robots, llms.txt, structured data and IndexNow',
      'Interactive deck and 3D generators keep the brand on standard without me',
    ],
    stackLabel: 'Stack',
    stack: ['Illustrator', 'Blender', 'Three.js', 'Astro 6', 'React', 'TypeScript', 'Tailwind CSS 4', 'Motion · Lenis', 'Vercel', 'GTM · Consent Mode v2', 'Typebot', 'schema.org · llms.txt'],
    cta: {
      heading: 'Has your company outgrown your brand?',
      sub: 'I close that gap: positioning, identity, website and SEO, from the first slide to deploy.',
      label: 'Get in touch',
    },
    ui: { back: 'Back to projects', visit: 'Visit the site' },
    liveUrl: 'https://www.tutory.com.br',
    seo: {
      title: 'Tutory: brand and website — Case Study · Wellington Mota',
      description:
        'Rebranding with archetypes, a 37-slide interactive deck, 3D generators and a new Astro website: from WordPress to live in 63 days, Lighthouse 100 and ready to be cited by AIs.',
    },
  },
};

export default tutoryRebrand;
