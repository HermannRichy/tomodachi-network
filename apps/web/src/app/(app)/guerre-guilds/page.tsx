import type { Metadata } from 'next';
import { fr, guildWar as w } from '@tomodachi/fixtures';
import { Icon, type IconName } from '@/components/icon';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Badge,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  SectionTitle,
  cx,
} from '@/components/ui';

export const metadata: Metadata = { title: 'Guerre de guilds' };

const trialIcons: Record<string, IconName> = {
  question: 'question',
  pencil: 'pencil-simple',
  target: 'target',
};

export default function GuerreGuilds() {
  const total = w.us.score + w.them.score;
  return (
    <>
      <AppBar>
        <IconButton icon="arrow-left" label="Retour" href="/guild" />
        <AppBarTitle>Guerre de guilds</AppBarTitle>
        <Badge tone="sakura" icon="timer" className="mr-2">
          {w.timer}
        </Badge>
      </AppBar>
      <main className="flex flex-1 flex-col gap-3.5 px-4 pt-1 pb-6">
        <Card className="gap-3.5">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center gap-1.5">
              <span className="flex size-16 items-center justify-center rounded-lg border-b-4 border-sakura-depth bg-sakura text-on-sakura">
                <Icon name="shield" fill size={32} />
              </span>
              <b className="text-body-sm font-extrabold">{w.us.name}</b>
              <b className="text-title-1 text-sakura tabular-nums">{fr(w.us.score)}</b>
            </div>
            <span className="flex size-11 items-center justify-center rounded-pill bg-surface-sunken text-ink-muted">
              <Icon name="sword" />
            </span>
            <div className="flex flex-col items-center gap-1.5">
              <span className="flex size-16 items-center justify-center rounded-lg border-b-4 border-primary-depth bg-poster-1 text-on-media">
                <Icon name="shield" fill size={32} />
              </span>
              <b className="text-body-sm font-extrabold">{w.them.name}</b>
              <b className="text-title-1 text-ink-muted tabular-nums">{fr(w.them.score)}</b>
            </div>
          </div>
          <div
            className="flex h-3.5 overflow-hidden rounded-pill"
            role="img"
            aria-label={`${w.us.name} ${fr(w.us.score)} points, ${w.them.name} ${fr(w.them.score)} points`}
          >
            <span
              className="h-full bg-sakura"
              style={{ width: `${(w.us.score / total) * 100}%` }}
            />
            <span className="h-full flex-1 bg-primary" />
          </div>
          <p className="text-center text-body-sm font-extrabold text-sakura">
            Vous menez de {w.us.score - w.them.score} points
          </p>
        </Card>
        <section className="flex flex-col gap-2">
          <SectionTitle>Épreuves</SectionTitle>
          <List>
            {w.trials.map((t) => (
              <ListItem key={t.label} icon={trialIcons[t.icon]}>
                <span className="flex-1 text-body-sm font-extrabold">{t.label}</span>
                <span className="text-body-sm tabular-nums">
                  <b className="font-black text-sakura">{t.us}</b>{' '}
                  <span className="text-ink-muted">· {t.them}</span>
                </span>
              </ListItem>
            ))}
          </List>
        </section>
        <section className="flex flex-col gap-2">
          <SectionTitle>Meilleurs guerriers</SectionTitle>
          <List>
            {w.warriors.map((x) => (
              <ListItem key={x.rank} className={cx(x.isMe && 'bg-primary-soft text-primary-ink')}>
                <span
                  className={cx(
                    'w-4 font-black tabular-nums',
                    x.rank === 1
                      ? 'text-gold-depth'
                      : x.isMe
                        ? 'text-primary-ink'
                        : 'text-ink-muted',
                  )}
                >
                  {x.rank}
                </span>
                <Avatar initial={x.member.initial} tone={x.member.tone} size="s" />
                <span className="flex-1 text-body-sm font-extrabold">
                  {x.isMe ? 'Toi' : x.member.name}
                </span>
                <span className="text-body-sm font-extrabold tabular-nums">{x.points} pts</span>
              </ListItem>
            ))}
          </List>
        </section>
        <Button href="/quiz" variant="sakura" block icon="sword" className="mt-auto">
          Lancer un quiz battle
        </Button>
      </main>
    </>
  );
}
