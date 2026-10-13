import { useLocalSearchParams } from 'expo-router';
import { TextInput, View } from 'react-native';
import {
  comments,
  className as playerClassName,
  me,
  post as getPost,
  type Comment,
  posts,
} from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { BottomBar, Screen } from '@/components/layout';
import { SugoiButton } from '@/components/post';
import { useTokens } from '@/components/theme';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Badge,
  Button,
  Chip,
  Divider,
  IconButton,
  T,
  Touch,
  cx,
} from '@/components/ui';

function CommentItem({ c, small }: { c: Comment; small?: boolean }) {
  return (
    <View className={cx('flex-row items-start gap-2.5', small && 'pt-1.5')}>
      <Avatar initial={c.author.initial} tone={c.author.tone} size={small ? 'xs' : 's'} />
      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-1.5">
          <T variant="body-sm" weight={800}>
            {c.author.name}
          </T>
          {c.badge && <Badge tone="primary">{c.badge}</Badge>}
          <T variant="caption" className="text-ink-muted">
            {c.ago}
          </T>
        </View>
        <T variant="body-sm">{c.text}</T>
        {c.sugoi !== undefined && (
          <View className="flex-row gap-4">
            <Touch
              role="button"
              selected={!!c.reacted}
              label={`Sugoi, ${c.sugoi}`}
              className="min-h-8 flex-row items-center gap-1"
            >
              <Icon
                name="fire"
                size={16}
                fill={c.reacted}
                className={c.reacted ? 'text-sakura' : 'text-ink-muted'}
              />
              <T
                variant="caption"
                weight={800}
                className={c.reacted ? 'text-sakura' : 'text-ink-muted'}
              >
                {c.sugoi}
              </T>
            </Touch>
            <Touch role="button" className="min-h-8 justify-center">
              <T variant="caption" weight={800} className="text-ink-muted">
                Répondre
              </T>
            </Touch>
          </View>
        )}
        {c.replies?.map((r) => (
          <CommentItem key={r.text} c={r} small />
        ))}
      </View>
    </View>
  );
}

// Export web statique : une page par élément connu.
export function generateStaticParams() {
  return posts.map((p) => ({ id: p.id }));
}

export default function Publication() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const post = getPost(id);
  const a = post.author;
  const tokens = useTokens();
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/feed" />
          <AppBarTitle>Publication</AppBarTitle>
          <IconButton icon="dots-three" label="Plus d'options" href="/signaler" />
        </AppBar>
      }
      footer={
        <BottomBar>
          <Avatar initial={me.initial} tone={me.tone} size="s" />
          <View className="min-h-11 flex-1 flex-row items-center gap-2.5 rounded-md bg-surface-sunken px-3.5">
            <TextInput
              placeholder="Écrire un commentaire"
              accessibilityLabel="Écrire un commentaire"
              placeholderTextColor={tokens.inkMuted}
              className="flex-1 py-0 font-nunito text-body text-ink"
            />
            <Icon name="gif" size={20} className="text-ink-muted" />
          </View>
          <Button size="icon-sm" icon="paper-plane-right" label="Envoyer" />
        </BottomBar>
      }
      contentClassName="pt-1"
    >
      <View className="gap-2.5">
        <View className="flex-row items-center gap-2.5">
          <Avatar
            initial={a.initial}
            tone={a.tone}
            href={`/membre/${a.username}`}
            label={`Profil de ${a.name}`}
          />
          <View className="flex-1 gap-1">
            <View className="flex-row items-center gap-1.5">
              <T weight={800}>{a.name}</T>
              <Badge>
                Niv. {a.level} · {playerClassName(a.playerClass)}
              </Badge>
            </View>
            <T variant="caption" className="text-ink-muted">
              {post.ago} · {post.context}
              {post.spoiler ? ' · ép. 12' : ''}
            </T>
          </View>
          <Button variant="secondary" size="sm">
            Suivre
          </Button>
        </View>
        <T>{post.text}</T>
        <View className="flex-row flex-wrap gap-2">
          <Badge tone="primary" icon="hash">
            LamesDuCrépuscule
          </Badge>
          {post.spoiler && (
            <Badge tone="sakura" icon="eye-slash">
              Spoiler ép. 12
            </Badge>
          )}
        </View>
        <View className="flex-row gap-2">
          <SugoiButton count={post.sugoi + 1} initial />
          <Chip icon="bookmark-simple" onPress={() => {}} label="Enregistrer" />
          <Chip icon="share-network" onPress={() => {}} label="Partager" />
        </View>
      </View>
      <Divider />
      <View className="flex-row items-center justify-between">
        <T variant="title-3">{post.comments} commentaires</T>
        <Chip icon="sliders-horizontal" small onPress={() => {}}>
          Populaires
        </Chip>
      </View>
      <View className="gap-4">
        {comments.map((c) => (
          <CommentItem key={c.text} c={c} />
        ))}
      </View>
    </Screen>
  );
}
