import type { SiteData } from './types';

const en: SiteData = {
  profile: {
    name: 'Wellington Mota',
    firstName: 'Wellington',
    role: 'Product Engineer — Design + Fullstack',
    roleAi: 'AI Specialist',
    tagline:
      'Product Engineer who owns both sides: I design and ship the complete digital product — from prototype to fullstack React/TypeScript application in production, no handoff, from discovery to metrics. And I use AI beyond autocomplete: spec-driven development, orchestrated agents, version-controlled prompts, and evals ensuring quality before deploy — MVPs shipped in days, not months.',
    location: 'Brasília, BR',
    timezone: 'America/Sao_Paulo',
    email: 'wellingtonmota42@gmail.com',
    available: true,
    availableText: 'Open to remote opportunities',
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
    { value: '28%', label: 'increase in feature adoption' },
    { value: '4×', label: 'faster feature delivery' },
  ],

  about: {
    eyebrow: 'About me',
    image: '/well-portrait-6.png',
    heading:
      'I close the gap between design and code: research, design, and ship.',
    body: [
      'I am a Product Engineer at the intersection of design systems, component architecture, and user-centered product thinking. From UX research and high-fidelity prototypes to fullstack applications in production — React/TypeScript integrated with REST and GraphQL APIs.',
      '15+ years in product design and 3+ years shipping front-end on modern stacks (React, Next.js, Node.js). Degree in Systems Analysis and Development, MBA in Fullstack Development. I thrive on lean teams where one person can own the entire experience — cutting delivery time and handoff noise.',
    ],
    signatureRole: 'Design + Code',
  },

  marquee: [
    'React', 'Next.js', 'TypeScript', 'Design Systems', 'Figma',
    'UX Research', 'Tailwind CSS', 'Node.js', 'Spec-Driven Development',
    'Agent Orchestration', 'Prompt Engineering', 'Evals', 'MCP', 'RAG', 'Token Optimization',
  ],

  services: [
    {
      index: '01',
      icon: 'ux',
      title: 'Product Design & UX',
      metaLeft: 'Figma · Research',
      badge: 'STRATEGIC',
      points: [
        'User research & usability testing',
        'Wireframes, flows & IA',
        'High-fidelity prototypes',
      ],
      ai: 'I generate layout and copy variations with LLMs, synthesize research data with automated analysis, and accelerate A/B tests with evals.',
    },
    {
      index: '02',
      icon: 'system',
      title: 'Design Systems',
      metaLeft: 'Used by 3 teams',
      badge: 'SCALABLE',
      points: [
        'Tokens & foundations',
        'Component libraries',
        'Living documentation',
      ],
      ai: 'I automate token generation, component documentation, and accessibility checklists with code agents.',
    },
    {
      index: '03',
      icon: 'code',
      title: 'Front-end Engineering',
      metaLeft: 'Production',
      badge: 'RELIABLE',
      points: [
        'React · Next.js · TypeScript',
        'REST / GraphQL integration',
        'Performance & accessibility',
      ],
      ai: 'Agent-powered code review, assisted refactoring, test generation, and automated visual regression detection.',
    },
    {
      index: '04',
      icon: 'ai',
      title: 'AI Engineering & Orchestration',
      metaLeft: 'Specs · Agents · LLM',
      badge: 'ADVANCED',
      points: [
        'Spec-driven development',
        'Agent orchestration (MCP)',
        'Evals & CI quality gates',
        'RAG in the product UI',
      ],
      ai: 'Executable specs become code: multi-agent pipelines, version-controlled prompts, and LLM-as-judge evals in CI.',
    },
    {
      index: '05',
      icon: 'spark',
      title: 'Rapid Prototyping (0 → 1)',
      metaLeft: 'Startups',
      badge: 'FAST',
      points: [
        'MVP in days, not months',
        'From concept to clickable',
        'Validation with real users',
      ],
      ai: 'Full project scaffolding with agents, complete flow prototyping in hours, and real-time iteration.',
    },
  ],

  process: [
    {
      step: '01',
      title: 'Discovery',
      progress: 25,
      description:
        'I understand the business, audience, and goals. User research, benchmarking, and defining the product direction.',
      ai: 'Interview synthesis and competitive analysis with LLMs',
    },
    {
      step: '02',
      title: 'Design',
      progress: 65,
      description:
        'Information architecture, design system, and high-fidelity screens. Rapid iteration with usability testing.',
      ai: 'AI-generated layout and copy variations in minutes',
    },
    {
      step: '03',
      title: 'Development',
      progress: 90,
      description:
        'I turn design into responsive, performant React/TypeScript code, integrated with APIs — no handoff.',
      ai: 'Code agents for scaffolding, testing, and code review',
    },
    {
      step: '04',
      title: 'Delivery & Metrics',
      progress: 100,
      description:
        'Testing, final adjustments, and monitoring with analytics and A/B testing to validate product impact.',
      ai: 'Automated evals and continuous monitoring with agents',
    },
  ],

  projects: [
    {
      title: 'GolfHub',
      meta: 'Sports · Case Study',
      categories: ['Product', 'Prototype', '3D'],
      description:
        'A golf club proposal stalled at four screens in Figma. It became a members’ app and a club ERP you can use, with 21 clickable screens and a 3D course. Read the case study →',
      image: '/cases/golfhub/card-en.webp',
      accent: '#38EB7F',
      highlight: 'Playable prototype, 3D course',
      href: '/work/golfhub/',
    },
    {
      title: 'Lead Airport',
      meta: 'EdTech · Case Study',
      categories: ['Product', '3D', 'Data'],
      description:
        'The lead table on Tutory’s sales-room TV became a live 3D airport: every lead is a plane that lands, qualified ones enter the hangar. three.js, real time and Smart TV — in one week. Read the case study →',
      image: '/cases/aeroporto/card-en.webp',
      accent: '#2456E6',
      href: '/work/aeroporto-de-leads/',
    },
    {
      title: 'Tutory: visual identity',
      meta: 'EdTech · Case Study',
      categories: ['Branding', 'Identity', '3D'],
      description:
        'Rebranding with archetypes: the brain rebuilt as architecture, palette, voice, a 37-slide interactive deck and six 3D gamification trophies. Read the case study →',
      image: '/cases/tutory-rebrand/card-en.webp',
      accent: '#C9A96E',
      href: '/work/tutory-rebrand/',
    },
    {
      title: 'Tutory: website',
      meta: 'EdTech · Case Study',
      categories: ['Web', 'SEO', 'Astro'],
      description:
        'From WordPress to a 14-page Astro website: migration with 301s, Lighthouse 100, Consent Mode v2 and ready to be cited by AIs. Read the case study →',
      image: '/cases/tutory-site/card-en.webp',
      accent: '#3B7BF5',
      href: '/work/tutory-site/',
    },
    {
      title: 'CuidaMe',
      meta: 'Health · Case Study',
      categories: ['Product', 'App', 'UX'],
      description:
        'Rescue of an app stuck for 2 years before me: in 1 week, workshop, redesign and 100% of the front end ready for beta, approved on the first try. See case study →',
      image: '/cases/cuidame/card-en.webp',
      accent: '#2FA98C',
      highlight: 'From redesign to production in 7 days',
      href: '/work/cuidame/',
    },
    {
      title: 'CareCloud',
      meta: 'Health-tech · Case Study',
      categories: ['Product', 'UX', 'Healthcare'],
      description:
        'Helping re-platform a US clinical suite from Adobe Flex to React: four months on-site in Miami, a five-person UX team and hi-fi flows tested with real doctors. Read the case study →',
      image: '/cases/carecloud/card-en.webp',
      accent: '#1E8FD5',
      href: '/work/carecloud/',
    },
    {
      title: 'Resilience Dynamic',
      meta: 'Wellbeing · Case Study',
      categories: ['Product', 'UX', 'Prototype'],
      description:
        'I designed the resilience app for an Edinburgh consultancy, and it launched. Then I took my Figma file to a 15-screen prototype you can actually use, with the missing screens designed. Read the case study →',
      image: '/cases/resilience-engine/card-en.webp',
      accent: '#7C7FF2',
      highlight: 'Launched app, interactive prototype',
      href: '/work/resilience-engine/',
    },
    {
      title: 'Finby',
      meta: 'Fintech · Case Study',
      categories: ['Product', 'UI', 'Prototype'],
      description:
        'Saving up with friends, with nobody chasing payments in the group chat. I took the app I designed from Figma to a prototype you can use on a phone: 12 screens, from invite to payout, built solo in days. Read the case study →',
      image: '/cases/finby/card-en.webp',
      accent: '#7552F5',
      highlight: 'Clickable prototype, invite to payout',
      href: '/work/finby/',
    },
    {
      title: 'Action247',
      meta: 'Sports · Case Study',
      categories: ['Product', 'UI', 'UX'],
      description:
        'A free sports prediction game with real cash prizes. I designed the whole product to feel like a sportsbook without ever asking for a bet, from the lobby to the trophy. Read the case study →',
      image: '/cases/action247/card-en.webp',
      accent: '#14A85C',
      href: '/work/action247/',
    },
    {
      title: 'HyperGestor',
      meta: 'Automotive · Case Study',
      categories: ['Product', 'Branding', 'Web'],
      description:
        'An ERP with an agentic CRM for car dealerships. On my own, I did the brand, the website and the system redesign, from Figma to code in production. Each lead lives in one panel, with WhatsApp and AI inside. Read the case study →',
      image: '/cases/hypergestor/card-en.webp',
      accent: '#F48220',
      highlight: 'Brand, website and ERP · one person',
      href: '/work/hypergestor/',
    },
    {
      title: 'VESS Studio',
      meta: 'Wellness · Case Study',
      categories: ['Product', 'App', 'Web'],
      description:
        'A premium Pilates studio swapped rented software for its own: website, store-published app, management for both studios and automatic billing. Solo, from proposal to the App Store, in twelve weeks. Read the case study →',
      image: '/cases/vess/card-en.webp',
      accent: '#d8b98a',
      href: '/work/vess/',
    },
    {
      title: 'Kia Telluride LX',
      meta: 'Automotive · Landing Page',
      categories: ['Web', 'UI Design'],
      description:
        'Landing page for the Kia Telluride LX — layout, UI, and vehicle configuration experience.',
      image:
        'https://mir-s3-cdn-cf.behance.net/project_modules/1400/d71f1e232305417.6899fba2b8c0a.jpg',
      accent: '#7dd3fc',
    },
    {
      title: 'Autódromo Velocitta',
      meta: 'Sports · Web',
      categories: ['Branding', 'Web'],
      description:
        'Identity and digital presence for the racetrack — visual direction and site experience.',
      image:
        'https://mir-s3-cdn-cf.behance.net/project_modules/1400/a21511192194261.65d7923added2.jpg',
      accent: '#cff24a',
    },
    {
      title: 'Wevr Virtual Studio',
      meta: 'Product · US',
      categories: ['Product', 'UX'],
      description:
        'Interface and experience for Wevr’s VR production platform (WVS).',
      image:
        'https://mir-s3-cdn-cf.behance.net/project_modules/1400/564b87162267413.63d2af8b23687.jpg',
      accent: '#c4b5fd',
    },
    {
      title: 'The Blu · Wevr',
      meta: 'VR · US',
      categories: ['Design', 'Campaign'],
      description:
        'Campaign pieces for the 10th anniversary of The Blu VR series by Wevr.',
      image:
        'https://mir-s3-cdn-cf.behance.net/project_modules/1400/94765a162329377.63d3bfe0bb3fe.jpg',
      accent: '#38bdf8',
    },
    {
      title: 'ArtCaffé',
      meta: 'F&B · Kenya',
      categories: ['Branding', 'Digital'],
      description:
        'Visual direction and digital assets for the ArtCaffé café chain in Kenya.',
      image:
        'https://mir-s3-cdn-cf.behance.net/project_modules/1400/e9ff1b174188663.649d7e96c07e6.png',
      accent: '#6ee7b7',
    },
    {
      title: 'Odens',
      meta: 'Branding · UK',
      categories: ['Branding', 'Packaging'],
      description:
        'Brand identity and packaging design praised by the founders.',
      image:
        'https://mir-s3-cdn-cf.behance.net/projects/max_808/d07788191695833.Y3JvcCwzMTc1LDI0ODMsNDAwLDExNw.jpg',
      accent: '#fdba74',
    },
  ],

  clients: [
    'Mindtools', 'Mitsubishi', 'ServiceNow', 'Kineo', 'Tutory',
    'HyperGestor', 'Tako', 'Butterfly IO', 'Action247', 'CareCloud',
    'Monumenta', 'BRB', 'CAIXA', 'Banco do Brasil', 'KIA Motors',
    'Solomon', 'Autódromo Velocitta', 'Animalle', 'Grupo SOMA', 'Wevr',
    'Resilience Dynamic', 'Soluti', 'Sankhya', 'Cogmo Tecnologia',
    'Your Digital Media', 'Chris Corsini', 'Nomoo',
    'Brintel', 'Belo Monte', 'Altevita',
  ],

  testimonials: [
    {
      quote: 'Really cool! The copy turned out great, by the way. You have a magic touch… keep going!',
      author: 'J. C. Nery',
      company: 'Director of Innovation & Technology · Mitsubishi',
      logo: '/logos/mitsubishi.svg',
      tag: 'UI/UX',
    },
    {
      quote: '…here we are now with you doing visionary prototyping and all kind of other really great stuff. I’ve really enjoyed working with you and the whole team. Keep up the good work!',
      author: 'Michaela Heigl, PhD',
      company: 'Director · Mindtools',
      logo: 'https://outboundpartners.com/wp-content/uploads/2025/09/MindTools-Logo.png',
      tag: 'App Design',
    },
    {
      quote: 'Man, this new version is stunning. Congrats — you nailed it!',
      author: 'Fernando Cardoso',
      company: 'CEO HyperGestor · Head of Innovation, Mitsubishi Motors',
      logo: 'https://www.hypergestor.com.br/templates/hypergestor/images/hypergestor-light-mode-CdjvtdrG.svg',
      tag: 'Dashboard',
    },
    {
      quote: 'Well done! For me they capture the meaning of the brand in a playful, non-threatening way that just kind of pulls you in and makes you want to learn. It’s a big improvement on our first efforts.',
      author: 'Jonny',
      company: 'CEO · Odens, UK',
      tag: 'UI/UX',
    },
    {
      quote: 'You did an amazing job on the website, the ideas, and the refinements. You truly are one of a kind, and I’m really happy you’re on the team. Congrats!',
      author: 'Cadu',
      company: 'Head of Marketing · Tutory',
      logo: 'https://www.tutory.com.br/tutory-logo-v2.svg',
      tag: 'Website',
    },
    {
      quote: "You've really made a difference! It's fantastic to see the work you guys are doing start to make an impact on actual revenue.",
      author: 'Kirsten',
      company: 'Head of Product · Mindtools',
      logo: 'https://outboundpartners.com/wp-content/uploads/2025/09/MindTools-Logo.png',
      tag: 'App Design',
    },
    {
      quote: 'Nice one, bro! Wow, I got goosebumps.',
      author: 'Marlom Andrade',
      company: 'CEO & Founder · Tutory',
      logo: 'https://www.tutory.com.br/tutory-logo-v2.svg',
      tag: 'Rebranding',
    },
    {
      quote: 'I really love these designs — very beautiful and I think the branding is on point! Everything feels cohesive to gently nudge the user on their learning journey.',
      author: 'Nial',
      company: 'QA Head · Mindtools',
      logo: 'https://outboundpartners.com/wp-content/uploads/2025/09/MindTools-Logo.png',
      tag: 'Design System',
    },
    {
      quote: 'The labels look spot on! I am really pleased with the whole package and I think that they will sell like crazy. Thanks to everyone — I really appreciate it.',
      author: 'Simon',
      company: 'Founder · Simple Snuff',
      tag: 'Packaging',
    },
    {
      quote: 'Oh my God, oh my God, oh my God. This is insane, Well!',
      author: 'Letícia Sousa',
      company: 'Marketing · Tutory',
      logo: 'https://www.tutory.com.br/tutory-logo-v2.svg',
      tag: 'Website',
    },
  ],

  faqs: [
    {
      q: 'Do you really do both design and development?',
      a: 'Yes. I own both sides: UX research and high-fidelity design, plus React/TypeScript implementation in production. This eliminates the handoff and drastically reduces delivery time.',
    },
    {
      q: 'Do you work remotely?',
      a: 'Yes. Based in Brasília, Brazil, and open to fully remote opportunities, including international — fluent English, with experience serving clients in the UK and US.',
    },
    {
      q: 'What does your workflow look like?',
      a: 'Discovery → Design → Development → Delivery. With feedback checkpoints at each stage and metrics (analytics, A/B testing) to validate product impact.',
    },
    {
      q: 'What technologies do you work with?',
      a: 'React, Next.js, TypeScript, Node.js, Tailwind, and REST/GraphQL integration on the dev side; Figma, design systems, and usability research on the design side.',
    },
    {
      q: 'How do you use AI in your work?',
      a: 'Far beyond code autocomplete. I work spec-driven: the specification becomes the source of truth, and orchestrated agents in multi-step flows (with MCP) turn it into code. I version and test prompts as code, optimize cost/tokens (caching and model routing), and use LLM-as-judge evals to ensure quality before deploy — integrating AI features directly into the product UI.',
    },
    {
      q: 'Are you a "vibe coder"? Just throw prompts and accept whatever comes out?',
      a: 'No. "Vibe coding" means requesting code and hoping it works. I do Design Engineering: I design the experience and implement it with production discipline — version-controlled and tested prompts, evals with CI gates before deploy, cost and token control, design system as the single source of truth, accessibility and performance. AI is a tool under engineering, not a crutch: I understand, review, and take responsibility for what goes to production.',
    },
  ],

  articles: [
    {
      title: 'Architecture for Designers',
      excerpt:
        'A 27-slide deck: build your own stack with Vite, Supabase, Claude Code, Git and Vercel — and turn localhost into an edge case hunter.',
      date: 'Aug 2026',
      source: 'Talk · Slides',
      tag: 'Architecture',
      href: '/talks/architecture-for-designers/',
    },
    {
      title: 'From UX/UI Design to Front-End Development: Embracing a New Chapter',
      excerpt:
        'My transition after 15+ years in UX/UI design to front-end — and why closing the gap between design and code became my focus.',
      date: 'Apr 2024',
      source: 'Medium',
      tag: 'Career',
      href: 'https://medium.com/@wellingtonmota/from-ux-ui-design-to-front-end-development-embracing-a-new-chapter-756f55de93df',
    },
    {
      title: 'Why you should try Hands-off UX/UI documentation like this…',
      excerpt:
        'A practical hands-off documentation method: user stories, acceptance criteria, and Given-When-Then scenarios to eliminate handoff noise with dev.',
      date: 'Apr 2024',
      source: 'Bootcamp · Medium',
      tag: 'Process',
      href: 'https://medium.com/design-bootcamp/level-up-your-ux-ui-game-why-you-should-do-hands-off-documentation-like-this-6233def429ae',
    },
  ],

  contact: {
    eyebrow: 'Let’s work together',
    heading: 'Let’s build',
    headingMuted: 'something memorable?',
    sub: 'Open to remote opportunities and projects. I respond within 24h.',
    cta: 'Get in touch',
    details: { email: 'Email', location: 'Location', status: 'Status' },
  },

  faqAside: {
    quote:
      'Didn’t find what you were looking for? Reach out — I’ll tell you everything about how I can help with your product.',
    metaLabel: 'Response time',
    metaValue: 'Within 24h',
  },

  footer: {
    mission:
      'Product Engineer who bridges design and code to deliver end-to-end digital products. Based in Brasília, open to the world.',
    badgeText: 'PRODUCT ENGINEER · DESIGN + CODE · OPEN TO PROJECTS · ',
    legal: `© ${new Date().getFullYear()} Wellington Mota. All rights reserved.`,
  },

  ui: {
    startProject: 'Start a project',
    openMenu: 'Open menu',
    viewExperience: 'View experience',
    talkToMe: 'Talk to me',
    socialLabel: 'Social',
    portfolioEdition: 'Portfolio — Ed. 2026',
    readArticle: 'Read article',
    viewAllMedium: 'See all on Medium →',
    sectionClients: { index: '01', label: 'Clients', title: 'Brands that', titleMuted: 'trust my work.' },
    sectionAbout: { index: '06', label: 'About me' },
    sectionServices: { index: '02', label: 'Services', title: 'From concept to', titleMuted: 'product, end to end.', caption: 'One professional to design and build your digital experience, no handoff.' },
    sectionProcess: { index: '03', label: 'How I work', title: 'A clear', titleMuted: 'process.', caption: 'From the first brief to delivery — with feedback and metrics at every stage.' },
    sectionWork: { index: '04', label: 'Featured projects', title: 'Where I left', titleMuted: 'my mark.', caption: 'Projects for major companies and institutions — from Brazil to the UK and US.' },
    sectionTestimonials: { index: '05', label: 'Testimonials', title: 'What they say', titleMuted: 'about the work.', caption: 'Real feedback from founders, CEOs, and product heads from Brazil, the UK, and US.' },
    sectionFaq: { index: '07', label: 'FAQ', title: 'Questions?', titleMuted: 'Answered.', caption: '' },
    sectionWriting: { index: '08', label: 'Writing & Code', title: 'Thinking out loud.', titleMuted: 'And shipping.', caption: 'Articles on Medium, code on GitHub — thinking and shipping side by side.' },
    sectionGithub: { index: '09', label: 'GitHub', title: 'Always', titleMuted: 'shipping.', caption: 'contributions in the last year', legendLess: 'Less', legendMore: 'More', cta: 'Follow on GitHub →' },
  },
};

export default en;
