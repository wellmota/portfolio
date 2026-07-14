import en from './en';
import pt from './pt';
import type { SiteData } from './types';
import type { Locale } from './utils';

const locales: Record<Locale, SiteData> = { en, pt };

export function getSiteData(locale: Locale): SiteData {
  return locales[locale];
}

export { type SiteData } from './types';
export { type Locale, languages, defaultLocale, getLangFromUrl, getLocalePath } from './utils';
