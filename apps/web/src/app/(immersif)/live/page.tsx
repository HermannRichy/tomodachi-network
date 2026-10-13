'use client';
import Link from 'next/link';
import { useState } from 'react';
import { fr, liveChat, members } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Avatar, Badge, Button, IconButton, cx } from '@/components/ui';

const nameTone = {
  1: 'text-avatar-1',
  2: 'text-avatar-2',
  3: 'text-avatar-3',
  4: 'text-avatar-4',
  5: 'text-avatar-5',
  6: 'text-avatar-6',
} as const;

export default function Live() {
  const [likes, setLikes] = useState(1204);
  const s = members.sora;
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-media-live text-on-media">
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-on-media-muted"
        role="img"
        aria-label={`Live de ${s.name}`}
      >
        <Icon name="palette" size={40} />
        <span className="text-caption">[Flux live · {s.name} dessine en direct]</span>
      </div>
      <header className="relative z-10 flex items-center gap-2 px-4 pt-3">
        <Link
          href={`/membre/${s.username}`}
          className="flex items-center gap-2 rounded-pill bg-scrim/40 py-1 pr-3 pl-1"
        >
          <Avatar initial={s.initial} tone={s.tone} size="s" />
          <span className="flex flex-col">
            <b className="text-body-sm font-extrabold">{s.name}</b>
            <span className="text-caption text-on-media-muted">Fan art live</span>
          </span>
        </Link>
        <Badge tone="hang">EN DIRECT</Badge>
        <Badge tone="dark" icon="eye">
          312
        </Badge>
        <span className="flex-1" />
        <IconButton
          icon="x"
          label="Quitter le live"
          href="/guild"
          className="rounded-pill bg-scrim/40"
        />
      </header>
      <div className="flex-1" />
      <div className="relative z-10 flex max-w-[280px] flex-col gap-2 px-4" aria-live="polite">
        {liveChat.map((m) => (
          <p key={m.text} className="self-start rounded-md bg-scrim/40 px-3 py-1.5 text-body-sm">
            <b className={cx('font-extrabold', nameTone[m.tone])}>{m.name}</b> {m.text}
          </p>
        ))}
      </div>
      <div className="relative z-10 flex items-center gap-2 px-4 pt-3 pb-11">
        <label className="flex min-h-[46px] flex-1 items-center rounded-md border-2 border-on-media/25 bg-scrim/40 px-3.5">
          <input
            placeholder="Commenter"
            aria-label="Commenter le live"
            className="min-w-0 flex-1 bg-transparent text-body text-on-media outline-none placeholder:text-on-media-muted"
          />
        </label>
        <Button variant="gold" size="round-sm" icon="gift" aria-label="Offrir des pièces" />
        <Button
          variant="sakura"
          size="round-sm"
          icon="heart"
          iconFill
          aria-label={`Envoyer un cœur, ${fr(likes)}`}
          onClick={() => setLikes(likes + 1)}
        />
      </div>
    </div>
  );
}
