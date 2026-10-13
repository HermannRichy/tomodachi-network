'use client';
import { useState } from 'react';
import { myProfile } from '@tomodachi/fixtures';
import { ThemeSwitch, Toggle } from '@/components/client';
import {
  Badge,
  Button,
  AppBar,
  AppBarTitle,
  IconButton,
  List,
  ListItem,
  SectionTitle,
} from '@/components/ui';

export default function Parametres() {
  const [priv, setPriv] = useState(false);
  const [spoil, setSpoil] = useState(true);
  const [push, setPush] = useState(true);
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/profil" />
        <AppBarTitle>Paramètres</AppBarTitle>
      </AppBar>
      <main className="flex flex-1 flex-col gap-2.5 px-4 pt-1 pb-6">
        <SectionTitle>Apparence</SectionTitle>
        <ThemeSwitch />
        <List>
          <ListItem icon="translate" chevron className="min-h-[52px]">
            <span className="flex-1 text-body-sm font-extrabold">Langue</span>
            <span className="text-body-sm text-ink-muted">Français</span>
          </ListItem>
        </List>
        <SectionTitle className="mt-1.5">Compte et sécurité</SectionTitle>
        <List>
          <ListItem href="/deux-facteurs" icon="shield-check" chevron className="min-h-[52px]">
            <span className="flex-1 text-body-sm font-extrabold">Double authentification</span>
            <Badge tone="success">Activée</Badge>
          </ListItem>
          <ListItem href="#email" icon="envelope-simple" chevron className="min-h-[52px]">
            <span className="flex-1 text-body-sm font-extrabold">Email</span>
            <span className="max-w-[130px] truncate text-body-sm text-ink-muted">
              {myProfile.email}
            </span>
          </ListItem>
        </List>
        <SectionTitle className="mt-1.5">Confidentialité</SectionTitle>
        <List>
          <ListItem icon="lock-simple" className="min-h-[52px]">
            <span className="flex-1 text-body-sm font-extrabold">Compte privé</span>
            <Toggle on={priv} onChange={setPriv} label="Compte privé" />
          </ListItem>
          <ListItem icon="eye-slash" className="min-h-[52px]">
            <span className="flex-1 text-body-sm font-extrabold">Masquer les spoilers</span>
            <Toggle on={spoil} onChange={setSpoil} label="Masquer les spoilers" />
          </ListItem>
          <ListItem icon="bell" className="min-h-[52px]">
            <span className="flex-1 text-body-sm font-extrabold">Notifications push</span>
            <Toggle on={push} onChange={setPush} label="Notifications push" />
          </ListItem>
          <ListItem href="#bloques" icon="prohibit" chevron className="min-h-[52px]">
            <span className="flex-1 text-body-sm font-extrabold">Comptes bloqués</span>
            <span className="text-body-sm text-ink-muted">2</span>
          </ListItem>
        </List>
        <Button href="/" variant="secondary-danger" block icon="sign-out" className="mt-auto">
          Se déconnecter
        </Button>
      </main>
    </>
  );
}
