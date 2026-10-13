import { useEffect } from 'react';
import { Confetti, haptic } from './motion';

/** Effets d'un écran de récompense : confettis et vibration de succès à l'arrivée. */
export function RewardEffects({ count }: { count?: number }) {
  useEffect(() => haptic('success'), []);
  return <Confetti count={count} />;
}
