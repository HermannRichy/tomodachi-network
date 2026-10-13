import { View } from 'react-native';
import { members } from '@tomodachi/fixtures';
import { SegTabs } from '@/components/controls';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/layout';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Button,
  Card,
  Count,
  IconButton,
  Kami,
  List,
  ListItem,
  SectionTitle,
  T,
  Tile,
} from '@/components/ui';

export default function Notifications() {
  const { aiko, kenji, sora } = members;
  return (
    <Screen
      header={
        <AppBar>
          <IconButton icon="arrow-left" label="Retour" href="/feed" />
          <AppBarTitle>Notifications</AppBarTitle>
          <IconButton icon="gear-six" label="Réglages des notifications" href="/parametres" />
        </AppBar>
      }
      contentClassName="gap-3 pt-1"
    >
      <SegTabs tabs={['Tout', 'Mentions', 'Guild']} label="Filtrer les notifications" />
      <SectionTitle>Aujourd&apos;hui</SectionTitle>
      <Card variant="gold" tight row href="/niveau" label="Kami-sama : tu passes niveau 13">
        <Kami size={44} />
        <View className="flex-1 gap-1">
          <T variant="body-sm" weight={800}>
            Kami-sama : tu passes niveau 13 !
          </T>
          <T variant="caption" className="text-gold-ink">
            Nouveau titre débloqué · il y a 5 min
          </T>
        </View>
        <Icon name="caret-right" size={20} className="text-ink" />
      </Card>
      <List>
        <ListItem href="/publication/twist-final">
          <Avatar initial={aiko.initial} tone={aiko.tone} />
          <View className="flex-1 gap-1">
            <T variant="body-sm">
              <T variant="body-sm" weight={800}>
                {aiko.name}
              </T>{' '}
              a réagi{' '}
              <T variant="body-sm" weight={800} className="text-sakura">
                Sugoi
              </T>{' '}
              à ta critique
            </T>
            <T variant="caption" className="text-ink-muted">
              il y a 12 min
            </T>
          </View>
          <Count dot label="Non lu" />
        </ListItem>
        <ListItem>
          <Avatar initial={kenji.initial} tone={kenji.tone} />
          <View className="flex-1 items-start gap-1.5">
            <T variant="body-sm">
              <T variant="body-sm" weight={800}>
                {kenji.name}
              </T>{' '}
              t&apos;invite à une watch party ce soir à 21 h
            </T>
            <Button href="/watch-party" variant="sakura" size="sm" className="min-h-9">
              Rejoindre
            </Button>
          </View>
        </ListItem>
        <ListItem href="/publication/twist-final">
          <Avatar initial={sora.initial} tone={sora.tone} />
          <View className="flex-1 gap-1">
            <T variant="body-sm">
              <T variant="body-sm" weight={800}>
                {sora.name}
              </T>{' '}
              a répondu : « Le foreshadowing était là dès l&apos;épisode 3… »
            </T>
            <T variant="caption" className="text-ink-muted">
              il y a 1 h
            </T>
          </View>
        </ListItem>
      </List>
      <SectionTitle>Cette semaine</SectionTitle>
      <List>
        <ListItem href="/senpai">
          <Tile icon="graduation-cap" tone="primary" size={40} round />
          <View className="flex-1 gap-1">
            <T variant="body-sm">
              <T variant="body-sm" weight={800}>
                Yuna
              </T>{' '}
              est devenue ta kohai
            </T>
            <T variant="caption" className="text-ink-muted">
              Lun.
            </T>
          </View>
        </ListItem>
        <ListItem href="/guerre-guilds">
          <Tile icon="sword" tone="sakura" size={40} round />
          <View className="flex-1 gap-1">
            <T variant="body-sm">
              La guerre contre{' '}
              <T variant="body-sm" weight={800}>
                Kitsune Clan
              </T>{' '}
              a commencé
            </T>
            <T variant="caption" className="text-ink-muted">
              Dim.
            </T>
          </View>
        </ListItem>
      </List>
    </Screen>
  );
}
