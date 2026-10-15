import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VariantStyle } from '../theme';
import { copy } from '../data';
import { Kicker, Display } from '../components/Type';
import { Phone } from '../components/Phone';
import { rise, smooth } from '../components/anim';

export const TrioScene: React.FC<{ v: VariantStyle }> = ({ v }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: v.bg }}>
      <div style={{ position: 'absolute', left: 140, top: 90 }}>
        <div style={rise(frame, fps, 0)}>
          <Kicker v={v}>{copy.trioKicker}</Kicker>
        </div>
        <div style={{ marginTop: 14, ...rise(frame, fps, 4, 40) }}>
          <Display v={v} size={64}>
            {copy.trioTitle}
          </Display>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 250, display: 'flex', justifyContent: 'center', gap: 80 }}>
        {copy.trio.map((p, i) => {
          const e = spring({ frame: frame - 10 - i * 8, fps, config: smooth, durationInFrames: 45 });
          const rot = v.id === 'product' ? (i - 1) * 4 : 0;
          const dx = v.id === 'kinetic' ? (i - 1) * -140 * (1 - e) : 0;
          return (
            <div
              key={p.src}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 26,
                opacity: e,
                transform: `translate(${dx}px, ${(1 - e) * 260}px) rotate(${rot}deg)`,
              }}
            >
              <Phone src={p.src} height={700} v={v} />
              <Kicker v={v}>{p.label}</Kicker>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
