import type { Metadata } from 'next';
import { guilds, popular, trends } from '@tomodachi/fixtures';
import { ChipTabs } from '@/components/client';
import { Icon } from '@/components/icon';
import {
  AppBar,
  buttonClass,
  Card,
  IconButton,
  Input,
  List,
  ListItem,
  Poster,
  SectionHeader,
  SectionTitle,
  Tile,
  guildTone,
} from '@/components/ui';

export const metadata: Metadata = { title: 'Explorer' };

export default function Explorer() {
  const g = guilds.kitsune;
  return (
    <>
      <AppBar className="gap-2 px-4 pb-2">
        <IconButton icon="arrow-left" label="Retour" href="/feed" className="-ml-2 lg:hidden" />
        <Input
          sunken
          icon="magnifying-glass"
          type="search"
          placeholder="Animes, nakama, guilds, #tags"
          aria-label="Rechercher"
          className="min-h-[46px] flex-1"
        />
      </AppBar>
      <main className="flex flex-1 flex-col gap-4 px-4 pt-1 pb-6">
        <ChipTabs tabs={['Tout', 'Animes', 'Nakama', 'Guilds']} label="Type de résultats" />
        <Card variant="primary" tight row href="/affinites">
          <Icon name="users-three" size={28} />
          <span className="flex flex-1 flex-col gap-1">
            <b className="text-body font-extrabold">Trouver des nakama</b>
            <span className="text-caption opacity-90">
              Des fans qui aiment les mêmes animes que toi
            </span>
          </span>
          <Icon name="caret-right" size={20} />
        </Card>
        <section className="flex flex-col gap-2">
          <SectionTitle>Tendances</SectionTitle>
          <List>
            {trends.map((t, i) => (
              <ListItem key={t.tag} href={i === 1 ? '/arc' : '/feed'}>
                <span className="w-5 text-title-3 text-sakura tabular-nums">{i + 1}</span>
                <span className="flex flex-1 flex-col gap-1">
                  <b className="text-body font-extrabold">{t.tag}</b>
                  <span className="text-caption text-ink-muted">{t.meta}</span>
                </span>
                {t.hot && <Icon name="fire" className="text-sakura" />}
              </ListItem>
            ))}
          </List>
        </section>
        <section className="flex flex-col gap-2">
          <SectionHeader title="Animes populaires" href="/watchlist" />
          <div className="grid grid-cols-3 gap-2">
            {popular.map((a) => (
              <Poster key={a.id} tone={a.tone} title={a.title} href={`/anime/${a.id}`} />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <SectionHeader title="Guilds à découvrir" href="/guilds" />
          <Card tight row href="/guilds">
            <Tile icon="shield" fill tone={guildTone(g.tone)} />
            <span className="flex flex-1 flex-col gap-1">
              <b className="text-body font-extrabold">{g.name}</b>
              <span className="text-caption text-ink-muted">
                Rang #{g.rank} · {g.members} membres
              </span>
            </span>
            <span className={buttonClass({ variant: 'secondary', size: 'sm' })}>Voir</span>
          </Card>
        </section>
      </main>
    </>
  );
}
