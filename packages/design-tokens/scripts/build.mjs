// Génère les fichiers consommés par le web (Tailwind CSS 4) et le mobile (NativeWind / Tailwind 3)
// à partir de tokens.json, la source de vérité du design system Tomodachi.
// Lancer : pnpm --filter @tomodachi/design-tokens run build
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(join(root, 'tokens.json'), 'utf8'));
const out = (file, text) => {
  mkdirSync(dirname(join(root, file)), { recursive: true });
  writeFileSync(join(root, file), text);
};

const HEADER = '/* Généré par scripts/build.mjs depuis tokens.json : ne pas modifier à la main. */\n';

// "bg" devient "background" pour des classes lisibles (bg-background, text-ink…).
const key = (name) => (name === 'bg' ? 'background' : name);
const colors = tokens.color.tokens.map((t) => ({
  key: key(t.name),
  light: typeof t.value === 'string' ? t.value : t.value.light,
  dark: typeof t.value === 'string' ? t.value : (t.value.dark ?? t.value.light),
}));
const channels = (hex) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(' ');
};
const radius = Object.fromEntries(tokens.radius.tokens.map((t) => [t.name.replace('radius-', ''), t.value]));
const depth = Object.fromEntries(tokens.depth.tokens.map((t) => [t.name, t.value]));
const textStyles = tokens.type.groups.flatMap((g) => g.styles);

// Web : Tailwind CSS 4 (variables hex, thème clair par défaut, sombre via .dark ou le système)
const webVars = (mode) => colors.map((c) => `  --tomo-${c.key}: ${c[mode]};`).join('\n');
out(
  'theme.css',
  `${HEADER}
:root {
${webVars('light')}
  color-scheme: light;
}

.dark {
${webVars('dark')}
  color-scheme: dark;
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
${webVars('dark').replace(/^ {2}/gm, '    ')}
    color-scheme: dark;
  }
}

@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
${colors.map((c) => `  --color-${c.key}: var(--tomo-${c.key});`).join('\n')}
  --font-sans: var(--font-nunito), 'Hiragino Maru Gothic ProN', system-ui, sans-serif;
${Object.entries(radius).map(([k, v]) => `  --radius-${k}: ${v};`).join('\n')}
${textStyles
  .map(
    (s) =>
      `  --text-${s.name}: ${s.fontSize};\n  --text-${s.name}--line-height: ${s.lineHeight};\n  --text-${s.name}--font-weight: ${s.fontWeight};`,
  )
  .join('\n')}
}
`,
);

// Mobile : NativeWind 4 (variables en canaux RVB pour gérer l'opacité, sombre via le système)
const nwVars = (mode) => colors.map((c) => `    --tomo-${c.key}: ${channels(c[mode])};`).join('\n');
out(
  'nativewind.css',
  `${HEADER}
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
${nwVars('light')}
  }
  @media (prefers-color-scheme: dark) {
    :root {
${nwVars('dark').replace(/^ {4}/gm, '      ')}
    }
  }
}
`,
);

// Metro lit plus sûrement un fichier local : on recopie la feuille dans l'app mobile.
writeFileSync(
  join(root, '../../apps/mobile/src/global.css'),
  readFileSync(join(root, 'nativewind.css'), 'utf8').replace(
    HEADER,
    '/* Copie de packages/design-tokens/nativewind.css, recopiée par `pnpm tokens`. Ne pas modifier ici. */\n',
  ),
);

// Preset Tailwind 3 pour NativeWind : mêmes noms de classes que sur le web.
const preset = {
  theme: {
    extend: {
      colors: Object.fromEntries(colors.map((c) => [c.key, `rgb(var(--tomo-${c.key}) / <alpha-value>)`])),
      borderRadius: radius,
      borderWidth: { 'depth-sm': depth['depth-sm'], 'depth-md': depth['depth-md'], 'depth-lg': depth['depth-lg'] },
      fontSize: Object.fromEntries(
        textStyles.map((s) => [s.name, [s.fontSize, { lineHeight: s.lineHeight, fontWeight: String(s.fontWeight) }]]),
      ),
      // En React Native, chaque graisse de Nunito est une famille distincte.
      fontFamily: {
        nunito: ['Nunito_600SemiBold'],
        'nunito-bold': ['Nunito_700Bold'],
        'nunito-extrabold': ['Nunito_800ExtraBold'],
        'nunito-black': ['Nunito_900Black'],
      },
    },
  },
};
out(
  'tailwind-preset.cjs',
  `${HEADER}module.exports = ${JSON.stringify(preset, null, 2)};\n`,
);

// TypeScript : valeurs brutes pour les cas où une classe ne suffit pas (couleur d'icône, StatusBar…).
const colorObj = (mode) =>
  Object.fromEntries(colors.map((c) => [c.key.replace(/-([a-z])/g, (_, l) => l.toUpperCase()), c[mode]]));
out(
  'src/tokens.ts',
  `${HEADER.replace('/*', '//').replace(' */', '')}
export const colors = ${JSON.stringify({ light: colorObj('light'), dark: colorObj('dark') }, null, 2)} as const;

export const radius = ${JSON.stringify(radius, null, 2)} as const;

export const depth = ${JSON.stringify(depth, null, 2)} as const;

export const textStyles = ${JSON.stringify(
    Object.fromEntries(textStyles.map((s) => [s.name, { fontSize: s.fontSize, lineHeight: s.lineHeight, fontWeight: s.fontWeight }])),
    null,
    2,
  )} as const;

export type ColorScheme = keyof typeof colors;
export type ColorToken = keyof (typeof colors)['light'];
`,
);

console.log(`design-tokens : ${colors.length} couleurs, ${textStyles.length} styles de texte générés.`);
