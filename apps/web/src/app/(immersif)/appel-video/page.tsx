'use client';
import { useState } from 'react';
import { me, members } from '@tomodachi/fixtures';
import { Stopwatch } from '@/components/client';
import { Icon } from '@/components/icon';
import { Avatar, Button, IconButton } from '@/components/ui';

export default function AppelVideo() {
  const [camOff, setCamOff] = useState(false);
  const [muted, setMuted] = useState(false);
  const h = members.hana;
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-media-video text-on-media">
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3"
        aria-label={`Vidéo de ${h.name}`}
        role="img"
      >
        <Avatar initial={h.initial} tone={h.tone} size="call" />
        <span className="text-caption text-on-media-muted">[Flux vidéo de {h.name}]</span>
      </div>
      <header className="relative z-10 flex min-h-[52px] items-center gap-1 px-2 pt-2">
        <IconButton
          icon="caret-left"
          label="Réduire l'appel"
          href="/conversation/aiko"
          className="rounded-pill bg-scrim/30"
        />
        <span className="flex flex-1 flex-col px-2">
          <b className="text-body font-extrabold">{h.name}</b>
          <span className="text-caption text-on-media-muted tabular-nums">
            <Stopwatch from={767} />
          </span>
        </span>
      </header>
      <div className="absolute top-[120px] right-4 z-10 flex h-[150px] w-[104px] flex-col items-center justify-center gap-1.5 rounded-lg border-[3px] border-on-media bg-poster-1">
        {camOff ? (
          <>
            <Icon name="video-camera-slash" size={28} />
            <span className="text-caption text-on-media-muted">Caméra coupée</span>
          </>
        ) : (
          <>
            <Avatar initial={me.initial} tone={me.tone} size="m" />
            <span className="text-caption text-on-media-muted">Toi</span>
          </>
        )}
      </div>
      <div className="flex-1" />
      <div className="relative z-10 mx-auto mb-12 flex w-[calc(100%-32px)] max-w-md justify-center gap-4 rounded-xl bg-scrim/40 p-3.5">
        <Button
          variant={muted ? 'secondary' : 'glass'}
          size="round"
          icon={muted ? 'microphone-slash' : 'microphone'}
          aria-pressed={muted}
          aria-label="Couper le micro"
          onClick={() => setMuted(!muted)}
        />
        <Button
          variant={camOff ? 'secondary' : 'glass'}
          size="round"
          icon={camOff ? 'video-camera-slash' : 'video-camera'}
          aria-pressed={camOff}
          aria-label="Couper la caméra"
          onClick={() => setCamOff(!camOff)}
        />
        <Button
          variant="glass"
          size="round"
          icon="camera-rotate"
          aria-label="Retourner la caméra"
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
  );
}
