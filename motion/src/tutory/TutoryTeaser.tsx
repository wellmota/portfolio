import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import './fonts';
import { BLACK_FRAMES, BlackBlueprintScene } from './scenes/BlackBlueprintScene';
import { SYMBOL_FRAMES, SymbolScene } from './scenes/SymbolScene';
import { APP_FRAMES, AppShot, type AppShotProps } from './scenes/AppShot';
import { BLUEPRINT_FRAMES, BlueprintScene } from './scenes/BlueprintScene';
import { END_FRAMES, EndScene } from './scenes/EndScene';
import { BENTO_FRAMES, BentoScene } from './scenes/BentoScene';

// Teaser Instagram (1080×1920, 30 fps): blueprint preto → símbolo cromado → aplicações → blueprint azul (outra construção) → aplicações → encerramento.
const APPS: AppShotProps[] = [
  { src: 'tutory/apps/estande.jpg', move: 'out', origin: '50% 22%' },
  { src: 'tutory/apps/uniforme.jpg', move: 'in', origin: '50% 42%' },
  { src: 'tutory/apps/cracha.jpg', move: 'out', origin: '50% 55%' },
  { src: 'tutory/apps/sala.jpg', move: 'pan', origin: '60% 45%' },
  { src: 'tutory/apps/recepcao.jpg', move: 'in', origin: '40% 45%' },
];

const FADE_IMG = 10;
const FADE_BIG = 14;
const FADE_BP = 16;
const FADE_CUT = 8; // símbolo branco → cromado: corte curto coberto por um flash branco
const TRANSITIONS = FADE_CUT + FADE_BIG + FADE_IMG + FADE_IMG + FADE_BP + FADE_BP + FADE_IMG + FADE_BIG + FADE_BIG;

export const TEASER_FRAMES = BLACK_FRAMES + SYMBOL_FRAMES + APP_FRAMES * APPS.length + BLUEPRINT_FRAMES + BENTO_FRAMES + END_FRAMES - TRANSITIONS;

const T = (frames: number) => <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: frames })} />;
const shot = (i: number) => (
  <TransitionSeries.Sequence durationInFrames={APP_FRAMES}>
    <AppShot {...APPS[i]} />
  </TransitionSeries.Sequence>
);

// Flash branco no corte do blueprint preto para o cromado.
const Flash: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at - 6, at, at + 12], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return o > 0 ? <AbsoluteFill style={{ background: '#fff', opacity: o }} /> : null;
};

export const TutoryTeaser: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={BLACK_FRAMES}>
        <BlackBlueprintScene />
      </TransitionSeries.Sequence>
      {T(FADE_CUT)}
      <TransitionSeries.Sequence durationInFrames={SYMBOL_FRAMES}>
        <SymbolScene />
      </TransitionSeries.Sequence>
      {T(FADE_BIG)}
      {shot(0)}
      {T(FADE_IMG)}
      {shot(1)}
      {T(FADE_IMG)}
      {shot(2)}
      {T(FADE_BP)}
      <TransitionSeries.Sequence durationInFrames={BLUEPRINT_FRAMES}>
        <BlueprintScene />
      </TransitionSeries.Sequence>
      {T(FADE_BP)}
      {shot(3)}
      {T(FADE_IMG)}
      {shot(4)}
      {T(FADE_BIG)}
      <TransitionSeries.Sequence durationInFrames={BENTO_FRAMES}>
        <BentoScene />
      </TransitionSeries.Sequence>
      {T(FADE_BIG)}
      <TransitionSeries.Sequence durationInFrames={END_FRAMES}>
        <EndScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Flash at={BLACK_FRAMES - FADE_CUT / 2} />
  </AbsoluteFill>
);
