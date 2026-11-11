// Avisa Bing, Yandex, Seznam e Naver (via IndexNow) que páginas do site mudaram.
// O Bing alimenta a busca do ChatGPT e do Copilot, então isso acelera a chegada
// do conteúdo novo nas respostas das IAs. O Google não usa IndexNow: para ele,
// use o Search Console (sitemap já enviado).
//
// Uso, depois do deploy:  node scripts/indexnow.mjs            (todas as URLs do NECROX)
//                         node scripts/indexnow.mjs <url> ...  (só as URLs passadas)

const HOST = 'userexperience.com.br';
const KEY = 'ecc3c3635f5e94c302d57020e7d21fbf'; // a mesma chave está em public/ecc3c3635f5e94c302d57020e7d21fbf.txt
const SITEMAP = 'https://' + HOST + '/necrox/sitemap-0.xml';

let urls = process.argv.slice(2);
if (urls.length === 0) {
  const xml = await (await fetch(SITEMAP)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  urls.push('https://' + HOST + '/necrox/llms.txt', 'https://' + HOST + '/');
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: 'https://' + HOST + '/' + KEY + '.txt', urlList: urls }),
});
console.log('IndexNow: HTTP ' + res.status + ' para ' + urls.length + ' URL(s)');
if (res.status >= 400) console.log(await res.text());
