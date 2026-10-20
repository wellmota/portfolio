import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { springAt } from '../anim';

// Mocks do kit (applestationady.png): as quatro caixas recortadas, uma por vez, centralizadas, com cantos arredondados.
const CARDS = ['tutory/bento/1.jpg', 'tutory/bento/2.jpg', 'tutory/bento/3.jpg', 'tutory/bento/4.jpg'];
const EACH = 2.3; // segundos por caixa
const LEAD = 0.2;
export const BENTO_FRAMES = Math.round((LEAD + EACH * CARDS.length) * 30);

const W = 940;
const H = 696; // proporção das caixas (1080 × 800)

export const BentoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {CARDS.map((src, i) => {
        const t0 = LEAD + i * EACH;
        const inP = springAt(frame, fps, t0, 40);
        const last = i === CARDS.length - 1;
        const outP = last ? 0 : springAt(frame, fps, t0 + EACH - 0.25, 26);
        const opacity = Math.min(1, inP * 1.4) * (1 - outP);
        if (opacity <= 0.001) return null;
        const scale = 0.94 + 0.06 * inP - 0.03 * outP;
        const y = (1 - inP) * 90 - outP * 70;
        return (
          <div
            key={src}
            style={{
              position: 'absolute',
              left: 540 - W / 2,
              top: 960 - H / 2,
              width: W,
              height: H,
              borderRadius: 44,
              overflow: 'hidden',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
              opacity,
              transform: `translateY(${y}px) scale(${scale})`,
            }}
          >
            <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
