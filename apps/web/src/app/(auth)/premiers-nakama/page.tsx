'use client';
import { useState } from 'react';
import { firstNakama, guilds } from '@tomodachi/fixtures';
import {
  AppBar,
  Avatar,
  Badge,
  Bottom,
  Button,
  Card,
  IconButton,
  Kami,
  List,
  ListItem,
  Steps,
  Tile,
} from '@/components/ui';

// Premiers nakama (étape 3 sur 3)
export default function PremiersNakama() {
  const [added, setAdded] = useState<Record<string, boolean>>({ aiko_art: true });
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/animes-favoris" />
        <Steps current={3} total={3} />
        <span className="px-3 text-label text-ink-muted">3/3</span>
      </AppBar>
      <main className="flex flex-1 flex-col gap-3 px-5 pt-1 pb-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-title-1">Tes premiers nakama</h1>
          <p className="text-body text-ink-muted">Ils aiment les mêmes animes que toi.</p>
        </div>
        <List>
          {firstNakama.map(({ member, why }) => {
            const on = !!added[member.username];
            return (
              <ListItem key={member.username}>
                <Avatar initial={member.initial} tone={member.tone} size="m" />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="flex items-center gap-1.5">
                    <b className="text-body font-extrabold">{member.name}</b>
                    <Badge>Niv. {member.level}</Badge>
                  </span>
                  <span className="truncate text-caption text-ink-muted">{why}</span>
                </span>
                <Button
                  size="sm"
                  variant={on ? 'secondary' : 'primary'}
                  aria-pressed={on}
                  onClick={() => setAdded((s) => ({ ...s, [member.username]: !on }))}
                >
                  {on ? 'Ajouté' : 'Ajouter'}
                </Button>
              </ListItem>
            );
          })}
        </List>
        <Card>
          <div className="flex items-center gap-2.5">
            <Tile icon="shield" fill tone="sakura-solid" size={48} />
            <span className="flex flex-col gap-1">
              <span className="text-title-3">{guilds.sakura.name}</span>
              <span className="text-caption text-ink-muted">
                Guild shōnen · 86 membres · Rang #3
              </span>
            </span>
          </div>
          <Button href="/guild" variant="sakura" size="sm" block>
            Rejoindre la guild
          </Button>
        </Card>
        <div className="flex items-center gap-2 rounded-md bg-gold-soft px-3 py-2.5 text-gold-ink">
          <Kami size={34} />
          <span className="text-body-sm font-extrabold">
            Profil créé : +100 EXP offerts par Kami-sama
          </span>
        </div>
        <Bottom>
          <Button href="/feed" block>
            C&apos;est parti !
          </Button>
        </Bottom>
      </main>
    </>
  );
}
