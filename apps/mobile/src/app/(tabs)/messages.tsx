import { View } from 'react-native';
import { conversations } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import {
  AppBar,
  Avatar,
  Badge,
  Card,
  Count,
  IconButton,
  Input,
  Kami,
  List,
  ListItem,
  T,
  Tile,
} from '@/components/ui';

export default function Messages() {
  return (
    <Screen
      bottomInset={false}
      header={
        <AppBar className="pl-4">
          <T variant="title-1" accessibilityRole="header" className="flex-1">
            Messages
          </T>
          <IconButton icon="users-three" label="Trouver des nakama" href="/affinites" />
          <IconButton icon="pencil-simple" label="Nouveau message" />
        </AppBar>
      }
      contentClassName="gap-3 pt-1"
    >
      <Input
        sunken
        icon="magnifying-glass"
        placeholder="Chercher un nakama"
        accessibilityLabel="Chercher une conversation"
      />
      <Card variant="gold" tight row>
        <Kami size={56} />
        <View className="flex-1 gap-1">
          <View className="flex-row items-center gap-1.5">
            <T variant="body-sm" weight={800}>
              Kami-sama
            </T>
            <Badge tone="official">Officiel</Badge>
          </View>
          <T variant="body-sm">
            L&apos;arc de l&apos;Automne des Yokai a commencé. Relève les défis pour ton titre !
          </T>
        </View>
      </Card>
      <List>
        {conversations.map((c) => (
          <ListItem
            key={c.id}
            href={
              c.href === 'conversation'
                ? `/conversation/${c.id}`
                : c.href === 'appel-vocal'
                  ? '/appel-vocal'
                  : '/appel-video'
            }
          >
            {c.member ? (
              <Avatar
                initial={c.member.initial}
                tone={c.member.tone}
                size="m"
                online={c.member.online && !!c.unread}
              />
            ) : (
              <Tile icon="shield" fill tone="sakura-solid" size={48} />
            )}
            <View className="flex-1 gap-1">
              <View className="flex-row items-center justify-between">
                <T weight={800}>{c.title}</T>
                <T
                  variant="caption"
                  weight={c.unread ? 800 : 700}
                  className={c.unread ? 'text-primary' : 'text-ink-muted'}
                >
                  {c.time}
                </T>
              </View>
              <View className="flex-row items-center gap-1">
                {c.call && (
                  <Icon
                    name={c.call === 'voice' ? 'phone' : 'video-camera'}
                    size={16}
                    className="text-ink-muted"
                  />
                )}
                <T
                  variant="body-sm"
                  weight={c.unread ? 800 : 600}
                  className={c.unread ? 'flex-1 text-ink' : 'flex-1 text-ink-muted'}
                  numberOfLines={1}
                >
                  {c.preview}
                </T>
              </View>
            </View>
            {c.unread ? <Count label={`${c.unread} non lus`}>{c.unread}</Count> : null}
          </ListItem>
        ))}
      </List>
    </Screen>
  );
}
