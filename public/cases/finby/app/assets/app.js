/* Finby — shared runtime for every screen.
   Load order at the end of <body>: data.js → art.js → app.js → (page script).
   Hydrates: [data-icon], [data-art], [data-av], status bar, tab bar, [data-back].
   Helpers: FB.icon, FB.avatar, FB.crown, FB.levelChip, FB.card, FB.money, FB.fmt, FB.store,
            FB.get / FB.mine / FB.discover / FB.person / FB.balance, FB.sheet, FB.toast, FB.esc. */
(function () {
  const FB = (window.FB = window.FB || {});
  const root = document.documentElement;

  /* ---------- Storage (never throws; private mode safe) ---------- */
  const PREFIX = 'fb:';
  FB.store = {
    get(key, fallback = null) {
      try {
        const v = localStorage.getItem(PREFIX + key);
        return v == null ? fallback : JSON.parse(v);
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
      } catch (e) {}
    },
    remove(key) {
      try {
        localStorage.removeItem(PREFIX + key);
      } catch (e) {}
    },
  };

  /* ---------- Icons (Lucide, ISC; WhatsApp/Messenger glyphs from Tabler, MIT) ----------
     A `tone` shape is the duotone fill: hidden by default, shown on active tabs and tiles. */
  const P = {
    'layout-dashboard':
      '<rect class="tone" x="3" y="3" width="7" height="9" rx="1"/><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
    wallet:
      '<path class="tone" d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2Z"/><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    users:
      '<circle class="tone" cx="9" cy="7" r="4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'circle-user':
      '<circle class="tone" cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>',
    'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-up': '<path d="m18 15-6-6-6 6"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    minus: '<path d="M5 12h14"/>',
    more: '<circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/><circle cx="5" cy="12" r="1.2" fill="currentColor"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    shuffle:
      '<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-7.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"/><path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"/>',
    'list-ordered':
      '<path d="M10 12h11"/><path d="M10 18h11"/><path d="M10 6h11"/><path d="M4 10h2"/><path d="M4 6h1v4"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>',
    'credit-card': '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
    'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    heart:
      '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    banknote: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    'user-plus':
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/>',
    'user-check': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    whatsapp:
      '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
    messenger: '<path d="M3 20l1.3-3.9a9 8 0 1 1 3.4 2.9L3 20"/><path d="M8 13l3-2 2 2 3-2"/>',
    'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    'shield-check':
      '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    landmark:
      '<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M12 2 20 7H4z"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'file-text':
      '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8M16 17H8M10 9H8"/>',
    'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    'log-in': '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/>',
    pencil:
      '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    crown:
      '<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>',
    grip: '<circle cx="9" cy="12" r="1.1" fill="currentColor"/><circle cx="9" cy="5" r="1.1" fill="currentColor"/><circle cx="9" cy="19" r="1.1" fill="currentColor"/><circle cx="15" cy="12" r="1.1" fill="currentColor"/><circle cx="15" cy="5" r="1.1" fill="currentColor"/><circle cx="15" cy="19" r="1.1" fill="currentColor"/>',
    send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    share:
      '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/>',
    sliders: '<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
    'arrow-down-to-line': '<path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    'trend-up': '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
    'eye-off':
      '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',
    backspace:
      '<path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/>',
    sparkles:
      '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
    trophy:
      '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    refresh:
      '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    hourglass:
      '<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    'piggy-bank':
      '<path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/><path d="M16 10h.01"/><path d="M2 8v1a2 2 0 0 0 2 2h1"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    contact:
      '<path d="M16 2v2"/><path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><path d="M8 2v2"/><circle cx="12" cy="11" r="3"/><rect x="3" y="4" width="18" height="18" rx="2"/>',
    star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
    settings:
      '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    google:
      '<path fill="#4285F4" stroke="none" d="M21.6 12.23c0-.68-.06-1.36-.18-2.02H12v3.83h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.98-4.3 2.98-7.33z"/><path fill="#34A853" stroke="none" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.04.95-3.39.95-2.6 0-4.81-1.76-5.6-4.12H3.07v2.58A10 10 0 0 0 12 22z"/><path fill="#FBBC05" stroke="none" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.52H3.07a10 10 0 0 0 0 8.96L6.4 13.9z"/><path fill="#EA4335" stroke="none" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.86-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.52L6.4 10.1C7.19 7.74 9.4 5.98 12 5.98z"/>',
    apple:
      '<path fill="currentColor" stroke="none" d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.21 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.35-3.55zM14.18 6.13c.61-.74 1.02-1.76.91-2.78-.88.04-1.94.59-2.57 1.32-.56.65-1.06 1.69-.93 2.69.98.08 1.98-.5 2.59-1.23z"/>',
  };
  FB.icons = P;
  FB.icon = (name, cls = '') =>
    `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${P[name] || P.info}</svg>`;

  /* ---------- Formatting (pt-BR) ---------- */
  FB.esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const int = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
  const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const DAYS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  FB.fmt = {
    /* "R$ 10.000,00" (regular space, so it wraps like text everywhere) */
    brl: (v) => brl.format(v).replace(/ /g, ' '),
    /* "R$ 7.500" when whole, "R$ 5.345,56" otherwise */
    brlShort: (v) => (Number.isInteger(v) ? `R$ ${int.format(v)}` : FB.fmt.brl(v)),
    ddmm: (d) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`,
    long: (d) => `${String(d.getDate()).padStart(2, '0')} de ${MONTHS[d.getMonth()]}`,
    longYear: (d) => `${d.getDate()} de ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`,
    weekday: (d) => DAYS[d.getDay()],
    weekdayShort: (d) => DAYS[d.getDay()].replace('-feira', ''),
    month: (d) => MONTHS[d.getMonth()],
    /* "Hoje", "Ontem", "4 dias atrás", "2 semanas atrás" */
    ago(d) {
      const n = Math.round((FB.now - d) / 864e5);
      if (n <= 0) return 'Hoje';
      if (n === 1) return 'Ontem';
      if (n < 7) return `${n} dias atrás`;
      const w = Math.round(n / 7);
      return w === 1 ? '1 semana atrás' : `${w} semanas atrás`;
    },
    /* "em 18 dias" / "amanhã" */
    until(d) {
      const n = Math.ceil((d - FB.now) / 864e5);
      if (n <= 0) return 'hoje';
      if (n === 1) return 'amanhã';
      return `em ${n} dias`;
    },
    plural: (n, one, many) => `${n} ${n === 1 ? one : many}`,
  };
  /* Big money: small R$, integer, lighter cents. FB.money(7500) */
  FB.money = (v, cls = '') => {
    const [i, c] = brl.format(v).replace(/^R\$\s?/, '').split(',');
    return `<span class="money ${cls}"><span class="money__cur">R$</span><span>${i}</span><span class="money__cents">,${c}</span></span>`;
  };

  /* ---------- People & avatars ---------- */
  FB.person = (id) => {
    if (FB.people[id]) return { id, ...FB.people[id] };
    const inv = (FB.store.get('invites', []) || []).find((p) => p.id === id);
    return inv ? { ...inv, pending: 'signup' } : { id, name: id };
  };
  FB.first = (id) => FB.person(id).name.split(' ')[0];
  const MONO = [
    ['#ffe2cc', '#8f4210'],
    ['#ebe5ff', '#4a29c4'],
    ['#cff2df', '#0b6b3f'],
    ['#fde2ea', '#9c2349'],
    ['#dcecff', '#1c5aa0'],
    ['#fff1c2', '#735000'],
  ];
  const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const initials = (name) =>
    name
      .split(/\s+/)
      .filter((w) => w.length > 2 || /^[A-ZÀ-Ú]/.test(w))
      .map((w) => w[0])
      .filter((c) => /[A-ZÀ-Ú]/i.test(c))
      .slice(0, 2)
      .join('')
      .toUpperCase();

  /* Crown for levels: filled, with the level's three-tone ramp.
     Unique gradient id per crown: a url(#id) pointing into a display:none subtree (hidden sheet, other board) paints nothing. */
  let crownN = 0;
  FB.crown = (level) => {
    if (!level) return '';
    const [a, b, c] = ['1', '2', '3'].map((k) => `var(--${level}-${k})`);
    const id = `cr-${level}-${++crownN}`;
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><path fill="url(#${id})" d="M11.56 3.27a.5.5 0 0 1 .88 0l2.95 5.6a1 1 0 0 0 1.52.3l4.28-3.67a.5.5 0 0 1 .8.52l-2.84 10.25a1 1 0 0 1-.95.73H5.8a1 1 0 0 1-.95-.73L2.02 6.02a.5.5 0 0 1 .8-.52l4.27 3.67a1 1 0 0 0 1.52-.3z"/><rect x="5" y="18.6" width="14" height="2.4" rx="1.2" fill="url(#${id})"/></svg>`;
  };
  FB.LEVELS = { gold: 'Gold', silver: 'Silver', bronze: 'Bronze' };
  FB.levelChip = (level) =>
    level
      ? `<span class="level level--${level}">${FB.crown(level)}${FB.LEVELS[level]}</span>`
      : `<span class="level level--none">Novo</span>`;

  /* FB.avatar('alana', { size: 'lg', crown: true, ring: false, alt: true }) */
  FB.avatar = (id, opt = {}) => {
    const p = typeof id === 'object' ? id : FB.person(id);
    const size = opt.size ? ` av--${opt.size}` : '';
    const ring = opt.ring ? ' av--ring' : '';
    const crown = opt.crown && p.level ? `<span class="av__crown">${FB.crown(p.level)}</span>` : '';
    const alt = opt.alt ? FB.esc(p.name) : '';
    if (p.photo)
      return `<span class="av${size}${ring}"><img src="assets/img/av/${p.photo}.jpg" alt="${alt}" width="96" height="96" loading="lazy" decoding="async"/>${crown}</span>`;
    const [bg, ink] = MONO[hash(p.name) % MONO.length];
    return `<span class="av${size}${ring}" style="--av-bg:${bg};--av-ink:${ink}"${alt ? ` role="img" aria-label="${alt}"` : ' aria-hidden="true"'}>${initials(p.name)}${crown}</span>`;
  };

  /* ---------- Consórcios (data + what the prototype saved) ---------- */
  FB.balance = () => FB.store.get('balance', FB.user.balance);
  /* Consórcios made in the wizard. The store holds dates as ISO strings; hand them back as Dates like data.js. */
  const DATE_KEYS = ['start', 'nextDraw', 'createdAt'];
  FB.created = () =>
    (FB.store.get('created', []) || []).map((c) => {
      const out = { ...c };
      for (const k of DATE_KEYS) if (typeof out[k] === 'string') out[k] = new Date(out[k]);
      if (Array.isArray(out.winners)) out.winners = out.winners.map((w) => (typeof w.date === 'string' ? { ...w, date: new Date(w.date) } : w));
      return out;
    });
  FB.all = () => {
    const joined = FB.store.get('joined', []) || [];
    return [...FB.created(), ...FB.consorcios].map((c) => {
      const out = { ...c };
      if (c.public && joined.includes(c.id)) out.role = 'member';
      const order = FB.store.get('order:' + c.id);
      if (order) out.order = order;
      return out;
    });
  };
  FB.get = (id) => FB.all().find((c) => c.id === id) || null;
  FB.mine = () => FB.all().filter((c) => c.role);
  FB.discover = () => FB.all().filter((c) => c.public && !c.role);
  FB.count = (c) => c.memberCount || c.members.length;
  FB.cardOf = (id) => FB.user.cards.find((k) => k.id === id) || FB.user.cards[0];

  /* The consórcio card (Figma big-card-active / card_purple / card_green), shared by Home and Consórcios.
     Whole card is one link; the "…" button sits above the stretched link. */
  FB.card = (c, opt = {}) => {
    const compact = opt.compact ? ' cc--compact' : '';
    const href = opt.href || `consorcio.html?id=${encodeURIComponent(c.id)}`;
    const tag =
      c.role === 'admin' && c.status === 'forming'
        ? `<span class="cc__tag">${FB.icon('hourglass', 'i--xs')}Aguardando ${FB.fmt.plural((c.waiting || []).length, 'pessoa', 'pessoas')}</span>`
        : c.role === 'admin'
          ? `<span class="cc__tag">${FB.icon('sparkles', 'i--xs')}Criado por você</span>`
          : '';
    const meta =
      c.status === 'forming'
        ? `<div><dt>Começa em</dt><dd>${FB.fmt.ddmm(c.start)}</dd></div><div><dt>Confirmados</dt><dd>${c.members.length} de ${c.months}</dd></div>`
        : `<div><dt>Próximo sorteio</dt><dd>${FB.fmt.ddmm(c.nextDraw)}</dd></div><div><dt>Participantes</dt><dd>${FB.count(c)}</dd></div>`;
    return `<article class="cc theme-${c.theme}${compact}">
      ${tag}
      <div class="cc__top">
        <h3 class="cc__name"><a class="stretch" href="${href}">${FB.esc(c.name)}</a></h3>
        ${opt.more === false ? '' : `<button class="cc__more" type="button" data-more="${c.id}" aria-label="Mais opções de ${FB.esc(c.name)}">${FB.icon('more')}</button>`}
      </div>
      <p class="cc__prize">${c.status === 'forming' ? 'Prêmio' : 'Prêmio atual'} · <span class="num">${FB.fmt.brlShort(c.prize)}</span></p>
      <dl class="cc__meta">${meta}</dl>
    </article>`;
  };

  /* ---------- Bottom sheet ----------
     <div class="sheet" id="x" role="dialog" aria-modal="true" aria-labelledby="…" hidden>…</div>
     <div class="sheet-backdrop" data-sheet-close></div>   (backdrop right after the sheet) */
  FB.sheet = {
    open(el, opener) {
      el._opener = opener || document.activeElement;
      el.hidden = false;
      void el.offsetWidth;
      requestAnimationFrame(() => {
        el.classList.add('is-open');
        // the checked choice in a picker sheet; otherwise the dialog itself, so the title is read and no ring lands on ✕
        const first = el.querySelector('[aria-checked="true"]');
        if (!first && !el.hasAttribute('tabindex')) el.tabIndex = -1;
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
      setTimeout(() => {
        if (!el.classList.contains('is-open')) el.hidden = true;
      }, 400);
    },
  };
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-sheet-close]');
    if (!c) return;
    const sheet = c.classList.contains('sheet-backdrop') ? c.previousElementSibling : c.closest('.sheet');
    if (sheet) FB.sheet.close(sheet);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.querySelector('.sheet.is-open');
    if (open) FB.sheet.close(open);
  });

  /* ---------- Toast ---------- */
  FB.toast = function (msg, icon = 'check') {
    const app = document.querySelector('.app') || document.body;
    let t = app.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      app.appendChild(t);
    }
    t.innerHTML = FB.icon(icon) + '<span></span>';
    t.lastChild.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('is-on'), 2400);
  };

  /* ---------- Chrome ---------- */
  const embedded = window.top !== window.self;
  let shot = false;
  try {
    if (new URLSearchParams(location.search).has('shot')) sessionStorage.setItem('fb:shot', '1');
    shot = sessionStorage.getItem('fb:shot') === '1';
  } catch (e) {}
  if (embedded) root.classList.add('is-embedded');
  const framed = !embedded && window.matchMedia('(min-width: 600px)').matches;
  if (embedded || framed || shot) root.classList.add('has-status');

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

  /* Tab bar (Figma navigation/menu - home): same four icons, now with labels.
     <body data-tab="home|consorcios|amigos|perfil"> */
  const tab = document.body.dataset.tab;
  if (app && tab) {
    const tabs = [
      ['home', 'Início', 'home.html', 'layout-dashboard'],
      ['consorcios', 'Consórcios', 'consorcios.html', 'wallet'],
      ['amigos', 'Amigos', 'amigos.html', 'users'],
      ['perfil', 'Perfil', 'perfil.html', 'circle-user'],
    ];
    const nav = document.createElement('nav');
    nav.className = 'tabbar';
    nav.setAttribute('aria-label', 'Principal');
    nav.innerHTML = tabs
      .map(([k, label, href, ico]) => `<a href="${href}"${k === tab ? ' aria-current="page"' : ''}>${FB.icon(ico)}<span>${label}</span></a>`)
      .join('');
    app.appendChild(nav);
  }

  /* ---------- Hydration ---------- */
  FB.hydrate = function (scope = document) {
    scope.querySelectorAll('[data-icon]').forEach((el) => {
      el.outerHTML = FB.icon(el.dataset.icon, el.className || '');
    });
    scope.querySelectorAll('[data-art]').forEach((el) => {
      if (FB.art && !el.firstElementChild) el.innerHTML = FB.art(el.dataset.art);
    });
    scope.querySelectorAll('[data-av]').forEach((el) => {
      const opt = { size: el.dataset.size, crown: el.hasAttribute('data-crown'), ring: el.hasAttribute('data-ring'), alt: el.hasAttribute('data-alt') };
      el.outerHTML = FB.avatar(el.dataset.av, opt);
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

  document.addEventListener('DOMContentLoaded', () => FB.hydrate());
  if (document.readyState !== 'loading') FB.hydrate();
})();
