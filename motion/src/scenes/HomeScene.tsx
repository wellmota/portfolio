import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VariantStyle } from '../theme';
import { copy } from '../data';
import { Kicker, Display } from '../components/Type';
import { Phone } from '../components/Phone';
import { rise, smooth } from '../components/anim';

export const HomeScene: React.FC<{ v: VariantStyle }> = ({ v }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: smooth, durationInFrames: 40 });
  // Push-in lento no card da Helena.
  const push = interpolate(frame, [30, 120], [1, 1.14], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });
  return (
    <AbsoluteFill style={{ background: v.bg }}>
      <div style={{ position: 'absolute', left: 140, top: 0, bottom: 0, width: 760, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={rise(frame, fps, 6)}>
          <Kicker v={v}>{copy.homeKicker}</Kicker>
        </div>
        <div style={{ marginTop: 20, ...rise(frame, fps, 10, 50) }}>
          <Display v={v} size={88}>
            {copy.homeTitle[0]}
            <br />
            <span style={{ color: v.muted }}>{copy.homeTitle[1]}</span>
          </Display>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 200,
          top: 120,
          opacity: enter,
          transform: `translateY(${(1 - enter) * 400}px) scale(${push})`,
          transformOrigin: '50% 38%',
        }}
      >
        <Phone src="02-home.png" height={1100} v={v} />
      </div>
    </AbsoluteFill>
  );
};
