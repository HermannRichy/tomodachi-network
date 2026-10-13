import type { Metadata } from 'next';
import Link from 'next/link';
import { conversations } from '@tomodachi/fixtures';
import { Icon } from '@/components/icon';
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
  Tile,
  cx,
} from '@/components/ui';

export const metadata: Metadata = { title: 'Messages' };

export default function Messages() {
  return (
    <>
      <AppBar className="pl-4">
        <h1 className="flex-1 text-title-1">Messages</h1>
        <IconButton icon="users-three" label="Trouver des nakama" href="/affinites" />
        <IconButton icon="pencil-simple" label="Nouveau message" />
      </AppBar>
      <main className="flex flex-1 flex-col gap-3 px-4 pt-1 pb-6">
        <Input
          sunken
          icon="magnifying-glass"
          type="search"
          placeholder="Chercher un nakama"
          aria-label="Chercher une conversation"
        />
        <Card variant="gold" tight row>
          <Kami size={56} />
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <b className="text-body-sm font-extrabold">Kami-sama</b>
              <Badge tone="official">Officiel</Badge>
            </div>
            <p className="text-body-sm">
              L&apos;arc de l&apos;Automne des Yokai a commencé. Relève les défis pour ton titre !
            </p>
          </div>
        </Card>
        <List>
          {conversations.map((c) => (
            <Link
              key={c.id}
              href={c.href === 'conversation' ? `/conversation/${c.id}` : `/${c.href}`}
              className="flex min-h-14 items-center gap-3 px-3.5 py-2.5 text-ink transition-colors hover:bg-ink/5"
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
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="flex items-center justify-between">
                  <b className="text-body font-extrabold">{c.title}</b>
                  <span
                    className={cx(
                      'text-caption',
                      c.unread ? 'font-extrabold text-primary' : 'text-ink-muted',
                    )}
                  >
                    {c.time}
                  </span>
                </span>
                <span
                  className={cx(
                    'flex items-center gap-1 truncate text-body-sm',
                    c.unread ? 'font-extrabold' : 'text-ink-muted',
                  )}
                >
                  {c.call && (
                    <Icon name={c.call === 'voice' ? 'phone' : 'video-camera'} size={16} />
                  )}
                  <span className="truncate">{c.preview}</span>
                </span>
              </span>
              {c.unread && <Count label={`${c.unread} non lus`}>{c.unread}</Count>}
            </Link>
          ))}
        </List>
      </main>
    </>
  );
}
