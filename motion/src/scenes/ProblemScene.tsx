import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VariantStyle } from '../theme';
import { copy } from '../data';
import { inter } from '../fonts';
import { Kicker, Display } from '../components/Type';
import { rise } from '../components/anim';

export const ProblemScene: React.FC<{ v: VariantStyle }> = ({ v }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: v.bg, padding: '120px 140px' }}>
      <div style={rise(frame, fps, 0)}>
        <Kicker v={v}>{copy.problemKicker}</Kicker>
      </div>
      <div style={{ marginTop: 20, ...rise(frame, fps, 4, 50) }}>
        <Display v={v} size={120}>
          {copy.problemTitle}
        </Display>
      </div>
      <div style={{ position: 'absolute', left: 140, right: 140, bottom: 120, display: 'flex', borderTop: `1px solid ${v.line}` }}>
        {copy.stats.map((s, i) => (
          <div
            key={s.value}
            style={{
              flex: 1,
              paddingTop: 36,
              paddingRight: 40,
              paddingLeft: i ? 40 : 0,
              borderLeft: i ? `1px solid ${v.line}` : 'none',
              ...rise(frame, fps, 20 + i * 8, 40),
            }}
          >
            <div
              style={{
                fontFamily: inter,
                fontWeight: 700,
                fontSize: 150,
                letterSpacing: -7,
                lineHeight: 1,
                color: i === 1 ? v.accent : v.fg,
              }}
            >
              {s.value}
            </div>
            <div style={{ marginTop: 18 }}>
              <Kicker v={v}>{s.label}</Kicker>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
