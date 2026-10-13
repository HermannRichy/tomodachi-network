import { useState } from 'react';
import { View } from 'react-native';
import { myProfile as p } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Button,
  Card,
  Field,
  IconButton,
  Input,
  T,
  Touch,
  cx,
} from '@/components/ui';

const frames = [
  { id: 'lune', label: 'Lune rousse', ring: 'border-gold' },
  { id: 'sakura', label: 'Sakura', ring: 'border-sakura' },
  { id: 'indigo', label: 'Indigo', ring: 'border-primary' },
];

export default function ModifierProfil() {
  const [bio, setBio] = useState(p.bio);
  const [frame, setFrame] = useState('lune');
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="x" label="Annuler" href="/profil" />
          <AppBarTitle>Modifier le profil</AppBarTitle>
          <Button href="/profil" size="sm">
            Enregistrer
          </Button>
        </AppBar>
      }
      contentClassName="pt-1"
    >
      <View className="items-center gap-2">
        <View>
          <Avatar initial={p.initial} tone={1} size="xl" ring />
          <View className="absolute -bottom-1 -right-1.5">
            <Button size="fab" icon="camera" label="Changer la photo" />
          </View>
        </View>
        <Button variant="ghost" size="sm" icon="image">
          Changer la bannière
        </Button>
      </View>
      <Field label="Nom affiché">
        <Input defaultValue={p.name} accessibilityLabel="Nom affiché" />
      </Field>
      <Field label="Pseudo">
        <Input
          prefix="@"
          defaultValue={p.username}
          accessibilityLabel="Pseudo"
          autoCapitalize="none"
        />
      </Field>
      <Field
        label="Bio"
        hint={
          <T variant="caption" className="text-right text-ink-muted tabular-nums">
            {bio.length} / 160
          </T>
        }
      >
        <Input
          multiline
          value={bio}
          onChangeText={setBio}
          maxLength={160}
          accessibilityLabel="Bio"
          className="min-h-[96px]"
          focused
        />
      </Field>
      <Card tight row href="/classe" label="Classe : Stratège" className="min-h-14">
        <Icon name="target" className="text-primary" />
        <View className="flex-1 gap-1">
          <T variant="caption" className="text-ink-muted">
            Classe
          </T>
          <T weight={800}>Stratège</T>
        </View>
        <Icon name="caret-right" size={20} className="text-ink-muted" />
      </Card>
      <View className="gap-1.5">
        <T variant="body-sm" weight={800}>
          Cadre de profil
        </T>
        <View
          accessibilityRole="radiogroup"
          accessibilityLabel="Cadre de profil"
          className="flex-row gap-2.5"
        >
          {frames.map((f) => (
            <Touch
              key={f.id}
              role="radio"
              selected={frame === f.id}
              label={f.label}
              onPress={() => setFrame(f.id)}
              className={cx(
                'rounded-pill border-[3px] p-0.5',
                frame === f.id ? 'border-primary' : 'border-transparent',
              )}
            >
              <View className={cx('h-14 w-14 rounded-pill border-4 bg-surface', f.ring)} />
            </Touch>
          ))}
          <Touch
            href="/boutique"
            label="Plus de cadres dans la boutique"
            role="link"
            className="m-[5px] h-14 w-14 items-center justify-center rounded-pill border-2 border-dashed border-border-depth"
          >
            <Icon name="plus" className="text-ink-muted" />
          </Touch>
        </View>
      </View>
    </Screen>
  );
}
