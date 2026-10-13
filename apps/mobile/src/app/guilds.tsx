import { View } from 'react-native';
import { fr, guilds } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
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
  T,
  Tile,
  cx,
  guildTone,
} from '@/components/ui';

export default function Guilds() {
  const ranking = [guilds.tengu, guilds.kitsune, guilds.sakura, guilds.mecha];
  const c = guilds.cuisine;
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/guild" />
          <AppBarTitle>Guilds</AppBarTitle>
        </AppBar>
      }
      contentClassName="pt-1"
    >
      <Input
        sunken
        icon="magnifying-glass"
        placeholder="Chercher une guild"
        accessibilityLabel="Chercher une guild"
      />
      <Card tight row onPress={() => {}} label="Créer ma guild" className="border-dashed">
        <Tile icon="plus" tone="primary" />
        <View className="flex-1 gap-1">
          <T weight={800}>Créer ma guild</T>
          <T variant="caption" className="text-ink-muted">
            Dès le niveau 10 · 500 pièces
          </T>
        </View>
        <Icon name="caret-right" size={20} className="text-ink-muted" />
      </Card>
      <View className="gap-2">
        <View className="flex-row items-center justify-between">
          <SectionTitle>Classement de la saison</SectionTitle>
          <T variant="caption" className="text-ink-muted">
            Arc d&apos;automne
          </T>
        </View>
        <List>
          {ranking.map((g) => {
            const mine = g.tone === null;
            return (
              <ListItem key={g.id} className={cx(mine && 'bg-sakura-soft')}>
                {g.rank === 1 ? (
                  <View className="w-7 items-center">
                    <Icon name="crown" className="text-gold-depth" />
                  </View>
                ) : (
                  <T
                    variant="title-3"
                    className={cx(
                      'w-7 text-center tabular-nums',
                      mine ? 'text-sakura' : 'text-ink-muted',
                    )}
                  >
                    {g.rank}
                  </T>
                )}
                <Tile icon="shield" fill tone={guildTone(g.tone)} size={40} iconSize={20} />
                <View className="flex-1 gap-1">
                  <T variant="body-sm" weight={800}>
                    {g.name}
                    {mine && ' · ta guild'}
                  </T>
                  <T
                    variant="caption"
                    className={cx('tabular-nums', mine ? 'text-sakura-ink' : 'text-ink-muted')}
                  >
                    {fr(g.points)} pts · {g.members} membres
                  </T>
                </View>
              </ListItem>
            );
          })}
        </List>
      </View>
      <View className="gap-2">
        <SectionTitle>Pour toi</SectionTitle>
        <Card tight row>
          <Tile icon="shield" fill tone={guildTone(c.tone)} />
          <View className="flex-1 gap-1">
            <T weight={800}>{c.name}</T>
            <T variant="caption" className="text-ink-muted">
              {c.genre} · {c.members} membres
            </T>
          </View>
          <Button variant="sakura" size="sm">
            Rejoindre
          </Button>
        </Card>
      </View>
    </Screen>
  );
}
