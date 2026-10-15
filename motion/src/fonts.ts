import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

// Fontes locais (public/fonts), para o render não depender da rede do Chrome.
export const inter = 'Inter';
export const mono = 'JetBrains Mono';
export const gothic = 'UnifrakturCook';

const files: Array<[string, string, string]> = [
  [inter, 'Inter-400.woff2', '400'],
  [inter, 'Inter-500.woff2', '500'],
  [inter, 'Inter-700.woff2', '700'],
  [mono, 'JetBrainsMono-400.woff2', '400'],
  [mono, 'JetBrainsMono-500.woff2', '500'],
  [gothic, 'UnifrakturCook-Bold.woff2', '700'],
];

export const fontsReady = Promise.all(
  files.map(([family, file, weight]) => loadFont({ family, url: staticFile(`fonts/${file}`), weight })),
);
