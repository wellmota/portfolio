import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VariantStyle } from '../theme';
import { copy } from '../data';
import { Kicker, Body, DisplayReveal } from '../components/Type';
import { rise } from '../components/anim';

export const TitleScene: React.FC<{ v: VariantStyle }> = ({ v }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: v.bg, padding: '0 140px', justifyContent: 'center' }}>
      {v.id === 'product' && (
        <Img
          src={staticFile('brand/cuidame-wordmark.png')}
          style={{ position: 'absolute', top: 100, left: 140, width: 320, ...rise(frame, fps, 0, 20) }}
        />
      )}
      <div style={rise(frame, fps, 0)}>
        <Kicker v={v}>{copy.kicker}</Kicker>
      </div>
      <div style={{ marginTop: 24 }}>
        <DisplayReveal v={v} text={copy.title} size={260} delay={6} stagger={v.id === 'kinetic'} />
      </div>
      <div style={{ marginTop: 36, maxWidth: 980, ...rise(frame, fps, 18) }}>
        <Body v={v} size={44}>
          {copy.subtitle}
        </Body>
      </div>
      <div style={{ position: 'absolute', right: 140, bottom: 110, ...rise(frame, fps, 24) }}>
        <Kicker v={v}>{copy.client}</Kicker>
      </div>
    </AbsoluteFill>
  );
};
