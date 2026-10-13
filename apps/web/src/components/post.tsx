'use client';
// Carte de publication du feed : spoiler masqué selon la progression, réaction Sugoi.
import Link from 'next/link';
import { useState } from 'react';
import { className as playerClassName, fr, type Post } from '@tomodachi/fixtures';
import { Icon } from './icon';
import { Burst, haptic } from './motion';
import { Avatar, Badge, Button, Chip, IconButton, chipClass, cx } from './ui';

export function SugoiButton({ count, initial = false }: { count: number; initial?: boolean }) {
  const [on, setOn] = useState(initial);
  const [bursts, setBursts] = useState(0);
  const [touched, setTouched] = useState(false);
  const n = count + (on && !initial ? 1 : 0) - (!on && initial ? 1 : 0);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => {
        if (!on) {
          setBursts((b) => b + 1);
          haptic();
        }
        setOn(!on);
        setTouched(true);
      }}
      className={chipClass(on ? 'react-on' : 'react', false, 'relative active:scale-95')}
    >
      <span className="relative flex">
        <span key={`i${bursts}${on}`} className={on && bursts > 0 ? 'flex animate-pop' : 'flex'}>
          <Icon name="fire" size={18} fill={on} />
        </span>
        {on && bursts > 0 && <Burst key={bursts} />}
      </span>
      Sugoi{' '}
      <span key={n} className={cx('inline-block tabular-nums', touched && 'animate-pop')}>
        {fr(n)}
      </span>
    </button>
  );
}

export function SpoilerBlock({ spoiler }: { spoiler: NonNullable<Post['spoiler']> }) {
  const [shown, setShown] = useState(false);
  if (shown) {
    return (
      <p className="animate-reveal rounded-md bg-sakura-soft p-3 text-body-sm text-sakura-ink">
        {spoiler.hidden}
      </p>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setShown(true)}
      className="flex min-h-[84px] flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-border-depth bg-surface-sunken text-ink"
    >
      <span className="flex items-center gap-1.5 text-body-sm font-extrabold">
        <Icon name="eye-slash" size={20} />
        {spoiler.label}
      </span>
      <span className="text-caption text-ink-muted">{spoiler.progress} · Toucher pour révéler</span>
    </button>
  );
}

export function PostCard({
  post,
  interactive = true,
  index = 0,
}: {
  post: Post;
  interactive?: boolean;
  /** Position dans la liste : les cartes apparaissent l'une après l'autre. */
  index?: number;
}) {
  const a = post.author;
  return (
    <article
      style={{ animationDelay: `${80 + index * 70}ms` }}
      className={cx(
        'flex flex-col gap-2.5 rounded-lg border-2 border-b-4 border-border border-b-border-depth bg-surface p-3.5',
        interactive && 'animate-enter',
      )}
    >
      <div className="flex items-center gap-2.5">
        <Avatar
          initial={a.initial}
          tone={a.tone}
          href={`/membre/${a.username}`}
          label={`Profil de ${a.name}`}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Link
              href={`/membre/${a.username}`}
              className="text-body font-extrabold hover:underline"
            >
              {a.name}
            </Link>
            {!post.watchParty && (
              <Badge>
                Niv. {a.level} · {playerClassName(a.playerClass)}
              </Badge>
            )}
          </div>
          <span className="text-caption text-ink-muted">
            {post.ago} · {post.context}
          </span>
        </div>
        {!post.watchParty && interactive && (
          <IconButton
            icon="dots-three"
            label="Plus d'options"
            href="/signaler"
            className="text-ink-muted"
          />
        )}
      </div>
      <p className="text-body">{post.text}</p>
      {post.spoiler && interactive && <SpoilerBlock spoiler={post.spoiler} />}
      {post.watchParty ? (
        <Button href="/watch-party" variant="sakura" block icon="popcorn">
          Rejoindre la watch party
        </Button>
      ) : (
        interactive && (
          <div className="flex gap-2">
            <SugoiButton count={post.sugoi} />
            <Chip
              href={`/publication/${post.id}`}
              icon="chat-circle"
              label={`${post.comments} commentaires`}
            >
              {post.comments}
            </Chip>
            <button
              type="button"
              className={chipClass()}
              aria-label={`Repartager, ${post.reposts} partages`}
            >
              <Icon name="repeat" size={18} />
              {post.reposts}
            </button>
          </div>
        )
      )}
    </article>
  );
}
