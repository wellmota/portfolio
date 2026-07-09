/* -------------------------------------------------------------------------- *
 *  CONTEÚDO DO PORTFÓLIO
 *  Edite este arquivo para colocar suas informações. Tudo que aparece no site
 *  vem daqui — não precisa mexer nos componentes.
 * -------------------------------------------------------------------------- */

export const profile = {
  name: 'Wellington Mota',
  firstName: 'Wellington',
  role: 'Product Engineer — Design + Front-end',
  tagline:
    'A maioria das empresas contrata um designer e um engenheiro. Eu sou os dois.',
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
  sub: 'do research de UX ao código em produção',
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
  image: 'https://picsum.photos/seed/wm-about/900/1100',
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
    title: 'Mitsubishi Motors',
    meta: 'Automotivo · BR',
    categories: ['Product', 'Prototipagem'],
    description:
      'Protótipos de alta fidelidade e dashboards para o time de inovação e tecnologia.',
    image: 'https://picsum.photos/seed/mitsubishi-wm/1200/800',
    accent: '#cff24a',
  },
  {
    title: 'ServiceNow',
    meta: 'Enterprise · Global',
    categories: ['Design System', 'UX'],
    description:
      'Modernização de interface e design system na migração da plataforma — navegação e acessibilidade.',
    image: 'https://picsum.photos/seed/servicenow-wm/1200/800',
    accent: '#7dd3fc',
  },
  {
    title: 'Mindtools',
    meta: 'EdTech · UK',
    categories: ['Product', 'UX Research'],
    description:
      'Redesign de fluxos de aprendizado e do processo de retenção, com impacto direto em receita.',
    image: 'https://picsum.photos/seed/mindtools-wm/1200/800',
    accent: '#c4b5fd',
  },
  {
    title: 'Tutory',
    meta: 'EdTech · BR',
    categories: ['Rebranding', 'Web'],
    description:
      'Nova identidade visual, site e manual de marca para a plataforma de educação.',
    image: 'https://picsum.photos/seed/tutory-wm/1200/800',
    accent: '#fca5a5',
  },
  {
    title: 'CAIXA · Banco do Brasil',
    meta: 'Bancário · BR',
    categories: ['Product Design', 'UI'],
    description:
      'Design de produto e interfaces para grandes instituições financeiras.',
    image: 'https://picsum.photos/seed/caixa-wm/1200/800',
    accent: '#6ee7b7',
  },
  {
    title: 'Simple Snuff · Odens',
    meta: 'Branding · UK',
    categories: ['Branding', 'Packaging'],
    description:
      'Identidade de marca e design de embalagens elogiados pelos fundadores.',
    image: 'https://picsum.photos/seed/snuff-wm/1200/800',
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
  'Resilience Engine',
  'Resilience Dynamic',
  'Soluti',
  'Sankhya',
  'Cogmo Tecnologia',
];

/* Depoimentos REAIS — 10 clientes, 5 empresas, 3 países. */
export const testimonials = [
  {
    quote:
      'Muito legal! Inclusive, o texto ficou ótimo. Você tem um toque mágico… vai em frente!',
    author: 'J. C. Nery',
    company: 'Diretor de Inovação e Tecnologia · Mitsubishi',
  },
  {
    quote:
      '…here we are now with you doing visionary prototyping and all kind of other really great stuff. I’ve really enjoyed working with you and the whole team. Keep up the good work!',
    author: 'Michaela Heigl, PhD',
    company: 'Director · Mindtools',
  },
  {
    quote:
      'Cara, essa nova versão tá maravilhosa. Parabéns — mandou muito bem!',
    author: 'Fernando Cardoso',
    company: 'CEO HyperGestor · Head de Inovação, Mitsubishi Motors',
  },
  {
    quote:
      'Well done! For me they capture the meaning of the brand in a playful, non-threatening way that just kind of pulls you in and makes you want to learn. It’s a big improvement on our first efforts.',
    author: 'Jonny',
    company: 'CEO · Odens, UK',
  },
  {
    quote:
      'Você mandou bem demais na criação do site, nas ideias e aprimoramentos. Você realmente é um cara diferenciado e estou muito feliz que você esteja no time. Parabéns!',
    author: 'Cadu',
    company: 'Head of Marketing · Tutory',
  },
  {
    quote:
      "You've really made a difference! It's fantastic to see the work you guys are doing start to make an impact on actual revenue.",
    author: 'Kirsten',
    company: 'Head of Product · Mindtools',
  },
  {
    quote: 'Boa, meu mano! Caraca, arrepiei.',
    author: 'Marlom Andrade',
    company: 'CEO & Founder · Tutory',
  },
  {
    quote:
      'I really love these designs — very beautiful and I think the branding is on point! Everything feels cohesive to gently nudge the user on their learning journey.',
    author: 'Nial',
    company: 'QA Head · Mindtools',
  },
  {
    quote:
      'The labels look spot on! I am really pleased with the whole package and I think that they will sell like crazy. Thanks to everyone — I really appreciate it.',
    author: 'Simon',
    company: 'Founder · Simple Snuff',
  },
  {
    quote: 'Meu Deus, meu Deus, meu Deus. Sinistro, Well!',
    author: 'Letícia Sousa',
    company: 'Marketing · Tutory',
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
