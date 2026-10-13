'use client';
import { useState } from 'react';
import { members } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Badge,
  Bar,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  SectionTitle,
  buttonClass,
} from '@/components/ui';

export default function Senpai() {
  const [proposed, setProposed] = useState(false);
  const { sora, yuna, mika, taro } = members;
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/profil" />
        <AppBarTitle>Senpai et kohai</AppBarTitle>
      </AppBar>
      <main className="flex flex-1 flex-col gap-3.5 px-4 pt-1 pb-6">
        <div className="flex items-center gap-3 rounded-lg bg-primary-soft p-3.5 text-primary-ink">
          <Icon name="graduation-cap" size={32} />
          <p className="text-body-sm font-extrabold">
            Guide les nouveaux nakama. Quand ton kohai monte de niveau, vous gagnez tous les deux de
            l&apos;EXP.
          </p>
        </div>
        <section className="flex flex-col gap-2">
          <SectionTitle>Ton senpai</SectionTitle>
          <Card tight row href={`/membre/${sora.username}`}>
            <Avatar initial={sora.initial} tone={sora.tone} size="m" />
            <span className="flex flex-1 flex-col gap-1">
              <b className="text-body font-extrabold">{sora.name}</b>
              <span className="text-caption text-ink-muted">
                Niv. {sora.level} · ton senpai depuis mars
              </span>
            </span>
            <span className={buttonClass({ variant: 'secondary', size: 'sm' })} aria-hidden>
              <Icon name="chat-circle-dots" size={18} />
            </span>
          </Card>
        </section>
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <SectionTitle>Tes kohai</SectionTitle>
            <span className="text-caption text-ink-muted tabular-nums">2 / 3 places</span>
          </div>
          <Card tight>
            <div className="flex items-center gap-2.5">
              <Avatar initial={yuna.initial} tone={yuna.tone} />
              <span className="flex flex-1 flex-col gap-1">
                <b className="text-body-sm font-extrabold">{yuna.name}</b>
                <span className="text-caption text-ink-muted tabular-nums">
                  Niv. {yuna.level} · objectif niveau 10
                </span>
              </span>
              <Badge>+40 EXP</Badge>
            </div>
            <Bar value={60} size="thin" label={`Progression de ${yuna.name}`} />
          </Card>
          <Card tight>
            <div className="flex items-center gap-2.5">
              <Avatar initial={mika.initial} tone={mika.tone} />
              <span className="flex flex-1 flex-col gap-1">
                <b className="text-body-sm font-extrabold">{mika.name}</b>
                <span className="text-caption text-ink-muted tabular-nums">
                  Niv. {mika.level} · a rejoint il y a 3 j
                </span>
              </span>
              <Badge tone="primary">Nouveau</Badge>
            </div>
            <Bar value={20} size="thin" label={`Progression de ${mika.name}`} />
          </Card>
        </section>
        <section className="flex flex-col gap-2">
          <SectionTitle>Nouveaux qui cherchent un senpai</SectionTitle>
          <List>
            <ListItem>
              <Avatar initial={taro.initial} tone={taro.tone} size="s" />
              <span className="flex flex-1 flex-col gap-1">
                <b className="text-body-sm font-extrabold">{taro.name}</b>
                <span className="text-caption text-ink-muted">Aime Lames du crépuscule</span>
              </span>
              <Button
                size="sm"
                variant={proposed ? 'secondary' : 'primary'}
                onClick={() => setProposed(true)}
                disabled={proposed}
              >
                {proposed ? 'Proposé' : 'Proposer'}
              </Button>
            </ListItem>
          </List>
        </section>
      </main>
    </>
  );
}
