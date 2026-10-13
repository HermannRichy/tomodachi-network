import type { Metadata } from 'next';
import { members, myGuild as g, guildWar as w, fr } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Avatar, AvatarStack, Badge, Bar, Card, IconButton, SectionTitle } from '@/components/ui';

export const metadata: Metadata = { title: 'Ma guild' };

export default function Guild() {
  const { aiko, kenji, yuna, sora } = members;
  return (
    <>
      <header className="shrink-0 rounded-b-xl border-b-[6px] border-sakura-depth bg-sakura text-on-sakura lg:mt-4 lg:rounded-xl">
        <div className="flex min-h-11 items-center px-2">
          <IconButton
            icon="magnifying-glass"
            label="Découvrir d'autres guilds"
            href="/guilds"
            className="hover:bg-on-sakura/10"
          />
          <span className="flex-1" />
          <IconButton
            icon="chat-circle-dots"
            label="Salon de guild"
            href="/conversation/sakura-ronin"
            className="hover:bg-on-sakura/10"
          />
          <IconButton
            icon="gear-six"
            label="Réglages de la guild"
            className="hover:bg-on-sakura/10"
          />
        </div>
        <div className="flex items-center gap-3.5 px-5 pb-5">
          <span className="flex size-[72px] shrink-0 items-center justify-center rounded-xl border-b-4 border-sakura-soft bg-surface text-sakura">
            <Icon name="shield" fill size={40} />
          </span>
          <span className="flex flex-col gap-1">
            <h1 className="text-title-1">{g.name}</h1>
            <span className="text-body-sm opacity-90">
              Rang #{g.rank} · {g.members} membres · {g.online} en ligne
            </span>
            <Badge tone="on-sakura" className="self-start">
              Tu es {g.myRole}
            </Badge>
          </span>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-3.5 px-4 pt-4 pb-6">
        <Card href="/guerre-guilds">
          <div className="flex items-center justify-between">
            <span className="text-title-3">Guerre de guilds</span>
            <Badge tone="sakura">{w.endsIn}</Badge>
          </div>
          <div className="flex flex-col gap-1">
            <span className="flex justify-between text-body-sm font-extrabold tabular-nums">
              <span>{w.us.name}</span>
              <span>{fr(w.us.score)}</span>
            </span>
            <Bar value={62} variant="war" label={`Score ${w.us.name}`} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="flex justify-between text-body-sm tabular-nums">
              <span>{w.them.name}</span>
              <span>{fr(w.them.score)}</span>
            </span>
            <Bar value={50} label={`Score ${w.them.name}`} />
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-2.5">
          <Card tight row href="/quiz">
            <Icon name="question" className="text-primary" />
            <b className="flex-1 text-body-sm font-extrabold">Quiz battle</b>
          </Card>
          <Card tight row href="/arc">
            <Icon name="target" className="text-sakura" />
            <b className="flex-1 text-body-sm font-extrabold">Défis de l&apos;arc</b>
          </Card>
          <Card tight row href="/watch-party">
            <Icon name="popcorn" className="text-gold-depth" />
            <b className="flex-1 text-body-sm font-extrabold">Watch party</b>
          </Card>
          <Card tight row href="/live">
            <Icon name="broadcast" className="text-success" />
            <b className="flex-1 text-body-sm font-extrabold">Live</b>
            <Badge tone="live">1</Badge>
          </Card>
        </div>
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <SectionTitle>En ligne</SectionTitle>
            <AvatarStack>
              {[aiko, kenji, yuna, sora].map((m) => (
                <Avatar key={m.username} initial={m.initial} tone={m.tone} size="s" online />
              ))}
              <Avatar initial="+8" tone={5} size="s" />
            </AvatarStack>
          </div>
          <Card tight href="/conversation/sakura-ronin">
            <div className="flex items-start gap-2">
              <Avatar initial={yuna.initial} tone={yuna.tone} size="xs" />
              <p className="text-body-sm">
                <b className="font-extrabold">{yuna.name}</b> On se fait le quiz ce soir pour
                reprendre 200 points ?
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Avatar initial={sora.initial} tone={sora.tone} size="xs" />
              <p className="text-body-sm">
                <b className="font-extrabold">{sora.name}</b> Je suis là à 20 h, préparez-vous.
              </p>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
}
