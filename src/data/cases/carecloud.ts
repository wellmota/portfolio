import type { CaseStudy } from './types';

const carecloud: CaseStudy = {
  pt: {
    slug: 'carecloud',
    accent: '#1E8FD5',
    kicker: 'Case Study — CareCloud',
    title: 'CareCloud',
    subtitle:
      'Ajudar a replataformar uma suíte clínica de Adobe Flex para React: quatro meses in loco em Miami, um time de cinco UX e fluxos hi-fi testados com médicos de verdade — design entregue lado a lado com os engenheiros que reconstruíam o produto.',
    cover: {
      src: '/cases/carecloud/cover.webp',
      alt: 'Telas do CareCloud sobre fundo claro: o Productivity Center em destaque, com a revisão de sistemas e o faturamento ao lado',
    },
    meta: [
      { label: 'Cliente', value: 'CareCloud · Health-tech, Miami (via App Theory)' },
      { label: 'Ano', value: '2017 – 2018' },
      { label: 'Papel', value: 'UX / Product Designer — time de cinco UX' },
      { label: 'Plataforma', value: 'Web app · prontuário clínico (EHR) e gestão de clínica' },
      { label: 'Contexto', value: 'Replataformação de um produto core de Adobe Flex para React' },
    ],
    stats: [
      { value: '~1 ano', label: 'no projeto, do início à passagem de bastão' },
      { value: '4 meses', label: 'in loco em Miami; o resto remoto' },
      { value: '5 UX', label: 'designers no time, mais a engenharia' },
      { value: '4', label: 'módulos: prontuário, e-prescrição, faturamento e agenda' },
      { value: 'Flex → React', label: 'a migração de plataforma para a qual desenhei' },
      { value: 'Hi-fi', label: 'protótipos testados com clínicos reais' },
    ],
    intro: [
      'A CareCloud é uma empresa americana de health-tech cuja plataforma roda o lado clínico e administrativo de clínicas médicas — prontuário, prescrições, agenda, faturamento. Quando entrei, pelo estúdio de produto App Theory, a empresa estava replataformando um produto core de Adobe Flex para React.',
      'Entrei como parte de um time de cinco UX, trabalhando in loco em Miami por quatro meses e remoto no resto de cerca de um ano. A missão: redesenhar as telas clínicas para a nova stack e validá-las com quem vive nesse software o dia inteiro — médicos, enfermeiros e recepção.',
    ],
    roleLabel: 'O que eu fiz',
    roleList: [
      'UX research & entrevistas',
      'Mapeamento de fluxos clínicos',
      'Prototipação hi-fi',
      'Testes de usabilidade com clínicos',
      'Design de interação e de informação',
      'Padrões de UI para a nova stack',
      'Design → código com engenharia',
      'Alinhamento com stakeholders',
      'Trabalho in loco em Miami',
    ],
    sections: [
      {
        kicker: '01 — O produto',
        title: 'Um ambiente clínico, replataformado',
        body: [
          'O produto é onde a clínica toca o dia. O Productivity Center é a base do médico: as tarefas do dia, a carga de consultas, a central de mensagens e as métricas de desempenho, tudo numa tela só. Meu trabalho era deixar essa densidade legível — muita informação, lida num relance, resolvida num clique.',
          'Tudo precisava ser redesenhado para React. O legado era feito em Adobe Flex, uma tecnologia em fim de vida; a reconstrução era a chance de repensar a interface, não só portá-la.',
        ],
        showcase: {
          url: 'app.carecloud.com',
          frame: 'browser',
          items: [
            {
              src: '/cases/carecloud/productivity-center.webp',
              alt: 'CareCloud Productivity Center: atividade de tarefas, visão de consultas, agenda do dia, central de mensagens e métricas de desempenho',
              label: 'Productivity Center',
              meta: 'painel do médico · página inteira',
              scroll: true,
              scrollSeconds: 7,
              caption: 'Tarefas do dia, carga de consultas, agenda, central de mensagens e medidores de desempenho numa tela só. Passe o mouse sobre a janela para rolar a página.',
            },
          ],
        },
      },
      {
        kicker: '02 — O prontuário',
        title: 'O quadro inteiro do paciente, numa só visão',
        body: [
          'Do painel, o médico entra no prontuário. O Patient Center reúne o paciente inteiro numa só tela — pedidos, próximas visitas, sinais vitais, medicações, imunizações, problemas, alergias — cada bloco um módulo que se escaneia ou se abre. O trabalho de design foi hierarquia: o que o clínico precisa primeiro, o que fica a um toque.',
          'A prescrição vive dentro dessa tela. Trocar uma medicação por outra é um só modal: o que sai, por quê, o que entra, com a pré-visualização da receita e a farmácia já escolhida — e um selo vermelho quando a substância é controlada.',
        ],
        showcase: {
          url: 'app.carecloud.com',
          frame: 'browser',
          items: [
            {
              src: '/cases/carecloud/patient-center.webp',
              alt: 'CareCloud Patient Center: prontuário completo com pedidos, sinais vitais, medicações, imunizações, problemas e alergias',
              label: 'Patient Center',
              meta: 'prontuário · página inteira',
              scroll: true,
              scrollSeconds: 6,
              caption: 'A visita de hoje no topo — pedidos, próximas visitas e os últimos sinais vitais — e, abaixo, cada módulo do prontuário com seu próprio "Add New". Passe o mouse para rolar.',
            },
            {
              src: '/cases/carecloud/medications-modal.webp',
              alt: 'CareCloud: modal de parar e adicionar medicações sobre o prontuário, com duas medicações descontinuadas e uma nova com selo de substância controlada',
              label: 'Medicações',
              meta: 'e-Prescrição',
              caption: 'Parar e adicionar na mesma ação: as medicações descontinuadas guardam o motivo; a nova mostra a receita como a farmácia vai receber.',
            },
          ],
        },
      },
      {
        kicker: '03 — A consulta',
        title: 'Da admissão ao faturamento sem trocar de ferramenta',
        body: [
          'O atendimento é o coração da visita. Desenhei o fluxo de anotação — admissão, história, revisão de sistemas, exame, plano — como uma sequência de passos com o progresso sempre visível. Na revisão de sistemas, chips coloridos deixam o médico marcar achados rápido, sem sair do teclado: verde é normal, vermelho é achado, cinza é o que ainda não foi avaliado.',
          'O plano fecha a consulta. Código E&M, procedimentos e diagnósticos vivem na mesma tela da nota, com um botão para assinar e mandar ao faturamento — a visita termina sem abrir outro sistema.',
        ],
        showcase: {
          url: 'app.carecloud.com',
          frame: 'browser',
          items: [
            {
              src: '/cases/carecloud/new-encounter.webp',
              alt: 'CareCloud: novo atendimento com queixa principal, história médica, fatores de risco e história social, com recomendações e pedidos na coluna direita',
              label: 'Novo atendimento',
              meta: 'admissão · página inteira',
              size: 'half',
              scroll: true,
              scrollSeconds: 11,
            },
            {
              src: '/cases/carecloud/encounter-review.webp',
              alt: 'CareCloud: nota de atendimento na etapa de revisão de sistemas, com achados em chips verdes, vermelhos e cinzas por sistema',
              label: 'Revisão de sistemas',
              meta: 'chips · página inteira',
              size: 'half',
              scroll: true,
              scrollSeconds: 8,
            },
            {
              src: '/cases/carecloud/billing.webp',
              alt: 'CareCloud Encounter Notes: codificação E&M, procedimentos com modificadores e diagnósticos, e o botão Assinar e enviar para faturamento',
              label: 'Encounter Notes',
              meta: 'codificação e faturamento',
              caption: 'Ambiente clínico, serviço e tipo de exame no topo; abaixo, o código E&M, os procedimentos e os diagnósticos adicionais. "Sign & Send to Billing" encerra a visita.',
            },
          ],
        },
      },
      {
        kicker: '04 — Os detalhes',
        title: 'As decisões que o print esconde',
        body: [
          'Software clínico se decide no detalhe: a cor de um chip, um ícone ao lado de uma pressão fora da faixa, o selo que diz "substância controlada" antes de o médico assinar. Cada um desses foi desenhado, testado com clínicos e ajustado. Alguns dos que mais importaram:',
        ],
        details: {
          items: [
            {
              src: '/cases/carecloud/d-chips.webp',
              alt: 'Seção neurológica da revisão de sistemas: chips vermelhos de achados, verdes de normais e cinzas de não avaliados',
              label: 'Chips de três estados',
              text: 'Verde para normal, vermelho para achado, cinza para o que ainda não foi avaliado. O médico marca a revisão inteira sem tirar a mão do teclado e lê o resultado de longe.',
            },
            {
              src: '/cases/carecloud/d-vitals.webp',
              alt: 'Bloco da visita de hoje: pedidos, próximas visitas e últimos sinais vitais, com ícones de alerta em pressão e dor fora da faixa',
              label: 'Alerta no dado, não no rodapé',
              text: 'Pressão e dor fora da faixa ganham o ícone na própria célula. Ninguém precisa decorar o limite para enxergar o problema.',
            },
            {
              src: '/cases/carecloud/d-schedule.webp',
              alt: 'Agenda do dia: pacientes com foto, horário, ícones de status, sala e tempo decorrido, em tratamento ou com check-in feito',
              label: 'Agenda com estado',
              text: 'Cada paciente carrega o status, a sala e há quanto tempo espera. A cor avisa antes do texto.',
            },
            {
              src: '/cases/carecloud/d-controlled.webp',
              alt: 'Linha de prescrição de Clonazepam com selo vermelho de substância controlada, pré-visualização da receita e farmácia',
              label: 'Substância controlada à vista',
              text: 'O selo aparece na linha da prescrição, antes de assinar. A pré-visualização diz exatamente o que a farmácia vai receber.',
            },
            {
              src: '/cases/carecloud/d-em.webp',
              alt: 'Bloco de código E&M com quatro níveis como opções lado a lado, e a tabela de procedimentos com unidades, modificadores e diagnósticos',
              label: 'Código E&M em um clique',
              text: 'Os quatro níveis como opções lado a lado, com modificadores e diagnósticos na mesma linha. O faturamento começa dentro da consulta.',
            },
            {
              src: '/cases/carecloud/d-tasks.webp',
              alt: 'Cartão de atividade de tarefas: anel com 80% concluído e a lista do que falta por tipo',
              label: 'O dia em um número',
              text: 'O anel diz quanto já foi resolvido; a lista ao lado diz o que falta, por tipo. Um relance, uma decisão.',
            },
          ],
        },
      },
      {
        kicker: '05 — O método',
        title: 'In loco com quem usa o produto',
        body: [
          'Por quatro meses trabalhei do escritório da CareCloud em Miami, ao lado de produto, engenharia e dos especialistas clínicos. Essa proximidade era o ponto: software de saúde é cheio de regras que só se aprendem vendo alguém trabalhar — como um enfermeiro prepara o paciente, como um faturista lê um código, o que um médico faz nos noventa segundos entre uma sala e outra.',
          'Conduzi entrevistas e testes de usabilidade com clínicos reais, mapeei os fluxos de trabalho e montei protótipos de alta fidelidade que colocamos na frente dos usuários antes de uma linha do novo front-end ser escrita. Testávamos, eu ajustava, em ciclos — saúde regulada deixa pouco espaço para adivinhação.',
        ],
        image: {
          src: '/cases/carecloud/metodo.svg',
          alt: 'Diagrama do método: observar de perto, entrevistar clínicos, mapear os fluxos, protótipo hi-fi e testar com quem usa, em ciclos; abaixo, os doze meses do projeto com os quatro primeiros in loco em Miami',
          caption: 'Cinco passos em ciclo, dentro do prédio do cliente: quatro meses em Miami, o resto remoto com o mesmo time.',
        },
      },
      {
        kicker: '06 — Design → código',
        title: 'Desenhar lado a lado com a reconstrução',
        body: [
          'Como o produto estava sendo reconstruído em React, design e engenharia tinham que andar juntos. Entreguei fluxos hi-fi conforme os componentes tomavam forma, defini os padrões de UI que a nova interface reaproveitaria e sentei com os desenvolvedores para resolver as lacunas que só aparecem no código real — estados, casos de borda, a densidade que um print esconde.',
          'Trabalhar assim, colado no build, é a parte que levei para tudo o que vim a fazer depois: design que entra em produção, não design jogado por cima do muro.',
        ],
        image: {
          src: '/cases/carecloud/design-codigo.svg',
          alt: 'Diagrama de duas raias, design e engenharia, com as entregas alternando entre elas: fluxos hi-fi, componentes React, padrões de UI, telas montadas, ajuste no código real e produção',
          caption: 'Duas raias, uma entrega puxando a outra: o design chega conforme o componente nasce, e volta ao código para fechar o que o print não mostra.',
        },
      },
      {
        kicker: '07 — Resultado',
        title: 'Uma suíte legada, redesenhada para a próxima década',
        body: [
          'Ao longo de cerca de um ano, o produto clínico saiu do Adobe Flex rumo a um front-end moderno em React, com o ambiente do médico — prontuário, prescrição, agenda e faturamento — redesenhado e validado com os clínicos que o usam todo dia.',
          'Foi minha imersão mais profunda em software de saúde regulado e pesado em fluxo, num time multidisciplinar, dentro do prédio do cliente — e o projeto que definiu o jeito como ainda trabalho: pesquisa perto dos usuários, design perto do código.',
        ],
      },
    ],
    outcomesLabel: 'Resultados',
    outcomesTitle: 'O que o trabalho entregou',
    outcomes: [
      'Um produto clínico core movido do Adobe Flex em direção ao React',
      'Ambiente do médico redesenhado: prontuário, e-prescrição, faturamento, agenda',
      'Fluxos hi-fi validados com médicos e equipe clínica reais',
      'Quatro meses in loco em Miami com stakeholders e usuários',
      'Design entregue junto com a reconstrução de engenharia',
      'Padrões de UI reaproveitáveis para a nova plataforma',
    ],
    stackLabel: 'Stack',
    stack: [
      'Sketch',
      'Axure',
      'Prototipação hi-fi',
      'Testes de usabilidade',
      'Design System',
      'React (stack-alvo)',
      'UX clínico',
    ],
    cta: {
      heading: 'Tem um produto complexo que precisa ser replataformado?',
      sub: 'Eu desenho perto dos usuários e perto do código — da pesquisa a um front-end que entra em produção.',
      label: 'Falar comigo',
    },
    ui: { back: 'Voltar aos projetos', visit: 'Visitar o site' },
    seo: {
      title: 'CareCloud — Case Study · Wellington Mota',
      description:
        'Ajudar a replataformar uma suíte clínica de Adobe Flex para React: in loco em Miami num time de cinco UX, fluxos hi-fi testados com médicos reais, design entregue junto com a reconstrução de engenharia.',
    },
  },

  en: {
    slug: 'carecloud',
    accent: '#1E8FD5',
    kicker: 'Case Study — CareCloud',
    title: 'CareCloud',
    subtitle:
      'Helping re-platform a clinical suite from Adobe Flex to React: four months on-site in Miami, a five-person UX team and hi-fi flows tested with real doctors — design delivered hand-in-hand with the engineers rebuilding it.',
    cover: {
      src: '/cases/carecloud/cover.webp',
      alt: 'CareCloud screens on a light background: the Productivity Center up front, with the review of systems and billing beside it',
    },
    meta: [
      { label: 'Client', value: 'CareCloud · Health-tech, Miami (via App Theory)' },
      { label: 'Year', value: '2017 – 2018' },
      { label: 'Role', value: 'UX / Product Designer — five-person UX team' },
      { label: 'Platform', value: 'Web app · clinical EHR & practice management' },
      { label: 'Context', value: 'Re-platforming a core product from Adobe Flex to React' },
    ],
    stats: [
      { value: '~1 yr', label: 'on the engagement, start to handover' },
      { value: '4 mo', label: 'on-site in Miami; the rest remote' },
      { value: '5 UX', label: 'designers on the team, plus engineering' },
      { value: '4', label: 'modules: charting, e-Prescribe, billing and scheduling' },
      { value: 'Flex → React', label: 'the platform migration I designed for' },
      { value: 'Hi-fi', label: 'prototypes tested with real clinicians' },
    ],
    intro: [
      'CareCloud is a US health-tech company whose platform runs the clinical and administrative side of medical practices — charting, prescriptions, scheduling, billing. When I joined, through the product studio App Theory, the company was re-platforming a core product from Adobe Flex to React.',
      'I came in as part of a five-person UX team, working on-site in Miami for four months and remotely for the rest of roughly a year. The job: redesign the clinical screens for the new stack and validate them with the people who live in this software all day — doctors, nurses and front-desk staff.',
    ],
    roleLabel: 'What I did',
    roleList: [
      'UX research & interviews',
      'Clinical workflow mapping',
      'Hi-fi prototyping',
      'Usability testing with clinicians',
      'Interaction & information design',
      'UI patterns for the new stack',
      'Design → code with engineers',
      'Stakeholder alignment',
      'On-site in Miami',
    ],
    sections: [
      {
        kicker: '01 — The product',
        title: 'A clinical workspace, re-platformed',
        body: [
          'The product is where a practice runs its day. The Productivity Center is the provider’s home base: the day’s tasks, the appointment load, the message center and performance metrics, all on one screen. My job was to make that density legible — a lot of information, read at a glance, acted on in a click.',
          'Everything had to be redrawn for React. The legacy was built in Adobe Flex, a technology on its way out; the rebuild was a chance to rethink the interface, not just port it.',
        ],
        showcase: {
          url: 'app.carecloud.com',
          frame: 'browser',
          items: [
            {
              src: '/cases/carecloud/productivity-center.webp',
              alt: 'CareCloud Productivity Center: task activity, appointment overview, the day’s schedule, message center and performance metrics',
              label: 'Productivity Center',
              meta: 'provider dashboard · full page',
              scroll: true,
              scrollSeconds: 7,
              caption: 'The day’s tasks, the appointment load, the schedule, the message center and performance gauges on one screen. Hover the window to scroll the page.',
            },
          ],
        },
      },
      {
        kicker: '02 — The chart',
        title: 'The whole patient, in one view',
        body: [
          'From the dashboard the provider moves into the chart. The Patient Center pulls the whole patient into one screen — orders, upcoming visits, vitals, medications, immunizations, problems, allergies — each block a module to scan or open. The design job was hierarchy: what a clinician needs first, what stays one tap away.',
          'Prescribing lives inside that screen. Swapping one medication for another is a single modal: what goes out, why, what comes in, with a preview of the script and the pharmacy already picked — and a red badge when the substance is controlled.',
        ],
        showcase: {
          url: 'app.carecloud.com',
          frame: 'browser',
          items: [
            {
              src: '/cases/carecloud/patient-center.webp',
              alt: 'CareCloud Patient Center: a full chart with orders, vitals, medications, immunizations, problems and allergies',
              label: 'Patient Center',
              meta: 'chart · full page',
              scroll: true,
              scrollSeconds: 6,
              caption: 'Today’s visit on top — orders, upcoming visits and the latest vitals — and below it every chart module with its own “Add New”. Hover to scroll.',
            },
            {
              src: '/cases/carecloud/medications-modal.webp',
              alt: 'CareCloud: a stop-and-add medications modal over the chart, with two discontinued medications and a new one flagged as a controlled substance',
              label: 'Medications',
              meta: 'e-Prescribe',
              caption: 'Stop and add in one action: discontinued medications keep their reason; the new one shows the script exactly as the pharmacy will receive it.',
            },
          ],
        },
      },
      {
        kicker: '03 — The visit',
        title: 'From intake to billing without switching tools',
        body: [
          'The encounter is the heart of the visit. I designed the note-taking flow — intake, history, review of systems, exam, plan — as a sequence of steps with progress always in view. In the review of systems, colour-coded chips let a doctor mark findings fast without leaving the keyboard: green is normal, red is a finding, grey is not yet assessed.',
          'The plan closes the visit. E&M code, procedures and diagnoses live on the same screen as the note, with one button to sign and send to billing — the visit ends without opening another system.',
        ],
        showcase: {
          url: 'app.carecloud.com',
          frame: 'browser',
          items: [
            {
              src: '/cases/carecloud/new-encounter.webp',
              alt: 'CareCloud: a new encounter with chief complaint, past medical history, risk factors and social history, with recommendations and orders in the right column',
              label: 'New encounter',
              meta: 'intake · full page',
              size: 'half',
              scroll: true,
              scrollSeconds: 11,
            },
            {
              src: '/cases/carecloud/encounter-review.webp',
              alt: 'CareCloud: an encounter note at the review-of-systems step, with findings as green, red and grey chips per system',
              label: 'Review of systems',
              meta: 'chips · full page',
              size: 'half',
              scroll: true,
              scrollSeconds: 8,
            },
            {
              src: '/cases/carecloud/billing.webp',
              alt: 'CareCloud Encounter Notes: E&M coding, procedures with modifiers and diagnoses, and the Sign & Send to Billing button',
              label: 'Encounter Notes',
              meta: 'coding & billing',
              caption: 'Clinical setting, service and exam type on top; below, the E&M code, the procedures and additional diagnoses. “Sign & Send to Billing” closes the visit.',
            },
          ],
        },
      },
      {
        kicker: '04 — The details',
        title: 'The decisions a screenshot hides',
        body: [
          'Clinical software is decided in the details: the colour of a chip, an icon next to a blood pressure out of range, the badge that says “controlled substance” before the doctor signs. Each of these was designed, tested with clinicians and adjusted. A few that mattered most:',
        ],
        details: {
          items: [
            {
              src: '/cases/carecloud/d-chips.webp',
              alt: 'Neurological section of the review of systems: red chips for findings, green for normal and grey for not assessed',
              label: 'Three-state chips',
              text: 'Green for normal, red for a finding, grey for what has not been assessed yet. The doctor marks the whole review without leaving the keyboard and reads the result from across the room.',
            },
            {
              src: '/cases/carecloud/d-vitals.webp',
              alt: 'Today’s visit block: orders, upcoming visits and latest vitals, with alert icons on blood pressure and pain out of range',
              label: 'The alert on the data, not in a footer',
              text: 'Blood pressure and pain out of range get the icon in the cell itself. Nobody has to memorise the threshold to see the problem.',
            },
            {
              src: '/cases/carecloud/d-schedule.webp',
              alt: 'The day’s schedule: patients with photo, time, status icons, room and elapsed time, in treatment or checked in',
              label: 'A schedule with state',
              text: 'Every patient carries their status, their room and how long they have been waiting. Colour warns before text does.',
            },
            {
              src: '/cases/carecloud/d-controlled.webp',
              alt: 'A Clonazepam prescription row with a red controlled-substance badge, prescription preview and pharmacy',
              label: 'Controlled substance in plain sight',
              text: 'The badge sits on the prescription row, before signing. The preview says exactly what the pharmacy will receive.',
            },
            {
              src: '/cases/carecloud/d-em.webp',
              alt: 'E&M code block with four levels as side-by-side options, and the procedures table with units, modifiers and diagnoses',
              label: 'E&M code in one click',
              text: 'The four levels as side-by-side options, with modifiers and diagnoses on the same row. Billing starts inside the visit.',
            },
            {
              src: '/cases/carecloud/d-tasks.webp',
              alt: 'Task activity card: a ring at 80% done and the list of what remains, by type',
              label: 'The day in one number',
              text: 'The ring says how much is already done; the list next to it says what is left, by type. One glance, one decision.',
            },
          ],
        },
      },
      {
        kicker: '05 — The method',
        title: 'On-site with the people who use it',
        body: [
          'For four months I worked out of CareCloud’s Miami office, next to product, engineering and the clinical experts. That proximity was the point: healthcare software is full of rules you only learn by watching someone work — how a nurse rooms a patient, how a biller reads a code, what a doctor does in the ninety seconds between rooms.',
          'I ran interviews and usability tests with real clinicians, mapped their workflows, and built hi-fidelity prototypes we put in front of users before a line of the new front-end was written. We tested, I adjusted, in cycles — regulated healthcare leaves little room for guessing.',
        ],
        image: {
          src: '/cases/carecloud/metodo-en.svg',
          alt: 'Diagram of the method: observe up close, interview clinicians, map the workflows, hi-fi prototype and test with the users, in cycles; below, the twelve months of the project with the first four on-site in Miami',
          caption: 'Five steps in a loop, inside the client’s building: four months in Miami, the rest remote with the same team.',
        },
      },
      {
        kicker: '06 — Design → code',
        title: 'Designing hand-in-hand with the rebuild',
        body: [
          'Because the product was being rebuilt in React, design and engineering had to move together. I handed off hi-fi flows as the components took shape, defined the UI patterns the new interface would reuse, and sat with developers to resolve the gaps that only appear in real code — states, edge cases, the density a screenshot hides.',
          'Working this close to the build is the part I carried into everything since: design that ships, not design thrown over a wall.',
        ],
        image: {
          src: '/cases/carecloud/design-codigo-en.svg',
          alt: 'Two-lane diagram, design and engineering, with deliveries alternating between them: hi-fi flows, React components, UI patterns, screens assembled, fixes in real code and production',
          caption: 'Two lanes, each delivery pulling the next: design lands as the component is born, then goes back into the code to close what a screenshot never shows.',
        },
      },
      {
        kicker: '07 — Outcome',
        title: 'A legacy suite, redrawn for its next decade',
        body: [
          'Across roughly a year, the clinical product moved off Adobe Flex toward a modern React front-end, with the provider workspace — charting, prescribing, scheduling and billing — redesigned and validated with the clinicians who use it every day.',
          'It was my deepest immersion in regulated, workflow-heavy healthcare software, on a cross-functional team, inside the client’s own building — and the project that set the way I still work: research close to users, design close to code.',
        ],
      },
    ],
    outcomesLabel: 'Outcomes',
    outcomesTitle: 'What the work delivered',
    outcomes: [
      'A core clinical product moved off Adobe Flex toward React',
      'Provider workspace redesigned: charting, e-Prescribe, billing, scheduling',
      'Hi-fi flows validated with real doctors and clinical staff',
      'Four months on-site in Miami with stakeholders and users',
      'Design delivered alongside the engineering rebuild',
      'Reusable UI patterns for the new platform',
    ],
    stackLabel: 'Stack',
    stack: [
      'Sketch',
      'Axure',
      'Hi-fi prototyping',
      'Usability testing',
      'Design System',
      'React (target stack)',
      'Clinical UX',
    ],
    cta: {
      heading: 'Have a complex product that needs re-platforming?',
      sub: 'I design close to the users and close to the code — from research to a front-end that ships.',
      label: 'Get in touch',
    },
    ui: { back: 'Back to projects', visit: 'Visit the site' },
    seo: {
      title: 'CareCloud — Case Study · Wellington Mota',
      description:
        'Helping re-platform a clinical suite from Adobe Flex to React: on-site in Miami on a five-person UX team, hi-fi flows tested with real doctors, design delivered alongside the engineering rebuild.',
    },
  },
};

export default carecloud;
