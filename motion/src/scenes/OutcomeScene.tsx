import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VariantStyle } from '../theme';
import { copy } from '../data';
import { Kicker, Display, Body } from '../components/Type';
import { rise } from '../components/anim';

export const OutcomeScene: React.FC<{ v: VariantStyle }> = ({ v }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: v.bg, padding: '0 140px', justifyContent: 'center' }}>
      <div style={rise(frame, fps, 0)}>
        <Kicker v={v}>{copy.outcomeKicker}</Kicker>
      </div>
      <div style={{ marginTop: 20, ...rise(frame, fps, 4, 60) }}>
        <Display v={v} size={150}>
          {copy.outcomeTitle[0]} <span style={{ color: v.accent }}>{copy.outcomeTitle[1]}</span>
        </Display>
      </div>
      <div style={{ marginTop: 64, display: 'flex', gap: 60 }}>
        {copy.outcomes.map((o, i) => (
          <div key={o} style={{ flex: 1, borderTop: `1px solid ${v.line}`, paddingTop: 24, ...rise(frame, fps, 26 + i * 8) }}>
            <Kicker v={v} style={{ color: v.accent }}>
              {String(i + 1).padStart(2, '0')}
            </Kicker>
            <div style={{ marginTop: 12 }}>
              <Body v={v} size={30}>
                {o}
              </Body>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
