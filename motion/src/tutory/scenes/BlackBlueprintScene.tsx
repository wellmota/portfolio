import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Lines, Overline } from '../components/Text';
import { io, seg } from '../anim';

// Abertura: "O mesmo símbolo." sobre o logo antigo (fantasma, bem transparente); o texto muda para
// "Uma arquitetura nova." quando começa o blueprint preto original (anim.html recapturado em 9:16 a 1,6×),
// o fantasma se dissolve na construção e a frase some; o vídeo vai até o símbolo sólido.
const HOLD = 3.0; // segundos só com o título e o logo antigo antes do desenho começar
const VIDEO_FRAMES = 353;
export const BLACK_FRAMES = Math.round(HOLD * 30) + VIDEO_FRAMES;

export const BlackBlueprintScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ghost = io(frame, fps, 0.9, 1.8, HOLD, HOLD + 1.6); // logo antigo: entra, e se dissolve quando os vértices aparecem
  const overOut = 1 - seg(frame, fps, HOLD + 10.4, HOLD + 11.0); // o símbolo fica sozinho antes do cromado
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Sequence from={Math.round(HOLD * fps)} durationInFrames={VIDEO_FRAMES} premountFor={fps}>
        <OffthreadVideo src={staticFile('tutory/blueprint-preto.mp4')} muted style={{ position: 'absolute', left: 0, top: 0, width: 1080, height: 1920 }} />
      </Sequence>
      <Img
        src={staticFile('tutory/logo-antigo.png')}
        style={{ position: 'absolute', left: 540 - 270, top: 960 - 177, width: 540, opacity: 0.2 * ghost, transform: `scale(${1 + 0.04 * (1 - ghost)})` }}
      />
      <div style={{ position: 'absolute', left: 72, top: 196, opacity: overOut }}>
        <Overline at={0.3}>Tutory · símbolo v2</Overline>
      </div>
      <div style={{ position: 'absolute', left: 72, right: 72, top: 246 }}>
        <Lines at={0.8} outAt={HOLD + 0.1} lines={['O mesmo símbolo.']} />
      </div>
      <div style={{ position: 'absolute', left: 72, right: 72, top: 246 }}>
        <Lines at={HOLD + 0.5} outAt={HOLD + 3.2} lines={['Uma arquitetura nova.']} accent={['nova']} />
      </div>
    </AbsoluteFill>
  );
};
