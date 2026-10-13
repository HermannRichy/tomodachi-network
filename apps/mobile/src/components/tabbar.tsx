// Barre d'onglets du design system : 4 onglets et le bouton Publier au centre.
import { Link, type Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, type IconName } from './icon';
import { T, cx } from './ui';

type BottomTabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const tabs: Record<string, { label: string; icon: IconName }> = {
  feed: { label: 'Accueil', icon: 'house' },
  messages: { label: 'Messages', icon: 'chat-circle-dots' },
  guild: { label: 'Guild', icon: 'shield' },
  profil: { label: 'Profil', icon: 'user' },
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const items = state.routes.map((route, index) => {
    const tab = tabs[route.name];
    if (!tab) return null;
    const on = state.index === index;
    return (
      <Pressable
        key={route.key}
        accessibilityRole="tab"
        accessibilityState={{ selected: on }}
        accessibilityLabel={tab.label}
        onPress={() => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!on && !event.defaultPrevented) navigation.navigate(route.name);
        }}
        className={cx(
          'min-h-[52px] min-w-[62px] items-center justify-center gap-0.5 rounded-md',
          on && 'bg-primary-soft',
        )}
      >
        <Icon name={tab.icon} fill={on} className={on ? 'text-primary-ink' : 'text-ink-muted'} />
        <T variant="caption" weight={800} className={on ? 'text-primary-ink' : 'text-ink-muted'}>
          {tab.label}
        </T>
      </Pressable>
    );
  });
  return (
    <View
      accessibilityRole="tablist"
      className="flex-row items-center justify-around border-t-2 border-border bg-surface px-2.5 pt-2"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      {items.slice(0, 2)}
      <Link href="/publier" asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Publier"
          className="h-[52px] w-14 items-center justify-center rounded-lg border-b-4 border-primary-depth bg-primary active:translate-y-1 active:border-b-0"
        >
          <Icon name="plus" size={26} className="text-on-primary" />
        </Pressable>
      </Link>
      {items.slice(2)}
    </View>
  );
}
