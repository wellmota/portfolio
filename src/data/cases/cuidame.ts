import type { CaseStudy } from './types';

const cuidame: CaseStudy = {
  pt: {
    slug: 'cuidame',
    accent: '#2FA98C',
    kicker: 'Case Study — 2026',
    title: 'CuidaMe',
    subtitle:
      'Um app de cuidado que estava travado havia dois anos. Cortei escopo, mudei o foco para a família e, em uma semana, entreguei workshop, redesign e o front-end inteiro pronto para beta. O cliente aprovou de primeira.',
    heroVideo: { src: '/cases/cuidame/cuidame-editorial.mp4', poster: '/cases/cuidame/cover-real.webp' },
    cover: {
      src: '/cases/cuidame/cover-real.webp',
      alt: 'Mockup do app CuidaMe: prontuário compartilhado da família em telas de celular',
    },
    meta: [
      { label: 'Cliente', value: 'Altevita · Clínica de cuidado' },
      { label: 'Ano', value: '2026' },
      { label: 'Papel', value: 'Product Designer & Design Engineer, solo' },
      { label: 'Plataforma', value: 'App mobile · iOS & Android' },
      { label: 'Contexto', value: 'Resgate de um projeto travado há 2 anos antes da minha entrada' },
    ],
    stats: [
      { value: '2 anos', label: 'travado antes da minha entrada' },
      { value: '1 semana', label: 'do workshop ao front-end pronto para beta' },
      { value: '1ª', label: 'versão do protótipo, aprovada de primeira' },
    ],
    intro: [
      'O CuidaMe é um app da Altevita para acompanhar o cuidado de pessoas. Nasceu como ferramenta de uma empresa de cuidado, com gestão de equipe, escalas e visita de cuidador no centro.',
      'Quando cheguei, o produto estava havia dois anos num vai e vem: fazia, não era o esperado, refazia. A relação com o cliente estava desgastada e o projeto caminhava para o cancelamento.',
    ],
    roleLabel: 'O que eu fiz',
    roleList: [
      'Resgate de projeto',
      'Workshop de mapeamento',
      'Redefinição de escopo',
      'UX research & fluxos',
      'Redesign de UI',
      'Protótipo navegável',
      'Design system',
      'Front-end em produção',
    ],
    sections: [
      {
        kicker: '01 — As telas',
        title: 'Telas que a família entende de primeira',
        body: [
          'Redesenhei a interface inteira para o novo público: linguagem simples, hierarquia clara e as ações do dia a dia a um toque. Um só prontuário, visto por todos que cuidam.',
        ],
        gallery: [
          { src: '/cases/cuidame/print-home.webp', alt: 'Início do app CuidaMe: card da Helena com rotina do dia, agenda e gastos', device: 'ios' },
          { src: '/cases/cuidame/print-perfil-helena.webp', alt: 'Resumo da Helena: remédios e cuidados feitos hoje, próximo compromisso e tratamento em curso', device: 'ios' },
          { src: '/cases/cuidame/print-agenda-detalhe.webp', alt: 'Evento na agenda do CuidaMe: retorno com a pediatra, local, descrição e lembretes', device: 'ios' },
          { src: '/cases/cuidame/print-remedios.webp', alt: 'Prescrição médica no app CuidaMe: remédios ativos organizados por horário', device: 'ios' },
          { src: '/cases/cuidame/print-chat.webp', alt: 'Chat da família no app CuidaMe entre a mãe e o pai da Helena', device: 'ios' },
          { src: '/cases/cuidame/print-gastos.webp', alt: 'Divisão de gastos estilo Tricount no app CuidaMe: quem pagou e o acerto do mês', device: 'ios' },
        ],
      },
      {
        kicker: '02 — O problema',
        title: 'Dois anos de vai e vem e uma relação para resetar',
        body: [
          'Antes da minha entrada, o projeto passou dois anos com outro time e travou por falta de detalhamento. Pedia-se uma coisa, entregava-se outra, refazia. O cliente estava frustrado, com razão.',
          'Então comecei pelo cliente, antes de qualquer tela. Ouvi onde doía, o que elas esperavam e o que já tinham desistido de pedir. O escopo precisava ficar claro antes de eu escrever código, e a entrega tinha que ir além do combinado para a confiança voltar.',
        ],
        image: {
          src: '/cases/cuidame/problema.svg',
          alt: 'Diagrama do ciclo de retrabalho: pedir, entregar fora do esperado, refazer',
          caption: 'Escopo sem detalhe vira retrabalho.',
        },
        galleryTitle: 'Antes: o app que eu herdei',
        galleryBadge: 'Antes',
        galleryCaption: 'O app publicado antes da minha entrada, dois anos de retrabalho depois: formulários de quinze campos, telas feitas de botões iguais, modal em cima de modal e uma aba “Mais” só com Sair e Excluir conta. Era isso que a cliente usava.',
        gallery: [
          { src: '/cases/cuidame/before-bw/old-add-paciente-1.webp', alt: 'App antigo: formulário de cadastro de paciente com seletor de nível de dependência solto no meio da tela' },
          { src: '/cases/cuidame/before-bw/old-add-cuidador.webp', alt: 'App antigo: formulário de cadastro de cuidador com sete campos obrigatórios e regras de senha' },
          { src: '/cases/cuidame/before-bw/old-paciente-julia.webp', alt: 'App antigo: tela do paciente com uma lista de oito botões iguais, sem hierarquia' },
          { src: '/cases/cuidame/before-bw/old-onboarding-detalhe.webp', alt: 'App antigo: modal de ajuda sobreposto por um toast de sucesso' },
          { src: '/cases/cuidame/before-bw/old-mais.webp', alt: 'App antigo: tela "Mais" só com Sair e Excluir conta em vermelho' },
        ],
      },
      {
        kicker: '03 — O método',
        title: 'Mapear tela a tela antes de prometer qualquer prazo',
        body: [
          'Antes de falar em prazo, conduzi um workshop de mapeamento com o cliente, tela a tela e fluxo a fluxo.',
          'Dali saiu um protótipo navegável que o cliente conseguia usar. Eles criticavam e eu ajustava, em ciclos, até fechar. Só então assumimos prazo, com o escopo claro para os dois lados.',
          'O protótipo já nasceu na stack final, em Expo. Antes de cada rodada com a cliente, eu passava as telas por heurísticas de usabilidade e boas práticas de UI, e o teste ficava para o que só o uso real mostra. O refino visual acontecia direto no código, no mesmo dia. Quando a cliente aprovou, o protótipo já era o produto.',
        ],
        image: {
          src: '/cases/cuidame/mapeamento.svg',
          alt: 'Mapa de telas e fluxos do CuidaMe montado no workshop',
          caption: 'Do workshop ao protótipo aprovado: heurísticas, teste com a cliente e refino direto na stack.',
        },
      },
      {
        kicker: '04 — A virada de produto',
        title: 'Um app menor, para a família',
        body: [
          'A direção mudou: em vez de um app novo, o atual simplificado. Nas palavras da cliente, o objetivo era tirar, e não acrescentar. O público também mudou, de ferramenta de empresa para uso familiar, em casa.',
          'O CuidaMe virou um prontuário compartilhado da família. Dois cenários guiaram tudo: irmãos dividindo o cuidado de pais idosos, e pais separados dividindo o cuidado dos filhos.',
          'Saíram as funcionalidades de empresa: gestão, escala, visita do cuidador, checagem de sinais vitais e evolução. Ficou o essencial da família: agenda de compromissos, prescrição de medicamentos e de cuidados, chat da família, anotação de enfermagem só para intercorrências e um canal para enviar comunicados e vídeos.',
          'E entrou uma peça nova: divisão de contas no estilo Tricount. Cada um lança o que gastou com o cuidado e o app calcula quem paga quem.',
        ],
        compare: {
          beforeLabel: 'Antes',
          afterLabel: 'Depois',
          heuristicLabel: 'Heurística',
          caption: 'À esquerda ou à direita de cada par, a tela publicada antes do resgate, em preto e branco. Ao lado, a tela redesenhada.',
          pairs: [
            {
              label: 'Perfil da pessoa',
              heuristic: 'Estética e design minimalista · reconhecimento em vez de memorização',
              body: [
                'A tela da pessoa era uma pilha de oito botões iguais, sem dizer o que importa hoje, e com jargão clínico no topo: “ND: Alto”.',
                'No redesign, a tela abre com o que a família precisa saber agora: 7 de 9 feitos no dia, o próximo compromisso e o tratamento em curso. As ações viraram acesso rápido com ícone e nome, e “ND: Alto” virou “Dependência baixa”, em linguagem de casa.',
              ],
              before: { src: '/cases/cuidame/before-bw/old-paciente-julia.webp', alt: 'App antigo: tela da pessoa como lista de oito botões iguais' },
              after: { src: '/cases/cuidame/print-perfil-helena.webp', alt: 'App novo: resumo da Helena com progresso do dia, próximo compromisso e tratamento' },
            },
            {
              label: 'Cadastro e ficha',
              heuristic: 'Prevenção de erros · flexibilidade e eficiência de uso',
              body: [
                'O cadastro era um formulário de quinze campos, com um seletor de nível de dependência solto no meio da tela e rótulos como “Digite o alergias”.',
                'A ficha virou um cartão de leitura: alergias em destaque vermelho, contato de emergência com botão de ligar, diagnóstico e cuidados especiais em frases curtas. O preenchimento ficou em passos, com o essencial primeiro.',
              ],
              before: { src: '/cases/cuidame/before-bw/old-add-paciente-1.webp', alt: 'App antigo: formulário de cadastro com seletor solto no meio da tela' },
              after: { src: '/cases/cuidame/print-detalhes-paciente.webp', alt: 'App novo: ficha de saúde com alergias em destaque e contato de emergência' },
            },
            {
              label: 'Prescrição',
              heuristic: 'Correspondência entre o sistema e o mundo real',
              body: [
                'A prescrição nascia num formulário técnico: relógio digital em 00:00, frequência “Nenhum”, recorrência, botão “Criar” desabilitado sem explicar por quê.',
                'Agora o remédio é um cartão que a família lê como lê uma receita: nome e dose, “a cada 8 horas”, horários do dia, período com “termina em 4 dias” e a observação da médica, incluindo o lembrete de levar o frasco na troca de casa.',
              ],
              before: { src: '/cases/cuidame/before-bw/old-prescricao-form.webp', alt: 'App antigo: formulário de criar prescrição com relógio em 00:00 e frequência “Nenhum”' },
              after: { src: '/cases/cuidame/print-remedio-detalhe.webp', alt: 'App novo: remédio como cartão com dose, horários, período e observações' },
            },
            {
              label: 'Divisão de gastos',
              heuristic: 'Visibilidade do status do sistema',
              body: [
                'Antes, o app dividia o total por um número de pessoas escolhido à mão, com botões de mais e menos, e não dizia quem devia a quem.',
                'Agora mostra quem pagou, quanto e a porcentagem de cada um, e calcula o acerto do mês no estilo Tricount: “Mariana repassa R$ 225,50 para Rafael”. Dividir o cuidado é também dividir a conta, sem planilha.',
              ],
              before: { src: '/cases/cuidame/before-bw/old-gastos.webp', alt: 'App antigo: divisão de gastos por valor fixo, sem acerto entre as pessoas' },
              after: { src: '/cases/cuidame/print-gastos.webp', alt: 'App novo: quem pagou, porcentagens e acerto do mês' },
            },
            {
              label: 'Primeiro acesso',
              heuristic: 'Consistência e padrões · estética',
              body: [
                'O primeiro acesso eram quatro slides com ilustração genérica e texto corrido para pular.',
                'O novo abre com a marca, uma frase e dois caminhos: “Já tenho uma conta” ou “Criar minha conta”. Menos para ler, nada para pular, e a identidade do CuidaMe desde a primeira tela.',
              ],
              before: { src: '/cases/cuidame/before-bw/old-apresentacao.webp', alt: 'App antigo: slides de apresentação com ilustração genérica' },
              after: { src: '/cases/cuidame/print-boas-vindas.webp', alt: 'App novo: tela de boas-vindas com dois caminhos' },
            },
            {
              label: 'Ajuda e modais',
              heuristic: 'Ajuda e documentação · controle e liberdade do usuário',
              body: [
                'A ajuda era um modal cobrindo a tela inteira, às vezes com um toast de sucesso por cima, e um botão “Mais” que só oferecia Sair e Excluir conta.',
                'No redesign, a ajuda foi para dentro da tela: hierarquia, rótulos claros e o acesso rápido no lugar certo. Nada para fechar antes de começar a usar.',
              ],
              before: { src: '/cases/cuidame/before-bw/old-onboarding-detalhe.webp', alt: 'App antigo: modal de ajuda sobreposto por um toast' },
              after: { src: '/cases/cuidame/print-home.webp', alt: 'App novo: início com card da pessoa e acesso rápido, sem modal' },
            },
          ],
        },
      },
      {
        kicker: '05 — Resultado',
        title: 'De quase cancelado a produto da Altevita',
        body: [
          'Em uma semana ficaram prontos o workshop de mapeamento, o redesign completo e o front-end inteiro, à disposição dos beta testers. Como fiz o trabalho direto no front, o que saía do design já ia para produção. O cliente aprovou de primeira, depois de dois anos sem conseguir fechar uma versão.',
          'O projeto que ia ser cancelado agora será comercializado pela Altevita como produto próprio, e abriu espaço para novos projetos juntos.',
        ],
        whatsapp: {
          caption: 'Grupo do projeto no WhatsApp, no dia da entrega do protótipo. Nomes parcialmente ocultos.',
          messages: [
            {
              firstName: 'Mariana',
              lastName: 'Ruback',
              initial: 'M',
              avatarBg: '#6b4f3a',
              nameColor: '#d9a773',
              time: '09:23',
              lines: ['Bom dia', 'Que noticia maravilhosa', 'Beatriz, ficarei no seu aguardo sobre a sua percepção do app'],
            },
            {
              firstName: 'Beatriz',
              lastName: 'Monção',
              initial: 'B',
              avatarBg: '#1f4a63',
              nameColor: '#53bdeb',
              time: '11:54',
              lines: [
                'Bom dia, Wellington! Jóia e você?',
                'Consegui dar uma olhada sim, achei que ficou bem completo e alinhado ao que a gente espera mesmo. Podemos agendar uma reunião sim.',
              ],
            },
            {
              firstName: 'Beatriz',
              lastName: 'Monção',
              initial: 'B',
              avatarBg: '#1f4a63',
              nameColor: '#53bdeb',
              time: '12:34',
              lines: ['Boa tarde! Pelo vídeo, não identifiquei nenhuma necessidade de ajuste'],
            },
          ],
        },
      },
    ],
    outcomesLabel: 'Resultados',
    outcomesTitle: 'O que mudou para o negócio',
    outcomes: [
      'De dois anos travado a protótipo aprovado de primeira',
      'Escopo simplificado: saíram as funcionalidades de empresa, ficou a família',
      'Novo módulo de divisão de contas no estilo Tricount',
      'De quase cancelado a produto que a Altevita vai comercializar',
    ],
    stackLabel: 'Stack',
    stack: [
      'Figma',
      'Protótipo navegável',
      'React',
      'React Native / Expo',
      'TypeScript',
      'NativeWind',
      'Design System',
    ],
    cta: {
      heading: 'Quer conversar sobre este projeto?',
      sub: 'Posso mostrar as decisões e o que está por trás de cada tela.',
      label: 'Falar comigo',
    },
    ui: { back: 'Voltar aos projetos', visit: 'Visitar o site' },
    seo: {
      title: 'CuidaMe: app de saúde resgatado e redesenhado em 7 dias | Wellington Mota',
      description:
        'Resgate e redesign de um app de cuidado travado por dois anos: em uma semana, workshop, redesign e o front-end inteiro prontos para beta, aprovados de primeira.',
    },
  },

  en: {
    slug: 'cuidame',
    accent: '#2FA98C',
    kicker: 'Case Study — 2026',
    title: 'CuidaMe',
    subtitle:
      'A care app that had been stuck for two years. I cut scope, moved the focus to families and, in one week, delivered the workshop, the redesign and the whole front end ready for beta. The client approved it on the first try.',
    heroVideo: { src: '/cases/cuidame/cuidame-editorial.mp4', poster: '/cases/cuidame/cover-real.webp' },
    cover: {
      src: '/cases/cuidame/cover-real.webp',
      alt: 'CuidaMe app mockup: a shared family care record across phone screens',
    },
    meta: [
      { label: 'Client', value: 'Altevita · Care clinic' },
      { label: 'Year', value: '2026' },
      { label: 'Role', value: 'Product Designer & Design Engineer, solo' },
      { label: 'Platform', value: 'Mobile app · iOS & Android' },
      { label: 'Context', value: 'Rescue of a project stuck for 2 years before I came in' },
    ],
    stats: [
      { value: '2 years', label: 'stuck before I came in' },
      { value: '1 week', label: 'from workshop to a front end ready for beta' },
      { value: '1st', label: 'prototype version, approved on the first try' },
    ],
    intro: [
      'CuidaMe is an Altevita app for following someone’s care. It began as a care-company tool, built around team management, shift scheduling and caregiver visits.',
      'By the time I came in, the product had spent two years in a loop: build it, it is not what they expected, build it again. The client relationship was worn down and the project was heading for cancellation.',
    ],
    roleLabel: 'What I did',
    roleList: [
      'Project rescue',
      'Mapping workshop',
      'Scope redefinition',
      'UX research & flows',
      'UI redesign',
      'Navigable prototype',
      'Design system',
      'Front end in production',
    ],
    sections: [
      {
        kicker: '01 — The screens',
        title: 'Screens a family understands the first time',
        body: [
          'I redesigned the whole interface for the new audience: plain language, clear hierarchy, and the everyday actions one tap away. One record, seen by everyone who cares.',
        ],
        gallery: [
          { src: '/cases/cuidame/print-home.webp', alt: 'CuidaMe home: Helena’s card with today’s routine, agenda and expenses', device: 'ios' },
          { src: '/cases/cuidame/print-perfil-helena.webp', alt: 'Helena’s summary: medications and care done today, next appointment and ongoing treatment', device: 'ios' },
          { src: '/cases/cuidame/print-agenda-detalhe.webp', alt: 'Agenda event in CuidaMe: pediatric follow-up with place, notes and reminders', device: 'ios' },
          { src: '/cases/cuidame/print-remedios.webp', alt: 'Medication prescriptions in CuidaMe: active medicines grouped by time of day', device: 'ios' },
          { src: '/cases/cuidame/print-chat.webp', alt: 'Family chat in CuidaMe between Helena’s mother and father', device: 'ios' },
          { src: '/cases/cuidame/print-gastos.webp', alt: 'Tricount-style expense splitting in CuidaMe: who paid and the monthly settlement', device: 'ios' },
        ],
      },
      {
        kicker: '02 — The problem',
        title: 'Two years of back-and-forth and a relationship to reset',
        body: [
          'Before I came in, the project had spent two years with another team and stalled for lack of detail. One thing was asked for, another was delivered, and it was redone. The client was frustrated, with good reason.',
          'So I started with the client, before any screen. I listened to where it hurt, what they expected and what they had given up asking for. The scope had to be clear before I wrote code, and the delivery had to go beyond what was agreed for the trust to come back.',
        ],
        image: {
          src: '/cases/cuidame/problema-en.svg',
          alt: 'Diagram of the rework loop: ask, deliver off-target, redo',
          caption: 'Scope without detail turns into rework.',
        },
        galleryTitle: 'Before: the app I inherited',
        galleryBadge: 'Before',
        galleryCaption: 'The app as published before I came in, two years of rework later: fifteen-field forms, screens made of identical buttons, modals on top of modals and a “More” tab with nothing but Sign out and Delete account. This is what the client was using.',
        gallery: [
          { src: '/cases/cuidame/before-bw/old-add-paciente-1.webp', alt: 'Old app: patient sign-up form with a dependency-level picker floating mid-screen' },
          { src: '/cases/cuidame/before-bw/old-add-cuidador.webp', alt: 'Old app: caregiver sign-up form with seven required fields and password rules' },
          { src: '/cases/cuidame/before-bw/old-paciente-julia.webp', alt: 'Old app: patient screen as a list of eight identical buttons with no hierarchy' },
          { src: '/cases/cuidame/before-bw/old-onboarding-detalhe.webp', alt: 'Old app: help modal covered by a success toast' },
          { src: '/cases/cuidame/before-bw/old-mais.webp', alt: 'Old app: "More" screen with only Sign out and Delete account in red' },
        ],
      },
      {
        kicker: '03 — The method',
        title: 'Map every screen before promising any deadline',
        body: [
          'Before talking about deadlines, I ran a mapping workshop with the client, screen by screen and flow by flow.',
          'Out of it came a navigable prototype the client could use. They critiqued and I adjusted, in cycles, until it was right. Only then did we commit to a timeline, with the scope clear to both sides.',
          'The prototype was built in the final stack from the start, in Expo. Before each round with the client I ran the screens through usability heuristics and UI best practices, and saved testing for what only real use reveals. Visual polish happened in the code, the same day. When the client approved it, the prototype was already the product.',
        ],
        image: {
          src: '/cases/cuidame/mapeamento-en.svg',
          alt: 'Map of CuidaMe screens and flows built in the workshop',
          caption: 'From workshop to approved prototype: heuristics, testing with the client and polish in the final stack.',
        },
      },
      {
        kicker: '04 — The product pivot',
        title: 'A smaller app, for families',
        body: [
          'The direction changed: the current app, simplified, instead of a new one. In the client’s words, the goal was to remove things and add nothing. The audience changed too, from a company tool to family use, at home.',
          'CuidaMe became a shared family care record. Two scenarios guided everything: siblings sharing the care of aging parents, and separated parents sharing the care of their children.',
          'Out went the company features: management, shift scheduling, caregiver visits, vital-sign checks and progress logs. What stayed was the family essentials: an appointments calendar, medication and care prescriptions, a family chat, nursing notes only for incidents, and a channel to send announcements and videos.',
          'And one new piece came in: expense splitting in the style of Tricount. Each person logs what they spent on care and the app works out who owes whom.',
        ],
        compare: {
          beforeLabel: 'Before',
          afterLabel: 'After',
          heuristicLabel: 'Heuristic',
          caption: 'On either side of each pair, the app as published before the rescue, in black and white. Next to it, the redesigned screen.',
          pairs: [
            {
              label: 'Person profile',
              heuristic: 'Aesthetic and minimalist design · recognition rather than recall',
              body: [
                'The person screen was a stack of eight identical buttons that said nothing about what matters today, topped by clinical jargon: “ND: Alto”.',
                'The redesign opens with what the family needs right now: 7 of 9 done today, the next appointment and the ongoing treatment. Actions became quick access with icon and name, and “ND: Alto” became “Low dependency”, in plain home language.',
              ],
              before: { src: '/cases/cuidame/before-bw/old-paciente-julia.webp', alt: 'Old app: person screen as a list of eight identical buttons' },
              after: { src: '/cases/cuidame/print-perfil-helena.webp', alt: 'New app: Helena’s summary with today’s progress, next appointment and treatment' },
            },
            {
              label: 'Sign-up and record',
              heuristic: 'Error prevention · flexibility and efficiency of use',
              body: [
                'Sign-up was a fifteen-field form, with a dependency-level picker floating mid-screen and labels like “Type the allergies”.',
                'The record became a reading card: allergies highlighted in red, an emergency contact with a call button, diagnosis and special care in short sentences. Data entry moved to steps, essentials first.',
              ],
              before: { src: '/cases/cuidame/before-bw/old-add-paciente-1.webp', alt: 'Old app: sign-up form with a picker floating mid-screen' },
              after: { src: '/cases/cuidame/print-detalhes-paciente.webp', alt: 'New app: health record with highlighted allergies and emergency contact' },
            },
            {
              label: 'Prescription',
              heuristic: 'Match between system and the real world',
              body: [
                'A prescription started in a technical form: a digital clock at 00:00, frequency “None”, recurrence, and a disabled “Create” button with no explanation.',
                'Now a medicine is a card the family reads like a prescription: name and dose, “every 8 hours”, times of day, a period with “ends in 4 days”, and the doctor’s note, including the reminder to pack the bottle for the custody swap.',
              ],
              before: { src: '/cases/cuidame/before-bw/old-prescricao-form.webp', alt: 'Old app: create-prescription form with a 00:00 clock and frequency “None”' },
              after: { src: '/cases/cuidame/print-remedio-detalhe.webp', alt: 'New app: medicine card with dose, times, period and notes' },
            },
            {
              label: 'Expense splitting',
              heuristic: 'Visibility of system status',
              body: [
                'Before, the app split the total by a hand-picked number of people, with plus and minus buttons, and never said who owed whom.',
                'Now it shows who paid, how much and each share, and works out the monthly settlement Tricount-style: “Mariana pays Rafael R$ 225.50”. Sharing care also means sharing the bill, without a spreadsheet.',
              ],
              before: { src: '/cases/cuidame/before-bw/old-gastos.webp', alt: 'Old app: expense split by flat amount, with no settlement between people' },
              after: { src: '/cases/cuidame/print-gastos.webp', alt: 'New app: who paid, percentages and the monthly settlement' },
            },
            {
              label: 'First launch',
              heuristic: 'Consistency and standards · aesthetics',
              body: [
                'First launch was four slides with stock illustration and running text to skip.',
                'The new one opens with the brand, one sentence and two paths: “I already have an account” or “Create my account”. Less to read, nothing to skip, and CuidaMe’s identity from the first screen.',
              ],
              before: { src: '/cases/cuidame/before-bw/old-apresentacao.webp', alt: 'Old app: intro slides with stock illustration' },
              after: { src: '/cases/cuidame/print-boas-vindas.webp', alt: 'New app: welcome screen with two paths' },
            },
            {
              label: 'Help and modals',
              heuristic: 'Help and documentation · user control and freedom',
              body: [
                'Help was a modal covering the whole screen, sometimes with a success toast on top, and a “More” tab that only offered Sign out and Delete account.',
                'In the redesign, help moved into the screen itself: hierarchy, clear labels and quick access where it belongs. Nothing to dismiss before you start using it.',
              ],
              before: { src: '/cases/cuidame/before-bw/old-onboarding-detalhe.webp', alt: 'Old app: help modal covered by a toast' },
              after: { src: '/cases/cuidame/print-home.webp', alt: 'New app: home with the person card and quick access, no modal' },
            },
          ],
        },
      },
      {
        kicker: '05 — Outcome',
        title: 'From nearly cancelled to an Altevita product',
        body: [
          'In one week the mapping workshop, the full redesign and the whole front end were done and ready for beta testers. Because I worked directly in the front end, what came out of design went straight to production. The client approved it on the first try, after two years without closing a version.',
          'The project that was about to be cancelled will now be sold by Altevita as a product of its own, and it opened the way to new projects together.',
        ],
        whatsapp: {
          caption: 'Project WhatsApp group on the day the prototype was delivered. Names partially hidden; messages kept in the original Portuguese.',
          messages: [
            {
              firstName: 'Mariana',
              lastName: 'Ruback',
              initial: 'M',
              avatarBg: '#6b4f3a',
              nameColor: '#d9a773',
              time: '09:23',
              lines: ['Bom dia', 'Que noticia maravilhosa', 'Beatriz, ficarei no seu aguardo sobre a sua percepção do app'],
            },
            {
              firstName: 'Beatriz',
              lastName: 'Monção',
              initial: 'B',
              avatarBg: '#1f4a63',
              nameColor: '#53bdeb',
              time: '11:54',
              lines: [
                'Bom dia, Wellington! Jóia e você?',
                'Consegui dar uma olhada sim, achei que ficou bem completo e alinhado ao que a gente espera mesmo. Podemos agendar uma reunião sim.',
              ],
            },
            {
              firstName: 'Beatriz',
              lastName: 'Monção',
              initial: 'B',
              avatarBg: '#1f4a63',
              nameColor: '#53bdeb',
              time: '12:34',
              lines: ['Boa tarde! Pelo vídeo, não identifiquei nenhuma necessidade de ajuste'],
            },
          ],
        },
      },
    ],
    outcomesLabel: 'Results',
    outcomesTitle: 'What changed for the business',
    outcomes: [
      'From two years stuck to a prototype approved on the first try',
      'Scope simplified: the company features went, the family stayed',
      'A new Tricount-style expense-splitting module',
      'From nearly cancelled to a product Altevita will sell',
    ],
    stackLabel: 'Stack',
    stack: [
      'Figma',
      'Navigable prototype',
      'React',
      'React Native / Expo',
      'TypeScript',
      'NativeWind',
      'Design System',
    ],
    cta: {
      heading: 'Want to talk about this project?',
      sub: 'I can walk you through the decisions and what is behind each screen.',
      label: 'Get in touch',
    },
    ui: { back: 'Back to projects', visit: 'Visit the site' },
    seo: {
      title: 'CuidaMe: health app rescued and redesigned in 7 days | Wellington Mota',
      description:
        'Rescue and redesign of a care app stuck for two years: in one week, workshop, redesign and the whole front end ready for beta, approved on the first try.',
    },
  },
};

export default cuidame;
