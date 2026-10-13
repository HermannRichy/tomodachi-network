import type { Metadata } from 'next';
import { me, quiz } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { AppBar, Avatar, Button, Card, IconButton, List, ListItem } from '@/components/ui';

export const metadata: Metadata = { title: 'Résultat du quiz' };

export default function QuizResultat() {
  const o = quiz.opponent;
  return (
    <>
      <AppBar>
        <span className="flex-1" />
        <IconButton icon="x" label="Fermer" href="/guerre-guilds" />
      </AppBar>
      <main className="flex flex-1 flex-col gap-[18px] px-5 pb-10">
        <div className="flex flex-col items-center gap-2.5 text-center">
          <span className="flex size-24 items-center justify-center rounded-xl border-b-[6px] border-gold-depth bg-gold text-on-gold">
            <Icon name="trophy" size={40} />
          </span>
          <h1 className="text-title-1">Victoire !</h1>
          <p className="text-body text-ink-muted">Tu bats {o.name} du Kitsune Clan.</p>
        </div>
        <Card className="flex-row items-center justify-around">
          <div className="flex flex-col items-center gap-1">
            <Avatar initial={me.initial} tone={me.tone} size="m" />
            <b className="text-body-sm font-extrabold">Toi</b>
            <b className="text-title-1 text-primary tabular-nums">800</b>
          </div>
          <span className="text-label text-ink-muted">VS</span>
          <div className="flex flex-col items-center gap-1">
            <Avatar initial={o.initial} tone={o.tone} size="m" />
            <b className="text-body-sm font-extrabold">{o.name}</b>
            <b className="text-title-1 text-ink-muted tabular-nums">600</b>
          </div>
        </Card>
        <div className="grid grid-cols-3 gap-2">
          <Card tight className="items-center">
            <b className="text-title-3 text-success tabular-nums">8/10</b>
            <span className="text-center text-caption text-ink-muted">Bonnes réponses</span>
          </Card>
          <Card tight className="items-center">
            <b className="text-title-3 tabular-nums">4,2 s</b>
            <span className="text-center text-caption text-ink-muted">Temps moyen</span>
          </Card>
          <Card tight className="items-center">
            <b className="text-title-3 text-sakura tabular-nums">x3</b>
            <span className="text-center text-caption text-ink-muted">Meilleure série</span>
          </Card>
        </div>
        <List>
          <ListItem>
            <Icon name="lightning" className="text-gold-depth" />
            <span className="flex-1 text-body-sm font-extrabold">EXP gagnée</span>
            <b className="text-body-sm font-black text-gold-ink tabular-nums">+120</b>
          </ListItem>
          <ListItem>
            <Icon name="shield" className="text-sakura" />
            <span className="flex-1 text-body-sm font-extrabold">Points pour Sakura Ronin</span>
            <b className="text-body-sm font-black text-sakura tabular-nums">+200</b>
          </ListItem>
          <ListItem icon="target">
            <span className="flex-1 text-body-sm font-extrabold">Défi « 5 quiz gagnés »</span>
            <b className="text-body-sm font-black tabular-nums">3 / 5</b>
          </ListItem>
        </List>
        <div className="mt-auto grid grid-cols-2 gap-2.5">
          <Button href="/guerre-guilds" variant="secondary">
            Terminer
          </Button>
          <Button href="/quiz">Revanche</Button>
        </div>
      </main>
    </>
  );
}
