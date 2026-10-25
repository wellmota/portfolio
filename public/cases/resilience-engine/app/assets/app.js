/* Resilience Dynamic — shared runtime for every screen.
   Load order at the end of <body>: data.js → art.js → app.js → (page script).
   Hydrates: [data-icon], [data-art], [data-river], [data-wash], status bar, nav bar, [data-back].
   Helpers: RD.icon, RD.rag, RD.zoneChip, RD.renderRiver, RD.sheet, RD.toast, RD.store, RD.esc, RD.fmt. */
(function () {
  const RD = (window.RD = window.RD || {});
  const root = document.documentElement;

  /* ---------- Storage (never throws; private mode safe) ---------- */
  RD.store = {
    get(key, fallback = null) {
      try {
        const v = localStorage.getItem('rd:' + key);
        return v == null ? fallback : JSON.parse(v);
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem('rd:' + key, JSON.stringify(value));
      } catch (e) {}
    },
    remove(key) {
      try {
        localStorage.removeItem('rd:' + key);
      } catch (e) {}
    },
  };

  // the name typed at sign-up replaces the demo persona
  const signedUp = RD.store.get('user');
  if (signedUp && signedUp.name && RD.user) {
    const name = String(signedUp.name).trim().split(/\s+/)[0];
    Object.assign(RD.user, { name, fullName: String(signedUp.name).trim(), initials: name[0].toUpperCase() });
  }

  /* ---------- Icons (24px, 1.75 stroke, Lucide-derived, ISC) ---------- */
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
    today: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    chart: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    library: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
    journal: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-up-right': '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    minus: '<path d="M5 12h14"/>',
    play: '<path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" fill="currentColor" stroke="none"/>',
    pause: '<rect x="6" y="4" width="4" height="16" rx="1.2" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1.2" fill="currentColor" stroke="none"/>',
    'skip-back': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    'skip-fwd': '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    flag: '<path d="M4 22V4"/><path d="M4 4.5S5 3.5 8 3.5s5 2 8 2 4-1 4-1v11s-1 1-4 1-5-2-8-2-4 1-4 1"/>',
    sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    waves: '<path d="M2 7c.6.5 1.2 1 2.5 1C7 8 7 6 9.5 6c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 17c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    battery: '<rect width="16" height="10" x="2" y="7" rx="2"/><path d="M22 11v2"/><path d="M6 11v2M10 11v2"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    sliders: '<path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    video: '<rect width="20" height="16" x="2" y="4" rx="3"/><path d="m10 9 5 3-5 3z"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8M16 17H8M10 9H8"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    'trend-up': '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    'trend-down': '<path d="m22 17-8.5-8.5-5 5L2 7"/><path d="M16 17h6v-6"/>',
    footprints: '<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4M4 13h4"/>',
    eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
    'chart-plus': '<path d="M3 3v18h18"/><path d="M7 16v-3M11 16v-6M15 16v-4"/><path d="M19 3v6M16 6h6"/>',
    'battery-bolt': '<rect x="6" y="4" width="12" height="18" rx="2"/><path d="M10 2h4"/><path d="m13 8-3 5h4l-3 5"/>',
    bolt: '<path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2Z" fill="currentColor"/>',
    bars: '<path d="M6 20v-8M12 20V5M18 20v-5" stroke-width="3.2"/>',
    filter: '<path d="M4 7h16M7 12h10M10 17h4"/>',
    'flag-fill': '<path d="M5 21V4" stroke-width="2.2"/><path d="M5 4h13l-3 4.5 3 4.5H5" fill="currentColor"/>',
    'book-open': '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
    pill: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
    wind: '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>',
    walk: '<circle cx="13" cy="4" r="2"/><path d="m9 20 3-6 3 2v5"/><path d="m6 12 3-4 4 1 3 3 3 1"/><path d="m9 8-1 6"/>',
    edit: '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.4 2.6a2.1 2.1 0 1 1 3 3L12 15l-4 1 1-4Z"/>',
    rotate: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    apple: '<path fill="currentColor" stroke="none" d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.21 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.35-3.55zM14.18 6.13c.61-.74 1.02-1.76.91-2.78-.88.04-1.94.59-2.57 1.32-.56.65-1.06 1.69-.93 2.69.98.08 1.98-.5 2.59-1.23z"/>',
    microsoft: '<path fill="#F25022" stroke="none" d="M3 3h8.5v8.5H3z"/><path fill="#7FBA00" stroke="none" d="M12.5 3H21v8.5h-8.5z"/><path fill="#00A4EF" stroke="none" d="M3 12.5h8.5V21H3z"/><path fill="#FFB900" stroke="none" d="M12.5 12.5H21V21h-8.5z"/>',
    google: '<path fill="#4285F4" stroke="none" d="M21.6 12.23c0-.68-.06-1.36-.18-2.02H12v3.83h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.98-4.3 2.98-7.33z"/><path fill="#34A853" stroke="none" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.04.95-3.39.95-2.6 0-4.81-1.76-5.6-4.12H3.07v2.58A10 10 0 0 0 12 22z"/><path fill="#FBBC05" stroke="none" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.52H3.07a10 10 0 0 0 0 8.96L6.4 13.9z"/><path fill="#EA4335" stroke="none" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.86-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.52L6.4 10.1C7.19 7.74 9.4 5.98 12 5.98z"/>',
  };
  RD.icon = (name, cls = '') =>
    `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${P[name] || P.info}</svg>`;
  RD.icons = P;

  /* ---------- Formatting helpers ---------- */
  /* Escape anything a person typed before it goes into innerHTML */
  RD.esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  RD.fmt = {
    score: (v) => (Math.round(v * 10) / 10).toFixed(1),
    day: (d) => d.toLocaleDateString('en-GB', { weekday: 'short' }),
    date: (d) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
    mins: (m) => `${m} min`,
  };
  RD.greeting = () => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  };
  RD.zoneChip = (zone, text) =>
    `<span class="zone-chip" data-zone="${zone}">${text || RD.ZONES[zone].label}</span>`;

  /* Stacked RAG bar (Your Data). dist = { red, amber, green } in percent.
     Empty zones are dropped; small ones keep a minimum width so their label stays legible. */
  RD.rag = (dist, label = '') => {
    const zones = ['red', 'amber', 'green'].filter((z) => dist[z] > 0);
    const sr = `${label ? label + ': ' : ''}${dist.red}% red, ${dist.amber}% amber, ${dist.green}% green`;
    return `<div class="rag" role="img" aria-label="${RD.esc(sr)}">${zones
      .map(
        (z) =>
          `<span class="rag__seg" data-zone="${z}" style="flex:${dist[z]} 1 0">${dist[z]}%</span>`
      )
      .join('')}</div>`;
  };

  /* ---------- River gauge ----------
     <div class="river" data-river="3.4"></div>  (scale 1–6) */
  const WAVE =
    '<svg class="river__wave" viewBox="0 0 800 16" preserveAspectRatio="none" aria-hidden="true"><path d="M0 8 Q 50 0 100 8 T 200 8 T 300 8 T 400 8 T 500 8 T 600 8 T 700 8 T 800 8 V16 H0Z"/></svg>';
  RD.renderRiver = function (el, level) {
    const pct = ((Math.max(1, Math.min(6, level)) - 1) / 5) * 100;
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', `River level ${RD.fmt.score(level)} out of 6, ${RD.ZONES[RD.zone(level)].label}`);
    el.innerHTML = `
      <div class="river__water" style="--level:0%">${WAVE}${WAVE.replace('river__wave', 'river__wave river__wave--back')}</div>
      <div class="river__ticks" aria-hidden="true"><span>6</span><span>5</span><span>4</span><span>3</span><span>2</span><span>1</span></div>
      <div class="river__staff" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="river__mark" style="bottom:16px" aria-hidden="true"></div>`;
    const water = el.querySelector('.river__water');
    const mark = el.querySelector('.river__mark');
    const h = el.clientHeight - 32;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        water.style.setProperty('--level', `calc(16px + ${pct / 100} * (100% - 32px))`);
        mark.style.bottom = `${16 + (pct / 100) * h}px`;
      })
    );
  };

  /* ---------- Bottom sheet ----------
     <div class="sheet" id="x" role="dialog" aria-modal="true" aria-labelledby="…">…</div>
     <div class="sheet-backdrop" data-sheet-close></div>   (backdrop right after the sheet)
     RD.sheet.open(el, opener) traps nothing fancy: focuses the sheet, Esc / backdrop close it,
     and focus returns to the button that opened it. */
  RD.sheet = {
    open(el, opener) {
      el._opener = opener || document.activeElement;
      el.hidden = false;
      void el.offsetWidth; // let the slide-in start from the closed position
      requestAnimationFrame(() => {
        el.classList.add('is-open');
        const first = el.querySelector('[aria-checked="true"], button, [href], input');
        (first || el).focus({ preventScroll: true });
      });
      const back = el.nextElementSibling;
      if (back && back.classList.contains('sheet-backdrop')) back.classList.add('is-open');
    },
    close(el) {
      el.classList.remove('is-open');
      const back = el.nextElementSibling;
      if (back && back.classList.contains('sheet-backdrop')) back.classList.remove('is-open');
      if (el._opener) el._opener.focus({ preventScroll: true });
      // out of the tab order once the slide-out ends
      setTimeout(() => {
        if (!el.classList.contains('is-open')) el.hidden = true;
      }, 400);
    },
  };
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-sheet-close]');
    if (!c) return;
    const sheet = c.classList.contains('sheet-backdrop') ? c.previousElementSibling : c.closest('.sheet');
    if (sheet) RD.sheet.close(sheet);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.querySelector('.sheet.is-open');
    if (open) RD.sheet.close(open);
  });

  /* ---------- Toast ---------- */
  RD.toast = function (msg, icon = 'check') {
    const app = document.querySelector('.app') || document.body;
    let t = app.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      app.appendChild(t);
    }
    t.innerHTML = RD.icon(icon) + '<span></span>';
    t.lastChild.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('is-on'), 2200);
  };

  /* ---------- Chrome ---------- */
  const embedded = window.top !== window.self;
  let shot = false;
  try {
    if (new URLSearchParams(location.search).has('shot')) sessionStorage.setItem('rd:shot', '1');
    shot = sessionStorage.getItem('rd:shot') === '1';
  } catch (e) {}
  if (embedded) root.classList.add('is-embedded');
  const framed = !embedded && window.matchMedia('(min-width: 600px)').matches;
  if (embedded || framed || shot) root.classList.add('has-status');

  const theme = document.body.dataset.themeable != null ? RD.store.get('theme') : null;
  if (theme) root.dataset.theme = theme;

  const app = document.querySelector('.app');
  if (app && !document.body.hasAttribute('data-no-status')) {
    const sb = document.createElement('div');
    sb.className = 'statusbar';
    sb.setAttribute('aria-hidden', 'true');
    sb.innerHTML = `<span class="num">9:41</span><span class="statusbar__icons">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.4c2.2 0 4.2.85 5.7 2.25l1.1-1.1A9.6 9.6 0 0 0 8 .8a9.6 9.6 0 0 0-6.8 2.75l1.1 1.1A8 8 0 0 1 8 2.4Zm0 3.2c1.33 0 2.53.5 3.45 1.35l1.12-1.12A6.4 6.4 0 0 0 8 4c-1.77 0-3.38.7-4.57 1.83l1.12 1.12A4.8 4.8 0 0 1 8 5.6Zm0 3.2c-.46 0-.88.17-1.2.45L8 10.45l1.2-1.2A1.8 1.8 0 0 0 8 8.8Z"/></svg>
      <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x=".5" y=".5" width="23" height="12" rx="3.5" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="19" height="9" rx="2" fill="currentColor"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity=".45"/></svg>
    </span>`;
    app.prepend(sb);
  }

  /* Nav bar (Figma "Nav Bar"): Home · Journal · + Track now · Reports · Resources.
     <body data-tab="home|journal|track|reports|resources"> */
  const tab = document.body.dataset.tab;
  if (app && tab) {
    const tabs = [
      ['home', 'Home', 'home.html', 'icon-home.svg', 24],
      ['journal', 'Journal', 'journal.html', 'icon-journal.svg', 29],
      ['track', 'Track now', 'checkin.html', 'icon-add-white.svg', 32],
      ['reports', 'Reports', 'overview.html', 'icon-reports.svg', 32],
      ['resources', 'Resources', 'resources.html', 'icon-resources.svg', 25],
    ];
    // url() inside a custom property resolves against app.css (assets/), hence fig/…
    const ico = (file, size) =>
      `<span class="nav-ico" style="--m:url('fig/${file}');--ms:${size}px" aria-hidden="true"></span>`;
    const nav = document.createElement('nav');
    nav.className = 'tabbar';
    nav.setAttribute('aria-label', 'Main');
    nav.innerHTML = tabs
      .map(([k, label, href, file, size]) => {
        const cur = k === tab ? ' aria-current="page"' : '';
        return k === 'track'
          ? `<a href="${href}" aria-label="${label}"${cur}><span class="tabbar__add">${ico(file, size)}</span></a>`
          : `<a href="${href}"${cur}>${ico(file, size)}<span>${label}</span></a>`;
      })
      .join('');
    app.appendChild(nav);
  }

  /* ---------- Washes ----------
     <div class="wash" data-wash="cream" data-glow="#badge" data-hills="56" aria-hidden="true"></div>
     as the first child of a coloured header: art.js prints the tone at the header's measured size
     (re-printed when that size changes). data-glow: a selector inside the header to bloom behind, or "x y"
     fractions of the box; data-hills: how tall the hills may rise, in px (keep them under the text). */
  const washes = 'ResizeObserver' in window ? new ResizeObserver((list) => list.forEach((e) => RD.renderWash(e.target))) : null;
  RD.renderWash = function (el) {
    const host = el.parentElement;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!RD.wash || !w || !h) return;
    const key = `${el.dataset.wash} ${w}×${h}`;
    if (el._wash === key) return;
    el._wash = key;
    let glow;
    const g = el.dataset.glow;
    const frac = g && g.match(/^([\d.]+)\s+([\d.]+)$/);
    const a = g && !frac && host.querySelector(g);
    if (frac) glow = [w * frac[1], h * frac[2], Math.min(w, h) * 0.4];
    else if (a) {
      // layout offsets, not getBoundingClientRect: the entrance motion must not shift the bloom
      let x = 0;
      let y = 0;
      for (let n = a; n && n !== host; n = n.offsetParent) {
        x += n.offsetLeft;
        y += n.offsetTop;
      }
      glow = [x + a.offsetWidth / 2, y + a.offsetHeight / 2, Math.max(a.offsetWidth, a.offsetHeight)];
    }
    el.innerHTML = RD.wash(el.dataset.wash, w, h, { glow, hills: parseFloat(el.dataset.hills) || undefined });
  };

  /* ---------- Hydration ---------- */
  RD.hydrate = function (scope = document) {
    scope.querySelectorAll('[data-wash]').forEach((el) => {
      RD.renderWash(el);
      if (washes) washes.observe(el);
    });
    scope.querySelectorAll('[data-icon]').forEach((el) => {
      el.outerHTML = RD.icon(el.dataset.icon, el.className || '');
    });
    scope.querySelectorAll('[data-art]').forEach((el) => {
      if (RD.art && !el.firstElementChild) el.innerHTML = RD.art(el.dataset.art);
    });
    scope.querySelectorAll('[data-river]').forEach((el) => {
      RD.renderRiver(el, parseFloat(el.dataset.river));
    });
  };

  /* Back: go back in history when we came from inside the app, else follow href */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-back]');
    if (!b) return;
    const sameOrigin = document.referrer && new URL(document.referrer).origin === location.origin;
    if (sameOrigin && history.length > 1) {
      e.preventDefault();
      history.back();
    }
  });

  document.addEventListener('DOMContentLoaded', () => RD.hydrate());
  if (document.readyState !== 'loading') RD.hydrate();
})();
