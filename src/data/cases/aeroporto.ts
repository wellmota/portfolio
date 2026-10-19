import type { CaseStudy } from './types';

const aeroporto: CaseStudy = {
  pt: {
    slug: 'aeroporto-de-leads',
    accent: '#2456E6',
    kicker: 'Case Study — Tutory OS · 2026',
    title: 'Aeroporto de Leads',
    subtitle:
      'A TV da sala comercial da Tutory mostrava uma tabela. Em uma semana, transformei essa tabela num aeroporto 3D ao vivo — cada lead é um avião que pousa, e o time passou a ver a operação acontecer, não só o número.',
    cover: {
      src: '/cases/aeroporto/cover.webp',
      alt: 'Aeroporto de Leads 3D: cena isométrica com os hangares Mentoria e Hub, aviões no pátio e os cartões de metas por cima',
    },
    meta: [
      { label: 'Cliente', value: 'Tutory · EdTech, Brasília' },
      { label: 'Período', value: 'Out 2026 — 1 semana' },
      { label: 'Papel', value: 'Product Engineer — design + código, solo' },
      { label: 'Produto', value: 'Tutory OS · Aeroporto de Leads 3D' },
      { label: 'Entrega', value: 'No ar na TV da sala comercial' },
    ],
    stats: [
      { value: '1 sem.', label: 'da ideia à TV da sala, de 8 a 14 de outubro' },
      { value: '10,7k', label: 'linhas de código da cena, do HUD e dos personagens' },
      { value: '0', label: 'modelos importados para o cenário: pista, hangares e aviões em código' },
      { value: '20 s', label: 'do lead no banco ao avião pousando na tela' },
      { value: '3', label: 'climas pelo relógio real: dia, tarde e noite' },
      { value: '4', label: 'níveis de qualidade gráfica para rodar na Smart TV' },
    ],
    intro: [
      'O Tutory OS é o painel de tráfego e operação de mídia que construí para a Tutory: Meta Ads, Google Ads, HubSpot e o banco de leads num lugar só. Uma das telas, o Aeroporto de Leads, fica aberta o dia inteiro numa TV na sala do time comercial — e, como toda tabela numa TV, em pouco tempo ninguém mais olhava.',
      'A pergunta que virou projeto: e se a sala pudesse ver os leads chegando? Em uma semana, do conceito ao deploy, troquei a tabela por um aeroporto isométrico em 3D. Cada lead que entra no banco é um avião que pousa; qualificou, entra no hangar; desqualificou, sai do pátio. As metas viraram a torre de controle. Os mesmos dados e as mesmas regras — agora com movimento, personagens e horário real.',
    ],
    roleLabel: 'O que eu fiz',
    roleList: [
      'Conceito & metáfora',
      'Direção de arte',
      'Modelagem procedural',
      'Personagens & animação',
      'HUD & design system',
      'Dados em tempo real',
      'Performance para Smart TV',
      'Acessibilidade',
    ],
    sections: [
      {
        kicker: '01 — A sala',
        title: 'Uma TV que ninguém olhava',
        body: [
          'A primeira versão do Aeroporto já existia dentro do Tutory OS: uma tela em modo TV com as metas de leads qualificados e a lista de chegadas do mês, atualizada a cada 20 segundos. Funcionava — e era invisível. Número parado na parede vira paisagem em dois dias.',
          'O time já falava a língua: lead "pousa", vendedor "libera", o pátio "lota". A metáfora não foi inventada por mim; estava na conversa da sala. Meu trabalho foi levá-la a sério até o fim: se lead é avião, então classificação é a cor da cauda, produto é hangar e meta é a torre de controle.',
        ],
        image: {
          src: '/cases/aeroporto/metafora.webp',
          alt: 'Recortes da interface: pátio do hangar com aviões etiquetados pelo nome do lead, cartões de meta e o retrato do Cadu',
          caption: 'Avião = lead. Cauda = classificação. Hangar = produto. Torre = metas. A sala entende de longe.',
        },
        showcase: {
          start: 1,
          items: [
            { src: '/cases/aeroporto/pouso-poster.webp', video: { src: '/cases/aeroporto/pouso.mp4', webm: '/cases/aeroporto/pouso.webm' }, alt: 'Vídeo: um lead novo chega ao banco, a tela avisa, o avião aparece à direita, pousa na pista e taxia até a vaga do hangar Mentoria', label: 'Um pouso em tempo real', meta: 'vídeo · dados fictícios', caption: 'O lead entra no banco, a tela avisa quem chegou e por onde, e o avião faz a aproximação, toca a pista e taxia até a vaga. Tudo em tempo real: a tela confere o banco a cada 20 segundos.' },
          ],
        },
      },
      {
        kicker: '02 — A metáfora',
        title: 'Cada avião é um lead. Cada hangar, um produto.',
        body: [
          'O aeroporto tem dois hangares, um para cada produto da Tutory — Mentoria e Hub — com cinco vagas de pátio cada. Um lead novo pousa pela pista, taxia até a vaga e espera pela classificação do time. A cor da cauda diz em que pé ele está: verde é qualificado, amarelo pré-qualificado, vermelho desqualificado, cinza ainda pendente.',
          'Quando o time qualifica um lead no CRM, o Dan — o sinaleiro do pátio — libera a entrada e o portão do hangar abre. Quando desqualifica, o avião é retirado: um scanner o desintegra ou, dependendo do dia, um OVNI o abduz. Mais leads pendentes do que vagas é overbooking: aviões ficam em espera no céu e o Cadu, que recebe todo mundo no pátio, fica visivelmente bravo. A sala entende o estado da operação sem ler uma linha.',
        ],
        showcase: {
          items: [
            { src: '/cases/aeroporto/tela-dia.webp', alt: 'Tela inteira do Aeroporto de Leads de dia: metas no topo, cena isométrica no centro, gráfico, chegadas do mês e torre de controle', label: 'A tela inteira', meta: 'dia · 1600 × 1000', caption: 'Metas de hoje, da semana e do mês no topo; o aeroporto no centro; leads por dia, chegadas do mês e a torre de controle embaixo. Tudo que a sala precisa, sem rolar.' },
            { src: '/cases/aeroporto/tela-lotado.webp', alt: 'Câmera aproximada do pátio da Mentoria: o Cadu bravo com a placa de protesto, o Dan sinalizando com os bastões e alertas de lead faltando no HubSpot', label: 'Overbooking', size: 'half', caption: 'Mais leads pendentes do que vagas: o Cadu sai com a placa de protesto, o Dan sinaliza o pátio e a tabela acusa leads que não chegaram ao HubSpot.' },
            { src: '/cases/aeroporto/tela-hangar.webp', alt: 'Hangar Mentoria selecionado, com a câmera aproximada e o inspetor mostrando leads, origem e taxa de qualificação', label: 'Hangar selecionado', size: 'half', caption: 'Clique no hangar: leads de hoje, da semana e do mês, origem por plataforma e quem está no pátio.' },
          ],
        },
      },
      {
        kicker: '03 — A tela',
        title: 'Vidro sobre a cena: uma interface que não compete com o aeroporto',
        body: [
          'A cena é a protagonista; os painéis ficam quietos por cima dela, em vidro branco com sombra azulada, e o azul da marca só aparece onde há ação ou seleção. No topo, as metas de qualificados de hoje, da semana e do mês — só da Mentoria, como o negócio mede. Embaixo, leads por dia, as chegadas do mês e o status de cada lead no HubSpot.',
          'Clicar em qualquer coisa abre o inspetor. A torre resume o mês numa rosca de classificação; o hangar mostra origem e taxa de qualificação; o avião conta a jornada do lead — pousou, chegou ao HubSpot, entrou em atendimento, foi classificado. Se o lead não apareceu no CRM, a tela avisa "Faltando": a automação pode ter falhado e alguém precisa cadastrar à mão. O aeroporto virou também um monitor de integrações.',
        ],
        showcase: {
          items: [
            { src: '/cases/aeroporto/tela-lead.webp', alt: 'Avião selecionado com a câmera aproximada e o inspetor aberto com os dados e a jornada do lead', label: 'A jornada do lead', meta: 'inspetor', caption: 'Um clique no avião: origem, cargo, alunos, contato e a jornada passo a passo — pousou, HubSpot, atendimento, classificação. Os dados aqui são fictícios.' },
            { src: '/cases/aeroporto/hud.webp', alt: 'Os cartões da interface soltos sobre azul: marca e relógio, metas de hoje, semana e mês, chegadas do mês, torre de controle, gráfico de leads por dia, legenda, aviso de pouso, clima e o retrato do Cadu', label: 'Os painéis', meta: 'HUD', caption: 'Cada cartão como é no produto: metas com barra de progresso, chegadas do mês, torre de controle com a rosca de classificação, leads por dia, a jornada do lead e o retrato do Cadu. Números grandes e o azul só na ação, para ler a três metros da TV.' },
          ],
        },
      },
      {
        kicker: '04 — Tempo real',
        title: 'Relógio real, luz real, lead real',
        body: [
          'A tela confere o banco a cada 20 segundos. Lead novo entra e o avião aparece no alto, à direita, faz a aproximação, toca a pista e taxia até a vaga, com um aviso na tela dizendo quem chegou e por onde. A luz segue o relógio de Brasília: o nascer e o pôr do sol são calculados para o dia, e a cena passa por dia, tarde e noite sozinha, com os postes acendendo e o céu mudando.',
          'A cada dez minutos o aeroporto pode ceder a tela por um minuto ao giro de indicadores: um avião puxa o céu do período, o Cadu ou o Dan cumprimenta a sala — bom dia com a mão, lámen no almoço, pijama e chá à noite — e passam quadros de gráficos em bento com os mesmos números das metas. Depois o aeroporto volta. Nenhum valor em dinheiro em lugar nenhum: a tela fica numa sala, e isso foi regra desde o primeiro dia.',
        ],
        showcase: {
          items: [
            { src: '/cases/aeroporto/giro-1.webp', alt: 'Giro de indicadores: o Cadu cumprimenta a sala com gráficos em bento ao fundo', label: 'Giro de indicadores', size: 'half', caption: 'A cada dez minutos, um minuto de gráficos: o anfitrião muda com a hora do dia.' },
            { src: '/cases/aeroporto/giro-2.webp', alt: 'Segundo quadro do giro: gráficos em bento de leads por dia, origem e classificação', label: 'Bento de gráficos', size: 'half', caption: 'Leads por dia, origem por plataforma e classificação — os mesmos números dos cartões.' },
            { src: '/cases/aeroporto/tela-tarde.webp', alt: 'O aeroporto no fim da tarde, com a luz mais quente e o céu azulado', label: 'Tarde', size: 'half', caption: 'A luz segue o relógio de Brasília: no fim da tarde a cena esquenta e o céu muda.' },
            { src: '/cases/aeroporto/tela-noite.webp', alt: 'O aeroporto à noite, com janelas acesas, postes e balizas da pista iluminados', label: 'Noite', size: 'half', caption: 'Depois do pôr do sol, janelas, postes e balizas da pista acendem sozinhos.' },
          ],
        },
      },
      {
        kicker: '05 — Engenharia',
        title: 'Tudo gerado em código — e leve o bastante para a TV da sala',
        body: [
          'Nenhum modelo 3D importado para o cenário: pista, pátio, hangares, torre, a sede da Tutory, os prédios da vizinhança e os próprios aviões são geometria gerada em código com three.js, sem etapa de build — como o resto do Tutory OS, HTML, CSS e JavaScript puros servidos pela Vercel. A mesma função que pinta as linhas amarelas no chão guia o avião, então a roda passa exatamente em cima da pintura.',
          'Os personagens vêm de um pack de 52 bonecos em domínio público, montados por "receitas" — corpo, cabelo, barba e cor por peça — num gerador que construí para o projeto. A TV da sala é um navegador de Smart TV, e isso ditou a engenharia: quatro níveis de qualidade gráfica, descida automática quando o quadro cai, geometria estática fundida, desfoque dos cartões desligado e todo trabalho pesado espalhado em vários quadros para o pouso nunca travar. Uma página de teste mede o custo de cada parte da cena na própria TV.',
        ],
        showcase: {
          items: [
            { src: '/cases/aeroporto/personagens.webp', alt: 'Galeria dos 52 bonecos do pack, na mesma escala e câmera', label: 'Galeria de personagens', size: 'half', caption: 'Os 52 bonecos do pack na mesma escala e câmera, com filtro — a base de onde saem o Cadu, o Dan e o Marlom.' },
            { src: '/cases/aeroporto/montar.webp', alt: 'Gerador de personagem: corpo, cabelo, barba, chapéu e cores, gerando a receita usada na cena', label: 'Gerador de personagem', size: 'half', caption: 'Corpo, cabelo, barba, chapéu e cor por peça viram uma "receita" em código — é assim que cada personagem da cena é montado.' },
          ],
        },
      },
      {
        kicker: '06 — Resultado',
        title: 'A sala voltou a olhar para a TV',
        body: [
          'O Aeroporto 3D está no ar na TV da sala comercial da Tutory, ao lado do Tutory OS que alimenta o resto da operação. Os números batem com o dashboard porque as regras são as mesmas — Hub nunca somado à Mentoria, metas só da Mentoria, o dia contado como o banco conta. O que mudou é que agora dá para ver o lead chegar, e a sala reage: comemora o pouso, cobra a classificação, percebe o pátio lotando.',
          'Uma semana, uma pessoa, do conceito ao deploy — e um painel de BI que virou a tela que o time pede para deixar aberta.',
        ],
      },
    ],
    outcomesLabel: 'Resultados',
    outcomesTitle: 'O que mudou para o time',
    outcomes: [
      'Tela ao vivo o dia inteiro na TV do time comercial',
      'Lead novo visível em até 20 segundos — como um pouso',
      'Classificação, overbooking e falha de integração legíveis de longe',
      'Os mesmos números e regras do dashboard, sem dinheiro na tela',
      'Roda num navegador de Smart TV com qualidade adaptativa',
      'Entregue em uma semana, sem build step e sem handoff',
    ],
    stackLabel: 'Stack',
    stack: ['three.js', 'JavaScript', 'HTML & CSS', 'Supabase', 'HubSpot API', 'Meta Ads API', 'Google Ads API', 'Vercel', 'Quaternius (CC0)', 'Figma'],
    cta: {
      heading: 'Tem um dashboard que ninguém olha?',
      sub: 'Eu transformo dado em algo que a sala quer ver — conceito, design e código, do primeiro rascunho ao deploy.',
      label: 'Falar comigo',
    },
    ui: { back: 'Voltar aos projetos', visit: 'Visitar o site' },
    seo: {
      title: 'Aeroporto de Leads — Case Study · Wellington Mota',
      description:
        'Transformei a tabela de leads da TV da Tutory num aeroporto 3D ao vivo: cada lead é um avião que pousa. three.js, tempo real e Smart TV — design e código em uma semana.',
    },
  },

  en: {
    slug: 'aeroporto-de-leads',
    accent: '#2456E6',
    kicker: 'Case Study — Tutory OS · 2026',
    title: 'Lead Airport',
    subtitle:
      'The TV in Tutory’s sales room showed a table. In one week, I turned that table into a live 3D airport — every lead is a plane that lands, and the team started watching the operation happen, not just the number.',
    cover: {
      src: '/cases/aeroporto/cover.webp',
      alt: 'Lead Airport 3D: isometric scene with the Mentoria and Hub hangars, planes on the apron and the goal cards on top',
    },
    meta: [
      { label: 'Client', value: 'Tutory · EdTech, Brasília' },
      { label: 'Period', value: 'Oct 2026 — 1 week' },
      { label: 'Role', value: 'Product Engineer — design + code, solo' },
      { label: 'Product', value: 'Tutory OS · Aeroporto de Leads 3D' },
      { label: 'Shipped', value: 'Live on the sales-room TV' },
    ],
    stats: [
      { value: '1 wk', label: 'from idea to the sales-room TV, October 8–14' },
      { value: '10.7k', label: 'lines of code for the scene, HUD and characters' },
      { value: '0', label: 'models imported for the scenery: runway, hangars and planes in code' },
      { value: '20 s', label: 'from the lead hitting the database to the plane landing' },
      { value: '3', label: 'lighting moods from the real clock: day, dusk and night' },
      { value: '4', label: 'graphics quality levels to run on a Smart TV' },
    ],
    intro: [
      'Tutory OS is the traffic and media-operations panel I built for Tutory: Meta Ads, Google Ads, HubSpot and the lead database in one place. One of its screens, the Lead Airport, stays open all day on a TV in the sales room — and, like every table on a TV, soon nobody looked at it anymore.',
      'The question that became the project: what if the room could see the leads arriving? In one week, from concept to deploy, I replaced the table with an isometric 3D airport. Every lead that enters the database is a plane that lands; qualified, it enters the hangar; disqualified, it leaves the apron. The goals became the control tower. Same data, same rules — now with motion, characters and real time of day.',
    ],
    roleLabel: 'What I did',
    roleList: [
      'Concept & metaphor',
      'Art direction',
      'Procedural modeling',
      'Characters & animation',
      'HUD & design system',
      'Real-time data',
      'Smart TV performance',
      'Accessibility',
    ],
    sections: [
      {
        kicker: '01 — The room',
        title: 'A TV nobody looked at',
        body: [
          'The first version of the Airport already lived inside Tutory OS: a TV-mode screen with the qualified-lead goals and the month’s arrivals list, refreshed every 20 seconds. It worked — and it was invisible. A number sitting still on a wall becomes wallpaper in two days.',
          'The team already spoke the language: a lead "lands", a rep "clears" it, the apron "fills up". I didn’t invent the metaphor; it was in the room’s conversation. My job was to take it seriously all the way: if a lead is a plane, then classification is the tail color, product is the hangar and the goal is the control tower.',
        ],
        image: {
          src: '/cases/aeroporto/metafora.webp',
          alt: 'Interface crops: the hangar apron with planes tagged by lead name, goal cards and Cadu’s portrait',
          caption: 'Plane = lead. Tail = classification. Hangar = product. Tower = goals. The room gets it from across the floor.',
        },
        showcase: {
          start: 1,
          items: [
            { src: '/cases/aeroporto/pouso-poster.webp', video: { src: '/cases/aeroporto/pouso.mp4', webm: '/cases/aeroporto/pouso.webm' }, alt: 'Video: a new lead enters the database, the screen announces it, the plane appears on the right, lands on the runway and taxis to its stand at the Mentoria hangar', label: 'A landing in real time', meta: 'video · fictional data', caption: 'The lead enters the database, the screen says who arrived and from where, and the plane flies the approach, touches down and taxis to its stand. All in real time: the screen checks the database every 20 seconds.' },
          ],
        },
      },
      {
        kicker: '02 — The metaphor',
        title: 'Every plane is a lead. Every hangar, a product.',
        body: [
          'The airport has two hangars, one per Tutory product — Mentoria and Hub — with five apron stands each. A new lead lands on the runway, taxis to its stand and waits for the team’s classification. The tail color says where it stands: green is qualified, yellow pre-qualified, red disqualified, grey still pending.',
          'When the team qualifies a lead in the CRM, Dan — the apron marshaller — clears it and the hangar door opens. When they disqualify one, the plane is removed: a scanner disintegrates it or, depending on the day, a UFO abducts it. More pending leads than stands is overbooking: planes hold in the sky and Cadu, who greets everyone on the apron, gets visibly angry. The room reads the state of the operation without reading a single row.',
        ],
        showcase: {
          items: [
            { src: '/cases/aeroporto/tela-dia.webp', alt: 'Full Lead Airport screen by day: goals on top, isometric scene in the middle, chart, month arrivals and control tower', label: 'The whole screen', meta: 'day · 1600 × 1000', caption: 'Today, week and month goals on top; the airport in the middle; leads per day, month arrivals and the control tower below. Everything the room needs, without scrolling.' },
            { src: '/cases/aeroporto/tela-lotado.webp', alt: 'Camera zoomed in on the Mentoria apron: an angry Cadu with his protest sign, Dan marshalling with batons and missing-in-HubSpot alerts', label: 'Overbooking', size: 'half', caption: 'More pending leads than stands: Cadu walks out with his protest sign, Dan marshals the apron and the table flags leads that never reached HubSpot.' },
            { src: '/cases/aeroporto/tela-hangar.webp', alt: 'Mentoria hangar selected, camera zoomed in and the inspector showing leads, source and qualification rate', label: 'Hangar selected', size: 'half', caption: 'Click a hangar: leads today, this week and this month, source by platform and who is on the apron.' },
          ],
        },
      },
      {
        kicker: '03 — The screen',
        title: 'Glass over the scene: an interface that doesn’t compete with the airport',
        body: [
          'The scene is the protagonist; the panels sit quietly on top of it, in white glass with a blue-tinted shadow, and the brand blue only shows up where there is action or selection. On top, the qualified-lead goals for today, this week and this month — Mentoria only, the way the business measures it. Below, leads per day, the month’s arrivals and each lead’s status in HubSpot.',
          'Clicking anything opens the inspector. The tower sums up the month in a classification donut; the hangar shows source and qualification rate; the plane tells the lead’s journey — landed, reached HubSpot, in service, classified. If the lead never showed up in the CRM, the screen flags it as "Missing": the automation may have failed and someone needs to enter it by hand. The airport became an integration monitor too.',
        ],
        showcase: {
          items: [
            { src: '/cases/aeroporto/tela-lead.webp', alt: 'Selected plane with the camera zoomed in and the inspector open with the lead’s data and journey', label: 'The lead’s journey', meta: 'inspector', caption: 'One click on the plane: source, role, students, contact and the step-by-step journey — landed, HubSpot, service, classification. Data shown here is fictional.' },
            { src: '/cases/aeroporto/hud.webp', alt: 'The interface cards laid out on blue: brand and clock, today, week and month goals, month arrivals, control tower, leads-per-day chart, legend, landing notice, mood switch and Cadu’s portrait', label: 'The panels', meta: 'HUD', caption: 'Every card as it is in the product: goals with progress bars, month arrivals, the control tower with its classification donut, leads per day, the lead’s journey and Cadu’s portrait. Big numbers and blue only on action, to be read from three meters away.' },
          ],
        },
      },
      {
        kicker: '04 — Real time',
        title: 'Real clock, real light, real lead',
        body: [
          'The screen checks the database every 20 seconds. A new lead comes in and the plane appears high on the right, flies the approach, touches down and taxis to its stand, with a notice on screen saying who arrived and from where. The light follows Brasília’s clock: sunrise and sunset are computed for the day, and the scene moves through day, dusk and night on its own, with street lights coming on and the sky changing.',
          'Every ten minutes the airport can hand the screen over for a minute to the indicator round: a plane drags in the sky of the period, Cadu or Dan greets the room — a morning wave, ramen at lunch, pajamas and tea at night — and bento-style chart frames go by with the same numbers as the goal cards. Then the airport comes back. No money values anywhere: the screen lives in a shared room, and that was a rule from day one.',
        ],
        showcase: {
          items: [
            { src: '/cases/aeroporto/giro-1.webp', alt: 'Indicator round: Cadu greets the room with bento charts behind him', label: 'Indicator round', size: 'half', caption: 'Every ten minutes, one minute of charts: the host changes with the time of day.' },
            { src: '/cases/aeroporto/giro-2.webp', alt: 'Second frame of the round: bento charts of leads per day, source and classification', label: 'Chart bento', size: 'half', caption: 'Leads per day, source by platform and classification — the same numbers as the cards.' },
            { src: '/cases/aeroporto/tela-tarde.webp', alt: 'The airport in the late afternoon, with warmer light and a bluish sky', label: 'Dusk', size: 'half', caption: 'The light follows Brasília’s clock: late in the afternoon the scene warms up and the sky changes.' },
            { src: '/cases/aeroporto/tela-noite.webp', alt: 'The airport at night, with lit windows, lamps and runway lights on', label: 'Night', size: 'half', caption: 'After sunset, windows, lamps and runway lights come on by themselves.' },
          ],
        },
      },
      {
        kicker: '05 — Engineering',
        title: 'Everything generated in code — and light enough for the room’s TV',
        body: [
          'No 3D model was imported for the scenery: runway, apron, hangars, tower, Tutory’s headquarters, the neighboring buildings and the planes themselves are geometry generated in code with three.js, with no build step — like the rest of Tutory OS, plain HTML, CSS and JavaScript served by Vercel. The same function that paints the yellow lines on the ground guides the plane, so the wheels run exactly over the paint.',
          'The characters come from a public-domain pack of 52 figures, assembled from "recipes" — body, hair, beard and color per part — in a generator I built for the project. The room’s TV is a Smart TV browser, and that dictated the engineering: four graphics quality levels, automatic step-down when the frame rate drops, static geometry merged, card blur switched off and every heavy job spread across several frames so a landing never stutters. A test page measures the cost of each part of the scene on the TV itself.',
        ],
        showcase: {
          items: [
            { src: '/cases/aeroporto/personagens.webp', alt: 'Gallery of the 52 pack figures at the same scale and camera', label: 'Character gallery', size: 'half', caption: 'The 52 pack figures at the same scale and camera, with filters — the base Cadu, Dan and Marlom come from.' },
            { src: '/cases/aeroporto/montar.webp', alt: 'Character generator: body, hair, beard, hat and colors, producing the recipe used in the scene', label: 'Character generator', size: 'half', caption: 'Body, hair, beard, hat and color per part become a "recipe" in code — that is how every character in the scene is assembled.' },
          ],
        },
      },
      {
        kicker: '06 — Outcome',
        title: 'The room is looking at the TV again',
        body: [
          'The 3D Airport is live on the TV in Tutory’s sales room, next to the Tutory OS that feeds the rest of the operation. The numbers match the dashboard because the rules are the same — Hub never added to Mentoria, goals for Mentoria only, the day counted the way the database counts it. What changed is that now you can see the lead arrive, and the room reacts: cheers the landing, chases the classification, notices the apron filling up.',
          'One week, one person, from concept to deploy — and a BI panel that became the screen the team asks to keep open.',
        ],
      },
    ],
    outcomesLabel: 'Results',
    outcomesTitle: 'What changed for the team',
    outcomes: [
      'Live screen all day on the sales team’s TV',
      'A new lead visible within 20 seconds — as a landing',
      'Classification, overbooking and integration failures readable from afar',
      'The same numbers and rules as the dashboard, no money on screen',
      'Runs in a Smart TV browser with adaptive quality',
      'Delivered in one week, no build step, no handoff',
    ],
    stackLabel: 'Stack',
    stack: ['three.js', 'JavaScript', 'HTML & CSS', 'Supabase', 'HubSpot API', 'Meta Ads API', 'Google Ads API', 'Vercel', 'Quaternius (CC0)', 'Figma'],
    cta: {
      heading: 'Got a dashboard nobody looks at?',
      sub: 'I turn data into something the room wants to watch — concept, design and code, from the first sketch to deploy.',
      label: 'Get in touch',
    },
    ui: { back: 'Back to projects', visit: 'Visit the site' },
    seo: {
      title: 'Lead Airport — Case Study · Wellington Mota',
      description:
        'I turned the lead table on Tutory’s sales-room TV into a live 3D airport: every lead is a plane that lands. three.js, real time and Smart TV — design and code in one week.',
    },
  },
};

export default aeroporto;
