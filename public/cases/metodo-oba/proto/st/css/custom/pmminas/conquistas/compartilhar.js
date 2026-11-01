/* ==========================================================================
   ENG-1625 · Conquistas: o troféu do topo abre a folha "Compartilhar". SÓ NO OVERRIDE LOCAL:
   não publicar. Quem carrega este arquivo é o tutory-dashboard-main.js (trecho "Conquistas"),
   e só quando o troféu existe (o PHP só imprime o troféu acima de 75% de acertos).
   Referências do usuário:
   - Duolingo: conquista e sequência;
   - Apple Fitness: folha com carrossel, fundo padrão ou foto, Cancelar e Compartilhar;
   - Strava: poucos números;
   - Spotify: título que vira identidade ("Atirador de Elite");
   - Nubank: fração no lugar do número cru ("de cada 10, acerto 9");
   - cards editoriais: número gigante, selo e calendário.
   Cada modelo é desenhado num <canvas> de 1080 × 1350 (4:5: post do feed ou figurinha no story).
   O carrossel mostra a própria imagem que será compartilhada.
   Dados:
   - patente: a classe do <body>;
   - XP: o #exp_counter;
   - sequência e semana: o mock do streak do topo;
   - foto: o avatar do topo;
   - acertos e horas: os cards da home. Sem esses cards, o acerto aparece como "+75%".
   A foto enviada fica só no navegador (blob) e não sobe para o servidor.
   Visual da folha: compartilhar.css (cozy e tático). Doc: uxdocs/15-conquistas.md
   ========================================================================== */
(function () {
  'use strict';
  if (window.ccConquistas) return;
  var BASE = document.currentScript ? document.currentScript.src : '';
  var W = 1080, H = 1350;
  var P = ['recruta', 'soldado', 'cabo', 'terceirosargento', 'segundosargento', 'sargento', 'subtenente',
    'segundotenente', 'tenente', 'capitao', 'major', 'tenentecoronel', 'coronel'];
  var NOMES = ['Recruta', 'Soldado', 'Cabo', '3º Sargento', '2º Sargento', '1º Sargento', 'Subtenente',
    '2º Tenente', '1º Tenente', 'Capitão', 'Major', 'Tenente-Coronel', 'Coronel'];
  var MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro',
    'outubro', 'novembro', 'dezembro'];
  var MESES_CURTOS = ['jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
  var DIAS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  // Ícones Phosphor Bold (viewBox 256), os mesmos do tático
  var PH = {
    escudo: 'M208,36H48A20,20,0,0,0,28,56v56c0,54.29,26.32,87.22,48.4,105.29,23.71,19.39,47.44,26,48.44,26.29a12.1,12.1,0,0,0,6.32,0c1-.28,24.73-6.9,48.44-26.29,22.08-18.07,48.4-51,48.4-105.29V56A20,20,0,0,0,208,36ZM52,60H204v52a119.54,119.54,0,0,1-7,41.64l-62.11-43.47a12,12,0,0,0-13.76,0L59,153.64A119.54,119.54,0,0,1,52,112ZM165.09,198.15A126.28,126.28,0,0,1,128,219.38a126.14,126.14,0,0,1-37.09-21.23A109,109,0,0,1,70,175.23l58-40.58,58,40.58A109,109,0,0,1,165.09,198.15Z',
    check: 'M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z',
    mira: 'M232,116h-4.72A100.21,100.21,0,0,0,140,28.72V24a12,12,0,0,0-24,0v4.72A100.21,100.21,0,0,0,28.72,116H24a12,12,0,0,0,0,24h4.72A100.21,100.21,0,0,0,116,227.28V232a12,12,0,0,0,24,0v-4.72A100.21,100.21,0,0,0,227.28,140H232a12,12,0,0,0,0-24Zm-92,87v-3a12,12,0,0,0-24,0v3a76.15,76.15,0,0,1-63-63h3a12,12,0,0,0,0-24H53a76.15,76.15,0,0,1,63-63v3a12,12,0,0,0,24,0V53a76.15,76.15,0,0,1,63,63h-3a12,12,0,0,0,0,24h3A76.15,76.15,0,0,1,140,203ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,148Z',
    raio: 'M219.71,117.38a12,12,0,0,0-7.25-8.52L161.28,88.39l10.59-70.61a12,12,0,0,0-20.64-10l-112,120a12,12,0,0,0,4.31,19.33l51.18,20.47L84.13,238.22a12,12,0,0,0,20.64,10l112-120A12,12,0,0,0,219.71,117.38ZM113.6,203.55l6.27-41.77a12,12,0,0,0-7.41-12.92L68.74,131.37,142.4,52.45l-6.27,41.77a12,12,0,0,0,7.41,12.92l43.72,17.49Z',
    trofeu: 'M232,60H212V48a12,12,0,0,0-12-12H56A12,12,0,0,0,44,48V60H24A20,20,0,0,0,4,80V96a44.05,44.05,0,0,0,44,44h.77A84.18,84.18,0,0,0,116,195.15V212H96a12,12,0,0,0,0,24h64a12,12,0,0,0,0-24H140V195.11c30.94-4.51,56.53-26.2,67-55.11h1a44.05,44.05,0,0,0,44-44V80A20,20,0,0,0,232,60ZM28,96V84H44v28c0,1.21,0,2.41.09,3.61A20,20,0,0,1,28,96Zm160,15.1c0,33.33-26.71,60.65-59.54,60.9A60,60,0,0,1,68,112V60H188ZM228,96a20,20,0,0,1-16.12,19.62c.08-1.5.12-3,.12-4.52V84h16Z'
  };
  // Chama desenhada para a sequência (caixa 200 × 260): contorno e miolo
  var CHAMA = 'M100 4C112 48 150 70 170 112C190 152 192 196 170 226C150 252 124 258 100 258C70 258 40 248 24 220C6 188 10 146 34 116C44 140 58 150 70 152C62 116 70 70 100 4Z';
  var CHAMA_MIOLO = 'M104 118C114 150 146 168 146 204C146 236 126 250 102 250C78 250 58 236 58 210C58 186 72 172 84 164C86 182 94 190 102 192C96 168 96 142 104 118Z';

  /* Dados ------------------------------------------------------------------ */
  function dados() {
    var i = 0, k;
    for (k = 0; k < P.length; k++) if (document.body.classList.contains(P[k])) i = k;
    var txt = function (sel) { var el = document.querySelector(sel); return el ? el.textContent.trim() : ''; };
    var kpi = function (n) { return txt('body.page-aluno .dash-stats .dash-tile-summary .row > .col:nth-child(' + n + ') .dash-value'); };
    var acertos = parseFloat(kpi(4).replace(',', '.'));
    var horas = kpi(2).match(/^([\d.,]+)\s*h/i);
    var nome = (window.jsAluno && window.jsAluno.nome || '').trim();
    var semana = [];
    document.querySelectorAll('.header-desktop .gf-streak-topo .gf-weekday').forEach(function (w, j) {
      var c = w.classList;
      semana.push({
        rotulo: DIAS[j] || '',
        estado: c.contains('is-studied') ? 'estudado' : c.contains('is-missed') ? 'perdido' : c.contains('is-free') ? 'livre' : 'pendente',
        hoje: c.contains('is-today')
      });
    });
    acertos = isNaN(acertos) ? null : Math.round(acertos);
    return {
      i: i,
      slug: P[i],
      patente: NOMES[i],
      nome: nome ? nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase() : '',
      xp: txt('#exp_counter') || '0',
      sequencia: parseInt(txt('.header-desktop .gf-streak-topo__num'), 10) || 0,
      semana: semana,
      acertos: acertos,
      acertosTxt: acertos === null ? '+75%' : acertos + '%',
      horas: horas ? horas[1] : '',
      titulo: acertos === null || acertos < 80 ? 'Mira Certeira' : acertos >= 90 ? 'Atirador de Elite' : 'Olho de Águia',
      medalha: acertos === null || acertos >= 80 ? 'ouro' : acertos >= 60 ? 'prata' : 'bronze',
      hoje: new Date()
    };
  }

  function dataLonga(d) { return d.getDate() + ' de ' + MESES_CURTOS[d.getMonth()] + ' de ' + d.getFullYear(); }
  function dataPontos(d) { return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear(); }
  function fracao(d) {
    if (d.acertos === null) return ['De cada 4 questões,', 'acerto 3.'];
    var n = Math.round(d.acertos / 10);
    return ['De cada 10 questões,', n === 10 ? 'acerto as 10.' : 'acerto ' + n + '.'];
  }

  /* Paletas: o tático é sempre escuro (HUD); o cozy tem claro, escuro (marinho da insígnia) e cor --- */
  function rgba(cor, a) {
    var m = cor.match(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);
    if (m) return 'rgba(' + m[1] + ',' + m[2] + ',' + m[3] + ',' + a + ')';
    var h = cor.replace('#', '');
    if (h.length === 3) h = h.replace(/./g, '$&$&');
    return 'rgba(' + parseInt(h.slice(0, 2), 16) + ',' + parseInt(h.slice(2, 4), 16) + ',' + parseInt(h.slice(4, 6), 16) + ',' + a + ')';
  }

  function paleta() {
    if (document.documentElement.getAttribute('data-tema') !== 'cozy') {
      var hud = {
        fundo: ['#0d1410', '#040605'], tinta: '#eef3ef', apagado: 'rgba(238,243,239,.62)', linha: 'rgba(135,250,156,.2)',
        painel: 'rgba(255,255,255,.05)', painelForte: '#0a100c', acento: '#87fa9c', acentoTexto: '#87fa9c',
        acento2: '#fec133', destaque: '#fec133', sobre: '#050705', relevo: 'rgba(135,250,156,.09)'
      };
      return {
        tatico: true, fTitulo: '"Rajdhani", "Barlow", sans-serif', fTexto: '"Barlow", system-ui, sans-serif',
        claro: hud, escuro: hud, cor: hud,
        foto: Object.assign({}, hud, { painel: 'rgba(4,6,5,.5)', linha: 'rgba(255,255,255,.26)' })
      };
    }
    var hl = getComputedStyle(document.body).getPropertyValue('--highlight-color').trim() || '#1877f2';
    var escuro = {
      fundo: ['#1d2c8a', '#070b2e'], tinta: '#ffffff', apagado: 'rgba(255,255,255,.7)', linha: 'rgba(157,183,255,.26)',
      painel: 'rgba(255,255,255,.08)', painelForte: '#0b1240', acento: hl, acentoTexto: '#9db7ff',
      acento2: '#fbbf24', destaque: '#d4f55c', sobre: '#0f172a', relevo: 'rgba(157,183,255,.12)'
    };
    return {
      tatico: false, fTitulo: '"Inter", system-ui, sans-serif', fTexto: '"Inter", system-ui, sans-serif',
      escuro: escuro,
      claro: {
        fundo: ['#ffffff', '#eef3fb'], tinta: '#0f172a', apagado: '#5b6577', linha: 'rgba(15,23,42,.1)',
        painel: '#f1f5fb', painelForte: '#ffffff', acento: hl, acentoTexto: hl,
        acento2: '#f59e0b', destaque: '#d4f55c', sobre: '#ffffff', relevo: rgba(hl, 0.12)
      },
      cor: {
        fundo: [hl, '#14206e'], tinta: '#ffffff', apagado: 'rgba(255,255,255,.78)', linha: 'rgba(255,255,255,.24)',
        painel: 'rgba(255,255,255,.14)', painelForte: '#14206e', acento: '#ffffff', acentoTexto: '#ffffff',
        acento2: '#d4f55c', destaque: '#d4f55c', sobre: '#0f172a', relevo: 'rgba(255,255,255,.12)'
      },
      foto: Object.assign({}, escuro, { painel: 'rgba(0,0,0,.38)', linha: 'rgba(255,255,255,.28)', acentoTexto: '#d4f55c' })
    };
  }

  /* Desenho: utilidades ----------------------------------------------------- */
  function fonte(pal, peso, px, titulo, italico) {
    if (pal.tatico && titulo) peso = Math.min(peso, 700);
    return (italico ? 'italic ' : '') + peso + ' ' + px + 'px ' + (titulo ? pal.fTitulo : pal.fTexto);
  }
  function caixa(pal, s) { return pal.tatico ? s.toUpperCase() : s; }

  function texto(ctx, s, x, y, o) {
    ctx.save();
    ctx.font = o.f;
    ctx.fillStyle = o.c;
    ctx.textAlign = o.a || 'left';
    ctx.textBaseline = 'alphabetic';
    if (o.ls) {
      ctx.letterSpacing = o.ls + 'px';
      // o espaço entra depois da última letra também: compensa no centro e na direita
      if (o.a === 'center') x += o.ls / 2;
      else if (o.a === 'right') x += o.ls;
    }
    if (o.sombra) { ctx.shadowColor = o.sombra; ctx.shadowBlur = 28; ctx.shadowOffsetY = 4; }
    if (o.max) ctx.fillText(s, x, y, o.max);
    else ctx.fillText(s, x, y);
    ctx.restore();
  }
  function medir(ctx, s, f, ls) {
    ctx.save();
    ctx.font = f;
    if (ls) ctx.letterSpacing = ls + 'px';
    var w = ctx.measureText(s).width;
    ctx.restore();
    return w;
  }

  // Canto chanfrado no tático, arredondado no cozy
  function forma(ctx, pal, x, y, w, h, r) {
    ctx.beginPath();
    if (pal.tatico) {
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.lineTo(x + w, y + r); ctx.lineTo(x + w, y + h - r);
      ctx.lineTo(x + w - r, y + h); ctx.lineTo(x + r, y + h); ctx.lineTo(x, y + h - r); ctx.lineTo(x, y + r);
      ctx.closePath();
    } else {
      ctx.roundRect(x, y, w, h, r);
    }
  }
  function hexagono(ctx, cx, cy, r) {
    ctx.beginPath();
    for (var k = 0; k < 6; k++) {
      var a = Math.PI / 3 * k - Math.PI / 2;
      ctx[k ? 'lineTo' : 'moveTo'](cx + r * Math.cos(a), cy + r * Math.sin(a));
    }
    ctx.closePath();
  }
  function estrela4(ctx, cx, cy, r, cor) {
    ctx.save();
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.quadraticCurveTo(cx + r * 0.16, cy - r * 0.16, cx + r, cy);
    ctx.quadraticCurveTo(cx + r * 0.16, cy + r * 0.16, cx, cy + r);
    ctx.quadraticCurveTo(cx - r * 0.16, cy + r * 0.16, cx - r, cy);
    ctx.quadraticCurveTo(cx - r * 0.16, cy - r * 0.16, cx, cy - r);
    ctx.fill();
    ctx.restore();
  }
  function selo(ctx, cx, cy, r, pontas, cor) {
    ctx.save();
    ctx.fillStyle = cor;
    ctx.beginPath();
    for (var k = 0; k < pontas * 2; k++) {
      var a = Math.PI / pontas * k - Math.PI / 2, rr = k % 2 ? r * 0.6 : r;
      ctx[k ? 'lineTo' : 'moveTo'](cx + rr * Math.cos(a), cy + rr * Math.sin(a));
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  function icone(ctx, d, x, y, t, cor, caixaOrig) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(t / (caixaOrig || 256), t / (caixaOrig || 256));
    ctx.fillStyle = cor;
    ctx.fill(new Path2D(d));
    ctx.restore();
  }
  function brilho(ctx, x, y, r, cor) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    // até a mesma cor transparente: até o preto transparente, o canvas suja o meio de cinza
    g.addColorStop(0, cor);
    g.addColorStop(1, rgba(cor, 0));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
  function degradeVertical(ctx, a, b, y0, y1) {
    var g = ctx.createLinearGradient(0, y0 || 0, 0, y1 || H);
    g.addColorStop(0, a);
    g.addColorStop(1, b);
    return g;
  }
  // Curvas de nível (como o --t-relevo do hero do tático)
  function relevo(ctx, cor, cx, cy, n, passo, semente) {
    ctx.save();
    ctx.strokeStyle = cor;
    ctx.lineWidth = 2;
    for (var k = 1; k <= n; k++) {
      var r0 = k * passo;
      ctx.beginPath();
      for (var t = 0; t <= 120; t++) {
        var a = t / 120 * Math.PI * 2;
        var r = r0 * (1 + 0.13 * Math.sin(3 * a + k * 0.35 + semente) + 0.07 * Math.sin(5 * a - k * 0.5 + semente * 2));
        ctx[t ? 'lineTo' : 'moveTo'](cx + Math.cos(a) * r * 1.25, cy + Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }
  function raios(ctx, cx, cy, n, r, cor) {
    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, cor);
    g.addColorStop(1, rgba(cor, 0));
    ctx.save();
    ctx.fillStyle = g;
    ctx.beginPath();
    for (var k = 0; k < n; k++) {
      var a0 = Math.PI * 2 / n * k;
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, a0, a0 + Math.PI / n);
      ctx.closePath();
    }
    ctx.fill();
    ctx.restore();
  }
  function cobrir(ctx, img, x, y, w, h, fy) {
    var iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    var s = Math.max(w / iw, h / ih), sw = w / s, sh = h / s;
    var sx = (iw - sw) / 2, sy = (ih - sh) * (fy === undefined ? 0.5 : fy);
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }
  function conter(ctx, img, cx, cy, mw, mh) {
    var iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    var s = Math.min(mw / iw, mh / ih);
    ctx.drawImage(img, cx - iw * s / 2, cy - ih * s / 2, iw * s, ih * s);
  }

  /* Moldura comum: rótulo e data no alto, marca embaixo, cantoneiras no tático --- */
  function topo(ctx, pal, c, rotulo, d, semData) {
    var f = fonte(pal, 700, 24, false);
    if (pal.tatico) {
      ctx.fillStyle = c.acento;
      ctx.fillRect(72, 92, 12, 12);
    } else {
      ctx.fillStyle = c.acentoTexto;
      ctx.beginPath();
      ctx.arc(78, 98, 7, 0, Math.PI * 2);
      ctx.fill();
    }
    texto(ctx, rotulo.toUpperCase(), 100, 107, { f: f, c: c.apagado, ls: 4 });
    if (!semData) texto(ctx, pal.tatico ? dataPontos(d.hoje) : dataLonga(d.hoje).toUpperCase(), 1008, 107, { f: f, c: c.apagado, a: 'right', ls: 3 });
  }
  function cantoneiras(ctx, c) {
    ctx.save();
    ctx.strokeStyle = rgba(c.acento, 0.55);
    ctx.lineWidth = 4;
    [[36, 36, 1, 1], [W - 36, 36, -1, 1], [36, H - 36, 1, -1], [W - 36, H - 36, -1, -1]].forEach(function (p) {
      ctx.beginPath();
      ctx.moveTo(p[0], p[1] + 56 * p[3]);
      ctx.lineTo(p[0], p[1]);
      ctx.lineTo(p[0] + 56 * p[2], p[1]);
      ctx.stroke();
    });
    ctx.restore();
  }
  // O logo do Método OBA (cópia ao lado deste arquivo: o do site do mentor não tem CORS e sujaria o
  // canvas). Ele tem placa preta própria, então lê no claro e no escuro. Sem o logo, vai em texto
  function rodape(ctx, pal, c, logo) {
    if (logo) {
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,.28)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 6;
      conter(ctx, logo, 540, 1262, 300, 92);
      ctx.restore();
      return;
    }
    var s = 'MÉTODO OBA';
    var f = pal.tatico ? fonte(pal, 700, 36, true) : fonte(pal, 800, 30, true);
    var ls = pal.tatico ? 7 : 2;
    var w = medir(ctx, s, f, ls) + 50;
    var x = 540 - w / 2;
    icone(ctx, PH.escudo, x, 1250, 38, c.acentoTexto);
    texto(ctx, s, x + 50, 1282, { f: f, c: c.tinta, ls: ls });
  }

  function fundoBase(ctx, c) {
    ctx.fillStyle = degradeVertical(ctx, c.fundo[0], c.fundo[1]);
    ctx.fillRect(0, 0, W, H);
  }
  // Foto do aluno como fundo: corta para cobrir e escurece para o texto ler em qualquer foto
  function fundoFoto(ctx, foto, modo) {
    cobrir(ctx, foto, 0, 0, W, H, 0.3);
    var g = ctx.createLinearGradient(0, 0, 0, H);
    if (modo === 'baixo') {
      g.addColorStop(0, 'rgba(0,0,0,.42)');
      g.addColorStop(0.18, 'rgba(0,0,0,.08)');
      g.addColorStop(0.42, 'rgba(0,0,0,.18)');
      g.addColorStop(0.62, 'rgba(0,0,0,.7)');
      g.addColorStop(1, 'rgba(0,0,0,.9)');
    } else {
      g.addColorStop(0, 'rgba(0,0,0,.6)');
      g.addColorStop(0.5, 'rgba(0,0,0,.42)');
      g.addColorStop(1, 'rgba(0,0,0,.88)');
    }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  /* Modelos ------------------------------------------------------------------ */
  var MODELOS = [
    {
      // sem a faixa de rótulo e data no alto (pedido do usuário): o cartão abre direto na moldura
      id: 'operador', nome: 'Operador', rotulo: 'Cartão de operador', cores: 'escuro', semTopo: true,
      fundo: function (ctx, c, pal) {
        fundoBase(ctx, c);
        brilho(ctx, 540, 470, 560, rgba(c.acento, 0.3));
        relevo(ctx, c.relevo, 900, 120, 9, 46, 1.2);
        relevo(ctx, c.relevo, 120, 1250, 7, 52, 3.1);
      },
      // com foto enviada: a foto vai para a moldura e, desfocada, para o fundo
      fundoFoto: function (ctx, c, pal, foto) {
        ctx.save();
        ctx.filter = 'blur(36px) saturate(1.2)';
        cobrir(ctx, foto, -60, -60, W + 120, H + 120, 0.3);
        ctx.restore();
        ctx.fillStyle = 'rgba(0,0,0,.55)';
        ctx.fillRect(0, 0, W, H);
        brilho(ctx, 540, 470, 560, rgba(c.acento, 0.22));
      },
      conteudo: function (ctx, d, pal, c, arte, foto) {
        // sem anel de mira e sem cantoneiras em volta da foto (pedido do usuário): fica só a moldura
        var cx = 540, cy = 470, S = 420, R = S / 2, k;
        // placa da moldura, com brilho
        var o = R + 36, rO = pal.tatico ? 56 : 64;
        ctx.save();
        ctx.shadowColor = rgba(c.acento, 0.55);
        ctx.shadowBlur = 70;
        forma(ctx, pal, cx - o, cy - o, o * 2, o * 2, rO);
        ctx.fillStyle = c.painelForte;
        ctx.fill();
        ctx.restore();
        var gr = ctx.createLinearGradient(cx - o, cy - o, cx + o, cy + o);
        gr.addColorStop(0, c.acento);
        gr.addColorStop(1, c.acento2);
        forma(ctx, pal, cx - o, cy - o, o * 2, o * 2, rO);
        ctx.lineWidth = 8;
        ctx.strokeStyle = gr;
        ctx.stroke();
        forma(ctx, pal, cx - R - 14, cy - R - 14, S + 28, S + 28, pal.tatico ? 44 : 50);
        ctx.lineWidth = 3;
        ctx.strokeStyle = c.linha;
        ctx.stroke();
        // foto recortada na tela da moldura
        var retrato = foto || arte.perfil;
        ctx.save();
        forma(ctx, pal, cx - R, cy - R, S, S, pal.tatico ? 36 : 42);
        ctx.clip();
        ctx.fillStyle = c.painel;
        ctx.fillRect(cx - R, cy - R, S, S);
        if (retrato) cobrir(ctx, retrato, cx - R, cy - R, S, S, 0.25);
        var v = ctx.createLinearGradient(0, cy, 0, cy + R);
        v.addColorStop(0, 'rgba(0,0,0,0)');
        v.addColorStop(1, 'rgba(0,0,0,.35)');
        ctx.fillStyle = v;
        ctx.fillRect(cx - R, cy, S, R);
        ctx.restore();
        // placa do nível, embaixo no centro
        forma(ctx, pal, cx - 104, cy + o - 34, 208, 68, pal.tatico ? 16 : 34);
        ctx.fillStyle = c.acento2;
        ctx.fill();
        texto(ctx, 'NV ' + ('0' + (d.i + 1)).slice(-2), cx, cy + o + 15, { f: fonte(pal, 800, 42, true), c: '#0b0f0c', a: 'center', ls: 3 });
        // badge: a insígnia da patente numa placa hexagonal, presa no canto da moldura
        var bx = cx + o - 18, by = cy + o - 30;
        ctx.save();
        ctx.shadowColor = rgba(c.acento2, 0.6);
        ctx.shadowBlur = 40;
        hexagono(ctx, bx, by, 104);
        ctx.fillStyle = c.painelForte;
        ctx.fill();
        ctx.restore();
        hexagono(ctx, bx, by, 104);
        ctx.lineWidth = 7;
        ctx.strokeStyle = c.acento2;
        ctx.stroke();
        hexagono(ctx, bx, by, 88);
        ctx.lineWidth = 2;
        ctx.strokeStyle = rgba(c.acento2, 0.45);
        ctx.stroke();
        if (arte.insignia) conter(ctx, arte.insignia, bx, by, 118, 128);
        // nome, patente, carreira
        var y = 875;
        if (d.nome) texto(ctx, caixa(pal, d.nome), cx, y, { f: fonte(pal, 800, pal.tatico ? 104 : 88, true), c: c.tinta, a: 'center', max: 900, ls: pal.tatico ? 4 : -1 });
        texto(ctx, (d.patente + ' · patente ' + (d.i + 1) + ' de 13').toUpperCase(), cx, y + 58, { f: fonte(pal, 700, 30, false), c: c.acentoTexto, a: 'center', ls: 5 });
        var x0 = 170, larg = 740, gap = 10, sw = (larg - gap * 12) / 13;
        for (k = 0; k < 13; k++) {
          forma(ctx, pal, x0 + k * (sw + gap), y + 92, sw, 14, pal.tatico ? 4 : 7);
          ctx.fillStyle = k < d.i ? c.acento : k === d.i ? c.acento2 : c.linha;
          ctx.fill();
        }
        // painel com 3 números
        var py = 1016, ph = 150;
        forma(ctx, pal, 72, py, 936, ph, pal.tatico ? 18 : 28);
        ctx.fillStyle = c.painel;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = c.linha;
        ctx.stroke();
        var stats = [
          { v: d.xp, r: 'XP' },
          { v: String(d.sequencia), r: 'Dias seguidos' },
          { v: d.acertosTxt, r: 'De acertos' }
        ];
        stats.forEach(function (s, j) {
          var sx = 228 + j * 312;
          if (j) {
            ctx.fillStyle = c.linha;
            ctx.fillRect(72 + j * 312, py + 26, 2, ph - 52);
          }
          texto(ctx, s.v, sx, py + 86, { f: fonte(pal, 800, 62, true), c: c.tinta, a: 'center', max: 280 });
          texto(ctx, s.r.toUpperCase(), sx, py + 124, { f: fonte(pal, 700, 22, false), c: c.apagado, a: 'center', ls: 3 });
        });
      },
      alt: function (d) {
        return 'Cartão de operador: foto na moldura com a insígnia de ' + d.patente + ', patente ' + (d.i + 1) + ' de 13, ' +
          d.xp + ' XP, ' + d.sequencia + ' dias seguidos e ' + d.acertosTxt + ' de acertos.';
      },
      share: function (d) { return 'Sou ' + d.patente + ' no Método OBA. Missão dada é missão cumprida!'; }
    },
    {
      id: 'conquista', nome: 'Conquista', rotulo: 'Conquista', cores: 'claro', semData: true,
      fundo: function (ctx, c, pal) {
        if (pal.tatico) {
          fundoBase(ctx, c);
          relevo(ctx, c.relevo, 540, 470, 12, 44, 0.4);
        } else {
          ctx.fillStyle = degradeVertical(ctx, '#fff6dc', '#ffffff', 0, 900);
          ctx.fillRect(0, 0, W, H);
        }
        raios(ctx, 540, 470, 18, 760, rgba(c.acento2, pal.tatico ? 0.16 : 0.2));
        brilho(ctx, 540, 470, 380, rgba(c.acento2, pal.tatico ? 0.3 : 0.42));
      },
      conteudo: function (ctx, d, pal, c, arte, foto) {
        if (foto) brilho(ctx, 540, 470, 380, rgba(c.acento2, 0.3));
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,.35)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 18;
        if (arte.medalha) conter(ctx, arte.medalha, 540, 470, 520, 540);
        else icone(ctx, PH.trofeu, 330, 260, 420, c.acento2);
        ctx.restore();
        var claro = !pal.tatico && !foto;
        estrela4(ctx, 270, 300, 40, claro ? c.acento2 : '#ffffff');
        estrela4(ctx, 820, 250, 28, c.acento2);
        estrela4(ctx, 830, 610, 34, claro ? c.acento2 : '#ffffff');
        estrela4(ctx, 240, 640, 22, c.acento2);
        // data em pílula
        var data = dataLonga(d.hoje).toUpperCase(), fd = fonte(pal, 700, 28, false);
        var wd = medir(ctx, data, fd, 3) + 56;
        forma(ctx, pal, 540 - wd / 2, 790, wd, 58, pal.tatico ? 10 : 29);
        ctx.fillStyle = claro ? rgba(c.acento2, 0.18) : c.painel;
        ctx.fill();
        texto(ctx, data, 540, 829, { f: fd, c: claro ? '#a15c00' : c.acento2, a: 'center', ls: 3 });
        texto(ctx, pal.tatico ? 'CONQUISTEI O TÍTULO' : 'Eu conquistei o título', 540, 930,
          { f: pal.tatico ? fonte(pal, 600, 40, true) : fonte(pal, 600, 42, false), c: pal.tatico ? c.apagado : c.tinta, a: 'center', ls: pal.tatico ? 6 : 0 });
        texto(ctx, caixa(pal, d.titulo) + (pal.tatico ? '' : '!'), 540, 1032,
          { f: fonte(pal, 800, pal.tatico ? 110 : 92, true), c: claro ? c.tinta : c.acento2, a: 'center', max: 940, ls: pal.tatico ? 3 : -2 });
        texto(ctx, d.acertosTxt + ' de acertos nas questões', 540, 1102, { f: fonte(pal, 500, 34, false), c: c.apagado, a: 'center' });
      },
      alt: function (d) { return 'Conquista: medalha de ' + d.medalha + ' e o título ' + d.titulo + ', com ' + d.acertosTxt + ' de acertos nas questões.'; },
      share: function (d) { return 'Conquistei o título ' + d.titulo + ' no Método OBA: ' + d.acertosTxt + ' de acertos nas questões!'; }
    },
    {
      id: 'sequencia', nome: 'Sequência', rotulo: 'Sequência', cores: 'claro',
      fundo: function (ctx, c, pal) {
        if (pal.tatico) fundoBase(ctx, c);
        else {
          ctx.fillStyle = degradeVertical(ctx, '#fff1e2', '#ffffff', 0, 1000);
          ctx.fillRect(0, 0, W, H);
        }
        brilho(ctx, 540, 420, 420, pal.tatico ? 'rgba(254,140,40,.26)' : 'rgba(255,140,40,.28)');
        if (pal.tatico) relevo(ctx, c.relevo, 160, 160, 8, 46, 2.2);
      },
      conteudo: function (ctx, d, pal, c, arte, foto) {
        var claro = !pal.tatico && !foto;
        ctx.save();
        ctx.translate(540 - 170, 180);
        ctx.scale(1.7, 1.7);
        ctx.shadowColor = 'rgba(255,110,20,.55)';
        ctx.shadowBlur = 50;
        var g = ctx.createLinearGradient(0, 0, 0, 260);
        g.addColorStop(0, '#ffd166');
        g.addColorStop(1, '#ff6b1a');
        ctx.fillStyle = g;
        ctx.fill(new Path2D(CHAMA));
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff1b8';
        ctx.fill(new Path2D(CHAMA_MIOLO));
        ctx.restore();
        texto(ctx, String(d.sequencia), 540, 846, { f: fonte(pal, 800, 250, true), c: claro ? c.tinta : '#ffffff', a: 'center', sombra: claro ? '' : 'rgba(0,0,0,.35)', ls: -6 });
        texto(ctx, d.sequencia === 1 ? 'DIA DE SEQUÊNCIA' : 'DIAS SEGUIDOS', 540, 912, { f: fonte(pal, 800, 44, true), c: claro ? '#e8590c' : c.acento2, a: 'center', ls: 8 });
        var semana = d.semana.length ? d.semana : DIAS.map(function (r) { return { rotulo: r, estado: 'pendente', hoje: false }; });
        semana.forEach(function (s, k) {
          var x = 540 + (k - 3) * 118, y = 1018;
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, 42, 0, Math.PI * 2);
          if (s.estado === 'estudado') {
            var gg = ctx.createLinearGradient(0, y - 42, 0, y + 42);
            gg.addColorStop(0, '#ffb547');
            gg.addColorStop(1, '#ff6b1a');
            ctx.fillStyle = gg;
            ctx.fill();
            icone(ctx, PH.check, x - 22, y - 22, 44, '#ffffff');
          } else {
            ctx.fillStyle = claro ? 'rgba(15,23,42,.05)' : 'rgba(255,255,255,.07)';
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = c.linha;
            ctx.stroke();
          }
          if (s.hoje) {
            ctx.beginPath();
            ctx.arc(x, y, 52, 0, Math.PI * 2);
            ctx.lineWidth = 4;
            ctx.strokeStyle = claro ? c.tinta : '#ffffff';
            ctx.stroke();
          }
          ctx.restore();
          texto(ctx, s.rotulo, x, y + 92, { f: fonte(pal, 700, 26, false), c: s.hoje ? c.tinta : c.apagado, a: 'center' });
        });
        texto(ctx, pal.tatico ? 'MISSÃO DADA É MISSÃO CUMPRIDA' : 'Missão dada é missão cumprida.', 540, 1186,
          { f: pal.tatico ? fonte(pal, 600, 32, true) : fonte(pal, 500, 32, false, true), c: c.apagado, a: 'center', ls: pal.tatico ? 5 : 0 });
      },
      alt: function (d) { return 'Sequência: chama com ' + d.sequencia + ' dias seguidos de estudo e os dias da semana marcados.'; },
      share: function (d) { return d.sequencia + ' dias seguidos de estudo no Método OBA. Missão dada é missão cumprida!'; }
    },
    {
      // topo: o rótulo e a data ficam sobre a faixa colorida, então usam as cores dela
      id: 'resumo', nome: 'Resumo', rotulo: 'Resumo do mês', cores: 'claro', topo: 'cor', escurecer: 'baixo',
      fundo: function (ctx, c, pal, d, arte) {
        fundoBase(ctx, c);
        // faixa de cima com as curvas de nível e a insígnia, como a ilustração do Apple Fitness
        var band = pal.tatico ? degradeVertical(ctx, '#173d26', '#08130c', 0, 560) : degradeVertical(ctx, rgba(c.acento, 1), '#14206e', 0, 560);
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, 560);
        ctx.clip();
        ctx.fillStyle = band;
        ctx.fillRect(0, 0, W, 560);
        relevo(ctx, pal.tatico ? 'rgba(135,250,156,.16)' : 'rgba(255,255,255,.16)', 540, 300, 12, 40, 0.8);
        brilho(ctx, 540, 310, 300, pal.tatico ? 'rgba(254,193,51,.28)' : 'rgba(255,255,255,.3)');
        ctx.restore();
      },
      conteudo: function (ctx, d, pal, c, arte, foto) {
        if (!foto && arte.insignia) {
          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,.4)';
          ctx.shadowBlur = 34;
          ctx.shadowOffsetY = 14;
          conter(ctx, arte.insignia, 540, 312, 250, 300);
          ctx.restore();
        }
        if (!foto) {
          // o título que vira identidade, pendurado na borda da faixa
          var ft = fonte(pal, 800, 26, false), t = d.titulo.toUpperCase(), wt = medir(ctx, t, ft, 4) + 52;
          forma(ctx, pal, 72, 532, wt, 56, pal.tatico ? 10 : 28);
          ctx.fillStyle = pal.tatico ? c.acento2 : '#d4f55c';
          ctx.fill();
          texto(ctx, t, 98, 570, { f: ft, c: '#0b0f0c', ls: 4 });
        }
        var mes = MESES[d.hoje.getMonth()] + ' de ' + d.hoje.getFullYear();
        texto(ctx, caixa(pal, mes), 72, 694, { f: fonte(pal, 800, pal.tatico ? 84 : 72, true), c: c.tinta, max: 936, ls: pal.tatico ? 2 : -1 });
        texto(ctx, 'RELATÓRIO DE MISSÃO · ' + d.patente.toUpperCase(), 72, 744, { f: fonte(pal, 600, 26, false), c: c.apagado, ls: 3, max: 936 });
        ctx.fillStyle = c.linha;
        ctx.fillRect(72, 776, 936, 2);
        var itens = [
          { r: 'Taxa de acertos', v: d.acertosTxt.replace('%', ''), u: '%' },
          { r: 'Sequência', v: String(d.sequencia), u: d.sequencia === 1 ? 'dia' : 'dias' },
          d.horas ? { r: 'Horas de estudo', v: d.horas, u: 'h' } : { r: 'Experiência', v: d.xp, u: 'xp' },
          d.horas ? { r: 'Experiência', v: d.xp, u: 'xp' } : { r: 'Patente', v: d.patente, u: '' }
        ];
        itens.forEach(function (it, k) {
          var x = 72 + (k % 2) * 488, y = 850 + Math.floor(k / 2) * 196;
          texto(ctx, caixa(pal, it.r), x, y, { f: fonte(pal, 500, 32, false), c: c.apagado, ls: pal.tatico ? 3 : 0 });
          var fv = fonte(pal, 800, it.u ? 96 : 72, true);
          texto(ctx, it.v, x, y + 96, { f: fv, c: c.tinta, max: 420, ls: -1 });
          if (it.u) texto(ctx, it.u, x + Math.min(420, medir(ctx, it.v, fv, -1)) + 8, y + 96, { f: fonte(pal, 700, 44, true), c: c.tinta });
        });
      },
      alt: function (d) {
        return 'Relatório de missão de ' + MESES[d.hoje.getMonth()] + ': ' + d.acertosTxt + ' de acertos, ' + d.sequencia + ' dias seguidos, ' +
          (d.horas ? d.horas + ' horas de estudo, ' : '') + d.xp + ' XP, patente ' + d.patente + '.';
      },
      share: function (d) { return 'Meu relatório de missão de ' + MESES[d.hoje.getMonth()] + ' no Método OBA.'; }
    },
    {
      id: 'destaque', nome: 'Destaque', rotulo: 'Destaque em questões', cores: 'cor', escurecer: 'baixo',
      fundo: function (ctx, c, pal) {
        fundoBase(ctx, c);
        if (pal.tatico) relevo(ctx, c.relevo, 900, 1100, 12, 48, 1.7);
        else brilho(ctx, 900, 200, 600, 'rgba(255,255,255,.14)');
      },
      conteudo: function (ctx, d, pal, c, arte, foto) {
        var fr = fracao(d);
        var fh = fonte(pal, 700, pal.tatico ? 74 : 64, true);
        texto(ctx, caixa(pal, fr[0]), 72, 250, { f: fh, c: c.tinta, max: 700, ls: pal.tatico ? 2 : -1 });
        texto(ctx, caixa(pal, fr[1]), 72, 332, { f: fonte(pal, 800, pal.tatico ? 74 : 64, true, !pal.tatico), c: c.destaque, max: 700, ls: pal.tatico ? 2 : -1 });
        // selo de estrela no alto, à direita
        selo(ctx, 900, 300, 92, 14, c.destaque);
        icone(ctx, PH.mira, 900 - 44, 300 - 44, 88, c.sobre);
        // a fração em alvos: um por questão, cheio quando acerta. Com foto, o meio fica para ela
        var total = d.acertos === null ? 4 : 10, cheios = d.acertos === null ? 3 : Math.round(d.acertos / 10);
        var passoAlvo = total === 10 ? 92 : 150, xa = 540 - (total - 1) * passoAlvo / 2;
        for (var k = 0; !foto && k < total; k++) {
          var ax = xa + k * passoAlvo, ay = 560;
          ctx.beginPath();
          ctx.arc(ax, ay, 36, 0, Math.PI * 2);
          if (k < cheios) {
            ctx.fillStyle = c.destaque;
            ctx.fill();
            icone(ctx, PH.mira, ax - 24, ay - 24, 48, c.sobre);
          } else {
            ctx.lineWidth = 3;
            ctx.strokeStyle = c.linha;
            ctx.stroke();
          }
        }
        // título em pílula inclinada
        var ft = fonte(pal, 800, 30, false), t = d.titulo.toUpperCase(), wt = medir(ctx, t, ft, 4) + 60;
        ctx.save();
        ctx.translate(96, 820);
        ctx.rotate(-0.07);
        forma(ctx, pal, 0, -44, wt, 66, pal.tatico ? 12 : 33);
        ctx.fillStyle = c.destaque;
        ctx.fill();
        texto(ctx, t, 30, 0, { f: ft, c: c.sobre, ls: 4 });
        ctx.restore();
        texto(ctx, d.acertosTxt, 56, 1120, { f: fonte(pal, 800, pal.tatico ? 330 : 300, true), c: c.tinta, ls: pal.tatico ? 0 : -14, max: 980, sombra: foto ? 'rgba(0,0,0,.35)' : '' });
        texto(ctx, caixa(pal, 'de acertos nas questões'), 72, 1186, { f: fonte(pal, 500, 36, false), c: c.apagado, ls: pal.tatico ? 4 : 0 });
      },
      alt: function (d) { return 'Destaque: ' + d.acertosTxt + ' de acertos nas questões, ' + fracao(d).join(' ') + ' Título ' + d.titulo + '.'; },
      share: function (d) { return fracao(d).join(' ') + ' ' + d.acertosTxt + ' de acertos no Método OBA.'; }
    },
    {
      id: 'calendario', nome: 'Calendário', rotulo: 'Calendário', cores: 'cor',
      fundo: function (ctx, c, pal) {
        fundoBase(ctx, c);
        if (pal.tatico) relevo(ctx, c.relevo, 980, 160, 8, 44, 0.2);
      },
      conteudo: function (ctx, d, pal, c, arte, foto) {
        var hoje = d.hoje, ano = hoje.getFullYear(), mes = hoje.getMonth(), dia = hoje.getDate();
        var primeiro = new Date(ano, mes, 1).getDay(), total = new Date(ano, mes + 1, 0).getDate();
        // mock: os dias da sequência, contados para trás a partir de hoje
        var inicio = dia - Math.min(d.sequencia, dia) + 1, ativos = dia - inicio + 1;
        if (!d.sequencia) ativos = 0;
        var ft = fonte(pal, 800, pal.tatico ? 84 : 76, true);
        texto(ctx, caixa(pal, 'Rotina de'), 72, 250, { f: ft, c: c.tinta, ls: pal.tatico ? 2 : -2 });
        texto(ctx, caixa(pal, 'estudos'), 72, 336, { f: fonte(pal, 800, pal.tatico ? 84 : 76, true, !pal.tatico), c: c.tinta, ls: pal.tatico ? 2 : -2 });
        texto(ctx, caixa(pal, MESES[mes] + ' de ' + ano), 72, 392, { f: fonte(pal, 600, 30, false), c: c.apagado, ls: pal.tatico ? 4 : 0 });
        texto(ctx, caixa(pal, 'dias ativos'), 1008, 232, { f: fonte(pal, 600, 30, false), c: c.apagado, a: 'right', ls: pal.tatico ? 4 : 0 });
        texto(ctx, String(ativos), 1008, 360, { f: fonte(pal, 800, 140, true), c: c.destaque, a: 'right' });
        var passo = 124, x0 = 540 - 3 * passo, linhas = Math.ceil((primeiro + total) / 7);
        var y0 = 560, dy = linhas > 5 ? 104 : 120;
        DIAS.forEach(function (r, k) {
          texto(ctx, r, x0 + k * passo, 490, { f: fonte(pal, 700, 28, false), c: c.apagado, a: 'center' });
        });
        for (var n = 1; n <= total; n++) {
          var pos = primeiro + n - 1, x = x0 + (pos % 7) * passo, y = y0 + Math.floor(pos / 7) * dy;
          var ativo = ativos && n >= inicio && n <= dia, futuro = n > dia;
          ctx.beginPath();
          ctx.arc(x, y, 46, 0, Math.PI * 2);
          ctx.fillStyle = ativo ? c.destaque : futuro ? 'rgba(255,255,255,.05)' : 'rgba(255,255,255,.13)';
          ctx.fill();
          if (n === dia) {
            ctx.beginPath();
            ctx.arc(x, y, 56, 0, Math.PI * 2);
            ctx.lineWidth = 4;
            ctx.strokeStyle = c.tinta;
            ctx.stroke();
          }
          texto(ctx, String(n), x, y + 11, { f: fonte(pal, ativo ? 800 : 600, 30, false), c: ativo ? c.sobre : futuro ? 'rgba(255,255,255,.32)' : c.apagado, a: 'center' });
        }
      },
      alt: function (d) {
        return 'Calendário de ' + MESES[d.hoje.getMonth()] + ' com os dias de estudo marcados: ' + Math.min(d.sequencia, d.hoje.getDate()) + ' dias ativos.';
      },
      share: function (d) { return Math.min(d.sequencia, d.hoje.getDate()) + ' dias ativos em ' + MESES[d.hoje.getMonth()] + ' no Método OBA.'; }
    }
  ];

  /* Artes: foto do perfil, insígnia (token do CSS) e medalha (arquivo ao lado deste) --- */
  function carregar(src, cors) {
    return new Promise(function (ok) {
      if (!src) return ok(null);
      var img = new Image();
      if (cors) img.crossOrigin = 'anonymous';
      img.onload = function () { ok(img); };
      img.onerror = function () { ok(null); };
      img.src = src;
    });
  }
  // Dá largura e altura ao SVG (que só tem viewBox) para o canvas rasterizar nítido
  function svgComTamanho(svg, largura) {
    var vb = (svg.match(/viewBox=['"]([^'"]+)['"]/) || [])[1];
    var n = vb ? vb.trim().split(/[\s,]+/).map(Number) : [0, 0, 100, 100];
    var alt = Math.round(largura * n[3] / n[2]);
    svg = svg.replace(/<svg\b([^>]*)>/, function (m, atr) {
      return '<svg' + atr.replace(/\s(width|height)=(['"])[^'"]*\2/g, '') + ' width="' + largura + '" height="' + alt + '">';
    });
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  var cache = {};
  function lembrar(chave, fn) {
    if (!(chave in cache)) cache[chave] = fn();
    return cache[chave];
  }
  function artes(d) {
    var foto = document.querySelector('.header-desktop .account-wrap img.profile-picture-change');
    var src = foto ? foto.src : '';
    // o retrato temporário do Unsplash vem em 160 px: pede um maior para a imagem de 1080
    if (/images\.unsplash\.com/.test(src)) src = src.replace(/([?&])w=\d+/, '$1w=720').replace(/([?&])h=\d+/, '$1h=720');
    var token = getComputedStyle(document.body).getPropertyValue('--pat-' + d.slug).trim();
    var m = token.match(/^url\(["']?(data:image\/svg\+xml[^,]*,)(.*?)["']?\)$/);
    return Promise.all([
      lembrar('perfil:' + src, function () { return carregar(src, true); }),
      lembrar('insignia:' + token.length + d.slug, function () {
        if (!m) return Promise.resolve(null);
        try { return carregar(svgComTamanho(decodeURIComponent(m[2]), 480)); } catch (e) { return Promise.resolve(null); }
      }),
      lembrar('logo', function () { return carregar(new URL('logo-metodooba.png', BASE).href, true); }),
      lembrar('medalha:' + d.medalha, function () {
        return fetch(new URL('medalha-' + d.medalha + '.svg', BASE).href)
          .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
          .then(function (svg) { return carregar(svgComTamanho(svg, 560)); })
          .catch(function () { return null; });
      })
    ]).then(function (r) { return { perfil: r[0], insignia: r[1], logo: r[2], medalha: r[3] }; });
  }
  function fontes(pal) {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    var amostra = 'ÁÉÍÓÚÂÊÔÃÕÇáéíóúâêôãõç0123456789%·';
    var lista = pal.tatico
      ? ['700 40px Rajdhani', '600 40px Rajdhani', '500 40px Barlow', '600 40px Barlow', '700 40px Barlow', '800 40px Barlow', 'italic 500 40px Barlow']
      : ['500 40px Inter', '600 40px Inter', '700 40px Inter', '800 40px Inter', 'italic 500 40px Inter'];
    var espera = new Promise(function (ok) { setTimeout(ok, 2500); });
    return Promise.race([Promise.all(lista.map(function (f) { return document.fonts.load(f, amostra).catch(function () {}); })), espera]);
  }

  function desenhar(cv, m, d, pal, arte) {
    var ctx = cv.getContext('2d');
    var foto = estado.fundo === 'foto' && estado.foto ? estado.foto : null;
    var c = foto ? pal.foto : pal[m.cores];
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    if (foto) {
      if (m.fundoFoto) m.fundoFoto(ctx, c, pal, foto);
      else fundoFoto(ctx, foto, m.escurecer);
    } else {
      m.fundo(ctx, c, pal, d, arte);
    }
    ctx.restore();
    ctx.save();
    m.conteudo(ctx, d, pal, c, arte, foto);
    ctx.restore();
    if (pal.tatico) cantoneiras(ctx, c);
    if (!m.semTopo) topo(ctx, pal, !foto && m.topo ? pal[m.topo] : c, m.rotulo, d, m.semData);
    rodape(ctx, pal, c, arte.logo);
  }

  /* Folha -------------------------------------------------------------------- */
  var estado = { atual: 0, fundo: 'padrao', foto: null, fotoUrl: '' };
  // PNG de cada modelo, gerado antes do clique: o navigator.share precisa sair no mesmo gesto
  // do usuário (o Safari não espera o toBlob)
  var prontos = [], desenhado = false;
  var dlg, trilho, slides = [], pontos = [], nomeModelo, aviso, botaoFoto, botaoPadrao, entrada, botaoCompartilhar, dadosAtuais;
  var SVG = {
    x: '<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"/></svg>',
    baixar: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/></svg>',
    enviar: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3.5M7.5 8 12 3.5 16.5 8M6 12v6.5A1.5 1.5 0 0 0 7.5 20h9a1.5 1.5 0 0 0 1.5-1.5V12"/></svg>',
    foto: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="m21 16-4.5-4.5L7 19.5"/></svg>',
    seta: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>'
  };

  // O CSS da folha vem junto com o troféu, não no primeiro clique: assim a folha não abre sem estilo
  function estilo() {
    if (document.querySelector('link[data-cc-cq-css]')) return;
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = new URL('compartilhar.css', BASE).href;
    css.setAttribute('data-cc-cq-css', '');
    document.head.appendChild(css);
  }

  function montar() {
    estilo();

    dlg = document.createElement('dialog');
    dlg.className = 'cc-cq';
    dlg.setAttribute('data-mock', 'ENG-1625');
    dlg.setAttribute('aria-labelledby', 'cc-cq-titulo');
    dlg.innerHTML =
      '<div class="cc-cq__folha">' +
        '<div class="cc-cq__topo">' +
          '<button type="button" class="cc-cq__redondo" data-fechar aria-label="Fechar">' + SVG.x + '</button>' +
          '<h2 class="cc-cq__titulo" id="cc-cq-titulo">Compartilhar</h2>' +
          '<button type="button" class="cc-cq__redondo" data-baixar aria-label="Baixar a imagem">' + SVG.baixar + '</button>' +
        '</div>' +
        '<div class="cc-cq__palco">' +
          '<button type="button" class="cc-cq__seta" data-passo="-1" aria-label="Modelo anterior">' + SVG.seta + '</button>' +
          '<div class="cc-cq__trilho" tabindex="0" role="region" aria-roledescription="carrossel" aria-label="Modelos para compartilhar"></div>' +
          '<button type="button" class="cc-cq__seta" data-passo="1" aria-label="Próximo modelo">' + SVG.seta + '</button>' +
        '</div>' +
        '<div class="cc-cq__pontos"></div>' +
        '<p class="cc-cq__modelo" aria-live="polite"></p>' +
        '<div class="cc-cq__fundos" role="radiogroup" aria-label="Fundo da imagem">' +
          '<button type="button" class="cc-cq__fundo" role="radio" aria-checked="false" data-fundo="foto">' +
            '<span class="cc-cq__fundo-ico">' + SVG.foto + '</span><span class="cc-cq__fundo-nome">Adicionar foto</span></button>' +
          '<button type="button" class="cc-cq__fundo cc-cq__fundo--padrao" role="radio" aria-checked="true" data-fundo="padrao">' +
            '<span class="cc-cq__fundo-nome">Padrão</span></button>' +
        '</div>' +
        '<input type="file" accept="image/*" class="cc-cq__arquivo" tabindex="-1" aria-hidden="true">' +
        '<p class="cc-cq__aviso" role="status"></p>' +
        '<div class="cc-cq__acoes">' +
          '<button type="button" class="cc-cq__botao" data-fechar>Cancelar</button>' +
          '<button type="button" class="cc-cq__botao cc-cq__botao--primario" data-compartilhar>' + SVG.enviar + '<span>Compartilhar</span></button>' +
        '</div>' +
      '</div>';
    trilho = dlg.querySelector('.cc-cq__trilho');
    nomeModelo = dlg.querySelector('.cc-cq__modelo');
    aviso = dlg.querySelector('.cc-cq__aviso');
    botaoFoto = dlg.querySelector('[data-fundo="foto"]');
    botaoPadrao = dlg.querySelector('[data-fundo="padrao"]');
    entrada = dlg.querySelector('.cc-cq__arquivo');
    botaoCompartilhar = dlg.querySelector('[data-compartilhar]');
    var caixaPontos = dlg.querySelector('.cc-cq__pontos');
    MODELOS.forEach(function (m, k) {
      var s = document.createElement('div');
      s.className = 'cc-cq__slide';
      s.setAttribute('role', 'group');
      s.setAttribute('aria-roledescription', 'modelo');
      s.setAttribute('aria-label', m.nome + ', ' + (k + 1) + ' de ' + MODELOS.length);
      var cv = document.createElement('canvas');
      cv.width = W;
      cv.height = H;
      cv.setAttribute('role', 'img');
      s.appendChild(cv);
      s.addEventListener('click', function () { if (k !== estado.atual) ir(k); });
      trilho.appendChild(s);
      slides.push(s);
      var p = document.createElement('button');
      p.type = 'button';
      p.setAttribute('aria-label', 'Modelo ' + (k + 1) + ': ' + m.nome);
      p.addEventListener('click', function () { ir(k); });
      caixaPontos.appendChild(p);
      pontos.push(p);
    });

    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('[data-fechar]')) return fechar();
      var b = e.target.closest('[data-passo]');
      if (b) return ir(estado.atual + Number(b.getAttribute('data-passo')));
      if (e.target.closest('[data-baixar]')) return exportar(false);
      if (e.target.closest('[data-compartilhar]')) return exportar(true);
      var f = e.target.closest('[data-fundo]');
      if (!f) return;
      if (f.getAttribute('data-fundo') === 'padrao') return escolherFundo('padrao');
      // sem foto, ou com a foto já escolhida: abre o seletor de arquivo (trocar a foto)
      if (!estado.foto || estado.fundo === 'foto') entrada.click();
      else escolherFundo('foto');
    });
    entrada.addEventListener('change', function () {
      var arq = entrada.files && entrada.files[0];
      entrada.value = '';
      if (arq) usarFoto(URL.createObjectURL(arq), true);
    });
    trilho.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); ir(estado.atual + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); ir(estado.atual - 1); }
    });
    var quadro = 0;
    trilho.addEventListener('scroll', function () {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(function () {
        var meio = trilho.scrollLeft + trilho.clientWidth / 2, melhor = 0, dist = Infinity;
        slides.forEach(function (s, k) {
          var dd = Math.abs(s.offsetLeft + s.offsetWidth / 2 - meio);
          if (dd < dist) { dist = dd; melhor = k; }
        });
        if (melhor !== estado.atual) marcar(melhor);
      });
    }, { passive: true });
    dlg.addEventListener('close', function () {
      document.documentElement.classList.remove('cc-cq-aberto');
    });
    document.body.appendChild(dlg);
    marcar(0);
  }

  function marcar(k) {
    estado.atual = k;
    slides.forEach(function (s, j) { s.classList.toggle('is-atual', j === k); });
    pontos.forEach(function (p, j) { p.setAttribute('aria-current', String(j === k)); });
    nomeModelo.textContent = MODELOS[k].nome;
    preparar(k);
    dlg.querySelector('[data-passo="-1"]').disabled = k === 0;
    dlg.querySelector('[data-passo="1"]').disabled = k === MODELOS.length - 1;
  }
  function ir(k, instantaneo) {
    k = Math.max(0, Math.min(MODELOS.length - 1, k));
    var s = slides[k];
    var calmo = instantaneo || matchMedia('(prefers-reduced-motion: reduce)').matches;
    trilho.scrollTo({ left: s.offsetLeft - (trilho.clientWidth - s.offsetWidth) / 2, behavior: calmo ? 'auto' : 'smooth' });
    marcar(k);
  }

  function escolherFundo(qual) {
    estado.fundo = qual;
    botaoFoto.setAttribute('aria-checked', String(qual === 'foto'));
    botaoPadrao.setAttribute('aria-checked', String(qual === 'padrao'));
    renderizar();
  }
  function usarFoto(url, doUsuario) {
    return carregar(url, !doUsuario).then(function (img) {
      if (!img) { avisar('Não deu para abrir essa imagem. Tente outra.'); return; }
      if (estado.fotoUrl && estado.fotoUrl.indexOf('blob:') === 0) URL.revokeObjectURL(estado.fotoUrl);
      estado.foto = img;
      estado.fotoUrl = url;
      botaoFoto.classList.add('tem-foto');
      botaoFoto.style.setProperty('--cq-foto', 'url("' + url + '")');
      botaoFoto.querySelector('.cc-cq__fundo-nome').textContent = 'Sua foto';
      botaoFoto.setAttribute('aria-label', 'Sua foto (clique de novo para trocar)');
      avisar('A foto fica só neste navegador: não vai para o servidor.');
      escolherFundo('foto');
    });
  }
  function avisar(msg) {
    aviso.textContent = msg;
    clearTimeout(avisar.t);
    avisar.t = setTimeout(function () { aviso.textContent = ''; }, 5000);
  }

  var vez = 0;
  function renderizar() {
    var minha = ++vez;
    var d = dadosAtuais = dados(), pal = paleta();
    botaoPadrao.style.setProperty('--cq-insignia', 'var(--pat-' + d.slug + ')');
    dlg.classList.add('is-carregando');
    return Promise.all([fontes(pal), artes(d)]).then(function (r) {
      if (minha !== vez) return;
      MODELOS.forEach(function (m, k) {
        var cv = slides[k].querySelector('canvas');
        desenhar(cv, m, d, pal, r[1]);
        cv.setAttribute('aria-label', m.alt(d));
      });
      prontos = [];
      desenhado = true;
      preparar(estado.atual);
      dlg.classList.remove('is-carregando');
    });
  }

  function preparar(k) {
    if (!desenhado || prontos[k]) return;
    var lista = prontos;
    slides[k].querySelector('canvas').toBlob(function (blob) { if (lista === prontos) prontos[k] = blob; }, 'image/png');
  }
  function exportar(compartilhar) {
    var k = estado.atual, m = MODELOS[k];
    var nome = 'metodo-oba-' + m.id + '.png';
    var entregar = function (blob) {
      if (!blob) { avisar('Não deu para gerar a imagem.'); return; }
      var arq = new File([blob], nome, { type: 'image/png' });
      if (compartilhar && navigator.canShare && navigator.canShare({ files: [arq] })) {
        navigator.share({ files: [arq], title: 'Método OBA', text: m.share(dadosAtuais) })
          .then(function () { avisar('Imagem compartilhada.'); })
          .catch(function (e) { if (e && e.name !== 'AbortError') baixar(blob, nome); });
      } else {
        baixar(blob, nome);
      }
    };
    if (prontos[k]) return entregar(prontos[k]);
    botaoCompartilhar.disabled = true;
    slides[k].querySelector('canvas').toBlob(function (blob) {
      botaoCompartilhar.disabled = false;
      entregar(blob);
    }, 'image/png');
  }
  function baixar(blob, nome) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nome;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    avisar('Imagem salva: ' + nome);
  }

  function abrir() {
    if (!dlg) montar();
    if (dlg.open) return;
    aviso.textContent = '';
    document.documentElement.classList.add('cc-cq-aberto');
    dlg.showModal();
    renderizar();
    requestAnimationFrame(function () { ir(estado.atual, true); });
  }
  function fechar() {
    if (dlg && dlg.open) dlg.close();
  }

  // O troféu (um <div> vazio no PHP) vira botão
  function ligarTrofeu() {
    var t = document.querySelector('.header-desktop .account-wrap-reward');
    if (!t || t.hasAttribute('data-cc-conquistas')) return;
    estilo();
    t.setAttribute('data-cc-conquistas', '');
    t.setAttribute('role', 'button');
    t.setAttribute('tabindex', '0');
    t.setAttribute('aria-haspopup', 'dialog');
    t.setAttribute('aria-label', 'Destaque em questões: ver e compartilhar suas conquistas');
    t.addEventListener('click', function (e) { e.stopPropagation(); abrir(); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); }
    });
  }

  window.ccConquistas = { abrir: abrir, fechar: fechar, usarFoto: usarFoto, ir: ir, estado: estado, modelos: MODELOS };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ligarTrofeu);
  else ligarTrofeu();
})();
