// Renderiza várias composições com UM só Chrome aberto (o CLI relança o Chrome a cada
// composição e, com o Google Chrome do usuário aberto, a segunda conexão costuma estourar
// o timeout de 25 s). Uso: node scripts/render.mjs Storyboard-Product Cover CuidaMe-Editorial
import path from 'node:path';
import { bundle } from '@remotion/bundler';
import { openBrowser, renderMedia, renderStill, selectComposition } from '@remotion/renderer';

const BROWSER = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ids = process.argv.slice(2);
if (ids.length === 0) {
  console.error('passe os ids das composições');
  process.exit(1);
}

const t0 = Date.now();
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts'), onProgress: () => undefined });
console.log(`bundle ok (${((Date.now() - t0) / 1000).toFixed(1)}s)`);

const open = async (attempt = 1) => {
  try {
    return await openBrowser('chrome', { browserExecutable: BROWSER });
  } catch (err) {
    if (attempt >= 4) throw err;
    console.log(`chrome não conectou (tentativa ${attempt}), tentando de novo...`);
    await new Promise((r) => setTimeout(r, 3000));
    return open(attempt + 1);
  }
};
const browser = await open();
try {
  for (const id of ids) {
    const t = Date.now();
    const composition = await selectComposition({ serveUrl, id, puppeteerInstance: browser, browserExecutable: BROWSER, timeoutInMilliseconds: 300000 });
    const isStill = composition.durationInFrames === 1;
    const out = path.resolve('out', `${id.toLowerCase()}.${isStill ? 'png' : 'mp4'}`);
    if (isStill) {
      await renderStill({ composition, serveUrl, output: out, puppeteerInstance: browser, browserExecutable: BROWSER, imageFormat: 'png', timeoutInMilliseconds: 300000 });
    } else {
      let last = -1;
      await renderMedia({
        composition,
        serveUrl,
        codec: 'h264',
        concurrency: Number(process.env.CONCURRENCY ?? 2),
        outputLocation: out,
        puppeteerInstance: browser,
        browserExecutable: BROWSER,
        timeoutInMilliseconds: 300000,
        onProgress: ({ progress }) => {
          const p = Math.floor(progress * 10);
          if (p !== last) { last = p; process.stdout.write(`  ${id}: ${p * 10}%\n`); }
        },
      });
    }
    console.log(`${id} -> ${path.relative(process.cwd(), out)} (${((Date.now() - t) / 1000).toFixed(1)}s)`);
  }
} finally {
  await browser.close({ silent: true });
}
