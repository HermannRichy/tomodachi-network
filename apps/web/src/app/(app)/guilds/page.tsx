import type { Metadata } from 'next';
import { fr, guilds } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import {
  AppBar,
  AppBarTitle,
  Button,
  Card,
  IconButton,
  Input,
  List,
  ListItem,
  SectionTitle,
  Tile,
  cardClass,
  cx,
  guildTone,
} from '@/components/ui';

export const metadata: Metadata = { title: 'Guilds' };

export default function Guilds() {
  const ranking = [guilds.tengu, guilds.kitsune, guilds.sakura, guilds.mecha];
  const c = guilds.cuisine;
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/guild" />
        <AppBarTitle>Guilds</AppBarTitle>
      </AppBar>
      <main className="flex flex-1 flex-col gap-3.5 px-4 pt-1 pb-6">
        <Input
          sunken
          icon="magnifying-glass"
          type="search"
          placeholder="Chercher une guild"
          aria-label="Chercher une guild"
        />
        <button
          type="button"
          className={cardClass(
            'default',
            true,
            'w-full flex-row items-center gap-3 border-dashed [border-bottom-style:solid] text-left',
          )}
        >
          <Tile icon="plus" tone="primary" />
          <span className="flex flex-1 flex-col gap-1">
            <b className="text-body font-extrabold">Créer ma guild</b>
            <span className="text-caption text-ink-muted">Dès le niveau 10 · 500 pièces</span>
          </span>
          <Icon name="caret-right" size={20} className="text-ink-muted" />
        </button>
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <SectionTitle>Classement de la saison</SectionTitle>
            <span className="text-caption text-ink-muted">Arc d&apos;automne</span>
          </div>
          <List>
            {ranking.map((g) => {
              const mine = g.tone === null;
              return (
                <ListItem key={g.id} className={cx(mine && 'bg-sakura-soft')}>
                  {g.rank === 1 ? (
                    <span className="flex w-7 justify-center text-gold-depth">
                      <Icon name="crown" />
                    </span>
                  ) : (
                    <span
                      className={cx(
                        'w-7 text-center text-title-3 tabular-nums',
                        mine ? 'text-sakura' : 'text-ink-muted',
                      )}
                    >
                      {g.rank}
                    </span>
                  )}
                  <Tile icon="shield" fill tone={guildTone(g.tone)} size={40} iconSize={20} />
                  <span className="flex flex-1 flex-col gap-1">
                    <b className="text-body-sm font-extrabold">
                      {g.name}
                      {mine && ' · ta guild'}
                    </b>
                    <span
                      className={cx(
                        'text-caption tabular-nums',
                        mine ? 'text-sakura-ink' : 'text-ink-muted',
                      )}
                    >
                      {fr(g.points)} pts · {g.members} membres
                    </span>
                  </span>
                </ListItem>
              );
            })}
          </List>
        </section>
        <section className="flex flex-col gap-2">
          <SectionTitle>Pour toi</SectionTitle>
          <Card tight row>
            <Tile icon="shield" fill tone={guildTone(c.tone)} />
            <span className="flex flex-1 flex-col gap-1">
              <b className="text-body font-extrabold">{c.name}</b>
              <span className="text-caption text-ink-muted">
                {c.genre} · {c.members} membres
              </span>
            </span>
            <Button variant="sakura" size="sm">
              Rejoindre
            </Button>
          </Card>
        </section>
      </main>
    </>
  );
}
