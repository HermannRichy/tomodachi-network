import { useState } from 'react';
import { View } from 'react-native';
import { members } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Badge,
  Bar,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  SectionTitle,
  T,
} from '@/components/ui';

export default function Senpai() {
  const [proposed, setProposed] = useState(false);
  const { sora, yuna, mika, taro } = members;
  const kohai = [
    {
      m: yuna,
      meta: `Niv. ${yuna.level} · objectif niveau 10`,
      badge: <Badge>+40 EXP</Badge>,
      value: 60,
    },
    {
      m: mika,
      meta: `Niv. ${mika.level} · a rejoint il y a 3 j`,
      badge: <Badge tone="primary">Nouveau</Badge>,
      value: 20,
    },
  ];
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/profil" />
          <AppBarTitle>Senpai et kohai</AppBarTitle>
        </AppBar>
      }
      contentClassName="pt-1"
    >
      <View className="flex-row items-center gap-3 rounded-lg bg-primary-soft p-3.5">
        <Icon name="graduation-cap" size={32} className="text-primary-ink" />
        <T variant="body-sm" weight={800} className="flex-1 text-primary-ink">
          Guide les nouveaux nakama. Quand ton kohai monte de niveau, vous gagnez tous les deux de
          l&apos;EXP.
        </T>
      </View>
      <View className="gap-2">
        <SectionTitle>Ton senpai</SectionTitle>
        <Card tight row href={`/membre/${sora.username}`} label={`${sora.name}, ton senpai`}>
          <Avatar initial={sora.initial} tone={sora.tone} size="m" />
          <View className="flex-1 gap-1">
            <T weight={800}>{sora.name}</T>
            <T variant="caption" className="text-ink-muted">
              Niv. {sora.level} · ton senpai depuis mars
            </T>
          </View>
          <View className="min-h-10 justify-center rounded-md border-2 border-b-4 border-border border-b-border-depth bg-surface px-3.5">
            <Icon name="chat-circle-dots" size={18} className="text-primary" />
          </View>
        </Card>
      </View>
      <View className="gap-2">
        <View className="flex-row items-center justify-between">
          <SectionTitle>Tes kohai</SectionTitle>
          <T variant="caption" className="text-ink-muted tabular-nums">
            2 / 3 places
          </T>
        </View>
        {kohai.map(({ m, meta, badge, value }) => (
          <Card key={m.username} tight>
            <View className="flex-row items-center gap-2.5">
              <Avatar initial={m.initial} tone={m.tone} />
              <View className="flex-1 gap-1">
                <T variant="body-sm" weight={800}>
                  {m.name}
                </T>
                <T variant="caption" className="text-ink-muted tabular-nums">
                  {meta}
                </T>
              </View>
              {badge}
            </View>
            <Bar value={value} size="thin" label={`Progression de ${m.name}`} />
          </Card>
        ))}
      </View>
      <View className="gap-2">
        <SectionTitle>Nouveaux qui cherchent un senpai</SectionTitle>
        <List>
          <ListItem>
            <Avatar initial={taro.initial} tone={taro.tone} size="s" />
            <View className="flex-1 gap-1">
              <T variant="body-sm" weight={800}>
                {taro.name}
              </T>
              <T variant="caption" className="text-ink-muted">
                Aime Lames du crépuscule
              </T>
            </View>
            <Button
              size="sm"
              variant={proposed ? 'secondary' : 'primary'}
              onPress={() => setProposed(true)}
              disabled={proposed}
            >
              {proposed ? 'Proposé' : 'Proposer'}
            </Button>
          </ListItem>
        </List>
      </View>
    </Screen>
  );
}
