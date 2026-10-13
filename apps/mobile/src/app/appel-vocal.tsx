import { useState } from 'react';
import { View } from 'react-native';
import { members } from '@tomodachi/fixtures';
import { useStopwatch } from '@/components/controls';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import { StatusBarOn } from '@/components/status';
import { AppBar, Avatar, Badge, Button, IconButton, T } from '@/components/ui';

export default function AppelVocal() {
  const [muted, setMuted] = useState(false);
  const time = useStopwatch(252);
  const k = members.kenji;
  return (
    <Screen
      bg="bg-primary"
      scroll={false}
      header={
        <AppBar>
          <IconButton
            icon="caret-left"
            label="Réduire l'appel"
            href="/conversation/aiko"
            iconClassName="text-on-primary"
          />
          <View className="flex-1 flex-row items-center justify-center gap-1">
            <Icon name="lock-simple" size={16} className="text-on-primary" />
            <T weight={900} className="text-on-primary">
              Appel chiffré
            </T>
          </View>
          <View className="h-11 w-11" />
        </AppBar>
      }
      contentClassName="px-6 pb-14"
    >
      <StatusBarOn surface="brand" />
      <View className="flex-1 items-center justify-center gap-3.5">
        <View className="h-[220px] w-[220px] items-center justify-center rounded-pill bg-on-primary/10">
          <View className="h-[172px] w-[172px] items-center justify-center rounded-pill bg-on-primary/15">
            <Avatar initial={k.initial} tone={k.tone} size="xxl" />
          </View>
        </View>
        <T variant="title-1" accessibilityRole="header" className="text-on-primary">
          {k.name}
        </T>
        <T variant="title-3" className="text-on-primary opacity-85 tabular-nums">
          {time}
        </T>
        <Badge tone="glass" icon="shield" textClassName="text-on-primary">
          Sakura Ronin
        </Badge>
      </View>
      <View className="flex-row justify-center gap-[18px]">
        <Button
          variant={muted ? 'secondary' : 'glass'}
          size="round"
          icon={muted ? 'microphone-slash' : 'microphone'}
          accessibilityState={{ selected: muted }}
          label="Couper le micro"
          onPress={() => setMuted(!muted)}
        />
        <Button variant="glass" size="round" icon="speaker-high" label="Haut-parleur" />
        <Button
          variant="glass"
          size="round"
          icon="video-camera"
          label="Passer en vidéo"
          href="/appel-video"
        />
        <Button variant="hang" size="round" icon="phone-x" label="Raccrocher" href="/messages" />
      </View>
    </Screen>
  );
}
