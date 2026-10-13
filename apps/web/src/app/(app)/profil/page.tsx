import type { Metadata } from 'next';
import Link from 'next/link';
import { fr, myProfile as p } from '@tomodachi/fixtures';
import { Badge, Bar, Avatar, Count, IconButton, List, ListItem, cardClass } from '@/components/ui';

export const metadata: Metadata = { title: 'Mon profil' };

export default function Profil() {
  const stats = [
    { value: fr(p.seen), label: 'Animes vus', href: '/watchlist', tone: 'text-primary' },
    { value: fr(p.nakama), label: 'Nakama', href: '/membre/aiko_art', tone: 'text-primary' },
    { value: p.power, label: 'Power level', tone: 'text-sakura' },
    { value: fr(p.cards), label: 'Cartes collectées', href: '/cartes', tone: 'text-sakura' },
  ];
  return (
    <>
      <header className="shrink-0 rounded-b-xl border-b-[6px] border-primary-depth bg-primary text-on-primary lg:mt-4 lg:rounded-xl">
        <div className="flex min-h-11 items-center justify-end gap-1 px-2">
          <IconButton
            icon="pencil-simple"
            label="Modifier le profil"
            href="/modifier-profil"
            className="hover:bg-on-primary/10"
          />
          <IconButton
            icon="gear-six"
            label="Paramètres"
            href="/parametres"
            className="hover:bg-on-primary/10"
          />
        </div>
        <div className="flex flex-col items-center gap-1.5 px-5 pb-[18px] text-center">
          <Avatar initial={p.initial} tone={1} size="xl" ring />
          <h1 className="mt-1 text-title-1">{p.name}</h1>
          <p className="text-body-sm opacity-85">
            @{p.username} · {p.city}
          </p>
          <div className="flex gap-1.5">
            <Badge tone="on-primary" icon="target">
              Stratège
            </Badge>
            <Badge tone="official">Senpai</Badge>
          </div>
          <div className="mt-2 flex w-full flex-col gap-1">
            <span className="flex justify-between text-label tabular-nums">
              <span>Niveau {p.level}</span>
              <span className="opacity-85">
                {fr(p.exp)} / {fr(p.expNext)} EXP
              </span>
            </span>
            <Bar
              value={(p.exp / p.expNext) * 100}
              variant="exp"
              label="Progression vers le niveau suivant"
            />
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-3.5 px-4 pt-4 pb-6">
        <div className="grid grid-cols-2 gap-2.5">
          {stats.map((s) => {
            const inner = (
              <>
                <b className={`text-title-2 tabular-nums ${s.tone}`}>{s.value}</b>
                <span className="text-body-sm text-ink-muted">{s.label}</span>
              </>
            );
            return s.href ? (
              <Link
                key={s.label}
                href={s.href}
                className={cardClass(
                  'default',
                  true,
                  'transition-transform hover:-translate-y-0.5',
                )}
              >
                {inner}
              </Link>
            ) : (
              <div key={s.label} className={cardClass('default', true)}>
                {inner}
              </div>
            );
          })}
        </div>
        <List>
          <ListItem href="/watchlist" icon="television" chevron>
            <span className="flex-1 text-body font-extrabold">Mon tracker de visionnage</span>
          </ListItem>
          <ListItem href="/boutique" icon="storefront" chevron>
            <span className="flex-1 text-body font-extrabold">Boutique</span>
            <Badge icon="coin">{fr(p.coins)}</Badge>
          </ListItem>
          <ListItem href="/senpai" icon="graduation-cap" chevron>
            <span className="flex-1 text-body font-extrabold">Mes kohai</span>
            <Count>{p.kohai}</Count>
          </ListItem>
        </List>
      </main>
    </>
  );
}
