'use client';
import { useState } from 'react';
import { playerClasses, type PlayerClassId } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { classIcons } from '@/components/maps';
import { AppBar, Bottom, Button, IconButton, Steps, Tile, cardClass, cx } from '@/components/ui';

// Choix de la classe (étape 1 sur 3)
export default function Classe() {
  const [picked, setPicked] = useState<PlayerClassId>('stratege');
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/" />
        <Steps current={1} total={3} />
        <span className="px-3 text-label text-ink-muted">1/3</span>
      </AppBar>
      <main className="flex flex-1 flex-col gap-3.5 px-5 pt-1 pb-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-title-1">Choisis ta classe</h1>
          <p className="text-body text-ink-muted">
            Elle colore ta fiche de personnage. Tu pourras en changer plus tard.
          </p>
        </div>
        <div role="radiogroup" aria-label="Classes" className="flex flex-col gap-2.5">
          {playerClasses.map((c) => {
            const on = c.id === picked;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setPicked(c.id)}
                className={cardClass(
                  on ? 'selected' : 'default',
                  false,
                  'w-full flex-row items-center gap-3.5 text-left',
                )}
              >
                <Tile icon={classIcons[c.id]} tone={c.tone} size={52} />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-title-3">{c.name}</span>
                  <span className="text-body-sm text-ink-muted">{c.description}</span>
                </span>
                <Icon name="check-circle" className={cx('text-primary', !on && 'invisible')} />
              </button>
            );
          })}
        </div>
        <Bottom>
          <Button href="/animes-favoris" block>
            Continuer
          </Button>
        </Bottom>
      </main>
    </>
  );
}
