/* Protótipo do painel do aluno · Método OBA (case de UX, Tutory). Gerado por monta-js.py. */
// Dropdown 
(function ($) {
  try {
    var menu = $('.js-item-menu');
    var sub_menu_is_showed = -1;
    for (var i = 0; i < menu.length; i++) {
      $(menu[i]).on('click', function (e) {
        e.preventDefault();
        $('.js-right-sidebar').removeClass("show-sidebar");        
        if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
          $(this).toggleClass('show-dropdown');
          sub_menu_is_showed = -1;
        }
        else {
          for (var i = 0; i < menu.length; i++) {
            $(menu[i]).removeClass("show-dropdown");
          }
          $(this).toggleClass('show-dropdown');
          sub_menu_is_showed = jQuery.inArray(this, menu);
        }
      });
    }
    $(".js-item-menu, .js-dropdown").click(function (event) {
      event.stopPropagation();
    });
    $("body,html").on("click", function () {
      for (var i = 0; i < menu.length; i++) {
        menu[i].classList.remove("show-dropdown");
      }
      sub_menu_is_showed = -1;
    });
  } catch (error) {
    console.log(error);
  }
  var wW = $(window).width();
    // Right Sidebar
    var right_sidebar = $('.js-right-sidebar');
    var sidebar_btn = $('.js-sidebar-btn');
    sidebar_btn.on('click', function (e) {
      e.preventDefault();
      for (var i = 0; i < menu.length; i++) {
        menu[i].classList.remove("show-dropdown");
      }
      sub_menu_is_showed = -1;
      right_sidebar.toggleClass("show-sidebar");
    });

    $(".js-right-sidebar, .js-sidebar-btn").click(function (event) {
      event.stopPropagation();
    });

    $("body,html").on("click", function () {
      right_sidebar.removeClass("show-sidebar");

    });
  // Sublist Sidebar
  try {
    var arrow = $('.js-arrow');
    arrow.each(function () {
      var that = $(this);
      that.on('click', function (e) {
        e.preventDefault();
        that.find(".arrow").toggleClass("up");
        that.toggleClass("open");
        that.parent().find('.js-sub-list').slideToggle("250");
      });
    });

  } catch (error) {
    console.log(error);
  }
  try {
    // Hamburger Menu
    $('.hamburger').on('click', function () {
      $(this).toggleClass('is-active');
      $('.navbar-mobile').slideToggle('500');
    });
    // Toque no backdrop do menu (o ::before do .header-mobile, cozy.css Fase 18) fecha o menu: o
    // clique no pseudo-elemento chega com o próprio .header-mobile como alvo
    $('.header-mobile').on('click', function (e) {
      var hamburger = $(this).find('.hamburger.is-active');
      if (e.target === this && hamburger.length) hamburger.trigger('click');
    });
    $('.navbar-mobile__list li.has-dropdown > a').on('click', function () {
      var dropdown = $(this).siblings('ul.navbar-mobile__dropdown');
      $(this).toggleClass('active');
      $(dropdown).slideToggle('500');
      return false;
    });
  } catch (error) {
    console.log(error);
  }
})(jQuery);

/* ==========================================================================
   ENG-1625 · MOCK do streak (dias de sequência) no topo. SÓ NO OVERRIDE LOCAL: não publicar.
   Faz o papel do PHP: insere no topo o HTML que o inc/header.php imprimiria, com a semana no
   mesmo formato do gf_build_semana_html() da v2 (layout-novo/inc/helpers.php). Valores fixos.
   Só roda com o pmminas.css na página. Visual: bloco "Fase 5" do pmminas.css.
   Doc: uxdocs/12-streak-mock.md. Para desfazer, apagar este trecho (ou o arquivo de override)
   ========================================================================== */
(function () {
  var MOCK = {
    sequencia: 7,
    // Dias antes de hoje e o próprio hoje contam como estudados; os seguintes, pendentes
    hojeEstudado: true
  };
  var LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  var NOMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  var STATUS = {
    studied: { classe: 'is-studied', simbolo: '✓', label: 'Estudado' },
    missed: { classe: 'is-missed', simbolo: '✗', label: 'Perdido' },
    free: { classe: 'is-free', simbolo: '—', label: 'Dia livre' },
    pending: { classe: 'is-pending', simbolo: '', label: 'Pendente' }
  };

  function semanaHtml() {
    var hoje = new Date().getDay();
    var html = '';
    for (var i = 0; i < 7; i++) {
      var status = i < hoje || (i === hoje && MOCK.hojeEstudado) ? 'studied' : 'pending';
      var info = STATUS[status];
      html += '<span class="gf-weekday ' + info.classe + (i === hoje ? ' is-today' : '') + '" title="' + NOMES[i] + ' - ' + info.label + '">' +
        '<span class="gf-dot">' + info.simbolo + '</span>' +
        '<span class="gf-label">' + LABELS[i] + '</span>' +
        '</span>';
    }
    return html;
  }

  function inserir() {
    var alvo = document.querySelector('.header-desktop .header-button');
    if (!alvo || alvo.querySelector('.gf-streak-topo')) return;
    var n = MOCK.sequencia;
    var el = document.createElement('div');
    el.className = 'gf-streak-topo';
    el.setAttribute('data-mock', 'ENG-1625');
    el.innerHTML =
      '<button type="button" class="gf-streak-topo__botao" aria-describedby="gf_streak_pop">' +
        '<span class="gf-streak-topo__num" style="--sequencia: ' + n + '">' + n + '</span>' +
        '<span class="sr-only"> dias de sequência</span>' +
      '</button>' +
      '<div class="gf-streak-topo__pop" id="gf_streak_pop" role="tooltip">' +
        '<p class="gf-streak-topo__titulo"><b>' + n + '</b> dias de sequência</p>' +
        '<div class="gf-week">' + semanaHtml() + '</div>' +
        '<p class="gf-hint">Continue estudando para manter sua sequência!</p>' +
      '</div>';
    alvo.insertBefore(el, alvo.querySelector('.noti-wrap'));
  }

  // Card da home: o mesmo HTML do layout-novo/inc/streak.php (sem a meta semanal, que só aparece
  // quando o mentor define meta), no mesmo lugar em que o painel/index.php o inclui: antes do
  // #dashboard_summary. O style="--sequencia" é o único acréscimo (o CSS usa para contar o número)
  var CHAMA_V2 = "<span class=\"gf-ico gf-ico-fire-3\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 55 55\" class=\"gf-fire-3\"><path class=\"flame-3-main\" d=\"m32.94,53.39l-0.53,0c-1.82,-0.16 -3.43,-0.77 -4.83,-1.85c-0.06,-0.05 -0.15,-0.05 -0.21,0c-3.17,2.41 -6.94,2.25 -10.32,0.33c-0.68,-0.39 -2.4,-1.38 -5.14,-2.97c-3.43,-1.99 -5.77,-5.19 -5.18,-9.31c0.01,-0.07 -0.03,-0.13 -0.09,-0.16c-2.04,-0.85 -3.53,-2.28 -4.49,-4.28c-0.59,-1.23 -0.93,-2.69 -1.02,-4.37l0,-0.52l0.07,-0.46c0.01,-0.06 0.07,-0.09 0.12,-0.08l3.89,1.05c0.09,0.03 0.16,0.11 0.17,0.2c0.19,2.7 2.19,4.77 4.91,4.8c1.16,0.01 3.1,0.02 5.8,0.02c0.17,0 0.33,0.07 0.45,0.19l4.09,4.09c0.05,0.05 0.01,0.13 -0.05,0.13l-9.29,0c-0.07,0 -0.13,0.05 -0.13,0.12c-0.24,3.61 3.72,5.46 6.35,6.98c1.87,1.08 6.27,2.93 7.27,-0.3c0.39,-1.26 0.5,-2.68 0.5,-4.27c0.01,-17.54 0.01,-27.91 0,-31.1c-0.01,-1.31 -0.16,-2.5 -0.47,-3.57c-0.88,-3.05 -4.75,-1.76 -6.63,-0.75c-1.16,0.63 -2.26,1.25 -3.28,1.88c-2.01,1.23 -3.78,2.83 -3.75,5.4c0,0.1 0.08,0.17 0.18,0.17l9.27,0.01c0.03,0 0.05,0.02 0.06,0.05c0.01,0.02 0,0.04 -0.01,0.07c-0.01,0.01 -0.01,0.02 -0.02,0.03l-4.06,4.07c-0.12,0.12 -0.29,0.19 -0.46,0.19c-3.11,0.01 -5,0.01 -5.66,0.01c-2.77,0.02 -4.87,2.01 -5.04,4.78c-0.01,0.11 -0.08,0.19 -0.18,0.23l-3.88,1.04c-0.06,0.01 -0.11,-0.02 -0.13,-0.08l-0.05,-0.2l0,-0.56c0.16,-3.93 1.78,-7.3 5.52,-8.88c0.06,-0.03 0.09,-0.09 0.08,-0.15c-0.43,-3.21 0.84,-5.93 3.25,-7.99c0.52,-0.44 1.27,-0.95 2.27,-1.53c3.03,-1.77 4.81,-2.79 5.33,-3.05c3.25,-1.69 6.82,-1.66 9.79,0.59c0.07,0.05 0.17,0.05 0.24,0c3.18,-2.42 6.78,-2.2 10.24,-0.35c0.01,0.01 1.77,1.02 5.29,3.06c3.44,1.99 5.65,5.2 5.1,9.29c-0.01,0.05 0.02,0.11 0.07,0.13c3.95,1.69 5.69,5.5 5.49,9.64c-0.01,0.06 -0.06,0.1 -0.11,0.08l-3.92,-1.06c-0.1,-0.03 -0.17,-0.11 -0.17,-0.21c-0.17,-2.83 -2.28,-4.76 -5.05,-4.79c-1.24,-0.01 -3.12,-0.02 -5.64,-0.02c-0.17,0 -0.33,-0.07 -0.46,-0.19l-4.09,-4.09c-0.05,-0.05 -0.01,-0.13 0.05,-0.13l9.3,0c0.07,0 0.13,-0.05 0.13,-0.12c0.11,-2.06 -1.09,-3.6 -2.79,-4.81c-1.08,-0.77 -2.48,-1.61 -4.18,-2.5c-1.84,-0.97 -5.62,-2.36 -6.64,0.58c-0.07,0.21 -0.19,0.78 -0.35,1.72c-0.11,0.62 -0.16,1.2 -0.16,1.75l0,32.47c0,0.43 0.11,1.27 0.33,2.49c0.33,1.77 1.41,2.59 3.25,2.44c1.71,-0.13 3.15,-0.92 5,-1.96c2.48,-1.39 5.73,-3.23 5.53,-6.51c-0.01,-0.07 -0.06,-0.13 -0.13,-0.13l-9.29,0c-0.07,0 -0.11,-0.08 -0.05,-0.13l4.09,-4.09c0.12,-0.12 0.28,-0.18 0.45,-0.18c3.69,-0.01 5.56,-0.01 5.61,-0.01c2.89,-0.03 4.86,-1.95 5.11,-4.83c0.01,-0.09 0.07,-0.16 0.15,-0.18l3.94,-1.06c0.05,-0.02 0.11,0.03 0.11,0.08c0.16,4.17 -1.5,7.95 -5.49,9.65c-0.05,0.02 -0.08,0.07 -0.07,0.13c0.55,3.96 -1.6,7.26 -4.95,9.2c-3.58,2.07 -5.4,3.12 -5.44,3.15c-1.49,0.83 -3.12,1.33 -4.9,1.48l-0.04,0.01l-0.03,0z\"/><circle class=\"spark spark-1\" cx=\"9\" cy=\"5\" r=\"0.55\"/><circle class=\"spark spark-2\" cx=\"13\" cy=\"3.8\" r=\"0.45\"/><circle class=\"spark spark-3\" cx=\"15\" cy=\"5.3\" r=\"0.4\"/></svg></span>";

  function inserirHome() {
    var semana = document.getElementById('dashboard_summary');
    if (!semana || !document.querySelector('.card-dashboard-home') || document.querySelector('.gf-streak_model')) return;
    var n = MOCK.sequencia;
    var el = document.createElement('div');
    el.className = 'gf-streak_model';
    el.setAttribute('data-mock', 'ENG-1625');
    el.innerHTML = CHAMA_V2 +
      '<span class="gf-num" style="--sequencia: ' + n + '">' + n + '</span>' +
      '<p class="gf-title">Dias de Sequência</p>' +
      '<div class="gf-week">' + semanaHtml() + '</div>' +
      '<p class="gf-hint">Continue estudando para manter sua sequência!</p>';
    semana.parentNode.insertBefore(el, semana);
  }

  function inserirTudo() {
    if (!document.querySelector('link[href*="css/custom/pmminas.css"]')) return;
    inserir();
    inserirHome();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inserirTudo);
  } else {
    inserirTudo();
  }
})();

/* ==========================================================================
   ENG-1625 · Seletor de tema e modo. SÓ NO OVERRIDE LOCAL: não publicar.
   O pmminas.css importa o cozy e, por cima, o tático. Aqui dá para comparar sem editar arquivo:
   - Cozy: põe o pmminas.css em media "not all" e liga só o pmminas/temas/cozy.css (o JS não lê
     as regras do CSS de outro domínio, então troca o <link> inteiro).
   - Modo do tático: Auto (segue o sistema), Claro ou Escuro, via <html data-modo>.
   - Menu do topo: arranjo A (Fase 10) ou B (grupos, Fase 11), via <html data-menu>.
   A escolha fica no localStorage deste navegador. O "×" esconde o painel só até recarregar a
   página (não grava nada). Doc: uxdocs/13-tema-tatico.md
   ========================================================================== */
(function () {
  var link = document.querySelector('link[href*="css/custom/pmminas.css"]');
  if (!link) return;
  var guardado = function (chave, padrao) {
    try { return localStorage.getItem(chave) || padrao; } catch (e) { return padrao; }
  };
  var guardar = function (chave, valor) {
    try { localStorage.setItem(chave, valor); } catch (e) { /* janela privada */ }
  };
  var qs = new URLSearchParams(location.search);
  var estado = { tema: qs.get('tema') || guardado('cc-tema', 'cozy'), modo: qs.get('modo') || guardado('cc-modo', 'escuro'), menu: qs.get('menu') || 'b' };
  // Protótipo: o case troca tema, modo e menu de fora do iframe
  window.ccTema = function (novo) { for (var k in novo) if (novo[k]) estado[k] = novo[k]; aplicar(); };
  var cozy = null;

  function aplicar() {
    var raiz = document.documentElement;
    if (estado.modo === 'auto') raiz.removeAttribute('data-modo');
    else raiz.setAttribute('data-modo', estado.modo);
    raiz.setAttribute('data-menu', estado.menu);
    // Troca pelo media, não pelo disabled: religar um <link> desligado faz o Chrome perder o @import
    if (estado.tema === 'cozy') {
      if (!cozy) {
        cozy = document.createElement('link');
        cozy.rel = 'stylesheet';
        cozy.href = new URL('pmminas/temas/cozy.css', link.href).href;
        link.after(cozy);
      }
      cozy.media = 'all';
      link.media = 'not all';
    } else {
      link.media = 'all';
      if (cozy) cozy.media = 'not all';
    }
    raiz.setAttribute('data-tema', estado.tema);
    if (painel) {
      painel.querySelectorAll('button[data-grupo]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(estado[b.dataset.grupo] === b.dataset.valor));
      });
      painel.querySelector('[data-linha="modo"]').hidden = estado.tema === 'cozy';
    }
  }

  var painel = null;
  function montar() {
    if (qs.get('embed')) return; // no case, os botões ficam fora do iframe
    var css = document.createElement('style');
    css.textContent =
      '.cc-temas{position:fixed;left:16px;bottom:16px;z-index:40;display:grid;gap:6px;padding:10px 12px;border-radius:4px;' +
      'background:rgb(10 12 11/.88);box-shadow:0 10px 30px -8px rgb(0 0 0/.6),inset 0 0 0 1px rgb(255 255 255/.12);' +
      'backdrop-filter:blur(12px);color:#eef3ef;font:600 11px/1 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase}' +
      '.cc-temas div{display:flex;align-items:center;gap:6px}.cc-temas span{width:42px;opacity:.7}' +
      '.cc-temas button{padding:6px 8px;border:0;border-radius:2px;background:rgb(255 255 255/.08);color:inherit;font:inherit;letter-spacing:inherit;cursor:pointer}' +
      '.cc-temas button:hover{background:rgb(255 255 255/.16)}' +
      '.cc-temas button[aria-pressed=true]{background:#87fa9c;color:#050705}' +
      '.cc-temas button:focus-visible{outline:2px solid #fec133;outline-offset:2px}' +
      '.cc-temas[hidden]{display:none}' +
      '.cc-temas .cc-temas-fechar{margin-left:auto;width:24px;height:24px;padding:0;background:none;font-size:16px;line-height:1;opacity:.7}' +
      '.cc-temas .cc-temas-fechar:hover{opacity:1}' +
      '.cc-temas .cc-temas-voltar{display:block;padding:6px 0 2px;color:#87fa9c;text-decoration:none}' +
      '.cc-temas .cc-temas-voltar:hover{text-decoration:underline}';
    document.head.appendChild(css);
    painel = document.createElement('div');
    painel.className = 'cc-temas';
    painel.setAttribute('data-mock', 'ENG-1625');
    painel.setAttribute('role', 'group');
    painel.setAttribute('aria-label', 'Tema do painel (protótipo)');
    painel.innerHTML =
      '<div data-linha="tema"><span>Tema</span>' +
        '<button type="button" data-grupo="tema" data-valor="cozy">Cozy</button>' +
        '<button type="button" data-grupo="tema" data-valor="tatico">Tático</button>' +
        '<button type="button" class="cc-temas-fechar" data-fechar aria-label="Fechar o controle de variações">×</button></div>' +
      '<div data-linha="modo"><span>Modo</span>' +
        '<button type="button" data-grupo="modo" data-valor="auto">Auto</button>' +
        '<button type="button" data-grupo="modo" data-valor="claro">Claro</button>' +
        '<button type="button" data-grupo="modo" data-valor="escuro">Escuro</button></div>' +
      '<div data-linha="voltar"><a class="cc-temas-voltar" href="../../oba">← Voltar para a apresentação</a></div>';
    painel.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      // O "×" só esconde o painel: ao recarregar a página, ele volta
      if (b.hasAttribute('data-fechar')) {
        painel.hidden = true;
        return;
      }
      estado[b.dataset.grupo] = b.dataset.valor;
      guardar('cc-' + b.dataset.grupo, b.dataset.valor);
      aplicar();
    });
    document.body.appendChild(painel);
    aplicar();
  }

  aplicar();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
  else montar();
})();

/* ==========================================================================
   ENG-1625 · Card de jogador (HUD) no avatar do topo. SÓ NO OVERRIDE LOCAL: não publicar.
   Desenho: a variante de cima à direita do kit "hand drawn video game set elements"
   (uxdocs/assets/hand-drawn-video-game-set-elements/8840022.svg, exportado do .ai), com as
   coordenadas do próprio SVG (viewBox recortado na variante, x 315.3 a 577.7). Peças: moldura com
   a foto; barra de cima; placa inclinada com nome, 3 luzes e barra segmentada; sub-placa com a barra
   em degradê; anel verde por trás e disco com o número. A barra lateral e as abas do kit saíram.
   Dados:
   - nome e número: a patente (classe do <body>), 1 a 13;
   - barra segmentada: as 13 patentes, acesas até a atual (o kit tem 14);
   - 3 luzes: os círculos da carreira (praças e subtenente, oficiais até capitão, oficiais superiores);
   - barra em degradê: dias estudados na semana, contados no streak do topo (mock).
   O avatar de verdade (.account-item) fica por cima, na tela da moldura; o disco do número fica
   numa camada acima dele (.cc-hud-nivel, mesmo viewBox). Cores nos tokens --hud-* (cozy: as do kit,
   no fim do cozy.css, Fase 9; tático: seção 5). Doc: uxdocs/13-tema-tatico.md
   ========================================================================== */
(function () {
  var P = ['recruta', 'soldado', 'cabo', 'terceirosargento', 'segundosargento', 'sargento', 'subtenente',
    'segundotenente', 'tenente', 'capitao', 'major', 'tenentecoronel', 'coronel'];
  var NOMES = ['Recruta', 'Soldado', 'Cabo', '3º Sargento', '2º Sargento', '1º Sargento', 'Subtenente',
    '2º Tenente', '1º Tenente', 'Capitão', 'Major', 'Tenente-Coronel', 'Coronel'];

  function dados() {
    var i = 0;
    for (var k = 0; k < P.length; k++) if (document.body.classList.contains(P[k])) i = k;
    return {
      i: i,
      circulos: i >= 10 ? 3 : i >= 7 ? 2 : 1,
      dias: document.querySelectorAll('.header-desktop .gf-streak-topo .gf-weekday.is-studied').length
    };
  }

  var CAIXA = 'viewBox="315.3 4.3 262.4 99.7" width="225.7" height="85.76" aria-hidden="true" focusable="false"';
  // Degradês do kit, com as cores nos tokens (stop-color pelo CSS)
  function degrade(id, horizontal, a, b) {
    return '<linearGradient id="' + id + '" x1="0" y1="' + (horizontal ? 0 : 1) + '" x2="' + (horizontal ? 1 : 0) + '" y2="0">' +
      '<stop offset="0" class="' + a + '"/><stop offset="1" class="' + b + '"/></linearGradient>';
  }

  function base(d) {
    var seg = '', luz = '', k;
    for (k = 0; k < 13; k++) {
      seg += '<rect class="hud-seg' + (k <= d.i ? ' on' : '') + '" x="' + (412.67 + k * 10.81).toFixed(2) +
        '" y="53.11" width="7.6" height="10.91" rx="2.08"/>';
    }
    for (k = 0; k < 3; k++) {
      luz += '<circle class="hud-luz' + (k < d.circulos ? ' on' : '') + '" cx="' + (516.11 + k * 11.465).toFixed(2) + '" cy="41.27" r="3.62"/>';
    }
    var nome = NOMES[d.i].toUpperCase();
    // Tenente-Coronel não cabe antes das luzes: aperta só esse
    var aperto = nome.length > 12 ? ' textLength="93" lengthAdjust="spacingAndGlyphs"' : '';
    var semana = d.dias ? Math.max(3.62, 89.82 * d.dias / 7).toFixed(2) : 0;
    return '<svg ' + CAIXA + '><defs>' +
      degrade('cc-hud-placa', true, 'hud-p1', 'hud-p2') +
      degrade('cc-hud-placa-v', false, 'hud-p1', 'hud-p2') +
      degrade('cc-hud-acento', false, 'hud-a1', 'hud-a2') +
      degrade('cc-hud-acento-in', false, 'hud-a3', 'hud-a4') +
      degrade('cc-hud-on', false, 'hud-on1', 'hud-on2') +
      degrade('cc-hud-semana', true, 'hud-g1', 'hud-g2') + '</defs>' +
      // anel (por trás de tudo: só a parte de baixo aparece)
      '<circle class="hud-anel" cx="391.77" cy="81.37" r="22.34"/>' +
      // sub-placa com a barra da semana
      '<path class="hud-placa hud-traco" d="M513.22,91.82h-111v-49.3h129.88c4.28,0,7.04,4.55,5.05,8.34l-18.88,37.89c-.98,1.88-2.93,3.06-5.05,3.06Z"/>' +
      '<rect class="hud-fundo" x="420.28" y="83.03" width="89.82" height="3.62" rx="1.81"/>' +
      '<rect class="hud-semana" x="420.28" y="83.03" width="' + semana + '" height="3.62" rx="1.81"/>' +
      // barra de cima
      '<path class="hud-acento" d="M386.34,38.28v-21.82h138.11c1.82,0,3.47.94,4.4,2.51.93,1.57.97,3.46.1,5.06l-7.76,14.25h-134.85Z"/>' +
      '<path class="hud-acento-in" d="M520,36.28h-131.66v-17.82h136.11c2.37,0,3.87,2.53,2.74,4.61l-7.19,13.21Z"/>' +
      // placa
      '<path class="hud-placa hud-traco" d="M551.92,77.75h-172.74V28.46h191.62c4.28,0,7.04,4.55,5.05,8.34l-18.88,37.89c-.98,1.88-2.93,3.06-5.05,3.06Z"/>' +
      // moldura e tela (a barra lateral e as abas do kit saíram, a pedido)
      '<rect class="hud-moldura hud-traco" x="316.56" y="5.56" width="83.76" height="83.76"/>' +
      // a tela vai até 6 da moldura (no kit, 14,6), para a foto ficar maior; o "//" do kit saiu
      '<rect class="hud-tela-aro" x="322.56" y="11.56" width="71.76" height="71.76"/>' +
      '<rect class="hud-tela" x="324.56" y="13.56" width="67.76" height="67.76"/>' +
      // nome, luzes e segmentos
      '<text class="hud-nome" x="411.46" y="47.45"' + aperto + '>' + nome + '</text>' + luz + seg +
      '</svg>';
  }

  // O disco do número fica por cima do avatar: camada própria, no mesmo viewBox
  function nivel(d) {
    return '<svg ' + CAIXA + '><defs>' + degrade('cc-hud-disco', false, 'hud-p1', 'hud-p2') + '</defs>' +
      '<circle class="hud-disco hud-traco" cx="391.77" cy="81.37" r="17.35"/>' +
      '<circle class="hud-miolo" cx="391.77" cy="81.37" r="10.46"/>' +
      '<text class="hud-num" x="391.77" y="86.1" text-anchor="middle">' + (d.i + 1) + '</text>' +
      '</svg>';
  }

  function montar() {
    var wrap = document.querySelector('.header-desktop .account-wrap');
    var item = wrap && wrap.querySelector('.account-item');
    if (!item) return;
    var d = dados();
    var hud = wrap.querySelector('.cc-hud'), niv = wrap.querySelector('.cc-hud-nivel');
    if (!hud) {
      hud = document.createElement('div');
      hud.className = 'cc-hud';
      hud.setAttribute('data-mock', 'ENG-1625');
      wrap.insertBefore(hud, wrap.firstChild);
      niv = document.createElement('div');
      niv.className = 'cc-hud-nivel';
      niv.setAttribute('aria-hidden', 'true');
      wrap.appendChild(niv);
      wrap.classList.add('cc-hud-on');
    }
    hud.innerHTML = base(d) + '<span class="sr-only">' + NOMES[d.i] + ', patente ' + (d.i + 1) + ' de 13. ' +
      d.dias + ' de 7 dias estudados nesta semana.</span>';
    niv.innerHTML = nivel(d);
  }

  // TEMPORÁRIO: retrato do Unsplash (licença Unsplash) no lugar do avatar do topo e do menu da
  // conta, para ver o card com uma foto de verdade. Só troca o src da <img>; o upload de foto
  // continua igual. Para voltar ao avatar do aluno: FOTO_TEMP = ''
  var FOTO_TEMP = 'st/img/foto-aluno.jpg';
  function fotoTemp() {
    if (!FOTO_TEMP) return;
    document.querySelectorAll('.header-desktop .account-wrap img.profile-picture-change').forEach(function (img) {
      if (img.hasAttribute('data-cc-foto-original')) return;
      img.setAttribute('data-cc-foto-original', img.getAttribute('src') || '');
      img.removeAttribute('srcset');
      img.src = FOTO_TEMP;
    });
  }

  function iniciar() {
    if (!document.querySelector('link[href*="css/custom/pmminas.css"]')) return;
    montar();
    fotoTemp();
    // Refaz quando a classe da patente muda (útil para testar as 13 trocando a classe do <body>)
    new MutationObserver(montar).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();

/* ==========================================================================
   ENG-1625 · Menu do topo em grupos (arranjo B). SÓ NO OVERRIDE LOCAL: não publicar.
   Doc: uxdocs/14-menu-enxuto.md. Monta 3 grupos com menu suspenso na trilha do desktop:
   - Estudo: Aulas, Caderno, Conteúdo visto;
   - Desempenho: Questões e Desempenho, com os submenus em 2 colunas;
   - Plano: Edital e Configurar plano, idem.
   Os links são cópias dos itens que o PHP imprimiu (só os visíveis). Os originais ficam no DOM,
   escondidos pelo CSS (cozy.css, Fase 11), e o menu do mobile não muda. O botão do grupo abre e
   fecha no clique, no Enter e no Espaço, e com o mouse; Esc fecha. O seletor de tema troca entre
   este arranjo e o A (html[data-menu]).
   ========================================================================== */
(function () {
  var GRUPOS = [
    { id: 'estudo', nome: 'Estudo', itens: ['consultoria', 'cadernos', 'materiais'] },
    { id: 'desempenho', nome: 'Desempenho', colunas: [['questoes', 'Relatório de questões'], ['meu-desempenho', 'Seu desempenho']] },
    { id: 'plano', nome: 'Plano', colunas: [['edital', 'Edital'], ['editar-plano', 'Configurar plano']] }
  ];
  var ROTULOS = { consultoria: 'Aulas', cadernos: 'Caderno', materiais: 'Conteúdo visto' };
  var aqui = location.pathname + location.search;

  function visivel(el) {
    return el && getComputedStyle(el).display !== 'none';
  }

  function ehAtual(a) {
    if ((a.getAttribute('href') || '#').charAt(0) === '#') return false;
    try {
      var u = new URL(a.getAttribute('href'), location.href);
      return u.origin === location.origin && u.pathname + u.search === aqui;
    } catch (e) { return false; }
  }

  // Um <li><a><span> do menu suspenso, cópia de um link do PHP
  function link(origem, texto, ativo) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.setAttribute('href', origem.getAttribute('href'));
    if (origem.getAttribute('target')) {
      a.setAttribute('target', origem.getAttribute('target'));
      a.setAttribute('rel', 'noopener');
    }
    var span = document.createElement('span');
    span.textContent = texto;
    a.appendChild(span);
    if (ativo || ehAtual(origem)) {
      li.className = 'active';
      a.setAttribute('aria-current', 'page');
    }
    li.appendChild(a);
    return li;
  }

  function subLinks(item) {
    var ul = document.createElement('ul');
    ul.className = 'list-unstyled';
    item.querySelectorAll(':scope > .js-sub-list > li').forEach(function (sub) {
      var a = sub.querySelector('a');
      if (!a || !visivel(sub)) return; // o CSS do admin esconde alguns (D16)
      var span = a.querySelector('span');
      ul.appendChild(link(a, (span || a).textContent.trim(), sub.classList.contains('active')));
    });
    return ul;
  }

  function montarGrupo(lista, g) {
    var item = function (classe) { return lista.querySelector(':scope > .sidebar-menu-item-' + classe); };
    var painel, n = 0;
    if (g.itens) {
      painel = document.createElement('ul');
      painel.className = 'js-sub-list list-unstyled cc-grupo-lista';
      g.itens.forEach(function (classe) {
        var li = item(classe), a = li && li.querySelector(':scope > a');
        if (!a || !visivel(li)) return;
        painel.appendChild(link(a, ROTULOS[classe] || a.textContent.trim(), li.classList.contains('active')));
        n++;
      });
    } else {
      painel = document.createElement('div');
      painel.className = 'js-sub-list cc-mega';
      g.colunas.forEach(function (c) {
        var li = item(c[0]);
        if (!li || !visivel(li)) return;
        var col = document.createElement('div');
        col.className = 'cc-mega-col';
        col.setAttribute('role', 'group');
        var tit = document.createElement('p');
        tit.className = 'cc-mega-titulo';
        tit.id = 'cc-grupo-' + g.id + '-' + c[0];
        tit.textContent = c[1];
        col.setAttribute('aria-labelledby', tit.id);
        var ul = subLinks(li);
        if (!ul.children.length) return;
        col.appendChild(tit);
        col.appendChild(ul);
        painel.appendChild(col);
        n++;
      });
    }
    if (!n) return null;
    painel.id = 'cc-grupo-' + g.id + '-painel';

    var grupo = document.createElement('li');
    grupo.className = 'cc-grupo cc-grupo-' + g.id;
    grupo.setAttribute('data-mock', 'ENG-1625');
    // <a> e não <button> para herdar a pele dos itens da trilha (li > a) nos dois temas
    var botao = document.createElement('a');
    botao.className = 'cc-grupo-botao';
    botao.setAttribute('href', '#!');
    botao.setAttribute('role', 'button');
    botao.setAttribute('aria-expanded', 'false');
    botao.setAttribute('aria-controls', painel.id);
    botao.innerHTML = '<i aria-hidden="true"></i> <span></span>';
    botao.querySelector('span').textContent = g.nome;
    grupo.appendChild(botao);
    grupo.appendChild(painel);
    if (painel.querySelector('li.active')) grupo.classList.add('active');
    return grupo;
  }

  var grupos = [];
  var fecharTimer = null;

  function abrir(grupo, sim) {
    grupos.forEach(function (g) {
      var on = g === grupo && sim;
      g.classList.toggle('is-aberto', on);
      g.querySelector('.cc-grupo-botao').setAttribute('aria-expanded', String(on));
    });
  }

  function ligar(grupo) {
    var botao = grupo.querySelector('.cc-grupo-botao');
    var peloMouse = false; // aberto só pelo hover: o 1º clique fixa em vez de fechar
    botao.addEventListener('click', function (e) {
      e.preventDefault();
      if (peloMouse && grupo.classList.contains('is-aberto')) {
        peloMouse = false;
        return;
      }
      abrir(grupo, !grupo.classList.contains('is-aberto'));
    });
    botao.addEventListener('keydown', function (e) {
      if (e.key === ' ') {
        e.preventDefault();
        abrir(grupo, !grupo.classList.contains('is-aberto'));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        abrir(grupo, true);
        var primeiro = grupo.querySelector('.js-sub-list a');
        if (primeiro) primeiro.focus();
      }
    });
    grupo.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && grupo.classList.contains('is-aberto')) {
        abrir(grupo, false);
        botao.focus();
      }
    });
    grupo.addEventListener('focusout', function (e) {
      if (!grupo.contains(e.relatedTarget)) {
        grupo.classList.remove('is-aberto');
        botao.setAttribute('aria-expanded', 'false');
      }
    });
    // Mouse: abre ao passar e fecha com uma pequena folga (toque e caneta usam o clique)
    grupo.addEventListener('pointerenter', function (e) {
      if (e.pointerType !== 'mouse') return;
      clearTimeout(fecharTimer);
      if (!grupo.classList.contains('is-aberto')) peloMouse = true;
      abrir(grupo, true);
    });
    grupo.addEventListener('pointerleave', function (e) {
      if (e.pointerType !== 'mouse') return;
      fecharTimer = setTimeout(function () {
        if (!grupo.contains(document.activeElement)) abrir(grupo, false);
      }, 150);
    });
  }

  function montar() {
    var lista = document.querySelector('.page-wrapper > .menu-sidebar .navbar__list');
    if (!lista || lista.querySelector(':scope > .cc-grupo')) return;
    GRUPOS.forEach(function (g) {
      var grupo = montarGrupo(lista, g);
      if (!grupo) return;
      lista.appendChild(grupo); // a posição na tela vem do order (cozy.css, Fase 11)
      grupos.push(grupo);
      ligar(grupo);
    });
    if (!grupos.length) return;
    lista.classList.add('cc-menu-b');
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.cc-grupo')) abrir(null, false);
    });
  }

  function iniciar() {
    if (!document.querySelector('link[href*="css/custom/pmminas.css"]')) return;
    montar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();

/* ==========================================================================
   ENG-1625 · Card do Método OBA no menu Plano (arranjo B). SÓ NO OVERRIDE LOCAL: não publicar.
   Doc: uxdocs/14-menu-enxuto.md ("Card do Método OBA no Plano"). A coluna "Edital" do Plano tem
   2 links e a "Configurar plano" tem 9: no vão embaixo do Edital entra um card pequeno com o logo,
   a prova social do site do mentor e um link para as missões do dia. Os números são os do site
   (pcmg.pmminas.com e pmminas.com/mentoria-pmmg-v3/, lidos em 2026-10-29): se lá mudar, mudar aqui.
   O card fica entre as duas colunas no DOM, para o Tab seguir a tela (Edital, card, Configurar
   plano); o CSS o põe embaixo do Edital (cozy.css, Fase 19) e o esconde se não couber, sem deixar
   o menu mais alto. Roda depois do trecho acima, que monta os grupos. Para desfazer: apagar este
   trecho e a Fase 19
   ========================================================================== */
(function () {
  var SETA = '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

  function montar(link) {
    var mega = document.querySelector('.page-wrapper > .menu-sidebar .cc-grupo-plano > .cc-mega');
    if (!mega || mega.querySelector('.cc-mega-promo')) return;
    var cols = mega.querySelectorAll(':scope > .cc-mega-col');
    // Só com as duas colunas e o Edital à esquerda: o vão é dele
    if (cols.length !== 2 || !cols[0].querySelector('#cc-grupo-plano-edital')) return;

    var card = document.createElement('div');
    card.className = 'cc-mega-promo';
    card.setAttribute('data-mock', 'ENG-1625');
    card.innerHTML =
      '<img class="cc-mega-promo-logo" alt="Método OBA: o básico aprova" width="96" height="32" decoding="async">' +
      // Sem <span>: a plataforma esconde todo "li span" da trilha (display: none !important)
      '<p class="cc-mega-promo-numero"><strong>+5.628</strong> aprovados na PMMG</p>' +
      '<p class="cc-mega-promo-texto">51 primeiros lugares, com o mesmo método do seu plano.</p>';
    card.querySelector('img').src = new URL('pmminas/conquistas/logo-metodooba.png', link.href).href;

    // CTA: as missões do dia, com o href que o PHP imprimiu. Sem o item, ou já na página dele, fica sem link
    var missoes = document.querySelector('.page-wrapper > .menu-sidebar .sidebar-menu-item-metas-diarias > a[href]');
    var destino = missoes && new URL(missoes.getAttribute('href'), location.href);
    if (destino && destino.pathname + destino.search !== location.pathname + location.search) {
      var a = document.createElement('a');
      a.className = 'cc-mega-promo-cta';
      a.setAttribute('href', missoes.getAttribute('href'));
      a.innerHTML = 'Ir às missões do dia' + SETA;
      card.appendChild(a);
    }

    var vaga = document.createElement('div');
    vaga.className = 'cc-mega-promo-vaga';
    vaga.appendChild(card);
    mega.insertBefore(vaga, cols[1]);
    mega.classList.add('cc-mega-com-promo');
  }

  function iniciar() {
    var link = document.querySelector('link[href*="css/custom/pmminas.css"]');
    if (link) montar(link);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();

/* ==========================================================================
   ENG-1625 · Logo do Método OBA no lugar da foto do mentor (topo, à esquerda). SÓ NO OVERRIDE
   LOCAL: não publicar. Em produção, o logo vem do cadastro do mentor (o PHP imprime o <img>).
   A imagem vem do site do mentor (pmminas.com): para publicar, hospedar no static. A forma (marca
   larga, sem o círculo) fica no cozy.css, Fase 12. Também troca o do topo de celular
   (.header-mobile, Fase 18)
   ========================================================================== */
(function () {
  var LOGO = 'st/css/custom/pmminas/conquistas/logo-metodooba.png';

  function trocar() {
    document.querySelectorAll('.page-wrapper > .menu-sidebar .logo img, .header-mobile .logo img').forEach(function (img) {
      if (img.hasAttribute('data-cc-logo-original')) return;
      img.setAttribute('data-cc-logo-original', img.getAttribute('src') || '');
      img.removeAttribute('srcset');
      img.src = LOGO;
      img.alt = 'Método OBA';
      img.closest('.logo').classList.add('cc-logo-marca');
    });
  }

  function iniciar() {
    if (!document.querySelector('link[href*="css/custom/pmminas.css"]')) return;
    trocar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();

/* ==========================================================================
   ENG-1625 · Avatar 3D da patente no hero do painel. SÓ NO OVERRIDE LOCAL: não publicar.
   O soldado toon do estúdio 3D (Downloads/pmminas/3d, js/avatar.js) no lugar da imagem da medalha
   (.activity-title-category::before), olhando pro mouse. O script vem pronto do estúdio, com o
   three.js e o modelo dentro: para gerar de novo, `npm run avatar` naquela pasta. Ele mesmo lê a
   medalha, põe o canvas por cima e só então esconde a imagem 2D. Para desfazer, apagar este trecho.
   ========================================================================== */
(function () {
  function carregar() {
    var link = document.querySelector('link[href*="css/custom/pmminas.css"]');
    if (!link || !document.querySelector('.card-dashboard-home')) return;
    var s = document.createElement('script');
    s.src = new URL('pmminas/3d/avatar-3d.js', link.href).href;
    s.async = true;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregar);
  } else {
    carregar();
  }
})();

/* ==========================================================================
   ENG-1625 · Medalha do card de acertos (tema tático). SÓ NO OVERRIDE LOCAL: não publicar.
   O CSS não lê o número do card, então este trecho põe data-medalha no card pelo índice:
   ouro de 80% para cima, prata de 60% a 79%, bronze abaixo de 60%. As medalhas ficam no tatico.css
   (--t-medalha-*, seção 9). Para desfazer, apagar este trecho: sem o atributo, fica a de ouro.
   ========================================================================== */
(function () {
  function medalha(indice) {
    if (indice >= 80) return 'ouro';
    if (indice >= 60) return 'prata';
    return 'bronze';
  }
  // A régua do card de acertos (trecho "Inferências dos cards de números", mais abaixo) usa a mesma
  window.ccMedalha = medalha;

  function marcar(card) {
    var valor = card.querySelector('.dash-value');
    var indice = valor ? parseFloat(valor.textContent.replace(',', '.')) : NaN;
    if (isNaN(indice)) card.removeAttribute('data-medalha');
    else card.setAttribute('data-medalha', medalha(indice));
  }

  function iniciar() {
    var card = document.querySelector('body.page-aluno .dash-stats .dash-tile-summary .row > .col:nth-child(4)');
    if (!card) return;
    marcar(card);
    // o número pode chegar depois (ou mudar) sem recarregar a página
    new MutationObserver(function () { marcar(card); }).observe(card, { childList: true, characterData: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();

/* ==========================================================================
   ENG-1625 · Conquistas: o troféu do topo abre a folha "Compartilhar". SÓ NO OVERRIDE LOCAL:
   não publicar. O módulo inteiro (carrossel de modelos em canvas, fundo padrão ou foto do aluno,
   compartilhar e baixar) fica em css/custom/pmminas/conquistas/ (compartilhar.js e .css, com as
   medalhas): aqui só carrega, e só quando o troféu existe. Doc: uxdocs/15-conquistas.md
   ========================================================================== */
(function () {
  function carregar() {
    var link = document.querySelector('link[href*="css/custom/pmminas.css"]');
    if (!link || !document.querySelector('.header-desktop .account-wrap-reward')) return;
    var s = document.createElement('script');
    s.src = new URL('pmminas/conquistas/compartilhar.js', link.href).href;
    s.async = true;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregar);
  } else {
    carregar();
  }
})();

/* ==========================================================================
   ENG-1625 · Inferências dos cards de números. SÓ NO OVERRIDE LOCAL: não publicar.
   No desktop, os cards de acertos, dias e horas estudando (a coluna da esquerda) e o do progresso do
   plano tinham o número no topo e um vão embaixo. Este trecho põe em cada um um bloco .cc-kpi-info
   com uma conta feita só com o que a página já traz (os data-value dos cards, o aria-valuenow da
   barra do plano e a data do cronograma): nenhum dado inventado e nenhuma chamada ao servidor.
   - Acertos: a régua das medalhas (bronze, prata a partir de 60, ouro a partir de 80: a medalha()
     do trecho "Medalha do card de acertos") com o marcador no índice, e quantos pontos faltam para
     a próxima. Sem aquele trecho, o card de acertos fica sem o bloco.
   - Dias estudando: as horas estudando divididas pelos dias, a média por dia estudado.
   - Horas estudando: as horas cronometradas (o 3º card, que o layout esconde) e a parte delas no total.
   - Progresso do plano: o próximo marco (25, 50, 75 ou 100%) e quanto resta até a data do cronograma.
   Se um dado faltar ou não for número, aquele card fica sem o bloco. CSS: Fase 20 do cozy.css e
   seção 16 do tatico-corpo.css. Doc: uxdocs/17-cards-numeros.md. Para desfazer, apagar este trecho.
   ========================================================================== */
(function () {
  var CORTE = { prata: 60, ouro: 80 }; // os mesmos da medalha()
  var MARCOS = [25, 50, 75, 100];
  var KPI = 'body.page-aluno .dash-stats .dash-tile-summary .row > .col:nth-child(';

  // "82.4%", "849600" e "46,8" viram número; vazio, "236h" ou texto viram NaN
  function numero(v) {
    var s = String(v == null ? '' : v).trim().replace(/%$/, '').replace(',', '.');
    return /^\d+(\.\d+)?$/.test(s) ? parseFloat(s) : NaN;
  }
  function umaCasa(n) {
    return Math.round(n * 10) / 10;
  }
  // Uma casa, com vírgula: 3.2000000000000028 vira "3,2" e 5 vira "5"
  function br(n) {
    return umaCasa(n).toLocaleString('pt-BR', { maximumFractionDigits: 1 });
  }
  // Abaixo de 2, singular ("falta 1,5 pt"), como pede a norma
  function pontos(n) {
    return br(n) + (umaCasa(n) < 2 ? ' pt' : ' pts');
  }
  function falta(n) {
    return umaCasa(n) < 2 ? 'falta' : 'faltam';
  }
  // Segundos em "1h36" (abaixo de 1 hora, "45min")
  function horaMinuto(seg) {
    var min = Math.round(seg / 60), h = Math.floor(min / 60), m = min % 60;
    return h ? h + 'h' + (m < 10 ? '0' : '') + m : m + 'min';
  }
  // Segundos em horas cheias, como o card da plataforma ("41h"; abaixo de 1 hora, "25min"; zero, "0h")
  function horas(seg) {
    return seg > 0 && seg < 3600 ? Math.round(seg / 60) + 'min' : Math.floor(seg / 3600) + 'h';
  }

  function card(n) {
    return document.querySelector(KPI + n + ')');
  }
  function valor(col) {
    var v = col && col.querySelector('.dash-value');
    if (!v) return NaN;
    var n = numero(v.getAttribute('data-value'));
    return isNaN(n) ? numero(v.textContent) : n;
  }

  // Cada conta devolve { html, faixa? }, ou null quando falta dado
  function contaAcertos(indice) {
    if (isNaN(indice) || indice > 100 || typeof window.ccMedalha !== 'function') return null;
    var faixa = window.ccMedalha(indice), linha;
    if (faixa === 'ouro') {
      var acima = indice - CORTE.ouro;
      linha = '<b>Ouro</b> · ' + (umaCasa(acima) ? pontos(acima) + ' acima do corte' : 'em cima do corte');
    } else {
      var n = (faixa === 'prata' ? CORTE.ouro : CORTE.prata) - indice;
      linha = 'F' + falta(n).slice(1) + ' <b>' + pontos(n) + '</b> para ' + (faixa === 'prata' ? 'o ouro' : 'a prata');
    }
    return {
      faixa: faixa,
      html:
        '<div class="cc-kpi-regua" style="--cc-kpi-pos: ' + indice + '%" role="img" aria-label="Medalhas: bronze abaixo de ' +
          CORTE.prata + '%, prata de ' + CORTE.prata + '% a ' + (CORTE.ouro - 1) + '%, ouro de ' + CORTE.ouro + '% para cima">' +
          '<span data-faixa="bronze"></span><span data-faixa="prata"></span><span data-faixa="ouro"></span><i></i>' +
        '</div>' +
        '<div class="cc-kpi-escala" aria-hidden="true">' +
          '<span style="--x: ' + CORTE.prata + '%">' + CORTE.prata + '</span><span style="--x: ' + CORTE.ouro + '%">' + CORTE.ouro + '</span>' +
        '</div>' +
        '<div class="cc-kpi-linha">' + linha + '</div>'
    };
  }
  function contaDias(dias, segEstudo) {
    if (!(dias > 0) || isNaN(segEstudo)) return null;
    return {
      html:
        '<div class="cc-kpi-linha"><b>' + horaMinuto(segEstudo / dias) + '</b></div>' +
        '<div class="cc-kpi-nota">por dia estudado, em média</div>'
    };
  }
  function contaCronometro(segEstudo, segCrono) {
    if (!(segEstudo > 0) || isNaN(segCrono)) return null;
    var parte = Math.min(segCrono / segEstudo, 1);
    return {
      html:
        '<div class="cc-kpi-linha"><b>' + horas(segCrono) + '</b> no cronômetro</div>' +
        '<div class="cc-kpi-barra" style="--cc-kpi-parte: ' + umaCasa(parte * 100) + '%" aria-hidden="true"><i></i></div>' +
        '<div class="cc-kpi-nota">' + Math.round(parte * 100) + '% das horas estudadas</div>'
    };
  }
  function contaPlano(feito, data) {
    if (isNaN(feito) || feito > 100) return null;
    var marco = MARCOS.filter(function (m) { return m > feito; })[0];
    if (!marco) return { html: '<div class="cc-kpi-linha"><b>Plano concluído</b></div>' };
    return {
      html:
        '<div class="cc-kpi-linha">Próximo marco: <b>' + marco + '%</b> · ' + falta(marco - feito) + ' ' + pontos(marco - feito) + '</div>' +
        '<div class="cc-kpi-nota">Restam ' + br(100 - feito) + '% do plano' + (data ? ' até ' + data : '') + '</div>'
    };
  }

  // Põe, troca ou tira o bloco. Só reescreve quando a conta muda, então o observador não entra em laço
  function por(pai, tipo, conta) {
    if (!pai) return;
    var el = pai.querySelector(':scope > .cc-kpi-info');
    if (!conta) {
      if (el) el.remove();
      return;
    }
    if (!el) {
      el = document.createElement('div');
      el.className = 'cc-kpi-info';
      el.setAttribute('data-kpi', tipo);
      el.setAttribute('data-mock', 'ENG-1625');
      pai.appendChild(el);
    }
    var chave = conta.html + (conta.faixa || '');
    if (el.ccConta === chave) return;
    el.ccConta = chave;
    el.innerHTML = conta.html;
    if (conta.faixa) el.setAttribute('data-faixa', conta.faixa);
    else el.removeAttribute('data-faixa');
  }

  function atualizar() {
    var dias = valor(card(1)), estudo = valor(card(2)), crono = valor(card(3));
    por(card(4), 'acertos', contaAcertos(valor(card(4))));
    por(card(1), 'dias', contaDias(dias, estudo));
    por(card(2), 'horas', contaCronometro(estudo, crono));

    var prog = document.querySelector('.card-dashboard-home .activity-title-progress');
    if (!prog) return;
    var barra = prog.querySelector('.progress-bar'), b = prog.querySelector('p b');
    var feito = numero(barra && barra.getAttribute('aria-valuenow'));
    if (isNaN(feito)) feito = numero(b && b.textContent);
    var badge = document.querySelector('.card-dashboard-home .activity-title-date-cronogram .badge');
    var data = badge ? badge.textContent.trim() : '';
    por(prog, 'plano', contaPlano(feito, /^\d{2}\/\d{2}\/\d{4}$/.test(data) ? data : ''));
  }

  function iniciar() {
    if (!document.querySelector('link[href*="css/custom/pmminas.css"]') || !document.querySelector('.card-dashboard-home')) return;
    atualizar();
    // Os números podem chegar depois (ou mudar) sem recarregar a página
    var pendente = false;
    var obs = new MutationObserver(function () {
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(function () { pendente = false; atualizar(); });
    });
    document.querySelectorAll('.card-dashboard-home .dash-stats, .card-dashboard-home .activity-title-progress, .card-dashboard-home .activity-title-dates').forEach(function (alvo) {
      obs.observe(alvo, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['data-value', 'aria-valuenow'] });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();

/* ==========================================================================
   Protótipo do case (Tutory): os dados são fictícios e nada sai daqui.
   - Links não navegam (menos o "Baixar" da folha Compartilhar, que é blob).
   - O case manda {oba:'tema', tema, modo}, {oba:'menu', menu}, {oba:'patente', patente} e
     {oba:'estado', estado} por postMessage; o protótipo avisa {oba:'pronto'} quando carrega.
   - Estados (como os atalhos do protótipo do golf): painel, grupo-estudo, grupo-desempenho,
     grupo-plano, compartilhar, menu (o ☰ do celular), streak e semana (rolam até o card).
   - ?tema=cozy|tatico &modo=auto|claro|escuro &menu=a|b &patente=<classe> &estado=<estado> &embed=1
   ========================================================================== */
(function () {
  var qs = new URLSearchParams(location.search);
  var PATENTES = ['recruta', 'soldado', 'cabo', 'terceirosargento', 'segundosargento', 'sargento', 'subtenente',
    'segundotenente', 'tenente', 'capitao', 'major', 'tenentecoronel', 'coronel'];

  function patente(p) {
    if (PATENTES.indexOf(p) < 0) return;
    PATENTES.forEach(function (c) { document.body.classList.remove(c); });
    document.body.classList.add(p);
  }
  if (qs.get('patente')) patente(qs.get('patente'));
  // O menu da conta (e-mail, cadastro, pedidos, sair) não faz parte da proposta: o clique na foto não abre nada
  var semConta = document.createElement('style');
  semConta.textContent = '.account-item > .account-dropdown { display: none !important; }';
  document.head.appendChild(semConta);
  if (qs.get('embed')) {
    document.documentElement.classList.add('proto-embed');
    // No case, a moldura (janela ou iPhone) já diz que a tela rola: sem a barra de rolagem do tema
    var semBarra = document.createElement('style');
    semBarra.textContent = 'html.proto-embed, html.proto-embed * { scrollbar-width: none !important; }' +
      'html.proto-embed ::-webkit-scrollbar { display: none !important; }';
    document.head.appendChild(semBarra);
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || a.hasAttribute('download') || /^(blob|data):/.test(a.getAttribute('href'))) return;
    e.preventDefault();
    // "Voltar para a apresentação": a tela cheia abre numa aba nova; fecha a aba e, se o navegador
    // não deixar, volta para o case nesta aba
    if (a.classList.contains('cc-temas-voltar')) {
      window.close();
      setTimeout(function () { location.href = a.href; }, 150);
    }
  });

  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (d.oba === 'tema' && window.ccTema) window.ccTema({ tema: d.tema, modo: d.modo });
    if (d.oba === 'menu' && window.ccTema) window.ccTema({ menu: d.menu });
    if (d.oba === 'patente') patente(d.patente);
    if (d.oba === 'estado') estado(d.estado);
  });

  // Fecha o que estiver aberto: folha, grupos do menu e o ☰
  function fecharTudo() {
    if (window.ccConquistas) window.ccConquistas.fechar();
    document.body.click(); // os grupos e os dropdowns do topo fecham num clique fora
    var ham = document.querySelector('.header-mobile .hamburger.is-active');
    if (ham) ham.click();
  }
  function rolar(sel) {
    var el = document.querySelector(sel);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
  }
  // A folha Compartilhar carrega depois do resto: espera o módulo por até 4 s
  function quandoConquistas(fn, n) {
    if (window.ccConquistas) return fn();
    if ((n || 0) < 40) setTimeout(function () { quandoConquistas(fn, (n || 0) + 1); }, 100);
  }
  function estado(e) {
    fecharTudo();
    if (e !== 'streak' && e !== 'semana') window.scrollTo({ top: 0, behavior: 'smooth' });
    var g = /^grupo-(\w+)$/.exec(e || '');
    if (g) {
      var b = document.querySelector('.cc-grupo-' + g[1] + ' .cc-grupo-botao');
      if (b) b.click();
    } else if (e === 'compartilhar') {
      quandoConquistas(function () { window.ccConquistas.abrir(); });
    } else if (e === 'menu') {
      var ham = document.querySelector('.header-mobile .hamburger');
      if (ham && getComputedStyle(ham).display !== 'none') ham.click();
    } else if (e === 'streak') {
      rolar('.gf-streak_model');
    } else if (e === 'semana') {
      rolar('.dash-summary-day');
    }
  }

  window.addEventListener('load', function () {
    if (qs.get('estado')) setTimeout(function () { estado(qs.get('estado')); }, 300);
    if (window.parent !== window) window.parent.postMessage({ oba: 'pronto' }, '*');
  });
})();
