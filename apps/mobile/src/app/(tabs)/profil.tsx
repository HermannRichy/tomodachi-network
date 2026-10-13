import { View } from 'react-native';
import { fr, myProfile as p } from '@tomodachi/fixtures';
import { Screen } from '@/components/layout';
import { StatusBarOn } from '@/components/status';
import {
  Avatar,
  Badge,
  Bar,
  Card,
  Count,
  Grid,
  IconButton,
  List,
  ListItem,
  T,
} from '@/components/ui';

export default function Profil() {
  const stats = [
    { value: fr(p.seen), label: 'Animes vus', href: '/watchlist' as const, tone: 'text-primary' },
    {
      value: fr(p.nakama),
      label: 'Nakama',
      href: '/membre/aiko_art' as const,
      tone: 'text-primary',
    },
    { value: p.power, label: 'Power level', tone: 'text-sakura' },
    {
      value: fr(p.cards),
      label: 'Cartes collectées',
      href: '/cartes' as const,
      tone: 'text-sakura',
    },
  ];
  return (
    <Screen bg="bg-primary" bottomInset={false} contentClassName="bg-background px-0 pt-0">
      <StatusBarOn surface="brand" />
      <View className="rounded-b-xl border-b-[6px] border-primary-depth bg-primary">
        <View className="min-h-11 flex-row items-center justify-end gap-1 px-2">
          <IconButton
            icon="pencil-simple"
            label="Modifier le profil"
            href="/modifier-profil"
            iconClassName="text-on-primary"
          />
          <IconButton
            icon="gear-six"
            label="Paramètres"
            href="/parametres"
            iconClassName="text-on-primary"
          />
        </View>
        <View className="items-center gap-1.5 px-5 pb-[18px]">
          <Avatar initial={p.initial} tone={1} size="xl" ring />
          <T variant="title-1" accessibilityRole="header" className="mt-1 text-on-primary">
            {p.name}
          </T>
          <T variant="body-sm" className="text-on-primary opacity-85">
            @{p.username} · {p.city}
          </T>
          <View className="flex-row gap-1.5">
            <Badge tone="on-primary" icon="target">
              Stratège
            </Badge>
            <Badge tone="official">Senpai</Badge>
          </View>
          <View className="mt-2 w-full gap-1">
            <View className="flex-row justify-between">
              <T variant="label" className="text-on-primary tabular-nums">
                Niveau {p.level}
              </T>
              <T variant="label" className="text-on-primary opacity-85 tabular-nums">
                {fr(p.exp)} / {fr(p.expNext)} EXP
              </T>
            </View>
            <Bar
              value={(p.exp / p.expNext) * 100}
              variant="exp"
              label="Progression vers le niveau suivant"
            />
          </View>
        </View>
      </View>
      <View className="gap-3.5 px-4 pt-4">
        <Grid cols={2} gap="gap-2.5">
          {stats.map((s) => (
            <Card key={s.label} tight href={s.href} label={`${s.value} ${s.label}`}>
              <T variant="title-2" className={`${s.tone} tabular-nums`}>
                {s.value}
              </T>
              <T variant="body-sm" className="text-ink-muted">
                {s.label}
              </T>
            </Card>
          ))}
        </Grid>
        <List>
          <ListItem href="/watchlist" icon="television" chevron>
            <T weight={800} className="flex-1">
              Mon tracker de visionnage
            </T>
          </ListItem>
          <ListItem href="/boutique" icon="storefront" chevron>
            <T weight={800} className="flex-1">
              Boutique
            </T>
            <Badge icon="coin">{fr(p.coins)}</Badge>
          </ListItem>
          <ListItem href="/senpai" icon="graduation-cap" chevron>
            <T weight={800} className="flex-1">
              Mes kohai
            </T>
            <Count>{p.kohai}</Count>
          </ListItem>
        </List>
      </View>
    </Screen>
  );
}
