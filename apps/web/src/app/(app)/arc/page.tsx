'use client';
import { useState } from 'react';
import { season } from '@tomodachi/fixtures';
import { Icon, type IconName } from '@/components/icon';
import { Confetti, haptic } from '@/components/motion';
import { Badge, Bar, Button, Card, IconButton, SectionTitle, cx } from '@/components/ui';

const icons: Record<string, IconName> = {
  popcorn: 'popcorn',
  pencil: 'pencil-simple',
  question: 'question',
  graduation: 'graduation-cap',
};
const iconTone = { gold: 'text-gold-depth', primary: 'text-primary', sakura: 'text-sakura' };
const barVariant = { gold: 'watch', primary: 'default', sakura: 'war' } as const;

// Arc de saison
export default function Arc() {
  const [claimed, setClaimed] = useState(false);
  return (
    <>
      {claimed && <Confetti count={24} />}
      <header className="shrink-0 rounded-b-xl border-b-[6px] border-primary-depth bg-primary text-on-primary lg:mt-4 lg:rounded-xl">
        <div className="flex min-h-11 items-center px-2">
          <IconButton
            icon="arrow-left"
            label="Retour"
            href="/feed"
            className="hover:bg-on-primary/10"
          />
          <span className="flex-1" />
          <Badge tone="official" icon="timer" className="mr-2">
            {season.remaining}
          </Badge>
        </div>
        <div className="flex items-center gap-3.5 px-5 pb-5">
          <span className="flex size-[72px] shrink-0 items-center justify-center rounded-xl bg-primary-depth">
            <Icon name="ghost" size={40} />
          </span>
          <span className="flex flex-1 flex-col gap-1.5">
            <span className="text-label tracking-[0.06em] opacity-85">ARC DE SAISON</span>
            <h1 className="text-title-2">{season.name}</h1>
            <Bar value={40} variant="exp" label="Défis terminés" />
            <span className="text-caption tabular-nums opacity-90">2 défis sur 5 terminés</span>
          </span>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-2.5 px-4 pt-4 pb-6">
        <SectionTitle>Défis</SectionTitle>
        {season.challenges.map((c) => {
          const complete = c.done >= c.total;
          return (
            <Card key={c.label} tight>
              <div className="flex items-center gap-2.5">
                <Icon name={icons[c.icon]!} className={iconTone[c.tone]} />
                <b className="flex-1 text-body-sm font-extrabold">{c.label}</b>
                {complete ? (
                  claimed ? (
                    <Badge tone="success" icon="check" className="animate-pop">
                      {c.reward}
                    </Badge>
                  ) : (
                    <Button
                      variant="gold"
                      size="sm"
                      onClick={() => {
                        setClaimed(true);
                        haptic('success');
                      }}
                    >
                      Récupérer
                    </Button>
                  )
                ) : (
                  <span className="text-caption text-ink-muted tabular-nums">
                    {c.done} / {c.total}
                  </span>
                )}
              </div>
              <Bar
                value={(c.done / c.total) * 100}
                variant={complete ? 'watch' : barVariant[c.tone]}
                size="thin"
                label={c.label}
              />
              {!complete && c.reward && (
                <span className={cx('text-caption text-gold-ink')}>{c.reward}</span>
              )}
            </Card>
          );
        })}
        <Card variant="gold" tight row>
          <Icon name="gift" size={28} className="text-gold-ink" />
          <span className="flex flex-1 flex-col gap-1">
            <b className="text-body-sm font-extrabold">Récompense finale</b>
            <span className="text-caption text-gold-ink">{season.finalReward}</span>
          </span>
        </Card>
      </main>
    </>
  );
}
