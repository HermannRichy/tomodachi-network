import type { Metadata } from 'next';
import { className as playerClassName, fr, memberProfile as p, members } from '@tomodachi/fixtures';
import { SegTabs } from '@/components/client';
import { Avatar, Badge, IconButton, Note, Poster } from '@/components/ui';
import { AddNakama } from './add-nakama';

export const metadata: Metadata = { title: "Profil d'un membre" };
export const instant = false;

export function generateStaticParams() {
  return Object.values(members).map((m) => ({ username: m.username }));
}

export default async function ProfilMembre({ params }: PageProps<'/membre/[username]'>) {
  const { username } = await params;
  const m = Object.values(members).find((x) => x.username === username) ?? p;
  // Les maquettes ne détaillent que le profil d'Aïko : les autres membres reprennent sa mise en page.
  const profile = { ...p, ...m };
  return (
    <>
      <div className="relative h-[150px] shrink-0 bg-sakura text-on-sakura lg:mt-4 lg:rounded-xl">
        <div className="flex min-h-11 items-center px-2">
          <IconButton
            icon="arrow-left"
            label="Retour"
            href="/feed"
            className="hover:bg-on-sakura/10"
          />
          <span className="flex-1" />
          <IconButton
            icon="dots-three"
            label="Plus d'options"
            href="/signaler"
            className="hover:bg-on-sakura/10"
          />
        </div>
      </div>
      <main className="relative -mt-11 flex flex-1 flex-col gap-3 px-4 pb-6">
        <div className="flex items-end justify-between">
          <Avatar
            initial={profile.initial}
            tone={profile.tone}
            size="xl"
            className="border-4 border-background"
          />
          <Badge className="mb-2">Niv. {profile.level}</Badge>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-title-2">{profile.name}</h1>
            <Badge tone="sakura" icon="sparkle">
              {playerClassName(profile.playerClass)}
            </Badge>
          </div>
          <p className="text-body-sm text-ink-muted">
            @{profile.username} · {profile.bio}
          </p>
          <div className="flex gap-4 text-body-sm">
            <span>
              <b className="font-black tabular-nums">{fr(profile.posts)}</b>{' '}
              <span className="text-ink-muted">publications</span>
            </span>
            <span>
              <b className="font-black tabular-nums">{fr(profile.nakama)}</b>{' '}
              <span className="text-ink-muted">nakama</span>
            </span>
            <span>
              <b className="font-black tabular-nums">{profile.power}</b>{' '}
              <span className="text-ink-muted">power</span>
            </span>
          </div>
        </div>
        <AddNakama />
        <Note tone="primary" icon="handshake">
          {profile.common}
        </Note>
        <SegTabs tabs={['Publications', 'Fan art', 'Watchlist']} label="Contenu du profil" />
        <div className="grid grid-cols-3 gap-2">
          {profile.gallery.map((g) => (
            <Poster
              key={g.label}
              tone={g.tone}
              title={g.label}
              square
              href="/publication/twist-final"
            />
          ))}
        </div>
      </main>
    </>
  );
}
