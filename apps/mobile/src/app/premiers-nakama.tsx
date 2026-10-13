import { useState } from 'react';
import { View } from 'react-native';
import { firstNakama, guilds } from '@tomodachi/fixtures';
import { Bottom, Screen } from '@/components/layout';
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Card,
  IconButton,
  Kami,
  List,
  ListItem,
  Steps,
  T,
  Tile,
} from '@/components/ui';

// Premiers nakama (étape 3 sur 3)
export default function PremiersNakama() {
  const [added, setAdded] = useState<Record<string, boolean>>({ aiko_art: true });
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/animes-favoris" />
          <Steps current={3} total={3} />
          <T variant="label" className="px-3 text-ink-muted">
            3/3
          </T>
        </AppBar>
      }
      contentClassName="gap-3 px-5 pt-1"
    >
      <View className="gap-1">
        <T variant="title-1">Tes premiers nakama</T>
        <T className="text-ink-muted">Ils aiment les mêmes animes que toi.</T>
      </View>
      <List>
        {firstNakama.map(({ member, why }) => {
          const on = !!added[member.username];
          return (
            <ListItem key={member.username}>
              <Avatar initial={member.initial} tone={member.tone} size="m" />
              <View className="flex-1 gap-1">
                <View className="flex-row items-center gap-1.5">
                  <T weight={800}>{member.name}</T>
                  <Badge>Niv. {member.level}</Badge>
                </View>
                <T variant="caption" className="text-ink-muted" numberOfLines={1}>
                  {why}
                </T>
              </View>
              <Button
                size="sm"
                variant={on ? 'secondary' : 'primary'}
                accessibilityState={{ selected: on }}
                onPress={() => setAdded((s) => ({ ...s, [member.username]: !on }))}
              >
                {on ? 'Ajouté' : 'Ajouter'}
              </Button>
            </ListItem>
          );
        })}
      </List>
      <Card>
        <View className="flex-row items-center gap-2.5">
          <Tile icon="shield" fill tone="sakura-solid" size={48} />
          <View className="gap-1">
            <T variant="title-3">{guilds.sakura.name}</T>
            <T variant="caption" className="text-ink-muted">
              Guild shōnen · 86 membres · Rang #3
            </T>
          </View>
        </View>
        <Button href="/guild" variant="sakura" size="sm" block>
          Rejoindre la guild
        </Button>
      </Card>
      <View className="flex-row items-center gap-2 rounded-md bg-gold-soft px-3 py-2.5">
        <Kami size={34} />
        <T variant="body-sm" weight={800} className="flex-1 text-gold-ink">
          Profil créé : +100 EXP offerts par Kami-sama
        </T>
      </View>
      <Bottom>
        <Button href="/feed" block>
          C&apos;est parti !
        </Button>
      </Bottom>
    </Screen>
  );
}
