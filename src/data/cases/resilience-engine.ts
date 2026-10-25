import type { CaseStudy, PrototypeEmbed } from './types';

const B = '/cases/resilience-engine';
const APP = `${B}/app`;

const prototypePt: PrototypeEmbed = {
  src: `${APP}/index.html`,
  title: 'Protótipo navegável do app Resilience Dynamic',
  screensLabel: 'Ir direto para',
  screens: [
    { label: 'Boas-vindas', href: `${APP}/index.html` },
    { label: 'Criar conta', href: `${APP}/signup.html`, meta: 'era wireframe' },
    { label: 'Ajustes do check-in', href: `${APP}/settings.html`, meta: 'era wireframe' },
    { label: 'Home', href: `${APP}/home.html` },
    { label: 'Check-in', href: `${APP}/checkin.html`, meta: 'era wireframe' },
    { label: 'Resultado', href: `${APP}/result.html`, meta: 'era wireframe' },
    { label: 'Ferramentas sugeridas', href: `${APP}/tools.html` },
    { label: 'Trilha de sono', href: `${APP}/pathway.html?id=sleep` },
    { label: 'Prática', href: `${APP}/tool.html?id=walking-mindfully` },
    { label: 'Produtividade & bem-estar', href: `${APP}/trends.html` },
    { label: 'Seus dados', href: `${APP}/data.html` },
    { label: 'Recursos', href: `${APP}/resources.html` },
  ],
  hint: 'Use como num celular: responda o check-in e veja o rio subir ou descer. Os dados são fictícios e ficam só no seu navegador.',
  openLabel: 'Abrir em tela cheia',
  resetLabel: 'Recomeçar do zero',
  storagePrefix: 'rd:',
  autoplay: { pause: 'Pausar tour', resume: 'Retomar tour' },
  caption: 'As telas marcadas com "era wireframe" estavam só no esboço no meu arquivo e foram desenhadas para este protótipo.',
};

const prototypeEn: PrototypeEmbed = {
  ...prototypePt,
  title: 'Interactive prototype of the Resilience Dynamic app',
  screensLabel: 'Jump to',
  screens: [
    { label: 'Welcome', href: `${APP}/index.html` },
    { label: 'Create account', href: `${APP}/signup.html`, meta: 'was a wireframe' },
    { label: 'Track settings', href: `${APP}/settings.html`, meta: 'was a wireframe' },
    { label: 'Home', href: `${APP}/home.html` },
    { label: 'Check-in', href: `${APP}/checkin.html`, meta: 'was a wireframe' },
    { label: 'Result', href: `${APP}/result.html`, meta: 'was a wireframe' },
    { label: 'Suggested tools', href: `${APP}/tools.html` },
    { label: 'Sleep pathway', href: `${APP}/pathway.html?id=sleep` },
    { label: 'Practice', href: `${APP}/tool.html?id=walking-mindfully` },
    { label: 'Productivity & wellbeing', href: `${APP}/trends.html` },
    { label: 'Your data', href: `${APP}/data.html` },
    { label: 'Resources', href: `${APP}/resources.html` },
  ],
  hint: 'Use it like a phone: answer the check-in and watch the river rise or fall. The data is fictional and stays in your browser.',
  openLabel: 'Open full screen',
  resetLabel: 'Start over',
  autoplay: { pause: 'Pause tour', resume: 'Resume tour' },
  caption: 'Screens marked "was a wireframe" were only sketches in my file and were designed for this prototype.',
};

const resilience: CaseStudy = {
  pt: {
    slug: 'resilience-engine',
    accent: '#7C7FF2',
    kicker: 'Case Study — The Resilience Engine',
    title: 'Resilience Dynamic',
    subtitle:
      'Desenhei o app de resiliência de uma consultoria de Edimburgo, e ele foi lançado. Em 2026 levei o meu arquivo do Figma a um protótipo de 15 telas que se usa, com as telas que faltavam desenhadas e um rio que sobe e desce com o seu dia.',
    cover: {
      src: `${B}/cover.webp`,
      alt: 'Três telas do app Resilience Dynamic sobre fundo lilás com ondas: o welcome com a paisagem granulada, a home com o rio do dia e as red flags',
    },
    meta: [
      { label: 'Cliente', value: 'The Resilience Engine · Edimburgo (hoje Resilience Dynamic)' },
      { label: 'Ano', value: '2023 · protótipo em 2026' },
      { label: 'Papel', value: 'Product Designer, do app no Figma ao protótipo em código' },
      { label: 'Plataforma', value: 'App mobile · protótipo web navegável' },
      { label: 'Status', value: 'App lançado' },
    ],
    stats: [
      { value: '15', label: 'telas navegáveis no protótipo' },
      { value: '4', label: 'telas do ciclo principal que eram só wireframe, agora desenhadas' },
      { value: '1', label: 'pessoa do design ao código, com IA na produção' },
      { value: '7', label: 'perguntas num check-in de dois minutos' },
      { value: '3', label: 'zonas com nome, para a cor nunca ser o único sinal' },
      { value: '10', label: 'passos de onboarding para ensinar o método' },
    ],
    intro: [
      'A The Resilience Engine, uma consultoria de Edimburgo, ensina que a resiliência sobe e desce como o nível de um rio. Rio alto passa por cima das pedras, rio baixo é empurrado para fora do curso. Em 2023 desenhei o app que ajuda a pessoa a perceber a queda a tempo, e ele foi lançado. No meu arquivo do Figma, porém, quatro telas do ciclo principal ficaram no wireframe, e um arquivo parado não mostra o que acontece depois do toque.',
      'Em 2026 levei esse arquivo a um protótipo de 15 telas que se usa. O desenho ficou como estava, e as telas que faltavam saíram dos componentes do próprio sistema. Responda o check-in e o rio sobe ou desce de verdade. É o que eu entrego: do desenho ao produto funcionando, com critério de produto e IA na produção, em dias, não meses.',
    ],
    roleLabel: 'O que eu fiz',
    roleList: [
      'Product design',
      'Design system',
      'Visualização de dados',
      'Ilustração',
      'Acessibilidade',
      'UX writing',
      'Front-end',
      'Orquestração de agentes de IA',
    ],
    sections: [
      {
        kicker: '01 — O problema',
        title: 'Avisar antes que o rio baixe demais',
        body: [
          'Quem está perdendo o fôlego no trabalho costuma perceber tarde. O app gira em torno de um check-in de sete perguntas, da demanda no trabalho ao sono, que vira um nível de 1 a 6 e uma zona do método RAG, do verde ao vermelho. Cada área no vermelho vira uma red flag e leva a uma ferramenta curta ou a uma trilha.',
          'O meu arquivo já tinha quase tudo, do onboarding ao player das práticas. Faltava justamente o ciclo principal: criar a conta, ajustar o check-in, responder e ver o resultado ainda eram wireframe.',
        ],
        image: {
          src: `${B}/loop2-overview.webp`,
          alt: 'Mosaico inclinado com 60 telas do protótipo, na ordem de uso: onboarding, criar conta, ajustes, check-in, red flags, ferramentas, trilhas, gráficos, práticas, players, recursos e diário',
          caption: 'O app inteiro no protótipo, tela a tela, já com as quatro telas que eram wireframe.',
          width: 1440,
          height: 810,
        },
        galleryTitle: 'O onboarding: o método em dez passos',
        gallery: [
          { src: `${B}/screens/welcome.webp`, alt: 'Welcome: um homem de barba ruiva acenando no alto do caminho, com o sol nascendo atrás das colinas', device: 'ios' },
          { src: `${B}/screens/onboarding-2.webp`, alt: 'Let’s first understand what resilience is: uma borboleta pousada numa flor, dentro de um círculo de luz', device: 'ios' },
          { src: `${B}/screens/onboarding-3.webp`, alt: 'Next, let’s understand your starting point: o vídeo do Resilience River, com um homem sentado numa pedra à beira do rio', device: 'ios' },
          { src: `${B}/screens/onboarding-4.webp`, alt: 'Features: um homem de jaqueta mostarda tocando a tela de um celular gigante', device: 'ios' },
          { src: `${B}/screens/onboarding-5.webp`, alt: 'Features: uma mulher meditando entre o sol e a lua, o céu passando do dia à noite', device: 'ios' },
          { src: `${B}/screens/onboarding.webp`, alt: 'Red, Amber & Green Zones: o homem de jaqueta mostarda, de braços cruzados, ao lado de um semáforo', device: 'ios' },
          { src: `${B}/screens/onboarding-7.webp`, alt: 'Green: o semáforo com a luz verde acesa e o homem com o polegar para cima', device: 'ios' },
          { src: `${B}/screens/onboarding-8.webp`, alt: 'Amber: a luz âmbar acesa e o homem com a mão no queixo, pensando', device: 'ios' },
          { src: `${B}/screens/onboarding-9.webp`, alt: 'Red: a luz vermelha acesa e o homem com a mão erguida, em sinal de pare', device: 'ios' },
          { src: `${B}/screens/onboarding-10.webp`, alt: 'Are you ready?: uma mulher de cabelo chanel com o punho erguido diante do sol, e o botão Let’s start', device: 'ios' },
        ],
        galleryCaption: 'Do welcome ao "Are you ready?", o onboarding ensina o método antes da primeira pergunta. Cada passo tem alguém do elenco do app.',
      },
      {
        kicker: '02 — O protótipo',
        title: 'Experimente antes de ler',
        body: [
          'São 15 telas, e o que você faz fica salvo. Responda o check-in e o rio da home sobe ou desce com as suas respostas, assim como as red flags do resultado. Se preferir, deixe o tour passar pelas telas.',
        ],
        prototype: prototypePt,
      },
      {
        kicker: '03 — Decisão: refinar',
        title: 'Manter o desenho e trabalhar no que o Figma não mostra',
        body: [
          'A regra foi não reinventar. O visual do arquivo ficou como estava, e o trabalho foi no que um arquivo de design não mostra: o que acontece depois do toque e os gráficos com dados de verdade.',
          'A home era um menu de quatro cartões, e o único dado na tela era a data do último check-in. Ganhou um componente novo no topo, o rio do dia, com o nível e a zona. Depois do check-in ele sobe ou desce, e a pessoa vê na hora como está.',
          'Os gráficos de linhas já respondiam à pergunta certa: como cada área se moveu no período. Agora as linhas vêm do histórico da pessoa, filtradas por período e por área, e cada gráfico tem uma tabela para quem usa leitor de tela.',
          'No gráfico polar, só a legenda dizia qual área estava na tela. A área escolhida foi para o título, com a média e a zona, e a legenda virou um seletor.',
          'Na prática guiada, o texto turquesa claro ficava abaixo do contraste mínimo e as instruções eram um bloco corrido. O texto passou para o Deep Blue do próprio sistema, e as instruções viraram partes que acompanham o áudio.',
        ],
        gallery: [
          { src: `${B}/screens/home.webp`, alt: 'Home no protótipo: cartão do rio com nível 3,4 de 6 na zona Stretching e, abaixo, os cartões Productivity & Wellbeing e Daily Practices, cada um com uma paisagem em arco', device: 'ios' },
          { src: `${B}/screens/trends.webp`, alt: 'Productivity & Wellbeing no protótipo: filtros de período e de área e dois gráficos de linhas com legenda', device: 'ios' },
          { src: `${B}/screens/data-polar.webp`, alt: 'Gráfico polar no protótipo: Contentedness no título com o selo 4.9 avg · Sweet spot e a legenda como seletor', device: 'ios' },
          { src: `${B}/screens/tool.webp`, alt: 'Prática Walking Mindfully no protótipo: uma senhora de cabelo prateado no caminho, sob o sol, parte atual do áudio, player com avanço de 15 segundos e pergunta de reflexão', device: 'ios' },
        ],
        galleryCaption: 'A home com o rio do dia, os gráficos filtrados por área, o polar com a área no título e a prática dividida em partes.',
      },
      {
        kicker: '04 — Decisão: as telas que faltavam',
        title: 'O ciclo principal, desenhado com o que o sistema já tinha',
        body: [
          'No arquivo, as quatro telas que fazem o produto funcionar ainda eram wireframe. Em vez de criar uma linguagem nova, montei cada uma com peças do próprio sistema, do painel do onboarding aos campos e toggles, e com as mesmas paisagens do resto do app.',
        ],
        compare: {
          beforeLabel: 'Wireframe',
          afterLabel: 'Protótipo',
          heuristicLabel: 'Princípio',
          pairs: [
            {
              label: 'Criar conta',
              heuristic: 'Prevenção de erros',
              body: [
                'Um erro de cadastro não pode aparecer antes de a pessoa terminar de digitar. Os campos só acusam erro quando ela sai deles, e a senha pode ser mostrada. A mesma tela vira "Sign in" com um toque, e o visual vem do onboarding: o painel lilás com a cena do último passo e a sheet branca.',
              ],
              before: { src: `${B}/before/create-account.webp`, alt: 'Wireframe de Criar conta: área da ilustração, três campos com rótulo, botão Create account e link Sign in' },
              after: { src: `${B}/screens/signup.webp`, alt: 'Criar conta: uma mulher de punho erguido diante do sol, em todo o painel lilás; campos de nome, e-mail de trabalho e senha, botão Create account e link Sign in' },
            },
            {
              label: 'Ajustes do check-in',
              heuristic: 'Controle e liberdade',
              body: [
                'O check-in só vira hábito se chegar na hora certa. A pessoa escolhe a frequência e o horário do lembrete, tudo com componentes que o sistema já tinha. Na primeira vez, os ajustes vêm antes do check-in e levam direto a ele.',
              ],
              before: { src: `${B}/before/track-settings.webp`, alt: 'Wireframe de Track Settings: área da ilustração, seletor Daily ou Weekly, dropdown de dias, switch de lembretes, horário e botão Save settings' },
              after: { src: `${B}/screens/settings.webp`, alt: 'Track Settings: uma mulher meditando entre o dia e a noite, em todo o painel; frequência Daily ou Weekly, dias, switch de lembretes e horário' },
            },
            {
              label: 'Check-in',
              heuristic: 'Uma pergunta por vez',
              body: [
                'O check-in precisa caber em dois minutos. É uma pergunta por tela, numa escala de 1 a 6 em que o 6 é sempre o lado bom, inclusive em estresse e demanda. Tocar um número já confirma e avança, e na última pergunta a seta vira "See my results".',
              ],
              before: { src: `${B}/before/tracker.webp`, alt: 'Wireframe do check-in: ícone da área, título, pergunta, escala de 1 a 6, setas de voltar e avançar e o progresso em 7 passos' },
              after: { src: `${B}/screens/checkin.webp`, alt: 'Check-in: ícone de lua, pergunta sobre sono com escala de 1 a 6, de Broken a Deeply restful, na pergunta 4 de 7' },
            },
            {
              label: 'Resultado',
              heuristic: 'Explique o porquê',
              body: [
                'O resultado precisa dizer o que fazer agora. Ele parte da tela de Red Flags que o arquivo já tinha e põe o rio do dia no topo. A bandeira só fica vermelha nas áreas que caíram na zona vermelha, e cada uma leva à trilha ou às ferramentas daquela área.',
              ],
              before: { src: `${B}/before/track-results.webp`, alt: 'Wireframe do resultado: cartão com a nota do dia, título Red Flags, ilustração, atalho para os dados, abas Productivity e Wellbeing e a lista de áreas' },
              after: { src: `${B}/screens/result.webp`, alt: 'Red Flags: cartão do rio com 3,4 de 6, uma pessoa erguendo uma bandeira vermelha no morro, atalho See my Data e as áreas de produtividade com bandeiras' },
            },
          ],
        },
      },
      {
        kicker: '05 — O sistema',
        title: 'O sistema do arquivo, completo e acessível',
        body: [
          'As cores e os componentes do arquivo viraram a base do protótipo. Onde o contraste ficava abaixo do mínimo, a correção preservou o desenho: o texto branco do toggle selecionado virou Deep Blue sobre o mesmo lilás.',
        ],
        details: {
          items: [
            {
              src: `${B}/d-river.webp`,
              alt: 'Cartão Your river today: nível 3,4 de 6, selo Stretching e um rio turquesa com régua vertical de 1 a 6 em vermelho, âmbar e verde',
              label: 'O rio do dia',
              text: 'O único componente novo da home mostra o nível do dia como água, com a régua de 1 a 6 nas cores RAG. Cada zona tem um nome, como Sweet spot ou Act now, para a cor nunca ser o único sinal.',
            },
            {
              src: `${B}/d-art.webp`,
              alt: 'Oito paisagens granuladas em colinas verdes, do amanhecer à noite: o sol nascendo no lago com um broto, uma senhora de cabelo prateado no caminho, um homem de barba sentado numa pedra à beira do rio, uma mulher de mãos na cintura diante de uma serra, um homem ao lado de uma bateria de vidro, uma mulher meditando diante do sol, a senhora lendo numa rede sob a lua nascendo e uma lua crescente sobre uma barraca acesa',
              label: 'Um estilo de ilustração só',
              text: 'As ilustrações do arquivo misturavam estilos diferentes. Todas viraram paisagens com gradiente e grão, com um elenco de cinco pessoas desenhadas de perto. Só a hora do dia muda a paleta, do onboarding ao player.',
            },
            {
              src: `${B}/d-rag.webp`,
              alt: 'Barras RAG de quatro áreas, Demand vs Capacity, Energy, Sleep e Stress, com porcentagens diferentes em vermelho, âmbar e turquesa',
              label: 'RAG calculado',
              text: 'No arquivo, todas as barras repetiam as mesmas porcentagens de exemplo. Agora cada barra conta os dias que a pessoa passou em cada zona.',
            },
            {
              src: `${B}/d-copy.webp`,
              alt: 'Quatro correções de texto: Montly para Monthly, Strees para Stress, Lear more para Learn more e Responsability para Responsibility',
              label: 'Revisão de texto',
              text: 'Erros que passam despercebidos num arquivo de design e não podem chegar à produção.',
            },
            {
              src: `${B}/d-tokens.webp`,
              alt: 'Doze amostras da paleta do Figma, a fonte Noto Sans em quatro tamanhos e dois botões roxos, Let’s start e Start',
              label: 'A paleta do arquivo, intacta',
              text: 'As cores e a escala tipográfica do Figma seguem as mesmas. Mudar uma cor muda o app inteiro, como mudaria no arquivo.',
            },
            {
              src: `${B}/d-dark.webp`,
              alt: 'O player da trilha de sono lado a lado no tema claro e no escuro, com a cena da lua sobre o mar',
              label: 'Claro e escuro',
              text: 'O arquivo já tinha um ícone de lua no player, para ouvir antes de dormir. Agora ele liga um tema escuro com o contraste revisado, que fica lembrado para a próxima prática.',
            },
          ],
        },
      },
      {
        kicker: '06 — Do check-in à ação',
        title: 'Cada red flag leva a uma ação',
        body: [
          'Uma red flag sem saída só deixa a pessoa mais preocupada. Por isso cada área no vermelho leva a uma ferramenta rápida ou a uma trilha mais longa, e dali de volta aos dados. As telas do arquivo agora se ligam umas às outras, com o check-in do dia passando por todas.',
        ],
        gallery: [
          { src: `${B}/screens/result-wellbeing.webp`, alt: 'Red Flags na aba Wellbeing: Sleep com bandeira vermelha, Stress e Wellbeing', device: 'ios' },
          { src: `${B}/screens/tools.webp`, alt: 'Suggested Tools: busca, abas Quick Tools e In-depth e cartões de Sleep, Contentedness e Demand vs Capacity', device: 'ios' },
          { src: `${B}/screens/tools-deep.webp`, alt: 'Suggested Tools na aba In-depth: as trilhas de Sleep, Contentedness e Demand vs Capacity, com o número de passos', device: 'ios' },
          { src: `${B}/screens/pathway.webp`, alt: 'Sleep Pathway: cabeçalho creme com colinas e grão e seis passos com marcação de concluído, de What is Good Sleep? a Your Resilience Dynamic', device: 'ios' },
          { src: `${B}/screens/pathway-energy.webp`, alt: 'Energy Pathway: cabeçalho celeste com colinas e grão e os passos Mapping Your Energy, Energy Battery e Walking Mindfully', device: 'ios' },
          { src: `${B}/screens/overview.webp`, alt: 'Score Overview: cabeçalho turquesa com textura, atalho See my Data e as Resilience Pathways de Sleep e Contentedness', device: 'ios' },
          { src: `${B}/screens/overview-tools.webp`, alt: 'Score Overview rolado até Recommended Tools: Resilience River, Resilience Enablers, Find Your Autonomy e Taking Responsibility, cada uma com sua cena', device: 'ios' },
          { src: `${B}/screens/data.webp`, alt: 'Your Data: barras RAG por área, com filtros de período e de área', device: 'ios' },
          { src: `${B}/screens/data-areas.webp`, alt: 'Your Data com a bottom sheet de áreas aberta: Productivity ou Wellbeing, All key areas, Demand vs Capacity e Energy', device: 'ios' },
          { src: `${B}/screens/trends-sleep.webp`, alt: 'Productivity & Wellbeing filtrado por Sleep no mês: um gráfico de linhas com a nota de cada dia, de 1 a 6', device: 'ios' },
        ],
      },
      {
        kicker: '07 — Prática e reflexão',
        title: 'Práticas curtas, um diário só seu',
        body: [
          'A prática precisa caber no dia de quem já está sem fôlego. Por isso as práticas diárias são curtas e marcam o que já foi feito. Cada ferramenta termina com uma pergunta, e a resposta vai para um diário que só a pessoa vê.',
        ],
        gallery: [
          { src: `${B}/screens/practices.webp`, alt: 'Daily Resilience Practices: lista de metas do dia, algumas concluídas', device: 'ios' },
          { src: `${B}/screens/body-scan.webp`, alt: 'Body Scan: uma mulher meditando diante do sol, player de áudio e a parte Settle', device: 'ios' },
          { src: `${B}/screens/mapping-energy.webp`, alt: 'Mapping Your Energy: uma mulher de mãos na cintura diante de uma serra de picos, e as instruções para desenhar a energia do dia', device: 'ios' },
          { src: `${B}/screens/energy-battery.webp`, alt: 'Energy Battery: um homem ao lado de uma bateria de vidro carregando e a lista do que carrega e do que descarrega', device: 'ios' },
          { src: `${B}/screens/resilience-river.webp`, alt: 'Resilience River: um homem sentado numa pedra à beira do rio, player de vídeo e a pergunta How high is your river running today?', device: 'ios' },
          { src: `${B}/screens/tool-light.webp`, alt: 'What is Good Sleep? no tema claro: lua sobre o mar, player de vídeo e a parte Rhythm and pattern', device: 'ios' },
          { src: `${B}/screens/tool-dark.webp`, alt: 'A mesma tela de sono no tema escuro', device: 'ios' },
          { src: `${B}/screens/resources.webp`, alt: 'Resources: coleções Resilience River, Being Present, Energy e Sleep', device: 'ios' },
          { src: `${B}/screens/resources-topic.webp`, alt: 'Being Present: a coleção com Walking Mindfully e Body Scan', device: 'ios' },
          { src: `${B}/screens/journal.webp`, alt: 'Journal: reflexões salvas a partir das práticas, com a ferramenta de origem', device: 'ios' },
        ],
      },
      {
        kicker: '08 — Como eu trabalhei',
        title: 'IA na produção, critério de produto comigo',
        body: [
          'Parti do meu próprio arquivo e decidi o que ficava e o que precisava de refinamento. Agentes de IA montaram as telas, e eu revisei uma por uma, do texto ao contraste, até os números baterem do check-in aos gráficos.',
          'A IA deu velocidade. O critério de produto continuou comigo, e é essa combinação que leva um arquivo de design a algo que se testa em dias, não em meses.',
        ],
      },
    ],
    outcomesLabel: 'Resultado',
    outcomesTitle: 'O que o protótipo entregou',
    outcomes: [
      'Um design que se toca: 15 telas navegáveis no lugar de frames parados',
      'O ciclo principal completo, do cadastro ao resultado, com as quatro telas que eram wireframe',
      'Um check-in que mexe no rio da home e nas red flags, com gráficos alimentados por 28 dias de histórico',
      'Contraste corrigido onde o arquivo ficava abaixo do mínimo, sem mudar o desenho',
      'Um só estilo de ilustração do onboarding ao player, com pessoas desenhadas de perto',
    ],
    stackLabel: 'Ferramentas',
    stack: ['Figma', 'HTML, CSS e JavaScript', 'Agentes de IA', 'Playwright'],
    cta: {
      heading: 'Tem um design no Figma que precisa virar algo que as pessoas consigam tocar?',
      sub: 'Eu levo do arquivo a um produto que dá para usar e testar, sem perder o desenho, em dias.',
      label: 'Falar comigo',
    },
    ui: { back: 'Voltar aos projetos', visit: 'Abrir o protótipo' },
    liveUrl: `${APP}/index.html`,
    seo: {
      title: 'Resilience Dynamic — Case Study · Wellington Mota',
      description:
        'Resilience Dynamic: o app de resiliência que desenhei para a The Resilience Engine (Edimburgo), já lançado, levado do Figma a um protótipo navegável de 15 telas, com as telas que eram wireframe enfim desenhadas.',
    },
  },

  en: {
    slug: 'resilience-engine',
    accent: '#7C7FF2',
    kicker: 'Case Study — The Resilience Engine',
    title: 'Resilience Dynamic',
    subtitle:
      'I designed the resilience app for an Edinburgh consultancy, and it launched. In 2026 I took my Figma file to a 15-screen prototype you can actually use, with the missing screens designed and a river that rises and falls with your day.',
    cover: {
      src: `${B}/cover.webp`,
      alt: 'Three Resilience Dynamic screens on a lilac background with waves: the welcome with its grainy landscape, the home with today’s river and the red flags',
    },
    meta: [
      { label: 'Client', value: 'The Resilience Engine · Edinburgh (now Resilience Dynamic)' },
      { label: 'Year', value: '2023 · prototype in 2026' },
      { label: 'Role', value: 'Product Designer, from the app in Figma to the prototype in code' },
      { label: 'Platform', value: 'Mobile app · interactive web prototype' },
      { label: 'Status', value: 'App launched' },
    ],
    stats: [
      { value: '15', label: 'navigable screens in the prototype' },
      { value: '4', label: 'core-loop screens that were only wireframes, now designed' },
      { value: '1', label: 'person from design to code, with AI in production' },
      { value: '7', label: 'questions in a two-minute check-in' },
      { value: '3', label: 'named zones, so colour is never the only signal' },
      { value: '10', label: 'onboarding steps that teach the method' },
    ],
    intro: [
      'The Resilience Engine, an Edinburgh consultancy, teaches that resilience rises and falls like the level of a river. A high river flows over the rocks, a low one gets pushed off course. In 2023 I designed the app that helps people notice the drop in time, and it launched. In my Figma file, though, four screens of the core loop stayed at wireframe, and a static file can’t show what happens after a tap.',
      'In 2026 I took that file to a 15-screen prototype you can use. The design stayed as it was, and the missing screens came from the system’s own components. Answer the check-in and the river really rises or falls. That’s what I deliver: from design to a working product, with product judgement and AI in production, in days, not months.',
    ],
    roleLabel: 'What I did',
    roleList: [
      'Product design',
      'Design system',
      'Data visualisation',
      'Illustration',
      'Accessibility',
      'UX writing',
      'Front-end',
      'AI agent orchestration',
    ],
    sections: [
      {
        kicker: '01 — The problem',
        title: 'Warn people before the river runs too low',
        body: [
          'People who are running out of steam at work tend to notice late. The app centres on a check-in of seven questions, from demand at work to sleep, that becomes a level from 1 to 6 and a zone in the RAG method, from green to red. Every area in the red becomes a red flag and leads to a short tool or a pathway.',
          'My file already had almost all of it, from the onboarding to the practice player. What it lacked was the core loop: creating an account, setting up the check-in, answering it and seeing the result were still wireframes.',
        ],
        image: {
          src: `${B}/loop2-overview.webp`,
          alt: 'Tilted mosaic of 60 prototype screens in the order you meet them: onboarding, create account, settings, check-in, red flags, tools, pathways, charts, practices, players, resources and journal',
          caption: 'The whole app in the prototype, screen by screen, including the four screens that were wireframes.',
          width: 1440,
          height: 810,
        },
        galleryTitle: 'The onboarding: the method in ten steps',
        gallery: [
          { src: `${B}/screens/welcome.webp`, alt: 'Welcome: a man with an auburn beard waving from the top of the path, the sun rising behind the hills', device: 'ios' },
          { src: `${B}/screens/onboarding-2.webp`, alt: 'Let’s first understand what resilience is: a butterfly resting on a flower inside a circle of light', device: 'ios' },
          { src: `${B}/screens/onboarding-3.webp`, alt: 'Next, let’s understand your starting point: the Resilience River video, with a man sitting on a rock by the river', device: 'ios' },
          { src: `${B}/screens/onboarding-4.webp`, alt: 'Features: a man in a mustard jacket tapping the screen of a giant phone', device: 'ios' },
          { src: `${B}/screens/onboarding-5.webp`, alt: 'Features: a woman meditating between the sun and the moon, the sky turning from day to night', device: 'ios' },
          { src: `${B}/screens/onboarding.webp`, alt: 'Red, Amber & Green Zones: the man in the mustard jacket, arms crossed, beside a traffic light', device: 'ios' },
          { src: `${B}/screens/onboarding-7.webp`, alt: 'Green: the traffic light on green and the man giving a thumbs up', device: 'ios' },
          { src: `${B}/screens/onboarding-8.webp`, alt: 'Amber: the amber light on and the man with a hand on his chin, thinking', device: 'ios' },
          { src: `${B}/screens/onboarding-9.webp`, alt: 'Red: the red light on and the man raising a hand to say stop', device: 'ios' },
          { src: `${B}/screens/onboarding-10.webp`, alt: 'Are you ready?: a woman with a bob raising a fist before the sun, and the Let’s start button', device: 'ios' },
        ],
        galleryCaption: 'From the welcome to "Are you ready?", the onboarding teaches the method before the first question. Every step features someone from the app’s cast.',
      },
      {
        kicker: '02 — The prototype',
        title: 'Try it before you read',
        body: [
          'It has 15 screens, and what you do is saved. Answer the check-in and the river on the home rises or falls with your answers, and so do the red flags on the result. If you prefer, let the tour walk through the screens.',
        ],
        prototype: prototypeEn,
      },
      {
        kicker: '03 — Decision: refine',
        title: 'Keep the design and work on what Figma doesn’t show',
        body: [
          'The rule was not to reinvent. The file’s visuals stayed as they were, and the work went into what a design file doesn’t show: what happens after a tap, and charts with real data.',
          'The home was a menu of four cards, and the only data on screen was the date of the last check-in. It gained one new component at the top, today’s river, with the level and the zone. After a check-in it rises or falls, and people see at once where they stand.',
          'The line charts already answered the right question: how each area moved over the period. Now the lines come from the person’s own history, filtered by period and by area, and every chart has a table for screen reader users.',
          'On the polar chart, only the legend said which area was on screen. The chosen area moved into the title, with its average and zone, and the legend became a selector.',
          'In the guided practice, the light teal text fell below minimum contrast and the instructions were one run-on block. The text moved to the system’s own Deep Blue, and the instructions became parts that follow the audio.',
        ],
        gallery: [
          { src: `${B}/screens/home.webp`, alt: 'Home in the prototype: the river card at level 3.4 of 6 in the Stretching zone, with the Productivity & Wellbeing and Daily Practices cards below, each with an arched landscape', device: 'ios' },
          { src: `${B}/screens/trends.webp`, alt: 'Productivity & Wellbeing in the prototype: period and area filters and two line charts with a legend', device: 'ios' },
          { src: `${B}/screens/data-polar.webp`, alt: 'Polar chart in the prototype: Contentedness in the title with a 4.9 avg · Sweet spot chip and the legend as a selector', device: 'ios' },
          { src: `${B}/screens/tool.webp`, alt: 'Walking Mindfully practice in the prototype: a silver-haired woman on the path under the sun, the current audio part, a player with 15-second skips and a reflection question', device: 'ios' },
        ],
        galleryCaption: 'The home with today’s river, the charts filtered by area, the polar chart with the area in its title and the practice split into parts.',
      },
      {
        kicker: '04 — Decision: the missing screens',
        title: 'The core loop, designed with what the system already had',
        body: [
          'In the file, the four screens that make the product work were still wireframes. Instead of creating a new language, I built each one from the system’s own pieces, from the onboarding panel to the fields and toggles, with the same landscapes as the rest of the app.',
        ],
        compare: {
          beforeLabel: 'Wireframe',
          afterLabel: 'Prototype',
          heuristicLabel: 'Principle',
          pairs: [
            {
              label: 'Create account',
              heuristic: 'Error prevention',
              body: [
                'A sign-up error shouldn’t appear before someone has finished typing. Fields only flag an error once you leave them, and the password can be shown. The same screen becomes "Sign in" with one tap, and the look comes from the onboarding: the lilac panel with the last step’s scene and the white sheet.',
              ],
              before: { src: `${B}/before/create-account.webp`, alt: 'Create account wireframe: illustration area, three labelled fields, a Create account button and a Sign in link' },
              after: { src: `${B}/screens/signup.webp`, alt: 'Create account: a woman raising a fist before the sun, across the whole lilac panel; name, work email and password fields, a Create account button and a Sign in link' },
            },
            {
              label: 'Track settings',
              heuristic: 'User control and freedom',
              body: [
                'A check-in only becomes a habit if it arrives at the right time. People choose the frequency and the reminder time, all with components the system already had. The first time round, settings come before the check-in and lead straight into it.',
              ],
              before: { src: `${B}/before/track-settings.webp`, alt: 'Track Settings wireframe: illustration area, a Daily or Weekly toggle, a days dropdown, a reminders switch, the reminder time and a Save settings button' },
              after: { src: `${B}/screens/settings.webp`, alt: 'Track Settings: a woman meditating between day and night, across the whole panel; Daily or Weekly frequency, days, a reminders switch and the reminder time' },
            },
            {
              label: 'Check-in',
              heuristic: 'One question at a time',
              body: [
                'The check-in has to fit into two minutes. It asks one question per screen, on a 1–6 scale where 6 is always the better end, stress and demand included. Tapping a number confirms and moves on, and on the last question the arrow becomes "See my results".',
              ],
              before: { src: `${B}/before/tracker.webp`, alt: 'Check-in wireframe: area icon, title, question, a 1 to 6 scale, back and next arrows and 7-step progress' },
              after: { src: `${B}/screens/checkin.webp`, alt: 'Check-in: a moon icon and a sleep question on a 1 to 6 scale, from Broken to Deeply restful, at question 4 of 7' },
            },
            {
              label: 'Result',
              heuristic: 'Explain the why',
              body: [
                'The result has to say what to do now. It starts from the Red Flags screen the file already had and puts today’s river on top. The flag only turns red for areas that fell into the red zone, and each one leads to that area’s pathway or tools.',
              ],
              before: { src: `${B}/before/track-results.webp`, alt: 'Result wireframe: a card with the day’s score, the Red Flags title, an illustration, a data shortcut, Productivity and Wellbeing tabs and the list of areas' },
              after: { src: `${B}/screens/result.webp`, alt: 'Red Flags: the river card at 3.4 of 6, someone raising a red flag on a hill, a See my Data shortcut and the productivity areas with their flags' },
            },
          ],
        },
      },
      {
        kicker: '05 — The system',
        title: 'The file’s system, complete and accessible',
        body: [
          'The file’s colours and components became the foundation of the prototype. Where contrast fell below the minimum, the fix kept the design: the selected toggle’s white text became Deep Blue on the same lilac.',
        ],
        details: {
          items: [
            {
              src: `${B}/d-river.webp`,
              alt: 'Your river today card: level 3.4 of 6, a Stretching chip and a teal river with a vertical 1 to 6 gauge in red, amber and green',
              label: 'Today’s river',
              text: 'The home’s only new component shows the day’s level as water, with a 1–6 gauge in the RAG colours. Every zone has a name, such as Sweet spot or Act now, so colour is never the only signal.',
            },
            {
              src: `${B}/d-art.webp`,
              alt: 'Eight grainy landscapes over green hills, from dawn to night: the sun rising over a lake with a sprout, a silver-haired woman on a path, a bearded man sitting on a rock by the river, a woman with hands on hips facing a ridge, a man beside a glass battery, a woman meditating before the sun, the same silver-haired woman reading in a hammock under the rising moon and a crescent over a lit tent',
              label: 'One illustration style',
              text: 'The file’s illustrations mixed different styles. Every one became a landscape with gradient and grain, with a cast of five people drawn up close. Only the time of day changes the palette, from the onboarding to the player.',
            },
            {
              src: `${B}/d-rag.webp`,
              alt: 'RAG bars for four areas, Demand vs Capacity, Energy, Sleep and Stress, with different percentages in red, amber and teal',
              label: 'RAG, calculated',
              text: 'In the file, every bar repeated the same sample percentages. Now each bar counts the days the person spent in each zone.',
            },
            {
              src: `${B}/d-copy.webp`,
              alt: 'Four copy fixes: Montly to Monthly, Strees to Stress, Lear more to Learn more and Responsability to Responsibility',
              label: 'Copy review',
              text: 'Typos that slip by in a design file and can’t reach production.',
            },
            {
              src: `${B}/d-tokens.webp`,
              alt: 'Twelve swatches of the Figma palette, Noto Sans at four sizes and two purple buttons, Let’s start and Start',
              label: 'The file’s palette, intact',
              text: 'The Figma colours and type scale stay the same. Change a colour and the whole app follows, just as it would in the file.',
            },
            {
              src: `${B}/d-dark.webp`,
              alt: 'The sleep pathway player side by side in light and dark themes, with the scene of the moon over the sea',
              label: 'Light and dark',
              text: 'The file already had a moon icon on the player, for listening before bed. Now it switches on a dark theme with reviewed contrast, which is remembered for the next practice.',
            },
          ],
        },
      },
      {
        kicker: '06 — From check-in to action',
        title: 'Every red flag leads to an action',
        body: [
          'A red flag with nowhere to go only makes people more worried. So every area in the red leads to a quick tool or a longer pathway, and from there back to the data. The file’s screens now link to each other, with today’s check-in running through all of them.',
        ],
        gallery: [
          { src: `${B}/screens/result-wellbeing.webp`, alt: 'Red Flags on the Wellbeing tab: Sleep with a red flag, Stress and Wellbeing', device: 'ios' },
          { src: `${B}/screens/tools.webp`, alt: 'Suggested Tools: search, Quick Tools and In-depth tabs and cards for Sleep, Contentedness and Demand vs Capacity', device: 'ios' },
          { src: `${B}/screens/tools-deep.webp`, alt: 'Suggested Tools on the In-depth tab: the Sleep, Contentedness and Demand vs Capacity pathways, with their number of steps', device: 'ios' },
          { src: `${B}/screens/pathway.webp`, alt: 'Sleep Pathway: a cream header with hills and grain and six steps with completion marks, from What is Good Sleep? to Your Resilience Dynamic', device: 'ios' },
          { src: `${B}/screens/pathway-energy.webp`, alt: 'Energy Pathway: a sky-blue header with hills and grain and the Mapping Your Energy, Energy Battery and Walking Mindfully steps', device: 'ios' },
          { src: `${B}/screens/overview.webp`, alt: 'Score Overview: a textured teal header, a See my Data shortcut and the Sleep and Contentedness Resilience Pathways', device: 'ios' },
          { src: `${B}/screens/overview-tools.webp`, alt: 'Score Overview scrolled to Recommended Tools: Resilience River, Resilience Enablers, Find Your Autonomy and Taking Responsibility, each with its own scene', device: 'ios' },
          { src: `${B}/screens/data.webp`, alt: 'Your Data: RAG bars per area, with period and area filters', device: 'ios' },
          { src: `${B}/screens/data-areas.webp`, alt: 'Your Data with the areas bottom sheet open: Productivity or Wellbeing, All key areas, Demand vs Capacity and Energy', device: 'ios' },
          { src: `${B}/screens/trends-sleep.webp`, alt: 'Productivity & Wellbeing filtered to Sleep for the month: one line chart with each day’s score from 1 to 6', device: 'ios' },
        ],
      },
      {
        kicker: '07 — Practice and reflection',
        title: 'Short practices, a journal of your own',
        body: [
          'Practice has to fit into the day of someone who is already out of breath. So the daily practices are short and tick off what’s done. Every tool ends with a question, and the answer goes into a journal only that person sees.',
        ],
        gallery: [
          { src: `${B}/screens/practices.webp`, alt: 'Daily Resilience Practices: a list of the day’s goals, some completed', device: 'ios' },
          { src: `${B}/screens/body-scan.webp`, alt: 'Body Scan: a woman meditating before the sun, an audio player and the Settle part', device: 'ios' },
          { src: `${B}/screens/mapping-energy.webp`, alt: 'Mapping Your Energy: a woman with hands on hips facing a ridge of peaks, and the steps to draw the day’s energy', device: 'ios' },
          { src: `${B}/screens/energy-battery.webp`, alt: 'Energy Battery: a man beside a charging glass battery and the list of what charges and drains it', device: 'ios' },
          { src: `${B}/screens/resilience-river.webp`, alt: 'Resilience River: a man sitting on a rock by the river, a video player and the question How high is your river running today?', device: 'ios' },
          { src: `${B}/screens/tool-light.webp`, alt: 'What is Good Sleep? in the light theme: the moon over the sea, a video player and the Rhythm and pattern part', device: 'ios' },
          { src: `${B}/screens/tool-dark.webp`, alt: 'The same sleep screen in the dark theme', device: 'ios' },
          { src: `${B}/screens/resources.webp`, alt: 'Resources: the Resilience River, Being Present, Energy and Sleep collections', device: 'ios' },
          { src: `${B}/screens/resources-topic.webp`, alt: 'Being Present: the collection with Walking Mindfully and Body Scan', device: 'ios' },
          { src: `${B}/screens/journal.webp`, alt: 'Journal: reflections saved from practices, with the tool they came from', device: 'ios' },
        ],
      },
      {
        kicker: '08 — How I worked',
        title: 'AI in production, product judgement with me',
        body: [
          'I started from my own file and decided what stayed and what needed refining. AI agents built the screens, and I reviewed them one by one, from copy to contrast, until the numbers matched from the check-in to the charts.',
          'AI brought the speed. Product judgement stayed with me, and that combination is what takes a design file to something you can test in days, not months.',
        ],
      },
    ],
    outcomesLabel: 'Outcome',
    outcomesTitle: 'What the prototype delivered',
    outcomes: [
      'A design you can touch: 15 navigable screens in place of static frames',
      'The complete core loop, from sign-up to result, including the four screens that were wireframes',
      'A check-in that moves the river on the home and the red flags, with charts fed by 28 days of history',
      'Contrast fixed where the file fell below the minimum, without changing the design',
      'One illustration style from the onboarding to the player, with people drawn up close',
    ],
    stackLabel: 'Tools',
    stack: ['Figma', 'HTML, CSS and JavaScript', 'AI agents', 'Playwright'],
    cta: {
      heading: 'Got a design in Figma that needs to become something people can touch?',
      sub: 'I take it from the file to a product you can use and test, without losing the design, in days.',
      label: 'Get in touch',
    },
    ui: { back: 'Back to projects', visit: 'Open the prototype' },
    liveUrl: `${APP}/index.html`,
    seo: {
      title: 'Resilience Dynamic — Case Study · Wellington Mota',
      description:
        'Resilience Dynamic: the resilience app I designed for The Resilience Engine (Edinburgh), already launched, taken from Figma to a 15-screen interactive prototype, with the screens that were wireframes finally designed.',
    },
  },
};

export default resilience;
