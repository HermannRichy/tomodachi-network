import '../global.css';

import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  useFonts,
} from '@expo-google-fonts/nunito';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { restoreTheme, useTokens } from '@/components/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });
  const [themeReady, setThemeReady] = useState(false);
  const tokens = useTokens();

  useEffect(() => {
    restoreTheme().finally(() => setThemeReady(true));
  }, []);

  useEffect(() => {
    if (fontsLoaded && themeReady) SplashScreen.hideAsync();
  }, [fontsLoaded, themeReady]);

  if (!fontsLoaded || !themeReady) return null;

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: tokens.background } }}
      >
        <Stack.Screen
          name="index"
          options={{ contentStyle: { backgroundColor: tokens.primary } }}
        />
        <Stack.Screen name="publier" options={{ presentation: 'modal' }} />
        <Stack.Screen
          name="niveau"
          options={{ presentation: 'fullScreenModal', animation: 'fade' }}
        />
        <Stack.Screen
          name="signaler"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen name="appel-vocal" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="appel-video" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="live" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
    </>
  );
}
