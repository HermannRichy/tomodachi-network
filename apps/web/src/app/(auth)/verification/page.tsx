import type { Metadata } from 'next';
import { Countdown, OtpInput } from '@/components/client';
import { AppBar, Bottom, Button, IconButton, Note, Tile } from '@/components/ui';

export const metadata: Metadata = { title: 'Vérifie ta boîte mail' };

export default function Verification() {
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/inscription" />
      </AppBar>
      <main className="flex flex-1 flex-col gap-5 px-5 pt-2 pb-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Tile icon="envelope-simple" tone="primary" size={88} />
          <h1 className="text-title-1">Vérifie ta boîte mail</h1>
          <p className="text-body text-ink-muted">
            On a envoyé un code à 6 chiffres à<br />
            <b className="font-extrabold text-ink">ren@exemple.com</b>
          </p>
        </div>
        <OtpInput initial="4812" label="Code de vérification" />
        <p className="text-center text-body-sm text-ink-muted">
          Renvoyer le code dans{' '}
          <b className="font-extrabold text-ink tabular-nums">
            <Countdown from={42} />
          </b>
        </p>
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
      </main>
    </>
  );
}
