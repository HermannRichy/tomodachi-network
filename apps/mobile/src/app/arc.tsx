import { useState } from 'react';
import { View } from 'react-native';
import { season } from '@tomodachi/fixtures';
import { Icon, type IconName } from '@/components/icon';
import { Screen } from '@/components/layout';
import { StatusBarOn } from '@/components/status';
import { Badge, Bar, Button, Card, IconButton, SectionTitle, T } from '@/components/ui';

const icons: Record<string, IconName> = {
  popcorn: 'popcorn',
  pencil: 'pencil-simple',
  question: 'question',
  graduation: 'graduation-cap',
};
const iconTone = { gold: 'text-gold-depth', primary: 'text-primary', sakura: 'text-sakura' };
const barVariant = { gold: 'watch', primary: 'default', sakura: 'war' } as const;

export default function Arc() {
  const [claimed, setClaimed] = useState(false);
  return (
    <Screen bg="bg-primary" contentClassName="gap-2.5 bg-background px-0 pt-0">
      <StatusBarOn surface="brand" />
      <View className="rounded-b-xl border-b-[6px] border-primary-depth bg-primary">
        <View className="min-h-11 flex-row items-center px-2">
          <IconButton
            icon="arrow-left"
            label="Retour"
            href="/feed"
            iconClassName="text-on-primary"
          />
          <View className="flex-1" />
          <Badge tone="official" icon="timer" className="mr-2">
            {season.remaining}
          </Badge>
        </View>
        <View className="flex-row items-center gap-3.5 px-5 pb-5">
          <View className="h-[72px] w-[72px] items-center justify-center rounded-xl bg-primary-depth">
            <Icon name="ghost" size={40} className="text-on-primary" />
          </View>
          <View className="flex-1 gap-1.5">
            <T variant="label" className="tracking-[0.8px] text-on-primary opacity-85">
              ARC DE SAISON
            </T>
            <T variant="title-2" accessibilityRole="header" className="text-on-primary">
              {season.name}
            </T>
            <Bar value={40} variant="exp" label="Défis terminés" />
            <T variant="caption" className="text-on-primary opacity-90">
              2 défis sur 5 terminés
            </T>
          </View>
        </View>
      </View>
      <View className="gap-2.5 px-4 pt-1.5">
        <SectionTitle>Défis</SectionTitle>
        {season.challenges.map((c) => {
          const complete = c.done >= c.total;
          return (
            <Card key={c.label} tight>
              <View className="flex-row items-center gap-2.5">
                <Icon name={icons[c.icon]!} className={iconTone[c.tone]} />
                <T variant="body-sm" weight={800} className="flex-1">
                  {c.label}
                </T>
                {complete ? (
                  claimed ? (
                    <Badge tone="success" icon="check">
                      {c.reward}
                    </Badge>
                  ) : (
                    <Button variant="gold" size="sm" onPress={() => setClaimed(true)}>
                      Récupérer
                    </Button>
                  )
                ) : (
                  <T variant="caption" className="text-ink-muted tabular-nums">
                    {c.done} / {c.total}
                  </T>
                )}
              </View>
              <Bar
                value={(c.done / c.total) * 100}
                variant={complete ? 'watch' : barVariant[c.tone]}
                size="thin"
                label={c.label}
              />
              {!complete && c.reward && (
                <T variant="caption" className="text-gold-ink">
                  {c.reward}
                </T>
              )}
            </Card>
          );
        })}
        <Card variant="gold" tight row>
          <Icon name="gift" size={28} className="text-gold-ink" />
          <View className="flex-1 gap-1">
            <T variant="body-sm" weight={800}>
              Récompense finale
            </T>
            <T variant="caption" className="text-gold-ink">
              {season.finalReward}
            </T>
          </View>
        </Card>
      </View>
    </Screen>
  );
}
