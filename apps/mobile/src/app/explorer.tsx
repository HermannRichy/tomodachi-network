import { View } from 'react-native';
import { guilds, popular, trends } from '@tomodachi/fixtures';
import { ChipTabs } from '@/components/controls';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import {
  AppBar,
  Card,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  Poster,
  SectionHeader,
  SectionTitle,
  T,
  Tile,
  guildTone,
} from '@/components/ui';

export default function Explorer() {
  const g = guilds.kitsune;
  return (
    <Screen
      header={
        <AppBar className="gap-2 px-4 pb-2">
          <IconButton icon="arrow-left" label="Retour" href="/feed" className="-ml-2" />
          <Input
            sunken
            focused
            icon="magnifying-glass"
            placeholder="Animes, nakama, guilds, #tags"
            accessibilityLabel="Rechercher"
            className="min-h-[46px] flex-1"
          />
        </AppBar>
      }
      contentClassName="gap-4 pt-1"
    >
      <ChipTabs tabs={['Tout', 'Animes', 'Nakama', 'Guilds']} label="Type de résultats" />
      <Card variant="primary" tight row href="/affinites" label="Trouver des nakama">
        <Icon name="users-three" size={28} className="text-on-primary" />
        <View className="flex-1 gap-1">
          <T weight={800} className="text-on-primary">
            Trouver des nakama
          </T>
          <T variant="caption" className="text-on-primary opacity-90">
            Des fans qui aiment les mêmes animes que toi
          </T>
        </View>
        <Icon name="caret-right" size={20} className="text-on-primary" />
      </Card>
      <View className="gap-2">
        <SectionTitle>Tendances</SectionTitle>
        <List>
          {trends.map((t, i) => (
            <ListItem key={t.tag} href={i === 1 ? '/arc' : '/feed'}>
              <T variant="title-3" className="w-5 text-sakura tabular-nums">
                {i + 1}
              </T>
              <View className="flex-1 gap-1">
                <T weight={800}>{t.tag}</T>
                <T variant="caption" className="text-ink-muted">
                  {t.meta}
                </T>
              </View>
              {t.hot && <Icon name="fire" className="text-sakura" />}
            </ListItem>
          ))}
        </List>
      </View>
      <View className="gap-2">
        <SectionHeader title="Animes populaires" href="/watchlist" />
        <Grid cols={3}>
          {popular.map((a) => (
            <Poster key={a.id} tone={a.tone} title={a.title} href={`/anime/${a.id}`} />
          ))}
        </Grid>
      </View>
      <View className="gap-2">
        <SectionHeader title="Guilds à découvrir" href="/guilds" />
        <Card tight row href="/guilds" label={g.name}>
          <Tile icon="shield" fill tone={guildTone(g.tone)} />
          <View className="flex-1 gap-1">
            <T weight={800}>{g.name}</T>
            <T variant="caption" className="text-ink-muted">
              Rang #{g.rank} · {g.members} membres
            </T>
          </View>
          <View className="min-h-10 justify-center rounded-md border-2 border-b-4 border-border border-b-border-depth bg-surface px-3.5">
            <T variant="body-sm" weight={800} className="text-primary">
              Voir
            </T>
          </View>
        </Card>
      </View>
    </Screen>
  );
}
