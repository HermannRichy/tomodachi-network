import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { members, watchPartyChat } from '@tomodachi/fixtures';
import { Bubble } from '@/components/bubble';
import { Icon } from '@/components/icon';
import { Floaters, haptic, useFloaters } from '@/components/motion';
import { BottomBar, Screen } from '@/components/layout';
import { useTokens } from '@/components/theme';
import {
  AppBar,
  Avatar,
  AvatarStack,
  Badge,
  Bar,
  Button,
  Chip,
  IconButton,
  T,
} from '@/components/ui';

function ReactionChip({ label, onReact }: { label: string; onReact: () => void }) {
  const floaters = useFloaters();
  return (
    <View className="flex-1">
      <Floaters items={floaters.items}>
        <T variant="label" className="text-sakura">
          +1
        </T>
      </Floaters>
      <Chip
        variant="react"
        onPress={() => {
          onReact();
          floaters.push();
          haptic('tap');
        }}
        className="justify-center active:scale-95"
      >
        {label}
      </Chip>
    </View>
  );
}

export default function WatchParty() {
  const [playing, setPlaying] = useState(false);
  const [counts, setCounts] = useState({ sugoi: 42, kawaii: 18, nani: 27 });
  const tokens = useTokens();
  const reactions = [
    { k: 'sugoi', label: 'Sugoi' },
    { k: 'kawaii', label: 'Kawaii' },
    { k: 'nani', label: 'Nani ?!' },
  ] as const;
  const { aiko, yuna } = members;
  return (
    <Screen
      header={
        <>
          <AppBar>
            <IconButton icon="arrow-left" label="Retour" href="/feed" />
            <View className="flex-1 px-1">
              <T variant="title-3" weight={900} accessibilityRole="header">
                Watch party
              </T>
              <T variant="caption" className="text-ink-muted">
                Lames du crépuscule · ép. 9
              </T>
            </View>
            <View className="mr-2">
              <AvatarStack>
                <Avatar initial={aiko.initial} tone={aiko.tone} size="xs" />
                <Avatar initial={yuna.initial} tone={yuna.tone} size="xs" />
                <Avatar initial="+10" tone={4} size="xs" />
              </AvatarStack>
            </View>
          </AppBar>
          <View className="gap-2 px-4">
            <View className="h-[200px] items-center justify-center rounded-lg border-b-4 border-media-depth bg-media">
              <View className="absolute left-3 top-3">
                <Badge tone="live" icon="broadcast">
                  Synchronisé · 12 nakama
                </Badge>
              </View>
              <Button
                variant="white"
                size="round"
                icon={playing ? 'pause' : 'play'}
                iconFill
                label={playing ? 'Pause' : 'Lecture'}
                onPress={() => setPlaying(!playing)}
              />
              <T variant="caption" className="absolute bottom-3 right-3 text-on-media-muted">
                [Flux vidéo]
              </T>
            </View>
            <View className="flex-row items-center gap-2.5">
              <T variant="caption" className="text-ink-muted tabular-nums">
                08:42
              </T>
              <Bar value={36} size="thin" className="flex-1" label="Position dans l'épisode" />
              <T variant="caption" className="text-ink-muted tabular-nums">
                24:00
              </T>
            </View>
          </View>
        </>
      }
      footer={
        <View>
          <View className="flex-row gap-2 px-4 pb-2">
            {reactions.map((r) => (
              <ReactionChip
                key={r.k}
                label={`${r.label} ${counts[r.k]}`}
                onReact={() => setCounts((c) => ({ ...c, [r.k]: c[r.k] + 1 }))}
              />
            ))}
          </View>
          <BottomBar>
            <View className="min-h-11 flex-1 flex-row items-center gap-2.5 rounded-md bg-surface-sunken px-3.5">
              <TextInput
                placeholder="Écrire aux nakama"
                accessibilityLabel="Écrire dans le chat"
                placeholderTextColor={tokens.inkMuted}
                className="flex-1 py-0 font-nunito text-body text-ink"
              />
              <Icon name="smiley" size={20} className="text-ink-muted" />
            </View>
            <Button size="icon-sm" icon="paper-plane-right" label="Envoyer" />
          </BottomBar>
        </View>
      }
      contentClassName="justify-end gap-2.5 py-2.5"
    >
      {watchPartyChat.map((m) => (
        <View key={m.text} className="flex-row items-start gap-2">
          <Avatar initial={m.member.initial} tone={m.member.tone} size="xs" />
          <Bubble className="px-3 py-2">
            <T
              variant="caption"
              weight={800}
              className={m.nameTone === 'sakura' ? 'text-sakura' : 'text-primary'}
            >
              {m.member.name}
            </T>
            <T variant="body-sm">{m.text}</T>
          </Bubble>
        </View>
      ))}
      <Bubble me>Prêt, popcorn en main</Bubble>
      <View className="self-center rounded-pill bg-gold-soft px-3 py-1">
        <T variant="caption" weight={800} className="text-gold-ink">
          Aïko a rejoint la watch party
        </T>
      </View>
    </Screen>
  );
}
