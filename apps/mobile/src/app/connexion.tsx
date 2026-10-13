import { Link } from 'expo-router';
import { View } from 'react-native';
import { PasswordInput } from '@/components/controls';
import { Screen } from '@/components/layout';
import {
  AppBar,
  Button,
  Divider,
  Field,
  IconButton,
  Input,
  Kami,
  T,
  TextLink,
} from '@/components/ui';

export default function Connexion() {
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/bienvenue" />
        </AppBar>
      }
      contentClassName="gap-4 px-5 pt-0"
    >
      <View className="flex-row items-center gap-4">
        <Kami size={76} />
        <View className="flex-1 gap-1">
          <T variant="title-1">Okaeri !</T>
          <T className="text-ink-muted">Content de te revoir, nakama.</T>
        </View>
      </View>
      <Field label="Email ou pseudo">
        <Input
          icon="user"
          defaultValue="ren_sensei"
          accessibilityLabel="Email ou pseudo"
          autoCapitalize="none"
          autoComplete="username"
          focused
        />
      </Field>
      <Field label="Mot de passe">
        <PasswordInput defaultValue="motdepasse12" />
      </Field>
      <Link
        href="/mot-de-passe"
        accessibilityRole="link"
        className="min-h-8 self-end py-1.5 font-nunito-extrabold text-body-sm text-primary"
      >
        Mot de passe oublié ?
      </Link>
      <Button href="/deux-facteurs" block>
        Se connecter
      </Button>
      <View className="flex-row items-center gap-2.5">
        <Divider className="flex-1" />
        <T variant="label" className="text-ink-muted">
          ou
        </T>
        <Divider className="flex-1" />
      </View>
      <Button href="/feed" variant="discord" block icon="discord-logo">
        Continuer avec Discord
      </Button>
      <View className="flex-row gap-2.5">
        <Button href="/feed" variant="secondary" icon="google-logo" className="flex-1">
          Google
        </Button>
        <Button href="/feed" variant="secondary" icon="apple-logo" className="flex-1">
          Apple
        </Button>
      </View>
      <T variant="body-sm" className="mt-auto pt-4 text-center text-ink-muted">
        Pas encore de compte ? <TextLink href="/inscription">S&apos;inscrire</TextLink>
      </T>
    </Screen>
  );
}
