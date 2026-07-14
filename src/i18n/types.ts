export interface SiteData {
  profile: {
    name: string;
    firstName: string;
    role: string;
    roleAi: string;
    tagline: string;
    location: string;
    timezone: string;
    email: string;
    phone: string;
    available: boolean;
    availableText: string;
  };
  nav: { label: string; href: string }[];
  socials: { label: string; href: string }[];
  heroStats: { headline: string; label: string; sub: string };
  stats: { value: string; label: string }[];
  about: {
    eyebrow: string;
    image: string;
    heading: string;
    body: string[];
    signatureRole: string;
  };
  marquee: string[];
  services: {
    index: string;
    icon: string;
    title: string;
    metaLeft: string;
    badge: string;
    points: string[];
    ai: string;
  }[];
  process: {
    step: string;
    title: string;
    progress: number;
    description: string;
    ai: string;
  }[];
  projects: {
    title: string;
    meta: string;
    categories: string[];
    description: string;
    image: string;
    accent: string;
  }[];
  clients: string[];
  testimonials: {
    quote: string;
    author: string;
    company: string;
    logo: string;
  }[];
  faqs: { q: string; a: string }[];
  articles: {
    title: string;
    excerpt: string;
    date: string;
    source: string;
    tag: string;
    href: string;
  }[];
  contact: {
    eyebrow: string;
    heading: string;
    sub: string;
    cta: string;
  };
  faqAside: {
    quote: string;
    metaLabel: string;
    metaValue: string;
  };
  footer: {
    mission: string;
    badgeText: string;
    legal: string;
  };
  ui: {
    startProject: string;
    openMenu: string;
    viewExperience: string;
    talkToMe: string;
    viewFullCv: string;
    socialLabel: string;
    portfolioEdition: string;
    readArticle: string;
    sectionClients: { index: string; label: string; title: string; titleMuted: string };
    sectionAbout: { index: string; label: string };
    sectionServices: { index: string; label: string; title: string; titleMuted: string; caption: string };
    sectionProcess: { index: string; label: string; title: string; titleMuted: string; caption: string };
    sectionWork: { index: string; label: string; title: string; titleMuted: string; caption: string };
    sectionTestimonials: { index: string; label: string; title: string; titleMuted: string; caption: string };
    sectionFaq: { index: string; label: string; title: string; titleMuted: string; caption: string };
    sectionWriting: { index: string; label: string; title: string; titleMuted: string; caption: string };
  };
}
