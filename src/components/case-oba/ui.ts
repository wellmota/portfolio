// Textos fixos dos componentes do case do Método OBA, nas duas línguas do portfólio. Cada componente
// lê a língua da URL (Astro.currentLocale: /pt/... é 'pt', o resto é 'en'), sem precisar receber prop.
// O protótipo em si (o iframe) é o produto real, em português, nas duas versões.

const PT = {
  viewIn: 'Ver em',
  desktop: 'Desktop',
  phone: 'Celular',
  theme: 'Tema',
  themes: { cozy: 'Cozy', 'tatico-escuro': 'Tático escuro', 'tatico-claro': 'Tático claro' } as Record<string, string>,
  themeLong: { cozy: 'Tema Cozy', 'tatico-escuro': 'Tema Tático escuro', 'tatico-claro': 'Tema Tático claro' } as Record<string, string>,
  rank: 'Patente',
  rankColor: (nome: string) => `Cor da patente ${nome}`,
  research: 'Pesquisa',
  heuristic: 'Heurística',
  number: 'Nº',
  noRhythm: 'sem ritmo',
  evenSpace: 'espaço igual',
};

type Ui = typeof PT;

const EN: Ui = {
  viewIn: 'View on',
  desktop: 'Desktop',
  phone: 'Phone',
  theme: 'Theme',
  themes: { cozy: 'Cozy', 'tatico-escuro': 'Tactical dark', 'tatico-claro': 'Tactical light' },
  themeLong: { cozy: 'Cozy theme', 'tatico-escuro': 'Tactical dark theme', 'tatico-claro': 'Tactical light theme' },
  rank: 'Rank',
  rankColor: (nome: string) => `${nome} rank color`,
  research: 'Research',
  heuristic: 'Heuristic',
  number: 'No.',
  noRhythm: 'no rhythm',
  evenSpace: 'even spacing',
};

export const ui = (locale?: string): Ui => (locale === 'pt' ? PT : EN);
