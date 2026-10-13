import { View } from 'react-native';
import { Checkbox, OtpInput } from '@/components/controls';
import { Bottom, Screen } from '@/components/layout';
import { AppBar, Button, IconButton, T, Tile } from '@/components/ui';

export default function DeuxFacteurs() {
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/connexion" />
        </AppBar>
      }
      contentClassName="gap-5 px-5"
    >
      <View className="items-center gap-3">
        <Tile icon="shield-check" tone="success-ok" size={88} />
        <T variant="title-1" className="text-center">
          Double authentification
        </T>
        <T className="text-center text-ink-muted">
          Entre le code affiché dans ton application d&apos;authentification.
        </T>
      </View>
      <OtpInput initial="73095" label="Code d'authentification" />
      <Checkbox>
        <T variant="body-sm">Faire confiance à cet appareil pendant 30 jours</T>
      </Checkbox>
      <Bottom>
        <Button href="/feed" block>
          Vérifier
        </Button>
        <Button variant="ghost" icon="key" className="self-center">
          Utiliser un code de secours
        </Button>
      </Bottom>
    </Screen>
  );
}
