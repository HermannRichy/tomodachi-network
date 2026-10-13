import { useState } from 'react';
import { View } from 'react-native';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import { AppBar, Button, Card, Field, IconButton, Input, T, TextLink, Tile } from '@/components/ui';

export default function MotDePasse() {
  const [sent, setSent] = useState(false);
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/connexion" />
        </AppBar>
      }
      contentClassName="gap-5 px-5"
    >
      <View className="items-center gap-3">
        <Tile icon="key" tone="gold" size={88} />
        <T variant="title-1" className="text-center">
          Mot de passe oublié ?
        </T>
        <T className="text-center text-ink-muted">
          Pas de panique. Donne ton email, on t&apos;envoie un lien pour en choisir un nouveau.
        </T>
      </View>
      <Field label="Email">
        <Input
          icon="envelope-simple"
          defaultValue="ren@exemple.com"
          accessibilityLabel="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          focused={!sent}
        />
      </Field>
      {!sent ? (
        <Button block onPress={() => setSent(true)}>
          Envoyer le lien
        </Button>
      ) : (
        <>
          <Card variant="gold">
            <View className="flex-row items-center gap-2.5" accessibilityLiveRegion="polite">
              <Icon name="check-circle" className="text-success" />
              <T variant="title-3">Lien envoyé</T>
            </View>
            <T variant="body-sm">Regarde ta boîte mail. Le lien reste valable 30 minutes.</T>
          </Card>
          <Button href="/connexion" variant="secondary" block>
            Retour à la connexion
          </Button>
        </>
      )}
      <T variant="body-sm" className="mt-auto pt-4 text-center text-ink-muted">
        Tu n&apos;as plus accès à cet email ?{' '}
        <TextLink href="/mot-de-passe">Contacter le support</TextLink>
      </T>
    </Screen>
  );
}
