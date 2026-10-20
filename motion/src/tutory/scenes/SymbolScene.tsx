import React from 'react';
import { AbsoluteFill, Easing, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Lines } from '../components/Text';

// Vídeo do símbolo cromado (720×1280, 8 s) centralizado; só a frase do capítulo entra embaixo, longe do logo.
export const SYMBOL_FRAMES = 230; // vídeo de 8 s, pulando os 0,3 s escuros do início

export const SymbolScene: React.FC = () => {
  const frame = useCurrentFrame();
  // abre cobrindo a largura toda (o vídeo começa em close) e assenta em 1,05× quando o símbolo para
  const s = interpolate(frame, [0, 80], [1.5, 1.05], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const vw = 720 * s;
  const vh = 1280 * s;
  const cx = 540;
  const cy = 820;
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {/* o recorte em 1430 px corta a marca d'água do canto inferior do vídeo */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1080, height: 1430, overflow: 'hidden' }}>
        <OffthreadVideo
          src={staticFile('tutory/simbolo.mp4')}
          muted
          trimBefore={9}
          style={{ position: 'absolute', width: vw, height: vh, left: cx - vw / 2, top: cy - vh / 2 }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1300,
          height: 200,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0), #000 60%)',
        }}
      />
      <div style={{ position: 'absolute', left: 72, right: 72, top: 1330 }}>
        <Lines at={4.0} lines={['Cada ângulo calculado,', 'cada linha com intenção.']} accent={['intenção']} />
      </div>
    </AbsoluteFill>
  );
};
