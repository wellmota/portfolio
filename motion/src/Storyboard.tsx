import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { scene } from './CuidaMe';
import { SCENES, totalFrames } from './timeline';
import { FPS, HEIGHT, VARIANTS, WIDTH, portfolio, type Variant } from './theme';
import { inter, mono } from './fonts';

// Um frame por cena (a 60% da cena), em grade, para aprovar a direção antes de animar.
// Cada cena é montada direto com um <Sequence from={-n}>, que desloca o frame local para n.
export const Storyboard: React.FC<{ variant: Variant }> = ({ variant }) => {
  const v = VARIANTS[variant];
  const thumbW = 420;
  const thumbH = Math.round((thumbW * HEIGHT) / WIDTH);
  return (
    <AbsoluteFill style={{ background: portfolio.ink, padding: 56, color: portfolio.mist, fontFamily: mono }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontSize: 18, letterSpacing: 4, textTransform: 'uppercase' }}>Storyboard · variante</div>
          <div style={{ fontFamily: inter, fontWeight: 700, fontSize: 56, letterSpacing: -2, color: portfolio.cream, marginTop: 6 }}>{v.name}</div>
        </div>
        <div style={{ fontSize: 18, letterSpacing: 2, textAlign: 'right' }}>
          {SCENES.length} cenas · {(totalFrames(variant) / FPS).toFixed(1)}s · 1920×1080 · {FPS} fps
        </div>
      </div>
      <div style={{ fontFamily: inter, fontSize: 24, color: portfolio.mist, marginTop: 14, maxWidth: 1400 }}>{v.description}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginTop: 44 }}>
        {SCENES.map((s, i) => {
          const frame = Math.round(s.frames * 0.6);
          return (
            <div key={s.id} style={{ width: thumbW }}>
              <div style={{ position: 'relative', width: thumbW, height: thumbH, overflow: 'hidden', borderRadius: 10, border: `1px solid ${portfolio.lineStrong}` }}>
                <div style={{ position: 'relative', width: WIDTH, height: HEIGHT, transform: `scale(${thumbW / WIDTH})`, transformOrigin: 'top left' }}>
                  <AbsoluteFill style={{ background: v.bg }}>
                    <Sequence from={-frame} layout="none">
                      {scene(s.id, v)}
                    </Sequence>
                  </AbsoluteFill>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 16, letterSpacing: 2, textTransform: 'uppercase' }}>
                <span style={{ color: portfolio.cream }}>
                  {String(i + 1).padStart(2, '0')} {s.label}
                </span>
                <span>{(s.frames / FPS).toFixed(1)}s</span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
