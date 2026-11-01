// Case do painel do aluno do Método OBA (mentoria de concursos policiais de MG que roda na Tutory). Veio da
// apresentação feita para o cliente no site da Tutory (/r/oba, com senha): mesma estrutura, sem a abertura
// e sem o aviso de celular, e com o texto de case de portfólio em vez de proposta. O protótipo roda na
// página: um no topo, com os controles, e as telas logo abaixo, uma por iframe, cada uma no seu estado.
// Os links "Ver …" das seções rolam até a tela delas. As imagens saem do próprio protótipo, com dados
// fictícios. Mídias em public/cases/metodo-oba/ (img/, video/ e proto/).
import type { CaseOba, ProtoBlock, ProtoScreen } from './oba-types';

const B = '/cases/metodo-oba';
const IMG = `${B}/img`;

// tamanhos reais dos arquivos (evitam que a página pule enquanto as imagens lazy carregam)
const WIDE = { width: 1600, height: 1000 };
const PHONE = { width: 1000, height: 2164 };
const DETAIL = { width: 2400, height: 1000 };
const PHONE_BP = { width: 1000, height: 2165 };

const APP_URL = 'app.tutory.com.br/painel';
const PROTO_SRC = `${B}/proto/index.html`;

/** A posição da nota do card de conquista: a ponta para logo antes da borda esquerda do botão "Adicionar
 *  foto" (602–714 × 626–706 na tela de 1440×900), um pouco acima do meio, sem cruzar o "Cancelar". */
const NOTA_FOTO = { x: 40.5, y: 73 };

/** As telas ao vivo, uma embaixo da outra (o painel já está no protótipo do topo). */
const telas = (l: {
  plano: string;
  compartilhar: string;
  nota: string;
  taticoEscuro: string;
  taticoClaro: string;
  home: string;
  menu: string;
  streak: string;
  semana: string;
  desktop: string;
  phone: string;
}): ProtoScreen[] => [
  { id: 'grupo-plano', label: l.plano, meta: l.desktop, device: 'desktop', theme: 'cozy', menu: 'b', estado: 'grupo-plano', estatica: true },
  { id: 'compartilhar', label: l.compartilhar, meta: l.desktop, device: 'desktop', theme: 'cozy', menu: 'b', estado: 'compartilhar', nota: { texto: l.nota, ...NOTA_FOTO } },
  { id: 'tatico-escuro', label: l.taticoEscuro, meta: l.desktop, device: 'desktop', theme: 'tatico-escuro', menu: 'b', estado: 'painel' },
  { id: 'tatico-claro', label: l.taticoClaro, meta: l.desktop, device: 'desktop', theme: 'tatico-claro', menu: 'b', estado: 'painel' },
  { id: 'celular-home', label: l.home, meta: l.phone, device: 'phone', theme: 'cozy', estado: 'painel' },
  { id: 'celular-menu', label: l.menu, meta: l.phone, device: 'phone', theme: 'cozy', estado: 'menu' },
  { id: 'celular-streak', label: l.streak, meta: l.phone, device: 'phone', theme: 'tatico-escuro', estado: 'streak' },
  { id: 'celular-semana', label: l.semana, meta: l.phone, device: 'phone', theme: 'tatico-claro', estado: 'semana' },
];

/** O protótipo do topo, no lugar da capa: os controles e uma tela só (o painel). */
const proto = (l: { title: string; posterAlt: string; hint: string; openLabel: string; screensLabel: string; painel: string; desktop: string; dica: string }): ProtoBlock => ({
  src: PROTO_SRC,
  title: l.title,
  poster: { src: `${IMG}/proto-poster.webp`, alt: l.posterAlt, ...WIDE },
  url: APP_URL,
  hint: l.hint,
  dica: l.dica,
  openLabel: l.openLabel,
  screensLabel: l.screensLabel,
  screens: [{ id: 'painel', label: l.painel, meta: l.desktop, device: 'desktop', theme: 'cozy', menu: 'b', estado: 'painel' }],
});

// Os dados com fonte (NN/g, Apple, McKinsey, Cetic.br, Stanford, Google): o número e a fonte valem
// para as duas línguas; só a frase muda. Notas de cada um ficam aqui, uma vez.
const SRC = {
  // NN/g: média de 83% de melhora nos KPIs depois de um redesign (é média, não "até")
  redesign: 'Nielsen Norman Group',
  // Apple HIG: área mínima de toque de 44 × 44 pt (no celular, 1 pt = 1 px de CSS); o ☰ tem 44 × 44 no blueprint
  toque: 'Apple · Human Interface Guidelines',
  leitura: 'Nielsen Norman Group · How little do users read',
  estetica: 'Nielsen Norman Group · Aesthetic-usability effect',
  jakob: 'Nielsen Norman Group · Jakob’s law',
  // McKinsey: correlação, 300 empresas em 5 anos; "nearly twice the rate" é do próprio artigo (32 p.p. acima)
  mckinsey: 'McKinsey · The Business Value of Design, 2018',
  // o print mede 8, 16, 18, 20 e 24: base de 8 com meios-passos, não uma grade estrita
  grade: 'Google · Material Design',
  // a preferência pela proporção áurea tem evidência mista (Di Dio et al. acharam resposta no cérebro a
  // esculturas na proporção); por isso "tendem a"
  aurea: 'Di Dio, Macaluso e Rizzolatti, 2007',
  // a carta do ritmo se apoia na fluência de processamento, que tem base
  ritmo: 'Reber, Schwarz e Winkielman, 2004',
  celular: 'Cetic.br · TIC Domicílios 2025',
  // 46,1% dos comentários (não das pessoas), 2.684 participantes
  confianca: 'Stanford · Consumer WebWatch, 2002',
  beleza: 'Lindgaard et al., 2006 · Google Research, 2012',
  // pesquisa do Google com Sterling Research e SmithGeiger, 1.088 adultos dos EUA, julho de 2012
  cuidado: 'Google · Sterling Research e SmithGeiger, 2012',
  teste: 'Nielsen Norman Group',
};

const pt: CaseOba = {
  accent: '#4D7CFF',
  accent2: '#FEC133',
  seo: {
    title: 'Método OBA — Case Study · Wellington Mota',
    description:
      'O painel do aluno do Método OBA, mentoria de concursos policiais de Minas Gerais, redesenhado na Tutory: protótipo navegável no computador e no celular, três temas e as 13 patentes da PMMG.',
  },

  kicker: 'Case Study — Método OBA · Tutory',
  title: 'O novo painel do aluno do Método OBA',
  subtitle:
    'O Método OBA é uma mentoria de concursos policiais de Minas Gerais que roda na Tutory. Redesenhei o painel dos alunos do diagnóstico ao tema em PHP: mais espaço, ícones mais claros e uma navegação mais simples, do computador ao celular. O protótipo abaixo funciona: clique à vontade.',
  heroStat: { value: '83%', label: 'Após um redesign, estima-se uma melhora média de 83% nos indicadores de desempenho de um produto.', source: SRC.redesign },
  meta: [
    { label: 'Cliente', value: 'Método OBA, na Tutory Mentoria' },
    { label: 'Ano', value: '2026' },
    { label: 'Meu papel', value: 'Design engineering: UX/UI, protótipo e PHP' },
    { label: 'Situação', value: 'Proposta, ainda não publicada' },
    { label: 'Onde', value: 'Painel do aluno, no computador e no celular' },
  ],
  cover: {
    src: `${IMG}/cover.webp`,
    alt: 'O painel novo no tema cozy: logo do Método OBA, menu em cápsula no topo, card de jogador, avatar 3D da patente Recruta sobre fundo na cor da patente, medalha de ouro no card de acertos e a sequência de 7 dias',
    ...WIDE,
  },
  coverProto: proto({
    title: 'Protótipo navegável do painel do aluno do Método OBA',
    posterAlt: 'Painel do aluno no tema cozy, carregando o protótipo',
    hint: 'Clique à vontade: menu, troféu e ☰ funcionam. Os dados são fictícios.',
    dica: 'Protótipo **clicável**. Interaja com ele',
    openLabel: 'Tela cheia',
    screensLabel: 'Telas',
    painel: 'Painel',
    desktop: 'Desktop',
  }),
  telas: {
    src: PROTO_SRC,
    url: APP_URL,
    patente: 'recruta',
    title: 'Protótipo do painel do aluno',
    screens: telas({
      plano: 'Menu com o Plano aberto',
      compartilhar: 'Prova social: card de conquista',
      nota: 'Experimente **adicionar uma imagem** sua',
      taticoEscuro: 'Tema Tático escuro',
      taticoClaro: 'Tema Tático claro',
      home: 'Home no celular',
      menu: 'Menu ☰ no celular',
      streak: 'Sequência de dias no celular',
      semana: 'Semana no celular',
      desktop: 'Desktop',
      phone: 'Celular',
    }),
  },

  sections: [
    {
      kind: 'compare',
      kicker: '01 — Nova experiência',
      title: 'Um painel novo para o aluno do OBA',
      body: ['Mais respiro, menos ruído e um visual com a cara do Método OBA. O aluno abre o painel e vê primeiro o que importa: a patente, as missões do dia e o progresso.'],
      compare: {
        beforeLabel: 'Antes',
        afterLabel: 'Depois',
        heuristicLabel: 'O que melhora',
        pairs: [
          {
            label: 'No celular',
            heuristic: 'Feito para o celular',
            body: ['O menu de computador ficava fixo ao lado do conteúdo, espremido na tela pequena. Reformulei o menu para uma experiência mais natural no celular.'],
            before: {
              src: `${IMG}/antes-celular.webp`,
              alt: 'O painel atual a 390 px: menu lateral de desktop fixo à esquerda, sem topo de celular, e o conteúdo espremido ao lado',
              ...PHONE,
            },
            after: {
              src: `${B}/video/celular-menu-loop.jpg`,
              alt: 'Celular no cozy: o ☰ abre o menu em blocos de vidro, 4 por linha, com os grupos em lista no fim, e fecha de novo',
              width: 780,
              height: 1688,
            },
            afterVideo: { src: `${B}/video/celular-menu-loop.mp4`, webm: `${B}/video/celular-menu-loop.webm` },
            note: 'Novo **menu** em blocos',
            stat: { value: '44 × 44 px', label: 'é a área mínima de toque. O novo design respeita a usabilidade natural da tela do celular.', source: SRC.toque },
          },
          {
            label: 'No computador',
            heuristic: 'Refino e respiro',
            body: ['Cores, tipografia, ícones e menu redesenhados, com espaço para cada informação respirar.'],
            stat: { value: '20%', label: 'O usuário lê, em média, 20% do texto de uma página. Um bom design é guiado pela hierarquia visual.', source: SRC.leitura },
            wide: true,
            before: {
              src: `${IMG}/antes-desktop.webp`,
              alt: 'O painel atual no desktop: menu lateral branco, faixa chapada e indicadores como números soltos',
              ...WIDE,
            },
            after: {
              src: `${IMG}/depois-cozy.webp`,
              alt: 'O painel novo no cozy: menu em cápsula no topo, card de jogador, avatar 3D da patente, cards de vidro claro e a medalha no card de acertos',
              ...WIDE,
            },
          },
        ],
      },
    },
    {
      kind: 'details',
      kicker: '02 — A patente',
      title: 'Reformulação gráfica',
      body: ['O aluno sobe de patente, de Recruta a Coronel, conforme avança. Agora o fundo, os cards e os ícones mudam com ela, e no topo a foto vira um card de jogador.'],
      stat: { label: 'Efeito estética-usabilidade: o que é bonito parece mais fácil de usar.', source: SRC.estetica },
      details: {
        items: [
          {
            src: `${IMG}/d-patentes.webp`,
            alt: 'As 13 insígnias, da pala vazia da Recruta às três estrelas douradas do Coronel',
            label: '13 insígnias da PMMG',
            text: 'Divisas até o 1º Sargento e estrelas para os oficiais, nos dois temas.',
            ...DETAIL,
          },
          {
            src: `${IMG}/d-medalhas.webp`,
            alt: 'Medalhas de ouro, prata e bronze com fita, com a faixa de acerto de cada uma',
            label: 'Medalha por faixa de acerto',
            text: 'Ouro de 80% de acerto para cima, prata de 60% e bronze abaixo disso.',
            ...DETAIL,
          },
          {
            src: `${IMG}/d-icones.webp`,
            alt: 'Os ícones do menu em 3D, recoloridos pela patente, e os mesmos ícones em traço Phosphor',
            label: '3D no cozy, traço no tático',
            text: 'Ícones 3D tingidos pela patente no cozy e ícones de traço no tático, no lugar dos emojis.',
            ...DETAIL,
          },
        ],
      },
    },
    {
      kind: 'gallery',
      kicker: '03 — No celular',
      title: 'No celular, menu em blocos',
      body: ['O ☰ abre os itens em blocos, como num app.'],
      live: { label: 'Ver o ☰ no celular', screen: 'celular-menu' },
      stat: { label: 'Lei de Jakob: o aluno espera que o painel funcione como os aplicativos que ele já usa no dia a dia.', source: SRC.jakob },
      gallery: {
        rows: [
          {
            title: 'Cozy',
            items: [
              { src: `${IMG}/celular-cozy.webp`, alt: 'Home a 390 px no cozy: ☰, logo, sequência, sino, troféu e avatar no topo, e o hero da patente embaixo', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-menu-cozy.webp`, alt: 'Menu ☰ aberto no cozy: os itens em blocos de vidro, 4 por linha, e os grupos em lista no fim', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-dias-vazios-cozy.webp`, alt: 'Semana no cozy: dias vazios em pílulas com o texto Sem missões e o HOJE em destaque', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-streak.webp`, alt: 'Sequência de dias no cozy: os dias da semana marcados e o recado para manter a sequência', device: 'phone', ...PHONE },
            ],
          },
          {
            title: 'Tático',
            items: [
              { src: `${IMG}/celular-tatico.webp`, alt: 'Home a 390 px no tático escuro: o mesmo topo e o hero verde com o avatar da patente', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-menu-tatico.webp`, alt: 'Menu ☰ aberto no tático escuro: blocos com ícones de traço, 4 por linha, e os grupos em lista no fim', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-dias-vazios.webp`, alt: 'Semana no tático escuro: dias vazios em pílulas tracejadas com o texto Sem missões e o HOJE em destaque', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-streak-tatico.webp`, alt: 'Sequência de dias no tático escuro: os dias da semana marcados e o recado para manter a sequência', device: 'phone', ...PHONE },
            ],
          },
        ],
      },
    },
    {
      kind: 'blueprint',
      kicker: '04 — Respiro',
      title: 'Espaço para respirar',
      body: ['Cada bloco tem o seu respiro, e o mesmo ritmo se repete do computador ao celular. A tela fica leve, e o aluno lê sem esforço.'],
      stat: { value: '≈ 2×', label: 'Empresas líderes em design crescem a receita quase no dobro do ritmo do seu setor.', source: SRC.mckinsey },
      blueprint: {
        legenda: [
          { cor: 'azul', texto: 'Respiro dentro do bloco' },
          { cor: 'rosa', texto: 'Espaço entre os blocos' },
          { cor: 'tinta', texto: 'Área de toque' },
        ],
        desktop: {
          src: `${IMG}/respiro-desktop.webp`,
          alt: 'O painel no computador em cinza, com o respiro de cada card hachurado em azul (20 a 24 px) e o espaço entre os cards em rosa (16 e 20 px)',
          width: 2000,
          height: 1337,
        },
        escala: [
          { tipo: 'Espaço', desenho: 'grade', label: 'Grade de 8 pontos: os espaços partem de 8 px, com meios-passos de 4 para encaixar bem no celular.', source: SRC.grade },
          { tipo: 'Proporção', desenho: 'fibonacci', label: 'Razão áurea: as pessoas tendem a achar mais bonito o que segue essa proporção, mesmo sem perceber.', source: SRC.aurea },
          { tipo: 'Percepção', desenho: 'ritmo', label: 'Ritmo: espaços que se repetem deixam a tela mais fácil de ler, e o que se lê sem esforço parece mais bonito.', source: SRC.ritmo },
        ],
        celular: [
          { src: `${IMG}/respiro-celular.webp`, alt: 'A home no celular em cinza: 12 px de margem em rosa, 16 px de respiro no card em azul e o ☰ com a área de toque de 44 × 44 px', ...PHONE_BP },
          { src: `${IMG}/respiro-menu.webp`, alt: 'O menu ☰ aberto em cinza: blocos de 88 × 96 px com 8 px entre eles e os grupos de 48 px de altura, também com 8 px entre eles', ...PHONE_BP },
        ],
        defesas: [
          {
            titulo: 'Mais fácil de usar',
            texto: 'Com espaço entre os blocos, o aluno acha cada informação de primeira. No celular, o dedo acerta o toque.',
            stat: { value: '65%', label: 'dos brasileiros conectados usam a internet só pelo celular.', source: SRC.celular },
          },
          {
            titulo: 'Mais valor percebido',
            texto: 'Um painel bem cuidado passa a impressão de um método bem cuidado. O aluno sente o valor antes de ler qualquer número.',
            stat: { value: '46%', label: 'dos comentários sobre a confiança num site falavam do visual. Foi o critério mais citado.', source: SRC.confianca },
          },
          {
            titulo: 'Consistência é acabamento',
            texto: 'Os mesmos espaços, cantos e ícones em todas as telas. O aluno aprende o painel uma vez e reconhece o resto, e nada parece improvisado.',
            stat: { value: '50 ms', label: 'bastam para julgar a beleza de uma tela. As simples e familiares saem na frente.', source: SRC.beleza },
          },
        ],
        nota: {
          texto: ['Mesmo que o computador continue sendo o principal meio de acesso, um painel excelente no celular reforça a sensação de que o valor pago foi justo. O produto deve ser bom em qualquer tela.'],
          stat: { value: '48%', label: 'sentem que a empresa não se importa com eles quando o site não funciona bem no celular.', source: SRC.cuidado },
        },
      },
    },
  ],

  roadmap: {
    kicker: 'Onde está',
    title: 'Próximos passos',
    body: 'O projeto está no redesenho. Daqui, segue para a validação com o Método OBA.',
    selo: { texto: 'Tutory — Empreendedores do conhecimento' },
    steps: [
      {
        title: 'Redesenho',
        text: 'A nova experiência do painel, no computador e no celular. É o que está nesta página.',
        status: 'agora',
        icon: 'caneta',
        chip: 'Etapa atual',
        stat: { value: '83%', label: 'Após um redesign, estima-se uma melhora média de 83% nos indicadores de desempenho de um produto.', source: SRC.redesign },
      },
      { title: 'Validação', text: 'O Método OBA revisa a proposta e aprova o que entra na primeira versão.', status: 'depois', icon: 'check', chip: 'A seguir' },
      {
        title: 'Teste com alunos',
        text: 'Alunos do Método OBA usam o protótipo, e ajusto o que não ficar claro.',
        status: 'depois',
        icon: 'pessoas',
        stat: { value: '5 alunos', label: 'já revelam cerca de 85% dos problemas de uso', source: SRC.teste },
      },
      { title: 'Desenvolvimento', text: 'O tema já está no código da plataforma, atrás de uma chave desligada. Depois da validação, ele liga em preview e então para todos.', status: 'depois', icon: 'codigo' },
      { title: 'Lançamento', text: 'O painel novo no ar para todos os alunos do Método OBA.', status: 'depois', icon: 'foguete', final: true },
    ],
  },

  engenharia: {
    kicker: 'Entrega · Design engineering',
    title: 'Do diagnóstico ao código da plataforma',
    body: [
      'Não entreguei só telas. Fiz o caminho inteiro de design engineering: a estratégia, o sistema visual, o protótipo em código e o tema implementado em PHP, dentro da plataforma, pronto para ser ligado por etapas.',
      'Design e código saíram da mesma mão. Nada se perde no handoff, e cada decisão desta página já tem o lugar dela no produto.',
    ],
    pilares: [
      {
        titulo: 'Estratégia antes da tela',
        value: '25',
        label: 'pontos de diagnóstico, de D01 a D25',
        texto: 'Antes de desenhar, mapeei o painel em 17 documentos: contexto do aluno, tokens, gamificação, voz, diagnóstico e estratégia, com uma ficha para cada um dos 16 componentes. O princípio que guiou tudo: a patente é o tema.',
      },
      {
        titulo: 'Protótipo em código, não em imagem',
        value: '9',
        label: 'telas ao vivo nesta página',
        texto: 'O protótipo roda sobre o mesmo HTML e CSS do painel de hoje, com o Bootstrap e o jQuery da plataforma. O que se clica aqui já é o caminho para a produção, e não um desenho para alguém reinterpretar.',
      },
      {
        titulo: 'O tema no PHP, sem risco',
        value: '60',
        label: 'casos conferidos contra a versão em JS',
        texto: 'Propus e implementei temas por mentor: um manifesto diz o que cada um carrega, e uma chave por ambiente liga o tema em três níveis, desligado, preview e ligado. Desligado é o padrão, então o merge não muda nada em produção. Medalha, sequência e menu em grupos saíram do JavaScript e passaram a vir prontos do servidor.',
      },
      {
        titulo: 'Leve em qualquer aparelho',
        value: '−43%',
        label: 'no avatar 3D: de 532 para 303 KB',
        texto: 'O avatar 3D só carrega em computador capaz, roda num Web Worker para não travar a página e volta para um PNG leve se falhar ou ficar lento. Ícones e logo em WebP, fontes no próprio servidor, e o login carrega só o CSS de que precisa, conferido no CI.',
      },
    ],
  },

  outcomesLabel: 'Resultado',
  outcomesTitle: 'O que ficou pronto',
  outcomes: [
    'Um mapa de UX com 17 documentos, o diagnóstico de D01 a D25 e uma ficha por componente',
    'Um protótipo navegável com nove telas ao vivo, no computador e no celular, em três temas e nas 13 patentes',
    'O tema implementado em PHP, por mentor e atrás de uma chave, sem mudar nada em produção até ser ligado',
    'Medalha, sequência de dias e menu em grupos renderizados no servidor, e o card de conquista para o aluno compartilhar',
    'Um avatar 3D em Web Worker com volta para PNG, ícones em WebP e um CSS enxuto no login',
  ],
  toolsLabel: 'Ferramentas',
  tools: ['PHP', 'HTML, CSS e JavaScript', 'Bootstrap e jQuery', 'three.js', 'Web Workers', 'GitHub Actions', 'Phosphor Icons', 'Agentes de IA'],

  cta: {
    heading: 'Seu produto precisa de um redesenho?',
    sub: 'Eu levo do diagnóstico a um protótipo que dá para clicar, com design e código, pronto para validar com quem usa.',
    label: 'Falar comigo',
  },
  ui: { back: 'Voltar aos projetos' },
};

const en: CaseOba = {
  ...pt,
  seo: {
    title: 'Método OBA — Case Study · Wellington Mota',
    description:
      'The student dashboard of Método OBA, a police-exam prep mentorship from Minas Gerais, redesigned at Tutory: an interactive prototype on desktop and phone, three themes and the 13 PMMG ranks.',
  },

  kicker: 'Case Study — Método OBA · Tutory',
  title: 'A new student dashboard for Método OBA',
  subtitle:
    'Método OBA is a police-exam prep mentorship from Minas Gerais, Brazil, that runs on Tutory. I redesigned its student dashboard from diagnosis to a PHP theme: better use of space, clearer icons and simpler navigation, from desktop to phone. The prototype below works: click around.',
  heroStat: { value: '83%', label: 'On average, a redesign improves a product’s key performance indicators by an estimated 83%.', source: SRC.redesign },
  meta: [
    { label: 'Client', value: 'Método OBA, on Tutory Mentoria' },
    { label: 'Year', value: '2026' },
    { label: 'My role', value: 'Design engineering: UX/UI, prototype and PHP' },
    { label: 'Status', value: 'Proposal, not live yet' },
    { label: 'Where', value: 'Student dashboard, desktop and phone' },
  ],
  cover: {
    ...pt.cover,
    alt: 'The new dashboard in the cozy theme: Método OBA logo, pill menu at the top, player card, 3D avatar of the Recruit rank over a background in the rank color, gold medal on the score card and a 7-day streak',
  },
  coverProto: proto({
    title: 'Interactive prototype of the Método OBA student dashboard',
    posterAlt: 'Student dashboard in the cozy theme, loading the prototype',
    hint: 'Click around: the menu, trophy and ☰ all work. The data is fictional, and the interface is in Portuguese, as it is for the students.',
    dica: 'A **clickable** prototype. Try it',
    openLabel: 'Full screen',
    screensLabel: 'Screens',
    painel: 'Dashboard',
    desktop: 'Desktop',
  }),
  telas: {
    src: PROTO_SRC,
    url: APP_URL,
    patente: 'recruta',
    title: 'Student dashboard prototype',
    screens: telas({
      plano: 'Menu with the Plan group open',
      compartilhar: 'Social proof: achievement card',
      nota: 'Try **adding a photo** of your own',
      taticoEscuro: 'Tactical dark theme',
      taticoClaro: 'Tactical light theme',
      home: 'Home on the phone',
      menu: '☰ menu on the phone',
      streak: 'Day streak on the phone',
      semana: 'Week on the phone',
      desktop: 'Desktop',
      phone: 'Phone',
    }),
  },

  sections: [
    {
      kind: 'compare',
      kicker: '01 — New experience',
      title: 'A new dashboard for OBA students',
      body: ['More room to breathe, less noise and a look that feels like Método OBA. Students open the dashboard and see what matters first: their rank, today’s missions and their progress.'],
      compare: {
        beforeLabel: 'Before',
        afterLabel: 'After',
        heuristicLabel: 'What improves',
        pairs: [
          {
            label: 'On the phone',
            heuristic: 'Built for the phone',
            body: ['The desktop menu stayed pinned next to the content, squeezing it on the small screen. I reworked the menu for a more natural experience on the phone.'],
            before: {
              src: `${IMG}/antes-celular.webp`,
              alt: 'The current dashboard at 390 px: the desktop side menu pinned to the left, no phone header, and the content squeezed next to it',
              ...PHONE,
            },
            after: {
              src: `${B}/video/celular-menu-loop.jpg`,
              alt: 'Phone in the cozy theme: the ☰ opens the menu as glass blocks, 4 per row, with the groups listed at the end, and closes again',
              width: 780,
              height: 1688,
            },
            afterVideo: { src: `${B}/video/celular-menu-loop.mp4`, webm: `${B}/video/celular-menu-loop.webm` },
            note: 'New **block** menu',
            stat: { value: '44 × 44 px', label: 'is the minimum touch target. The new design respects how people naturally use a phone screen.', source: SRC.toque },
          },
          {
            label: 'On desktop',
            heuristic: 'Polish and breathing room',
            body: ['Colors, type, icons and menu redesigned, with room for each piece of information to breathe.'],
            stat: { value: '20%', label: 'Users read about 20% of the text on a page, on average. Good design is led by visual hierarchy.', source: SRC.leitura },
            wide: true,
            before: {
              src: `${IMG}/antes-desktop.webp`,
              alt: 'The current dashboard on desktop: white side menu, flat banner and indicators as loose numbers',
              ...WIDE,
            },
            after: {
              src: `${IMG}/depois-cozy.webp`,
              alt: 'The new dashboard in cozy: pill menu at the top, player card, 3D rank avatar, light glass cards and the medal on the score card',
              ...WIDE,
            },
          },
        ],
      },
    },
    {
      kind: 'details',
      kicker: '02 — The rank',
      title: 'Visual overhaul',
      body: ['Students climb the ranks, from Recruit to Colonel, as they progress. Now the background, cards and icons change with the rank, and at the top the photo becomes a player card.'],
      stat: { label: 'Aesthetic-usability effect: what looks good feels easier to use.', source: SRC.estetica },
      details: {
        items: [
          {
            src: `${IMG}/d-patentes.webp`,
            alt: 'The 13 insignia, from the Recruit’s empty shoulder board to the Colonel’s three gold stars',
            label: '13 PMMG insignia',
            text: 'Chevrons up to 1st Sergeant and stars for the officers, in both themes.',
            ...DETAIL,
          },
          {
            src: `${IMG}/d-medalhas.webp`,
            alt: 'Gold, silver and bronze medals with ribbons, each with its score band',
            label: 'A medal for each score band',
            text: 'Gold from 80% correct answers up, silver from 60% and bronze below that.',
            ...DETAIL,
          },
          {
            src: `${IMG}/d-icones.webp`,
            alt: 'The menu icons in 3D, recolored by rank, and the same icons as Phosphor line icons',
            label: '3D in cozy, line in tactical',
            text: 'Rank-tinted 3D icons in cozy and line icons in tactical, replacing the emojis.',
            ...DETAIL,
          },
        ],
      },
    },
    {
      kind: 'gallery',
      kicker: '03 — On the phone',
      title: 'On the phone, a block menu',
      body: ['The ☰ opens the items as blocks, like in an app.'],
      live: { label: 'See the ☰ on the phone', screen: 'celular-menu' },
      stat: { label: 'Jakob’s law: students expect the dashboard to work like the apps they already use every day.', source: SRC.jakob },
      gallery: {
        rows: [
          {
            title: 'Cozy',
            items: [
              { src: `${IMG}/celular-cozy.webp`, alt: 'Home at 390 px in cozy: ☰, logo, streak, bell, trophy and avatar at the top, and the rank hero below', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-menu-cozy.webp`, alt: '☰ menu open in cozy: the items as glass blocks, 4 per row, and the groups listed at the end', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-dias-vazios-cozy.webp`, alt: 'Week in cozy: empty days as pills reading Sem missões, with TODAY highlighted', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-streak.webp`, alt: 'Day streak in cozy: the days of the week checked off and a nudge to keep the streak going', device: 'phone', ...PHONE },
            ],
          },
          {
            title: 'Tactical',
            items: [
              { src: `${IMG}/celular-tatico.webp`, alt: 'Home at 390 px in tactical dark: the same header and the green hero with the rank avatar', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-menu-tatico.webp`, alt: '☰ menu open in tactical dark: blocks with line icons, 4 per row, and the groups listed at the end', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-dias-vazios.webp`, alt: 'Week in tactical dark: empty days as dashed pills reading Sem missões, with TODAY highlighted', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-streak-tatico.webp`, alt: 'Day streak in tactical dark: the days of the week checked off and a nudge to keep the streak going', device: 'phone', ...PHONE },
            ],
          },
        ],
      },
    },
    {
      kind: 'blueprint',
      kicker: '04 — Breathing room',
      title: 'Room to breathe',
      body: ['Every block has its own padding, and the same rhythm repeats from desktop to phone. The screen feels light, and students read without effort.'],
      stat: { value: '≈ 2×', label: 'Design-leading companies grow revenue at nearly twice the rate of their industry.', source: SRC.mckinsey },
      blueprint: {
        legenda: [
          { cor: 'azul', texto: 'Padding inside the block' },
          { cor: 'rosa', texto: 'Space between blocks' },
          { cor: 'tinta', texto: 'Touch target' },
        ],
        desktop: {
          src: `${IMG}/respiro-desktop.webp`,
          alt: 'The desktop dashboard in gray, with each card’s padding hatched in blue (20 to 24 px) and the space between cards in pink (16 and 20 px)',
          width: 2000,
          height: 1337,
        },
        escala: [
          { tipo: 'Spacing', desenho: 'grade', label: '8-point grid: spacing starts at 8 px, with 4 px half-steps to fit the phone well.', source: SRC.grade },
          { tipo: 'Proportion', desenho: 'fibonacci', label: 'Golden ratio: people tend to find what follows this proportion more beautiful, even without noticing.', source: SRC.aurea },
          { tipo: 'Perception', desenho: 'ritmo', label: 'Rhythm: repeated spacing makes a screen easier to read, and what reads effortlessly looks better.', source: SRC.ritmo },
        ],
        celular: [
          { src: `${IMG}/respiro-celular.webp`, alt: 'The phone home in gray: 12 px margin in pink, 16 px card padding in blue and the ☰ with its 44 × 44 px touch target', ...PHONE_BP },
          { src: `${IMG}/respiro-menu.webp`, alt: 'The ☰ menu open in gray: 88 × 96 px blocks 8 px apart, and 48 px tall groups, also 8 px apart', ...PHONE_BP },
        ],
        defesas: [
          {
            titulo: 'Easier to use',
            texto: 'With space between blocks, students find each piece of information right away. On the phone, the finger hits the target.',
            stat: { value: '65%', label: 'of connected Brazilians use the internet only on their phone.', source: SRC.celular },
          },
          {
            titulo: 'Higher perceived value',
            texto: 'A well-crafted dashboard suggests a well-crafted method. Students feel the value before reading a single number.',
            stat: { value: '46%', label: 'of comments about a site’s credibility were about its look. It was the most-cited criterion.', source: SRC.confianca },
          },
          {
            titulo: 'Consistency is finish',
            texto: 'The same spacing, corners and icons on every screen. Students learn the dashboard once and recognize the rest, and nothing looks improvised.',
            stat: { value: '50 ms', label: 'is enough to judge how good a screen looks. Simple, familiar ones come out ahead.', source: SRC.beleza },
          },
        ],
        nota: {
          texto: ['Even if the computer stays the main way in, an excellent dashboard on the phone reinforces the feeling that the price paid was fair. The product should be good on any screen.'],
          stat: { value: '48%', label: 'feel a company doesn’t care about them when its site doesn’t work well on mobile.', source: SRC.cuidado },
        },
      },
    },
  ],

  roadmap: {
    kicker: 'Where it stands',
    title: 'Next steps',
    body: 'The project is in the redesign stage. Next comes validation with Método OBA.',
    selo: { texto: 'Tutory — Knowledge entrepreneurs' },
    steps: [
      {
        title: 'Redesign',
        text: 'The new dashboard experience, on desktop and phone. It’s what this page shows.',
        status: 'agora',
        icon: 'caneta',
        chip: 'Current stage',
        stat: { value: '83%', label: 'On average, a redesign improves a product’s key performance indicators by an estimated 83%.', source: SRC.redesign },
      },
      { title: 'Validation', text: 'Método OBA reviews the proposal and approves what goes into the first version.', status: 'depois', icon: 'check', chip: 'Next' },
      {
        title: 'Student testing',
        text: 'Método OBA students use the prototype, and I fix whatever isn’t clear.',
        status: 'depois',
        icon: 'pessoas',
        stat: { value: '5 students', label: 'already reveal about 85% of usability problems', source: SRC.teste },
      },
      { title: 'Development', text: 'The theme is already in the platform’s code, behind a switch that’s off. After validation, it goes on in preview and then for everyone.', status: 'depois', icon: 'codigo' },
      { title: 'Launch', text: 'The new dashboard live for every Método OBA student.', status: 'depois', icon: 'foguete', final: true },
    ],
  },

  engenharia: {
    kicker: 'Delivery · Design engineering',
    title: 'From diagnosis to the platform’s code',
    body: [
      'I didn’t just hand over screens. I covered the whole design engineering path: the strategy, the visual system, the coded prototype and the theme built in PHP, inside the platform, ready to be switched on in stages.',
      'Design and code came from the same hands. Nothing gets lost in a handoff, and every decision on this page already has its place in the product.',
    ],
    pilares: [
      {
        titulo: 'Strategy before screens',
        value: '25',
        label: 'diagnosis points, D01 to D25',
        texto: 'Before designing, I mapped the dashboard in 17 documents: student context, tokens, gamification, voice, diagnosis and strategy, with a spec for each of the 16 components. The principle behind it all: the rank is the theme.',
      },
      {
        titulo: 'A prototype in code, not in pictures',
        value: '9',
        label: 'live screens on this page',
        texto: 'The prototype runs on the same HTML and CSS as today’s dashboard, with the platform’s Bootstrap and jQuery. What you click here is already the road to production, not a drawing for someone else to reinterpret.',
      },
      {
        titulo: 'The theme in PHP, without risk',
        value: '60',
        label: 'cases checked against the JS version',
        texto: 'I proposed and built per-mentor themes: a manifest says what each one loads, and a per-environment switch turns the theme on at three levels, off, preview and on. Off is the default, so merging changes nothing in production. Medal, streak and grouped menu moved out of JavaScript and now come ready from the server.',
      },
      {
        titulo: 'Light on any device',
        value: '−43%',
        label: 'off the 3D avatar: 532 to 303 KB',
        texto: 'The 3D avatar only loads on capable computers, runs in a Web Worker so the page never freezes, and falls back to a light PNG if it fails or lags. Icons and logo in WebP, self-hosted fonts, and the login loads only the CSS it needs, checked in CI.',
      },
    ],
  },

  outcomesLabel: 'Outcome',
  outcomesTitle: 'What’s ready',
  outcomes: [
    'A UX map in 17 documents, the D01 to D25 diagnosis and a spec for each component',
    'An interactive prototype with nine live screens, on desktop and phone, in three themes and all 13 ranks',
    'The theme built in PHP, per mentor and behind a switch, changing nothing in production until it’s turned on',
    'Medal, day streak and grouped menu rendered on the server, plus an achievement card students can share',
    'A 3D avatar in a Web Worker with a PNG fallback, WebP icons and a lean login CSS',
  ],
  toolsLabel: 'Tools',
  tools: ['PHP', 'HTML, CSS and JavaScript', 'Bootstrap and jQuery', 'three.js', 'Web Workers', 'GitHub Actions', 'Phosphor Icons', 'AI agents'],

  cta: {
    heading: 'Does your product need a redesign?',
    sub: 'I take it from diagnosis to a prototype you can click, with design and code, ready to validate with the people who use it.',
    label: 'Get in touch',
  },
  ui: { back: 'Back to projects' },
};

const metodoOba = { pt, en };
export default metodoOba;
