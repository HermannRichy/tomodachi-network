import type { Metadata } from 'next';
import { AppBar, Field, IconButton, Input, TextLink, Tile } from '@/components/ui';
import { ResetForm } from './reset-form';

export const metadata: Metadata = { title: 'Mot de passe oublié' };

export default function MotDePasse() {
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/connexion" />
      </AppBar>
      <main className="flex flex-1 flex-col gap-5 px-5 pt-2 pb-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Tile icon="key" tone="gold" size={88} />
          <h1 className="text-title-1">Mot de passe oublié ?</h1>
          <p className="text-body text-ink-muted">
            Pas de panique. Donne ton email, on t&apos;envoie un lien pour en choisir un nouveau.
          </p>
        </div>
        <Field label="Email">
          <Input
            icon="envelope-simple"
            type="email"
            defaultValue="ren@exemple.com"
            aria-label="Email"
            autoComplete="email"
          />
        </Field>
        <ResetForm />
        <p className="mt-auto pt-4 text-center text-body-sm text-ink-muted">
          Tu n&apos;as plus accès à cet email ?{' '}
          <TextLink href="#support">Contacter le support</TextLink>
        </p>
      </main>
    </>
  );
}
