import { useState } from 'react';
import { View } from 'react-native';
import { frames, fr, myProfile } from '@tomodachi/fixtures';
import { SegTabs } from '@/components/controls';
import { Icon } from '@/components/icon';
import { haptic } from '@/components/motion';
import { Screen } from '@/components/layout';
import { AppBar, AppBarTitle, Badge, Button, Card, Grid, IconButton, T, cx } from '@/components/ui';

const ring = {
  gold: 'border-gold',
  sakura: 'border-sakura',
  primary: 'border-primary',
  success: 'border-success',
};

export default function Boutique() {
  const [coins, setCoins] = useState(myProfile.coins);
  const [owned, setOwned] = useState<Record<string, boolean>>({ lune: true });
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/profil" />
          <AppBarTitle>Boutique</AppBarTitle>
          <Badge icon="coin" large className="mr-2" textClassName="tabular-nums">
            {fr(coins)}
          </Badge>
        </AppBar>
      }
      contentClassName="pt-1"
    >
      <SegTabs tabs={['Cadres', 'Titres', 'Thèmes']} label="Catégories" />
      <Card variant="primary" row className="gap-3.5">
        <View className="h-16 w-16 items-center justify-center rounded-pill border-[5px] border-gold bg-primary-depth">
          <Icon name="ghost" size={28} className="text-on-primary" />
        </View>
        <View className="flex-1 gap-1">
          <T variant="label" className="text-on-primary opacity-85">
            ÉDITION LIMITÉE
          </T>
          <T variant="title-3" className="text-on-primary">
            Pack Automne des Yokai
          </T>
          <T variant="caption" className="text-on-primary opacity-90">
            Cadre, titre et thème · 3 j restants
          </T>
        </View>
        <Button variant="gold" size="sm" icon="coin">
          600
        </Button>
      </Card>
      <Grid cols={2} gap="gap-2.5">
        {frames.map((f) => {
          const own = !!owned[f.id];
          return (
            <Card key={f.id} tight className="items-center">
              <View
                className={cx(
                  'h-16 w-16 rounded-pill border-[5px] bg-surface-sunken',
                  ring[f.ring],
                )}
              />
              <T variant="body-sm" weight={800} className="text-center">
                {f.name}
              </T>
              <Button
                variant={own ? 'secondary' : 'gold'}
                size="sm"
                block
                disabled={!own && coins < f.price}
                onPress={() => {
                  if (own || coins < f.price) return;
                  setCoins(coins - f.price);
                  haptic('success');
                  setOwned({ ...owned, [f.id]: true });
                }}
              >
                {own ? 'Possédé' : `${f.price} pièces`}
              </Button>
            </Card>
          );
        })}
      </Grid>
      <T variant="caption" className="text-center text-ink-muted">
        Gagne des pièces en relevant les défis et en montant de niveau.
      </T>
    </Screen>
  );
}
