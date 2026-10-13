import type { MetadataRoute } from 'next';
import { colors } from '@tomodachi/design-tokens';

// Manifeste PWA : installation sur Android, iPhone et ordinateur.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Tomodachi',
    short_name: 'Tomodachi',
    description: 'Le réseau social des otakus : guilds, nakama, watch parties et arcs de saison.',
    lang: 'fr',
    start_url: '/feed',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: colors.light.primary,
    theme_color: colors.light.primary,
    categories: ['social', 'entertainment'],
    icons: [
      { src: '/icons/192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Publier', url: '/publier', icons: [{ src: '/icons/192.png', sizes: '192x192' }] },
      { name: 'Messages', url: '/messages', icons: [{ src: '/icons/192.png', sizes: '192x192' }] },
      { name: 'Ma guild', url: '/guild', icons: [{ src: '/icons/192.png', sizes: '192x192' }] },
    ],
  };
}
