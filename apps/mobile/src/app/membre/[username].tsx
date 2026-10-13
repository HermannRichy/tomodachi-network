import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { className as playerClassName, fr, memberProfile, members } from '@tomodachi/fixtures';
import { SegTabs } from '@/components/controls';
import { Screen } from '@/components/layout';
import { StatusBarOn } from '@/components/status';
import { Avatar, Badge, Button, Grid, IconButton, Note, Poster, T } from '@/components/ui';

// Export web statique : une page par élément connu.
export function generateStaticParams() {
  return Object.values(members).map((m) => ({ username: m.username }));
}

export default function ProfilMembre() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const m = Object.values(members).find((x) => x.username === username);
  // Les maquettes ne détaillent que le profil d'Aïko : les autres membres reprennent sa mise en page.
  const p = { ...memberProfile, ...m };
  const [added, setAdded] = useState(false);
  return (
    <Screen bg="bg-sakura" contentClassName="bg-background px-0 pt-0">
      <StatusBarOn surface="brand" />
      <View className="h-[150px] bg-sakura">
        <View className="min-h-11 flex-row items-center px-2">
          <IconButton
            icon="arrow-left"
            label="Retour"
            href="/feed"
            iconClassName="text-on-sakura"
          />
          <View className="flex-1" />
          <IconButton
            icon="dots-three"
            label="Plus d'options"
            href="/signaler"
            iconClassName="text-on-sakura"
          />
        </View>
      </View>
      <View className="-mt-11 gap-3 px-4">
        <View className="flex-row items-end justify-between">
          <Avatar
            initial={p.initial}
            tone={p.tone}
            size="xl"
            className="border-4 border-background"
          />
          <Badge className="mb-2">Niv. {p.level}</Badge>
        </View>
        <View className="gap-1">
          <View className="flex-row items-center gap-2">
            <T variant="title-2" accessibilityRole="header">
              {p.name}
            </T>
            <Badge tone="sakura" icon="sparkle">
              {playerClassName(p.playerClass)}
            </Badge>
          </View>
          <T variant="body-sm" className="text-ink-muted">
            @{p.username} · {p.bio}
          </T>
          <View className="flex-row gap-4">
            {[
              [fr(p.posts), 'publications'],
              [fr(p.nakama), 'nakama'],
              [p.power, 'power'],
            ].map(([v, l]) => (
              <T key={l} variant="body-sm" className="text-ink-muted">
                <T variant="body-sm" weight={900} className="tabular-nums">
                  {v}
                </T>{' '}
                {l}
              </T>
            ))}
          </View>
        </View>
        <View className="flex-row gap-2">
          <Button
            variant={added ? 'secondary' : 'primary'}
            icon={added ? 'check' : 'user-plus'}
            accessibilityState={{ selected: added }}
            onPress={() => setAdded(!added)}
            className="flex-1"
          >
            {added ? 'Nakama' : 'Ajouter en nakama'}
          </Button>
          <Button
            href="/conversation/aiko"
            variant="secondary"
            size="icon"
            icon="chat-circle-dots"
            label="Envoyer un message"
          />
        </View>
        <Note tone="primary" icon="handshake">
          {p.common}
        </Note>
        <SegTabs tabs={['Publications', 'Fan art', 'Watchlist']} label="Contenu du profil" />
        <Grid cols={3}>
          {p.gallery.map((g) => (
            <Poster
              key={g.label}
              tone={g.tone}
              title={g.label}
              square
              href="/publication/twist-final"
            />
          ))}
        </Grid>
      </View>
    </Screen>
  );
}
