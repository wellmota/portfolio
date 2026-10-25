/* GolfHub — shared runtime for every screen.
   Load order at the end of <body>: icons.js → data.js → app.js → (page script).
   Hydrates: [data-top], [data-icon], [data-av], status bar, tab bar, side menu, [data-back].
   Helpers: GH.icon, GH.avatar, GH.stack, GH.flag, GH.qr, GH.fmt, GH.store, GH.person / GH.first,
            GH.course / GH.hole / GH.tee, GH.round / GH.saveRound, GH.allBookings, GH.unread,
            GH.sheet, GH.toast, GH.esc, GH.hydrate. */
(function () {
  const GH = (window.GH = window.GH || {});
  const root = document.documentElement;

  /* ---------- Storage (never throws; private mode safe) ---------- */
  const PREFIX = 'gh:';
  GH.store = {
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

  /* ---------- Icons (Iconsax, see icons.js) ---------- */
  GH.icon = (name, cls = '', bold = false) => {
    const b = bold && GH.iconsBold[name];
    return `<svg class="i ${b ? 'i--bold ' : ''}${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${b || GH.icons[name] || GH.icons['info-circle']}</svg>`;
  };
  /* Figma flag (green pennant on a pole) used on "Começar rodada" and the distance tile */
  let flagN = 0;
  GH.flag = (cls = 'flag') => {
    const id = 'fl' + ++flagN;
    return `<svg class="${cls}" viewBox="0 0 16 24" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2=".2"><stop offset="0" stop-color="#38eb7f"/><stop offset="1" stop-color="#106f36"/></linearGradient></defs><rect x="1" y="1" width="1.6" height="22" rx=".8" fill="currentColor" opacity=".9"/><path d="M2.6 1.6 14.6 6.6 2.6 12.2Z" fill="url(#${id})"/></svg>`;
  };

  /* ---------- Formatting (pt-BR) ---------- */
  GH.esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const DAYS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  const pad = (n) => String(n).padStart(2, '0');
  const D = (d) => (d instanceof Date ? d : new Date(d));
  const dayDiff = (d) => {
    const a = new Date(GH.now);
    a.setHours(0, 0, 0, 0);
    const b = D(d);
    const c = new Date(b);
    c.setHours(0, 0, 0, 0);
    return Math.round((c - a) / 864e5);
  };
  GH.fmt = {
    /* "R$ 300,00" (regular space so it wraps like text) */
    brl: (v) => brl.format(v).replace(/ /g, ' '),
    /* "R$ 300" when whole */
    brlShort: (v) => (Number.isInteger(v) ? `R$ ${v.toLocaleString('pt-BR')}` : GH.fmt.brl(v)),
    num: (v, dec = 0) => Number(v).toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec }),
    hcp: (v) => (v === 0 ? 'Pro' : Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })),
    m: (v) => `${Math.round(v).toLocaleString('pt-BR')} m`,
    temp: (v) => `${Number(v).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} °C`,
    time: (d) => `${pad(D(d).getHours())}:${pad(D(d).getMinutes())}`,
    ddmm: (d) => `${pad(D(d).getDate())}/${pad(D(d).getMonth() + 1)}`,
    long: (d) => `${D(d).getDate()} de ${MONTHS[D(d).getMonth()]}`,
    longYear: (d) => `${D(d).getDate()} de ${MONTHS[D(d).getMonth()]} de ${D(d).getFullYear()}`,
    month: (d) => MONTHS[D(d).getMonth()],
    monthShort: (d) => MONTHS[D(d).getMonth()].slice(0, 3),
    weekday: (d) => DAYS[D(d).getDay()],
    weekdayShort: (d) => DAYS[D(d).getDay()].slice(0, 3),
    /* "Hoje" / "Amanhã" / "Sábado" (this week) / "12 de outubro" */
    dayLabel(d) {
      const n = dayDiff(d);
      if (n === 0) return 'Hoje';
      if (n === 1) return 'Amanhã';
      if (n === -1) return 'Ontem';
      if (n > 1 && n < 7) {
        const w = DAYS[D(d).getDay()].replace('-feira', '');
        return w[0].toUpperCase() + w.slice(1);
      }
      return GH.fmt.long(d);
    },
    /* "agora", "há 2 h", "ontem", "há 3 dias" */
    ago(d) {
      const mins = Math.round((GH.now - D(d)) / 6e4);
      if (mins < 1) return 'agora';
      if (mins < 60) return `há ${mins} min`;
      const n = dayDiff(d);
      if (n === 0) return `há ${Math.round(mins / 60)} h`;
      if (n === -1) return 'ontem';
      if (n > -7) return `há ${-n} dias`;
      const w = Math.round(-n / 7);
      return w === 1 ? 'há 1 semana' : `há ${w} semanas`;
    },
    /* "hoje" / "amanhã" / "em 12 dias" */
    until(d) {
      const n = dayDiff(d);
      if (n <= 0) return 'hoje';
      if (n === 1) return 'amanhã';
      return `em ${n} dias`;
    },
    plural: (n, one, many) => `${n.toLocaleString('pt-BR')} ${n === 1 ? one : many}`,
    /* "+2", "E" (even), "−1" — golf score against par */
    toPar(v) {
      if (v === 0) return 'E';
      return v > 0 ? `+${v}` : `−${Math.abs(v)}`;
    },
  };

  /* ---------- People & avatars ---------- */
  GH.person = (id) => (GH.people[id] ? { id, ...GH.people[id] } : { id, name: String(id) });
  GH.first = (id) => GH.person(id).name.split(' ')[0];
  GH.me = () => GH.person(GH.user);
  const MONO = [
    ['#d2f5e0', '#106f36'],
    ['#eedcf6', '#5f1283'],
    ['#e1ddff', '#3a2be0'],
    ['#fff1d6', '#7a4a00'],
    ['#e3f1fb', '#1c5a80'],
    ['#fde3e3', '#9c2b2b'],
  ];
  const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const initials = (name) =>
    name
      .split(/\s+/)
      .filter((w) => w.length > 2)
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  /* GH.avatar('caio', { size: 'sm', ring: true, alt: true }) */
  GH.avatar = (id, opt = {}) => {
    const p = typeof id === 'object' ? id : GH.person(id);
    const size = opt.size ? ` av--${opt.size}` : '';
    const ring = opt.ring ? ' av--ring' : '';
    const alt = opt.alt ? GH.esc(p.name) : '';
    if (p.photo)
      return `<span class="av${size}${ring}"><img src="assets/img/av/${p.photo}.webp" alt="${alt}" width="96" height="96" loading="lazy" decoding="async"/></span>`;
    const [bg, ink] = MONO[hash(p.name) % MONO.length];
    return `<span class="av${size}${ring}" style="--av-bg:${bg};--av-ink:${ink}"${alt ? ` role="img" aria-label="${alt}"` : ' aria-hidden="true"'}>${initials(p.name)}</span>`;
  };
  /* Figma avatar stack with the "+11" bubble. GH.stack(['julia','caio'], 15) */
  GH.stack = (ids, total = ids.length, size = 'sm') => {
    const more = total - ids.length;
    return `<span class="stack" aria-hidden="true">${ids.map((id) => GH.avatar(id, { size })).join('')}${more > 0 ? `<span class="stack__more">+${more}</span>` : ''}</span>`;
  };

  /* ---------- Club data accessors ---------- */
  GH.course = (id) => GH.courses.find((c) => c.id === id) || GH.courses[0];
  GH.hole = (n) => GH.holes.find((h) => h.n === Number(n)) || GH.holes[0];
  GH.tee = (id) => GH.tees.find((t) => t.id === id) || GH.tees[2];
  GH.holeLength = (n, tee = 'branco') => Math.round(GH.hole(n).m * GH.tee(tee).factor);

  /* Round in progress: gh:round (saved by rodada.html / performance / cartao), else null.
     GH.round({ demo: true }) falls back to the demo round so every screen has something to show. */
  GH.round = (opt = {}) => {
    const r = GH.store.get('round');
    if (r && !r.finished) return r;
    return opt.demo ? JSON.parse(JSON.stringify(GH.demoRound)) : null;
  };
  GH.saveRound = (r) => GH.store.set('round', r);
  /* strokes total and against par for one player in a round */
  GH.tally = (r, who = GH.user) => {
    let strokes = 0,
      par = 0,
      played = 0,
      putts = 0;
    Object.entries(r.scores || {}).forEach(([n, s]) => {
      if (s[who] && s[who].strokes) {
        strokes += s[who].strokes;
        putts += s[who].putts || 0;
        par += GH.hole(n).par;
        played++;
      }
    });
    return { strokes, par, played, putts, toPar: strokes - par };
  };

  /* Bookings: data + what the prototype saved (gh:bookings, dates as ISO strings) minus cancelled (gh:cancelled) */
  GH.allBookings = () => {
    const cancelled = GH.store.get('cancelled', []) || [];
    return [...(GH.store.get('bookings', []) || []), ...GH.bookings]
      .map((b) => ({ ...b, date: D(b.date) }))
      .filter((b) => !cancelled.includes(b.id))
      .sort((a, b) => a.date - b.date);
  };
  GH.nextBooking = () => GH.allBookings().find((b) => b.kind === 'tee' && b.date > GH.now) || null;
  GH.unread = () => {
    const read = GH.store.get('read', []) || [];
    return GH.notifications.filter((n) => n.unread && !read.includes(n.id)).length;
  };

  /* Decorative QR-like code for vouchers and check-in (deterministic per text; not a scannable QR) */
  GH.qr = (text, label = '') => {
    const N = 25;
    let seed = hash(text) || 1;
    const rnd = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);
    const finder = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" rx="1.6"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" rx="1.1" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx=".7"/>`;
    const inFinder = (x, y) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
    let cells = '';
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) if (!inFinder(x, y) && rnd() > 0.52) cells += `<rect x="${x}" y="${y}" width="1" height="1" rx=".25"/>`;
    return `<svg viewBox="0 0 ${N} ${N}" role="img" aria-label="${GH.esc(label || 'Código ' + text)}" fill="#1f1f1f" shape-rendering="geometricPrecision">${finder(0, 0)}${finder(N - 7, 0)}${finder(0, N - 7)}${cells}</svg>`;
  };


  /* ---------- Motion kit (all respect prefers-reduced-motion) ---------- */
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  GH.reduceMotion = reduceMotion;
  /* GH.countUp(el, 124, { dec: 0, prefix: '', suffix: '', dur: 1100, format: (v) => … }) */
  GH.countUp = (el, to, opt = {}) => {
    const dec = opt.dec || 0;
    const fmt = opt.format || ((v) => (opt.prefix || '') + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + (opt.suffix || ''));
    if (reduceMotion()) return (el.textContent = fmt(to));
    const from = opt.from || 0,
      dur = opt.dur || 1100,
      t0 = performance.now() + (opt.delay || 0);
    const ease = (t) => 1 - Math.pow(1 - t, 4);
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - t0) / dur));
      el.textContent = fmt(from + (to - from) * ease(t));
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = fmt(from);
    requestAnimationFrame(tick);
  };
  /* GH.tilt(el, { max: 8 }) — pointer-driven 3D tilt + sheen; adds .tilt and a .tilt__sheen child */
  GH.tilt = (el, opt = {}) => {
    if (!el || reduceMotion() || !window.matchMedia('(hover: hover), (pointer: coarse)').matches) return;
    const max = opt.max || 8;
    el.classList.add('tilt');
    if (!el.querySelector(':scope > .tilt__sheen')) {
      const s = document.createElement('span');
      s.className = 'tilt__sheen';
      el.appendChild(s);
    }
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width,
        y = (e.clientY - r.top) / r.height;
      el.classList.add('is-tilting');
      el.style.setProperty('--ry', `${(x - 0.5) * max * 2}deg`);
      el.style.setProperty('--rx', `${(0.5 - y) * max * 2}deg`);
      el.style.setProperty('--sx', `${x * 100}%`);
      el.style.setProperty('--sy', `${y * 100}%`);
    };
    const leave = () => {
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    el.addEventListener('pointercancel', leave);
    el.addEventListener('pointerup', leave);
  };
  /* GH.reveal(scope) — .reveal elements animate in when they enter the scrolling .screen */
  GH.reveal = (scope = document) => {
    const items = scope.querySelectorAll('.reveal:not(.is-in)');
    if (!items.length) return;
    if (reduceMotion() || !('IntersectionObserver' in window)) return items.forEach((i) => i.classList.add('is-in'));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        }),
      { root: document.querySelector('.screen'), threshold: 0.12 }
    );
    items.forEach((i) => io.observe(i));
  };
  /* tiny haptic tick on supported phones */
  GH.haptic = (ms = 8) => {
    try {
      if (navigator.vibrate && !reduceMotion()) navigator.vibrate(ms);
    } catch (e) {}
  };
  /* animated success check: GH.check('i--xl') */
  GH.check = (cls = '') =>
    `<svg class="i draw-check ${cls}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" pathLength="100"/><path d="m7.5 12.2 3 3 6-6.4" pathLength="100"/></svg>`;

  /* ---------- Bottom sheet ----------
     <div class="sheet" id="x" role="dialog" aria-modal="true" aria-labelledby="…" tabindex="-1" hidden>…</div>
     <div class="sheet-backdrop" data-sheet-close></div>   (backdrop right after the sheet) */
  GH.sheet = {
    open(el, opener) {
      el._opener = opener || document.activeElement;
      el.hidden = false;
      void el.offsetWidth;
      requestAnimationFrame(() => {
        el.classList.add('is-open');
        /* focus the dialog itself: screen readers announce its label, and no ring flashes on a button */
        el.focus({ preventScroll: true });
      });
      const back = el.nextElementSibling;
      if (back && back.classList.contains('sheet-backdrop')) back.classList.add('is-open');
    },
    close(el) {
      el.classList.remove('is-open');
      const back = el.nextElementSibling;
      if (back && back.classList.contains('sheet-backdrop')) back.classList.remove('is-open');
      if (el._opener && el._opener.focus) el._opener.focus({ preventScroll: true });
      setTimeout(() => {
        if (!el.classList.contains('is-open')) el.hidden = true;
      }, 500);
    },
  };
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-sheet-close]');
    if (!c) return;
    const sheet = c.classList.contains('sheet-backdrop') ? c.previousElementSibling : c.closest('.sheet, .drawer');
    if (sheet) GH.sheet.close(sheet);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.querySelector('.sheet.is-open, .drawer.is-open');
    if (open) GH.sheet.close(open);
  });


  /* drag the grip/head down to dismiss a sheet */
  let drag = null;
  document.addEventListener('pointerdown', (e) => {
    const h = e.target.closest('.sheet__grip, .sheet__head');
    if (!h || e.target.closest('button, a, input')) return;
    const sheet = h.closest('.sheet.is-open');
    if (!sheet) return;
    drag = { sheet, y0: e.clientY, dy: 0, t0: performance.now() };
    sheet.classList.add('is-dragging');
    h.setPointerCapture && h.setPointerCapture(e.pointerId);
  });
  document.addEventListener('pointermove', (e) => {
    if (!drag) return;
    drag.dy = Math.max(0, e.clientY - drag.y0);
    drag.sheet.style.transform = `translateY(${drag.dy}px)`;
  });
  const endDrag = () => {
    if (!drag) return;
    const { sheet, dy, t0 } = drag;
    drag = null;
    sheet.classList.remove('is-dragging');
    sheet.style.transform = '';
    const fast = dy / Math.max(1, performance.now() - t0) > 0.6;
    if (dy > 110 || (fast && dy > 30)) GH.sheet.close(sheet);
  };
  document.addEventListener('pointerup', endDrag);
  document.addEventListener('pointercancel', endDrag);

  /* ---------- Toast ---------- */
  GH.toast = function (msg, icon = 'tick-circle') {
    const app = document.querySelector('.app') || document.body;
    let t = app.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      app.appendChild(t);
    }
    t.innerHTML = GH.icon(icon) + '<span></span>';
    t.lastChild.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('is-on'), 2400);
  };

  /* ---------- Chrome ---------- */
  const embedded = window.top !== window.self;
  let shot = false;
  try {
    if (new URLSearchParams(location.search).has('shot')) sessionStorage.setItem('gh:shot', '1');
    shot = sessionStorage.getItem('gh:shot') === '1';
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

  /* Tab bar (Figma: home, crown, discover, notification-circle; the green ball sits in the notch over the active one).
     <body data-tab="home|ranking|descobrir|avisos"> */
  const TABS = [
    ['home', 'Início', 'home.html', 'home-2'],
    ['ranking', 'Ranking', 'ranking.html', 'crown'],
    ['descobrir', 'Descobrir', 'descobrir.html', 'discover'],
    ['avisos', 'Avisos', 'avisos.html', 'notification-circle'],
  ];
  const tab = document.body.dataset.tab;
  if (app && tab) {
    const idx = Math.max(0, TABS.findIndex((t) => t[0] === tab));
    const pos = (i) => `${12.5 + i * 25}%`;
    const unread = GH.unread ? GH.unread() : 0;
    const nav = document.createElement('nav');
    nav.className = 'tabbar';
    nav.setAttribute('aria-label', 'Principal');
    nav.innerHTML = `<span class="tabbar__bg" aria-hidden="true"></span><span class="tabbar__ball" aria-hidden="true"></span>
      <div class="tabbar__list">${TABS.map(
        ([k, label, href, ico], i) =>
          `<a href="${href}"${i === idx ? ' aria-current="page"' : ''}${k === 'avisos' && unread ? ' class="is-unread"' : ''}>${GH.icon(ico)}<span>${label}</span>${
            k === 'avisos' && unread ? `<span class="sr-only">, ${unread} não lidos</span>` : ''
          }</a>`
      ).join('')}</div>`;
    let prev = null;
    try {
      prev = sessionStorage.getItem('gh:tab');
      sessionStorage.setItem('gh:tab', String(idx));
    } catch (e) {}
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prev != null && +prev !== idx && !reduce) {
      nav.style.transition = 'none';
      nav.style.setProperty('--x', pos(+prev));
      app.appendChild(nav);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          nav.style.transition = '';
          nav.style.setProperty('--x', pos(idx));
        })
      );
    } else {
      nav.style.setProperty('--x', pos(idx));
      app.appendChild(nav);
    }
  }

  /* Top bar (Figma: hamburger + avatar ring with the online dot). <header class="top" data-top></header> */
  const MENU_SVG =
    '<svg viewBox="0 0 26 16" aria-hidden="true" fill="currentColor"><rect x="10.4" y="13" width="15.6" height="2.6" rx="1.3"/><rect x="0" y="0" width="13" height="2.6" rx="1.3"/><rect x="0" y="6.5" width="26" height="2.6" rx="1.3"/></svg>';
  GH.top = () => {
    const me = GH.me();
    return `<button class="top__menu" type="button" data-menu aria-label="Abrir menu" aria-haspopup="dialog">${MENU_SVG}</button>
      <a class="me" href="perfil.html" aria-label="Meu perfil, ${GH.esc(me.name)} — online"><img src="assets/img/av/${me.photo}.webp" alt="" width="80" height="80"/></a>`;
  };

  /* Side menu, built on first open */
  const MENU = [
    ['perfil.html', 'profile-circle', 'Meu perfil'],
    ['assinatura.html', 'card', 'Minha assinatura'],
    ['reservas.html', 'calendar-tick', 'Minhas reservas'],
    ['aulas.html', 'teacher', 'Aulas'],
    ['torneios.html', 'cup', 'Torneios e eventos'],
    ['loja.html', 'shop', 'Loja e aluguel'],
    ['cartao.html', 'task-square', 'Cartão de jogo'],
  ];
  function drawer() {
    let d = document.getElementById('gh-menu');
    if (d) return d;
    const me = GH.me();
    d = document.createElement('div');
    d.id = 'gh-menu';
    d.className = 'drawer';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.setAttribute('aria-label', 'Menu');
    d.tabIndex = -1;
    d.hidden = true;
    d.innerHTML = `<div class="drawer__me">${GH.avatar(GH.user, { size: 'lg' })}<div><div class="t-h3">${GH.esc(me.name)}</div><div class="t-sm t-muted">${me.role} · HCP ${GH.fmt.hcp(me.hcp)}</div></div></div>
      <nav class="drawer__nav" aria-label="Menu"><ul>${MENU.map(([h, i, l]) => `<li><a href="${h}">${GH.icon(i)}${l}</a></li>`).join('')}
      <li><button type="button" data-soon="Configurações">${GH.icon('setting-2')}Configurações</button></li>
      <li><a href="index.html">${GH.icon('logout')}Sair</a></li></ul></nav>
      <p class="drawer__foot">GolfHub · ${GH.club.name}<br/>Sócio nº ${me.number}</p>`;
    const back = document.createElement('div');
    back.className = 'sheet-backdrop';
    back.setAttribute('data-sheet-close', '');
    app.append(d, back);
    return d;
  }
  document.addEventListener('click', (e) => {
    const m = e.target.closest('[data-menu]');
    if (m) {
      e.preventDefault();
      const d = drawer();
      GH.sheet.open(d, m);
      return;
    }
    const s = e.target.closest('[data-soon]');
    if (s) GH.toast(`${s.dataset.soon}: em breve`, 'info-circle');
  });

  /* ---------- Hydration ---------- */
  GH.hydrate = function (scope = document) {
    scope.querySelectorAll('[data-top]').forEach((el) => {
      if (!el.firstElementChild) el.innerHTML = GH.top();
    });
    scope.querySelectorAll('[data-icon]').forEach((el) => {
      el.outerHTML = GH.icon(el.dataset.icon, el.className || '', el.hasAttribute('data-bold'));
    });
    scope.querySelectorAll('[data-av]').forEach((el) => {
      el.outerHTML = GH.avatar(el.dataset.av, { size: el.dataset.size, ring: el.hasAttribute('data-ring'), alt: el.hasAttribute('data-alt') });
    });
    scope.querySelectorAll('[data-flag]').forEach((el) => {
      el.outerHTML = GH.flag(el.className || 'flag');
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

  GH.hydrate();
  GH.reveal();
})();
