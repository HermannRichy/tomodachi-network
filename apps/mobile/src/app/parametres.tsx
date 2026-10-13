import { useState } from 'react';
import { myProfile } from '@tomodachi/fixtures';
import { ThemeSwitch, Toggle } from '@/components/controls';
import { Screen } from '@/components/layout';
import {
  AppBar,
  AppBarTitle,
  Badge,
  Button,
  IconButton,
  List,
  ListItem,
  SectionTitle,
  T,
} from '@/components/ui';

export default function Parametres() {
  const [priv, setPriv] = useState(false);
  const [spoil, setSpoil] = useState(true);
  const [push, setPush] = useState(true);
  const row = 'min-h-[52px]';
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/profil" />
          <AppBarTitle>Paramètres</AppBarTitle>
        </AppBar>
      }
      contentClassName="gap-2.5 pt-1"
    >
      <SectionTitle>Apparence</SectionTitle>
      <ThemeSwitch />
      <List>
        <ListItem icon="translate" chevron className={row} onPress={() => {}}>
          <T variant="body-sm" weight={800} className="flex-1">
            Langue
          </T>
          <T variant="body-sm" className="text-ink-muted">
            Français
          </T>
        </ListItem>
      </List>
      <SectionTitle className="mt-1.5">Compte et sécurité</SectionTitle>
      <List>
        <ListItem href="/deux-facteurs" icon="shield-check" chevron className={row}>
          <T variant="body-sm" weight={800} className="flex-1">
            Double authentification
          </T>
          <Badge tone="success">Activée</Badge>
        </ListItem>
        <ListItem icon="envelope-simple" chevron className={row} onPress={() => {}}>
          <T variant="body-sm" weight={800} className="flex-1">
            Email
          </T>
          <T variant="body-sm" className="max-w-[130px] text-ink-muted" numberOfLines={1}>
            {myProfile.email}
          </T>
        </ListItem>
      </List>
      <SectionTitle className="mt-1.5">Confidentialité</SectionTitle>
      <List>
        <ListItem icon="lock-simple" className={row}>
          <T variant="body-sm" weight={800} className="flex-1">
            Compte privé
          </T>
          <Toggle on={priv} onChange={setPriv} label="Compte privé" />
        </ListItem>
        <ListItem icon="eye-slash" className={row}>
          <T variant="body-sm" weight={800} className="flex-1">
            Masquer les spoilers
          </T>
          <Toggle on={spoil} onChange={setSpoil} label="Masquer les spoilers" />
        </ListItem>
        <ListItem icon="bell" className={row}>
          <T variant="body-sm" weight={800} className="flex-1">
            Notifications push
          </T>
          <Toggle on={push} onChange={setPush} label="Notifications push" />
        </ListItem>
        <ListItem icon="prohibit" chevron className={row} onPress={() => {}}>
          <T variant="body-sm" weight={800} className="flex-1">
            Comptes bloqués
          </T>
          <T variant="body-sm" className="text-ink-muted">
            2
          </T>
        </ListItem>
      </List>
      <Button
        href="/bienvenue"
        variant="secondary-danger"
        block
        icon="sign-out"
        className="mt-auto"
      >
        Se déconnecter
      </Button>
    </Screen>
  );
}
