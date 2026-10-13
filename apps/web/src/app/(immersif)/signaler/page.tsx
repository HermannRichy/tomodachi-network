'use client';
import { useState } from 'react';
import { members, posts, reportReasons } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { PostCard } from '@/components/post';
import { Button, IconButton, Kami, Logo, cardClass, cx } from '@/components/ui';

// Signaler un contenu : feuille par-dessus la publication
export default function Signaler() {
  const [picked, setPicked] = useState('spoiler');
  const [sent, setSent] = useState(false);
  return (
    <div className="relative flex min-h-dvh flex-1 flex-col">
      <div aria-hidden className="mx-auto flex w-full max-w-xl flex-col gap-3 px-4">
        <div className="flex min-h-[52px] items-center">
          <Logo />
        </div>
        <PostCard post={posts[0]!} interactive={false} />
      </div>
      <div className="fixed inset-0 z-20 flex flex-col justify-end bg-scrim/50 sm:items-center sm:justify-center sm:p-6">
        <div
          role="dialog"
          aria-modal
          aria-label="Signaler cette publication"
          className="flex w-full flex-col gap-3 rounded-t-xl bg-surface px-4 pt-2.5 pb-[max(env(safe-area-inset-bottom),34px)] sm:max-w-md sm:rounded-xl sm:border-b-[6px] sm:border-border-depth sm:pb-6"
        >
          <span className="h-[5px] w-10 self-center rounded-pill bg-border-depth sm:hidden" />
          {!sent ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-title-3">Signaler cette publication</h2>
                <IconButton icon="x" label="Fermer" href="/feed" />
              </div>
              <p className="text-body-sm text-ink-muted">
                Ton signalement reste anonyme. Choisis la raison :
              </p>
              <div
                role="radiogroup"
                aria-label="Raison du signalement"
                className="flex flex-col gap-2"
              >
                {reportReasons.map((r) => {
                  const on = picked === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setPicked(r.id)}
                      className={cardClass(
                        on ? 'selected' : 'default',
                        false,
                        'w-full flex-row items-center gap-3 border-b-2 px-3 py-2.5 text-left',
                      )}
                    >
                      <Icon name={r.icon} size={20} />
                      <span className="flex-1 text-body-sm font-extrabold">{r.label}</span>
                      <span
                        className={cx(
                          'size-[22px] rounded-pill border-2 border-border-depth',
                          on &&
                            'border-primary bg-primary shadow-[inset_0_0_0_3px_var(--tomo-surface)]',
                        )}
                      />
                    </button>
                  );
                })}
              </div>
              <Button block onClick={() => setSent(true)}>
                Envoyer le signalement
              </Button>
              <div className="grid grid-cols-2 gap-2.5">
                <Button variant="secondary" size="sm" icon="eye-slash">
                  Masquer
                </Button>
                <Button variant="secondary-danger" size="sm" icon="prohibit">
                  Bloquer {members.aiko.name}
                </Button>
              </div>
            </>
          ) : (
            <div role="status" className="flex flex-col items-center gap-2.5 py-3 text-center">
              <Kami size={110} alt="Kami-sama" />
              <h2 className="text-title-2">Merci, nakama</h2>
              <p className="text-body-sm text-ink-muted">
                Kami-sama examine ce contenu. Tu seras prévenu de la décision.
              </p>
              <Button href="/feed" block>
                Retour au feed
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
