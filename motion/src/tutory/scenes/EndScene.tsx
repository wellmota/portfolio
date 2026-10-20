import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { mono } from '../../fonts';
import { color, gilroy } from '../theme';
import { seg, springAt } from '../anim';
import { L, R, VW, VH, LETTERS, LETTERS_BOX } from '../symbol';

export const END_FRAMES = 150;

// Encerramento: símbolo branco assenta, as letras T U T O R Y entram uma a uma, assinatura e site.
export const EndScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = springAt(frame, fps, 0.1, 52);
  const symH = 300;
  const k = symH / VH;
  const symW = VW * k;
  const cx = 540;
  const symTop = 610;
  const letterW = 500;
  const lk = letterW / LETTERS_BOX.w;
  const lettersTop = symTop + symH + 72;
  const sig = springAt(frame, fps, 1.9, 36);
  const url = springAt(frame, fps, 2.7, 36);
  const out = 1 - seg(frame, fps, 4.2, 5.0);
  return (
    <AbsoluteFill style={{ background: '#000', opacity: out }}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: 'absolute', left: 0, top: 0 }}>
        <g transform={`translate(${cx - symW / 2} ${symTop}) scale(${k})`}>
          <g opacity={sp} transform={`translate(${VW / 2} ${VH / 2}) scale(${1.14 - 0.14 * sp}) translate(${-VW / 2} ${-VH / 2})`}>
            <path d={L} fill="#fff" />
            <path d={R} fill="#fff" />
          </g>
        </g>
        <g transform={`translate(${cx - letterW / 2} ${lettersTop}) scale(${lk}) translate(${-LETTERS_BOX.x} ${-LETTERS_BOX.y})`}>
          {LETTERS.map((d, i) => {
            const p = springAt(frame, fps, 0.9 + i * 0.1, 30);
            return <path key={i} d={d} fill="#fff" opacity={p} transform={`translate(0 ${(1 - p) * 20})`} />;
          })}
        </g>
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: lettersTop + LETTERS_BOX.h * lk + 56,
          textAlign: 'center',
          fontFamily: mono,
          fontWeight: 500,
          fontSize: 22,
          letterSpacing: '0.42em',
          textTransform: 'uppercase',
          color: color.faint,
          opacity: sig,
          transform: `translateY(${(1 - sig) * 14}px)`,
        }}
      >
        Empowering Intelligence
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1470,
          textAlign: 'center',
          fontFamily: gilroy,
          fontWeight: 400,
          fontSize: 32,
          color: color.grey,
          opacity: url,
          transform: `translateY(${(1 - url) * 14}px)`,
        }}
      >
        tutory.com.br
      </div>
    </AbsoluteFill>
  );
};
