import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VariantStyle } from '../theme';
import { copy } from '../data';
import { gothic, inter } from '../fonts';
import { Kicker, Body } from '../components/Type';
import { rise } from '../components/anim';

export const EndScene: React.FC<{ v: VariantStyle }> = ({ v }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: v.bg, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: `'${gothic}', ${inter}`, fontSize: 220, lineHeight: 1, color: v.fg, ...rise(frame, fps, 0, 30) }}>W</div>
      <div style={{ marginTop: 28, ...rise(frame, fps, 8) }}>
        <Body v={v} size={36}>
          {copy.endName}
        </Body>
      </div>
      <div style={{ marginTop: 10, ...rise(frame, fps, 12) }}>
        <Kicker v={v}>{copy.endRole}</Kicker>
      </div>
      <div style={{ marginTop: 40, ...rise(frame, fps, 16) }}>
        <Kicker v={v} style={{ color: v.accent }}>
          {copy.endUrl}
        </Kicker>
      </div>
    </AbsoluteFill>
  );
};
