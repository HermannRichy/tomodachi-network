import type { Metadata } from 'next';
import { Icon } from '@/components/icon';
import { Button, Card, Kami, List, ListItem, cx } from '@/components/ui';

export const metadata: Metadata = { title: 'Avertissement de Kami-sama' };

export default function Avertissement() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-5 pt-5 pb-10">
      <div className="flex flex-col items-center gap-2.5 text-center">
        <div className="relative">
          <Kami size={140} alt="Kami-sama" />
          <span className="absolute top-[34px] -right-1.5 flex size-10 items-center justify-center rounded-pill border-[3px] border-background bg-danger text-on-danger">
            <Icon name="warning" size={20} />
          </span>
        </div>
        <p className="text-label tracking-[0.08em] text-danger">AVERTISSEMENT</p>
        <h1 className="text-title-1">Kami-sama a parlé</h1>
        <div className="flex items-center gap-1.5" role="img" aria-label="Avertissement 1 sur 3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cx('h-2 w-7 rounded-pill', i === 0 ? 'bg-danger' : 'bg-surface-sunken')}
            />
          ))}
          <span className="ml-1 text-caption text-ink-muted">1 sur 3</span>
        </div>
      </div>
      <Card variant="danger">
        <b className="text-body font-extrabold">Publication retirée</b>
        <p className="text-body-sm">
          Ta publication du 12 octobre contenait un spoiler de l&apos;épisode 12 sans être signalée
          comme telle.
        </p>
      </Card>
      <List>
        <ListItem icon="hourglass">
          <span className="flex-1 text-body-sm">
            <b className="font-extrabold">Pendant 24 h</b>, tes publications passent en relecture
            avant d&apos;être visibles.
          </span>
        </ListItem>
        <ListItem icon="eye-slash">
          <span className="flex-1 text-body-sm">
            Pense à activer <b className="font-extrabold">Contient un spoiler</b> quand tu publies.
          </span>
        </ListItem>
        <ListItem icon="info">
          <span className="flex-1 text-body-sm">
            Au 3<sup>e</sup> avertissement, le compte est suspendu 7 jours.
          </span>
        </ListItem>
      </List>
      <div className="mt-auto flex flex-col gap-2 pt-4">
        <Button href="/feed" block>
          J&apos;ai compris
        </Button>
        <Button href="#contester" variant="ghost" className="self-center">
          Contester la décision
        </Button>
      </div>
    </main>
  );
}
