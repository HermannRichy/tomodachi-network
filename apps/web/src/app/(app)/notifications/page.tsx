import type { Metadata } from 'next';
import { members } from '@tomodachi/fixtures';
import { SegTabs } from '@/components/client';
import { Icon } from '@/components/icon';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Button,
  Card,
  Count,
  IconButton,
  Kami,
  List,
  ListItem,
  SectionTitle,
  Tile,
} from '@/components/ui';

export const metadata: Metadata = { title: 'Notifications' };

export default function Notifications() {
  const { aiko, kenji, sora } = members;
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/feed" className="lg:hidden" />
        <AppBarTitle>Notifications</AppBarTitle>
        <IconButton icon="gear-six" label="Réglages des notifications" href="/parametres" />
      </AppBar>
      <main className="flex flex-1 flex-col gap-3 px-4 pt-1 pb-6">
        <SegTabs tabs={['Tout', 'Mentions', 'Guild']} label="Filtrer les notifications" />
        <SectionTitle>Aujourd&apos;hui</SectionTitle>
        <Card variant="gold" tight row href="/niveau">
          <Kami size={44} />
          <span className="flex flex-1 flex-col gap-1">
            <b className="text-body-sm font-extrabold">Kami-sama : tu passes niveau 13 !</b>
            <span className="text-caption text-gold-ink">
              Nouveau titre débloqué · il y a 5 min
            </span>
          </span>
          <Icon name="caret-right" size={20} />
        </Card>
        <List>
          <ListItem href="/publication/twist-final">
            <Avatar initial={aiko.initial} tone={aiko.tone} />
            <span className="flex flex-1 flex-col gap-1">
              <span className="text-body-sm">
                <b className="font-extrabold">{aiko.name}</b> a réagi{' '}
                <b className="font-extrabold text-sakura">Sugoi</b> à ta critique
              </span>
              <span className="text-caption text-ink-muted">il y a 12 min</span>
            </span>
            <Count dot label="Non lu" />
          </ListItem>
          <ListItem>
            <Avatar initial={kenji.initial} tone={kenji.tone} />
            <span className="flex flex-1 flex-col items-start gap-1.5">
              <span className="text-body-sm">
                <b className="font-extrabold">{kenji.name}</b> t&apos;invite à une watch party ce
                soir à 21 h
              </span>
              <Button href="/watch-party" variant="sakura" size="sm" className="min-h-9">
                Rejoindre
              </Button>
            </span>
          </ListItem>
          <ListItem href="/publication/twist-final">
            <Avatar initial={sora.initial} tone={sora.tone} />
            <span className="flex flex-1 flex-col gap-1">
              <span className="text-body-sm">
                <b className="font-extrabold">{sora.name}</b> a répondu : « Le foreshadowing était
                là dès l&apos;épisode 3… »
              </span>
              <span className="text-caption text-ink-muted">il y a 1 h</span>
            </span>
          </ListItem>
        </List>
        <SectionTitle>Cette semaine</SectionTitle>
        <List>
          <ListItem href="/senpai">
            <Tile icon="graduation-cap" tone="primary" size={40} round />
            <span className="flex flex-1 flex-col gap-1">
              <span className="text-body-sm">
                <b className="font-extrabold">Yuna</b> est devenue ta kohai
              </span>
              <span className="text-caption text-ink-muted">Lun.</span>
            </span>
          </ListItem>
          <ListItem href="/guerre-guilds">
            <Tile icon="sword" tone="sakura" size={40} round />
            <span className="flex flex-1 flex-col gap-1">
              <span className="text-body-sm">
                La guerre contre <b className="font-extrabold">Kitsune Clan</b> a commencé
              </span>
              <span className="text-caption text-ink-muted">Dim.</span>
            </span>
          </ListItem>
        </List>
      </main>
    </>
  );
}
