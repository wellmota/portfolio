/**
 * Altura da página do protótipo num iframe da mesma origem, para a janela de desktop mostrá-la
 * inteira: a base do filho mais baixo do body (o scrollHeight nunca encolhe quando o iframe já é
 * mais alto que o conteúdo), nunca menos que 900 (a tela de 1440×900).
 *
 * O .main-content (e o .menu-sidebar do cozy) têm min-height: 100vh, e no iframe 100vh é a altura do
 * próprio iframe. Medida assim, a janela que cresceu uma vez (o CSS chegando depois do HTML deixa a
 * página sem estilo, com uns 5000 px) nunca mais encolhe. Por isso a medida zera esses mínimos por um
 * instante, no mesmo quadro: o protótipo não é desenhado assim e os ResizeObservers não disparam.
 * Devolve null fora da mesma origem ou com o documento ainda vazio.
 */
const SEM_MINIMO = '.main-content, .menu-sidebar { min-height: 0 !important; }';

export function alturaProto(iframe: HTMLIFrameElement): number | null {
  try {
    const doc = iframe.contentDocument;
    const win = iframe.contentWindow;
    if (!doc?.body || !win) return null;
    const st = doc.createElement('style');
    st.textContent = SEM_MINIMO;
    (doc.head ?? doc.documentElement).appendChild(st);
    let h = 0;
    try {
      for (const el of Array.from(doc.body.children) as HTMLElement[]) {
        if (win.getComputedStyle(el).position === 'fixed') continue;
        h = Math.max(h, el.getBoundingClientRect().bottom + win.scrollY);
      }
    } finally {
      st.remove();
    }
    return h > 300 ? Math.max(900, Math.ceil(h)) : null;
  } catch {
    return null; // outra origem
  }
}

/**
 * Chama `aoMudar` quando a página do protótipo muda de tamanho. Os filhos do body só avisam quando
 * crescem (presos em 100vh, não encolhem); o conteúdo dentro do .main-content avisa também quando
 * encolhe (o CSS do tema que chega depois, uma tela mais curta). Devolve null fora da mesma origem
 * ou com o documento ainda vazio.
 */
export function observarProto(iframe: HTMLIFrameElement, aoMudar: () => void): ResizeObserver | null {
  try {
    const doc = iframe.contentDocument;
    const win = iframe.contentWindow as (Window & typeof globalThis) | null;
    if (!doc?.body || !win || doc.URL === 'about:blank') return null;
    const ro = new (win.ResizeObserver ?? ResizeObserver)(aoMudar);
    ro.observe(doc.body);
    Array.from(doc.body.children).forEach((el) => ro.observe(el));
    doc.querySelectorAll('.main-content > *').forEach((el) => ro.observe(el));
    return ro;
  } catch {
    return null; // outra origem
  }
}
