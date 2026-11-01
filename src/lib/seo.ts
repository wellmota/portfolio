/**
 * SEO compartilhado pelos dois layouts: o grafo JSON-LD (pessoa, site e serviço), o hreflang de cada
 * página e os links de contato. O grafo usa @id fixos para o Google e as IAs ligarem as páginas à mesma
 * pessoa: cada case aponta para #person como autor, e o serviço aponta para #person como quem presta.
 */
import { getSiteData, getLocalePath, type Locale } from '../i18n';

export const SITE = 'https://userexperience.com.br';
export const PERSON_ID = `${SITE}/#person`;
export const WEBSITE_ID = `${SITE}/#website`;
export const SERVICE_ID = `${SITE}/#service`;

/** Mesmo número da página do livro */
const WHATSAPP = '5561981043296';

export const servicesPath = (lang: Locale) => (lang === 'pt' ? '/pt/servicos/' : '/services/');

export function whatsappHref(lang: Locale) {
  const msg =
    lang === 'pt'
      ? 'Olá, Wellington! Vim pelo seu site e quero conversar sobre um projeto.'
      : 'Hi Wellington! I found your website and would like to talk about a project.';
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

export function mailtoHref(lang: Locale, email: string) {
  const subject = lang === 'pt' ? 'Projeto: ' : 'Project: ';
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

/** Par EN/PT da mesma página, a partir do caminho (todas as páginas existem nos dois idiomas, menos o livro) */
export function alternatesFor(pathname: string) {
  let en = pathname.replace(/^\/pt(?=\/)/, '') || '/';
  if (en === '/servicos/') en = '/services/';
  const pt = en === '/services/' ? '/pt/servicos/' : `/pt${en}`;
  return { en, pt };
}

/** Os serviços como o cliente procura, para o OfferCatalog */
const offers: Record<Locale, { name: string; description: string }[]> = {
  pt: [
    {
      name: 'Diagnóstico de UX',
      description:
        'Análise de um app, site ou sistema que já existe: fluxos, heurísticas, dados de uso e conversas com usuários, com os problemas priorizados pelo que mais custam.',
    },
    {
      name: 'Design de app e de site',
      description:
        'Pesquisa, arquitetura de informação, protótipo navegável e telas de alta fidelidade para apps, sites e sistemas web.',
    },
    {
      name: 'MVP do zero',
      description:
        'Da ideia ao produto no ar: escopo do MVP, design e código (app nas lojas, painel de gestão e site), por uma pessoa só.',
    },
    {
      name: 'Site institucional e landing page',
      description:
        'Site rápido e com design próprio, preparado para o Google e para assistentes de IA: SEO técnico, dados estruturados e analytics com consentimento.',
    },
    {
      name: 'Design system e front-end',
      description:
        'Componentes, tokens e documentação, implementados em React, Next.js, Astro ou React Native, sem handoff entre design e código.',
    },
    {
      name: 'IA dentro do produto',
      description:
        'Recursos com IA (assistentes, busca, automações) desenhados para quem usa, com custo controlado e testes antes de ir ao ar.',
    },
  ],
  en: [
    {
      name: 'UX audit',
      description:
        'A review of an existing app, website or system: flows, heuristics, usage data and user conversations, with problems ranked by what they cost.',
    },
    {
      name: 'App and website design',
      description:
        'Research, information architecture, interactive prototypes and high-fidelity screens for apps, websites and web systems.',
    },
    {
      name: 'MVP from scratch',
      description:
        'From idea to a live product: MVP scope, design and code (store-published app, admin panel and website), by one person.',
    },
    {
      name: 'Website and landing page',
      description:
        'A fast, custom-designed website ready for Google and AI assistants: technical SEO, structured data and consent-based analytics.',
    },
    {
      name: 'Design system and front-end',
      description:
        'Components, tokens and documentation, built in React, Next.js, Astro or React Native, with no handoff between design and code.',
    },
    {
      name: 'AI features in your product',
      description:
        'AI features (assistants, search, automations) designed around the user, with controlled cost and tests before release.',
    },
  ],
};

const serviceDescription: Record<Locale, string> = {
  pt: 'Design de produto, UX e engenharia de front-end por projeto, para empresas, startups e empreendedores: diagnóstico de UX, design de apps e sites, e MVPs da ideia ao produto no ar.',
  en: 'Product design, UX and front-end engineering by project, for companies, startups and founders: UX audits, app and website design, and MVPs from idea to launch.',
};

/** Pessoa, site e serviço: vão em todas as páginas */
export function baseGraph(lang: Locale) {
  const data = getSiteData(lang);
  const sameAs = [
    ...data.socials.map((s) => s.href),
    'https://medium.com/@wellingtonmota',
  ].filter((h) => h.startsWith('http'));

  const person = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: data.profile.name,
    jobTitle: data.profile.role,
    description: data.profile.tagline,
    url: `${SITE}${getLocalePath(lang)}`,
    image: `${SITE}${data.about.image}`,
    email: `mailto:${data.profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Brasília',
      addressRegion: 'DF',
      addressCountry: 'BR',
    },
    knowsLanguage: ['pt-BR', 'en'],
    sameAs,
    knowsAbout: [
      'Product Design',
      'UX Design',
      'UX Research',
      'UX Audit',
      'UI Design',
      'Mobile App Design',
      'Website Design',
      'MVP Development',
      'Prototyping',
      'Design Systems',
      'Design Engineering',
      'Product Engineering',
      'Front-End Development',
      'React',
      'Next.js',
      'TypeScript',
      'React Native',
      'Astro',
      'Technical SEO',
      'AI Engineering',
      'Agent Orchestration',
      'RAG',
      'Prompt Engineering',
      'LLM Evaluation',
    ],
  };

  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE,
    name: data.profile.name,
    inLanguage: ['en', 'pt-BR'],
    publisher: { '@id': PERSON_ID },
  };

  const service = {
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: `${data.profile.name} — Product Design & Design Engineering`,
    url: `${SITE}${servicesPath(lang)}`,
    description: serviceDescription[lang],
    image: `${SITE}/og-image.png`,
    founder: { '@id': PERSON_ID },
    email: data.profile.email,
    address: person.address,
    areaServed: [{ '@type': 'Country', name: 'Brazil' }, 'Worldwide'],
    knowsLanguage: ['pt-BR', 'en'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: lang === 'pt' ? 'orçamentos' : 'sales',
      email: data.profile.email,
      url: whatsappHref(lang),
      availableLanguage: ['Portuguese', 'English'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: lang === 'pt' ? 'Serviços' : 'Services',
      itemListElement: offers[lang].map((o) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: o.name, description: o.description, provider: { '@id': PERSON_ID } },
      })),
    },
  };

  return [person, website, service];
}

interface PageInfo {
  lang: Locale;
  pathname: string;
  title: string;
  description: string;
  image: string;
}

/** Nós da página: um case vira CreativeWork com autor e trilha (Início → Projetos → case) */
export function pageGraph({ lang, pathname, title, description, image }: PageInfo) {
  if (!/\/work\/[^/]+\/$/.test(pathname)) return [];
  const url = `${SITE}${pathname}`;
  const home = `${SITE}${getLocalePath(lang)}`;
  const name = title.split(/\s[—|·]\s/)[0].trim();
  return [
    {
      '@type': 'CreativeWork',
      '@id': `${url}#case`,
      name,
      headline: title,
      description,
      url,
      image,
      inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
      genre: 'Case study',
      author: { '@id': PERSON_ID },
      creator: { '@id': PERSON_ID },
      isPartOf: { '@id': WEBSITE_ID },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: lang === 'pt' ? 'Início' : 'Home', item: home },
        { '@type': 'ListItem', position: 2, name: lang === 'pt' ? 'Projetos' : 'Work', item: `${home}#projetos` },
        { '@type': 'ListItem', position: 3, name, item: url },
      ],
    },
  ];
}

export function graphScript(nodes: object[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
