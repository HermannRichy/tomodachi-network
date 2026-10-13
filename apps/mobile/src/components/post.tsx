// Carte de publication du feed : spoiler masqué selon la progression, réaction Sugoi.
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { className as playerClassName, fr, type Post } from '@tomodachi/fixtures';
import { Icon } from './icon';
import { Animate, Burst, haptic } from './motion';
import { Avatar, Badge, Button, Chip, IconButton, T, cardClass, cx } from './ui';

export function SugoiButton({ count, initial = false }: { count: number; initial?: boolean }) {
  const [on, setOn] = useState(initial);
  const [bursts, setBursts] = useState(0);
  const n = count + (on && !initial ? 1 : 0) - (!on && initial ? 1 : 0);
  const ink = on ? 'text-on-sakura' : 'text-sakura-ink';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      accessibilityLabel={`Sugoi, ${n} réactions`}
      onPress={() => {
        if (!on) {
          setBursts((b) => b + 1);
          haptic('tap');
        }
        setOn(!on);
      }}
      className={cx(
        'min-h-10 flex-row items-center gap-1.5 rounded-pill border-2 px-3.5 active:scale-95',
        on ? 'border-sakura bg-sakura' : 'border-sakura-soft bg-sakura-soft',
      )}
    >
      <View>
        {bursts > 0 && on ? (
          <Animate name="pop" trigger={bursts}>
            <Icon name="fire" size={18} fill className={ink} />
          </Animate>
        ) : (
          <Icon name="fire" size={18} fill={on} className={ink} />
        )}
        {bursts > 0 && on && <Burst key={bursts} />}
      </View>
      <T variant="body-sm" weight={800} className={cx(ink, 'tabular-nums')}>
        {`Sugoi ${fr(n)}`}
      </T>
    </Pressable>
  );
}

export function SpoilerBlock({ spoiler }: { spoiler: NonNullable<Post['spoiler']> }) {
  const [shown, setShown] = useState(false);
  if (shown) {
    return (
      <Animated.View entering={FadeIn.duration(360)}>
        <View className="rounded-md bg-sakura-soft p-3">
          <T variant="body-sm" className="text-sakura-ink">
            {spoiler.hidden}
          </T>
        </View>
      </Animated.View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint="Révèle le spoiler"
      onPress={() => setShown(true)}
      className="min-h-[84px] items-center justify-center gap-1 rounded-md border-2 border-dashed border-border-depth bg-surface-sunken"
    >
      <View className="flex-row items-center gap-1.5">
        <Icon name="eye-slash" size={20} className="text-ink" />
        <T variant="body-sm" weight={800}>
          {spoiler.label}
        </T>
      </View>
      <T variant="caption" className="text-ink-muted">
        {spoiler.progress} · Toucher pour révéler
      </T>
    </Pressable>
  );
}

export function PostCard({
  post,
  interactive = true,
  index = 0,
}: {
  post: Post;
  interactive?: boolean;
  /** Position dans la liste : les cartes apparaissent l'une après l'autre. */
  index?: number;
}) {
  const a = post.author;
  return (
    <Animated.View
      entering={interactive ? FadeInDown.delay(80 + index * 70).duration(320) : undefined}
    >
      <View className={cardClass()}>
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
              {!post.watchParty && (
                <Badge>
                  Niv. {a.level} · {playerClassName(a.playerClass)}
                </Badge>
              )}
            </View>
            <T variant="caption" className="text-ink-muted">
              {post.ago} · {post.context}
            </T>
          </View>
          {!post.watchParty && interactive && (
            <IconButton
              icon="dots-three"
              label="Plus d'options"
              href="/signaler"
              iconClassName="text-ink-muted"
            />
          )}
        </View>
        <T>{post.text}</T>
        {post.spoiler && interactive && <SpoilerBlock spoiler={post.spoiler} />}
        {post.watchParty ? (
          <Button href="/watch-party" variant="sakura" block icon="popcorn">
            Rejoindre la watch party
          </Button>
        ) : (
          interactive && (
            <View className="flex-row gap-2">
              <SugoiButton count={post.sugoi} />
              <Chip
                href={`/publication/${post.id}`}
                icon="chat-circle"
                label={`${post.comments} commentaires`}
              >
                {post.comments}
              </Chip>
              <Chip icon="repeat" onPress={() => {}} label={`Repartager, ${post.reposts} partages`}>
                {post.reposts}
              </Chip>
            </View>
          )
        )}
      </View>
    </Animated.View>
  );
}
