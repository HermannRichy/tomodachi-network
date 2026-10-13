'use client';
import { useState } from 'react';
import { members, watchPartyChat } from '@tomodachi/fixtures';
import { Bubble } from '@/components/bubble';
import { Icon } from '@/components/icon';
import { Floaters, haptic, useFloaters } from '@/components/motion';
import {
  Avatar,
  AvatarStack,
  Badge,
  Bar,
  Button,
  IconButton,
  chipClass,
  cx,
} from '@/components/ui';

function ReactionChip({
  label,
  count,
  onReact,
}: {
  label: string;
  count: number;
  onReact: () => void;
}) {
  const floaters = useFloaters();
  return (
    <button
      type="button"
      onClick={() => {
        onReact();
        floaters.push();
        haptic();
      }}
      className={chipClass('react', false, 'relative flex-1 justify-center active:scale-95')}
    >
      <Floaters items={floaters.items} remove={floaters.remove}>
        <span className="text-label text-sakura">+1</span>
      </Floaters>
      {label}{' '}
      <span key={count} className="inline-block animate-pop tabular-nums">
        {count}
      </span>
    </button>
  );
}

export default function WatchParty() {
  const [playing, setPlaying] = useState(false);
  const [counts, setCounts] = useState({ sugoi: 42, kawaii: 18, nani: 27 });
  const reactions = [
    { k: 'sugoi', label: 'Sugoi' },
    { k: 'kawaii', label: 'Kawaii' },
    { k: 'nani', label: 'Nani ?!' },
  ] as const;
  const { aiko, yuna } = members;
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col">
      <header className="flex min-h-[52px] items-center gap-1 px-2 pt-0.5 pb-1.5">
        <IconButton icon="arrow-left" label="Retour" href="/feed" />
        <span className="flex min-w-0 flex-1 flex-col px-1">
          <h1 className="text-title-3 font-black">Watch party</h1>
          <span className="text-caption text-ink-muted">Lames du crépuscule · ép. 9</span>
        </span>
        <span className="mr-2">
          <AvatarStack>
            <Avatar initial={aiko.initial} tone={aiko.tone} size="xs" />
            <Avatar initial={yuna.initial} tone={yuna.tone} size="xs" />
            <Avatar initial="+10" tone={4} size="xs" />
          </AvatarStack>
        </span>
      </header>
      <div className="flex shrink-0 flex-col gap-2 px-4">
        <div className="relative flex h-[200px] items-center justify-center rounded-lg border-b-4 border-media-depth bg-media text-on-media sm:h-[300px]">
          <Badge tone="live" icon="broadcast" className="absolute top-3 left-3">
            Synchronisé · 12 nakama
          </Badge>
          <Button
            variant="white"
            size="round"
            icon={playing ? 'pause' : 'play'}
            iconFill
            aria-label={playing ? 'Pause' : 'Lecture'}
            onClick={() => setPlaying(!playing)}
          />
          <span className="absolute right-3 bottom-3 text-caption text-on-media-muted">
            [Flux vidéo]
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-caption text-ink-muted tabular-nums">
          <span>08:42</span>
          <Bar value={36} size="thin" className="flex-1" label="Position dans l'épisode" />
          <span>24:00</span>
        </div>
      </div>
      <main
        aria-label="Chat en direct"
        className="flex flex-1 flex-col justify-end gap-2.5 px-4 py-2.5"
      >
        {watchPartyChat.map((m) => (
          <div key={m.text} className="flex items-start gap-2">
            <Avatar initial={m.member.initial} tone={m.member.tone} size="xs" />
            <Bubble className="px-3 py-2">
              <b
                className={cx(
                  'block text-caption font-extrabold',
                  m.nameTone === 'sakura' ? 'text-sakura' : 'text-primary',
                )}
              >
                {m.member.name}
              </b>
              {m.text}
            </Bubble>
          </div>
        ))}
        <Bubble me>Prêt, popcorn en main</Bubble>
        <span className="self-center rounded-pill bg-gold-soft px-3 py-1 text-caption font-extrabold text-gold-ink">
          Aïko a rejoint la watch party
        </span>
      </main>
      <div className="sticky bottom-0 bg-background">
        <div className="flex gap-2 px-4 pb-2">
          {reactions.map((r) => (
            <ReactionChip
              key={r.k}
              label={r.label}
              count={counts[r.k]}
              onReact={() => setCounts((c) => ({ ...c, [r.k]: c[r.k] + 1 }))}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 border-t-2 border-border bg-surface px-3 pt-2.5 pb-[max(env(safe-area-inset-bottom),12px)]">
          <label className="flex min-h-11 flex-1 items-center gap-2.5 rounded-md bg-surface-sunken px-3.5 text-ink-muted">
            <input
              placeholder="Écrire aux nakama"
              aria-label="Écrire dans le chat"
              className="min-w-0 flex-1 bg-transparent text-body text-ink outline-none placeholder:text-ink-muted"
            />
            <Icon name="smiley" size={20} />
          </label>
          <Button size="icon-sm" icon="paper-plane-right" aria-label="Envoyer" />
        </div>
      </div>
    </div>
  );
}
