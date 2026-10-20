import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';
import { gilroy } from './theme';

// Gilroy (licença comercial): os arquivos ficam em public/tutory/fonts, fora do git.
const weights: Array<[string, string]> = [
  ['Light', '300'],
  ['Regular', '400'],
  ['Medium', '500'],
  ['SemiBold', '600'],
  ['Bold', '700'],
];

export const gilroyReady = Promise.all(
  weights.map(([name, weight]) =>
    loadFont({ family: gilroy, url: staticFile(`tutory/fonts/Gilroy-${name}.woff`), weight, format: 'woff' }),
  ),
);
