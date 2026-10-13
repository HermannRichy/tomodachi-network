import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Écran « Bienvenue » de la maquette (docs/maquettes/Main.dc.html), version mobile.
export default function Bienvenue() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 pb-6">
        <View className="flex-1 items-center justify-center gap-3">
          <Text className="max-w-72 rounded-lg border-2 border-b-4 border-border bg-surface px-4 py-3 text-center font-nunito-bold text-[15px] leading-[21px] text-ink">
            Yo, nakama ! Moi, c&apos;est Kami-sama. Je veille sur ce monde.
          </Text>
          <Image
            source={require('../../assets/images/kami-sama.svg')}
            style={{ width: 150, height: 141 }}
            accessibilityLabel="Kami-sama"
          />
          <Text className="font-nunito-black text-display text-primary">Tomodachi</Text>
          <Text className="text-center font-nunito text-body text-ink-muted">
            Trouve ta guild, tes nakama{'\n'}et ton prochain anime.
          </Text>
        </View>

        <View className="gap-2.5">
          <Link href="/" asChild>
            <Text
              accessibilityRole="button"
              className="min-h-[52px] overflow-hidden rounded-lg border-b-4 border-primary-depth bg-primary px-5 py-4 text-center font-nunito-extrabold text-button text-on-primary"
            >
              Créer un compte
            </Text>
          </Link>
          <Link href="/" asChild>
            <Text
              accessibilityRole="button"
              className="min-h-[52px] overflow-hidden rounded-lg border-2 border-b-4 border-border border-b-border-depth bg-surface px-5 py-3.5 text-center font-nunito-extrabold text-button text-primary"
            >
              J&apos;ai déjà un compte
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
