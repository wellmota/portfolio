export interface WhatsAppMessage {
  /** Nome mostrado por extenso; o sobrenome sai borrado na página. */
  firstName: string;
  lastName: string;
  initial: string;
  avatarBg: string;
  nameColor: string;
  time: string;
  lines: string[];
}

export interface ComparePair {
  label: string;
  /** Heurística ou princípio que guiou o redesign deste par. */
  heuristic: string;
  /** O que estava errado e o que mudou (1–2 parágrafos). */
  body: string[];
  /** `width`/`height` = tamanho real do arquivo (reserva o espaço da imagem lazy). */
  before: { src: string; alt: string; width?: number; height?: number };
  after: { src: string; alt: string; width?: number; height?: number };
  /** Par de telas de desktop: texto em cima e as duas telas lado a lado, sem moldura de iPhone. */
  wide?: boolean;
}

export interface ShowcaseItem {
  src: string;
  alt: string;
  /** Tamanho real do arquivo; reserva o espaço da imagem lazy. */
  width?: number;
  height?: number;
  label: string;
  /** Texto curto à direita do rótulo (ex.: módulo, idioma). */
  meta?: string;
  caption?: string;
  /** URL mostrada na barra da janela; cai no `url` do showcase se omitida. */
  url?: string;
  /** 'half' = duas telas lado a lado no desktop. Padrão: largura toda. */
  size?: 'full' | 'half';
  /** Vídeo em loop (mp4, mudo) no lugar da imagem; `src` vira o poster. */
  video?: { src: string; webm?: string };
  /** Print de página inteira: janela 16:10 que rola até o fim no hover ou foco. `scrollSeconds` é a duração (padrão 8). */
  scroll?: boolean;
  scrollSeconds?: number;
}

export interface DetailItem {
  src: string;
  alt: string;
  /** Título curto da decisão de design (ex.: "Chips de três estados"). */
  label: string;
  text: string;
}

export interface PrototypeEmbed {
  /** Página inicial do protótipo (servida de /public), carregada num iframe 390×844. */
  src: string;
  /** Título do iframe, para leitores de tela. */
  title: string;
  /** Atalhos à direita do iPhone: cada um troca a tela do iframe. */
  screens: { label: string; href: string; meta?: string }[];
  screensLabel: string;
  hint?: string;
  openLabel: string;
  /** Botão que apaga o estado salvo do protótipo (chaves do localStorage com `storagePrefix`). */
  resetLabel?: string;
  storagePrefix?: string;
  caption?: string;
  /** Liga o tour automático: cada tela fica alguns segundos depois da animação de entrada e passa para a próxima. */
  autoplay?: { pause: string; resume: string };
}

export interface CaseSection {
  kicker: string;
  title: string;
  body: string[];
  /** `width`/`height` = tamanho real do arquivo; reservam o espaço da imagem lazy e evitam que a página pule. */
  image?: { src: string; alt: string; caption?: string; width?: number; height?: number };
  /** `device: 'ios'` = print do app novo, com os cantos arredondados da tela do iPhone. */
  gallery?: { src: string; alt: string; device?: 'ios'; width?: number; height?: number }[];
  /** Rótulo acima da galeria, selo em cada imagem e legenda abaixo (ex.: "Antes"). */
  galleryTitle?: string;
  galleryBadge?: string;
  galleryCaption?: string;
  /** Depoimentos recriados com a cara do WhatsApp (telefone oculto, sobrenome borrado). */
  whatsapp?: { messages: WhatsAppMessage[]; caption?: string };
  /** Prints de desktop, grandes, um por bloco. `frame: 'flat'` = sem moldura de device (só cantos e sombra). `start` desloca a numeração (ex.: 1 → o primeiro item é "02"). */
  showcase?: { url?: string; start?: number; frame?: "device" | "flat" | "browser"; items: ShowcaseItem[] };
  /** Recortes de detalhe, um por decisão de design, em grade escura de 2–3 colunas. */
  details?: { title?: string; items: DetailItem[] };
  /** Pares antes/depois (tela antiga em P&B ao lado da nova). */
  /** `even: true` = antes e depois do mesmo tamanho e o antes em cor (quando a mudança de cor faz parte da história). */
  compare?: { pairs: ComparePair[]; beforeLabel: string; afterLabel: string; heuristicLabel: string; caption?: string; even?: boolean };
  /** Protótipo navegável num iPhone, com atalhos de tela ao lado. */
  prototype?: PrototypeEmbed;
}

export interface CaseStudyContent {
  slug: string;
  accent: string;
  kicker: string;
  title: string;
  subtitle: string;
  cover: { src: string; alt: string };
  /** Vídeo de abertura (mp4, mudo, em loop) exibido no lugar da capa quando presente. */
  heroVideo?: { src: string; poster?: string };
  meta: { label: string; value: string }[];
  stats: { value: string; label: string }[];
  intro: string[];
  roleLabel: string;
  roleList: string[];
  sections: CaseSection[];
  outcomesLabel: string;
  outcomesTitle: string;
  outcomes: string[];
  stackLabel: string;
  stack: string[];
  cta: { heading: string; sub: string; label: string };
  ui: { back: string; visit: string };
  liveUrl?: string;
  seo: { title: string; description: string };
}

export interface CaseStudy {
  pt: CaseStudyContent;
  en: CaseStudyContent;
}
