import type { Metadata } from 'next';
import { Checkbox, OtpInput } from '@/components/client';
import { AppBar, Bottom, Button, IconButton, Tile } from '@/components/ui';

export const metadata: Metadata = { title: 'Double authentification' };

export default function DeuxFacteurs() {
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/connexion" />
      </AppBar>
      <main className="flex flex-1 flex-col gap-5 px-5 pt-2 pb-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Tile icon="shield-check" tone="success-ok" size={88} />
          <h1 className="text-title-1">Double authentification</h1>
          <p className="text-body text-ink-muted">
            Entre le code affiché dans ton application d&apos;authentification.
          </p>
        </div>
        <OtpInput initial="73095" label="Code d'authentification" />
        <Checkbox>Faire confiance à cet appareil pendant 30 jours</Checkbox>
        <Bottom>
          <Button href="/feed" block>
            Vérifier
          </Button>
          <Button href="#code-secours" variant="ghost" icon="key" className="self-center">
            Utiliser un code de secours
          </Button>
        </Bottom>
      </main>
    </>
  );
}
