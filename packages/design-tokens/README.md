# @tomodachi/design-tokens

Source de vérité du design system Tomodachi : `tokens.json` (copie du design system publié).

Après toute modification de `tokens.json`, régénérer les fichiers :

```bash
pnpm tokens
```

| Fichier généré | Utilisé par | Rôle |
| --- | --- | --- |
| `theme.css` | `apps/web` | Variables clair et sombre + thème Tailwind CSS 4 |
| `nativewind.css` | `apps/mobile` | Variables en canaux RVB pour NativeWind |
| `tailwind-preset.cjs` | `apps/mobile` | Preset Tailwind 3 (couleurs, rayons, reliefs, styles de texte) |
| `src/tokens.ts` | les deux | Valeurs brutes (couleurs d'icônes, StatusBar…) |

Les noms de classes sont les mêmes partout : `bg-background`, `bg-surface`, `text-ink`, `text-ink-muted`, `bg-primary`, `text-on-primary`, `border-border`, `border-b-primary-depth`, `rounded-lg`, `text-title-1`…

Seule différence : la graisse de Nunito. Sur le web, `font-black` suffit ; en React Native, chaque graisse est une famille : `font-nunito`, `font-nunito-bold`, `font-nunito-extrabold`, `font-nunito-black`.
