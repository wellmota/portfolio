/* -------------------------------------------------------------------------- *
 *  CONTEÚDO DO PORTFÓLIO
 *  Edite este arquivo para colocar suas informações. Tudo que aparece no site
 *  vem daqui — não precisa mexer nos componentes.
 * -------------------------------------------------------------------------- */

export const profile = {
  name: 'Wellington Mota',
  firstName: 'Wellington',
  role: 'Product Engineer — Design + Front-end',
  roleAi: 'AI Specialist',
  tagline:
    'Product Engineer que faz as duas pontas: pesquiso e desenho no Figma e entrego em React/TypeScript em produção, sem handoff, da descoberta à métrica. E uso IA além do autocomplete: agentes orquestrados, prompts versionados como código e evals garantindo qualidade antes do deploy.',
  location: 'Brasília, BR',
  timezone: 'America/Sao_Paulo',
  email: 'wellingtonmota42@gmail.com',
  phone: '+55 61 98104-3296',
  available: true,
  availableText: 'Aberto a oportunidades remotas',
};

export const nav = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'O que faço', href: '#servicos' },
  { label: 'Experiência', href: '#projetos' },
  { label: 'Escrita', href: '#escrita' },
  { label: 'Contato', href: '#contato' },
];

export const socials = [
  { label: 'GitHub', href: 'https://github.com/wellmota' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wellingtonmota13/' },
  { label: 'Behance', href: 'https://www.behance.net/wellingtonmota' },
];

export const heroStats = {
  headline: '15+',
  label: 'anos criando produtos digitais',
  sub: 'React · Next.js · TypeScript · Design Systems · IA em produção',
};

export const stats = [
  { value: '15+', label: 'anos em design de produto' },
  { value: '40%', label: 'menos tempo de handoff' },
  { value: '28%', label: 'aumento na adoção de features' },
  { value: '2×', label: 'features entregues mais rápido' },
];

export const about = {
  eyebrow: 'Sobre mim',
  // Troque por sua foto: coloque em /public e use '/sua-foto.jpg'
  image: '/well-portrait-6.png',
  heading:
    'Fecho a distância entre design e código: pesquiso, desenho e coloco no ar.',
  body: [
    'Sou Product Engineer no cruzamento entre design systems, arquitetura de componentes e pensamento de produto centrado no usuário. Vou da pesquisa de UX e protótipos no Figma até o código React/TypeScript em produção, integrado a APIs REST e GraphQL.',
    '15+ anos em design de produto e 3+ anos entregando front-end em stacks modernas (React, Next.js, Node.js). Graduação em Análise e Desenvolvimento de Sistemas e MBA em Fullstack (em andamento). Brilho em times enxutos onde uma pessoa consegue ser dona da experiência inteira — cortando tempo de entrega e ruído no handoff.',
  ],
  signatureRole: 'Design + Código',
};

export const marquee = [
  'React',
  'Next.js',
  'TypeScript',
  'Design Systems',
  'Figma',
  'UX Research',
  'Tailwind CSS',
  'Node.js',
  'Agent Orchestration',
  'Prompt Engineering',
  'Evals',
  'MCP',
  'RAG',
  'Token Optimization',
];

/* Cards do carrossel "Especialidades". icon = chave mapeada no componente. */
export const services = [
  {
    index: '01',
    icon: 'ux',
    title: 'Product Design & UX',
    metaLeft: 'Figma · Research',
    badge: 'STRATEGIC',
    points: [
      'User research & testes de usabilidade',
      'Wireframes, fluxos e IA',
      'Protótipos de alta fidelidade',
    ],
  },
  {
    index: '02',
    icon: 'system',
    title: 'Design Systems',
    metaLeft: 'Usado por 3 times',
    badge: 'SCALABLE',
    points: [
      'Tokens & fundações',
      'Bibliotecas de componentes',
      'Documentação viva',
    ],
  },
  {
    index: '03',
    icon: 'code',
    title: 'Front-end Engineering',
    metaLeft: 'Produção',
    badge: 'RELIABLE',
    points: [
      'React · Next.js · TypeScript',
      'Integração REST / GraphQL',
      'Performance & acessibilidade',
    ],
  },
  {
    index: '04',
    icon: 'ai',
    title: 'AI Engineering & Orchestration',
    metaLeft: 'Agents · LLM',
    badge: 'ADVANCED',
    points: [
      'Orquestração de agentes (MCP)',
      'Evals & qualidade no CI',
      'Otimização de token & custo',
      'RAG na interface do produto',
    ],
  },
  {
    index: '05',
    icon: 'spark',
    title: 'Rapid Prototyping (0 → 1)',
    metaLeft: 'Startups',
    badge: 'FAST',
    points: [
      'MVP em dias, não meses',
      'Do conceito ao clicável',
      'Validação com usuários reais',
    ],
  },
];

export const process = [
  {
    step: '01',
    title: 'Descoberta',
    progress: 25,
    description:
      'Entendo negócio, público e objetivos. Pesquisa com usuários, benchmark e definição da direção de produto.',
  },
  {
    step: '02',
    title: 'Design',
    progress: 65,
    description:
      'Arquitetura de informação, design system e telas de alta fidelidade. Iteração rápida com testes de usabilidade.',
  },
  {
    step: '03',
    title: 'Desenvolvimento',
    progress: 90,
    description:
      'Transformo o design em código React/TypeScript responsivo e performático, integrado às APIs — sem handoff.',
  },
  {
    step: '04',
    title: 'Entrega & Métricas',
    progress: 100,
    description:
      'Testes, ajustes finais e acompanhamento com analytics e A/B testing para validar impacto no produto.',
  },
];

/* Projetos em destaque — marcas famosas / grandes empresas (NÃO empregadores;
   esses ficam no CV). Ajuste descrições/setores conforme quiser. */
/* image = placeholder Unsplash (via Lorem Picsum). Troque pelo screenshot real
   do projeto colocando o arquivo em /public e apontando o caminho aqui. */
export const projects = [
  {
    title: 'Kia Telluride LX',
    meta: 'Automotivo · Landing Page',
    categories: ['Web', 'UI Design'],
    description:
      'Landing page do Kia Telluride LX — layout, UI e experiência de configuração do veículo.',
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/d71f1e232305417.6899fba2b8c0a.jpg',
    accent: '#7dd3fc',
  },
  {
    title: 'Autódromo Velocitta',
    meta: 'Esporte · Web',
    categories: ['Branding', 'Web'],
    description:
      'Identidade e presença digital para o autódromo — direção visual e experiência do site.',
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/a21511192194261.65d7923added2.jpg',
    accent: '#cff24a',
  },
  {
    title: 'Wevr Virtual Studio',
    meta: 'Produto · US',
    categories: ['Product', 'UX'],
    description:
      'Interface e experiência para a plataforma de produção em VR da Wevr (WVS).',
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/564b87162267413.63d2af8b23687.jpg',
    accent: '#c4b5fd',
  },
  {
    title: 'The Blu · Wevr',
    meta: 'VR · US',
    categories: ['Design', 'Campanha'],
    description:
      'Peças de campanha para o aniversário de 10 anos da série de VR The Blu, da Wevr.',
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/94765a162329377.63d3bfe0bb3fe.jpg',
    accent: '#38bdf8',
  },
  {
    title: 'ArtCaffé',
    meta: 'F&B · Kenya',
    categories: ['Branding', 'Digital'],
    description:
      'Direção visual e peças digitais para a rede de cafés ArtCaffé, no Quênia.',
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/e9ff1b174188663.649d7e96c07e6.png',
    accent: '#6ee7b7',
  },
  {
    title: 'Odens',
    meta: 'Branding · UK',
    categories: ['Branding', 'Packaging'],
    description:
      'Identidade de marca e design de embalagens elogiados pelos fundadores.',
    image:
      'https://mir-s3-cdn-cf.behance.net/projects/max_808/d07788191695833.Y3JvcCwzMTc1LDI0ODMsNDAwLDExNw.jpg',
    accent: '#fdba74',
  },
];

/* Marcas / projetos em que trabalhei (não empregadores — foco em projeto).
   Ortografia normalizada; ajuste se algum estiver diferente do oficial. */
export const clients = [
  'Mindtools',
  'Mitsubishi',
  'ServiceNow',
  'Kineo',
  'Tutory',
  'HyperGestor',
  'Tako',
  'Butterfly IO',
  'Action247',
  'CareCloud',
  'Monumenta',
  'BRB',
  'CAIXA',
  'Banco do Brasil',
  'KIA Motors',
  'Solomon',
  'Autódromo Velocitta',
  'Animalle',
  'Grupo SOMA',
  'Wevr',
  'Resilience Dynamic',
  'Soluti',
  'Sankhya',
  'Cogmo Tecnologia',
  'Your Digital Media',
  'Chris Corsini',
  'Nomoo',
];

/* Depoimentos REAIS — 10 clientes, 5 empresas, 3 países. */
export const testimonials = [
  {
    quote:
      'Muito legal! Inclusive, o texto ficou ótimo. Você tem um toque mágico… vai em frente!',
    author: 'J. C. Nery',
    company: 'Diretor de Inovação e Tecnologia · Mitsubishi',
    logo: '/logos/mitsubishi.svg',
  },
  {
    quote:
      '…here we are now with you doing visionary prototyping and all kind of other really great stuff. I’ve really enjoyed working with you and the whole team. Keep up the good work!',
    author: 'Michaela Heigl, PhD',
    company: 'Director · Mindtools',
    logo: '/logos/mindtools.svg',
  },
  {
    quote:
      'Cara, essa nova versão tá maravilhosa. Parabéns — mandou muito bem!',
    author: 'Fernando Cardoso',
    company: 'CEO HyperGestor · Head de Inovação, Mitsubishi Motors',
    logo: '/logos/hypergestor.svg',
  },
  {
    quote:
      'Well done! For me they capture the meaning of the brand in a playful, non-threatening way that just kind of pulls you in and makes you want to learn. It’s a big improvement on our first efforts.',
    author: 'Jonny',
    company: 'CEO · Odens, UK',
    logo: '/logos/odens.svg',
  },
  {
    quote:
      'Você mandou bem demais na criação do site, nas ideias e aprimoramentos. Você realmente é um cara diferenciado e estou muito feliz que você esteja no time. Parabéns!',
    author: 'Cadu',
    company: 'Head of Marketing · Tutory',
    logo: '/logos/tutory.svg',
  },
  {
    quote:
      "You've really made a difference! It's fantastic to see the work you guys are doing start to make an impact on actual revenue.",
    author: 'Kirsten',
    company: 'Head of Product · Mindtools',
    logo: '/logos/mindtools.svg',
  },
  {
    quote: 'Boa, meu mano! Caraca, arrepiei.',
    author: 'Marlom Andrade',
    company: 'CEO & Founder · Tutory',
    logo: '/logos/tutory.svg',
  },
  {
    quote:
      'I really love these designs — very beautiful and I think the branding is on point! Everything feels cohesive to gently nudge the user on their learning journey.',
    author: 'Nial',
    company: 'QA Head · Mindtools',
    logo: '/logos/mindtools.svg',
  },
  {
    quote:
      'The labels look spot on! I am really pleased with the whole package and I think that they will sell like crazy. Thanks to everyone — I really appreciate it.',
    author: 'Simon',
    company: 'Founder · Simple Snuff',
    logo: '/logos/simple-snuff.svg',
  },
  {
    quote: 'Meu Deus, meu Deus, meu Deus. Sinistro, Well!',
    author: 'Letícia Sousa',
    company: 'Marketing · Tutory',
    logo: '/logos/tutory.svg',
  },
];

export const faqs = [
  {
    q: 'Você faz design e desenvolvimento de verdade?',
    a: 'Sim. Sou dono das duas pontas: pesquisa de UX e design no Figma, e implementação em React/TypeScript em produção. Isso elimina o handoff e reduz muito o tempo de entrega.',
  },
  {
    q: 'Trabalha remoto?',
    a: 'Sim. Baseado em Brasília e aberto a oportunidades 100% remotas, inclusive internacionais — inglês avançado, com experiência atendendo clientes no Reino Unido e nos EUA.',
  },
  {
    q: 'Como é o seu processo de trabalho?',
    a: 'Descoberta → Design → Desenvolvimento → Entrega. Com pontos de feedback em cada etapa e métricas (analytics, A/B testing) para validar o impacto no produto.',
  },
  {
    q: 'Quais tecnologias você domina?',
    a: 'React, Next.js, TypeScript, Node.js, Tailwind e integração REST/GraphQL no dev; Figma, design systems e pesquisa de usabilidade no design.',
  },
  {
    q: 'Como você usa IA no seu trabalho?',
    a: 'Muito além de autocompletar código. Orquestro agentes e fluxos multi-etapa (com MCP), versiono e testo prompts como código, otimizo custo/tokens (caching e roteamento de modelos) e uso evals com LLM-as-judge para garantir qualidade antes do deploy — integrando features de IA direto na interface do produto.',
  },
  {
    q: 'Você é um "vibe coder"? Só joga prompt e aceita o que vier?',
    a: 'Não. "Vibe coding" é pedir código e torcer pra funcionar. Eu faço Design Engineering: desenho a experiência e a implemento com disciplina de produção — prompts versionados e testados como código, evals com gates no CI antes do deploy, controle de custo e tokens, design system como fonte única da verdade, acessibilidade e performance. IA é ferramenta sob engenharia, não muleta: eu entendo, reviso e respondo pelo que vai para produção.',
  },
];

/* Artigos publicados no Medium. Descrições são resumos próprios (não cópia). */
export const articles = [
  {
    title:
      'From UX/UI Design to Front-End Development: Embracing a New Chapter',
    excerpt:
      'Minha transição depois de 15+ anos em UX/UI design para o front-end — e por que fechar a distância entre design e código virou meu foco.',
    date: 'Abr 2024',
    source: 'Medium',
    tag: 'Carreira',
    href: 'https://medium.com/@wellingtonmota/from-ux-ui-design-to-front-end-development-embracing-a-new-chapter-756f55de93df',
  },
  {
    title: 'Why you should try Hands-off UX/UI documentation like this…',
    excerpt:
      'Um método prático de documentação hands-off: user stories, critérios de aceite e cenários Given-When-Then para eliminar ruído no handoff com o dev.',
    date: 'Abr 2024',
    source: 'Bootcamp · Medium',
    tag: 'Processo',
    href: 'https://medium.com/design-bootcamp/level-up-your-ux-ui-game-why-you-should-do-hands-off-documentation-like-this-6233def429ae',
  },
];

export const contact = {
  eyebrow: 'Vamos trabalhar juntos',
  heading: 'Bora construir um produto que as pessoas amem usar?',
  sub: 'Aberto a oportunidades remotas e projetos. Respondo em até 24h.',
  cta: 'Falar comigo',
};

export const faqAside = {
  quote:
    'Não achou o que procurava? Me chama — conto tudo sobre como posso ajudar no seu produto.',
  metaLabel: 'Tempo de resposta',
  metaValue: 'Até 24h',
};

export const footer = {
  mission:
    'Product Engineer que une design e código para entregar produtos digitais ponta a ponta. Baseado em Brasília, aberto ao mundo.',
  links: nav,
  badgeText: 'PRODUCT ENGINEER · DESIGN + CÓDIGO · ABERTO A PROJETOS · ',
  legal: `© ${new Date().getFullYear()} ${profile.name}. Todos os direitos reservados.`,
};
