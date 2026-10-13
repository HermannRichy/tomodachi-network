import { View } from 'react-native';
import { fr, guildWar as w } from '@tomodachi/fixtures';
import { Icon, type IconName } from '@/components/icon';
import { Bottom, Screen } from '@/components/layout';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Badge,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  SectionTitle,
  T,
  cx,
} from '@/components/ui';

const trialIcons: Record<string, IconName> = {
  question: 'question',
  pencil: 'pencil-simple',
  target: 'target',
};

export default function GuerreGuilds() {
  const total = w.us.score + w.them.score;
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/guild" />
          <AppBarTitle>Guerre de guilds</AppBarTitle>
          <Badge tone="sakura" icon="timer" className="mr-2">
            {w.timer}
          </Badge>
        </AppBar>
      }
      contentClassName="pt-1"
    >
      <Card className="gap-3.5">
        <View className="flex-row items-center justify-around">
          <View className="items-center gap-1.5">
            <View className="h-16 w-16 items-center justify-center rounded-lg border-b-4 border-sakura-depth bg-sakura">
              <Icon name="shield" fill size={32} className="text-on-sakura" />
            </View>
            <T variant="body-sm" weight={800}>
              {w.us.name}
            </T>
            <T variant="title-1" className="text-sakura tabular-nums">
              {fr(w.us.score)}
            </T>
          </View>
          <View className="h-11 w-11 items-center justify-center rounded-pill bg-surface-sunken">
            <Icon name="sword" className="text-ink-muted" />
          </View>
          <View className="items-center gap-1.5">
            <View className="h-16 w-16 items-center justify-center rounded-lg border-b-4 border-primary-depth bg-poster-1">
              <Icon name="shield" fill size={32} className="text-on-media" />
            </View>
            <T variant="body-sm" weight={800}>
              {w.them.name}
            </T>
            <T variant="title-1" className="text-ink-muted tabular-nums">
              {fr(w.them.score)}
            </T>
          </View>
        </View>
        <View
          className="h-3.5 flex-row overflow-hidden rounded-pill"
          accessibilityLabel={`${w.us.name} ${fr(w.us.score)} points, ${w.them.name} ${fr(w.them.score)} points`}
        >
          <View className="h-full bg-sakura" style={{ width: `${(w.us.score / total) * 100}%` }} />
          <View className="h-full flex-1 bg-primary" />
        </View>
        <T variant="body-sm" weight={800} className="text-center text-sakura">
          Vous menez de {w.us.score - w.them.score} points
        </T>
      </Card>
      <View className="gap-2">
        <SectionTitle>Épreuves</SectionTitle>
        <List>
          {w.trials.map((t) => (
            <ListItem key={t.label} icon={trialIcons[t.icon]}>
              <T variant="body-sm" weight={800} className="flex-1">
                {t.label}
              </T>
              <T variant="body-sm" className="text-ink-muted tabular-nums">
                <T variant="body-sm" weight={900} className="text-sakura">
                  {t.us}
                </T>{' '}
                · {t.them}
              </T>
            </ListItem>
          ))}
        </List>
      </View>
      <View className="gap-2">
        <SectionTitle>Meilleurs guerriers</SectionTitle>
        <List>
          {w.warriors.map((x) => (
            <ListItem key={x.rank} className={cx(x.isMe && 'bg-primary-soft')}>
              <T
                weight={900}
                className={cx(
                  'w-4 tabular-nums',
                  x.rank === 1 ? 'text-gold-depth' : x.isMe ? 'text-primary-ink' : 'text-ink-muted',
                )}
              >
                {x.rank}
              </T>
              <Avatar initial={x.member.initial} tone={x.member.tone} size="s" />
              <T
                variant="body-sm"
                weight={800}
                className={cx('flex-1', x.isMe && 'text-primary-ink')}
              >
                {x.isMe ? 'Toi' : x.member.name}
              </T>
              <T
                variant="body-sm"
                weight={800}
                className={cx('tabular-nums', x.isMe && 'text-primary-ink')}
              >
                {x.points} pts
              </T>
            </ListItem>
          ))}
        </List>
      </View>
      <Bottom>
        <Button href="/quiz" variant="sakura" block icon="sword">
          Lancer un quiz battle
        </Button>
      </Bottom>
    </Screen>
  );
}
