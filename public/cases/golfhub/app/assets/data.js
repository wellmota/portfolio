/* GolfHub — prototype data. The data contract every screen reads (GH.*).
   Dates are relative to today, so the prototype always looks current.
   Distances in metres everywhere (the Figma mixed "345M" and "120 y"); money in BRL. */
(function () {
  const GH = (window.GH = window.GH || {});
  const now = new Date();
  now.setSeconds(0, 0);
  GH.now = now;
  /* day(+3, '07:40') → Date three days from today at 07:40 */
  const day = (offset, hm = '09:00') => {
    const d = new Date(now);
    d.setDate(d.getDate() + offset);
    const [h, m] = hm.split(':').map(Number);
    d.setHours(h, m, 0, 0);
    return d;
  };
  GH.day = day;
  /* next weekday (0=dom … 6=sáb) at hh:mm, at least one day ahead */
  const next = (wd, hm) => {
    const d = day(1, hm);
    while (d.getDay() !== wd) d.setDate(d.getDate() + 1);
    return d;
  };

  GH.club = {
    name: 'Clube de Golfe de Brasília',
    short: 'Golfe Brasília',
    city: 'Brasília, DF',
    address: 'SCES Trecho 2, Lote 2 — Asa Sul',
    phone: '(61) 3224-1000',
    weather: { temp: 24.5, wind: 12, windDir: 'NE', humidity: 41, sky: 'Céu limpo', rain: 0 },
  };

  /* People. photo → assets/img/av/<photo>.webp; no photo → monogram */
  GH.people = {
    pedro: { name: 'Pedro Henrique', photo: 'pedro', hcp: 12.4, role: 'Sócio titular', since: 2019, number: '0427' },
    julia: { name: 'Júlia Andrade', photo: 'p1', hcp: 18.2 },
    caio: { name: 'Caio Martins', photo: 'p2', hcp: 9.1 },
    thiago: { name: 'Thiago Rocha', photo: 'p3', hcp: 15.6 },
    lucas: { name: 'Lucas Ferreira', photo: 'p4', hcp: 6.3 },
    rodolfo: { name: 'Rodolfo Guimarães', photo: 'rodolfo', hcp: 4.2 },
    andre: { name: 'André Faria', photo: 'andre', hcp: 10.8 },
    marco: { name: 'Marco Dantas', photo: 'marco', hcp: 0, pro: true },
    roberto: { name: 'Roberto Xavier', photo: 'roberto', hcp: 21.5 },
    ricardo: { name: 'Ricardo Lemos', photo: 'ricardo', hcp: 8.0 },
    helena: { name: 'Helena Prado', hcp: 1.5, pro: true },
    rafael: { name: 'Rafael Costa', hcp: 3.0, pro: true },
    beatriz: { name: 'Beatriz Nogueira', hcp: 14.0 },
    fernanda: { name: 'Fernanda Lima', hcp: 19.7 },
    gustavo: { name: 'Gustavo Sales', hcp: 11.2 },
    vinicius: { name: 'Vinícius Prado', hcp: 13.9 },
  };
  GH.user = 'pedro';
  /* friends Pedro plays with (round setup, booking) */
  GH.friends = ['caio', 'lucas', 'julia', 'thiago', 'andre', 'ricardo', 'roberto', 'rodolfo'];

  /* Courses. Figma home carousel: Campo A in the middle, two more cards peeking. */
  GH.courses = [
    { id: 'a', name: 'Campo A', kind: '18 buracos · Par 72', holes: 18, par: 72, length: 6425, photo: 'campo-a', here: ['julia', 'caio', 'thiago', 'lucas'], hereCount: 15, green: 'Green rápido · 10,5 pés', status: 'Aberto' },
    { id: 'b', name: 'Campo B', kind: '9 buracos · Par 34', holes: 9, par: 34, length: 2480, photo: 'campo-c', here: ['ricardo', 'beatriz'], hereCount: 6, green: 'Green médio · 9 pés', status: 'Aberto' },
    { id: 'range', name: 'Driving range', kind: '40 baias · área de chip e putt', holes: 0, par: 0, length: 280, photo: 'campo-b', here: ['andre', 'gustavo', 'fernanda'], hereCount: 9, green: 'Bolas à vontade para sócios', status: 'Aberto até 19h' },
  ];

  /* Tee boxes (distance factor over the white tee) */
  GH.tees = [
    { id: 'preto', name: 'Preto', color: '#1f1f1f', factor: 1.08 },
    { id: 'azul', name: 'Azul', color: '#2f6fd6', factor: 1.04 },
    { id: 'branco', name: 'Branco', color: '#ffffff', factor: 1 },
    { id: 'vermelho', name: 'Vermelho', color: '#d8423a', factor: 0.86 },
  ];

  /* Campo A, hole by hole (white tee, metres). idx = stroke index.
     shape feeds the 3D scene: bend (−1 left … 1 right), water side, bunkers, trees. */
  GH.holes = [
    { n: 1, par: 4, m: 362, idx: 7, shape: { bend: 0.35, water: null, bunkers: 2, trees: 'both' } },
    { n: 2, par: 4, m: 345, idx: 11, shape: { bend: 0.55, water: 'left', bunkers: 3, trees: 'both' } },
    { n: 3, par: 3, m: 158, idx: 17, shape: { bend: 0, water: 'front', bunkers: 2, trees: 'right' } },
    { n: 4, par: 5, m: 492, idx: 1, shape: { bend: -0.6, water: 'right', bunkers: 4, trees: 'both' } },
    { n: 5, par: 4, m: 388, idx: 3, shape: { bend: -0.25, water: null, bunkers: 3, trees: 'left' } },
    { n: 6, par: 3, m: 172, idx: 15, shape: { bend: 0.1, water: 'left', bunkers: 3, trees: 'both' } },
    { n: 7, par: 4, m: 401, idx: 5, shape: { bend: 0.45, water: null, bunkers: 2, trees: 'both' } },
    { n: 8, par: 5, m: 515, idx: 9, shape: { bend: 0.3, water: 'right', bunkers: 4, trees: 'left' } },
    { n: 9, par: 4, m: 370, idx: 13, shape: { bend: -0.4, water: null, bunkers: 2, trees: 'both' } },
    { n: 10, par: 4, m: 380, idx: 8, shape: { bend: -0.3, water: 'left', bunkers: 2, trees: 'both' } },
    { n: 11, par: 5, m: 498, idx: 2, shape: { bend: 0.5, water: null, bunkers: 4, trees: 'both' } },
    { n: 12, par: 3, m: 165, idx: 18, shape: { bend: 0, water: 'front', bunkers: 1, trees: 'left' } },
    { n: 13, par: 4, m: 355, idx: 12, shape: { bend: 0.25, water: null, bunkers: 3, trees: 'right' } },
    { n: 14, par: 4, m: 392, idx: 4, shape: { bend: -0.55, water: 'right', bunkers: 2, trees: 'both' } },
    { n: 15, par: 3, m: 185, idx: 14, shape: { bend: 0.15, water: null, bunkers: 3, trees: 'both' } },
    { n: 16, par: 5, m: 505, idx: 6, shape: { bend: -0.35, water: 'left', bunkers: 3, trees: 'both' } },
    { n: 17, par: 4, m: 338, idx: 16, shape: { bend: 0.6, water: null, bunkers: 2, trees: 'left' } },
    { n: 18, par: 4, m: 404, idx: 10, shape: { bend: -0.2, water: 'front', bunkers: 3, trees: 'both' } },
  ];

  /* Demo round (used when nothing is saved under gh:round): Pedro, Campo A, white tee,
     hole 1 done (par), on hole 2 after a 220 m drive — 125 m to the pin (the Figma's "125"). */
  GH.demoRound = {
    id: 'demo',
    course: 'a',
    tee: 'branco',
    holes: 18,
    players: ['pedro', 'caio', 'lucas'],
    cart: true,
    startedAt: day(0, '08:10').toISOString(),
    current: 2,
    scores: { 1: { pedro: { strokes: 4, putts: 2, fairway: true }, caio: { strokes: 4, putts: 2, fairway: true }, lucas: { strokes: 3, putts: 1, fairway: true } } },
    ball: { hole: 2, carried: 220, toPin: 125 },
  };

  /* Recent rounds (profile, resumo comparisons) */
  GH.rounds = [
    { id: 'r-1', date: day(-6, '07:20'), course: 'a', holes: 18, strokes: 84, putts: 32, fairways: [8, 14], greens: [7, 18], best: 'Buraco 7 — birdie' },
    { id: 'r-2', date: day(-13, '15:10'), course: 'a', holes: 18, strokes: 86, putts: 33, fairways: [7, 14], greens: [6, 18], best: 'Buraco 12 — par' },
    { id: 'r-3', date: day(-20, '08:00'), course: 'b', holes: 9, strokes: 40, putts: 16, fairways: [4, 7], greens: [4, 9], best: 'Buraco 4 — birdie' },
    { id: 'r-4', date: day(-27, '07:40'), course: 'a', holes: 18, strokes: 88, putts: 34, fairways: [6, 14], greens: [5, 18], best: 'Buraco 3 — par' },
  ];

  /* Bookings (tee times). Upcoming one shows on Home. */
  GH.bookings = [
    { id: 'bk-1', kind: 'tee', course: 'a', date: next(6, '07:40'), players: ['pedro', 'caio', 'lucas', 'andre'], cart: true, status: 'confirmada', code: 'GH-7Q4K', total: 120 },
    { id: 'bk-2', kind: 'aula', pro: 'marco', date: day(3, '17:00'), status: 'confirmada', code: 'GH-2M8P', total: 260, topic: 'Swing e jogo longo' },
  ];

  /* Prices (BRL). Members don't pay green fee; guests do. */
  GH.prices = { greenFeeGuest: 280, cart: 120, clubs: 150, balls: 30, lesson: 260, lesson30: 150, tournament: 180 };

  /* Pros (aulas) */
  GH.pros = [
    { id: 'marco', title: 'Professor PGA', focus: 'Swing e jogo longo', rating: 4.9, lessons: 1240, bio: 'Ex-jogador do circuito sul-americano. Trabalha com vídeo e radar de lançamento para ajustar o swing.' },
    { id: 'helena', title: 'Professora', focus: 'Jogo curto e putt', rating: 4.8, lessons: 860, bio: 'Especialista em aproximação, bunker e leitura de green. Aulas no chipping green e no putting green.' },
    { id: 'rafael', title: 'Professor', focus: 'Iniciantes e juniores', rating: 4.9, lessons: 640, bio: 'Do primeiro taco ao primeiro handicap: fundamentos, regras e etiqueta.' },
  ];

  /* Tournaments & events (Figma modules "Torneios" and "Eventos") */
  GH.tournaments = [
    { id: 't-primavera', name: 'Copa Primavera', format: 'Stableford · 18 buracos', date: day(12, '07:30'), spots: 72, entered: 51, fee: 180, prize: 'Troféu + green fees para o trimestre', hcpMax: 36, course: 'a', status: 'aberta' },
    { id: 't-mensal', name: 'Medal Mensal de Sócios', format: 'Stroke play · 18 buracos', date: day(26, '07:00'), spots: 96, entered: 38, fee: 120, prize: 'Ranking do clube', hcpMax: 28, course: 'a', status: 'aberta' },
    { id: 't-duplas', name: 'Torneio de Duplas', format: 'Four-ball · 9 buracos', date: day(40, '08:00'), spots: 48, entered: 48, fee: 220, prize: 'Troféu para a dupla', hcpMax: 30, course: 'b', status: 'lotada' },
  ];
  GH.events = [
    { id: 'e-clinica', name: 'Clínica de putt', host: 'helena', date: day(5, '17:30'), place: 'Putting green', seats: 12, left: 4, fee: 90 },
    { id: 'e-happy', name: 'Happy hour no clubhouse', date: day(2, '18:30'), place: 'Terraço do clubhouse', seats: 80, left: 23, fee: 0 },
    { id: 'e-noite', name: 'Golfe noturno', date: day(9, '19:30'), place: 'Buracos 1 a 3 · bolas de LED', seats: 24, left: 9, fee: 150 },
  ];

  /* Pro shop & rentals (Figma modules "Loja online", "Ecommerce", "POS") */
  GH.shop = [
    { id: 'clubs', name: 'Aluguel de tacos', sub: 'Set completo · 14 tacos', price: 150, icon: 'bag-2', kind: 'aluguel' },
    { id: 'cart', name: 'Carrinho elétrico', sub: '18 buracos · 2 lugares', price: 120, icon: 'car', kind: 'aluguel' },
    { id: 'balls', name: 'Balde de bolas', sub: '60 bolas · driving range', price: 30, icon: 'shopping-bag', kind: 'aluguel' },
    { id: 'prov1', name: 'Bolas Pro V1', sub: 'Dúzia', price: 189, icon: 'box', kind: 'loja' },
    { id: 'glove', name: 'Luva GolfHub', sub: 'Couro cabretta', price: 89, icon: 'shop', kind: 'loja' },
    { id: 'cap', name: 'Boné do clube', sub: 'Bordado · ajustável', price: 120, icon: 'shop', kind: 'loja' },
  ];

  /* Membership (Figma "Minha assinatura") */
  GH.membership = {
    plan: 'Sócio titular',
    cycle: 'Mensal',
    price: 300,
    dueDay: 20,
    card: { brand: 'VISA', last4: '3849', exp: '08/29', holder: 'PEDRO HENRIQUE' },
    /* last six monthly payments, newest first */
    history: Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i - (now.getDate() >= 20 ? 0 : 1), 20, 10, 0);
      return { id: 'pay-' + i, label: 'Mensalidade', date: d, amount: 300, status: 'pago' };
    }),
    extras: [{ id: 'x-1', label: 'Carrinho elétrico', date: day(-6, '07:05'), amount: 120, status: 'pago' }],
  };

  /* Club ranking — net Stableford points this month */
  GH.ranking = [
    { id: 'rodolfo', pts: 148, trend: 0 },
    { id: 'lucas', pts: 141, trend: 2 },
    { id: 'caio', pts: 137, trend: -1 },
    { id: 'ricardo', pts: 133, trend: 1 },
    { id: 'beatriz', pts: 129, trend: 3 },
    { id: 'andre', pts: 126, trend: -2 },
    { id: 'pedro', pts: 124, trend: 4 },
    { id: 'gustavo', pts: 119, trend: 0 },
    { id: 'thiago', pts: 115, trend: -3 },
    { id: 'julia', pts: 112, trend: 1 },
    { id: 'vinicius', pts: 104, trend: -1 },
    { id: 'roberto', pts: 98, trend: 0 },
  ];

  /* Notifications (tab "Avisos") */
  GH.notifications = [
    { id: 'n1', kind: 'reserva', icon: 'calendar-tick', title: 'Reserva confirmada', body: 'Sábado, 07:40 no Campo A para 4 jogadores. Carrinho incluído.', at: day(0, '08:02'), unread: true, href: 'reservas.html?id=bk-1' },
    { id: 'n2', kind: 'ranking', icon: 'ranking', title: 'Você subiu 4 posições', body: 'Agora você é o 7º no ranking do mês, com 124 pontos.', at: day(0, '07:15'), unread: true, href: 'ranking.html' },
    { id: 'n3', kind: 'torneio', icon: 'cup', title: 'Inscrições abertas: Copa Primavera', body: 'Faltam 21 vagas. Stableford, 18 buracos.', at: day(-1, '18:40'), unread: true, href: 'torneio.html?id=t-primavera' },
    { id: 'n4', kind: 'pagamento', icon: 'card-tick', title: 'Mensalidade paga', body: 'Recebemos R$ 300,00 no cartão final 3849.', at: day(-3, '10:00'), unread: false, href: 'assinatura.html' },
    { id: 'n5', kind: 'clima', icon: 'cloud-sunny', title: 'Previsão para sábado', body: 'Sol, 26 °C e vento fraco. Bom dia para jogar.', at: day(-3, '19:00'), unread: false },
    { id: 'n6', kind: 'convite', icon: 'profile-2-user', title: 'Caio te chamou para jogar', body: 'Domingo, 08:20, Campo B (9 buracos).', at: day(-4, '21:12'), unread: false, href: 'reservar.html?campo=b' },
    { id: 'n7', kind: 'clube', icon: 'info-circle', title: 'Manutenção no green do 12', body: 'Aeração na terça e quarta. Green temporário em uso.', at: day(-6, '09:30'), unread: false },
  ];
})();
