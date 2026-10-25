/* Finby — fictional data for the prototype. Names and photos come from the Figma file; numbers were made
   consistent with each other (prize = installment × members). Dates are relative to today so the
   screens never look stale. Load first: data.js → art.js → app.js → page script. */
(function () {
  const FB = (window.FB = window.FB || {});
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  const day = (n) => {
    const d = new Date(now);
    d.setDate(d.getDate() + n);
    return d;
  };
  /* the `dom`-th day of the month `k` months from now */
  const monthDay = (dom, k = 1) => new Date(now.getFullYear(), now.getMonth() + k, dom, 12);

  /* People. `photo` = assets/img/av/<photo>.jpg; without one the avatar is a monogram.
     level = payment reputation (gold / silver / bronze / null = new). */
  FB.people = {
    alana: { name: 'Alana Oliveira', photo: 'alana', level: 'gold' },
    'maria-helena': { name: 'Maria Helena', photo: 'maria-helena', level: 'gold' },
    franz: { name: 'Franz Ferdinand', photo: 'franz', level: 'silver' },
    mario: { name: 'Mário Augusto', photo: 'mario', level: 'silver' },
    'ana-maria': { name: 'Ana Maria', photo: 'ana-maria', level: null },
    'pedro-paulo': { name: 'Pedro Paulo', photo: 'pedro-paulo', level: 'gold' },
    juliana: { name: 'Juliana Silva', photo: 'juliana', level: 'bronze' },
    ronaldo: { name: 'Ronaldo Fonseca', photo: 'ronaldo', level: null, pending: 'signup' },
    marta: { name: 'Marta Letícia', photo: 'marta', level: 'silver' },
    patricia: { name: 'Patrícia Souza', photo: 'patricia', level: 'bronze' },
    roberto: { name: 'Roberto dos Anjos', level: 'gold' },
    'maria-santana': { name: 'Maria Santana', level: null },
    jose: { name: 'José Ribeiro', level: 'gold' },
    /* phone contacts that are not on Finby yet (the contact picker) */
    debora: { name: 'Débora Vasconcelos', contact: true },
    otavio: { name: 'Otávio Lins', contact: true },
    wagner: { name: 'Wagner Freitas', contact: true },
    danielly: { name: 'Danielly Souza', contact: true },
  };
  FB.me = 'alana';

  /* Friends already on Finby, in the order of the Figma list ("Quem vai participar?") */
  FB.friends = ['roberto', 'mario', 'maria-helena', 'patricia', 'marta', 'ana-maria', 'pedro-paulo', 'juliana', 'franz', 'jose', 'maria-santana', 'ronaldo'];
  /* Phone contacts for the invite picker: frequent first, then recent conversations */
  FB.contacts = {
    frequent: ['ronaldo', 'debora', 'otavio', 'wagner', 'danielly'],
    recent: ['debora', 'ronaldo', 'otavio', 'wagner', 'danielly'],
  };

  FB.user = {
    id: 'alana',
    balance: 10000, // "Saldo em conta" (Figma: R$ 10.000,00)
    yieldLabel: '100% do CDI',
    level: 'gold',
    levelProgress: 0.78, // on-time payments ratio, drives the profile meter
    onTime: { done: 18, of: 23 },
    cards: [
      { id: 'c1', brand: 'visa', last4: '3849', theme: 'violet' },
      { id: 'c2', brand: 'master', last4: '9988', theme: 'night' },
    ],
    bank: { name: 'Nu Pagamentos', short: 'Nubank', agency: '0001', account: '747474-4' },
  };

  /* Consórcios.
     role: member | admin (created by you).   status: active | forming (waiting for people).
     draw: random (Aleatório) | order (Predefinido).   public: listed in "Descubra mais". */
  FB.consorcios = [
    {
      id: 'viagem-bahia',
      name: 'Viagem Bahia',
      theme: 'ocean',
      art: 'beach',
      role: 'member',
      status: 'active',
      draw: 'random',
      prize: 7500,
      installment: 750,
      months: 10,
      paid: 6,
      due: 'Todo dia 10',
      nextDraw: monthDay(10),
      pot: 7500, // what the group has saved this round, earning CDI
      members: ['alana', 'maria-helena', 'mario', 'pedro-paulo', 'juliana', 'franz', 'marta', 'patricia', 'jose', 'roberto'],
      payment: 'c2',
      winners: [
        { id: 'pedro-paulo', date: monthDay(10, 0), amount: 7513.4 },
        { id: 'juliana', date: monthDay(10, -1), amount: 7502.1 },
        { id: 'marta', date: monthDay(10, -2), amount: 7500 },
      ],
    },
    {
      id: 'turma-d',
      name: 'Turma D · Medicina',
      theme: 'violet',
      art: 'graduation',
      role: 'member',
      status: 'active',
      draw: 'order',
      prize: 10000,
      installment: 500,
      months: 20,
      paid: 3,
      due: '5º dia útil',
      nextDraw: monthDay(14),
      pot: 1500,
      members: ['alana', 'franz', 'maria-helena', 'mario', 'ana-maria', 'pedro-paulo', 'juliana', 'roberto', 'jose', 'maria-santana', 'marta', 'patricia', 'ronaldo'],
      memberCount: 20,
      payment: 'c2',
      winners: [
        { id: 'maria-helena', date: day(-6), amount: 10013 },
        { id: 'juliana', date: monthDay(14, -1), amount: 10002.1 },
        { id: 'mario', date: monthDay(14, -2), amount: 10000 },
      ],
    },
    {
      id: 'trabalho',
      name: 'Trabalho',
      theme: 'mint',
      art: 'path',
      role: 'member',
      status: 'active',
      draw: 'random',
      prize: 5345.56,
      installment: 450,
      months: 12,
      paid: 8,
      due: 'Todo dia 15',
      nextDraw: monthDay(15),
      pot: 3600,
      members: ['alana', 'patricia', 'marta', 'jose', 'roberto', 'ana-maria', 'mario', 'pedro-paulo', 'franz', 'juliana', 'maria-santana', 'maria-helena'],
      payment: 'c1',
      winners: [
        { id: 'patricia', date: monthDay(15, -1), amount: 5340.2 },
        { id: 'jose', date: monthDay(15, -2), amount: 5321.9 },
      ],
    },
    {
      id: 'reveillon',
      name: 'Réveillon 2027',
      theme: 'night',
      art: 'fireworks',
      role: 'admin',
      status: 'forming',
      draw: 'order',
      prize: 15000,
      installment: 1500,
      months: 10,
      paid: 0,
      due: 'Todo dia 15',
      start: monthDay(1),
      nextDraw: monthDay(15),
      pot: 0,
      members: ['mario', 'maria-helena', 'pedro-paulo', 'alana', 'ana-maria'],
      /* invited, still waiting: pending = accept (aceite) | signup (cadastro) */
      waiting: [
        { id: 'maria-santana', pending: 'accept' },
        { id: 'roberto', pending: 'accept' },
        { id: 'ronaldo', pending: 'signup' },
        { id: 'jose', pending: 'accept' },
        { id: 'juliana', pending: 'accept' },
      ],
      /* contemplation order (Figma "Ordem dos premiados"), you included */
      order: ['ronaldo', 'mario', 'jose', 'maria-santana', 'alana', 'roberto', 'pedro-paulo', 'maria-helena', 'ana-maria', 'juliana'],
      payment: 'c2',
      winners: [],
    },
    /* public consórcios — "Descubra mais" */
    {
      id: 'tv-4k',
      name: 'TV 4K',
      theme: 'coral',
      art: 'cinema',
      role: null,
      public: true,
      status: 'active',
      draw: 'random',
      prize: 5345.56,
      installment: 450,
      months: 12,
      paid: 2,
      due: 'Todo dia 15',
      nextDraw: monthDay(15),
      minLevel: 'silver',
      spots: 3,
      memberCount: 9,
      members: ['franz', 'marta', 'jose', 'patricia', 'roberto'],
      owner: 'franz',
    },
    {
      id: 'amigos-da-6',
      name: 'Amigos da 6',
      theme: 'amber',
      art: 'campfire',
      role: null,
      public: true,
      status: 'active',
      draw: 'order',
      prize: 1000,
      installment: 100,
      months: 10,
      paid: 1,
      due: '5º dia útil',
      nextDraw: monthDay(1),
      minLevel: 'bronze',
      spots: 2,
      memberCount: 8,
      members: ['ana-maria', 'juliana', 'maria-santana', 'pedro-paulo'],
      owner: 'ana-maria',
    },
  ];

  /* Home feed (Figma "Atividades"): joined / payment / accepted / won */
  FB.activity = [
    { id: 'a1', type: 'joined', who: 'franz', target: 'turma-d', when: day(-1), comments: 2, likes: 1 },
    { id: 'a2', type: 'payment', target: 'turma-d', amount: 500, installment: 3, of: 20, when: day(-4) },
    { id: 'a3', type: 'accepted', who: 'franz', target: 'reveillon', when: day(-1), comments: 0, likes: 1 },
    { id: 'a4', type: 'won', who: 'maria-helena', target: 'turma-d', amount: 10013, when: day(-6), comments: 5, likes: 9 },
  ];

  /* Contemplado do mês (Figma: green card under the carousel) */
  FB.spotlight = { who: 'maria-helena', target: 'turma-d', amount: 10013, date: day(-6) };

  FB.now = now;
  FB.day = day;
  FB.monthDay = monthDay;
})();
