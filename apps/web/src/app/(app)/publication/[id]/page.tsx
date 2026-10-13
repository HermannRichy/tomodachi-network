import type { Metadata } from 'next';
import Link from 'next/link';
import {
  comments,
  className as playerClassName,
  post as getPost,
  posts,
  me,
  type Comment,
} from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { SugoiButton } from '@/components/post';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Badge,
  Button,
  IconButton,
  chipClass,
  cx,
} from '@/components/ui';

export const metadata: Metadata = { title: 'Publication' };
// Page prérendue pour chaque publication connue : pas de squelette de chargement.
export const instant = false;

export function generateStaticParams() {
  return posts.map((p) => ({ id: p.id }));
}

function CommentItem({ c, small }: { c: Comment; small?: boolean }) {
  return (
    <div className={cx('flex items-start gap-2.5', small && 'pt-1.5')}>
      <Avatar initial={c.author.initial} tone={c.author.tone} size={small ? 'xs' : 's'} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <b className="text-body-sm font-extrabold">{c.author.name}</b>
          {c.badge && <Badge tone="primary">{c.badge}</Badge>}
          <span className="text-caption text-ink-muted">{c.ago}</span>
        </div>
        <p className="text-body-sm">{c.text}</p>
        {c.sugoi !== undefined && (
          <div className="flex gap-4 text-caption">
            <button
              type="button"
              className={cx(
                'flex min-h-8 items-center gap-1 font-extrabold',
                c.reacted ? 'text-sakura' : 'text-ink-muted',
              )}
              aria-pressed={!!c.reacted}
            >
              <Icon name="fire" size={16} fill={c.reacted} />
              {c.sugoi}
            </button>
            <button type="button" className="min-h-8 font-extrabold text-ink-muted">
              Répondre
            </button>
          </div>
        )}
        {c.replies?.map((r) => (
          <CommentItem key={r.text} c={r} small />
        ))}
      </div>
    </div>
  );
}

export default async function Publication({ params }: PageProps<'/publication/[id]'>) {
  const post = getPost((await params).id);
  const a = post.author;
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/feed" />
        <AppBarTitle>Publication</AppBarTitle>
        <IconButton icon="dots-three" label="Plus d'options" href="/signaler" />
      </AppBar>
      <main className="flex flex-1 flex-col gap-3.5 px-4 pt-1 pb-3">
        <article className="flex flex-col gap-2.5">
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
                <Badge>
                  Niv. {a.level} · {playerClassName(a.playerClass)}
                </Badge>
              </div>
              <span className="text-caption text-ink-muted">
                {post.ago} · {post.context}
                {post.spoiler ? ' · ép. 12' : ''}
              </span>
            </div>
            <Button variant="secondary" size="sm">
              Suivre
            </Button>
          </div>
          <p className="text-body">{post.text}</p>
          <div className="flex flex-wrap gap-2">
            <Badge tone="primary" icon="hash">
              LamesDuCrépuscule
            </Badge>
            {post.spoiler && (
              <Badge tone="sakura" icon="eye-slash">
                Spoiler ép. 12
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <SugoiButton count={post.sugoi + 1} initial />
            <button type="button" className={chipClass()} aria-label="Enregistrer">
              <Icon name="bookmark-simple" size={18} />
            </button>
            <button type="button" className={chipClass()} aria-label="Partager">
              <Icon name="share-network" size={18} />
            </button>
          </div>
        </article>
        <div className="h-0.5 shrink-0 bg-border" />
        <div className="flex items-center justify-between">
          <h2 className="text-title-3">{post.comments} commentaires</h2>
          <button type="button" className={chipClass('default', true)}>
            <Icon name="sliders-horizontal" size={18} />
            Populaires
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {comments.map((c) => (
            <CommentItem key={c.text} c={c} />
          ))}
        </div>
      </main>
      <div className="sticky bottom-0 flex items-center gap-2 border-t-2 border-border bg-surface px-3 pt-2.5 pb-[max(env(safe-area-inset-bottom),12px)]">
        <Avatar initial={me.initial} tone={me.tone} size="s" />
        <label className="flex min-h-11 flex-1 items-center gap-2.5 rounded-md bg-surface-sunken px-3.5 text-ink-muted">
          <input
            placeholder="Écrire un commentaire"
            aria-label="Écrire un commentaire"
            className="min-w-0 flex-1 bg-transparent text-body text-ink outline-none placeholder:text-ink-muted"
          />
          <Icon name="gif" size={20} />
        </label>
        <Button icon="paper-plane-right" aria-label="Envoyer" size="icon-sm" />
      </div>
    </>
  );
}
