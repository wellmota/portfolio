# TODO — Análise de Acessibilidade & Boas Práticas

## Acessibilidade (a11y)

### Semântica & Estrutura
- [ ] Auditar hierarquia de headings (h1 → h6) — garantir sequência lógica sem pular níveis
- [ ] Verificar landmarks ARIA (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>` com `aria-label`)
- [ ] Adicionar `role` e `aria-*` adequados em componentes interativos (FAQ accordion, mobile menu, tabs)
- [ ] Garantir que todos os `<a>` com `target="_blank"` tenham `rel="noopener noreferrer"` e indicação visual/text
- [ ] Auditar uso de `<button>` vs `<a>` — ações devem ser buttons, navegação deve ser links

### Imagens & Mídia
- [ ] Verificar `alt` text em todas as imagens — descritivo para content images, `alt=""` para decorativas
- [ ] Auditar SVG icons — garantir `role="img"` + `aria-label` ou `aria-hidden="true"` quando decorativos
- [ ] Adicionar `loading="lazy"` e `decoding="async"` em imagens abaixo da dobra
- [ ] Otimizar imagens grandes (well-portrait-6.png = 2.8MB) — converter para WebP/AVIF, criar srcset responsivo

### Contraste & Cor
- [ ] Rodar WCAG 2.1 AA contrast check em todas as combinações text/bg (especialmente `.text-faint`, `.text-mist`)
- [ ] Verificar que informação não é transmitida apenas por cor (links, status, badges)
- [ ] Testar modo de alto contraste do sistema operacional

### Navegação & Teclado
- [ ] Testar navegação completa via Tab — garantir focus order lógico
- [ ] Adicionar focus-visible styles consistentes em todos os elementos interativos
- [ ] Garantir skip-to-content link no topo da página
- [ ] Testar menu mobile com teclado — Escape fecha, Tab fica preso no menu aberto (focus trap)
- [ ] Verificar que FAQ accordion funciona com Enter/Space e gerencia `aria-expanded`

### Screen Readers
- [ ] Testar com VoiceOver (macOS/iOS) e NVDA (Windows)
- [ ] Verificar que conteúdo dinâmico (clock, menu toggle) usa `aria-live` quando necessário
- [ ] Garantir que o language switcher anuncia o idioma alternativo

### Formulários
- [ ] Auditar form do Contact — labels associados, mensagens de erro acessíveis, `aria-required`
- [ ] Verificar que validação não depende apenas de cor

### Motion & Preferências
- [ ] Respeitar `prefers-reduced-motion` — desligar animações de reveal, parallax, hover transitions
- [ ] Verificar `prefers-color-scheme` para possível tema light futuro
- [ ] Testar com zoom de 200% e 400% — garantir que nada quebra ou transborda

## Performance

- [ ] Auditar Lighthouse (Performance, Accessibility, Best Practices, SEO) — target: 90+ em todos
- [ ] Implementar critical CSS / above-the-fold optimization
- [ ] Avaliar font loading strategy — `font-display: swap` já em uso? Subset fonts?
- [ ] Minificar e comprimir assets em produção (Brotli/Gzip)
- [ ] Implementar service worker para cache offline (PWA-lite)
- [ ] Adicionar `<link rel="preload">` para recursos críticos (hero image, fonts primárias)

## SEO & Meta

- [ ] Verificar meta tags em ambos os idiomas (en, pt)
- [ ] Adicionar structured data (JSON-LD) — Person, WebSite, BreadcrumbList
- [ ] Verificar `hreflang` tags para i18n (en ↔ pt)
- [ ] Adicionar sitemap.xml e robots.txt
- [ ] Implementar Open Graph images por idioma
- [ ] Verificar canonical URLs

## Qualidade de Código

### TypeScript & Tipagem
- [ ] Garantir strict mode no tsconfig (`strict: true`)
- [ ] Eliminar `any` types — usar tipos explícitos em todos os dados
- [ ] Adicionar type checking no CI (`astro check`)

### Padrões & Consistência
- [ ] Configurar ESLint + Prettier com regras do projeto
- [ ] Adicionar Husky + lint-staged para pre-commit hooks
- [ ] Padronizar imports (absolute vs relative, order)
- [ ] Remover código comentado e imports não utilizados

### Testes
- [ ] Adicionar testes de acessibilidade automatizados (axe-core + Playwright)
- [ ] Testes de snapshot para componentes críticos
- [ ] Testes de regressão visual (Percy ou Chromatic)
- [ ] E2E tests para fluxos críticos (navegação, menu mobile, language switch, contact form)

### CI/CD
- [ ] Configurar GitHub Actions: lint → type-check → build → test → a11y audit
- [ ] Adicionar Lighthouse CI para monitorar performance em cada PR
- [ ] Configurar branch protection rules no main

### Arquitetura
- [ ] Avaliar component composition — componentes muito grandes devem ser quebrados
- [ ] Auditar CSS — classes não utilizadas, duplicação, especificidade
- [ ] Verificar bundle size e tree-shaking
- [ ] Avaliar content security policy (CSP) headers
