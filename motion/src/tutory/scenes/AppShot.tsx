import React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export type AppShotProps = {
  src: string;
  move: 'in' | 'out' | 'pan';
  origin?: string;
};

export const APP_FRAMES = 72;

// Uma aplicação da marca em 9:16, só a imagem: movimento lento (Ken Burns) em direção ao logo.
export const AppShot: React.FC<AppShotProps> = ({ src, move, origin = '50% 40%' }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const u = interpolate(frame, [0, durationInFrames], [0, 1], { extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin) });
  const transform =
    move === 'in' ? `scale(${1 + 0.07 * u})` : move === 'out' ? `scale(${1.08 - 0.07 * u})` : `scale(1.06) translateX(${(0.5 - u) * 44}px)`;
  return (
    <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
      <Img
        src={staticFile(src)}
        style={{ position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, objectFit: 'cover', transform, transformOrigin: origin }}
      />
    </AbsoluteFill>
  );
};
