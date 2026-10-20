import { Easing, interpolate, spring } from 'remotion';

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

const cubic = Easing.inOut(Easing.cubic);
const out = Easing.out(Easing.cubic);

// Progresso 0→1 entre os instantes a e b (em segundos), com easing.
export const seg = (frame: number, fps: number, a: number, b: number, easing: (x: number) => number = cubic) =>
  interpolate(frame, [a * fps, b * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing });

export const segOut = (frame: number, fps: number, a: number, b: number) => seg(frame, fps, a, b, out);

export const linear = (frame: number, fps: number, a: number, b: number) => seg(frame, fps, a, b, (x) => x);

// Entra em [a,b] e sai em [c,d].
export const io = (frame: number, fps: number, a: number, b: number, c: number, d: number) =>
  seg(frame, fps, a, b) * (1 - seg(frame, fps, c, d));

// Mola suave (sem quique) a partir de um instante em segundos.
export const springAt = (frame: number, fps: number, at: number, durationInFrames = 36, config = { damping: 200 }) =>
  spring({ frame: frame - at * fps, fps, config, durationInFrames });

export const snappyAt = (frame: number, fps: number, at: number) =>
  spring({ frame: frame - at * fps, fps, config: { damping: 18, stiffness: 180 } });
