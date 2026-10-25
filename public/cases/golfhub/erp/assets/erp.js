/* GolfHub ERP — shared runtime for the club managers' web app (erp/*.html).
   Loads after ../app/assets/icons.js + data.js (GH.*). Does NOT use app.js / app.css (mobile chrome).
   Owns: shell (sidebar + top bar), pt-BR formatting, avatars with monogram fallback, the member roster,
   the seeded tee-sheet generator (shared by Dashboard and Agenda), toast, tooltip, count-up,
   popover and drawer helpers. Motion respects prefers-reduced-motion. */
(function () {
  'use strict';
  const GH = window.GH;
  const ERP = (window.ERP = {});
  const qs = new URLSearchParams(location.search);
  ERP.qs = qs;
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  ERP.reduced = () => mq.matches;

  /* Icons missing from icons.js (Iconsax Linear, 24 px grid) */
  GH.icons['arrow-swap-vertical'] = '<path d="M10.45 6.72 6.73 3 3.01 6.72M6.73 21V3M13.55 17.28 17.27 21l3.72-3.72M17.27 3v18"/>';
  GH.icons['drag'] = '<g fill="currentColor"><circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/></g>';

  /* ---------- Clock: the demo runs "today, 09:40" (override with ?hora=HH:MM) so every capture shows a live morning ---------- */
  const today = new Date(GH.now);
  today.setHours(0, 0, 0, 0);
  ERP.today = today;
  const hq = /^\d{1,2}:\d{2}$/.test(qs.get('hora') || '') ? qs.get('hora') : '09:40';
  const clock = new Date(today);
  clock.setHours(+hq.split(':')[0], +hq.split(':')[1], 0, 0);
  ERP.clock = clock;
  ERP.clockMins = clock.getHours() * 60 + clock.getMinutes();
  const t0 = performance.now();
  /* live time (ticks from 09:40 at real speed) */
  ERP.live = () => new Date(clock.getTime() + (performance.now() - t0));

  /* ---------- Formatting (pt-BR) ---------- */
  const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const DAYS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  const pad = (n) => String(n).padStart(2, '0');
  const D = (d) => (d instanceof Date ? d : new Date(d));
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const num = (v, d = 0) => Number(v).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
  const dayDiff = (d) => {
    const c = new Date(D(d));
    c.setHours(0, 0, 0, 0);
    return Math.round((c - today) / 864e5);
  };
  ERP.dayDiff = dayDiff;
  ERP.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  ERP.fmt = {
    num,
    brl: (v) => (v < 0 ? '−' : '') + 'R$ ' + num(Math.abs(v), 2),
    brl0: (v) => (v < 0 ? '−' : '') + 'R$ ' + num(Math.abs(Math.round(v))),
    mil: (v) => num(v / 1000) + ' mil',
    pct: (v, d = 0) => num(v, d) + '%',
    delta: (v, d = 0) => (v > 0 ? '+' : v < 0 ? '−' : '') + num(Math.abs(v), d) + '%',
    hcp: (v) => (v == null ? '—' : v === 0 ? 'Pro' : num(v, 1)),
    time: (d) => pad(D(d).getHours()) + ':' + pad(D(d).getMinutes()),
    ddmm: (d) => pad(D(d).getDate()) + '/' + pad(D(d).getMonth() + 1),
    long: (d) => D(d).getDate() + ' de ' + MONTHS[D(d).getMonth()],
    month: (d) => MONTHS[D(d).getMonth()],
    mon: (d) => cap(MONTHS[D(d).getMonth()].slice(0, 3)),
    weekday: (d) => DAYS[D(d).getDay()],
    wd: (d) => cap(DAYS[D(d).getDay()].slice(0, 3)),
    full: (d) => cap(DAYS[D(d).getDay()]) + ', ' + D(d).getDate() + ' de ' + MONTHS[D(d).getMonth()],
    iso: (d) => D(d).getFullYear() + '-' + pad(D(d).getMonth() + 1) + '-' + pad(D(d).getDate()),
    dayLabel(d) {
      const n = dayDiff(d);
      if (n === 0) return 'Hoje';
      if (n === 1) return 'Amanhã';
      if (n === -1) return 'Ontem';
      return ERP.fmt.wd(d) + ', ' + ERP.fmt.ddmm(d);
    },
    ago(d) {
      const n = dayDiff(d);
      if (n === 0) return 'Hoje';
      if (n === -1) return 'Ontem';
      if (n > -7) return 'há ' + -n + ' dias';
      if (n > -60) {
        const w = Math.round(-n / 7);
        return w === 1 ? 'há 1 semana' : 'há ' + w + ' semanas';
      }
      const m = Math.round(-n / 30);
      return 'há ' + m + ' meses';
    },
  };
  ERP.mins = (hm) => +hm.slice(0, 2) * 60 + +hm.slice(3, 5);
  ERP.hm = (m) => pad(Math.floor(m / 60)) + ':' + pad(m % 60);
  ERP.dateFromKey = (k) => {
    const [y, m, d] = k.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  /* ---------- Seeded randomness ---------- */
  const hash = (s) => [...String(s)].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) >>> 0, 2166136261);
  ERP.hash = hash;
  ERP.rng = (seed) => {
    let a = typeof seed === 'number' ? seed : hash(seed);
    return () => {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  /* ---------- Icons & avatars ---------- */
  ERP.icon = (name, cls = '', bold = false) => {
    const b = bold && GH.iconsBold && GH.iconsBold[name];
    return `<svg class="i ${b ? 'i--bold ' : ''}${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${b || GH.icons[name] || GH.icons['info-circle']}</svg>`;
  };
  const MONO = [
    ['#e1ddff', '#3a2be0'],
    ['#d9f3e8', '#0f6b44'],
    ['#fde4ef', '#9d2161'],
    ['#ffeedb', '#8a4b00'],
    ['#dff2fc', '#155e86'],
    ['#ece9f8', '#4b3fa0'],
  ];
  ERP.initials = (name) =>
    String(name)
      .split(/\s+/)
      .filter((w) => w.length > 2)
      .map((w) => w[0])
      .filter((_, i, a) => i === 0 || i === a.length - 1)
      .join('')
      .toUpperCase();
  /* ERP.avatar(personOrId, size) — photo when the person has one, monogram otherwise (and if the photo fails) */
  ERP.avatar = (p, size = 40, cls = '') => {
    if (typeof p === 'string') p = ERP.person(p);
    const ini = ERP.initials(p.name);
    const [bg, fg] = MONO[hash(p.name) % MONO.length];
    const st = `--s:${size}px;--bg:${bg};--fg:${fg}`;
    if (p.photo)
      return `<span class="av ${cls}" style="${st}" data-ini="${ini}"><img src="../app/assets/img/av/${p.photo}.webp" alt="" width="${size}" height="${size}" decoding="async" onerror="this.parentNode.classList.add('av--mono');this.parentNode.textContent=this.parentNode.dataset.ini"/></span>`;
    return `<span class="av av--mono ${cls}" style="${st}" aria-hidden="true">${ini}</span>`;
  };
  ERP.stack = (people, size = 26, max = 4) =>
    `<span class="stack" aria-hidden="true">${people
      .slice(0, max)
      .map((p) => ERP.avatar(p, size))
      .join('')}${people.length > max ? `<span class="stack__more" style="--s:${size}px">+${people.length - max}</span>` : ''}</span>`;

  /* ---------- Club numbers (one source for every page) ---------- */
  ERP.stats = {
    ativos: 2316,
    ativosDelta: 3.5,
    emDia: 2252,
    inadimplentes: 64,
    inadValor: 23016,
    inadDelta: -3,
    suspensos: 12,
    novosAno: 940,
    metaNovos: 1100,
    retorno: 194,
    metaRetorno: 300,
    operacao: 712,
    metaOperacao: 740,
    reservasHoje: 120,
    reservasDelta: 21,
    alugueisHoje: 3434,
    alugueisDelta: 12,
    reservasMes: 1046,
    reservasPrev: 1280,
    ocupacao: 82,
    saidas: { manha: 262, tarde: 193, vagas: 555 },
    carrinhosMes: 245,
    pagamentosHoje: 122,
    /* revenue by month, oldest first (12 months ending this month; this month is month-to-date) */
    receita: [798, 846, 772, 781, 806, 815, 829, 812, 846, 873, 902, 861].map((k) => k * 1000 + (k % 7) * 137),
    meta: [800, 820, 820, 820, 830, 830, 840, 850, 850, 880, 880, 900].map((k) => k * 1000),
    mensalidadesPrev: 742680,
    mensalidadesRec: 719664,
    ticketLoja: 142.6,
    ticketDelta: 8,
    fontes: [
      { id: 'mens', label: 'Mensalidades', value: 719664, color: '#4a3aff' },
      { id: 'green', label: 'Green fees', value: 41160, color: '#2a93cf' },
      { id: 'alug', label: 'Aluguéis', value: 52340, color: '#d9790a' },
      { id: 'loja', label: 'Loja', value: 38870, color: '#b84fc4' },
      { id: 'torn', label: 'Torneios', value: 9180, color: '#17935f' },
    ],
  };
  ERP.stats.receita[11] = ERP.stats.fontes.reduce((a, f) => a + f.value, 0);
  ERP.months = ERP.stats.receita.map((_, i) => new Date(today.getFullYear(), today.getMonth() - 11 + i, 1));

  /* ---------- Member roster (CRM) ---------- */
  const CAT = { Titular: 300, Familiar: 450, Júnior: 150, Sênior: 210, Corporativo: 980 };
  ERP.categories = CAT;
  const day = (off, hm = '09:00') => {
    const d = new Date(today);
    d.setDate(d.getDate() + off);
    d.setHours(+hm.slice(0, 2), +hm.slice(3, 5), 0, 0);
    return d;
  };
  /* people from data.js (pros are staff, not members) */
  const CURATED = {
    pedro: { cat: 'Titular', number: '0427', since: 2019, last: 0, rounds: 38, method: 'card', last4: '3849', age: 41 },
    julia: { cat: 'Familiar', number: '1188', since: 2021, last: 0, rounds: 22, method: 'pix', bday: 1, age: 34 },
    caio: { cat: 'Titular', number: '0912', since: 2017, last: 0, rounds: 51, method: 'card', last4: '5521' },
    thiago: { cat: 'Titular', number: '1342', since: 2022, last: 0, rounds: 17, method: 'boleto' },
    lucas: { cat: 'Titular', number: '1027', since: 2020, last: 0, rounds: 64, method: 'card', last4: '0943', bday: 3, age: 29 },
    rodolfo: { cat: 'Titular', number: '0108', since: 2009, last: -1, rounds: 71, method: 'debito' },
    andre: { cat: 'Corporativo', number: '0655', since: 2015, last: -2, rounds: 33, method: 'card', last4: '1123', bday: 0, age: 47 },
    roberto: { cat: 'Sênior', number: '0231', since: 2004, last: -19, rounds: 12, method: 'card', last4: '7710', bday: -1, age: 61, status: 'inadimplente', months: 2 },
    ricardo: { cat: 'Titular', number: '0786', since: 2016, last: 0, rounds: 44, method: 'pix', bday: 2, age: 52 },
    beatriz: { cat: 'Familiar', number: '1093', since: 2020, last: 0, rounds: 29, method: 'card', last4: '3307' },
    fernanda: { cat: 'Titular', number: '1415', since: 2023, last: -3, rounds: 14, method: 'pix' },
    gustavo: { cat: 'Titular', number: '0974', since: 2018, last: -27, rounds: 9, method: 'boleto', status: 'inadimplente', months: 1 },
    vinicius: { cat: 'Júnior', number: '1530', since: 2024, last: -5, rounds: 26, method: 'pix' },
  };
  const FIRST = ['Ana Clara', 'Bruno', 'Camila', 'Daniel', 'Eduardo', 'Fábio', 'Gabriela', 'Henrique', 'Isabela', 'João Pedro', 'Karina', 'Leonardo', 'Mariana', 'Otávio', 'Patrícia', 'Renato', 'Sérgio', 'Tatiana', 'Vitor', 'Alexandre', 'Cláudia', 'Diego', 'Elisa', 'Felipe', 'Heloísa', 'Igor', 'Larissa', 'Marcelo', 'Natália', 'Paulo', 'Rodrigo', 'Simone', 'Tiago', 'Wagner', 'Luíza', 'Murilo', 'Priscila', 'Rogério', 'Sabrina', 'Vanessa', 'Arthur', 'Bianca', 'César', 'Débora', 'Emanuel', 'Flávia', 'Guilherme', 'Juliana', 'Márcio', 'Renata'];
  const LAST = ['Mendes', 'Teixeira', 'Rezende', 'Albuquerque', 'Pacheco', 'Monteiro', 'Siqueira', 'Bastos', 'Furtado', 'Valadares', 'Sampaio', 'Brandão', 'Queiroz', 'Lacerda', 'Moura', 'Vasconcelos', 'Cavalcanti', 'Freitas', 'Nascimento', 'Rangel', 'Bittencourt', 'Arantes', 'Toledo', 'Guerra', 'Paiva', 'Medeiros', 'Coutinho', 'Peixoto', 'Barros', 'Leal', 'Tavares', 'Azevedo', 'Correia', 'Fontes', 'Campos', 'Ribeiro', 'Carvalho', 'Moraes', 'Pires', 'Duarte'];
  const INAD = new Set([3, 11, 19, 30, 47, 66]);
  const SUSP = new Set([24, 58, 91]);
  const slug = (s) =>
    s
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z]+/g, '.')
      .replace(/^\.|\.$/g, '');
  const MAIL = ['gmail.com', 'outlook.com', 'uol.com.br', 'icloud.com', 'terra.com.br'];
  const usedNum = new Set(Object.values(CURATED).map((c) => c.number));
  const members = [];
  const r0 = ERP.rng('golfhub-roster');
  const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
  const mk = (id, name, photo, o, r) => {
    const status = o.status || 'em-dia';
    const fee = CAT[o.cat];
    const m = {
      id,
      name,
      photo,
      cat: o.cat,
      fee,
      number: o.number,
      since: o.since,
      hcp: o.hcp,
      rounds: o.rounds,
      last: o.last == null ? null : day(o.last, '08:00'),
      status,
      method: o.method,
      last4: o.last4 || String(1000 + Math.floor(r() * 8999)),
      brand: r() < 0.6 ? 'Visa' : 'Mastercard',
      email: slug(name.split(' ')[0]) + '.' + slug(name.split(' ').slice(-1)[0]) + '@' + pick(r, MAIL),
      phone: '(61) 9' + (8000 + Math.floor(r() * 1999)) + '-' + (1000 + Math.floor(r() * 8999)),
      age: o.age,
      bday: o.bday,
    };
    if (status === 'inadimplente' || status === 'suspenso') {
      const months = o.months || (status === 'suspenso' ? 4 : 1 + Math.floor(r() * 3));
      const base = fee * months;
      m.overdue = { months, days: 3 + (months - 1) * 30 + Math.floor(r() * 4), amount: Math.round((base * 1.02 + base * 0.01 * months) * 100) / 100 };
    }
    /* last six monthly charges, newest first (due day 20) */
    m.history = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(today.getFullYear(), today.getMonth() - i - (today.getDate() >= 20 ? 0 : 1), 20, 10, 0);
      const late = m.overdue && i < m.overdue.months;
      return { date: d, amount: fee, status: late ? 'atraso' : 'pago', via: late ? 'Cartão recusado' : methodLabel(m) };
    });
    return m;
  };
  function methodLabel(m) {
    return m.method === 'card' ? `${m.brand} ••••\u00a0${m.last4}` : m.method === 'pix' ? 'Pix' : m.method === 'boleto' ? 'Boleto' : 'Débito automático';
  }
  ERP.methodLabel = methodLabel;
  Object.keys(CURATED).forEach((id) => {
    const p = GH.people[id];
    const r = ERP.rng('m-' + id);
    members.push(mk(id, p.name, p.photo, { ...CURATED[id], hcp: p.hcp }, r));
  });
  const seen = new Set(members.map((m) => m.name));
  for (let i = 0; members.length < 214; i++) {
    const name = FIRST[i % FIRST.length] + ' ' + LAST[(i * 7 + Math.floor(i / FIRST.length) * 3) % LAST.length];
    if (seen.has(name)) continue;
    seen.add(name);
    const r = ERP.rng('g-' + i);
    const c = r();
    const cat = c < 0.55 ? 'Titular' : c < 0.77 ? 'Familiar' : c < 0.89 ? 'Sênior' : c < 0.96 ? 'Júnior' : 'Corporativo';
    let number;
    do number = String(100 + Math.floor(r0() * 1600)).padStart(4, '0');
    while (usedNum.has(number));
    usedNum.add(number);
    const since = 1998 + Math.floor(r() * 28);
    const status = SUSP.has(i) ? 'suspenso' : INAD.has(i) ? 'inadimplente' : 'em-dia';
    const fresh = since >= 2026 && r() < 0.5;
    members.push(
      mk('s' + number, name, null, {
        cat,
        number,
        since,
        hcp: r() < 0.08 ? null : Math.round((2 + r() * 30) * 10) / 10,
        rounds: fresh ? 0 : status === 'suspenso' ? 2 + Math.floor(r() * 4) : 4 + Math.floor(r() * 56),
        last: fresh ? null : status === 'suspenso' ? -(70 + Math.floor(r() * 120)) : -Math.floor(Math.pow(r(), 1.6) * 45),
        method: pick(r, ['card', 'card', 'card', 'pix', 'boleto', 'debito']),
        status,
      }, r),
    );
  }
  ERP.members = members;
  ERP.byId = Object.fromEntries(members.map((m) => [m.id, m]));
  ERP.person = (id) => ERP.byId[id] || (GH.people[id] ? { id, ...GH.people[id] } : { id, name: String(id) });
  ERP.first = (p) => (typeof p === 'string' ? ERP.person(p) : p).name.split(' ')[0];
  ERP.short = (p) => {
    const w = (typeof p === 'string' ? ERP.person(p) : p).name.split(' ');
    return w.length > 1 ? w[0] + ' ' + w[w.length - 1][0] + '.' : w[0];
  };
  /* this week's birthdays (curated: Roberto yesterday, André today …) */
  ERP.birthdays = members
    .filter((m) => m.bday != null && typeof m.bday === 'number')
    .map((m) => ({ ...m, date: day(m.bday) }))
    .sort((a, b) => a.date - b.date);

  /* ---------- Tee sheet (seeded per date + course) ---------- */
  ERP.courseMeta = {
    a: { id: 'a', name: 'Campo A', open: '06:30', close: '16:50', step: 10, unit: 'Vaga', sub: '18 buracos · par 72' },
    b: { id: 'b', name: 'Campo B', open: '06:30', close: '16:50', step: 10, unit: 'Vaga', sub: '9 buracos · par 34' },
    range: { id: 'range', name: 'Driving range', open: '07:00', close: '18:30', step: 30, unit: 'Baia', sub: '40 baias · aberto até 19h' },
  };
  const BLOCKS = {
    a: [{ from: '12:00', to: '12:30', title: 'Manutenção', note: 'Corte e rolagem dos greens' }],
    b: [{ from: '06:30', to: '06:50', title: 'Irrigação', note: 'Greens 1 a 9' }],
    range: [{ from: '12:00', to: '12:30', title: 'Recolhimento', note: 'Recolhimento de bolas' }],
  };
  const sheets = {};
  const guestName = (r) => {
    const f = ['Bernardo', 'Cecília', 'Davi', 'Lívia', 'Mateus', 'Olívia', 'Rafaela', 'Samuel', 'Valentina', 'Enzo', 'Helena', 'Nicolas'];
    const l = ['Assis', 'Viana', 'Prates', 'Godoy', 'Lobo', 'Salgado', 'Quintela', 'Borba'];
    return pick(r, f) + ' ' + pick(r, l);
  };
  /* guest label agrees with the first name (all generated guest names ending in "a" are female) */
  ERP.convidado = (p) => (/a$/i.test(String(p.name || '').split(' ')[0]) ? 'Convidada' : 'Convidado');
  const CODE = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const code = (r) => 'GH-' + Array.from({ length: 4 }, () => CODE[Math.floor(r() * CODE.length)]).join('');

  ERP.sheet = (date, course) => {
    const dk = ERP.fmt.iso(date);
    const key = dk + ':' + course;
    if (sheets[key]) return sheets[key];
    const meta = ERP.courseMeta[course];
    const r = ERP.rng('sheet-' + key);
    const dd = dayDiff(date);
    const wknd = [0, 6].includes(ERP.dateFromKey(dk).getDay());
    const rows = [];
    for (let m = ERP.mins(meta.open); m <= ERP.mins(meta.close); m += meta.step) rows.push({ t: ERP.hm(m), m, block: null, bk: null });
    (BLOCKS[course] || []).forEach((b) => rows.forEach((row) => row.m >= ERP.mins(b.from) && row.m < ERP.mins(b.to) && (row.block = b)));
    /* player pool: members in good standing, minus the people placed by hand */
    const fixed = [];
    if (dd === 0 && course === 'a')
      fixed.push(
        { t: '07:30', ids: ['julia', 'thiago'], cart: 1, method: 'conta', via: 'app', at: -9 },
        { t: '08:10', ids: ['pedro', 'caio', 'lucas'], cart: 1, method: 'conta', via: 'app', at: -12, code: 'GH-8T2D' },
      );
    if (dd === 0 && course === 'b') fixed.push({ t: '08:00', ids: ['ricardo', 'beatriz'], cart: 1, method: 'pix', via: 'app', at: -6 });
    if (dd === 0 && course === 'range')
      fixed.push({ t: '09:00', ids: ['andre'], method: 'conta', via: 'recepcao', at: -4, balls: 2 }, { t: '09:30', ids: ['gustavo', 'fernanda'], method: 'pix', via: 'app', at: -3, balls: 3 });
    GH.bookings
      .filter((b) => b.kind === 'tee' && b.course === course && ERP.fmt.iso(b.date) === dk)
      .forEach((b) => fixed.push({ t: ERP.fmt.time(b.date), ids: b.players, cart: b.cart ? 1 : 0, method: 'card', code: b.code, total: b.total, id: b.id }));
    const taken = new Set(fixed.flatMap((f) => f.ids));
    const pool = members.filter((p) => p.status !== 'suspenso' && !taken.has(p.id));
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    let pi = 0;
    const nextMember = () => pool[pi++ % pool.length];
    const cm = ERP.clockMins;
    const mkPlayers = (ids, row, n, rr) => {
      const ps = ids ? ids.map((id) => ERP.person(id)) : [];
      while (!ids && ps.length < n) {
        if (ps.length > 0 && rr() < 0.13) ps.push({ id: null, name: guestName(rr), guest: true, host: ps[0].name });
        else ps.push(nextMember());
      }
      return ps.map((p, k) => ({ id: p.id, name: p.name, photo: p.photo, hcp: p.hcp, guest: !!p.guest, host: p.host, baia: course === 'range' ? 8 + ((row.m / 30) * 3 + k * 2) % 32 : null, checkin: null, via: null }));
    };
    rows.forEach((row) => {
      if (row.block) return;
      const fx = fixed.find((f) => f.t === row.t);
      const h = row.m / 60;
      let p = h < 7 ? 0.72 : h < 10 ? 0.93 : h < 12 ? 0.74 : h < 14 ? 0.46 : h < 16 ? 0.66 : 0.5;
      if (course === 'b') p -= 0.06;
      if (course === 'range') p = h < 10 ? 0.7 : h > 16 ? 0.85 : 0.55;
      if (wknd) p += 0.06;
      const rr = ERP.rng(key + row.t);
      if (!fx && rr() > p) return;
      const nr = rr();
      const n = fx ? fx.ids.length : course === 'range' ? 1 + Math.floor(rr() * 3) : nr < 0.08 ? 1 : nr < 0.3 ? 2 : nr < 0.55 ? 3 : 4;
      const players = mkPlayers(fx && fx.ids, row, n, rr);
      const guests = players.filter((x) => x.guest).length;
      const cart = fx ? fx.cart || 0 : course === 'range' ? 0 : rr() < 0.55 ? Math.ceil(n / 2) : 0;
      const clubs = fx || course === 'range' ? 0 : rr() < 0.1 ? 1 : 0;
      const balls = course === 'range' ? (fx && fx.balls) || n + Math.floor(rr() * 2) : 0;
      const method = fx ? fx.method : guests ? (rr() < 0.5 ? 'pix' : 'card') : rr() < 0.62 ? 'conta' : rr() < 0.6 ? 'card' : 'pix';
      const total = fx && fx.total != null ? fx.total : guests * GH.prices.greenFeeGuest + cart * GH.prices.cart + clubs * GH.prices.clubs + balls * GH.prices.balls;
      const bk = {
        id: fx && fx.id ? fx.id : course + row.t.replace(':', ''),
        date: dk,
        course,
        t: row.t,
        players,
        cart,
        clubs,
        balls,
        method,
        total,
        code: (fx && fx.code) || code(rr),
        channel: rr() < 0.78 ? 'App GolfHub' : rr() < 0.6 ? 'Recepção' : 'WhatsApp',
        created: day(dd - 1 - Math.floor(rr() * 6), ERP.hm(7 * 60 + Math.floor(rr() * 13 * 60))),
        reminder: dd >= 0 ? null : null,
      };
      /* check-in state */
      const arrive = (pl, early) => {
        pl.checkin = ERP.hm(row.m - early);
        pl.via = rr() < 0.7 ? 'app' : 'recepcao';
      };
      if (dd < 0 || (dd === 0 && row.m < cm - 15)) {
        if (fx || rr() > 0.07) bk.players.forEach((pl) => arrive(pl, fx && fx.at ? -fx.at : 4 + Math.floor(rr() * 18)));
      } else if (dd === 0 && row.m <= cm + 30) {
        bk.players.forEach((pl) => rr() < (row.m <= cm + 10 ? 0.62 : 0.35) && arrive(pl, Math.max(1, row.m - cm + Math.floor(rr() * 8))));
      }
      if (fx && fx.via) bk.players.forEach((pl) => pl.checkin && (pl.via = fx.via));
      row.bk = bk;
    });
    const sh = { date: dk, course, meta, rows, dd };
    sheets[key] = sh;
    return sh;
  };
  /* status: chegou | parcial | aguardando | noshow | confirmada */
  ERP.status = (bk, dd = dayDiff(ERP.dateFromKey(bk.date))) => {
    const n = bk.players.length;
    const c = bk.players.filter((p) => p.checkin).length;
    if (c === n) return 'chegou';
    if (c > 0) return 'parcial';
    if (dd < 0 || (dd === 0 && ERP.mins(bk.t) < ERP.clockMins - 15)) return 'noshow';
    if (dd > 0) return 'confirmada';
    return 'aguardando';
  };
  ERP.statusMeta = {
    chegou: { label: 'Chegou', cls: 'ok', icon: 'tick-circle' },
    parcial: { label: 'Chegando', cls: 'info', icon: 'profile-2-user' },
    aguardando: { label: 'Aguardando', cls: 'warn', icon: 'clock' },
    noshow: { label: 'No-show', cls: 'bad', icon: 'close-circle' },
    confirmada: { label: 'Confirmada', cls: 'neutral', icon: 'calendar-tick' },
  };
  ERP.methodName = { conta: 'Na mensalidade', card: 'Cartão', pix: 'Pix' };

  /* ---------- Shell: sidebar + top bar (called inline right after the placeholders, so the first paint has it) ---------- */
  const NAV = [
    { id: 'dashboard', href: 'index.html', label: 'Dashboard', icon: 'element-4' },
    { id: 'agenda', href: 'agenda.html', label: 'Agenda do campo', icon: 'calendar' },
    { id: 'socios', href: 'socios.html', label: 'Sócios', icon: 'profile-2-user' },
    { id: 'financeiro', href: 'financeiro.html', label: 'Financeiro', icon: 'wallet-2' },
    { soon: 'Loja e POS', label: 'Loja e POS', icon: 'shop' },
    { soon: 'Torneios', label: 'Torneios', icon: 'cup' },
    { soon: 'Relatórios', label: 'Relatórios', icon: 'chart-2' },
    { soon: 'Mensagens', label: 'Mensagens', icon: 'messages-2' },
  ];
  ERP.logo = () =>
    `<svg class="brand__dots" viewBox="0 0 23 23" aria-hidden="true"><circle cx="3.2" cy="19.4" r="3.1" fill="#4A3AFF"/><circle cx="11.3" cy="19.4" r="3.2" fill="#553FFE"/><circle cx="11.3" cy="11.3" r="3.2" fill="#6045FD"/><circle cx="19.5" cy="19.4" r="3.1" fill="#6A4AFC"/><circle cx="19.5" cy="11.3" r="3.1" fill="#7550FB"/><circle cx="19.5" cy="3.2" r="3.1" fill="#8055FA"/></svg><span class="brand__word">Golf<b>Hub</b></span>`;
  ERP.side = (el) => {
    const page = document.body.dataset.page;
    el.innerHTML = `<a class="brand" href="index.html" aria-label="GolfHub, ir para o Dashboard">${ERP.logo()}</a>
      <nav class="nav" aria-label="Módulos">
        <span class="nav__hover" aria-hidden="true"></span>
        <ul>${NAV.map((n) => {
          const inner = `${ERP.icon(n.icon)}<span>${n.label}</span>`;
          const tip = ` title="${n.label}"`;
          if (n.soon) return `<li><button type="button" class="nav__item"${tip} data-soon="${n.soon}">${inner}<em class="nav__soon">em breve</em></button></li>`;
          const cur = n.id === page;
          return `<li><a class="nav__item"${tip} href="${n.href}"${cur ? ' aria-current="page"' : ''}>${inner}${cur ? '<i class="nav__ind" aria-hidden="true"></i>' : ''}</a></li>`;
        }).join('')}</ul>
      </nav>
      <div class="side__foot">
        <div class="club">
          <span class="club__ico">${ERP.icon('flag')}</span>
          <span><b>${GH.club.name}</b><small>${GH.club.city}</small></span>
        </div>
        <button type="button" class="nav__item nav__item--sm" title="Configurações" data-soon="Configurações">${ERP.icon('setting-2')}<span>Configurações</span></button>
      </div>`;
    /* hover pill that slides between items */
    const nav = el.querySelector('.nav');
    const pill = nav.querySelector('.nav__hover');
    const move = (it) => {
      if (!it) return nav.classList.remove('is-hover');
      pill.style.transform = `translateY(${it.offsetTop}px)`;
      pill.style.height = it.offsetHeight + 'px';
      requestAnimationFrame(() => nav.classList.add('is-hover'));
    };
    nav.addEventListener('pointerover', (e) => move(e.target.closest('.nav__item')));
    nav.addEventListener('pointerleave', () => move(null));
    nav.addEventListener('focusin', (e) => e.target.matches('.nav__item:focus-visible') && move(e.target));
    nav.addEventListener('focusout', () => move(null));
  };
  ERP.top = (el) => {
    const me = ERP.person('rodolfo');
    const ns = ERP.sheet(today, 'a').rows.filter((r) => r.bk && ERP.status(r.bk, 0) === 'noshow');
    el.innerHTML = `<form class="search" role="search" action="socios.html">
        <label class="sr-only" for="q">Buscar sócio</label>
        <input id="q" name="q" type="search" placeholder="Buscar sócio, nº ou e-mail" autocomplete="off" value="${ERP.esc(document.body.dataset.page === 'socios' ? qs.get('q') || '' : '')}"/>
        <button class="search__btn" type="submit" aria-label="Buscar">${ERP.icon('search-normal-1')}</button>
      </form>
      <div class="top__right">
        <p class="top__now"><span class="live-dot" aria-hidden="true"></span><span data-live-clock>${ERP.fmt.full(today)} · ${ERP.fmt.time(clock)}</span></p>
        <div class="pop-wrap">
          <button type="button" class="icon-btn bell" aria-expanded="false" aria-controls="notif" aria-label="Notificações, 3 novas">${ERP.icon('notification')}<span class="bell__dot" aria-hidden="true"></span></button>
          <div class="pop" id="notif" role="region" aria-label="Notificações" hidden>
            <p class="pop__title">Notificações <span class="badge badge--indigo">3 novas</span></p>
            <a class="pop__item" href="agenda.html?campo=a"><span class="pop__ico t-bad">${ERP.icon('close-circle')}</span><span><b>${ns.length || 'Nenhum'} ${ns.length === 1 ? 'no-show' : 'no-shows'} no Campo A</b><small>${ns.length ? ns.slice(0, 3).map((r) => r.t).join(', ') + ' · vagas liberadas para a lista de espera' : 'Todos os grupos da manhã chegaram'}</small></span></a>
            <a class="pop__item" href="socios.html?id=roberto"><span class="pop__ico t-warn">${ERP.icon('card')}</span><span><b>Cartão recusado: Roberto Xavier</b><small>Mensalidade de outubro · 2 em atraso</small></span></a>
            <button type="button" class="pop__item" data-soon="Torneios"><span class="pop__ico t-indigo">${ERP.icon('cup')}</span><span><b>Copa Primavera: 51 de 72 inscritos</b><small>Inscrições fecham ${ERP.fmt.dayLabel(day(10)).toLowerCase()}</small></span></button>
          </div>
        </div>
        <button type="button" class="me" data-soon="Perfil e configurações">
          ${ERP.avatar(me, 48)}
          <span class="me__txt"><b>${me.name}</b><small>Gerente</small></span>
          ${ERP.icon('arrow-down-2', 'me__chev')}
        </button>
      </div>`;
    const bell = el.querySelector('.bell');
    const pop = el.querySelector('#notif');
    const close = () => {
      pop.classList.remove('is-open');
      bell.setAttribute('aria-expanded', 'false');
      setTimeout(() => !pop.classList.contains('is-open') && (pop.hidden = true), 220);
    };
    bell.addEventListener('click', () => {
      if (pop.classList.contains('is-open')) return close();
      pop.hidden = false;
      requestAnimationFrame(() => pop.classList.add('is-open'));
      bell.setAttribute('aria-expanded', 'true');
      bell.querySelector('.bell__dot')?.remove();
      bell.setAttribute('aria-label', 'Notificações');
    });
    document.addEventListener('click', (e) => !e.target.closest('.pop-wrap') && pop.classList.contains('is-open') && close());
    document.addEventListener('keydown', (e) => e.key === 'Escape' && pop.classList.contains('is-open') && (close(), bell.focus()));
    /* live clock in the top bar */
    const lc = el.querySelector('[data-live-clock]');
    setInterval(() => (lc.textContent = ERP.fmt.full(today) + ' · ' + ERP.fmt.time(ERP.live())), 5000);
  };

  /* ---------- Toast (optional action, e.g. "Desfazer") ---------- */
  ERP.toast = (msg, opt = {}) => {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      t.setAttribute('aria-live', 'polite');
      document.body.appendChild(t);
    }
    t.innerHTML = `${ERP.icon(opt.icon || 'tick-circle')}<span></span>${opt.action ? `<button type="button" class="toast__act">${ERP.esc(opt.action.label)}</button>` : ''}`;
    t.querySelector('span').textContent = msg;
    if (opt.action)
      t.querySelector('.toast__act').addEventListener('click', () => {
        opt.action.fn();
        t.classList.remove('is-on');
      });
    t.classList.remove('is-on');
    void t.offsetWidth;
    t.classList.add('is-on');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('is-on'), opt.action ? 5200 : 2800);
  };
  document.addEventListener('click', (e) => {
    const s = e.target.closest('[data-soon]');
    if (s) ERP.toast(`${s.dataset.soon}: em breve`, { icon: 'info-circle' });
  });

  /* ---------- Tooltip (pointer) ---------- */
  let tipEl;
  ERP.tip = {
    show(html, x, y, place = 'top') {
      if (!tipEl) {
        tipEl = document.createElement('div');
        tipEl.className = 'tip';
        tipEl.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tipEl);
      }
      tipEl.innerHTML = html;
      tipEl.dataset.place = place;
      const w = tipEl.offsetWidth;
      const h = tipEl.offsetHeight;
      let left = Math.min(Math.max(8, x - w / 2), innerWidth - w - 8);
      let top = place === 'top' ? y - h - 12 : y + 14;
      if (top < 8) top = y + 14;
      tipEl.style.transform = `translate(${left}px, ${top}px)`;
      tipEl.classList.add('is-on');
    },
    hide() {
      tipEl && tipEl.classList.remove('is-on');
    },
  };

  /* ---------- Count-up: <span data-count="2316" data-fmt="num|brl0|brl|pct|num1"> ---------- */
  const fmtBy = (f, v) => (f === 'brl0' ? ERP.fmt.brl0(v) : f === 'brl' ? ERP.fmt.brl(v) : f === 'pct' ? ERP.fmt.pct(v) : f === 'num1' ? num(v, 1) : f === 'mil' ? ERP.fmt.mil(v) : num(Math.round(v)));
  ERP.countUp = (root = document) => {
    root.querySelectorAll('[data-count]').forEach((el) => {
      const to = +el.dataset.count;
      const f = el.dataset.fmt || 'num';
      const final = fmtBy(f, to);
      el.innerHTML = `<span aria-hidden="true">${ERP.reduced() ? final : fmtBy(f, 0)}</span><span class="sr-only">${final}</span>`;
      if (ERP.reduced()) return;
      const out = el.firstChild;
      const host = el.closest('[style*="--d"]');
      const delay = (host ? +getComputedStyle(host).getPropertyValue('--d') || 0 : 0) * 70 + 220 + (+el.dataset.delay || 0);
      const dur = 1300;
      let start;
      const step = (ts) => {
        if (!start) start = ts + delay;
        const k = Math.min(1, Math.max(0, (ts - start) / dur));
        const e = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        out.textContent = fmtBy(f, f === 'num' || f === 'brl0' ? Math.round(to * e) : to * e);
        if (k < 1) requestAnimationFrame(step);
        else out.textContent = final;
      };
      requestAnimationFrame(step);
    });
  };

  /* ---------- Drawer / dialog helper with focus trap ---------- */
  ERP.overlay = (panel, scrim) => {
    let last = null;
    const focusables = () => [...panel.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter((x) => x.offsetParent !== null);
    const onKey = (e) => {
      if (e.key === 'Escape') return api.close();
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) (e.preventDefault(), f[f.length - 1].focus());
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) (e.preventDefault(), f[0].focus());
    };
    const api = {
      isOpen: () => panel.classList.contains('is-open'),
      open(from) {
        last = from || document.activeElement;
        panel.hidden = false;
        scrim && (scrim.hidden = false);
        void panel.offsetWidth;
        panel.classList.add('is-open');
        scrim && scrim.classList.add('is-open');
        document.addEventListener('keydown', onKey);
        setTimeout(() => (panel.querySelector('[data-autofocus]') || focusables()[0] || panel).focus({ preventScroll: true }), 60);
        api.onopen && api.onopen();
      },
      close() {
        if (!api.isOpen()) return;
        panel.classList.remove('is-open');
        scrim && scrim.classList.remove('is-open');
        document.removeEventListener('keydown', onKey);
        setTimeout(() => {
          if (api.isOpen()) return;
          panel.hidden = true;
          scrim && (scrim.hidden = true);
        }, 420);
        last && last.focus && last.focus({ preventScroll: true });
        api.onclose && api.onclose();
      },
    };
    scrim && scrim.addEventListener('click', () => api.close());
    panel.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => api.close()));
    return api;
  };

  /* ---------- SVG helpers ---------- */
  ERP.arc = (cx, cy, r, a0, a1) => {
    const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const [x0, y0] = p(a0);
    const [x1, y1] = p(a1);
    const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
    return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${large} ${a1 > a0 ? 1 : 0} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  };

  /* ---------- Boot (after the page script) ---------- */
  /* once a card has risen, drop the animation so hover transitions (lift) run smoothly */
  document.addEventListener('animationend', (e) => {
    if (e.animationName === 'rise' && e.target.classList.contains('rise')) e.target.classList.remove('rise');
    if (e.animationName === 'row-in') e.target.classList.remove('row-in');
  });
  document.addEventListener('DOMContentLoaded', () => {
    ERP.countUp();
    document.documentElement.classList.add('is-ready');
  });
})();
