'use client';
import { useState } from 'react';
import { animes, genres } from '@tomodachi/fixtures';
import { ChipTabs } from '@/components/client';
import { Icon } from '@/components/icon';
import { AppBar, Bottom, Button, IconButton, Input, Poster, Steps } from '@/components/ui';

// Animes favoris (étape 2 sur 3)
export default function AnimesFavoris() {
  const [on, setOn] = useState<Record<string, boolean>>({
    'lames-du-crepuscule': true,
    'academie-hoshizora': true,
    'mecha-aurora': true,
    'volley-kaze': true,
  });
  const count = Object.values(on).filter(Boolean).length;
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/classe" />
        <Steps current={2} total={3} />
        <span className="px-3 text-label text-ink-muted">2/3</span>
      </AppBar>
      <main className="flex flex-1 flex-col gap-3 px-5 pt-1 pb-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-title-1">Tes animes favoris</h1>
          <p className="text-body text-ink-muted">
            Choisis-en au moins 3 pour personnaliser ton feed.
          </p>
        </div>
        <Input
          sunken
          icon="magnifying-glass"
          type="search"
          placeholder="Chercher un anime"
          aria-label="Chercher un anime"
        />
        <ChipTabs tabs={genres} label="Genres" />
        <div className="grid grid-cols-3 gap-2">
          {animes.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={!!on[a.id]}
              onClick={() => setOn((s) => ({ ...s, [a.id]: !s[a.id] }))}
              className="rounded-md text-left"
            >
              <Poster tone={a.tone} title={a.title}>
                {on[a.id] && (
                  <span className="absolute top-2 right-2 flex size-[26px] items-center justify-center rounded-pill bg-gold text-on-gold">
                    <Icon name="check" size={16} />
                  </span>
                )}
              </Poster>
            </button>
          ))}
        </div>
        <Bottom className="gap-2">
          <p className="text-center text-label text-ink-muted" aria-live="polite">
            {count} sélectionnés
          </p>
          <Button href="/premiers-nakama" block disabled={count < 3}>
            Continuer
          </Button>
        </Bottom>
      </main>
    </>
  );
}
