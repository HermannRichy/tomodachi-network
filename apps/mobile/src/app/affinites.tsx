import { useState } from 'react';
import { View } from 'react-native';
import { affinityPeople } from '@tomodachi/fixtures';
import { Screen } from '@/components/layout';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Badge,
  Button,
  Grid,
  IconButton,
  Poster,
  SectionTitle,
  T,
  cardClass,
} from '@/components/ui';

export default function Affinites() {
  const [i, setI] = useState(0);
  const p = affinityPeople[i % affinityPeople.length]!;
  const next = () => setI(i + 1);
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/explorer" />
          <AppBarTitle>Trouver des nakama</AppBarTitle>
          <IconButton icon="sliders-horizontal" label="Filtres" />
        </AppBar>
      }
      contentClassName="px-5 pt-1"
    >
      <T variant="body-sm" className="text-center text-ink-muted">
        Des fans qui partagent tes animes. Amitié uniquement.
      </T>
      <View className="flex-1">
        <View
          className={cardClass(
            'default',
            false,
            'absolute -bottom-2.5 left-3 right-3 top-3.5 opacity-60',
          )}
          importantForAccessibility="no-hide-descendants"
        />
        <View
          className={cardClass('default', false, 'flex-1 items-center gap-3 px-4 py-5')}
          accessibilityLiveRegion="polite"
        >
          <Badge tone="official" icon="sparkle" large>
            {`${p.match} d'affinité`}
          </Badge>
          <Avatar initial={p.member.initial} tone={p.member.tone} size="xl" />
          <View className="items-center gap-1">
            <T variant="title-2" accessibilityRole="header">
              {p.member.name}
            </T>
            <T variant="body-sm" className="text-ink-muted">
              {p.meta}
            </T>
          </View>
          <T variant="body-sm" className="text-center">
            {p.bio}
          </T>
          <View className="w-full gap-2">
            <SectionTitle className="text-center">En commun</SectionTitle>
            <Grid cols={3}>
              {p.animes.map((a) => (
                <Poster key={a.id} tone={a.tone} title={a.title} square />
              ))}
            </Grid>
          </View>
          <View className="mt-auto flex-row items-center justify-center gap-6 pt-2">
            <Button variant="secondary" size="round" icon="x" label="Passer" onPress={next} />
            <Button size="round-lg" icon="hand-waving" label="Dire bonjour" onPress={next} />
            <Button
              variant="secondary"
              size="round"
              icon="chat-circle-dots"
              label="Envoyer un message"
              href="/conversation/aiko"
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}
