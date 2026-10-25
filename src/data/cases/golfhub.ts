import type { CaseStudy, PrototypeEmbed } from './types';

const B = '/cases/golfhub';
const APP = `${B}/app`;
// tamanhos reais dos arquivos (evitam que a página pule enquanto as imagens lazy carregam)
const PHONE = { width: 1000, height: 2164 };
const WIDE = { width: 1600, height: 1000 };

const prototypePt: PrototypeEmbed = {
  src: `${APP}/index.html`,
  title: 'Protótipo navegável do app GolfHub',
  screensLabel: 'Ir direto para',
  screens: [
    { label: 'Entrar', href: `${APP}/index.html` },
    { label: 'Início', href: `${APP}/home.html` },
    { label: 'Buraco 2', href: `${APP}/performance.html`, meta: '3D' },
    { label: 'Voo pelo Campo A', href: `${APP}/performance.html?tour=1&campo=a`, meta: '3D' },
    { label: 'Cartão da rodada', href: `${APP}/cartao.html?demo=full` },
    { label: 'Resumo da rodada', href: `${APP}/resumo.html`, meta: '3D' },
    { label: 'Reservar horário', href: `${APP}/reservar.html?campo=a` },
    { label: 'Voucher e check-in', href: `${APP}/reservas.html` },
    { label: 'Ranking do mês', href: `${APP}/ranking.html` },
    { label: 'Descobrir', href: `${APP}/descobrir.html` },
    { label: 'Aulas', href: `${APP}/aulas.html` },
    { label: 'Torneios e eventos', href: `${APP}/torneios.html` },
    { label: 'Loja e aluguel', href: `${APP}/loja.html` },
    { label: 'Avisos', href: `${APP}/avisos.html` },
    { label: 'Assinatura', href: `${APP}/assinatura.html` },
    { label: 'Perfil e carteirinha', href: `${APP}/perfil.html` },
  ],
  hint: 'Use como num celular: reserve um horário, pague com Pix e jogue uma rodada. No buraco, arraste para girar. Os dados são fictícios e ficam só no seu navegador.',
  openLabel: 'Abrir em tela cheia',
  resetLabel: 'Recomeçar do zero',
  storagePrefix: 'gh:',
  autoplay: { pause: 'Pausar tour', resume: 'Retomar tour' },
};

const prototypeEn: PrototypeEmbed = {
  ...prototypePt,
  title: 'Interactive prototype of the GolfHub app',
  screensLabel: 'Jump to',
  screens: [
    { label: 'Sign in', href: `${APP}/index.html` },
    { label: 'Home', href: `${APP}/home.html` },
    { label: 'Hole 2', href: `${APP}/performance.html`, meta: '3D' },
    { label: 'Fly over Campo A', href: `${APP}/performance.html?tour=1&campo=a`, meta: '3D' },
    { label: 'Scorecard', href: `${APP}/cartao.html?demo=full` },
    { label: 'Round summary', href: `${APP}/resumo.html`, meta: '3D' },
    { label: 'Book a tee time', href: `${APP}/reservar.html?campo=a` },
    { label: 'Voucher and check-in', href: `${APP}/reservas.html` },
    { label: 'Monthly ranking', href: `${APP}/ranking.html` },
    { label: 'Discover', href: `${APP}/descobrir.html` },
    { label: 'Lessons', href: `${APP}/aulas.html` },
    { label: 'Tournaments and events', href: `${APP}/torneios.html` },
    { label: 'Shop and rentals', href: `${APP}/loja.html` },
    { label: 'Notifications', href: `${APP}/avisos.html` },
    { label: 'Membership', href: `${APP}/assinatura.html` },
    { label: 'Profile and member card', href: `${APP}/perfil.html` },
  ],
  hint: 'Use it like a phone: book a tee time, pay with Pix and play a round. On the hole, drag to turn it. The data is fictional and stays in your browser. The interface is in Portuguese, as it was for the club.',
  openLabel: 'Open full screen',
  resetLabel: 'Start over',
  autoplay: { pause: 'Pause tour', resume: 'Resume tour' },
};

const golfhub: CaseStudy = {
  pt: {
    slug: 'golfhub',
    accent: '#38EB7F',
    kicker: 'Case Study — GolfHub',
    title: 'GolfHub',
    subtitle:
      'Uma proposta para um clube de golfe parou em quatro telas no Figma. Ela virou um produto que se usa: o app do sócio e o ERP do clube, 21 telas navegáveis e um campo de golfe em 3D que se gira com o dedo.',
    cover: {
      src: `${B}/cover.webp`,
      alt: 'Três telas do app GolfHub sobre fundo verde com grão: a home Olá, Pedro com a foto do Campo A, o buraco 2 em 3D com o avatar do jogador e os anéis de distância, e o resumo da rodada com a bola chegando ao buraco',
    },
    meta: [
      { label: 'Cliente', value: 'Clube de Golfe de Brasília (proposta)' },
      { label: 'Ano', value: 'Proposta em 2023 · protótipo em 2026' },
      { label: 'Papel', value: 'Sozinho, da proposta ao código' },
      { label: 'Entrega', value: 'App do sócio e ERP do clube, navegáveis no navegador' },
      { label: 'Plataformas', value: 'App no celular · ERP no desktop' },
    ],
    stats: [
      { value: '21', label: 'telas navegáveis, a partir de 4 no Figma' },
      { value: '16', label: 'módulos da proposta, cada um com lugar no app ou no ERP' },
      { value: '1', label: 'pessoa da proposta ao código, com IA na produção' },
      { value: '2', label: 'produtos, app e ERP, sobre os mesmos dados' },
      { value: '18', label: 'buracos em 3D, gerados em código' },
      { value: '3', label: 'formas de pagar: cartão, Pix ou na mensalidade' },
    ],
    intro: [
      'Em 2023 propus ao Clube de Golfe de Brasília dois produtos: um app para o sócio reservar, pagar e acompanhar o próprio jogo, e um ERP para a equipe enxergar o dia do clube. A proposta parou em quatro telas no Figma. E quatro telas não mostram como é reservar um horário, pagar e jogar uma rodada.',
      'Em 2026 transformei a proposta em algo que se usa. Deduzi as telas que faltavam a partir das regras do clube, mantive a identidade original e fiz do mapa estático do buraco uma cena 3D. É o que eu entrego: produto pensado, desenhado e funcionando, em dias.',
    ],
    roleLabel: 'O que eu fiz',
    roleList: [
      'Estratégia de produto',
      'Product design',
      'UI e interação',
      'UX writing',
      'Front-end',
      '3D em three.js',
      'Orquestração de agentes de IA',
    ],
    sections: [
      {
        kicker: '01 — O problema',
        title: 'Quatro telas não vendem um clube',
        body: [
          'Eram dois públicos. A gestão precisava acompanhar reservas, sócios e caixa num lugar só. O sócio queria reservar, pagar e ver a evolução do próprio jogo pelo celular.',
          'O Figma tinha a home, o mapa do buraco, a assinatura e o dashboard. Faltava o que convence: ver o fluxo inteiro funcionando, da reserva ao resumo da rodada.',
        ],
        image: {
          src: `${B}/overview.webp`,
          alt: 'Os dois produtos no protótipo: o dashboard do ERP numa janela de navegador, com sócios ativos, reservas, ocupação e aniversariantes, e o app no iPhone, com a home Olá, Pedro e o cartão do Campo A',
          caption: 'Os dois produtos da proposta, já funcionando: o ERP da gestão e o app do sócio.',
          ...WIDE,
        },
      },
      {
        kicker: '02 — O protótipo',
        title: 'Experimente antes de ler',
        body: [
          'São 17 telas do app, e o que você faz fica salvo. Reserve um horário e ele vira um voucher. Jogue uma rodada e o cartão fecha a conta sozinho. Se preferir, deixe o tour passar pelas telas.',
        ],
        prototype: prototypePt,
      },
      {
        kicker: '03 — Decisão: o escopo',
        title: 'As telas que faltavam saíram das regras do clube',
        body: [
          'Não inventei funcionalidade. O escopo veio do que a proposta já prometia: a barra de abas, o menu e os 16 módulos do deck. Cada tela nova começou em wireframe, com a regra de negócio resolvida antes da cor. Sócio não paga green fee, convidado paga. A reserva pode ir para a mensalidade, porque o sócio já tem conta no clube. O check-in sai do próprio voucher.',
        ],
        compare: {
          beforeLabel: 'Wireframe',
          afterLabel: 'Protótipo',
          heuristicLabel: 'Decisão',
          pairs: [
            {
              label: 'A home',
              heuristic: 'Uma ação principal',
              body: [
                'Primeiro, a hierarquia: quem é o sócio, onde ele joga, quando é a próxima saída e um botão só, Começar rodada.',
                'No acabamento, o cartão do campo mostra quem está jogando agora e abre um voo pelo campo em 3D.',
              ],
              before: { src: `${B}/wire/home.webp`, alt: 'Wireframe da home: saudação, cartão do campo com a foto como caixa, próxima saída, botão Começar rodada e a barra de abas', ...PHONE },
              after: { src: `${B}/screens/home.webp`, alt: 'Home no protótipo: Olá, Pedro, cartão do Campo A com 18 buracos e par 72, quem está jogando, a próxima saída reservada e a barra de abas com rótulos', ...PHONE },
            },
            {
              label: 'O buraco',
              heuristic: 'O dado que o golfista usa',
              body: [
                'No tee, o golfista quer três coisas: quanto falta até a bandeira, o vento e onde a bola caiu.',
                'É a tela mais aberta durante a rodada, por isso ganhou o 3D. Tudo em metros, com o drive desenhado sobre o fairway.',
              ],
              before: { src: `${B}/wire/performance.webp`, alt: 'Wireframe do buraco: o mapa como uma caixa grande, o clima numa coluna lateral, o botão Anotar buraco e a barra do jogador', ...PHONE },
              after: { src: `${B}/screens/performance.webp`, alt: 'Buraco 2 em 3D no protótipo: o avatar do jogador, anéis de distância, o arco do drive, 125 m até a bandeira, clima com vento e o botão Anotar buraco 2', ...PHONE },
            },
            {
              label: 'A assinatura',
              heuristic: 'Prevenir o erro',
              body: [
                'Pagamento é onde um erro custa caro. A estrutura põe o cartão, o plano, a próxima cobrança e os recibos à vista.',
                'O formulário de cartão valida número, validade e CVV enquanto você digita, e cada recibo abre o comprovante.',
              ],
              before: { src: `${B}/wire/assinatura.webp`, alt: 'Wireframe de Minha assinatura: o cartão como uma caixa, o bloco do plano, as abas e a lista de recibos', ...PHONE },
              after: { src: `${B}/screens/assinatura.webp`, alt: 'Minha assinatura no protótipo: cartão Visa com a validade e o selo Padrão, o plano de sócio titular com a próxima cobrança e os recibos de R$ 300,00 agrupados por ano', ...PHONE },
            },
            {
              label: 'O dashboard do ERP',
              heuristic: 'Número com contexto',
              wide: true,
              body: [
                'Um número sozinho não diz se o dia vai bem. No wireframe, cada indicador já tinha lugar para uma referência ao lado.',
                'No protótipo: reservas contra a previsão, ocupação por turno e receita contra a meta. Os aniversariantes vêm com a ação de mandar parabéns.',
              ],
              before: { src: `${B}/wire/erp-dashboard.webp`, alt: 'Wireframe do dashboard do ERP: menu lateral, quatro indicadores no topo, o medidor de reservas, a ocupação, o balanço e a lista de aniversariantes', ...WIDE },
              after: { src: `${B}/erp-shots/erp-dashboard.webp`, alt: 'Dashboard do ERP no protótipo: sócios ativos, reservas hoje, aluguéis e inadimplência, reservas do mês contra a previsão, ocupação de hoje por turno, balanço de receita e meta, aniversariantes com ações e metas do ano', ...WIDE },
            },
          ],
        },
      },
      {
        kicker: '04 — Decisão: a identidade',
        title: 'Completar a marca, não reinventar',
        body: [
          'A proposta já tinha uma cara: Inter, grafite, índigo, violeta e o verde do clube. Mantive tudo e completei o que faltava, como estados, contraste e um só conjunto de ícones. Os 16 módulos do deck ganharam endereço no app, no ERP ou nos dois.',
        ],
        details: {
          items: [
            {
              src: `${B}/d-palette.webp`,
              alt: 'Paleta do GolfHub: grafite #303030, violeta #771AA3, índigo #4A3AFF, o gradiente verde da bola e o verde do clube #106F36, sobre as escalas de verde, violeta, índigo e tinta e quatro cores de estado',
              label: 'As cores da proposta',
              text: 'As mesmas cores do arquivo, agora como tokens. Grafite para agir, violeta para destacar, índigo para seleção e o verde da bola na aba ativa.',
            },
            {
              src: `${B}/d-type.webp`,
              alt: 'Escala em Inter da saudação Olá, Pedro ao rótulo em caixa-alta, com 84, +12 e 12,4 num cartão grafite e o logotipo GolfHub em DM Sans',
              label: 'Inter, do título ao placar',
              text: 'Uma fonte para tudo, com os números da rodada em destaque. O DM Sans fica só no logotipo.',
            },
            {
              src: `${B}/d-icons.webp`,
              alt: '24 ícones Iconsax Linear do app, a barra de abas com a bola verde sobre Início e cinco ícones em Linear e em Bold',
              label: 'Um só traço de ícone',
              text: 'Iconsax Linear em todas as telas. A barra de abas, que só tinha ícones, ganhou rótulos.',
            },
            {
              src: `${B}/d-modules.webp`,
              alt: 'Os 16 módulos da proposta como cartões, cada um com ícone e a etiqueta de onde vive: App, ERP ou App + ERP',
              label: 'Os 16 módulos com endereço',
              text: 'Cada módulo do deck agora aponta para onde mora: no app do sócio, no ERP da gestão ou nos dois.',
            },
            {
              src: `${B}/d-hole.webp`,
              alt: 'Plantas vistas de cima dos 18 buracos do Campo A, geradas pelo mesmo código do 3D e na mesma escala, com fairway, green, bunkers, água e árvores, numeradas com o par',
              label: 'Um campo inteiro em código',
              text: 'Os 18 buracos saem do mesmo código que monta o 3D. Cada um nasce de poucos dados, como par, distância e traçado.',
            },
            {
              src: `${B}/d-states.webp`,
              alt: 'Estados: botão grafite padrão, pressionado, inativo e com foco; horários livre, com vagas, lotado e escolhido; seleção de tee; chips de buraco; interruptor; marcas de eagle a duplo bogey; etiquetas de status',
              label: 'Os estados que faltavam',
              text: 'O arquivo mostrava cada componente de um jeito só. O protótipo tem padrão, selecionado, cheio, inativo e foco visível.',
            },
          ],
        },
      },
      {
        kicker: '05 — Decisão: onde investir',
        title: 'O 3D foi para a tela que o sócio abre no tee',
        body: [
          'Se era para concentrar esforço em um lugar, era no buraco. É a tela que acompanha o sócio a rodada inteira e a que mais diferencia o produto de um sistema de reservas comum. O mapa estático virou um campo que se gira, aproxima e mira com o dedo.',
          'O 3D tem custo, e ele foi pensado. Em aparelho sem suporte, volta o mapa plano. Com movimento reduzido ligado, a câmera não voa.',
        ],
        gallery: [
          { src: `${B}/screens/performance-tour.webp`, alt: 'Tour 3D do Campo A no buraco 4, par 5 de 492 m: fairway em curva entre árvores e um riacho, com o cartão do buraco e o botão Reservar horário', device: 'ios', ...PHONE },
          { src: `${B}/screens/performance-par3.webp`, alt: 'Prévia do buraco 3, par 3 de 158 m: a linha da tacada sai do tee e passa por cima de um lago até o green', device: 'ios', ...PHONE },
          { src: `${B}/screens/resumo-voo.webp`, alt: 'Resumo da rodada: green em 3D com a bandeira e a bola a centímetros do buraco, sobre os números 84 tacadas, +12, 72 net e 36 pontos', device: 'ios', ...PHONE },
        ],
        galleryCaption: 'O voo pelo Campo A, o par 3 por cima do lago e a bola caindo no buraco no fim da rodada.',
      },
      {
        kicker: '06 — A rodada',
        title: 'Anotar um buraco em poucos toques',
        body: [
          'Ninguém quer digitar no meio do jogo. A rodada começa com três escolhas: campo, tee de saída e 9 ou 18 buracos. Depois, cada buraco se anota com tacadas, putts e fairway. O cartão usa a notação que o golfista já conhece, e o resumo mostra o que importa: o resultado contra o par, o net e os pontos. Se a rodada for interrompida, ela continua de onde parou.',
        ],
        gallery: [
          { src: `${B}/screens/rodada.webp`, alt: 'Nova rodada: Campo A selecionado, tee branco de 6.425 m, 18 buracos e o botão Ir para o tee 1', device: 'ios', ...PHONE },
          { src: `${B}/screens/rodada-andamento.webp`, alt: 'Nova rodada com o aviso Rodada em andamento no buraco 2 do Campo A e os botões Continuar e Descartar', device: 'ios', ...PHONE },
          { src: `${B}/screens/cartao.webp`, alt: 'Cartão do Campo A para Pedro, Caio e Lucas: birdies em círculo, bogeys em quadrado e o total de 84 tacadas, +12 e 32 putts', device: 'ios', ...PHONE },
          { src: `${B}/screens/resumo.webp`, alt: 'Resumo: Boa rodada, Pedro!, com 84 tacadas, +12, 72 net e 36 pontos, e os cartões de putts, melhor buraco, fairways e greens', device: 'ios', ...PHONE },
        ],
      },
      {
        kicker: '07 — Reservar e pagar',
        title: 'Do horário reservado ao check-in, pelo celular',
        body: [
          'A grade mostra quanto cada horário já está cheio antes de você escolher. O preço segue a regra do clube: sócio não paga green fee, convidado paga, e o carrinho entra na mesma conta. Dá para pagar com cartão, Pix ou na mensalidade. A reserva vira um voucher com QR e check-in pelo app, e pode ser cancelada sem custo até 24 horas antes.',
        ],
        gallery: [
          { src: `${B}/screens/reservar.webp`, alt: 'Reservar horário: Campo A selecionado, um dia marcado no calendário, os horários da manhã com a ocupação de cada hora e o total de R$ 400,00 com o botão Continuar', device: 'ios', ...PHONE },
          { src: `${B}/screens/pagamento-pix.webp`, alt: 'Forma de pagamento com Pix selecionado: QR code, o prazo de 15 minutos para pagar e o botão Copiar código, abaixo de Lançar na mensalidade e Cartão de crédito', device: 'ios', ...PHONE },
          { src: `${B}/screens/pagamento-ok.webp`, alt: 'Reserva confirmada: voucher do Campo A com QR code, saída às 07:40, quatro jogadores e R$ 400,00 lançados na fatura', device: 'ios', ...PHONE },
          { src: `${B}/screens/reserva.webp`, alt: 'Voucher do horário de saída no Campo A com contagem regressiva, QR code, o código da reserva e o botão Fazer check-in', device: 'ios', ...PHONE },
          { src: `${B}/screens/home-checkin.webp`, alt: 'Check-in no clube sobre a home: QR code do sócio, o texto Você está no clube e o botão Confirmar check-in', device: 'ios', ...PHONE },
        ],
      },
      {
        kicker: '08 — A vida no clube',
        title: 'Motivos para abrir o app fora da rodada',
        body: [
          'Um app de clube que só serve para reservar é aberto uma vez por semana. As abas que o Figma prometia viraram motivos para voltar: o ranking do mês, aulas com o professor, torneios com vagas contadas, a loja com aluguel entregue no tee, os avisos e a carteirinha com o QR da portaria.',
        ],
        gallery: [
          { src: `${B}/screens/descobrir.webp`, alt: 'Descobrir: busca, o cartão Hoje no clube com clima, vento e a situação do Campo A, do Campo B e do range, e os serviços Reservar horário, Aulas e Torneios', device: 'ios', ...PHONE },
          { src: `${B}/screens/aulas.webp`, alt: 'Agendar aula: duração de 30 ou 60 minutos, dias da semana, horários da manhã e da tarde com 15:00 selecionado, o local da aula e o total de R$ 260,00', device: 'ios', ...PHONE },
          { src: `${B}/screens/torneio.webp`, alt: 'Copa Primavera, Stableford em 18 buracos no Campo A: contagem regressiva, 51 de 72 vagas preenchidas, quem vai jogar e o botão Inscrever-se por R$ 180,00', device: 'ios', ...PHONE },
          { src: `${B}/screens/evento.webp`, alt: 'Clínica de putt com Helena no putting green: contagem regressiva, 8 de 12 lugares ocupados e o botão Garantir 2 lugares por R$ 180,00', device: 'ios', ...PHONE },
          { src: `${B}/screens/loja-carrinho.webp`, alt: 'Carrinho com o aluguel entregue no tee, carrinho elétrico e balde de bolas, e a loja retirada no pro shop, bolas Pro V1, no total de R$ 339,00', device: 'ios', ...PHONE },
          { src: `${B}/screens/ranking.webp`, alt: 'Ranking do mês em pontos Stableford: pódio com Rodolfo G., Lucas F. e Caio M., a lista abaixo e a posição do Pedro fixa no rodapé', device: 'ios', ...PHONE },
          { src: `${B}/screens/ranking-jogador.webp`, alt: 'Rodolfo Guimarães no ranking: 1º no mês, 148 pontos, handicap 4,2, últimos resultados e os botões Convidar para jogar e Mandar mensagem', device: 'ios', ...PHONE },
          { src: `${B}/screens/avisos-swipe.webp`, alt: 'Avisos com uma notificação arrastada para o lado, mostrando a ação Lida em verde, e os filtros Todos, Não lidos, Reservas e Torneios', device: 'ios', ...PHONE },
          { src: `${B}/screens/carteirinha.webp`, alt: 'Cartão de sócio de Pedro Henrique, titular desde 2019, com HCP 12,4 sobre a foto do campo e os botões Mostrar código de entrada e Adicionar à Carteira', device: 'ios', ...PHONE },
          { src: `${B}/screens/carteirinha-qr.webp`, alt: 'Verso do cartão de sócio: QR code de entrada no clube com o número 0427, renovado a cada 30 segundos', device: 'ios', ...PHONE },
        ],
      },
      {
        kicker: '09 — Decisão: um sistema só',
        title: 'O que o sócio faz no celular aparece na tela da gestão',
        body: [
          'App e ERP leem os mesmos dados. O Pedro que reserva pelo celular é o sócio nº 0427 na agenda do campo, e os preços, os professores e os campos são os mesmos nos dois lados. Uma proposta que mostra isso funcionando responde à pergunta que todo gestor faz: isso conversa com o resto do clube?',
          'Do ERP, o Figma tinha só o dashboard. A agenda do campo, a ficha do sócio e o financeiro seguem a mesma grade, e a cobrança de quem está em atraso fica a um clique.',
        ],
        showcase: {
          items: [
            { src: `${B}/erp-shots/erp-dashboard.webp`, alt: 'Dashboard do ERP: indicadores do dia, reservas do mês contra a previsão, ocupação por turno, balanço, aniversariantes da semana e metas do ano', label: 'Dashboard', meta: 'o dia do clube', caption: 'Cada número com a sua referência: reservas contra a previsão, ocupação por turno, receita contra a meta.', ...WIDE },
            { src: `${B}/erp-shots/erp-agenda.webp`, alt: 'Agenda do campo: semana no topo, grade de horários com quatro vagas por saída, status de cada reserva e o painel da reserva das 10:20 com check-in manual', label: 'Agenda do campo', meta: 'reservas', caption: 'As reservas do app caem aqui: quatro vagas por horário, status de chegada e check-in manual.', ...WIDE },
            { src: `${B}/erp-shots/erp-socios.webp`, alt: 'Ficha do sócio Roberto Xavier aberta sobre a lista de sócios: handicap, rodadas no ano, plano sênior, duas mensalidades em atraso, histórico de pagamentos e o botão Enviar cobrança', label: 'Sócios', meta: 'CRM', caption: 'A ficha abre sobre a lista, com as mensalidades em atraso e a cobrança a um clique.', ...WIDE },
            { src: `${B}/erp-shots/erp-financeiro.webp`, alt: 'Financeiro: receita do mês, mensalidades, inadimplência e ticket médio, gráfico de receita por mês contra a meta, receita por origem e transações recentes', label: 'Financeiro', meta: 'caixa', caption: 'A receita por origem e os pagamentos do app, de cartão, Pix e mensalidade, no mesmo extrato.', ...WIDE },
          ],
        },
      },
      {
        kicker: '10 — Como eu trabalhei',
        title: 'IA na produção, o critério comigo',
        body: [
          'Escrevi o brief, defini as regras de negócio e os componentes, e coloquei agentes de IA para montar as telas em paralelo. Depois revisei uma por uma: o texto, os estados, o contraste e os números que precisam bater entre o app e o ERP.',
          'A IA acelerou a produção. As decisões de produto ficaram comigo, e é isso que permite sair de um arquivo parado para um produto testável em dias, não em meses.',
        ],
      },
    ],
    outcomesLabel: 'Resultado',
    outcomesTitle: 'O que a proposta ganhou',
    outcomes: [
      'Um produto que se usa no lugar de quatro telas paradas: 21 telas navegáveis, no celular e no desktop',
      'Os fluxos que vendem o clube funcionando de ponta a ponta: reservar, pagar, jogar e acompanhar',
      'Um momento de assinatura, o buraco em 3D, que nenhum sistema de reservas comum oferece',
      'App e ERP sobre os mesmos dados, mostrando o sistema inteiro e não telas soltas',
      'Uma base pronta para virar produto, com escopo, regras e interface já validados no protótipo',
    ],
    stackLabel: 'Ferramentas',
    stack: ['Figma', 'HTML, CSS e JavaScript', 'three.js', 'Agentes de IA', 'Playwright'],
    cta: {
      heading: 'Tem uma ideia parada no Figma?',
      sub: 'Eu levo do desenho a um produto que dá para usar e testar, com design e código, em dias.',
      label: 'Falar comigo',
    },
    ui: { back: 'Voltar aos projetos', visit: 'Abrir o protótipo' },
    liveUrl: `${APP}/index.html`,
    seo: {
      title: 'GolfHub — Case Study · Wellington Mota',
      description:
        'GolfHub: uma proposta de quatro telas no Figma para o Clube de Golfe de Brasília virou app do sócio e ERP do clube navegáveis, com um campo de golfe em 3D.',
    },
  },

  en: {
    slug: 'golfhub',
    accent: '#38EB7F',
    kicker: 'Case Study — GolfHub',
    title: 'GolfHub',
    subtitle:
      'A proposal for a golf club stalled at four screens in Figma. It became a product you can use: the members’ app and the club’s ERP, 21 clickable screens and a 3D golf course you turn with a finger.',
    cover: {
      src: `${B}/cover.webp`,
      alt: 'Three GolfHub app screens on a grainy green background: the Olá, Pedro home with a photo of Campo A, hole 2 in 3D with the player’s avatar and distance rings, and the round summary with the ball reaching the cup',
    },
    meta: [
      { label: 'Client', value: 'Clube de Golfe de Brasília (proposal)' },
      { label: 'Year', value: 'Proposal in 2023 · prototype in 2026' },
      { label: 'Role', value: 'Solo, from proposal to code' },
      { label: 'Delivered', value: 'Members’ app and club ERP, clickable in the browser' },
      { label: 'Platforms', value: 'App on mobile · ERP on desktop' },
    ],
    stats: [
      { value: '21', label: 'clickable screens, from 4 in Figma' },
      { value: '16', label: 'proposal modules, each placed in the app or the ERP' },
      { value: '1', label: 'person from proposal to code, with AI doing the build' },
      { value: '2', label: 'products, app and ERP, on the same data' },
      { value: '18', label: 'holes in 3D, generated in code' },
      { value: '3', label: 'ways to pay: card, Pix or the monthly bill' },
    ],
    intro: [
      'In 2023 I pitched two products to the Clube de Golfe de Brasília: an app for members to book, pay and follow their own game, and an ERP for staff to see the club’s day at a glance. The proposal stalled at four screens in Figma. Four screens can’t show what it’s like to book a tee time, pay and play a round.',
      'In 2026 I turned the proposal into something you can use. I worked out the missing screens from the club’s own rules, kept the original identity and turned the static hole map into a 3D scene. That’s what I deliver: a product that’s thought through, designed and working, in days.',
    ],
    roleLabel: 'What I did',
    roleList: [
      'Product strategy',
      'Product design',
      'UI and interaction',
      'UX writing',
      'Front-end',
      '3D in three.js',
      'AI agent orchestration',
    ],
    sections: [
      {
        kicker: '01 — The problem',
        title: 'Four screens don’t sell a club',
        body: [
          'There were two audiences. Management needed bookings, members and cash in one place. Members wanted to book, pay and track their game from their phone.',
          'Figma had the home screen, the hole map, the membership screen and the dashboard. What was missing was the part that persuades: the whole flow working, from booking to the round summary.',
        ],
        image: {
          src: `${B}/overview.webp`,
          alt: 'Both products in the prototype: the ERP dashboard in a browser window, with active members, bookings, occupancy and birthdays, and the app on an iPhone, with the Olá, Pedro home and the Campo A card',
          caption: 'The proposal’s two products, working: the club’s ERP and the members’ app.',
          ...WIDE,
        },
      },
      {
        kicker: '02 — The prototype',
        title: 'Try it before you read',
        body: [
          'It’s 17 app screens, and what you do is saved. Book a tee time and it becomes a voucher. Play a round and the scorecard adds itself up. Or let the tour run through the screens.',
        ],
        prototype: prototypeEn,
      },
      {
        kicker: '03 — Decision: scope',
        title: 'The missing screens came from the club’s rules',
        body: [
          'I didn’t invent features. The scope came from what the proposal already promised: the tab bar, the menu and the deck’s 16 modules. Each new screen started as a wireframe, with the business rule settled before any colour. Members pay no green fee; guests do. A booking can go on the monthly bill, since members already have a club account. Check-in happens from the voucher itself.',
        ],
        compare: {
          beforeLabel: 'Wireframe',
          afterLabel: 'Prototype',
          heuristicLabel: 'Decision',
          pairs: [
            {
              label: 'Home',
              heuristic: 'One main action',
              body: [
                'Hierarchy first: who the member is, where they play, when their next tee time is, and a single button, Começar rodada (start round).',
                'In the final pass, the course card shows who’s playing right now and opens a 3D fly-over of the course.',
              ],
              before: { src: `${B}/wire/home.webp`, alt: 'Home wireframe: greeting, a course card with the photo as a box, next tee time, the Começar rodada button and the tab bar', ...PHONE },
              after: { src: `${B}/screens/home.webp`, alt: 'Home in the prototype: Olá, Pedro, a Campo A card with 18 holes and par 72, who is playing, the next booked tee time and a labelled tab bar', ...PHONE },
            },
            {
              label: 'The hole',
              heuristic: 'The data a golfer uses',
              body: [
                'On the tee, a golfer wants three things: how far to the flag, the wind, and where the ball landed.',
                'It’s the screen that stays open all round, so it got the 3D. Everything in metres, with the drive drawn on the fairway.',
              ],
              before: { src: `${B}/wire/performance.webp`, alt: 'Hole wireframe: the map as a large box, weather in a side column, the Anotar buraco 2 button and the player bar', ...PHONE },
              after: { src: `${B}/screens/performance.webp`, alt: 'Hole 2 in 3D in the prototype: the player’s avatar, distance rings, the drive’s arc, 125 m to the flag, weather with wind and the Anotar buraco 2 button', ...PHONE },
            },
            {
              label: 'Membership',
              heuristic: 'Prevent the error',
              body: [
                'Payments are where a mistake costs the most. The structure puts the card, the plan, the next charge and the receipts in plain sight.',
                'The card form checks the number, expiry date and CVV as you type, and every receipt opens its proof of payment.',
              ],
              before: { src: `${B}/wire/assinatura.webp`, alt: 'Membership wireframe: the card as a box, the plan block, tabs and the list of receipts', ...PHONE },
              after: { src: `${B}/screens/assinatura.webp`, alt: 'Minha assinatura in the prototype: a Visa card with its expiry date and the Padrão (default) badge, the full membership plan with the next charge and R$ 300,00 receipts grouped by year', ...PHONE },
            },
            {
              label: 'The ERP dashboard',
              heuristic: 'Numbers with context',
              wide: true,
              body: [
                'A number on its own doesn’t tell you whether the day is going well. In the wireframe, every indicator already had room for a reference next to it.',
                'In the prototype: bookings against the forecast, occupancy by shift and revenue against the goal. Birthdays come with a one-tap congratulations.',
              ],
              before: { src: `${B}/wire/erp-dashboard.webp`, alt: 'ERP dashboard wireframe: side menu, four indicators on top, the bookings gauge, occupancy, the balance chart and the birthday list', ...WIDE },
              after: { src: `${B}/erp-shots/erp-dashboard.webp`, alt: 'ERP dashboard in the prototype: active members, today’s bookings, rentals and overdue fees, the month’s bookings against the forecast, today’s occupancy by shift, revenue and goal, birthdays with actions and the year’s goals', ...WIDE },
            },
          ],
        },
      },
      {
        kicker: '04 — Decision: identity',
        title: 'Complete the brand, don’t reinvent it',
        body: [
          'The proposal already had a look: Inter, charcoal, indigo, violet and the club’s green. I kept all of it and filled in what was missing, like states, contrast and a single icon set. The deck’s 16 modules each got a home in the app, the ERP or both.',
        ],
        details: {
          items: [
            {
              src: `${B}/d-palette.webp`,
              alt: 'GolfHub palette: charcoal #303030, violet #771AA3, indigo #4A3AFF, the green ball gradient and club green #106F36, above the green, violet, indigo and ink ramps and four status colours',
              label: 'The proposal’s colours',
              text: 'The file’s own colours, now as tokens. Charcoal to act, violet to highlight, indigo for selection and the green ball on the active tab.',
            },
            {
              src: `${B}/d-type.webp`,
              alt: 'Inter scale from the Olá, Pedro greeting to the uppercase label, with 84, +12 and 12.4 on a charcoal card and the GolfHub wordmark in DM Sans',
              label: 'Inter, from heading to scorecard',
              text: 'One typeface for everything, with the round’s numbers up front. DM Sans stays in the logo.',
            },
            {
              src: `${B}/d-icons.webp`,
              alt: '24 Iconsax Linear icons from the app, the tab bar with the green ball over Home, and five icons in Linear and Bold',
              label: 'One icon stroke',
              text: 'Iconsax Linear on every screen. The tab bar, which only had icons, got labels.',
            },
            {
              src: `${B}/d-modules.webp`,
              alt: 'The proposal’s 16 modules as cards, each with an icon and a tag for where it lives: App, ERP or App + ERP',
              label: '16 modules, each with a home',
              text: 'Every module from the deck now points to where it lives: the members’ app, the club’s ERP or both.',
            },
            {
              src: `${B}/d-hole.webp`,
              alt: 'Top-down plans of Campo A’s 18 holes, generated by the 3D view’s own code and drawn to one scale, with fairway, green, bunkers, water and trees, each numbered with its par',
              label: 'A whole course in code',
              text: 'All 18 holes come from the same code that builds the 3D. Each one starts from a few facts, like par, length and layout.',
            },
            {
              src: `${B}/d-states.webp`,
              alt: 'States: charcoal button default, pressed, disabled and focused; tee times free, partly booked, full and selected; tee picker; hole chips; switch; eagle to double-bogey marks; status tags',
              label: 'The missing states',
              text: 'The file showed each component one way. The prototype has default, selected, full, disabled and a visible focus.',
            },
          ],
        },
      },
      {
        kicker: '05 — Decision: where to invest',
        title: 'The 3D went to the screen members open on the tee',
        body: [
          'If the effort was going to one place, it was the hole. It’s the screen that stays with the member for the whole round, and the one that sets the product apart from an ordinary booking system. The static map became a course you turn, zoom and aim with a finger.',
          '3D has a cost, and I planned for it. On devices without support, the flat map comes back. With reduced motion on, the camera doesn’t fly.',
        ],
        gallery: [
          { src: `${B}/screens/performance-tour.webp`, alt: '3D tour of Campo A on hole 4, a 492 m par 5: a curving fairway between trees and a creek, with the hole card and the Reservar horário button', device: 'ios', ...PHONE },
          { src: `${B}/screens/performance-par3.webp`, alt: 'Preview of hole 3, a 158 m par 3: the shot line leaves the tee and carries a lake to the green', device: 'ios', ...PHONE },
          { src: `${B}/screens/resumo-voo.webp`, alt: 'Round summary: a 3D green with the flag and the ball inches from the cup, above the numbers 84 strokes, +12, 72 net and 36 points', device: 'ios', ...PHONE },
        ],
        galleryCaption: 'The fly-over of Campo A, the par 3 over the lake and the ball dropping into the cup at the end of the round.',
      },
      {
        kicker: '06 — The round',
        title: 'Log a hole in a few taps',
        body: [
          'Nobody wants to type mid-game. A round starts with three choices: course, tee and 9 or 18 holes. Then each hole takes strokes, putts and whether the drive found the fairway. The scorecard uses the notation golfers already know, and the summary shows what matters: score against par, net and points. If a round is interrupted, it picks up where it stopped.',
        ],
        gallery: [
          { src: `${B}/screens/rodada.webp`, alt: 'New round: Campo A selected, the 6,425 m white tee, 18 holes and the Ir para o tee 1 button', device: 'ios', ...PHONE },
          { src: `${B}/screens/rodada-andamento.webp`, alt: 'New round with a Round in progress notice on hole 2 of Campo A and the Continuar and Descartar buttons', device: 'ios', ...PHONE },
          { src: `${B}/screens/cartao.webp`, alt: 'Campo A scorecard for Pedro, Caio and Lucas: birdies circled, bogeys in squares and the totals of 84 strokes, +12 and 32 putts', device: 'ios', ...PHONE },
          { src: `${B}/screens/resumo.webp`, alt: 'Summary: Boa rodada, Pedro!, with 84 strokes, +12, 72 net and 36 points, and cards for putts, best hole, fairways and greens', device: 'ios', ...PHONE },
        ],
      },
      {
        kicker: '07 — Book and pay',
        title: 'From tee time to check-in, on your phone',
        body: [
          'The grid shows how full each time slot is before you pick one. Pricing follows the club’s rules: members pay no green fee, guests do, and the cart goes on the same bill. You can pay by card, Pix or on the monthly bill. The booking becomes a voucher with a QR code and in-app check-in, and it can be cancelled free of charge up to 24 hours before.',
        ],
        gallery: [
          { src: `${B}/screens/reservar.webp`, alt: 'Book a tee time: Campo A selected, a day picked on the calendar, the morning tee times with each hour’s occupancy and the R$ 400,00 total with the Continuar button', device: 'ios', ...PHONE },
          { src: `${B}/screens/pagamento-pix.webp`, alt: 'Payment method with Pix selected: a QR code, a 15-minute time limit and the Copiar código button, below the monthly bill and credit card options', device: 'ios', ...PHONE },
          { src: `${B}/screens/pagamento-ok.webp`, alt: 'Booking confirmed: a Campo A voucher with a QR code, a 07:40 tee time, four players and R$ 400,00 charged to the bill', device: 'ios', ...PHONE },
          { src: `${B}/screens/reserva.webp`, alt: 'Tee time voucher for Campo A with a countdown, QR code, booking code and the Fazer check-in button', device: 'ios', ...PHONE },
          { src: `${B}/screens/home-checkin.webp`, alt: 'Club check-in over the home screen: the member’s QR code, the text Você está no clube and the Confirmar check-in button', device: 'ios', ...PHONE },
        ],
      },
      {
        kicker: '08 — Club life',
        title: 'Reasons to open the app between rounds',
        body: [
          'A club app that only takes bookings gets opened once a week. The tabs Figma promised became reasons to come back: the monthly ranking, lessons with a pro, tournaments with a live spot count, a shop that delivers rentals to the tee, notifications and a member card with the gate QR code.',
        ],
        gallery: [
          { src: `${B}/screens/descobrir.webp`, alt: 'Discover: search, the Hoje no clube card with weather, wind and the status of Campo A, Campo B and the range, and the services Reservar horário, Aulas and Torneios', device: 'ios', ...PHONE },
          { src: `${B}/screens/aulas.webp`, alt: 'Book a lesson: 30 or 60 minutes, days of the week, morning and afternoon times with 15:00 selected, where the lesson happens and the R$ 260,00 total', device: 'ios', ...PHONE },
          { src: `${B}/screens/torneio.webp`, alt: 'Copa Primavera, 18-hole Stableford on Campo A: a countdown, 51 of 72 spots taken, who is playing and the Inscrever-se button for R$ 180,00', device: 'ios', ...PHONE },
          { src: `${B}/screens/evento.webp`, alt: 'Putting clinic with Helena on the putting green: a countdown, 8 of 12 places taken and the button to book 2 places for R$ 180,00', device: 'ios', ...PHONE },
          { src: `${B}/screens/loja-carrinho.webp`, alt: 'Cart with rentals delivered to the tee, an electric cart and a bucket of balls, and a shop item picked up at the pro shop, Pro V1 balls, for a total of R$ 339,00', device: 'ios', ...PHONE },
          { src: `${B}/screens/ranking.webp`, alt: 'Monthly ranking in Stableford points: a podium with Rodolfo G., Lucas F. and Caio M., the list below and Pedro’s position pinned at the bottom', device: 'ios', ...PHONE },
          { src: `${B}/screens/ranking-jogador.webp`, alt: 'Rodolfo Guimarães in the ranking: 1st this month, 148 points, handicap 4.2, recent results and the buttons to invite him to play and send a message', device: 'ios', ...PHONE },
          { src: `${B}/screens/avisos-swipe.webp`, alt: 'Notifications with one item swiped aside, revealing the green Lida (read) action, and the filters Todos, Não lidos, Reservas and Torneios', device: 'ios', ...PHONE },
          { src: `${B}/screens/carteirinha.webp`, alt: 'Member card for Pedro Henrique, a full member since 2019, with handicap 12.4 over a photo of the course and the buttons to show the entry code and add it to Wallet', device: 'ios', ...PHONE },
          { src: `${B}/screens/carteirinha-qr.webp`, alt: 'Back of the member card: the club entry QR code with member number 0427, renewed every 30 seconds', device: 'ios', ...PHONE },
        ],
      },
      {
        kicker: '09 — Decision: one system',
        title: 'What members do on their phone shows up on the club’s screen',
        body: [
          'The app and the ERP read the same data. The Pedro who books on his phone is member no. 0427 on the tee sheet, and prices, pros and courses match on both sides. A proposal that shows this working answers the question every manager asks: does it talk to the rest of the club?',
          'Figma only had the ERP dashboard. The tee sheet, the member record and finance follow the same grid, and chasing an overdue fee is one click away.',
        ],
        showcase: {
          items: [
            { src: `${B}/erp-shots/erp-dashboard.webp`, alt: 'ERP dashboard: the day’s indicators, the month’s bookings against the forecast, occupancy by shift, balance, this week’s birthdays and the year’s goals', label: 'Dashboard', meta: 'the club’s day', caption: 'Every number with its reference: bookings against the forecast, occupancy by shift, revenue against the goal.', ...WIDE },
            { src: `${B}/erp-shots/erp-agenda.webp`, alt: 'Course schedule: the week on top, a tee-time grid with four slots per time, each booking’s status and the panel for the 10:20 booking with manual check-in', label: 'Tee sheet', meta: 'bookings', caption: 'Bookings from the app land here: four slots per time, arrival status and manual check-in.', ...WIDE },
            { src: `${B}/erp-shots/erp-socios.webp`, alt: 'Member record for Roberto Xavier open over the member list: handicap, rounds this year, senior plan, two overdue monthly fees, payment history and the Enviar cobrança button', label: 'Members', meta: 'CRM', caption: 'The record opens over the list, with overdue fees and a payment reminder one click away.', ...WIDE },
            { src: `${B}/erp-shots/erp-financeiro.webp`, alt: 'Finance: the month’s revenue, monthly fees, overdue fees and average shop ticket, a monthly revenue chart against the goal, revenue by source and recent transactions', label: 'Finance', meta: 'cash', caption: 'Revenue by source and the app’s payments, card, Pix and monthly bill, in one statement.', ...WIDE },
          ],
        },
      },
      {
        kicker: '10 — How I worked',
        title: 'AI does the build, the judgement stays with me',
        body: [
          'I wrote the brief, set the business rules and the components, and had AI agents build the screens in parallel. Then I reviewed each one: copy, states, contrast and the numbers that have to match between the app and the ERP.',
          'AI sped up production. The product decisions stayed with me, and that’s what makes it possible to go from a stalled file to a testable product in days, not months.',
        ],
      },
    ],
    outcomesLabel: 'Outcome',
    outcomesTitle: 'What the proposal gained',
    outcomes: [
      'A product you can use instead of four static screens: 21 clickable screens, on phone and desktop',
      'The flows that sell the club working end to end: book, pay, play and follow your game',
      'A signature moment, the 3D hole, that an ordinary booking system doesn’t offer',
      'App and ERP on the same data, showing a whole system rather than loose screens',
      'A base ready to become a product, with scope, rules and interface already proven in the prototype',
    ],
    stackLabel: 'Tools',
    stack: ['Figma', 'HTML, CSS and JavaScript', 'three.js', 'AI agents', 'Playwright'],
    cta: {
      heading: 'Got an idea stuck in Figma?',
      sub: 'I take it from the drawing to a product you can use and test, with design and code, in days.',
      label: 'Get in touch',
    },
    ui: { back: 'Back to projects', visit: 'Open the prototype' },
    liveUrl: `${APP}/index.html`,
    seo: {
      title: 'GolfHub — Case Study · Wellington Mota',
      description:
        'GolfHub: a four-screen Figma proposal for the Clube de Golfe de Brasília became a clickable members’ app and club ERP, with a 3D golf course.',
    },
  },
};

export default golfhub;
