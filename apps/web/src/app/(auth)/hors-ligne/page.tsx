import type { Metadata } from 'next';
import { Kami, Speech } from '@/components/ui';
import { RetryButton } from './retry';

export const metadata: Metadata = { title: 'Hors ligne' };

// Affichée par le service worker quand il n'y a pas de connexion.
export default function HorsLigne() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10 text-center">
      <Speech className="max-w-[280px]">Pas de réseau, nakama. Je garde la place au chaud.</Speech>
      <Kami size={150} alt="Kami-sama" />
      <h1 className="text-title-1">Tu es hors ligne</h1>
      <p className="text-body text-ink-muted">
        Reconnecte-toi pour retrouver ton feed, tes messages et ta guild.
      </p>
      <RetryButton />
    </main>
  );
}
