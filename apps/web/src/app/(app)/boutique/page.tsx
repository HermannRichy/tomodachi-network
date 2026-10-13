'use client';
import { useState } from 'react';
import { frames, fr, myProfile } from '@tomodachi/fixtures';
import { SegTabs } from '@/components/client';
import { Icon } from '@/components/icon';
import { AppBar, AppBarTitle, Badge, Button, Card, IconButton, cx } from '@/components/ui';

const ring = {
  gold: 'border-gold',
  sakura: 'border-sakura',
  primary: 'border-primary',
  success: 'border-success',
};

export default function Boutique() {
  const [coins, setCoins] = useState(myProfile.coins);
  const [owned, setOwned] = useState<Record<string, boolean>>({ lune: true });
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/profil" />
        <AppBarTitle>Boutique</AppBarTitle>
        <Badge icon="coin" large className="mr-2 tabular-nums">
          <span aria-live="polite">{fr(coins)}</span>
        </Badge>
      </AppBar>
      <main className="flex flex-1 flex-col gap-3.5 px-4 pt-1 pb-6">
        <SegTabs tabs={['Cadres', 'Titres', 'Thèmes']} label="Catégories" />
        <Card variant="primary" row className="gap-3.5">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-pill border-[5px] border-gold bg-primary-depth">
            <Icon name="ghost" size={28} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-label opacity-85">ÉDITION LIMITÉE</span>
            <b className="text-title-3">Pack Automne des Yokai</b>
            <span className="text-caption opacity-90">Cadre, titre et thème · 3 j restants</span>
          </span>
          <Button variant="gold" size="sm" icon="coin" className="tabular-nums">
            600
          </Button>
        </Card>
        <div className="grid grid-cols-2 gap-2.5">
          {frames.map((f) => {
            const own = !!owned[f.id];
            return (
              <Card key={f.id} tight className="items-center text-center">
                <span
                  className={cx(
                    'size-16 rounded-pill border-[5px] bg-surface-sunken',
                    ring[f.ring],
                  )}
                />
                <b className="text-body-sm font-extrabold">{f.name}</b>
                <Button
                  variant={own ? 'secondary' : 'gold'}
                  size="sm"
                  block
                  disabled={!own && coins < f.price}
                  onClick={() => {
                    if (own || coins < f.price) return;
                    setCoins(coins - f.price);
                    setOwned({ ...owned, [f.id]: true });
                  }}
                >
                  {own ? 'Possédé' : `${f.price} pièces`}
                </Button>
              </Card>
            );
          })}
        </div>
        <p className="text-center text-caption text-ink-muted">
          Gagne des pièces en relevant les défis et en montant de niveau.
        </p>
      </main>
    </>
  );
}
