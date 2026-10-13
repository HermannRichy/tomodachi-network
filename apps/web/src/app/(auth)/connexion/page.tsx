import type { Metadata } from 'next';
import Link from 'next/link';
import { PasswordInput } from '@/components/client';
import { AppBar, Button, Field, IconButton, Input, Kami, TextLink } from '@/components/ui';

export const metadata: Metadata = { title: 'Connexion' };

export default function Connexion() {
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/" />
      </AppBar>
      <main className="flex flex-1 flex-col gap-4 px-5 pb-10">
        <div className="flex items-center gap-4">
          <Kami size={76} />
          <div className="flex flex-col gap-1">
            <h1 className="text-title-1">Okaeri !</h1>
            <p className="text-body text-ink-muted">Content de te revoir, nakama.</p>
          </div>
        </div>
        <Field label="Email ou pseudo">
          <Input
            icon="user"
            defaultValue="ren_sensei"
            aria-label="Email ou pseudo"
            autoComplete="username"
          />
        </Field>
        <Field label="Mot de passe">
          <PasswordInput defaultValue="motdepasse12" />
        </Field>
        <Link
          href="/mot-de-passe"
          className="flex min-h-8 items-center self-end text-body-sm font-extrabold text-primary hover:underline"
        >
          Mot de passe oublié ?
        </Link>
        <Button href="/deux-facteurs" block>
          Se connecter
        </Button>
        <div className="flex items-center gap-2.5 text-ink-muted">
          <span className="h-0.5 flex-1 bg-border" />
          <span className="text-label">ou</span>
          <span className="h-0.5 flex-1 bg-border" />
        </div>
        <Button href="/feed" variant="discord" block icon="discord-logo">
          Continuer avec Discord
        </Button>
        <div className="grid grid-cols-2 gap-2.5">
          <Button href="/feed" variant="secondary" icon="google-logo">
            Google
          </Button>
          <Button href="/feed" variant="secondary" icon="apple-logo">
            Apple
          </Button>
        </div>
        <p className="mt-auto pt-4 text-center text-body-sm text-ink-muted">
          Pas encore de compte ? <TextLink href="/inscription">S&apos;inscrire</TextLink>
        </p>
      </main>
    </>
  );
}
