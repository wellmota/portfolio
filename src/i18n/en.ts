import type { SiteData } from './types';

const en: SiteData = {
  seo: {
    title: 'Wellington Mota — Design Engineer | Product Design, React & TypeScript',
    description:
      'Design Engineer with 15+ years in product design and 3+ shipping front end in React and TypeScript. Case studies with working prototypes. Remote, based in Brazil.',
  },

  profile: {
    name: 'Wellington Mota',
    firstName: 'Wellington',
    role: 'Design Engineer',
    roleAi: 'AI Specialist',
    tagline:
      'I design digital products and build them in React and TypeScript. What gets approved in the prototype is what ships.',
    location: 'Brasília, BR',
    timezone: 'America/Sao_Paulo',
    email: 'wellingtonmota42@gmail.com',
    available: true,
    availableText: 'Open to remote roles',
  },

  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#sobre' },
    { label: 'Services', href: '#servicos' },
    { label: 'Work', href: '#projetos' },
    { label: 'Writing', href: '#escrita' },
    { label: 'Contact', href: '#contato' },
  ],

  socials: [
    { label: 'GitHub', href: 'https://github.com/wellmota' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wellingtonmota13/' },
    { label: 'Behance', href: 'https://www.behance.net/wellingtonmota' },
  ],

  heroStats: {
    headline: '15+',
    label: 'years building digital products',
    sub: 'React · Next.js · TypeScript · Design Systems · AI in production',
  },

  stats: [
    { value: '15+', label: 'years in product design' },
    { value: '40%', label: 'less handoff time' },
    { value: '28%', label: 'more feature adoption' },
    { value: '4×', label: 'faster feature delivery' },
  ],
  statsNote:
    '40%, 28% and 4× come from Jira data, comparing each project before and after I joined.',

  about: {
    eyebrow: 'About me',
    image: '/well-portrait-6.png',
    heading: 'I design the product and write the front end.',
    body: [
      'I have 15+ years in product design and 3+ shipping front end in React, Next.js and TypeScript. I do the UX research, the interface and the code that goes to production, integrated with REST and GraphQL APIs.',
      'I hold a degree in Systems Analysis and Development and an MBA in Full Stack Development. I work best on small teams, where one person can own a feature from research to deploy.',
    ],
    signatureRole: 'Design + Code',
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
        'UX audits of live products',
        'User research & usability testing',
        'Wireframes, flows & IA',
        'High-fidelity prototypes',
      ],
    },
    {
      index: '02',
      icon: 'system',
      title: 'Design Systems',
      metaLeft: 'Used by 3 teams',
      points: [
        'Tokens & foundations',
        'Component libraries',
        'Living documentation',
      ],
    },
    {
      index: '03',
      icon: 'code',
      title: 'Front-end Engineering',
      metaLeft: 'Production',
      points: [
        'React · Next.js · TypeScript',
        'REST / GraphQL integration',
        'Performance & accessibility',
      ],
    },
    {
      index: '04',
      icon: 'ai',
      title: 'AI Engineering',
      metaLeft: 'Specs · Agents · LLM',
      points: [
        'Spec-driven development',
        'Agent orchestration (MCP)',
        'Evals & CI quality gates',
        'RAG in the product UI',
      ],
    },
  ],

  process: [
    {
      step: '01',
      title: 'Discovery',
      progress: 25,
      description:
        'I learn the business, the audience and the goals. User research, benchmarking and a product direction.',
    },
    {
      step: '02',
      title: 'Design',
      progress: 65,
      description:
        'Information architecture, design system and high-fidelity screens, iterated with usability testing.',
    },
    {
      step: '03',
      title: 'Development',
      progress: 90,
      description:
        'I build the design in responsive React/TypeScript, integrated with the APIs.',
    },
    {
      step: '04',
      title: 'Delivery & Metrics',
      progress: 100,
      description:
        'Testing, final adjustments, and analytics and A/B tests to check the impact on the product.',
    },
  ],

  projects: [
    {
      title: 'Golfleik',
      meta: 'Sports',
      categories: ['Product', 'Prototype', '3D'],
      description:
        'A golf-club proposal turned into a clickable members’ app and club ERP, with a 3D course.',
      image: '/cases/golfhub/card-en.webp',
      accent: '#38EB7F',
      href: '/work/golfhub/',
      featured: true,
    },
    {
      title: 'Tutory: website',
      meta: 'EdTech',
      categories: ['Web', 'SEO', 'Astro'],
      description:
        'WordPress to a 14-page Astro site, with 301 redirects and Lighthouse 100.',
      image: '/cases/tutory-site/card-en.webp',
      accent: '#3B7BF5',
      href: '/work/tutory-site/',
      featured: true,
    },
    {
      title: 'Tutory: visual identity',
      meta: 'EdTech',
      categories: ['Branding', 'Identity', '3D'],
      description:
        'Rebrand with symbol, palette, voice, a 37-slide deck and six 3D trophies.',
      image: '/cases/tutory-rebrand/card-en.webp',
      accent: '#C9A96E',
      href: '/work/tutory-rebrand/',
      featured: true,
    },
    {
      title: 'Finby',
      meta: 'Fintech',
      categories: ['Product', 'UI', 'Prototype'],
      description:
        'A group-savings app taken from Figma to a 12-screen prototype you can use on a phone.',
      image: '/cases/finby/card-en.webp',
      accent: '#7552F5',
      href: '/work/finby/',
      featured: true,
    },
    {
      title: 'Resilience Dynamic',
      meta: 'Wellbeing',
      categories: ['Product', 'UX', 'Prototype'],
      description:
        'A wellbeing app that launched, plus a 15-screen prototype built from my Figma file.',
      image: '/cases/resilience-engine/card-en.webp',
      accent: '#7C7FF2',
      href: '/work/resilience-engine/',
      featured: true,
    },
    {
      title: 'CareCloud',
      meta: 'Health-tech · Case Study',
      categories: ['Product', 'UX', 'Healthcare'],
      description:
        'A US clinical suite moving from Adobe Flex to React. Four months on-site in Miami on a five-person UX team, with flows tested with doctors.',
      image: '/cases/carecloud/card-en.webp',
      accent: '#1E8FD5',
      href: '/work/carecloud/',
      featured: true,
    },
    {
      title: 'GPB',
      meta: 'Finance · Case Study',
      categories: ['Product', 'Design Eng', 'React'],
      description:
        'A UX round on a business group’s finance system, done directly in the React code. The real app runs on the page, with fictional data.',
      image: '/cases/gpb/img/cover.webp',
      accent: '#4FBFAF',
      highlight: 'The real app, live on the page',
      href: '/work/gpb/',
      featured: true,
    },
    {
      title: 'CuidaMe',
      meta: 'Health · Case Study',
      categories: ['Product', 'App', 'UX'],
      description:
        'A care app that had been stuck for two years. In one week: workshop, redesign and the whole front end ready for beta, approved on the first try.',
      image: '/cases/cuidame/card-en.webp',
      accent: '#2FA98C',
      highlight: 'Redesign to beta in 7 days',
      href: '/work/cuidame/',
      featured: true,
    },
    {
      title: 'Lead Airport',
      meta: 'EdTech · Case Study',
      categories: ['Product', '3D', 'Data'],
      description:
        'The lead table on a sales-room TV became a live 3D airport in three.js, where each lead is a plane that lands. Built in one week.',
      image: '/cases/aeroporto/card-en.webp',
      accent: '#2456E6',
      href: '/work/aeroporto-de-leads/',
      featured: true,
    },
    {
      title: 'VESS Studio',
      meta: 'Wellness · Case Study',
      categories: ['Product', 'App', 'Web'],
      description:
        'A Pilates studio replaced rented software with its own: website, App Store app, admin for both studios and automatic billing. I designed and built it in twelve weeks.',
      image: '/cases/vess/card-en.webp',
      accent: '#d8b98a',
      href: '/work/vess/',
    },
    {
      title: 'HyperGestor',
      meta: 'Automotive · Case Study',
      categories: ['Product', 'Branding', 'Web'],
      description:
        'An ERP with an AI CRM for car dealerships. I did the brand, the website and the system redesign, down to the front end running in production.',
      image: '/cases/hypergestor/card-en.webp',
      accent: '#F48220',
      highlight: 'Brand, website and ERP',
      href: '/work/hypergestor/',
    },
    {
      title: 'Método OBA',
      meta: 'EdTech',
      categories: ['Product', 'Design Eng', 'PHP'],
      description:
        'Student dashboard redesign for a police-exam prep course, from diagnosis to a PHP theme.',
      image: '/cases/metodo-oba/img/cover.webp',
      accent: '#4D7CFF',
      href: '/work/metodo-oba/',
    },
    {
      title: 'Action247',
      meta: 'Sports',
      categories: ['Product', 'UI', 'UX'],
      description:
        'A free sports prediction game designed to feel like a sportsbook without asking for a bet.',
      image: '/cases/action247/card-en.webp',
      accent: '#14A85C',
      href: '/work/action247/',
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
      quote: "You've really made a difference! It's fantastic to see the work you guys are doing start to make an impact on actual revenue.",
      author: 'Kirsten',
      company: 'Head of Product · Mindtools',
      logo: 'https://outboundpartners.com/wp-content/uploads/2025/09/MindTools-Logo.png',
      tag: 'App Design',
    },
    {
      quote: '…here we are now with you doing visionary prototyping and all kind of other really great stuff. I’ve really enjoyed working with you and the whole team. Keep up the good work!',
      author: 'Michaela Heigl, PhD',
      company: 'Director · Mindtools',
      logo: 'https://outboundpartners.com/wp-content/uploads/2025/09/MindTools-Logo.png',
      tag: 'App Design',
    },
    {
      quote: 'You did an amazing job on the website, the ideas, and the refinements. You truly are one of a kind, and I’m really happy you’re on the team. Congrats!',
      author: 'Cadu',
      company: 'Head of Marketing · Tutory',
      logo: 'https://www.tutory.com.br/tutory-logo-v2.svg',
      tag: 'Website',
    },
    {
      quote: 'Well done! For me they capture the meaning of the brand in a playful, non-threatening way that just kind of pulls you in and makes you want to learn. It’s a big improvement on our first efforts.',
      author: 'Jonny',
      company: 'CEO · Odens, UK',
      tag: 'UI/UX',
    },
    {
      quote: 'Man, this new version is stunning. Congrats, you nailed it!',
      author: 'Fernando Cardoso',
      company: 'CEO HyperGestor · Head of Innovation, Mitsubishi Motors',
      logo: 'https://www.hypergestor.com.br/templates/hypergestor/images/hypergestor-light-mode-CdjvtdrG.svg',
      tag: 'Dashboard',
    },
  ],

  faqs: [
    {
      q: 'Do you really do both design and development?',
      a: 'Yes. On the design side: UX research, flows, high-fidelity interfaces and design systems in Figma. On the code side: React, Next.js, TypeScript and Tailwind, integrated with REST and GraphQL APIs. That is 15+ years in design and 3+ shipping front end.',
    },
    {
      q: 'Do you work remotely?',
      a: 'Yes. I am based in Brasília, Brazil (GMT-3) and work remotely with teams abroad. My English is fluent, and I have worked with clients in the UK and the US, including four months on-site in Miami.',
    },
    {
      q: 'How do you use AI in your work?',
      a: 'I write the spec first and build from it with agents connected to the project’s tools through MCP. Prompts are versioned and tested like code, and evals run in CI before a deploy. I review and answer for everything that goes to production. When the product itself needs AI, such as search or an assistant, I design and build it into the interface, with RAG where it needs the product’s own data.',
    },
    {
      q: 'Do you take freelance projects?',
      a: 'Yes, by project, for companies and founders in Brazil and abroad: a UX audit, a prototype to validate an idea, or a product built from scratch. The services page explains how it works. My priority right now is a remote role on a product team.',
    },
  ],

  articles: [
    {
      title: 'Architecture for Designers',
      excerpt:
        'A 27-slide deck on building your own stack with Vite, Supabase, Claude Code, Git and Vercel, and using localhost to hunt edge cases.',
      date: 'Aug 2026',
      source: 'Talk · Slides',
      tag: 'Architecture',
      href: '/talks/architecture-for-designers/',
    },
    {
      title: 'From UX/UI Design to Front-End Development: Embracing a New Chapter',
      excerpt:
        'My move to front end after 15+ years in UX/UI design, and why the gap between design and code became my focus.',
      date: 'Apr 2024',
      source: 'Medium',
      tag: 'Career',
      href: 'https://medium.com/@wellingtonmota/from-ux-ui-design-to-front-end-development-embracing-a-new-chapter-756f55de93df',
    },
    {
      title: 'Why you should try Hands-off UX/UI documentation like this…',
      excerpt:
        'A documentation method built on user stories, acceptance criteria and Given-When-Then scenarios, to cut the back-and-forth with developers.',
      date: 'Apr 2024',
      source: 'Bootcamp · Medium',
      tag: 'Process',
      href: 'https://medium.com/design-bootcamp/level-up-your-ux-ui-game-why-you-should-do-hands-off-documentation-like-this-6233def429ae',
    },
  ],

  contact: {
    eyebrow: 'Contact',
    heading: 'Get in',
    headingMuted: 'touch.',
    sub: 'I am looking for a remote Design Engineer role on a product team, and I also take freelance projects. I reply within 24 hours.',
    cta: 'Email me',
    ctaAlt: 'LinkedIn',
    details: { email: 'Email', location: 'Location', status: 'Status' },
  },

  faqAside: {
    quote: 'Have a different question? Email me and I will answer it.',
    metaLabel: 'Response time',
    metaValue: 'Within 24h',
  },

  footer: {
    mission:
      'Design Engineer based in Brasília, Brazil. I design products and build their front end. Open to remote roles.',
    badgeText: 'DESIGN ENGINEER · DESIGN + CODE · OPEN TO REMOTE ROLES · ',
    legal: `© ${new Date().getFullYear()} Wellington Mota. All rights reserved.`,
  },

  ui: {
    startProject: 'Get in touch',
    servicesLink: 'Freelance projects: see services',
    moreWork: {
      label: 'More case studies',
      earlier: 'Earlier work for Kia, Wevr, ArtCaffé and Odens is on Behance',
      earlierHref: 'https://www.behance.net/wellingtonmota',
    },
    footer: {
      location: 'Location',
      remote: 'Remote roles & projects',
      contact: 'Contact',
      navigation: 'Navigation',
      services: 'Services for projects',
      talk: 'Let’s talk',
      placeholder: 'you@email.com',
      send: 'Send',
    },
    openMenu: 'Open menu',
    viewExperience: 'See the work',
    talkToMe: 'Talk to me',
    socialLabel: 'Social',
    portfolioEdition: 'Portfolio — Ed. 2026',
    readArticle: 'Read article',
    viewAllMedium: 'See all on Medium →',
    book: {
      label: 'Free book · in Portuguese',
      title: 'Do Design ao Digital',
      text: 'My guide for graphic designers moving into UX/UI, with AI at every step. 12 chapters, full edition as a PDF.',
      cta: 'Get it free →',
    },
    sectionClients: { index: '01', label: 'Clients', title: 'Brands I have', titleMuted: 'done work for.' },
    sectionAbout: { index: '02', label: 'About me' },
    sectionServices: { index: '03', label: 'What I do', title: 'Design, front end', titleMuted: 'and AI.', caption: 'The same person on the design and on the code.' },
    sectionProcess: { index: '03', label: 'How I work', title: 'How a project', titleMuted: 'runs.', caption: 'From the first brief to delivery, with feedback and metrics at every stage.' },
    sectionWork: { index: '04', label: 'Selected work', title: 'Six products', titleMuted: 'I designed.', caption: 'Five of them I also built.' },
    sectionTestimonials: { index: '05', label: 'Testimonials', title: 'From people', titleMuted: 'I worked with.', caption: 'Messages from clients and teammates in Brazil, the UK and the US.' },
    sectionFaq: { index: '06', label: 'FAQ', title: 'Questions?', titleMuted: '', caption: '' },
    sectionWriting: { index: '07', label: 'Writing & Code', title: 'Writing', titleMuted: 'and code.', caption: 'A book, a talk, two articles and my GitHub activity.' },
    sectionGithub: { index: '08', label: 'GitHub', title: 'GitHub', titleMuted: 'activity.', caption: 'contributions in the last year', legendLess: 'Less', legendMore: 'More', cta: 'Follow on GitHub →' },
  },
};

export default en;
