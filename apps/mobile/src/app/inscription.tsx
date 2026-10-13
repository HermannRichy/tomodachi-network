import { View } from 'react-native';
import { Checkbox, PasswordInput } from '@/components/controls';
import { Icon } from '@/components/icon';
import { Bottom, Screen } from '@/components/layout';
import {
  AppBar,
  AppBarTitle,
  Bar,
  Button,
  Field,
  IconButton,
  Input,
  Note,
  T,
  TextLink,
} from '@/components/ui';

export default function Inscription() {
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/bienvenue" />
          <AppBarTitle>Créer un compte</AppBarTitle>
        </AppBar>
      }
      contentClassName="gap-4 px-5 pt-1"
    >
      <T className="text-ink-muted">Quelques infos et tu rejoins les nakama.</T>
      <Field label="Pseudo" hint="Ce pseudo est libre." hintTone="ok">
        <Input
          prefix="@"
          defaultValue="ren_sensei"
          accessibilityLabel="Pseudo"
          autoCapitalize="none"
          autoComplete="username"
          focused
          trailing={<Icon name="check-circle" size={20} className="text-success" />}
        />
      </Field>
      <Field label="Email">
        <Input
          icon="envelope-simple"
          placeholder="toi@exemple.com"
          accessibilityLabel="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
      </Field>
      <View className="gap-1.5">
        <Field label="Mot de passe">
          <PasswordInput defaultValue="motdepasse12" />
        </Field>
        <View className="flex-row items-center gap-2">
          <Bar
            value={75}
            variant="gold"
            size="thin"
            className="flex-1"
            label="Solidité du mot de passe"
          />
          <T variant="label" className="text-gold-ink">
            Solide
          </T>
        </View>
      </View>
      <Checkbox initial>
        <T variant="body-sm">
          J&apos;accepte les <TextLink href="/inscription">CGU</TextLink> et la{' '}
          <TextLink href="/inscription">politique de confidentialité</TextLink>.
        </T>
      </Checkbox>
      <Note tone="success" icon="shield-check">
        Vérification anti-bot réussie
      </Note>
      <Bottom>
        <Button href="/verification" block>
          Créer mon compte
        </Button>
        <T variant="body-sm" className="text-center text-ink-muted">
          Déjà inscrit ? <TextLink href="/connexion">Se connecter</TextLink>
        </T>
      </Bottom>
    </Screen>
  );
}
