import React from 'react';
import { Img, staticFile } from 'remotion';
import type { VariantStyle } from '../theme';

// Print real do simulador (1206x2622, iPhone 17 Pro) com ou sem moldura.
export const SCREEN_W = 1206;
export const SCREEN_H = 2622;

export const Phone: React.FC<{ src: string; height: number; v: VariantStyle; style?: React.CSSProperties }> = ({ src, height, v, style }) => {
  const s = height / SCREEN_H;
  const w = SCREEN_W * s;
  const radius = 165 * s;
  const bezel = v.bezel === 'device' ? 34 * s : 0;
  return (
    <div
      style={{
        width: w + bezel * 2,
        height: height + bezel * 2,
        padding: bezel,
        boxSizing: 'border-box',
        borderRadius: radius + bezel,
        background: v.bezel === 'device' ? '#0b0f0c' : 'transparent',
        boxShadow: v.bezel === 'device' ? '0 50px 90px rgba(0,0,0,0.35)' : 'none',
        outline: v.bezel === 'thin' ? `1px solid ${v.line}` : 'none',
        ...style,
      }}
    >
      <div style={{ width: w, height, borderRadius: radius, overflow: 'hidden', background: '#000' }}>
        <Img src={staticFile(`screens-webp/${src.replace(/\.png$/, '.webp')}`)} style={{ width: w, height, display: 'block' }} />
      </div>
    </div>
  );
};
