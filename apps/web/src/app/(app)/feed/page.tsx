import type { Metadata } from 'next';
import Link from 'next/link';
import { posts, season } from '@tomodachi/fixtures';
import { ChipTabs } from '@/components/client';
import { PostCard } from '@/components/post';
import { AppBar, Bar, IconButton, Logo, Screen } from '@/components/ui';

export const metadata: Metadata = { title: 'Accueil' };

export default function Feed() {
  return (
    <>
      <AppBar className="lg:hidden">
        <Logo className="flex-1" />
        <IconButton icon="magnifying-glass" label="Rechercher" href="/explorer" />
        <IconButton icon="bell" label="Notifications, 3 nouvelles" href="/notifications" dot />
      </AppBar>
      <Screen className="gap-3 pt-1 lg:pt-5">
        <Link
          href="/arc"
          className="flex flex-col gap-2 rounded-lg border-b-[6px] border-primary-depth bg-primary p-3 text-on-primary transition-transform hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-label tracking-[0.06em] opacity-85">ARC DE SAISON</span>
            <span className="text-caption opacity-85">{season.remaining}</span>
          </div>
          <span className="text-title-3">{season.name}</span>
          <Bar value={season.feedChallenge.progress} variant="exp" />
          <span className="text-caption opacity-90">{season.feedChallenge.label}</span>
        </Link>
        <ChipTabs tabs={['Pour toi', 'Nakama', 'Guilds', 'Lives']} label="Filtrer le feed" />
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </Screen>
    </>
  );
}
