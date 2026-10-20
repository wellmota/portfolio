// Renderiza quadros avulsos de uma composição (QA) com um só Chrome aberto.
// Uso: node scripts/stills.mjs Tutory-Teaser 30 120 300 ...  → out/qa/<id>-f0120.png
import path from 'node:path';
import fs from 'node:fs';
import { bundle } from '@remotion/bundler';
import { openBrowser, renderStill, selectComposition } from '@remotion/renderer';

const BROWSER = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [id, ...frames] = process.argv.slice(2);
if (!id || frames.length === 0) { console.error('uso: node scripts/stills.mjs <id> <frame...>'); process.exit(1); }
fs.mkdirSync(path.resolve('out/qa'), { recursive: true });
const t0 = Date.now();
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts'), onProgress: () => undefined });
console.log(`bundle ok (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
const open = async (attempt = 1) => {
  try { return await openBrowser('chrome', { browserExecutable: BROWSER }); }
  catch (err) { if (attempt >= 4) throw err; await new Promise((r) => setTimeout(r, 3000)); return open(attempt + 1); }
};
const browser = await open();
try {
  const composition = await selectComposition({ serveUrl, id, puppeteerInstance: browser, browserExecutable: BROWSER, timeoutInMilliseconds: 300000 });
  console.log(`${id}: ${composition.durationInFrames} quadros, ${composition.width}x${composition.height}`);
  for (const f of frames) {
    const out = path.resolve('out/qa', `${id.toLowerCase()}-f${String(f).padStart(4, '0')}.png`);
    await renderStill({ composition, serveUrl, output: out, frame: +f, puppeteerInstance: browser, browserExecutable: BROWSER, imageFormat: 'png', timeoutInMilliseconds: 300000 });
    console.log('ok', path.relative(process.cwd(), out));
  }
} finally {
  await browser.close({ silent: true });
}
