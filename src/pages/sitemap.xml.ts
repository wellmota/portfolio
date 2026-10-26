import type { APIRoute } from 'astro';

const site = 'https://userexperience.com.br';

/* Gerado a partir das páginas que existem no build — assim o sitemap nunca
   lista uma URL que dá 404 nem esquece um case novo. */
const built = Object.keys(import.meta.glob('./**/*.astro'))
  .filter((f) => !f.includes('['))
  .map((f) => f.replace(/^\./, '').replace(/(index)?\.astro$/, '').replace(/([^/])$/, '$1/'));

/* HTML estático servido de /public */
const statics = ['/talks/architecture-for-designers/'];

const paths = new Set([...built, ...statics]);

/* Par EN/PT da mesma página, quando os dois existem */
function alternates(path: string) {
  const en = path.startsWith('/pt/') ? path.slice(3) : path;
  const pt = `/pt${en}`;
  if (!paths.has(en) || !paths.has(pt)) return '';
  return [
    `<xhtml:link rel="alternate" hreflang="en" href="${site}${en}" />`,
    `<xhtml:link rel="alternate" hreflang="pt" href="${site}${pt}" />`,
    `<xhtml:link rel="alternate" hreflang="x-default" href="${site}${en}" />`,
  ].join('');
}

export const GET: APIRoute = () => {
  const urls = [...paths]
    .sort()
    .map((p) => `<url><loc>${site}${p}</loc>${alternates(p)}</url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
