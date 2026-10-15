import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { inter, mono } from './fonts';
import { VARIANTS, cuidame } from './theme';
import { Phone } from './components/Phone';

// "Shot" estilo Dribbble para o card do projeto na home (16:10): fundo verde da marca,
// iPhone com o print real da home sobre um plinto, headline à esquerda, rótulos nos cantos.
const COPY = {
  pt: {
    kicker: 'CuidaMe · App mobile',
    title: ['Cuidar', 'junto.'],
    sub: ['Agenda, remédios, chat e contas', 'da família em um só lugar.'],
    br: 'Product design + front-end · Altevita',
  },
  en: {
    kicker: 'CuidaMe · Mobile app',
    title: ['Care,', 'together.'],
    sub: ['Agenda, meds, chat and family', 'expenses in one place.'],
    br: 'Product design + front-end · Altevita',
  },
} as const;

export type ShotProps = { lang: 'pt' | 'en' };

export const Shot: React.FC<ShotProps> = ({ lang }) => {
  const c = COPY[lang];
  const v = { ...VARIANTS.product, bezel: 'device' as const };
  const W = 1920;
  const H = 1200;
  const phoneH = 930;
  const phoneW = (1206 / 2622) * phoneH;
  const forest = cuidame.forest;
  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(130% 110% at 28% 18%, #b6dca6 0%, #8cc68e 38%, #5ea878 68%, #3d8a5e 100%)',
        overflow: 'hidden',
      }}
    >
      {/* linhas curvas sutis ao fundo */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, opacity: 0.16 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={i}
            d={`M-100,${200 + i * 64} C 480,${40 + i * 64} 1140,${430 + i * 64} 2020,${150 + i * 64}`}
            fill="none"
            stroke={forest}
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* plinto */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id="top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9fcf98" />
            <stop offset="1" stopColor="#7cbb80" />
          </linearGradient>
          <radialGradient id="shadow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#000" stopOpacity="0.35" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <polygon points={`140,935 ${W - 140},935 ${W + 60},1065 -60,1065`} fill="url(#top)" />
        <polygon points={`-60,1065 ${W + 60},1065 ${W + 60},1110 -60,1110`} fill="#4f9a67" />
        <ellipse cx={W / 2} cy={1030} rx={360} ry={46} fill="url(#shadow)" />
      </svg>

      {/* iPhone */}
      <div style={{ position: 'absolute', left: W / 2 - phoneW / 2 - 12, top: 1010 - phoneH - 24 }}>
        <Phone src="02-home.png" height={phoneH} v={v} />
      </div>

      {/* texto à esquerda */}
      <div style={{ position: 'absolute', left: 80, top: 66, fontFamily: mono, fontSize: 18, letterSpacing: 5, textTransform: 'uppercase', color: forest, opacity: 0.85 }}>
        {c.kicker}
      </div>
      <div style={{ position: 'absolute', left: 80, top: 440, width: 600 }}>
        <div style={{ fontFamily: inter, fontWeight: 700, fontSize: 104, lineHeight: 0.98, letterSpacing: -4, color: forest }}>
          {c.title[0]}
          <br />
          {c.title[1]}
        </div>
        <div style={{ marginTop: 34, fontFamily: inter, fontWeight: 600, fontSize: 26, lineHeight: 1.3, color: forest, opacity: 0.9 }}>
          {c.sub[0]}
          <br />
          {c.sub[1]}
        </div>
      </div>

      {/* rodapé */}
      {/* logo oficial do Grupo Altevita (versão branca escurecida para o verde-floresta) */}
      <Img
        src={staticFile('brand/altevita-logo-white.png')}
        style={{ position: 'absolute', left: 80, bottom: 46, height: 46, filter: 'brightness(0)', opacity: 0.82 }}
      />
      <div style={{ position: 'absolute', right: 80, bottom: 58, fontFamily: mono, fontSize: 15, letterSpacing: 3, textTransform: 'uppercase', color: forest }}>
        {c.br}
      </div>
    </AbsoluteFill>
  );
};
