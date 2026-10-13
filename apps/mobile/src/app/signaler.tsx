import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { members, reportReasons } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Button, Grid, IconButton, Kami, T, Touch, cardClass, cx } from '@/components/ui';

// Signaler un contenu : feuille modale par-dessus l'écran précédent.
export default function Signaler() {
  const [picked, setPicked] = useState('spoiler');
  const [sent, setSent] = useState(false);
  const insets = useSafeAreaInsets();
  const close = () => (router.canGoBack() ? router.back() : router.replace('/feed'));
  return (
    <View className="flex-1 justify-end bg-scrim/50">
      <Pressable className="flex-1" accessibilityLabel="Fermer" onPress={close} />
      <View
        accessibilityViewIsModal
        className="gap-3 rounded-t-xl bg-surface px-4 pt-2.5"
        style={{ paddingBottom: Math.max(insets.bottom, 34) }}
      >
        <View className="h-[5px] w-10 self-center rounded-pill bg-border-depth" />
        {!sent ? (
          <>
            <View className="flex-row items-center justify-between">
              <T variant="title-3" accessibilityRole="header">
                Signaler cette publication
              </T>
              <IconButton icon="x" label="Fermer" onPress={close} />
            </View>
            <T variant="body-sm" className="text-ink-muted">
              Ton signalement reste anonyme. Choisis la raison :
            </T>
            <View
              accessibilityRole="radiogroup"
              accessibilityLabel="Raison du signalement"
              className="gap-2"
            >
              {reportReasons.map((r) => {
                const on = picked === r.id;
                return (
                  <Touch
                    key={r.id}
                    role="radio"
                    selected={on}
                    onPress={() => setPicked(r.id)}
                    className={cardClass(
                      on ? 'selected' : 'default',
                      false,
                      'flex-row items-center gap-3 border-b-2 px-3 py-2.5',
                    )}
                  >
                    <Icon name={r.icon} size={20} className="text-ink" />
                    <T variant="body-sm" weight={800} className="flex-1">
                      {r.label}
                    </T>
                    <View
                      className={cx(
                        'h-[22px] w-[22px] items-center justify-center rounded-pill border-2',
                        on ? 'border-primary' : 'border-border-depth',
                      )}
                    >
                      {on && <View className="h-2.5 w-2.5 rounded-pill bg-primary" />}
                    </View>
                  </Touch>
                );
              })}
            </View>
            <Button block onPress={() => setSent(true)}>
              Envoyer le signalement
            </Button>
            <Grid cols={2} gap="gap-2.5">
              <Button variant="secondary" size="sm" icon="eye-slash" block>
                Masquer
              </Button>
              <Button variant="secondary-danger" size="sm" icon="prohibit" block>
                {`Bloquer ${members.aiko.name}`}
              </Button>
            </Grid>
          </>
        ) : (
          <View className="items-center gap-2.5 py-3" accessibilityLiveRegion="polite">
            <Kami size={110} label="Kami-sama" />
            <T variant="title-2">Merci, nakama</T>
            <T variant="body-sm" className="text-center text-ink-muted">
              Kami-sama examine ce contenu. Tu seras prévenu de la décision.
            </T>
            <Button block onPress={() => router.replace('/feed')}>
              Retour au feed
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}
