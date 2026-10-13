import { View } from 'react-native';
import { cards } from '@tomodachi/fixtures';
import { ChipTabs } from '@/components/controls';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import {
  AppBar,
  AppBarTitle,
  Badge,
  Bar,
  Card,
  Grid,
  IconButton,
  Poster,
  T,
} from '@/components/ui';

const rarity = {
  legendaire: { label: 'Légendaire', badge: 'official', border: 'border-gold' },
  rare: { label: 'Rare', badge: 'sakura', border: 'border-sakura' },
  commune: { label: 'Commune', badge: 'primary', border: 'border-primary' },
} as const;

export default function Cartes() {
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/profil" />
          <AppBarTitle>Mes cartes</AppBarTitle>
          <Badge icon="cards" className="mr-2">
            37 / 120
          </Badge>
        </AppBar>
      }
      contentClassName="gap-3 pt-1"
    >
      <Bar value={31} variant="gold" label="Collection complétée à 31 %" />
      <ChipTabs tabs={['Toutes', 'Légendaires', 'Rares', 'Communes']} label="Rareté" />
      <Grid cols={3}>
        {cards.map((c) =>
          'locked' in c ? (
            <View key={c.locked} className="gap-1">
              <View className="aspect-[5/7] items-center justify-center gap-1 rounded-md border-2 border-dashed border-border-depth bg-surface-sunken">
                <Icon name="lock-simple" size={28} className="text-ink-muted" />
                <T variant="label" className="text-ink-muted">
                  ???
                </T>
              </View>
              <T variant="caption" className="text-center text-ink-muted">
                {c.locked}
              </T>
            </View>
          ) : (
            <View key={c.name} className="gap-1">
              <Poster
                tone={c.tone}
                title={c.name}
                card
                className={`border-4 ${rarity[c.rarity].border}`}
              />
              <Badge
                tone={rarity[c.rarity].badge}
                icon={c.rarity === 'legendaire' ? 'star' : undefined}
                iconFill
                className="self-center"
              >
                {rarity[c.rarity].label}
              </Badge>
            </View>
          ),
        )}
      </Grid>
      <Card variant="gold" tight row href="/arc" label="Prochaine carte légendaire">
        <Icon name="gift" size={28} className="text-gold-ink" />
        <View className="flex-1 gap-1">
          <T variant="body-sm" weight={800}>
            Prochaine carte légendaire
          </T>
          <T variant="caption" className="text-gold-ink">
            Encore 3 défis de l&apos;arc à relever
          </T>
        </View>
        <Icon name="caret-right" size={20} className="text-ink" />
      </Card>
    </Screen>
  );
}
