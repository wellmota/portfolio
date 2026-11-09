// Tipos do case do painel do aluno do Método OBA (/work/metodo-oba/). Vieram da apresentação feita para o
// cliente no site da Tutory (que por sua vez partiu de ./types.ts): uma página editorial com seções
// numeradas, cada uma com texto e um ou mais blocos de mídia.

/** Um dado com fonte: número (opcional; sem ele é só um princípio), frase e de onde veio. */
export interface Fonte {
  value?: string;
  label: string;
  source: string;
}

/** Imagem com o tamanho real do arquivo: `width`/`height` reservam o espaço da imagem lazy. */
export interface CaseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Vídeo em loop, mudo. `src` = mp4; `webm` opcional vem primeiro na lista de fontes. */
export interface CaseVideoSource {
  src: string;
  webm?: string;
}

export interface ComparePair {
  /** Nome do par (ex.: "O painel"). */
  label: string;
  /** Heurística ou princípio que guiou a mudança. */
  heuristic: string;
  /** O que estava errado e o que mudou (1–2 parágrafos). */
  body: string[];
  before: CaseImage;
  after: CaseImage;
  /** Duas telas de desktop lado a lado, texto em cima. Sem `wide`: celular, antes 1fr ao lado do depois 2fr. */
  wide?: boolean;
  /** Celular: vídeo em loop no lugar do "depois" (o `after` vira o poster). */
  afterVideo?: CaseVideoSource;
  /** Celular: anotação fora do print, com uma seta apontando para o ☰ (canto de cima à esquerda). `**palavra**` vira marca-texto. */
  note?: string;
  /** Dado ou princípio de UX que sustenta o par, embaixo do texto. */
  stat?: Fonte;
}

export interface CompareBlock {
  pairs: ComparePair[];
  beforeLabel: string;
  afterLabel: string;
  heuristicLabel: string;
  caption?: string;
}

export interface ShowcaseItem {
  /** Print da tela; num item com `video`, é o poster. */
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  /** Texto curto à direita do rótulo. */
  meta?: string;
  caption?: string;
  /** URL na barra da janela; cai no `url` do showcase se omitida. */
  url?: string;
  /** 'half' = duas telas lado a lado no desktop. Padrão: largura toda. */
  size?: 'full' | 'half';
  /** Vídeo em loop no lugar da imagem. */
  video?: CaseVideoSource;
}

export interface ShowcaseBlock {
  /** URL padrão da barra do navegador (ex.: app.tutory.com.br/painel). */
  url?: string;
  /** Desloca a numeração dos itens (1 → o primeiro item é "02"). */
  start?: number;
  items: ShowcaseItem[];
}

export interface DetailItem extends CaseImage {
  /** Título curto da decisão (rótulo em mono). */
  label: string;
  text: string;
}

export interface DetailsBlock {
  title?: string;
  items: DetailItem[];
}

export interface GalleryItem extends CaseImage {
  /** 'phone' = print de celular com os cantos da tela do iPhone; 'desktop' = print reto com borda. */
  device: 'phone' | 'desktop';
}

export interface GalleryRow {
  /** Rótulo acima da linha. */
  title?: string;
  items: GalleryItem[];
}

export interface GalleryBlock {
  /** Rótulo acima da grade. */
  title?: string;
  /** Selo no canto de cada imagem (ex.: "Antes"). */
  badge?: string;
  caption?: string;
  /** Uma grade só; ou use `rows` para várias linhas, cada uma com o seu rótulo. */
  items?: GalleryItem[];
  rows?: GalleryRow[];
}

export interface VideoBlock extends CaseVideoSource {
  poster: string;
  /** Descrição do vídeo (aria-label). */
  alt: string;
  /** Tamanho real do vídeo; reserva o espaço antes de carregar. */
  width: number;
  height: number;
  caption?: string;
  /** 'flat' (padrão): borda fina sobre o fundo escuro. 'browser': janela de navegador na faixa clara. 'phone': iPhone na faixa clara. */
  frame?: 'flat' | 'browser' | 'phone';
  /** URL na barra quando `frame: 'browser'`. */
  url?: string;
}

/** A tela com o respiro medido: o print do computador em cima e, embaixo, os de celular ao lado das defesas. */
export interface BlueprintBlock {
  /** O que cada cor marca, acima das telas. */
  legenda: { cor: 'azul' | 'rosa' | 'tinta'; texto: string }[];
  desktop: CaseImage;
  /** Cartas foil coladas sobre a borda de baixo do print do computador, cada uma com um desenho
   *  (`label` no formato "Nome: frase", como as heurísticas). */
  escala?: (Fonte & { tipo: string; desenho: 'grade' | 'fibonacci' | 'ritmo' })[];
  /** Prints de celular, lado a lado, à esquerda das defesas. */
  celular: CaseImage[];
  /** Por que o respiro importa: título curto, uma frase e, se houver, um dado com fonte. */
  defesas: { titulo: string; texto: string; stat?: Fonte }[];
  /** Destaque na largura toda, depois das defesas: o texto e o dado ao lado. Com `titulo`, um mito
   *  entre aspas à esquerda (e o `kicker` acima dele). */
  nota?: { kicker?: string; titulo?: string; texto: string[]; stat?: Fonte };
}

export interface ImageBlock extends CaseImage {
  caption?: string;
}

/** Um atalho do protótipo (como as telas do protótipo do golf): leva o iframe a um estado. */
export interface RoadmapStep {
  title: string;
  text: string;
  /** 'agora' acende a etapa; as outras ficam na trilha tracejada. */
  status: 'agora' | 'depois';
  icon: 'caneta' | 'check' | 'pessoas' | 'codigo' | 'foguete';
  /** Selo acima do título (ex.: "Estamos aqui"). */
  chip?: string;
  /** Última etapa: fecha a trilha em dourado. */
  final?: boolean;
  /** Número com fonte, no pé do card. */
  stat?: { value: string; label: string; source: string };
}

export interface RoadmapBlock {
  kicker: string;
  title: string;
  body?: string;
  /** Carimbo da Tutory à direita do título: o símbolo com o texto em arco (repetido) em volta. */
  selo?: { texto: string };
  steps: RoadmapStep[];
}

export interface ProtoScreen {
  id: string;
  label: string;
  meta?: string;
  device: 'desktop' | 'phone';
  /** Tema do OBA; o case do GPB não tem tema e omite. */
  theme?: 'cozy' | 'tatico-escuro' | 'tatico-claro';
  /** Arranjo do menu do topo; sem ele, fica o que estiver. */
  menu?: 'a' | 'b';
  /** Estado do protótipo: painel, grupo-estudo, grupo-desempenho, grupo-plano, compartilhar, menu, streak, semana.
   *  No GPB, a query da tela (ex.: `tab=contas&assistente=triagem`). */
  estado: string;
  /** Só para ver: a tela não recebe clique nem rolagem, e o estado fica como abriu. */
  estatica?: boolean;
  /** Anotação fora da janela, com a ponta da seta em (x, y), em % da tela de 1440×900. `**palavra**` vira marca-texto. */
  nota?: { texto: string; x: number; y: number };
}

export interface ProtoBlock {
  /** Página do protótipo (sem `?embed=1`; o componente acrescenta no iframe). */
  src: string;
  /** Título do iframe, para leitores de tela. */
  title: string;
  /** Imagem estática mostrada até o iframe carregar. */
  poster: CaseImage;
  /** URL na barra do navegador no modo Desktop. */
  url: string;
  hint?: string;
  /** Anotação acima da janela, à direita dos controles, com uma seta até ela. `**palavra**` vira
   *  marca-texto. Só no computador e no modo Desktop. */
  dica?: string;
  openLabel: string;
  /** Lista de atalhos ao lado do protótipo. A 1ª tela é o estado inicial. */
  screensLabel: string;
  screens: ProtoScreen[];
  /** Tour automático pelas telas (ms em cada uma). Para no 1º clique; não roda com movimento reduzido. */
  autoplay?: { hold: number };
  caption?: string;
}

/** As telas do protótipo, uma embaixo da outra, cada uma ao vivo no estado dela. */
export interface ProtoTelasBlock {
  /** Página do protótipo (o componente acrescenta `?embed=1&tema=…&estado=…`). */
  src: string;
  /** URL na barra do navegador das telas de desktop. */
  url: string;
  /** Patente (cor base) de todas as telas. */
  patente: string;
  /** Título dos iframes, para leitores de tela (a tela entra depois). */
  title: string;
  screens: ProtoScreen[];
}

/** Um bloco de mídia. O `kind` diz qual campo vem preenchido. */
export type CaseBlock =
  | { kind: 'image'; image: ImageBlock }
  | { kind: 'gallery'; gallery: GalleryBlock }
  | { kind: 'compare'; compare: CompareBlock }
  | { kind: 'showcase'; showcase: ShowcaseBlock }
  | { kind: 'details'; details: DetailsBlock }
  | { kind: 'prototype'; prototype: ProtoBlock }
  | { kind: 'video'; video: VideoBlock }
  | { kind: 'blueprint'; blueprint: BlueprintBlock };

export type CaseBlockKind = CaseBlock['kind'];

interface CaseSectionBase {
  /** Ex.: "01 — O problema". */
  kicker: string;
  title: string;
  body: string[];
  /** Blocos extras depois do principal (texto + galeria + vídeo, por exemplo). */
  media?: CaseBlock[];
  /** Link para uma das telas ao vivo (id de `ProtoScreen`): rola até ela. */
  live?: { label: string; screen: string };
  /** Dado ou princípio de UX no fim do cabeçalho da seção. */
  stat?: Fonte;
}

/**
 * Uma seção: cabeçalho de texto, o bloco principal (definido pelo `kind`) e, se houver,
 * os blocos de `media` na ordem. `kind: 'text'` não tem bloco principal.
 */
export type CaseSection = CaseSectionBase & ({ kind: 'text' } | CaseBlock);

/** A entrega pelo lado de design engineering, no fim da página: o texto e os pilares, cada um com um
 *  número (valor grande + rótulo) que prova o que o texto diz. */
export interface EngenhariaBlock {
  kicker: string;
  title: string;
  body: string[];
  pilares: { titulo: string; texto: string; value: string; label: string }[];
}

export interface CaseOba {
  /** Azul da Tutory (o #004fff clareado para ler no fundo escuro): kickers, números e barras. */
  accent: string;
  /** Âmbar: só para destaques pequenos. */
  accent2: string;
  seo: { title: string; description: string };
  kicker: string;
  title: string;
  subtitle: string;
  /** Dado discreto no canto direito do hero. */
  heroStat?: Fonte;
  meta: { label: string; value: string }[];
  cover: CaseImage;
  /** Protótipo no lugar da capa (o mesmo da seção 02, interativo). Sem ele, a capa é a imagem. */
  coverProto?: ProtoBlock;
  /** As telas ao vivo, logo depois da capa. */
  telas?: ProtoTelasBlock;
  /** Introdução e etiquetas "O que muda"; opcionais (o case saiu sem elas, como a apresentação). */
  intro?: string[];
  roleLabel?: string;
  roleList?: string[];
  /** Números do início; opcional (o pedido foi abrir sem eles). */
  stats?: { value: string; label: string }[];
  sections: CaseSection[];
  /** Etapas do projeto, no fim da página. */
  roadmap?: RoadmapBlock;
  /** A entrega de design engineering, depois das etapas. */
  engenharia?: EngenhariaBlock;
  /** Bloco final "o que está pronto"; opcional. */
  outcomesLabel?: string;
  outcomesTitle?: string;
  outcomes?: string[];
  /** Ferramentas; opcional. */
  toolsLabel?: string;
  tools?: string[];
  /** Chamada do fim e o "voltar", como nos outros cases (o rodapé vem do site). */
  cta: { heading: string; sub: string; label: string };
  ui: { back: string };
}
