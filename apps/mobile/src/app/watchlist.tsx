import { Link } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { upNext, watchlist } from '@tomodachi/fixtures';
import { SegTabs } from '@/components/controls';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import {
  AppBar,
  AppBarTitle,
  Bar,
  Button,
  Card,
  Grid,
  IconButton,
  Poster,
  SectionHeader,
  T,
} from '@/components/ui';

export default function Watchlist() {
  const [eps, setEps] = useState(() => watchlist.map((w) => w.episode));
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/profil" />
          <AppBarTitle>Mon visionnage</AppBarTitle>
          <IconButton icon="plus" label="Ajouter un anime" href="/explorer" />
        </AppBar>
      }
      contentClassName="pt-1"
    >
      <SegTabs tabs={['En cours · 3', 'Terminés · 148', 'À voir · 12']} label="Listes" />
      <Card variant="primary" tight row>
        <Icon name="film-strip" size={32} className="text-on-primary" />
        <View className="flex-1 gap-1">
          <T weight={800} className="text-on-primary">
            Cette semaine
          </T>
          <T variant="body-sm" className="text-on-primary opacity-90 tabular-nums">
            9 épisodes · 3 h 36 · +90 EXP
          </T>
        </View>
      </Card>
      <View className="gap-2.5">
        {watchlist.map((w, i) => {
          const ep = eps[i]!;
          return (
            <Card key={w.anime.id} tight row>
              <Poster
                tone={w.anime.tone}
                href={`/anime/${w.anime.id}`}
                label={w.anime.title}
                className="w-[60px] p-0"
              />
              <View className="flex-1 gap-1.5">
                <Link
                  href={`/anime/${w.anime.id}`}
                  accessibilityRole="link"
                  className="font-nunito-extrabold text-body text-ink"
                >
                  {w.anime.title}
                </Link>
                <T variant="caption" className="text-ink-muted tabular-nums">
                  Épisode {ep} / {w.anime.episodes} · {w.next}
                </T>
                <Bar
                  value={(ep / w.anime.episodes) * 100}
                  variant="watch"
                  size="thin"
                  label={`Progression ${w.anime.title}`}
                />
              </View>
              <Button
                variant="secondary"
                size="sm"
                className="px-3"
                label="Marquer l'épisode suivant comme vu"
                disabled={ep >= w.anime.episodes}
                onPress={() =>
                  setEps((e) => e.map((v, j) => (j === i ? Math.min(w.anime.episodes, v + 1) : v)))
                }
              >
                +1
              </Button>
            </Card>
          );
        })}
      </View>
      <View className="gap-2">
        <SectionHeader title="À voir ensuite" href="/explorer" />
        <Grid cols={3}>
          {upNext.map((a) => (
            <Poster key={a.id} tone={a.tone} title={a.title} href={`/anime/${a.id}`} />
          ))}
        </Grid>
      </View>
    </Screen>
  );
}
