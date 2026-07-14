export const languages = { en: 'English', pt: 'Português' } as const;
export type Locale = keyof typeof languages;
export const defaultLocale: Locale = 'en';

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Locale;
  return defaultLocale;
}

export function getLocalePath(locale: Locale, hash = ''): string {
  const base = locale === defaultLocale ? '/' : `/${locale}/`;
  return base + hash;
}
