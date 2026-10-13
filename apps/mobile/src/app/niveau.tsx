import { View } from 'react-native';
import { fr, levelUp as l } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Animate } from '@/components/motion';
import { RewardEffects } from '@/components/reward';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Screen } from '@/components/layout';
import { StatusBarOn } from '@/components/status';
import { Bar, Button, Card, Grid, IconButton, Kami, SectionTitle, T, Tile } from '@/components/ui';

export default function Niveau() {
  return (
    <Screen
      bg="bg-primary"
      header={
        <>
          <RewardEffects />
          <View className="min-h-[52px] flex-row items-center justify-end px-2">
            <IconButton icon="x" label="Fermer" href="/feed" iconClassName="text-on-primary" />
          </View>
        </>
      }
      contentClassName="gap-5 px-6 pb-10 pt-0"
    >
      <StatusBarOn surface="brand" />
      <View className="flex-1 items-center justify-center gap-2">
        <View
          className="flex-row items-center gap-2"
          importantForAccessibility="no-hide-descendants"
        >
          <Icon name="sparkle" size={20} className="text-gold" />
          <Icon name="star" fill size={32} className="text-gold" />
          <Icon name="sparkle" size={20} className="text-gold" />
        </View>
        <Animate name="pop" duration={520}>
          <Kami size={170} label="Kami-sama te félicite" />
        </Animate>
        <T variant="label" className="tracking-[1px] text-on-primary opacity-85">
          NIVEAU SUPÉRIEUR
        </T>
        <Animate name="pop" delay={250} duration={520}>
          <T variant="hero" accessibilityRole="header" className="text-on-primary">
            {l.level}
          </T>
        </Animate>
        <T variant="title-3" className="text-on-primary">
          {l.rank}
        </T>
        <View className="mt-2 w-full gap-1.5">
          <Bar
            value={(l.exp / l.expNext) * 100}
            variant="exp"
            size="thick"
            label="Progression vers le niveau 14"
          />
          <View className="flex-row justify-between">
            <T variant="caption" className="text-on-primary opacity-90 tabular-nums">
              {l.exp} / {fr(l.expNext)} EXP
            </T>
            <T variant="caption" className="text-on-primary opacity-90">
              Niveau {l.level + 1}
            </T>
          </View>
        </View>
      </View>
      <Card>
        <SectionTitle>Récompenses</SectionTitle>
        {l.rewards.map((r, i) => (
          <Animated.View key={r.label} entering={FadeInDown.delay(700 + i * 120).duration(320)}>
            <View className="flex-row items-center gap-2.5">
              <Tile icon={r.icon} tone={r.tone} size={40} />
              <T variant="body-sm" weight={800} className="flex-1">
                {r.label}
              </T>
            </View>
          </Animated.View>
        ))}
      </Card>
      <Grid cols={2} gap="gap-2.5">
        <Button variant="secondary" icon="share-network" block>
          Partager
        </Button>
        <Button href="/feed" variant="gold" block>
          Continuer
        </Button>
      </Grid>
    </Screen>
  );
}
