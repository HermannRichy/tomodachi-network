import { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { chat, conversations } from '@tomodachi/fixtures';
import { Bubble } from '@/components/bubble';
import { Icon } from '@/components/icon';
import { BottomBar, Screen } from '@/components/layout';
import { useTokens } from '@/components/theme';
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Chip,
  IconButton,
  T,
  Touch,
  cardClass,
} from '@/components/ui';

// Les maquettes détaillent la conversation avec Aïko : les autres reprennent ce fil.
// Export web statique : une page par élément connu.
export function generateStaticParams() {
  return conversations.filter((c) => c.href === 'conversation').map((c) => ({ id: c.id }));
}

export default function Conversation() {
  const w = chat.with;
  const tokens = useTokens();
  const [draft, setDraft] = useState('');
  const [sent, setSent] = useState<string[]>([]);
  const push = (t: string) => {
    if (!t.trim()) return;
    setSent((s) => [...s, t.trim()]);
    setDraft('');
  };
  return (
    <Screen
      scroll={false}
      header={
        <AppBar className="border-b-2 border-border pb-2">
          <IconButton icon="arrow-left" label="Retour" href="/messages" />
          <Touch
            href={`/membre/${w.username}`}
            role="link"
            label={`Profil de ${w.name}`}
            className="flex-1 flex-row items-center gap-2.5"
          >
            <Avatar initial={w.initial} tone={w.tone} online />
            <View>
              <T weight={800}>{w.name}</T>
              <T variant="caption" className="text-success">
                En ligne
              </T>
            </View>
          </Touch>
          <IconButton icon="phone" label="Appel vocal" href="/appel-vocal" />
          <IconButton icon="video-camera" label="Appel vidéo" href="/appel-video" />
        </AppBar>
      }
      footer={
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2 px-4 pb-2"
          >
            {chat.quickReplies.map((q) => (
              <Chip key={q} variant="react" small onPress={() => push(q)}>
                {q}
              </Chip>
            ))}
          </ScrollView>
          <BottomBar>
            <IconButton
              icon="plus-circle"
              label="Joindre un fichier"
              iconClassName="text-primary"
            />
            <View className="min-h-11 flex-1 flex-row items-center gap-2.5 rounded-md bg-surface-sunken px-3.5">
              <TextInput
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={() => push(draft)}
                placeholder={`Écrire à ${w.name}`}
                accessibilityLabel="Message"
                placeholderTextColor={tokens.inkMuted}
                returnKeyType="send"
                className="flex-1 py-0 font-nunito text-body text-ink"
              />
              <Icon name="smiley" size={20} className="text-ink-muted" />
            </View>
            <Button
              size="icon-sm"
              icon="paper-plane-right"
              label="Envoyer"
              onPress={() => push(draft)}
            />
          </BottomBar>
        </View>
      }
      contentClassName="p-0"
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="grow justify-end gap-2.5 px-4 py-3.5"
      >
        <View className="self-center rounded-pill bg-surface-sunken px-3 py-1">
          <T variant="caption" weight={800} className="text-ink-muted">
            Aujourd&apos;hui
          </T>
        </View>
        {chat.messages.map((m, i) =>
          'shared' in m && m.shared ? (
            <Bubble key={i} className="p-2">
              <Touch
                href={`/publication/${m.shared.postId}`}
                role="link"
                className={cardClass('default', true, 'gap-1.5')}
              >
                <View className="flex-row items-center gap-1.5">
                  <Avatar initial={w.initial} tone={w.tone} size="xs" />
                  <T variant="caption" weight={800}>
                    {w.name}
                  </T>
                </View>
                <T variant="body-sm">{m.shared.text}</T>
                <Badge tone="sakura" icon="eye-slash" className="self-start">
                  Spoiler masqué
                </Badge>
              </Touch>
            </Bubble>
          ) : (
            <Bubble key={i} me={m.from === 'me'}>
              {'text' in m ? (m.text ?? '') : ''}
            </Bubble>
          ),
        )}
        {sent.map((t, i) => (
          <Bubble key={`s${i}`} me>
            {t}
          </Bubble>
        ))}
        <T variant="caption" className="self-end text-ink-muted">
          {chat.seen}
        </T>
      </ScrollView>
    </Screen>
  );
}
