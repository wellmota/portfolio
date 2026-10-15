// Tokens compartilhados com o portfólio (src/styles/global.css) e com o app CuidaMe.
export const portfolio = {
  ink: '#0a0a0a',
  surface: '#101010',
  surface2: '#151515',
  line: '#232323',
  lineStrong: '#3a3a3a',
  cream: '#ededed',
  mist: '#8c8c92',
  faint: '#5a5a60',
  lime: '#cff24a',
};

export const cuidame = {
  accent: '#2FA98C',
  forest: '#1B2D21',
  sage: '#a9c8a5',
  paper: '#f7f4ec',
  leaf: '#6ab982',
  gold: '#d1a95a',
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export type Variant = 'editorial' | 'product' | 'kinetic';

export type VariantStyle = {
  id: Variant;
  name: string;
  description: string;
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  line: string;
  bezel: 'none' | 'thin' | 'device';
  transitionFrames: number;
};

export const VARIANTS: Record<Variant, VariantStyle> = {
  editorial: {
    id: 'editorial',
    name: 'Editorial',
    description: 'A cara do portfólio: fundo ink, tipografia gigante flush-left, cortes secos, telas sem moldura.',
    bg: portfolio.ink,
    fg: portfolio.cream,
    muted: portfolio.mist,
    accent: portfolio.lime,
    line: portfolio.line,
    bezel: 'thin',
    transitionFrames: 8, // corte curto: 1 frame deixava 2 frames pretos (a cena nova entra de opacidade 0)
  },
  product: {
    id: 'product',
    name: 'Product',
    description: 'A cara do CuidaMe: papel e verde-floresta, iPhones com moldura e sombra, crossfades suaves.',
    bg: cuidame.paper,
    fg: cuidame.forest,
    muted: '#6f7d72',
    accent: cuidame.accent,
    line: '#d9d4c7',
    bezel: 'device',
    transitionFrames: 14,
  },
  kinetic: {
    id: 'kinetic',
    name: 'Kinetic',
    description: 'Verde-floresta escuro, letras em cascata, números que contam, telas deslizando com slides laterais.',
    bg: cuidame.forest,
    fg: cuidame.paper,
    muted: cuidame.sage,
    accent: portfolio.lime,
    line: '#2f4a3a',
    bezel: 'device',
    transitionFrames: 8,
  },
};
