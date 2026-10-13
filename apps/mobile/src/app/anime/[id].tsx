import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { anime, featuredAnime as f, animes } from '@tomodachi/fixtures';
import { SegTabs } from '@/components/controls';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import { StatusBarOn } from '@/components/status';
import { Badge, Button, IconButton, List, ListItem, Note, Poster, T, Tile } from '@/components/ui';

// Export web statique : une page par élément connu.
export function generateStaticParams() {
  return animes.map((a) => ({ id: a.id }));
}

export default function FicheAnime() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = anime(id);
  const isFeatured = a.id === f.id;
  const tones = {
    1: 'bg-poster-1',
    2: 'bg-poster-2',
    3: 'bg-poster-3',
    4: 'bg-poster-4',
    5: 'bg-poster-5',
    6: 'bg-poster-6',
  } as const;
  return (
    <Screen bg={tones[a.tone]} contentClassName="bg-background px-0 pt-0">
      <StatusBarOn surface="media" />
      <Poster tone={a.tone} free className="h-[250px] justify-between rounded-none p-0">
        <View className="min-h-[52px] flex-row items-center px-2 pb-1.5 pt-0.5">
          <IconButton
            icon="arrow-left"
            label="Retour"
            href="/watchlist"
            className="rounded-pill bg-scrim/25"
            iconClassName="text-on-media"
          />
          <View className="flex-1" />
          <IconButton
            icon="share-network"
            label="Partager"
            className="rounded-pill bg-scrim/25"
            iconClassName="text-on-media"
          />
        </View>
        <View className="gap-1 px-5 pb-[18px]">
          {isFeatured && (
            <Badge tone="live" className="self-start">
              {f.nextEpisode}
            </Badge>
          )}
          <T variant="title-1" accessibilityRole="header" className="text-on-media">
            {a.title}
          </T>
          <T variant="body-sm" className="text-on-media opacity-90">
            {f.year} · {a.episodes} épisodes · {f.genres}
          </T>
        </View>
      </Poster>
      <View className="gap-3.5 px-4 pt-4">
        <View className="flex-row gap-4">
          <View className="flex-row items-center gap-1">
            <Icon name="star" fill size={18} className="text-gold-depth" />
            <T variant="body-sm" weight={900}>
              {f.rating}
            </T>
            <T variant="body-sm" className="text-ink-muted">
              / 5
            </T>
          </View>
          <T variant="body-sm" className="text-ink-muted">
            <T variant="body-sm" weight={900} className="tabular-nums">
              {f.followers}
            </T>{' '}
            nakama le suivent
          </T>
        </View>
        <View className="flex-row gap-2">
          <Button href="/watchlist" icon="check" className="flex-1">
            {`En cours · ép. ${f.currentEpisode}`}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            icon="bookmark-simple"
            iconFill
            label="Retirer de la watchlist"
          />
        </View>
        <Note tone="sakura" icon="eye-slash">
          Spoilers masqués au-delà de l&apos;épisode {f.currentEpisode}
        </Note>
        <SegTabs tabs={['Épisodes', 'Discussions', 'Fan art']} label="Contenu de l'anime" />
        <List>
          {f.episodeList.map((e) => {
            const inner = (
              <>
                {e.status === 'seen' && (
                  <Tile icon="check" tone="success-ok" size={36} round iconSize={20} />
                )}
                {e.status === 'party' && (
                  <Tile icon="popcorn" tone="sakura-solid" size={36} round />
                )}
                {e.status === 'locked' && <Tile icon="lock-simple" tone="muted" size={36} round />}
                <View className="flex-1 gap-1">
                  <T
                    variant="body-sm"
                    weight={800}
                    className={e.status === 'locked' ? 'text-ink-muted' : 'text-ink'}
                  >
                    Ép. {e.number} · {e.title}
                  </T>
                  <T
                    variant="caption"
                    weight={e.status === 'party' ? 800 : 700}
                    className={e.status === 'party' ? 'text-sakura' : 'text-ink-muted'}
                  >
                    {e.note}
                  </T>
                </View>
              </>
            );
            return e.status === 'party' ? (
              <ListItem key={e.number} href="/watch-party" chevron>
                {inner}
              </ListItem>
            ) : (
              <ListItem key={e.number}>{inner}</ListItem>
            );
          })}
        </List>
      </View>
    </Screen>
  );
}
