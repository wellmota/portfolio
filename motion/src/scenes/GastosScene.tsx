import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VariantStyle } from '../theme';
import { copy } from '../data';
import { Kicker, Display, Body } from '../components/Type';
import { Phone } from '../components/Phone';
import { rise, smooth } from '../components/anim';

const brl = (n: number) => 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const GastosScene: React.FC<{ v: VariantStyle }> = ({ v }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame, fps, config: smooth, durationInFrames: 45 });
  const value =
    v.id === 'kinetic'
      ? interpolate(frame, [12, 60], [0, copy.gastosValue], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        })
      : copy.gastosValue;
  return (
    <AbsoluteFill style={{ background: v.bg }}>
      <div style={{ position: 'absolute', left: 180, top: 90, opacity: e, transform: `translateX(${(1 - e) * -300}px)` }}>
        <Phone src="09-gastos.png" height={1000} v={v} />
      </div>
      <div style={{ position: 'absolute', left: 820, right: 120, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={rise(frame, fps, 8)}>
          <Kicker v={v}>{copy.gastosKicker}</Kicker>
        </div>
        <div style={{ marginTop: 24, ...rise(frame, fps, 12, 50) }}>
          <Display v={v} size={170} style={{ color: v.accent, fontVariantNumeric: 'tabular-nums' }}>
            {brl(value)}
          </Display>
        </div>
        <div style={{ marginTop: 28, ...rise(frame, fps, 22) }}>
          <Body v={v} size={48}>
            {copy.gastosLine}
          </Body>
        </div>
        <div style={{ marginTop: 16, maxWidth: 820, ...rise(frame, fps, 30) }}>
          <Body v={v} size={30} muted>
            {copy.gastosBody}
          </Body>
        </div>
      </div>
    </AbsoluteFill>
  );
};
