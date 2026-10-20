import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { mono } from '../../fonts';
import { color } from '../theme';
import { clamp01, io, linear, seg, snappyAt, springAt } from '../anim';
import { ANGLES, EDGE, GAP_L, GAP_R, HULL, L, L_HOLE, L_OUT, R, R_HOLE, R_OUT, VH, VW, XMAX, YMAX, fmt, type Pt } from '../symbol';

// "Desenho de construção" azul em 9:16 — construção por usinagem, diferente do blueprint preto (que desenha linhas):
// 01 placa hexagonal sólida → 02 corte da fenda central + linha de varredura que usina os contornos reais
// → 03 furos puncionados (os giros do cérebro) → 04 varredura de brilho revela o símbolo sólido → especificação.
export const BLUEPRINT_FRAMES = 330;

const K = 4.1;
const OX = 239;
const OY = 390;
const AXIS = VW / 2;
const GAP_HALF = (GAP_R - GAP_L) / 2;
const P = (x: number, y: number): Pt => [OX + x * K, OY + y * K];

const T = {
  grid: [0, 0.6],
  over: [0.1, 0.6],
  title: [0.3, 1.4],
  small: [1.0, 1.6],
  rule: [0.4, 1.2],
  plate: 1.0,
  axis: [1.2, 2.0],
  dimW: [1.6, 2.4],
  dimH: [1.8, 2.6],
  slot: [2.8, 3.6],
  scan: [3.5, 5.0],
  dimGap: [4.0, 4.7],
  dimHalf: [4.2, 4.9],
  cutters: [5.2, 5.7],
  punch: 5.8,
  arcs: 6.4,
  dimEdge: [6.6, 7.2],
  sweep: [7.2, 8.2],
  aux: [7.2, 8.0],
  spec: 8.0,
} as const;

const type = (s: string, p: number) => s.slice(0, Math.round(p * s.length));

type MonoProps = {
  x: number;
  y: number;
  size?: number;
  weight?: number;
  ls?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  opacity?: number;
  upper?: boolean;
  transform?: string;
  children: React.ReactNode;
};
const Mono: React.FC<MonoProps> = ({ x, y, size = 15, weight = 500, ls = 2, fill = '#fff', anchor = 'start', opacity = 1, upper = true, transform, children }) => (
  <text
    x={x}
    y={y}
    fontFamily={mono}
    fontSize={size}
    fontWeight={weight}
    letterSpacing={ls}
    fill={fill}
    textAnchor={anchor}
    opacity={opacity}
    transform={transform}
    style={{ textTransform: upper ? 'uppercase' : 'none' }}
  >
    {children}
  </text>
);

const dash = { stroke: '#fff', strokeOpacity: 0.55, strokeWidth: 1, strokeDasharray: '5 5', fill: 'none' } as const;
const plateStyle = { fill: '#fff', fillOpacity: 0.12, stroke: '#fff', strokeOpacity: 0.9, strokeWidth: 1.8, strokeLinejoin: 'round' as const, vectorEffect: 'non-scaling-stroke' as const };

// Cota com setas: chamadas aparecem, a linha cresce a partir do meio, o rótulo entra por último.
const Dim: React.FC<{ a: Pt; b: Pt; label: string; off: number; vertical?: boolean; p: number }> = ({ a, b, label, off, vertical, p }) => {
  const [x1, y1] = P(a[0], a[1]);
  const [x2, y2] = P(b[0], b[1]);
  const sg = off > 0 ? 1 : -1;
  const ext = clamp01(p * 2.5);
  const lineP = clamp01((p - 0.15) / 0.6);
  const lab = clamp01((p - 0.7) / 0.3);
  if (p <= 0) return null;
  if (!vertical) {
    const y = y1 + off;
    const mx = (x1 + x2) / 2;
    return (
      <g>
        <line x1={x1} y1={y1 + 6 * sg} x2={x1} y2={y + 8 * sg} {...dash} opacity={ext} />
        <line x1={x2} y1={y2 + 6 * sg} x2={x2} y2={y + 8 * sg} {...dash} opacity={ext} />
        {lineP > 0.04 && (
          <line x1={mx - (mx - x1) * lineP} y1={y} x2={mx + (x2 - mx) * lineP} y2={y} stroke="#fff" strokeOpacity={0.85} strokeWidth={1} markerStart="url(#bp-ar)" markerEnd="url(#bp-ar)" />
        )}
        <Mono x={mx} y={y + (sg > 0 ? 24 : -10)} size={17} weight={600} ls={1} anchor="middle" upper={false} opacity={lab}>
          {label}
        </Mono>
      </g>
    );
  }
  const x = x1 + off;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <line x1={x1 + 6 * sg} y1={y1} x2={x + 8 * sg} y2={y1} {...dash} opacity={ext} />
      <line x1={x2 + 6 * sg} y1={y2} x2={x + 8 * sg} y2={y2} {...dash} opacity={ext} />
      {lineP > 0.04 && (
        <line x1={x} y1={my - (my - y1) * lineP} x2={x} y2={my + (y2 - my) * lineP} stroke="#fff" strokeOpacity={0.85} strokeWidth={1} markerStart="url(#bp-ar)" markerEnd="url(#bp-ar)" />
      )}
      <Mono x={0} y={0} size={17} weight={600} ls={1} anchor="middle" upper={false} opacity={lab} transform={`translate(${x + (sg > 0 ? 22 : -12)} ${my}) rotate(-90)`}>
        {label}
      </Mono>
    </g>
  );
};

// Arco de ângulo (dourado) medido a partir da horizontal.
const Arc: React.FC<{ v: Pt; to: Pt; p: number; r?: number }> = ({ v, to, p, r = 54 }) => {
  const [cx, cy] = P(v[0], v[1]);
  const a1 = 0;
  const a2 = (Math.atan2(to[1] - v[1], to[0] - v[0]) * 180) / Math.PI;
  const rad = (d: number) => (d * Math.PI) / 180;
  const p1 = [cx + r * Math.cos(rad(a1)), cy + r * Math.sin(rad(a1))];
  const p2 = [cx + r * Math.cos(rad(a2)), cy + r * Math.sin(rad(a2))];
  const sweep = (((a2 - a1) % 360) + 360) % 360;
  const big = sweep > 180 ? 1 : 0;
  const deg = Math.abs((((a2 - a1 + 540) % 360) + 360) % 360 - 180);
  const am = rad(a1 + sweep / 2);
  const lab = clamp01((p - 0.55) / 0.45);
  if (p <= 0) return null;
  return (
    <g>
      <line x1={cx} y1={cy} x2={cx + (r + 10) * clamp01(p * 3)} y2={cy} {...dash} />
      <path d={`M${p1[0]},${p1[1]} A${r},${r} 0 ${big} 1 ${p2[0]},${p2[1]}`} stroke={color.arc} strokeWidth={1.6} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      <Mono x={cx + (r + 26) * Math.cos(am)} y={cy + (r + 26) * Math.sin(am) + 6} size={16} weight={600} ls={0.5} fill={color.arc} anchor="middle" upper={false} opacity={lab}>
        {deg.toFixed(1).replace('.', ',')}°
      </Mono>
    </g>
  );
};

const STAGES = ['silhueta', 'hemisférios', 'cortes internos', 'símbolo'];
// centro aproximado de cada furo (unidades do símbolo), para o punção crescer a partir dele
const HOLE_C: Array<[number, number]> = [[44, 83], [VW - 44, 83]];

export const BlueprintScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const S = (ab: readonly [number, number]) => seg(frame, fps, ab[0], ab[1]);

  const grid = useMemo(() => {
    let minor = '';
    let major = '';
    for (let x = 0; x <= 1080; x += 24) (x % 120 ? (minor += `M${x} 0V1920`) : (major += `M${x} 0V1920`));
    for (let y = 0; y <= 1920; y += 24) (y % 120 ? (minor += `M0 ${y}H1080`) : (major += `M0 ${y}H1080`));
    return { minor, major };
  }, []);

  const gridP = S(T.grid);
  const ruleP = S(T.rule);
  const axisP = S(T.axis);
  const plateIn = springAt(frame, fps, T.plate, 40);
  const slotP = S(T.slot);
  const slotW = GAP_HALF * slotP;
  const scanP = S(T.scan);
  const scanY = -8 + (VH + 16) * scanP;
  const cuttersP = S(T.cutters);
  const punchP = springAt(frame, fps, T.punch, 30);
  const sweepP = S(T.sweep);
  const auxOp = 1 - S(T.aux); // vértices e eixo somem no final
  const dimOp = 1 - 0.6 * S(T.aux);
  const edgeOp = 1 - sweepP; // contorno da placa some conforme o sólido é revelado
  const stageP = [seg(frame, fps, 1.0, 1.4), seg(frame, fps, 2.8, 3.2), seg(frame, fps, 5.2, 5.6), seg(frame, fps, 7.2, 7.6)];
  const stripOp = seg(frame, fps, 1.0, 1.5);
  const specBox = seg(frame, fps, T.spec - 0.2, T.spec + 0.3);

  const hullPts = HULL.map((p) => p.join(',')).join(' ');
  const cutting = slotP > 0; // a partir do corte, a placa vira duas metades
  const cutterGlow = io(frame, fps, T.slot[0], T.slot[0] + 0.2, T.slot[1], T.slot[1] + 0.3);
  const scanGlow = io(frame, fps, T.scan[0], T.scan[0] + 0.15, T.scan[1] - 0.1, T.scan[1] + 0.2);
  const sweepX = -40 + 232 * sweepP; // borda da varredura diagonal, só sobre a placa (unidades, no eixo rotacionado)
  const sweepGlow = io(frame, fps, T.sweep[0], T.sweep[0] + 0.15, T.sweep[1] - 0.15, T.sweep[1] + 0.1);
  const scanReadout = `y = ${fmt(Math.max(0, Math.min(VH, scanY)))}`;

  const specRows: Array<[string, string]> = [
    ['caixa', `${fmt(XMAX)} × ${fmt(YMAX)} u · proporção 1 : ${(YMAX / XMAX).toFixed(3).replace('.', ',')}`],
    ['hemisférios', `esquerdo 0 → ${fmt(GAP_L)} · direito ${fmt(GAP_R)} → ${fmt(XMAX)} · vão ${fmt(GAP_R - GAP_L)}`],
    ['cor / mínimo', 'Electric #0040C8 ou branco sobre Abyss · altura mínima 24 px'],
  ];

  // faixa de desconstrução (4 peças)
  const k2 = 0.92;
  const pw = VW * k2;
  const gap = 56;
  const sx0 = (1080 - (4 * pw + 3 * gap)) / 2;
  const sy0 = 1256;
  const stroke = { stroke: '#fff', strokeWidth: 1.4, strokeLinejoin: 'round' as const, vectorEffect: 'non-scaling-stroke' as const };

  return (
    <AbsoluteFill style={{ background: `radial-gradient(90% 70% at 50% 42%, ${color.blueLight} 0%, ${color.blue} 55%, ${color.blueDeep} 100%)` }}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: 'absolute', left: 0, top: 0, fontFamily: mono }}>
        <defs>
          <marker id="bp-ar" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={9} markerHeight={9} orient="auto-start-reverse">
            <path d="M0,1 L9,5 L0,9 Z" fill="#fff" />
          </marker>
          {/* fenda central: cada metade da placa fica de um lado do eixo */}
          <clipPath id="bp-left">
            <rect x={-10} y={-10} width={AXIS - slotW + 10} height={VH + 20} />
          </clipPath>
          <clipPath id="bp-right">
            <rect x={AXIS + slotW} y={-10} width={VW + 10 - AXIS - slotW} height={VH + 20} />
          </clipPath>
          {/* linha de varredura: acima dela os contornos reais, abaixo o casco hexagonal */}
          <clipPath id="bp-above">
            <rect x={-10} y={-10} width={VW + 20} height={scanY + 10} />
          </clipPath>
          <clipPath id="bp-below">
            <rect x={-10} y={scanY} width={VW + 20} height={VH + 10 - scanY} />
          </clipPath>
          {/* furos puncionados: crescem a partir do centro de cada um */}
          <mask id="bp-holes" maskUnits="userSpaceOnUse" x={-10} y={-10} width={VW + 20} height={VH + 20}>
            <rect x={-10} y={-10} width={VW + 20} height={VH + 20} fill="#fff" />
            {[L_HOLE, R_HOLE].map((d, i) => (
              <g key={i} transform={`translate(${HOLE_C[i][0]} ${HOLE_C[i][1]}) scale(${punchP}) translate(${-HOLE_C[i][0]} ${-HOLE_C[i][1]})`}>
                <path d={d} fill="#000" />
              </g>
            ))}
          </mask>
          {/* varredura diagonal que revela o símbolo sólido */}
          <clipPath id="bp-sweep">
            <rect x={-300} y={-300} width={300 + sweepX} height={800} transform={`rotate(-22 ${AXIS} ${VH / 2})`} />
          </clipPath>
        </defs>

        <g opacity={gridP}>
          <path d={grid.minor} stroke="#fff" strokeOpacity={0.09} strokeWidth={1} fill="none" />
          <path d={grid.major} stroke="#fff" strokeOpacity={0.2} strokeWidth={1} fill="none" />
        </g>

        {/* cabeçalho e rodapé */}
        <Mono x={72} y={152} size={20} ls={6}>
          {type('Tutory · símbolo v2', linear(frame, fps, T.over[0], T.over[1]))}
        </Mono>
        <Mono x={72} y={216} size={44} weight={600} ls={1} upper={false}>
          {type('Desenho de construção', linear(frame, fps, T.title[0], T.title[1]))}
        </Mono>
        <Mono x={1008} y={150} size={15} anchor="end" opacity={0.85 * S(T.small)}>
          folha 01 / 01 · rev. 2 · mar 2026
        </Mono>
        <Mono x={1008} y={178} size={13} ls={1.5} anchor="end" opacity={0.6 * S(T.small)}>
          unidades do viewBox · escala 1 : 1
        </Mono>
        <line x1={72} y1={262} x2={72 + 936 * ruleP} y2={262} stroke="#fff" strokeOpacity={0.85} strokeWidth={1} />
        <line x1={72} y1={1640} x2={72 + 936 * ruleP} y2={1640} stroke="#fff" strokeOpacity={0.85} strokeWidth={1} />
        <Mono x={72} y={1668} size={13} ls={1.5} opacity={0.6 * S(T.small)}>
          Tutory · rebranding 2026 · fonte: tutory-logo-v2.ai → tutory-v2-symbol.svg
        </Mono>
        <Mono x={1008} y={1668} size={13} ls={1.5} anchor="end" opacity={0.6 * S(T.small)}>
          desenho: Wellington Mota
        </Mono>

        {/* vista principal */}
        <g transform={`translate(${OX} ${OY}) scale(${K})`}>
          {/* eixo de simetria */}
          <line x1={AXIS} y1={-14} x2={AXIS} y2={-14 + (VH + 28) * axisP} stroke="#fff" strokeOpacity={0.55 * auxOp} strokeWidth={1} vectorEffect="non-scaling-stroke" strokeDasharray="1.2 1.2" />

          {/* placa: entra inteira, depois é cortada ao meio e usinada de cima para baixo */}
          <g mask="url(#bp-holes)" opacity={plateIn} transform={`translate(${AXIS} ${VH / 2}) scale(${0.94 + 0.06 * plateIn}) translate(${-AXIS} ${-VH / 2})`}>
            {!cutting && <polygon points={hullPts} {...plateStyle} />}
            {cutting && (
              <>
                <g clipPath="url(#bp-below)">
                  <g clipPath="url(#bp-left)">
                    <polygon points={hullPts} {...plateStyle} strokeOpacity={0.9 * edgeOp} />
                  </g>
                  <g clipPath="url(#bp-right)">
                    <polygon points={hullPts} {...plateStyle} strokeOpacity={0.9 * edgeOp} />
                  </g>
                </g>
                <g clipPath="url(#bp-above)">
                  <path d={L_OUT} {...plateStyle} strokeOpacity={0.9 * edgeOp} />
                  <path d={R_OUT} {...plateStyle} strokeOpacity={0.9 * edgeOp} />
                </g>
              </>
            )}
          </g>

          {/* cortador da fenda: linha brilhante no eixo enquanto corta */}
          <line x1={AXIS} y1={-10} x2={AXIS} y2={VH + 10} stroke="#fff" strokeWidth={2.4} vectorEffect="non-scaling-stroke" opacity={cutterGlow} />
          <line x1={AXIS} y1={-10} x2={AXIS} y2={VH + 10} stroke="#fff" strokeWidth={10} strokeOpacity={0.18} vectorEffect="non-scaling-stroke" opacity={cutterGlow} />

          {/* linha de varredura (usinagem) */}
          <g opacity={scanGlow}>
            <line x1={-26} y1={scanY} x2={VW + 26} y2={scanY} stroke="#fff" strokeWidth={10} strokeOpacity={0.18} vectorEffect="non-scaling-stroke" />
            <line x1={-26} y1={scanY} x2={VW + 26} y2={scanY} stroke="#fff" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          </g>

          {/* vértices do casco */}
          {HULL.map((p, i) => {
            const s = snappyAt(frame, fps, T.plate + 0.2 + i * 0.05);
            return <circle key={i} cx={p[0]} cy={p[1]} r={1.3 * s} fill="#fff" opacity={auxOp} />;
          })}

          {/* cortadores dos furos: contorno tracejado + mira no centro, antes do punção */}
          <g opacity={cuttersP * (1 - clamp01(punchP * 1.6))}>
            {[L_HOLE, R_HOLE].map((d, i) => (
              <g key={i}>
                <path d={d} fill="none" stroke="#fff" strokeOpacity={0.9} strokeWidth={1.2} strokeDasharray="1.4 1.4" vectorEffect="non-scaling-stroke" />
                <line x1={HOLE_C[i][0] - 6} y1={HOLE_C[i][1]} x2={HOLE_C[i][0] + 6} y2={HOLE_C[i][1]} stroke="#fff" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                <line x1={HOLE_C[i][0]} y1={HOLE_C[i][1] - 6} x2={HOLE_C[i][0]} y2={HOLE_C[i][1] + 6} stroke="#fff" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                <circle cx={HOLE_C[i][0]} cy={HOLE_C[i][1]} r={2.6} fill="none" stroke="#fff" strokeWidth={1} vectorEffect="non-scaling-stroke" />
              </g>
            ))}
          </g>

          {/* símbolo sólido revelado pela varredura diagonal */}
          {sweepP > 0 && (
            <g clipPath="url(#bp-sweep)">
              <path d={L} fill="#fff" />
              <path d={R} fill="#fff" />
            </g>
          )}
          <g opacity={sweepGlow} transform={`rotate(-22 ${AXIS} ${VH / 2})`}>
            <line x1={sweepX} y1={-28} x2={sweepX} y2={VH + 28} stroke="#fff" strokeWidth={12} strokeOpacity={0.2} vectorEffect="non-scaling-stroke" />
            <line x1={sweepX} y1={-28} x2={sweepX} y2={VH + 28} stroke="#fff" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          </g>
        </g>

        {/* leitura da linha de varredura */}
        <Mono x={P(VW, 0)[0] + 70} y={P(0, scanY)[1] + 5} size={14} ls={1} opacity={0.9 * scanGlow} upper={false}>
          {scanReadout}
        </Mono>

        {/* cotas e ângulos */}
        <g opacity={dimOp}>
          <Dim a={[0, 0]} b={[XMAX, 0]} label={fmt(XMAX)} off={-46} p={S(T.dimW)} />
          <Dim a={[0, 0]} b={[0, YMAX]} label={fmt(YMAX)} off={-58} vertical p={S(T.dimH)} />
          <Dim a={[GAP_L, YMAX]} b={[GAP_R, YMAX]} label={'vão ' + fmt(GAP_R - GAP_L)} off={34} p={S(T.dimGap)} />
          <Dim a={[0, YMAX]} b={[GAP_L, YMAX]} label={fmt(GAP_L)} off={62} p={S(T.dimHalf)} />
          <Dim a={[XMAX, EDGE.y0]} b={[XMAX, EDGE.y1]} label={'aresta ' + fmt(EDGE.y1 - EDGE.y0)} off={50} vertical p={S(T.dimEdge)} />
          {ANGLES.map((a, i) => (
            <Arc key={i} v={a.v} to={a.to} p={seg(frame, fps, T.arcs + i * 0.22, T.arcs + i * 0.22 + 0.6)} />
          ))}
          <Mono x={OX} y={OY + VH * K + 118} size={13} ls={1.5} opacity={0.7 * S(T.dimHalf)}>
            Vista frontal · escala 4,1 : 1 · ângulos medidos a partir da horizontal
          </Mono>
        </g>

        {/* desconstrução em quatro peças */}
        <g opacity={stripOp}>
          {STAGES.map((title, i) => {
            const x = sx0 + i * (pw + gap);
            const on = stageP[i];
            return (
              <g key={i}>
                <Mono x={x} y={sy0 - 22} size={12} ls={1} opacity={0.5 + 0.5 * on}>
                  {`0${i + 1} · ${title}`}
                </Mono>
                <g transform={`translate(${x} ${sy0}) scale(${k2})`} opacity={0.3 + 0.7 * on}>
                  {i === 0 && (
                    <>
                      <polygon points={hullPts} {...dash} vectorEffect="non-scaling-stroke" />
                      {HULL.map((p, j) => (
                        <circle key={j} cx={p[0]} cy={p[1]} r={1.3} fill="#fff" />
                      ))}
                      <path d={L_OUT + R_OUT} fill="none" {...stroke} strokeOpacity={0.35} />
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <path d={L_OUT} fill="#fff" fillOpacity={0.08} {...stroke} transform="translate(-7 0)" />
                      <path d={R_OUT} fill="#fff" fillOpacity={0.08} {...stroke} transform="translate(7 0)" />
                      <line x1={AXIS} y1={-6} x2={AXIS} y2={VH + 6} {...dash} vectorEffect="non-scaling-stroke" />
                    </>
                  )}
                  {i === 2 && (
                    <>
                      <path d={L_OUT + R_OUT} fill="none" {...stroke} strokeOpacity={0.25} />
                      <path d={L_HOLE} fill="none" {...stroke} />
                      <path d={R_HOLE} fill="none" {...stroke} />
                    </>
                  )}
                  {i === 3 && (
                    <>
                      <path d={L} fill="#fff" {...stroke} />
                      <path d={R} fill="#fff" {...stroke} />
                    </>
                  )}
                </g>
                {i < 3 && (
                  <Mono x={x + pw + gap / 2} y={sy0 + (VH * k2) / 2 + 6} size={18} weight={600} anchor="middle" opacity={0.4 + 0.6 * stageP[i + 1]} upper={false}>
                    →
                  </Mono>
                )}
              </g>
            );
          })}
          <Mono x={sx0} y={sy0 + VH * k2 + 36} size={13} ls={1.5} opacity={0.7}>
            Desconstrução · placa hexagonal → fenda e hemisférios → cortes internos → símbolo
          </Mono>
        </g>

        {/* especificação */}
        <g opacity={specBox}>
          <rect x={56} y={1486} width={968} height={128} fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={1} />
          <Mono x={72} y={1512} size={15} weight={600} ls={3.5}>
            Especificação
          </Mono>
        </g>
        {specRows.map(([k, v], i) => {
          const p = linear(frame, fps, T.spec + i * 0.45, T.spec + i * 0.45 + 0.5);
          return (
            <g key={k}>
              <Mono x={72} y={1544 + i * 27} size={12.5} ls={1.5} opacity={0.7 * clamp01(p * 4)}>
                {k}
              </Mono>
              <Mono x={246} y={1544 + i * 27} size={15.5} weight={500} ls={0.3} upper={false}>
                {type(v, p)}
              </Mono>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
