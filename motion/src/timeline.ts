import { VARIANTS, type Variant } from './theme';

export const SCENES = [
  { id: 'title', label: 'Título', frames: 90 },
  { id: 'problem', label: 'Problema', frames: 90 },
  { id: 'home', label: 'Início', frames: 120 },
  { id: 'trio', label: 'As telas', frames: 150 },
  { id: 'gastos', label: 'Divisão de contas', frames: 120 },
  { id: 'outcome', label: 'Resultado', frames: 105 },
  { id: 'end', label: 'Encerramento', frames: 60 },
] as const;

export type SceneId = (typeof SCENES)[number]['id'];

// Com transições, a cena i começa em soma(frames anteriores) - i * transição.
export const sceneStarts = (variant: Variant): number[] => {
  const t = VARIANTS[variant].transitionFrames;
  let acc = 0;
  return SCENES.map((s, i) => {
    const start = acc - i * t;
    acc += s.frames;
    return start;
  });
};

export const totalFrames = (variant: Variant): number =>
  SCENES.reduce((a, s) => a + s.frames, 0) - (SCENES.length - 1) * VARIANTS[variant].transitionFrames;
