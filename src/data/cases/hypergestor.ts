import type { CaseStudy } from './types';

const hypergestor: CaseStudy = {
  pt: {
    slug: 'hypergestor',
    accent: '#F48220',
    kicker: 'Case Study — 2024–2026',
    title: 'HyperGestor',
    subtitle:
      'O HyperGestor, ERP com CRM agêntico para concessionárias, tinha crescido módulo a módulo, cada tela de um jeito. Sozinho, fiz a marca, o site e o redesenho do sistema, do Figma ao código em produção, para quem vende carro o dia inteiro dentro dele.',
    cover: {
      src: '/cases/hypergestor/erp/funil-de-vendas.webp',
      alt: 'Funil de vendas do HyperGestor: total de leads, atendimentos, qualificados e vendas, taxa de conversão, tempo até o primeiro atendimento e indicadores da loja',
    },
    liveUrl: 'https://www.hypergestor.com.br/',
    meta: [
      { label: 'Cliente', value: 'HyperGestor · Automotivo, Brasília' },
      { label: 'Período', value: 'Mar 2024 a Fev 2026' },
      { label: 'Papel', value: 'Sozinho, da marca ao front-end' },
      { label: 'Frentes', value: 'Marca · Site · ERP e CRM' },
      { label: 'Contexto', value: 'Concessionárias e locadoras, num sistema de uso diário e intenso' },
    ],
    stats: [
      { value: '3', label: 'frentes com uma linguagem só: marca, site e ERP' },
      { value: '1', label: 'pessoa da marca ao front-end em produção' },
      { value: '18', label: 'módulos do ERP sob a mesma navegação' },
      { value: '1 painel', label: 'para o lead inteiro, da conversa à proposta, sem sair da lista' },
      { value: 'IA', label: 'no fluxo do vendedor, sobre a lista e dentro do lead' },
      { value: 'No ar', label: 'o ERP novo em produção, no admin do HyperGestor' },
    ],
    intro: [
      'O HyperGestor reúne num sistema só o que uma concessionária usa no dia: leads, atendimento, WhatsApp com IA, estoque, campanhas e oficina. Foi criado por quem vive o setor, e o CEO também lidera inovação na Mitsubishi Motors. O produto era forte, mas a interface tinha crescido módulo a módulo, e cada tela pedia para ser aprendida de novo.',
      'Fiquei com a marca, o site e o ERP. Antes de qualquer módulo, desenhei os padrões que todos seguem. O lead passou a abrir num painel com a conversa e a IA dentro, e o front-end que escrevi roda em produção. O diferencial é uma pessoa só da marca ao código: a decisão de produto e a tela saem da mesma mão.',
    ],
    roleLabel: 'O que eu fiz',
    roleList: [
      'Identidade visual',
      'UX e front-end do site',
      'Arquitetura de informação do ERP',
      'Design system',
      'Product design do ERP e do CRM',
      'Experiência da IA no CRM',
      'Front-end em produção',
    ],
    sections: [
      {
        kicker: '01 — O problema',
        title: 'Quem vende carro passa o dia inteiro dentro do ERP',
        body: [
          'Numa concessionária, o lead chega pelo site, por um portal ou pelo WhatsApp. Passa pela qualificação, vai para um vendedor, vira test drive, proposta e venda, e depois volta como cliente da oficina. Cada etapa é um módulo, com filiais, departamentos, filtros e dezenas de colunas.',
          'O sistema anterior tinha crescido módulo a módulo, e cada tela resolvia as coisas do seu jeito. Para quem passa o dia ali, isso vira tempo perdido em todo atendimento. O negócio é complexo de verdade, então o trabalho era fazer a interface aguentar esse volume sem cansar quem usa.',
        ],
      },
      {
        kicker: '02 — Decisão: marca e site',
        title: 'Uma marca que funciona ao lado de uma tabela',
        body: [
          'A marca vive mais dentro do produto do que fora dele, quase sempre ao lado de telas cheias de dados. Por isso ficou enxuta: o laranja sobre preto, um símbolo simples e o nome em tipo condensado. Com a marca contida, a cor fica livre para o que importa no produto, como status e alertas.',
          'O site vende o ecossistema como um produto só e mostra o sistema por dentro. Tudo leva a uma ação: o teste grátis de 30 dias.',
        ],
        showcase: {
          url: 'hypergestor.com.br',
          items: [
            { src: '/cases/hypergestor/site/hero.webp', alt: 'Hero do site do HyperGestor: "O ecossistema inteligente para acelerar suas vendas"', label: 'Site', caption: 'A promessa no topo e uma ação principal, o teste grátis de 30 dias.' },
          ],
        },
      },
      {
        kicker: '03 — Decisão: design system do ERP',
        title: 'Desenhar o sistema antes de qualquer módulo',
        body: [
          'Com tantas telas, redesenhar uma por uma ia gerar outro ERP inconsistente. Comecei pelos padrões que todo módulo usa: o cabeçalho com título e descrição, os filtros em linha, o status com contagem, a tabela densa com ações por linha e o painel lateral. Quem aprende uma tela já sabe usar a próxima.',
          'O custo é dizer não a telas especiais. Quando um módulo pede algo novo, o padrão cresce para todos.',
        ],
        showcase: {
          url: 'hypergestor.com/admin',
          items: [
            { src: '/cases/hypergestor/erp/leads.webp', alt: 'Módulo de Leads: busca, filtros, pílulas de status e tabela densa com ações', label: 'Leads', meta: 'módulo principal', caption: 'O padrão que todo módulo repete: título e descrição, busca, filtros em linha, status com contagem e a tabela densa com ações por linha.' },
            { src: '/cases/hypergestor/erp/dashboard.webp', alt: 'Dashboard de performance: receita e margem por mês, veículos, serviços, peças, números de leads e últimas atualizações', label: 'Dashboard', meta: 'indicadores', caption: 'O dia da operação numa tela: receita e margem do mês, veículos, serviços e peças, os números de leads e o que a equipe acabou de fazer.' },
            { src: '/cases/hypergestor/erp/clientes.webp', alt: 'Módulo de Clientes com filtros por CPF/CNPJ, empresa e data', label: 'Clientes', size: 'half', caption: 'Os mesmos filtros e a mesma tabela para clientes, com o documento, a data da venda e o veículo de cada um.' },
            { src: '/cases/hypergestor/erp/veiculos-estoque.webp', alt: 'Estoque de veículos com indicadores por faixa de dias em estoque', label: 'Estoque', size: 'half', caption: 'O estoque separado por tempo de pátio, porque carro parado é dinheiro parado.' },
          ],
        },
      },
      {
        kicker: '04 — Decisão: CRM agêntico',
        title: 'O lead abre sobre a lista, com a conversa e a IA dentro',
        body: [
          'O vendedor atende vários leads ao mesmo tempo, e trocar de tela a cada um faz perder o fio. Então o lead abre num painel por cima da lista. A conversa do WhatsApp fica no centro, com qualificação, interesses, agendamentos e anotações em abas. As notas internas entram na própria conversa, marcadas como não visíveis ao cliente, e a equipe combina o próximo passo sem sair do atendimento.',
          'O HyperMax AI, o agente do CRM, segue a mesma regra: aparece onde o vendedor já está, sobre a lista e dentro do painel do lead. Um chat numa página à parte seria mais uma tela para lembrar de abrir.',
        ],
        showcase: {
          url: 'hypergestor.com/admin/leads',
          items: [
            { src: '/cases/hypergestor/whatsapp-screen.webp', alt: 'Painel lateral do lead com WhatsApp integrado, notas internas e abas de qualificação', label: 'Painel do lead', meta: 'WhatsApp', caption: 'A conversa no centro do painel, com as notas internas marcadas como não visíveis ao cliente.' },
            { src: '/cases/hypergestor/erp/leads-hypermax.webp', alt: 'HyperMax AI aberto sobre a lista de leads com ações rápidas', label: 'HyperMax AI', meta: 'agente', caption: 'O agente abre sobre a lista, com atalhos para o resumo dos leads, o desempenho das campanhas e dicas de venda.' },
            { src: '/cases/hypergestor/erp/leads-panel.webp', alt: 'Painel lateral do lead na versão em inglês: temperatura, cotação de crédito e proposta', label: 'Painel do lead', meta: 'EN', caption: 'No topo do painel ficam a temperatura do lead e as ações que levam à venda, como cotação de crédito e proposta. Aqui, na versão em inglês.' },
          ],
        },
      },
      {
        kicker: '05 — Decisão: o fluxo da concessionária',
        title: 'Filial e departamento no topo de toda tela',
        body: [
          'Um grupo de concessionárias tem várias lojas e departamentos. O gerente quer ver o grupo inteiro, e o vendedor só a loja dele. Por isso a filial e o departamento ficam no topo de todas as telas, e cada módulo parte dessa escolha.',
          'Dentro dessa moldura, cada equipe ganhou a visão do próprio trabalho: o funil para o vendedor, o retorno por canal para o marketing, as passagens para a recepção do showroom e os agendamentos por consultor para a oficina.',
        ],
        showcase: {
          url: 'hypergestor.com/admin',
          items: [
            { src: '/cases/hypergestor/erp/atendimento.webp', alt: 'Atendimento: pipeline em kanban com valores e próximo agendamento', label: 'Atendimento', meta: 'kanban', caption: 'O funil do vendedor em kanban, com o veículo de interesse, o valor e o próximo agendamento em cada cartão.' },
            { src: '/cases/hypergestor/erp/campanhas.webp', alt: 'Campanhas: investimento, leads, CPL, conversão e ROI', label: 'Campanhas', size: 'half', caption: 'Para o marketing, o retorno de cada campanha: investimento, leads, CPL e ROI por canal.' },
            { src: '/cases/hypergestor/erp/showroom.webp', alt: 'Showroom: passagens com vendedor, loja e origem', label: 'Showroom', size: 'half', caption: 'Para a recepção, quem passou pela loja, com quem falou e como chegou.' },
            { src: '/cases/hypergestor/erp/agenda.webp', alt: 'Agenda semanal do vendedor com as visões de dia, semana e mês', label: 'Agenda', size: 'half', caption: 'A agenda do vendedor, por dia, semana ou mês.' },
            { src: '/cases/hypergestor/erp/oficina-monitor-agendamentos.webp', alt: 'Oficina: monitor de agendamentos por consultor, com o status de cada cliente', label: 'Oficina', size: 'half', caption: 'Para a oficina, os agendamentos por consultor, com o status de cada cliente e arrastar para reorganizar.' },
          ],
        },
      },
      {
        kicker: '06 — Resultado',
        title: 'Em produção, com uma base que os próximos módulos herdam',
        body: [
          'O ERP redesenhado está em produção no admin do HyperGestor. Os módulos migram um a um sobre o mesmo sistema, sem obrigar as concessionárias a trocar tudo de uma vez. A variante para locadoras saiu da mesma base.',
          'Marca, site e ERP falam a mesma língua, e o CEO resumiu a entrega numa mensagem.',
        ],
        whatsapp: {
          caption: 'Mensagem do CEO ao receber a nova versão do ERP.',
          messages: [
            {
              firstName: 'Fernando',
              lastName: 'Cardoso',
              initial: 'F',
              avatarBg: '#7a4a1e',
              nameColor: '#f4a261',
              time: '17:42',
              lines: ['Cara, essa nova versão tá maravilhosa.', 'Parabéns — mandou muito bem!'],
            },
          ],
        },
      },
      {
        kicker: '07 — Como eu trabalhei',
        title: 'Uma pessoa da marca ao código, com o critério de produto junto',
        body: [
          'Fiz a marca, o site e o ERP, do Figma ao front-end em produção. Quando quem decide é quem constrói, um padrão novo vira componente e chega a todos os módulos sem passar por tradução entre equipes.',
          'No ERP, escolhi HTML, CSS e JavaScript puros para encaixar na plataforma que o cliente já tinha, sem reescrever o que funcionava. Nos módulos mais recentes, agentes de IA aceleraram a produção, e as decisões de produto continuaram comigo.',
        ],
      },
    ],
    outcomesLabel: 'Resultado',
    outcomesTitle: 'O que o HyperGestor ganhou',
    outcomes: [
      'Marca, site e ERP falando a mesma língua, feitos pela mesma pessoa',
      'Um sistema de padrões que todo módulo novo herda, para quem desenha e para quem usa',
      'O lead tratado num painel só, com WhatsApp, notas internas e IA no contexto',
      'Filial e departamento no topo de toda tela, do vendedor ao gerente do grupo',
      'O ERP novo em produção, com a variante para locadoras na mesma base',
    ],
    stackLabel: 'Ferramentas',
    stack: ['Figma', 'HTML, CSS e JavaScript', 'React e Tailwind', 'Agentes de IA'],
    cta: {
      heading: 'Tem um sistema grande que precisa de uma cara nova?',
      sub: 'Eu desenho os padrões, construo o front-end e troco o sistema módulo a módulo, com a operação rodando.',
      label: 'Falar comigo',
    },
    ui: { back: 'Voltar aos projetos', visit: 'Visitar o site' },
    seo: {
      title: 'HyperGestor — Case Study · Wellington Mota',
      description:
        'HyperGestor: marca, site e redesenho do ERP com CRM agêntico para concessionárias, por uma pessoa só. Padrões para todos os módulos e o lead num painel com WhatsApp e IA, em produção.',
    },
  },

  en: {
    slug: 'hypergestor',
    accent: '#F48220',
    kicker: 'Case Study — 2024–2026',
    title: 'HyperGestor',
    subtitle:
      'HyperGestor, an ERP with an agentic CRM for car dealerships, had grown module by module, every screen with its own logic. On my own, I did the brand, the website and the system redesign, from Figma to code in production, for people who sell cars inside it all day.',
    cover: {
      src: '/cases/hypergestor/erp/funil-de-vendas.webp',
      alt: 'HyperGestor sales funnel: total leads, sales calls, qualified leads and sales, conversion rate, time to first response and store indicators',
    },
    liveUrl: 'https://www.hypergestor.com.br/',
    meta: [
      { label: 'Client', value: 'HyperGestor · Automotive, Brasília' },
      { label: 'Period', value: 'Mar 2024 to Feb 2026' },
      { label: 'Role', value: 'Solo, from brand to front end' },
      { label: 'Scope', value: 'Brand · Website · ERP and CRM' },
      { label: 'Context', value: 'Dealerships and rental companies, in a system used all day, every day' },
    ],
    stats: [
      { value: '3', label: 'fronts with one language: brand, website and ERP' },
      { value: '1', label: 'person from brand to front end in production' },
      { value: '18', label: 'ERP modules under the same navigation' },
      { value: '1 panel', label: 'for the whole lead, from conversation to proposal, without leaving the list' },
      { value: 'AI', label: 'in the salesperson’s flow, over the list and inside the lead' },
      { value: 'Live', label: 'the new ERP in production, in the HyperGestor admin' },
    ],
    intro: [
      'HyperGestor brings together in one system what a dealership uses every day: leads, sales service, WhatsApp with AI, inventory, campaigns and the workshop. It was built by people who live the sector, and the CEO also leads innovation at Mitsubishi Motors. The product was strong, but the interface had grown module by module, and every screen had to be learned all over again.',
      'I took on the brand, the website and the ERP. Before touching any module, I designed the patterns they all follow. Each lead now opens in a panel with the conversation and the AI inside, and the front end I wrote runs in production. What sets this apart is one person from brand to code: the product decision and the screen come from the same hands.',
    ],
    roleLabel: 'What I did',
    roleList: [
      'Visual identity',
      'Website UX and front end',
      'ERP information architecture',
      'Design system',
      'Product design for the ERP and CRM',
      'AI experience in the CRM',
      'Front end in production',
    ],
    sections: [
      {
        kicker: '01 — The problem',
        title: 'People who sell cars spend the whole day inside the ERP',
        body: [
          'At a dealership, a lead comes in from the website, a listing portal or WhatsApp. It goes through qualification, reaches a salesperson, becomes a test drive, a proposal and a sale, and later comes back as a workshop customer. Every step is a module, with branches, departments, filters and dozens of columns.',
          'The previous system had grown module by module, and every screen solved things its own way. For someone who spends the day in it, that turns into lost time on every lead. The business really is complex, so the job was to make the interface carry that volume without wearing people out.',
        ],
      },
      {
        kicker: '02 — Decision: brand and website',
        title: 'A brand that works next to a table',
        body: [
          'The brand lives inside the product more than outside it, almost always next to screens full of data. So it stayed lean: orange on black, a simple symbol and the name in condensed type. With a restrained brand, color is free for what matters in the product, like status and alerts.',
          'The website sells the ecosystem as a single product and shows the system from the inside. Everything leads to one action: the 30-day free trial.',
        ],
        showcase: {
          url: 'hypergestor.com.br',
          items: [
            { src: '/cases/hypergestor/site/hero.webp', alt: 'HyperGestor website hero: "The intelligent ecosystem to accelerate your sales"', label: 'Website', caption: 'The promise up top and one main action, the 30-day free trial.' },
          ],
        },
      },
      {
        kicker: '03 — Decision: the ERP design system',
        title: 'Design the system before any module',
        body: [
          'With this many screens, redesigning them one by one would have produced another inconsistent ERP. I started with the patterns every module uses: the header with title and description, inline filters, status with counts, the dense table with per-row actions and the side panel. Whoever learns one screen already knows how to use the next.',
          'The cost is saying no to one-off screens. When a module needs something new, the pattern grows for all of them.',
        ],
        showcase: {
          url: 'hypergestor.com/admin',
          items: [
            { src: '/cases/hypergestor/erp/leads.webp', alt: 'Leads module: search, filters, status pills and a dense table with actions', label: 'Leads', meta: 'core module', caption: 'The pattern every module repeats: title and description, search, inline filters, status with counts and the dense table with per-row actions.' },
            { src: '/cases/hypergestor/erp/dashboard.webp', alt: 'Performance dashboard: monthly revenue and margin, vehicles, services, parts, lead numbers and latest updates', label: 'Dashboard', meta: 'indicators', caption: 'The day’s operation on one screen: the month’s revenue and margin, vehicles, services and parts, the lead numbers and what the team just did.' },
            { src: '/cases/hypergestor/erp/clientes.webp', alt: 'Clients module with filters by document, company and date', label: 'Clients', size: 'half', caption: 'The same filters and the same table for clients, with each one’s document, sale date and vehicle.' },
            { src: '/cases/hypergestor/erp/veiculos-estoque.webp', alt: 'Vehicle inventory with indicators by days in stock', label: 'Inventory', size: 'half', caption: 'Inventory split by days on the lot, because a car standing still is money standing still.' },
          ],
        },
      },
      {
        kicker: '04 — Decision: agentic CRM',
        title: 'The lead opens over the list, with the conversation and the AI inside',
        body: [
          'A salesperson handles several leads at once, and switching screens for each one breaks the thread. So the lead opens in a panel over the list. The WhatsApp conversation sits at the center, with qualification, interests, appointments and notes in tabs. Internal notes go into the conversation itself, marked as not visible to the customer, and the team agrees on the next step without leaving the chat.',
          'HyperMax AI, the CRM’s agent, follows the same rule: it shows up where the salesperson already is, over the list and inside the lead panel. A chat on a separate page would be one more screen to remember to open.',
        ],
        showcase: {
          url: 'hypergestor.com/admin/leads',
          items: [
            { src: '/cases/hypergestor/whatsapp-screen.webp', alt: 'Lead side panel with integrated WhatsApp, internal notes and qualification tabs', label: 'Lead panel', meta: 'WhatsApp', caption: 'The conversation at the center of the panel, with internal notes marked as not visible to the customer.' },
            { src: '/cases/hypergestor/erp/leads-hypermax.webp', alt: 'HyperMax AI open over the leads list with quick actions', label: 'HyperMax AI', meta: 'agent', caption: 'The agent opens over the list, with shortcuts to a lead summary, campaign performance and sales tips.' },
            { src: '/cases/hypergestor/erp/leads-panel.webp', alt: 'Lead side panel in the English version: temperature, credit quote and proposal', label: 'Lead panel', meta: 'EN', caption: 'The top of the panel holds the lead’s temperature and the actions that lead to a sale, like a credit quote and a proposal. Shown here in English.' },
          ],
        },
      },
      {
        kicker: '05 — Decision: the dealership flow',
        title: 'Branch and department at the top of every screen',
        body: [
          'A dealership group has several stores and departments. The manager wants to see the whole group, and the salesperson only their own store. So branch and department sit at the top of every screen, and each module starts from that choice.',
          'Within that frame, each team got a view of its own work: the funnel for sales, return per channel for marketing, walk-ins for the showroom front desk and appointments per advisor for the workshop.',
        ],
        showcase: {
          url: 'hypergestor.com/admin',
          items: [
            { src: '/cases/hypergestor/erp/atendimento.webp', alt: 'Service pipeline: kanban with values and next appointment', label: 'Service pipeline', meta: 'kanban', caption: 'The salesperson’s funnel as a kanban, with the vehicle of interest, the value and the next appointment on every card.' },
            { src: '/cases/hypergestor/erp/campanhas.webp', alt: 'Campaigns: spend, leads, CPL, conversion and ROI', label: 'Campaigns', size: 'half', caption: 'For marketing, the return on each campaign: spend, leads, CPL and ROI per channel.' },
            { src: '/cases/hypergestor/erp/showroom.webp', alt: 'Showroom: walk-ins with salesperson, store and source', label: 'Showroom', size: 'half', caption: 'For the front desk, who walked into the store, who they talked to and how they found it.' },
            { src: '/cases/hypergestor/erp/agenda.webp', alt: 'The salesperson’s weekly schedule with day, week and month views', label: 'Schedule', size: 'half', caption: 'The salesperson’s schedule, by day, week or month.' },
            { src: '/cases/hypergestor/erp/oficina-monitor-agendamentos.webp', alt: 'Workshop: appointment monitor by service advisor, with each customer’s status', label: 'Workshop', size: 'half', caption: 'For the workshop, appointments per service advisor, with each customer’s status and drag to reorganize.' },
          ],
        },
      },
      {
        kicker: '06 — Outcome',
        title: 'In production, with a base the next modules inherit',
        body: [
          'The redesigned ERP is in production in the HyperGestor admin. Modules move over one at a time on the same system, so dealerships never have to switch everything at once. The rental-company variant came from the same base.',
          'Brand, website and ERP speak the same language, and the CEO summed up the delivery in one message.',
        ],
        whatsapp: {
          caption: 'Message from the CEO on receiving the new version of the ERP (kept in the original Portuguese).',
          messages: [
            {
              firstName: 'Fernando',
              lastName: 'Cardoso',
              initial: 'F',
              avatarBg: '#7a4a1e',
              nameColor: '#f4a261',
              time: '17:42',
              lines: ['Cara, essa nova versão tá maravilhosa.', 'Parabéns — mandou muito bem!'],
            },
          ],
        },
      },
      {
        kicker: '07 — How I worked',
        title: 'One person from brand to code, with product judgement along the way',
        body: [
          'I did the brand, the website and the ERP, from Figma to the front end in production. When the person who decides is the person who builds, a new pattern becomes a component and reaches every module without getting lost between teams.',
          'For the ERP, I chose plain HTML, CSS and JavaScript to fit the platform the client already had, without rewriting what worked. On the most recent modules, AI agents sped up production, and the product decisions stayed with me.',
        ],
      },
    ],
    outcomesLabel: 'Outcome',
    outcomesTitle: 'What HyperGestor gained',
    outcomes: [
      'Brand, website and ERP speaking the same language, made by the same person',
      'A pattern system every new module inherits, for the people who design it and the people who use it',
      'Each lead handled in one panel, with WhatsApp, internal notes and AI in context',
      'Branch and department at the top of every screen, from salesperson to group manager',
      'The new ERP in production, with the rental-company variant on the same base',
    ],
    stackLabel: 'Tools',
    stack: ['Figma', 'HTML, CSS and JavaScript', 'React and Tailwind', 'AI agents'],
    cta: {
      heading: 'Got a large system that needs a new face?',
      sub: 'I design the patterns, build the front end and replace the system module by module, while the operation keeps running.',
      label: 'Get in touch',
    },
    ui: { back: 'Back to projects', visit: 'Visit the site' },
    seo: {
      title: 'HyperGestor — Case Study · Wellington Mota',
      description:
        'HyperGestor: brand, website and the redesign of an ERP with an agentic CRM for car dealerships, by one person. Patterns for every module and each lead in one panel with WhatsApp and AI, in production.',
    },
  },
};

export default hypergestor;
