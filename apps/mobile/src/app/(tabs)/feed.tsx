import { View } from 'react-native';
import { posts, season } from '@tomodachi/fixtures';
import { ChipTabs } from '@/components/controls';
import { Screen } from '@/components/layout';
import { PostCard } from '@/components/post';
import { AppBar, Bar, Card, IconButton, Logo, T } from '@/components/ui';

export default function Feed() {
  return (
    <Screen
      bottomInset={false}
      header={
        <AppBar>
          <Logo className="flex-1" />
          <IconButton icon="magnifying-glass" label="Rechercher" href="/explorer" />
          <IconButton icon="bell" label="Notifications, 3 nouvelles" href="/notifications" dot />
        </AppBar>
      }
      contentClassName="gap-3 pt-1"
    >
      <Card variant="primary" tight href="/arc" label={`Arc de saison : ${season.name}`}>
        <View className="flex-row items-center justify-between">
          <T variant="label" className="tracking-[0.8px] text-on-primary opacity-85">
            ARC DE SAISON
          </T>
          <T variant="caption" className="text-on-primary opacity-85">
            {season.remaining}
          </T>
        </View>
        <T variant="title-3" className="text-on-primary">
          {season.name}
        </T>
        <Bar value={season.feedChallenge.progress} variant="exp" />
        <T variant="caption" className="text-on-primary opacity-90">
          {season.feedChallenge.label}
        </T>
      </Card>
      <ChipTabs tabs={['Pour toi', 'Nakama', 'Guilds', 'Lives']} label="Filtrer le feed" />
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </Screen>
  );
}
