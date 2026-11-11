// Case do GPB, o sistema financeiro de um grupo empresarial brasileiro (substitui um sistema antigo em MS
// Access). Mesma estrutura do case do Método OBA (./metodo-oba.ts, tipos em ./oba-types.ts): o app ao vivo
// no topo, problema, antes/depois, decisões, celular e a entrega de design engineering.
//
// O protótipo é o próprio app React num build estático só de demonstração (public/cases/gpb/proto/): dados
// fictícios gerados no navegador, sem login e sem rede. Os prints e os vídeos saíram desse build. O "antes"
// é o código anterior à rodada de UX, rodando com os mesmos dados fictícios.
import type { CaseOba, ProtoBlock, ProtoScreen } from './oba-types';

/**
 * NOME DO CLIENTE: o único lugar da página com o nome do grupo. `null` = a página fala só em "GPB" e em
 * "um grupo empresarial brasileiro" (padrão, até o Wellington decidir). Para nomear, troque por
 * 'Grupo Paes de Barros'. O protótipo e os prints não mostram o nome em nenhum dos dois casos.
 */
const GRUPO: string | null = null;

const B = '/cases/gpb';
const IMG = `${B}/img`;
const VID = `${B}/video`;
const PROTO_SRC = `${B}/proto/index.html?demo`;
const APP_URL = 'gpb · demonstração';

// tamanhos reais dos arquivos
const WIDE = { width: 1600, height: 1000 };
const PHONE = { width: 1000, height: 2164 };

const SRC = {
  heuristicas: 'Nielsen Norman Group · 10 Usability Heuristics',
  toque: 'Apple · Human Interface Guidelines',
  jakob: 'Nielsen Norman Group · Jakob’s law',
  hick: 'Hick e Hyman, 1952',
  analise: 'Análise de UX do GPB, novembro de 2026',
};

/** As telas do protótipo do topo: o estado é a query que o app lê da URL. */
const telas = (l: Record<'inicio' | 'contas' | 'triagem' | 'guias' | 'fechar' | 'conciliar' | 'cInicio' | 'cContas' | 'cLanc' | 'desktop' | 'phone', string>): ProtoScreen[] => [
  { id: 'inicio', label: l.inicio, meta: l.desktop, device: 'desktop', estado: 'tab=inicio' },
  { id: 'contas', label: l.contas, meta: l.desktop, device: 'desktop', estado: 'tab=contas' },
  { id: 'triagem', label: l.triagem, meta: l.desktop, device: 'desktop', estado: 'tab=contas&assistente=triagem' },
  { id: 'guias', label: l.guias, meta: l.desktop, device: 'desktop', estado: 'tab=apuracao&assistente=guias' },
  { id: 'fechar', label: l.fechar, meta: l.desktop, device: 'desktop', estado: 'tab=fechamento' },
  { id: 'conciliar', label: l.conciliar, meta: l.desktop, device: 'desktop', estado: 'tab=conciliacao&assistente=conciliar' },
  { id: 'celular-inicio', label: l.cInicio, meta: l.phone, device: 'phone', estado: 'tab=inicio' },
  { id: 'celular-contas', label: l.cContas, meta: l.phone, device: 'phone', estado: 'tab=contas' },
  { id: 'celular-lancamentos', label: l.cLanc, meta: l.phone, device: 'phone', estado: 'tab=lancamentos' },
];

const proto = (l: { title: string; posterAlt: string; hint: string; dica: string; openLabel: string; screensLabel: string; caption: string; screens: ProtoScreen[] }): ProtoBlock => ({
  src: PROTO_SRC,
  title: l.title,
  poster: { src: `${IMG}/proto-poster.webp`, alt: l.posterAlt, ...WIDE },
  url: APP_URL,
  hint: l.hint,
  dica: l.dica,
  openLabel: l.openLabel,
  screensLabel: l.screensLabel,
  caption: l.caption,
  screens: l.screens,
});

const pt: CaseOba = {
  // o teal do GPB (#0F766E) clareado para ler no fundo escuro, e o latão claro da marca
  accent: '#4FBFAF',
  accent2: '#E9C27A',
  seo: {
    title: 'GPB: UX de um sistema financeiro, do computador ao celular | Wellington Mota',
    description:
      'Rodada de UX e design engineering do GPB, o sistema financeiro de um grupo empresarial brasileiro: menu por tarefa, processos guiados, triagem dos vencidos e um celular sem rolagem lateral. O app roda na página com dados fictícios.',
  },

  kicker: 'Case Study — GPB · Sistema financeiro',
  title: 'GPB: o financeiro do grupo, do Access ao celular',
  subtitle:
    'O GPB é o sistema financeiro de um grupo empresarial brasileiro e substitui um sistema antigo em MS Access. A equipe de finanças usa todo dia: pagar e receber, conciliação, fluxo de caixa, fechamento do mês e impostos. Fiz a rodada de UX direto no código. O app abaixo é o próprio GPB, em modo demonstração: clique à vontade.',
  heroStat: { label: 'Reconhecer em vez de lembrar: a tela mostra o próximo passo, e ninguém precisa decorar o caminho.', source: SRC.heuristicas },
  meta: [
    { label: 'Cliente', value: GRUPO ? `GPB · ${GRUPO}` : 'GPB, de um grupo empresarial brasileiro' },
    { label: 'Ano', value: '2026' },
    { label: 'Meu papel', value: 'UX e design engineering, no código React' },
    { label: 'Situação', value: 'Rodada entregue para revisão' },
    { label: 'Onde', value: 'Computador e celular, de 360 a 1440 px' },
  ],
  cover: {
    src: `${IMG}/cover.webp`,
    alt: 'O Início do GPB no computador: menu agrupado por tarefa à esquerda, o saldo consolidado num cartão verde-escuro e, ao lado, os cartões de "Precisa de atenção" com vencidos e próximos 7 dias',
    ...WIDE,
  },
  coverProto: proto({
    title: 'O GPB em modo demonstração, com dados fictícios',
    posterAlt: 'O Início do GPB no computador, carregando o app',
    hint: 'É o app de verdade, com dados fictícios gerados no seu navegador: dá para lançar, dar baixa e conciliar. Nada sai daqui, e recarregar volta ao começo.',
    dica: 'App **ao vivo**. Clique à vontade',
    openLabel: 'Tela cheia',
    screensLabel: 'Telas',
    caption: 'Os nomes, valores e contas são inventados.',
    screens: telas({
      inicio: 'Início: o que precisa de atenção hoje',
      contas: 'Pagar e receber',
      triagem: 'Triagem dos vencidos há mais de 120 dias',
      guias: 'Assistente: lançar as guias',
      fechar: 'Fechar o mês',
      conciliar: 'Conciliar o extrato',
      cInicio: 'Início no celular',
      cContas: 'Pagar e receber no celular',
      cLanc: 'Lançamentos por dia no celular',
      desktop: 'Desktop',
      phone: 'Celular',
    }),
  }),

  sections: [
    {
      kind: 'text',
      kicker: '01 — O problema',
      title: 'Doze abas iguais e nenhuma prioridade',
      body: [
        'A primeira versão web refez o Access tela por tela: doze abas soltas numa faixa que rolava de lado, uma coluna presa em 672 px até num monitor grande e todo formulário subindo de baixo, também no computador. Nenhuma tela dizia o que precisava de atenção hoje.',
        'Quem usa é gente de finanças, não de tecnologia, que lança e concilia o dia inteiro. Lançamentos abria em "tudo", com milhares de títulos herdados do Access (alguns em aberto desde 2015). A regra da rodada: usabilidade vale mais que firula, e cada mudança se mede em cliques e dúvidas para fazer a tarefa do dia.',
      ],
      stat: { value: '11–23 s', label: 'para abrir Lançamentos, baixando tudo de novo a cada troca de aba. Agora baixa uma vez e as outras telas usam na hora.', source: SRC.analise },
    },
    {
      kind: 'compare',
      kicker: '02 — Antes e depois',
      title: 'O mesmo dado, outra leitura',
      body: ['Mesmos dados fictícios nas duas versões. O que muda é a ordem: primeiro o que pede ação, depois o resto.'],
      compare: {
        beforeLabel: 'Antes',
        afterLabel: 'Depois',
        heuristicLabel: 'O que melhora',
        pairs: [
          {
            label: 'No computador',
            heuristic: 'A tela inteira trabalhando',
            body: [
              'O menu virou lateral e agrupado por tarefa: Visão geral, Dia a dia, Fechamento do mês e Configuração. Pagar e receber abre em "Para pagar agora", com o total, os vencidos e os próximos 7 dias antes da lista, e o aviso dos títulos antigos com um botão para revisar um por um.',
            ],
            stat: { label: 'Visibilidade do status: a pessoa vê o que está acontecendo antes de precisar perguntar.', source: SRC.heuristicas },
            wide: true,
            before: {
              src: `${IMG}/antes-desktop.webp`,
              alt: 'Pagar e receber antes, a 1440 px: abas soltas no topo, uma coluna estreita no meio da tela e a lista de vencidos com os links Baixar e Cancelar',
              ...WIDE,
            },
            after: {
              src: `${IMG}/depois-desktop.webp`,
              alt: 'Pagar e receber depois: menu lateral agrupado, faixa de números com total, vencidos e próximos 7 dias, aviso dos vencidos há mais de 120 dias e a lista com ações em lote',
              ...WIDE,
            },
          },
          {
            label: 'No celular',
            heuristic: 'Pegada de app',
            body: ['As abas que rolavam de lado viraram um menu no ☰: a rotina do dia em cartões, o fechamento e a configuração em lista. Formulários e avisos abrem em folha de baixo ou em tela cheia, nunca num modal espremido.'],
            before: {
              src: `${IMG}/antes-celular.webp`,
              alt: 'Pagar e receber antes, a 390 px: faixa de abas cortada na borda e a mesma coluna do computador',
              ...PHONE,
            },
            after: {
              src: `${VID}/menu-loop.jpg`,
              alt: 'O ☰ abre o menu do GPB no celular: Início, Fluxo de caixa, Lançamentos, Pagar e receber, Conciliação e Investimentos em cartões, e o fechamento do mês em lista, e fecha de novo',
              width: 780,
              height: 1688,
            },
            afterVideo: { src: `${VID}/menu-loop.mp4`, webm: `${VID}/menu-loop.webm` },
            note: 'Novo **menu** em cartões',
            stat: { value: '44 × 44 pt', label: 'é a área mínima de toque recomendada. No GPB, todo alvo no celular tem pelo menos isso.', source: SRC.toque },
          },
        ],
      },
    },
    {
      kind: 'showcase',
      kicker: '03 — Decisões',
      title: 'Processos guiados no lugar de telas soltas',
      body: [
        'Para cada tarefa, a ferramenta certa: assistente para o que tem começo, fim e várias decisões em ordem; checklist para o ciclo que passa por várias telas; triagem para a fila de itens parecidos; e formulário rápido para o que se faz de olho fechado.',
      ],
      live: { label: 'Ver a triagem ao vivo', screen: 'triagem' },
      stat: { label: 'Prevenção de erros: melhor que uma boa mensagem de erro é um desenho que não deixa o erro acontecer.', source: SRC.heuristicas },
      showcase: {
        url: APP_URL,
        items: [
          {
            src: `${IMG}/d-triagem.webp`,
            alt: 'Revisar vencidos antigos: um título por vez, com valor, vencimento há 7 anos e três saídas, Já foi pago, Cancelar e Manter, com atalhos de teclado',
            label: 'Triagem um por vez',
            meta: 'Pagar e receber',
            caption: 'Os títulos vencidos há mais de 120 dias saem da lista e entram numa fila: já foi pago, cancelar ou manter. Atalhos P, C e M, e desfazer no aviso.',
            size: 'half',
            ...WIDE,
          },
          {
            src: `${VID}/pilha-loop.jpg`,
            alt: 'Já foi pago abre a baixa num painel ao lado da triagem, que desliza para a esquerda e continua visível',
            label: 'Painéis lado a lado',
            meta: 'Pilha de painéis',
            caption: '"Já foi pago" abre a baixa ao lado da triagem, que desliza e continua à vista. A baixa entra como gerencial, na data do vencimento: acerta o título sem criar uma saída no banco.',
            size: 'half',
            video: { src: `${VID}/pilha-loop.mp4`, webm: `${VID}/pilha-loop.webm` },
            width: 1440,
            height: 900,
          },
          {
            src: `${IMG}/d-guias.webp`,
            alt: 'Assistente Lançar as guias, passo 1 de 3: IRPJ e CSLL marcados com valor e vencimento, e o PIS desmarcado porque já está lançado',
            label: 'Guias com o calendário da Receita',
            meta: 'Apuração',
            caption: 'A apuração calculava o imposto mas parava aí. O assistente lança as guias com o vencimento de cada uma (PIS/COFINS dia 25, IRPJ/CSLL no último dia útil, ISS dia 10), ajusta o fim de semana e desmarca o que já foi lançado.',
            size: 'half',
            ...WIDE,
          },
          {
            src: `${IMG}/d-fechar.webp`,
            alt: 'Fechar o mês: 2 de 6 prontos, o próximo passo em destaque e a lista com extratos, vencidos e rendimentos, cada um com o seu estado',
            label: 'Fechar o mês',
            meta: 'Checklist',
            caption: 'Seis passos que se conferem sozinhos: extratos conciliados, vencidos resolvidos, rendimentos, guias, DRE e relatórios. A ordem é sugestão, e cada linha leva à tela certa.',
            size: 'half',
            ...WIDE,
          },
        ],
      },
    },
    {
      kind: 'gallery',
      kicker: '04 — No celular',
      title: 'Um app no bolso, sem rolagem lateral',
      body: [
        'Uma rodada só de responsivo: modais viraram folhas de baixo ou telas cheias, o ☰ abre a rotina em cartões, e um kit de celular entrou para todas as telas (faixa de números, lista agrupada por dia, barra de ação fixa e o botão +). De 360 a 1440 px, nenhuma das 13 telas rola de lado.',
      ],
      live: { label: 'Ver no celular ao vivo', screen: 'celular-contas' },
      stat: { label: 'Lei de Jakob: as pessoas esperam que o sistema funcione como os aplicativos que já usam no dia a dia.', source: SRC.jakob },
      gallery: {
        rows: [
          {
            title: 'A rotina',
            items: [
              { src: `${IMG}/celular-inicio.webp`, alt: 'Início a 390 px: saldo consolidado e os cartões de vencidos e próximos 7 dias', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-menu.webp`, alt: 'Menu ☰ aberto: a rotina do dia em cartões e o fechamento do mês em lista', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-contas.webp`, alt: 'Pagar e receber no celular: faixa de números, aviso dos vencidos antigos e a lista agrupada por urgência', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-lancamentos.webp`, alt: 'Lançamentos no celular: mês por setas, filtros em chips, resultado do mês e a lista por dia com o botão +', device: 'phone', ...PHONE },
            ],
          },
          {
            title: 'Folhas e assistentes',
            items: [
              { src: `${IMG}/celular-triagem.webp`, alt: 'Triagem em tela cheia no celular, com Já foi pago, Cancelar e Manter ao alcance do polegar', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-guias.webp`, alt: 'Assistente das guias em tela cheia, com o botão Continuar fixo embaixo', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-novo.webp`, alt: 'Novo lançamento em tela cheia: tipo em botões lado a lado, valor, vencimento e Salvar fixo embaixo', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-fechar.webp`, alt: 'Fechar o mês no celular: lista sanfonada e o próximo passo na barra de ação', device: 'phone', ...PHONE },
            ],
          },
        ],
      },
    },
  ],

  engenharia: {
    kicker: 'Entrega · Design engineering',
    title: 'Desenhado direto no código',
    body: [
      'Não teve Figma no meio. Li as 13 telas no código, escrevi a análise, e cada decisão foi direto para o React do produto, numa branch, em commits por assunto, com os testes passando.',
      'Para revisar sem tocar em produção, o app ganhou um modo demonstração com dados fictícios em memória. É ele que roda no topo desta página.',
    ],
    pilares: [
      {
        titulo: 'Análise antes da tela',
        value: '13',
        label: 'telas lidas no código e mapeadas',
        texto: 'Cada tela foi ligada à função do Access que ela substitui, com quem usa, quantos cliques custa a tarefa do dia e os problemas por severidade. A rodada partiu dessa lista, e não de gosto.',
      },
      {
        titulo: 'Um kit, não telas soltas',
        value: '5',
        label: 'peças novas para o celular',
        texto: 'KpiStrip, GroupedList, ParamSummary, BottomActionBar e Fab entraram no kit compartilhado, junto com a folha de baixo, o assistente, a triagem e a pilha de painéis. As telas usam as mesmas peças, e o comportamento é o mesmo em todas.',
      },
      {
        titulo: 'Responsivo medido',
        value: '0 px',
        label: 'de rolagem lateral, de 360 a 1440 px',
        texto: 'Um script com Playwright passa pelas 13 telas em várias larguras e mede rolagem lateral, letra abaixo de 12 px e alvo abaixo de 44 px. O que aparecia virava tarefa, até a lista zerar.',
      },
      {
        titulo: 'Pronto para revisar',
        value: '77',
        label: 'commits por assunto, numa branch',
        texto: 'Cada mudança tem um commit com o porquê, e as decisões que dependiam do cliente ficaram marcadas no código até serem resolvidas, uma por uma. O merge é uma decisão de quem revisa.',
      },
    ],
  },

  outcomesLabel: 'Resultado',
  outcomesTitle: 'O que ficou pronto',
  outcomes: [
    'Menu agrupado por tarefa e um Início que mostra o que precisa de atenção hoje',
    'Assistentes para conciliar, lançar as guias, fechar o mês das aplicações, importar planilha e criar empresa',
    'Fechar o mês como checklist que se confere sozinho, e a triagem dos vencidos há mais de 120 dias',
    'Painéis empilhados lado a lado no computador; folhas de baixo e telas cheias no celular',
    'Um kit de celular usado nas 13 telas, sem rolagem lateral de 360 a 1440 px',
    'Um modo demonstração com dados fictícios, para revisar sem tocar em produção',
  ],
  toolsLabel: 'Ferramentas',
  tools: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'Motion', 'Vitest', 'Playwright', 'Agentes de IA'],

  cta: {
    heading: 'Seu sistema interno é difícil de usar?',
    sub: 'Eu levo da análise ao código: menos cliques para a tarefa do dia, no computador e no celular.',
    label: 'Falar comigo',
  },
  ui: { back: 'Voltar aos projetos' },
};

const en: CaseOba = {
  ...pt,
  seo: {
    title: 'GPB: UX for a finance system, desktop to phone | Wellington Mota',
    description:
      'UX and design engineering round for GPB, the finance system of a Brazilian business group: task-based navigation, guided processes, triage of old overdue items and a phone layout with no sideways scroll. The app runs on the page with fictional data.',
  },

  kicker: 'Case Study — GPB · Finance system',
  title: 'GPB: a business group’s finance desk, from Access to the phone',
  subtitle:
    'GPB is the finance system of a Brazilian business group, replacing an old MS Access setup. The finance staff use it every day: payables and receivables, bank reconciliation, cash flow, month-end close and taxes. I ran the UX round straight in the code. The app below is GPB itself in demo mode: click around.',
  heroStat: { label: 'Recognition rather than recall: the screen shows the next step, so nobody has to memorize the way.', source: SRC.heuristicas },
  meta: [
    { label: 'Client', value: GRUPO ? `GPB · ${GRUPO}` : 'GPB, a Brazilian business group' },
    { label: 'Year', value: '2026' },
    { label: 'My role', value: 'UX and design engineering, in the React code' },
    { label: 'Status', value: 'Round delivered for review' },
    { label: 'Where', value: 'Desktop and phone, 360 to 1440 px' },
  ],
  cover: {
    ...pt.cover,
    alt: 'GPB’s home on desktop: task-grouped menu on the left, the consolidated balance on a dark green card and, next to it, the "Needs attention" cards with overdue and next-7-days items',
  },
  coverProto: proto({
    title: 'GPB in demo mode, with fictional data',
    posterAlt: 'GPB’s home on desktop, loading the app',
    hint: 'This is the real app, with fictional data generated in your browser: you can post entries, settle and reconcile. Nothing leaves the page, and reloading starts over. The interface is in Portuguese, as it is for the team.',
    dica: 'The app, **live**. Click around',
    openLabel: 'Full screen',
    screensLabel: 'Screens',
    caption: 'Names, amounts and accounts are made up.',
    screens: telas({
      inicio: 'Home: what needs attention today',
      contas: 'Payables and receivables',
      triagem: 'Triage of items overdue for 120+ days',
      guias: 'Wizard: post the tax slips',
      fechar: 'Close the month',
      conciliar: 'Reconcile the statement',
      cInicio: 'Home on the phone',
      cContas: 'Payables on the phone',
      cLanc: 'Entries by day on the phone',
      desktop: 'Desktop',
      phone: 'Phone',
    }),
  }),

  sections: [
    {
      kind: 'text',
      kicker: '01 — The problem',
      title: 'Twelve identical tabs and no priorities',
      body: [
        'The first web version rebuilt Access screen by screen: twelve loose tabs in a strip that scrolled sideways, a column locked at 672 px even on a large monitor, and every form sliding up from the bottom, on desktop too. No screen said what needed attention today.',
        'The people using it work in finance, not tech, posting and reconciling all day. Entries opened on "everything", with thousands of items inherited from Access (some open since 2015). The rule for the round: usability over flourish, and every change is measured in clicks and doubts for the day’s task.',
      ],
      stat: { value: '11–23 s', label: 'to open Entries, downloading everything again on every tab switch. Now it loads once and the other screens use it right away.', source: 'GPB UX analysis, November 2026' },
    },
    {
      kind: 'compare',
      kicker: '02 — Before and after',
      title: 'Same data, a different read',
      body: ['The same fictional data in both versions. What changes is the order: first what needs action, then the rest.'],
      compare: {
        beforeLabel: 'Before',
        afterLabel: 'After',
        heuristicLabel: 'What improves',
        pairs: [
          {
            label: 'On desktop',
            heuristic: 'The whole screen at work',
            body: [
              'The menu moved to the side and is grouped by task: Overview, Day to day, Month-end close and Settings. Payables opens on "Pay now", with the total, overdue and next 7 days above the list, and a notice about old items with a button to review them one by one.',
            ],
            stat: { label: 'Visibility of system status: people see what is going on before they have to ask.', source: SRC.heuristicas },
            wide: true,
            before: {
              src: `${IMG}/antes-desktop.webp`,
              ...WIDE,
              alt: 'Payables before, at 1440 px: loose tabs at the top, a narrow column in the middle of the screen and the overdue list with Settle and Cancel links',
            },
            after: {
              src: `${IMG}/depois-desktop.webp`,
              alt: 'Payables after: grouped side menu, a strip with total, overdue and next 7 days, a notice about items overdue for 120+ days and the list with bulk actions',
              ...WIDE,
            },
          },
          {
            label: 'On the phone',
            heuristic: 'Feels like an app',
            body: ['The sideways tabs became a ☰ menu: the daily routine as cards, month-end and settings as a list. Forms and alerts open as bottom sheets or full screen, never in a cramped modal.'],
            before: {
              src: `${IMG}/antes-celular.webp`,
              alt: 'Payables before, at 390 px: a tab strip cut off at the edge and the same column as on desktop',
              ...PHONE,
            },
            after: {
              src: `${VID}/menu-loop.jpg`,
              alt: 'The ☰ opens GPB’s menu on the phone: Home, Cash flow, Entries, Payables, Reconciliation and Investments as cards, month-end as a list, then closes again',
              width: 780,
              height: 1688,
            },
            afterVideo: { src: `${VID}/menu-loop.mp4`, webm: `${VID}/menu-loop.webm` },
            note: 'New **menu** in cards',
            stat: { value: '44 × 44 pt', label: 'is the recommended minimum touch target. On GPB, every target on the phone is at least that.', source: SRC.toque },
          },
        ],
      },
    },
    {
      kind: 'showcase',
      kicker: '03 — Decisions',
      title: 'Guided processes instead of loose screens',
      body: [
        'The right tool for each task: a wizard for work with a start, an end and several decisions in order; a checklist for a cycle that spans several screens; triage for a queue of similar items; and a quick form for what people do with their eyes closed.',
      ],
      live: { label: 'See the triage live', screen: 'triagem' },
      stat: { label: 'Error prevention: better than a good error message is a design that keeps the error from happening.', source: SRC.heuristicas },
      showcase: {
        url: APP_URL,
        items: [
          {
            src: `${IMG}/d-triagem.webp`,
            alt: 'Review old overdue items: one item at a time, with amount, due 7 years ago and three ways out, Already paid, Cancel and Keep, with keyboard shortcuts',
            label: 'Triage, one at a time',
            meta: 'Payables',
            caption: 'Items overdue for more than 120 days leave the list and enter a queue: already paid, cancel or keep. Shortcuts P, C and M, and undo in the toast.',
            size: 'half',
            ...WIDE,
          },
          {
            src: `${VID}/pilha-loop.jpg`,
            alt: 'Already paid opens the settlement in a panel next to the triage, which slides left and stays visible',
            label: 'Side-by-side panels',
            meta: 'Panel stack',
            caption: '"Already paid" opens the settlement next to the triage, which slides over and stays in view. It is posted as a management settlement on the due date: it clears the item without creating a bank outflow.',
            size: 'half',
            video: { src: `${VID}/pilha-loop.mp4`, webm: `${VID}/pilha-loop.webm` },
            width: 1440,
            height: 900,
          },
          {
            src: `${IMG}/d-guias.webp`,
            alt: 'Post the tax slips wizard, step 1 of 3: IRPJ and CSLL checked with amount and due date, and PIS unchecked because it is already posted',
            label: 'Tax slips on the federal calendar',
            meta: 'Tax assessment',
            caption: 'The assessment computed the tax and stopped there. The wizard posts each slip with its due date (PIS/COFINS on the 25th, IRPJ/CSLL on the last business day, ISS on the 10th), shifts weekends and unchecks what is already posted.',
            size: 'half',
            ...WIDE,
          },
          {
            src: `${IMG}/d-fechar.webp`,
            alt: 'Close the month: 2 of 6 done, the next step highlighted and the list with statements, overdue items and yields, each with its status',
            label: 'Close the month',
            meta: 'Checklist',
            caption: 'Six steps that check themselves: reconciled statements, overdue items resolved, yields, tax slips, P&L and reports. The order is a suggestion, and each row opens the right screen.',
            size: 'half',
            ...WIDE,
          },
        ],
      },
    },
    {
      kind: 'gallery',
      kicker: '04 — On the phone',
      title: 'An app in your pocket, no sideways scroll',
      body: [
        'A round just for responsive: modals became bottom sheets or full screens, the ☰ opens the routine as cards, and a phone kit went into every screen (a numbers strip, lists grouped by day, a fixed action bar and the + button). From 360 to 1440 px, none of the 13 screens scrolls sideways.',
      ],
      live: { label: 'See the phone live', screen: 'celular-contas' },
      stat: { label: 'Jakob’s law: people expect a system to work like the apps they already use every day.', source: SRC.jakob },
      gallery: {
        rows: [
          {
            title: 'The routine',
            items: [
              { src: `${IMG}/celular-inicio.webp`, alt: 'Home at 390 px: consolidated balance and the overdue and next-7-days cards', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-menu.webp`, alt: '☰ menu open: the daily routine as cards and month-end as a list', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-contas.webp`, alt: 'Payables on the phone: numbers strip, old overdue notice and the list grouped by urgency', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-lancamentos.webp`, alt: 'Entries on the phone: month arrows, filter chips, month result and the list by day with the + button', device: 'phone', ...PHONE },
            ],
          },
          {
            title: 'Sheets and wizards',
            items: [
              { src: `${IMG}/celular-triagem.webp`, alt: 'Full-screen triage on the phone, with Already paid, Cancel and Keep within thumb reach', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-guias.webp`, alt: 'Full-screen tax slip wizard, with the Continue button fixed at the bottom', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-novo.webp`, alt: 'New entry in full screen: type as side-by-side buttons, amount, due date and Save fixed at the bottom', device: 'phone', ...PHONE },
              { src: `${IMG}/celular-fechar.webp`, alt: 'Close the month on the phone: accordion list and the next step in the action bar', device: 'phone', ...PHONE },
            ],
          },
        ],
      },
    },
  ],

  engenharia: {
    kicker: 'Delivery · Design engineering',
    title: 'Designed straight in the code',
    body: [
      'No Figma in between. I read the 13 screens in the code, wrote the analysis, and each decision went straight into the product’s React, on a branch, in commits by topic, with the tests passing.',
      'To review without touching production, the app got a demo mode with fictional in-memory data. That is what runs at the top of this page.',
    ],
    pilares: [
      {
        titulo: 'Analysis before screens',
        value: '13',
        label: 'screens read in the code and mapped',
        texto: 'Each screen was tied to the Access function it replaces, with who uses it, how many clicks the daily task costs and the problems by severity. The round started from that list, not from taste.',
      },
      {
        titulo: 'A kit, not loose screens',
        value: '5',
        label: 'new pieces for the phone',
        texto: 'KpiStrip, GroupedList, ParamSummary, BottomActionBar and Fab joined the shared kit, next to the bottom sheet, the wizard, the triage and the panel stack. Every screen uses the same pieces and behaves the same way.',
      },
      {
        titulo: 'Measured responsive',
        value: '0 px',
        label: 'of sideways scroll, 360 to 1440 px',
        texto: 'A Playwright script walks the 13 screens at several widths and measures sideways scroll, type under 12 px and targets under 44 px. Whatever showed up became a task, until the list was empty.',
      },
      {
        titulo: 'Ready for review',
        value: '77',
        label: 'commits by topic, on a branch',
        texto: 'Every change has a commit with the why, and the decisions that depended on the client stayed flagged in the code until they were settled, one by one. Merging is the reviewer’s call.',
      },
    ],
  },

  outcomesLabel: 'Outcome',
  outcomesTitle: 'What is done',
  outcomes: [
    'Task-grouped navigation and a Home that shows what needs attention today',
    'Wizards to reconcile, post tax slips, close the month for investments, import spreadsheets and set up a company',
    'Month-end close as a self-checking checklist, and triage of items overdue for more than 120 days',
    'Side-by-side stacked panels on desktop; bottom sheets and full screens on the phone',
    'A phone kit used across the 13 screens, with no sideways scroll from 360 to 1440 px',
    'A demo mode with fictional data, to review without touching production',
  ],
  toolsLabel: 'Tools',
  tools: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'Motion', 'Vitest', 'Playwright', 'AI agents'],

  cta: {
    heading: 'Is your internal system hard to use?',
    sub: 'I take it from analysis to code: fewer clicks for the daily task, on desktop and on the phone.',
    label: 'Get in touch',
  },
  ui: { back: 'Back to projects' },
};

export default { pt, en };
