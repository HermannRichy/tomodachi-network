import { useState } from 'react';
import { View } from 'react-native';
import { me, quiz } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
import { Bottom, Screen } from '@/components/layout';
import { AppBar, AppBarTitle, Avatar, Bar, Button, Card, IconButton, T, cx } from '@/components/ui';

export default function Quiz() {
  const [picked, setPicked] = useState<string | null>(null);
  const right = picked === quiz.good;
  const o = quiz.opponent;
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="x" label="Quitter le quiz" href="/guerre-guilds" />
          <AppBarTitle center>
            Question {quiz.index} / {quiz.total}
          </AppBarTitle>
          <View className="h-11 w-11" />
        </AppBar>
      }
      contentClassName="gap-4 px-5 pt-1"
    >
      <Card tight row className="justify-between">
        <View className="flex-row items-center gap-2">
          <Avatar initial={me.initial} tone={me.tone} size="s" />
          <View>
            <T variant="body-sm" weight={800}>
              Toi
            </T>
            <T
              variant="title-3"
              className="text-primary tabular-nums"
              accessibilityLiveRegion="polite"
            >
              {picked ? (right ? 400 : 300) : 300}
            </T>
          </View>
        </View>
        <T variant="label" className="text-ink-muted">
          VS
        </T>
        <View className="flex-row items-center gap-2">
          <View className="items-end">
            <T variant="body-sm" weight={800}>
              {o.name}
            </T>
            <T variant="title-3" className="text-sakura tabular-nums">
              200
            </T>
          </View>
          <Avatar initial={o.initial} tone={o.tone} size="s" />
        </View>
      </Card>
      <View className="gap-1.5">
        <View className="flex-row justify-between">
          <T variant="label" className="text-ink-muted">
            Temps restant
          </T>
          <T variant="label" className="text-sakura tabular-nums">
            0:08
          </T>
        </View>
        <Bar value={55} variant="war" label="Temps restant" />
      </View>
      <T variant="title-2" accessibilityRole="header" className="py-3 text-center">
        {quiz.question}
      </T>
      <View className="gap-2.5">
        {quiz.answers.map((a) => {
          const variant = !picked
            ? 'secondary'
            : a.key === quiz.good
              ? 'primary'
              : a.key === picked
                ? 'danger'
                : 'secondary';
          const ink =
            variant === 'primary'
              ? 'text-on-primary'
              : variant === 'danger'
                ? 'text-on-danger'
                : 'text-primary';
          return (
            <Button
              key={a.key}
              variant={variant}
              block
              onPress={() => !picked && setPicked(a.key)}
              accessibilityState={{ selected: picked === a.key }}
              className="justify-start gap-3"
            >
              <View className="h-8 w-8 items-center justify-center rounded-md bg-surface-sunken">
                <T weight={900}>{a.key}</T>
              </View>
              <T variant="button" className={ink}>
                {a.label}
              </T>
            </Button>
          );
        })}
      </View>
      {picked && (
        <Bottom className="pt-2">
          <View
            accessibilityLiveRegion="polite"
            className={cx(
              'flex-row items-center gap-2 rounded-md p-3',
              right ? 'bg-success-soft' : 'bg-danger-soft',
            )}
          >
            <Icon
              name={right ? 'check-circle' : 'warning'}
              className={right ? 'text-success-ink' : 'text-danger-ink'}
            />
            <T
              variant="body-sm"
              weight={800}
              className={cx('flex-1', right ? 'text-success-ink' : 'text-danger-ink')}
            >
              {right
                ? 'Bien joué ! +100 points pour ta guild'
                : 'Raté, la bonne réponse était Mecha'}
            </T>
          </View>
          <Button href="/quiz-resultat" block>
            Question suivante
          </Button>
        </Bottom>
      )}
    </Screen>
  );
}
