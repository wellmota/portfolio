// Ajustes de autoria e data no build estático do NECROX (public/necrox/).
//
// O NECROX é gerado num projeto Astro separado e copiado pronto para cá. Este
// script reaplica, sobre esse HTML pronto, o que precisa existir para o Google,
// para as IAs e para o cadastro de agente cultural (CEAC):
//   - autoria com nome civil completo e cidade (rodapé, home, JSON-LD, llms.txt)
//   - data de publicação visível na home e nos guias
//   - Vercel Web Analytics (sem cookies, sem dados pessoais) e o texto do site
//     trocado de "sem rastreio" para "sem cookies", para não prometer o que não é
//
// É idempotente: rodar duas vezes não duplica nada. Depois de copiar um build
// novo do NECROX para public/necrox/, rode:  node scripts/necrox-postbuild.mjs
// O ideal é levar estas mudanças para o código-fonte do NECROX e aposentar o script.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('../public/necrox/', import.meta.url).pathname;
const NOME = 'Wellington Oliveira da Mota';
const CIDADE = 'Brasília-DF';
const PUBLICADO_ISO = '2026-11-04';
const PUBLICADO_MES = 'novembro de 2026';

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === '_astro' ? [] : htmlFiles(p);
    return f.endsWith('.html') ? [p] : [];
  });
}

let changed = 0;
for (const file of htmlFiles(ROOT)) {
  let h = readFileSync(file, 'utf8');
  const before = h;

  // 1. JSON-LD: nome civil completo e cidade no Person do M3Ink
  h = h.replace(
    '"alternateName":"Wellington Mota"',
    `"alternateName":["Wellington Mota","${NOME}"],"homeLocation":{"@type":"Place","name":"Brasília, Distrito Federal, Brasil"}`,
  );

  // 2. Rodapé: autoria com nome completo
  h = h.replace(
    /(<span class="mono"[^>]*>© 2026 NECROX \/ M3Ink)(<\/span>)/,
    `$1 · ${NOME}, ${CIDADE}$2`,
  );

  // 3. Guias: linha "Publicado" ao lado de "Atualizado"
  if (!h.includes('>Publicado</dt>')) h = h.replace(
    /<div( data-astro-cid-[a-z0-9]+)><dt( data-astro-cid-[a-z0-9]+)>Atualizado<\/dt>/,
    (m, a, b) =>
      `<div${a}><dt${b}>Publicado</dt><dd${b}><time datetime="${PUBLICADO_ISO}"${b}>${PUBLICADO_MES}</time></dd></div>${m}`,
  );

  // 4. Home: data de publicação e autor logo abaixo do texto de abertura
  if (file === join(ROOT, 'index.html') && !h.includes('Publicado em')) {
    h = h.replace(
      /(<p class="hero__lede[^"]*"[^>]*>.*?<\/p>)/s,
      `$1<p class="mono" style="margin-top:1rem;font-size:.8rem;opacity:.75">Publicado em <time datetime="${PUBLICADO_ISO}">${PUBLICADO_MES}</time> por ${NOME} (M3Ink), ${CIDADE}.</p>`,
    );
  }

  // 5. Vercel Web Analytics: contagem de visitas sem cookies.
  //    Precisa estar ligado no painel da Vercel (projeto portfolio → Analytics).
  if (!h.includes('/_vercel/insights/script.js')) {
    h = h.replace(
      '</head>',
      '<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};</script><script defer src="/_vercel/insights/script.js"></script></head>',
    );
  }

  // 6. A promessa do site passa a ser "sem cookies"
  h = h.replaceAll('Sem rastreio.', 'Sem cookies.').replaceAll('sem rastreio', 'sem cookies');

  if (h !== before) {
    writeFileSync(file, h);
    changed++;
  }
}

// 7. llms.txt, llms-full.txt e Markdown dos guias: nome civil e "sem cookies"
const textos = ['llms.txt', 'llms-full.txt', ...readdirSync(join(ROOT, 'guias')).filter((f) => f.endsWith('.md')).map((f) => 'guias/' + f)];
for (const f of textos) {
  const p = join(ROOT, f);
  const t = readFileSync(p, 'utf8');
  let n = t.includes(NOME) ? t : t.replace('por M3Ink, artista visual', `por M3Ink (${NOME}, ${CIDADE}), artista visual`);
  n = n.replaceAll('sem rastreio', 'sem cookies').replaceAll('Sem rastreio', 'Sem cookies');
  if (n !== t) {
    writeFileSync(p, n);
    changed++;
  }
}

console.log(`necrox-postbuild: ${changed} arquivo(s) atualizado(s)`);
