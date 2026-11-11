import type { SiteData } from './types';

const pt: SiteData = {
  seo: {
    title: 'Wellington Mota — Design Engineer | Design de produto, React e TypeScript',
    description:
      'Design Engineer com 15+ anos em design de produto e 3+ entregando front-end em React e TypeScript. Cases com protótipos que funcionam. Remoto, de Brasília.',
  },

  profile: {
    name: 'Wellington Mota',
    firstName: 'Wellington',
    role: 'Design Engineer',
    roleAi: 'AI Specialist',
    tagline:
      'Desenho produtos digitais e construo em React e TypeScript. O que é aprovado no protótipo é o que vai ao ar.',
    location: 'Brasília, BR',
    timezone: 'America/Sao_Paulo',
    email: 'wellingtonmota42@gmail.com',
    available: true,
    availableText: 'Aberto a vagas remotas',
  },

  nav: [
    { label: 'Início', href: '#home' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'O que faço', href: '#servicos' },
    { label: 'Experiência', href: '#projetos' },
    { label: 'Escrita', href: '#escrita' },
    { label: 'Contato', href: '#contato' },
  ],

  socials: [
    { label: 'GitHub', href: 'https://github.com/wellmota' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wellingtonmota13/' },
    { label: 'Behance', href: 'https://www.behance.net/wellingtonmota' },
  ],

  heroStats: {
    headline: '15+',
    label: 'anos criando produtos digitais',
    sub: 'React · Next.js · TypeScript · Design Systems · IA em produção',
  },

  stats: [
    { value: '15+', label: 'anos em design de produto' },
    { value: '40%', label: 'menos tempo de handoff' },
    { value: '28%', label: 'mais adoção de features' },
    { value: '4×', label: 'features entregues mais rápido' },
  ],
  statsNote:
    '40%, 28% e 4× vêm de dados do Jira, comparando cada projeto antes e depois da minha entrada.',

  about: {
    eyebrow: 'Sobre mim',
    image: '/well-portrait-6.png',
    heading: 'Desenho o produto e escrevo o front-end.',
    body: [
      'Tenho 15+ anos em design de produto e 3+ entregando front-end em React, Next.js e TypeScript. Faço a pesquisa de UX, a interface e o código que vai para produção, integrado a APIs REST e GraphQL.',
      'Sou formado em Análise e Desenvolvimento de Sistemas e tenho MBA em Full Stack Development. Trabalho melhor em times pequenos, onde uma pessoa consegue cuidar de uma feature da pesquisa ao deploy.',
    ],
    signatureRole: 'Design + Código',
  },

  marquee: [
    'React', 'Next.js', 'TypeScript', 'Design Systems', 'Figma',
    'UX Research', 'Tailwind CSS', 'Node.js', 'Spec-Driven Development',
    'Agent Orchestration', 'Evals', 'MCP', 'RAG',
  ],

  services: [
    {
      index: '01',
      icon: 'ux',
      title: 'Product Design & UX',
      metaLeft: 'Figma · Research',
      points: [
        'Diagnóstico de UX de produtos no ar',
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
      points: [
        'React · Next.js · TypeScript',
        'Integração REST / GraphQL',
        'Performance & acessibilidade',
      ],
    },
    {
      index: '04',
      icon: 'ai',
      title: 'AI Engineering',
      metaLeft: 'Specs · Agents · LLM',
      points: [
        'Spec-driven development',
        'Orquestração de agentes (MCP)',
        'Evals & qualidade no CI',
        'RAG na interface do produto',
      ],
    },
  ],

  process: [
    {
      step: '01',
      title: 'Descoberta',
      progress: 25,
      description:
        'Entendo o negócio, o público e os objetivos. Pesquisa com usuários, benchmark e uma direção de produto.',
    },
    {
      step: '02',
      title: 'Design',
      progress: 65,
      description:
        'Arquitetura de informação, design system e telas de alta fidelidade, iteradas com testes de usabilidade.',
    },
    {
      step: '03',
      title: 'Desenvolvimento',
      progress: 90,
      description:
        'Construo o design em React/TypeScript responsivo, integrado às APIs.',
    },
    {
      step: '04',
      title: 'Entrega & Métricas',
      progress: 100,
      description:
        'Testes, ajustes finais e analytics e testes A/B para conferir o impacto no produto.',
    },
  ],

  projects: [
    {
      title: 'VESS Studio',
      meta: 'Bem-estar · Case Study',
      categories: ['Product', 'App', 'Web'],
      description:
        'Um estúdio de Pilates trocou um sistema alugado por um próprio: site, app na App Store, gestão das duas unidades e cobrança automática. Desenhei e construí em doze semanas.',
      image: '/cases/vess/card-pt.webp',
      accent: '#d8b98a',
      href: '/pt/work/vess/',
      featured: true,
    },
    {
      title: 'HyperGestor',
      meta: 'Automotivo · Case Study',
      categories: ['Product', 'Branding', 'Web'],
      description:
        'Um ERP com CRM de IA para concessionárias. Fiz a marca, o site e o redesenho do sistema, até o front-end que roda em produção.',
      image: '/cases/hypergestor/card-pt.webp',
      accent: '#F48220',
      highlight: 'Marca, site e ERP',
      href: '/pt/work/hypergestor/',
      featured: true,
    },
    {
      title: 'CareCloud',
      meta: 'Health-tech · Case Study',
      categories: ['Product', 'UX', 'Healthcare'],
      description:
        'Uma suíte clínica americana saindo de Adobe Flex para React. Quatro meses in loco em Miami, num time de cinco UX, com fluxos testados com médicos.',
      image: '/cases/carecloud/card-pt.webp',
      accent: '#1E8FD5',
      href: '/pt/work/carecloud/',
      featured: true,
    },
    {
      title: 'GPB',
      meta: 'Finanças · Case Study',
      categories: ['Product', 'Design Eng', 'React'],
      description:
        'Uma rodada de UX no sistema financeiro de um grupo empresarial, feita direto no código React. O app de verdade roda na página, com dados fictícios.',
      image: '/cases/gpb/img/cover.webp',
      accent: '#4FBFAF',
      highlight: 'O app de verdade, ao vivo na página',
      href: '/pt/work/gpb/',
      featured: true,
    },
    {
      title: 'CuidaMe',
      meta: 'Health · Case Study',
      categories: ['Product', 'App', 'UX'],
      description:
        'Um app de cuidado que estava travado havia dois anos. Em uma semana: workshop, redesign e o front-end inteiro pronto para beta, aprovado de primeira.',
      image: '/cases/cuidame/card-pt.webp',
      accent: '#2FA98C',
      highlight: 'Do redesign ao beta em 7 dias',
      href: '/pt/work/cuidame/',
      featured: true,
    },
    {
      title: 'Aeroporto de Leads',
      meta: 'EdTech · Case Study',
      categories: ['Product', '3D', 'Data'],
      description:
        'A tabela de leads da TV da sala de vendas virou um aeroporto 3D ao vivo em three.js, em que cada lead é um avião que pousa. Feito em uma semana.',
      image: '/cases/aeroporto/card-pt.webp',
      accent: '#2456E6',
      href: '/pt/work/aeroporto-de-leads/',
      featured: true,
    },
    {
      title: 'Método OBA',
      meta: 'EdTech',
      categories: ['Product', 'Design Eng', 'PHP'],
      description:
        'Redesenho do painel do aluno de uma mentoria de concursos policiais, do diagnóstico ao tema em PHP.',
      image: '/cases/metodo-oba/img/cover.webp',
      accent: '#4D7CFF',
      href: '/pt/work/metodo-oba/',
    },
    {
      title: 'Tutory: site',
      meta: 'EdTech',
      categories: ['Web', 'SEO', 'Astro'],
      description:
        'Do WordPress a um site em Astro com 14 páginas, com redirecionamentos 301 e Lighthouse 100.',
      image: '/cases/tutory-site/card-pt.webp',
      accent: '#3B7BF5',
      href: '/pt/work/tutory-site/',
    },
    {
      title: 'Tutory: identidade visual',
      meta: 'EdTech',
      categories: ['Branding', 'Identidade', '3D'],
      description:
        'Rebranding com símbolo, paleta, voz, um deck de 37 slides e seis troféus em 3D.',
      image: '/cases/tutory-rebrand/card-pt.webp',
      accent: '#C9A96E',
      href: '/pt/work/tutory-rebrand/',
    },
    {
      title: 'Golfleik',
      meta: 'Esporte',
      categories: ['Product', 'Prototype', '3D'],
      description:
        'Uma proposta para um clube de golfe que virou app do sócio e ERP navegáveis, com um campo em 3D.',
      image: '/cases/golfhub/card-pt.webp',
      accent: '#38EB7F',
      href: '/pt/work/golfhub/',
    },
    {
      title: 'Finby',
      meta: 'Fintech',
      categories: ['Product', 'UI', 'Prototype'],
      description:
        'Um app de consórcio entre amigos levado do Figma a um protótipo de 12 telas que se usa no celular.',
      image: '/cases/finby/card-pt.webp',
      accent: '#7552F5',
      href: '/pt/work/finby/',
    },
    {
      title: 'Resilience Dynamic',
      meta: 'Bem-estar',
      categories: ['Product', 'UX', 'Prototype'],
      description:
        'Um app de bem-estar que foi lançado, mais um protótipo de 15 telas feito a partir do meu arquivo do Figma.',
      image: '/cases/resilience-engine/card-pt.webp',
      accent: '#7C7FF2',
      href: '/pt/work/resilience-engine/',
    },
    {
      title: 'Action247',
      meta: 'Esportes',
      categories: ['Product', 'UI', 'UX'],
      description:
        'Um jogo grátis de palpites esportivos desenhado para ter a emoção de uma casa de apostas sem pedir aposta.',
      image: '/cases/action247/card-pt.webp',
      accent: '#14A85C',
      href: '/pt/work/action247/',
    },
  ],

  clients: [
    'Mindtools', 'Mitsubishi', 'ServiceNow', 'Kineo', 'Tutory',
    'HyperGestor', 'Tako', 'Butterfly IO', 'Action247', 'CareCloud',
    'Monumenta', 'BRB', 'CAIXA', 'Banco do Brasil', 'KIA Motors',
    'Solomon', 'Autódromo Velocitta', 'Animalle', 'Grupo SOMA', 'Wevr',
    'Resilience Dynamic', 'Soluti', 'Sankhya', 'Cogmo Tecnologia',
    'Your Digital Media', 'Chris Corsini', 'Nomoo',
    'Brintel', 'Belo Monte', 'Altevita', 'GraphiteRX',
  ],

  testimonials: [
    {
      quote: 'Você realmente fez a diferença! É fantástico ver o trabalho de vocês começando a gerar impacto em receita de verdade.',
      author: 'Kirsten',
      company: 'Head de Produto · Mindtools',
      logo: 'https://outboundpartners.com/wp-content/uploads/2025/09/MindTools-Logo.png',
      tag: 'App Design',
    },
    {
      quote: '…e aqui estamos, com você fazendo prototipagem visionária e várias outras coisas incríveis. Tenho adorado trabalhar com você e com o time todo. Continue com o ótimo trabalho!',
      author: 'Michaela Heigl, PhD',
      company: 'Director · Mindtools',
      logo: 'https://outboundpartners.com/wp-content/uploads/2025/09/MindTools-Logo.png',
      tag: 'App Design',
    },
    {
      quote: 'Você mandou bem demais na criação do site, nas ideias e aprimoramentos. Você realmente é um cara diferenciado e estou muito feliz que você esteja no time. Parabéns!',
      author: 'Cadu',
      company: 'Head de Marketing · Tutory',
      logo: 'https://www.tutory.com.br/tutory-logo-v2.svg',
      tag: 'Site',
    },
    {
      quote: 'Excelente trabalho! Para mim, elas capturam o significado da marca de um jeito lúdico e acolhedor, que te puxa para dentro e dá vontade de aprender. É uma grande evolução em relação às nossas primeiras tentativas.',
      author: 'Jonny',
      company: 'CEO · Odens, Reino Unido',
      tag: 'UI/UX',
    },
    {
      quote: 'Cara, essa nova versão tá maravilhosa. Parabéns, mandou muito bem!',
      author: 'Fernando Cardoso',
      company: 'CEO HyperGestor · Head de Inovação, Mitsubishi Motors',
      logo: 'https://www.hypergestor.com.br/templates/hypergestor/images/hypergestor-light-mode-CdjvtdrG.svg',
      tag: 'Dashboard',
    },
  ],

  faqs: [
    {
      q: 'Você faz design e desenvolvimento de verdade?',
      a: 'Faço. No design: pesquisa de UX, fluxos, interfaces de alta fidelidade e design systems no Figma. No código: React, Next.js, TypeScript e Tailwind, integrados a APIs REST e GraphQL. São 15+ anos em design e 3+ entregando front-end.',
    },
    {
      q: 'Trabalha remoto?',
      a: 'Sim. Moro em Brasília (GMT-3) e trabalho remoto com times de fora. Tenho inglês avançado e já atendi clientes no Reino Unido e nos EUA, incluindo quatro meses in loco em Miami.',
    },
    {
      q: 'Como você usa IA no seu trabalho?',
      a: 'Escrevo a spec primeiro e construo a partir dela com agentes ligados às ferramentas do projeto por MCP. Os prompts são versionados e testados como código, e os evals rodam no CI antes do deploy. Eu reviso e respondo por tudo o que vai para produção. Quando o próprio produto precisa de IA, como uma busca ou um assistente, eu desenho e construo isso na interface, com RAG quando depende dos dados do produto.',
    },
    {
      q: 'Você pega projetos como freelancer?',
      a: 'Pego, por projeto, para empresas e empreendedores no Brasil e fora: um diagnóstico de UX, um protótipo para validar uma ideia ou um produto construído do zero. A página de serviços explica como funciona. Minha prioridade agora é uma vaga remota em time de produto.',
    },
  ],

  articles: [
    {
      title: 'Architecture for Designers',
      excerpt:
        'Deck de 27 slides sobre montar a própria stack com Vite, Supabase, Claude Code, Git e Vercel, e usar o localhost para caçar edge cases.',
      date: 'Ago 2026',
      source: 'Palestra · Slides',
      tag: 'Arquitetura',
      href: '/talks/architecture-for-designers/',
    },
    {
      title: 'From UX/UI Design to Front-End Development: Embracing a New Chapter',
      excerpt:
        'Minha ida para o front-end depois de 15+ anos em UX/UI design, e por que a distância entre design e código virou meu foco.',
      date: 'Abr 2024',
      source: 'Medium',
      tag: 'Carreira',
      href: 'https://medium.com/@wellingtonmota/from-ux-ui-design-to-front-end-development-embracing-a-new-chapter-756f55de93df',
    },
    {
      title: 'Why you should try Hands-off UX/UI documentation like this…',
      excerpt:
        'Um método de documentação com user stories, critérios de aceite e cenários Given-When-Then, para reduzir o vai e vem com o dev.',
      date: 'Abr 2024',
      source: 'Bootcamp · Medium',
      tag: 'Processo',
      href: 'https://medium.com/design-bootcamp/level-up-your-ux-ui-game-why-you-should-do-hands-off-documentation-like-this-6233def429ae',
    },
  ],

  contact: {
    eyebrow: 'Contato',
    heading: 'Vamos',
    headingMuted: 'conversar.',
    sub: 'Procuro uma vaga remota de Design Engineer em time de produto, e também pego projetos como freelancer. Respondo em até 24h.',
    cta: 'Conversar no WhatsApp',
    ctaAlt: 'LinkedIn',
    details: { email: 'E-mail', location: 'Localização', status: 'Status' },
  },

  faqAside: {
    quote: 'Tem outra pergunta? Me escreve que eu respondo.',
    metaLabel: 'Tempo de resposta',
    metaValue: 'Até 24h',
  },

  footer: {
    mission:
      'Design Engineer em Brasília. Desenho produtos e construo o front-end. Aberto a vagas remotas.',
    badgeText: 'DESIGN ENGINEER · DESIGN + CÓDIGO · ABERTO A VAGAS REMOTAS · ',
    legal: `© ${new Date().getFullYear()} Wellington Mota. Todos os direitos reservados.`,
  },

  ui: {
    startProject: 'Fale comigo',
    servicesLink: 'Projetos freelance: ver serviços',
    moreWork: {
      label: 'Mais cases',
      earlier: 'Trabalhos anteriores para Kia, Wevr, ArtCaffé e Odens estão no Behance',
      earlierHref: 'https://www.behance.net/wellingtonmota',
    },
    footer: {
      location: 'Localização',
      remote: 'Vagas remotas e projetos',
      contact: 'Contato',
      navigation: 'Navegação',
      services: 'Serviços para projetos',
      talk: 'Vamos conversar',
      placeholder: 'seu@email.com',
      send: 'Enviar',
    },
    openMenu: 'Abrir menu',
    viewExperience: 'Ver os projetos',
    talkToMe: 'Fale comigo',
    socialLabel: 'Redes',
    portfolioEdition: 'Portfólio — Ed. 2026',
    readArticle: 'Ler artigo',
    viewAllMedium: 'Ver todos no Medium →',
    book: {
      label: 'Livro grátis',
      title: 'Do Design ao Digital',
      text: 'O guia da transição do design gráfico para o UX/UI, com a IA em cada etapa. 12 capítulos, edição completa em PDF.',
      cta: 'Baixar grátis →',
    },
    sectionClients: { index: '01', label: 'Quem já atendi', title: 'Marcas para quem', titleMuted: 'já trabalhei.' },
    sectionAbout: { index: '02', label: 'Sobre mim' },
    sectionServices: { index: '03', label: 'O que faço', title: 'Design, front-end', titleMuted: 'e IA.', caption: 'A mesma pessoa no design e no código.' },
    sectionProcess: { index: '03', label: 'Como eu trabalho', title: 'Como um projeto', titleMuted: 'acontece.', caption: 'Do primeiro brief à entrega, com feedback e métricas em cada etapa.' },
    sectionWork: { index: '04', label: 'Projetos em destaque', title: 'Seis produtos', titleMuted: 'que desenhei.', caption: 'Em cinco deles, também escrevi o código.' },
    sectionTestimonials: { index: '05', label: 'Depoimentos', title: 'De quem', titleMuted: 'trabalhou comigo.', caption: 'Mensagens de clientes e colegas de time no Brasil, no Reino Unido e nos EUA.' },
    sectionFaq: { index: '06', label: 'Perguntas frequentes', title: 'Dúvidas?', titleMuted: '', caption: '' },
    sectionWriting: { index: '07', label: 'Escrita & Código', title: 'Escrita', titleMuted: 'e código.', caption: 'Um livro, uma palestra, dois artigos e minha atividade no GitHub.' },
    sectionGithub: { index: '08', label: 'GitHub', title: 'Atividade', titleMuted: 'no GitHub.', caption: 'contribuições no último ano', legendLess: 'Menos', legendMore: 'Mais', cta: 'Seguir no GitHub →' },
  },
};

export default pt;
