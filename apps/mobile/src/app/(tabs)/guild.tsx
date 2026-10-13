import { View } from 'react-native';
import { fr, guildWar as w, members, myGuild as g } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import { StatusBarOn } from '@/components/status';
import {
  Avatar,
  AvatarStack,
  Badge,
  Bar,
  Card,
  Grid,
  IconButton,
  SectionTitle,
  T,
} from '@/components/ui';

export default function Guild() {
  const { aiko, kenji, yuna, sora } = members;
  return (
    <Screen bg="bg-sakura" bottomInset={false} contentClassName="bg-background px-0 pt-0">
      <StatusBarOn surface="brand" />
      <View className="rounded-b-xl border-b-[6px] border-sakura-depth bg-sakura">
        <View className="min-h-11 flex-row items-center px-2">
          <IconButton
            icon="magnifying-glass"
            label="Découvrir d'autres guilds"
            href="/guilds"
            iconClassName="text-on-sakura"
          />
          <View className="flex-1" />
          <IconButton
            icon="chat-circle-dots"
            label="Salon de guild"
            href="/conversation/sakura-ronin"
            iconClassName="text-on-sakura"
          />
          <IconButton icon="gear-six" label="Réglages de la guild" iconClassName="text-on-sakura" />
        </View>
        <View className="flex-row items-center gap-3.5 px-5 pb-5">
          <View className="h-[72px] w-[72px] items-center justify-center rounded-xl border-b-4 border-sakura-soft bg-surface">
            <Icon name="shield" fill size={40} className="text-sakura" />
          </View>
          <View className="flex-1 gap-1">
            <T variant="title-1" accessibilityRole="header" className="text-on-sakura">
              {g.name}
            </T>
            <T variant="body-sm" className="text-on-sakura opacity-90">
              Rang #{g.rank} · {g.members} membres · {g.online} en ligne
            </T>
            <Badge tone="on-sakura" className="self-start">
              Tu es {g.myRole}
            </Badge>
          </View>
        </View>
      </View>
      <View className="gap-3.5 px-4 pt-4">
        <Card href="/guerre-guilds" label="Guerre de guilds">
          <View className="flex-row items-center justify-between">
            <T variant="title-3">Guerre de guilds</T>
            <Badge tone="sakura">{w.endsIn}</Badge>
          </View>
          <View className="gap-1">
            <View className="flex-row justify-between">
              <T variant="body-sm" weight={800}>
                {w.us.name}
              </T>
              <T variant="body-sm" weight={800} className="tabular-nums">
                {fr(w.us.score)}
              </T>
            </View>
            <Bar value={62} variant="war" label={`Score ${w.us.name}`} />
          </View>
          <View className="gap-1">
            <View className="flex-row justify-between">
              <T variant="body-sm">{w.them.name}</T>
              <T variant="body-sm" className="tabular-nums">
                {fr(w.them.score)}
              </T>
            </View>
            <Bar value={50} label={`Score ${w.them.name}`} />
          </View>
        </Card>
        <Grid cols={2} gap="gap-2.5">
          <Card tight row href="/quiz" label="Quiz battle">
            <Icon name="question" className="text-primary" />
            <T variant="body-sm" weight={800} className="flex-1">
              Quiz battle
            </T>
          </Card>
          <Card tight row href="/arc" label="Défis de l'arc">
            <Icon name="target" className="text-sakura" />
            <T variant="body-sm" weight={800} className="flex-1">
              Défis de l&apos;arc
            </T>
          </Card>
          <Card tight row href="/watch-party" label="Watch party">
            <Icon name="popcorn" className="text-gold-depth" />
            <T variant="body-sm" weight={800} className="flex-1">
              Watch party
            </T>
          </Card>
          <Card tight row href="/live" label="Live, 1 en cours">
            <Icon name="broadcast" className="text-success" />
            <T variant="body-sm" weight={800} className="flex-1">
              Live
            </T>
            <Badge tone="live">1</Badge>
          </Card>
        </Grid>
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <SectionTitle>En ligne</SectionTitle>
            <AvatarStack>
              {[aiko, kenji, yuna, sora].map((m) => (
                <Avatar key={m.username} initial={m.initial} tone={m.tone} size="s" online />
              ))}
              <Avatar initial="+8" tone={5} size="s" />
            </AvatarStack>
          </View>
          <Card tight href="/conversation/sakura-ronin" label="Salon de guild">
            <View className="flex-row items-start gap-2">
              <Avatar initial={yuna.initial} tone={yuna.tone} size="xs" />
              <T variant="body-sm" className="flex-1">
                <T variant="body-sm" weight={800}>
                  {yuna.name}
                </T>{' '}
                On se fait le quiz ce soir pour reprendre 200 points ?
              </T>
            </View>
            <View className="flex-row items-start gap-2">
              <Avatar initial={sora.initial} tone={sora.tone} size="xs" />
              <T variant="body-sm" className="flex-1">
                <T variant="body-sm" weight={800}>
                  {sora.name}
                </T>{' '}
                Je suis là à 20 h, préparez-vous.
              </T>
            </View>
          </Card>
        </View>
      </View>
    </Screen>
  );
}
