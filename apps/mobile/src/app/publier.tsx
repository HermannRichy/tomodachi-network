import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { me } from '@tomodachi/fixtures';
import { Toggle } from '@/components/controls';
import { Icon } from '@/components/icon';
import { BottomBar, Screen } from '@/components/layout';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Button,
  Card,
  Chip,
  IconButton,
  Note,
  Poster,
  T,
} from '@/components/ui';

const MAX = 500;

// Nouvelle publication (maquette Composer)
export default function Publier() {
  const [text, setText] = useState(
    "Ma théorie sur le mentor : tout était annoncé dès l'épisode 3. Je vous explique en image.",
  );
  const [spoiler, setSpoiler] = useState(true);
  const [episode, setEpisode] = useState(12);
  const [image, setImage] = useState(true);
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="x" label="Fermer" href="/feed" />
          <AppBarTitle>Nouvelle publication</AppBarTitle>
          <Button href="/feed" size="sm">
            Publier
          </Button>
        </AppBar>
      }
      footer={
        <BottomBar className="justify-between pt-2">
          <View className="flex-row gap-1">
            <IconButton
              icon="image"
              label="Ajouter une image"
              iconClassName="text-primary"
              onPress={() => setImage(true)}
            />
            <IconButton icon="gif" label="Ajouter un GIF" iconClassName="text-primary" />
            <IconButton icon="hash" label="Ajouter un hashtag" iconClassName="text-primary" />
            <IconButton
              icon="sliders-horizontal"
              label="Ajouter un sondage"
              iconClassName="text-primary"
            />
          </View>
          <T variant="label" className="text-ink-muted tabular-nums">
            {text.length} / {MAX}
          </T>
        </BottomBar>
      }
      contentClassName="pt-1.5"
    >
      <View className="flex-row items-center gap-2.5">
        <Avatar initial={me.initial} tone={me.tone} />
        <View className="gap-1">
          <T weight={800}>{me.name}</T>
          <Chip icon="globe" small onPress={() => {}} className="min-h-8 self-start px-2.5">
            Public
          </Chip>
        </View>
      </View>
      <TextInput
        multiline
        maxLength={MAX}
        value={text}
        onChangeText={setText}
        accessibilityLabel="Texte de la publication"
        className="min-h-[104px] font-nunito text-title-3 text-ink"
        textAlignVertical="top"
      />
      {image && (
        <Poster tone={5} free className="h-40">
          <View className="flex-row items-center gap-1.5">
            <Icon name="image" size={18} className="text-on-media" />
            <T variant="label" weight={900} className="text-on-media">
              theorie-mentor.png
            </T>
          </View>
          <View className="absolute right-1.5 top-1.5">
            <IconButton
              icon="x"
              size={18}
              label="Retirer l'image"
              onPress={() => setImage(false)}
              className="h-9 w-9 rounded-pill bg-scrim/50"
              iconClassName="text-on-media"
            />
          </View>
        </Poster>
      )}
      <View className="flex-row flex-wrap gap-2">
        <Chip variant="on" icon="television" small>
          Lames du crépuscule
        </Chip>
        <Chip icon="plus" small onPress={() => {}}>
          Tag
        </Chip>
      </View>
      <Card tight>
        <View className="flex-row items-center gap-2.5">
          <Icon name="eye-slash" className="text-sakura" />
          <View className="flex-1 gap-1">
            <T variant="body-sm" weight={800}>
              Contient un spoiler
            </T>
            <T variant="caption" className="text-ink-muted">
              Masqué pour ceux qui n&apos;y sont pas encore
            </T>
          </View>
          <Toggle on={spoiler} onChange={setSpoiler} label="Contient un spoiler" />
        </View>
        {spoiler && (
          <View className="flex-row items-center gap-2">
            <T variant="body-sm" className="flex-1 text-ink-muted">
              Jusqu&apos;à l&apos;épisode
            </T>
            <Chip small onPress={() => setEpisode((e) => Math.max(1, e - 1))} label="Diminuer">
              −
            </Chip>
            <T variant="title-3" className="min-w-8 text-center tabular-nums">
              {episode}
            </T>
            <Chip small onPress={() => setEpisode((e) => e + 1)} label="Augmenter">
              +
            </Chip>
          </View>
        )}
      </Card>
      <Note tone="gold" icon="lightning" className="py-2">
        +10 EXP · compte pour le défi de l&apos;arc
      </Note>
    </Screen>
  );
}
