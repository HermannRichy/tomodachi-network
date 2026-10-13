import { useState } from 'react';
import { View } from 'react-native';
import { me, members } from '@tomodachi/fixtures';
import { useStopwatch } from '@/components/controls';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import { StatusBarOn } from '@/components/status';
import { AppBar, Avatar, Button, IconButton, T } from '@/components/ui';

export default function AppelVideo() {
  const [camOff, setCamOff] = useState(false);
  const [muted, setMuted] = useState(false);
  const time = useStopwatch(767);
  const h = members.hana;
  return (
    <Screen bg="bg-media-video" scroll={false} contentClassName="p-0">
      <StatusBarOn surface="media" />
      <View
        className="absolute inset-0 items-center justify-center gap-3"
        accessibilityLabel={`Vidéo de ${h.name}`}
      >
        <Avatar initial={h.initial} tone={h.tone} size="call" />
        <T variant="caption" className="text-on-media-muted">
          [Flux vidéo de {h.name}]
        </T>
      </View>
      <AppBar className="pt-2">
        <IconButton
          icon="caret-left"
          label="Réduire l'appel"
          href="/conversation/aiko"
          className="rounded-pill bg-scrim/30"
          iconClassName="text-on-media"
        />
        <View className="flex-1 px-2">
          <T weight={800} className="text-on-media">
            {h.name}
          </T>
          <T variant="caption" className="text-on-media-muted tabular-nums">
            {time}
          </T>
        </View>
      </AppBar>
      <View className="absolute right-4 top-[120px] h-[150px] w-[104px] items-center justify-center gap-1.5 rounded-lg border-[3px] border-on-media bg-poster-1">
        {camOff ? (
          <>
            <Icon name="video-camera-slash" size={28} className="text-on-media" />
            <T variant="caption" className="text-center text-on-media-muted">
              Caméra coupée
            </T>
          </>
        ) : (
          <>
            <Avatar initial={me.initial} tone={me.tone} size="m" />
            <T variant="caption" className="text-on-media-muted">
              Toi
            </T>
          </>
        )}
      </View>
      <View className="flex-1" />
      <View className="mx-4 mb-12 flex-row justify-center gap-4 rounded-xl bg-scrim/40 p-3.5">
        <Button
          variant={muted ? 'secondary' : 'glass'}
          size="round"
          icon={muted ? 'microphone-slash' : 'microphone'}
          label="Couper le micro"
          onPress={() => setMuted(!muted)}
        />
        <Button
          variant={camOff ? 'secondary' : 'glass'}
          size="round"
          icon={camOff ? 'video-camera-slash' : 'video-camera'}
          label="Couper la caméra"
          onPress={() => setCamOff(!camOff)}
        />
        <Button variant="glass" size="round" icon="camera-rotate" label="Retourner la caméra" />
        <Button variant="hang" size="round" icon="phone-x" label="Raccrocher" href="/messages" />
      </View>
    </Screen>
  );
}
