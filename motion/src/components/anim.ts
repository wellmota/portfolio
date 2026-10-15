import { spring } from 'remotion';
import type { CSSProperties } from 'react';

export const smooth = { damping: 200 };
export const snappy = { damping: 20, stiffness: 200 };

// Entrada padrão: sobe e aparece. `delay` em frames.
export const rise = (
  frame: number,
  fps: number,
  delay = 0,
  dist = 40,
  config: { damping: number; stiffness?: number } = smooth,
): CSSProperties => {
  const p = spring({ frame: frame - delay, fps, config });
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` };
};
