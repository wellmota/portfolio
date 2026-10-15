import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { VARIANTS, type Variant, type VariantStyle } from './theme';
import { SCENES, type SceneId } from './timeline';
import { TitleScene } from './scenes/TitleScene';
import { ProblemScene } from './scenes/ProblemScene';
import { HomeScene } from './scenes/HomeScene';
import { TrioScene } from './scenes/TrioScene';
import { GastosScene } from './scenes/GastosScene';
import { OutcomeScene } from './scenes/OutcomeScene';
import { EndScene } from './scenes/EndScene';

export type CuidaMeProps = { variant: Variant };

export const scene = (id: SceneId, v: VariantStyle) => {
  switch (id) {
    case 'title':
      return <TitleScene v={v} />;
    case 'problem':
      return <ProblemScene v={v} />;
    case 'home':
      return <HomeScene v={v} />;
    case 'trio':
      return <TrioScene v={v} />;
    case 'gastos':
      return <GastosScene v={v} />;
    case 'outcome':
      return <OutcomeScene v={v} />;
    case 'end':
      return <EndScene v={v} />;
  }
};

export const CuidaMe: React.FC<CuidaMeProps> = ({ variant }) => {
  const v = VARIANTS[variant];
  const presentation = variant === 'kinetic' ? slide({ direction: 'from-right' }) : fade();
  const items: React.ReactNode[] = [];
  SCENES.forEach((s, i) => {
    if (i > 0) {
      items.push(
        <TransitionSeries.Transition
          key={`t-${s.id}`}
          presentation={presentation}
          timing={linearTiming({ durationInFrames: v.transitionFrames })}
        />,
      );
    }
    items.push(
      <TransitionSeries.Sequence key={s.id} durationInFrames={s.frames}>
        {scene(s.id, v)}
      </TransitionSeries.Sequence>,
    );
  });
  return (
    <AbsoluteFill style={{ background: v.bg }}>
      <TransitionSeries>{items}</TransitionSeries>
      <LoopFade />
    </AbsoluteFill>
  );
};

// Fade preto curto na abertura e no fim: o loop do <video> fecha sem flash.
const LoopFade: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = interpolate(frame, [0, 8, durationInFrames - 12, durationInFrames - 1], [1, 0, 0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: '#000', opacity, pointerEvents: 'none' }} />;
};
