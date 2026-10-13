import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { fr, liveChat, members } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import { StatusBarOn } from '@/components/status';
import { useTokens } from '@/components/theme';
import { Avatar, Badge, Button, IconButton, T, Touch } from '@/components/ui';

const nameTone = {
  1: 'text-avatar-1',
  2: 'text-avatar-2',
  3: 'text-avatar-3',
  4: 'text-avatar-4',
  5: 'text-avatar-5',
  6: 'text-avatar-6',
} as const;

export default function Live() {
  const [likes, setLikes] = useState(1204);
  const tokens = useTokens();
  const s = members.sora;
  return (
    <Screen bg="bg-media-live" scroll={false} contentClassName="p-0">
      <StatusBarOn surface="media" />
      <View
        className="absolute inset-0 items-center justify-center gap-2.5"
        accessibilityLabel={`Live de ${s.name}`}
      >
        <Icon name="palette" size={40} className="text-on-media-muted" />
        <T variant="caption" className="text-on-media-muted">
          [Flux live · {s.name} dessine en direct]
        </T>
      </View>
      <View className="flex-row items-center gap-2 px-4 pt-3">
        <Touch
          href={`/membre/${s.username}`}
          role="link"
          label={`Profil de ${s.name}`}
          className="flex-row items-center gap-2 rounded-pill bg-scrim/40 py-1 pl-1 pr-3"
        >
          <Avatar initial={s.initial} tone={s.tone} size="s" />
          <View>
            <T variant="body-sm" weight={800} className="text-on-media">
              {s.name}
            </T>
            <T variant="caption" className="text-on-media-muted">
              Fan art live
            </T>
          </View>
        </Touch>
        <Badge tone="hang">EN DIRECT</Badge>
        <Badge tone="dark" icon="eye">
          312
        </Badge>
        <View className="flex-1" />
        <IconButton
          icon="x"
          label="Quitter le live"
          href="/guild"
          className="rounded-pill bg-scrim/40"
          iconClassName="text-on-media"
        />
      </View>
      <View className="flex-1" />
      <View className="max-w-[280px] gap-2 px-4" accessibilityLiveRegion="polite">
        {liveChat.map((m) => (
          <View key={m.text} className="self-start rounded-md bg-scrim/40 px-3 py-1.5">
            <T variant="body-sm" className="text-on-media">
              <T variant="body-sm" weight={800} className={nameTone[m.tone]}>
                {m.name}
              </T>{' '}
              {m.text}
            </T>
          </View>
        ))}
      </View>
      <View className="flex-row items-center gap-2 px-4 pb-11 pt-3">
        <View className="min-h-[46px] flex-1 flex-row items-center rounded-md border-2 border-on-media/25 bg-scrim/40 px-3.5">
          <TextInput
            placeholder="Commenter"
            accessibilityLabel="Commenter le live"
            placeholderTextColor={tokens.onMediaMuted}
            className="flex-1 py-0 font-nunito text-body text-on-media"
          />
        </View>
        <Button variant="gold" size="round-sm" icon="gift" label="Offrir des pièces" />
        <Button
          variant="sakura"
          size="round-sm"
          icon="heart"
          iconFill
          label={`Envoyer un cœur, ${fr(likes)}`}
          onPress={() => setLikes(likes + 1)}
        />
      </View>
    </Screen>
  );
}
