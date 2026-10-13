'use client';
// Navigation principale : barre latérale sur ordinateur, barre d'onglets en bas sur mobile.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, type IconName } from './icon';
import { buttonClass, cx, Kami } from './ui';

const tabs: { href: string; label: string; icon: IconName; match: string[] }[] = [
  {
    href: '/feed',
    label: 'Accueil',
    icon: 'house',
    match: ['/feed', '/explorer', '/notifications', '/publication', '/membre'],
  },
  {
    href: '/messages',
    label: 'Messages',
    icon: 'chat-circle-dots',
    match: ['/messages', '/conversation'],
  },
  {
    href: '/guild',
    label: 'Guild',
    icon: 'shield',
    match: ['/guild', '/guilds', '/guerre-guilds'],
  },
  {
    href: '/profil',
    label: 'Profil',
    icon: 'user',
    match: [
      '/profil',
      '/watchlist',
      '/cartes',
      '/boutique',
      '/parametres',
      '/senpai',
      '/modifier-profil',
    ],
  },
];

const side: { href: string; label: string; icon: IconName }[] = [
  { href: '/feed', label: 'Accueil', icon: 'house' },
  { href: '/explorer', label: 'Explorer', icon: 'magnifying-glass' },
  { href: '/notifications', label: 'Notifications', icon: 'bell' },
  { href: '/messages', label: 'Messages', icon: 'chat-circle-dots' },
  { href: '/guild', label: 'Guild', icon: 'shield' },
  { href: '/arc', label: 'Arc de saison', icon: 'ghost' },
  { href: '/profil', label: 'Profil', icon: 'user' },
];

const isOn = (path: string, match: string[]) =>
  match.some((m) => path === m || path.startsWith(`${m}/`));

/** Écrans qui affichent la barre d'onglets en bas sur mobile (comme dans les maquettes). */
const withTabBar = [
  '/feed',
  '/explorer',
  '/notifications',
  '/membre',
  '/profil',
  '/watchlist',
  '/cartes',
  '/boutique',
  '/guild',
  '/guilds',
  '/messages',
];

export function SideNav() {
  const path = usePathname();
  return (
    <nav
      aria-label="Navigation principale"
      className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col gap-1 border-r-2 border-border px-3 py-5 lg:flex"
    >
      <Link href="/feed" className="mb-4 flex items-center gap-2 px-2">
        <Kami size={40} />
        <span className="text-title-1 font-black text-primary">Tomodachi</span>
      </Link>
      {side.map((s) => {
        const on = path === s.href || path.startsWith(`${s.href}/`);
        return (
          <Link
            key={s.href}
            href={s.href}
            aria-current={on ? 'page' : undefined}
            className={cx(
              'flex min-h-12 items-center gap-3 rounded-md px-3 text-body font-extrabold transition-colors',
              on
                ? 'bg-primary-soft text-primary-ink'
                : 'text-ink-muted hover:bg-ink/5 hover:text-ink',
            )}
          >
            <Icon name={s.icon} fill={on} />
            {s.label}
          </Link>
        );
      })}
      <Link href="/publier" className={buttonClass({ block: true, className: 'mt-4' })}>
        <Icon name="plus" size={20} />
        Publier
      </Link>
    </nav>
  );
}

export function TabBar() {
  const path = usePathname();
  if (!isOn(path, withTabBar)) return null;
  return (
    <nav
      aria-label="Navigation principale"
      className="sticky bottom-0 z-20 flex items-center justify-around border-t-2 border-border bg-surface px-2.5 pt-2 pb-[max(env(safe-area-inset-bottom),12px)] lg:hidden"
    >
      {tabs.slice(0, 2).map((t) => (
        <Tab key={t.href} {...t} on={isOn(path, t.match)} />
      ))}
      <Link
        href="/publier"
        aria-label="Publier"
        className="flex h-[52px] w-14 items-center justify-center rounded-lg border-b-4 border-primary-depth bg-primary text-on-primary transition-transform active:translate-y-1 active:border-b-0"
      >
        <Icon name="plus" size={26} />
      </Link>
      {tabs.slice(2).map((t) => (
        <Tab key={t.href} {...t} on={isOn(path, t.match)} />
      ))}
    </nav>
  );
}

function Tab({
  href,
  label,
  icon,
  on,
}: {
  href: string;
  label: string;
  icon: IconName;
  on: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={on ? 'page' : undefined}
      className={cx(
        'flex min-h-[52px] min-w-[62px] flex-col items-center justify-center gap-0.5 rounded-md text-caption font-extrabold',
        on ? 'bg-primary-soft text-primary-ink' : 'text-ink-muted',
      )}
    >
      <Icon name={icon} fill={on} />
      {label}
    </Link>
  );
}
