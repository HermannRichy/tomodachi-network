// Composants du design system Tomodachi pour le web (voir docs/design-system).
// Toutes les couleurs, tailles de texte et rayons viennent des tokens : aucune valeur en dur.
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import type { Tone } from '@tomodachi/fixtures';
import { extendTailwindMerge } from 'tailwind-merge';
import { Icon, type IconName } from './icon';
import { KamiSvg } from './kami';

// Fusionne les classes : la dernière l'emporte (className passé à un composant > style par défaut).
const merge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'hero',
        'display',
        'title-1',
        'title-2',
        'title-3',
        'body',
        'body-sm',
        'button',
        'label',
        'caption',
      ],
      radius: ['pill'],
    },
  },
});
export const cx = (...c: (string | false | null | undefined)[]) =>
  merge(c.filter(Boolean).join(' '));

// Boutons à relief : bord inférieur de 4 px, le bouton descend à l'appui.

const buttonVariants = {
  primary: 'bg-primary text-on-primary border-b-4 border-primary-depth',
  sakura: 'bg-sakura text-on-sakura border-b-4 border-sakura-depth',
  gold: 'bg-gold text-on-gold border-b-4 border-gold-depth',
  danger: 'bg-danger text-on-danger border-b-4 border-danger-depth',
  secondary: 'bg-surface text-primary border-2 border-b-4 border-border border-b-border-depth',
  'secondary-danger':
    'bg-surface text-danger border-2 border-b-4 border-border border-b-border-depth',
  ghost: 'bg-transparent text-primary min-h-11 px-3 hover:bg-primary-soft',
  discord: 'bg-discord text-on-media border-b-4 border-discord-depth',
  glass: 'bg-on-media/15 text-on-media hover:bg-on-media/25',
  hang: 'bg-hang text-on-media border-b-4 border-hang-depth',
  white: 'bg-on-media text-poster-1 border-b-4 border-on-media-muted',
};
const buttonSizes = {
  md: 'min-h-[52px] px-5 rounded-lg text-button',
  sm: 'min-h-10 px-3.5 rounded-md text-body-sm font-extrabold',
  icon: 'size-[52px] rounded-lg',
  'icon-sm': 'size-11 rounded-md',
  fab: 'size-10 rounded-pill',
  round: 'size-16 rounded-pill',
  'round-sm': 'size-12 rounded-pill',
  'round-lg': 'size-[76px] rounded-pill',
};

type ButtonStyle = {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  block?: boolean;
  icon?: IconName;
  iconFill?: boolean;
  className?: string;
  children?: ReactNode;
};

export function buttonClass({ variant = 'primary', size = 'md', block, className }: ButtonStyle) {
  return cx(
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap select-none',
    'transition-transform active:translate-y-1 active:border-b-0 disabled:cursor-not-allowed disabled:opacity-60',
    buttonVariants[variant],
    buttonSizes[size],
    block && 'flex w-full',
    className,
  );
}

const iconSize = (size: ButtonStyle['size']) =>
  size === 'sm' || size === 'fab'
    ? 18
    : size === 'icon-sm'
      ? 22
      : size?.startsWith('round')
        ? size === 'round-sm'
          ? 22
          : 28
        : 20;

export function Button({
  href,
  icon,
  iconFill,
  children,
  variant,
  size,
  block,
  className,
  ...buttonProps
}: ButtonStyle & { href?: string } & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  const content = (
    <>
      {icon && <Icon name={icon} size={iconSize(size)} fill={iconFill} />}
      {children}
    </>
  );
  const cls = buttonClass({ variant, size, block, className });
  if (href && buttonProps.disabled) {
    return (
      <span aria-disabled className={cx(cls, 'pointer-events-none opacity-60')}>
        {content}
      </span>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={buttonProps['aria-label']}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" {...buttonProps} className={cls}>
      {content}
    </button>
  );
}

export function IconButton({
  icon,
  label,
  href,
  dot,
  fill,
  className,
  onClick,
  size = 24,
}: {
  icon: IconName;
  label: string;
  href?: string;
  dot?: boolean;
  fill?: boolean;
  className?: string;
  onClick?: () => void;
  size?: number;
}) {
  const cls = cx(
    'relative inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-ink/5',
    className,
  );
  const inner = (
    <>
      <Icon name={icon} size={size} fill={fill} />
      {dot && (
        <span className="absolute top-[9px] right-[9px] size-2.5">
          <span className="absolute inset-0 animate-ping-soft rounded-pill bg-sakura" />
          <span className="absolute inset-0 rounded-pill border-2 border-background bg-sakura" />
        </span>
      )}
    </>
  );
  return href ? (
    <Link href={href} aria-label={label} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" aria-label={label} className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}

// Cartes et listes

const cardVariants = {
  default: 'bg-surface text-ink border-2 border-b-4 border-border border-b-border-depth',
  primary: 'bg-primary text-on-primary border-b-[6px] border-primary-depth',
  sakura: 'bg-sakura text-on-sakura border-b-[6px] border-sakura-depth',
  gold: 'bg-gold-soft text-ink border-2 border-b-4 border-gold border-b-gold-depth',
  selected: 'bg-primary-soft text-ink border-2 border-b-4 border-primary border-b-primary-depth',
  danger: 'bg-danger-soft text-danger-ink border-2 border-b-4 border-danger-soft border-b-danger',
};

export function cardClass(
  variant: keyof typeof cardVariants = 'default',
  tight = false,
  className?: string,
) {
  return cx(
    'flex flex-col rounded-lg',
    tight ? 'gap-2 p-3' : 'gap-2.5 p-3.5',
    cardVariants[variant],
    className,
  );
}

export function Card({
  variant = 'default',
  tight,
  href,
  className,
  children,
  row,
}: {
  variant?: keyof typeof cardVariants;
  tight?: boolean;
  href?: string;
  className?: string;
  children: ReactNode;
  /** Contenu en ligne (icône, texte, chevron). */
  row?: boolean;
}) {
  const cls = cardClass(variant, tight, cx(row && 'flex-row items-center gap-3', className));
  return href ? (
    <Link href={href} className={cx(cls, 'transition-transform hover:-translate-y-0.5')}>
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}

export function List({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        'flex flex-col divide-y-2 divide-border overflow-hidden rounded-lg border-2 border-b-4 border-border border-b-border-depth bg-surface',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ListItem({
  href,
  icon,
  chevron,
  className,
  children,
  onClick,
}: {
  href?: string;
  icon?: IconName;
  chevron?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const cls = cx(
    'flex min-h-14 items-center gap-3 px-3.5 py-2.5 text-ink',
    (href || onClick) && 'transition-colors hover:bg-ink/5',
    className,
  );
  const inner = (
    <>
      {icon && <Icon name={icon} className="text-primary" />}
      {children}
      {chevron && <Icon name="caret-right" size={20} className="text-ink-muted" />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cx(cls, 'w-full cursor-pointer text-left')}
      >
        {inner}
      </button>
    );
  }
  return <div className={cls}>{inner}</div>;
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cx('text-label font-black tracking-[0.06em] text-ink-muted uppercase', className)}
    >
      {children}
    </h2>
  );
}

export function SectionHeader({
  title,
  href,
  action = 'Tout voir',
}: {
  title: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <SectionTitle>{title}</SectionTitle>
      {href && (
        <Link href={href} className="text-label text-primary hover:underline">
          {action}
        </Link>
      )}
    </div>
  );
}

// Puces, badges, compteurs

const chipVariants = {
  default: 'bg-surface border-border text-ink hover:border-border-depth',
  on: 'bg-primary border-primary text-on-primary',
  react: 'bg-sakura-soft border-sakura-soft text-sakura-ink',
  'react-on': 'bg-sakura border-sakura text-on-sakura',
};

export function chipClass(
  variant: keyof typeof chipVariants = 'default',
  small = false,
  className?: string,
) {
  return cx(
    'inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-pill border-2 px-3.5 text-body-sm font-extrabold whitespace-nowrap transition-colors',
    small ? 'min-h-9' : 'min-h-10',
    chipVariants[variant],
    className,
  );
}

export function Chip({
  variant = 'default',
  icon,
  iconFill,
  href,
  small,
  className,
  children,
  label,
}: {
  variant?: keyof typeof chipVariants;
  icon?: IconName;
  iconFill?: boolean;
  href?: string;
  small?: boolean;
  className?: string;
  children?: ReactNode;
  label?: string;
}) {
  const cls = chipClass(variant, small, className);
  const inner = (
    <>
      {icon && <Icon name={icon} size={18} fill={iconFill} />}
      {children}
    </>
  );
  return href ? (
    <Link href={href} className={cls} aria-label={label}>
      {inner}
    </Link>
  ) : (
    <span className={cls} aria-label={label}>
      {inner}
    </span>
  );
}

const badgeTones = {
  gold: 'bg-gold-soft text-gold-ink',
  official: 'bg-gold text-on-gold',
  primary: 'bg-primary-soft text-primary-ink',
  sakura: 'bg-sakura-soft text-sakura-ink',
  success: 'bg-success-soft text-success-ink',
  danger: 'bg-danger-soft text-danger-ink',
  live: 'bg-sakura text-on-sakura',
  'on-primary': 'bg-primary-depth text-on-primary',
  'on-sakura': 'bg-sakura-depth text-on-sakura',
  glass: 'bg-on-media/15 text-on-media',
  dark: 'bg-scrim/50 text-on-media',
  hang: 'bg-hang text-on-media',
};

export function Badge({
  tone = 'gold',
  icon,
  large,
  className,
  children,
}: {
  tone?: keyof typeof badgeTones;
  icon?: IconName;
  large?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center gap-1 rounded-sm whitespace-nowrap',
        large
          ? 'px-3 py-1.5 text-body-sm font-extrabold'
          : 'px-2 py-[3px] text-caption font-extrabold',
        badgeTones[tone],
        className,
      )}
    >
      {icon && <Icon name={icon} size={large ? 18 : 14} />}
      {children}
    </span>
  );
}

export function Count({
  children,
  label,
  dot,
}: {
  children?: ReactNode;
  label?: string;
  dot?: boolean;
}) {
  return (
    <span
      aria-label={label}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-pill bg-primary text-caption font-extrabold text-on-primary',
        dot ? 'size-2.5' : 'h-[22px] min-w-[22px] px-1.5',
      )}
    >
      {children}
    </span>
  );
}

// Avatars (couleurs fixes, lisibles dans les deux thèmes)

const avatarTones: Record<Tone, string> = {
  1: 'bg-avatar-1 text-avatar-1-ink',
  2: 'bg-avatar-2 text-avatar-2-ink',
  3: 'bg-avatar-3 text-avatar-3-ink',
  4: 'bg-avatar-4 text-avatar-4-ink',
  5: 'bg-avatar-5 text-avatar-5-ink',
  6: 'bg-avatar-6 text-avatar-6-ink',
};
const avatarSizes = {
  xs: 'size-7 text-caption',
  s: 'size-8 text-label',
  md: 'size-10 text-body',
  m: 'size-12 text-title-3',
  l: 'size-16 text-title-2',
  xl: 'size-[88px] text-title-1',
  xxl: 'size-[120px] text-display',
  call: 'size-[140px] text-display',
};

export function Avatar({
  initial,
  tone,
  size = 'md',
  online,
  ring,
  className,
  href,
  label,
}: {
  initial: string;
  tone: Tone;
  size?: keyof typeof avatarSizes;
  online?: boolean;
  ring?: boolean;
  className?: string;
  href?: string;
  label?: string;
}) {
  const cls = cx(
    'flex shrink-0 items-center justify-center rounded-pill font-black',
    avatarTones[tone],
    avatarSizes[size],
    online && 'border-[3px] border-success',
    ring && 'border-4 border-gold',
    className,
  );
  return href ? (
    <Link href={href} className={cls} aria-label={label}>
      {initial}
    </Link>
  ) : (
    <span className={cls} aria-hidden={label ? undefined : true} aria-label={label}>
      {initial}
    </span>
  );
}

export function AvatarStack({ children }: { children: ReactNode }) {
  return (
    <span className="flex [&>*]:-ml-2.5 [&>*]:border-2 [&>*]:border-background [&>*:first-child]:ml-0">
      {children}
    </span>
  );
}

// Affiches d'anime (illustrations provisoires) et emblèmes de guild

export const posterTones: Record<Tone, string> = {
  1: 'bg-poster-1',
  2: 'bg-poster-2',
  3: 'bg-poster-3',
  4: 'bg-poster-4',
  5: 'bg-poster-5',
  6: 'bg-poster-6',
};

export function Poster({
  tone,
  title,
  href,
  square,
  card,
  free,
  className,
  children,
  label,
}: {
  tone: Tone;
  title?: string;
  href?: string;
  square?: boolean;
  card?: boolean;
  /** Hauteur libre, fixée par className. */
  free?: boolean;
  className?: string;
  children?: ReactNode;
  label?: string;
}) {
  const cls = cx(
    'relative flex items-end overflow-hidden rounded-md p-2 text-label font-black text-on-media',
    square ? 'aspect-square' : card ? 'aspect-[5/7]' : free ? '' : 'aspect-[3/4]',
    posterTones[tone],
    className,
  );
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute -top-[30%] -right-[45%] aspect-square w-[110%] rounded-pill bg-on-media/15"
      />
      <span
        aria-hidden
        className="absolute bottom-[34%] left-[12%] aspect-square w-[38%] rounded-pill bg-on-media/10"
      />
      {title && <span className="relative">{title}</span>}
      {children}
    </>
  );
  return href ? (
    <Link
      href={href}
      className={cx(cls, 'transition-transform hover:-translate-y-0.5')}
      aria-label={label}
    >
      {inner}
    </Link>
  ) : (
    <div className={cls} aria-label={label}>
      {inner}
    </div>
  );
}

/** Pastille carrée avec une icône, sur fond teinté. */
const tileTones = {
  primary: 'bg-primary-soft text-primary-ink',
  sakura: 'bg-sakura-soft text-sakura-ink',
  gold: 'bg-gold-soft text-gold-ink',
  success: 'bg-success-soft text-success-ink',
  danger: 'bg-danger-soft text-danger',
  muted: 'bg-surface-sunken text-ink-muted',
  'primary-solid': 'bg-primary text-on-primary',
  'sakura-solid': 'bg-sakura text-on-sakura',
  'gold-solid': 'bg-gold text-on-gold',
  'success-ok': 'bg-success-soft text-success',
  'poster-1': 'bg-poster-1 text-on-media',
  'poster-2': 'bg-poster-2 text-on-media',
  'poster-3': 'bg-poster-3 text-on-media',
  'poster-4': 'bg-poster-4 text-on-media',
  'poster-5': 'bg-poster-5 text-on-media',
  'poster-6': 'bg-poster-6 text-on-media',
};
export type TileTone = keyof typeof tileTones;

export function Tile({
  icon,
  tone,
  size = 44,
  iconSize,
  round,
  fill,
  className,
}: {
  icon: IconName;
  tone: TileTone;
  size?: 36 | 40 | 44 | 48 | 52 | 72 | 88;
  iconSize?: number;
  round?: boolean;
  fill?: boolean;
  className?: string;
}) {
  const sizes = {
    36: 'size-9',
    40: 'size-10',
    44: 'size-11',
    48: 'size-12',
    52: 'size-[52px]',
    72: 'size-[72px]',
    88: 'size-[88px]',
  };
  const radius = round ? 'rounded-pill' : size >= 72 ? 'rounded-xl' : 'rounded-md';
  const icons = { 36: 18, 40: 20, 44: 24, 48: 24, 52: 28, 72: 40, 88: 40 };
  return (
    <span
      className={cx(
        'flex shrink-0 items-center justify-center',
        sizes[size],
        radius,
        tileTones[tone],
        className,
      )}
    >
      <Icon name={icon} size={iconSize ?? icons[size]} fill={fill} />
    </span>
  );
}

export const guildTone = (tone: Tone | null): TileTone =>
  tone ? (`poster-${tone}` as TileTone) : 'sakura-solid';

// Progression

const barVariants = {
  default: ['bg-surface-sunken', 'bg-primary'],
  exp: ['bg-primary-depth', 'bg-gold'],
  watch: ['bg-success-soft', 'bg-success'],
  war: ['bg-sakura-soft', 'bg-sakura'],
  gold: ['bg-gold-soft', 'bg-gold'],
  media: ['bg-on-media/25', 'bg-on-media'],
} as const;

export function Bar({
  value,
  variant = 'default',
  size = 'md',
  className,
  label,
}: {
  value: number;
  variant?: keyof typeof barVariants;
  size?: 'thin' | 'md' | 'thick';
  className?: string;
  label?: string;
}) {
  const [track, fill] = barVariants[variant];
  return (
    <span
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cx(
        'block shrink-0 overflow-hidden rounded-pill',
        size === 'thin' ? 'h-2' : size === 'thick' ? 'h-4' : 'h-3',
        track,
        className,
      )}
    >
      <span
        className={cx(
          'block h-full animate-bar rounded-pill transition-[width] duration-500',
          fill,
        )}
        style={{ width: `${value}%` }}
      />
    </span>
  );
}

export function Steps({ current, total }: { current: number; total: number }) {
  return (
    <div
      className="flex flex-1 gap-1.5"
      role="progressbar"
      aria-label={`Étape ${current} sur ${total}`}
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cx(
            'h-2 flex-1 rounded-pill',
            i < current ? 'bg-primary' : 'bg-surface-sunken',
          )}
        />
      ))}
    </div>
  );
}

// Champs

export function Field({
  label,
  hint,
  hintTone,
  children,
  className,
}: {
  label: string;
  hint?: ReactNode;
  hintTone?: 'ok' | 'err';
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cx('flex flex-col gap-1.5', className)}>
      <span className="text-body-sm font-extrabold">{label}</span>
      {children}
      {hint && (
        <span
          className={cx(
            'text-caption font-bold',
            hintTone === 'ok'
              ? 'text-success'
              : hintTone === 'err'
                ? 'text-danger'
                : 'text-ink-muted',
          )}
        >
          {hint}
        </span>
      )}
    </label>
  );
}

export const inputBoxClass = (sunken = false, className?: string) =>
  cx(
    'flex min-h-[52px] items-center gap-2.5 rounded-md border-2 px-3.5 text-ink-muted transition-colors focus-within:border-primary',
    sunken ? 'border-transparent bg-surface-sunken' : 'border-border bg-surface',
    className,
  );
export const inputClass =
  'min-w-0 flex-1 bg-transparent text-body text-ink outline-none placeholder:text-ink-muted';

export function Input({
  icon,
  prefix,
  sunken,
  className,
  trailing,
  ...props
}: {
  icon?: IconName;
  prefix?: string;
  sunken?: boolean;
  trailing?: ReactNode;
} & ComponentProps<'input'>) {
  return (
    <span className={inputBoxClass(sunken, className)}>
      {icon && <Icon name={icon} size={20} />}
      {prefix && <span className="font-extrabold text-primary">{prefix}</span>}
      <input {...props} className={inputClass} />
      {trailing}
    </span>
  );
}

// Barres d'en-tête et mise en page

export function AppBar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <header
      className={cx('flex min-h-[52px] shrink-0 items-center gap-1 px-2 pt-0.5 pb-1.5', className)}
    >
      {children}
    </header>
  );
}

export function AppBarTitle({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <h1
      className={cx(
        'min-w-0 flex-1 truncate px-1 text-title-3 font-black',
        center && 'text-center',
      )}
    >
      {children}
    </h1>
  );
}

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main className={cx('flex flex-1 flex-col gap-3.5 px-4 pt-2 pb-6', className)}>{children}</main>
  );
}

/** Mention discrète teintée (+50 EXP, anti-bot réussi…). */
const noteTones = {
  gold: 'bg-gold-soft text-gold-ink',
  success: 'bg-success-soft text-success-ink',
  sakura: 'bg-sakura-soft text-sakura-ink',
  primary: 'bg-primary-soft text-primary-ink',
  danger: 'bg-danger-soft text-danger-ink',
};
export function Note({
  tone,
  icon,
  children,
  className,
}: {
  tone: keyof typeof noteTones;
  icon?: IconName;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx('flex items-center gap-2 rounded-md px-3 py-2.5', noteTones[tone], className)}
    >
      {icon && <Icon name={icon} size={20} />}
      <span className="text-body-sm font-extrabold">{children}</span>
    </div>
  );
}

// Kami-sama

export function Kami({
  size = 150,
  alt = '',
  animated = true,
  className,
}: {
  size?: number;
  alt?: string;
  /** false pour une pose fixe (petites tailles dans les listes, par exemple). */
  animated?: boolean;
  className?: string;
}) {
  return <KamiSvg size={size} alt={alt} animated={animated} className={className} />;
}

export function Speech({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cx(
        'rounded-lg border-2 border-b-4 border-border bg-surface px-4 py-3 text-center text-body font-bold',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx('px-2 text-title-1 font-black text-primary', className)}>Tomodachi</span>
  );
}

/** Pied de page commun : tactile en bas sur mobile, dans le flux sur ordinateur. */
export function Bottom({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mt-auto flex flex-col gap-2.5 pt-4', className)}>{children}</div>;
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        'font-extrabold text-primary hover:text-primary-depth hover:underline',
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Bloc de chargement qui pulse doucement, à la forme du contenu attendu. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx('block animate-shimmer rounded-md bg-surface-sunken', className)}
    />
  );
}

/** Carte de publication en cours de chargement. */
export function PostSkeleton() {
  return (
    <div className={cardClass('default', false)}>
      <div className="flex items-center gap-2.5">
        <Skeleton className="size-10 rounded-pill" />
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-28 rounded-pill" />
        <Skeleton className="h-10 w-16 rounded-pill" />
      </div>
    </div>
  );
}
