import { StatusBar } from 'expo-status-bar';
import { useTheme } from './theme';

/** Barre d'état lisible sur un en-tête de couleur (primary, sakura) ou sur un flux vidéo. */
export function StatusBarOn({ surface }: { surface: 'brand' | 'media' }) {
  const theme = useTheme();
  // En sombre, primary et sakura sont clairs : le texte de la barre d'état passe en foncé.
  return <StatusBar style={surface === 'media' || theme === 'light' ? 'light' : 'dark'} />;
}
