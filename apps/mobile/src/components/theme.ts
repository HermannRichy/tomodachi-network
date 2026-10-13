// Thème clair ou sombre choisi dans Paramètres, mémorisé sur l'appareil.
// NativeWind suit Appearance : forcer le thème ici bascule toutes les classes du design system.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@tomodachi/design-tokens';
import { Appearance, useColorScheme } from 'react-native';

const KEY = 'tomo-theme';
export type Theme = 'light' | 'dark';

function apply(theme: Theme) {
  // Absent sur le web (react-native-web) : le thème y suit le système.
  Appearance.setColorScheme?.(theme);
}

export async function restoreTheme() {
  try {
    const saved = await AsyncStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') apply(saved);
  } catch {}
}

export function setTheme(theme: Theme) {
  apply(theme);
  AsyncStorage.setItem(KEY, theme).catch(() => {});
}

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? 'dark' : 'light';
}

/** Valeurs brutes des tokens, pour les props qui n'acceptent pas de classe (placeholderTextColor…). */
export function useTokens() {
  return colors[useTheme()];
}
