import { View } from 'react-native';
import { me, quiz } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import { AppBar, Avatar, Button, Card, Grid, IconButton, List, ListItem, T } from '@/components/ui';

export default function QuizResultat() {
  const o = quiz.opponent;
  const stats = [
    { value: '8/10', label: 'Bonnes réponses', tone: 'text-success' },
    { value: '4,2 s', label: 'Temps moyen', tone: 'text-ink' },
    { value: 'x3', label: 'Meilleure série', tone: 'text-sakura' },
  ];
  return (
    <Screen
      header={
        <AppBar>
          <View className="flex-1" />
          <IconButton icon="x" label="Fermer" href="/guerre-guilds" />
        </AppBar>
      }
      contentClassName="gap-[18px] px-5 pt-0"
    >
      <View className="items-center gap-2.5">
        <View className="h-24 w-24 items-center justify-center rounded-xl border-b-[6px] border-gold-depth bg-gold">
          <Icon name="trophy" size={40} className="text-on-gold" />
        </View>
        <T variant="title-1" accessibilityRole="header">
          Victoire !
        </T>
        <T className="text-ink-muted">Tu bats {o.name} du Kitsune Clan.</T>
      </View>
      <Card row className="justify-around">
        <View className="items-center gap-1">
          <Avatar initial={me.initial} tone={me.tone} size="m" />
          <T variant="body-sm" weight={800}>
            Toi
          </T>
          <T variant="title-1" className="text-primary tabular-nums">
            800
          </T>
        </View>
        <T variant="label" className="text-ink-muted">
          VS
        </T>
        <View className="items-center gap-1">
          <Avatar initial={o.initial} tone={o.tone} size="m" />
          <T variant="body-sm" weight={800}>
            {o.name}
          </T>
          <T variant="title-1" className="text-ink-muted tabular-nums">
            600
          </T>
        </View>
      </Card>
      <Grid cols={3}>
        {stats.map((s) => (
          <Card key={s.label} tight className="h-full items-center">
            <T variant="title-3" className={`${s.tone} tabular-nums`}>
              {s.value}
            </T>
            <T variant="caption" className="text-center text-ink-muted">
              {s.label}
            </T>
          </Card>
        ))}
      </Grid>
      <List>
        <ListItem icon="lightning" iconClassName="text-gold-depth">
          <T variant="body-sm" weight={800} className="flex-1">
            EXP gagnée
          </T>
          <T variant="body-sm" weight={900} className="text-gold-ink tabular-nums">
            +120
          </T>
        </ListItem>
        <ListItem icon="shield" iconClassName="text-sakura">
          <T variant="body-sm" weight={800} className="flex-1">
            Points pour Sakura Ronin
          </T>
          <T variant="body-sm" weight={900} className="text-sakura tabular-nums">
            +200
          </T>
        </ListItem>
        <ListItem icon="target">
          <T variant="body-sm" weight={800} className="flex-1">
            Défi « 5 quiz gagnés »
          </T>
          <T variant="body-sm" weight={900} className="tabular-nums">
            3 / 5
          </T>
        </ListItem>
      </List>
      <Grid cols={2} gap="gap-2.5" className="mt-auto">
        <Button href="/guerre-guilds" variant="secondary" block>
          Terminer
        </Button>
        <Button href="/quiz" block>
          Revanche
        </Button>
      </Grid>
    </Screen>
  );
}
