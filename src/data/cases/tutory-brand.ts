/**
 * Tutory: identidade visual (mar–ago 2026). Case editorial, no formato da apresentação da marca:
 * fundo preto, capítulos numerados, imagens de ponta a ponta e nenhum mockup de device.
 * Fontes: repositório tutory-rebranding (decks v1/v2, geradores), Gamificacao (troféus) e o site em produção.
 */

export interface BrandImage {
  src: string;
  alt: string;
  label?: string;
  meta?: string;
  caption?: string;
}

export type BrandBlock =
  | { type: 'full'; image: BrandImage }
  | { type: 'pair'; items: [BrandImage, BrandImage] }
  | { type: 'trio'; items: [BrandImage, BrandImage, BrandImage] }
  | { type: 'slides'; items: BrandImage[] }
  /** Grade 2×2 de cantos arredondados (kit digital), com uma nota opcional embaixo. */
  | { type: 'bento'; items: BrandImage[]; note?: string }
  /** Slide do deck remontado em código: texto à esquerda, vídeo em loop à direita. */
  | { type: 'slide'; num: string; tag: string; title: string; accent: string; text: string; video: { src: string; webm?: string; poster: string }; alt: string }
  | { type: 'quote'; text: string; by?: string }
  | { type: 'voice'; beforeLabel: string; before: string; afterLabel: string; after: string }
  | { type: 'archetypes'; items: { role: string; name: string; desc: string; refs: string }[] }
  | { type: 'palette'; colors: { n: string; name: string; hex: string; rgb: string }[]; note: string }
  | { type: 'spec'; rows: [string, string][] }
  | { type: 'evolution'; columns: { label: string; items: string[] }[] }
  /** Slide de tipografia em código: amostras da Gilroy como contornos SVG (fonte comercial), Manrope real. */
  | {
      type: 'type';
      num: string;
      tag: string;
      title: string;
      accent: string;
      lede: string;
      faces: { family: 'gilroy' | 'manrope'; role: string; name: string; cls: string; use: string }[];
      weightsTitle: string;
      weights: string[];
      scaleHead: [string, string];
      scale: (
        | { glyph: string; px: number; token: string; spec: string }
        | { text: string; style: 'body' | 'caption' | 'overline'; token: string; spec: string }
      )[];
    };

export interface BrandChapter {
  num: string;
  /** Fundo do capítulo; a página faz a transição no scroll. Padrão: escuro. */
  theme?: 'dark' | 'light';
  kicker: string;
  title: string;
  /** Frase grande, em destaque, antes do corpo. */
  lead?: string;
  body: string[];
  blocks?: BrandBlock[];
  /** Capítulo guardado mas não renderizado (a numeração pula). */
  hidden?: boolean;
}

export interface BrandCaseContent {
  slug: string;
  kicker: string;
  title: string;
  subtitle: string;
  hero: {
    video: { src: string; webm?: string };
    poster: string;
    alt: string;
    caption: string;
    /** Imagem que toma o lugar do vídeo, em fade, quando ele termina; depois o vídeo recomeça. */
    after: { src: string; alt: string; label: string };
  };
  cover: { src: string; alt: string };
  meta: { label: string; value: string }[];
  chapters: BrandChapter[];
  statsLabel: string;
  stats: { value: string; label: string }[];
  outcomesLabel: string;
  outcomesTitle: string;
  outcomes: string[];
  stackLabel: string;
  stack: string[];
  next: { label: string; title: string; sub: string; href: string };
  cta: { heading: string; sub: string; label: string };
  ui: { back: string; chapter: string };
  seo: { title: string; description: string };
}

const B = '/cases/tutory-rebrand';

const palettePt = {
  type: 'palette' as const,
  colors: [
    { n: '01', name: 'Abyss', hex: '#020308', rgb: '2 · 3 · 8' },
    { n: '02', name: 'Deep', hex: '#0A1A3A', rgb: '10 · 26 · 58' },
    { n: '03', name: 'Electric', hex: '#0040C8', rgb: '0 · 64 · 200' },
    { n: '04', name: 'Beam', hex: '#3B7BF5', rgb: '59 · 123 · 245' },
    { n: '05', name: 'Ice', hex: '#D0DDEF', rgb: '208 · 221 · 239' },
    { n: '06', name: 'Gold', hex: '#C9A96E', rgb: '201 · 169 · 110' },
  ],
  note: 'O Gold aparece só onde a mentoria transforma: momentos de raridade.',
};

const specPt: [string, string][] = [
  ['Caixa', '146,79 × 167,06 u · proporção 1 : 1,138'],
  ['Hemisférios', 'esquerdo 0 → 67,94 · direito 78,86 → 146,79 · vão 10,92 (7,4 % da largura)'],
  ['Eixo', 'simetria vertical em x = 73,40 · espelhamento exato dos contornos'],
  ['Arestas', 'vertical externa 47,27 u · inclinações 26,6° · 27,6° · 31,3° (ombro, lateral, base)'],
  ['Mínimos', 'Electric #0040C8 ou branco sobre Abyss · altura mínima 24 px · respiro = 1/4 da altura'],
];

const tutoryBrand: { pt: BrandCaseContent; en: BrandCaseContent } = {
  pt: {
    slug: 'tutory-rebrand',
    kicker: 'Tutory · Identidade visual · 2026',
    title: 'O mesmo símbolo. Uma arquitetura nova.',
    subtitle:
      'A Tutory cresceu além do que a marca conseguia transmitir. Em catorze dias de projeto e sessenta de aplicação, o cérebro que todo mundo já reconhecia foi reconstruído como arquitetura: símbolo, paleta, voz e deck.',
    hero: {
      video: { src: `${B}/blueprint.mp4`, webm: `${B}/blueprint.webm` },
      poster: `${B}/blueprint-poster.webp`,
      alt: 'Vídeo em loop: o símbolo da Tutory sendo construído como desenho técnico em linhas brancas sobre preto, com cotas, ângulos e uma lupa percorrendo os detalhes, até as linhas se refinarem e revelarem o logotipo pronto',
      caption: 'Do blueprint à realidade: a construção do símbolo, cotada a partir do vetor final, em loop.',
      after: {
        src: `${B}/marca-palco.webp`,
        alt: 'Painel de palco com o logotipo Tutory e a assinatura Empowering Intelligence, uma pessoa caminhando à frente',
        label: 'Empowering Intelligence · painel de palco · Tutory Experience',
      },
    },
    cover: {
      src: `${B}/cover.webp`,
      alt: 'Símbolo da Tutory sobre preto: metade em linhas de construção com cotas, metade pronta em branco',
    },
    meta: [
      { label: 'Cliente', value: 'Tutory · EdTech, Brasília' },
      { label: 'Período', value: 'Mar — Ago 2026' },
      { label: 'Papel', value: 'Brand designer, solo' },
      { label: 'Arquétipos', value: 'O Governante · O Mágico' },
      { label: 'Entrega', value: 'Símbolo · paleta · voz · deck' },
    ],
    chapters: [
      {
        num: '01',
        kicker: 'O gap',
        title: 'Quem chegava, via uma ferramenta.',
        lead: 'O problema nunca foi o produto. A Tutory cresceu além do que a marca conseguia transmitir.',
        body: [
          'Por fora, a Tutory era um cérebro azul de contorno arredondado, um site em WordPress e um discurso de features: "a melhor plataforma do mercado para coaches". Por dentro, era um ecossistema com três produtos, milhares de mentores, um podcast e um evento próprio. Quem chegava, via uma ferramenta. Quem ficava, descobria o ecossistema.',
          'Antes de desenhar, mapeei o site e as peças antigas uma a uma e transcrevi calls de vendas reais. O contraste entre o que o time dizia nas calls e o que a marca dizia sozinha virou o quarto slide do deck, e a tese de todo o projeto.',
        ],
      },
      {
        num: '02',
        theme: 'light',
        kicker: 'Personalidade',
        title: 'O Governante, com um traço de O Mágico.',
        body: [
          'Comecei pela personalidade, não pelo desenho. A Tutory é quem define o padrão do mercado de mentoria: O Governante. E tem um traço de O Mágico, quem transforma o que existe em algo que não existia. Os dois arquétipos deram as regras de tudo que veio depois: formas calculadas, poucas cores, voz que afirma em vez de prometer.',
        ],
        blocks: [
          {
            type: 'archetypes',
            items: [
              { role: 'Primário', name: 'O Governante', desc: 'Define o padrão do mercado.', refs: 'McKinsey · Rolex · Masterclass' },
              { role: 'Secundário', name: 'O Mágico', desc: 'Transforma o que existe em algo que não existia.', refs: 'Apple · Tesla · Disney' },
            ],
          },
        ],
      },
      {
        num: '03',
        theme: 'light',
        kicker: 'Duas propostas',
        title: 'Manter o cérebro. Reconstruir o resto.',
        body: [
          'A proposta de 27 de março levou os arquétipos ao extremo: uma supernova no lugar do cérebro, paleta de oceano, tipografia de sistema. Era bonita, e apagava quinze anos de reconhecimento. Dias depois veio a resposta certa: manter o cérebro e reconstruí-lo como arquitetura. Aprovada em 31 de março.',
        ],
        blocks: [
          {
            type: 'full',
            image: {
              src: `${B}/marca-v2.webp`,
              alt: 'Proposta 2 da marca: cérebro geométrico em azul elétrico, numa placa de vidro segurada contra a luz',
              label: 'Proposta 2 · Arquitetura',
              meta: '31 mar · aprovada',
              caption: 'O cérebro redesenhado em azul elétrico. O que a Tutory já era, com a forma à altura.',
            },
          },
        ],
      },
      {
        num: '04',
        kicker: 'O símbolo',
        title: 'Cada ângulo calculado, cada linha com intenção.',
        body: [
          'Grandes estruturas não surgem só de inspiração; surgem de planejamento. O novo símbolo são duas metades hexagonais em traços retos, espelhadas num eixo exato, com os giros do cérebro recortados por dentro. Três inclinações, 26,6°, 27,6° e 31,3°, e um vão central de 10,92 unidades, 7,4 % da largura. Tudo documentado no desenho de construção, cotado a partir do vetor final.',
        ],
        blocks: [
          {
            type: 'slide',
            num: '09 — símbolo',
            tag: 'Nova arquitetura',
            title: 'O mesmo símbolo. Uma arquitetura completamente',
            accent: 'nova.',
            text: 'Cada ângulo calculado, cada linha com intenção: o cérebro que sempre representou a Tutory, redesenhado à altura do que ela se tornou.',
            video: { src: `${B}/simbolo.mp4`, webm: `${B}/simbolo.webm`, poster: `${B}/simbolo-poster.webp` },
            alt: 'Vídeo em loop: o símbolo da Tutory em cromo girando lentamente sobre fundo preto',
          },
          {
            type: 'full',
            image: {
              src: `${B}/marca-blueprint.webp`,
              alt: 'Desenho de construção do símbolo em estilo blueprint: grade, cotas, ângulos, vista explodida em quatro peças, três detalhes ampliados e tabela de especificação',
              label: 'Desenho de construção',
              meta: 'folha 01 · rev. 2',
              caption: 'Silhueta hexagonal, dois hemisférios, cortes internos e símbolo: a desconstrução em quatro peças, com três detalhes ampliados.',
            },
          },
          { type: 'spec', rows: specPt },
        ],
      },
      {
        num: '05',
        theme: 'light',
        kicker: 'Paleta',
        title: 'A cor da inteligência.',
        body: [
          'O azul elétrico não foi escolhido por acidente. É a cor da clareza intelectual, da faísca que acontece quando o conhecimento certo encontra o momento certo. Em volta dele, dois escuros para o fundo, um azul claro para o detalhe e um gelo para o papel. E o dourado reservado aos instantes únicos em que a mentoria transforma.',
        ],
        blocks: [palettePt],
      },
      {
        num: '06',
        kicker: 'A voz',
        title: 'Como a Tutory fala.',
        body: [
          'Gilroy nos títulos, geométrica e segura; Manrope no corpo e na interface, variável e legível em qualquer tamanho. E a voz escrita mudou junto com a forma: do superlativo que promete para a afirmação de quem já é referência.',
        ],
        blocks: [
          {
            type: 'type',
            num: '11 — sistema tipográfico',
            tag: 'Tipografia',
            title: 'A voz',
            accent: 'escrita.',
            lede: 'Gilroy nos títulos, Manrope no corpo: duas famílias, um sistema.',
            faces: [
              { family: 'gilroy', role: 'Display · Títulos', name: 'Gilroy', cls: 'Geometric Sans · 9 pesos', use: 'Headlines e momentos de impacto.' },
              { family: 'manrope', role: 'Corpo · Interface', name: 'Manrope', cls: 'Humanist Sans · Variável', use: 'Parágrafos, navegação e UI.' },
            ],
            weightsTitle: 'Pesos · Gilroy',
            weights: ['300 · Light', '400 · Regular', '600 · SemiBold', '800 · ExtraBold'],
            scaleHead: ['Escala de tipos', 'Tamanho · Peso · Entrelinha · Tracking'],
            scale: [
              { glyph: 'display300', px: 64, token: 'Display · Gilroy', spec: '64px · 300 · 1.05' },
              { glyph: 'h1_pt', px: 40, token: 'H1 · Gilroy', spec: '40px · 300 · 1.1' },
              { glyph: 'h2_pt', px: 28, token: 'H2 · Gilroy', spec: '28px · 600 · 1.2' },
              { text: 'Corpo de texto padrão para parágrafos.', style: 'body', token: 'Body · Manrope', spec: '16px · 400 · 1.6' },
              { text: 'Legenda e apoio', style: 'caption', token: 'Caption · Manrope', spec: '13px · 500 · 1.4' },
              { text: 'Overline · Rótulo', style: 'overline', token: 'Overline · Manrope', spec: '11px · 600 · +0.25em' },
            ],
          },
          {
            type: 'voice',
            beforeLabel: 'Antes',
            before: '"A melhor plataforma do mercado para coaches!"',
            afterLabel: 'Agora',
            after: '"Os melhores mentores do Brasil já escolheram."',
          },
        ],
      },
      {
        num: '07',
        kicker: 'A marca no mundo',
        title: 'Em tamanho real.',
        body: [
          'Uma identidade só existe quando sai do deck. A Tutory Experience reúne os maiores mentores do país num dia, e a assinatura Empowering Intelligence foi desenhada para esse tamanho: painel de palco, estande, uniforme, crachá, papelaria e social. Preto, azul elétrico e um só ponto de luz.',
          'E precisa caber no menor dos tamanhos. O mesmo cérebro que preenche um painel vira ícone na tela inicial, mostrador no pulso e logotipo sobre o azul elétrico, sem perder uma linha.',
        ],
        blocks: [
          {
            type: 'trio',
            items: [
              { src: `${B}/marca-f1.webp`, alt: 'Estande com símbolo em neon azul e carro de corrida com a marca Tutory', label: 'Estande' },
              { src: `${B}/marca-piloto.webp`, alt: 'Piloto de costas com o logotipo Tutory no macacão', label: 'Uniforme' },
              { src: `${B}/marca-cracha.webp`, alt: 'Crachá preto com o símbolo em cromo e a assinatura Empowering Intelligence', label: 'Crachá' },
            ],
          },
          {
            type: 'pair',
            items: [
              { src: `${B}/marca-sala.webp`, alt: 'Sala de reuniões com o símbolo da Tutory em relevo na parede', label: 'Sala' },
              { src: `${B}/marca-escritorio.webp`, alt: 'Recepção do escritório com o logotipo Tutory iluminado na parede', label: 'Recepção' },
            ],
          },
          {
            type: 'pair',
            items: [
              { src: `${B}/marca-social.webp`, alt: 'Post social com mentora sorrindo, o símbolo e a frase Que bom que você está aqui', label: 'Social · boas-vindas' },
              {
                src: `${B}/marca-papelaria.webp`,
                alt: 'Papelaria da marca: papel timbrado com selo circular, cartões, caderno, envelope e pendrive',
                label: 'Papelaria',
                meta: 'selo · cartões · caderno',
              },
            ],
          },
          {
            type: 'bento',
            items: [
              { src: `${B}/kit-logotipo.webp`, alt: 'Logotipo Tutory em branco sobre gradiente azul elétrico', label: 'Logotipo' },
              { src: `${B}/kit-painel.webp`, alt: 'Painel de evento com o logotipo Tutory sobre uma faixa de luz azul', label: 'Painel · Tutory Experience' },
              { src: `${B}/kit-icones.webp`, alt: 'Ícone do app Tutory numa barra de aplicativos e um celular na mão com o ícone na tela inicial', label: 'Ícone de app' },
              { src: `${B}/kit-watch.webp`, alt: 'Relógio de pulso com o símbolo da Tutory no mostrador', label: 'Mostrador' },
            ],
            note: 'Kit digital · ícone · mostrador · painel · logotipo',
          },
        ],
      },
      {
        num: '08',
        hidden: true, // escondido por enquanto (20/10/2026)
        kicker: 'Gamificação',
        title: 'Da faísca ao legado.',
        body: [
          'A Hub precisava de um programa de reconhecimento para os educadores que vendem na plataforma. A tese virou frase: "O mercado te mede pelo quanto você fatura. Nós celebramos quem você transforma." São seis níveis por marco de faturamento, de Spark (R$ 100 mil) a Legacy (R$ 25 milhões), e cada um vem com um troféu físico: uma rede neural dourada que ganha nós e conexões a cada nível, sobre a mesma base preta. A Tutory nasceu de um cérebro, e o prêmio conta essa história.',
          'Os troféus são 100 % procedurais em Three.js. Cada rede nasce de uma semente fixa, então a mesma peça sai sempre igual, requisito de fabricação: esferas e hastes de latão banhado, medalha em aço, ônix, safira, ouro ou esmeralda, e a esfera de cristal do Spark com dispersão real. Do mesmo código saem a ficha técnica de cada peça, os STL para impressão 3D com remesh no Blender, as pranchas A4 em escala real de placas e medalhas e um deck de 30 slides com as peças girando ao vivo. Um sprint de quatro dias em agosto, 50 commits.',
        ],
        blocks: [
          {
            type: 'full',
            image: {
              src: `${B}/game-linha.webp`,
              alt: 'Os seis troféus em fila sobre fundo escuro: Spark, Vision, Neural, Fusion, Genius e Legacy, com marco de faturamento e número de nós e hastes',
              label: 'Os seis níveis',
              meta: 'Spark → Legacy · escala real',
              caption: 'De 10 nós e 16 hastes (Vision) a 100 nós, 302 hastes e 18 m de latão (Legacy). A base é a mesma em todos: só a rede cresce.',
            },
          },
          {
            type: 'pair',
            items: [
              { src: `${B}/game-spark.webp`, alt: 'Troféu Spark: esfera de cristal com gravação interna numa caixa de nogueira com veludo azul', label: 'Spark', meta: 'R$ 100 mil · cristal' },
              { src: `${B}/game-legacy.webp`, alt: 'Troféu Legacy: rede geodésica dourada com dendritos internos e medalha de esmeralda', label: 'Legacy', meta: 'R$ 25 milhões · esmeralda' },
            ],
          },
          {
            type: 'trio',
            items: [
              { src: `${B}/game-ficha.webp`, alt: 'Ficha técnica do troféu Legacy: seis vistas cotadas, materiais, guia de produção e peso estimado', label: 'Ficha técnica', meta: 'pdf · csv' },
              { src: `${B}/game-impressao.webp`, alt: 'Render em argila dos cinco troféus de rede em fila, preparados para impressão 3D', label: 'Impressão 3D', meta: 'stl · remesh' },
              { src: `${B}/game-pranchas.webp`, alt: 'Duas pranchas A4 em escala 1:1 com as cinco placas e as cinco medalhas, com cotas e barra de escala', label: 'Placas e medalhas', meta: 'A4 · 1:1' },
            ],
          },
          {
            type: 'full',
            image: {
              src: `${B}/game-deck.webp`,
              alt: 'Slide Fusion do deck Gamificação Hub, com o troféu 3D girando ao vivo ao lado do texto',
              label: 'Deck Gamificação Hub',
              meta: '30 slides · 3D ao vivo',
            },
          },
        ],
      },
      {
        num: '09',
        theme: 'light',
        kicker: 'Evolução',
        title: 'Tutory permanece. A expressão evolui.',
        body: [
          'Rebranding não é recomeço. Os resultados, os mentores, a experiência e o propósito ficam onde estavam. O que muda é como tudo isso se apresenta: o símbolo, a paleta, o posicionamento, a expressão e a narrativa. A marca v2 vive hoje no site, no Tutory OS, no Aeroporto de Leads, e nos painéis internos.',
        ],
        blocks: [
          {
            type: 'evolution',
            columns: [
              { label: 'Permanece', items: ['Os resultados', 'Os mentores', 'A experiência', 'O propósito'] },
              { label: 'Evolui', items: ['O símbolo', 'A paleta', 'O posicionamento', 'A expressão', 'A narrativa'] },
            ],
          },
          { type: 'quote', text: 'A mesma inteligência que sempre esteve aqui, agora com a arquitetura visual de quem chegou a outro nível.', by: 'Deck da marca, slide 07' },
        ],
      },
    ],
    statsLabel: 'Em números',
    stats: [
      { value: '14 dias', label: 'de projeto de marca até a aprovação' },
      { value: '15 anos', label: 'de reconhecimento preservados no símbolo' },
      { value: '60 dias', label: 'de aplicação, do site ao Tutory OS' },
    ],
    outcomesLabel: 'Resultados',
    outcomesTitle: 'O que a marca passou a fazer',
    outcomes: [
      'Identidade aprovada em catorze dias e em uso em todo o ecossistema: site, Tutory OS, Aeroporto de Leads e painéis internos',
      'Deck interativo que funciona como manual: paleta, tipografia, voz e kit para download',
      'Geradores de vidro e medalha em Three.js para o time produzir peças sem o designer',
      'Um símbolo documentado como desenho técnico, reproduzível em qualquer escala',
    ],
    stackLabel: 'Ferramentas',
    stack: ['Illustrator', 'Blender', 'Three.js', 'HTML · CSS · JS', 'Gilroy · Manrope', 'Playwright'],
    next: {
      label: 'Continua',
      title: 'Tutory: site',
      sub: 'A marca nova em 14 páginas, do WordPress ao ar em 63 dias.',
      href: '/pt/work/tutory-site',
    },
    cta: {
      heading: 'Sua empresa cresceu mais que a sua marca?',
      sub: 'Eu fecho essa distância: posicionamento, identidade e sistema, do primeiro slide ao kit.',
      label: 'Falar comigo',
    },
    ui: { back: 'Voltar aos projetos', chapter: 'Capítulo' },
    seo: {
      title: 'Tutory: identidade visual — Case Study · Wellington Mota',
      description:
        'Rebranding da Tutory: arquétipos, símbolo reconstruído como arquitetura, paleta, voz, deck interativo. Aprovada em catorze dias.',
    },
  },

  en: {
    slug: 'tutory-rebrand',
    kicker: 'Tutory · Visual identity · 2026',
    title: 'The same symbol. A new architecture.',
    subtitle:
      'Tutory had outgrown what its brand could say. In fourteen days of project and sixty of application, the brain everyone already recognized was rebuilt as architecture: symbol, palette, voice and deck.',
    hero: {
      video: { src: `${B}/blueprint.mp4`, webm: `${B}/blueprint.webm` },
      poster: `${B}/blueprint-poster.webp`,
      alt: 'Looping video: the Tutory symbol being constructed as a technical drawing in white lines on black, with dimensions, angles and a magnifier moving over the details, until the lines refine and reveal the finished logo',
      caption: 'From blueprint to reality: the construction of the symbol, dimensioned from the final vector, on a loop.',
      after: {
        src: `${B}/marca-palco.webp`,
        alt: 'Stage panel with the Tutory wordmark and the Empowering Intelligence signature, a person walking in front',
        label: 'Empowering Intelligence · stage panel · Tutory Experience',
      },
    },
    cover: {
      src: `${B}/cover.webp`,
      alt: 'Tutory symbol on black: half as construction lines with dimensions, half finished in white',
    },
    meta: [
      { label: 'Client', value: 'Tutory · EdTech, Brasília' },
      { label: 'Period', value: 'Mar — Aug 2026' },
      { label: 'Role', value: 'Brand designer, solo' },
      { label: 'Archetypes', value: 'The Ruler · The Magician' },
      { label: 'Delivered', value: 'Symbol · palette · voice · deck' },
    ],
    chapters: [
      {
        num: '01',
        kicker: 'The gap',
        title: 'Whoever arrived saw a tool.',
        lead: 'The problem was never the product. Tutory had grown beyond what the brand could convey.',
        body: [
          'From the outside, Tutory was a rounded blue brain, a WordPress website and a feature pitch: "the best platform on the market for coaches". Inside, it was an ecosystem with three products, thousands of mentors, a podcast and its own event. Whoever arrived saw a tool. Whoever stayed discovered the ecosystem.',
          'Before designing, I mapped the old site and collateral piece by piece and transcribed real sales calls. The contrast between what the team said on calls and what the brand said on its own became the fourth slide of the deck, and the thesis of the whole project.',
        ],
      },
      {
        num: '02',
        theme: 'light',
        kicker: 'Personality',
        title: 'The Ruler, with a streak of The Magician.',
        body: [
          'I started with personality, not drawing. Tutory is the one that sets the standard of the mentoring market: The Ruler. And it has a streak of The Magician, the one who turns what exists into something that did not. The two archetypes set the rules for everything that followed: calculated forms, few colors, a voice that states instead of promising.',
        ],
        blocks: [
          {
            type: 'archetypes',
            items: [
              { role: 'Primary', name: 'The Ruler', desc: 'Sets the market standard.', refs: 'McKinsey · Rolex · Masterclass' },
              { role: 'Secondary', name: 'The Magician', desc: 'Turns what exists into something that did not.', refs: 'Apple · Tesla · Disney' },
            ],
          },
        ],
      },
      {
        num: '03',
        theme: 'light',
        kicker: 'Two proposals',
        title: 'Keep the brain. Rebuild the rest.',
        body: [
          'The March 27 proposal took the archetypes to the extreme: a supernova instead of the brain, an ocean palette, system typography. It was beautiful, and it erased fifteen years of recognition. Days later came the right answer: keep the brain and rebuild it as architecture. Approved on March 31.',
        ],
        blocks: [
          {
            type: 'full',
            image: {
              src: `${B}/marca-v2.webp`,
              alt: 'Brand proposal 2: geometric brain in electric blue on a glass tile held against the light',
              label: 'Proposal 2 · Architecture',
              meta: 'Mar 31 · approved',
              caption: 'The brain redrawn in electric blue. What Tutory already was, with a form to match.',
            },
          },
        ],
      },
      {
        num: '04',
        kicker: 'The symbol',
        title: 'Every angle calculated, every line with intent.',
        body: [
          'Great structures do not come from inspiration alone; they come from planning. The new symbol is two hexagonal halves in straight strokes, mirrored on an exact axis, with the folds of the brain cut out inside. Three slopes, 26.6°, 27.6° and 31.3°, and a central gap of 10.92 units, 7.4% of the width. All documented in the construction drawing, dimensioned from the final vector.',
        ],
        blocks: [
          {
            type: 'slide',
            num: '09 — symbol',
            tag: 'New architecture',
            title: 'The same symbol. A completely',
            accent: 'new architecture.',
            text: 'Every angle calculated, every line with intent: the brain that always represented Tutory, redrawn to match what it has become.',
            video: { src: `${B}/simbolo.mp4`, webm: `${B}/simbolo.webm`, poster: `${B}/simbolo-poster.webp` },
            alt: 'Looping video: the Tutory symbol in chrome slowly rotating on a black background',
          },
          {
            type: 'full',
            image: {
              src: `${B}/marca-blueprint.webp`,
              alt: 'Construction drawing of the symbol in blueprint style: grid, dimensions, angles, exploded view in four pieces, three magnified details and a specification table',
              label: 'Construction drawing',
              meta: 'sheet 01 · rev. 2',
              caption: 'Hexagonal silhouette, two hemispheres, inner cuts and symbol: the deconstruction in four pieces, with three magnified details.',
            },
          },
          {
            type: 'spec',
            rows: [
              ['Box', '146.79 × 167.06 u · ratio 1 : 1.138'],
              ['Hemispheres', 'left 0 → 67.94 · right 78.86 → 146.79 · gap 10.92 (7.4% of the width)'],
              ['Axis', 'vertical symmetry at x = 73.40 · exact mirroring of the contours'],
              ['Edges', 'outer vertical 47.27 u · slopes 26.6° · 27.6° · 31.3° (shoulder, side, base)'],
              ['Minimums', 'Electric #0040C8 or white on Abyss · minimum height 24 px · clear space = 1/4 of the height'],
            ],
          },
        ],
      },
      {
        num: '05',
        theme: 'light',
        kicker: 'Palette',
        title: 'The color of intelligence.',
        body: [
          'Electric blue was not chosen by accident. It is the color of intellectual clarity, of the spark that happens when the right knowledge meets the right moment. Around it, two darks for the background, a light blue for detail and an ice for paper. And gold, reserved for the unique instants when mentoring transforms.',
        ],
        blocks: [{ ...palettePt, note: 'Gold appears only where mentoring transforms: moments of rarity.' }],
      },
      {
        num: '06',
        kicker: 'The voice',
        title: 'How Tutory speaks.',
        body: [
          'Gilroy for headlines, geometric and assured; Manrope for body and interface, variable and legible at any size. And the written voice changed with the form: from the superlative that promises to the statement of an established reference.',
        ],
        blocks: [
          {
            type: 'type',
            num: '11 — type system',
            tag: 'Typography',
            title: 'The written',
            accent: 'voice.',
            lede: 'Gilroy for headlines, Manrope for body: two families, one system.',
            faces: [
              { family: 'gilroy', role: 'Display · Headlines', name: 'Gilroy', cls: 'Geometric Sans · 9 weights', use: 'Headlines and moments of impact.' },
              { family: 'manrope', role: 'Body · Interface', name: 'Manrope', cls: 'Humanist Sans · Variable', use: 'Paragraphs, navigation and UI.' },
            ],
            weightsTitle: 'Weights · Gilroy',
            weights: ['300 · Light', '400 · Regular', '600 · SemiBold', '800 · ExtraBold'],
            scaleHead: ['Type scale', 'Size · Weight · Line height · Tracking'],
            scale: [
              { glyph: 'display300', px: 64, token: 'Display · Gilroy', spec: '64px · 300 · 1.05' },
              { glyph: 'h1_en', px: 40, token: 'H1 · Gilroy', spec: '40px · 300 · 1.1' },
              { glyph: 'h2_en', px: 28, token: 'H2 · Gilroy', spec: '28px · 600 · 1.2' },
              { text: 'Default body text for paragraphs.', style: 'body', token: 'Body · Manrope', spec: '16px · 400 · 1.6' },
              { text: 'Caption and support', style: 'caption', token: 'Caption · Manrope', spec: '13px · 500 · 1.4' },
              { text: 'Overline · Label', style: 'overline', token: 'Overline · Manrope', spec: '11px · 600 · +0.25em' },
            ],
          },
          {
            type: 'voice',
            beforeLabel: 'Before',
            before: '"The best platform on the market for coaches!"',
            afterLabel: 'Now',
            after: '"Brazil’s best mentors have already chosen."',
          },
        ],
      },
      {
        num: '07',
        kicker: 'The brand in the world',
        title: 'Life-size.',
        body: [
          'An identity only exists once it leaves the deck. Tutory Experience gathers the country’s top mentors for a day, and the Empowering Intelligence signature was designed for that scale: stage panel, stand, uniform, badge, stationery and social. Black, electric blue and a single point of light.',
          'And it has to fit the smallest sizes. The same brain that fills a panel becomes a home-screen icon, a watch face and the wordmark over electric blue, without losing a single line.',
        ],
        blocks: [
          {
            type: 'trio',
            items: [
              { src: `${B}/marca-f1.webp`, alt: 'Stand with the symbol in blue neon and a race car carrying the Tutory brand', label: 'Stand' },
              { src: `${B}/marca-piloto.webp`, alt: 'Driver seen from behind with the Tutory wordmark on the suit', label: 'Uniform' },
              { src: `${B}/marca-cracha.webp`, alt: 'Black badge with the chrome symbol and the Empowering Intelligence signature', label: 'Badge' },
            ],
          },
          {
            type: 'pair',
            items: [
              { src: `${B}/marca-sala.webp`, alt: 'Meeting room with the Tutory symbol embossed on the wall', label: 'Meeting room' },
              { src: `${B}/marca-escritorio.webp`, alt: 'Office reception with the illuminated Tutory wordmark on the wall', label: 'Reception' },
            ],
          },
          {
            type: 'pair',
            items: [
              { src: `${B}/marca-social.webp`, alt: 'Social post with a smiling mentor, the symbol and a welcome message', label: 'Social · welcome' },
              {
                src: `${B}/marca-papelaria.webp`,
                alt: 'Brand stationery: letterhead with a circular seal, cards, notebook, envelope and flash drive',
                label: 'Stationery',
                meta: 'seal · cards · notebook',
              },
            ],
          },
          {
            type: 'bento',
            items: [
              { src: `${B}/kit-logotipo.webp`, alt: 'Tutory wordmark in white over an electric blue gradient', label: 'Wordmark' },
              { src: `${B}/kit-painel.webp`, alt: 'Event panel with the Tutory wordmark over a band of blue light', label: 'Panel · Tutory Experience' },
              { src: `${B}/kit-icones.webp`, alt: 'Tutory app icon in an app dock, and a phone held in hand showing the icon on the home screen', label: 'App icon' },
              { src: `${B}/kit-watch.webp`, alt: 'Wristwatch with the Tutory symbol on the face', label: 'Watch face' },
            ],
            note: 'Digital kit · icon · watch face · panel · wordmark',
          },
        ],
      },
      {
        num: '08',
        hidden: true, // escondido por enquanto (20/10/2026)
        kicker: 'Gamification',
        title: 'From a spark to a legacy.',
        body: [
          'The Hub needed a recognition program for the educators who sell on the platform. The thesis became a line: "The market measures you by how much you earn. We celebrate who you transform." Six levels by revenue milestone, from Spark (R$ 100 thousand) to Legacy (R$ 25 million), each with a physical trophy: a golden neural network that gains nodes and connections at every level, on the same black base. Tutory was born from a brain, and the award tells that story.',
          'The trophies are 100% procedural in Three.js. Each network grows from a fixed seed, so the same piece always comes out identical, a manufacturing requirement: plated brass spheres and rods, a medal in steel, onyx, sapphire, gold or emerald, and the Spark crystal sphere with real dispersion. The same code produces the technical sheet for every piece, the STLs for 3D printing with a Blender remesh, the true-scale A4 sheets of plates and medals and a 30-slide deck with the pieces spinning live. A four-day sprint in August, 50 commits.',
        ],
        blocks: [
          {
            type: 'full',
            image: {
              src: `${B}/game-linha.webp`,
              alt: 'The six trophies in a row on a dark background: Spark, Vision, Neural, Fusion, Genius and Legacy, with revenue milestone and number of nodes and rods',
              label: 'The six levels',
              meta: 'Spark → Legacy · true scale',
              caption: 'From 10 nodes and 16 rods (Vision) to 100 nodes, 302 rods and 18 m of brass (Legacy). The base is the same for all: only the network grows.',
            },
          },
          {
            type: 'pair',
            items: [
              { src: `${B}/game-spark.webp`, alt: 'Spark trophy: crystal sphere with internal engraving in a walnut box with blue velvet', label: 'Spark', meta: 'R$ 100 thousand · crystal' },
              { src: `${B}/game-legacy.webp`, alt: 'Legacy trophy: golden geodesic network with inner dendrites and an emerald medal', label: 'Legacy', meta: 'R$ 25 million · emerald' },
            ],
          },
          {
            type: 'trio',
            items: [
              { src: `${B}/game-ficha.webp`, alt: 'Technical sheet of the Legacy trophy: six dimensioned views, materials, production guide and estimated weight', label: 'Technical sheet', meta: 'pdf · csv' },
              { src: `${B}/game-impressao.webp`, alt: 'Clay render of the five network trophies in a row, prepared for 3D printing', label: '3D printing', meta: 'stl · remesh' },
              { src: `${B}/game-pranchas.webp`, alt: 'Two A4 sheets at 1:1 scale with the five plates and the five medals, with dimensions and a scale bar', label: 'Plates and medals', meta: 'A4 · 1:1' },
            ],
          },
          {
            type: 'full',
            image: {
              src: `${B}/game-deck.webp`,
              alt: 'Fusion slide of the Hub Gamification deck, with the 3D trophy spinning live next to the text',
              label: 'Hub Gamification deck',
              meta: '30 slides · live 3D',
            },
          },
        ],
      },
      {
        num: '09',
        theme: 'light',
        kicker: 'Evolution',
        title: 'Tutory stays. The expression evolves.',
        body: [
          'Rebranding is not a restart. The results, the mentors, the experience and the purpose stay where they were. What changes is how all of it shows up: the symbol, the palette, the positioning, the expression and the narrative. Brand v2 now lives on the website, in Tutory OS, in the Lead Airport, and on the internal dashboards.',
        ],
        blocks: [
          {
            type: 'evolution',
            columns: [
              { label: 'Stays', items: ['The results', 'The mentors', 'The experience', 'The purpose'] },
              { label: 'Evolves', items: ['The symbol', 'The palette', 'The positioning', 'The expression', 'The narrative'] },
            ],
          },
          { type: 'quote', text: 'The same intelligence that was always here, now with the visual architecture of someone who reached another level.', by: 'Brand deck, slide 07' },
        ],
      },
    ],
    statsLabel: 'In numbers',
    stats: [
      { value: '14 days', label: 'of brand project until approval' },
      { value: '15 years', label: 'of recognition preserved in the symbol' },
      { value: '60 days', label: 'of application, from website to Tutory OS' },
    ],
    outcomesLabel: 'Results',
    outcomesTitle: 'What the brand started doing',
    outcomes: [
      'Identity approved in fourteen days and in use across the ecosystem: website, Tutory OS, Lead Airport and internal dashboards',
      'An interactive deck that works as the manual: palette, typography, voice and a downloadable kit',
      'Glass and medal generators in Three.js so the team produces pieces without the designer',
      'A symbol documented as a technical drawing, reproducible at any scale',
    ],
    stackLabel: 'Tools',
    stack: ['Illustrator', 'Blender', 'Three.js', 'HTML · CSS · JS', 'Gilroy · Manrope', 'Playwright'],
    next: {
      label: 'Continues',
      title: 'Tutory: website',
      sub: 'The new brand across 14 pages, from WordPress to live in 63 days.',
      href: '/work/tutory-site',
    },
    cta: {
      heading: 'Has your company outgrown your brand?',
      sub: 'I close that gap: positioning, identity and system, from the first slide to the kit.',
      label: 'Get in touch',
    },
    ui: { back: 'Back to projects', chapter: 'Chapter' },
    seo: {
      title: 'Tutory: visual identity — Case Study · Wellington Mota',
      description:
        'Tutory rebranding: archetypes, a symbol rebuilt as architecture, palette, voice, an interactive deck. Approved in fourteen days.',
    },
  },
};

export default tutoryBrand;
