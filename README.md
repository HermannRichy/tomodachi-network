# Tomodachi

Le réseau social des otakus : guilds, nakama, watch parties, arcs de saison et Kami-sama qui veille sur tout ce petit monde.

## Démarrer

Prérequis : Node 22, pnpm 10 (`corepack enable`), Docker pour la base de données.

```bash
git clone https://github.com/HermannRichy/tomodachi-network.git
cd tomodachi-network
pnpm install

pnpm db:up          # PostgreSQL + Redis
cp apps/backend/.env.example apps/backend/.env
pnpm dev:backend    # API sur http://localhost:3000

pnpm dev:web        # site sur http://localhost:3001 si 3000 est pris
pnpm dev:mobile     # Expo : scanner le QR code avec Expo Go
```

## Structure

```
apps/
  mobile/     Expo + NativeWind
  web/        Next.js + Tailwind CSS
  backend/    NestJS
packages/
  design-tokens/   design system partagé
  types/           schémas Zod partagés
  config/          tsconfig partagé
infra/        Docker, puis Kubernetes
docs/         maquettes et design system
```

Le détail des conventions est dans [CLAUDE.md](./CLAUDE.md).
