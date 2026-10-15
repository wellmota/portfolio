// Screenshot de páginas com o Google Chrome instalado (espera real, cliques opcionais).
// Uso: node scripts/shoot.mjs '<json>'  onde json = {url, out, width, height, wait, fullPage, clicks:[{sel, wait}], hide:[sel]}
import puppeteer from 'puppeteer-core';
const CH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const jobs = JSON.parse(process.argv[2]);
const browser = await puppeteer.launch({ executablePath: CH, headless: 'new', args: ['--hide-scrollbars', '--disable-blink-features=AutomationControlled', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
try {
  for (const j of Array.isArray(jobs) ? jobs : [jobs]) {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36');
    await page.evaluateOnNewDocument(() => { Object.defineProperty(navigator, 'webdriver', { get: () => false }); });
    await page.setViewport({ width: j.width ?? 1440, height: j.height ?? 900, deviceScaleFactor: j.scale ?? 1 });
    await page.goto(j.url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, j.wait ?? 3000));
    for (const c of j.clicks ?? []) {
      try { await page.click(c.sel); } catch (e) { console.log('click failed:', c.sel); }
      await new Promise((r) => setTimeout(r, c.wait ?? 1200));
    }
    for (const h of j.hide ?? []) await page.evaluate((s) => document.querySelectorAll(s).forEach((el) => (el.style.visibility = 'hidden')), h).catch(() => {});
    if (j.scrollTo) await page.evaluate((y) => window.scrollTo(0, y), j.scrollTo);
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: j.out, fullPage: !!j.fullPage });
    console.log('saved', j.out);
    await page.close();
  }
} finally {
  await browser.close();
}
