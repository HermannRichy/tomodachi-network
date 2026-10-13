import { View } from 'react-native';
import { Bottom, Screen } from '@/components/layout';
import { Button, Chip, Kami, Speech, T, TextLink } from '@/components/ui';

// Bienvenue (maquette Main)
export default function Bienvenue() {
  return (
    <Screen contentClassName="gap-0 px-6 pb-10">
      <View className="flex-row items-center justify-between">
        <T variant="label" className="text-primary">
          友達
        </T>
        <Chip icon="translate" small onPress={() => {}} label="Langue : français">
          FR
        </Chip>
      </View>
      <View className="flex-1 items-center justify-center gap-3 py-8">
        <Speech className="max-w-[280px]">
          Yo, nakama ! Moi, c&apos;est Kami-sama. Je veille sur ce monde.
        </Speech>
        <Kami size={150} label="Kami-sama" />
        <T variant="display" className="text-primary">
          Tomodachi
        </T>
        <T className="text-center text-ink-muted">
          Trouve ta guild, tes nakama{'\n'}et ton prochain anime.
        </T>
      </View>
      <Bottom className="pt-0">
        <Button href="/classe" variant="discord" block icon="discord-logo">
          Continuer avec Discord
        </Button>
        <View className="flex-row gap-2.5">
          <Button href="/classe" variant="secondary" icon="google-logo" className="flex-1">
            Google
          </Button>
          <Button href="/classe" variant="secondary" icon="apple-logo" className="flex-1">
            Apple
          </Button>
        </View>
        <Button href="/inscription" block icon="envelope-simple">
          Créer un compte avec mon email
        </Button>
        <Button href="/connexion" variant="ghost" className="self-center">
          J&apos;ai déjà un compte
        </Button>
        <T variant="caption" className="text-center text-ink-muted">
          En continuant, tu acceptes les <TextLink href="/bienvenue">CGU</TextLink> et la{' '}
          <TextLink href="/bienvenue">politique de confidentialité</TextLink>.
        </T>
      </Bottom>
    </Screen>
  );
}
