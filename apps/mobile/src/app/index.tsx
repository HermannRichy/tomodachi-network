import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBarOn } from '@/components/status';
import { Kami, T } from '@/components/ui';

// Splash : Kami-sama sur fond indigo, toucher pour commencer.
export default function Splash() {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBarOn surface="brand" />
      <Link href="/bienvenue" asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Toucher pour commencer"
          className="flex-1"
        >
          <View className="flex-1 items-center justify-center gap-4 px-8">
            <Kami size={200} label="Kami-sama, la mascotte de Tomodachi" />
            <T variant="display" className="text-on-primary">
              Tomodachi
            </T>
            <T variant="title-3" className="text-on-primary opacity-90">
              友達 · le réseau des otakus
            </T>
            <View className="mt-6 flex-row gap-2" importantForAccessibility="no-hide-descendants">
              <View className="h-3 w-3 rounded-pill bg-gold" />
              <View className="h-3 w-3 rounded-pill bg-on-primary opacity-60" />
              <View className="h-3 w-3 rounded-pill bg-on-primary opacity-35" />
            </View>
          </View>
          <View className="items-center px-6 pb-14">
            <View className="min-h-11 justify-center px-3">
              <T variant="button" className="text-on-primary">
                Toucher pour commencer
              </T>
            </View>
          </View>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}
