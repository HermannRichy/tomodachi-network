'use client';
import { useState } from 'react';
import { me, quiz } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Bar,
  Button,
  IconButton,
  cardClass,
  cx,
} from '@/components/ui';

// Quiz battle contre un membre d'une guild adverse
export default function Quiz() {
  const [picked, setPicked] = useState<string | null>(null);
  const right = picked === quiz.good;
  const o = quiz.opponent;
  return (
    <>
      <AppBar>
        <IconButton icon="x" label="Quitter le quiz" href="/guerre-guilds" />
        <AppBarTitle center>
          Question {quiz.index} / {quiz.total}
        </AppBarTitle>
        <span className="size-11" aria-hidden />
      </AppBar>
      <main className="flex flex-1 flex-col gap-4 px-5 pt-1 pb-10">
        <div className={cardClass('default', true, 'flex-row items-center justify-between')}>
          <div className="flex items-center gap-2">
            <Avatar initial={me.initial} tone={me.tone} size="s" />
            <span className="flex flex-col">
              <b className="text-body-sm font-extrabold">Toi</b>
              <b className="text-title-3 text-primary tabular-nums" aria-live="polite">
                {picked ? (right ? 400 : 300) : 300}
              </b>
            </span>
          </div>
          <span className="text-label text-ink-muted">VS</span>
          <div className="flex items-center gap-2">
            <span className="flex flex-col text-right">
              <b className="text-body-sm font-extrabold">{o.name}</b>
              <b className="text-title-3 text-sakura tabular-nums">200</b>
            </span>
            <Avatar initial={o.initial} tone={o.tone} size="s" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="flex justify-between text-label">
            <span className="text-ink-muted">Temps restant</span>
            <span className="text-sakura tabular-nums">0:08</span>
          </span>
          <Bar value={55} variant="war" label="Temps restant" />
        </div>
        <h1 className="py-3 text-center text-title-2">{quiz.question}</h1>
        <div className="flex flex-col gap-2.5">
          {quiz.answers.map((a) => {
            const variant = !picked
              ? 'secondary'
              : a.key === quiz.good
                ? 'primary'
                : a.key === picked
                  ? 'danger'
                  : 'secondary';
            return (
              <Button
                key={a.key}
                variant={variant}
                block
                aria-pressed={picked === a.key}
                onClick={() => !picked && setPicked(a.key)}
                className="justify-start gap-3"
              >
                <span className="flex size-8 items-center justify-center rounded-md bg-surface-sunken font-black text-ink">
                  {a.key}
                </span>
                {a.label}
              </Button>
            );
          })}
        </div>
        {picked && (
          <div className="mt-auto flex flex-col gap-2.5 pt-2">
            <div
              role="status"
              className={cx(
                'flex items-center gap-2 rounded-md p-3',
                right ? 'bg-success-soft text-success-ink' : 'bg-danger-soft text-danger-ink',
              )}
            >
              <Icon name={right ? 'check-circle' : 'warning'} />
              <span className="flex-1 text-body-sm font-extrabold">
                {right
                  ? 'Bien joué ! +100 points pour ta guild'
                  : 'Raté, la bonne réponse était Mecha'}
              </span>
            </div>
            <Button href="/quiz-resultat" block>
              Question suivante
            </Button>
          </div>
        )}
      </main>
    </>
  );
}
