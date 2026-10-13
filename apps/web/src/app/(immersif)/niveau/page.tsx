import type { Metadata } from 'next';
import { fr, levelUp as l } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { RewardEffects } from '@/components/motion';
import { Bar, Button, Card, IconButton, Kami, SectionTitle, Tile } from '@/components/ui';

export const metadata: Metadata = { title: 'Niveau supérieur' };

export default function Niveau() {
  return (
    <div className="flex flex-1 flex-col bg-primary text-on-primary">
      <RewardEffects />
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <header className="flex min-h-[52px] items-center justify-end px-2">
          <IconButton icon="x" label="Fermer" href="/feed" className="hover:bg-on-primary/10" />
        </header>
        <main className="flex flex-1 flex-col gap-5 px-6 pb-10">
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <div
              className="flex animate-pop items-center gap-2 text-gold [animation-delay:500ms]"
              aria-hidden
            >
              <Icon name="sparkle" size={20} />
              <Icon name="star" fill size={32} />
              <Icon name="sparkle" size={20} />
            </div>
            <span className="animate-pop">
              <Kami size={170} alt="Kami-sama te félicite" />
            </span>
            <p className="text-label tracking-[0.08em] opacity-85">NIVEAU SUPÉRIEUR</p>
            <h1 className="animate-pop text-hero [animation-delay:250ms]">{l.level}</h1>
            <p className="animate-enter text-title-3 [animation-delay:400ms]">{l.rank}</p>
            <div className="mt-2 flex w-full flex-col gap-1.5">
              <Bar
                value={(l.exp / l.expNext) * 100}
                variant="exp"
                size="thick"
                label="Progression vers le niveau 14"
              />
              <span className="flex justify-between text-caption tabular-nums opacity-90">
                <span>
                  {l.exp} / {fr(l.expNext)} EXP
                </span>
                <span>Niveau {l.level + 1}</span>
              </span>
            </div>
          </div>
          <Card>
            <SectionTitle>Récompenses</SectionTitle>
            {l.rewards.map((r, i) => (
              <div
                key={r.label}
                className="flex animate-enter items-center gap-2.5"
                style={{ animationDelay: `${700 + i * 120}ms` }}
              >
                <Tile icon={r.icon} tone={r.tone} size={40} />
                <span className="flex-1 text-body-sm font-extrabold">{r.label}</span>
              </div>
            ))}
          </Card>
          <div className="grid grid-cols-2 gap-2.5">
            <Button variant="secondary" icon="share-network">
              Partager
            </Button>
            <Button href="/feed" variant="gold">
              Continuer
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
