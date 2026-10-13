'use client';
import Link from 'next/link';
import { useState } from 'react';
import { upNext, watchlist } from '@tomodachi/fixtures';
import { SegTabs } from '@/components/client';
import { Icon } from '@/components/icon';
import {
  AppBar,
  AppBarTitle,
  Bar,
  Button,
  Card,
  IconButton,
  Poster,
  SectionHeader,
} from '@/components/ui';

// Tracker de visionnage
export default function Watchlist() {
  const [eps, setEps] = useState(() => watchlist.map((w) => w.episode));
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/profil" />
        <AppBarTitle>Mon visionnage</AppBarTitle>
        <IconButton icon="plus" label="Ajouter un anime" href="/explorer" />
      </AppBar>
      <main className="flex flex-1 flex-col gap-3.5 px-4 pt-1 pb-6">
        <SegTabs tabs={['En cours · 3', 'Terminés · 148', 'À voir · 12']} label="Listes" />
        <Card variant="primary" tight row>
          <Icon name="film-strip" size={32} />
          <span className="flex flex-1 flex-col gap-1">
            <b className="text-body font-extrabold">Cette semaine</b>
            <span className="text-body-sm tabular-nums opacity-90">
              9 épisodes · 3 h 36 · +90 EXP
            </span>
          </span>
        </Card>
        <div className="flex flex-col gap-2.5">
          {watchlist.map((w, i) => {
            const ep = eps[i]!;
            return (
              <Card key={w.anime.id} tight row>
                <Poster
                  tone={w.anime.tone}
                  href={`/anime/${w.anime.id}`}
                  label={w.anime.title}
                  className="w-[60px] shrink-0 p-0"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <Link
                    href={`/anime/${w.anime.id}`}
                    className="text-body font-extrabold hover:underline"
                  >
                    {w.anime.title}
                  </Link>
                  <span className="text-caption text-ink-muted tabular-nums">
                    Épisode {ep} / {w.anime.episodes} · {w.next}
                  </span>
                  <Bar
                    value={(ep / w.anime.episodes) * 100}
                    variant="watch"
                    size="thin"
                    label={`Progression ${w.anime.title}`}
                  />
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="px-3"
                  aria-label="Marquer l'épisode suivant comme vu"
                  disabled={ep >= w.anime.episodes}
                  onClick={() =>
                    setEps((e) =>
                      e.map((v, j) => (j === i ? Math.min(w.anime.episodes, v + 1) : v)),
                    )
                  }
                >
                  +1
                </Button>
              </Card>
            );
          })}
        </div>
        <section className="flex flex-col gap-2">
          <SectionHeader title="À voir ensuite" href="/explorer" />
          <div className="grid grid-cols-3 gap-2">
            {upNext.map((a) => (
              <Poster key={a.id} tone={a.tone} title={a.title} href={`/anime/${a.id}`} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
