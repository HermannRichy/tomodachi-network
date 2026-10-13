# Tomodachi

Réseau social pour otakus (« tomodachi » = ami en japonais). Mobile d'abord, avec une version web. Projet personnel mené de bout en bout, qui sert aussi à apprendre le DevOps. Langue du produit et des échanges : français.

## Monorepo

pnpm workspaces + Turborepo. Node 22, pnpm 10.

| Dossier | Contenu |
| --- | --- |
| `apps/mobile` | Expo SDK 57, Expo Router, NativeWind 4 (Tailwind 3), React Native 0.86 |
| `apps/web` | Next.js 16 (App Router), Tailwind CSS 4 |
| `apps/backend` | NestJS 12 (ESM), bientôt Prisma + PostgreSQL + Better Auth |
| `packages/design-tokens` | Source de vérité du design system : `tokens.json` → CSS web, preset NativeWind, constantes TS |
| `packages/types` | Schémas Zod et types partagés entre API, web et mobile |
| `packages/fixtures` | Données d'exemple des maquettes, affichées par le web et le mobile en attendant l'API |
| `packages/config` | `tsconfig.base.json` partagé |
| `infra/docker` | `docker-compose.yml` (PostgreSQL 17, Redis 7) |
| `docs/maquettes` | Les 40 écrans de référence (spécification visuelle) |
| `docs/design-system` | Brand book et composants du design system |

Répartition du travail : Hermann code le backend sur son PC ; les interfaces web et mobile sont développées depuis Claude. Toujours `git pull` avant de commencer.

## Commandes

```bash
pnpm install
pnpm dev:web        # Next.js
pnpm dev:mobile     # Expo
pnpm dev:backend    # NestJS (pnpm db:up avant pour PostgreSQL et Redis)
pnpm tokens         # régénère les fichiers du design system après modification de tokens.json
pnpm typecheck && pnpm lint && pnpm build
```

Dans `apps/mobile`, ajouter une dépendance avec `npx expo install <paquet>` pour garder des versions compatibles avec le SDK.

## Stack backend retenue

- NestJS + TypeScript, Prisma + PostgreSQL, Redis + BullMQ (cache du feed, files d'attente).
- Authentification centralisée dans l'API avec Better Auth (`@thallesp/nestjs-better-auth`) : email + mot de passe, vérification d'email, Google, Discord, Apple, 2FA. Le mobile stocke les tokens dans Expo SecureStore.
- Temps réel : WebSockets NestJS (messagerie, notifications, présence) ; WebRTC + LiveKit pour appels de groupe, lives et watch parties.
- Anti-abus : rate limiting (`@nestjs/throttler`), CAPTCHA Cloudflare Turnstile, signalements, modération.
- Hébergement : VM Oracle Cloud Always Free (API, PostgreSQL, Redis) derrière Cloudflare ; web sur Vercel ; mobile sur les stores via EAS.
- Feed : chronologique d'abord, puis score d'engagement avec décroissance, puis personnalisation par animes.

## Design system

Ne jamais coder une couleur, un rayon ou une taille de texte en dur : utiliser les classes issues de `packages/design-tokens`.

- Couleurs : `primary` (indigo, marque), `sakura` (guilds, watch party, réactions), `gold` (EXP, niveaux, récompenses), `success`, `danger` (erreurs et modération seulement), `slime` (mascotte seulement). Chaque couleur a `-depth` (relief), `-soft` (fond teinté), `-ink` (texte sur le fond teinté) et `on-` (texte sur la couleur pleine). Neutres : `background`, `surface`, `surface-sunken`, `border`, `border-depth`, `ink`, `ink-muted`.
- Relief marqué façon Duolingo : bord inférieur plus foncé de 4 px (`border-b-4 border-b-<couleur>-depth`), le bouton descend de 4 px à l'appui. Pas d'ombres portées.
- Police unique Nunito (600 à 900). Web : `font-black`… Mobile : `font-nunito`, `font-nunito-bold`, `font-nunito-extrabold`, `font-nunito-black`.
- Styles de texte : `text-display`, `text-title-1`, `text-title-2`, `text-title-3`, `text-body`, `text-body-sm`, `text-button`, `text-label`, `text-caption`.
- Rayons : `rounded-sm` 8, `rounded-md` 14, `rounded-lg` 18 (cartes, boutons), `rounded-xl` 28, `rounded-pill`.
- Icônes Phosphor, graisse Bold ; Fill pour l'onglet actif. Pas d'émoji dans l'interface.
- Clair et sombre obligatoires, cibles tactiles de 44 px minimum, contraste 4,5:1.
- Mascotte : Kami-sama, slime bleu à auréole dorée (`packages/design-tokens/assets/kami-sama.svg`, variante `kami-sama-mono.svg`), incarne l'administration. C'est aussi le favicon, le logo et l'icône de l'app.
- Couleurs fixes (identiques dans les deux thèmes) : `avatar-1…6` (+ `-ink`), `poster-1…6` (affiches et emblèmes de guild), `media`, `media-video`, `media-live`, `on-media`, `hang`, `discord`, `scrim` (avec opacité). Style de texte `text-hero` pour les chiffres géants.

## Interfaces

- Les 40 écrans existent sur le web et le mobile avec les mêmes routes : `/feed`, `/publication/[id]`, `/membre/[username]`, `/anime/[id]`, `/conversation/[id]`, `/guild`, `/arc`, `/quiz`… Le splash (`/` sur mobile) n'existe que sur mobile ; sur le web, `/` est l'écran Bienvenue.
- Web : composants dans `apps/web/src/components` (`ui.tsx`, `client.tsx`, `nav.tsx`). Groupes de routes `(auth)` colonne centrée, `(app)` barre latérale sur ordinateur et onglets en bas sur mobile, `(immersif)` plein écran. Thème mémorisé dans `localStorage` (`tomo-theme`).
- Mobile : composants dans `apps/mobile/src/components`. Tout texte passe par `<T variant weight>` (le texte n'hérite pas de la couleur en React Native), les icônes par `<Icon name className="text-…">`, les écrans par `<Screen>`. Thème forcé via `Appearance` et mémorisé avec AsyncStorage. NativeWind en `inlineRem: 16`.
- `cx()` fusionne les classes avec tailwind-merge : le `className` passé à un composant l'emporte sur son style par défaut.

## Vocabulaire du produit

Guild (groupe), nakama (abonné/ami), arc (événement saisonnier), senpai/kohai (parrainage), niveau/EXP/classe (Stratège, Mage, Guerrier, Barde), réactions Sugoi/Kawaii/Nani, Kami-sama (administration). Tutoiement, phrases courtes, termes japonais bien orthographiés.

Aucun personnage, logo ou visuel d'œuvre existante sous licence (cartes, mascotte, illustrations) : uniquement des créations originales.

## Références (privées, sur claude.ai)

- Cahier des charges : https://claude.ai/code/artifact/763296b3-dcdd-48bc-98b0-4d32087b0d60
- Roadmap à cocher : https://claude.ai/artifact/RMucFmGeA9KSjE75FPKiZr
- Design system : https://claude.ai/artifact/F6GyhDveuicPyPkHaVnzg3
- Maquettes (canvas) : https://claude.ai/artifact/XnHmmFf8h73DXevT2ziGdt

Quand une décision change, mettre ce fichier à jour dans le même commit.
