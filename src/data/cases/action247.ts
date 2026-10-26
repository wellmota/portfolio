import type { CaseStudy } from './types';

const action247: CaseStudy = {
  pt: {
    slug: 'action247',
    accent: '#14A85C',
    kicker: 'Case Study — Action247',
    title: 'Action247',
    subtitle:
      'Um jogo de palpites esportivos grátis, com prêmio em dinheiro de verdade. Desenhei o produto inteiro para ter a emoção de uma casa de apostas sem pedir aposta: do lobby ao troféu, no celular, no desktop e no e-mail.',
    cover: {
      src: '/cases/action247/cover.webp',
      alt: 'Action247: o lobby de jogos na versão desktop, com o contest em destaque e a lista de jogos',
    },
    meta: [
      { label: 'Cliente', value: 'Action247 · Palpites esportivos free-to-play (Tennessee, EUA)' },
      { label: 'Ano', value: '2019' },
      { label: 'Papel', value: 'Product design, UX e UI, de ponta a ponta' },
      { label: 'Plataforma', value: 'Celular, desktop e e-mail' },
      { label: 'Contexto', value: 'Contests esportivos legais no Tennessee, sem aposta' },
    ],
    stats: [
      { value: '$0', label: 'de aposta: o palpite é grátis e o prêmio é em dinheiro' },
      { value: '4+', label: 'esportes num lobby só: MMA, futebol, turfe e MLB' },
      { value: '1', label: 'botão PLAY por jogo, do lobby direto ao palpite' },
      { value: '5', label: 'telas no loop do celular, do lobby ao troféu' },
      { value: '3', label: 'canais com a mesma cara: celular, desktop e e-mail' },
      { value: 'TN', label: 'a regra do estado já no cadastro, antes do primeiro palpite' },
    ],
    intro: [
      'O Action247 é um jogo de palpites esportivos grátis, nos Estados Unidos. O jogador escolhe quem vence a luta, em quantos rounds e por qual método, e concorre a prêmios em dinheiro sem apostar nada. O desafio era dar a emoção de uma casa de apostas a quem não está apostando.',
      'Desenhei o produto de ponta a ponta: o lobby, o palpite, o cadastro, o resultado, a versão desktop e os e-mails. Cada tela tem um trabalho só, e todas usam o mesmo sistema verde, do celular à caixa de entrada.',
    ],
    roleLabel: 'O que eu fiz',
    roleList: [
      'UX de produto',
      'UI design',
      'Fluxo de palpites',
      'Cadastro',
      'Tela de resultados',
      'Responsivo, do celular ao desktop',
      'Design system',
      'Templates de e-mail',
    ],
    sections: [
      {
        kicker: '01 — Decisão: o lobby',
        title: 'A home vende um jogo de cada vez',
        body: [
          'Quem abre o app quer jogar, não ler. Por isso o topo mostra um único contest em destaque, com o prêmio e a contagem regressiva: “$50 PRIZE · Bellator Fight Night”. Abaixo vem a lista de jogos por esporte, cada um com o prêmio e um só botão PLAY verde.',
          'No desktop, o contest em destaque fica à esquerda e a lista corre ao lado. A energia de uma casa de apostas continua, e a tela segue fácil de ler.',
        ],
        showcase: {
          url: 'action247.com',
          frame: 'flat',
          items: [
            {
              src: '/cases/action247/lobby-desktop.webp',
              alt: 'Action247 no desktop: contest em destaque à esquerda e lista de jogos à direita',
              label: 'Lobby',
              meta: 'Desktop',
            },
          ],
        },
      },
      {
        kicker: '02 — Decisão: o palpite',
        title: 'Poucas perguntas, cada resposta com um toque',
        body: [
          'O palpite é o coração do produto. Cada contest tem poucas perguntas: quem vence a luta, em quantos rounds, por qual método. As respostas são alvos grandes, com retorno visual na hora, e tudo fecha num único “Enter to win”.',
          'O cadastro pede o estado logo no começo, porque os contests seguem a lei do Tennessee. Quando os jogos terminam, a tela de resultado paga a espera: acertos em verde, erros em vermelho, os pontos e um troféu. E já chama para a próxima rodada.',
        ],
        galleryTitle: 'O loop no celular',
        gallery: [
          { src: '/cases/action247/lobby-mobile.webp', alt: 'Lobby do Action247 no celular: contest em destaque e lista de jogos', device: 'ios' },
          { src: '/cases/action247/predict-mlb.webp', alt: 'Palpite de MLB no Action247: White Sox vs Marlins, em qual round termina e método de vitória', device: 'ios' },
          { src: '/cases/action247/predict-bellator.webp', alt: 'Fluxo de palpite da Bellator Fight Night: qual lutador vence, rounds, método', device: 'ios' },
          { src: '/cases/action247/signup.webp', alt: 'Cadastro do Action247: e-mail, senha, estado de residência (Tennessee) e data de nascimento', device: 'ios' },
          { src: '/cases/action247/results.webp', alt: 'Tela de resultados do Action247: acertos em verde, erros em vermelho, pontos e troféu', device: 'ios' },
        ],
      },
      {
        kicker: '03 — Decisão: um sistema só',
        title: 'O e-mail tem a cara do jogo que ele abre',
        body: [
          'Por baixo das telas há um sistema: a marca verde, um card igual para todo jogo, chips no estilo das odds para os palpites e uma tipografia que se lê bem no celular e no desktop. Um esporte novo entra sem redesenhar nada.',
          'Os templates de e-mail usam os mesmos componentes. Um “Play the Free Weekend Trifecta” chega na caixa de entrada com a cara do produto e leva a pessoa de volta ao lobby.',
        ],
      },
    ],
    outcomesLabel: 'Resultado',
    outcomesTitle: 'O que o trabalho entregou',
    outcomes: [
      'A emoção de uma casa de apostas num jogo grátis, sem dinheiro em risco',
      'O loop inteiro desenhado: lobby, palpite, cadastro e resultado',
      'A mesma experiência do celular ao desktop',
      'Um sistema de componentes que recebe esportes novos sem redesenho',
      'E-mails com a cara do produto, chamando de volta para o jogo',
    ],
    stackLabel: 'Ferramentas',
    stack: ['Figma', 'Design system', 'Protótipo navegável', 'Design de e-mail'],
    cta: {
      heading: 'Tem um produto que precisa fazer a pessoa voltar?',
      sub: 'Eu desenho o produto inteiro, do primeiro toque ao e-mail que traz a pessoa de volta.',
      label: 'Falar comigo',
    },
    ui: { back: 'Voltar aos projetos', visit: 'Visitar o site' },
    seo: {
      title: 'Action247 — Case Study · Wellington Mota',
      description:
        'Action247: o design de ponta a ponta de um jogo de palpites esportivos grátis, com prêmio em dinheiro. Lobby, palpite, cadastro e resultado no celular e no desktop, e e-mails no mesmo sistema.',
    },
  },

  en: {
    slug: 'action247',
    accent: '#14A85C',
    kicker: 'Case Study — Action247',
    title: 'Action247',
    subtitle:
      'A free sports prediction game with real cash prizes. I designed the whole product to feel like a sportsbook without ever asking for a bet: from the lobby to the trophy, on phone, desktop and email.',
    cover: {
      src: '/cases/action247/cover.webp',
      alt: 'Action247: the games lobby on desktop, with the featured contest and the games list',
    },
    meta: [
      { label: 'Client', value: 'Action247 · Free-to-play sports prediction (Tennessee, US)' },
      { label: 'Year', value: '2019' },
      { label: 'Role', value: 'Product design, UX and UI, end to end' },
      { label: 'Platform', value: 'Phone, desktop and email' },
      { label: 'Context', value: 'Legal sports contests in Tennessee, no wagering' },
    ],
    stats: [
      { value: '$0', label: 'wagered: picks are free and the prize is cash' },
      { value: '4+', label: 'sports in one lobby: MMA, soccer, horse racing and MLB' },
      { value: '1', label: 'PLAY button per game, straight from the lobby to the pick' },
      { value: '5', label: 'screens in the mobile loop, from lobby to trophy' },
      { value: '3', label: 'channels with one look: phone, desktop and email' },
      { value: 'TN', label: 'the state rule asked at sign-up, before the first pick' },
    ],
    intro: [
      'Action247 is a free sports prediction game in the US. Players pick who wins the fight, how many rounds it goes and the method of victory, and compete for cash prizes without betting a cent. The challenge was to give the thrill of a sportsbook to people who aren’t betting.',
      'I designed the product end to end: the lobby, the pick, sign-up, results, the desktop version and the emails. Every screen has one job, and they all share the same green system, from phone to inbox.',
    ],
    roleLabel: 'What I did',
    roleList: [
      'Product UX',
      'UI design',
      'Prediction flow',
      'Sign-up',
      'Results screen',
      'Responsive, phone to desktop',
      'Design system',
      'Email templates',
    ],
    sections: [
      {
        kicker: '01 — Decision: the lobby',
        title: 'The home sells one game at a time',
        body: [
          'People open the app to play, not to read. So the top shows a single featured contest with its prize and a countdown: “$50 PRIZE · Bellator Fight Night”. Below it sits the list of games by sport, each with its prize and one green PLAY button.',
          'On desktop the featured contest sits on the left and the list runs beside it. It keeps the energy of a sportsbook and stays easy to read.',
        ],
        showcase: {
          url: 'action247.com',
          frame: 'flat',
          items: [
            {
              src: '/cases/action247/lobby-desktop.webp',
              alt: 'Action247 on desktop: the featured contest on the left, the games list on the right',
              label: 'Lobby',
              meta: 'Desktop',
            },
          ],
        },
      },
      {
        kicker: '02 — Decision: the pick',
        title: 'A few questions, each answered with one tap',
        body: [
          'The pick is the heart of the product. Each contest asks only a few questions: who wins the fight, how many rounds, by what method. Answers are big tap targets with instant feedback, and it all ends in a single “Enter to win”.',
          'Sign-up asks for the state first, because the contests follow Tennessee law. When the games end, the results screen pays off the wait: correct picks in green, misses in red, the points and a trophy. Then it invites you to the next round.',
        ],
        galleryTitle: 'The loop on mobile',
        gallery: [
          { src: '/cases/action247/lobby-mobile.webp', alt: 'Action247 lobby on mobile: featured contest and the games list', device: 'ios' },
          { src: '/cases/action247/predict-mlb.webp', alt: 'Action247 MLB pick: White Sox vs Marlins, which round it ends and method of victory', device: 'ios' },
          { src: '/cases/action247/predict-bellator.webp', alt: 'Bellator Fight Night prediction flow: which fighter wins, rounds, method', device: 'ios' },
          { src: '/cases/action247/signup.webp', alt: 'Action247 sign-up: email, password, state of residence (Tennessee) and date of birth', device: 'ios' },
          { src: '/cases/action247/results.webp', alt: 'Action247 results screen: correct picks in green, misses in red, points and a trophy', device: 'ios' },
        ],
      },
      {
        kicker: '03 — Decision: one system',
        title: 'The email looks like the game it opens',
        body: [
          'Under the screens is one system: the green brand, the same card for every game, odds-style chips for the picks and type that reads well on phone and desktop. A new sport slots in without redesigning anything.',
          'The email templates use the same components. A “Play the Free Weekend Trifecta” lands in the inbox looking like the product and takes people back to the lobby.',
        ],
      },
    ],
    outcomesLabel: 'Outcome',
    outcomesTitle: 'What the work delivered',
    outcomes: [
      'The thrill of a sportsbook in a free game, with no money at risk',
      'The whole loop designed: lobby, pick, sign-up and results',
      'The same experience from phone to desktop',
      'A component system that takes new sports without a redesign',
      'Emails that look like the product and bring players back',
    ],
    stackLabel: 'Tools',
    stack: ['Figma', 'Design system', 'Clickable prototype', 'Email design'],
    cta: {
      heading: 'Got a product that needs people to come back?',
      sub: 'I design the whole product, from the first tap to the email that brings people back.',
      label: 'Get in touch',
    },
    ui: { back: 'Back to projects', visit: 'Visit the site' },
    seo: {
      title: 'Action247 — Case Study · Wellington Mota',
      description:
        'Action247: end-to-end design of a free sports prediction game with cash prizes. Lobby, pick, sign-up and results on phone and desktop, with emails on the same system.',
    },
  },
};

export default action247;
