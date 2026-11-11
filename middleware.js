// Vercel Routing Middleware: entrega Markdown para agentes de IA.
//
// Quando um agente (Claude, ChatGPT, Perplexity, ferramentas de código) pede um
// guia do NECROX com "Accept: text/markdown", devolvemos o .md limpo do guia em
// vez do HTML com CSS e scripts. Para navegadores, nada muda.
// Só roda nas 5 URLs de guia, então o custo é desprezível.
import { rewrite } from '@vercel/functions/middleware';

export const config = {
  matcher: '/necrox/guias/:guia(marketing|diy|design|guerrilha|lancamento)/',
};

export default function middleware(request) {
  const accept = request.headers.get('accept') || '';
  if (!/text\/markdown/i.test(accept)) return;

  const url = new URL(request.url);
  const guia = url.pathname.split('/').filter(Boolean)[2];
  return rewrite(new URL(`/necrox/guias/${guia}.md`, url), {
    headers: { Vary: 'Accept' },
  });
}
