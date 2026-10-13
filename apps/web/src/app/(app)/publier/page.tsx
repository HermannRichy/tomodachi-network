'use client';
import { useState } from 'react';
import { me } from '@tomodachi/fixtures';
import { Toggle } from '@/components/client';
import { Icon } from '@/components/icon';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Button,
  IconButton,
  Note,
  Poster,
  cardClass,
  chipClass,
} from '@/components/ui';

const MAX = 500;

// Nouvelle publication (maquette Composer)
export default function Publier() {
  const [text, setText] = useState(
    "Ma théorie sur le mentor : tout était annoncé dès l'épisode 3. Je vous explique en image.",
  );
  const [spoiler, setSpoiler] = useState(true);
  const [episode, setEpisode] = useState(12);
  const [image, setImage] = useState(true);
  return (
    <>
      <AppBar>
        <IconButton icon="x" label="Fermer" href="/feed" />
        <AppBarTitle>Nouvelle publication</AppBarTitle>
        <Button href="/feed" size="sm">
          Publier
        </Button>
      </AppBar>
      <main className="flex flex-1 flex-col gap-3.5 px-4 pt-1.5 pb-3">
        <div className="flex items-center gap-2.5">
          <Avatar initial={me.initial} tone={me.tone} />
          <div className="flex flex-col gap-1">
            <b className="text-body font-extrabold">{me.name}</b>
            <button
              type="button"
              className={chipClass('default', false, 'min-h-8 self-start px-2.5')}
            >
              <Icon name="globe" size={16} />
              Public
              <Icon name="caret-right" size={16} />
            </button>
          </div>
        </div>
        <label>
          <span className="sr-only">Texte de la publication</span>
          <textarea
            rows={4}
            maxLength={MAX}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full resize-none bg-transparent text-title-3 font-semibold text-ink outline-none"
          />
        </label>
        {image && (
          <Poster tone={5} free className="h-40">
            <span className="relative flex items-center gap-1.5">
              <Icon name="image" size={18} />
              theorie-mentor.png
            </span>
            <button
              type="button"
              onClick={() => setImage(false)}
              aria-label="Retirer l'image"
              className="absolute top-1.5 right-1.5 z-10 flex size-9 items-center justify-center rounded-pill bg-scrim/50 text-on-media"
            >
              <Icon name="x" size={18} />
            </button>
          </Poster>
        )}
        <div className="flex flex-wrap gap-2">
          <span className={chipClass('on', true)}>
            <Icon name="television" size={18} />
            Lames du crépuscule
          </span>
          <button type="button" className={chipClass('default', true)}>
            <Icon name="plus" size={18} />
            Tag
          </button>
        </div>
        <div className={cardClass('default', true)}>
          <div className="flex items-center gap-2.5">
            <Icon name="eye-slash" className="text-sakura" />
            <span className="flex flex-1 flex-col gap-1">
              <b className="text-body-sm font-extrabold">Contient un spoiler</b>
              <span className="text-caption text-ink-muted">
                Masqué pour ceux qui n&apos;y sont pas encore
              </span>
            </span>
            <Toggle on={spoiler} onChange={setSpoiler} label="Contient un spoiler" />
          </div>
          {spoiler && (
            <div className="flex items-center gap-2">
              <span className="flex-1 text-body-sm text-ink-muted">
                Jusqu&apos;à l&apos;épisode
              </span>
              <button
                type="button"
                className={chipClass('default', true)}
                aria-label="Diminuer"
                onClick={() => setEpisode((e) => Math.max(1, e - 1))}
              >
                −
              </button>
              <b className="min-w-8 text-center text-title-3 tabular-nums" aria-live="polite">
                {episode}
              </b>
              <button
                type="button"
                className={chipClass('default', true)}
                aria-label="Augmenter"
                onClick={() => setEpisode((e) => e + 1)}
              >
                +
              </button>
            </div>
          )}
        </div>
        <Note tone="gold" icon="lightning" className="py-2">
          +10 EXP · compte pour le défi de l&apos;arc
        </Note>
      </main>
      <div className="sticky bottom-0 flex items-center justify-between border-t-2 border-border bg-surface px-3 pt-2 pb-[max(env(safe-area-inset-bottom),12px)]">
        <div className="flex gap-1 text-primary">
          <IconButton icon="image" label="Ajouter une image" onClick={() => setImage(true)} />
          <IconButton icon="gif" label="Ajouter un GIF" />
          <IconButton icon="hash" label="Ajouter un hashtag" />
          <IconButton icon="sliders-horizontal" label="Ajouter un sondage" />
        </div>
        <span className="text-label text-ink-muted tabular-nums">
          {text.length} / {MAX}
        </span>
      </div>
    </>
  );
}
