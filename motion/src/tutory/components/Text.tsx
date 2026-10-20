import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { mono } from '../../fonts';
import { color, gilroy } from '../theme';
import { springAt } from '../anim';

// Sobrelinha mono (TUTORY · SÍMBOLO V2), sobe e aparece.
export const Overline: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; tone?: string }> = ({
  at,
  children,
  style,
  tone = color.faint,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, at, 30);
  return (
    <div
      style={{
        fontFamily: mono,
        fontWeight: 500,
        fontSize: 22,
        letterSpacing: '0.32em',
        textTransform: 'uppercase',
        color: tone,
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Linhas de título: cada palavra sobe de dentro de um recorte, em cascata. `accent` destaca palavras em azul.
export const Lines: React.FC<{
  at: number;
  outAt?: number;
  lines: string[];
  size?: number;
  weight?: number;
  accent?: string[];
  stagger?: number;
  lineStagger?: number;
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}> = ({ at, outAt, lines, size = 78, weight = 300, accent = [], stagger = 0.07, lineStagger = 0.18, align = 'left', style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        fontFamily: gilroy,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: '-0.02em',
        color: color.white,
        textAlign: align,
        ...style,
      }}
    >
      {lines.map((line, li) => (
        <div key={li} style={{ overflow: 'hidden', padding: '0.1em 0 0.16em', margin: '-0.1em 0 -0.16em' }}>
          {line.split(' ').map((w, wi) => {
            const p = springAt(frame, fps, at + li * lineStagger + wi * stagger, 34);
            const q = outAt === undefined ? 0 : springAt(frame, fps, outAt + li * 0.08 + wi * 0.04, 26);
            const isAccent = accent.includes(w.replace(/[.,:;!?]/g, ''));
            return (
              <React.Fragment key={wi}>
                <span
                  style={{
                    display: 'inline-block',
                    transform: `translateY(${(1 - p) * 108 - q * 70}%)`,
                    opacity: Math.min(1, p * 1.5) * (1 - q),
                    color: isAccent ? color.accent : undefined,
                    fontWeight: isAccent ? 400 : undefined,
                  }}
                >
                  {w}
                </span>
                {wi < line.split(' ').length - 1 ? ' ' : null}
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Parágrafo de apoio (cinza), sobe suave.
export const Lede: React.FC<{ at: number; children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  at,
  children,
  size = 31,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, at, 42);
  return (
    <div
      style={{
        fontFamily: gilroy,
        fontWeight: 400,
        fontSize: size,
        lineHeight: 1.38,
        color: color.grey,
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
