import { useState } from 'react';
import { View } from 'react-native';
import { animes, genres } from '@tomodachi/fixtures';
import { ChipTabs } from '@/components/controls';
import { Icon } from '@/components/icon';
import { Bottom, Screen } from '@/components/layout';
import { AppBar, Button, Grid, IconButton, Input, Poster, Steps, T } from '@/components/ui';

// Animes favoris (étape 2 sur 3)
export default function AnimesFavoris() {
  const [on, setOn] = useState<Record<string, boolean>>({
    'lames-du-crepuscule': true,
    'academie-hoshizora': true,
    'mecha-aurora': true,
    'volley-kaze': true,
  });
  const count = Object.values(on).filter(Boolean).length;
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/classe" />
          <Steps current={2} total={3} />
          <T variant="label" className="px-3 text-ink-muted">
            2/3
          </T>
        </AppBar>
      }
      contentClassName="gap-3 px-5 pt-1"
    >
      <View className="gap-1">
        <T variant="title-1">Tes animes favoris</T>
        <T className="text-ink-muted">Choisis-en au moins 3 pour personnaliser ton feed.</T>
      </View>
      <Input
        sunken
        icon="magnifying-glass"
        placeholder="Chercher un anime"
        accessibilityLabel="Chercher un anime"
      />
      <ChipTabs tabs={genres} label="Genres" />
      <Grid cols={3}>
        {animes.map((a) => (
          <Poster
            key={a.id}
            tone={a.tone}
            title={a.title}
            selected={!!on[a.id]}
            onPress={() => setOn((s) => ({ ...s, [a.id]: !s[a.id] }))}
          >
            {on[a.id] && (
              <View className="absolute right-2 top-2 h-[26px] w-[26px] items-center justify-center rounded-pill bg-gold">
                <Icon name="check" size={16} className="text-on-gold" />
              </View>
            )}
          </Poster>
        ))}
      </Grid>
      <Bottom className="gap-2">
        <T variant="label" className="text-center text-ink-muted" accessibilityLiveRegion="polite">
          {count} sélectionnés
        </T>
        <Button href="/premiers-nakama" block disabled={count < 3}>
          Continuer
        </Button>
      </Bottom>
    </Screen>
  );
}
