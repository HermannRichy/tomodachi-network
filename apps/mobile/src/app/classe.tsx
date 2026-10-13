import { useState } from 'react';
import { View } from 'react-native';
import { playerClasses, type PlayerClassId } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Bottom, Screen } from '@/components/layout';
import { AppBar, Button, IconButton, Steps, T, Tile, Touch, cardClass } from '@/components/ui';
import { classIcons } from '@/lib/maps';

// Choix de la classe (étape 1 sur 3)
export default function Classe() {
  const [picked, setPicked] = useState<PlayerClassId>('stratege');
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/bienvenue" />
          <Steps current={1} total={3} />
          <T variant="label" className="px-3 text-ink-muted">
            1/3
          </T>
        </AppBar>
      }
      contentClassName="px-5 pt-1"
    >
      <View className="gap-1">
        <T variant="title-1">Choisis ta classe</T>
        <T className="text-ink-muted">
          Elle colore ta fiche de personnage. Tu pourras en changer plus tard.
        </T>
      </View>
      <View accessibilityRole="radiogroup" accessibilityLabel="Classes" className="gap-2.5">
        {playerClasses.map((c) => {
          const on = c.id === picked;
          return (
            <Touch
              key={c.id}
              role="radio"
              selected={on}
              onPress={() => setPicked(c.id)}
              className={cardClass(
                on ? 'selected' : 'default',
                false,
                'flex-row items-center gap-3.5',
              )}
            >
              <Tile icon={classIcons[c.id]} tone={c.tone} size={52} />
              <View className="flex-1 gap-1">
                <T variant="title-3">{c.name}</T>
                <T variant="body-sm" className="text-ink-muted">
                  {c.description}
                </T>
              </View>
              <View className={on ? undefined : 'opacity-0'}>
                <Icon name="check-circle" className="text-primary" />
              </View>
            </Touch>
          );
        })}
      </View>
      <Bottom>
        <Button href="/animes-favoris" block>
          Continuer
        </Button>
      </Bottom>
    </Screen>
  );
}
