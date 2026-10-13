import { View } from 'react-native';
import { OtpInput, useCountdown } from '@/components/controls';
import { Bottom, Screen } from '@/components/layout';
import { AppBar, Button, IconButton, Note, T, Tile } from '@/components/ui';

export default function Verification() {
  const left = useCountdown(42);
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/inscription" />
        </AppBar>
      }
      contentClassName="gap-5 px-5"
    >
      <View className="items-center gap-3">
        <Tile icon="envelope-simple" tone="primary" size={88} />
        <T variant="title-1" className="text-center">
          Vérifie ta boîte mail
        </T>
        <T className="text-center text-ink-muted">
          On a envoyé un code à 6 chiffres à{'\n'}
          <T weight={800}>ren@exemple.com</T>
        </T>
      </View>
      <OtpInput initial="4812" label="Code de vérification" />
      <T variant="body-sm" className="text-center text-ink-muted">
        Renvoyer le code dans{' '}
        <T variant="body-sm" weight={800} className="tabular-nums">
          {left}
        </T>
      </T>
      <Note tone="gold" icon="lightning">
        +50 EXP en validant ton email
      </Note>
      <Bottom>
        <Button href="/classe" block>
          Valider
        </Button>
        <Button href="/inscription" variant="ghost" className="self-center">
          Modifier l&apos;adresse email
        </Button>
      </Bottom>
    </Screen>
  );
}
