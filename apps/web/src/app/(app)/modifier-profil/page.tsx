'use client';
import Link from 'next/link';
import { useState } from 'react';
import { myProfile as p } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Button,
  Field,
  IconButton,
  Input,
  cardClass,
  cx,
  inputBoxClass,
} from '@/components/ui';

const frames = [
  { id: 'lune', label: 'Lune rousse', ring: 'border-gold' },
  { id: 'sakura', label: 'Sakura', ring: 'border-sakura' },
  { id: 'indigo', label: 'Indigo', ring: 'border-primary' },
];

export default function ModifierProfil() {
  const [bio, setBio] = useState(p.bio);
  const [frame, setFrame] = useState('lune');
  return (
    <>
      <AppBar>
        <IconButton icon="x" label="Annuler" href="/profil" />
        <AppBarTitle>Modifier le profil</AppBarTitle>
        <Button href="/profil" size="sm">
          Enregistrer
        </Button>
      </AppBar>
      <main className="flex flex-1 flex-col gap-3.5 px-4 pt-1 pb-6">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <Avatar initial={p.initial} tone={1} size="xl" ring />
            <Button
              icon="camera"
              aria-label="Changer la photo"
              size="fab"
              className="absolute -right-1.5 -bottom-1"
            />
          </div>
          <Button variant="ghost" size="sm" icon="image">
            Changer la bannière
          </Button>
        </div>
        <Field label="Nom affiché">
          <Input defaultValue={p.name} aria-label="Nom affiché" />
        </Field>
        <Field label="Pseudo">
          <Input prefix="@" defaultValue={p.username} aria-label="Pseudo" />
        </Field>
        <Field
          label="Bio"
          hint={<span className="block text-right tabular-nums">{bio.length} / 160</span>}
        >
          <span className={inputBoxClass(false, 'items-start py-3')}>
            <textarea
              rows={3}
              maxLength={160}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              aria-label="Bio"
              className="min-w-0 flex-1 resize-none bg-transparent text-body text-ink outline-none"
            />
          </span>
        </Field>
        <Link
          href="/classe"
          className={cardClass('default', true, 'min-h-14 flex-row items-center gap-3')}
        >
          <Icon name="target" className="text-primary" />
          <span className="flex flex-1 flex-col gap-1">
            <span className="text-caption text-ink-muted">Classe</span>
            <b className="text-body font-extrabold">Stratège</b>
          </span>
          <Icon name="caret-right" size={20} className="text-ink-muted" />
        </Link>
        <div className="flex flex-col gap-1.5">
          <span className="text-body-sm font-extrabold">Cadre de profil</span>
          <div role="radiogroup" aria-label="Cadre de profil" className="flex gap-2.5">
            {frames.map((f) => (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={frame === f.id}
                aria-label={f.label}
                onClick={() => setFrame(f.id)}
                className={cx(
                  'size-14 rounded-pill border-4 bg-surface',
                  f.ring,
                  frame === f.id && 'outline-3 outline-offset-2 outline-primary',
                )}
              />
            ))}
            <Link
              href="/boutique"
              aria-label="Plus de cadres dans la boutique"
              className="flex size-14 items-center justify-center rounded-pill border-2 border-dashed border-border-depth text-ink-muted"
            >
              <Icon name="plus" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
