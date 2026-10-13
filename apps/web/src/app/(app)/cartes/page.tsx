import type { Metadata } from 'next';
import { cards } from '@tomodachi/fixtures';
import { ChipTabs } from '@/components/client';
import { Icon } from '@/components/icon';
import { AppBar, AppBarTitle, Badge, Bar, Card, IconButton, Poster } from '@/components/ui';

export const metadata: Metadata = { title: 'Mes cartes' };

const rarity = {
  legendaire: { label: 'Légendaire', badge: 'official', border: 'border-gold' },
  rare: { label: 'Rare', badge: 'sakura', border: 'border-sakura' },
  commune: { label: 'Commune', badge: 'primary', border: 'border-primary' },
} as const;

export default function Cartes() {
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/profil" />
        <AppBarTitle>Mes cartes</AppBarTitle>
        <Badge icon="cards" className="mr-2">
          37 / 120
        </Badge>
      </AppBar>
      <main className="flex flex-1 flex-col gap-3 px-4 pt-1 pb-6">
        <Bar value={31} variant="gold" label="Collection complétée à 31 %" />
        <ChipTabs tabs={['Toutes', 'Légendaires', 'Rares', 'Communes']} label="Rareté" />
        <div className="grid grid-cols-3 gap-2">
          {cards.map((c) =>
            'locked' in c ? (
              <div key={c.locked} className="flex flex-col gap-1">
                <div className="flex aspect-[5/7] flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-border-depth bg-surface-sunken text-ink-muted">
                  <Icon name="lock-simple" size={28} />
                  <span className="text-label">???</span>
                </div>
                <span className="text-center text-caption text-ink-muted">{c.locked}</span>
              </div>
            ) : (
              <div key={c.name} className="flex flex-col gap-1">
                <Poster
                  tone={c.tone}
                  title={c.name}
                  card
                  className={`border-4 ${rarity[c.rarity].border}`}
                />
                <Badge
                  tone={rarity[c.rarity].badge}
                  icon={c.rarity === 'legendaire' ? 'star' : undefined}
                  className="self-center"
                >
                  {rarity[c.rarity].label}
                </Badge>
              </div>
            ),
          )}
        </div>
        <Card variant="gold" tight row href="/arc">
          <Icon name="gift" size={28} className="text-gold-ink" />
          <span className="flex flex-1 flex-col gap-1">
            <b className="text-body-sm font-extrabold">Prochaine carte légendaire</b>
            <span className="text-caption text-gold-ink">
              Encore 3 défis de l&apos;arc à relever
            </span>
          </span>
          <Icon name="caret-right" size={20} />
        </Card>
      </main>
    </>
  );
}
