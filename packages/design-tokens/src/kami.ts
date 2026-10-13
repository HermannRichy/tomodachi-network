// Dessin de Kami-sama découpé en calques pour l'animer (même dessin que assets/kami-sama.svg).
// Web et mobile s'en servent : ombre fixe, corps qui rebondit, yeux qui clignent, auréole qui flotte.

export const kamiViewBox = { x: 70, y: 80, width: 240, height: 225 } as const;

type Shape =
  | { kind: 'path'; d: string; fill: string; opacity?: number }
  | { kind: 'ellipse'; cx: number; cy: number; rx: number; ry: number; fill: string; rotate?: number; opacity?: number }
  | { kind: 'circle'; cx: number; cy: number; r: number; fill: string };

export const kamiArt = {
  shadow: [{ kind: 'ellipse', cx: 190, cy: 297, rx: 112, ry: 11, fill: '#1B2340', opacity: 0.12 }],
  body: [
    {
      kind: 'path',
      d: 'M190,134 C252,134 292,176 297,222 C301,256 290,273 268,283 C240,295 140,295 112,283 C90,273 79,256 83,222 C88,176 128,134 190,134 Z',
      fill: '#3FB6F5',
    },
    {
      kind: 'path',
      d: 'M84,245 C140,268 240,266 296,238 C292,266 282,276 268,283 C240,295 140,295 112,283 C96,276 86,264 84,245 Z',
      fill: '#1E8FD6',
    },
    { kind: 'ellipse', cx: 130, cy: 180, rx: 11, ry: 22, rotate: 40, fill: '#BFEBFF' },
    { kind: 'circle', cx: 158, cy: 155, r: 6, fill: '#BFEBFF' },
    { kind: 'ellipse', cx: 128, cy: 246, rx: 12, ry: 7, fill: '#FF8FB1' },
    { kind: 'ellipse', cx: 252, cy: 246, rx: 12, ry: 7, fill: '#FF8FB1' },
    { kind: 'path', d: 'M178,246 Q190,264 202,246 Z', fill: '#1B2340' },
  ],
  eyes: [
    { kind: 'ellipse', cx: 160, cy: 212, rx: 21, ry: 25, fill: '#FFFFFF' },
    { kind: 'ellipse', cx: 220, cy: 212, rx: 21, ry: 25, fill: '#FFFFFF' },
    { kind: 'ellipse', cx: 164, cy: 217, rx: 13, ry: 16, fill: '#1B2340' },
    { kind: 'ellipse', cx: 224, cy: 217, rx: 13, ry: 16, fill: '#1B2340' },
    { kind: 'circle', cx: 159, cy: 209, r: 5.5, fill: '#FFFFFF' },
    { kind: 'circle', cx: 219, cy: 209, r: 5.5, fill: '#FFFFFF' },
    { kind: 'circle', cx: 169, cy: 224, r: 2.5, fill: '#FFFFFF' },
    { kind: 'circle', cx: 229, cy: 224, r: 2.5, fill: '#FFFFFF' },
  ],
  halo: [
    { kind: 'ellipse', cx: 190, cy: 106, rx: 50, ry: 12, fill: 'none' },
    { kind: 'ellipse', cx: 190, cy: 101, rx: 50, ry: 12, fill: 'none' },
  ],
} satisfies Record<string, Shape[]>;

/** Traits de l'auréole (contour, pas de remplissage). */
export const kamiHaloStrokes = [
  { stroke: '#E5A400', width: 10 },
  { stroke: '#FFC531', width: 10 },
] as const;

/** Centre des yeux en % du dessin, pour faire cligner autour de ce point. */
export const kamiEyesOrigin = { x: '50%', y: `${(((214 - kamiViewBox.y) / kamiViewBox.height) * 100).toFixed(1)}%` } as const;

/** Durées des animations du design system (ms). */
export const motion = {
  press: 80,
  fast: 160,
  base: 240,
  slow: 400,
  reward: 900,
  kamiBounce: 2400,
  kamiFloat: 3000,
  kamiBlink: 4200,
} as const;

export type KamiShape = Shape;
