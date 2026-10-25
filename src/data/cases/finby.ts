import type { CaseStudy, PrototypeEmbed } from './types';

const B = '/cases/finby';
const APP = `${B}/app`;

const prototypePt: PrototypeEmbed = {
  src: `${APP}/index.html`,
  title: 'Protótipo navegável do app Finby',
  screensLabel: 'Ir direto para',
  screens: [
    { label: 'Entrar', href: `${APP}/index.html` },
    { label: 'Meus consórcios', href: `${APP}/home.html` },
    { label: 'Um consórcio', href: `${APP}/consorcio.html?id=viagem-bahia` },
    { label: 'Consórcio em formação', href: `${APP}/consorcio.html?id=reveillon` },
    { label: 'Ordem de contemplação', href: `${APP}/ordem.html?id=reveillon`, meta: 'arrastar' },
    { label: 'Descubra', href: `${APP}/consorcios.html?tab=descubra` },
    { label: 'Criar consórcio', href: `${APP}/criar.html` },
    { label: 'Convidar um contato', href: `${APP}/contato.html` },
    { label: 'Amigos', href: `${APP}/amigos.html` },
    { label: 'Perfil', href: `${APP}/perfil.html` },
    { label: 'Resgatar saldo', href: `${APP}/saque.html` },
  ],
  hint: 'Use como num celular: crie um consórcio, convide alguém e mude a ordem de quem recebe. Os dados são fictícios e ficam só no seu navegador.',
  openLabel: 'Abrir em tela cheia',
  resetLabel: 'Recomeçar do zero',
  storagePrefix: 'fb:',
  autoplay: { pause: 'Pausar tour', resume: 'Retomar tour' },
};

const prototypeEn: PrototypeEmbed = {
  ...prototypePt,
  title: 'Interactive prototype of the Finby app',
  screensLabel: 'Jump to',
  screens: [
    { label: 'Sign in', href: `${APP}/index.html` },
    { label: 'My consórcios', href: `${APP}/home.html` },
    { label: 'A consórcio', href: `${APP}/consorcio.html?id=viagem-bahia` },
    { label: 'Consórcio being formed', href: `${APP}/consorcio.html?id=reveillon` },
    { label: 'Payout order', href: `${APP}/ordem.html?id=reveillon`, meta: 'drag' },
    { label: 'Discover', href: `${APP}/consorcios.html?tab=descubra` },
    { label: 'Create a consórcio', href: `${APP}/criar.html` },
    { label: 'Invite a contact', href: `${APP}/contato.html` },
    { label: 'Friends', href: `${APP}/amigos.html` },
    { label: 'Profile', href: `${APP}/perfil.html` },
    { label: 'Withdraw', href: `${APP}/saque.html` },
  ],
  hint: 'Use it like a phone: create a consórcio, invite someone and reorder who gets paid. The data is fictional and stays in your browser. The interface is in Portuguese, as in the original.',
  openLabel: 'Open full screen',
  resetLabel: 'Start over',
  autoplay: { pause: 'Pause tour', resume: 'Resume tour' },
};

const finby: CaseStudy = {
  pt: {
    slug: 'finby',
    accent: '#7552F5',
    kicker: 'Case Study — Finby',
    title: 'Finby',
    subtitle:
      'Consórcio entre amigos, sem planilha e sem ninguém cobrando no grupo. Desenhei o app e, sozinho e em dias, transformei o arquivo num protótipo que se usa no celular: 12 telas navegáveis, do convite ao saque.',
    cover: {
      src: `${B}/cover.webp`,
      alt: 'Três telas do Finby sobre fundo violeta com grão: o detalhe do consórcio Viagem Bahia, a home Meus consórcios e o passo do valor do prêmio',
    },
    meta: [
      { label: 'Produto', value: 'Finby · consórcio social entre amigos' },
      { label: 'Protótipo', value: '2026' },
      { label: 'Papel', value: 'Sozinho, do app no Figma ao protótipo em código' },
      { label: 'Plataforma', value: 'App iOS · protótipo web navegável' },
      { label: 'Escopo', value: '80 telas em sete fluxos, do login ao saque' },
    ],
    stats: [
      { value: '80', label: 'telas que desenhei, em sete fluxos' },
      { value: '12', label: 'telas navegáveis, com tour automático' },
      { value: '1', label: 'pessoa do desenho ao protótipo, com IA na produção' },
      { value: '2 em 1', label: 'fluxos de criação, privado e público, num wizard só' },
      { value: '6', label: 'temas de consórcio, escolhidos na criação' },
      { value: 'AA', label: 'de contraste onde o arquivo ficava abaixo' },
    ],
    intro: [
      'Consórcio é um jeito bem brasileiro de juntar dinheiro: o grupo paga uma parcela por mês e, a cada mês, alguém leva o prêmio. Entre amigos isso sempre existiu na informalidade, com uma pessoa anotando quem pagou e cobrando quem atrasou. O Finby, que eu desenhei, leva esse acordo para o celular e tira do grupo o papel de cobrador.',
      'Só que um arquivo de 80 telas não mostra se a conta fecha, nem como é convidar quem ainda não está no app. Então transformei o desenho num protótipo que se usa: 12 telas navegáveis, com os mesmos fluxos e os estados que o arquivo pulava. Fiz sozinho, com agentes de IA na produção e as decisões de produto comigo, em dias e não em meses.',
    ],
    roleLabel: 'O que eu fiz',
    roleList: [
      'Product design',
      'UI e interação',
      'Design system',
      'Direção de arte',
      'Acessibilidade',
      'UX writing',
      'Front-end',
      'Orquestração de agentes de IA',
    ],
    sections: [
      {
        kicker: '01 — O problema',
        title: 'Toda vaquinha tem alguém fazendo papel de cobrador',
        body: [
          'Quando amigos juntam dinheiro para uma viagem ou uma formatura, alguém vira o tesoureiro. Essa pessoa anota quem pagou e cobra quem atrasou, quase sempre no grupo de mensagens.',
          'O Finby põe esse acordo num app. Você define o prêmio e a parcela e convida quem quiser. A ordem de quem recebe sai de um sorteio ou de um acordo entre todos, e o dinheiro rende 100% do CDI enquanto espera.',
        ],
        image: {
          src: `${B}/overview-wire.webp`,
          alt: 'Mosaico com catorze telas do Finby em wireframe lo-fi: login, home, consórcios, detalhe, participantes, ordem, perfil, os passos da criação, convite e saque',
          caption: 'Os sete fluxos em wireframe, do login ao saque.',
          width: 1440,
          height: 900,
        },
      },
      {
        kicker: '02 — O protótipo',
        title: 'Experimente antes de ler',
        body: [
          'São 12 telas, e o que você faz fica salvo. Crie um consórcio e ele aparece na home. Convide alguém e a pessoa entra como cadastro pendente. Se preferir, deixe o tour passar pelas telas.',
        ],
        prototype: prototypePt,
      },
      {
        kicker: '03 — Decisão: a hierarquia',
        title: 'Cada tela começa pela pergunta de quem paga',
        body: [
          'Antes de qualquer cor, resolvi a ordem das informações em wireframe. Num app de dinheiro entre amigos, a pessoa quer saber quanto vai pagar e quando chega a vez dela. Essas respostas vêm primeiro em cada tela, e o acabamento não mexe nessa ordem.',
        ],
        compare: {
          beforeLabel: 'Wireframe',
          afterLabel: 'Protótipo',
          heuristicLabel: 'Decisão',
          even: true,
          pairs: [
            {
              label: 'Meus consórcios',
              heuristic: 'O que é seu, primeiro',
              body: [
                'A home abre pelo que é seu: os consórcios em que você está ficam no topo. O que os amigos fizeram vem depois, num feed.',
                'No acabamento, cada consórcio ganha um tema próprio, e o contemplado do mês vira um cartão com valor e data.',
              ],
              before: { src: `${B}/wire/home.webp`, alt: 'Wireframe da home: título Meus consórcios, cartões do carrossel, contemplado do mês e feed de atividades em caixas de traço preto' },
              after: { src: `${B}/screens/home.webp`, alt: 'Home no protótipo: cartão Viagem Bahia com gradiente mesh e grão, contemplado do mês em cartão menta e feed de atividades' },
            },
            {
              label: 'O consórcio',
              heuristic: 'Números que não se contradizem',
              body: [
                'No detalhe, a primeira pergunta é quanto o grupo já juntou. Logo abaixo vêm quem participa e quando é o próximo sorteio.',
                'Todos os valores saem da mesma conta, então uma tela nunca desmente a outra. O próximo sorteio diz quanto tempo falta.',
              ],
              before: { src: `${B}/wire/detalhe.webp`, alt: 'Wireframe do detalhe do consórcio: cabeçalho com o valor, faixa do prêmio, participantes em círculos, próximo sorteio e forma de pagamento' },
              after: { src: `${B}/screens/detalhe.webp`, alt: 'Detalhe do consórcio Viagem Bahia no protótipo: cabeçalho com o tema oceano, prêmio, próximo sorteio, participantes e pagamento' },
            },
            {
              label: 'Quem vai participar',
              heuristic: 'Ninguém fica de fora',
              body: [
                'Montar o grupo é escolher pessoas, e nem todas estão no app. A lista tem busca e um atalho para convidar quem falta.',
                'A seleção aparece em menta, com um check e texto em contraste AA, e o total é anunciado para leitores de tela. Quem ainda não tem cadastro entra como pendente.',
              ],
              before: { src: `${B}/wire/criar-quem.webp`, alt: 'Wireframe de Quem vai participar: busca, adicionar um novo contato, lista de amigos com caixas de seleção e rodapé com selecionados e Avançar' },
              after: { src: `${B}/screens/criar-quem.webp`, alt: 'Quem vai participar no protótipo: busca, lista de amigos com fotos e coroas de nível, selecionados em fundo menta com check verde' },
            },
            {
              label: 'O valor do prêmio',
              heuristic: 'A conta à vista',
              body: [
                'Quem cria um consórcio pensa primeiro no prêmio. Por isso o valor domina a tela, e a parcela vem logo abaixo.',
                'A parcela se recalcula a cada toque, com a conta escrita: "Você e 5 amigos · 6 meses, um prêmio por mês". Os botões que levariam a um valor negativo ficam inativos.',
              ],
              before: { src: `${B}/wire/criar-valor.webp`, alt: 'Wireframe do valor do prêmio: R$ 6.000,00 em destaque, seis botões de mais e menos e o bloco com parcela, participantes e vencimento' },
              after: { src: `${B}/screens/criar-valor.webp`, alt: 'Valor do prêmio no protótipo: valor grande com centavos menores, botões de ajuste e a parcela calculada' },
            },
            {
              label: 'Resgatar o saldo',
              heuristic: 'Prevenir o erro',
              body: [
                'Sacar precisa parecer com o app do banco que a pessoa já usa. Tudo cabe numa tela, com o teclado digitando a partir dos centavos.',
                'Um valor acima do saldo trava o botão com uma mensagem. O saldo só muda depois da conferência.',
              ],
              before: { src: `${B}/wire/saque.webp`, alt: 'Wireframe do saque: R$ 500,00, faixa do saldo, atalhos de valor, conta de destino, botão Solicitar transferência e teclado numérico' },
              after: { src: `${B}/screens/saque.webp`, alt: 'Saque no protótipo: valor de R$ 500,00, saldo disponível, conta de destino e teclado numérico' },
            },
          ],
        },
      },
      {
        kicker: '04 — Decisão: a identidade',
        title: 'A mesma marca, mais quente',
        body: [
          'O desenho é meu, então a regra foi segui-lo. O violeta da marca e a Sarabun ficaram. Mudei o que deixava o app com cara de extrato: os cinzas frios viraram creme e os emojis viraram fotos de gente de verdade.',
        ],
        details: {
          items: [
            {
              src: `${B}/d-palette.webp`,
              alt: 'Tokens de cor do protótipo: escala violeta de dez tons, com a marca no 600, e menta, laranja, tinta e creme',
              label: 'Uma paleta mais quente',
              text: 'O violeta da marca virou uma escala de dez tons, e o fundo frio virou creme. O menta usa texto escuro para passar no contraste AA.',
            },
            {
              src: `${B}/d-themes.webp`,
              alt: 'Seis cartões de consórcio, um por tema: oceano, violeta, menta, noite, coral e âmbar, todos com gradiente mesh e grão',
              label: 'Um tema por consórcio',
              text: 'Seis gradientes com grão, um por tema. Quem cria escolhe o tema, e ele acompanha o consórcio no cartão e no cabeçalho.',
            },
            {
              src: `${B}/d-type.webp`,
              alt: 'Escala tipográfica em Sarabun: título, pergunta em dois pesos, corpo, rótulos, valor em dinheiro com centavos menores e selos de nível',
              label: 'Sarabun com hierarquia',
              text: 'A fonte do arquivo, com hierarquia mais clara. No dinheiro, o "R$" e os centavos ficam menores para o valor ler primeiro.',
            },
            {
              src: `${B}/d-icons.webp`,
              alt: 'Vinte e quatro ícones de traço fino e a barra de navegação com Início, Consórcios, Amigos e Perfil',
              label: 'Um só conjunto de ícones',
              text: 'Um traço só no lugar da mistura de estilos do arquivo. A barra de navegação, que só tinha ícones, ganhou rótulos.',
            },
            {
              src: `${B}/d-art.webp`,
              alt: 'Dez fotos: praia com coqueiros, formatura, colegas rindo, fogos de réveillon, amigas vendo TV, fogueira, brinde entre amigos, amigas olhando o celular, cofrinho sobre moedas e rede na praia',
              label: 'Fotos no lugar dos emojis',
              text: 'Os emojis das telas de sucesso viraram fotos quentes de gente de verdade, e cada consórcio ganhou a foto da sua meta.',
            },
            {
              src: `${B}/d-states.webp`,
              alt: 'Estados de componentes: botão ativo e inativo, amigo padrão e selecionado, opção de rádio marcada e chips',
              label: 'Os estados que faltavam',
              text: 'O arquivo mostrava cada componente num estado só. O protótipo tem padrão, selecionado, inativo e foco visível.',
            },
          ],
        },
      },
      {
        kicker: '05 — Decisão: um fluxo só',
        title: 'Dois fluxos quase iguais viraram um wizard',
        body: [
          'No arquivo, criar um consórcio privado e criar um público eram dois fluxos com quase as mesmas telas. Juntei os dois num wizard com uma pergunta por tela, que só se divide no critério de entrada. O resumo mostra tudo antes de publicar e deixa corrigir ali mesmo, sem voltar passo a passo.',
        ],
        gallery: [
          { src: `${B}/screens/criar-nome.webp`, alt: 'Qual o nome você quer dar para esse consórcio? Campo preenchido com Viagem Chapada e uma dica abaixo', device: 'ios' },
          { src: `${B}/screens/criar-criterio.webp`, alt: 'Defina os critérios de participação: qualquer pessoa, somente convidados ou amigos de amigos', device: 'ios' },
          { src: `${B}/screens/criar-resumo.webp`, alt: 'Resumo do consórcio antes de publicar: prêmio, parcela, participantes e vencimento', device: 'ios' },
          { src: `${B}/screens/criar-pronto.webp`, alt: 'Uhuuul! Consórcio publicado: foto de amigos brindando ao sol e o botão Visualizar consórcio', device: 'ios' },
        ],
      },
      {
        kicker: '06 — Convidar e organizar',
        title: 'Quem ainda não está no app também entra',
        body: [
          'Um consórcio entre amigos empaca se todo mundo precisar baixar o app antes. O convite sai pelo canal que a pessoa já usa, como o WhatsApp, e ela aparece como cadastro pendente até entrar. Quem administra arrasta os participantes para definir a ordem de contemplação. A aba Amigos não tinha tela desenhada, e eu a montei com os componentes do sistema.',
        ],
        gallery: [
          { src: `${B}/screens/convite-canal.webp`, alt: 'Por onde você quer adicionar o novo contato: e-mail, WhatsApp, Facebook Messenger ou iMessage', device: 'ios' },
          { src: `${B}/screens/convite-contatos.webp`, alt: 'Seletor de contatos no estilo do iOS, com Débora Vasconcelos marcada para receber o convite pelo WhatsApp', device: 'ios' },
          { src: `${B}/screens/ordem-drag.webp`, alt: 'Ordem dos premiados no meio de um arraste: José Ribeiro erguido sobre a lista, com o espaço onde vai cair marcado', device: 'ios' },
          { src: `${B}/screens/amigos.webp`, alt: 'Amigos: lista com fotos, níveis e consórcios em comum', device: 'ios' },
        ],
      },
      {
        kicker: '07 — Decisão: a confiança',
        title: 'Entre desconhecidos, pagar em dia abre a porta',
        body: [
          'Entre amigos, a confiança já existe. Num consórcio público, ela precisa vir de algum lugar. Quem paga em dia sobe de nível, e quem cria um consórcio público pode exigir um nível mínimo para entrar.',
          'O perfil mostra esse histórico. Quem administra vê quanto falta para fechar o grupo, e o saldo chega à conta em três toques.',
        ],
        gallery: [
          { src: `${B}/screens/detalhe-admin.webp`, alt: 'Consórcio Réveillon 2027 em formação, visto por quem administra: confirmados, pendentes e início', device: 'ios' },
          { src: `${B}/screens/descubra.webp`, alt: 'Descubra: consórcios públicos com o nível mínimo para participar', device: 'ios' },
          { src: `${B}/screens/perfil.webp`, alt: 'Perfil: foto, nível Gold, 18 de 23 pagamentos em dia, cartões e gerenciar conta', device: 'ios' },
          { src: `${B}/screens/saque-pronto.webp`, alt: 'Saque solicitado: foto de um cofrinho sobre moedas douradas e o valor a caminho da conta', device: 'ios' },
        ],
      },
      {
        kicker: '08 — Como eu trabalhei',
        title: '80 telas no arquivo, um app navegável em dias',
        body: [
          'Escrevi o brief e o sistema visual e coloquei agentes de IA para montar as telas em paralelo. Depois revisei cada uma contra o meu desenho: o texto, os estados, o contraste e os números, que precisam bater de uma tela para outra.',
          'A IA acelerou a produção. As decisões de produto e de design ficaram comigo, e é assim que eu levo um app do Figma a um protótipo testável em dias, não em meses.',
        ],
      },
    ],
    outcomesLabel: 'Resultado',
    outcomesTitle: 'O que o desenho ganhou',
    outcomes: [
      'Um protótipo que se usa: 12 telas navegáveis, do convite ao saque',
      'O meu desenho preservado, com uma marca mais quente e contraste AA',
      'Números que batem entre as telas: prêmio, parcela, saldo e contemplados',
      'Os dois fluxos de criação num wizard só, com resumo editável',
      'Os estados e a tela de Amigos que o arquivo não tinha',
    ],
    stackLabel: 'Ferramentas',
    stack: ['Figma', 'HTML, CSS e JavaScript', 'Agentes de IA', 'Playwright', 'Fotos livres do Unsplash'],
    cta: {
      heading: 'Tem um app no Figma que merece sair do arquivo?',
      sub: 'Eu levo do desenho a um protótipo que se usa, em dias, e cuido do que o arquivo não mostra, dos estados aos números que fecham.',
      label: 'Falar comigo',
    },
    ui: { back: 'Voltar aos projetos', visit: 'Abrir o protótipo' },
    liveUrl: `${APP}/index.html`,
    seo: {
      title: 'Finby — Case Study · Wellington Mota',
      description:
        'Finby: o app de consórcio entre amigos que desenhei, levado do Figma a um protótipo navegável em dias. 12 telas do convite ao saque, com marca mais quente e contraste AA.',
    },
  },

  en: {
    slug: 'finby',
    accent: '#7552F5',
    kicker: 'Case Study — Finby',
    title: 'Finby',
    subtitle:
      'Saving up with friends, without spreadsheets or anyone chasing payments in the group chat. I designed the app and, on my own and in days, turned the file into a prototype you can use on a phone: 12 navigable screens, from invite to withdrawal.',
    cover: {
      src: `${B}/cover.webp`,
      alt: 'Three Finby screens on a grainy violet background: the Viagem Bahia consórcio, the My consórcios home and the prize amount step',
    },
    meta: [
      { label: 'Product', value: 'Finby · social consórcio among friends' },
      { label: 'Prototype', value: '2026' },
      { label: 'Role', value: 'Solo, from the app in Figma to the prototype in code' },
      { label: 'Platform', value: 'iOS app · interactive web prototype' },
      { label: 'Scope', value: '80 screens across seven flows, from sign-in to withdrawal' },
    ],
    stats: [
      { value: '80', label: 'screens I designed, across seven flows' },
      { value: '12', label: 'navigable screens, with an automatic tour' },
      { value: '1', label: 'person from design to prototype, with AI on production' },
      { value: '2 in 1', label: 'creation flows, private and public, in one wizard' },
      { value: '6', label: 'consórcio themes, picked at creation' },
      { value: 'AA', label: 'contrast where the file fell short' },
    ],
    intro: [
      'A consórcio is a very Brazilian way of saving up: a group pays a monthly instalment into a shared pot, and each month one member takes the prize. Among friends it has always run informally, with one person tracking who paid and chasing whoever is late. Finby, which I designed, moves that agreement to the phone and takes the debt-collector role off the group.',
      'But an 80-screen file can’t show whether the numbers add up, or what it’s like to invite someone who isn’t on the app yet. So I turned the design into a prototype you can use: 12 navigable screens, with the same flows and the states the file skipped. I did it alone, with AI agents on production and the product decisions staying with me, in days, not months.',
    ],
    roleLabel: 'What I did',
    roleList: [
      'Product design',
      'UI and interaction',
      'Design system',
      'Art direction',
      'Accessibility',
      'UX writing',
      'Front-end',
      'AI agent orchestration',
    ],
    sections: [
      {
        kicker: '01 — The problem',
        title: 'Every group fund has someone stuck chasing payments',
        body: [
          'When friends save up for a trip or a graduation, someone becomes the treasurer. That person tracks who paid and chases whoever is late, usually in the group chat.',
          'Finby puts that agreement in an app. You set the prize and the instalment and invite whoever you like. Who gets paid when comes from a random draw or an order everyone agrees on, and the money earns 100% of the CDI rate while it waits.',
        ],
        image: {
          src: `${B}/overview-wire.webp`,
          alt: 'A mosaic of fourteen Finby screens as lo-fi wireframes: sign-in, home, consórcios, details, members, payout order, profile, the creation steps, invite and withdrawal',
          caption: 'The seven flows as wireframes, from sign-in to withdrawal.',
          width: 1440,
          height: 900,
        },
      },
      {
        kicker: '02 — The prototype',
        title: 'Try it before you read',
        body: [
          'It has 12 screens, and what you do is saved. Create a consórcio and it shows up on the home. Invite someone and they join as a pending sign-up. Or let the tour walk through the screens.',
        ],
        prototype: prototypeEn,
      },
      {
        kicker: '03 — Decision: hierarchy',
        title: 'Every screen starts with the payer’s question',
        body: [
          'Before any colour, I settled the order of information in wireframes. In an app about money among friends, people want to know how much they’ll pay and when their turn comes. Those answers come first on every screen, and the finish doesn’t change that order.',
        ],
        compare: {
          beforeLabel: 'Wireframe',
          afterLabel: 'Prototype',
          heuristicLabel: 'Decision',
          even: true,
          pairs: [
            {
              label: 'My consórcios',
              heuristic: 'Yours first',
              body: [
                'The home opens with what’s yours: the consórcios you’re in sit at the top. What your friends did comes after, in a feed.',
                'In the finish, each consórcio gets its own theme, and the winner of the month becomes a card with amount and date.',
              ],
              before: { src: `${B}/wire/home.webp`, alt: 'Home wireframe: My consórcios title, carousel cards, winner of the month and activity feed in black-outlined boxes' },
              after: { src: `${B}/screens/home.webp`, alt: 'Home in the prototype: Viagem Bahia card with a grainy mesh gradient, the winner of the month in a mint card and the activity feed' },
            },
            {
              label: 'The consórcio',
              heuristic: 'Numbers that never disagree',
              body: [
                'On the details screen, the first question is how much the group has saved. Right below come who’s in and when the next draw is.',
                'Every amount comes from the same maths, so one screen never contradicts another. The next draw says how long is left.',
              ],
              before: { src: `${B}/wire/detalhe.webp`, alt: 'Consórcio details wireframe: header with the amount, prize bar, members as circles, next draw and payment method' },
              after: { src: `${B}/screens/detalhe.webp`, alt: 'Viagem Bahia details in the prototype: ocean-themed header, prize, next draw, members and payment' },
            },
            {
              label: 'Who’s joining',
              heuristic: 'Nobody left out',
              body: [
                'Building the group means picking people, and not all of them are on the app. The list has search and a shortcut to invite whoever is missing.',
                'Selection shows in mint, with a check and AA-contrast text, and the count is announced to screen readers. People without an account join as pending.',
              ],
              before: { src: `${B}/wire/criar-quem.webp`, alt: 'Who’s joining wireframe: search, add a new contact, a friends list with checkboxes and a footer with the selected count and Next' },
              after: { src: `${B}/screens/criar-quem.webp`, alt: 'Who’s joining in the prototype: search, friends with photos and level crowns, selected rows on mint with a green check' },
            },
            {
              label: 'The prize amount',
              heuristic: 'The maths in plain sight',
              body: [
                'Whoever creates a consórcio thinks about the prize first. So the amount dominates the screen, with the instalment right below.',
                'The instalment is recalculated on every tap, with the maths written out: "You and 5 friends · 6 months, one prize a month". Buttons that would take the amount below zero are disabled.',
              ],
              before: { src: `${B}/wire/criar-valor.webp`, alt: 'Prize amount wireframe: R$ 6,000.00 in large type, six plus and minus buttons and a block with instalment, members and due date' },
              after: { src: `${B}/screens/criar-valor.webp`, alt: 'Prize amount in the prototype: a large amount with smaller cents, adjust buttons and the calculated instalment' },
            },
            {
              label: 'Withdrawing',
              heuristic: 'Prevent the error',
              body: [
                'Withdrawing should feel like the banking app people already use. It fits on one screen, with a keypad that types from the cents up.',
                'An amount above the balance disables the button with a message. The balance only changes after the review step.',
              ],
              before: { src: `${B}/wire/saque.webp`, alt: 'Withdrawal wireframe: R$ 500.00, balance bar, amount shortcuts, destination account, Request transfer button and keypad' },
              after: { src: `${B}/screens/saque.webp`, alt: 'Withdrawal in the prototype: R$ 500.00, available balance, destination account and keypad' },
            },
          ],
        },
      },
      {
        kicker: '04 — Decision: identity',
        title: 'The same brand, warmer',
        body: [
          'The design is mine, so the rule was to follow it. The brand violet and Sarabun stayed. I changed what made the app feel like a bank statement: cool greys became cream and emoji became photos of real people.',
        ],
        details: {
          items: [
            {
              src: `${B}/d-palette.webp`,
              alt: 'Prototype colour tokens: a ten-step violet scale with the brand at 600, plus mint, orange, ink and cream',
              label: 'A warmer palette',
              text: 'The brand violet became a ten-step scale and the cool background turned cream. The mint uses dark text to pass AA contrast.',
            },
            {
              src: `${B}/d-themes.webp`,
              alt: 'Six consórcio cards, one per theme: ocean, violet, mint, night, coral and amber, all with a grainy mesh gradient',
              label: 'One theme per consórcio',
              text: 'Six grainy gradients, one per theme. The creator picks it, and it follows the consórcio on its card and header.',
            },
            {
              src: `${B}/d-type.webp`,
              alt: 'Sarabun type scale: title, two-weight question, body, labels, a money amount with smaller cents and level badges',
              label: 'Sarabun with hierarchy',
              text: 'The file’s typeface, with clearer hierarchy. In money amounts, "R$" and the cents are smaller so the value reads first.',
            },
            {
              src: `${B}/d-icons.webp`,
              alt: 'Twenty-four thin-stroke icons and the tab bar with Início, Consórcios, Amigos and Perfil',
              label: 'One icon set',
              text: 'A single stroke instead of the file’s mix of styles. The tab bar, which was icon-only, got labels.',
            },
            {
              src: `${B}/d-art.webp`,
              alt: 'Ten photos: a beach with palm trees, graduation caps, coworkers laughing, New Year fireworks, friends watching TV, a campfire, friends toasting, friends looking at a phone, a piggy bank on coins and a hammock on the beach',
              label: 'Photos instead of emoji',
              text: 'The emoji on the success screens became warm photos of real people, and each consórcio got a photo of its goal.',
            },
            {
              src: `${B}/d-states.webp`,
              alt: 'Component states: active and disabled button, default and selected friend, a checked radio option and chips',
              label: 'The missing states',
              text: 'The file showed each component in a single state. The prototype has default, selected, disabled and a visible focus.',
            },
          ],
        },
      },
      {
        kicker: '05 — Decision: one flow',
        title: 'Two near-identical flows became one wizard',
        body: [
          'In the file, creating a private consórcio and creating a public one were two flows with nearly the same screens. I merged them into one wizard, one question per screen, that only splits at the entry criteria. The summary shows everything before publishing and lets you fix it right there, without stepping back.',
        ],
        gallery: [
          { src: `${B}/screens/criar-nome.webp`, alt: 'The name step, with Viagem Chapada typed in and a hint below', device: 'ios' },
          { src: `${B}/screens/criar-criterio.webp`, alt: 'Participation criteria: anyone, invite-only, or friends of friends', device: 'ios' },
          { src: `${B}/screens/criar-resumo.webp`, alt: 'Consórcio summary before publishing: prize, instalment, members and due date', device: 'ios' },
          { src: `${B}/screens/criar-pronto.webp`, alt: 'Consórcio published: a photo of friends toasting in the sun and a View consórcio button', device: 'ios' },
        ],
      },
      {
        kicker: '06 — Inviting and organising',
        title: 'People who aren’t on the app can join too',
        body: [
          'A consórcio among friends stalls if everyone has to download the app first. The invite goes out through the channel the person already uses, like WhatsApp, and they show up as a pending sign-up until they join. Admins drag members to set the payout order. The Friends tab had no designed screen, so I built it from the system’s components.',
        ],
        gallery: [
          { src: `${B}/screens/convite-canal.webp`, alt: 'Choosing how to add the new contact: email, WhatsApp, Facebook Messenger or iMessage', device: 'ios' },
          { src: `${B}/screens/convite-contatos.webp`, alt: 'iOS-style contact picker with Débora Vasconcelos checked to get the invite on WhatsApp', device: 'ios' },
          { src: `${B}/screens/ordem-drag.webp`, alt: 'Payout order mid-drag: José Ribeiro lifted above the list, with the drop slot marked', device: 'ios' },
          { src: `${B}/screens/amigos.webp`, alt: 'Friends: a list with photos, levels and consórcios in common', device: 'ios' },
        ],
      },
      {
        kicker: '07 — Decision: trust',
        title: 'Among strangers, paying on time opens the door',
        body: [
          'Among friends, trust is already there. In a public consórcio, it has to come from somewhere. People who pay on time level up, and whoever creates a public consórcio can require a minimum level to join.',
          'The profile shows that history. Admins see how many people are still missing, and the balance reaches your bank account in three taps.',
        ],
        gallery: [
          { src: `${B}/screens/detalhe-admin.webp`, alt: 'Réveillon 2027 being formed, as the admin sees it: confirmed, pending and start date', device: 'ios' },
          { src: `${B}/screens/descubra.webp`, alt: 'Discover: public consórcios with the minimum level to join', device: 'ios' },
          { src: `${B}/screens/perfil.webp`, alt: 'Profile: photo, Gold level, 18 of 23 payments on time, cards and account settings', device: 'ios' },
          { src: `${B}/screens/saque-pronto.webp`, alt: 'Withdrawal requested: a photo of a piggy bank on gold coins and the amount on its way to the bank', device: 'ios' },
        ],
      },
      {
        kicker: '08 — How I worked',
        title: '80 screens in a file, a navigable app in days',
        body: [
          'I wrote the brief and the visual system, and had AI agents build the screens in parallel. Then I reviewed each one against my design: copy, states, contrast and the numbers, which have to match from screen to screen.',
          'AI sped up production. The product and design decisions stayed with me, and that’s how I take an app from Figma to a testable prototype in days, not months.',
        ],
      },
    ],
    outcomesLabel: 'Outcome',
    outcomesTitle: 'What the design gained',
    outcomes: [
      'A prototype you can use: 12 navigable screens, from invite to withdrawal',
      'My design kept intact, with a warmer brand and AA contrast',
      'Numbers that agree across screens: prize, instalment, balance and winners',
      'Both creation flows in one wizard, with an editable summary',
      'The states and the Friends screen the file was missing',
    ],
    stackLabel: 'Tools',
    stack: ['Figma', 'HTML, CSS and JavaScript', 'AI agents', 'Playwright', 'Free photos from Unsplash'],
    cta: {
      heading: 'Got an app in Figma that deserves to leave the file?',
      sub: 'I take it from design to a prototype you can use, in days, and handle what the file doesn’t show, from states to numbers that add up.',
      label: 'Get in touch',
    },
    ui: { back: 'Back to projects', visit: 'Open the prototype' },
    liveUrl: `${APP}/index.html`,
    seo: {
      title: 'Finby — Case Study · Wellington Mota',
      description:
        'Finby: the social consórcio app I designed, taken from Figma to a navigable prototype in days. 12 screens from invite to withdrawal, with a warmer brand and AA contrast.',
    },
  },
};

export default finby;
