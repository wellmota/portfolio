/* GolfHub — procedural 3D golf hole (the Figma's raster hole map, rebuilt as a live diorama).
   three.js r169 (vendored), no models and no image files: terrain, fairway with mowing stripes, green, pin and
   flag, tee boxes, bunkers, creek or pond, cart path, instanced trees and the clubhouse are generated in code from
   GH.holes[n].shape and seeded per hole, so every hole is stable and different. The island floats on the white
   app background and feathers into it (alpha map), like the Figma render.

   API (ES module; also window.GHHole3D.mount):
     import { mount } from './assets/hole3d.js';
     const view = mount(container, {
       hole: 2 | { n, par, m, idx, shape, clubhouse? },  // number → GH.hole(n) (Campo A)
       course: 'a' | 'b',                                // seed + clubhouse placement
       tee: 'branco',                                    // tee marker colour, length factor
       ball: { carried: 220, toPin: 125 } | null,        // null → no player (preview / tour)
       mode: 'round' | 'preview' | 'tour',               // tour = slower fly-ins
       insets: { top, right, bottom, left } | () => ({…}),  // CSS px kept clear for the UI; the hole is framed inside
       avatar: 'assets/img/av/pedro.webp',
       intro: true,                                      // aerial glide on load (skipped under reduced motion)
       onInteract: () => {},                             // user dragged / pinched / tapped (tour pauses on it)
       onAim: ({ toAim, aimToPin }) => {},               // tap/drag on the hole moves the aim point (metres)
       fallback: false,                                  // force the Figma raster (QA)
     });
     view.setHole(n | hole, { ball, tee, course, instant }) → Promise   // spline fly-through to the new hole
     view.setBall(ball | null)       // replays the ball-flight tracer
     view.reset()                    // camera + aim back to the framed view (also: double-tap)
     view.refit()                    // re-read insets after a layout change
     view.destroy()
     view.webgl                      // false when it fell back to assets/figma/perf-holemap.png
   Gestures: drag = orbit (clamped, with inertia) · pinch / wheel = zoom (clamped) · tap = aim · drag the aim ring
   = live aim · double-tap = reset. prefers-reduced-motion: no intro, no fly-through, no sway, static frames.
   The render loop stops when the tab is hidden or the canvas is off-screen, and idles at ~30 fps. */
import * as THREE from './vendor/three.module.min.js';

/* ---------- small math ---------- */
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeIn = (t) => t * t * t;
const easeBack = (t) => {
  const c1 = 1.9,
    c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
function mulberry(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hash2(x, z, s) {
  let h = (Math.imul(x | 0, 374761393) + Math.imul(z | 0, 668265263) + Math.imul(s | 0, 1442695041)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
/* value noise, −1…1 */
function noise(x, z, s) {
  const ix = Math.floor(x),
    iz = Math.floor(z),
    fx = x - ix,
    fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx),
    uz = fz * fz * (3 - 2 * fz);
  const a = hash2(ix, iz, s),
    b = hash2(ix + 1, iz, s),
    c = hash2(ix, iz + 1, s),
    d = hash2(ix + 1, iz + 1, s);
  return (a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz) * 2 - 1;
}
function fbm(x, z, s, oct = 3) {
  let sum = 0,
    amp = 0.5,
    f = 1,
    n = 0;
  for (let i = 0; i < oct; i++) {
    sum += amp * noise(x * f, z * f, s + i * 31);
    n += amp;
    amp *= 0.5;
    f *= 2.03;
  }
  return sum / n;
}
const fmtM = (v) => (window.GH && GH.fmt ? GH.fmt.m(v) : `${Math.round(v)} m`);
const mkCanvas = (w, h) => {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  return c;
};

/* light from the upper left, slightly in front of the camera: lit tree faces toward the viewer, shadows to the right */
const SUN = new THREE.Vector3(-0.62, 1.15, 0.32).normalize();
const SHADOW_DIR = { x: -SUN.x / Math.hypot(SUN.x, SUN.z), z: -SUN.z / Math.hypot(SUN.x, SUN.z) };

/* palette (sRGB). Figma: lush, bright greens; sand #e9dcb5; flag #10B853 → #1A4E26 */
const PAL = {
  rough: '#4b9a3a',
  roughDark: '#3a8231',
  roughLight: '#62ad45',
  deep: '#2f6f2b',
  cut: '#5fae43',
  fairway: '#7acb55',
  fringe: '#6fc24c',
  green: '#93de67',
  greenLight: '#a9e97e',
  sand: '#efe3bf',
  sandEdge: '#d8c690',
  lip: '#4f8e37',
  bank: '#3b6a32',
  bed: '#2c7186',
  path: '#a7acb1',
  pathEdge: '#e3e5e6',
  patio: '#e9e4d8',
  broad: ['#3f8f3a', '#4c9b3d', '#57a443', '#367f35', '#6aaf48', '#2f7433', '#7cb94f', '#468f3c'],
  conifer: ['#2c6b3c', '#24603a', '#327044', '#3c7b47', '#285e36'],
};

/* ======================================================================
   Hole layout: pure data in world units. Tee near +z (camera side), green at −z.
   ====================================================================== */
function layout(hole, course) {
  const sh = hole.shape || {};
  const par = hole.par || 4;
  const seed = (hole.n * 7919 + (course === 'b' ? 50021 : 0) + 17) >>> 0;
  const rnd = mulberry(seed);
  const R = (a, b) => a + (b - a) * rnd();
  const bend = clamp(sh.bend || 0, -1, 1);
  const inside = bend >= 0 ? 1 : -1;
  const wside = sh.water === 'left' ? -1 : sh.water === 'right' ? 1 : 0;
  const front = sh.water === 'front';

  /* centreline: straight to the landing zone, then the dogleg */
  const Ls = 54 + Math.max(0, hole.m - 150) * 0.1;
  const B = par === 3 ? Ls * 0.2 : Ls * 0.36;
  const N = 140,
    P = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    let g;
    if (par === 3) g = sstep(0, 1, t) * 0.4 + t * 0.6;
    else {
      const a = 0.38,
        b = 0.7;
      g = t < a ? 0 : t > b ? t - (a + b) / 2 : (t - a) ** 2 / (2 * (b - a));
      g /= 1 - (a + b) / 2;
    }
    P.push({ x: bend * B * g, z: Ls / 2 - t * Ls });
  }
  const mx = (P[0].x + P[N].x) / 2;
  P.forEach((p) => (p.x -= mx));
  const cum = [0];
  for (let i = 1; i <= N; i++) cum.push(cum[i - 1] + Math.hypot(P[i].x - P[i - 1].x, P[i].z - P[i - 1].z));
  const len = cum[N];
  const upm = len / hole.m;
  const segDir = (i) => {
    const a = P[i],
      b = P[i + 1],
      l = Math.hypot(b.x - a.x, b.z - a.z);
    return { tx: (b.x - a.x) / l, tz: (b.z - a.z) / l };
  };
  /* point + unit tangent + right-hand normal at arc length s (extrapolates past both ends) */
  function at(s) {
    let x, z, d;
    if (s <= 0) {
      d = segDir(0);
      x = P[0].x + d.tx * s;
      z = P[0].z + d.tz * s;
    } else if (s >= len) {
      d = segDir(N - 1);
      x = P[N].x + d.tx * (s - len);
      z = P[N].z + d.tz * (s - len);
    } else {
      let lo = 0,
        hi = N;
      while (hi - lo > 1) {
        const m = (lo + hi) >> 1;
        if (cum[m] <= s) lo = m;
        else hi = m;
      }
      const f = (s - cum[lo]) / (cum[lo + 1] - cum[lo]);
      d = segDir(lo);
      x = lerp(P[lo].x, P[lo + 1].x, f);
      z = lerp(P[lo].z, P[lo + 1].z, f);
    }
    return { x, z, tx: d.tx, tz: d.tz, nx: -d.tz, nz: d.tx };
  }
  /* nearest point on the (extended) centreline: arc length s and signed lateral offset o (+ = right) */
  function nearest(x, z) {
    let bi = 0,
      bd = Infinity;
    for (let i = 0; i <= N; i += 5) {
      const dx = P[i].x - x,
        dz = P[i].z - z,
        d = dx * dx + dz * dz;
      if (d < bd) {
        bd = d;
        bi = i;
      }
    }
    let best = Infinity,
      S = 0,
      O = 0;
    const i0 = Math.max(0, bi - 6),
      i1 = Math.min(N - 1, bi + 6);
    for (let i = i0; i <= i1; i++) {
      const a = P[i],
        b = P[i + 1],
        vx = b.x - a.x,
        vz = b.z - a.z,
        l2 = vx * vx + vz * vz;
      let u = ((x - a.x) * vx + (z - a.z) * vz) / l2;
      u = clamp(u, i === 0 ? -1e9 : 0, i === N - 1 ? 1e9 : 1);
      const dx = x - (a.x + vx * u),
        dz = z - (a.z + vz * u),
        d2 = dx * dx + dz * dz;
      if (d2 < best) {
        const l = Math.sqrt(l2);
        best = d2;
        S = cum[i] + u * l;
        O = (-dx * vz + dz * vx) / l;
      }
    }
    return { s: S, o: O };
  }

  /* island: a soft bean around the centreline, tapered at the ends, scalloped by noise */
  const club = !!hole.clubhouse;
  const capN = club ? 17 : 12,
    capF = 12;
  const hw0 = 0.3 * (Ls + 22) - Math.abs(bend) * B * 0.12;
  const ph = [R(0, 6.28), R(0, 6.28), R(0, 6.28), R(0, 6.28)];
  const taper = (s) => 0.74 + 0.26 * sstep(-capN * 0.2, len * 0.32, s) * (1 - sstep(len * 0.7, len + capF * 0.3, s));
  const hw = (s, side) =>
    (hw0 * (0.93 + 0.08 * Math.sin((s / len) * 5.3 + ph[0] + side * 1.9)) + 2.2 * noise(s * 0.06, side * 3.7, seed + 3)) * taper(s);
  function islandD(x, z, nn = nearest(x, z)) {
    const side = nn.o >= 0 ? 1 : -1,
      s = nn.s;
    let d;
    if (s < 0) {
      const h = hw(0, side);
      d = Math.hypot((-s * h) / capN, nn.o) - h;
    } else if (s > len) {
      const h = hw(len, side);
      d = Math.hypot(((s - len) * h) / capF, nn.o) - h;
    } else d = Math.abs(nn.o) - hw(s, side);
    return d + 3.4 * fbm(x * 0.075, z * 0.075, seed + 11, 3);
  }
  const FEATHER = 5.5;
  const islandA = (d) => 1 - sstep(-FEATHER, 0, d);

  /* green */
  const gL = 5.4 + R(-0.4, 0.5),
    gW = 4.5 + R(-0.3, 0.4);
  const G = at(len);
  const gk = [R(0, 6.28), R(0, 6.28), R(0, 6.28)];
  const gR = (th) => 1 + 0.06 * Math.sin(2 * th + gk[0]) + 0.045 * Math.sin(3 * th + gk[1]) + 0.025 * Math.sin(5 * th + gk[2]);
  const greenLocal = (x, z) => {
    const dx = x - G.x,
      dz = z - G.z;
    return { a: dx * G.tx + dz * G.tz, c: dx * G.nx + dz * G.nz };
  };
  function greenD(x, z, grow = 0) {
    const { a, c } = greenLocal(x, z);
    const A = a / (gL + grow),
      C = c / (gW + grow);
    return (Math.hypot(A, C) / gR(Math.atan2(C, A)) - 1) * Math.min(gL, gW);
  }
  const greenOutline = (grow = 0, n = 72) => {
    const out = [];
    for (let k = 0; k < n; k++) {
      const th = (k / n) * Math.PI * 2,
        r = gR(th);
      const a = Math.cos(th) * (gL + grow) * r,
        c = Math.sin(th) * (gW + grow) * r;
      out.push({ x: G.x + G.tx * a + G.nx * c, z: G.z + G.tz * a + G.nz * c });
    }
    return out;
  };
  const pinA = R(-0.32, 0.3) * gL,
    pinC = R(-0.42, 0.42) * gW;
  const pin = { x: G.x + G.tx * pinA + G.nx * pinC, z: G.z + G.tz * pinA + G.nz * pinC };

  /* fairway (segments of arc length), mowing width varies, widest at the landing zone */
  const land = Math.min(225 * upm, len * 0.66);
  const fwBase = par === 3 ? 3.8 : 6.2;
  const fw = (s) =>
    par === 3
      ? fwBase
      : fwBase *
        (0.93 + 0.08 * Math.sin(s * 0.11 + ph[1])) *
        (1 + 0.12 * Math.exp(-((s - land) ** 2) / 120)) *
        (1 - 0.3 * sstep(len - 24, len - gL, s));
  let fwSegs = par === 3 ? [[len - gL - 8, len - gL * 0.3]] : [[Math.min(58 * upm, len * 0.2), len - gL * 0.3]];

  /* water: a meandering creek along one side (widening into a pool), or a pond across the line in front of the green */
  let water = null;
  if (wside) {
    const pts = [];
    const s0 = len * 0.1,
      s1 = len + capF + 8,
      sp = len * R(0.62, 0.78);
    for (let s = s0 - 14; s <= s1; s += 1.4) {
      const base = wside * (6.2 + 6.4 + 1.5 * Math.sin(s * 0.12 + ph[2]) + 0.8 * Math.sin(s * 0.31 + ph[3]));
      const e = sstep(s0 - 14, s0 + 10, s);
      const o = lerp(wside * (hw(clamp(s, 0, len), wside) + 6), base, e);
      const p = at(s);
      pts.push({ x: p.x + p.nx * o, z: p.z + p.nz * o, w: 0.95 + 0.22 * Math.sin(s * 0.5) + 2.4 * Math.exp(-((s - sp) ** 2) / 26) });
    }
    water = { kind: 'creek', pts };
  } else if (front) {
    const sp = len - gL - (par === 3 ? 10 : 8.5);
    const p = at(sp);
    water = {
      kind: 'pond',
      s: sp,
      x: p.x,
      z: p.z,
      ux: p.nx,
      uz: p.nz,
      ra: fw(sp) + 3.6 + R(0, 1.2),
      rc: 2.9 + R(0, 0.8),
      k: [R(0, 6.28), R(0, 6.28), R(0.05, 0.1), R(0.03, 0.07)],
    };
    const g0 = sp - water.rc - 1.4,
      g1 = sp + water.rc + 1.1;
    fwSegs = fwSegs.flatMap(([a, b]) => {
      const out = [];
      if (g0 - a > 3) out.push([a, Math.min(b, g0)]);
      if (b - g1 > 1.5) out.push([Math.max(a, g1), b]);
      return out.length ? out : [[a, b]];
    });
  }
  const pondR = (w, phi) => 1 + w.k[2] * Math.sin(2 * phi + w.k[0]) + w.k[3] * Math.sin(3 * phi + w.k[1]);
  function waterD(x, z) {
    if (!water) return 1e9;
    if (water.kind === 'pond') {
      const dx = x - water.x,
        dz = z - water.z;
      const a = (dx * water.ux + dz * water.uz) / water.ra,
        c = (-dx * water.uz + dz * water.ux) / water.rc;
      return (Math.hypot(a, c) / pondR(water, Math.atan2(c, a)) - 1) * water.rc;
    }
    let best = 1e9;
    const p = water.pts;
    for (let i = 0; i < p.length - 1; i++) {
      const a = p[i],
        b = p[i + 1],
        vx = b.x - a.x,
        vz = b.z - a.z;
      const u = clamp(((x - a.x) * vx + (z - a.z) * vz) / (vx * vx + vz * vz), 0, 1);
      const d = Math.hypot(x - a.x - vx * u, z - a.z - vz * u) - lerp(a.w, b.w, u);
      if (d < best) best = d;
    }
    return best;
  }
  const pondOutline = (grow = 0, n = 56) => {
    const w = water,
      out = [];
    for (let k = 0; k < n; k++) {
      const phi = (k / n) * Math.PI * 2,
        r = pondR(w, phi);
      const a = Math.cos(phi) * (w.ra + grow) * r,
        c = Math.sin(phi) * (w.rc + grow) * r;
      out.push({ x: w.x + w.ux * a - w.uz * c, z: w.z + w.uz * a + w.ux * c });
    }
    return out;
  };

  function fwD(nn) {
    let best = 1e9;
    for (const [a, b] of fwSegs) {
      const s = clamp(nn.s, a, b),
        w = fw(s),
        ds = nn.s - s;
      const d = ds === 0 ? Math.abs(nn.o) - w : Math.hypot((ds * w) / 3.2, nn.o) - w;
      if (d < best) best = d;
    }
    return best;
  }

  /* tee boxes: back, main (markers) and forward */
  const tees = [];
  const addTee = (s, w, l, main) => {
    const p = at(s);
    tees.push({ ...p, w, l, main });
  };
  if (par > 3) addTee(-6.6, 3.0, 3.4, false);
  addTee(0, 3.8, 4.6, true);
  addTee(par === 3 ? 7.5 : 8.6, 2.8, 3.0, false);
  function teeD(x, z) {
    let best = 1e9;
    for (const t of tees) {
      const dx = x - t.x,
        dz = z - t.z;
      const a = Math.abs(dx * t.tx + dz * t.tz) - t.l / 2,
        c = Math.abs(dx * t.nx + dz * t.nz) - t.w / 2;
      best = Math.min(best, Math.hypot(Math.max(a, 0), Math.max(c, 0)) + Math.min(Math.max(a, c), 0));
    }
    return best;
  }

  /* bunkers: fairway bunkers at the landing zone (inside of the dogleg), the rest guard the green */
  const bunkers = [];
  const nB = sh.bunkers || 0;
  const nFw = par === 5 ? Math.min(2, Math.max(0, nB - 2)) : par === 4 && nB >= 2 ? 1 : 0;
  const mkB = (x, z, ang, ra, rc) =>
    bunkers.push({ x, z, ux: Math.cos(ang), uz: Math.sin(ang), ra, rc, k: [R(0, 6.28), R(0, 6.28), R(0.06, 0.14), R(0.04, 0.09)] });
  for (let k = 0; k < nFw; k++) {
    const s = (k === 0 ? Math.min(232 * upm, len * 0.62) : Math.min(400 * upm, len * 0.8)) + R(-2, 2);
    let side = k === 0 ? inside : -inside;
    if (side === wside) side = -side;
    const p = at(s),
      ra = R(2.5, 3.3),
      rc = R(1.15, 1.5);
    const o = side * (fw(s) + 0.9 + rc);
    mkB(p.x + p.nx * o, p.z + p.nz * o, Math.atan2(p.tz, p.tx) + R(-0.25, 0.25), ra, rc);
  }
  let angs = front ? [Math.PI / 2 + 0.25, -Math.PI / 2 - 0.25, 0.35, -0.5] : [Math.PI - 0.85, -(Math.PI - 0.85), Math.PI / 2 - 0.15, -Math.PI / 2 + 0.2, 0.2];
  if (wside) angs = [...angs.filter((a) => Math.sign(Math.sin(a)) !== wside), ...angs.filter((a) => Math.sign(Math.sin(a)) === wside)];
  for (let k = 0; k < nB - nFw; k++) {
    const th = angs[k % angs.length] + R(-0.2, 0.2);
    const ra = R(1.9, 2.7),
      rc = R(1.0, 1.35);
    const rr = gR(th) / Math.hypot(Math.cos(th) / gL, Math.sin(th) / gW) + 0.8 + rc;
    const a = Math.cos(th) * rr,
      c = Math.sin(th) * rr;
    const x = G.x + G.tx * a + G.nx * c,
      z = G.z + G.tz * a + G.nz * c;
    mkB(x, z, Math.atan2(z - G.z, x - G.x) + Math.PI / 2, ra, rc);
  }
  const bR = (b, phi) => 1 + b.k[2] * Math.sin(2 * phi + b.k[0]) + b.k[3] * Math.sin(3 * phi + b.k[1]);
  function bunkerD(x, z) {
    let best = 1e9;
    for (const b of bunkers) {
      const dx = x - b.x,
        dz = z - b.z;
      const a = (dx * b.ux + dz * b.uz) / b.ra,
        c = (-dx * b.uz + dz * b.ux) / b.rc;
      best = Math.min(best, (Math.hypot(a, c) / bR(b, Math.atan2(c, a)) - 1) * b.rc);
    }
    return best;
  }
  const bunkerOutline = (b, grow = 0, n = 44) => {
    const out = [];
    for (let k = 0; k < n; k++) {
      const phi = (k / n) * Math.PI * 2,
        r = bR(b, phi);
      const a = Math.cos(phi) * (b.ra + grow) * r,
        c = Math.sin(phi) * (b.rc + grow) * r;
      out.push({ x: b.x + b.ux * a - b.uz * c, z: b.z + b.uz * a + b.ux * c });
    }
    return out;
  };

  /* cart path: the side away from the water / outside of the dogleg; swings in by the tee */
  const pside = wside ? -wside : -inside;
  const path = [];
  for (let s = -capN * 0.85; s <= len + capF + 4; s += 1.2) {
    let o = pside * (fwBase + 5.0 + 1.2 * Math.sin(s * 0.075 + ph[1] + 1));
    if (par === 3) o = pside * (gW + 5.2 + 1.0 * Math.sin(s * 0.09 + ph[1]));
    o = lerp(pside * 4.7, o, sstep(-1, 16, s));
    const p = at(s);
    path.push({ x: p.x + p.nx * o, z: p.z + p.nz * o });
  }
  function pathD(x, z) {
    let best = 1e9;
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i],
        b = path[i + 1],
        vx = b.x - a.x,
        vz = b.z - a.z;
      const u = clamp(((x - a.x) * vx + (z - a.z) * vz) / (vx * vx + vz * vz), 0, 1);
      const d = Math.hypot(x - a.x - vx * u, z - a.z - vz * u);
      if (d < best) best = d;
    }
    return best - 0.6;
  }

  /* clubhouse (Figma: long building with a red roof by the first tees) */
  let house = null;
  if (club) {
    const p = at(-11.8),
      o = -pside * 4.2;
    house = { x: p.x + p.nx * o, z: p.z + p.nz * o, ux: p.nx, uz: p.nz, w: 11.5, d: 3.9, pside };
  }
  function houseD(x, z) {
    if (!house) return 1e9;
    const dx = x - house.x,
      dz = z - house.z;
    const a = Math.abs(dx * house.ux + dz * house.uz) - house.w / 2,
      c = Math.abs(-dx * house.uz + dz * house.ux) - house.d / 2;
    return Math.hypot(Math.max(a, 0), Math.max(c, 0)) + Math.min(Math.max(a, c), 0);
  }

  /* bounds of the painted / modelled area */
  let xmin = 1e9,
    xmax = -1e9,
    zmin = 1e9,
    zmax = -1e9;
  for (let s = -capN - 3; s <= len + capF + 3; s += 2)
    for (const side of [-1, 1]) {
      const p = at(s),
        h = hw(clamp(s, 0, len), side) + 7;
      const x = p.x + p.nx * h * side,
        z = p.z + p.nz * h * side;
      xmin = Math.min(xmin, x, p.x);
      xmax = Math.max(xmax, x, p.x);
      zmin = Math.min(zmin, z, p.z);
      zmax = Math.max(zmax, z, p.z);
    }
  const bounds = { xmin: xmin - 2, xmax: xmax + 2, zmin: zmin - 2, zmax: zmax + 2 };

  /* terrain height */
  function height(x, z) {
    const nn = nearest(x, z);
    let h = 0.7 * fbm(x * 0.06, z * 0.06, seed + 21, 3) + 0.16 * noise(x * 0.27, z * 0.27, seed + 23);
    h = lerp(h, h * 0.25, 1 - sstep(0, 3.5, fwD(nn)));
    const gd = greenD(x, z);
    if (gd < 3) h = lerp(h, 0.28 + (0.07 * greenLocal(x, z).a) / gL, 1 - sstep(-0.5, 3, gd));
    h = lerp(h, 0.04, 1 - sstep(0, 2.2, teeD(x, z)));
    if (bunkers.length) h -= 0.42 * (1 - sstep(-0.9, 0.35, bunkerD(x, z)));
    if (water) h = lerp(h, -0.95, 1 - sstep(-0.5, 1.4, waterD(x, z)));
    h = lerp(h, h * 0.35, 1 - sstep(0, 1.2, pathD(x, z)));
    if (house) h = lerp(h, 0.03, 1 - sstep(0, 3.2, houseD(x, z)));
    const m = islandA(islandD(x, z, nn));
    return h - 4.2 * Math.pow(1 - m, 1.5);
  }

  /* trees: jittered grid, kept off play areas, dense belts toward the island edge, clumps by noise */
  const trees = [];
  const tside = sh.trees || 'both';
  const step = 2.05;
  const fwStart = fwSegs[0][0];
  for (let gz = bounds.zmin; gz < bounds.zmax; gz += step)
    for (let gx = bounds.xmin; gx < bounds.xmax; gx += step) {
      const r = [rnd(), rnd(), rnd(), rnd(), rnd(), rnd()];
      const x = gx + (r[0] - 0.5) * step * 0.9,
        z = gz + (r[1] - 0.5) * step * 0.9;
      const nn = nearest(x, z);
      const d = islandD(x, z, nn);
      if (d > -2.3) continue;
      const side = nn.o >= 0 ? 'right' : 'left';
      const dense = tside === 'both' || tside === side;
      if (fwD(nn) < 2.6) continue;
      if (greenD(x, z) < 3.4) continue;
      if (nn.s > -3.5 && nn.s < fwStart && Math.abs(nn.o) < 6.8) continue;
      if (teeD(x, z) < 3.2) continue;
      if (bunkers.length && bunkerD(x, z) < 1.7) continue;
      if (water && waterD(x, z) < 1.3) continue;
      if (pathD(x, z) < 1.1) continue;
      if (house && houseD(x, z) < 3.4) continue;
      const span = Math.max(4, hw(clamp(nn.s, 0, len), Math.sign(nn.o) || 1) - fwBase);
      const edgeK = sstep(0.15, 0.85, (Math.abs(nn.o) - fwBase) / span);
      const clump = fbm(x * 0.1, z * 0.1, seed + 5, 2);
      let p = (dense ? 0.4 : 0.1) + edgeK * (dense ? 0.55 : 0.3) + clump * 0.5;
      if (nn.s < -2) p *= 0.7;
      if (r[2] > p) continue;
      const conifer = r[3] < (side === 'right' ? 0.42 : 0.26);
      trees.push({
        x,
        z,
        conifer,
        v: Math.floor(r[4] * 3),
        s: conifer ? lerp(1.1, 1.65, r[5]) : lerp(1.2, 2.05, r[5]),
        rot: r[0] * 6.283,
        col: conifer ? PAL.conifer[Math.floor(r[2] * 997) % PAL.conifer.length] : PAL.broad[Math.floor(r[4] * 991) % PAL.broad.length],
      });
    }

  /* outline points for camera framing (ground + tree tops) */
  const fitPts = [];
  for (let k = 0; k <= 16; k++) {
    const s = lerp(-capN * 0.75, len + capF * 0.75, k / 16);
    for (const side of [-1, 1]) {
      const p = at(s),
        h = hw(clamp(s, 0, len), side) - 1.2;
      const x = p.x + p.nx * h * side,
        z = p.z + p.nz * h * side;
      fitPts.push(new THREE.Vector3(x, 0, z), new THREE.Vector3(x, 3.2, z));
    }
  }
  const tA = at(-capN + 1.5),
    tB = at(len + capF - 1.5);
  fitPts.push(new THREE.Vector3(tA.x, 0, tA.z), new THREE.Vector3(tB.x, 3.5, tB.z));

  const mainTee = tees.find((t) => t.main);
  return {
    hole,
    par,
    seed,
    len,
    upm,
    land,
    at,
    nearest,
    islandD,
    islandA,
    FEATHER,
    gL,
    gW,
    G,
    pin,
    greenD,
    greenOutline,
    fw,
    fwSegs,
    fwD,
    tees,
    mainTee,
    bunkers,
    bunkerOutline,
    water,
    waterD,
    pondOutline,
    path,
    house,
    bounds,
    height,
    trees,
    fitPts,
    ballO: R(-1.4, 1.4),
    waterY: -0.34,
    center: new THREE.Vector3((bounds.xmin + bounds.xmax) / 2, 0, (bounds.zmin + bounds.zmax) / 2),
    chordAz: Math.atan2(-(G.x - mainTee.x), -(G.z - mainTee.z)),
  };
}

/* ======================================================================
   Texture painting (2D canvas): rough mottling, first cut, fairway stripes, green, bunkers, water bed,
   cart path, patio, ambient occlusion under trees, grain; plus the island alpha mask and the water mask.
   ====================================================================== */
function paint(L) {
  const { xmin, xmax, zmin, zmax } = L.bounds;
  const W = xmax - xmin,
    H = zmax - zmin;
  const ppu = Math.min(1024 / W, 2048 / H);
  const cv = mkCanvas(W * ppu, H * ppu),
    g = cv.getContext('2d');
  const cw = cv.width,
    ch = cv.height;
  const X = (x) => (x - xmin) * ppu,
    Y = (z) => (z - zmin) * ppu;
  const poly = (pts) => {
    g.beginPath();
    pts.forEach((p, i) => (i ? g.lineTo(X(p.x), Y(p.z)) : g.moveTo(X(p.x), Y(p.z))));
    g.closePath();
  };
  const line = (pts) => {
    g.beginPath();
    pts.forEach((p, i) => (i ? g.lineTo(X(p.x), Y(p.z)) : g.moveTo(X(p.x), Y(p.z))));
  };
  const ribbon = (a, b, w, cap) => {
    const Rr = [],
      Lf = [];
    const n = Math.max(2, Math.ceil((b - a) / 0.7));
    for (let i = 0; i <= n; i++) {
      const s = a + ((b - a) * i) / n,
        p = L.at(s),
        ww = w(s);
      Rr.push({ x: p.x + p.nx * ww, z: p.z + p.nz * ww });
      Lf.push({ x: p.x - p.nx * ww, z: p.z - p.nz * ww });
    }
    const capPts = (s, dir) => {
      const p = L.at(s),
        ww = w(s),
        out = [];
      for (let k = 1; k < 10; k++) {
        const t = (k / 10) * Math.PI,
          c = Math.cos(t),
          si = Math.sin(t);
        out.push({ x: p.x + p.nx * ww * c + p.tx * cap * si * dir, z: p.z + p.nz * ww * c + p.tz * cap * si * dir });
      }
      return out;
    };
    return [...Rr, ...capPts(b, 1), ...Lf.reverse(), ...capPts(a, -1).reverse()];
  };
  const polyRibbon = (pts, grow) => {
    const Rr = [],
      Lf = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[Math.max(0, i - 1)],
        b = pts[Math.min(pts.length - 1, i + 1)];
      let tx = b.x - a.x,
        tz = b.z - a.z;
      const l = Math.hypot(tx, tz) || 1;
      tx /= l;
      tz /= l;
      const w = pts[i].w + grow;
      Rr.push({ x: pts[i].x - tz * w, z: pts[i].z + tx * w });
      Lf.push({ x: pts[i].x + tz * w, z: pts[i].z - tx * w });
    }
    return [...Rr, ...Lf.reverse()];
  };
  const rnd = mulberry(L.seed + 99);

  /* island mask + rough mottling, computed per pixel at low resolution (smoothed when scaled up) */
  const mres = 4;
  const mw = Math.ceil(W * mres),
    mh = Math.ceil(H * mres);
  const mask = mkCanvas(mw, mh),
    mot = mkCanvas(mw, mh);
  const mg = mask.getContext('2d'),
    og = mot.getContext('2d');
  const md = mg.createImageData(mw, mh),
    od = og.createImageData(mw, mh);
  const c0 = [0x37, 0x7f, 0x2f],
    c1 = [0x6a, 0xb3, 0x4a],
    cd = [0x2c, 0x66, 0x28];
  for (let j = 0; j < mh; j++)
    for (let i = 0; i < mw; i++) {
      const x = xmin + (i + 0.5) / mres,
        z = zmin + (j + 0.5) / mres;
      const nn = L.nearest(x, z);
      const d = L.islandD(x, z, nn);
      const a = L.islandA(d);
      const k = (j * mw + i) * 4;
      const v = Math.round(a * 255);
      md.data[k] = md.data[k + 1] = md.data[k + 2] = v;
      md.data[k + 3] = 255;
      const n = clamp(0.5 + 0.85 * fbm(x * 0.13, z * 0.13, L.seed + 31, 3), 0, 1);
      const deep = sstep(-11, -2, d) * 0.55;
      for (let c = 0; c < 3; c++) od.data[k + c] = lerp(lerp(c0[c], c1[c], n), cd[c], deep);
      od.data[k + 3] = 255;
    }
  mg.putImageData(md, 0, 0);
  og.putImageData(od, 0, 0);
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = 'high';
  g.drawImage(mot, 0, 0, cw, ch);

  /* water bank + bed */
  if (L.water) {
    if (L.water.kind === 'creek') {
      poly(polyRibbon(L.water.pts, 0.55));
      g.fillStyle = PAL.bank;
      g.fill();
      poly(polyRibbon(L.water.pts, 0));
      g.fillStyle = PAL.bed;
      g.fill();
    } else {
      poly(L.pondOutline(0.55));
      g.fillStyle = PAL.bank;
      g.fill();
      poly(L.pondOutline(0));
      g.fillStyle = PAL.bed;
      g.fill();
    }
  }

  /* first cut around the fairway and the green */
  for (const [a, b] of L.fwSegs) {
    poly(ribbon(a, b, (s) => L.fw(s) + 1.5, 4.4));
    g.fillStyle = PAL.cut;
    g.fill();
  }
  poly(L.greenOutline(2.2));
  g.fillStyle = PAL.cut;
  g.fill();

  /* cart path */
  g.lineCap = g.lineJoin = 'round';
  line(L.path);
  g.strokeStyle = PAL.pathEdge;
  g.lineWidth = 1.55 * ppu;
  g.stroke();
  line(L.path);
  g.strokeStyle = PAL.path;
  g.lineWidth = 1.1 * ppu;
  g.stroke();

  /* fairway with checkerboard mowing stripes that follow the curve */
  for (const [a, b] of L.fwSegs) {
    const shape = ribbon(a, b, L.fw, 3.2);
    poly(shape);
    g.fillStyle = PAL.fairway;
    g.fill();
    g.save();
    poly(shape);
    g.clip();
    const band = 2.7;
    let k = 0;
    for (let s = a - 4; s < b + 4; s += band, k++)
      for (const half of [-1, 1]) {
        const p0 = L.at(s),
          p1 = L.at(s + band),
          w = 13 * half;
        g.beginPath();
        g.moveTo(X(p0.x), Y(p0.z));
        g.lineTo(X(p0.x + p0.nx * w), Y(p0.z + p0.nz * w));
        g.lineTo(X(p1.x + p1.nx * w), Y(p1.z + p1.nz * w));
        g.lineTo(X(p1.x), Y(p1.z));
        g.closePath();
        g.fillStyle = (k + (half > 0 ? 1 : 0)) % 2 ? 'rgba(255,255,240,0.1)' : 'rgba(20,60,0,0.07)';
        g.fill();
      }
    g.restore();
  }

  /* green complex: fringe, putting surface with stripes and a soft crown, cup */
  poly(L.greenOutline(0.95));
  g.fillStyle = PAL.fringe;
  g.fill();
  const gOut = L.greenOutline(0);
  const gx = X(L.G.x),
    gz = Y(L.G.z);
  const grd = g.createRadialGradient(gx, gz, 0, gx, gz, Math.max(L.gL, L.gW) * ppu);
  grd.addColorStop(0, PAL.greenLight);
  grd.addColorStop(1, PAL.green);
  poly(gOut);
  g.fillStyle = grd;
  g.fill();
  g.save();
  poly(gOut);
  g.clip();
  for (let k = -8; k <= 8; k++) {
    if (k % 2) continue;
    const a0 = k * 0.95,
      cx = L.G.x + L.G.tx * a0,
      cz = L.G.z + L.G.tz * a0;
    g.beginPath();
    g.moveTo(X(cx - L.G.nx * 9), Y(cz - L.G.nz * 9));
    g.lineTo(X(cx + L.G.nx * 9), Y(cz + L.G.nz * 9));
    g.lineTo(X(cx + L.G.nx * 9 + L.G.tx * 0.95), Y(cz + L.G.nz * 9 + L.G.tz * 0.95));
    g.lineTo(X(cx - L.G.nx * 9 + L.G.tx * 0.95), Y(cz - L.G.nz * 9 + L.G.tz * 0.95));
    g.closePath();
    g.fillStyle = 'rgba(255,255,235,0.09)';
    g.fill();
  }
  g.restore();
  g.beginPath();
  g.arc(X(L.pin.x), Y(L.pin.z), 0.32 * ppu, 0, Math.PI * 2);
  g.fillStyle = 'rgba(255,255,255,0.75)';
  g.fill();
  g.beginPath();
  g.arc(X(L.pin.x), Y(L.pin.z), 0.2 * ppu, 0, Math.PI * 2);
  g.fillStyle = '#1d2a18';
  g.fill();

  /* soft contact shadow around the tee boxes */
  for (const t of L.tees) {
    g.save();
    g.translate(X(t.x), Y(t.z));
    g.rotate(Math.atan2(t.nz, t.nx));
    g.shadowColor = 'rgba(20,50,10,0.55)';
    g.shadowBlur = 0.7 * ppu;
    g.fillStyle = PAL.cut;
    const w = (t.w + 0.5) * ppu,
      l = (t.l + 0.5) * ppu;
    g.beginPath();
    g.roundRect(-w / 2, -l / 2, w, l, 0.6 * ppu);
    g.fill();
    g.restore();
  }

  /* bunkers: soft grass lip, sand with a lighter heart, shade on the inner rim */
  for (const b of L.bunkers) {
    g.save();
    g.shadowColor = 'rgba(25,60,15,0.55)';
    g.shadowBlur = 0.55 * ppu;
    poly(L.bunkerOutline(b, 0.28));
    g.fillStyle = PAL.lip;
    g.fill();
    g.restore();
    const out = L.bunkerOutline(b, 0);
    const sg = g.createRadialGradient(X(b.x), Y(b.z), 0, X(b.x), Y(b.z), b.ra * ppu);
    sg.addColorStop(0, '#f8efd6');
    sg.addColorStop(1, PAL.sand);
    poly(out);
    g.fillStyle = sg;
    g.fill();
    g.save();
    poly(out);
    g.clip();
    g.translate(-SHADOW_DIR.x * 0.35 * ppu, -SHADOW_DIR.z * 0.35 * ppu);
    poly(out);
    g.lineWidth = 0.75 * ppu;
    g.strokeStyle = 'rgba(150,118,58,0.42)';
    g.stroke();
    g.restore();
  }

  /* clubhouse patio + parking */
  if (L.house) {
    const h = L.house;
    g.save();
    g.translate(X(h.x), Y(h.z));
    g.rotate(Math.atan2(h.uz, h.ux));
    const w = (h.w + 3.2) * ppu,
      d = (h.d + 3.6) * ppu;
    g.shadowColor = 'rgba(20,50,10,0.4)';
    g.shadowBlur = 0.6 * ppu;
    g.fillStyle = PAL.patio;
    g.beginPath();
    g.roundRect(-w / 2, -d / 2, w, d, 0.5 * ppu);
    g.fill();
    g.shadowColor = 'transparent';
    /* parking bay on the path side */
    const px = h.pside > 0 ? w / 2 + 0.2 * ppu : -w / 2 - 4.4 * ppu;
    g.fillStyle = '#b9bdc1';
    g.beginPath();
    g.roundRect(px, -d / 2 + 0.4 * ppu, 4.2 * ppu, d - 0.8 * ppu, 0.4 * ppu);
    g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.8)';
    g.lineWidth = 0.08 * ppu;
    for (let k = 1; k < 4; k++) {
      const yy = -d / 2 + 0.4 * ppu + ((d - 0.8 * ppu) * k) / 4;
      g.beginPath();
      g.moveTo(px + 0.3 * ppu, yy);
      g.lineTo(px + 3.9 * ppu, yy);
      g.stroke();
    }
    g.restore();
  }

  /* ambient occlusion under the trees (offset away from the sun) */
  for (const t of L.trees) {
    const r = (t.conifer ? 1.25 : 1.2) * t.s * 1.15 * ppu;
    const x = X(t.x + SHADOW_DIR.x * 0.35 * t.s),
      y = Y(t.z + SHADOW_DIR.z * 0.35 * t.s);
    const ag = g.createRadialGradient(x, y, 0, x, y, r);
    ag.addColorStop(0, 'rgba(16,46,10,0.5)');
    ag.addColorStop(1, 'rgba(16,46,10,0)');
    g.fillStyle = ag;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }

  /* fine grass grain */
  const gn = mkCanvas(128, 128),
    gc = gn.getContext('2d'),
    gd = gc.createImageData(128, 128);
  for (let i = 0; i < 128 * 128; i++) {
    const v = 128 + (rnd() - 0.5) * 110;
    gd.data[i * 4] = gd.data[i * 4 + 1] = gd.data[i * 4 + 2] = v;
    gd.data[i * 4 + 3] = 255;
  }
  gc.putImageData(gd, 0, 0);
  const pat = g.createPattern(gn, 'repeat');
  if (pat.setTransform) pat.setTransform(new DOMMatrix().scale(1.6));
  g.globalCompositeOperation = 'overlay';
  g.globalAlpha = 0.2;
  g.fillStyle = pat;
  g.fillRect(0, 0, cw, ch);
  g.globalAlpha = 1;
  g.globalCompositeOperation = 'source-over';

  /* water mask (alpha map of the water plane) = water shapes × island mask */
  let wmask = null;
  if (L.water) {
    const wr = 6;
    wmask = mkCanvas(W * wr, H * wr);
    const wg = wmask.getContext('2d');
    wg.fillStyle = '#000';
    wg.fillRect(0, 0, wmask.width, wmask.height);
    wg.save();
    wg.scale(wr, wr);
    wg.translate(-xmin, -zmin);
    const pts = L.water.kind === 'creek' ? polyRibbon(L.water.pts, 0.1) : L.pondOutline(0.1);
    wg.beginPath();
    pts.forEach((p, i) => (i ? wg.lineTo(p.x, p.z) : wg.moveTo(p.x, p.z)));
    wg.closePath();
    wg.fillStyle = '#fff';
    wg.fill();
    wg.restore();
    wg.globalCompositeOperation = 'multiply';
    wg.imageSmoothingQuality = 'high';
    wg.drawImage(mask, 0, 0, wmask.width, wmask.height);
  }
  return { color: cv, mask, water: wmask };
}

/* ======================================================================
   Shared geometry: tree templates (sphere-cluster broadleaf canopies, stacked-cone conifers), trunk
   ====================================================================== */
function mergeGeos(parts) {
  let n = 0;
  parts.forEach((g) => (n += g.attributes.position.count));
  const pos = new Float32Array(n * 3),
    nor = new Float32Array(n * 3),
    col = new Float32Array(n * 3);
  let o = 0;
  parts.forEach((g) => {
    pos.set(g.attributes.position.array, o * 3);
    nor.set(g.attributes.normal.array, o * 3);
    col.set(g.attributes.color.array, o * 3);
    o += g.attributes.position.count;
    g.dispose();
  });
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  out.setAttribute('color', new THREE.BufferAttribute(col, 3));
  out.computeBoundingSphere();
  return out;
}
function broadleaf(rnd, v) {
  const blobs = [[0, 1.0, 0, 1.0]];
  const n = 4 + v;
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2 + rnd() * 0.7,
      d = 0.5 + rnd() * 0.25;
    blobs.push([Math.cos(a) * d, 0.72 + rnd() * 0.55, Math.sin(a) * d, 0.55 + rnd() * 0.22]);
  }
  blobs.push([(rnd() - 0.5) * 0.3, 1.62 + rnd() * 0.15, (rnd() - 0.5) * 0.3, 0.56 + rnd() * 0.1]);
  const parts = blobs.map(([cx, cy, cz, r], bi) => {
    const g = new THREE.IcosahedronGeometry(r, 1);
    const p = g.attributes.position,
      nr = g.attributes.normal;
    const col = new Float32Array(p.count * 3);
    const tint = 0.93 + rnd() * 0.14;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i),
        y = p.getY(i),
        z = p.getZ(i);
      const l = Math.hypot(x, y, z),
        nx = x / l,
        ny = y / l,
        nz = z / l;
      const k = 1 + 0.14 * noise(nx * 2.1 + ny * 1.3 + bi * 5, nz * 2.1 - ny * 0.7, 77);
      const px = cx + nx * r * k,
        py = cy + ny * r * k,
        pz = cz + nz * r * k;
      p.setXYZ(i, px, py, pz);
      const ln = Math.hypot(nx, ny + 0.25, nz);
      nr.setXYZ(i, nx / ln, (ny + 0.25) / ln, nz / ln);
      const s = (0.5 + 0.55 * sstep(-0.1, 2.1, py)) * tint;
      col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = s;
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.deleteAttribute('uv');
    return g;
  });
  return mergeGeos(parts);
}
function conifer(rnd, v) {
  const layers =
    v === 0
      ? [
          [1.0, 1.5, 0.75],
          [0.8, 1.4, 1.55],
          [0.58, 1.25, 2.3],
          [0.34, 1.0, 2.95],
        ]
      : [
          [0.92, 1.6, 0.8],
          [0.68, 1.5, 1.7],
          [0.42, 1.3, 2.55],
          [0.2, 0.8, 3.15],
        ];
  const parts = layers.map(([r, h, y]) => {
    const g = new THREE.ConeGeometry(r, h, 9, 1).toNonIndexed();
    g.rotateY(rnd() * 3);
    g.translate((rnd() - 0.5) * 0.06, y, (rnd() - 0.5) * 0.06);
    const p = g.attributes.position;
    const col = new Float32Array(p.count * 3);
    for (let i = 0; i < p.count; i++) {
      const py = p.getY(i);
      const s = (0.5 + 0.32 * sstep(y - h / 2, y + h / 2, py)) * (0.85 + 0.3 * sstep(0, 3.4, py));
      col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = s;
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.deleteAttribute('uv');
    return g;
  });
  return mergeGeos(parts);
}

/* ======================================================================
   Styles for the overlay layer (injected once)
   ====================================================================== */
const CSS = `
.h3d{overflow:hidden;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
.h3d__stage{position:absolute;inset:0;background:var(--h3d-bg,transparent);opacity:0;transition:opacity .5s cubic-bezier(.22,1,.36,1)}
.h3d__stage.is-in{opacity:1}
.h3d__stage canvas{position:absolute;inset:0;width:100%;height:100%;cursor:grab;outline:none;-webkit-tap-highlight-color:transparent}
.h3d.is-grabbing canvas{cursor:grabbing}
.h3d__sun{position:absolute;inset:0;pointer-events:none;background:radial-gradient(60% 38% at 16% 30%,rgba(255,238,196,.6),transparent 72%);mix-blend-mode:soft-light}
.h3d__svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;filter:drop-shadow(0 1px 1.4px rgba(8,30,8,.38))}
.h3d__ring{fill:none;stroke:#fff;stroke-width:1.3}
.h3d__trail{fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.h3d__plan{fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.h3d__ball{fill:#fff}
.h3d__bshadow{fill:rgba(8,30,8,.32)}
.h3d__aim circle{fill:rgba(255,255,255,.22);stroke:#fff;stroke-width:2}
.h3d__aim circle+circle{fill:#fff;stroke:none}
.h3d__el{position:absolute;left:0;top:0;pointer-events:none;will-change:transform,opacity;opacity:0}
.h3d__me{width:54px;height:54px;margin:-27px 0 0 -27px;padding:3px;border-radius:50%;background:#fff;box-shadow:0 12px 20px -8px rgba(8,30,8,.6),0 0 0 7px rgba(255,255,255,.22)}
.h3d__me img{display:block;width:100%;height:100%;border-radius:50%;object-fit:cover}
.h3d__me::after{content:'';position:absolute;top:1px;right:0;width:13px;height:13px;border-radius:50%;background:#4a3aff;box-shadow:0 0 0 2.5px #fff}
.h3d__tag{white-space:nowrap;font-variant-numeric:tabular-nums}
.h3d__chip{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 9px 0 8px;border-radius:6px;white-space:nowrap;font:600 11px/1 Inter,system-ui,sans-serif;font-variant-numeric:tabular-nums;color:#2b2b2b;background:rgba(255,255,255,.95);box-shadow:0 8px 16px -8px rgba(8,30,8,.55)}
.h3d__chip i{flex:none;width:8px;height:8px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 2px #2b2b2b}
.h3d__chip--pin i{width:9px;height:9px;border-radius:2px 50% 50% 2px;background:linear-gradient(135deg,#10b853,#1a4e26);box-shadow:none}
.h3d__flat{position:absolute;object-fit:contain;pointer-events:none}
`;
function injectStyle() {
  if (document.getElementById('h3d-style')) return;
  const s = document.createElement('style');
  s.id = 'h3d-style';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* WebGL2 probe; also tells a software rasteriser (SwiftShader / llvmpipe, e.g. headless screenshots) apart */
function probeGL() {
  try {
    const c = document.createElement('canvas');
    const gl = window.WebGL2RenderingContext && c.getContext('webgl2');
    if (!gl) return null;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const name = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    const lose = gl.getExtension('WEBGL_lose_context');
    lose && lose.loseContext();
    return { software: /swiftshader|llvmpipe|software|basic render/i.test(name) };
  } catch (e) {
    return null;
  }
}

function resolveHole(h, course) {
  const GH = window.GH || {};
  const hole = typeof h === 'object' && h ? { ...h } : GH.hole ? { ...GH.hole(h || 1) } : { n: +h || 1, par: 4, m: 345, shape: {} };
  if (hole.clubhouse == null) hole.clubhouse = course === 'b' ? hole.n === 1 : hole.n <= 2;
  return hole;
}
function lengthOf(hole, tee) {
  const GH = window.GH || {};
  const f = GH.tee ? GH.tee(tee).factor : 1;
  return Math.round(hole.m * f);
}
function describe(hole, lenM, ball) {
  const sh = hole.shape || {};
  const parts = [`buraco ${hole.n}, par ${hole.par}, ${fmtM(lenM)}`];
  if (hole.par > 3) parts.push(Math.abs(sh.bend || 0) < 0.15 ? 'fairway reto' : sh.bend > 0 ? 'dogleg à direita' : 'dogleg à esquerda');
  if (sh.water === 'left') parts.push('água à esquerda');
  else if (sh.water === 'right') parts.push('água à direita');
  else if (sh.water === 'front') parts.push('lago antes do green');
  if (sh.bunkers) parts.push(`${sh.bunkers} ${sh.bunkers === 1 ? 'bunker' : 'bunkers'}`);
  let s = `Mapa 3D do ${parts.join(', ')}.`;
  if (ball && ball.carried > 0) s += ` Sua bola está a ${fmtM(ball.toPin)} do pin, depois de um drive de ${fmtM(ball.carried)}.`;
  else if (ball) s += ' Você está no tee.';
  return s;
}

/* WebGL unavailable → the Figma raster hole map */
function fallback(container, opts, state) {
  const img = new Image();
  img.className = 'h3d__flat';
  img.src = new URL('./figma/perf-holemap.png', import.meta.url).href;
  img.decoding = 'async';
  const place = () => {
    const ins = typeof opts.insets === 'function' ? opts.insets() : opts.insets || {};
    const t = ins.top || 0,
      b = ins.bottom || 0,
      l = ins.left || 0,
      r = ins.right || 0;
    Object.assign(img.style, { top: t + 'px', left: l + 'px', width: `calc(100% - ${l + r}px)`, height: `calc(100% - ${t + b}px)` });
  };
  const label = () => (img.alt = describe(state.hole, lengthOf(state.hole, state.tee), state.ball) + ' (imagem ilustrativa)');
  place();
  label();
  container.appendChild(img);
  return {
    webgl: false,
    setHole(h, o = {}) {
      if (o.course) state.course = o.course;
      state.hole = resolveHole(h, state.course);
      if ('ball' in o) state.ball = o.ball;
      label();
      return Promise.resolve();
    },
    setBall(b) {
      state.ball = b;
      label();
    },
    reset() {},
    refit: place,
    destroy() {
      img.remove();
    },
  };
}

/* ======================================================================
   mount
   ====================================================================== */
let uid = 0;
export function mount(container, opts = {}) {
  injectStyle();
  const GH = window.GH || {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = {
    mode: opts.mode || 'round',
    course: opts.course || 'a',
    tee: opts.tee || 'branco',
    ball: opts.ball || null,
    hole: null,
  };
  state.hole = resolveHole(opts.hole, state.course);
  container.classList.add('h3d');
  /* keep the host's own positioning (e.g. an absolutely positioned map layer); only anchor a static one */
  if (getComputedStyle(container).position === 'static') container.style.position = 'relative';
  container.setAttribute('role', 'img');
  const gl = opts.fallback ? null : probeGL();
  if (!gl) return fallback(container, opts, state);
  /* software rasteriser: no MSAA, hard-edged PCF, no intro / fly-through, frames on demand (still interactive) */
  const lite = opts.lite != null ? !!opts.lite : gl.software;
  const still = reduce || lite;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: !lite, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    return fallback(container, opts, state);
  }
  const id = ++uid;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = lite ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
  /* the diorama is static (sway is vertex-only and the flag is tiny): bake the shadow map once per hole instead of every frame */
  renderer.shadowMap.autoUpdate = false;
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  /* ---------- DOM: stage = canvas + sun glow + SVG (rings, tracer, aim) + HTML markers ---------- */
  const stage = document.createElement('div');
  stage.className = 'h3d__stage';
  stage.setAttribute('aria-hidden', 'true');
  const canvas = renderer.domElement;
  const sunGlow = document.createElement('div');
  sunGlow.className = 'h3d__sun';
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'h3d__svg');
  svg.innerHTML = `<defs><radialGradient id="h3dg${id}"><stop offset="0" stop-color="#fff" stop-opacity=".36"/><stop offset=".65" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <path class="h3d__glow" fill="url(#h3dg${id})"/>
    <path class="h3d__ring"/><path class="h3d__ring"/><path class="h3d__ring"/><path class="h3d__ring"/>
    <path class="h3d__plan"/><path class="h3d__trail"/>
    <ellipse class="h3d__bshadow" rx="3" ry="1.6"/><circle class="h3d__ball" r="3.4"/>
    <g class="h3d__aim"><circle r="9"/><circle r="2.4"/></g>`;
  const [glowEl, ...rest] = [...svg.querySelectorAll('path')];
  const ringEls = rest.slice(0, 4),
    planEl = rest[4],
    trailEl = rest[5];
  const ballEl = svg.querySelector('.h3d__ball'),
    bshEl = svg.querySelector('.h3d__bshadow'),
    aimEl = svg.querySelector('.h3d__aim');
  const me = document.createElement('div');
  me.className = 'h3d__el h3d__me';
  const avatar = opts.avatar || (GH.me ? `assets/img/av/${GH.me().photo}.webp` : '');
  me.innerHTML = avatar ? `<img src="${avatar}" alt="" width="96" height="96" decoding="async"/>` : '';
  const tagCarry = document.createElement('span');
  tagCarry.className = 'h3d__el h3d__tag tag-violet';
  const tagAim = document.createElement('span');
  tagAim.className = 'h3d__el h3d__chip';
  tagAim.innerHTML = '<i></i><span></span>';
  const tagPin = document.createElement('span');
  tagPin.className = 'h3d__el h3d__chip h3d__chip--pin';
  tagPin.innerHTML = '<i></i><span></span>';
  stage.append(canvas, sunGlow, svg, me, tagCarry, tagAim, tagPin);
  container.appendChild(stage);

  /* ---------- scene ---------- */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 1200);
  const hemi = new THREE.HemisphereLight('#eef6ff', '#5b7a3c', 1.55);
  const sun = new THREE.DirectionalLight('#fff2da', 2.25);
  sun.castShadow = true;
  sun.shadow.mapSize.set(lite ? 1024 : 2048, lite ? 1024 : 2048);
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.05;
  sun.shadow.intensity = 0.72;
  scene.add(hemi, sun, sun.target);

  const timeU = { value: 0 };
  const canopyMat = new THREE.MeshLambertMaterial({ vertexColors: true });
  canopyMat.customProgramCacheKey = () => 'h3d-sway';
  canopyMat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = timeU;
    sh.vertexShader =
      'uniform float uTime;\n' +
      sh.vertexShader.replace(
        '#include <project_vertex>',
        `vec4 mvPosition = vec4( transformed, 1.0 );
        #ifdef USE_INSTANCING
          mvPosition = instanceMatrix * mvPosition;
        #endif
        float swK = max( transformed.y, 0.0 );
        float swP = uTime * 1.2 + mvPosition.x * 0.31 + mvPosition.z * 0.23;
        mvPosition.x += sin( swP ) * 0.03 * swK * swK;
        mvPosition.z += cos( swP * 0.83 ) * 0.022 * swK * swK;
        mvPosition = modelViewMatrix * mvPosition;
        gl_Position = projectionMatrix * mvPosition;`
      );
  };
  const trunkMat = new THREE.MeshLambertMaterial({ color: '#6e543f' });
  const trng = mulberry(4242);
  const TPL = {
    canopy: [broadleaf(trng, 0), broadleaf(trng, 1), broadleaf(trng, 2), conifer(trng, 0), conifer(trng, 1)],
    trunk: new THREE.CylinderGeometry(0.09, 0.15, 1, 6).translate(0, 0.5, 0),
  };
  /* small shared canvas textures: flag, tee stripes, water ripples */
  const tex = (cv, srgb = true) => {
    const t = new THREE.CanvasTexture(cv);
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = maxAniso;
    return t;
  };
  const flagTex = (() => {
    const cv = mkCanvas(128, 80),
      g = cv.getContext('2d');
    const gr = g.createLinearGradient(0, 0, 128, 60);
    gr.addColorStop(0, '#10b853');
    gr.addColorStop(1, '#1a4e26');
    g.fillStyle = gr;
    g.fillRect(0, 0, 128, 80);
    const hl = g.createLinearGradient(0, 0, 0, 80);
    hl.addColorStop(0, 'rgba(255,255,255,.18)');
    hl.addColorStop(0.5, 'rgba(255,255,255,0)');
    g.fillStyle = hl;
    g.fillRect(0, 0, 128, 80);
    return tex(cv);
  })();
  const teeTex = (() => {
    const cv = mkCanvas(64, 64),
      g = cv.getContext('2d');
    g.fillStyle = '#9ce073';
    g.fillRect(0, 0, 64, 64);
    g.fillStyle = '#8ad364';
    g.fillRect(0, 32, 64, 32);
    const t = tex(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(0.5, 0.5);
    return t;
  })();
  const rippleTex = (() => {
    const cv = mkCanvas(256, 256),
      g = cv.getContext('2d'),
      r = mulberry(9);
    g.fillStyle = '#c9dfe9';
    g.fillRect(0, 0, 256, 256);
    g.lineCap = 'round';
    for (let k = 0; k < 70; k++) {
      const x = r() * 256,
        y = r() * 256,
        l = 10 + r() * 34,
        light = r() > 0.35;
      g.strokeStyle = light ? `rgba(255,255,255,${0.35 + r() * 0.5})` : `rgba(40,90,120,${0.15 + r() * 0.2})`;
      g.lineWidth = 1 + r() * 2.2;
      for (const ox of [-256, 0, 256])
        for (const oy of [-256, 0, 256]) {
          g.beginPath();
          g.moveTo(x + ox, y + oy);
          g.quadraticCurveTo(x + ox + l / 2, y + oy - 3, x + ox + l, y + oy);
          g.stroke();
        }
    }
    const t = tex(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  })();

  /* ---------- per-hole build ---------- */
  let cur = null;
  const m4 = new THREE.Matrix4(),
    q4 = new THREE.Quaternion(),
    v3 = new THREE.Vector3(),
    s3 = new THREE.Vector3(),
    col = new THREE.Color(),
    UP = new THREE.Vector3(0, 1, 0);
  function build(hole) {
    const L = layout(hole, state.course);
    const grp = new THREE.Group();
    const trash = [];
    const own = (x) => (trash.push(x), x);
    const lam = (c, extra) => own(new THREE.MeshLambertMaterial({ color: c, ...extra }));
    const { xmin, xmax, zmin, zmax } = L.bounds;
    const W = xmax - xmin,
      H = zmax - zmin,
      cx = (xmin + xmax) / 2,
      cz = (zmin + zmax) / 2;

    /* terrain */
    const tg = own(new THREE.PlaneGeometry(W, H, Math.ceil(W / 0.72), Math.ceil(H / 0.72)));
    tg.rotateX(-Math.PI / 2);
    const pa = tg.attributes.position;
    for (let i = 0; i < pa.count; i++) pa.setY(i, L.height(pa.getX(i) + cx, pa.getZ(i) + cz));
    tg.computeVertexNormals();
    const painted = paint(L);
    const ctex = own(tex(painted.color));
    const mtex = own(tex(painted.mask, false));
    const terrain = new THREE.Mesh(tg, own(new THREE.MeshLambertMaterial({ map: ctex, alphaMap: mtex, transparent: true, alphaTest: 0.004 })));
    terrain.position.set(cx, 0, cz);
    terrain.receiveShadow = true;
    grp.add(terrain);

    /* water: phong plane, alpha-mapped to the creek / pond, ripples drift (animated in the loop) */
    let waterMat = null;
    if (painted.water) {
      const wg = own(new THREE.PlaneGeometry(W, H));
      wg.rotateX(-Math.PI / 2);
      rippleTex.repeat.set(W / 7, H / 7);
      waterMat = own(
        new THREE.MeshPhongMaterial({
          color: '#4aa6d6',
          specular: '#f2fbff',
          shininess: 80,
          map: rippleTex,
          alphaMap: own(tex(painted.water, false)),
          transparent: true,
          depthWrite: false,
          opacity: 0.94,
        })
      );
      const wm = new THREE.Mesh(wg, waterMat);
      wm.position.set(cx, L.waterY, cz);
      wm.renderOrder = 2;
      wm.receiveShadow = true;
      grp.add(wm);
    }

    /* trees: one instanced mesh per template + one for all trunks */
    const lists = [[], [], [], [], []];
    L.trees.forEach((t) => lists[t.conifer ? 3 + (t.v % 2) : t.v].push(t));
    lists.forEach((list, k) => {
      if (!list.length) return;
      const im = new THREE.InstancedMesh(TPL.canopy[k], canopyMat, list.length);
      list.forEach((t, i) => {
        const y = L.height(t.x, t.z);
        const lift = t.conifer ? 0.3 * t.s : 0.9 * t.s;
        m4.compose(v3.set(t.x, y + lift - 0.05, t.z), q4.setFromAxisAngle(UP, t.rot), s3.set(t.s, t.s * (t.conifer ? 1.08 : 0.95), t.s));
        im.setMatrixAt(i, m4);
        im.setColorAt(i, col.set(t.col));
      });
      im.castShadow = true;
      im.frustumCulled = false;
      grp.add(im);
      trash.push(im);
    });
    if (L.trees.length) {
      const tr = new THREE.InstancedMesh(TPL.trunk, trunkMat, L.trees.length);
      L.trees.forEach((t, i) => {
        const y = L.height(t.x, t.z),
          h = (t.conifer ? 0.5 : 1.15) * t.s;
        m4.compose(v3.set(t.x, y - 0.2, t.z), q4.identity(), s3.set(t.s, h + 0.2, t.s));
        tr.setMatrixAt(i, m4);
      });
      tr.castShadow = true;
      tr.frustumCulled = false;
      grp.add(tr);
      trash.push(tr);
    }

    /* tee boxes (raised, striped tops) + tee markers on the main box */
    const teeTop = lam('#ffffff', { map: teeTex }),
      teeSide = lam('#5d9b45');
    const markerColor = GH.tee ? GH.tee(state.tee).color : '#ffffff';
    const markerMat = lam(markerColor === '#ffffff' ? '#f4f4f4' : markerColor);
    for (const t of L.tees) {
      const sh = new THREE.Shape();
      const w = t.w,
        l = t.l,
        r = 0.55;
      sh.moveTo(-w / 2 + r, -l / 2);
      sh.lineTo(w / 2 - r, -l / 2);
      sh.quadraticCurveTo(w / 2, -l / 2, w / 2, -l / 2 + r);
      sh.lineTo(w / 2, l / 2 - r);
      sh.quadraticCurveTo(w / 2, l / 2, w / 2 - r, l / 2);
      sh.lineTo(-w / 2 + r, l / 2);
      sh.quadraticCurveTo(-w / 2, l / 2, -w / 2, l / 2 - r);
      sh.lineTo(-w / 2, -l / 2 + r);
      sh.quadraticCurveTo(-w / 2, -l / 2, -w / 2 + r, -l / 2);
      const g = own(new THREE.ExtrudeGeometry(sh, { depth: 0.32, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.06, bevelSegments: 2, curveSegments: 5 }));
      g.rotateX(-Math.PI / 2);
      const m = new THREE.Mesh(g, [teeTop, teeSide]);
      const ty = L.height(t.x, t.z) - 0.14;
      m.position.set(t.x, ty, t.z);
      m.rotation.y = Math.atan2(t.tx, t.tz);
      m.castShadow = m.receiveShadow = true;
      grp.add(m);
      if (t.main) {
        const sg = own(new THREE.SphereGeometry(0.2, 14, 10));
        for (const sd of [-1, 1]) {
          const mk = new THREE.Mesh(sg, markerMat);
          const a = -t.l / 2 + 0.7;
          mk.position.set(t.x + t.tx * -a + t.nx * sd * 1.15, ty + 0.58, t.z + t.tz * -a + t.nz * sd * 1.15);
          mk.castShadow = true;
          grp.add(mk);
        }
      }
    }

    /* pin + waving flag (Figma flag gradient) */
    const pinY = L.height(L.pin.x, L.pin.z);
    const pinG = new THREE.Group();
    pinG.position.set(L.pin.x, pinY - 0.05, L.pin.z);
    const pole = new THREE.Mesh(own(new THREE.CylinderGeometry(0.055, 0.055, 3.7, 8).translate(0, 1.85, 0)), lam('#f6f6f6'));
    pole.castShadow = true;
    const tip = new THREE.Mesh(own(new THREE.SphereGeometry(0.1, 10, 8)), lam('#ffffff'));
    tip.position.y = 3.72;
    const flagGeo = own(new THREE.PlaneGeometry(1.65, 1.02, 14, 6).translate(0.825, 0, 0));
    const flag = new THREE.Mesh(flagGeo, lam('#ffffff', { map: flagTex, side: THREE.DoubleSide }));
    flag.position.y = 3.7 - 0.53;
    flag.castShadow = true;
    pinG.add(pole, tip, flag);
    grp.add(pinG);

    /* clubhouse with the red roof + two parked carts */
    if (L.house) {
      const h = L.house;
      const hg = new THREE.Group();
      const hy = L.height(h.x, h.z);
      hg.position.set(h.x, hy - 0.02, h.z);
      hg.rotation.y = Math.atan2(-h.uz, h.ux);
      const wall = lam('#f5f0e6'),
        roof = lam('#b8432f'),
        glass = lam('#3f4f5b'),
        wood = lam('#6c4a33');
      const body = new THREE.Mesh(own(new THREE.BoxGeometry(h.w, 2.3, h.d).translate(0, 1.15, 0)), wall);
      const rs = new THREE.Shape();
      rs.moveTo(-h.d / 2 - 0.5, 0);
      rs.lineTo(0, 1.6);
      rs.lineTo(h.d / 2 + 0.5, 0);
      rs.closePath();
      const rg = own(new THREE.ExtrudeGeometry(rs, { depth: h.w + 0.8, bevelEnabled: false }));
      rg.translate(0, 0, -(h.w + 0.8) / 2);
      rg.rotateY(Math.PI / 2);
      const rf = new THREE.Mesh(rg, [lam('#efe7d8'), roof]);
      rf.position.y = 2.3;
      const win = own(new THREE.BoxGeometry(0.9, 0.95, 0.08));
      const parts = [body, rf];
      for (const sd of [-1, 1])
        for (let k = 0; k < 6; k++) {
          const x = -h.w / 2 + 1.2 + (k * (h.w - 2.4)) / 5;
          if (sd > 0 && (k === 2 || k === 3)) continue;
          const wm = new THREE.Mesh(win, glass);
          wm.position.set(x, 1.3, sd * (h.d / 2 + 0.03));
          parts.push(wm);
        }
      const door = new THREE.Mesh(own(new THREE.BoxGeometry(1.5, 1.8, 0.1)), wood);
      door.position.set(0, 0.9, h.d / 2 + 0.04);
      parts.push(door);
      parts.forEach((p) => ((p.castShadow = true), (p.receiveShadow = true), hg.add(p)));
      /* carts */
      const cartBody = own(new THREE.BoxGeometry(0.85, 0.5, 1.5)),
        cartRoof = own(new THREE.BoxGeometry(0.95, 0.07, 1.3)),
        seat = own(new THREE.BoxGeometry(0.75, 0.4, 0.42));
      for (let k = 0; k < 2; k++) {
        const c = new THREE.Group();
        const b = new THREE.Mesh(cartBody, lam('#fbfbf8'));
        b.position.y = 0.42;
        const r2 = new THREE.Mesh(cartRoof, lam('#e7e0cf'));
        r2.position.y = 1.42;
        const st = new THREE.Mesh(seat, lam('#2c3136'));
        st.position.set(0, 0.85, 0.2);
        const post = new THREE.Mesh(own(new THREE.BoxGeometry(0.05, 0.75, 0.05)), lam('#d7d2c6'));
        post.position.set(0.38, 1.05, -0.45);
        const post2 = post.clone();
        post2.position.x = -0.38;
        c.add(b, r2, st, post, post2);
        c.traverse((o) => (o.castShadow = true));
        c.position.set(h.pside * (h.w / 2 + 1.0 + k * 1.15), 0, h.d / 2 + 0.9);
        c.rotation.y = 0.12 * (k ? 1 : -1);
        hg.add(c);
      }
      grp.add(hg);
    }

    /* sun + shadow frustum fitted to this hole */
    const half = Math.max(W, H) / 2 + 6;
    sun.position.copy(L.center).addScaledVector(SUN, 140);
    sun.target.position.copy(L.center);
    Object.assign(sun.shadow.camera, { left: -half, right: half, top: half, bottom: -half, near: 40, far: 260 });
    sun.shadow.camera.updateProjectionMatrix();

    scene.add(grp);
    return {
      L,
      grp,
      terrain,
      waterMat,
      flagGeo,
      flagBase: Float32Array.from(flagGeo.attributes.position.array),
      pinG,
      pinY,
      dispose() {
        scene.remove(grp);
        trash.forEach((x) => x.dispose && x.dispose());
      },
    };
  }

  /* ---------- player, aim and the metre scale for this hole ---------- */
  function place() {
    const L = cur.L,
      b = state.ball;
    const T = L.mainTee;
    cur.teePt = { x: T.x - T.tx * 0.6, z: T.z - T.tz * 0.6, y: L.height(T.x, T.z) + 0.25 };
    cur.pinPt = { x: L.pin.x, z: L.pin.z, y: cur.pinY };
    cur.lenM = lengthOf(cur.L.hole, state.tee);
    cur.carried = 0;
    cur.ballPt = null;
    if (b) {
      const carried = Math.max(0, b.carried || 0),
        toPin = Math.max(1, b.toPin || cur.lenM);
      const frac = carried / (carried + toPin);
      const s = frac * L.len,
        p = L.at(s),
        o = carried > 0 ? L.ballO : 0;
      const x = carried > 0 ? p.x + p.nx * o : cur.teePt.x,
        z = carried > 0 ? p.z + p.nz * o : cur.teePt.z;
      cur.ballPt = { x, z, y: carried > 0 ? L.height(x, z) + 0.06 : cur.teePt.y, s };
      cur.carried = carried;
      cur.toPin = toPin;
    }
    const from = cur.ballPt || cur.teePt;
    const s0 = cur.ballPt ? cur.ballPt.s : 0;
    let aim;
    if (L.par === 3 && !cur.carried) aim = { x: L.G.x, z: L.G.z };
    else if (cur.ballPt && cur.carried) {
      const p = L.at(s0 + (L.len - s0) * 0.58);
      aim = { x: p.x, z: p.z };
    } else {
      const p = L.at(L.land);
      aim = { x: p.x, z: p.z };
    }
    cur.aimDefault = aim;
    cur.aim = { ...aim };
    const dist = (a, c) => Math.hypot(a.x - c.x, a.z - c.z);
    cur.mpu = cur.ballPt && cur.carried ? cur.toPin / Math.max(1, dist(from, cur.pinPt)) : cur.lenM / Math.max(1, dist(from, aim) + dist(aim, cur.pinPt));
    container.setAttribute('aria-label', opts.label || describe(L.hole, cur.lenM, state.ball));
    aimChanged(false);
  }
  let aimAnim = null;
  function aimChanged(user) {
    if (!cur) return;
    const from = cur.ballPt || cur.teePt;
    const toAim = Math.round(Math.hypot(cur.aim.x - from.x, cur.aim.z - from.z) * cur.mpu);
    const aimToPin = Math.round(Math.hypot(cur.aim.x - cur.pinPt.x, cur.aim.z - cur.pinPt.z) * cur.mpu);
    cur.toAimM = toAim;
    cur.aimToPinM = aimToPin;
    tagAim.lastChild.textContent = fmtM(toAim);
    tagPin.lastChild.textContent = fmtM(aimToPin);
    if (user && opts.onAim) opts.onAim({ toAim, aimToPin });
  }

  /* ---------- camera rig ---------- */
  const rig = { cx: 0, cy: 0, cz: 0, D: 160, az: 0, el: 0.92 };
  const EL = 0.92; // ≈ 53°
  const user = { az: 0, el: 0, zoom: 1 };
  let W = 1,
    H = 1;
  const place3 = (p) => {
    const az = p.az,
      el = p.el,
      D = p.D;
    camera.position.set(p.cx + D * Math.sin(az) * Math.cos(el), p.cy + D * Math.sin(el), p.cz + D * Math.cos(az) * Math.cos(el));
    camera.lookAt(p.cx, p.cy, p.cz);
    camera.updateMatrixWorld();
  };
  const right = new THREE.Vector3(),
    up = new THREE.Vector3();
  function fit() {
    if (!cur) return;
    const ins = typeof opts.insets === 'function' ? opts.insets() : opts.insets || {};
    const t = ins.top || 0,
      b = ins.bottom || 0,
      l = ins.left || 0,
      r = ins.right || 0;
    const tx0 = -1 + (2 * l) / W,
      tx1 = 1 - (2 * r) / W,
      ty0 = -1 + (2 * b) / H,
      ty1 = 1 - (2 * t) / H;
    const p = { cx: cur.L.center.x, cy: 0, cz: cur.L.center.z, D: 170, az: cur.L.chordAz, el: EL };
    const tanH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    for (let k = 0; k < 14; k++) {
      place3(p);
      let x0 = 9,
        x1 = -9,
        y0 = 9,
        y1 = -9;
      for (const v of cur.L.fitPts) {
        v3.copy(v).project(camera);
        x0 = Math.min(x0, v3.x);
        x1 = Math.max(x1, v3.x);
        y0 = Math.min(y0, v3.y);
        y1 = Math.max(y1, v3.y);
      }
      const ex = (x0 + x1) / 2 - (tx0 + tx1) / 2,
        ey = (y0 + y1) / 2 - (ty0 + ty1) / 2;
      right.setFromMatrixColumn(camera.matrixWorld, 0);
      up.setFromMatrixColumn(camera.matrixWorld, 1);
      const hh = p.D * tanH,
        hw = hh * camera.aspect;
      p.cx += right.x * ex * hw + up.x * ey * hh;
      p.cy += right.y * ex * hw + up.y * ey * hh;
      p.cz += right.z * ex * hw + up.z * ey * hh;
      p.D *= Math.max((x1 - x0) / (tx1 - tx0), (y1 - y0) / (ty1 - ty0));
    }
    Object.assign(rig, p);
  }
  /* key poses: aerial (high, turned), swoop (low over the tee) → the framed tee view */
  const aerial = () => ({ cx: cur.L.center.x, cy: 0, cz: cur.L.center.z, D: rig.D * 1.5, az: rig.az - 0.75, el: 1.36 });
  const swoop = () => {
    const T = cur.L.mainTee;
    return { cx: lerp(rig.cx, T.x, 0.55), cy: rig.cy * 0.4, cz: lerp(rig.cz, T.z, 0.55), D: rig.D * 0.62, az: rig.az + 0.32, el: 0.5 };
  };
  const KEYS = ['cx', 'cy', 'cz', 'D', 'az', 'el'];
  const mixPose = (a, b, t) => {
    const o = {};
    KEYS.forEach((k) => (o[k] = k === 'D' ? a.D * Math.pow(b.D / a.D, t) : lerp(a[k], b[k], t)));
    return o;
  };
  const bezPose = (a, c, b, t) => mixPose(mixPose(a, c, t), mixPose(c, b, t), t);
  let tween = null,
    lastPose = { ...rig };
  function tweenTo(o) {
    if (tween && tween.res) tween.res(false);
    return new Promise((res) => {
      tween = { ...o, t0: performance.now(), res };
      kick();
    });
  }
  function poseNow(now) {
    if (!tween) return rig;
    const k = clamp((now - tween.t0) / tween.dur, 0, 1),
      e = tween.ease(k);
    const to = tween.toRig ? rig : tween.b;
    const p = tween.c ? bezPose(tween.a, tween.c, to, e) : mixPose(tween.a, to, e);
    if (k >= 1) {
      const r = tween.res;
      tween = null;
      r && r(true);
    }
    return p;
  }

  /* ---------- overlay: ball flight tracer, landing, rings, aim line, tags ---------- */
  let ovStart = null;
  const TRACER = 1050;
  const _p = new THREE.Vector3();
  const proj = (x, y, z) => {
    _p.set(x, y, z).project(camera);
    return [(_p.x + 1) * 0.5 * W, (1 - _p.y) * 0.5 * H];
  };
  const dPath = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('');
  function partial(pts, f) {
    if (f >= 1) return pts;
    if (f <= 0) return [];
    let total = 0;
    const segs = [];
    for (let i = 1; i < pts.length; i++) {
      const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      segs.push(l);
      total += l;
    }
    let left = total * f;
    const out = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      if (left >= segs[i - 1]) {
        out.push(pts[i]);
        left -= segs[i - 1];
      } else {
        const k = left / segs[i - 1];
        out.push([lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)]);
        break;
      }
    }
    return out;
  }
  const put = (el, x, y, o, s = 1, anchor = '-50%,-50%') => {
    el.style.opacity = o.toFixed(3);
    el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(${anchor}) scale(${s.toFixed(3)})`;
  };
  const clampX = (x, w) => clamp(x, 8 + w / 2, W - 8 - w / 2);
  const clampY = (y) => clamp(y, 18, H - 18);
  let aimScreen = null;
  function drawOverlay(now) {
    if (!cur || ovStart == null || now < ovStart) {
      [me, tagCarry, tagAim, tagPin].forEach((e) => (e.style.opacity = 0));
      svg.style.opacity = 0;
      aimScreen = null;
      return;
    }
    svg.style.opacity = 1;
    const t = still ? 1e7 : now - ovStart;
    const hasBall = !!cur.ballPt,
      flight = hasBall && cur.carried > 0;
    const from = cur.ballPt || cur.teePt;
    const T = cur.teePt;
    /* 1 · tracer: the drive drawn as an arc, the ball rides its head, then lands */
    let landT = t;
    if (flight) {
      const k = clamp(t / TRACER, 0, 1),
        e = 1 - Math.pow(1 - k, 2.2);
      const dx = from.x - T.x,
        dz = from.z - T.z,
        d = Math.hypot(dx, dz),
        apex = d * 0.17;
      const arc = [];
      for (let i = 0; i <= 44; i++) {
        const u = i / 44;
        arc.push(proj(T.x + dx * u, lerp(T.y, from.y, u) + apex * 4 * u * (1 - u), T.z + dz * u));
      }
      trailEl.setAttribute('d', dPath(partial(arc, e)));
      trailEl.style.opacity = k < 1 ? 1 : 0.82;
      if (k < 1) {
        const u = e;
        const [bx, by] = proj(T.x + dx * u, lerp(T.y, from.y, u) + apex * 4 * u * (1 - u), T.z + dz * u);
        const [sx, sy] = proj(T.x + dx * u, lerp(T.y, from.y, u), T.z + dz * u);
        ballEl.setAttribute('cx', bx.toFixed(1));
        ballEl.setAttribute('cy', by.toFixed(1));
        bshEl.setAttribute('cx', sx.toFixed(1));
        bshEl.setAttribute('cy', sy.toFixed(1));
        ballEl.style.opacity = bshEl.style.opacity = 1;
      } else ballEl.style.opacity = bshEl.style.opacity = 0;
      const [mx, my] = arc[22];
      const ct = clamp((t - TRACER * 0.55) / 380, 0, 1);
      tagCarry.textContent = fmtM(cur.carried);
      put(tagCarry, clampX(mx, 56), clampY(my - 4), ct, 0.85 + 0.15 * easeBack(ct));
      landT = t - TRACER;
    } else {
      trailEl.setAttribute('d', '');
      ballEl.style.opacity = bshEl.style.opacity = 0;
    }
    /* 2 · player marker pops in where the ball landed */
    const [fx, fy] = proj(from.x, from.y + 0.1, from.z);
    if (hasBall) {
      const k = clamp(landT / 520, 0, 1);
      put(me, fx, fy, clamp(k * 3, 0, 1), 0.4 + 0.6 * easeBack(k), '0,0');
    } else me.style.opacity = 0;
    /* 3 · distance rings ripple out from the ball (25 / 50 / 75 m), then breathe; a soft sonar keeps pulsing */
    const radii = [25, 50, 75].map((m) => m / cur.mpu);
    const ty = from.y + 0.08;
    /* on the tee the full circles would spill off the back of the island: draw arcs that face the shot instead */
    const atTee = !flight;
    const dir = Math.atan2(cur.aim.z - from.z, cur.aim.x - from.x),
      span = atTee ? 0.62 : Math.PI,
      segs = atTee ? 18 : 56;
    const ringPath = (r) => {
      const pts = [];
      for (let k = 0; k <= segs; k++) {
        const a = dir - span + (k / segs) * 2 * span;
        pts.push(proj(from.x + Math.cos(a) * r, ty, from.z + Math.sin(a) * r));
      }
      return dPath(pts) + (atTee ? '' : 'Z');
    };
    if (hasBall) {
      const tt = now / 1000;
      radii.forEach((r, i) => {
        const k = clamp((landT - 120 - i * 120) / 700, 0, 1);
        const breathe = still ? 1 : 1 + 0.018 * Math.sin(tt * 1.7 - i * 0.8);
        ringEls[i].setAttribute('d', k > 0 ? ringPath(r * easeBack(k) * breathe) : '');
        ringEls[i].style.opacity = (still ? 0.7 : 0.5 + 0.28 * Math.sin(tt * 2 - i * 0.9)) * clamp(k * 2, 0, 1);
      });
      if (!still && landT > 900) {
        const ph = ((landT - 900) % 2800) / 2800;
        ringEls[3].setAttribute('d', ringPath(radii[2] * lerp(0.12, 1.12, easeOut(ph))));
        ringEls[3].style.opacity = (1 - ph) * 0.55;
      } else ringEls[3].setAttribute('d', '');
      const gk = clamp((landT - 100) / 600, 0, 1);
      glowEl.setAttribute('d', gk > 0 && !atTee ? ringPath(radii[2] * 1.05) : '');
      glowEl.style.opacity = gk;
    } else {
      ringEls.forEach((r) => r.setAttribute('d', ''));
      glowEl.setAttribute('d', '');
    }
    /* 4 · aim line: ball → aim → pin, drawn in after the landing */
    let A = cur.aim;
    if (aimAnim) {
      const k = clamp((now - aimAnim.t0) / 380, 0, 1),
        e = easeOut(k);
      A = { x: lerp(aimAnim.a.x, aimAnim.b.x, e), z: lerp(aimAnim.a.z, aimAnim.b.z, e) };
      if (k >= 1) aimAnim = null;
    }
    const ay = cur.L.height(A.x, A.z) + 0.08;
    const pA = proj(A.x, ay, A.z),
      pP = proj(cur.pinPt.x, cur.pinPt.y + 0.08, cur.pinPt.z);
    const pk = easeInOut(clamp((landT - (hasBall ? 260 : 0)) / 700, 0, 1));
    planEl.setAttribute('d', dPath(partial([[fx, fy], pA, pP], pk)));
    const ak = clamp((landT - (hasBall ? 600 : 350)) / 360, 0, 1);
    aimEl.setAttribute('transform', `translate(${pA[0].toFixed(1)} ${pA[1].toFixed(1)}) scale(${(0.5 + 0.5 * easeBack(ak)).toFixed(3)})`);
    aimEl.style.opacity = ak;
    aimScreen = ak > 0.5 ? pA : null;
    /* 5 · tags: to the aim point (violet when it is the first shot), aim → pin by the flag */
    const tk = clamp((landT - (hasBall ? 750 : 500)) / 380, 0, 1);
    const mid = [(fx + pA[0]) / 2, (fy + pA[1]) / 2];
    if (!flight) {
      tagCarry.textContent = fmtM(cur.toAimM);
      put(tagCarry, clampX(mid[0], 56), clampY(mid[1]), tk, 0.85 + 0.15 * easeBack(tk));
      tagAim.style.opacity = 0;
    } else {
      /* after the drive the next shot is short on screen: the midpoint would sit on the player marker, so the
         chip rides beside the aim ring instead (on the side away from the pin tag), above it when that is tight */
      const side = pP[0] >= pA[0] ? -1 : 1;
      let ax = pA[0] + side * 50,
        ay = pA[1];
      if (Math.abs(ax - fx) < 70 && Math.abs(ay - fy) < 52) (ax = pA[0]), (ay = pA[1] - 30);
      put(tagAim, clampX(ax, 64), clampY(ay), tk, 0.85 + 0.15 * easeBack(tk));
    }
    const [qx, qy] = proj(cur.pinPt.x, cur.pinPt.y + 3.9, cur.pinPt.z);
    put(tagPin, clampX(qx + 34, 64), clampY(qy - 2), tk, 0.85 + 0.15 * easeBack(tk));
  }

  /* ---------- swap holes ---------- */
  const DBG = /h3ddebug/.test(location.search);
  function swap(hole) {
    const t0 = performance.now();
    if (cur) cur.dispose();
    state.hole = hole;
    cur = build(hole);
    renderer.shadowMap.needsUpdate = true;
    place();
    if (DBG) console.log('h3d build', hole.n, Math.round(performance.now() - t0), 'ms', cur.L.trees.length, 'trees', 'lite', lite);
  }

  /* ---------- size ---------- */
  function resize() {
    const r = container.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    fit();
    kick();
  }

  /* ---------- gestures: orbit with inertia, pinch / wheel zoom, tap = aim, drag the aim ring, double-tap = reset ---------- */
  const ptrs = new Map();
  let drag = null,
    inertia = null,
    pinch = null,
    lastTap = null,
    userTween = null,
    gestureNotified = false;
  const EL_MIN = 0.55,
    EL_MAX = 1.42;
  const notify = () => {
    if (!gestureNotified) {
      gestureNotified = true;
      opts.onInteract && opts.onInteract();
    }
  };
  const ray = new THREE.Raycaster(),
    ndc = new THREE.Vector2();
  function pick(px, py) {
    if (!cur) return null;
    ndc.set((px / W) * 2 - 1, -(py / H) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObject(cur.terrain, false)[0];
    if (!hit) return null;
    const { x, z } = hit.point;
    return cur.L.islandA(cur.L.islandD(x, z)) > 0.45 ? { x, z } : null;
  }
  function setAim(p, animate) {
    if (!p) return;
    aimAnim = animate && !still ? { a: { ...cur.aim }, b: p, t0: performance.now() } : null;
    cur.aim = p;
    aimChanged(true);
    kick();
  }
  function resetView() {
    inertia = null;
    userTween = still ? null : { from: { ...user }, t0: performance.now() };
    if (still) Object.assign(user, { az: 0, el: 0, zoom: 1 });
    if (cur) setAim({ ...cur.aimDefault }, true);
    kick();
  }
  const local = (e) => {
    const r = canvas.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
    const [px, py] = local(e);
    ptrs.set(e.pointerId, { x: px, y: py });
    inertia = null;
    userTween = null;
    gestureNotified = false;
    if (ptrs.size === 1) {
      const onAim = aimScreen && Math.hypot(px - aimScreen[0], py - aimScreen[1]) < 28;
      drag = { x: px, y: py, x0: px, y0: py, t: performance.now(), t0: performance.now(), vaz: 0, vel: 0, moved: false, aim: onAim };
    } else if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()];
      pinch = { d0: Math.hypot(a.x - b.x, a.y - b.y), z0: user.zoom };
      if (drag) drag.moved = true;
    }
    container.classList.add('is-grabbing');
    kick();
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!ptrs.has(e.pointerId)) return;
    const [px, py] = local(e);
    ptrs.set(e.pointerId, { x: px, y: py });
    const now = performance.now();
    if (pinch && ptrs.size >= 2) {
      const [a, b] = [...ptrs.values()];
      user.zoom = clamp((pinch.z0 * pinch.d0) / Math.max(20, Math.hypot(a.x - b.x, a.y - b.y)), 0.5, 1.45);
      notify();
    } else if (drag) {
      if (!drag.moved && Math.hypot(px - drag.x0, py - drag.y0) > 6) drag.moved = true;
      if (drag.moved) {
        notify();
        if (drag.aim) setAim(pick(px, py), false);
        else {
          const dt = Math.max(1, now - drag.t);
          const daz = -(px - drag.x) * 0.0058,
            del = (py - drag.y) * 0.0045;
          user.az = clamp(user.az + daz, -0.6, 0.6);
          user.el = clamp(user.el + del, EL_MIN - rig.el, EL_MAX - rig.el);
          drag.vaz = lerp(drag.vaz, daz / dt, 0.6);
          drag.vel = lerp(drag.vel, del / dt, 0.6);
        }
      }
      drag.x = px;
      drag.y = py;
      drag.t = now;
    }
    kick();
  });
  const up_ = (e) => {
    if (!ptrs.has(e.pointerId)) return;
    const [px, py] = local(e);
    ptrs.delete(e.pointerId);
    if (ptrs.size) return;
    container.classList.remove('is-grabbing');
    const now = performance.now();
    if (drag && !drag.moved && !pinch && e.type === 'pointerup') {
      if (lastTap && now - lastTap.t < 330 && Math.hypot(px - lastTap.x, py - lastTap.y) < 30) {
        lastTap = null;
        notify();
        resetView();
      } else {
        lastTap = { t: now, x: px, y: py };
        const p = pick(px, py);
        if (p) {
          notify();
          setAim(p, true);
        }
      }
    } else if (drag && drag.moved && !drag.aim && !pinch && now - drag.t < 90 && !still) inertia = { vaz: drag.vaz, vel: drag.vel };
    drag = null;
    pinch = null;
    kick();
  };
  canvas.addEventListener('pointerup', up_);
  canvas.addEventListener('pointercancel', up_);
  canvas.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      gestureNotified = false;
      notify();
      user.zoom = clamp(user.zoom * Math.exp(e.deltaY * 0.0012), 0.5, 1.45);
      kick();
    },
    { passive: false }
  );

  /* ---------- loop (paused when hidden / off-screen; ~30 fps when idle) ---------- */
  let raf = 0,
    last = performance.now(),
    lastDraw = 0,
    inView = true,
    alive = true;
  const perf = { t: 0, n: 0, wait: 2.5 };
  function frame(now) {
    raf = 0;
    if (!alive || document.hidden || !inView) return;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const ovBusy = ovStart != null && now - ovStart < 4200;
    const busy = !!(tween || drag || inertia || pinch || userTween || aimAnim || ovBusy);
    if (!still) raf = requestAnimationFrame(frame);
    if (!still && !busy && now - lastDraw < 31) return;
    /* adaptive resolution: drop the pixel ratio if the device can't hold ~40 fps */
    if (!still && busy && dt > 0) {
      if (perf.wait > 0) perf.wait -= dt;
      else {
        perf.t += dt;
        perf.n++;
        if (perf.t > 2 && perf.n > 50) {
          if (perf.n / perf.t < 40 && dpr > 1) {
            dpr = Math.max(1, dpr - 0.35);
            renderer.setPixelRatio(dpr);
            renderer.setSize(W, H, false);
          }
          perf.t = perf.n = 0;
        }
      }
    }
    lastDraw = now;
    render(now, dt);
  }
  function render(now = performance.now(), dt = 0) {
    if (!cur) return;
    const tt = now / 1000;
    timeU.value = still ? 0 : tt;
    if (inertia) {
      const ms = dt * 1000;
      user.az = clamp(user.az + inertia.vaz * ms, -0.6, 0.6);
      user.el = clamp(user.el + inertia.vel * ms, EL_MIN - rig.el, EL_MAX - rig.el);
      const f = Math.exp(-dt * 3.2);
      inertia.vaz *= f;
      inertia.vel *= f;
      if (Math.abs(inertia.vaz) + Math.abs(inertia.vel) < 2e-6) inertia = null;
    }
    if (userTween) {
      const k = easeInOut(clamp((now - userTween.t0) / 700, 0, 1));
      user.az = lerp(userTween.from.az, 0, k);
      user.el = lerp(userTween.from.el, 0, k);
      user.zoom = lerp(userTween.from.zoom, 1, k);
      if (k >= 1) userTween = null;
    }
    const p = poseNow(now);
    lastPose = p;
    const sway = still ? 0 : 1;
    const az = p.az + user.az + sway * (0.026 * Math.sin(tt * 0.41) + 0.008 * Math.sin(tt * 0.97));
    const el = clamp(p.el + user.el + sway * 0.011 * Math.sin(tt * 0.33 + 1), 0.3, 1.45);
    place3({ ...p, az, el, D: p.D * user.zoom });
    /* flag waves (a travelling wave, stronger at the fly end); water ripples drift */
    if (!still) {
      const pos = cur.flagGeo.attributes.position,
        b = cur.flagBase;
      for (let i = 0; i < pos.count; i++) {
        const x = b[i * 3],
          k = x / 1.65;
        pos.array[i * 3 + 2] = Math.sin(x * 2.6 - tt * 5.4) * 0.17 * k + Math.sin(x * 4.3 - tt * 7.6 + b[i * 3 + 1] * 2) * 0.045 * k;
        pos.array[i * 3 + 1] = b[i * 3 + 1] - k * k * 0.07;
      }
      pos.needsUpdate = true;
      cur.flagGeo.computeVertexNormals();
      if (cur.waterMat) {
        rippleTex.offset.set(tt * 0.018, tt * 0.011);
        cur.waterMat.emissive.setRGB(0.02 + 0.015 * Math.sin(tt * 1.3), 0.03 + 0.02 * Math.sin(tt * 1.3), 0.05 + 0.03 * Math.sin(tt * 1.3));
      }
    }
    /* flag faces the camera, three-quarter turn so the cloth reads */
    cur.pinG.rotation.y = az - 0.55;
    const r0 = performance.now();
    renderer.render(scene, camera);
    if (DBG) console.log('h3d frame', Math.round(performance.now() - r0), 'ms');
    drawOverlay(now);
    /* QA hooks: data-h3d="ready" after the first frame, "settled" once the camera and overlays have landed */
    const st = !tween && ovStart != null && (still || now - ovStart > 2600) ? 'settled' : 'ready';
    if (container.dataset.h3d !== st) container.dataset.h3d = st;
  }
  function kick() {
    if (!alive) return;
    if (still) {
      if (!raf)
        raf = requestAnimationFrame((n) => {
          raf = 0;
          render(n, 0);
          if (drag || inertia || userTween) kick();
        });
      return;
    }
    if (!raf && !document.hidden && inView) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
  const onVis = () => kick();
  document.addEventListener('visibilitychange', onVis);
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((en) => ((inView = en[0].isIntersecting), kick())) : null;
  io && io.observe(container);
  const ro = 'ResizeObserver' in window ? new ResizeObserver(() => resize()) : null;
  ro && ro.observe(container);

  /* ---------- go: build, frame, precompile, then the aerial intro ---------- */
  swap(state.hole);
  resize();
  const intro = opts.intro !== false && !still;
  if (intro) {
    place3(aerial());
    try {
      renderer.compile(scene, camera);
    } catch (e) {}
    requestAnimationFrame(() => {
      stage.classList.add('is-in');
      const dur = state.mode === 'tour' ? 3000 : 2500;
      tweenTo({ a: aerial(), c: swoop(), toRig: true, dur, ease: easeInOut });
      ovStart = performance.now() + dur * 0.72;
    });
  } else {
    stage.classList.add('is-in');
    ovStart = performance.now();
    kick();
  }

  let seq = 0;
  const api = {
    webgl: true,
    async setHole(h, o = {}) {
      const my = ++seq;
      if (o.course) state.course = o.course;
      if (o.tee) state.tee = o.tee;
      if ('ball' in o) state.ball = o.ball;
      const hole = resolveHole(h, state.course);
      const instant = still || o.instant || document.hidden || !inView;
      if (instant) {
        tween = null;
        swap(hole);
        fit();
        Object.assign(user, { az: 0, el: 0, zoom: 1 });
        ovStart = performance.now();
        kick();
        return true;
      }
      /* fly up and away from this hole while it fades … */
      ovStart = null;
      stage.classList.remove('is-in');
      const ok = await tweenTo({ a: { ...lastPose }, b: aerial(), dur: 620, ease: easeIn });
      if (!ok || my !== seq) return false;
      await new Promise((r) => setTimeout(r, 30));
      if (my !== seq) return false;
      /* … and glide down into the next one */
      swap(hole);
      fit();
      Object.assign(user, { az: 0, el: 0, zoom: 1 });
      inertia = userTween = null;
      place3(aerial());
      stage.classList.add('is-in');
      const dur = state.mode === 'tour' ? 2700 : 1900;
      ovStart = performance.now() + dur * 0.7;
      return tweenTo({ a: aerial(), c: swoop(), toRig: true, dur, ease: easeInOut });
    },
    setBall(b) {
      state.ball = b;
      if (!cur) return;
      place();
      ovStart = performance.now();
      kick();
    },
    reset: resetView,
    refit() {
      fit();
      kick();
    },
    get hole() {
      return state.hole;
    },
    destroy() {
      alive = false;
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      io && io.disconnect();
      ro && ro.disconnect();
      if (cur) cur.dispose();
      TPL.canopy.forEach((g) => g.dispose());
      TPL.trunk.dispose();
      [canopyMat, trunkMat, flagTex, teeTex, rippleTex].forEach((x) => x.dispose());
      if (tween && tween.res) tween.res(false);
      tween = null;
      renderer.dispose();
      renderer.forceContextLoss();
      stage.remove();
    },
  };
  return api;
}

window.GHHole3D = { mount };
