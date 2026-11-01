/**
 * Página de serviços (/services/ e /pt/servicos/): o que eu faço por projeto, para empresas, startups e
 * empreendedores. Escrita para quem procura no Google ou pergunta a uma IA "quem pode desenhar meu app",
 * "como tirar um app do papel", "consultoria de UX". Toda prova aponta para um case do site.
 */
import type { Locale } from '../i18n';

export interface ServicesPage {
  seo: { title: string; description: string };
  hero: {
    kicker: string;
    title: string;
    titleMuted: string;
    lead: string;
    facts: string[];
    primary: string;
    secondary: string;
  };
  situations: {
    index: string;
    label: string;
    title: string;
    titleMuted: string;
    caption: string;
    items: { title: string; body: string; proof: string; href: string }[];
  };
  deliverables: {
    index: string;
    label: string;
    title: string;
    titleMuted: string;
    caption: string;
    items: { title: string; body: string }[];
  };
  proof: {
    index: string;
    label: string;
    title: string;
    titleMuted: string;
    caption: string;
    /** slugs dos cases, na ordem */
    cases: string[];
  };
  faqs: { q: string; a: string }[];
  breadcrumb: { home: string; page: string };
}

const pt: ServicesPage = {
  seo: {
    title: 'Designer de UX e produto freelancer: apps, sites e MVPs | Wellington Mota',
    description:
      'Contrate por projeto um designer de produto que também programa: diagnóstico de UX, design de apps e sites e MVPs da ideia ao ar. Brasil e exterior, remoto.',
  },
  hero: {
    kicker: 'Serviços · Projetos e freelance',
    title: 'Design de produto e UX',
    titleMuted: 'para tirar seu app ou site do papel.',
    lead: 'Atendo empresas, startups e empreendedores por projeto. Pesquiso, desenho e construo o produto, sem passar o design para outra equipe refazer: o que você aprova no protótipo é o que vai ao ar.',
    facts: ['15+ anos em design de produto', 'Do Figma ao código em produção', 'Clientes no Brasil, Reino Unido e EUA'],
    primary: 'Conversar no WhatsApp',
    secondary: 'Enviar e-mail',
  },
  situations: {
    index: '01',
    label: 'Para quem é',
    title: 'Quatro situações',
    titleMuted: 'em que eu entro.',
    caption: 'Cada uma com um case do site, para você ver como foi.',
    items: [
      {
        title: 'Você tem uma ideia de app ou sistema',
        body: 'Ajudo a decidir o que entra no MVP, desenho as telas e construo: app nas lojas, painel de gestão e site. Você valida com usuários reais antes de pagar pelo produto inteiro.',
        proof: 'VESS Studio: da proposta à App Store em 12 semanas',
        href: '/pt/work/vess/',
      },
      {
        title: 'Seu produto existe, mas a experiência trava',
        body: 'Faço o diagnóstico de UX (fluxos, heurísticas, dados de uso e conversas com quem usa), priorizo o que mais custa e redesenho. Se fizer sentido, eu mesmo implemento.',
        proof: 'CuidaMe: app parado havia 2 anos, pronto para beta em 7 dias',
        href: '/pt/work/cuidame/',
      },
      {
        title: 'Você precisa de um site que seja achado e venda',
        body: 'Site institucional ou landing page com design próprio, rápido e preparado para o Google e para as IAs: SEO técnico, dados estruturados e analytics com consentimento.',
        proof: 'Tutory: site novo em 63 dias, Lighthouse 100',
        href: '/pt/work/tutory-site/',
      },
      {
        title: 'Seu time precisa de design e front-end juntos',
        body: 'Entro como o designer que programa: design system, protótipos navegáveis para validar ou vender a ideia, e telas em React e TypeScript prontas para produção.',
        proof: 'HyperGestor: marca, site e ERP, por uma pessoa só',
        href: '/pt/work/hypergestor/',
      },
    ],
  },
  deliverables: {
    index: '02',
    label: 'O que você recebe',
    title: 'Entregas que',
    titleMuted: 'se usam.',
    caption: 'Você escolhe as etapas; nem todo projeto precisa de todas.',
    items: [
      {
        title: 'Diagnóstico de UX',
        body: 'Os problemas que mais custam ao produto, com evidência e ordem de prioridade, para decidir onde mexer primeiro.',
      },
      {
        title: 'Protótipo navegável',
        body: 'Não só imagens no Figma: um protótipo que se usa no celular e no computador, para testar com usuários ou apresentar a sócios e investidores.',
      },
      {
        title: 'Interface e design system',
        body: 'Telas de alta fidelidade e os componentes, cores e textos documentados, para o produto crescer sem perder a consistência.',
      },
      {
        title: 'Código em produção',
        body: 'Front-end em React, Next.js, Astro ou React Native (Expo), ligado ao back-end (Supabase ou a API que você já tem) e publicado.',
      },
      {
        title: 'SEO e performance',
        body: 'Páginas rápidas, acessíveis e com dados estruturados, para serem achadas no Google e citadas por assistentes de IA.',
      },
      {
        title: 'IA dentro do produto',
        body: 'Recursos com IA (assistentes, busca, automações) pensados para quem usa, com custo controlado e testes antes de ir ao ar.',
      },
    ],
  },
  proof: {
    index: '04',
    label: 'Projetos parecidos',
    title: 'Veja como',
    titleMuted: 'ficou.',
    caption: 'Cases com protótipo navegável, do problema ao resultado.',
    cases: ['vess', 'cuidame', 'golfhub', 'hypergestor', 'finby', 'metodo-oba', 'tutory-site', 'resilience-engine'],
  },
  faqs: [
    {
      q: 'Você trabalha como freelancer ou só em vaga fixa?',
      a: 'Os dois. Pego projetos fechados para empresas, startups e empreendedores, no Brasil e no exterior, e também topo vaga remota em time de produto.',
    },
    {
      q: 'Quanto custa?',
      a: 'Depende do escopo. Depois de uma conversa sobre o problema, mando uma proposta com escopo, etapas, prazo e valor. Se o orçamento for curto, começamos pelo que destrava mais: um diagnóstico de UX ou um protótipo para validar a ideia.',
    },
    {
      q: 'Quanto tempo leva?',
      a: 'Um diagnóstico de UX leva dias. Um protótipo navegável, de dias a poucas semanas. Um MVP com app, site e painel leva alguns meses: o VESS Studio, com tudo isso, saiu em doze semanas.',
    },
    {
      q: 'Você só desenha ou também programa?',
      a: 'Os dois. Desenho no Figma e implemento em código (React, Next.js, Astro, React Native). Se você já tem time de desenvolvimento, entrego o design documentado e acompanho a implementação.',
    },
    {
      q: 'Preciso ter tudo definido para começar?',
      a: 'Não. Muita gente chega só com a ideia ou com as reclamações dos usuários. A primeira etapa é justamente transformar isso em escopo: para quem é, que problema resolve e o que entra primeiro.',
    },
    {
      q: 'Atende empresas de fora do Brasil?',
      a: 'Atendo. Já trabalhei para clientes do Reino Unido, dos Estados Unidos e do Quênia, em inglês e remoto, no fuso de Brasília (UTC−3).',
    },
    {
      q: 'Como começar?',
      a: 'Me manda uma mensagem no WhatsApp ou por e-mail contando o produto e o problema. Respondo em até 24 horas e marcamos uma conversa.',
    },
  ],
  breadcrumb: { home: 'Início', page: 'Serviços' },
};

const en: ServicesPage = {
  seo: {
    title: 'Freelance UX & Product Designer: apps, websites and MVPs | Wellington Mota',
    description:
      'Hire a product designer who also codes, by project: UX audits, app and website design, and MVPs from idea to launch. Remote, for companies and founders worldwide.',
  },
  hero: {
    kicker: 'Services · Projects & freelance',
    title: 'Product design and UX',
    titleMuted: 'to get your app or website off the ground.',
    lead: 'I work with companies, startups and founders by project. I research, design and build the product, with no handoff to another team that redoes the design: what you approve in the prototype is what goes live.',
    facts: ['15+ years in product design', 'From Figma to code in production', 'Clients in Brazil, the UK and the US'],
    primary: 'Email me',
    secondary: 'WhatsApp',
  },
  situations: {
    index: '01',
    label: 'Who it is for',
    title: 'Four situations',
    titleMuted: 'where I come in.',
    caption: 'Each one with a case study on this site, so you can see how it went.',
    items: [
      {
        title: 'You have an idea for an app or system',
        body: 'I help decide what goes into the MVP, design the screens and build it: a store-published app, an admin panel and a website. You validate with real users before paying for the whole product.',
        proof: 'VESS Studio: from proposal to the App Store in 12 weeks',
        href: '/work/vess/',
      },
      {
        title: 'Your product exists, but the experience gets in the way',
        body: 'I run a UX audit (flows, heuristics, usage data and talks with users), rank what costs the most and redesign it. When it makes sense, I implement it myself.',
        proof: 'CuidaMe: an app stuck for 2 years, ready for beta in 7 days',
        href: '/work/cuidame/',
      },
      {
        title: 'You need a website that gets found and sells',
        body: 'A custom-designed company site or landing page, fast and ready for Google and AI assistants: technical SEO, structured data and consent-based analytics.',
        proof: 'Tutory: new website in 63 days, Lighthouse 100',
        href: '/work/tutory-site/',
      },
      {
        title: 'Your team needs design and front-end together',
        body: 'I join as the designer who codes: a design system, interactive prototypes to validate or sell the idea, and screens in React and TypeScript ready for production.',
        proof: 'HyperGestor: brand, website and ERP, by one person',
        href: '/work/hypergestor/',
      },
    ],
  },
  deliverables: {
    index: '02',
    label: 'What you get',
    title: 'Deliverables',
    titleMuted: 'people use.',
    caption: 'You pick the stages; not every project needs all of them.',
    items: [
      {
        title: 'UX audit',
        body: 'The problems that cost your product the most, with evidence and a priority order, so you know where to start.',
      },
      {
        title: 'Interactive prototype',
        body: 'Not just Figma images: a prototype you can use on a phone and a computer, to test with users or show to partners and investors.',
      },
      {
        title: 'Interface and design system',
        body: 'High-fidelity screens plus documented components, colors and copy, so the product can grow without losing consistency.',
      },
      {
        title: 'Code in production',
        body: 'Front-end in React, Next.js, Astro or React Native (Expo), connected to the back end (Supabase or the API you already have) and shipped.',
      },
      {
        title: 'SEO and performance',
        body: 'Fast, accessible pages with structured data, so they get found on Google and cited by AI assistants.',
      },
      {
        title: 'AI inside the product',
        body: 'AI features (assistants, search, automations) designed for the people who use them, with controlled cost and tests before release.',
      },
    ],
  },
  proof: {
    index: '04',
    label: 'Similar projects',
    title: 'See how',
    titleMuted: 'it turned out.',
    caption: 'Case studies with interactive prototypes, from problem to result.',
    cases: ['vess', 'cuidame', 'golfhub', 'hypergestor', 'finby', 'metodo-oba', 'tutory-site', 'resilience-engine'],
  },
  faqs: [
    {
      q: 'Do you work freelance or only full-time?',
      a: 'Both. I take fixed-scope projects for companies, startups and founders, in Brazil and abroad, and I am also open to remote roles on product teams.',
    },
    {
      q: 'How much does it cost?',
      a: 'It depends on the scope. After a conversation about the problem, I send a proposal with scope, stages, timeline and price. On a tight budget, we start with what unblocks the most: a UX audit or a prototype to validate the idea.',
    },
    {
      q: 'How long does it take?',
      a: 'A UX audit takes days. An interactive prototype, from days to a few weeks. An MVP with an app, a website and an admin panel takes a few months: VESS Studio, with all of that, shipped in twelve weeks.',
    },
    {
      q: 'Do you only design, or do you code too?',
      a: 'Both. I design in Figma and build in code (React, Next.js, Astro, React Native). If you already have a development team, I deliver documented design and follow the implementation.',
    },
    {
      q: 'Do I need everything defined to start?',
      a: 'No. Many people come with just the idea or a list of user complaints. The first stage is turning that into scope: who it is for, what problem it solves and what comes first.',
    },
    {
      q: 'Do you work with companies outside Brazil?',
      a: 'Yes. I have worked for clients in the UK, the US and Kenya, in English and remotely, on Brasília time (UTC−3).',
    },
    {
      q: 'How do we start?',
      a: 'Send me an email or a WhatsApp message about the product and the problem. I reply within 24 hours and we set up a call.',
    },
  ],
  breadcrumb: { home: 'Home', page: 'Services' },
};

const services: Record<Locale, ServicesPage> = { pt, en };
export default services;
