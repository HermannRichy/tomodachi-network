'use client';
import { useState } from 'react';
import { members } from '@tomodachi/fixtures';
import { Stopwatch } from '@/components/client';
import { Icon } from '@/components/icon';
import { Avatar, Badge, Button, IconButton } from '@/components/ui';

export default function AppelVocal() {
  const [muted, setMuted] = useState(false);
  const k = members.kenji;
  return (
    <div className="flex flex-1 flex-col bg-primary text-on-primary">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <header className="flex min-h-[52px] items-center gap-1 px-2">
          <IconButton
            icon="caret-left"
            label="Réduire l'appel"
            href="/conversation/aiko"
            className="hover:bg-on-primary/10"
          />
          <h1 className="flex flex-1 items-center justify-center gap-1 text-body font-black">
            <Icon name="lock-simple" size={16} />
            Appel chiffré
          </h1>
          <span className="size-11" aria-hidden />
        </header>
        <main className="flex flex-1 flex-col items-center justify-center gap-3.5 text-center">
          <div className="flex size-[220px] items-center justify-center rounded-pill bg-on-primary/10">
            <div className="flex size-[172px] items-center justify-center rounded-pill bg-on-primary/15">
              <Avatar initial={k.initial} tone={k.tone} size="xxl" />
            </div>
          </div>
          <h2 className="text-title-1">{k.name}</h2>
          <p className="text-title-3 tabular-nums opacity-85">
            <Stopwatch from={252} />
          </p>
          <Badge tone="glass" icon="shield" className="text-on-primary">
            Sakura Ronin
          </Badge>
        </main>
        <div className="flex justify-center gap-[18px] px-6 pb-14">
          <Button
            variant={muted ? 'secondary' : 'glass'}
            size="round"
            icon={muted ? 'microphone-slash' : 'microphone'}
            aria-pressed={muted}
            aria-label="Couper le micro"
            onClick={() => setMuted(!muted)}
          />
          <Button variant="glass" size="round" icon="speaker-high" aria-label="Haut-parleur" />
          <Button
            variant="glass"
            size="round"
            icon="video-camera"
            aria-label="Passer en vidéo"
            href="/appel-video"
          />
          <Button
            variant="hang"
            size="round"
            icon="phone-x"
            aria-label="Raccrocher"
            href="/messages"
          />
        </div>
      </div>
    </div>
  );
}
