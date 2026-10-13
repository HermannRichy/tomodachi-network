'use client';
import { useState } from 'react';
import { affinityPeople } from '@tomodachi/fixtures';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Badge,
  Button,
  IconButton,
  Poster,
  SectionTitle,
  cardClass,
} from '@/components/ui';

// Rencontres par affinité (amitié uniquement)
export default function Affinites() {
  const [i, setI] = useState(0);
  const p = affinityPeople[i % affinityPeople.length]!;
  const next = () => setI(i + 1);
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/explorer" />
        <AppBarTitle>Trouver des nakama</AppBarTitle>
        <IconButton icon="sliders-horizontal" label="Filtres" />
      </AppBar>
      <main className="flex flex-1 flex-col gap-3.5 px-5 pt-1 pb-10">
        <p className="text-center text-body-sm text-ink-muted">
          Des fans qui partagent tes animes. Amitié uniquement.
        </p>
        <div className="relative flex-1">
          <div
            aria-hidden
            className={cardClass(
              'default',
              false,
              'absolute inset-x-3 top-3.5 -bottom-2.5 opacity-60',
            )}
          />
          <div
            key={i}
            aria-live="polite"
            className={cardClass(
              'default',
              false,
              'relative h-full animate-card-in items-center gap-3 px-4 py-5 text-center',
            )}
          >
            <Badge tone="official" icon="sparkle" large>
              {p.match} d&apos;affinité
            </Badge>
            <Avatar initial={p.member.initial} tone={p.member.tone} size="xl" />
            <div className="flex flex-col gap-1">
              <h1 className="text-title-2">{p.member.name}</h1>
              <span className="text-body-sm text-ink-muted">{p.meta}</span>
            </div>
            <p className="text-body-sm">{p.bio}</p>
            <div className="flex w-full flex-col gap-2">
              <SectionTitle>En commun</SectionTitle>
              <div className="grid grid-cols-3 gap-2">
                {p.animes.map((a) => (
                  <Poster key={a.id} tone={a.tone} title={a.title} square />
                ))}
              </div>
            </div>
            <div className="mt-auto flex items-center justify-center gap-6 pt-2">
              <Button
                variant="secondary"
                size="round"
                icon="x"
                aria-label="Passer"
                onClick={next}
              />
              <Button size="round-lg" icon="hand-waving" aria-label="Dire bonjour" onClick={next} />
              <Button
                variant="secondary"
                size="round"
                icon="chat-circle-dots"
                aria-label="Envoyer un message"
                href="/conversation/aiko"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
