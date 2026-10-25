/* Resilience Dynamic — illustration system.
   One family of small landscapes, all printed like the "walk" scene: a soft sky gradient, a glowing grainy sun,
   rolling hills in layers with stippled shading, a cream path, trees made of grainy spheres and, close to us, people with hair, body and clothes.
   Only the hour changes the palette (day mint, dawn peach, dusk lilac, night teal-blue); the hills stay green.
   Rendered like riso prints: multi-stop gradients for volume, stippled grain in the shadows,
   a fine paper grain over everything and a soft gloss on round forms.
   RD.art(kind) → SVG string (360×240, scales with `slice`). */
(function () {
  const RD = (window.RD = window.RD || {});
  let uid = 0;

  /* Tone ramps: [light, base, shade] */
  const T = {
    teal: ['#cdf3f4', '#58c6cd', '#1f7a84'],
    sun: ['#fff4cc', '#f6c45c', '#e0782f'],
    coral: ['#fff0d6', '#f8aa6c', '#e0663a'],
    moon: ['#fffaf1', '#fbe3cc', '#eba98e'],
    mint: ['#e9fbe9', '#9fdcb8', '#3c9470'],
    forest: ['#8fd1a8', '#3f8f68', '#1d4f3a'],
    leaf: ['#6fbd8f', '#327a57', '#173f2e'],
    stone: ['#e3ebe6', '#9fb3ad', '#55706b'],
  };
  /* Hill layers, far to near: [fill ramp, stipple shade] */
  const H = {
    far: [[T.mint[0], '#bfe8cc'], ['#7cc49b', 0, 0.75]],
    mid: [['#a9e0bf', T.mint[1], '#6fbf93'], [T.mint[2], 0.05, 0.9]],
    near: [['#7cc79c', '#56a87d', '#3a8662'], [T.forest[2], 0.1, 0.95]],
  };
  const INK = '#13152b';
  const POOL = ['#d6f4ea', '#6cc4b0', '#2a7f72'];
  /* People: skin, hair and cloth ramps [light, base, shade], printed like the rest */
  const P = {
    skin: {
      s1: ['#ffe8d8', '#f4c9a8', '#c98d66'],
      s2: ['#f8d4b4', '#dca47c', '#a86a48'],
      s3: ['#e2aa80', '#b47850', '#774628'],
      s4: ['#b67e5a', '#7f4c32', '#46261a'],
    },
    hair: {
      black: ['#4f4a66', '#23213a', '#0c0b18'],
      brown: ['#a06a46', '#663d26', '#36190c'],
      auburn: ['#e8956a', '#b0552c', '#6a2a14'],
      silver: ['#ffffff', '#dcdee9', '#9a9eb4'],
    },
    cloth: {
      violet: ['#e0e0ff', '#8f92f2', '#4a4ed6'],
      lilac: ['#f4eeff', '#c9b9f0', '#8a74c6'],
      teal: T.teal,
      mint: ['#e9fbe9', '#8fd4ae', '#2f8a63'],
      sun: T.sun,
      coral: T.coral,
      cream: ['#fffaf0', '#f0e0c4', '#c7a87c'],
      navy: ['#4d5676', '#272c4a', '#0e1022'],
      white: ['#ffffff', '#f1f2f8', '#b9bccd'],
    },
  };

  function scene(w = 360, h = 240) {
    const id = 'ra' + ++uid;
    const defs = [];
    let n = 0;
    const stops = (list) =>
      list
        .map((s, i) => {
          const [o, c, a] = Array.isArray(s) ? s : [i / (list.length - 1), s, 1];
          return `<stop offset="${o}" stop-color="${c}"${a != null && a < 1 ? ` stop-opacity="${a}"` : ''}/>`;
        })
        .join('');
    const grad = (tag, list, attrs) => {
      const gid = `${id}g${n++}`;
      defs.push(`<${tag} id="${gid}" ${attrs}>${stops(list)}</${tag}>`);
      return `url(#${gid})`;
    };
    const s = {
      id,
      w,
      h,
      lin: (list, x1 = 0, y1 = 0, x2 = 0, y2 = 1) => grad('linearGradient', list, `x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"`),
      rad: (list, cx = 0.5, cy = 0.5, r = 0.5, fx = cx, fy = cy) =>
        grad('radialGradient', list, `cx="${cx}" cy="${cy}" r="${r}" fx="${fx}" fy="${fy}"`),
      /* A form: gradient fill, then the same outline again in the shade colour, fading in along `dir`
         and broken into grain by the stipple filter — the riso shadow. */
      form(tag, attrs, fill, shade) {
        let out = `<${tag} ${attrs} fill="${fill}"/>`;
        if (shade) {
          const [c, from = 0, to = 0.95, dir = [0, 0, 0, 1]] = shade;
          const g = s.lin([[0, c, from], [1, c, to]], ...dir);
          out += `<${tag} ${attrs} fill="${g}" filter="url(#${id}t)"/>`;
        }
        return out;
      },
      /* A round, glossy body: radial ramp lit from the top-left, stippled shade bottom-right, specular. */
      ball(cx, cy, r, ramp, gloss = 0.7) {
        const [hi, base, lo] = ramp;
        const at = `cx="${cx}" cy="${cy}" r="${r}"`;
        return (
          `<circle ${at} fill="${s.rad([[0, hi], [0.55, base], [1, lo]], 0.36, 0.32, 0.78)}"/>` +
          `<circle ${at} fill="${s.rad([[0.45, lo, 0], [1, lo, 0.95]], 0.3, 0.26, 0.85)}" filter="url(#${id}t)"/>` +
          (gloss
            ? `<ellipse cx="${cx - r * 0.34}" cy="${cy - r * 0.42}" rx="${r * 0.38}" ry="${r * 0.2}" transform="rotate(-28 ${cx - r * 0.34} ${cy - r * 0.42})" fill="${s.rad([[0, '#fff', gloss], [1, '#fff', 0]])}"/>`
            : '')
        );
      },
      /* Soft light bloom behind suns and moons. */
      glow(cx, cy, r, c, a = 0.8) {
        return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${s.rad([[0, c, a], [1, c, 0]])}"/>`;
      },
      /* The shared props, all cut from the "walk" print. */
      sky: (list, ...dir) => `<rect width="${w}" height="${h}" fill="${s.lin(list, ...dir)}"/>`,
      sun: (cx, cy, r, ramp = T.sun, halo = '#fff0b8') => s.glow(cx, cy, r * 2.35, halo, 0.9) + s.ball(cx, cy, r, ramp),
      hill: (d, [ramp, shade]) => s.form('path', `d="${d}"`, s.lin(ramp), shade),
      /* A body part or garment: a [light, base, shade] ramp along `dir`, stippled shade on the far end. */
      part: (d, ramp, dir = [0, 0, 1, 1], from = 0.15) => s.form('path', `d="${d}"`, s.lin(ramp, ...dir), [ramp[2], from, 0.9, dir]),
      path: (d, w = 14, ramp = ['#fff8ec', '#f3e4cc']) => `<path d="${d}" fill="none" stroke="${s.lin(ramp)}" stroke-width="${w}" stroke-linecap="round"/>`,
      tree: (x, y, k = 1, crown = T.forest, side = T.leaf, trunk = '#2c5a45') =>
        `<path d="M${x} ${y} V${y - 48 * k}" stroke="${trunk}" stroke-width="${4 * k}" stroke-linecap="round"/>` +
        s.ball(x, y - 60 * k, 26 * k, crown, 0.45) +
        s.ball(x + 18 * k, y - 46 * k, 16 * k, side, 0.35),
      /* Light on water: short horizontal strokes, shrinking and fading away from the horizon. */
      shimmer: (x, y, w, c = '#fff8e6', rows = 5, gap = 8) =>
        Array.from({ length: rows }, (_, i) => {
          const half = (w * (1 - i / (rows + 1))) / 2;
          return `<path d="M${x - half} ${y + i * gap} H${x + half}" stroke="${c}" stroke-width="3" stroke-linecap="round" opacity="${(0.9 - i * 0.14).toFixed(2)}"/>`;
        }).join(''),
      svg(body) {
        const filters =
          /* paper grain over the whole print: grey noise soft-lit into the colours */
          `<filter id="${id}n" x="0" y="0" width="${w}" height="${h}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
             <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="2" seed="4" stitchTiles="stitch"/>
             <feColorMatrix type="saturate" values="0"/>
             <feComponentTransfer><feFuncR type="linear" slope="1.8" intercept="-.4"/><feFuncG type="linear" slope="1.8" intercept="-.4"/><feFuncB type="linear" slope="1.8" intercept="-.4"/><feFuncA type="table" tableValues="1 1"/></feComponentTransfer>
             <feBlend in2="SourceGraphic" mode="soft-light"/>
             <feComposite in2="SourceGraphic" operator="in"/>
           </filter>` +
          /* stipple: the shade's opacity becomes dot density (alpha minus noise, then thresholded) */
          `<filter id="${id}t" x="0" y="0" width="${w}" height="${h}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
             <feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="1" seed="11" result="t"/>
             <feColorMatrix in="t" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.9 0 0 0 -.45" result="na"/>
             <feComposite in="SourceAlpha" in2="na" operator="arithmetic" k2="1" k3="-1" result="d"/>
             <feComponentTransfer in="d" result="m"><feFuncA type="linear" slope="6"/></feComponentTransfer>
             <feComposite in="SourceGraphic" in2="m" operator="in" result="c"/>
             <feComponentTransfer in="c"><feFuncA type="linear" slope="1.6"/></feComponentTransfer>
           </filter>`;
        return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>${defs.join('')}${filters}</defs><g filter="url(#${id}n)">${body}</g></svg>`;
      },
    };
    return s;
  }

  const stars = (pts, c = '#fff') => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".8"/>`).join('');

  const scenes = {
    /* Night: a crescent over dark hills, a glowing tent, the moon broken on the lake. */
    sleep(s) {
      const id = s.id + 'm';
      const night = ['#3d6b5e', '#21443b', '#0d2620'];
      return s.svg(
        `${s.sky(['#0f1b33', '#1b3350', '#2e5862'])}
         ${stars([[40, 38, 1.6], [92, 66, 1.2], [140, 28, 1.4], [196, 54, 1], [322, 34, 1.4], [306, 112, 1.1], [58, 104, 1], [226, 22, 1.2]])}
         ${s.glow(262, 70, 70, '#f8e9c0', 0.35)}
         <mask id="${id}"><rect width="360" height="240" fill="#fff"/><circle cx="276" cy="58" r="24" fill="#000"/></mask>
         <g mask="url(#${id})">${s.ball(262, 70, 27, ['#fffbea', '#f6e7c1', '#c9a868'], 0.5)}</g>
         ${s.hill('M0 140 C70 120 140 130 200 138 S310 118 360 126 V240 H0Z', [['#2f5f60', '#24494d'], ['#0c2025', 0, 0.85]])}
         ${s.hill('M0 168 C70 152 150 162 220 168 S320 156 360 160 V202 H0Z', [['#1f4044', '#173236'], ['#081719', 0.1, 0.9]])}
         ${s.form('rect', 'y="200" width="360" height="40"', s.lin(['#24425a', '#132539']), ['#08121e', 0, 0.8])}
         ${s.shimmer(262, 208, 56, '#f6e7c1', 4, 8)}
         ${s.glow(108, 172, 34, '#ffd98a', 0.55)}
         <path d="M86 180 L108 148 L130 180Z" fill="${s.lin(['#3a5868', '#1b2f3d'])}"/>
         <path d="M103 180 L108 164 L113 180Z" fill="${s.lin(['#ffe7a8', '#f6c45c'])}"/>
         ${s.tree(46, 176, 0.75, night, ['#2f5a4c', '#183a31', '#0a1f1a'], '#0f2a24')}`
      );
    },
    /* Dawn over a lake: the sun lifting off the water, and a sprout on the near bank. */
    sunrise(s) {
      return s.svg(
        `${s.sky(['#f9cdb8', '#fde0cd', '#f7ece0'])}
         ${s.glow(180, 142, 112, '#ffd9b0', 0.9)}
         ${s.ball(180, 142, 34, T.coral, 0.5)}
         ${s.hill('M0 124 C40 114 92 122 132 150 H0Z', [['#d8eedb', '#bfe2c8'], ['#7cc49b', 0, 0.7]])}
         ${s.hill('M360 118 C318 112 262 126 230 150 H360Z', [['#d8eedb', '#bfe2c8'], ['#7cc49b', 0, 0.7]])}
         ${s.form('rect', 'y="148" width="360" height="92"', s.lin(['#fbe1d0', '#d4ebe2', '#a3d3cf']), ['#4c9ea8', 0, 0.6])}
         ${s.shimmer(180, 156, 70, '#fff1dc', 6, 8)}
         <path d="M262 176 H300 M60 168 H92 M280 196 H320" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
         ${s.hill('M0 204 C50 194 104 200 142 240 H0Z', H.mid)}
         <path d="M76 214 C76 204 78 196 76 186" fill="none" stroke="#3f8f68" stroke-width="3" stroke-linecap="round"/>
         ${s.form('path', 'd="M76 194 C63 193 56 183 58 174 C70 175 77 184 76 194Z"', s.lin(['#bdebcd', '#6fbf93'], 0, 0, 1, 1), [T.forest[2], 0, 0.8, [0, 0, 1, 1]])}
         ${s.form('path', 'd="M77 190 C86 187 94 178 94 169 C83 169 77 178 77 190Z"', s.lin(['#bdebcd', '#56a87d'], 0, 0, 1, 1), [T.forest[2], 0, 0.85, [0, 0, 1, 1]])}`
      );
    },
    /* A cairn balanced on the shore, the sun behind it shining on the water. */
    stones(s) {
      const stone = (cx, cy, rx, ry, ramp = T.stone) =>
        s.form('ellipse', `cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"`, s.rad([[0, ramp[0]], [0.6, ramp[1]], [1, ramp[2]]], 0.4, 0.3, 0.8), ['#2a4440', 0.1, 0.9]);
      return s.svg(
        `${s.sky(['#e0f1ee', '#f3f5ea', '#fdeedd'])}
         ${s.sun(254, 80, 20)}
         ${s.hill('M0 134 C60 118 120 126 170 136 S290 116 360 126 V160 H0Z', H.far)}
         ${s.form('rect', 'y="146" width="360" height="94"', s.lin(['#d9f2ef', '#9fd8d6', '#5fb0b3']), [T.teal[2], 0, 0.7])}
         ${s.shimmer(254, 154, 54, '#fff8e6', 5, 7)}
         <path d="M40 162 H78 M300 196 H336" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>
         ${s.form('path', 'd="M0 184 C60 172 140 172 200 182 S310 210 360 222 V240 H0Z"', s.lin(['#fff8ec', '#f3e4cc']), ['#d6b98c', 0, 0.8])}
         ${stone(140, 182, 30, 10)}
         ${stone(136, 165, 23, 9)}
         ${stone(142, 149, 17, 7.5)}
         ${stone(139, 135, 11, 6)}
         ${s.ball(140, 124, 6, T.sun, 0.6)}
         <ellipse cx="132" cy="161" rx="9" ry="2.4" fill="#fff" opacity=".5"/>
         <ellipse cx="134" cy="132" rx="4.5" ry="1.8" fill="#fff" opacity=".6"/>
         ${s.hill('M250 240 C276 216 318 206 360 206 V240Z', H.near)}`
      );
    },
    /* Balance on a hilltop: one warm sphere against two cool ones on a plank over a rock. */
    balance(s) {
      return s.svg(
        `${s.sky(['#def3e6', '#f2f7e8', '#fdf3e4'])}
         ${s.glow(180, 112, 120, '#fff0b8', 0.7)}
         ${s.hill('M0 134 C70 116 140 126 200 132 S310 114 360 122 V240 H0Z', H.far)}
         ${s.hill('M0 196 C70 172 130 164 180 164 S290 176 360 192 V240 H0Z', H.mid)}
         ${s.form('path', 'd="M158 176 C160 156 170 146 180 146 S200 156 202 176Z"', s.rad([[0, T.stone[0]], [0.6, T.stone[1]], [1, T.stone[2]]], 0.4, 0.3, 0.8), ['#2a4440', 0, 0.9, [0, 0, 1, 1]])}
         <rect x="90" y="140" width="180" height="7" rx="3.5" fill="${s.lin(['#2c3a52', INK], 0, 0, 1, 0)}" transform="rotate(-3 180 144)"/>
         ${s.ball(122, 123, 20, T.sun)}
         ${s.ball(232, 125, 12, POOL, 0.6)}
         ${s.ball(256, 126, 10, POOL, 0.6)}
         ${s.tree(54, 196, 0.6)}
         ${s.hill('M250 240 C276 220 318 212 360 212 V240Z', H.near)}`
      );
    },
  };

  /* ---------- Screen illustrations: the same kit, framed as arches, circles and cards ---------- */
  const crescent = (s, cx, cy, r, cut = [0.45, -0.4]) => {
    const m = s.id + 'c' + cx;
    return `${s.glow(cx, cy, r * 2.4, '#f8e9c0', 0.35)}
      <mask id="${m}"><rect width="${s.w}" height="${s.h}" fill="#fff"/><circle cx="${cx + r * cut[0]}" cy="${cy + r * cut[1]}" r="${r * 0.88}" fill="#000"/></mask>
      <g mask="url(#${m})">${s.ball(cx, cy, r, ['#fffbea', '#f6e7c1', '#c9a868'], 0.5)}</g>`;
  };
  const butterfly = (s, x, y, k = 1) => {
    const wing = (cx, cy, rx, ry, a, ramp, shade) =>
      s.form('ellipse', `cx="${x + cx * k}" cy="${y + cy * k}" rx="${rx * k}" ry="${ry * k}" transform="rotate(${a} ${x + cx * k} ${y + cy * k})"`, s.lin(ramp, 0, 0, 1, 1), [shade, 0, 0.9, [0, 0, 1, 1]]);
    const up = ['#fff0c4', '#f6b04c', '#e0702f'];
    const low = ['#ffe0c8', '#f59a6a', '#c9502f'];
    return (
      wing(-17, -11, 20, 13, -32, up, '#b2481c') +
      wing(17, -11, 20, 13, 32, up, '#b2481c') +
      wing(-11, 9, 12, 9, 28, low, '#9c3a20') +
      wing(11, 9, 12, 9, -28, low, '#9c3a20') +
      [[-27, -16], [27, -16], [-14, 12], [14, 12]].map(([dx, dy]) => `<circle cx="${x + dx * k}" cy="${y + dy * k}" r="${2.6 * k}" fill="#fff8ec" opacity=".9"/>`).join('') +
      `<ellipse cx="${x}" cy="${y}" rx="${3 * k}" ry="${15 * k}" fill="${INK}"/>
       <path d="M${x - 1 * k} ${y - 14 * k} C${x - 4 * k} ${y - 22 * k} ${x - 8 * k} ${y - 26 * k} ${x - 12 * k} ${y - 27 * k} M${x + 1 * k} ${y - 14 * k} C${x + 4 * k} ${y - 22 * k} ${x + 8 * k} ${y - 26 * k} ${x + 12 * k} ${y - 27 * k}" fill="none" stroke="${INK}" stroke-width="${1.6 * k}" stroke-linecap="round"/>`
    );
  };
  /* Red, amber, green: [lit ramp, glow] */
  const LAMP = {
    red: [['#ffd6cc', '#f0604a', '#a8281c'], '#ff9c8a'],
    amber: [['#fff3c8', '#f6c45c', '#c77a1a'], '#ffe08a'],
    green: [['#dcf9e0', '#4fc27a', '#1d7a45'], '#9ff0b8'],
  };
  const OFF = ['#6b7088', '#3e4358', '#23263a'];
  const badgeHill = (s, d = 'M0 92 C40 80 80 84 120 88 V120 H0Z') => s.hill(d, H.mid);

  Object.assign(scenes, {
    /* Onboarding 2 — Resilience is your capacity for change: a butterfly resting on a flower. */
    butterfly(s) {
      const petals = [0, 72, 144, 216, 288]
        .map((a) => {
          const r = (a * Math.PI) / 180;
          return s.ball(130 + Math.cos(r) * 9, 166 + Math.sin(r) * 9, 7, ['#fff0f4', '#f7b3c8', '#d06d8f'], 0.5);
        })
        .join('');
      return s.svg(
        `${s.sky(['#e2f2ec', '#f4f6e8', '#fdeedd'])}
         ${s.sun(186, 76, 19)}
         ${s.hill('M0 150 C60 132 120 140 170 148 S240 134 260 138 V260 H0Z', H.far)}
         ${s.hill('M0 196 C60 178 130 174 180 182 S240 192 260 188 V260 H0Z', H.mid)}
         <path d="M130 172 C126 196 134 220 128 262" fill="none" stroke="#3f8f68" stroke-width="3.5" stroke-linecap="round"/>
         ${s.form('path', 'd="M129 214 C114 214 104 204 104 194 C118 194 128 202 129 214Z"', s.lin(['#bdebcd', '#6fbf93'], 0, 0, 1, 1), [T.forest[2], 0, 0.8, [0, 0, 1, 1]])}
         ${petals}${s.ball(130, 166, 6, T.sun, 0.6)}
         ${butterfly(s, 130, 136, 1.15)}
         ${butterfly(s, 66, 96, 0.38)}
         ${s.hill('M0 232 C30 222 60 226 90 260 H0Z', H.near)}`
      );
    },
    'flag-badge'(s) {
      return s.svg(
        `${s.sky(['#fbe0e6', '#fbefe8', '#eef5e6'])}
         ${s.hill('M0 96 C30 84 60 86 120 92 V120 H0Z', H.mid)}
         <path d="M54 96 V28" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
         ${s.form('path', 'd="M56 30 C70 24 82 34 96 28 L93 52 C80 58 70 48 56 54Z"', s.lin(['#ff9a86', '#e2453a', '#b52a22'], 0, 0, 1, 1), ['#8a1c16', 0, 0.8, [0, 0, 1, 1]])}`
      );
    },
    /* Key-area badges for the tool cards and pathways */
    'badge-sleep'(s) {
      return s.svg(
        `${s.sky(['#13223d', '#1f3b55', '#2e5862'])}
         ${stars([[22, 30, 1.3], [40, 62, 1], [94, 78, 1.1], [30, 82, 0.9]])}
         ${crescent(s, 68, 50, 22)}
         ${s.hill('M0 94 C40 82 80 86 120 90 V120 H0Z', [['#2f5f60', '#1f4044'], ['#081719', 0.1, 0.9]])}`
      );
    },
    'badge-energy'(s) {
      return s.svg(`${s.sky(['#fde6c0', '#fdf0dc', '#eef5e2'])}${s.sun(60, 58, 26)}${badgeHill(s)}`);
    },
    'badge-content'(s) {
      return s.svg(`${s.sky(['#def3e6', '#f2f7e8', '#fdf3e4'])}${s.sun(88, 36, 11)}${badgeHill(s)}${s.tree(52, 92, 0.85)}`);
    },
    'badge-demand'(s) {
      return s.svg(
        `${s.sky(['#e2e1f8', '#f1ecf2', '#fdf0e2'])}
         ${badgeHill(s, 'M0 96 C40 86 80 88 120 92 V120 H0Z')}
         ${s.form('path', 'd="M50 92 C51 80 56 74 60 74 S69 80 70 92Z"', s.rad([[0, T.stone[0]], [0.6, T.stone[1]], [1, T.stone[2]]], 0.4, 0.3, 0.8), ['#2a4440', 0, 0.9, [0, 0, 1, 1]])}
         <rect x="14" y="70" width="92" height="5" rx="2.5" fill="${s.lin(['#2c3a52', INK], 0, 0, 1, 0)}" transform="rotate(-3 60 72)"/>
         ${s.ball(32, 58, 13, T.sun)}
         ${s.ball(82, 61, 8, POOL, 0.6)}
         ${s.ball(97, 61, 7, POOL, 0.6)}`
      );
    },
  });

  /* ---------- Washes: the flat coloured headers, printed like the scenes ----------
     RD.wash(tone, w, h, { glow: [cx, cy, size], hills: px }) → SVG string drawn at the box's own size (viewBox = w×h).
     The header's Figma tone at the very top (so it meets the status bar), a little richer lower down, a lighter haze
     on the horizon, a soft bloom behind the badge, three low hills in the same hue with stippled shade, paper grain.
     Tones: [Figma fill, deep (same hue, for hills and shade), light (haze and bloom)]. */
  const WASH = {
    cream: ['#fef3e7', '#dcab7c', '#fffbf4'],
    sun: ['#fbecc4', '#deaa48', '#fffaea'],
    pink: ['#fcddec', '#e08ab3', '#fff5fa'],
    violet: ['#d0d1ff', '#8f92ec', '#f4f4ff'],
    sky: ['#d0f1ff', '#6fbde0', '#f2fbff'],
    blue: ['#cfebff', '#74b0e4', '#f2f9ff'],
    mint: ['#e7fee7', '#86cf9b', '#f8fff6'],
    water: ['#99d7db', '#3f9ca4', '#d5f0f1'],
  };
  const mix = (a, b, t) =>
    '#' + [1, 3, 5].map((i) => Math.round(parseInt(a.substr(i, 2), 16) * (1 - t) + parseInt(b.substr(i, 2), 16) * t).toString(16).padStart(2, '0')).join('');
  /* A rolling ridge across the box: crests every `span` px between `top` and `top + amp`, flat tangents like the scenes. */
  const ridge = (w, h, top, amp, span, phase) => {
    const n = Math.max(2, Math.round(w / span));
    const dx = (w * 1.2) / n;
    const y = (i) => (top + amp * (0.5 + 0.32 * Math.sin(i * 2.3 + phase) + 0.18 * Math.sin(i * 1.1 + phase * 2))).toFixed(1);
    const x = (i) => (-w * 0.1 + i * dx).toFixed(1);
    let d = `M${x(0)} ${y(0)} C${(-w * 0.1 + dx / 2).toFixed(1)} ${y(0)} ${(-w * 0.1 + dx / 2).toFixed(1)} ${y(1)} ${x(1)} ${y(1)}`;
    for (let i = 2; i <= n; i++) d += ` S${(-w * 0.1 + (i - 0.5) * dx).toFixed(1)} ${y(i)} ${x(i)} ${y(i)}`;
    return `${d} V${h} H${x(0)}Z`;
  };
  RD.wash = function (tone, w, h, o = {}) {
    const [base, deep, light] = WASH[tone] || WASH.cream;
    const s = scene(Math.max(1, Math.round(w)), Math.max(1, Math.round(h)));
    const H = Math.min(o.hills || 56, s.h * 0.45);
    const at = (px) => Math.max(0, Math.min(1, 1 - px / s.h)).toFixed(3);
    const band = (from, to, shade) => [[mix(base, deep, from), mix(base, deep, to)], [deep, ...shade]];
    const g = o.glow;
    const body =
      s.sky([[0, base], [at(H * 2.2), mix(base, deep, 0.1)], [at(H * 0.9), mix(base, light, 0.35)], [1, mix(base, light, 0.35)]]) +
      (g ? s.glow(g[0], g[1], g[2] * 1.5, light, 0.9) : '') +
      s.hill(ridge(s.w, s.h, s.h - H, H * 0.34, 150, 0.6), band(0.13, 0.2, [0, 0.3])) +
      s.hill(ridge(s.w, s.h, s.h - H * 0.62, H * 0.3, 120, 2.4), band(0.26, 0.34, [0, 0.4])) +
      s.hill(ridge(s.w, s.h, s.h - H * 0.3, H * 0.22, 170, 4.1), band(0.4, 0.48, [0.05, 0.45]));
    // the top rows stay the exact Figma fill, unprinted, so the header meets the flat status bar without a seam
    const seam = `<rect width="${s.w}" height="${Math.min(40, s.h * 0.2).toFixed(1)}" fill="${s.lin([[0, base], [1, base, 0]])}"/>`;
    return s.svg(body).replace('xMidYMid slice', 'xMidYMax slice').replace(/<\/svg>$/, seam + '</svg>');
  };
  RD.WASH_TONES = Object.keys(WASH);

  /* Canvas per scene: landscapes are 360×240; screen illustrations use the frame they sit in. */
  const SIZE = {
    welcome: [240, 280],
    butterfly: [260, 260],
    features: [240, 300],
    rhythm: [300, 196],
    lights: [220, 262],
    'lights-green': [220, 262],
    'lights-amber': [220, 262],
    'lights-red': [220, 262],
    ready: [250, 310],
    growth: [120, 160],
    practice: [120, 160],
    flag: [104, 196],
    'flag-badge': [120, 120],
    'badge-sleep': [120, 120],
    'badge-energy': [120, 120],
    'badge-content': [120, 120],
    'badge-demand': [120, 120],
    'rhythm-top': [390, 380],
    'ready-top': [390, 340],
  };

  /* ---------- People scenes ----------
     The cast drawn close and big, never pins: hair, body and clothes from the P ramps, gradient plus stipple like the hills.
     Maya (bob, violet), Amara (curly puff, teal), Calum (auburn beard, coral jumper), Ken (mustard jacket), Lena (silver bun, lilac).
     One block per scene, so each keeps its own shapes and helpers local. */
  {
    /* Onboarding 1 — Welcome: Calum at the start of the path, waving hello; the path winds behind him to the rising sun. */
    scenes.welcome = function (s) {
      /* light comes from the low sun on the right */
      const L = [1, 0.1, 0, 0.9];
      const part = (d, ramp, dir = L, a = 0.04, b = 0.82, o = [0, 0.42, 1]) =>
        s.form('path', `d="${d}"`, s.lin(ramp.map((c, i) => [o[i], c]), ...dir), [ramp[2], a, b, dir]);
      let rn = 0;
      /* thin warm rim on the sun side: the shape minus itself nudged towards the light */
      const rim = (d, dx = -1.4, dy = 0.4, c = '#ffe6bf', a = 0.7) => {
        const m = `${s.id}rim${rn++}`;
        return `<mask id="${m}"><path d="${d}" fill="#fff"/><path d="${d}" fill="#000" transform="translate(${dx} ${dy})"/></mask><path d="${d}" fill="${c}" opacity="${a}" mask="url(#${m})"/>`;
      };
      const line = (d, c, w = 0.9, a = 0.7) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${a}"/>`;
      /* a path that narrows with distance: cubic segments [[p0, p1, p2, p3], …] → outline */
      const ribbon = (segs, w0, w1, n = 18) => {
        const pts = [];
        segs.forEach(([a, b, c, d], si) => {
          for (let i = si ? 1 : 0; i <= n; i++) {
            const t = i / n;
            const u = 1 - t;
            const at = (k) => u * u * u * a[k] + 3 * u * u * t * b[k] + 3 * u * t * t * c[k] + t * t * t * d[k];
            const tan = (k) => 3 * u * u * (b[k] - a[k]) + 6 * u * t * (c[k] - b[k]) + 3 * t * t * (d[k] - c[k]);
            pts.push([at(0), at(1), tan(0), tan(1)]);
          }
        });
        const left = [];
        const right = [];
        pts.forEach(([x, y, dx, dy], i) => {
          const w = (w1 + (w0 - w1) * Math.pow(1 - i / (pts.length - 1), 1.5)) / 2;
          const len = Math.hypot(dx, dy) || 1;
          const nx = (-dy / len) * w;
          const ny = (dx / len) * w;
          left.push(`${(x + nx).toFixed(1)} ${(y + ny).toFixed(1)}`);
          right.push(`${(x - nx).toFixed(1)} ${(y - ny).toFixed(1)}`);
        });
        return `M${left.join(' L')} L${right.reverse().join(' L')}Z`;
      };
      const skin = P.skin.s1;
      const hair = P.hair.auburn;
      const knit = P.cloth.coral;
      const chino = P.cloth.cream;
      const boot = ['#c08a5e', '#7d4a2c', '#3e1f0e'];

      const far = 'M0 150 C40 138 92 140 132 146 S206 150 240 140 V280 H0Z';
      const mid = 'M0 184 C46 170 100 170 146 178 S214 186 240 176 V280 H0Z';
      const near = 'M0 232 C40 222 92 220 132 224 S206 214 240 206 V280 H0Z';
      const road = ribbon(
        [
          [[150, 288], [158, 262], [204, 256], [202, 234]],
          [[202, 234], [200, 216], [174, 212], [178, 195]],
          [[178, 195], [181, 182], [194, 166], [199, 140]],
        ],
        32,
        2.4
      );

      /* ---- Calum, drawn at 1:1 then scaled up from his feet ---- */
      const shadow = s.form('ellipse', 'cx="114" cy="263.4" rx="34" ry="5"', s.rad([[0, '#1d4f3a', 0.55], [1, '#1d4f3a', 0]]), null);

      /* weight on his right leg; the left knee eases in and the foot turns out */
      const legL = 'M89.4 156 C88.8 176 90.2 196 92.2 212 C93.4 226 94.2 240 94.6 252.6 L106.8 253 C107 240 107.4 226 107.8 214 C108.4 198 109.4 182 110.4 168 L111.2 156Z';
      const legR = 'M109.8 156 L110.6 168 C111.8 182 113.2 196 114.2 208 C116 222 119.6 236 122.2 249.6 L134.6 248.8 C133.2 236 130.6 222 129.4 210 C129.2 194 130.4 176 130.8 156Z';
      const legs =
        part(legL, chino, [1, 0, 0, 0.3], 0.12, 0.6, [0, 0.35, 1]) +
        part(legR, chino, [1, 0, 0, 0.3], 0.02, 0.5, [0, 0.45, 1]) +
        rim(legR) +
        /* rolled cuffs */
        part('M94.2 248.4 L107 248.8 L106.8 253.6 L94.4 253.2Z', chino, [1, 0, 0, 0], 0.3, 0.8, [0, 0.4, 1]) +
        part('M121.6 245.6 L134.2 244.8 L134.8 249.4 L122.4 250.2Z', chino, [1, 0, 0, 0], 0.1, 0.7, [0, 0.4, 1]) +
        line('M97 207 C100 209.6 103.4 210.4 107.4 209.6 M97.8 216.4 C100.8 218.2 104 218.8 107.4 218.2', chino[2], 0.8, 0.7) +
        line('M115 204 C118.8 207 123 208.2 129.4 207.4 M116.4 213 C119.6 215 123 215.8 126.8 215.4', chino[2], 0.8, 0.6) +
        line('M110.6 168 C112 163 114.2 160.6 117.6 160', chino[2], 0.8, 0.55) +
        line('M100.6 172 C100.2 196 101 224 101.2 246 M122.8 172 C122 192 123.4 222 128.2 243', '#fff', 0.7, 0.5);

      const bootL = 'M94.2 249.6 L107.6 250 L108 258.6 C108.2 260.8 107.2 262.2 105.4 262.4 L91.6 262.4 C89 262.4 87.8 260.6 88.8 258.8 C90 256.8 93 256.2 94 254.6Z';
      const bootR = 'M122 247.4 L135.2 246.6 C136 250.4 137.6 253.2 140.6 254.8 C142.6 256 142.6 259.6 139.6 260 L123.4 260 C121.6 260 120.6 258.8 120.8 256.6Z';
      const boots =
        part(bootL, boot, [1, 0, 0, 1]) +
        part(bootR, boot, [1, 0, 0, 1]) +
        rim(bootR, -1.2, 0.2, '#f2c08e', 0.6) +
        `<path d="M87.8 261.6 C87.6 263.2 88.6 264.6 90.6 264.6 L106.4 264.6 C108 264.6 108.8 263.6 108.6 262Z" fill="#3a2418"/>` +
        `<path d="M120.6 259.2 L142.6 259.2 C143 261 142 262.2 140 262.2 L122.6 262.2 C121.2 262.2 120.4 261 120.6 259.2Z" fill="#3a2418"/>` +
        line('M128.6 250 C131.6 252.4 133.6 253.4 136.6 254', boot[0], 0.8, 0.6);

      const neck = 'M105 76 L105 95 C107 98 113 98 115 95 L115 76Z';
      const torso =
        'M104 95 C99 96.6 92.4 98 88.6 99.8 C84.4 101.8 82.6 106 82.8 111.4 C83.6 124 85.6 138 87.2 148 C87.8 152.6 88.6 156.4 89.4 160 L130.8 162 C132.2 156 133 150 133 142 L132.8 118 C134 111 135.6 105.6 134.8 102.6 C131 99 123 97.2 116 95 C112.5 97.6 107.5 97.6 104 95Z';
      const hem = 'M89.2 155.6 C97 158 123 159.4 131 158.2 L130.6 164 C123 166 97 165 89.8 161.6Z';
      const collar = 'M103.2 94 C107 98.2 113 98.2 116.8 94 C117.6 94.6 117.6 96.2 117 97 C113 101.2 107 101.2 103 97 C102.4 96.2 102.4 94.6 103.2 94Z';
      const body =
        part(neck, skin, [1, 1, 0, 0], 0.05, 0.7, [0, 0.4, 1]) +
        part(torso, knit, L, 0, 0.62, [0, 0.4, 1]) +
        rim(torso) +
        part(hem, knit, L, 0.15, 0.85, [0, 0.24, 1]) +
        line(Array.from({ length: 11 }, (_, i) => `M${92.4 + i * 3.6} ${158.4 + i * 0.2} v4.6`).join(' '), knit[2], 0.7, 0.5) +
        part(collar, knit, L, 0.15, 0.85, [0, 0.24, 1]) +
        line('M131.6 118.4 C127 121.4 122.6 122.6 117.4 122.4 M132 126 C128.4 128 125 128.8 121.6 128.6', knit[2], 0.8, 0.5) +
        line('M95.6 112 C95 126 94 140 93.4 155', knit[2], 1.8, 0.45);

      /* the arm hanging relaxed, his right */
      const armL = 'M89 100 C85 100.6 82.2 104 81.2 109.6 C80.4 116 80 124 80 132 C80 142 80.8 150 81.8 157 L92.6 157.6 C93 150 92.8 142 92.8 135 C92.8 127 94 119 94.8 112 C94 105.6 92.2 101.4 89 100Z';
      const handL = 'M82.6 160 C81.8 166 82.2 171 83.6 175.4 C85 179.6 90 180.2 91.6 176.6 C93 173.6 93 168 92.4 160Z';
      const hanging =
        part(handL, skin, [1, 0, 0, 1], 0.12, 0.8) +
        part(armL, knit, [1, 0, 0, 0.2], 0.1, 0.85, [0, 0.3, 1]) +
        part('M81.6 155.6 L92.8 156.2 L92.6 162 L82 161.6Z', knit, [1, 0, 0, 0], 0.2, 0.9, [0, 0.25, 1]) +
        line('M84 156.4 v5 M86.6 156.5 v5 M89.2 156.6 v5 M91.4 156.7 v5', knit[2], 0.6, 0.5) +
        line('M91 130 C89.4 133 89.4 136 90.8 138.4', knit[2], 0.8, 0.6);

      /* the waving arm, his left, and an open hand turned to the viewer */
      const armR =
        'M126 99.4 C133 99.6 142 103.6 148.6 107.4 C151.2 109 153.2 110.6 154.6 112.2 C155.6 108 157.6 100 159.4 92.4 L160.6 88.8 L170.4 91.2 C169 100 166.6 112 164.4 120.6 C163.4 125.6 160.4 128.2 156.4 127.6 C146 126 136 121.4 129.6 117 C129 111 127.6 104.6 126 99.4Z';
      const handR =
        'M-4.4 1 C-4.6 -2.4 -5.4 -4.4 -6.8 -6 C-8.8 -8.2 -10 -10.8 -8.8 -12 C-7.6 -13 -5.6 -11.6 -4.4 -9.8 C-4.8 -13.4 -4.8 -17.6 -4 -20.4 C-3.4 -22.8 -0.6 -23.6 0.6 -22.4 C1.6 -23 3.6 -22.6 4 -20.6 C4.8 -17.4 5.2 -12 4.8 -7.4 C4.6 -4.2 4.6 -1.6 4.8 1Z';
      const waving =
        `<g transform="translate(165.4 90.4) rotate(16)">${part(handR, skin, [1, 0, 0, 0.5], 0.04, 0.6, [0, 0.3, 1])}${line('M-4.4 -9.8 C-3.6 -7.6 -2.6 -6.2 -1.2 -5.4', skin[2], 0.6, 0.6)}</g>` +
        part(armR, knit, [1, 0, 0.2, 1], 0, 0.72, [0, 0.36, 1]) +
        rim(armR, -1.3, -0.5) +
        part('M160.6 88.6 L170.6 91 L169.4 96.4 L159.2 94Z', knit, [1, 0, 0, 0], 0.1, 0.85, [0, 0.25, 1]) +
        line('M162.8 89.6 L161.6 94.6 M165.2 90.2 L164 95.2 M167.6 90.8 L166.4 95.8', knit[2], 0.6, 0.5) +
        line('M153.6 116 C156 119 159.4 120.6 163 120.8 M139.6 106.8 C143.4 109 146.6 110.2 150.2 110.6', knit[2], 0.8, 0.55);

      /* head, tipped a little towards the wave: short tousled auburn hair and a short beard */
      const face = 'M110 56 C116.6 56 121 60.6 121 67.5 C121 75 118.6 81.2 114.6 84.2 C112.6 85.7 107.4 85.7 105.4 84.2 C101.4 81.2 99 75 99 67.5 C99 60.6 103.4 56 110 56Z';
      const ear = 'M100 66.4 C97.6 65.4 96.2 67.4 96.6 70.2 C97 72.8 98.6 74.4 100.4 73.8Z';
      const beard =
        'M99.6 67.6 C99.4 74 100.4 79.6 103.2 83.4 C105.4 86.2 108 87.2 110 87.2 C112 87.2 114.6 86.2 116.8 83.4 C119.6 79.6 120.6 74 120.4 67.4 L118.8 67.6 C118.8 72 117.6 75.8 115.2 77.6 C113.6 78.6 111.6 78 110 78.5 C108.4 78 106.4 78.6 104.8 77.6 C102.4 75.8 101.2 72 101.2 67.8Z';
      const hairD =
        'M99.6 68.4 C98.2 64 98.2 59.6 100.2 56.4 C100.2 53 102.2 50.6 105 50.2 C106.4 48.2 109 47.2 111.6 47.6 C113.8 46.6 117 47.2 118.6 49.2 C121.4 50.6 123 53.6 122.9 57.2 C123.2 60.8 122.6 64.4 121.4 67.6 C120.8 65.8 120 64.2 118.8 63 C116.8 63.2 114.6 62.4 113.2 60.6 C111.6 62.2 109 62.8 106.6 62.2 C105 63.4 103 64 101.6 63.8 C101 65.2 100.8 66.8 100.8 68.4Z';
      const tuft = 'M108.6 48.6 C110.8 46 114.6 45.2 117.6 46.4 C115.4 46.6 113.6 47.4 112.6 48.8Z';
      const head =
        `<g transform="rotate(4 110 88)">` +
        part(ear, skin, [1, 0, 0, 0], 0.3, 0.9) +
        part(face, skin, [1, 0.2, 0, 0.8], 0.02, 0.6, [0, 0.48, 1]) +
        rim(face, -1.1, 0.3, '#fff3dc', 0.6) +
        part(beard, [hair[0], hair[1], '#8a3c1c'], [1, 0, 0, 1], 0.02, 0.4, [0, 0.5, 1]) +
        part(hairD, hair, [1, 0, 0, 1], 0.04, 0.8, [0, 0.42, 1]) +
        part(tuft, hair, [1, 0, 0, 1], 0.02, 0.6, [0, 0.45, 1]) +
        rim(hairD, -0.9, 0.3, '#ffcf9c', 0.45) +
        `<ellipse cx="117" cy="52.6" rx="4.4" ry="1.9" transform="rotate(30 117 52.6)" fill="${s.rad([[0, '#fff', 0.7], [1, '#fff', 0]])}"/>` +
        line('M104.4 60 C105.6 56.8 108 54 111.4 52.2 M110.6 60.2 C112 57 114.6 54.4 118 53', hair[0], 0.6, 0.6) +
        `</g>`;

      const calum = `<g transform="translate(114 264) scale(1.1) translate(-114 -264)">${shadow + legs + boots + body + hanging + waving + head}</g>`;
      const pathClip = s.id + 'pf';

      return s.svg(
        `${s.sky(['#e4f3e8', '#f6f2e2', '#fde3cf'])}
         ${s.sun(204, 140, 20)}
         ${s.hill(far, H.far)}
         ${s.hill(mid, H.mid)}
         ${s.tree(30, 196, 1)}
         ${s.hill(near, H.near)}
         <clipPath id="${pathClip}"><path d="${far}"/></clipPath>
         <g clip-path="url(#${pathClip})">${s.form('path', `d="${road}"`, s.lin(['#fff8ec', '#f3e4cc']), ['#d6b98c', 0, 0.45, [1, 0, 0, 0]])}</g>
         ${calum}`
      );
    };
  }

  {
    /* Onboarding 4 — Features: Ken beside a giant phone standing in the meadow, tapping its screen (a little sunrise). */
    scenes.features = function (s) {
      const clip = s.id + 'p';
      const SK = P.skin.s3;
      const HR = P.hair.black;
      const JK = P.cloth.sun;
      const TE = P.cloth.white;
      const NV = P.cloth.navy;
      const BR = ['#c08a5c', '#7a4a2c', '#3e2214'];
      /* a body part: [light, base, shade] ramp with an adjustable midpoint, stippled towards the far end */
      const kp = (d, ramp, dir = [0, 0, 1, 1], from = 0.1, mid = 0.5, to = 0.85) =>
        s.form('path', `d="${d}"`, s.lin([[0, ramp[0]], [mid, ramp[1]], [1, ramp[2]]], ...dir), [ramp[2], from, to, dir]);
      const line = (d, c, w = 1, o = 0.8) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${o}"/>`;
      const shadow = (cx, cy, rx, ry, a = 0.55) => s.form('ellipse', `cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"`, s.rad([[0, '#2f7a58', a], [1, '#2f7a58', 0]]), null);

      /* ---- the phone, standing in the grass ---- */
      const phone = `
        ${shadow(59, 276, 56, 5.5)}
        ${s.form('rect', 'x="16" y="102" width="86" height="174" rx="17"', s.lin(['#4b5677', '#2a3350', INK], 0, 0, 1, 1), ['#05060f', 0, 0.75, [0, 0, 1, 1]])}
        <rect x="14.4" y="136" width="2.4" height="12" rx="1.2" fill="#2a3350"/>
        <rect x="14.4" y="152" width="2.4" height="12" rx="1.2" fill="#2a3350"/>
        <path d="M19 252 V120 C19 110 24 105 33 105" fill="none" stroke="#8d97b8" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>
        <clipPath id="${clip}"><rect x="22" y="108" width="74" height="162" rx="11"/></clipPath>
        <g clip-path="url(#${clip})">
          <rect x="22" y="108" width="74" height="162" fill="${s.lin(['#fcd3c0', '#fde6d4', '#f6eedf'])}"/>
          ${s.glow(50, 180, 40, '#ffd9b0', 0.9)}
          ${s.ball(50, 180, 12, T.coral, 0.5)}
          ${s.hill('M22 198 C38 188 62 192 96 186 V270 H22Z', H.far)}
          ${s.hill('M22 224 C44 212 72 216 96 210 V270 H22Z', H.mid)}
          ${s.path('M48 272 C54 256 72 250 66 238 S74 224 80 218', 6)}
          <path d="M22 152 L96 114 V130 L22 168Z" fill="#fff" opacity=".12"/>
        </g>
        <rect x="50" y="112" width="18" height="4.5" rx="2.25" fill="#05060f" opacity=".85"/>
        <rect x="46" y="263" width="26" height="2.4" rx="1.2" fill="#fff" opacity=".75"/>`;

      /* ---- Ken: three-quarter view facing the phone, right arm out to the screen ---- */
      const farLeg = `
        ${kp('M150 174 L172 176 C171.5 192 167.5 208 163.5 224 C162 232 162 240 160.5 248 C158.8 257 157 266 156 274 L143.6 274 C143.8 264 144.6 252 144.6 242 C144.6 236 144 231 145 226 C146.6 210 148.4 192 150 174Z', ['#3c4466', NV[1], NV[2]], [0, 0, 1, 0], 0.25)}
        ${line('M162 222 C159 225.5 157.6 228.5 157.2 232', NV[0], 0.9, 0.55)}
        ${line('M147 196 C150 204 152 214 151.5 224', NV[0], 0.8, 0.4)}
        ${kp('M155.5 271.5 C157.5 273.5 158 278 157.6 281.5 L129 282 C128 279 130 276.5 134 275.6 C139 274.6 142 273.6 142.5 271.5Z', BR, [0, 0, 1, 1], 0.15)}
        <path d="M128.5 281.8 H158 V284.6 H130.5 C129.2 284.6 128.5 283.6 128.5 281.8Z" fill="#f3e4cc"/>`;
      const nearLeg = `
        ${kp('M172 174 L194 174 C194.6 190 193 208 190.6 226 C189.6 234 190.6 242 190.2 250 C189.6 260 188.6 270 188.2 278 L175.4 278 C175.6 268 175 258 174.6 248 C174.2 240 173.6 234 174.6 228 C175.6 214 173.2 198 171 188Z', NV, [0, 0, 1, 0], 0.15)}
        ${line('M180 196 C181 210 181 222 180 236 C179.5 250 179.6 262 180 274', NV[0], 0.9, 0.5)}
        ${kp('M188.5 276 C190.5 278 191 282.5 190.6 286 L162 286.5 C161 283.5 163 281 167 280 C172 279 174.6 278 175 276Z', BR, [0, 0, 1, 1], 0.15)}
        <path d="M161.5 286.3 H191 V289 H163.5 C162.2 289 161.5 288 161.5 286.3Z" fill="#f3e4cc"/>`;
      const neck = s.form('path', 'd="M160 84 C160 90 159.4 95 158.2 101 L172.6 101 C171.6 95 171.2 90 171.4 83Z"', s.lin([[0, SK[2]], [0.45, SK[1]], [1, SK[1]]], 1, 0, 0, 1), [SK[2], 0.1, 0.7, [1, 0, 0, 1]]);
      const torso = `
        ${kp('M154 98.5 C150 100 146.5 103 145.5 108 C144.5 118 144.5 128 145.5 137 C146.5 149 148 163 149 179.5 C165 182 182 182 198.5 179 C197.5 168 196 156 196.5 144 C197 132 199.5 121 199 113 C198.5 107 195 103 189 101.5 C184 100 178 98.8 173.5 98.4 C167 101.5 159.5 101.5 154 98.5Z', JK, [0, 0, 1, 0.35], 0.05, 0.34, 0.68)}
        ${kp('M154.5 99.5 C159 104.5 168 104.5 173 99.2 L170 112 C166.5 128 163.5 150 162 179.8 L150 179.6 C150 160 150.5 135 152 115Z', TE, [0, 0, 1, 0.3], 0, 0.62, 0.55)}
        ${line('M155 100 C159.5 104.8 167.8 104.8 172.5 99.6', TE[2], 1.1, 0.8)}
        ${kp('M173 98.8 C177 99.8 181 101.5 184 104 L180.5 108 L183 111.5 C177 122 169.5 132 163.8 141 C165.5 127 168 113 173 98.8Z', ['#fbe2a0', '#efb64e', JK[2]], [1, 0, 0, 1], 0.2, 0.45)}
        ${line('M183 111.5 C177 122 169.5 132 163.8 141', '#fff4cc', 0.9, 0.8)}
        ${kp('M154.5 99.5 C151 100.3 148.5 102 147 104.5 L150 108 L148.5 111 C149.5 121 150.5 130 151.5 139 C151.5 126 152.5 112 154.5 99.5Z', ['#fbe2a0', '#efb64e', JK[2]], [0, 0, 1, 1], 0.2, 0.45)}
        ${line('M166 160 C170 160.5 176 160.5 181 160', JK[2], 1, 0.55)}`;
      const nearArm = `
        ${kp('M179.6 179.5 C178 186 178.8 192.5 181.8 197.5 C183.6 200.4 187 200 188.5 196.2 C190 192 190.8 186 191.2 180Z', SK, [0, 0, 1, 1], 0, 0.55, 0.6)}
        ${kp('M184 101.5 C192.5 100.8 198.8 105 198.8 113.5 C198.8 125 198 136 196.6 146.5 C195 157 193.2 169 191.6 181 L179.4 180 C180.4 168 182.2 157 183.6 148 C185 139 185 127 183.6 118 C183 112 182 106 184 101.5Z', JK, [0, 0, 1, 0.2], 0.06, 0.36, 0.7)}
        ${line('M187.8 145 C190 147 192.5 147.5 195.5 146.5', JK[2], 1, 0.5)}
        ${line('M179.6 180.2 L191.5 181.2', JK[2], 1.5, 0.7)}`;
      const head = `<g transform="translate(165 89) rotate(-6) scale(.94) translate(-165 -89)">
        ${kp('M166 57 C174 57 180 63 180 71 C180 77 178 81 175 84.5 C172 87.5 167.5 89 163 88.8 C159 88.6 156 86.5 155 83 C154.2 80 153.6 77.5 152.8 75 C152.3 72.5 152.5 69 153.2 66 C155 60 159.5 57 166 57Z', SK, [0, 0, 1, 1], 0, 0.62, 0.42)}
        ${s.form('ellipse', 'cx="173.2" cy="75.2" rx="3" ry="4.3"', s.lin(['#d39a70', SK[1]], 0, 0, 1, 1), null)}
        ${line('M174.2 72.6 C172.6 73.6 172.6 76.8 174.2 77.8', SK[2], 1.1, 0.85)}
        ${kp('M150.5 66 C149 58 154.5 51 164.5 49.5 C175.5 48 183.2 54.5 183.2 64.5 C183.2 70 181.8 74.5 179.6 78 C178.4 78.6 177.2 77.8 176.8 76.4 C176.2 73 174.6 70.4 171.6 69.8 C170.2 69.6 169.4 70.6 169.2 72 C168.4 72.6 167.6 71.6 167.4 70.4 C166.4 67.2 162 65.6 156 65.6 C154 65.7 152 66.1 150.5 66Z', HR, [0, 0, 1, 1], 0.1, 0.45)}
        ${kp('M177 52.5 C171 45.5 158 43.5 150.5 48.5 C146 51.5 144.6 57.5 146.2 62.6 C147 64.2 148.7 65.7 150.6 66 C150.4 62 152.6 58.2 157.2 56.4 C163.4 53.6 171.4 54.8 177 52.5Z', HR, [0, 0, 1, 1], 0.05, 0.4)}
        <ellipse cx="157.5" cy="49.5" rx="7.5" ry="2.6" transform="rotate(-14 157.5 49.5)" fill="${s.rad([[0, '#fff', 0.62], [1, '#fff', 0]])}"/>
        ${line('M181 57 C173 51.5 162 50.5 154 54.5', HR[0], 0.9, 0.7)}
        ${line('M182.6 64 C176 59.5 166 58.6 159 60.6', HR[0], 0.8, 0.5)}
      </g>`;
      const farArm = `
        ${s.glow(87.6, 120.6, 13, '#fff8e6', 0.7)}
        ${kp('M108.6 121.8 C105.5 120 101.5 119.2 97.5 119.4 L90 119 C88.2 118.9 87.4 119.9 87.5 120.8 C87.6 121.8 88.5 122.3 90 122.3 L96.5 122.8 C95.8 125.2 96.6 128.6 99 130.6 C101 132.2 103.2 132.4 104.4 131.8Z', SK, [0, 0, 1, 1], 0, 0.55, 0.6)}
        ${kp('M146 105.5 C140 113 133 123 128.5 132.5 C121 128.5 114 125 108.2 122.3 L103.8 131.5 C111 135 119 139.5 126 143.2 C129.5 145 133.5 144.5 134.5 141 C140 132 148 122 157 114.5Z', JK, [0, 0, 0.7, 1], 0.06, 0.34, 0.72)}
        ${line('M108.2 122.3 L103.8 131.5', JK[2], 1.5, 0.7)}
        <circle cx="87.6" cy="120.6" r="4.5" fill="none" stroke="#fff" stroke-width="1.3" opacity=".85"/>
        <circle cx="87.6" cy="120.6" r="8.5" fill="none" stroke="#fff" stroke-width="1" opacity=".45"/>`;
      const ken = `${shadow(162, 288, 42, 5)}${farLeg}${nearLeg}${neck}${torso}${nearArm}${head}${farArm}`;

      return s.svg(
        `${s.sky(['#e4f2e6', '#f5f4e4', '#fde8d0'])}
         ${s.sun(44, 62, 14)}
         ${s.hill('M0 168 C60 150 120 158 170 164 S220 152 240 154 V300 H0Z', H.far)}
         ${s.tree(224, 198, 0.46)}
         ${s.hill('M0 226 C60 208 120 212 170 218 S220 210 240 212 V300 H0Z', H.mid)}
         ${s.glow(60, 160, 86, '#fff0b8', 0.55)}
         ${s.hill('M0 300 V286 C50 278 110 282 150 290 S220 300 240 296 V300Z', H.near)}
         ${phone}
         ${ken}`
      );
    };
  }

  {
    /* Your rhythm — Amara sits cross-legged between the day sun and the night moon, lit warm on one side and cool on the other.
       `rhythm` is the onboarding card (300×196); `rhythm-top` is the full-bleed Track Settings header (390×380). */
    const rhyF = (v) => +v.toFixed(2);
    /* Map a path drawn in Amara's own 200×170 box (centre x 100, ground y 167) onto the canvas: absolute commands only. */
    const rhyXf = (d, ox, oy, k) => {
      let cmd = '';
      let i = 0;
      return d.replace(/([MLCSQTHVZ])|(-?\d*\.?\d+)/g, (m, c, num) => {
        if (c) {
          cmd = c;
          i = 0;
          return c;
        }
        const v = parseFloat(num);
        const out = cmd === 'H' ? ox + v * k : cmd === 'V' ? oy + v * k : i % 2 === 0 ? ox + v * k : oy + v * k;
        i++;
        return ' ' + rhyF(out);
      });
    };
    /* A curly mass: a circle whose edge is broken into soft scallops. */
    const rhyCurls = (cx, cy, r, n, a, rot = 0, wob = [1, 0.8, 1.15, 0.9, 1.05, 0.85, 1.2, 0.95]) => {
      const at = (t, rr) => [cx + Math.cos(t) * rr, cy + Math.sin(t) * rr];
      const st = (Math.PI * 2) / n;
      let d = '';
      for (let j = 0; j < n; j++) {
        const t0 = rot + j * st;
        const t1 = t0 + st;
        const b = a * wob[j % wob.length];
        const p0 = at(t0, r);
        const p1 = at(t1, r);
        const c0 = at(t0 + st * 0.12, r + b * 2.2);
        const c1 = at(t1 - st * 0.12, r + b * 2.2);
        if (!j) d += `M${rhyF(p0[0])} ${rhyF(p0[1])}`;
        d += ` C${rhyF(c0[0])} ${rhyF(c0[1])} ${rhyF(c1[0])} ${rhyF(c1[1])} ${rhyF(p1[0])} ${rhyF(p1[1])}`;
      }
      return d + 'Z';
    };

    /* Amara, front view, cross-legged, hands resting on her knees. (x, y) = centre of the seat on the ground. */
    const rhyAmara = (s, x, y, k, o = {}) => {
      const ox = x - 100 * k;
      const oy = y - 167 * k;
      const p = (d) => rhyXf(d, ox, oy, k);
      const X = (v) => rhyF(ox + v * k);
      const Y = (v) => rhyF(oy + v * k);
      const warm = o.warm || '#ffe6b8';
      const cool = o.cool || '#c9d4ff';
      let rn = 0;
      /* rim light: the shape minus itself nudged away from the light leaves a thin lit edge */
      const rim = (d, dx, c, op) => {
        const m = `${s.id}am${rn++}`;
        return `<mask id="${m}" maskUnits="userSpaceOnUse" x="0" y="0" width="${s.w}" height="${s.h}"><path d="${d}" fill="#fff"/><path d="${d}" fill="#000" transform="translate(${rhyF(dx * k)} 0)"/></mask><path d="${d}" fill="${c}" opacity="${op}" mask="url(#${m})"/>`;
      };
      const side = [0, 0, 1, 0];
      const part = (d, ramp, a0 = 0.05, a1 = 0.8, dir = side) => s.form('path', `d="${d}"`, s.lin(ramp, ...dir), [ramp[2], a0, a1, dir]);
      const line = (d, c, w, op = 1) => `<path d="${p(d)}" fill="none" stroke="${c}" stroke-width="${rhyF(w * k)}" stroke-linecap="round" opacity="${op}"/>`;
      const skin = P.skin.s4;
      const hair = P.hair.black;
      const top = P.cloth.teal;
      const navy = P.cloth.navy;

      const puff = p(rhyCurls(100, 20.5, 15.2, 13, 1.25, -0.3));
      const cap = p('M86.6 51.4 C84.2 50.2 83.8 46.6 85.4 45 C83.6 42.6 84.6 38.8 87.2 38 C86.8 34.8 89.6 31.8 92.8 32.2 C94.2 29.6 98 28.8 100 30.4 C102 28.8 105.8 29.6 107.2 32.2 C110.4 31.8 113.2 34.8 112.8 38 C115.4 38.8 116.4 42.6 114.6 45 C116.2 46.6 115.8 50.2 113.4 51.4 C112.6 46.4 110.8 42.2 107.4 40.2 C103.4 38.4 96.6 38.4 92.6 40.2 C89.2 42.2 87.4 46.4 86.6 51.4Z');
      const face = p('M100 31.8 C107.2 31.8 111.8 37.6 111.8 45 C111.8 53.2 106.8 60.2 100 60.2 C93.2 60.2 88.2 53.2 88.2 45 C88.2 37.6 92.8 31.8 100 31.8Z');
      const neck = p('M94.8 55 C95.2 60 95 64.6 93.4 69.6 C97.4 71.8 102.6 71.8 106.6 69.6 C105 64.6 104.8 60 105.2 55Z');
      const shirt = p(
        'M93.6 68.6 C96 74.2 104 74.2 106.4 68.6 C113.4 70 120.6 71.4 125.6 74.2 C130.4 76.8 132.4 82.4 132.8 88.6 C133 91.6 133.2 94.6 133.2 97.2 C129.4 99.2 125 99.6 121 98.8 C120.4 95.8 119.8 93.6 118.8 92 C117 100 115.2 108 115 115.6 C115 123.4 118.6 129.4 120.4 133.4 C107 136.2 93 136.2 79.6 133.4 C81.4 129.4 85 123.4 85 115.6 C84.8 108 83 100 81.2 92 C80.2 93.6 79.6 95.8 79 98.8 C75 99.6 70.6 99.2 66.8 97.2 C66.8 94.6 67 91.6 67.2 88.6 C67.6 82.4 69.6 76.8 74.4 74.2 C79.4 71.4 86.6 70 93.6 68.6Z'
      );
      const armR = p('M121.4 95.5 C121.8 104 122.8 111 124.6 117.8 C127.6 125.6 134 132.8 141.8 139.2 L148.6 133.6 C142.8 127.4 138 121.6 135.8 115.6 C134.6 108 133.6 101 133 95Z');
      const armL = p('M78.6 95.5 C78.2 104 77.2 111 75.4 117.8 C72.4 125.6 66 132.8 58.2 139.2 L51.4 133.6 C57.2 127.4 62 121.6 64.2 115.6 C65.4 108 66.4 101 67 95Z');
      const handR = p('M141.6 138.8 C143.4 142.6 147.8 144.8 152.6 144 C155.8 143.4 156.6 140.6 154.8 138.2 C152.8 135.6 150.4 133.8 148.4 133.4Z');
      const handL = p('M58.4 138.8 C56.6 142.6 52.2 144.8 47.4 144 C44.2 143.4 43.4 140.6 45.2 138.2 C47.2 135.6 49.6 133.8 51.6 133.4Z');
      const lap = p(
        'M83.4 128 C94 130.4 106 130.4 116.6 128 C119.6 133.6 124 137.6 131.6 140 C142.6 142.8 154.6 142.6 161.6 145 C167.8 147.4 169.6 153.8 166.8 158.6 C163.6 163.2 156.4 164.6 148 163.2 L100 159.6 L52 163.2 C43.6 164.6 36.4 163.2 33.2 158.6 C30.4 153.8 32.2 147.4 38.4 145 C45.4 142.6 57.4 142.8 68.4 140 C76 137.6 80.4 133.6 83.4 128Z'
      );
      const shinBack = p('M161 148 C140 150.6 104 155.4 72 160.2 C66.6 161 66 166.4 71.6 167 C104 167.4 140 167 160.8 164.8Z');
      const shinFront = p('M39 148 C60 150.6 96 155.4 128 160.2 C133.4 161 134 166.4 128.4 167 C96 167.4 60 167 39.2 164.8Z');
      const shoeL = p('M50 160 C43 159 35.6 159.8 31.4 162.6 C29.2 164.2 29.8 167.2 33 167.6 C38.6 168.2 45 168 50.4 167.2Z');
      const soleL = p('M30 165.8 C33 168.2 41 168.6 50.6 167.6 L50.6 169.4 C41 170.2 32.4 170 29.6 167.6Z');
      const shoeR = p('M127 159.8 C134 158.8 142.4 159.6 147.2 162.4 C149.4 164 148.8 167 145.6 167.4 C139.8 168 133 167.8 127.4 167Z');
      const soleR = p('M148.4 165.8 C145.6 168 137.6 168.4 127.2 167.4 L127.2 169.2 C137.6 170 146 169.8 148.8 167.6Z');

      return `
        <ellipse cx="${X(100)}" cy="${Y(167)}" rx="${rhyF(78 * k)}" ry="${rhyF(8 * k)}" fill="${s.rad([[0, o.ground || '#1d4f3a', 0.55], [1, o.ground || '#1d4f3a', 0]])}"/>
        ${s.form('path', `d="${puff}"`, s.rad([[0, hair[0]], [0.5, hair[1]], [1, hair[2]]], 0.34, 0.3, 0.8), null)}
        <path d="${puff}" fill="${s.rad([[0.4, hair[2], 0], [1, hair[2], 0.95]], 0.3, 0.26, 0.85)}" filter="url(#${s.id}t)"/>
        ${line('M92 18 C93.6 14.6 97.4 13.2 100.4 14.6', '#6a6488', 1, 0.8)}
        ${line('M101 24.6 C104 23.4 107.4 24.6 108.4 27.8', '#55506f', 0.9, 0.7)}
        ${line('M104.6 12.2 C107 12.6 109 14.2 109.8 16.6', '#6a6488', 0.9, 0.6)}
        <ellipse cx="${X(94.4)}" cy="${Y(13.6)}" rx="${rhyF(6.2 * k)}" ry="${rhyF(3.4 * k)}" transform="rotate(-30 ${X(94.4)} ${Y(13.6)})" fill="${s.rad([[0, '#fff', 0.55], [1, '#fff', 0]])}"/>
        ${rim(puff, 1.4, warm, 0.5)}${rim(puff, -1.2, cool, 0.35)}
        ${part(neck, [skin[1], skin[1], skin[2]], 0.15, 0.85)}
        <ellipse cx="${X(100)}" cy="${Y(59.4)}" rx="${rhyF(5.6 * k)}" ry="${rhyF(3 * k)}" fill="${skin[2]}" opacity=".55" filter="url(#${s.id}t)"/>
        <ellipse cx="${X(88.4)}" cy="${Y(46.6)}" rx="${rhyF(2.5 * k)}" ry="${rhyF(3.7 * k)}" fill="${skin[0]}"/>
        <ellipse cx="${X(111.6)}" cy="${Y(46.6)}" rx="${rhyF(2.5 * k)}" ry="${rhyF(3.7 * k)}" fill="${skin[1]}"/>
        ${part(face, skin, 0, 0.7)}
        ${rim(face, 1.4, warm, 0.6)}${rim(face, -1.2, cool, 0.35)}
        ${part(cap, hair, 0.1, 0.8)}
        ${line('M95 38.6 C95.4 35.4 96.8 33.2 98.8 31.6', '#5d587c', 0.7, 0.85)}
        ${line('M104.8 38.6 C104.6 35.4 103.2 33.2 101.2 31.6', '#4a4566', 0.7, 0.8)}
        ${s.form('rect', `x="${X(93.4)}" y="${Y(30.2)}" width="${rhyF(13.2 * k)}" height="${rhyF(4.2 * k)}" rx="${rhyF(2.1 * k)}"`, s.lin(P.cloth.sun, 0, 0, 1, 0), [P.cloth.sun[2], 0.1, 0.8, side])}
        ${line('M86.2 45 C83.6 46.6 83.8 49.4 85.8 50 C87.4 50.4 87.8 48.6 86.4 48.2 C84 47.8 83 51 84.4 53.2 C85.4 54.6 87 54.2 86.8 52.8', hair[1], 1.5, 1)}
        ${line('M113.8 45.4 C116.2 47 116 49.6 114.2 50.2 C112.8 50.6 112.4 49 113.6 48.6', hair[1], 1.4, 1)}
        ${line('M110.4 9.6 C112.8 7.4 116 8.2 115.8 10.8 C115.6 12.8 113.2 12.8 113.4 11.2', hair[1], 1.3, 1)}
        <circle cx="${X(88.3)}" cy="${Y(51.4)}" r="${rhyF(1.1 * k)}" fill="${P.cloth.sun[1]}"/>
        <circle cx="${X(111.7)}" cy="${Y(51.4)}" r="${rhyF(1.1 * k)}" fill="${P.cloth.sun[2]}"/>
        ${part(lap, navy, 0.1, 0.85)}
        ${line('M119.6 137.4 C133 143 147 145.6 158.4 147.6', navy[0], 0.9, 0.4)}
        ${line('M80.4 137.4 C67 143 53 145.6 41.6 147.6', navy[0], 0.9, 0.55)}
        ${part(shinBack, [navy[1], navy[2], navy[2]], 0.3, 0.9)}
        ${line('M150 150.4 C138 152 126 153.6 114 155.4', '#5a6386', 1, 0.6)}
        ${part(shoeL, P.cloth.sun, 0.05, 0.6)}${s.form('path', `d="${soleL}"`, s.lin(P.cloth.white, 0, 0, 1, 0), null)}
        ${line('M100 153.6 C108 154.8 117 156.2 128 157.8', navy[2], 1.8, 0.85)}
        ${s.form('path', `d="${shinFront}"`, s.lin([navy[0], navy[1], navy[2]], 0, 0, 0.35, 1), [navy[2], 0.1, 0.85, side])}
        ${line('M41 149.6 C62 152 96 156.4 126 161', '#7781a8', 1.3, 0.75)}
        ${line('M41 165.4 C62 166.6 96 167.2 127.6 166.4', navy[2], 1.4, 0.7)}
        ${line('M35.4 150.6 C37.4 147 41.6 145.4 46 145.2', '#6b7499', 1.1, 0.7)}
        ${line('M164.6 150.6 C162.6 147 158.4 145.4 154 145.2', navy[0], 1, 0.45)}
        ${part(shoeR, P.cloth.sun, 0.2, 0.8)}${s.form('path', `d="${soleR}"`, s.lin(P.cloth.white, 0, 0, 1, 0), null)}
        ${part(armL, skin, 0, 0.55)}${part(armR, [skin[1], skin[1], skin[2]], 0.2, 0.85)}
        ${part(handL, skin, 0, 0.5)}${part(handR, [skin[1], skin[1], skin[2]], 0.2, 0.8)}
        ${rim(armL, 1.4, warm, 0.6)}${rim(armR, -1.2, cool, 0.35)}
        ${part(shirt, top, 0.05, 0.8)}
        ${line('M93.6 68.6 C96 74.2 104 74.2 106.4 68.6', top[0], 1.2, 0.8)}
        ${line('M67.4 95.2 C71.2 97 75.4 97.6 79.2 96.8', top[2], 0.9, 0.5)}
        ${line('M120.8 96.8 C124.6 97.6 128.8 97 132.6 95.2', top[2], 0.9, 0.6)}
        ${line('M86.6 119.4 C90 121.4 94 122 98 121.8', top[2], 0.8, 0.4)}
        ${line('M114 122.6 C110.6 124.6 106.2 125.4 101.6 125', top[2], 0.8, 0.5)}
        ${rim(shirt, 1.6, warm, 0.7)}${rim(shirt, -1.4, cool, 0.4)}
        ${rim(lap, 1.4, warm, 0.35)}`;
    };

    scenes.rhythm = function (s) {
      return s.svg(
        `${s.sky(['#fde6cc', '#eceedd', '#9fb0cf', '#22375a'], 0, 0, 1, 0)}
         ${stars([[214, 30, 1.2], [262, 46, 1], [284, 24, 1.3], [232, 58, 0.9], [282, 92, 1], [292, 120, 0.8], [246, 108, 0.9]])}
         <path d="M48 84 Q150 -26 254 70" fill="none" stroke="#fff8ec" stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round" opacity=".85"/>
         ${s.sun(48, 84, 18)}
         ${crescent(s, 254, 70, 15)}
         ${s.form('path', 'd="M0 144 C60 130 110 136 160 142 S250 128 300 134 V196 H0Z"', s.lin(['#bfe8cc', '#94c8ae', '#2f5f60'], 0, 0, 1, 0), ['#2c6d54', 0, 0.75])}
         ${s.tree(24, 176, 0.56)}
         ${s.tree(284, 170, 0.42, ['#5f8f8a', '#2f5f60', '#173236'], ['#3d6b66', '#1f4044', '#0c2025'], '#173236')}
         ${s.form('path', 'd="M0 178 C50 166 100 162 150 164 S250 170 300 176 V196 H0Z"', s.lin(['#9fdcb8', '#5c9f80', '#1f4044'], 0, 0, 1, 0), [T.forest[2], 0.05, 0.9])}
         ${rhyAmara(s, 150, 184, 0.84)}`
      );
    };

    scenes['rhythm-top'] = function (s) {
      return s
        .svg(
          `${s.sky(['#fde3cc', '#f3ecdf', '#c4c5e8', '#5a5f9e', '#262a5e'], 0, 0, 1, 0)}
         <mask id="${s.id}hz"><rect width="390" height="150" fill="${s.lin([[0, '#fff'], [1, '#000']])}"/></mask>
         <rect width="390" height="150" fill="${s.lin([[0, '#e6e2ff', 0], [0.4, '#e6e2ff', 0.25], [1, '#e6e2ff', 0.92]], 0, 0, 1, 0)}" mask="url(#${s.id}hz)"/>
         ${stars([[262, 96, 1.4], [300, 74, 1.1], [344, 92, 1.5], [372, 128, 1], [318, 136, 1.2], [282, 150, 0.9], [356, 176, 1], [236, 124, 0.9], [374, 224, 0.9], [330, 240, 0.8]])}
         <path d="M68 214 Q196 -2 326 196" fill="none" stroke="#fff8ec" stroke-width="2.2" stroke-dasharray="1 8" stroke-linecap="round" opacity=".85"/>
         ${s.sun(68, 214, 25)}
         ${crescent(s, 326, 196, 20)}
         ${s.form('path', 'd="M0 268 C70 250 140 258 200 264 S320 246 390 254 V380 H0Z"', s.lin(['#bfe8cc', '#94c8ae', '#2f5f60'], 0, 0, 1, 0), ['#2c6d54', 0, 0.75])}
         ${s.tree(34, 306, 0.8)}
         ${s.tree(366, 300, 0.62, ['#5f8f8a', '#2f5f60', '#173236'], ['#3d6b66', '#1f4044', '#0c2025'], '#173236')}
         ${s.form('path', 'd="M0 312 C60 298 130 294 195 296 S330 304 390 312 V380 H0Z"', s.lin(['#9fdcb8', '#5c9f80', '#1f4044'], 0, 0, 1, 0), [T.forest[2], 0.05, 0.9])}
         ${rhyAmara(s, 195, 316, 1.12)}`
        )
        .replace('xMidYMid slice', 'xMidYMax slice');
    };
  }

  {
    /* Onboarding 6–9 — Red, Amber & Green Zones: Ken stands close beside a big traffic light and reads it.
       One composition for all four steps (they cross-fade): only the lit lamp, the sky tint and his arms change.
       neutral: arms crossed · green: thumbs up · amber: hand at the chin · red: palm raised, "stop". */
    const zone = (on) => (s) => {
      /* a body part or garment: ramp weighted to its base tone; the stipple only starts past `start` along `dir` */
      const pt = (d, r, dir = [0, 0, 1, 1], a = 0.75, start = 0.4) =>
        `<path d="${d}" fill="${s.lin([[0, r[0]], [0.45, r[1]], [1, r[2]]], ...dir)}"/>` +
        `<path d="${d}" fill="${s.lin([[0, r[2], 0], [start, r[2], 0], [1, r[2], a]], ...dir)}" filter="url(#${s.id}t)"/>`;
      const flat = (d, c, o = 1) => `<path d="${d}" fill="${c}"${o < 1 ? ` opacity="${o}"` : ''}/>`;
      const line = (d, c, w = 0.8, o = 0.8) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${o}"/>`;

      const skin = P.skin.s3;
      const hair = P.hair.black;
      const jacket = ['#ffe7a6', '#f4bd52', '#d9772e'];
      const jacketHi = ['#fff0c4', '#f8cc68', '#e08a36'];
      const jacketFar = ['#f8d27c', '#e8a845', '#c46a28'];
      const tee = P.cloth.white;
      const navy = P.cloth.navy;
      const navyFar = ['#3b4364', '#20253f', '#0a0c1b'];
      const shoe = ['#b07a52', '#6e4128', '#341c0e'];
      const sole = '#efe2cc';

      /* ---- the traffic light ---- */
      const HX = 54;
      const lamp = (name, cy) => {
        const lit = !on || on === name;
        return (
          `<circle cx="${HX}" cy="${cy}" r="19.5" fill="#090a17"/>` +
          `<path d="M${HX - 21} ${cy + 1} A21 21 0 0 1 ${HX + 21} ${cy + 1} L${HX + 18.5} ${cy + 1} A18.5 18.5 0 0 0 ${HX - 18.5} ${cy + 1} Z" fill="#2a3250"/>` +
          (lit && on ? s.glow(HX, cy, 54, LAMP[name][1], 0.85) : '') +
          s.ball(HX, cy, 15.5, lit ? LAMP[name][0] : OFF, lit ? 0.7 : 0.35)
        );
      };
      const signal =
        `${s.form('ellipse', `cx="${HX}" cy="237.5" rx="26" ry="4"`, s.rad([[0, '#1f5a40', 0.6], [1, '#1f5a40', 0]]), null)}
         <rect x="${HX - 4.5}" y="186" width="9" height="52" rx="3" fill="${s.lin(['#3a4766', INK], 0, 0, 1, 0)}"/>
         ${s.form('rect', 'x="24" y="48" width="60" height="146" rx="26"', s.lin(['#3a4766', '#1e233c', INK], 0, 0, 1, 1), ['#05060f', 0, 0.8, [0, 0, 1, 1]])}
         <rect x="29" y="66" width="4" height="108" rx="2" fill="#fff" opacity=".16"/>
         ${lamp('red', 80)}${lamp('amber', 121)}${lamp('green', 162)}`;

      /* ---- Ken: 3/4 view, turned towards the light on his right ---- */
      const head =
        /* neck, with the jaw's shadow */
        pt('M149.4 69 C150 74.6 149.4 78.8 148 83.6 L161.2 83.6 C160.2 79 160.2 74 161 68.4 Z', skin, [0, 0, 1, 0.3], 0.6) +
        flat('M149.4 70 C152.4 74.6 157.4 74.8 161 69.6 L160.8 76.2 C157.6 79.2 152.4 79.2 149.6 76.4 Z', skin[2], 0.5) +
        /* skull and face, a hint of a nose on the profile edge */
        pt('M153 46 C159.6 46 164.4 50.6 164.4 57.4 C164.4 62.6 163.2 66.6 161.4 69.4 L158.6 70.6 C156 72.6 152 74.4 148.6 74.6 C146.6 74.7 145.2 73.6 144.6 71.8 C143.8 69.4 142.8 67 142.4 64.8 C141.4 64 141 62.8 141.8 61.4 C141.6 59.4 141.6 57.4 142 55.4 C143.2 49.6 147.6 46 153 46 Z', skin, [0, 0, 1, 0.6], 0.65) +
        /* hair: the back and side mass, then the sweep over the top towards his face */
        pt('M144 54 C144 47 149 43 155 43 C162 43 166.4 48 166 55.6 C165.8 61 164.4 65.6 162 69.6 C160.6 68.6 159.6 67 159.4 65.6 L157.6 65.4 C156.6 62 156.4 58.6 155.6 56.6 C153 55 148.6 54.4 144 54 Z', hair, [0, 0, 1, 0.7], 0.85, 0.3) +
        pt('M165.4 52.6 C164.6 45 159 40 151.6 39.8 C145.8 39.6 141 42.8 139.2 48.4 C138.6 50.4 138.8 52.4 139.6 54 C140.6 52.2 142.4 51.2 144.6 51.2 C146.2 51.2 147.4 52 148.4 53 C150.4 50.6 153.8 49.8 157 50.4 C160.4 51 163.2 51.4 165.4 52.6 Z', hair, [0, 0, 1, 0.6], 0.8, 0.35) +
        `<ellipse cx="151.4" cy="43.4" rx="6.6" ry="2.2" transform="rotate(-10 151.4 43.4)" fill="${s.rad([[0, '#fff', 0.6], [1, '#fff', 0]])}"/>` +
        line('M163 48 C158.6 43.6 150 43 143.6 46.8', hair[0], 0.7, 0.8) +
        line('M161 51.2 C157 48 150.6 47.6 145.8 50', hair[0], 0.6, 0.6) +
        /* ear */
        `<ellipse cx="158.8" cy="61.4" rx="2.5" ry="3.8" fill="${skin[1]}"/>` +
        line('M158.2 59.6 C159.6 60.6 159.6 62.6 158.4 63.6', skin[2], 0.8, 0.9);

      const torso =
        /* jacket body, white tee in the opening, lapels, the collar behind the neck */
        flat('M146 81.4 C148 78.2 160.8 78.2 163.4 81.4 L162.6 83.6 C159 81.8 149.8 81.8 146.6 83.6 Z', jacket[2]) +
        pt('M147 80.6 C141.6 81.6 137 83.6 134.4 86.6 C132.6 92 133 100 133.8 110 C134.6 122 134.2 134 133.2 147 C141 149.4 166 149.6 176.6 147 C176 134 175.8 122 176.6 110 C177.4 100 177.8 92 176.2 86.8 C173.4 83.8 168.4 81.6 162.6 80.6 Z', jacket, [0, 0, 1, 0.5], 0.6, 0.5) +
        flat('M147 82 C140.6 83.4 137 84.8 134.4 86.6 C132.6 92 133 100 133.8 110 C134.6 122 134.2 134 133.2 147 C138 148.4 143 148.9 148.4 149 L149 110 Z', jacketFar[1], 0.35) +
        pt('M146.6 81.6 C148.8 84.6 157.8 84.6 162.2 81.6 L160.4 148.6 L148.4 148.6 Z', tee, [0, 0, 1, 0.6], 0.5, 0.5) +
        line('M147.4 82.2 C150.2 85.4 158.6 85.4 161.4 82.2', tee[2], 1, 0.9) +
        flat('M148.4 98 L149.2 110 L148.6 148.6 L150.4 148.6 L151 112 Z', tee[2], 0.55) +
        flat('M160.3 98 L159.7 110 L160.4 148.6 L158.8 148.6 L158.4 112 Z', tee[2], 0.45) +
        flat('M146.4 80.8 C143.6 83 142.4 86.6 143 90.6 L149 110 C148.6 101 148 90.6 146.4 80.8 Z', jacket[0]) +
        flat('M162.4 80.8 C165.2 83 166.4 86.6 165.8 90.6 L159.8 110 C160.2 101 160.8 90.6 162.4 80.8 Z', jacket[0]) +
        line('M163.6 136 L172.4 135.2', jacket[2], 1, 0.7) +
        line('M137 136 L144.4 136.4', jacketFar[2], 1, 0.6);

      const legs =
        /* shoes first: the trouser hems fall over them */
        pt('M149.4 232.6 C150 236.4 150 239.4 149.4 242.2 L134 242.2 C130.4 242.2 129.4 239 132 237.4 C135 235.6 138.6 234.6 140 232 Z', shoe, [0, 0, 1, 0.5]) +
        flat('M129.6 241 L150 241 L150 243.8 L131 243.8 C129.8 243.8 129.2 242 129.6 241 Z', sole) +
        pt('M172 234.8 C172.6 238.6 172.6 241.6 172 244.4 L156.6 244.4 C153 244.4 152 241.2 154.6 239.6 C157.6 237.8 161.2 236.8 162.6 234.2 Z', shoe, [0, 0, 1, 0.5]) +
        flat('M152.2 243.2 L172.6 243.2 L172.6 246 L153.6 246 C152.4 246 151.8 244.2 152.2 243.2 Z', sole) +
        pt('M136.2 140 L155.4 140 C155.6 156 154 174 152 192 C150.8 206 149.6 220 149 235.6 L140 235.6 C139.6 220 139 206 138.2 192 C136.8 174 135.6 156 136.2 140 Z', navyFar, [0, 0, 1, 0.3], 0.7) +
        pt('M154.2 140 L174.4 140 C175.6 156 174.4 176 172.8 192 C171.8 206 171.4 222 171.6 237.8 L162.4 237.8 C161.6 222 160.2 206 159 192 C157.4 176 155 158 154.2 140 Z', navy, [0, 0, 1, 0.3], 0.7) +
        line('M165.6 150 C165.6 170 165.8 190 166.6 210', navy[0], 0.8, 0.45) +
        line('M161.2 193 C163.8 195.4 167.6 195.6 170.6 194', navy[0], 0.8, 0.5) +
        line('M141.2 192 C143.4 194 146.6 194.2 149.4 193', navyFar[0], 0.8, 0.4);

      const hand = (d, r = skin) => pt(d, r, [0, 0, 1, 1], 0.6, 0.35);
      const cuff = (d) => line(d, jacket[2], 1, 0.75);
      /* the far (right) arm, hanging loose at his side */
      const farDown =
        pt('M139 84.4 C133.8 84.6 130 88.4 129.6 94 C129 104 128.2 116 127.8 128 C127.6 136 127.8 142 128.4 148 L136.4 148.4 C136.4 142 136.8 134 137.4 126 C138 116 138.6 106 139 98 Z', jacketFar, [0, 0, 1, 0.5]) +
        line('M137.6 104 C137.2 114 136.8 124 136.6 132', jacketFar[2], 0.9, 0.6) +
        hand('M128.6 147 C127.8 151 128 155 130.2 157.6 C132.4 159.6 135.6 158.6 136.4 155.2 C136.8 152.2 136.6 149.4 136.2 147.4 Z') +
        cuff('M128.4 146.4 L136.4 146.8');
      /* the near (left) upper arm, from the shoulder to the elbow at his side */
      const nearUpper = pt('M170 84.4 C175.6 84.2 180 87.6 181 93 C182.4 101 183.6 111 183.8 120.6 C184 125.6 180.8 128.6 176.8 127.8 L172 98 Z', jacket, [0, 0, 1, 0.5]);
      /* the near (left) arm, hanging loose at his side */
      const nearDown =
        pt('M170 84.4 C175.6 84.2 180 87.6 181 93 C182.4 103 183.4 116 183.8 128 C184 136 183.8 142 183.4 148 L175.4 148.4 C175.2 142 174.8 134 174.2 126 C173.6 116 172.8 106 172 98 Z', jacket, [0, 0, 1, 0.5]) +
        line('M174.6 106 C175.2 116 175.6 126 175.8 136', jacket[2], 0.9, 0.5) +
        hand('M175.6 147.4 C175.2 150.4 175.4 154 177.2 156.8 C179.2 159.4 182.6 158.8 183.6 155.6 C184.2 152.6 184 149.6 183.6 147.2 Z') +
        cuff('M175.4 146.6 L183.4 146.4');
      const arms = {
        /* arms crossed over the chest, forearms in an X, each hand on the other arm */
        neutral:
          pt('M139 84.4 C133.8 84.6 130 88.4 129.6 94 C129 103 128.4 113 128.6 121.4 C128.8 126.2 132 128.6 136 127.6 L138.6 98 Z', jacketFar, [0, 0, 1, 0.5]) +
          nearUpper +
          pt('M129.4 119.6 C140 115.6 156 110.4 170.4 106.6 L173.4 113.8 C160 118.6 145 124 133.2 128.4 C129.2 129 127.6 122.4 129.4 119.6 Z', jacketFar, [0, 0, 0.4, 1], 0.7) +
          hand('M169.6 106 C172.2 103.4 176.4 103 178.2 105.4 C179.4 107.6 178.2 111 175.2 112.2 L171.4 113 Z') +
          flat('M183.8 119.4 C171 117.8 156 115.4 143 112.2 L141.4 119.6 C153.6 122.4 167.4 125.6 179.8 129.4 Z', jacket[2], 0.35) +
          pt('M184.4 116.6 C171 114.6 156 111.6 143.2 108.2 L141.4 116.8 C153.6 119.6 167.4 123 179.8 127 C183.8 128 186 120.6 184.4 116.6 Z', jacket, [0, 0, 0.4, 1], 0.7) +
          cuff('M144.2 108.6 L142.8 116.6') +
          hand('M143 107.8 C139.8 105.4 135.4 105.4 133.6 107.8 C132.2 110 133 113.8 135.6 115.4 C137.6 116.6 140.4 116.6 142 116.2 Z'),
        /* relaxed, a thumbs-up at chest height */
        green:
          farDown +
          nearUpper +
          pt('M177 126.4 C178.8 118 181.6 109.6 184 102.6 L193.6 104.8 C192 112 189.6 120 186.6 127.8 C184.6 131.2 178 131 177 126.4 Z', jacketHi, [0, 0, 1, 0.6], 0.7) +
          cuff('M184 104.2 L193.2 106.4') +
          hand('M184.6 95.8 C183.8 91.6 184 86.8 185.8 84.4 C187.4 82.8 190 83.4 190.2 85.8 C190.4 88.8 190.4 92.6 190.8 95.6 Z') +
          hand('M182.6 98 C182.6 94.8 185.6 93 189.2 93.2 C192.8 93.4 195.4 95.6 195.2 99.4 C195 103.4 192.6 106.4 188.8 106.6 C185.2 106.8 182.6 104.4 182.6 101.2 Z') +
          line('M185.2 97.8 C187.2 97 189.6 97.2 191 98.2', skin[2], 0.8, 0.75) +
          line('M185.6 101.4 C187.8 100.8 190.4 101 192 101.8', skin[2], 0.7, 0.5),
        /* considering: one arm across the waist, the other hand at the chin */
        amber:
          pt('M139 84.4 C133.8 84.6 130 88.4 129.6 94 C129 103 128.4 113 128.6 121.8 C128.8 127 132 129.8 136 129 L138.6 98 Z', jacketFar, [0, 0, 1, 0.5]) +
          pt('M130 121.6 C142 123 158 124.8 171 125.4 L171.4 133.6 C158 133.6 144 132.6 133.4 130.6 C129.4 130 128.4 124 130 121.6 Z', jacketFar, [0, 0, 0.3, 1], 0.7) +
          hand('M170.4 125 C173.6 124.4 177 125.6 177.8 128.6 C178.4 131.4 176.4 134 173 134.2 L170.8 133.8 Z') +
          pt('M170 84.4 C175.6 84.2 180 87.6 181 93 C182 102 182 112 181.4 122 C181 128 178 131.6 174 131.4 C170.6 131.2 169 128.4 169.4 124.6 L172 98 Z', jacket, [0, 0, 1, 0.5]) +
          flat('M171.6 127.4 C166 114.4 159.6 101.4 152.6 90.4 L160.2 86 C166.6 97.6 173.4 110.2 180.8 124 Z', jacket[2], 0.5) +
          pt('M168.8 125.6 C163 112.4 156.6 99.6 149.2 89 L157.6 83.8 C163.6 95.8 170.6 108.2 177.6 122.4 C179 127.4 171 131 168.8 125.6 Z', jacketHi, [0, 0, 1, 0.6], 0.6) +
          cuff('M150.6 89.6 L157.8 85.4') +
          hand('M142 80 C141 77.4 142.2 74.8 145 74 L150.4 73.6 C153.6 73.4 155.8 75.4 156 78.6 C156.2 82.2 154 85.2 150.6 85.8 C147.2 86.4 143.2 83.8 142 80 Z', ['#ecbc94', '#c48a60', '#8a5434']) +
          line('M143.8 74.4 C146.4 73.6 149.6 73.4 152.2 74', skin[2], 1, 0.8) +
          line('M145 79.2 C147 78.5 149.4 78.5 151.2 79.2', skin[2], 0.7, 0.55),
        /* stop: the far arm pushed out towards the light, palm up, like a crossing guard */
        red:
          nearDown +
          pt('M139.6 84.4 C134.6 84 130.8 86.4 128 89.4 C123 93.4 117.6 95.6 112.6 96.4 C109.4 97 108.6 101.6 110.8 103.8 C112.6 105.6 115.6 105.6 118 105 C124.4 103.4 131 101 136.8 99.6 Z', jacketHi, [0, 0, 1, 0.8], 0.7) +
          line('M118.6 103.6 C124.6 102 130.4 100.2 135.6 99', jacket[2], 0.9, 0.6) +
          pt('M114.6 96.2 C110 95 105 93.4 100.6 91.4 L98.6 99.2 C103.6 100.6 108.6 102.4 113 104.2 C116.6 105.4 118.4 97.6 114.6 96.2 Z', jacketHi, [0, 0, 1, 1], 0.6) +
          cuff('M101.8 92.6 L100 99.8') +
          hand('M101.6 90 C103.6 88.2 105.4 85.6 105.8 83 C106 81.2 104.4 80.6 103.4 81.6 C102.2 83 101.6 85 101.2 86.6 Z') +
          hand('M95.4 96.6 C93.8 91 93.4 84.4 94.4 79 C95 76 96.8 74.4 99 74.6 C101.4 74.8 102.8 76.8 103 79.6 C103.4 85 103 91 101.8 97.4 Z', ['#f2c8a4', skin[0], skin[1]]),
      };

      const ken =
        s.form('ellipse', 'cx="152" cy="245" rx="32" ry="4.6"', s.rad([[0, '#1f5a40', 0.6], [1, '#1f5a40', 0]]), null) +
        legs + torso + head + arms[on || 'neutral'];

      const sky = { red: ['#fbd3c6', '#fde6da', '#f6eee4'], amber: ['#fde9c6', '#fdf2df', '#f1f4e4'], green: ['#d6f3e0', '#eef8ea', '#fbf4e4'] }[on] || ['#def3e6', '#f2f7e8', '#fdf3e4'];
      return s.svg(
        `${s.sky(sky)}
         ${s.hill('M0 158 C46 144 100 150 150 158 S200 150 220 152 V262 H0Z', H.far)}
         ${s.hill('M0 206 C50 192 110 196 160 202 S205 196 220 198 V262 H0Z', H.mid)}
         ${s.tree(198, 206, 0.46)}
         ${s.hill('M0 238 C50 228 120 230 170 235 S210 231 220 231 V262 H0Z', H.near)}
         ${ken}
         ${on ? s.glow(HX, { red: 80, amber: 121, green: 162 }[on], 150, LAMP[on][1], 0.2) : ''}
         ${signal}`
      );
    };
    scenes.lights = zone(null);
    scenes['lights-green'] = zone('green');
    scenes['lights-amber'] = zone('amber');
    scenes['lights-red'] = zone('red');
  }

  {
    /* Onboarding 10 — ready: Maya, close up and cut at the thighs, throws both arms up as the coral sun rises
       behind her head like a halo; leaf sprigs, sphere trees and the hill path around her.
       Create account — ready-top: the same moment drawn full bleed across the lilac top of the screen. */
    const r1 = (v) => Math.round(v * 10) / 10;
    const pt = (p) => `${r1(p[0])} ${r1(p[1])}`;
    /* maps every "x y" pair of an absolute path (M C L Z only) */
    const tf = (d, k, dx, dy) => d.replace(/(-?\d*\.?\d+)[ ,]+(-?\d*\.?\d+)/g, (_, x, y) => `${r1(x * k + dx)} ${r1(y * k + dy)}`);
    /* rough signed area of a path, from all its points: tells the winding so merged shapes never cancel */
    const area = (d) => {
      const q = [...d.matchAll(/(-?\d*\.?\d+)[ ,]+(-?\d*\.?\d+)/g)].map((m) => [+m[1], +m[2]]);
      let a = 0;
      q.forEach((p, i) => {
        const n = q[(i + 1) % q.length];
        a += p[0] * n[1] - n[0] * p[1];
      });
      return a;
    };
    /* a tapered limb along [x, y, halfWidth] points: smooth sides, round (or flat) ends */
    const tube = (pts, roundEnd = true, roundStart = true, flip = false) => {
      const n = pts.length;
      const L = [];
      const R = [];
      const D = [];
      for (let i = 0; i < n; i++) {
        const a = pts[Math.max(0, i - 1)];
        const b = pts[Math.min(n - 1, i + 1)];
        let dx = b[0] - a[0];
        let dy = b[1] - a[1];
        const l = Math.hypot(dx, dy) || 1;
        dx /= l;
        dy /= l;
        const [x, y, w] = pts[i];
        D.push([dx, dy]);
        L.push([x + dy * w, y - dx * w]);
        R.push([x - dy * w, y + dx * w]);
      }
      const spline = (q) => {
        let o = '';
        for (let i = 0; i < q.length - 1; i++) {
          const p0 = q[Math.max(0, i - 1)];
          const p1 = q[i];
          const p2 = q[i + 1];
          const p3 = q[Math.min(q.length - 1, i + 2)];
          o += ` C${pt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${pt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${pt(p2)}`;
        }
        return o;
      };
      const cap = (p, d, from, to, round) => {
        if (!round) return ` L${pt(to)}`;
        const w = p[2];
        const c = 0.5523 * w;
        const tip = [p[0] + d[0] * w, p[1] + d[1] * w];
        const u = [(from[0] - p[0]) / w, (from[1] - p[1]) / w];
        const v = [(to[0] - p[0]) / w, (to[1] - p[1]) / w];
        return (
          ` C${pt([from[0] + d[0] * c, from[1] + d[1] * c])} ${pt([tip[0] + u[0] * c, tip[1] + u[1] * c])} ${pt(tip)}` +
          ` C${pt([tip[0] + v[0] * c, tip[1] + v[1] * c])} ${pt([to[0] + d[0] * c, to[1] + d[1] * c])} ${pt(to)}`
        );
      };
      const e = n - 1;
      const [A, B] = flip ? [R, L] : [L, R];
      return (
        `M${pt(A[0])}` +
        spline(A) +
        cap(pts[e], D[e], A[e], B[e], roundEnd) +
        spline([...B].reverse()) +
        cap(pts[0], [-D[0][0], -D[0][1]], B[0], A[0], roundStart) +
        'Z'
      );
    };
    /* the same tube wound the same way as `like`, so both can share one fill */
    const tubeLike = (like, pts, roundEnd, roundStart) => {
      const t = tube(pts, roundEnd, roundStart);
      return Math.sign(area(t)) === Math.sign(area(like)) ? t : tube(pts, roundEnd, roundStart, true);
    };
    /* a leaf from its base along angle `a` (degrees), `len` long */
    const leafD = (x, y, len, a, wide = 0.36) => {
      const r = (a * Math.PI) / 180;
      const c = Math.cos(r);
      const sn = Math.sin(r);
      const w = len * wide;
      const at = (u, v) => [x + u * c - v * sn, y + u * sn + v * c];
      return `M${pt(at(0, 0))} C${pt(at(len * 0.28, -w))} ${pt(at(len * 0.72, -w * 0.86))} ${pt(at(len, 0))} C${pt(at(len * 0.72, w * 0.86))} ${pt(at(len * 0.28, w))} ${pt(at(0, 0))}Z`;
    };
    const ribD = (x, y, len, a) => {
      const r = (a * Math.PI) / 180;
      return `M${pt([x + Math.cos(r) * len * 0.12, y + Math.sin(r) * len * 0.12])} L${pt([x + Math.cos(r) * len * 0.8, y + Math.sin(r) * len * 0.8])}`;
    };

    const VIOLET = ['#b7b9fa', '#8f92f2', '#6468e6'];
    const LEAVES = [
      ['#e9fbe9', '#9fdcb8', '#3c9470'],
      ['#c8efd6', '#7fcb9f', '#2f7a58'],
    ];

    /* a leafy sprig: a curved stem and leaves along it, [t, side, len] */
    const sprig = (s, stem, leaves, stemC = '#3f8f68') => {
      const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = stem;
      const at = (t) => {
        const m = 1 - t;
        return [
          m * m * m * x0 + 3 * m * m * t * x1 + 3 * m * t * t * x2 + t * t * t * x3,
          m * m * m * y0 + 3 * m * m * t * y1 + 3 * m * t * t * y2 + t * t * t * y3,
        ];
      };
      const dirAt = (t) => {
        const a = at(Math.max(0, t - 0.02));
        const b = at(Math.min(1, t + 0.02));
        return (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
      };
      let out = `<path d="M${pt([x0, y0])} C${pt([x1, y1])} ${pt([x2, y2])} ${pt([x3, y3])}" fill="none" stroke="${stemC}" stroke-width="2.2" stroke-linecap="round"/>`;
      leaves.forEach(([t, side, len], i) => {
        const [x, y] = at(t);
        const a = dirAt(t) + side * 46;
        const ramp = LEAVES[i % 2];
        out += s.form('path', `d="${leafD(x, y, len, a)}"`, s.lin(ramp, 0, 0, 1, 1), [ramp[2], 0.1, 0.8, [0, 0, 1, 1]]);
        out += `<path d="${ribD(x, y, len, a)}" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" opacity=".5"/>`;
      });
      return out;
    };

    /* Maya with both arms up. Drawn around the base of her neck (0, 0), then placed at (X, Y) and scaled by k.
       The light is the sun right behind her head: warm rims on the outer edges, the front a little in shade. */
    const maya = (s, X, Y, k) => {
      const M = (d) => tf(d, k, X, Y);
      const P2 = (x, y) => [r1(x * k + X), r1(y * k + Y)];
      let rn = 0;
      const part = (d, ramp, dir = [0, 0, 0, 1], from = 0.1, to = 0.7) =>
        s.form('path', `d="${M(d)}"`, s.lin(ramp, ...dir), [ramp[2], from, to, dir]);
      /* warm rim on the edge facing the halo: the shape minus itself nudged away from the light */
      const rim = (d, dx, dy, c = '#ffe1b8', a = 0.85) => {
        const m = `${s.id}ry${rn++}`;
        const md = M(d);
        return `<mask id="${m}"><path d="${md}" fill="#fff"/><path d="${md}" fill="#000" transform="translate(${r1(dx * k)} ${r1(dy * k)})"/></mask><path d="${md}" fill="${c}" opacity="${a}" mask="url(#${m})"/>`;
      };
      /* a rim all round the top of a shape: the shape minus itself shrunk towards (cx, cy), fading downwards */
      const halo = (d, cx, cy, sc, c = '#ffd9a8', a = 0.9) => {
        const m = `${s.id}ry${rn++}`;
        const [px, py] = P2(cx, cy);
        const md = M(d);
        return `<mask id="${m}"><path d="${md}" fill="#fff"/><path d="${md}" fill="#000" transform="translate(${px} ${py}) scale(${sc}) translate(${-px} ${-py})"/></mask><path d="${md}" fill="${s.lin([[0, c, a], [0.55, c, a * 0.6], [1, c, 0]])}" mask="url(#${m})"/>`;
      };
      const line = (d, c, w = 0.9, a = 0.7) =>
        `<path d="${M(d)}" fill="none" stroke="${c}" stroke-width="${r1(w * k)}" stroke-linecap="round" opacity="${a}"/>`;
      const tone = (d, c, a) => `<path d="${M(d)}" fill="${c}" opacity="${a}"/>`;
      const skin = P.skin.s2;
      const hair = P.hair.black;
      const navy = P.cloth.navy;

      /* violet top: crew neck, the shoulders lifted with the arms, easing in to a tucked waist */
      const torso =
        'M-10 -2.4 C-17 -1.8 -26 0.4 -32 3.4 C-39.4 7.2 -42.6 15 -40.2 23 C-38.6 28.6 -36.8 34 -35.8 41 C-34.6 50 -30.6 58 -28 66 C-27 70 -26.6 75 -26.4 80 L26.4 80 C26.6 75 27 70 28 66 C30.6 58 34.6 50 35.4 41 C36 34 35.4 28 34.2 23 C36.4 15 37.6 6 31 -0.6 C25 -2.8 16 -2.8 10 -2.4 C6 3.6 -6 3.6 -10 -2.4Z';
      /* short sleeves, merged into the top so they share its light */
      const sleeveUp = tubeLike(torso, [[34, 9.4, 11.4], [38.4, -4.6, 10.2], [41.4, -15, 9.4]], false);
      const sleeveBent = tubeLike(torso, [[-34, 9.4, 11.4], [-42.6, 17.6, 10.2], [-49.6, 24.4, 9.4]], false);
      const top = torso + ' ' + sleeveUp + ' ' + sleeveBent;

      /* arms: her left straight up (viewer's right), her right bent with the fist up by her chin */
      const armUp = tube([
        [34, 9, 9.4],
        [43, -24, 8],
        [51.6, -56, 6.6],
        [56.4, -84, 6.2],
        [59.6, -106, 5],
      ]);
      const armBent = tube([
        [-34, 9, 9.4],
        [-52, 26, 8],
        [-66.4, 40.4, 6.8],
        [-72.8, 34.6, 6.6],
        [-74, 12, 6],
        [-74.4, -6, 5],
      ]);
      /* fists: a soft rounded block past the wrist, with the curl of the fingers as one tone line */
      const fist = (x, y, dx, dy) => tube([[x - dx * 1.8, y - dy * 1.8, 6.6], [x + dx * 2, y + dy * 2, 7]]);
      const fistUp = fist(60.9, -114.6, 0.146, -0.989);
      const fistBent = fist(-74.6, -14, -0.025, -1);

      const neck =
        'M-5.6 -27 L5.6 -27 C5.4 -17 5.8 -8.6 8.4 -1.6 C4 3.4 -4 3.4 -8.4 -1.6 C-5.8 -8.6 -5.4 -17 -5.6 -27Z';
      const collar = 'M-10.6 -3 C-6 4.2 6 4.2 10.6 -3 C11.6 -2.2 11.8 -1 11.2 0 C6.8 6.8 -6.8 6.8 -11.2 0 C-11.8 -1 -11.6 -2.2 -10.6 -3Z';
      /* high-waisted navy trousers, cut by the frame at mid-thigh */
      const trousers =
        'M-26.2 72.6 C-10 76.4 10 76.4 26.2 72.6 C29.4 84 33.2 98 34 112 C35 130 34 152 32 180 L6.8 180 C6 160 4.2 141 1.8 125.4 C1 123.4 -1 123.4 -1.8 125.4 C-4.2 141 -6 160 -6.8 180 L-32 180 C-34 152 -35 130 -34 112 C-33.2 98 -29.4 84 -26.2 72.6Z';
      const band = 'M-26.2 72.6 C-10 76.4 10 76.4 26.2 72.6 L27 80.6 C10.6 84.4 -10.6 84.4 -27 80.6Z';
      const face = 'M0 -57.4 C9.6 -57.4 15.4 -50.4 15.4 -40.6 C15.4 -28.6 8.6 -15.4 0 -15.4 C-8.6 -15.4 -15.4 -28.6 -15.4 -40.6 C-15.4 -50.4 -9.6 -57.4 0 -57.4Z';
      /* chin-length bob: the back mass flaring a little at the ends, then the straight fringe and the two curtains */
      const hairBack =
        'M0 -68.4 C15.6 -68.4 25.4 -58.6 25.6 -45 C25.8 -36 27 -27 26.4 -20.4 C26 -16.4 23.4 -14.2 20 -14.6 C14 -15.2 8 -16.4 0 -16.4 C-8 -16.4 -14 -15.2 -20 -14.6 C-23.4 -14.2 -26 -16.4 -26.4 -20.4 C-27 -27 -25.8 -36 -25.6 -45 C-25.4 -58.6 -15.6 -68.4 0 -68.4Z';
      const hairFront =
        'M-25.6 -45 C-25.4 -58.6 -15.6 -68.4 0 -68.4 C15.6 -68.4 25.4 -58.6 25.6 -45 C25.8 -36 27 -27 26.4 -20.4 C26 -16.4 23.4 -14.2 20 -14.6 C17 -15 14 -16 12.2 -17.4 C13.8 -22 14.8 -28 14.8 -34 C14.8 -38.6 14.4 -42 13.6 -44.8 C4.6 -43.6 -4.6 -43.6 -13.6 -44.8 C-14.4 -42 -14.8 -38.6 -14.8 -34 C-14.8 -28 -13.8 -22 -12.2 -17.4 C-14 -16 -17 -15 -20 -14.6 C-23.4 -14.2 -26 -16.4 -26.4 -20.4 C-27 -27 -25.8 -36 -25.6 -45Z';

      const [gx, gy] = P2(-9.6, -57.6);
      const gloss = `<ellipse cx="${gx}" cy="${gy}" rx="${r1(7.6 * k)}" ry="${r1(2.8 * k)}" transform="rotate(-30 ${gx} ${gy})" fill="${s.rad([[0, '#fff', 0.55], [1, '#fff', 0]])}"/>`;

      return `
        ${part(hairBack, [hair[1], hair[2], hair[2]], [0, 0, 0, 1], 0.2, 0.85)}
        ${part(neck, skin, [0, 0, 0, 1], 0.05, 0.45)}
        ${tone('M-5.6 -21 C-2.6 -15.4 2.6 -15.4 5.6 -21 L5.6 -12.6 C2.6 -9.4 -2.6 -9.4 -5.6 -12.6Z', skin[2], 0.4)}
        ${part(armUp, skin, [0, 0, 0, 1], 0.05, 0.5)}${rim(armUp, 1.4, 0.3)}
        ${part(fistUp, skin, [0, 0, 1, 1], 0.05, 0.45)}${rim(fistUp, 1, 1)}
        ${line('M55.2 -112.6 C58 -109.8 62.4 -109.6 66 -111.4', skin[2], 0.8, 0.7)}
        ${part(armBent, skin, [0, 0, 0, 1], 0.1, 0.55)}${rim(armBent, -1.4, 0.4)}
        ${part(fistBent, skin, [0, 0, 1, 1], 0.05, 0.45)}${rim(fistBent, -1, 1)}
        ${line('M-80.4 -11.6 C-77.8 -8.8 -73.4 -8.6 -69.4 -10.6', skin[2], 0.8, 0.7)}
        ${part(top, VIOLET, [0, 0, 0, 1], 0.1, 0.6)}${rim(top, 0, 1.6, '#ffdcc4', 0.75)}
        ${line('M24 14 C19 25 13 33 6 41 M29 30 C24 38 18 45 13 51', VIOLET[0], 0.8, 0.55)}
        ${line('M-14 69 C-12 73 -10 77 -8 80 M11 68 C10 72 9 77 8.4 80', VIOLET[2], 0.8, 0.45)}
        ${line('M32.2 -16.4 C37 -12.6 44 -10.4 49.8 -11.2', VIOLET[2], 0.9, 0.6)}
        ${line('M-55 16.7 C-51 20 -46.6 26 -42 30.1', VIOLET[2], 0.9, 0.6)}
        ${part(collar, VIOLET, [0, 0, 0, 1], 0.3, 0.8)}
        ${part(trousers, navy, [0, 0, 0, 1], 0.12, 0.75)}${rim(trousers, 0, 1.2, '#9a9df4', 0.45)}
        ${part(band, navy, [0, 0, 0, 1], 0.1, 0.6)}
        ${line('M-26.6 80.6 C-10.6 84.4 10.6 84.4 26.6 80.6', navy[0], 0.8, 0.85)}
        ${line('M0.6 84.4 C0.8 96 1 108 1.2 118 M-1 116 C-6 110 -12 106 -18 104 M2.4 116 C7 110 13 106 19 104', navy[0], 0.8, 0.6)}
        ${line('M-19.4 124 C-20 142 -20 160 -19.6 180 M19.4 124 C20 142 20 160 19.6 180', navy[0], 0.8, 0.5)}
        ${s.form('path', `d="${M(face)}"`, s.lin([skin[0], skin[1]], 0, 0, 0, 1), [skin[2], 0.02, 0.4, [0, 0, 0, 1]])}
        ${tone('M-13.6 -44.6 C-4.6 -43.4 4.6 -43.4 13.6 -44.6 L14 -41.4 C4.6 -40 -4.6 -40 -14 -41.4Z', skin[2], 0.4)}
        ${part(hairFront, hair, [0, 0, 0, 1], 0.15, 0.8)}
        ${halo(hairFront, 0, -42, 0.955, '#ffcf9c', 0.75)}
        ${gloss}
        ${line('M-3 -67 C-12.8 -64 -19.6 -56 -21.2 -44 M7.6 -66.6 C15.4 -63 20.4 -55.6 21.4 -46 M-21.6 -38 C-21.8 -31 -21 -25 -19.4 -19.6', hair[0], 0.7, 0.7)}`;
    };

    scenes.ready = function (s) {
      const X = 120;
      const Y = 158;
      const sx = X;
      const sy = Y - 41;
      return s.svg(
        `${s.sky(['#fcd6c2', '#fde6d4', '#f2f4e2'])}
         ${s.glow(sx, sy, 112, '#ffd9b0', 0.9)}
         <circle cx="${sx}" cy="${sy}" r="84" fill="none" stroke="#f8aa6c" stroke-width="1.6" opacity=".22"/>
         <circle cx="${sx}" cy="${sy}" r="62" fill="none" stroke="#f8aa6c" stroke-width="2" opacity=".35"/>
         ${s.ball(sx, sy, 41, T.coral, 0.5)}
         ${s.hill('M0 204 C40 194 80 198 120 204 S200 192 250 198 V310 H0Z', H.far)}
         ${s.tree(206, 208, 0.34)}
         ${s.hill('M0 246 C50 232 100 236 150 242 S220 232 250 236 V310 H0Z', H.mid)}
         ${s.path('M238 310 C220 292 176 286 194 266 S218 232 208 210', 10)}
         ${s.tree(24, 250, 0.56)}
         ${s.tree(230, 276, 0.58)}
         ${s.hill('M0 310 V280 C30 272 52 280 70 310Z', H.near)}
         ${maya(s, X, Y, 1)}
         ${sprig(s, [[4, 316], [-2, 290], [14, 266], [38, 252]], [[0.26, -1, 27], [0.48, 1, 25], [0.7, -1, 22], [0.95, 1, 17]])}
         ${sprig(s, [[248, 318], [254, 292], [240, 274], [216, 262]], [[0.28, 1, 26], [0.52, -1, 24], [0.78, 1, 20], [0.98, -1, 15]])}`
      );
    };

    scenes['ready-top'] = function (s) {
      const k = 0.9;
      const X = 178;
      const Y = 192;
      const sx = X;
      const sy = Y - 41 * k;
      return s.svg(
        `${s.sky([[0, '#d2d2fc'], [0.36, '#e6dcf6'], [0.62, '#fde3d3'], [1, '#fcefe0']])}
         ${s.glow(sx, sy, 150, '#ffd9b0', 0.85)}
         <circle cx="${sx}" cy="${sy}" r="104" fill="none" stroke="#f8aa6c" stroke-width="1.4" opacity=".16"/>
         <circle cx="${sx}" cy="${sy}" r="78" fill="none" stroke="#f8aa6c" stroke-width="1.6" opacity=".24"/>
         <circle cx="${sx}" cy="${sy}" r="58" fill="none" stroke="#f8aa6c" stroke-width="2" opacity=".35"/>
         ${s.ball(sx, sy, 38, T.coral, 0.5)}
         ${s.hill('M0 234 C60 220 120 224 180 232 S300 216 390 224 V340 H0Z', H.far)}
         ${s.tree(300, 238, 0.4)}
         ${s.tree(96, 242, 0.34)}
         ${s.hill('M0 272 C70 256 140 260 210 268 S330 256 390 262 V340 H0Z', H.mid)}
         ${s.path('M292 340 C272 314 226 308 248 286 S276 254 262 234', 11)}
         ${s.tree(46, 282, 1)}
         ${s.tree(346, 288, 0.86)}
         ${s.hill('M0 340 V302 C40 292 76 302 100 340Z', H.near)}
         ${s.hill('M390 340 V308 C356 300 320 312 300 340Z', H.near)}
         ${maya(s, X, Y, k)}
         ${sprig(s, [[6, 344], [0, 320], [12, 300], [30, 288]], [[0.28, -1, 22], [0.5, 1, 20], [0.74, -1, 17], [0.96, 1, 14]])}
         ${sprig(s, [[386, 346], [392, 324], [380, 308], [362, 296]], [[0.3, 1, 21], [0.55, -1, 19], [0.8, 1, 16]])}`
      );
    };
  }

  {
    /* Home, Productivity & Wellbeing — Lena on the crest of the rising hills (a good week), waving at the low
       morning sun under a mint sky. A 3/4 close-up, cut at the knees by the near hill. */
    scenes.growth = function (s) {
      const sk = P.skin.s1;
      const hr = P.hair.silver;
      const lil = P.cloth.lilac;
      const cr = P.cloth.cream;
      /* The sun is low on the left: forms darken to the right, and the stipple only gathers on the far side. */
      const L = [0, 0, 1, 0.3];
      const far = (x = 0.45) => [x, 0, 1, 0.3];
      const pt = (d, ramp, dir = L, sdir = far(), from = 0, to = 0.85) =>
        s.form('path', `d="${d}"`, s.lin(ramp, ...dir), [ramp[2], from, to, sdir]);
      const line = (d, c, w = 0.7, o = 1) =>
        `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}"/>`;
      const gloss = (cx, cy, rx, ry, a, o = 0.9) =>
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${cx} ${cy})" fill="${s.rad([[0, '#fff', o], [1, '#fff', 0]])}"/>`;

      /* Lena, 60s: silver hair in a low bun with a soft wave at the front, a long lilac cardigan buttoned once
         over a cream top, cream trousers. She faces 3/4 to the left, towards the sun, and waves with her far arm. */
      const lena =
        /* cream trousers, cut by the hill at the knees */
        pt('M47.6 126 L82.6 126 C82.8 134 82.2 144 81.4 156 L48.8 156 C48.4 146 47.8 136 47.6 126Z', cr) +
        line('M64.2 134 C64.4 140 64.4 146 64.2 154', cr[2], 0.8, 0.85) +
        line('M74 136 C74.6 141 74.8 146 74.6 152', cr[2], 0.6, 0.6) +
        /* long neck, with the jaw's shadow under it */
        pt('M58 49 C58.2 54 58 59 57.2 63 L65.8 62.8 C64.9 58.6 64.4 54 64.6 49Z', sk, [0, 0, 1, 0.2], far(0.5), 0, 0.7) +
        s.form('path', 'd="M56.6 51 C58.6 54.4 62.4 55.4 65.4 52.6 L65.4 57 C62.4 58.4 58.8 58 56.8 55.6Z"', 'none', [sk[2], 0.55, 0.9, [0, 0, 1, 0]]) +
        /* the cardigan, buttoned once at the waist */
        pt('M56.2 62.4 C52.6 62.8 49.4 64.4 47.6 67.2 C46.2 69.6 46.4 73.6 47.4 77.4 C46.9 81.4 47.3 85.4 48.7 89 C49.9 92.6 50.6 96 50.4 100 C50.2 110 47.8 120 46.8 132 C58 134.6 71.4 134.6 82.6 132.2 C81.6 124 80 116 79.4 108 C79 102 78.4 98 78.6 92 C78.8 84 80.4 76 80.2 71 C80 67.4 77.6 65 74.2 63.8 C71.6 63 69 62.6 66.4 62.4Z', lil) +
        line('M47.6 131 C58.4 133.4 71.6 133.4 82.2 131.2', lil[0], 0.9, 0.8) +
        /* the V: cream top, the scoop of skin above it */
        pt('M56.2 62.8 C57.4 66 58.4 72 59 78 C59.6 84 60 89 60.4 93 C61.4 88 62.6 82 63.6 76 C64.6 70 65.6 65.6 66.6 62.8Z', cr, [0, 0, 1, 0.2], far(0.6), 0, 0.6) +
        pt('M56.2 62.6 C57.8 66.8 62.4 68.2 66.2 64 L66.8 62.6Z', sk, [0, 0, 1, 0.2], far(0.6), 0, 0.6) +
        /* ribbed front edges, the overlap, one button */
        line('M56.2 62.8 C57.4 66 58.4 72 59 78 C59.6 84 60 89 60.4 93 C61.4 88 62.6 82 63.6 76 C64.6 70 65.6 65.6 66.6 62.8', lil[0], 1.1, 0.95) +
        line('M60.4 93 C60.6 106 60.4 120 59.8 133', lil[2], 0.7, 0.8) +
        `<circle cx="61.4" cy="94.6" r="1.1" fill="${lil[2]}"/>` +
        /* a patch pocket on the near panel */
        line('M67.2 111.4 C70.4 110.8 73.8 110.8 77 111.4', lil[2], 0.8, 0.65) +
        line('M67.4 112.6 C70.4 112 73.6 112 76.8 112.6', lil[0], 0.6, 0.6) +
        /* hanging near arm */
        pt('M73.6 64.4 C79.4 64.8 83.8 68.4 84.9 74 C86.1 81.4 87.4 89 88 96 C88.6 104 89.2 111 89.4 118.4 L83.6 119 C83.4 112 83.2 105 82.6 98 C82 90 80.8 83 79.8 78 C78.8 73 77 68.6 74.6 64.6Z', lil, [0, 0, 1, 0.2], far(0.3)) +
        pt('M83.4 118.6 C85.4 118 87.8 118 89.6 118.4 C90.4 122 89.6 126.6 87 127.6 C84.6 128.2 83 124 83.4 118.6Z', sk, [0, 0, 1, 0.3], far(0.4), 0, 0.7) +
        line('M83.6 118.8 L89.4 118.2', lil[0], 1.4, 0.95) +
        /* raised far arm: the sleeve bends at the elbow, an open waving hand */
        pt('M48 77.6 C43.4 71.6 37 64.4 34.4 58.4 C32.4 53.4 32 44 32.6 35.6 L38.2 34.8 C38.2 42 38.8 48 40.6 52.2 C43.8 56.6 49.4 60.4 54.6 62.8 C51.6 63.4 49 65 47.6 67.6Z', lil, [0, 0, 1, 0.1], far(0.5)) +
        line('M40.8 53 C44 57 48.4 60 52.8 62.2', lil[2], 0.6, 0.6) +
        `<g transform="rotate(-10 35.6 35.4)">` +
        pt('M33 35.6 C31.8 33 31 29.6 31 26.6 C31 23.6 32.8 21.6 35 21.6 C37.4 21.6 38.8 23.6 38.8 26.4 L38.8 29.2 C39.8 28 41.4 27.4 42.2 28.4 C42.8 29.4 41.8 31 40.6 32.2 C39.8 33 39.2 34.2 38.8 35.2Z', sk, [0, 0, 1, 0.3], far(0.5), 0, 0.6) +
        `</g>` +
        line('M32.2 36.2 L38.6 35.2', lil[0], 1.6, 0.95) +
        /* head, chin lifted to the sun */
        `<g transform="rotate(-7 61 55)">` +
        pt('M59.4 35.4 C64.6 35.2 68 39 68.2 44 C68.4 49.2 65.6 53 61.4 54.2 C59.2 54.8 56.8 54.6 55 53.4 C53.4 52.2 52.4 50 52.2 47.6 C51.8 44.8 52 41.6 53.2 39.4 C54.6 36.8 56.8 35.4 59.4 35.4Z', sk, [0, 0, 1, 0.3], far(0.55), 0, 0.75) +
        /* silver hair: the low bun, the cap swept back, the soft front wave */
        s.form('circle', 'cx="71.4" cy="50.6" r="5.4"', s.rad([[0, hr[0]], [0.5, hr[1]], [1, hr[2]]], 0.3, 0.3, 0.8), [hr[2], 0, 0.9, [0.4, 0.3, 1, 1]]) +
        pt('M52.8 41.4 C50.6 39.8 50 35.4 52.6 32.6 C55.4 29.6 61.4 28.8 66 30.8 C70 32.6 71.8 36.8 71.4 41.4 C71 46 69.2 50.4 66.8 53.2 C65.4 51 64.6 48.8 64.6 46.6 C64.6 44.2 63 42.4 60.8 41.6 C58.6 40.8 56.6 40 55.4 39 C54.6 40 53.8 40.8 52.8 41.4Z', hr, [0, 0, 1, 0.5], far(0.5), 0, 0.9) +
        /* the wave's soft edge over the brow, and the sweep back into the bun */
        line('M53 41 C54.4 39.4 56.6 38.2 59.2 38.6', hr[2], 0.55, 0.65) +
        line('M52.8 35.8 C56.6 33.6 61 34.2 64.4 37.2 C66.8 39.4 68.4 42.8 69 46.6', hr[2], 0.5, 0.5) +
        `<ellipse cx="65.2" cy="47.2" rx="1.5" ry="2.3" fill="${s.lin(sk)}"/>` +
        line('M54.8 32 C59.2 30.2 64.8 30.8 68.6 34.4', '#fff', 0.6, 0.85) +
        line('M67.4 48.4 C69.8 46.8 73.4 47.8 74.8 50.8', '#fff', 0.55, 0.8) +
        gloss(57.4, 32.6, 4.4, 1.9, -16) +
        `</g>`;

      return s.svg(
        `${s.sky(['#a6dbd6', '#d3eee6', '#f2f7ea', '#fdf0de'])}
         ${s.sun(20, 95, 8)}
         ${s.hill('M0 100 C18 98 34 101 52 97 S92 86 120 82 V160 H0Z', H.far)}
         ${s.tree(106, 104, 0.34)}
         ${s.hill('M0 128 C20 122 36 120 52 116 S90 104 120 100 V160 H0Z', H.mid)}
         <g transform="rotate(-2.5 64 156)">${lena}</g>
         ${s.hill('M0 160 V154 C26 152 54 152 76 149 S106 142 120 140 V160Z', H.near)}`
      );
    };
  }

  {
    /* Home, Daily Practices — Maya sits cross-legged on the hill at dusk, a journal open in her lap,
       the low coral sun sinking behind the far hills at her shoulder. */
    scenes.practice = function (s) {
      let k = 0;
      /* warm rim on the edges that face the sun (up-left): the shape minus itself nudged away from the light,
         kept to the sun side by `box` [x, y, w, h] */
      const rim = (d, box = [0, 0, 120, 160], dx = 1, dy = 0.6, c = '#ffd2ac', a = 0.75) => {
        const m = `${s.id}pr${k++}`;
        return `<mask id="${m}"><path d="${d}" fill="#fff"/><path d="${d}" transform="translate(${dx} ${dy})" fill="#000"/></mask><rect x="${box[0]}" y="${box[1]}" width="${box[2]}" height="${box[3]}" fill="${s.lin([[0, c, a], [0.55, c, a * 0.8], [1, c, 0]], 0, 0, 1, 0.5)}" mask="url(#${m})"/>`;
      };
      const line = (d, c, w = 0.8, a = 1) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${a}"/>`;
      const mirror = (d) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${+(128 - x).toFixed(2)} ${y}`);

      const skin = P.skin.s2;
      const hair = P.hair.black;
      const cloth = P.cloth;

      /* hair: back mass of the chin-length bob */
      const hairBack = 'M64 29.4 C73 29.4 78.2 35 78 43 C77.8 48 77.6 51.6 76.6 54.6 C75.4 56 73 56.4 70.6 55.6 L57.4 55.6 C55 56.4 52.6 56 51.4 54.6 C50.4 51.6 50.2 48 50 43 C49.8 35 55 29.4 64 29.4Z';
      /* straight fringe and the two curtains framing the face */
      const hairFront = 'M51.2 47 C50.8 37 55.4 31.6 64 31.6 C72.6 31.6 77.2 37 76.8 47 C76.8 50 76.8 52.4 76.2 54 C75.2 55.6 72.4 56 69.2 54.8 C69.6 51 70.2 47 70.9 43.8 L57.1 43.8 C57.8 47 58.4 51 58.8 54.8 C55.6 56 52.8 55.6 51.8 54 C51.2 52.4 51.2 50 51.2 47Z';
      const face = 'M57.2 43.4 C57.2 38.4 60.2 35.4 64 35.4 C67.8 35.4 70.8 38.4 70.8 43.4 C70.8 48.2 68 52.8 64 52.8 C60 52.8 57.2 48.2 57.2 43.4Z';
      const neck = 'M60.6 50 L67.4 50 L67.6 59.6 C69 61.2 70.6 61.8 71.4 62.2 L56.6 62.2 C57.4 61.8 59 61.2 60.4 59.6Z';
      /* violet top: rounded shoulders, scoop neckline, easing in to the waist */
      const top = 'M58 61 C53.8 61.8 49.4 63.2 46.8 65.8 C44.2 68.4 43.6 72 44 75.6 C45 82 47.6 88 48.4 94 L49.4 101 C55 103 73 103 78.6 101 L79.6 94 C80.4 88 83 82 84 75.6 C84.4 72 83.8 68.4 81.2 65.8 C78.6 63.2 74.2 61.8 70 61 C68.4 63.6 66.2 64.6 64 64.6 C61.8 64.6 59.6 63.6 58 61Z';
      /* crossed legs: thighs out to the knees, shins folded in front */
      const legs = 'M47 99.5 C38 99 28 99.6 22 102.4 C15.6 105.4 14.6 113.6 19.4 118.4 C21 120 23 121 25 121.4 C40 124.6 54 126.4 64 126.4 C74 126.4 88 124.6 103 121.4 C105 121 107 120 108.6 118.4 C113.4 113.6 112.4 105.4 106 102.4 C100 99.6 90 99 81 99.5Z';
      /* the front shin crossing from the left knee to the right foot */
      const shin = 'M19.6 111.6 C34 112.6 60 115.8 90 118.2 L91.6 124 C70 124.2 40 122.6 23 119.8 C20.2 118 19 114.4 19.6 111.6Z';
      const armL = 'M50 63.2 C45.4 63.8 41.6 66.6 40.2 71.6 C39.4 74.6 39.4 76.6 39.2 79 C38.6 84 36.6 88 37 92.6 C37.2 96.4 39 98 41 98.8 C44.6 100.4 48.6 103.6 52.6 105.4 C53.8 104.8 54 102.8 52.8 101.8 C49 99.6 45.4 96.4 43.6 92.6 C44 86 45.4 79 48 72.4 C49.6 69 51 66 50 63.2Z';
      const armR = mirror(armL);
      const handL = 'M51.4 101.4 C54 100 58.2 100.4 59.4 102.6 C60 104.6 58.4 107.2 55.6 107.6 C52.8 108 50.8 106.6 50.6 104.4 C50.6 103 50.8 101.8 51.4 101.4Z';
      const handR = mirror(handL);
      /* the journal: a coral cover under a cream spread */
      const cover = 'M49.4 101.4 C54 100.4 60 101.6 64 103.6 C68 101.6 74 100.4 78.6 101.4 L79.6 110 C74 109.2 68 110 64 112 C60 110 54 109.2 48.4 110Z';
      const pages = 'M50.4 100.6 C55 99.8 60.4 101 64 102.8 C67.6 101 73 99.8 77.6 100.6 L78.4 108.8 C73.4 108.2 68 109 64 110.8 C60 109 54.6 108.2 49.6 108.8Z';
      const shoeL = 'M25.4 120.2 C29.4 118.6 36.4 118.8 39.4 120.8 C40.8 122.2 40 125.2 37.4 125.6 L26.8 125.8 C24.4 125.2 24 121.4 25.4 120.2Z';
      const shoeR = mirror(shoeL);

      /* head bowed a little towards the journal */
      const tilt = 'translate(0.4 0.8) rotate(6 64 57)';
      const maya = `<g transform="translate(0 -3)">
        ${s.form('ellipse', 'cx="64" cy="125" rx="56" ry="6.5"', s.rad([[0, '#2f7a58', 0.55], [1, '#2f7a58', 0]]), null)}
        <g transform="${tilt}">${s.part(hairBack, hair, [0, 0, 1, 1], 0.2)}</g>
        ${s.form('path', `d="${neck}"`, s.lin([[0, skin[2]], [0.45, skin[1]], [1, skin[0]]]), [skin[2], 0, 0.4, [1, 0, 0, 0]])}
        ${s.part(top, ['#aeb0f7', '#8588ee', '#4a4ed6'], [0, 0, 1, 0.3], 0.3)}
        ${line('M58.4 61.4 C60 63.8 62 64.8 64 64.8 C66 64.8 68 63.8 69.6 61.4', '#c4c6ff', 0.8, 0.9)}
        ${line('M52 82 C55 88 57 94 58 99.6', '#a9acf8', 0.6, 0.55)}${line('M76.4 84 C74 90 72.4 95 71.6 99.6', '#3f43c4', 0.6, 0.5)}
        ${s.part(legs, cloth.navy, [0, 0, 1, 1], 0.25)}
        ${s.part(shoeL, cloth.white, [0, 0, 1, 1], 0.3)}${line('M25.4 124.4 L38.8 124.2', '#c9ccdc', 1.1)}
        ${s.part(shin, ['#5d6690', '#363d62', '#161a33'], [0, 0, 1, 1], 0.3)}
        ${line('M21 112 C36 113 60 116 89 118.4', '#6e7799', 0.7, 0.8)}
        ${s.part(shoeR, cloth.white, [0, 0, 1, 1], 0.3)}${line('M103 123.6 L89.6 123.4', '#c9ccdc', 1.1)}
        ${line('M106 104 C100 101.4 92 100.4 84 100.6', '#4d5676', 0.7, 0.8)}
        <ellipse cx="24.4" cy="105.6" rx="5.4" ry="2.6" transform="rotate(-24 24.4 105.6)" fill="${s.rad([[0, '#8a93b8', 0.7], [1, '#8a93b8', 0]])}"/>
        <ellipse cx="103" cy="105.2" rx="4.6" ry="2.2" transform="rotate(24 103 105.2)" fill="${s.rad([[0, '#6d7699', 0.5], [1, '#6d7699', 0]])}"/>
        ${s.part(cover, T.coral, [0, 0, 1, 1], 0.3)}
        ${s.part(pages, cloth.cream, [0, 0, 1, 1], 0.4)}
        ${line('M64 103 L64 110.6', '#c7a87c', 0.7)}
        ${line('M59.6 104.4 C61 104.8 62 105.2 62.6 105.6 M59.6 106.6 C61 107 62 107.4 62.6 107.8 M65.4 105.6 C66.4 105 68 104.4 70 104.2', '#d6bf98', 0.5, 0.9)}
        ${line('M47.6 73 C45.6 79 44.4 86 44.2 92.4', '#3f43c4', 1.4, 0.55)}${line('M80.4 73 C82.4 79 83.6 86 83.8 92.4', '#2f33a8', 1.4, 0.6)}
        ${s.part(armL, ['#d2d3ff', '#9b9ef6', '#5a5edc'], [0, 0, 1, 0], 0.3)}
        ${s.part(armR, ['#b4b6fb', '#8d90f0', '#4a4ed6'], [0, 0, 1, 0], 0.1)}
        ${line('M41 92.6 C42.4 94.4 44 95.4 46.2 96', '#5a5edc', 0.6, 0.7)}${line('M87 92.6 C85.6 94.4 84 95.4 81.8 96', '#3f43c4', 0.6, 0.7)}
        ${s.part(handL, skin, [0, 0, 1, 1], 0.3)}
        ${s.part(handR, skin, [0, 0, 1, 1], 0.2)}
        <g transform="${tilt}">${s.form('path', `d="${face}"`, s.lin([skin[0], skin[1]], 0, 0, 1, 1), [skin[2], 0, 0.35, [0, 0, 1, 1]])}
        <path d="M57.4 43.8 H70.6 V45.6 C66 46.4 62 46.4 57.4 45.6Z" fill="${skin[2]}" opacity=".4"/>
        ${s.part(hairFront, hair, [0, 0, 1, 1], 0.2)}
        <ellipse cx="58.6" cy="35.6" rx="5" ry="2.2" transform="rotate(-26 58.6 35.6)" fill="${s.rad([[0, '#fff', 0.75], [1, '#fff', 0]])}"/>
        ${line('M61 33.2 C57 35 54.4 39 53.8 46', hair[0], 0.55, 0.8)}
        ${line('M68 33 C72 34.4 74.6 38 75.2 44', hair[0], 0.45, 0.45)}
        ${line('M60.6 37.6 C60.2 39.6 60 41.6 60.2 43.6 M66.4 37.8 C66.8 39.8 67 41.8 66.8 43.6', hair[0], 0.45, 0.55)}
        ${rim(hairBack, [46, 26, 22, 34], 0.9, 0.7, '#f6a98a', 0.85)}</g>
        ${rim(armL, [36, 62, 12, 40], 1, 0.6, '#ffc9a0', 0.55)}${rim(legs, [14, 98, 22, 26], 1.2, 0.8, '#ffc9a0', 0.6)}</g>`;

      return s.svg(
        `${s.sky([[0, '#d9d8f6'], [0.3, '#ece0ee'], [0.52, '#fde6d4'], [1, '#fde8d6']])}
         ${stars([[94, 20, 0.7], [80, 12, 0.5], [104, 34, 0.5]])}
         ${s.glow(30, 70, 58, '#ffe3cf', 0.9)}
         ${s.ball(30, 70, 16, T.coral, 0.55)}
         ${s.hill('M0 80 C16 76 32 77 50 81 S96 80 120 74 V160 H0Z', H.far)}
         ${s.glow(30, 82, 44, '#ffe0c8', 0.55)}
         ${s.tree(106, 84, 0.26)}
         ${s.hill('M0 104 C20 98 44 96 64 98 S104 102 120 98 V160 H0Z', H.mid)}
         ${maya}`
      );
    };
  }

  {
    /* Red Flags — Amara stands on the hilltop and holds a red flag up high; it flies under the arch's dome,
       the afternoon sun low on the right lighting her face as she looks up at it. */
    scenes.flag = function (s) {
      let k = 0;
      const L = [1, 0, 0, 1]; /* light from the upper right (the sun) */
      /* warm rim on the edges that face the sun: the shape minus itself nudged away from the light */
      const rim = (d, dx = -0.7, dy = 0.25, c = '#ffe2bc', a = 0.75) => {
        const m = `${s.id}fr${k++}`;
        return `<mask id="${m}"><path d="${d}" fill="#fff"/><path d="${d}" transform="translate(${dx} ${dy})" fill="#000"/></mask><rect width="104" height="196" fill="${c}" opacity="${a}" mask="url(#${m})"/>`;
      };
      const line = (d, c, w = 0.6, a = 1) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${a}"/>`;
      const gloss = (cx, cy, rx, ry, rot, a = 0.6) =>
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="${s.rad([[0, '#fff', a], [1, '#fff', 0]])}"/>`;
      /* a round, irregular form (the puff): radial ramp lit from the right, stippled shade on the far side */
      const blob = (d, [hi, base, lo], fx = 0.66, fy = 0.3) =>
        `<path d="${d}" fill="${s.rad([[0, hi], [0.55, base], [1, lo]], fx, fy, 0.85)}"/>` +
        `<path d="${d}" fill="${s.rad([[0.4, lo, 0], [1, lo, 0.95]], fx, fy, 0.9)}" filter="url(#${s.id}t)"/>`;
      /* a cloud of curls: a circle with scalloped edges */
      const curls = (cx, cy, R, n, bump = 1.2, ph = 0) => {
        const pt = (a, r) => `${(cx + Math.cos(a) * r).toFixed(2)} ${(cy + Math.sin(a) * r).toFixed(2)}`;
        let d = '';
        for (let i = 0; i < n; i++) {
          const a0 = ph + (i / n) * Math.PI * 2;
          const a1 = ph + ((i + 1) / n) * Math.PI * 2;
          d += (i ? '' : `M${pt(a0, R)}`) + ` Q${pt((a0 + a1) / 2, R * bump)} ${pt(a1, R)}`;
        }
        return d + 'Z';
      };

      const { skin, hair, cloth } = { skin: P.skin.s4, hair: P.hair.black, cloth: P.cloth };
      const RED = ['#ff9a86', '#e2453a', '#b52a22'];

      /* ---- the flag, flying left from the pole into the dome of the arch ---- */
      const flagD = 'M63.4 11.4 C57 7.6 51 14.6 44.2 11.6 C41.6 10.5 39 10.2 36.6 11 L43 21.6 L36.6 32.2 C39 31.4 41.6 31.6 44.2 32.8 C51 35.8 57 28.6 63.4 31.6Z';
      const foldD = 'M52.6 10.6 C50.6 17 50.6 27 52.6 33.4 C54.6 32.6 56 31.6 57.4 30.8 C56 24 56 17 57.4 10.2 C56 10.6 54.4 10.9 52.6 10.6Z';
      const flag = `
        ${s.form('path', `d="${flagD}"`, s.lin(RED, 1, 0, 0, 1), ['#8a1c16', 0, 0.8, L])}
        ${s.form('path', `d="${foldD}"`, s.lin([['0', '#8a1c16', 0.05], ['1', '#8a1c16', 0.35]], 0, 0, 0, 1), ['#8a1c16', 0.1, 0.6])}
        ${line('M45.4 13.6 C44 19 44 25 45.4 30.6', '#ffc2b2', 0.8, 0.5)}
        ${line('M59.6 13 C58.6 18 58.6 24 59.6 29.4', '#ffc2b2', 0.7, 0.4)}
        <rect x="63.4" y="8.4" width="2.2" height="44.6" rx="1.1" fill="${s.lin([INK, '#4d5676', '#7b84a6'], 0, 0, 1, 0)}"/>
        ${s.ball(64.5, 7.8, 2, T.sun, 0.6)}`;

      /* ---- Amara ---- */
      const head = 'M37.2 66 C37.2 60.4 40.6 57.4 44.6 57.4 C48.6 57.4 51.2 59.6 52.2 62.6 C52.8 64.2 53.4 65.6 53.6 67.4 C53.8 69.2 53.4 71 52.6 72.4 C52.2 73.4 51.6 74.2 50.6 74.8 C49 75.8 47 76 45.4 75.6 C42.4 74.8 39.6 72.6 38.1 70 C37.4 68.8 37.2 67.4 37.2 66Z';
      const hairCap = 'M51 61.8 C50.4 58.2 47.4 55.8 43.6 55.8 C38.6 55.8 35.4 59.8 35.4 65.4 C35.4 69.6 37 72.8 39.6 74.6 C40.6 72.2 41.2 69.8 41.8 67.6 C42.6 65.8 43.8 64.6 45.4 63.8 C47.2 63 49.2 62.4 51 61.8Z';
      const puffD = curls(40.4, 50.4, 8, 11, 1.2, 0.3);
      const neck = 'M41.6 72.6 C41.9 76 41.3 79 40 82.4 L48.2 82.4 C47.2 79 46.9 76 47.4 73.4Z';
      const ear = 'M42 67.4 C43.6 66.8 44.8 67.8 44.7 69.4 C44.6 70.8 43.4 71.4 42.2 71Z';
      const torso = 'M40.4 80.6 C42 83.8 46 83.8 47.6 80.6 C50 81 52.6 82 54.6 84 C56.6 87 57 90 56.6 93 C57.2 95.4 56.8 99 54.6 101.2 C53.4 102.6 52.8 104.2 52.8 106 C53 110 54.6 114 55.2 119.2 C48 120.8 38 120.8 31.4 119.2 C32 114 33.6 110 34 106 C34 101 33.6 96 33 92 C32.2 88 31.2 85 31.6 83.6 C34 81.6 37.4 80.6 40.4 80.6Z';
      const sleeveL = 'M34.4 81.2 C30 81.4 27.4 84 26.2 87.6 C25.2 90.4 24.2 93.2 23.4 95.8 C25.8 97.4 28.6 98.4 31 98.6 C31.8 96.4 32.8 94.2 33.6 92Z';
      const sleeveR = 'M48.6 81.4 C51 78 53 74.4 54.4 70.6 L61.8 73.2 C61.2 78.4 60 84 58.2 90.6 C55 88.6 51.8 85 48.6 81.4Z';
      const armR = 'M54.6 77 C55.6 72 56.6 67.6 57.8 63.2 C58.4 61 59 58.6 59.8 55.6 C60.6 52.6 61.2 50 61.6 47.6 L65.4 48 C65.2 51 64.6 54.6 63.8 58.2 C63.4 60.2 63.2 62 63 63.8 C62.4 68.6 61.6 73 61 78.4Z';
      const fist = 'M61.4 41.6 C61.4 39.6 62.8 38.8 64.6 38.9 C66.6 39 67.6 40.2 67.4 42.2 L67.2 45.2 C67 46.8 65.6 47.6 64 47.4 C62.2 47.2 61.3 46 61.4 44.4Z';
      const armL = 'M24.4 92 C23 97 21.2 101.6 19.8 105.4 C19.2 107.2 19.8 108.8 21.4 109.4 C24.6 110.8 28.2 112.8 31.4 114.4 C32.8 115.2 34.6 115.6 35.6 114.6 C36.4 113.6 36 111.8 34.6 111 C32 109.8 28.6 108 25.6 106 C27 102.6 28.6 99.4 30 95.6Z';
      const trousers = 'M32.4 116 L54.8 116 C55.4 122 55.8 128 56 136 C56.2 148 56.8 162 57.8 176 C55 177.4 51.6 177.6 48.8 176.6 C48.2 162 46.8 146 44.4 129.6 L43.8 129.6 C42 146 41 162 40.8 176.4 C38 177.4 34.8 177.2 32.2 175.8 C31.6 162 31.4 146 31.6 134 C31.7 126 32 120 32.4 116Z';
      const shoe = (x) =>
        s.part(`M${x} 177.6 C${x + 0.2} 176.4 ${x + 1.6} 175.8 ${x + 3.4} 176.2 C${x + 4.6} 176.6 ${x + 5.6} 176.4 ${x + 6.6} 176.8 C${x + 8.8} 177.6 ${x + 10.6} 179 ${x + 12.4} 180 C${x + 13.8} 180.8 ${x + 14.4} 182 ${x + 14.2} 183.6 L${x - 0.4} 183.6 C${x - 0.8} 181.6 ${x - 0.6} 179.4 ${x} 177.6Z`, cloth.sun, L, 0.15) +
        s.part(`M${x - 0.6} 183 H${x + 14.3} C${x + 14.6} 183.6 ${x + 14.6} 184.8 ${x + 14} 185.4 C${x + 13.6} 185.8 ${x + 13} 186 ${x + 12.4} 186 H${x + 0.4} C${x - 0.3} 186 ${x - 0.7} 185.6 ${x - 0.7} 185Z`, cloth.white, L, 0.3) +
        line(`M${x + 6.8} 177.8 L${x + 7.8} 179.2 M${x + 8.6} 178.4 L${x + 9.6} 179.8`, '#fffaf0', 0.55, 0.95) +
        line(`M${x + 0.4} 181.6 C${x + 4} 182.2 ${x + 9} 182.2 ${x + 13.6} 182`, T.sun[2], 0.4, 0.6);
      const ankle = (x) => s.part(`M${x} 174.6 H${x + 4.4} V178.6 H${x}Z`, skin, L, 0.1);

      const amara = `
        ${s.form('ellipse', 'cx="40" cy="185.6" rx="22" ry="3.4"', s.rad([[0, '#1d4f3a', 0.7], [0.6, '#2f7a58', 0.35], [1, '#2f7a58', 0]]), null)}
        ${ankle(33.6)}${ankle(52)}
        ${s.part(trousers, cloth.navy, L, 0.05)}
        ${line('M36.6 121 C36.2 134 36 148 36.2 164', '#4d5676', 0.6, 0.8)}
        ${line('M51.2 121 C51.6 134 52.4 150 53.2 166', '#4d5676', 0.6, 0.6)}
        ${line('M42.8 131 C41.8 133 40.6 134.6 39.4 135.6', '#0e1022', 0.5, 0.8)}
        ${line('M45.2 131 C46.4 133 47.6 134.6 49 135.6', '#0e1022', 0.5, 0.8)}
        ${line('M32.2 171.6 C35 172.6 38 172.6 40.8 172', '#0e1022', 0.6, 0.8)}
        ${line('M48.8 172.4 C51.6 173.4 54.6 173.2 57.6 172.2', '#0e1022', 0.6, 0.8)}
        ${rim(trousers, -0.6, 0.2, '#8f9bc4', 0.7)}
        ${shoe(31.6)}${shoe(50)}
        ${s.part(neck, skin, [0, 1, 0, 0], 0.15)}
        ${s.part(torso, cloth.teal, L, 0.05)}
        ${line('M55.4 92 C52 95 49.4 98.4 47.6 102', T.teal[2], 0.6, 0.8)}
        ${line('M54.4 96.6 C52.4 99 51 101.2 50 103.6', T.teal[2], 0.5, 0.6)}
        ${line('M33.4 117.6 C40 118.8 47 118.8 54.4 117.6', T.teal[2], 0.5, 0.6)}
        ${s.part(armL, skin, L, 0.15)}
        ${line('M22.6 106.6 C23.6 107.4 24.6 107.8 25.6 107.8', skin[2], 0.45, 0.9)}
        ${s.part(sleeveL, cloth.teal, L, 0.1)}
        ${line('M24 95.2 C26.2 96.6 28.6 97.4 30.8 97.6', T.teal[2], 0.5, 0.7)}
        ${s.part(armR, skin, L, 0.05)}
        ${s.part(sleeveR, cloth.teal, L, 0.05)}
        ${line('M54.6 72 C57 73.2 59.4 74 61.6 74.4', T.teal[2], 0.5, 0.7)}
        ${rim(sleeveR, -0.6, 0.2, '#ffe9c8', 0.75)}${rim(torso, -0.6, 0.1, '#ffe9c8', 0.6)}${rim(armR, -0.6, 0.2)}
        ${s.part(fist, skin, L, 0.1)}
        ${line('M61.8 42.6 C63.4 43 65.4 43 67.2 42.6', skin[2], 0.5, 0.9)}
        ${line('M61.8 44.8 C63.4 45.2 65.4 45.2 67 44.8', skin[2], 0.5, 0.9)}
        ${rim(fist, -0.5, 0.2)}
        ${blob(puffD, hair)}
        ${gloss(43.6, 45.6, 3.8, 1.8, -30, 0.5)}
        ${line('M36.8 47.4 C37.6 46 39.2 45.6 40.4 46.4', hair[0], 0.5, 0.8)}
        ${line('M35.6 53 C36.4 51.8 38 51.6 39 52.4', hair[0], 0.5, 0.7)}
        ${line('M42.2 52.6 C43.2 51.4 44.8 51.4 45.6 52.4', hair[0], 0.5, 0.7)}
        ${s.part(head, skin, L, 0.1)}
        ${rim(head, -0.7, 0.2, '#ffd9b0', 0.8)}
            ${s.part(hairCap, hair, L, 0.15)}
        ${[[36, 62.2, 1.5], [35.3, 65.8, 2], [36.2, 69.6, 1.6], [37.4, 72.4, 1.9], [39.4, 74.2, 1.3], [50.8, 61.6, 1.1]].map(([x, y, r]) => s.ball(x, y, r, hair, 0) + line(`M${x - r * 0.5} ${y + r * 0.15} C${x - r * 0.5} ${y - r * 0.5} ${x + r * 0.4} ${y - r * 0.5} ${x + r * 0.35} ${y + r * 0.1}`, hair[0], 0.35, 0.7)).join('')}
        ${s.part('M37.6 57.6 C40.4 55.6 44 54.8 46.6 55.4 L46.8 57.4 C44 57 40.8 57.8 38.4 59.4Z', cloth.sun, L, 0.1)}
        ${s.part(ear, skin, [0, 0, 1, 1], 0.5)}
        ${line('M43.6 68.4 C43.9 69 43.8 69.8 43.3 70.2', skin[2], 0.4, 0.9)}
        ${gloss(47.4, 59.2, 2.8, 1.2, 24, 0.55)}
        ${line('M49.6 61 C47.6 59.8 45 59.4 42.4 60.2', hair[0], 0.5, 0.7)}`;

      return s.svg(
        `${s.sky(['#fbe0e6', '#fbefe8', '#eef5e6'])}
         ${s.sun(85, 72, 7, T.sun)}
         ${s.hill('M0 124 C30 114 60 120 104 112 V196 H0Z', H.far)}
         ${s.hill('M0 156 C22 148 44 150 66 156 S94 164 104 162 V196 H0Z', H.mid)}
         ${s.tree(88, 160, 0.34)}
         ${s.hill('M0 194 C10 188 26 183 46 183 S86 188 104 194 V196 H0Z', H.near)}
         ${flag}
         ${amara}`
      );
    };
  }

  {
    /* Resilience River — Calum sits on a boulder on the near bank, seen from behind, watching the teal river wind away
       through the hills towards a high morning sun. */
    scenes.river = function (s) {
      const LIT = [1, 0, 0, 1]; /* the sun is up on the right: light from the top right, shade pools bottom left */
      /* a garment or body part: ramp along `dir`, stippled shade fading in from `from` to `to` */
      const part = (d, ramp, from = 0.1, to = 0.8, dir = LIT) => s.form('path', `d="${d}"`, s.lin(ramp, ...dir), [ramp[2], from, to, dir]);
      const rim = (d, dx = 1.2, dy = -0.9, c = '#fff1cf', a = 0.95) => `<path d="${d}" transform="translate(${dx} ${dy})" fill="${c}" opacity="${a}"/>`;
      const line = (d, c, w = 1, a = 1) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${a}"/>`;
      const shadow = (cx, cy, rx, ry, a = 0.5) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${s.rad([[0, '#1d4f3a', a], [1, '#1d4f3a', 0]])}"/>`;
      const sk = P.skin.s1;
      const au = P.hair.auburn;
      const jumper = P.cloth.coral;
      const chino = P.cloth.cream;
      const boot = ['#b9845a', '#7a4a2c', '#3e2214'];
      const rib = s.lin(['#f39a62', '#c95a34'], 1, 0, 0, 1);

      /* ---- the boulder he sits on ---- */
      const rockD = 'M30 222 C24 204 34 182 58 172 C78 164 104 164 118 176 C130 186 130 208 118 220 C100 232 44 234 30 222Z';
      const rock =
        shadow(80, 226, 60, 7, 0.55) +
        s.form('path', `d="${rockD}"`, s.rad([[0, '#eef3f0'], [0.55, T.stone[1]], [1, T.stone[2]]], 0.66, 0.2, 0.95), ['#2a4440', 0.05, 0.8, LIT]) +
        line('M96 168 C106 169 113 173 118 180', '#fff', 2.4, 0.55) +
        line('M36 230 L38.5 219 M41 231 L43 221.5 M47 231 L51 222 M108 229 L111 220 M114 228 L113.5 219.5', '#2f7a58', 1.5, 0.9);

      /* ---- Calum ---- */
      /* far leg: the knee and shin peek past the near one, the boot a half step forward */
      const farLeg =
        part('M118 142 C126 137 136 138 138 147 C139 162 140 184 142 200 L133 201 C132 190 130 176 128 165Z', ['#efdfc2', '#d9c29c', '#a88a5e'], 0.2, 0.85) +
        part('M132 198 H142 C145 201 150 203 152 207 L152 210 H131 C130.5 206 131 202 132 198Z', boot, 0.1, 0.8) +
        `<path d="M130 209 H153 C153 211 152 212 150.5 212 H131 C130 212 130 211 130 209Z" fill="#e6d2b0"/>`;

      /* the coral knit jumper, his back towards us */
      const torsoD = 'M74 118.5 C67 122 62.5 130 62 141 C61.5 150 62.5 158 64.5 165.5 L100.5 163 C101 155 103 149 105 143 C108 136 111 130 111 124 C111 118 105 113 97 112 C89 111.5 80 114 74 118.5Z';
      const torso =
        rim(torsoD, 1.2, -1) +
        part(torsoD, jumper, 0.1, 0.85) +
        `<path d="M63.6 159.8 L101.2 156.8 L100.5 163 L64.5 165.5Z" fill="${rib}"/>` +
        [68, 74, 80, 86, 92, 98].map((x) => line(`M${x} ${160.4 - (x - 64) * 0.08} l0.1 ${5.2}`, '#b44c2a', 0.6, 0.45)).join('') +
        line('M100 117 C98.5 125 100 133 104.5 139', '#c95a34', 0.8, 0.5) +
        line('M81 126 C75 136 73.5 146 75 156', '#d0603a', 0.9, 0.5) +
        `<path d="M84 115 C89 110 99 109.5 106.5 113.5 C105 117.5 99.5 119.2 93.5 119.2 C89.5 119.2 86 117.8 84 115Z" fill="${rib}"/>` +
        line('M87 115.6 C92 113.4 99 113.2 104 114.6', '#b44c2a', 0.6, 0.5);

      /* near leg in cream chinos: the knee up, the shin straight down to the boot */
      const legD = 'M62 170 C62 163 67 158 76 156 C90 152 106 145 118 140 C126 137 134 141 135 149 C136 166 134.5 186 134.5 204 L121 204 C121 192 119 178 117 166 C115 162 111 163 106 165 C92 170 74 176 66 176 C63 175.5 62 173 62 170Z';
      const leg =
        rim('M118 140 C126 137 134 141 135 149 C136 166 134.5 186 134.5 204 L132 204 L132 150Z', 1.2, -0.5) +
        part(legD, chino, 0.15, 0.85) +
        line('M115 163.5 C118 163 120 165 121 169', '#b8966a', 0.9, 0.8) +
        line('M92 158 C102 153 110 150 117 147', '#fffaf0', 0.8, 0.6) +
        line('M121 200 H134.5', '#c7a87c', 0.8, 0.8) +
        part('M121 202 H135 C138 205 143 207 145 211 L145 214 H119.5 C119.5 210 120 206 121 202Z', boot, 0.1, 0.8) +
        `<path d="M118 213 H146 C146 215 145 216 143 216 H119 C118 216 118 215 118 213Z" fill="#efdcbc"/>` +
        line('M136 204.5 C139 206 142 208 144 211', '#c79a74', 0.7, 0.7);

      /* near arm: the elbow rests on the knee, the forearm and hand hang loose in front of the shin */
      const armD = 'M100 118 C106 114 113 117 116 123 C119 128 122 132 125 135 C130 139 137 142.5 143 145.5 L139.5 153.5 C133 150.5 126 148 120 146 C113 144 108 140 105 135 C101 129 98 123 100 118Z';
      const arm =
        rim(armD, 1.2, -1) +
        part(armD, jumper, 0.1, 0.85) +
        line('M108 129 C111 134 114 139 118 142', '#d0603a', 0.8, 0.55) +
        part('M139 149.5 C142.5 148.5 146.5 151 147 155.5 C147.6 160.5 146.4 165.5 143.8 166.2 C141.2 166.8 139.6 162.8 139 158.5Z', sk, 0, 0.55) +
        `<path d="M138.4 143.4 L143 145.5 L139.5 153.5 L135 151.6Z" fill="${rib}"/>`;

      /* head in lost profile: auburn hair towards us, the ear, a sliver of cheek and the beard along the jaw */
      const headD = 'M85 90 C85 83 90 79 97 79 C104 79 109 84 109 91 C109 97 107.5 102 105 105 C102 107.5 96 107.5 92 105 C88 102.5 85 97 85 90Z';
      const hairD = 'M82.4 93 C80.6 85 85.6 76.4 94 75 C102 73.8 109.5 77.5 110.8 84.5 C111 87 109.6 88.4 107.4 88 C104.4 87.5 102 88.8 101 91.8 C100 95.2 98 99 95 101.6 C92 104.4 88.8 104.9 86.6 103 C84.2 100.8 82.8 97 82.4 93Z';
      const locks = [
        'M82.8 90 C81.4 82 85 76 91.5 74.2 C89.6 77.6 88.8 81.6 89 86 C87 87 84.6 88.6 82.8 90Z',
        'M87.5 79 C89.5 72.2 97.5 68.6 106.5 71.4 C102.5 72 99.6 73.8 98.4 76.8 C94.4 76.4 90.6 77.4 87.5 79Z',
        'M96.6 75 C104.4 70.6 112.2 75.2 113.2 81.2 C113.8 84.6 112.4 87.4 110.2 88.6 C110 84.8 107.4 80.6 100.6 79.2 C99 78.8 97.6 77.2 96.6 75Z',
      ];
      const beardD = 'M107.4 88 C106.2 91 105.8 94.2 105.6 97.2 C105.2 100.6 103.6 103.4 100.8 105.8 C103.2 108.4 106.4 108.9 108.6 107.2 C110.4 105.8 111 102.2 110.8 98.4 C110.6 94.4 109.4 90.8 108.2 88Z';
      const head =
        part('M89.5 101 C90 105.5 89.5 110 88.5 114 L101.5 114 C101 110 101 106 102 102Z', sk, 0.25, 0.8) +
        `<g transform="translate(95 110) scale(0.93) translate(-95 -110)">` +
        rim(headD, 1.2, -0.8) +
        rim(beardD, 1, -0.4) +
        [hairD, ...locks].map((d) => rim(d, 0.9, -0.9, '#ffe2b8', 0.85)).join('') +
        part(headD, sk, 0, 0.6) +
        part(beardD, ['#d47c4c', '#a44c26', '#5e2410'], 0.15, 0.7) +
        line('M109.2 95 C109.6 99 109 102.6 107 105.2', '#e8956a', 0.7, 0.6) +
        line('M102.6 104.6 l-0.8 1.6 M105 106.2 l-0.4 1.6', '#7a3418', 0.6, 0.7) +
        part(hairD, au, 0.05, 0.7) +
        locks.map((d, i) => part(d, au, i ? 0.05 : 0.2, 0.65)).join('') +
        line('M86.6 88.5 C88 83.5 91.5 80 96.5 78.8', au[0], 0.8, 0.75) +
        line('M84.8 96 C85.2 92.4 86.6 89.6 89.4 87.6', au[0], 0.7, 0.55) +
        line('M103 77.4 C106.5 77.6 109.5 80 110.6 83.6', au[0], 0.7, 0.6) +
        `<ellipse cx="98.5" cy="73.6" rx="5" ry="1.8" transform="rotate(-14 98.5 73.6)" fill="${s.rad([[0, '#fff', 0.6], [1, '#fff', 0]])}"/>` +
        `<ellipse cx="108.4" cy="77.6" rx="3" ry="1.4" transform="rotate(35 108.4 77.6)" fill="${s.rad([[0, '#fff', 0.45], [1, '#fff', 0]])}"/>` +
        part('M99 89 C102 88 104 90.5 104 93.5 C104 97 102 99 100 98.5 C98.5 98 98 93 99 89Z', sk, 0, 0.5) +
        line('M100.6 91.2 C102 92.2 102.2 95 101 96.4', sk[2], 0.7, 0.8) +
        `</g>`;

      const calum = farLeg + leg + torso + arm + head + shadow(136, 215, 26, 3.8, 0.6);

      return s.svg(
        `${s.sky(['#e2f3ec', '#f4f7e8', '#fdf0e0'])}
         ${s.sun(276, 64, 22)}
         ${s.hill('M0 122 C60 104 130 114 190 124 S300 104 360 114 V240 H0Z', H.far)}
         ${s.hill('M0 152 C70 134 150 144 214 138 S320 148 360 144 V240 H0Z', H.mid)}
         ${s.form('path', 'd="M231 126 C230 130 224 134 214 138 C206 141 200 144 200 148 C198 158 210 164 204 172 C196 184 178 188 172 198 C162 212 155 226 150 240 H330 C298 226 252 214 240 200 C230 188 244 180 238 172 C232 162 220 156 222 148 C223 142 229 138 232.6 133 C233.8 131 234.2 128.5 234 126Z"', s.lin(['#d9f5f2', '#7fd0d3', '#3f9ea6']), [T.teal[2], 0, 0.85, [0, 0, 1, 1]])}
         ${line('M224 137.5 H230 M213 142 H221', '#fff8e6', 1.4, 0.85)}
         ${line('M210 152 C208 158 212 162 214 166', '#fff', 2, 0.7)}
         ${line('M222 186 C228 194 240 202 252 208', '#fff', 2.4, 0.6)}
         ${line('M186 214 C196 222 210 228 228 234', '#fff', 2.4, 0.5)}
         ${s.form('ellipse', 'cx="252" cy="224" rx="13" ry="5"', s.lin(['#b9cbc6', '#5f7b76']), ['#1d3a37', 0.3, 1])}
         ${s.form('ellipse', 'cx="218" cy="168" rx="6" ry="2.6"', s.lin(['#b9cbc6', '#5f7b76']), ['#1d3a37', 0.3, 1])}
         ${s.hill('M0 178 C40 170 96 174 128 188 C148 198 156 218 160 240 H0Z', H.near)}
         ${s.hill('M360 194 C330 194 300 214 290 240 H360Z', H.near)}
         ${s.tree(300, 152, 0.55)}
         ${s.tree(330, 148, 0.38)}
         ${rock}
         ${calum}`
      );
    };
  }

  {
    /* Walking Mindfully — Lena walks the cream path towards us, unhurried, the morning sun low behind her right shoulder. */
    scenes.walk = function (s) {
      const sk = P.skin.s1, hr = P.hair.silver, li = P.cloth.lilac, cr = P.cloth.cream, nv = P.cloth.navy, wh = P.cloth.white;

      /* The sun sits upper left, behind her: lit edges face left, the stippled shade gathers on the right. */
      const LT = [0, 0, 1, 0.5];
      const part = (d, ramp, o = {}) => {
        const dir = o.dir || LT;
        const c = o.sh || ramp[2];
        return (
          `<path d="${d}" fill="${s.lin([[0, ramp[0]], [o.at == null ? 0.35 : o.at, ramp[1]], [1, ramp[2]]], ...dir)}"/>` +
          `<path d="${d}" fill="${s.lin([[0, c, 0], [o.mid || 0.5, c, o.a1 == null ? 0.12 : o.a1], [1, c, o.a2 || 0.78]], ...dir)}" filter="url(#${s.id}t)"/>`
        );
      };
      const line = (d, c, w = 0.7, o = 0.75) =>
        `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}"/>`;
      const gloss = (cx, cy, rx, ry, a = -25, o = 0.75) =>
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${cx} ${cy})" fill="${s.rad([[0, '#fff', o], [1, '#fff', 0]])}"/>`;

      /* ---- the cream path, laid on the ground and projected, so it narrows as it winds into the hills ---- */
      const HZ = 124, F = 300, W = 0.7;
      const un = ([x, y]) => {
        const z = F / (y - HZ);
        return [((x - 180) * z) / F, z];
      };
      const pr = ([X, Z]) => [180 + (F * X) / Z, HZ + F / Z];
      const spine = [[142, 270], [172, 224], [212, 195], [234, 177], [221, 163], [233, 151], [252, 141.5]];
      const pts = [];
      for (let i = 0; i < spine.length - 1; i++) {
        const p0 = spine[i - 1] || spine[i], p1 = spine[i], p2 = spine[i + 1], p3 = spine[i + 2] || p2;
        for (let j = 0; j < 14; j++) {
          const t = j / 14, t2 = t * t, t3 = t2 * t;
          pts.push([0, 1].map((k) => 0.5 * (2 * p1[k] + (p2[k] - p0[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (3 * p1[k] - p0[k] - 3 * p2[k] + p3[k]) * t3)));
        }
      }
      pts.push(spine[spine.length - 1]);
      const gp = pts.map(un);
      const lft = [], rgt = [];
      gp.forEach((p, i) => {
        const a = gp[Math.max(0, i - 1)], b = gp[Math.min(gp.length - 1, i + 1)];
        const dx = b[0] - a[0], dz = b[1] - a[1];
        const l = Math.hypot(dx, dz) || 1;
        const taper = Math.min(1, (gp.length - 1 - i) / 8 + 0.15);
        const nx = ((-dz / l) * W * taper) / 2, nz = ((dx / l) * W * taper) / 2;
        lft.push(pr([p[0] + nx, p[1] + nz]));
        rgt.push(pr([p[0] - nx, p[1] - nz]));
      });
      const poly = (q) => q.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L');
      const road = `M${poly(lft)} L${poly(rgt.reverse())}Z`;

      /* ---- Lena, turned a little to our left, mid-stride: her right foot forward, her left heel lifting ---- */
      const face = 'M176.4 53.6 C182.6 53.6 186.4 58.4 186.2 64.6 C186 69.4 184.4 73.4 181.6 76.2 C179.6 78.2 176.8 79.4 174.2 79.4 C170.6 79.4 167.8 76.6 166.8 72.8 C165.8 68.8 165.6 64 166.4 60.4 C167.6 56 171.4 53.6 176.4 53.6Z';
      const neck = 'M170.2 72 C170.6 77.4 170.2 82.4 168.6 87.4 L182.2 87.4 C180.6 82.4 180.2 77.4 180.6 72Z';
      const collar = 'M166.8 88.4 C167.6 85.6 170.6 83.6 175.4 83.4 C180.4 83.4 183.6 85.4 184.4 88.4Z';
      const top = 'M166 87 C169.6 91.8 180.4 92 185.6 87 L186.4 141.4 C180 144.2 172 144.4 165.4 142Z';
      const farPanel =
        'M169.4 86 C165.2 87 161.6 88.8 159.2 91.4 C157.2 93.6 156.2 97 156.4 101.4 C156.8 108 158.2 115 158.4 122 C158.6 132 157.4 143 156 156.6 C160.4 158 164.8 158.6 169 158.2 C168.2 142 168 122 168.8 104 C169 96 169.2 90.4 169.4 86Z';
      const nearPanel =
        'M182 86 C187 87 192 88.8 195.4 91.6 C197.8 93.8 199 97 198.8 101.4 C198.6 108 197 115 196.8 122 C196.6 132 198 143 199.8 156 C193.8 158.2 186.4 158.6 180.6 158.2 C180.4 142 180.4 122 180.8 104 C181 96 181.4 90.4 182 86Z';
      /* her left arm swings gently forward, the hand passing in front of the thigh */
      const sleeveN =
        'M182.4 86.6 C188.4 87.4 194.4 89.2 198.8 92.2 C202.2 94.6 204 98 204.6 102.4 C205.4 108.4 205.8 114.2 205.4 120.6 C205.2 129 202.6 139.6 198.8 148.6 C196 149.8 192.8 148.8 190.6 146.6 C193.8 138.8 196.4 129.4 196.6 121.2 C196.8 115 197.2 109.6 197.2 104.6 C195.4 99 191 93 182.4 86.6Z';
      const handN = 'M191 146 C189 150 188.6 154.6 189.8 157.6 C191 160.2 194 159.8 195.8 157 C197.6 154.4 198.6 151 198.8 147.6Z';
      /* her right arm swings back, half hidden by the body */
      const sleeveF =
        'M169 86.4 C163.6 87.2 158.2 89.2 155.2 92.4 C152.4 95.2 151 98.6 150.4 102.6 C149.8 108.6 149.4 114.6 149.6 121 C149.8 129.4 151 138.2 152.2 147 C154.8 148.2 157.6 148.2 160 147 C159.4 138 158.8 129 158.6 121 C158.4 114.4 158.6 108.4 158.8 103.6 C161 97 164.6 91 169 86.4Z';
      const handF = 'M152.4 145.6 C151.4 149.8 151.8 154 153.6 156.6 C155.4 158.4 158 157 158.8 154 C159.4 151.4 159.6 148.6 159.4 145.6Z';
      const trF =
        'M160.4 140 C159.6 156 159 172 158.4 186 C157.8 196 157.2 204 156.8 212.6 C160.8 214.2 165.4 214.4 169.4 213.2 C169.8 204 170.6 196 171.6 188 C172.8 177 175.6 164 179 150 L179 140Z';
      const trN =
        'M178 146 C180.8 158 183.4 170 185.6 182 C187 190 188.6 198 190.2 205.6 C193.6 206.8 197.4 206.6 200.4 204.8 C199.8 197 199.4 189 199.2 182 C199 170 198.8 156 198 140Z';
      const ankF = 'M159.6 211 L159.2 219 H167.4 L167.6 211Z';
      const ankN = 'M191.8 203 L192.6 209.6 L198.2 209 L198.4 203Z';
      const shoeF =
        'M158.4 216.6 C161.6 215.4 166.4 215.4 168.6 217.4 C170 219 169.8 222.4 168.6 224.2 C164.6 225.6 158.6 226.2 154.8 225.6 C152.6 225 152.8 222.6 154.4 221 C155.8 219.6 157 218 158.4 216.6Z';
      const soleF = 'M153.4 224.4 C157 225.8 164.4 225.6 169 223.6 L169 225.4 C164.6 227.6 157.4 227.8 153.6 226.4 C153 225.8 153 225 153.4 224.4Z';
      const shoeN =
        'M192 208.6 C195 207.6 198.8 207.8 200.6 209.6 C201.4 211 200.8 212.6 199.4 213.6 C197 215.4 193.6 217.4 190.6 217.8 C188.6 218 187.8 216.6 188.6 215 C189.6 213 190.6 210.6 192 208.6Z';
      const soleN = 'M188 216.4 C190.8 216.8 195.4 214.8 199.8 212.6 L200.4 213.6 C196 216.4 191.4 218.6 188.6 218.4 C187.8 218 187.8 217 188 216.4Z';
      /* silver hair swept back from a soft front wave into a low bun at the nape */
      const hairBack =
        'M166.8 62 C166 54.4 171 48.6 178.6 48.4 C186.4 48.2 192.2 53.6 192.4 61 C192.6 66.6 191 71.8 188 75.8 C185.8 78 182.8 78 181.2 75.6 C182.6 70.4 183 64.6 182.2 60.4Z';
      const hairCap =
        'M165.6 71.2 C163 66.6 162.8 59.6 166.6 54.2 C170.4 49 178 47 184.6 48.8 C189.6 50.4 192.6 54.8 192.4 60 C192.2 62.4 191.6 64.4 190.4 66 C189 65.8 187.6 65.8 186.4 66.4 C186.2 63.2 184.6 61.2 182 60.8 C179.8 60.6 178 61.4 176.2 62 C173.8 62.8 171.6 62 170.4 60.4 C169.4 63.4 168.8 67 168.6 71.4Z';
      const wave =
        'M164.4 67.4 C162.8 60.4 166.8 53.2 174.6 51.8 C180.4 50.8 185.6 53 187.8 57.6 C184.6 56 181 55.8 178 57 C175.2 58.2 173.2 60 172 61.8 C170.8 59.6 168.8 58.8 167.2 60.2 C165.8 62.2 165 64.6 164.4 67.4Z';
      const tilt = 'translate(0 1.2) rotate(-3 175 82)';

      /* the upper body leans a touch into the step */
      const lean = 'rotate(-1.5 178 150)';
      const sil = (list) => list.map((d) => `<path d="${d}"/>`).join('');
      const rim = `<g transform="translate(-0.9 -0.5)" fill="#fff6dc" opacity=".9">${sil([trF, shoeF, soleF])}
        <g transform="${lean}">${sil([sleeveF, handF, farPanel, neck, collar])}<g transform="${tilt}">${sil([hairBack, face, hairCap, wave])}</g></g></g>`;

      const head = `<g transform="${tilt}">
        ${s.ball(189.6, 73.6, 5.4, hr, 0.5)}
        ${line('M186.6 73.4 C187.4 70.8 190.6 70.4 192.2 72.6', hr[2], 0.45, 0.6)}
        ${part(hairBack, hr, { dir: [0, 0, 1, 0.8], at: 0.15, a1: 0.35, a2: 0.95 })}
        ${part(face, sk, { dir: [0, 0, 1, 0.5], at: 0.5, mid: 0.6, a1: 0.02, a2: 0.42 })}
        ${part('M183.2 65.4 C185.6 64.6 187 66.6 186.6 69.2 C186.2 71.6 184.6 72.8 183 72.2 C183.8 70 183.8 67.6 183.2 65.4Z', sk, { at: 0.4, a1: 0.2, a2: 0.7 })}
        ${line('M184.2 67.4 C185.2 67.6 185.4 69 184.8 70.2', sk[2], 0.5, 0.7)}
        ${part(hairCap, hr, { dir: [0, 0, 1, 1], at: 0.3, a1: 0.18, a2: 0.85 })}
        ${part(wave, hr, { dir: [0, 0, 1, 1], at: 0.45, a1: 0.04, a2: 0.45 })}
        ${gloss(176.4, 52.2, 6, 2.1, -12, 0.9)}
        ${line('M166.4 63.4 C167 57.6 171.6 53.8 177.6 53.8 C182 53.8 185.6 55.8 187.6 59.2', '#ffffff', 0.5, 0.85)}
        ${line('M173.4 60.4 C176.4 57.4 181.6 57 185 59.4', hr[2], 0.45, 0.55)}
        ${line('M184 50.6 C188.2 51.8 191 55 191.6 59.4', '#ffffff', 0.45, 0.7)}
        ${line('M184.6 75.2 C186.6 73.4 187.8 70.6 188 67.2', hr[2], 0.45, 0.55)}
      </g>`;

      const lena = `
        ${rim}
        <g transform="${lean}">
          ${part(sleeveF, li, { at: 0.3, a1: 0.06, a2: 0.6 })}${line('M151.8 144 C154.4 145 157.2 145 159.6 144', li[2], 0.6, 0.6)}
          ${part(handF, sk, { at: 0.3, a1: 0.04, a2: 0.5 })}
        </g>
        ${part(ankN, sk)}
        ${part(trN, cr, { at: 0.2, a1: 0.16, a2: 0.68 })}
        ${line('M187.6 186 C190.6 184.2 194.6 184.4 197.6 186', cr[2], 0.6, 0.7)}
        ${part(shoeN, nv)}${part(soleN, wh)}
        ${part(ankF, sk)}
        ${part(trF, cr, { at: 0.4, a1: 0.06, a2: 0.55 })}
        ${line('M177 158 C173.6 168 171.6 178 171.2 188', cr[2], 0.6, 0.6)}${line('M159.2 188 C162.4 186.2 166.4 186.4 169.6 188', cr[2], 0.6, 0.55)}
        ${part(shoeF, nv)}${part(soleF, wh)}
        <g transform="${lean}">
        ${part(collar, li, { dir: [0, 0, 1, 0], at: 0.3, a1: 0.4, a2: 0.9 })}
        ${part(neck, sk, { dir: [0, 1, 0, 0], at: 0.5, a1: 0.15, a2: 0.7 })}
        ${part(top, [cr[0], cr[0], cr[1]], { dir: [0, 0, 0.4, 1], at: 0.5, a1: 0.02, a2: 0.35, sh: cr[2] })}${line('M166.6 139.4 C172.4 141.6 179.6 141.6 185.8 139', cr[1], 0.6, 0.9)}${line('M168.6 90.4 C172.6 93 179 93 183.4 90.2', cr[1], 0.5, 0.8)}
        ${part(farPanel, li, { at: 0.35, a1: 0.08, a2: 0.55 })}
        ${part(nearPanel, li, { at: 0.12, a1: 0.25, a2: 0.8 })}
        ${line('M168.6 88 C168.2 96 168 104 167.8 112 C167.6 128 167.8 144 168.4 157.6', li[2], 0.6, 0.5)}
        ${line('M182.6 88 C182.2 96 182 104 181.9 112 C181.8 128 181.9 144 182.2 158', li[2], 0.6, 0.5)}
        ${line('M156.4 153.4 C160.8 154.8 164.8 155.2 168.6 155', li[2], 0.5, 0.5)}${line('M181.4 155.2 C187.6 155.6 193.6 155 199.4 153', li[2], 0.5, 0.5)}
        ${[102, 116, 130, 144].map((y) => `<circle cx="183.8" cy="${y}" r=".95" fill="${cr[0]}"/>`).join('')}
        ${part(handN, sk, { at: 0.3, a1: 0.1, a2: 0.6 })}
        ${part(sleeveN, li, { at: 0.12, a1: 0.25, a2: 0.85 })}${line('M191.6 143.6 C194 145.4 196.8 146.2 199.8 145.6', li[2], 0.6, 0.6)}
        ${line('M184.4 88.6 C190 93.4 194.6 98.8 196.8 104', li[2], 0.5, 0.45)}
        ${head}
        </g>`;

      return s.svg(
        `${s.sky(['#def3e6', '#f2f7e8', '#fdf3e4'])}
         ${s.glow(96, 74, 56, '#fff0b8', 0.9)}
         ${s.ball(96, 74, 24, T.sun)}
         ${s.hill('M0 132 C70 110 140 120 200 128 S310 108 360 118 V240 H0Z', H.far)}
         ${s.hill('M0 168 C90 146 170 160 240 166 S330 150 360 156 V240 H0Z', H.mid)}
         ${s.form('path', `d="${road}"`, s.lin(['#fff8ec', '#f3e4cc']), ['#d6b98c', 0, 0.45])}
         ${s.tree(268, 160)}
         ${s.hill('M0 214 C30 208 62 214 84 240 H0Z', H.near)}
         ${s.hill('M360 210 C330 210 304 224 294 240 H360Z', H.near)}
         <ellipse cx="196" cy="231" rx="32" ry="5.5" transform="rotate(18 196 231)" fill="${s.rad([[0, '#a88d60', 0.55], [0.55, '#a88d60', 0.28], [1, '#a88d60', 0]])}"/>
         <ellipse cx="161" cy="226" rx="10" ry="2.2" fill="${s.rad([[0, '#5e4f36', 0.55], [1, '#5e4f36', 0]])}"/>
         <ellipse cx="194" cy="217.8" rx="7" ry="1.6" fill="${s.rad([[0, '#5e4f36', 0.5], [1, '#5e4f36', 0]])}"/>
         ${lena}`
      );
    };
  }

  {
    /* Body Scan — Amara sits cross-legged on the hilltop, hands resting on her knees, eyes closed to the morning.
       The big rising sun sits right behind her, so its rings become a quiet aura around her head and shoulders;
       a warm rim of light runs along her curls, shoulders and arms. */
    scenes.body = function (s) {
      let k = 0;
      const skin = P.skin.s4;
      const hair = P.hair.black;
      const { teal, navy, sun, white } = P.cloth;
      const RIM = '#ffe4a6';

      /* warm rim on the edges that face the sun: the shape minus itself nudged away from the light */
      const rim = (d, dx = 0, dy = 1.1, c = RIM, a = 0.9, until = 0) => {
        const m = `${s.id}br${k++}`;
        const fill = until ? s.lin([[0, c, 1], [Math.max(0, until / 240 - 0.07), c, 1], [until / 240, c, 0]]) : c;
        return `<mask id="${m}"><path d="${d}" fill="#fff"/><path d="${d}" transform="translate(${dx} ${dy})" fill="#000"/></mask><rect width="360" height="240" fill="${fill}" opacity="${a}" mask="url(#${m})"/>`;
      };
      const line = (d, c, w = 0.7, a = 1) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${a}"/>`;
      const gloss = (cx, cy, rx, ry, rot, a = 0.55) =>
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="${s.rad([[0, '#fff', a], [1, '#fff', 0]])}"/>`;
      /* a round, irregular form: radial ramp, stippled shade on the far side */
      const blob = (d, [hi, base, lo], fx = 0.4, fy = 0.28) =>
        `<path d="${d}" fill="${s.rad([[0, hi], [0.55, base], [1, lo]], fx, fy, 0.85)}"/>` +
        `<path d="${d}" fill="${s.rad([[0.4, lo, 0], [1, lo, 0.95]], fx, fy, 0.9)}" filter="url(#${s.id}t)"/>`;
      /* a cloud of curls: a circle with scalloped edges */
      const curls = (cx, cy, R, n, bump = 1.2, ph = 0, squash = 1) => {
        const pt = (a, r) => `${(cx + Math.cos(a) * r).toFixed(2)} ${(cy + Math.sin(a) * r * squash).toFixed(2)}`;
        let d = '';
        for (let i = 0; i < n; i++) {
          const a0 = ph + (i / n) * Math.PI * 2;
          const a1 = ph + ((i + 1) / n) * Math.PI * 2;
          d += (i ? '' : `M${pt(a0, R)}`) + ` Q${pt((a0 + a1) / 2, R * bump)} ${pt(a1, R)}`;
        }
        return d + 'Z';
      };
      /* curls along an elliptical arc (angles in degrees, clockwise on screen): Q bumps pushed outwards */
      const arcCurls = (cx, cy, rx, ry, a0, a1, n, bump = 1.18) => {
        const pt = (a, r) => `${(cx + Math.cos((a * Math.PI) / 180) * rx * r).toFixed(2)} ${(cy + Math.sin((a * Math.PI) / 180) * ry * r).toFixed(2)}`;
        let d = `M${pt(a0, 1)}`;
        for (let i = 0; i < n; i++) {
          const b0 = a0 + ((a1 - a0) * i) / n;
          const b1 = a0 + ((a1 - a0) * (i + 1)) / n;
          d += ` Q${pt((b0 + b1) / 2, bump)} ${pt(b1, 1)}`;
        }
        return d;
      };
      /* a smooth tapered limb along a centre line, with rounded ends */
      const limb = (pts, ws) => {
        const n = pts.length;
        const L = [];
        const R = [];
        pts.forEach((p, i) => {
          const a = pts[Math.max(0, i - 1)];
          const b = pts[Math.min(n - 1, i + 1)];
          let tx = b[0] - a[0];
          let ty = b[1] - a[1];
          const len = Math.hypot(tx, ty) || 1;
          tx /= len;
          ty /= len;
          const h = ws[i] / 2;
          L.push([p[0] - ty * h, p[1] + tx * h]);
          R.push([p[0] + ty * h, p[1] - tx * h]);
        });
        const f = (v) => v.toFixed(2);
        const cr = (Q) => {
          let d = '';
          for (let i = 0; i < Q.length - 1; i++) {
            const p0 = Q[Math.max(0, i - 1)];
            const p1 = Q[i];
            const p2 = Q[i + 1];
            const p3 = Q[Math.min(Q.length - 1, i + 2)];
            d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
          }
          return d;
        };
        const Rr = R.slice().reverse();
        return (
          `M${f(L[0][0])} ${f(L[0][1])}` +
          cr(L) +
          ` A${f(ws[n - 1] / 2)} ${f(ws[n - 1] / 2)} 0 0 0 ${f(R[n - 1][0])} ${f(R[n - 1][1])}` +
          cr(Rr) +
          ` A${f(ws[0] / 2)} ${f(ws[0] / 2)} 0 0 0 ${f(L[0][0])} ${f(L[0][1])}Z`
        );
      };
      const mx = (pts) => pts.map(([x, y]) => [360 - x, y]);

      /* ---- Amara, sitting cross-legged; drawn at full size, then eased into the frame ---- */
      const neck = 'M175.4 114 C175.6 119.5 175 124 172.6 128.6 L187.4 128.6 C185 124 184.4 119.5 184.6 114Z';
      const head = 'M180 89.6 C187.2 89.6 191.6 95.6 191.6 102.8 C191.6 110.6 186.8 117 180 117 C173.2 117 168.4 110.6 168.4 102.8 C168.4 95.6 172.8 89.6 180 89.6Z';
      const cap =
        arcCurls(180, 101.4, 13.6, 13.4, 166, 374, 11, 1.12) +
        ' C192 101.6 190.4 99.6 187.6 98.8 C184 98 176 98 172.4 98.8 C169.6 99.6 168 101.6 166.8 104.6Z';
      const puff = curls(180, 74.5, 14.6, 13, 1.2, -0.2, 0.96);
      const torso =
        'M172 127 C176 131.2 184 131.2 188 127 C195 127.4 202 129 205 132.4 C208.2 136 207.6 144 202.2 151 C198.4 157 195.2 163 195.6 170 C196 176 198 181 199 186.6 L161 186.6 C162 181 164 176 164.4 170 C164.8 163 161.6 157 157.8 151 C152.4 144 151.8 136 155 132.4 C158 129 165 127.4 172 127Z';
      const neckline = 'M172 127 C176 131.2 184 131.2 188 127 C186 128.4 183.4 129.2 180 129.2 C176.6 129.2 174 128.4 172 127Z';
      const armL = [[157.8, 137], [149.8, 150.5], [143.6, 164.4], [137.6, 177], [131.6, 189]];
      const armW = [10.8, 9.6, 8, 7.2, 6.4];
      const sleeveL = 'M165 128.4 C158 128.8 152 131 149.2 136.4 C147.4 140.4 146.8 147 146.2 153.4 C150.4 155.6 155.6 156 159.8 153.6 C160.6 149 161.8 144.4 163.2 140.6 C164.4 136.4 165 132 165 128.4Z';
      const sleeveR = 'M195 128.4 C202 128.8 208 131 210.8 136.4 C212.6 140.4 213.2 147 213.8 153.4 C209.6 155.6 204.4 156 200.2 153.6 C199.4 149 198.2 144.4 196.8 140.6 C195.6 136.4 195 132 195 128.4Z';
      const lap =
        'M162 182.6 C148 185.6 132 188.6 121 191.8 C110.6 195 107.6 206 115.6 211.2 C124 216.4 146 218.4 180 218.4 C214 218.4 236 216.4 244.4 211.2 C252.4 206 249.4 195 239 191.8 C228 188.6 212 185.6 198 182.6Z';
      const shin =
        'M126 199.4 C140 197.6 170 199 196 201 C204 201.8 210 205 210 209 C209.6 213 200 215.2 190 215.6 C160 216.6 132 214.2 120 210.2 C115.6 207.4 117.6 200.4 126 199.4Z';
      const shoeR = 'M204.6 204.4 C209.4 202.6 215.4 203.6 220.6 207.2 C225 210.2 229.8 211.6 231.2 214 C232 216 230.4 217.4 227.6 217.4 L208.4 216.6 C204.4 214.4 202.6 207 204.6 204.4Z';
      const soleR = 'M206.4 214.4 C214 215.4 223 215.6 231.6 214.8 C232 216.6 230.6 218.2 227.6 218.2 L209.6 217.8 C207.8 217.2 206.8 216 206.4 214.4Z';
      const shoeL = 'M136 209.6 C127 209.2 117.6 211.2 112 214.2 C108.8 216 109.4 218.4 112.6 218.6 L136 218.6Z';
      const soleL = 'M110 216.6 C118 217.4 127 217.6 136 217.2 L136 219.6 L112.8 219.6 C110.8 219.4 109.8 218.2 110 216.6Z';

      const handL = 'M131.6 186.2 C127.6 186.6 124.2 189.6 123.6 192.8 C123.4 195.2 125.6 196.2 128 195.4 C131.4 194.4 134.4 191.8 134.8 189.2 C135 187.2 133.6 186 131.6 186.2Z';
      const handR = 'M228.4 186.2 C232.4 186.6 235.8 189.6 236.4 192.8 C236.6 195.2 234.4 196.2 232 195.4 C228.6 194.4 225.6 191.8 225.2 189.2 C225 187.2 226.4 186 228.4 186.2Z';
      const dArmL = limb(armL, armW);
      const dArmR = limb(mx(armL), armW);

      const amara = `
        ${s.form('ellipse', 'cx="180" cy="218" rx="80" ry="7"', s.rad([[0, '#1f5c40', 0.7], [1, '#1f5c40', 0]]), null)}
        ${s.part(neck, [skin[2], skin[1], skin[1]], [0, 0, 0, 1], 0.5)}
        ${rim(neck, 0.7, 0, RIM, 0.35)}${rim(neck, -0.7, 0, RIM, 0.35)}
        ${s.part(torso, [teal[0], teal[1], teal[2]], [0, 0, 0, 1], 0.25)}
        ${rim(torso, 0, 1.2, RIM, 0.9, 150)}
        ${s.part(neckline, [teal[2], teal[2]], [0, 0, 0, 1])}
        ${line('M168 160 C172 163 176 164.4 180 164.6', teal[2], 0.8, 0.55)}
        ${line('M192 160 C189.4 162 186.6 163.4 184 164', teal[2], 0.8, 0.45)}
        ${s.part(shoeL, sun, [0, 0, 1, 1])}
        ${s.part(soleL, white, [0, 0, 0, 1], 0.4)}
        ${s.part(lap, [navy[1], navy[1], navy[2]], [0, 0, 0, 1], 0.2)}
        ${rim(lap, 0, 1, '#ffd98a', 0.3)}
        ${line('M152 188.6 C142 190.6 132 193 125 195.6', navy[0], 0.8, 0.55)}
        ${line('M208 188.6 C218 190.6 228 193 235 195.6', navy[0], 0.8, 0.4)}
        ${line('M238 200 C230 201.6 220 202.6 212 203', navy[2], 1, 0.9)}
        ${gloss(117, 198, 5, 2.2, -20, 0.22)}${gloss(243, 198, 5, 2.2, 20, 0.18)}
        ${line('M180.6 186.4 C181.6 191 183.2 195.6 186.4 200', navy[2], 1, 0.85)}
        ${s.part(shin, [navy[0], navy[1], navy[1]], [0, 0, 0, 1], 0.45)}
        ${line('M127 200.8 C150 199.2 175 200.2 197 202.2', '#7c86ab', 0.8, 0.7)}
        ${line('M150 216 C160 216.4 170 216.2 178 215.6', navy[2], 0.9, 0.7)}
        ${s.part(shoeR, sun, [0, 0, 0, 1])}
        ${s.part(soleR, white, [0, 0, 0, 1], 0.4)}
        ${line('M211.4 205.2 L215.6 208.2 M214.4 204.6 L218 207.4', '#fff8e0', 0.7, 0.85)}
        ${s.part(dArmL, skin, [1, 0, 0, 0], 0.2)}
        ${rim(dArmL, 0.9, 0.5, RIM, 0.85, 168)}
        ${s.part(dArmR, skin, [0, 0, 1, 0], 0.2)}
        ${rim(dArmR, -0.9, 0.5, RIM, 0.85, 168)}
        ${s.part(handL, skin, [0, 0, 1, 1])}
        ${s.part(handR, skin, [1, 0, 0, 1])}
        <path d="M131 188.4 C128.6 189 126.6 190.8 126.2 192.6 C128.4 192.8 131.4 191.2 132.6 189.4Z" fill="${skin[0]}" opacity=".75"/>
        <path d="M229 188.4 C231.4 189 233.4 190.8 233.8 192.6 C231.6 192.8 228.6 191.2 227.4 189.4Z" fill="${skin[0]}" opacity=".75"/>
        ${s.part(sleeveL, teal, [0, 0, 0, 1], 0.35)}
        ${rim(sleeveL, 0.8, 0.9, RIM, 0.9, 152)}
        ${s.part(sleeveR, teal, [0, 0, 0, 1], 0.35)}
        ${rim(sleeveR, -0.8, 0.9, RIM, 0.9, 152)}
        ${line('M164.6 129.4 C164.2 136 162.4 144 160.2 152.6', teal[2], 0.7, 0.45)}
        ${line('M195.4 129.4 C195.8 136 197.6 144 199.8 152.6', teal[2], 0.7, 0.45)}
        ${line('M146.8 152.8 C150.8 154.8 155.6 155.2 159.4 153.2', teal[2], 0.8, 0.6)}
        ${line('M213.2 152.8 C209.2 154.8 204.4 155.2 200.6 153.2', teal[2], 0.8, 0.6)}
        <g transform="translate(0 2)">
        ${blob(puff, hair, 0.38, 0.26)}
        ${rim(puff, 0, 1.5)}${rim(puff, 0.9, 0.3, RIM, 0.7, 80)}${rim(puff, -0.9, 0.3, RIM, 0.7, 80)}
        ${gloss(174, 68, 6, 3, -30, 0.45)}
        ${line('M184 66 C187 68 188.6 71 188.4 74', hair[0], 0.8, 0.8)}
        ${line('M173 78 C172 81 172.4 84 174 86', hair[0], 0.7, 0.7)}
        ${s.part(head, [skin[0], skin[1], skin[2]], [0, 0, 0, 1], 0.45)}
        ${rim(head, 0, 1)}
        ${s.part('M168.8 102.6 C166.8 102.4 166 104.6 166.6 106.8 C167.2 108.8 168.6 109.4 169.4 108.6Z', [skin[1], skin[2]], [1, 0, 0, 0])}
        ${s.part('M191.2 102.6 C193.2 102.4 194 104.6 193.4 106.8 C192.8 108.8 191.4 109.4 190.6 108.6Z', [skin[1], skin[2]], [0, 0, 1, 0])}
        ${blob(cap, hair, 0.4, 0.2)}
        ${rim(cap, 0, 1.1)}
        <ellipse cx="180" cy="88.6" rx="6.4" ry="2.2" fill="${s.lin(teal, 0, 0, 1, 0)}"/>
        ${line('M167.6 103.2 c-2 1 -2 2.9 -.3 3.4 c1.6 .5 1.5 2.5 -.3 3.1 c-1.7 .6 -1.5 2.5 .2 2.9', hair[1], 1.5)}
        ${line('M192.4 103.2 c2 1 2 2.9 .3 3.4 c-1.6 .5 -1.5 2.5 .3 3.1', hair[1], 1.5)}
        ${line('M192.6 66.4 c1.8 -1.2 3.6 -.2 3.1 1.3 c-.5 1.5 1.1 2.6 2.6 1.6', hair[1], 1.3)}
        </g>`;

      const K = 0.94;
      return s.svg(
        `${s.sky(['#e6f2ea', '#f6f3e4', '#fde4cf'])}
         ${s.glow(180, 112, 150, '#fff0b8', 0.95)}
         <circle cx="180" cy="112" r="118" fill="none" stroke="#f6c45c" stroke-width="1.6" opacity=".2"/>
         <circle cx="180" cy="112" r="96" fill="none" stroke="#f6c45c" stroke-width="2" opacity=".32"/>
         <circle cx="180" cy="112" r="78" fill="none" stroke="#f6c45c" stroke-width="2.2" opacity=".55"/>
         ${s.ball(180, 112, 60, T.sun, 0.5)}
         ${s.glow(180, 104, 40, '#fff6d6', 0.55)}
         ${s.hill('M0 150 C60 138 110 150 160 158 S270 144 360 138 V240 H0Z', H.far)}
         ${s.tree(46, 200, 0.62)}
         ${s.tree(296, 158, 0.34)}
         ${s.hill('M0 222 C50 206 120 198 180 198 S310 206 360 220 V240 H0Z', H.mid)}
         <g transform="translate(180 218) scale(${K}) translate(-180 -218)">${amara}</g>
         ${s.hill('M262 240 C286 226 320 220 360 222 V240Z', H.near)}`
      );
    };
  }

  {
    /* Mapping Your Energy — a ridge of high and low peaks, like a day's energy line, under the morning sun.
       Maya stands close on the near ridge, hands on hips, looking over the peaks towards the sun (3/4 view). */
    scenes.energy = function (s) {
      const f = (n) => +n.toFixed(2);
      /* A limb: tapered capsules through [x, y, r] joints, one path so the whole limb shares one gradient. */
      const limb = (pts) => {
        let d = '';
        for (let i = 0; i < pts.length - 1; i++) {
          const [x1, y1, r1] = pts[i];
          const [x2, y2, r2] = pts[i + 1];
          const L = Math.hypot(x2 - x1, y2 - y1);
          const nx = -(y2 - y1) / L;
          const ny = (x2 - x1) / L;
          d += `M${f(x1 + nx * r1)} ${f(y1 + ny * r1)} L${f(x2 + nx * r2)} ${f(y2 + ny * r2)} A${r2} ${r2} 0 0 0 ${f(x2 - nx * r2)} ${f(y2 - ny * r2)} L${f(x1 - nx * r1)} ${f(y1 - ny * r1)} A${r1} ${r1} 0 0 0 ${f(x1 + nx * r1)} ${f(y1 + ny * r1)}Z`;
        }
        return d;
      };
      /* A short sleeve: round cap at the shoulder, straight hem `t` of the way to the elbow. */
      const sleeve = ([x1, y1], [x2, y2], t, r1, r2) => {
        const hx = x1 + (x2 - x1) * t;
        const hy = y1 + (y2 - y1) * t;
        const L = Math.hypot(x2 - x1, y2 - y1);
        const nx = -(y2 - y1) / L;
        const ny = (x2 - x1) / L;
        return `M${f(x1 + nx * r1)} ${f(y1 + ny * r1)} L${f(hx + nx * r2)} ${f(hy + ny * r2)} L${f(hx - nx * r2)} ${f(hy - ny * r2)} L${f(x1 - nx * r1)} ${f(y1 - ny * r1)} A${r1} ${r1} 0 0 0 ${f(x1 + nx * r1)} ${f(y1 + ny * r1)}Z`;
      };
      /* A sneaker seen from the side, toe to the left; (hx, by) = heel at the ground. */
      const shoe = (hx, by, len, ht) => {
        const tx = hx - len;
        const upper =
          `M${hx + 0.4} ${by - 2.4} C${hx + 0.8} ${by - ht * 0.55} ${hx + 0.4} ${by - ht * 0.85} ${hx - 1} ${by - ht}` +
          ` C${hx - 3.2} ${by - ht - 0.6} ${hx - 5.6} ${by - ht - 0.4} ${hx - 7.2} ${by - ht + 0.8}` +
          ` C${hx - 9.6} ${by - ht * 0.72} ${tx + 6} ${by - ht * 0.66} ${tx + 2.6} ${by - ht * 0.48}` +
          ` C${tx + 0.4} ${by - ht * 0.38} ${tx - 0.4} ${by - 2.8} ${tx + 0.2} ${by - 2.2}Z`;
        const sole = `M${tx - 0.2} ${by - 3} H${hx + 0.6} A1.5 1.5 0 0 1 ${hx + 0.6} ${by} H${tx - 0.2} A1.5 1.5 0 0 1 ${tx - 0.2} ${by - 3}Z`;
        return (
          s.form('path', `d="${upper}"`, s.lin([[0, '#fff'], [0.55, P.cloth.white[1]], [1, '#d6d8e4']], 0, 0, 1, 0.6), [P.cloth.white[2], 0, 0.5, [0, 0, 1, 0.6]]) +
          s.form('path', `d="${sole}"`, s.lin(['#fffdf6', '#e6e2d6'], 0, 0, 1, 0)) +
          `<path d="M${tx + 1} ${by - 3} H${hx}" stroke="#c9c4b4" stroke-width=".5" opacity=".8"/>`
        );
      };

      const LD = [0, 0, 1, 0.3]; /* light from the sun, upper left */
      /* like s.part, with control over how far the stipple reaches */
      const piece = (d, ramp, dir = LD, from = 0, to = 0.7, shade = ramp[2]) => s.form('path', `d="${d}"`, s.lin(ramp, ...dir), [shade, from, to, dir]);
      const skin = P.skin.s2;
      /* skin printed lighter: the base tone sits past the middle so the lit side stays peachy */
      const flesh = (d, dir = LD, to = 0.42) => piece(d, [[0, skin[0]], [0.62, skin[1]], [1, skin[2]]], dir, 0, to, skin[2]);
      const hair = P.hair.black;
      const top = P.cloth.violet;
      const navy = P.cloth.navy;

      /* Maya's joints */
      const fS = [246.4, 103.6]; /* far shoulder (her right) */
      const fE = [231.4, 120.4];
      const nS = [270.6, 103.4]; /* near shoulder (her left) */
      const nE = [288.6, 119.4];

      const farArm = flesh(limb([[...fS, 3.6], [...fE, 3.1], [245, 131.6, 2.5]]), LD, 0.6);
      const farSleeve = piece(sleeve(fS, fE, 0.42, 5.2, 4.6), top, LD, 0.2, 0.85);
      const nearArm = flesh(limb([[275.4, 107.8, 3.7], [...nE, 3.2], [277.6, 132.4, 2.5], [272.2, 137.8, 3.1]]), LD, 0.45);
      /* near sleeve drawn by hand so its cap continues the shoulder line */
      const nearSleeve =
        piece('M264.6 97.6 C268.8 97.8 272.6 98.8 275 100.8 C277.6 102.6 279.8 104.8 281.4 107.2 L275.4 113.8 C273.8 112.4 272.4 110.8 271 108.8 C269.4 106 267.2 101.8 264.6 97.6Z', top, LD, 0.05, 0.75) +
        `<path d="M275.2 101.4 C273.8 104 272.6 106.4 271.8 108.6" fill="none" stroke="${top[2]}" stroke-width=".5" opacity=".25"/>`;

      const neck = flesh('M252.8 84 C253.2 88.5 253 92.4 251.8 97 L261.6 97 C260.2 93.4 259.8 89 260 84Z', LD, 0.5);
      const chinShade = `<path d="M252.8 86 C255 89.8 258.6 90.2 260.2 87.4 L260 84 L252.8 84Z" fill="${skin[2]}" opacity=".55"/>`;

      const shirt = piece(
        'M251.2 96.6 C248 97 245.2 98.2 243.8 101 C242.6 104 242.8 108 244 112.2 C245.2 116.4 246.6 120.6 246.8 124.6 C247 127.4 246.6 130 246.2 132 L270.8 132 C270.6 129 270.4 126.6 270.6 123.6 C270.8 118.6 273.4 111.6 274.2 105.4 C274.6 101.8 273.4 99 270.8 98.2 C268 97.4 264.6 96.8 262.2 96.6 C259.4 99.8 254 99.8 251.2 96.6Z',
        top,
        LD,
        0.05,
        0.72
      );
      const shirtLines =
        `<path d="M251.2 96.8 C254 100 259.4 100 262.2 96.8" fill="none" stroke="${top[2]}" stroke-width="1.1" stroke-linecap="round" opacity=".55"/>` +
        `<path d="M245.8 113.4 C248.6 116.4 252.4 117.6 255.6 117" fill="none" stroke="${top[2]}" stroke-width=".7" stroke-linecap="round" opacity=".45"/>` +
        `<path d="M266.4 121.6 C267.8 124.6 268.4 127.6 268.2 130.6" fill="none" stroke="${top[2]}" stroke-width=".7" stroke-linecap="round" opacity=".5"/>`;

      const ankles = flesh(limb([[243.4, 209, 2.4], [243.2, 214.5, 2.3]]) + limb([[271.2, 210, 2.5], [271, 216, 2.4]]), LD, 0.6);
      const trousers = piece(
        'M246.4 125.6 C245 131 243.6 136.4 243.4 142.6 C243.2 156 242 170 240.8 182 C239.8 192 238.6 202 237.8 210.6 L249 211.2 C250 200 251.6 186 253 176 C254.2 167 255.6 156 257.4 148.6 C258.8 156 260.4 166 261.8 176 C263 186 264.2 200 265 212.4 L277.4 211.8 C277.4 200 276.8 188 276.2 180 C275.6 168 275.2 154 274.6 144 C274.2 137 272.6 131 270.8 125.6 C262.4 126.6 254.4 126.6 246.4 125.6Z',
        [[0, navy[0]], [0.4, navy[1]], [1, navy[2]]],
        LD,
        0.08,
        0.85,
        navy[2]
      );
      const trouserLines =
        `<path d="M246.6 128.4 C254.6 129.4 262.6 129.4 270.9 128.4" fill="none" stroke="${navy[0]}" stroke-width=".7" opacity=".7"/>` +
        `<path d="M268.8 150 C269.8 168 270.6 190 271 208" fill="none" stroke="${navy[0]}" stroke-width=".6" opacity=".55"/>` +
        `<path d="M257 151 C254.8 154 252.2 156 249.2 157" fill="none" stroke="${navy[2]}" stroke-width=".7" opacity=".7"/>`;

      /* Head turned to the sun in 3/4: the face is the lit oval in front, the bob wraps the crown and back. */
      const face = flesh(
        'M257.2 65.2 C251.8 65.2 248.6 68.6 248 73.4 C247.6 76.4 246.8 79 247.4 81.6 C248 85 249.8 88 252.8 89.4 C255.4 90.4 258.6 89.4 260.8 87.4 C263.8 84.4 264.6 78 264 73 C263.4 68 261 65.2 257.2 65.2Z',
        [0, 0, 1, 0.2],
        0.38
      );
      const hairD =
        'M246.4 74.8 C250.6 74.4 255.2 74.2 259.6 74.2 C261 78 261.6 83.4 260.6 88.2 C260.4 89.2 260.8 90 261.6 90.4 C264 91.6 267.6 91.8 270.8 90.4 C272.2 89.8 273.2 88.6 273.4 87.4 C274.6 82 275.2 75.4 273.6 69.8 C271.4 63.4 266 59.8 259.8 59.8 C252.4 59.8 247.4 64.4 246.6 70.6 C246.4 72 246.3 73.6 246.4 74.8Z';
      const fringeD = 'M246.4 74.8 C250.6 74.4 255.2 74.2 259.6 74.2 C259.9 70.2 258.8 65.8 255.8 62.4 C250.8 63.4 247 67.6 246.4 74.8Z';
      const bob =
        s.part(hairD, hair, [0, 0, 1, 0.5], 0.1) +
        piece(fringeD, [hair[0], hair[1], hair[1]], [0, 0, 1, 0.4], 0, 0.5, hair[2]) +
        `<ellipse cx="254.2" cy="64.6" rx="5.8" ry="2.1" transform="rotate(-22 254.2 64.6)" fill="${s.rad([[0, '#fff', 0.62], [1, '#fff', 0]])}"/>` +
        `<path d="M262 62.6 C268 64.2 271.8 70 272.2 79" fill="none" stroke="${hair[0]}" stroke-width=".6" stroke-linecap="round" opacity=".8"/>` +
        `<path d="M261.8 67 C264.6 71.4 265.8 79 265.4 88.6" fill="none" stroke="${hair[0]}" stroke-width=".5" stroke-linecap="round" opacity=".55"/>` +
        `<path d="M252.4 66 C254.6 68.4 256 71 256.6 74" fill="none" stroke="${hair[0]}" stroke-width=".45" stroke-linecap="round" opacity=".7"/>`;
      const rim = `<path d="M248.5 75 C247.9 78 247.5 81 248.5 84.6" fill="none" stroke="#fff3dc" stroke-width=".8" stroke-linecap="round" opacity=".75"/>`;
      const head = `<g transform="translate(257 91) rotate(5) scale(.94) translate(-257 -91)">${face}${bob}${rim}</g>`;

      /* drawn at the first size, then brought closer: scaled up around the point between her feet */
      const maya =
        '<g transform="translate(266 223) scale(1.2) translate(-266 -223)">' +
        farArm + farSleeve + neck + shirt + shirtLines + ankles + trousers + trouserLines +
        shoe(250, 219.4, 18.4, 9.2) + shoe(279, 222.2, 17, 10) +
        nearArm + nearSleeve + chinShade + head + '</g>';

      /* The energy line: a ridge of high and low peaks; the flanks turned from the sun sit in stippled shade. */
      const crest = 'M0 154 C40 146 84 80 112 80 C134 80 144 140 166 140 C186 140 196 102 214 102 C230 102 238 138 254 138 C276 138 300 110 318 110 C334 110 346 132 360 136';
      const flank = (d) => s.form('path', `d="${d}"`, 'none', ['#4f9e78', 0.75, 0, [1, 0, 0.2, 1]]);

      return s.svg(
        `${s.sky(['#fde6c0', '#fdf0dc', '#eef5e2'])}
         ${s.sun(64, 58, 24)}
         ${s.hill(crest + ' V240 H0Z', H.far)}
         ${flank('M112 80 C134 80 144 140 166 140 L166 176 C146 160 124 120 112 80Z')}
         ${flank('M214 102 C230 102 238 138 254 138 L254 176 C238 164 222 132 214 102Z')}
         ${flank('M318 110 C334 110 346 132 360 136 V176 C344 164 328 140 318 110Z')}
         <path d="${crest}" fill="none" stroke="#fffaf0" stroke-width="1.2" stroke-linecap="round" opacity=".55"/>
         ${s.hill('M0 180 C60 164 120 172 180 178 S300 164 360 170 V240 H0Z', H.mid)}
         ${s.tree(70, 194, 0.64)}
         ${s.tree(334, 182, 0.5)}
         ${s.hill('M60 240 C110 230 176 215 250 214 C298 213.4 334 219 360 226 V240Z', H.near)}
         <path d="M60 240 C110 230 176 215 250 214 C298 213.4 334 219 360 226" fill="none" stroke="#d9f5e2" stroke-width="1" opacity=".45"/>
         ${s.hill('M0 220 C30 212 58 216 80 240 H0Z', H.near)}
         ${s.form('ellipse', 'cx="262" cy="222.4" rx="36" ry="4"', s.rad([[0, '#1f5a40', 0.6], [1, '#1f5a40', 0]]), null)}
         ${maya}`
      );
    };
  }

  {
    /* Energy Battery — a glass battery stands in the meadow like a monument, full of warm light;
       Ken stands close beside it, leaning in a little, one hand resting on the glass as if feeling its warmth. */
    scenes.battery = function (s) {
      const clip = s.id + 'bc';
      const kclip = s.id + 'kc';
      /* a garment or body part: ramp weighted to its base tone, stippled shade towards the far end of `dir` */
      const part = (d, r, dir = [0, 0, 1, 1], from = 0.1, mid = 0.42, to = 0.9) =>
        s.form('path', `d="${d}"`, s.lin([[0, r[0]], [mid, r[1]], [1, r[2]]], ...dir), [r[2], from, to, dir]);
      const line = (d, c, w = 0.9, o = 0.8) =>
        `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}"/>`;
      /* a tuft of meadow grass: three tapered blades */
      const tuft = (x, y, k = 1) =>
        [[-5, -9, -3], [0, -13, 0], [5, -8, 3]]
          .map(([dx, h, lean]) =>
            s.form('path', `d="M${x + (dx - 1.6) * k} ${y} C${x + (dx - 1) * k} ${y + h * 0.5 * k} ${x + (dx + lean * 0.6) * k} ${y + h * 0.9 * k} ${x + (dx + lean) * k} ${y + h * k} C${x + (dx + lean * 0.4 + 0.6) * k} ${y + h * 0.6 * k} ${x + (dx + 1.4) * k} ${y + h * 0.3 * k} ${x + (dx + 1.6) * k} ${y}Z"`, s.lin(['#cdeed8', '#6fbf93', '#3f8f68'], 0, 0, 0, 1), [T.forest[2], 0, 0.7]),
          )
          .join('');

      const skin = P.skin.s3;
      const hair = P.hair.black;
      const jacket = ['#ffe6a0', '#f4bd52', '#d0812c'];
      const jacketFar = ['#f6cf72', '#e6a440', '#b8681f'];
      const tee = ['#ffffff', '#eef0f7', '#a9adc4'];
      const navy = P.cloth.navy;
      const navyFar = ['#3b4364', '#20253f', '#0a0c1b'];
      const shoe = ['#b07a52', '#6e4128', '#341c0e'];
      const sole = P.cloth.cream[1];
      const warm = '#ffe7a8';
      /* he leans a touch towards the battery from the hips; his head tips towards it a little more */
      const LEAN = 'rotate(-2.5 238 138)';
      const TILT = 'rotate(-4 236 84)';

      /* ---------- Ken, three-quarter view facing the battery (light from the upper left) ---------- */
      const LEGS = {
        farLeg: 'M221.2 129 C219.8 140 219.2 152 218.4 166 C217.8 172 217.4 177 217.6 181 C218 192 221 204 222.4 217.6 L233.8 217.6 C233.2 207 233.4 198 232.2 188 C231.8 184 231.6 181 232 177 C233.4 165 236.4 152 238.8 142.4 L240 129 Z',
        nearLeg: 'M237 129 L238.8 142.4 C240.4 152 242.2 166 242.8 181 C243.2 194 243.4 206 243.4 217.6 L255.4 217.6 C255.2 205 255.6 194 256 181 C256.6 164 258.2 147 257.6 129 Z',
        farShoe: 'M222.6 215 C221.6 219 219 221.4 214 222.8 C211 223.6 210.4 225.8 212.4 226.6 L234.4 226.6 C234.8 222.6 234.4 218.6 233.8 215 Z',
        nearShoe: 'M243.6 216.4 C243 220.4 240.6 222.8 235.8 224.2 C232.8 225 232.4 227.4 234.6 228.2 L256.4 228.2 C256.8 224.2 256.4 220.2 255.8 216.4 Z',
      };
      const BODY = {
        tee: 'M229.6 86 C233.8 89 239 89 243.6 86.2 C242.2 100 239.4 120 237.4 139.6 L230.6 139.6 C230.8 120 230 100 229.6 86 Z',
        jacket:
          'M230.2 85.8 C224.4 86.4 220.4 89 219.6 94.2 C218.6 102 219 112 219.8 121 C220.2 126.6 220.2 131.6 219.8 137.4 C231 139.6 246 139.6 258.6 137 C258.4 127 258.8 114 259.4 102 C259.8 96 258.2 91 253 88.6 C250 87.2 246.8 86.2 243.6 85.8 C243 99 239.6 120 236.6 138.8 L231.6 138.8 C231.6 120 230.8 100 230.2 85.8 Z',
        collarFar: 'M230.4 85.4 C228.4 88.4 226.8 91.4 225.8 94.8 C228.4 93.4 230.6 93 232.8 93.2 C231.6 90.6 231 88 230.4 85.4 Z',
        collarNear: 'M243.6 85.4 C245.8 88.4 247.4 91.8 248.2 95.6 C245.4 94 242.8 93.4 240.2 93.4 C241.8 90.8 242.8 88.2 243.6 85.4 Z',
        nearSleeve:
          'M249 88 C255 87.6 259.6 90 261.2 96 C263.6 103.6 266 111.4 267 118.6 C267.6 124.4 263.2 129.6 257.4 133.4 L249 132.6 C252.8 129.4 256.4 125.4 257.6 121.2 C256.8 114.6 254.2 106.6 252 100 Z',
        farSleeve:
          'M227.6 88.4 C221.6 88.4 217.6 91.6 216.6 96.4 C214.2 103.4 211 110.6 208 116.9 C204.6 116.4 200.6 115.8 196.4 115.4 L195.6 124.8 C200.6 125.6 206 126.6 210.6 127.4 C214.6 128 217.4 126.6 218.8 123.2 C221.6 115.6 225.4 106.6 228.8 100.6 C230 96 229.6 90.4 227.6 88.4 Z',
        hand: 'M197.6 115 C193.2 112.8 188 111 184.6 112 C181.6 113 181.2 116.6 183.6 118.8 C186.6 121.8 191.8 124.4 197.6 125 Z',
      };
      const HEAD = {
        collarBack: 'M228.4 88.6 C228 85.4 228.8 82.4 230.8 81 L244.8 80.6 C246.2 82.4 246.8 85.2 246.2 88.6 Z',
        neck: 'M231.6 74.6 C232.2 78.6 232 82.4 231 87.4 L244.6 87.4 C243 82.6 242.8 77.6 244 72.4 Z',
        face: 'M227.6 55.6 C225.2 58.4 224.6 62.6 225 66.6 C225.4 70 226.6 73.2 228.8 75.6 C230.4 77.4 232.6 78.4 235 78.2 C238.6 77.8 241.6 75.6 243.8 72.4 C245.8 69.4 247.4 65.4 247.6 60.8 C247.8 54.6 243.4 50.4 237.2 50.4 C232.8 50.4 229.6 52.4 227.6 55.6 Z',
        hairBack: 'M226 59.4 C224.6 52.8 229.8 47.6 237.6 47.6 C245.4 47.6 250.4 52.4 250 59.8 C249.8 64.8 248.6 69.4 246.2 72.8 C245 72.6 244.4 71.4 244.2 69.8 C244 66.4 243.6 63.6 241.8 61.8 C238.8 59.6 234 59.8 230.6 59.6 C228.8 59.6 227.2 59.6 226 59.4 Z',
        fringe: 'M245.6 51.2 C240 46.6 230.2 46.2 225 51.6 C222.8 53.8 221.6 57.6 222 61.8 C223 60.2 224.4 59 226 58.4 C229.6 57.2 233.8 57.8 237.6 56.8 C241 55.8 243.8 53.8 245.6 51.2 Z',
      };

      const legs = `
        ${part(LEGS.farShoe, shoe, [0, 0, 1, 0.6], 0.1)}
        <path d="M211.4 224.8 H234.6 V227.2 Q234.6 228 233.8 228 H212.6 Q211.2 228 211.4 224.8 Z" fill="${sole}"/>
        ${part(LEGS.farLeg, navyFar, [0, 0, 1, 0.3], 0.1)}
        ${part(LEGS.nearShoe, shoe, [0, 0, 1, 0.6], 0.1)}
        <path d="M233.8 226.4 H256.6 V228.8 Q256.6 229.6 255.8 229.6 H235 Q233.6 229.6 233.8 226.4 Z" fill="${sole}"/>
        ${part(LEGS.nearLeg, navy, [0, 0, 1, 0.3], 0.1)}
        ${line('M244.6 179 C247.6 181 251.2 181 254 179', navy[0], 0.9, 0.5)}
        ${line('M219.4 180 C222.4 182.2 226.8 182.4 231 180.4', navy[0], 0.9, 0.45)}
        ${line('M243.6 212 C247 214 251.6 214 255 212', navy[0], 0.8, 0.4)}
        ${line('M218.6 168 C218 174 217.8 178 218 181', warm, 0.9, 0.35)}`;

      const head = `<g transform="${TILT}">
        ${part(HEAD.collarBack, jacketFar, [0, 0, 1, 0], 0.2)}
        ${part(HEAD.neck, skin, [0, 0, 1, 0.3], 0.05)}
        <path d="M231.8 75 C235.4 78.6 240.4 78.4 244 74 L243.4 80 C239.8 82.2 235.2 82.2 232 80 Z" fill="${skin[2]}" opacity=".45"/>
        ${s.form('path', `d="${HEAD.face}"`, s.lin([[0, skin[0]], [0.38, '#cf9468'], [1, skin[1]]], 0, 0.2, 1, 0.7), [skin[2], 0, 0.5, [0.2, 0, 1, 0.6]])}
        ${line('M226.4 59.6 C225 63 225.2 68.4 227.4 72.6', warm, 0.9, 0.7)}
        ${part(HEAD.hairBack, hair, [0, 0, 1, 0.8], 0.2)}
        ${s.form('ellipse', 'cx="243.4" cy="66.6" rx="2.5" ry="3.7"', s.lin([skin[0], skin[1]], 0, 0, 1, 1), [skin[2], 0.1, 0.7])}
        ${line('M243.8 64.4 C242.6 65.6 242.6 67.8 243.8 69', skin[2], 0.8, 0.7)}
        ${line('M226.4 58.6 C230 57.4 234 57.8 237.8 57.2 C241.4 56.4 244.2 54.4 246.2 51.8', hair[2], 1.2, 0.9)}
        ${s.form('path', `d="${HEAD.fringe}"`, s.lin([[0, hair[0]], [0.5, '#2e2b48'], [1, hair[1]]], 0.3, 0, 0.5, 1), [hair[2], 0, 0.6, [0, 0, 1, 1]])}
        <ellipse cx="232.4" cy="51" rx="7" ry="2.4" transform="rotate(-16 232.4 51)" fill="${s.rad([[0, '#fff', 0.65], [1, '#fff', 0]])}"/>
        ${line('M242.4 50.4 C236.6 49.6 230 51.4 226 55.8', '#6a6588', 0.7, 0.8)}
        ${line('M244.6 52.6 C239.4 52.8 233.4 54.4 228.6 57.4', '#6a6588', 0.6, 0.6)}
      </g>`;

      const upper = `<g transform="${LEAN}">
        ${head}
        ${part(BODY.tee, tee, [0, 0, 1, 0.15], 0.05, 0.45, 0.95)}
        ${line('M230.4 87.2 C234.2 90 239 90 243 87.6', tee[2], 1.2, 0.8)}
        ${part(BODY.jacket, jacket, [0, 0, 1, 0.45], 0.1)}
        ${line('M236.8 138.4 C239.6 120 243 99 243.4 86.4', jacket[2], 1.2, 0.6)}
        ${line('M231.4 138.4 C231.4 120 230.8 100 230.4 87', jacket[0], 0.9, 0.7)}
        ${line('M220.4 100 C219.4 110 220 124 220.2 136.6', warm, 1, 0.75)}
        ${part(BODY.collarFar, jacketFar, [0, 0, 1, 1], 0.1)}
        ${part(BODY.collarNear, jacket, [0, 0, 1, 1], 0.2)}
        ${part(BODY.nearSleeve, jacket, [0, 0, 1, 0.3], 0.2)}
        ${line('M252.6 101 C254.8 107.6 257 115 257.6 121.2 C256.4 125.4 252.8 129.4 249 132.6', jacket[0], 0.9, 0.7)}
        <path d="M246.4 134 C250 132.4 254.4 131.6 258.4 131.6" fill="none" stroke="${jacket[2]}" stroke-width="2" stroke-linecap="round" opacity=".9"/>
        ${part(BODY.farSleeve, jacketFar, [0, 0, 1, 0.6], 0.1)}
        ${line('M218.8 123.2 C221.6 115.6 225.4 106.6 228.8 100.6', jacketFar[2], 1, 0.7)}
        ${line('M226 89.2 C220.6 89.6 217.8 92.6 216.8 96.8 C214.4 103.4 211.2 110.6 208.2 116.6 C205 116.2 201 115.6 197 115.2', warm, 1, 0.85)}
        ${line('M199.6 115.8 L198.9 125.2', jacketFar[2], 1.2, 0.75)}
        ${part(BODY.hand, skin, [0, 0, 1, 1], 0, 0.5, 0.8)}
        ${line('M196.8 114.8 C192.8 112.8 188.6 111.4 185.2 112.2', warm, 1, 0.85)}
      </g>`;

      /* his silhouette, posed the same way, to catch the battery's warm light on the side facing it */
      const sil = (set, t) => Object.values(set).map((d) => `<path d="${d}"${t ? ` transform="${t}"` : ''}/>`).join('');
      const silhouette = sil(LEGS) + sil(BODY, LEAN) + sil(HEAD, `${LEAN} ${TILT}`);

      return s.svg(
        `${s.sky(['#e4f2e6', '#f6f4e2', '#fde6cb'])}
         ${s.sun(64, 62, 17)}
         ${s.hill('M0 126 C70 108 140 118 200 126 S310 106 360 116 V240 H0Z', H.far)}
         ${s.hill('M0 172 C80 152 160 162 220 168 S320 152 360 158 V240 H0Z', H.mid)}
         ${s.tree(318, 192, 0.72)}
         ${s.glow(152, 138, 116, '#fff0b8', 0.85)}
         <ellipse cx="170" cy="228" rx="96" ry="12" fill="${s.rad([[0, '#fff3c4', 0.7], [1, '#fff3c4', 0]])}"/>
         ${s.form('ellipse', 'cx="152" cy="225" rx="62" ry="7"', s.rad([[0, '#2f7a58', 0.55], [1, '#2f7a58', 0]]), null)}
         ${s.form('ellipse', 'cx="236" cy="228.6" rx="32" ry="4.6"', s.rad([[0, '#2f7a58', 0.6], [1, '#2f7a58', 0]]), null)}
         ${s.form('rect', 'x="104" y="72" width="96" height="153" rx="24"', s.lin(['#fffdf6', '#fbf0dc', '#efdcbc'], 0, 0, 1, 1), ['#c9a66b', 0, 0.55, [0, 0, 1, 1]])}
         <clipPath id="${clip}"><rect x="112" y="80" width="80" height="137" rx="17"/></clipPath>
         <g clip-path="url(#${clip})">
           ${s.form('path', 'd="M112 112 q20 -8 40 0 t40 0 V217 H112Z"', s.lin(['#ffe7a8', '#f6c45c', '#e8893a']), [T.sun[2], 0, 0.85])}
           <path d="M112 112 q20 -8 40 0 t40 0" fill="none" stroke="#fff6d6" stroke-width="2.4" opacity=".8"/>
           <circle cx="134" cy="196" r="2.4" fill="#fff" opacity=".55"/>
           <circle cx="172" cy="182" r="1.8" fill="#fff" opacity=".55"/>
           <circle cx="128" cy="142" r="1.6" fill="#fff" opacity=".5"/>
           <circle cx="176" cy="130" r="2.2" fill="#fff" opacity=".5"/>
         </g>
         <path d="M157 128 l-13 23 h16 l-10 23" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/>
         <rect x="134" y="58" width="36" height="16" rx="5" fill="${s.lin(['#2c3a52', INK])}"/>
         <rect x="114" y="86" width="9" height="104" rx="4.5" fill="#fff" opacity=".55"/>
         ${s.glow(189, 118, 18, '#fff4cc', 0.9)}
         ${legs}
         ${upper}
         <clipPath id="${kclip}">${silhouette}</clipPath>
         <g clip-path="url(#${kclip})"><circle cx="196" cy="122" r="40" fill="${s.rad([[0, '#ffd98a', 0.45], [1, '#ffd98a', 0]])}"/></g>
         ${tuft(100, 227, 1.3)}
         ${tuft(205, 228, 1.1)}
         ${tuft(268, 230, 1.2)}
         ${s.hill('M0 204 C34 196 70 204 94 240 H0Z', H.near)}`
      );
    };
  }

  {
    /* How to Improve Your Sleep — dusk: a big moon rises behind the hills while Lena reads in a hammock
       strung between two close trees, one leg hanging over the edge. */
    scenes.moonrise = function (s) {
      /* tiny vector kit, local to this scene */
      const add = (p, q, k = 1) => [p[0] + q[0] * k, p[1] + q[1] * k];
      const dir = (p, q) => {
        const x = q[0] - p[0], y = q[1] - p[1], l = Math.hypot(x, y);
        return [x / l, y / l];
      };
      const nrm = (d) => [-d[1], d[0]];
      const F = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
      /* one smooth outline through joints: round outer bends, soft inner creases, rounded ends */
      const limb = (pts, ws, caps = [1, 1]) => {
        const side = (P, W) => {
          const out = [];
          for (let i = 0; i < P.length - 1; i++) {
            const d = dir(P[i], P[i + 1]), n = nrm(d), h1 = W[i + 1] / 2;
            if (i === 0) out.push(`M${F(add(P[0], n, W[0] / 2))}`);
            const p1 = add(P[i + 1], n, h1);
            if (i < P.length - 2) {
              const d2 = dir(P[i + 1], P[i + 2]), n2 = nrm(d2);
              const z = d[0] * d2[1] - d[1] * d2[0];
              if (z > 0) {
                const dot = n[0] * n2[0] + n[1] * n2[1];
                const I = add(P[i + 1], [n[0] + n2[0], n[1] + n2[1]], h1 / (1 + dot));
                const t = h1 * 0.8;
                out.push(`L${F(add(I, d, -t))}Q${F(I)} ${F(add(I, d2, t))}`);
              } else {
                const q = add(P[i + 1], n2, h1);
                const ang = Math.acos(Math.max(-1, Math.min(1, d[0] * d2[0] + d[1] * d2[1])));
                const k = (4 / 3) * Math.tan(ang / 4) * h1;
                out.push(`L${F(p1)}C${F(add(p1, d, k))} ${F(add(q, d2, -k))} ${F(q)}`);
              }
            } else out.push(`L${F(p1)}`);
          }
          return out;
        };
        const cap = (c, d, h, r) => {
          const n = nrm(d), a = add(c, n, h), b = add(c, n, -h), k = h * 1.33 * r;
          return `C${F(add(a, d, k))} ${F(add(b, d, k))} ${F(b)}`;
        };
        const m = pts.length;
        const A = side(pts, ws);
        const B = side([...pts].reverse(), [...ws].reverse());
        const dEnd = dir(pts[m - 2], pts[m - 1]), dStart = dir(pts[1], pts[0]);
        return A.join('') + cap(pts[m - 1], dEnd, ws[m - 1] / 2, caps[1]) + B.join('').replace(/^M[^LCQ]+/, '') + cap(pts[0], dStart, ws[0] / 2, caps[0]) + 'Z';
      };
      /* rig: a local frame (drawn upright, facing right) placed and turned in the scene */
      const rig = (local, world, deg) => {
        const r = (deg * Math.PI) / 180, c = Math.cos(r), sn = Math.sin(r);
        const at = (x, y) => {
          const dx = x - local[0], dy = y - local[1];
          return [world[0] + dx * c - dy * sn, world[1] + dx * sn + dy * c];
        };
        const tf = `translate(${(world[0] - local[0]).toFixed(2)} ${(world[1] - local[1]).toFixed(2)}) rotate(${deg} ${local[0]} ${local[1]})`;
        return { at, tf };
      };

      const skin = P.skin.s1, skinL = [skin[0], skin[1], '#e4ae8a'], hair = P.hair.silver, lilac = P.cloth.lilac, cream = P.cloth.cream, navy = P.cloth.navy;
      const cover = ['#d6f6f4', '#4fb8bf', '#1d6f78'];
      /* gradient + stipple with an adjustable shade strength */
      const part = (d, ramp, dr = [0.6, 0, 0.4, 1], from = 0.1, to = 0.85) => s.form('path', `d="${d}"`, s.lin(ramp, ...dr), [ramp[2], from, to, dr]);
      const line = (d, c, w = 1, o = 1) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}"/>`;
      const soft = (cx, cy, rx, ry, c, a) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${s.rad([[0, c, a], [1, c, 0]])}"/>`;

      /* ---- hammock: two ends and a sag; the rim is pushed down where her leg hangs over ---- */
      const HL = [72, 128], HR = [296, 124], RIM = [190, 230];
      const rimD = `M${F(HL)} Q${F(RIM)} ${F(HR)}`;
      const farEdge = `M${F(HL)} Q186 184 ${F(HR)}`;

      /* ---- Lena's rig: torso drawn upright (shoulders at local 60,88), laid back into the cloth ---- */
      const torso = rig([60, 88], [124, 127], -48);
      const head = rig([60, 71], torso.at(60, 78), -10);
      const shoulder = torso.at(62.4, 96);
      const hipN = torso.at(61, 146), hipF = torso.at(57, 143);

      /* far leg: knee up, foot resting on the cloth */
      const kneeF = [196, 133], ankleF = [225, 158];
      const shoe = (heel, toe, h) => {
        const d = dir(heel, toe), up = nrm(d).map((v) => -v);
        const L = Math.hypot(toe[0] - heel[0], toe[1] - heel[1]);
        const p = (a, b) => add(add(heel, d, a * L), up, b * h);
        const body = `M${F(p(0, 0))} L${F(p(0.9, 0))} C${F(p(1.06, 0))} ${F(p(1.08, 0.6))} ${F(p(0.86, 0.7))} C${F(p(0.66, 0.78))} ${F(p(0.44, 1.02))} ${F(p(0.22, 1.05))} C${F(p(0.04, 1.06))} ${F(p(-0.08, 0.7))} ${F(p(0, 0))}Z`;
        const sole = `M${F(p(-0.02, 0.02))} L${F(p(0.92, 0.02))} C${F(p(1.04, 0.03))} ${F(p(1.05, 0.2))} ${F(p(0.98, 0.24))} L${F(p(0.02, 0.22))}Z`;
        return part(body, navy, [0.5, 0, 0.5, 1], 0.2, 0.9) + `<path d="${sole}" fill="${s.lin(['#fffaf0', '#e9dccb'])}"/>`;
      };
      const farLeg =
        part(limb([hipF, kneeF, ankleF], [14.5, 10, 7.2]), cream, [0.6, 0, 0.3, 1], 0.3, 0.9) +
        `<path d="M${F(add(ankleF, [-3.2, -1.4]))} l6 2.6 l-1.6 4 l-6 -2.6Z" fill="${skin[1]}"/>` +
        shoe([222, 163], [240, 164], 7.2);

      /* torso: lilac cardigan over a cream top; the body sits in the cloth's shade so the near sleeve reads in front */
      const body = ['#d8ccf6', lilac[1], lilac[2]];
      const T0 = `
        ${part('M57 74 L63.4 74 L64.4 90 L56 90Z', skinL, [1, 0, 0, 0], 0.3, 0.7)}
        ${part('M55.6 84.4 C51 85.8 48.8 89.4 48.8 95 C48.8 104 50 112 50.4 120 C50.8 130 49.2 138 49.4 148 L70.4 148 C70.8 141 69.6 134 69.2 128 C68.8 121 71 114 71.4 106 C71.8 98 70.2 91.6 66.8 87.6 C65.4 86 64.4 85.2 63.4 84.6 C60.6 83.4 58 83.6 55.6 84.4Z', body, [1, 0.1, 0, 0.5], 0.3, 0.95)}
        ${part('M63.2 84.8 C65.4 89.4 67.2 93.6 70.6 98.6 C71 94.6 70 90.6 66.8 87.6 C65.6 86.2 64.4 85.3 63.2 84.8Z', cream, [1, 0, 0, 1], 0.1, 0.6)}
        ${line('M63.2 84.8 C65.6 90 67.6 94.4 70.8 99.4 C70.4 106 68.4 113 68 121 C67.8 129 68.8 138 69 147', lilac[0], 1.1, 0.95)}
        ${part('M54.6 85.4 C57.4 82.4 62.6 82.4 64.6 85 C62.6 87.8 57.4 88.4 54.6 85.4Z', lilac, [0.5, 0, 0.5, 1], 0.1, 0.6)}`;
      /* head: drawn upright and facing right around (60,60); silver low bun, soft wave at the front */
      const H0 = `
        ${s.ball(49.4, 67.6, 5.7, hair, 0.55)}
        ${line('M47.6 63.8 C49 65.2 50.2 67.6 50.6 71.4', hair[2], 0.7, 0.7)}
        ${part('M59.5 49 C65.5 49 69.6 53.2 69.8 59.4 C69.9 63.6 68.6 67.6 65.8 70 C63.4 72 59.2 72.2 56.2 70.4 C52.6 68.2 50.6 64.2 50.6 59.6 C50.6 53.6 54.4 49 59.5 49Z', skinL, [1, 0, 0, 0.9], 0, 0.35)}
        <ellipse cx="58.4" cy="63.6" rx="1.6" ry="2.5" fill="${skin[2]}" opacity=".45"/>
        ${part('M70.8 60.4 C73.4 57.2 73.2 52 69.8 49 C66.6 45.8 59.8 44.6 54.6 46.6 C49.4 48.8 47.6 54.2 48.2 59.8 C48.8 64.4 50.6 67.6 53.4 69.6 C54.2 66.8 55.2 63.8 56.8 61.6 C57.8 60.2 59.6 59.4 61.4 59.6 C63.8 59.8 65.6 58.4 66.8 56.6 C68.4 57.6 69.8 58.8 70.8 60.4Z', hair, [0.8, 0, 0.2, 1], 0.2, 0.95)}
        ${line('M70.2 52.8 C64.4 48.4 56.4 48.6 51.4 55.4', hair[2], 0.6, 0.5)}
        ${line('M68.4 56.2 C63 53.2 57 54.6 54 60', hair[2], 0.6, 0.45)}
        ${line('M71.2 59 C72.4 56 71.8 52.6 69 50.2', '#ffffff', 0.7, 0.75)}
        <ellipse cx="60.4" cy="47.6" rx="6.4" ry="1.9" transform="rotate(-8 60.4 47.6)" fill="${s.rad([[0, '#fff', 0.95], [1, '#fff', 0]])}"/>`;

      /* near leg: thigh over the rim, shin hanging, a little ankle showing */
      const kneeN = [209, 168], ankleN = [214, 206];
      const nearLeg =
        part(limb([hipN, kneeN, ankleN], [15, 10.6, 7.2]), cream, [0.5, 0, 0.5, 1], 0.1, 0.85) +
        line(`M${F(add(hipN, [12, -4]))} C186 162 194 163 202 163`, cream[2], 0.9, 0.5) +
        line(`M${F(add(kneeN, [5, 8]))} C${F(add(kneeN, [5.4, 16]))} ${F(add(kneeN, [5.6, 24]))} ${F(add(kneeN, [5.8, 30]))}`, cream[0], 1, 0.7) +
        `<path d="M${F(add(ankleN, [-3.4, -1]))} L${F(add(ankleN, [3.4, -1]))} L${F(add(ankleN, [3.2, 4]))} L${F(add(ankleN, [-3, 4]))}Z" fill="${skin[1]}"/>` +
        shoe([209, 210], [227, 216], 7.8);

      /* the moon is up behind her: a thin warm rim along the top edges */
      const rimOn = (a, b, wa, wb) => {
        const d = dir(a, b), n = nrm(d);
        return line(`M${F(add(add(a, n, -wa / 2 + 0.6), d, 4))} L${F(add(add(b, n, -wb / 2 + 0.6), d, -2))}`, '#fff1df', 1, 0.75);
      };
      const rims = rimOn(hipF, kneeF, 14.5, 10) + rimOn(hipN, kneeN, 15, 10.6);

      /* near arm: elbow down at her side, forearm up to the book; the lit sleeve casts a shade on the body */
      const elbow = [143, 153], wrist = [155, 130];
      const sleeve = limb([shoulder, elbow, wrist], [9.4, 8.2, 7.4], [1, 0.4]);
      const mitten = (cx, cy, a, k = 1) =>
        part(`M${cx} ${cy - 5.6 * k} C${cx + 3.4 * k} ${cy - 5.6 * k} ${cx + 4.2 * k} ${cy - 1 * k} ${cx + 3.8 * k} ${cy + 2 * k} C${cx + 3.4 * k} ${cy + 5 * k} ${cx + 1.4 * k} ${cy + 6 * k} ${cx - 0.6 * k} ${cy + 6 * k} C${cx - 3.2 * k} ${cy + 6 * k} ${cx - 4 * k} ${cy + 2.6 * k} ${cx - 3.8 * k} ${cy - 0.6 * k} C${cx - 3.6 * k} ${cy - 3.6 * k} ${cx - 2.6 * k} ${cy - 5.6 * k} ${cx} ${cy - 5.6 * k}Z" transform="rotate(${a} ${cx} ${cy})`, skinL, [1, 0, 0, 1], 0, 0.4);
      const nearArm =
        part(sleeve, ['#fbf8ff', '#ddd2fa', lilac[1]], [0.8, 0, 0.2, 1], 0, 0.55) +
        line(`M${F(add(wrist, [-3.6, 2.6]))} L${F(add(wrist, [3.4, 3.6]))}`, lilac[2], 1, 0.6) +
        mitten(156.6, 123.6, 18) +
        `<ellipse cx="159.6" cy="119.4" rx="1.5" ry="3" transform="rotate(28 159.6 119.4)" fill="${skin[0]}"/>`;
      const farArm =
        part(limb([[168, 150], [175.6, 128]], [7.2, 6.6]), body, [1, 0, 0, 1], 0.4, 0.95) +
        mitten(177.4, 123.4, -8, 0.95);

      /* the book: an open paperback, tented towards her face */
      const theBook =
        `<path d="M164 98.2 L150.6 103.4 L151.2 105.6 L164 101Z" fill="${cream[0]}"/>` +
        `<path d="M164 98.2 L177.2 101.6 L176.8 103.8 L164 101Z" fill="${cream[1]}"/>` +
        part('M163.6 100 L150.4 105.4 L152.4 126.6 L165.6 122Z', cover, [0, 0, 1, 1], 0.1, 0.8) +
        part('M163.6 100 L176.8 103.4 L177.8 124.4 L165.6 122Z', cover, [0, 0, 1, 1], 0.2, 0.9) +
        line('M163.7 100.4 L165.5 121.8', cover[2], 1, 0.8);

      const trunk = ['#5d8573', '#2f5244', '#163126'];
      const crown = ['#a9cdb9', '#4f8a72', '#21443a'], side = ['#7fae96', '#386b56', '#173a2e'];
      const clip = s.id + 'mh';
      return s.svg(
        `${s.sky(['#a9ace4', '#d4bde0', '#f6cfcc', '#fcdcc4'])}
         ${stars([[118, 22, 1.2], [148, 44, 0.9], [244, 18, 1.1], [266, 42, 0.8], [210, 30, 0.7], [104, 58, 0.8]])}
         ${s.glow(206, 80, 110, '#ffe7cf', 0.85)}
         ${s.ball(206, 80, 44, T.moon, 0.55)}
         ${s.hill('M0 84 C46 78 100 84 150 96 S240 104 290 96 S340 88 360 90 V240 H0Z', [['#cfe1d6', '#a9cbb8'], ['#6f9c88', 0, 0.8]])}
         ${s.hill('M0 98 C30 90 70 88 104 98 S156 126 214 130 S320 116 360 120 V240 H0Z', [['#86b6a2', '#68998a', '#538574'], ['#2b5247', 0.05, 0.9]])}
         ${s.hill('M0 200 C80 188 180 194 250 198 S330 190 360 194 V240 H0Z', [['#5f9483', '#477b6a', '#2f5e50'], ['#163a30', 0.1, 0.95]])}
         ${soft(184, 226, 96, 7, '#173a2e', 0.55)}
         ${soft(28, 238, 30, 5, '#173a2e', 0.6)}${soft(334, 238, 30, 5, '#173a2e', 0.6)}
         ${part('M13 244 C17 210 22 172 23.6 132 C24.6 106 24.4 86 23.4 66 L35.4 66 C35.8 86 35.6 106 34.8 132 C33.8 172 37 210 43 244Z', trunk, [1, 0, 0, 0], 0.1, 0.9)}
         ${line('M34.6 98 C40 92 46 88 54 84', trunk[1], 4)}
         ${part('M317 244 C323 210 326 172 326 132 C326 106 325.6 86 325 66 L337 66 C337.6 86 337.6 106 337.4 132 C337.4 172 341 210 347 244Z', trunk, [0, 0, 1, 0], 0.1, 0.9)}
         ${line('M326 94 C320 88 314 84 306 82', trunk[1], 4)}
         ${s.ball(14, 30, 60, crown, 0.4)}
         ${s.ball(70, 56, 30, side, 0.35)}
         ${s.ball(350, 26, 62, crown, 0.4)}
         ${s.ball(296, 52, 30, side, 0.35)}
         ${line(`M30 110 L${F(HL)}`, '#f6e3cc', 1.6)}${line(`M331 106 L${F(HR)}`, '#f6e3cc', 1.6)}
         <rect x="21.6" y="107.6" width="14.6" height="4.4" rx="2.2" fill="#f0d8bd"/><rect x="324.2" y="103.6" width="14.6" height="4.4" rx="2.2" fill="#f0d8bd"/>
         ${s.form('path', `d="${farEdge} Q${F(RIM)} ${F(HL)}Z"`, s.lin(['#f0a27a', '#cf6a46', '#a8452c']), ['#7a2a18', 0.2, 0.9])}
         ${farLeg}
    ${s.form('path', `d="${rimD} Q190 268 ${F(HL)}Z"`, s.lin(['#ffd3b0', '#f8aa6c', '#e0663a']), ['#b8472a', 0.1, 0.9])}
         ${line('M84 140 Q190 242 284 136', '#fff3e6', 1.2, 0.5)}${line('M92 148 Q190 252 276 144', '#fff3e6', 1.2, 0.4)}
         ${line(rimD, '#ffe2c4', 1.6, 0.9)}
         ${nearLeg}${rims}
         ${farArm}
         <clipPath id="${clip}"><path d="M0 0 H360 V${HR[1]} L${F(HR)} Q${F(RIM)} ${F(HL)} L0 ${HL[1]}Z"/></clipPath>
         <g clip-path="url(#${clip})"><g transform="${torso.tf}">${T0}</g></g>
         <g transform="${head.tf}">${H0}</g>
         ${theBook}${nearArm}`
      );
    };
  }

  {
    /* Top Barriers — a boulder blocks the path, and the path carries on behind it, climbing to the sun.
       Calum stands close at the rock, seen 3/4 from behind, one hand on the stone, looking up at the way on. */
    scenes.barrier = function (s) {
      const LIT = [1, 0, 0, 1]; /* sun up on the right: light from the top right, shade pools bottom left */
      const part = (d, ramp, dir = LIT, from = 0.15) => s.part(d, ramp, dir, from);
      const line = (d, c, w = 1, o = 1) =>
        `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${o < 1 ? ` opacity="${o}"` : ''}/>`;
      const gloss = (cx, cy, rx, ry, a, o = 0.7) =>
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${cx} ${cy})" fill="${s.rad([[0, '#fff', o], [1, '#fff', 0]])}"/>`;
      const shadow = (cx, cy, rx, ry, a = 0.55, c = '#1d4f3a') =>
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${s.rad([[0, c, a], [1, c, 0]])}"/>`;
      const RIM = '#fff4d6';
      const skin = P.skin.s1;
      const au = P.hair.auburn;
      const knit = P.cloth.coral;
      const chino = P.cloth.cream;
      const boot = ['#b8825a', '#7b4a2c', '#3e2012'];
      const sole = ['#5a3420', '#3e2012', '#1e0e06'];

      /* ---- the land: the path comes in under his feet, stops at the rock, and climbs on beyond it ---- */
      const land =
        `${s.sky(['#e2f2ec', '#f4f6e8', '#fdf0e2'])}
         ${s.sun(292, 52, 18)}
         ${s.hill('M0 126 C60 112 130 118 190 124 S272 96 318 88 S350 90 360 94 V240 H0Z', H.far)}
         ${s.path('M307 152 C301 141 304 131 312 122', 6)}
         ${s.path('M312 122 C318 114 321 104 320 93', 4)}
         ${s.tree(338, 104, 0.3)}
         ${s.hill('M0 160 C80 144 160 154 222 160 S320 146 360 150 V240 H0Z', H.mid)}
         ${s.path('M282 202 C298 192 322 184 322 172', 12)}
         ${s.path('M322 172 C322 162 312 155 307 149', 8.5)}
         ${s.tree(34, 172, 0.72)}
         ${s.hill('M0 196 C80 186 160 192 220 200 S320 198 360 192 V240 H0Z', H.near)}
         ${s.form('path', 'd="M64 240 C96 226 150 214 204 207 L240 207 C214 214 184 226 168 240Z"', s.lin(['#f3e4cc', '#fff8ec']), ['#d6b98c', 0, 0.5, [0, 1, 0, 0]])}`;

      /* ---- the boulder: a granite block against the light. Its top plane catches the sun, its right side is lit,
         the face turned to us sits in stippled shade. ---- */
      const rock =
        shadow(214, 210, 82, 7.5, 0.6) +
        s.form('path', 'd="M146 209 C140 186 142 160 150 140 C156 124 164 112 178 106 C196 98 222 95 244 97 C262 99 276 108 282 124 C288 142 290 178 286 209Z"', s.lin(['#d3ded9', '#9db1ab', '#5f7a74'], 1, 0, 0, 1), ['#2a4440', 0.05, 0.8, LIT]) +
        s.form('path', 'd="M240 119.6 C254 117.4 268 117.6 280.6 120.6 C287 138 290 176 286 209 L252 209 C251 182 248 146 240 119.6Z"', s.lin(['#f2f6f3', '#c4d2cd', '#93a9a3'], 1, 0, 0, 1), ['#3f5a55', 0, 0.55, LIT]) +
        s.form('path', 'd="M156 128 C160 118 168 110 178 106 C196 98 222 95.4 244 97.2 C261 98.8 274 106.6 280.6 120.6 C268 117.6 254 117.4 240 119.6 C226 121.6 214 125.6 200 126.4 C188 127 180 125.6 172 127.6 C165 129.2 159 129.4 156 128Z"', s.lin(['#f9f6ea', '#d9e2dd', '#b9c9c3'], 1, 0, 0, 1), ['#6f8a84', 0.05, 0.6, LIT]) +
        line('M172 127.6 C180 125.6 188 127 200 126.4 C214 125.6 226 121.6 240 119.6', '#fff8e6', 1.1, 0.45) +
        line('M240 119.6 C248 146 251 182 252 209', '#fff', 1.1, 0.35) +
        line('M234 100 C248 100 262 105 270 112', '#fff', 2.4, 0.65) +
        line('M198 132 C202 146 197 162 203 184', '#3f5a55', 1.1, 0.4) +
        line('M203 184 C210 189 218 191 228 191', '#3f5a55', 0.9, 0.3) +
        line('M154 209 l-3 -7 M158 209 l1 -8 M162 209 l4 -6 M262 209 l-2 -7 M267 209 l2 -8 M272 209 l4 -5', '#3a8662', 1.4, 0.9) +
        s.form('ellipse', 'cx="294" cy="207" rx="12" ry="6.5"', s.rad([[0, '#e3ebe6'], [0.6, '#9fb3ad'], [1, '#55706b']], 0.6, 0.3, 0.8), ['#23383a', 0.1, 0.85, LIT]);

      /* ---- Calum ---- */
      const legs =
        part('M93.4 131 C93 148 95 166 97.4 182 C99 194 100 204 100.6 214 L113 214 C112.4 204 112.2 194 112.6 182 C113 168 114.6 154 116.6 143.6 C118.6 154 121.4 168 124.4 182 C126.4 192 128.4 202 129.8 211.4 L143.2 210.4 C142.6 200 141.4 190 140.6 180 C139.6 164 139.2 146 138.8 131Z', chino) +
        line('M99.6 137.4 L111.8 137 L111.2 146.2 C108.2 148 103.2 148.2 100.2 146.6Z', chino[2], 0.7, 0.55) +
        line('M121.8 137 L134.6 137.4 L133.8 146.6 C130.8 148.2 125.8 148 122.6 146.2Z', chino[2], 0.7, 0.55) +
        line('M106 150 C106 165 106.4 180 106.8 196', chino[2], 0.7, 0.3) +
        line('M131 152 C131.8 168 133.2 186 135.8 204', chino[2], 0.7, 0.3) +
        line('M100 182 C103 184.4 107.6 184.6 111.6 182.6', chino[2], 0.9, 0.8) +
        line('M126 182 C129.4 184.4 134 184.4 139.4 182', chino[2], 0.9, 0.8) +
        line('M101 207 C104.6 209 109 209 112.6 207.4', chino[2], 0.9, 0.7) +
        line('M130 204.6 C133.6 206.6 138 206.6 142.4 204.6', chino[2], 0.9, 0.7);
      const boots =
        part('M100.4 211 C100 216 99.8 220.4 100.2 224 L116 224 C118.6 224 120.4 223 120.4 221.2 C119.4 219 117.2 217.8 115.4 216.2 C114.4 215 113.6 213 113.4 211Z', boot) +
        part('M99.8 223 L120.6 221 C121.2 223 120.6 225 118.6 225.6 C112 226.6 104 226.6 100 225.8Z', sole) +
        part('M129.6 208.4 C129.4 213 129.2 217 129.6 220.6 L145.6 220.6 C148.2 220.6 150 219.6 150 217.8 C149 215.6 146.8 214.4 145 212.8 C144 211.6 143.4 209.6 143.2 208Z', boot) +
        part('M129.4 219.6 L150.2 217.6 C150.8 219.6 150.2 221.6 148.2 222.2 C141.6 223.2 133.6 223.2 129.6 222.4Z', sole);
      const farArm =
        part('M127 87.4 C132.4 87.6 137.6 89.4 140.6 93.6 C147 96.4 152 99.4 156 102.2 C159 104.4 161.6 106.4 163.8 108.4 L161.6 118.2 C155 115.8 147 111.8 140.6 108.8 C138.4 107.4 136.6 104 135.6 100.4Z', knit) +
        part('M160.8 106.2 L165.8 109.4 L162.2 119.2 L157.4 117Z', knit, LIT, 0.4) +
        shadow(174, 119.4, 10, 2.6, 0.5, '#23383a') +
        part('M163.8 108.8 C168.4 107.6 174.4 108.4 179 111.2 C181 112.6 180.6 115.6 178 116.8 C173 118.6 167 119.2 162.6 118.2Z', skin);
      const torso =
        part('M104.6 86.4 C110.4 88.6 118.6 88.6 124.6 86.2 C129.6 87.6 135 89.4 138.6 92.6 C140.8 96 140.8 104 139.4 112 C138.2 120 137.4 128 137.8 134 C126 137.4 105 137.4 94.6 134 C95.4 128 95.6 122 95 116 C94 109 92.6 102 91.6 98 C94 93.6 98.6 89.4 104.6 86.4Z', knit) +
        part('M95.2 129.6 C106 133 127 133 137.4 129.6 L137.8 134 C126 137.4 105 137.4 94.6 134Z', knit, LIT, 0.4) +
        [99, 102.4, 105.8, 109.2, 112.6, 116, 119.4, 122.8, 126.2, 129.6, 133].map((x) => line(`M${x} 131.6 v4`, knit[2], 0.55, 0.45)).join('') +
        part('M104.6 85.4 C110.4 87.8 118.6 87.8 124.4 85.4 L125.4 88.4 C118.6 91 110.4 91 103.8 88.4Z', knit, LIT, 0.45) +
        gloss(130, 99, 8, 4.4, -16, 0.28) +
        line('M124 100 C129 104 134 106 139.6 105.6', knit[2], 0.9, 0.6) +
        line('M116 96 C115.4 106 115.6 118 116.4 128', knit[2], 0.8, 0.3) +
        line('M100 104 C103 110 104 118 103.6 126', knit[2], 0.8, 0.3);
      const nearArm =
        part('M101 90.4 C95.4 90.4 90.4 93 88.2 98.6 C86.2 104 85 111 84.8 118.4 C84.8 122 85.6 125 86.6 128 C87.6 132 88.6 136.4 89.8 140.6 L97.4 140.6 C96.8 135.4 96 130.6 95.6 126 C95.2 122.4 95.4 119 96 116 C96.6 110 97.6 104 98.6 99.6 C99.4 96 100.2 93 101 90.4Z', knit) +
        line('M85.4 119.4 C87.6 121 90.8 121.4 94.2 120.4', knit[2], 0.8, 0.5) + line('M86.8 126.4 C88.6 125 90.8 124.6 93 125', knit[2], 0.7, 0.35) +
        line('M88.6 104 C90.6 101.6 93.4 100.6 96.4 100.8', knit[0], 0.7, 0.35) +
        line('M98.6 100 C97.4 106 96.4 112 95.8 117 C95.4 121 95.4 124.6 95.8 128 C96.2 132 96.8 136 97.2 139', knit[2], 0.9, 0.55) +
        part('M88.8 137.6 L97 137.6 L97.8 142.8 L90 142.8Z', knit, LIT, 0.4) +
        part('M90.6 142 C90 146 90.6 150.6 92.8 153.2 C94.8 154.8 97 152.6 97.6 148.8 C98 146 98 143.6 97.6 142Z', skin);
      const neck = part('M109.6 70 C109.8 76 109.6 81 108.2 86.8 L122.8 86.8 C122.2 82.6 121.4 78.4 121.2 74 C117.4 74.2 113.6 72.8 111.4 70.6Z', skin, LIT, 0.3);
      /* the head in lost profile: hair towards us, the ear, a sliver of cheek and beard on the right; tipped back to look up */
      const head =
        `<g transform="translate(0 2) rotate(-17 114 73)">` +
        part('M108 70 C112 73 117.6 74.6 121 74.6 C124.4 74.6 127 72.6 127.6 70 C127.4 67.6 126.6 64.4 125.6 60.6 C124 59.6 122 60.8 121 63Z', skin) +
        part('M123.4 65.2 C124.8 66 126 66.2 127 65.8 C127.6 67.4 128 69 127.8 70.4 C127.2 73.2 124.4 75.2 120.8 75.2 C119.2 75.2 118 74.4 117.8 73.4 C120 72.6 122 70.2 123.4 65.2Z', au, LIT, 0.2) +
        part('M106.4 72.6 C103.4 70 102.2 65 102.6 60.4 C103.2 54 108 50 114.4 50 C120.4 50 124.6 53.6 125.4 58.6 C124.2 59.4 123.6 60.6 123.4 62 C123.2 63.4 123.2 64.8 123.4 66 L121.6 66.4 C120.8 68.6 119.4 70.4 117.4 71.6 C114 73.2 109.8 73.6 106.4 72.6Z', au) +
        part('M103.8 58.4 C103.4 53.6 106.6 49.8 111 49.6 C113.6 49.6 115.4 51 116 53Z', au) +
        part('M110.4 51.8 C111.6 48 115.4 46.4 119.2 47.2 C122.4 48 124.2 50.4 124.2 53.2Z', au) +
        part('M119.4 50.8 C122.6 49.2 126.2 50.4 127.2 53.6 C127.6 55 127.2 56.6 126 57.6 C125.6 55.4 123.8 53.6 121.4 53.2Z', au) +
        part('M120.4 61.4 C119.4 62 119 64.6 119.6 66.8 C120.2 68.4 122.2 68.6 123 67.4 C123.6 65.8 123.4 62.6 121.8 61.6Z', skin, LIT, 0.3) +
        gloss(118, 54.2, 4.8, 2, -20, 0.6) +
        line('M106.8 58.4 C109.8 55.4 113.6 54.2 117.6 54.6', au[0], 0.6, 0.5) +
        line('M104.6 64.2 C106.2 60.8 108.8 58.8 111.8 58.2', au[0], 0.55, 0.4) +
        line('M123.8 54.6 C124.6 55.8 125.2 57 125.4 58.4', RIM, 0.8, 0.6) +
        line('M127.2 66.4 C127.8 67.8 128 69 127.9 70.4', RIM, 0.8, 0.7) +
        `</g>`;
      const rim =
        line('M126 86.6 C131.6 87.6 136.6 89.6 140.2 93.4 C147 96.4 152 99.4 156 102.2 C159 104.4 161.6 106.4 163.8 108.4', RIM, 1, 0.85) +
        line('M140.2 100 C140.4 108 139.4 114 138.4 118', RIM, 0.9, 0.7) +
        line('M121.4 76 C121.8 80 122.4 83.4 123.4 86.4', RIM, 0.7, 0.6) +
        line('M139.4 146 C139.8 160 140.2 172 140.6 180 C141.4 190 142.4 200 143 208', RIM, 0.9, 0.6);
      const calum = shadow(123, 224, 32, 4.5) + legs + boots + farArm + torso + nearArm + neck + head + rim;

      return s.svg(`${land}${rock}${calum}`);
    };
  }

  {
    /* The Resilience Dynamic — band after band of hills, light to deep, under a low sun.
       Lena stands on the nearest band, seen 3/4 from behind, hands clasped behind her back,
       looking across every band towards the sun; the sun rims her right side in warm light. */
    scenes.dynamic = function (s) {
      /* Lena is drawn in local units: origin between her feet on the ground, y up is negative. */
      const ox = 116;
      const oy = 233;
      const k = 1.28;
      const X = (x) => +(ox + x * k).toFixed(2);
      const Y = (y) => +(oy + y * k).toFixed(2);
      const L = (d) => {
        let i = 0;
        return d.replace(/-?\d*\.?\d+/g, (n) => (i++ % 2 ? Y(+n) : X(+n)));
      };
      /* gradient lit from the right (the sun), stippled shade growing towards the side that faces us */
      const RIGHT = [1, 0, 0, 0.25];
      const part = (d, ramp, from = 0, to = 0.55, dir = RIGHT, shade = ramp[2]) =>
        s.form('path', `d="${L(d)}"`, s.lin(ramp, ...dir), [shade, from, to, dir]);
      const line = (d, c, w = 0.7, a = 1) =>
        `<path d="${L(d)}" fill="none" stroke="${c}" stroke-width="${w * k}" stroke-linecap="round" opacity="${a}"/>`;
      /* Rim light: the shape minus itself nudged away from the sun leaves a warm sliver on the sun side. */
      let rn = 0;
      const rim = (d, a = 0.95, dx = -0.85, dy = 0.2) => {
        const m = `${s.id}lr${rn++}`;
        const p = L(d);
        return `<mask id="${m}"><path d="${p}" fill="#fff"/><path d="${p}" fill="#000" transform="translate(${dx * k} ${dy * k})"/></mask><path d="${p}" fill="${s.lin(['#fff4dc', '#ffd391'])}" opacity="${a}" mask="url(#${m})"/>`;
      };
      /* a lit part: the part, then its rim */
      const lit = (d, ramp, from, to, a) => part(d, ramp, from, to) + rim(d, a);

      /* ---- shapes (local units). Weight on her right (near) leg, the far knee soft. ---- */
      const legL = 'M-13.6 -81 C-14.6 -66 -14.2 -54 -13.4 -44 C-13 -36 -14.6 -22 -16.4 -10.4 C-12.6 -8.8 -7.4 -8.6 -3.6 -9.8 C-3.2 -22 -2.8 -34 -2.4 -43 C-2 -56 -0.6 -68 0.4 -77.4 Z';
      const legR = 'M1.2 -77.4 C2.4 -56 3.8 -32 4.6 -5.4 C8.6 -3.8 14 -3.8 18.2 -5.4 C18 -30 17.4 -58 16.4 -84 Z';
      const ankleL = 'M-12.6 -10 L-8.2 -10 L-8.4 -5.6 L-12.4 -5.6 Z';
      const ankleR = 'M8.4 -6 L13 -6 L12.8 -3 L8.6 -3 Z';
      const shoeL = 'M-13.4 -3.4 C-13.8 -6.2 -11.4 -7.4 -8.4 -7.2 C-4.8 -7.2 -1.4 -7.8 1 -7 C2.8 -6.2 2.6 -4.2 0.8 -3.6 L-12.2 -2.4 C-13 -2.6 -13.4 -2.9 -13.4 -3.4 Z';
      const shoeR = 'M4.2 0.4 C3.8 -2.8 6.4 -4.8 10 -4.8 C14 -4.8 18 -5.2 20.8 -3.8 C22.6 -2.8 22.4 -0.4 20.4 0.2 L5.6 1.4 C4.8 1.4 4.3 1 4.2 0.4 Z';
      const torso =
        'M-3.6 -129.6 C-7.6 -128.6 -11.6 -126.6 -14 -123.6 C-16 -121.4 -16.6 -117 -16 -112 C-15.2 -106 -13.4 -101 -12.8 -95 ' +
        'C-12.2 -89 -14.8 -80 -16.4 -68 C-8 -66.4 6.6 -67.6 17.6 -70.4 C16.4 -79 14.8 -88 14.4 -95 ' +
        'C14 -100.6 15.4 -106 16.6 -111.6 C17.6 -116.4 17.6 -119.6 15.6 -122 C13.2 -125 9.6 -127.6 6.6 -128.8 C3 -130 -0.2 -130.4 -3.6 -129.6 Z';
      /* the side of her body turned to the sun */
      const side =
        'M15.6 -122 C17.6 -119.6 17.6 -116.4 16.6 -111.6 C15.4 -106 14 -100.6 14.4 -95 C14.8 -88 16.4 -79 17.6 -70.4 ' +
        'L11.4 -68.8 C10.6 -78 9.4 -87 9.4 -95 C9.4 -101 10.8 -107 11.4 -113 C11.8 -117 12 -120.4 11.2 -124.6 Z';
      const hem = 'M-16 -71 C-8 -69.4 6.6 -70.6 17.3 -73.2 L17.6 -70.4 C6.6 -67.6 -8 -66.4 -16.4 -68 Z';
      const collar = 'M-4 -129.4 C-0.2 -130.8 3.4 -130.8 6.8 -129 L6.2 -126.8 C3.2 -128 -0.2 -128 -3.4 -127 Z';
      const topNeck = 'M-3.6 -131.4 C-0.2 -132.6 3.2 -132.6 6.4 -131.2 L6.8 -129 C3.4 -130.8 -0.2 -130.8 -4 -129.4 Z';
      const armL =
        'M-9.6 -127.4 C-14 -127.6 -17.2 -125.4 -18.4 -121.2 C-19.6 -116 -21.6 -108 -23.6 -101.6 ' +
        'C-24.6 -98.4 -23.8 -95 -21 -93.8 C-16.6 -91.4 -11.4 -88.2 -7.2 -85.5 L-4.8 -88.9 ' +
        'C-8.8 -91 -13.6 -93.6 -17 -96.2 C-16.4 -101.6 -15.4 -107.4 -14.6 -112 Z';
      const armR =
        'M10.8 -127.4 C15.6 -127.6 19 -125.4 20.2 -121 C21.4 -115.8 23.4 -108 25.6 -101.6 ' +
        'C26.6 -98.2 25.6 -94.8 22.6 -93.6 C18 -91.4 12.6 -88.2 8.4 -85.4 L6 -89 ' +
        'C10.4 -91 15.2 -93.8 18.8 -96.4 C18.2 -101.8 17 -107.6 16.2 -112.6 Z';
      const cuffL = 'M-9.4 -87 L-7.2 -85.5 L-4.8 -88.9 L-7 -90.4 Z';
      const cuffR = 'M10.6 -86.9 L8.4 -85.4 L6 -89 L8.2 -90.5 Z';
      const handL = 'M-4.8 -88.9 C-2.6 -89.8 0.4 -89.2 1.2 -87.4 C1.8 -85.6 -0.6 -84.2 -3.6 -84.4 C-5.4 -84.5 -6.6 -84.9 -7.2 -85.5 Z';
      const handR = 'M6 -89 C3.6 -89.8 0.2 -89.2 -0.8 -87.4 C-1.6 -85.6 0.6 -83.8 3.8 -84 C5.8 -84.1 7.6 -84.6 8.4 -85.4 Z';
      const neck = 'M-1.4 -141 C-1.2 -136 -1.8 -132.6 -3 -129.8 L6.2 -129.8 C5.2 -132.6 4.8 -136 5.4 -142 Z';
      const face = 'M4 -157 C10 -157 12.6 -152 12.4 -146 C12.2 -141 10.6 -137.4 7.6 -136 C4 -134.6 -1 -136 -3 -139 C-6 -143 -6 -157 4 -157 Z';
      const ear = 'M8.2 -146.6 C10.2 -147.2 11.2 -145.2 11 -143 C10.8 -141 9.6 -140 8.4 -140.6 Z';
      const hair =
        'M10.8 -150 C11.8 -155.8 7.8 -159.8 2.4 -159.8 C-3.8 -159.8 -8.2 -155 -8.4 -148.6 C-8.6 -143.6 -6.6 -139.6 -3.6 -137.6 ' +
        'C-0.6 -137.2 3.4 -138.4 5.8 -140.2 C7.4 -141.6 8 -144 8.4 -146.4 C9 -147.8 9.8 -149 10.8 -150 Z';
      /* the soft wave at the front: a lock that swells over the temple and tucks back */
      const wave =
        'M0.4 -160 C6.6 -161.4 11.8 -158.8 12.4 -154.4 C12.8 -151.6 11.2 -150.8 12.4 -148.6 ' +
        'C11 -147.6 9.4 -148 9.4 -149.6 C9.4 -151.4 10.6 -152.6 9.8 -155 C8.6 -157.8 5 -159.2 0.4 -160 Z';
      const bun = 'M-6.4 -146.4 C-2.6 -146.4 -0.6 -143.4 -1 -140.6 C-1.4 -137.2 -4.6 -135.4 -8 -136 C-11.2 -136.6 -12.6 -139.6 -11.8 -142.4 C-11 -145 -8.8 -146.4 -6.4 -146.4 Z';

      /* Ramps: the back faces us and sits in soft shade; the sun side is lit warm. */
      const lilac = ['#ddd3f8', '#cbbdef', '#ab9bdc'];
      const lilacSide = ['#fff6ea', '#f6eefd', '#e2d7f7'];
      const rib = ['#d4c8f3', '#bbabea', '#8f7cc9'];
      const cream = ['#fffdf7', '#f7efdf', '#dccaa8'];
      const tan = ['#f4cfa6', '#c48a5e', '#7d4b2c'];
      const skin = ['#ffeedf', '#f6d0b2', '#cf9672'];
      const silver = ['#ffffff', '#e6e7f0', '#a5a9c0'];
      const clip = s.id + 'lb';

      const lena = `
        ${s.form('ellipse', `cx="${X(3)}" cy="${Y(0.2)}" rx="${21 * k}" ry="${3.2 * k}"`, s.rad([[0, '#0b2a1d', 0.6], [1, '#0b2a1d', 0]]), null)}
        ${part(ankleL, skin, 0, 0.4)}
        ${part(shoeL, tan, 0.05, 0.5)}
        ${line('M-12.2 -2.8 L0.8 -4', '#fff4e2', 0.9, 0.9)}
        ${lit(legL, cream, 0, 0.4, 0.45)}
        ${line('M-8.4 -60 C-8 -48 -8 -40 -8.6 -32 C-9.2 -24 -9.8 -16 -10.2 -10.6', cream[2], 0.6, 0.55)}
        ${line('M-13.6 -45.2 C-11.4 -43.4 -8.6 -43.2 -6 -44.2', cream[2], 0.6, 0.55)}
        ${line('M-13 -42.2 C-11 -41.2 -9 -41.2 -7.4 -41.8', cream[2], 0.5, 0.4)}
        ${part(ankleR, skin, 0, 0.35)}
        ${lit(shoeR, tan, 0, 0.45, 0.7)}
        ${line('M5.6 1 L20.4 -0.2', '#fff4e2', 0.9, 0.95)}
        ${lit(legR, cream, 0, 0.3, 0.9)}
        ${line('M10.6 -64 C10.8 -46 11 -26 11.2 -5.4', cream[2], 0.6, 0.5)}
        ${lit(neck, skin, 0, 0.45, 0.7)}
        ${part(topNeck, cream, 0, 0.25)}
        ${part(torso, lilac, 0.05, 0.45)}
        ${lit(side, lilacSide, 0, 0.2, 0.9)}
        ${part(collar, rib, 0.05, 0.45)}
        ${part(hem, rib, 0.05, 0.45)}
        ${line('M1.6 -127 C1 -114 1 -102 1.4 -90', lilac[2], 0.55, 0.4)}
        ${line('M-11.6 -111 C-8.4 -104 -5.6 -97 -3.4 -91', lilac[2], 0.55, 0.45)}
        ${line('M13.4 -111 C10.6 -104 8 -97 5.6 -91', lilac[2], 0.55, 0.35)}
        ${line('M-2 -83.6 C-3 -79 -4 -74.6 -4.8 -70.2', lilac[2], 0.55, 0.45)}
        ${line('M3.4 -83.4 C4.6 -79 6 -75.4 7.6 -71.4', lilac[2], 0.55, 0.4)}
        <clipPath id="${clip}"><path d="${L(torso)}"/></clipPath>
        <g clip-path="url(#${clip})" opacity=".55">
          <path d="${L(armL)}" fill="${lilac[2]}" transform="translate(${0.6 * k} ${1.8 * k})"/>
          <path d="${L(armR)}" fill="${lilac[2]}" transform="translate(${-0.6 * k} ${1.8 * k})"/>
        </g>
        ${part(armL, lilac, 0.1, 0.5)}
        ${line('M-17.6 -97.4 C-19 -96 -20.4 -95.4 -21.6 -95.2', lilac[2], 0.55, 0.6)}
        ${lit(armR, lilac, 0, 0.42, 0.95)}
        ${line('M19.4 -97.6 C21 -96.4 22.4 -95.8 23.8 -95.6', lilac[2], 0.55, 0.6)}
        ${part(cuffL, rib, 0.15, 0.55)}
        ${part(cuffR, rib, 0.05, 0.45)}
        ${part(handL, skin, 0.05, 0.5)}
        ${part(handR, skin, 0, 0.4)}
        ${line('M-0.8 -87.4 C-1.4 -86 -0.4 -84.6 1.4 -84.2', skin[2], 0.5, 0.6)}
        ${lit(face, skin, 0, 0.4, 0.8)}
        ${part(ear, skin, 0, 0.35, [0, 0, 1, 0])}
        ${lit(hair, silver, 0.05, 0.55, 0.95)}
        ${part(bun, silver, 0.1, 0.6)}
        ${lit(wave, silver, 0, 0.3, 0.95)}
        ${line('M9.4 -155.8 C4.4 -156.8 -0.6 -153.8 -3 -147.6 C-3.6 -146 -4 -145 -4.6 -144.2', '#ffffff', 0.65, 0.8)}
        ${line('M8.6 -150.6 C5.4 -150.2 2.6 -148 1 -144.6', silver[2], 0.5, 0.55)}
        ${line('M4.4 -158.2 C8.6 -157.4 11 -155.4 11.2 -152.8', silver[2], 0.5, 0.6)}
        ${line('M-3 -143.8 C-6 -144.6 -9 -142.6 -8.6 -139.6 C-8.2 -137.6 -5.4 -137.6 -4.6 -139.6', silver[2], 0.6, 0.75)}
        <ellipse cx="${X(5.6)}" cy="${Y(-156)}" rx="${4.2 * k}" ry="${1.9 * k}" transform="rotate(-24 ${X(5.6)} ${Y(-156)})" fill="${s.rad([[0, '#fff', 0.9], [1, '#fff', 0]])}"/>
        <ellipse cx="${X(-4.6)}" cy="${Y(-143.6)}" rx="${2.4 * k}" ry="${1.2 * k}" transform="rotate(-20 ${X(-4.6)} ${Y(-143.6)})" fill="${s.rad([[0, '#fff', 0.8], [1, '#fff', 0]])}"/>
      `;

      const bands = [
        ['M0 120 C50 104 110 108 160 118 S280 106 360 112 V240 H0Z', ['#e6f4e6', '#d3eedb'], ['#9fd3b1', 0, 0.6]],
        ['M0 138 C70 126 120 140 190 134 S300 122 360 132 V240 H0Z', ['#c4e8cf', '#addfbf'], ['#7cc49b', 0, 0.7]],
        ['M0 156 C60 146 130 150 180 158 S290 142 360 150 V240 H0Z', ['#9fd8b4', '#7fc79e'], [T.mint[2], 0, 0.75]],
        ['M0 176 C80 160 140 172 210 174 S320 162 360 170 V240 H0Z', ['#79c299', '#56a87d'], ['#2c7354', 0, 0.8]],
        ['M0 198 C60 186 140 192 200 198 S310 184 360 192 V240 H0Z', ['#55a57c', '#3a8662'], [T.forest[2], 0.05, 0.85]],
        ['M0 220 C80 208 160 214 230 220 S330 206 360 212 V240 H0Z', ['#3c8763', '#24603f'], ['#0f3324', 0.1, 0.9]],
      ];
      const hills = bands.map(([d, ramp, shade]) => s.hill(d, [ramp, shade]));

      return s.svg(
        `${s.sky(['#fde0cb', '#f9eddf', '#e7f3e9'])}
         ${s.sun(246, 98, 22)}
         ${hills.slice(0, 3).join('')}
         ${s.glow(246, 112, 130, '#fff1cf', 0.4)}
         ${hills.slice(3).join('')}
         ${lena}`
      );
    };
  }

  RD.art = function (kind) {
    if (!scenes[kind]) kind = 'river';
    return scenes[kind](scene(...(SIZE[kind] || [])));
  };
  RD.ART_KINDS = Object.keys(scenes);
  RD.ART_SIZE = SIZE;
})();
