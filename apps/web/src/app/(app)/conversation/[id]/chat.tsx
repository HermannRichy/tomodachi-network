'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { chat } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Bubble } from '@/components/bubble';
import { AppBar, Avatar, Badge, Button, IconButton, cardClass, chipClass } from '@/components/ui';

export function Chat() {
  const w = chat.with;
  const [draft, setDraft] = useState('');
  const [sent, setSent] = useState<string[]>([]);
  const end = useRef<HTMLDivElement>(null);
  const push = (t: string) => {
    if (!t.trim()) return;
    setSent((s) => [...s, t.trim()]);
    setDraft('');
  };
  useEffect(() => end.current?.scrollIntoView({ block: 'end' }), [sent]);
  return (
    <>
      <AppBar className="sticky top-0 z-10 border-b-2 border-border bg-background pb-2">
        <IconButton icon="arrow-left" label="Retour" href="/messages" />
        <Link href={`/membre/${w.username}`} className="flex flex-1 items-center gap-2.5">
          <Avatar initial={w.initial} tone={w.tone} online />
          <span className="flex flex-col">
            <b className="text-body font-extrabold">{w.name}</b>
            <span className="text-caption text-success">En ligne</span>
          </span>
        </Link>
        <IconButton icon="phone" label="Appel vocal" href="/appel-vocal" />
        <IconButton icon="video-camera" label="Appel vidéo" href="/appel-video" />
      </AppBar>
      <main className="flex flex-1 flex-col justify-end gap-2.5 px-4 py-3.5" aria-live="polite">
        <span className="self-center rounded-pill bg-surface-sunken px-3 py-1 text-caption font-extrabold text-ink-muted">
          Aujourd&apos;hui
        </span>
        {chat.messages.map((m, i) =>
          'shared' in m && m.shared ? (
            <Bubble key={i} className="p-2">
              <Link
                href={`/publication/${m.shared.postId}`}
                className={cardClass('default', true, 'gap-1.5')}
              >
                <span className="flex items-center gap-1.5">
                  <Avatar initial={w.initial} tone={w.tone} size="xs" />
                  <b className="text-caption font-extrabold">{w.name}</b>
                </span>
                <span className="text-body-sm">{m.shared.text}</span>
                <Badge tone="sakura" icon="eye-slash" className="self-start">
                  Spoiler masqué
                </Badge>
              </Link>
            </Bubble>
          ) : (
            <Bubble key={i} me={m.from === 'me'}>
              {'text' in m ? m.text : null}
            </Bubble>
          ),
        )}
        {sent.map((t, i) => (
          <Bubble key={`s${i}`} me className="origin-bottom-right animate-pop">
            {t}
          </Bubble>
        ))}
        <span className="self-end text-caption text-ink-muted">{chat.seen}</span>
        <div ref={end} />
      </main>
      <div className="sticky bottom-0 bg-background">
        <div className="flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
          {chat.quickReplies.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => push(q)}
              className={chipClass('react', true)}
            >
              {q}
            </button>
          ))}
        </div>
        <form
          className="flex items-center gap-2 border-t-2 border-border bg-surface px-3 pt-2.5 pb-[max(env(safe-area-inset-bottom),12px)]"
          onSubmit={(e) => {
            e.preventDefault();
            push(draft);
          }}
        >
          <IconButton icon="plus-circle" label="Joindre un fichier" className="text-primary" />
          <label className="flex min-h-11 flex-1 items-center gap-2.5 rounded-md bg-surface-sunken px-3.5 text-ink-muted">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Écrire à ${w.name}`}
              aria-label="Message"
              className="min-w-0 flex-1 bg-transparent text-body text-ink outline-none placeholder:text-ink-muted"
            />
            <Icon name="smiley" size={20} />
          </label>
          <Button type="submit" size="icon-sm" icon="paper-plane-right" aria-label="Envoyer" />
        </form>
      </div>
    </>
  );
}
