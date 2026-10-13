import type { Metadata } from 'next';
import { Icon } from '@/components/icon';
import { Checkbox, PasswordInput } from '@/components/client';
import {
  AppBar,
  AppBarTitle,
  Bar,
  Bottom,
  Button,
  Field,
  IconButton,
  Input,
  Note,
  TextLink,
} from '@/components/ui';

export const metadata: Metadata = { title: 'Créer un compte' };

export default function Inscription() {
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/" />
        <AppBarTitle>Créer un compte</AppBarTitle>
      </AppBar>
      <main className="flex flex-1 flex-col gap-4 px-5 pt-1 pb-10">
        <p className="text-body text-ink-muted">Quelques infos et tu rejoins les nakama.</p>
        <Field label="Pseudo" hint="Ce pseudo est libre." hintTone="ok">
          <Input
            prefix="@"
            defaultValue="ren_sensei"
            aria-label="Pseudo"
            autoComplete="username"
            className="border-primary"
            trailing={<Icon name="check-circle" size={20} className="text-success" />}
          />
        </Field>
        <Field label="Email">
          <Input
            icon="envelope-simple"
            type="email"
            placeholder="toi@exemple.com"
            aria-label="Email"
            autoComplete="email"
          />
        </Field>
        <div className="flex flex-col gap-1.5">
          <Field label="Mot de passe">
            <PasswordInput defaultValue="motdepasse12" />
          </Field>
          <span className="flex items-center gap-2">
            <Bar
              value={75}
              variant="gold"
              size="thin"
              className="flex-1"
              label="Solidité du mot de passe"
            />
            <span className="text-label text-gold-ink">Solide</span>
          </span>
        </div>
        <Checkbox initial>
          J&apos;accepte les <TextLink href="#cgu">CGU</TextLink> et la{' '}
          <TextLink href="#confidentialite">politique de confidentialité</TextLink>.
        </Checkbox>
        <Note tone="success" icon="shield-check">
          Vérification anti-bot réussie
        </Note>
        <Bottom>
          <Button href="/verification" block>
            Créer mon compte
          </Button>
          <p className="text-center text-body-sm text-ink-muted">
            Déjà inscrit ? <TextLink href="/connexion">Se connecter</TextLink>
          </p>
        </Bottom>
      </main>
    </>
  );
}
