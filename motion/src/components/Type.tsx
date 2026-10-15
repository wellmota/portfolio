import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { inter, mono } from '../fonts';
import type { VariantStyle } from '../theme';
import { rise, snappy } from './anim';

type Base = { v: VariantStyle; style?: React.CSSProperties; children: React.ReactNode };

export const Kicker: React.FC<Base> = ({ v, style, children }) => (
  <div
    style={{
      fontFamily: mono,
      fontSize: 22,
      letterSpacing: 4,
      textTransform: 'uppercase',
      color: v.muted,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Body: React.FC<Base & { size?: number; muted?: boolean }> = ({ v, size = 32, muted, style, children }) => (
  <div
    style={{
      fontFamily: inter,
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1.25,
      color: muted ? v.muted : v.fg,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Display: React.FC<Base & { size?: number }> = ({ v, size = 160, style, children }) => (
  <div
    style={{
      fontFamily: inter,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: -size * 0.05,
      lineHeight: 0.95,
      color: v.fg,
      ...style,
    }}
  >
    {children}
  </div>
);

// Título com letras em cascata (variante Kinetic) ou subida única.
export const DisplayReveal: React.FC<{ v: VariantStyle; text: string; size?: number; delay?: number; stagger: boolean; style?: React.CSSProperties }> = ({
  v,
  text,
  size = 160,
  delay = 0,
  stagger,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!stagger) {
    return (
      <div style={rise(frame, fps, delay, 60)}>
        <Display v={v} size={size} style={style}>
          {text}
        </Display>
      </div>
    );
  }
  return (
    <Display v={v} size={size} style={style}>
      {text.split('').map((ch, i) => (
        <span key={i} style={{ display: 'inline-block', ...rise(frame, fps, delay + i * 3, 90, snappy) }}>
          {ch}
        </span>
      ))}
    </Display>
  );
};
