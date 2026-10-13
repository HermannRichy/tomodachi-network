import { View } from 'react-native';
import { Icon } from '@/components/icon';
import { Bottom, Screen } from '@/components/layout';
import { Button, Card, Kami, List, ListItem, T, cx } from '@/components/ui';

export default function Avertissement() {
  return (
    <Screen contentClassName="gap-4 px-5 pt-5">
      <View className="items-center gap-2.5">
        <View>
          <Kami size={140} label="Kami-sama" />
          <View className="absolute -right-1.5 top-[34px] h-10 w-10 items-center justify-center rounded-pill border-[3px] border-background bg-danger">
            <Icon name="warning" size={20} className="text-on-danger" />
          </View>
        </View>
        <T variant="label" className="tracking-[1px] text-danger">
          AVERTISSEMENT
        </T>
        <T variant="title-1" accessibilityRole="header">
          Kami-sama a parlé
        </T>
        <View className="flex-row items-center gap-1.5" accessibilityLabel="Avertissement 1 sur 3">
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              className={cx('h-2 w-7 rounded-pill', i === 0 ? 'bg-danger' : 'bg-surface-sunken')}
            />
          ))}
          <T variant="caption" className="ml-1 text-ink-muted">
            1 sur 3
          </T>
        </View>
      </View>
      <Card variant="danger">
        <T weight={800} className="text-danger-ink">
          Publication retirée
        </T>
        <T variant="body-sm" className="text-danger-ink">
          Ta publication du 12 octobre contenait un spoiler de l&apos;épisode 12 sans être signalée
          comme telle.
        </T>
      </Card>
      <List>
        <ListItem icon="hourglass">
          <T variant="body-sm" className="flex-1">
            <T variant="body-sm" weight={800}>
              Pendant 24 h
            </T>
            , tes publications passent en relecture avant d&apos;être visibles.
          </T>
        </ListItem>
        <ListItem icon="eye-slash">
          <T variant="body-sm" className="flex-1">
            Pense à activer{' '}
            <T variant="body-sm" weight={800}>
              Contient un spoiler
            </T>{' '}
            quand tu publies.
          </T>
        </ListItem>
        <ListItem icon="info">
          <T variant="body-sm" className="flex-1">
            Au 3e avertissement, le compte est suspendu 7 jours.
          </T>
        </ListItem>
      </List>
      <Bottom>
        <Button href="/feed" block>
          J&apos;ai compris
        </Button>
        <Button variant="ghost" className="self-center">
          Contester la décision
        </Button>
      </Bottom>
    </Screen>
  );
}
