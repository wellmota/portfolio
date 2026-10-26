import type { CaseStudy } from './types';

/** Tamanho real dos prints: site em 1600×895, app em 640×1390. */
const SITE = { width: 1600, height: 895 };
const PHONE = { width: 640, height: 1390 };

const vess: CaseStudy = {
  pt: {
    slug: 'vess',
    accent: '#d8b98a',
    kicker: 'Case Study — 2026',
    title: 'VESS Studio',
    subtitle:
      'Um estúdio premium de Pilates rodava num sistema alugado, com o nome de outra empresa dentro do app. Em doze semanas, sozinho, entreguei à VESS um sistema próprio, do site ao app aprovado na App Store, com as duas unidades e a cobrança no mesmo lugar.',
    cover: {
      src: '/cases/vess/site-hero.jpg',
      alt: 'Hero do site da VESS: "Pilates é presença, conexão, consistência" sobre foto do estúdio',
    },
    meta: [
      { label: 'Cliente', value: 'VESS Wellness Lab · Brasília' },
      { label: 'Ano', value: '2026' },
      { label: 'Papel', value: 'Product engineer, sozinho, da proposta às lojas' },
      { label: 'Plataformas', value: 'Web · iOS · Android · Admin' },
      { label: 'Prazo', value: '12 semanas de construção, com evolução contínua' },
    ],
    stats: [
      { value: '4', label: 'superfícies sobre os mesmos dados: site, app, admin e financeiro' },
      { value: '12', label: 'semanas de construção' },
      { value: '1', label: 'pessoa, da proposta comercial à aprovação na App Store' },
      { value: '2', label: 'unidades operando no mesmo painel' },
      { value: '5', label: 'papéis, da aluna às sócias, cada um com a sua visão' },
      { value: '0', label: 'taxa por aluna: o custo parou de crescer com a base' },
    ],
    intro: [
      'A VESS Wellness Lab tem dois estúdios de Pilates em Brasília e cuida de cada detalhe, da luz da sala à música da aula. O sistema não acompanhava. A aluna reservava num app datado, com o "powered by" de um fornecedor, e o estúdio pagava uma taxa que crescia a cada aluna nova, com os dados presos no SaaS.',
      'Fui contratado para trocar tudo por um sistema com a marca VESS de ponta a ponta. Fiz sozinho o trabalho de um time, da proposta comercial à aprovação na App Store, e cada tela que desenhei, eu mesmo programei. Foram doze semanas de construção. Hoje o sistema opera as duas unidades, com reservas e cobranças reais.',
    ],
    roleLabel: 'O que eu fiz',
    roleList: [
      'Proposta comercial',
      'Product discovery',
      'Requisitos e fluxos',
      'Direção de design',
      'Design system',
      'Site e área da aluna',
      'App iOS e Android',
      'Admin e financeiro',
      'Publicação nas lojas',
      'Orquestração de agentes de IA',
    ],
    sections: [
      {
        kicker: '01 — O problema',
        title: 'Uma marca premium com o nome de outra empresa no app',
        body: [
          'Quem treina na VESS paga por uma experiência cuidada. Na hora de reservar a aula, a aluna abria um app datado, com o "powered by" de outro fornecedor.',
          'Para as sócias, a conta também não fechava. A taxa do sistema crescia com cada aluna nova, e os dados do estúdio ficavam com o fornecedor. Elas queriam custo previsível e os dados nas próprias mãos.',
        ],
        image: {
          src: '/cases/vess/site-mid.jpg',
          alt: 'Site da VESS com navegação e foto do estúdio',
          caption: 'O site novo: o estúdio em primeiro plano e o botão Reservar sempre à vista.',
          ...SITE,
        },
      },
      {
        kicker: '02 — Decisão: validar antes de construir',
        title: 'As sócias aprovaram todas as telas antes da primeira linha de backend',
        body: [
          'Antes de qualquer tela, mapeei o negócio com as sócias: 92 requisitos e a jornada de cada um dos cinco papéis, da aluna às sócias.',
          'Na primeira sprint, prototipei todas as telas do MVP e validei com elas. Mudar uma regra no protótipo custa pouco. Depois do sistema construído, custa caro.',
          'As reuniões de ajuste viraram rotina e acompanharam o projeto até a migração da base de alunas do sistema antigo.',
        ],
        image: {
          src: '/cases/vess/site-modalidades.jpg',
          alt: 'Seção de modalidades do site da VESS',
          caption: 'As cinco modalidades no site, com a mesma tipografia e as mesmas cores do app.',
          ...SITE,
        },
      },
      {
        kicker: '03 — Decisão: um sistema só',
        title: 'Duas unidades no mesmo painel, cada uma com os seus dados',
        body: [
          'Site, app e admin leem os mesmos dados. A aula que a aluna reserva no celular aparece na agenda da recepção, e a cobrança sai do mesmo cadastro.',
          'A equipe inteira usa o mesmo admin, e cada papel vê o que lhe cabe. As sócias acompanham as duas unidades juntas. A aluna de uma unidade nunca enxerga os dados da outra, e essa regra fica no próprio banco de dados, longe de qualquer erro de tela.',
        ],
        image: {
          src: '/cases/vess/site-unidades.jpg',
          alt: 'Seção com as duas unidades da VESS em Brasília',
          caption: 'Asa Sul e Lago Sul no site. No admin, as duas unidades dividem o mesmo painel.',
          ...SITE,
        },
      },
      {
        kicker: '04 — Decisão: cobrança automática',
        title: 'A cobrança roda sozinha, e ninguém paga duas vezes',
        body: [
          'A aluna paga por PIX, boleto ou cartão recorrente. O sistema dá conta de assinaturas, pacotes, aulas avulsas e eventos, e emite a nota fiscal automaticamente.',
          'Quando o provedor de pagamento reenvia o mesmo aviso, a cobrança não se repete. Os dados do cartão nunca ficam no sistema, e o histórico de auditoria não pode ser apagado. A privacidade da aluna segue a LGPD, com exportação e exclusão de dados que funcionam de verdade.',
        ],
      },
      {
        kicker: '05 — O app',
        title: 'Da agenda ao check-in, a aluna resolve tudo pelo app',
        body: [
          'A aluna reserva a aula e já escolhe o lugar na sala. Se a turma lotou, entra na lista de espera. No estúdio, faz check-in pelo app. O plano e os pagamentos ficam a um toque, com login por biometria.',
          'Web e app andam juntos. Nenhuma funcionalidade fica pronta enquanto não funciona nos dois.',
          'A publicação também foi minha, do ícone à resposta ao review da Apple, até a aprovação.',
        ],
        gallery: [
          { src: '/cases/vess/app-05-boasvindas.jpg', alt: 'Tela de boas-vindas do app VESS', device: 'ios', ...PHONE },
          { src: '/cases/vess/app-01-inicio.jpg', alt: 'Home do app VESS', device: 'ios', ...PHONE },
          { src: '/cases/vess/app-02-agenda.jpg', alt: 'Agenda de aulas no app VESS', device: 'ios', ...PHONE },
          { src: '/cases/vess/app-03-reserva.jpg', alt: 'Reserva de aula no app VESS', device: 'ios', ...PHONE },
          { src: '/cases/vess/app-04-plano.jpg', alt: 'Plano e pagamentos no app VESS', device: 'ios', ...PHONE },
        ],
        galleryCaption: 'O caminho da aluna no app, da tela de entrada ao plano.',
      },
      {
        kicker: '06 — Resultado',
        title: 'No ar nas duas unidades, com reservas e cobranças reais',
        body: [
          'O sistema opera as duas unidades com agendamentos, cobranças recorrentes, notas fiscais e notificações. O custo deixou de crescer com o número de alunas, e os dados agora são do estúdio.',
          'A plataforma segue evoluindo em produção, com módulos novos como contratos de aceite digital e relatórios gerenciais. O roadmap continua comigo, do desenho ao deploy.',
        ],
      },
      {
        kicker: '07 — Como eu trabalhei',
        title: 'O trabalho de um time, com IA na produção e as decisões comigo',
        body: [
          'Da proposta comercial à loja, cada decisão de produto passou por mim. Usei agentes de IA para acelerar a construção, com a disciplina de um time de engenharia: requisitos escritos antes do código e as regras críticas testadas automaticamente antes de cada deploy.',
          'A IA deu velocidade, e o critério ficou comigo. Foi assim que um sistema inteiro, com app aprovado na App Store, saiu do papel em doze semanas.',
        ],
      },
    ],
    outcomesLabel: 'Resultado',
    outcomesTitle: 'O que mudou para o estúdio',
    outcomes: [
      'Um sistema próprio no lugar do SaaS alugado, sem taxa por aluna',
      'O app com a marca VESS publicado nas lojas',
      'As duas unidades no mesmo painel, cada uma com os seus dados protegidos',
      'Cobrança recorrente e nota fiscal saindo sozinhas, sem cobrança em dobro',
      'Os dados das alunas nas mãos do estúdio, em conformidade com a LGPD',
    ],
    stackLabel: 'Ferramentas',
    stack: ['TypeScript', 'Next.js', 'Expo / React Native', 'Supabase', 'Agentes de IA'],
    cta: {
      heading: 'Quer um produto inteiro, de ponta a ponta?',
      sub: 'Eu levo da primeira conversa ao app aprovado na loja, com design e código, em semanas.',
      label: 'Falar comigo',
    },
    ui: { back: 'Voltar aos projetos', visit: 'Visitar o site' },
    liveUrl: 'https://vess-studio.vercel.app/',
    seo: {
      title: 'VESS Studio — Case Study · Wellington Mota',
      description:
        'VESS Studio: sistema próprio para um estúdio premium de Pilates em Brasília, com site, app nas lojas, admin das duas unidades e cobrança automática. Feito sozinho, da proposta à App Store, em doze semanas.',
    },
  },

  en: {
    slug: 'vess',
    accent: '#d8b98a',
    kicker: 'Case Study — 2026',
    title: 'VESS Studio',
    subtitle:
      'A premium Pilates studio ran on rented software, with another company’s name inside its app. In twelve weeks, working solo, I gave VESS a system of its own, from the website to an app approved on the App Store, with both studios and billing in one place.',
    cover: {
      src: '/cases/vess/site-hero.jpg',
      alt: 'VESS website hero: "Pilates is presence, connection, consistency" over a studio photo',
    },
    meta: [
      { label: 'Client', value: 'VESS Wellness Lab · Brasília' },
      { label: 'Year', value: '2026' },
      { label: 'Role', value: 'Product engineer, solo, from proposal to stores' },
      { label: 'Platforms', value: 'Web · iOS · Android · Admin' },
      { label: 'Timeline', value: '12-week build, then ongoing evolution' },
    ],
    stats: [
      { value: '4', label: 'surfaces on the same data: website, app, admin and billing' },
      { value: '12', label: 'weeks of build' },
      { value: '1', label: 'person, from the commercial proposal to App Store approval' },
      { value: '2', label: 'studios running from one panel' },
      { value: '5', label: 'roles, from student to owner, each with its own view' },
      { value: '0', label: 'per-student fee: costs stopped growing with the student base' },
    ],
    intro: [
      'VESS Wellness Lab runs two Pilates studios in Brasília and cares about every detail, from the light in the room to the music in class. The software didn’t keep up. Students booked through a dated app with a vendor’s "powered by" on it, while the studio paid a fee that grew with every new student and its data stayed locked in the SaaS.',
      'I was hired to replace all of it with a system carrying the VESS brand end to end. I did a whole team’s work alone, from the commercial proposal to App Store approval, and every screen I designed I also coded. The build took twelve weeks. Today the system runs both studios with real bookings and real payments.',
    ],
    roleLabel: 'What I did',
    roleList: [
      'Commercial proposal',
      'Product discovery',
      'Requirements and flows',
      'Design direction',
      'Design system',
      'Website and student area',
      'iOS and Android app',
      'Admin and billing',
      'Store releases',
      'AI agent orchestration',
    ],
    sections: [
      {
        kicker: '01 — The problem',
        title: 'A premium brand with another company’s name in its app',
        body: [
          'People train at VESS for a carefully crafted experience. To book a class, though, students opened a dated app with another vendor’s "powered by" on it.',
          'For the owners, the numbers didn’t work either. The software fee grew with every new student, and the studio’s data stayed with the vendor. They wanted predictable costs and their data in their own hands.',
        ],
        image: {
          src: '/cases/vess/site-mid.jpg',
          alt: 'VESS website with navigation and a studio photo',
          caption: 'The new website: the studio up front and the booking button always in view.',
          ...SITE,
        },
      },
      {
        kicker: '02 — Decision: validate before building',
        title: 'The owners approved every screen before the first line of backend',
        body: [
          'Before any screen, I mapped the business with the owners: 92 requirements and the journey of each of the five roles, from student to owner.',
          'In the first sprint, I prototyped every MVP screen and validated it with them. Changing a rule in a prototype is cheap. Changing it once the system is built is expensive.',
          'Alignment meetings became routine and carried on through the project, up to migrating the student base from the old system.',
        ],
        image: {
          src: '/cases/vess/site-modalidades.jpg',
          alt: 'Class modalities section of the VESS website',
          caption: 'The five class types on the website, in the same typography and colors as the app.',
          ...SITE,
        },
      },
      {
        kicker: '03 — Decision: one system',
        title: 'Both studios in one panel, each with its own data',
        body: [
          'The website, the app and the admin read the same data. A class booked on a phone shows up on the front desk’s schedule, and billing runs off the same record.',
          'The whole team uses one admin, and each role sees what it needs. The owners follow both studios together. A student at one studio never sees the other’s data, and that rule lives in the database itself, out of reach of any interface bug.',
        ],
        image: {
          src: '/cases/vess/site-unidades.jpg',
          alt: 'Section listing the two VESS units in Brasília',
          caption: 'Asa Sul and Lago Sul on the website. In the admin, both studios share one panel.',
          ...SITE,
        },
      },
      {
        kicker: '04 — Decision: automatic billing',
        title: 'Billing runs on its own, and nobody pays twice',
        body: [
          'Students pay by PIX, boleto or recurring card. The system handles subscriptions, class packages, drop-ins and events, and issues the tax invoice automatically.',
          'When the payment provider sends the same notice twice, the charge does not repeat. Card data is never stored in the system, and the audit trail cannot be erased. Student privacy follows Brazil’s LGPD, with data export and deletion that actually work.',
        ],
      },
      {
        kicker: '05 — The app',
        title: 'From schedule to check-in, students handle it all in the app',
        body: [
          'A student books a class and picks her spot in the room right away. If the class is full, she joins the waitlist. At the studio, she checks in through the app. Her plan and payments are one tap away, with biometric login.',
          'Web and app move together. No feature is done until it works on both.',
          'I also owned the store release, from the icon to the reply to Apple’s review, through to approval.',
        ],
        gallery: [
          { src: '/cases/vess/app-05-boasvindas.jpg', alt: 'VESS app welcome screen', device: 'ios', ...PHONE },
          { src: '/cases/vess/app-01-inicio.jpg', alt: 'VESS app home', device: 'ios', ...PHONE },
          { src: '/cases/vess/app-02-agenda.jpg', alt: 'Class schedule in the VESS app', device: 'ios', ...PHONE },
          { src: '/cases/vess/app-03-reserva.jpg', alt: 'Class booking in the VESS app', device: 'ios', ...PHONE },
          { src: '/cases/vess/app-04-plano.jpg', alt: 'Plan and payments in the VESS app', device: 'ios', ...PHONE },
        ],
        galleryCaption: 'The student’s path through the app, from the welcome screen to her plan.',
      },
      {
        kicker: '06 — Outcome',
        title: 'Live at both studios, with real bookings and payments',
        body: [
          'The system runs both studios with bookings, recurring billing, tax invoices and notifications. Costs no longer grow with the number of students, and the data now belongs to the studio.',
          'The platform keeps evolving in production, with new modules such as contracts with digital acceptance and management reports. The roadmap stays with me, from design to deploy.',
        ],
      },
      {
        kicker: '07 — How I worked',
        title: 'A team’s work, with AI doing the build and the decisions staying with me',
        body: [
          'From the commercial proposal to the store, every product decision went through me. I used AI agents to speed up the build, with the discipline of an engineering team: requirements written before code, and critical rules tested automatically before every deploy.',
          'AI brought the speed, and the judgement stayed with me. That is how a whole system, with an app approved on the App Store, got off the ground in twelve weeks.',
        ],
      },
    ],
    outcomesLabel: 'Outcome',
    outcomesTitle: 'What changed for the studio',
    outcomes: [
      'A system of its own instead of rented SaaS, with no per-student fee',
      'The VESS-branded app published on the stores',
      'Both studios in one panel, each with its data protected',
      'Recurring billing and tax invoices that run on their own, with no double charges',
      'Student data in the studio’s hands, compliant with Brazil’s LGPD',
    ],
    stackLabel: 'Tools',
    stack: ['TypeScript', 'Next.js', 'Expo / React Native', 'Supabase', 'AI agents'],
    cta: {
      heading: 'Want a whole product, end to end?',
      sub: 'I take it from the first conversation to an app approved on the store, with design and code, in weeks.',
      label: 'Get in touch',
    },
    ui: { back: 'Back to projects', visit: 'Visit the site' },
    liveUrl: 'https://vess-studio.vercel.app/',
    seo: {
      title: 'VESS Studio — Case Study · Wellington Mota',
      description:
        'VESS Studio: an in-house system for a premium Pilates studio in Brasília, with a website, a store-published app, an admin for both studios and automatic billing. Built solo, from proposal to the App Store, in twelve weeks.',
    },
  },
};

export default vess;
