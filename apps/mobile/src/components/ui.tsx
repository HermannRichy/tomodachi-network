// Composants du design system Tomodachi pour le mobile (NativeWind).
// Toutes les couleurs, tailles de texte et rayons viennent des tokens : aucune valeur en dur.
// En React Native, le texte n'hérite pas de la couleur du parent : chaque <T> porte la sienne.
import { Image } from 'expo-image';
import { Link, type Href } from 'expo-router';
import { Children, Fragment, isValidElement, useState, type ReactNode } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type PressableProps,
  type TextInputProps,
  type TextProps,
} from 'react-native';
import { extendTailwindMerge } from 'tailwind-merge';
import type { Tone } from '@tomodachi/fixtures';
import { Icon, type IconName } from './icon';
import { useTokens } from './theme';

const textSizes = [
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
] as const;
const merge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...textSizes] }],
      'font-family': [{ font: ['nunito', 'nunito-bold', 'nunito-extrabold', 'nunito-black'] }],
    },
    theme: { borderRadius: ['pill'] },
  },
});
/** Fusionne les classes : la dernière l'emporte (className passé à un composant > style par défaut). */
export const cx = (...c: (string | false | null | undefined)[]) =>
  merge(c.filter(Boolean).join(' '));

// Texte

type Variant = (typeof textSizes)[number];
type Weight = 600 | 700 | 800 | 900;
const defaultWeight: Record<Variant, Weight> = {
  hero: 900,
  display: 900,
  'title-1': 900,
  'title-2': 800,
  'title-3': 800,
  body: 600,
  'body-sm': 600,
  button: 800,
  label: 800,
  caption: 700,
};
const family: Record<Weight, string> = {
  600: 'font-nunito',
  700: 'font-nunito-bold',
  800: 'font-nunito-extrabold',
  900: 'font-nunito-black',
};
const sizeClass: Record<Variant, string> = {
  hero: 'text-hero',
  display: 'text-display',
  'title-1': 'text-title-1',
  'title-2': 'text-title-2',
  'title-3': 'text-title-3',
  body: 'text-body',
  'body-sm': 'text-body-sm',
  button: 'text-button',
  label: 'text-label',
  caption: 'text-caption',
};

export function T({
  variant = 'body',
  weight,
  className,
  ...props
}: TextProps & { variant?: Variant; weight?: Weight; className?: string }) {
  return (
    <Text
      {...props}
      className={cx(
        'text-ink',
        sizeClass[variant],
        family[weight ?? defaultWeight[variant]],
        className,
      )}
    />
  );
}

// Boutons à relief : bord inférieur de 4 px, le bouton descend à l'appui.

const buttonVariants = {
  primary: ['bg-primary border-b-4 border-primary-depth', 'text-on-primary'],
  sakura: ['bg-sakura border-b-4 border-sakura-depth', 'text-on-sakura'],
  gold: ['bg-gold border-b-4 border-gold-depth', 'text-on-gold'],
  danger: ['bg-danger border-b-4 border-danger-depth', 'text-on-danger'],
  secondary: ['bg-surface border-2 border-b-4 border-border border-b-border-depth', 'text-primary'],
  'secondary-danger': [
    'bg-surface border-2 border-b-4 border-border border-b-border-depth',
    'text-danger',
  ],
  ghost: ['bg-transparent min-h-11 px-3', 'text-primary'],
  discord: ['bg-discord border-b-4 border-discord-depth', 'text-on-media'],
  glass: ['bg-on-media/15', 'text-on-media'],
  hang: ['bg-hang border-b-4 border-hang-depth', 'text-on-media'],
  white: ['bg-on-media border-b-4 border-on-media-muted', 'text-poster-1'],
} as const;
const buttonSizes = {
  md: 'min-h-[52px] px-5 rounded-lg',
  sm: 'min-h-10 px-3.5 rounded-md',
  icon: 'h-[52px] w-[52px] rounded-lg',
  'icon-sm': 'h-11 w-11 rounded-md',
  fab: 'h-10 w-10 rounded-pill',
  round: 'h-16 w-16 rounded-pill',
  'round-sm': 'h-12 w-12 rounded-pill',
  'round-lg': 'h-[76px] w-[76px] rounded-pill',
};
type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

export function Button({
  variant = 'primary',
  size = 'md',
  block,
  icon,
  iconFill,
  href,
  label,
  className,
  textClassName,
  children,
  disabled,
  ...props
}: Omit<PressableProps, 'children'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  icon?: IconName;
  iconFill?: boolean;
  href?: Href;
  /** Libellé lu par les lecteurs d'écran (obligatoire pour un bouton icône). */
  label?: string;
  className?: string;
  textClassName?: string;
  children?: ReactNode;
}) {
  const [box, ink] = buttonVariants[variant];
  const iconSize =
    size === 'sm' || size === 'fab'
      ? 18
      : size === 'icon-sm'
        ? 22
        : size.startsWith('round')
          ? size === 'round-sm'
            ? 22
            : 28
          : 20;
  const button = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      {...props}
      className={cx(
        'flex-row items-center justify-center gap-2 active:translate-y-1 active:border-b-0',
        box,
        buttonSizes[size],
        block && 'w-full self-stretch',
        disabled && 'opacity-60',
        className,
      )}
    >
      {icon && <Icon name={icon} size={iconSize} fill={iconFill} className={ink} />}
      {typeof children === 'string' || typeof children === 'number' ? (
        <T
          variant={size === 'sm' ? 'body-sm' : 'button'}
          weight={800}
          className={cx(ink, textClassName)}
          numberOfLines={1}
        >
          {children}
        </T>
      ) : (
        children
      )}
    </Pressable>
  );
  return href && !disabled ? (
    <Link href={href} asChild>
      {button}
    </Link>
  ) : (
    button
  );
}

export function IconButton({
  icon,
  label,
  href,
  onPress,
  dot,
  fill,
  className,
  iconClassName = 'text-ink',
  size = 24,
}: {
  icon: IconName;
  label: string;
  href?: Href;
  onPress?: () => void;
  dot?: boolean;
  fill?: boolean;
  className?: string;
  iconClassName?: string;
  size?: number;
}) {
  const button = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={4}
      className={cx(
        'relative h-11 w-11 items-center justify-center rounded-md active:bg-ink/5',
        className,
      )}
    >
      <Icon name={icon} size={size} fill={fill} className={iconClassName} />
      {dot && (
        <View className="absolute right-[9px] top-[9px] h-2.5 w-2.5 rounded-pill border-2 border-background bg-sakura" />
      )}
    </Pressable>
  );
  return href ? (
    <Link href={href} asChild>
      {button}
    </Link>
  ) : (
    button
  );
}

/** Zone pressable générique (carte, ligne de liste…), avec lien optionnel. */
export function Touch({
  href,
  onPress,
  className,
  children,
  label,
  role = 'button',
  selected,
}: {
  href?: Href;
  onPress?: () => void;
  className?: string;
  children: ReactNode;
  label?: string;
  role?: 'button' | 'link' | 'radio' | 'tab' | 'switch';
  selected?: boolean;
}) {
  const p = (
    <Pressable
      onPress={onPress}
      accessibilityRole={role === 'tab' ? 'tab' : role}
      accessibilityLabel={label}
      accessibilityState={
        selected === undefined ? undefined : role === 'radio' ? { checked: selected } : { selected }
      }
      className={cx('active:opacity-80', className)}
    >
      {children}
    </Pressable>
  );
  return href ? (
    <Link href={href} asChild>
      {p}
    </Link>
  ) : (
    p
  );
}

// Cartes et listes

const cardVariants = {
  default: 'bg-surface border-2 border-b-4 border-border border-b-border-depth',
  primary: 'bg-primary border-b-[6px] border-primary-depth',
  sakura: 'bg-sakura border-b-[6px] border-sakura-depth',
  gold: 'bg-gold-soft border-2 border-b-4 border-gold border-b-gold-depth',
  selected: 'bg-primary-soft border-2 border-b-4 border-primary border-b-primary-depth',
  danger: 'bg-danger-soft border-2 border-b-4 border-danger-soft border-b-danger',
};
type CardVariant = keyof typeof cardVariants;

export const cardClass = (variant: CardVariant = 'default', tight = false, className?: string) =>
  cx('rounded-lg', tight ? 'gap-2 p-3' : 'gap-2.5 p-3.5', cardVariants[variant], className);

export function Card({
  variant = 'default',
  tight,
  row,
  href,
  onPress,
  className,
  children,
  label,
}: {
  variant?: CardVariant;
  tight?: boolean;
  row?: boolean;
  href?: Href;
  onPress?: () => void;
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  const cls = cardClass(variant, tight, cx(row && 'flex-row items-center gap-3', className));
  if (href || onPress) {
    return (
      <Touch
        href={href}
        onPress={onPress}
        className={cls}
        label={label}
        role={href ? 'link' : 'button'}
      >
        {children}
      </Touch>
    );
  }
  return <View className={cls}>{children}</View>;
}

/** Liste groupée : un séparateur de 2 px entre chaque ligne. */
export function List({ children, className }: { children: ReactNode; className?: string }) {
  const items = Children.toArray(children).flatMap((c) =>
    isValidElement(c) && c.type === Fragment
      ? Children.toArray((c.props as { children: ReactNode }).children)
      : [c],
  );
  return (
    <View
      className={cx(
        'overflow-hidden rounded-lg border-2 border-b-4 border-border border-b-border-depth bg-surface',
        className,
      )}
    >
      {items.map((child, i) => (
        <View key={i} className={i > 0 ? 'border-t-2 border-border' : undefined}>
          {child}
        </View>
      ))}
    </View>
  );
}

export function ListItem({
  href,
  onPress,
  icon,
  iconClassName = 'text-primary',
  chevron,
  className,
  children,
}: {
  href?: Href;
  onPress?: () => void;
  icon?: IconName;
  iconClassName?: string;
  chevron?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = cx('min-h-14 flex-row items-center gap-3 px-3.5 py-2.5', className);
  const inner = (
    <>
      {icon && <Icon name={icon} className={iconClassName} />}
      {children}
      {chevron && <Icon name="caret-right" size={20} className="text-ink-muted" />}
    </>
  );
  if (href || onPress) {
    return (
      <Touch
        href={href}
        onPress={onPress}
        className={cx(cls, 'active:bg-ink/5 active:opacity-100')}
      >
        {inner}
      </Touch>
    );
  }
  return <View className={cls}>{inner}</View>;
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <T
      variant="label"
      weight={900}
      accessibilityRole="header"
      className={cx('uppercase tracking-[0.8px] text-ink-muted', className)}
    >
      {children}
    </T>
  );
}

export function SectionHeader({
  title,
  href,
  action = 'Tout voir',
}: {
  title: string;
  href?: Href;
  action?: string;
}) {
  return (
    <View className="flex-row items-center justify-between">
      <SectionTitle>{title}</SectionTitle>
      {href && (
        <Link href={href} accessibilityRole="link">
          <T variant="label" className="text-primary">
            {action}
          </T>
        </Link>
      )}
    </View>
  );
}

// Puces, badges, compteurs

const chipVariants = {
  default: ['bg-surface border-border', 'text-ink'],
  on: ['bg-primary border-primary', 'text-on-primary'],
  react: ['bg-sakura-soft border-sakura-soft', 'text-sakura-ink'],
  'react-on': ['bg-sakura border-sakura', 'text-on-sakura'],
} as const;
type ChipVariant = keyof typeof chipVariants;

export function Chip({
  variant = 'default',
  icon,
  iconFill,
  href,
  onPress,
  small,
  label,
  className,
  children,
  selected,
  role = 'button',
}: {
  variant?: ChipVariant;
  icon?: IconName;
  iconFill?: boolean;
  href?: Href;
  onPress?: () => void;
  small?: boolean;
  label?: string;
  className?: string;
  children?: ReactNode;
  selected?: boolean;
  role?: 'button' | 'tab';
}) {
  const [box, ink] = chipVariants[variant];
  const cls = cx(
    'flex-row items-center gap-1.5 rounded-pill border-2 px-3.5',
    small ? 'min-h-9' : 'min-h-10',
    box,
    className,
  );
  const inner = (
    <>
      {icon && <Icon name={icon} size={18} fill={iconFill} className={ink} />}
      {children !== undefined && (
        <T variant="body-sm" weight={800} className={ink}>
          {children}
        </T>
      )}
    </>
  );
  if (href || onPress) {
    return (
      <Touch
        href={href}
        onPress={onPress}
        className={cls}
        label={label}
        role={role}
        selected={selected}
      >
        {inner}
      </Touch>
    );
  }
  return (
    <View className={cls} accessibilityLabel={label}>
      {inner}
    </View>
  );
}

const badgeTones = {
  gold: ['bg-gold-soft', 'text-gold-ink'],
  official: ['bg-gold', 'text-on-gold'],
  primary: ['bg-primary-soft', 'text-primary-ink'],
  sakura: ['bg-sakura-soft', 'text-sakura-ink'],
  success: ['bg-success-soft', 'text-success-ink'],
  danger: ['bg-danger-soft', 'text-danger-ink'],
  live: ['bg-sakura', 'text-on-sakura'],
  'on-primary': ['bg-primary-depth', 'text-on-primary'],
  'on-sakura': ['bg-sakura-depth', 'text-on-sakura'],
  glass: ['bg-on-media/15', 'text-on-media'],
  dark: ['bg-scrim/50', 'text-on-media'],
  hang: ['bg-hang', 'text-on-media'],
} as const;
export type BadgeTone = keyof typeof badgeTones;

export function Badge({
  tone = 'gold',
  icon,
  iconFill,
  large,
  className,
  textClassName,
  children,
}: {
  tone?: BadgeTone;
  icon?: IconName;
  iconFill?: boolean;
  large?: boolean;
  className?: string;
  textClassName?: string;
  children: ReactNode;
}) {
  const [box, ink] = badgeTones[tone];
  return (
    <View
      className={cx(
        'flex-row items-center gap-1 rounded-sm',
        large ? 'px-3 py-1.5' : 'px-2 py-[3px]',
        box,
        className,
      )}
    >
      {icon && (
        <Icon
          name={icon}
          size={large ? 18 : 14}
          fill={iconFill}
          className={cx(ink, textClassName)}
        />
      )}
      <T
        variant={large ? 'body-sm' : 'caption'}
        weight={800}
        className={cx(ink, textClassName)}
        numberOfLines={1}
      >
        {children}
      </T>
    </View>
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
    <View
      accessibilityLabel={label}
      className={cx(
        'items-center justify-center rounded-pill bg-primary',
        dot ? 'h-2.5 w-2.5' : 'h-[22px] min-w-[22px] px-1.5',
      )}
    >
      {!dot && (
        <T variant="caption" weight={800} className="text-on-primary">
          {children}
        </T>
      )}
    </View>
  );
}

// Avatars (couleurs fixes, lisibles dans les deux thèmes)

const avatarTones: Record<Tone, [string, string]> = {
  1: ['bg-avatar-1', 'text-avatar-1-ink'],
  2: ['bg-avatar-2', 'text-avatar-2-ink'],
  3: ['bg-avatar-3', 'text-avatar-3-ink'],
  4: ['bg-avatar-4', 'text-avatar-4-ink'],
  5: ['bg-avatar-5', 'text-avatar-5-ink'],
  6: ['bg-avatar-6', 'text-avatar-6-ink'],
};
const avatarSizes = {
  xs: ['h-7 w-7', 'caption'],
  s: ['h-8 w-8', 'label'],
  md: ['h-10 w-10', 'body'],
  m: ['h-12 w-12', 'title-3'],
  l: ['h-16 w-16', 'title-2'],
  xl: ['h-[88px] w-[88px]', 'title-1'],
  xxl: ['h-[120px] w-[120px]', 'display'],
  call: ['h-[140px] w-[140px]', 'display'],
} as const;

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
  href?: Href;
  label?: string;
}) {
  const [bg, ink] = avatarTones[tone];
  const [box, variant] = avatarSizes[size];
  const view = (
    <View
      accessibilityLabel={label}
      accessible={!!label}
      className={cx(
        'items-center justify-center rounded-pill',
        bg,
        box,
        online && 'border-[3px] border-success',
        ring && 'border-4 border-gold',
        className,
      )}
    >
      <T variant={variant} weight={900} className={ink}>
        {initial}
      </T>
    </View>
  );
  return href ? (
    <Touch href={href} label={label} role="link" className="rounded-pill">
      {view}
    </Touch>
  ) : (
    view
  );
}

export function AvatarStack({ children }: { children: ReactNode }) {
  return (
    <View className="flex-row">
      {Children.toArray(children).map((c, i) => (
        <View key={i} className={cx('rounded-pill border-2 border-background', i > 0 && '-ml-2.5')}>
          {c}
        </View>
      ))}
    </View>
  );
}

// Affiches d'anime (illustrations provisoires) et emblèmes de guild

const posterTones: Record<Tone, string> = {
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
  onPress,
  square,
  card,
  free,
  className,
  children,
  label,
  selected,
}: {
  tone: Tone;
  title?: string;
  href?: Href;
  onPress?: () => void;
  square?: boolean;
  card?: boolean;
  /** Hauteur libre, fixée par className. */
  free?: boolean;
  className?: string;
  children?: ReactNode;
  label?: string;
  selected?: boolean;
}) {
  const cls = cx(
    'relative justify-end overflow-hidden rounded-md p-2',
    square ? 'aspect-square' : card ? 'aspect-[5/7]' : free ? '' : 'aspect-[3/4]',
    posterTones[tone],
    className,
  );
  const inner = (
    <>
      <View
        pointerEvents="none"
        className="absolute -right-[45%] -top-[30%] aspect-square w-[110%] rounded-pill bg-on-media/15"
      />
      <View
        pointerEvents="none"
        className="absolute bottom-[34%] left-[12%] aspect-square w-[38%] rounded-pill bg-on-media/10"
      />
      {title && (
        <T variant="label" weight={900} className="text-on-media">
          {title}
        </T>
      )}
      {children}
    </>
  );
  if (href || onPress) {
    return (
      <Touch
        href={href}
        onPress={onPress}
        className={cls}
        label={label ?? title}
        role={onPress ? 'button' : 'link'}
        selected={selected}
      >
        {inner}
      </Touch>
    );
  }
  return (
    <View className={cls} accessibilityLabel={label}>
      {inner}
    </View>
  );
}

/** Pastille avec une icône sur fond teinté. */
const tileTones = {
  primary: ['bg-primary-soft', 'text-primary-ink'],
  sakura: ['bg-sakura-soft', 'text-sakura-ink'],
  gold: ['bg-gold-soft', 'text-gold-ink'],
  success: ['bg-success-soft', 'text-success-ink'],
  muted: ['bg-surface-sunken', 'text-ink-muted'],
  'primary-solid': ['bg-primary', 'text-on-primary'],
  'sakura-solid': ['bg-sakura', 'text-on-sakura'],
  'gold-solid': ['bg-gold', 'text-on-gold'],
  'success-ok': ['bg-success-soft', 'text-success'],
  'poster-1': ['bg-poster-1', 'text-on-media'],
  'poster-2': ['bg-poster-2', 'text-on-media'],
  'poster-3': ['bg-poster-3', 'text-on-media'],
  'poster-4': ['bg-poster-4', 'text-on-media'],
  'poster-5': ['bg-poster-5', 'text-on-media'],
  'poster-6': ['bg-poster-6', 'text-on-media'],
} as const;
export type TileTone = keyof typeof tileTones;
export const guildTone = (tone: Tone | null): TileTone =>
  tone ? (`poster-${tone}` as TileTone) : 'sakura-solid';

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
    36: 'h-9 w-9',
    40: 'h-10 w-10',
    44: 'h-11 w-11',
    48: 'h-12 w-12',
    52: 'h-[52px] w-[52px]',
    72: 'h-[72px] w-[72px]',
    88: 'h-[88px] w-[88px]',
  };
  const icons = { 36: 18, 40: 20, 44: 24, 48: 24, 52: 28, 72: 40, 88: 40 };
  const [bg, ink] = tileTones[tone];
  return (
    <View
      className={cx(
        'items-center justify-center',
        sizes[size],
        round ? 'rounded-pill' : size >= 72 ? 'rounded-xl' : 'rounded-md',
        bg,
        className,
      )}
    >
      <Icon name={icon} size={iconSize ?? icons[size]} fill={fill} className={ink} />
    </View>
  );
}

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
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(value) }}
      className={cx(
        'overflow-hidden rounded-pill',
        size === 'thin' ? 'h-2' : size === 'thick' ? 'h-4' : 'h-3',
        track,
        className,
      )}
    >
      <View
        className={cx('h-full rounded-pill', fill)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </View>
  );
}

export function Steps({ current, total }: { current: number; total: number }) {
  return (
    <View
      className="flex-1 flex-row gap-1.5"
      accessibilityRole="progressbar"
      accessibilityLabel={`Étape ${current} sur ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          className={cx(
            'h-2 flex-1 rounded-pill',
            i < current ? 'bg-primary' : 'bg-surface-sunken',
          )}
        />
      ))}
    </View>
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
    <View className={cx('gap-1.5', className)}>
      <T variant="body-sm" weight={800}>
        {label}
      </T>
      {children}
      {hint !== undefined &&
        (typeof hint === 'string' ? (
          <T
            variant="caption"
            className={
              hintTone === 'ok'
                ? 'text-success'
                : hintTone === 'err'
                  ? 'text-danger'
                  : 'text-ink-muted'
            }
          >
            {hint}
          </T>
        ) : (
          hint
        ))}
    </View>
  );
}

export function Input({
  icon,
  prefix,
  sunken,
  className,
  trailing,
  focused,
  multiline,
  ...props
}: TextInputProps & {
  icon?: IconName;
  prefix?: string;
  sunken?: boolean;
  trailing?: ReactNode;
  className?: string;
  focused?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const tokens = useTokens();
  return (
    <View
      className={cx(
        'min-h-[52px] flex-row items-center gap-2.5 rounded-md border-2 px-3.5',
        sunken ? 'border-transparent bg-surface-sunken' : 'border-border bg-surface',
        (focus || focused) && 'border-primary',
        multiline && 'items-start py-3',
        className,
      )}
    >
      {icon && <Icon name={icon} size={20} className="text-ink-muted" />}
      {prefix && (
        <T weight={800} className="text-primary">
          {prefix}
        </T>
      )}
      <TextInput
        {...props}
        multiline={multiline}
        onFocus={(e) => {
          setFocus(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocus(false);
          props.onBlur?.(e);
        }}
        className="flex-1 py-0 font-nunito text-body text-ink"
        placeholderTextColor={tokens.inkMuted}
      />
      {trailing}
    </View>
  );
}

// Mise en page

export function AppBar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <View className={cx('min-h-[52px] flex-row items-center gap-1 px-2 pb-1.5 pt-0.5', className)}>
      {children}
    </View>
  );
}

export function AppBarTitle({
  children,
  center,
  className,
}: {
  children: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <T
      variant="title-3"
      weight={900}
      accessibilityRole="header"
      numberOfLines={1}
      className={cx('flex-1 px-1', center && 'text-center', className)}
    >
      {children}
    </T>
  );
}

const noteTones = {
  gold: ['bg-gold-soft', 'text-gold-ink'],
  success: ['bg-success-soft', 'text-success-ink'],
  sakura: ['bg-sakura-soft', 'text-sakura-ink'],
  primary: ['bg-primary-soft', 'text-primary-ink'],
  danger: ['bg-danger-soft', 'text-danger-ink'],
} as const;

/** Mention discrète teintée (+50 EXP, anti-bot réussi…). */
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
  const [bg, ink] = noteTones[tone];
  return (
    <View className={cx('flex-row items-center gap-2 rounded-md px-3 py-2.5', bg, className)}>
      {icon && <Icon name={icon} size={20} className={ink} />}
      <T variant="body-sm" weight={800} className={cx('flex-1', ink)}>
        {children}
      </T>
    </View>
  );
}

// Kami-sama

const kami = require('../../assets/images/kami-sama.svg');

export function Kami({
  size = 150,
  label,
  className,
}: {
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <Image
      source={kami}
      style={{ width: size, height: Math.round((size * 188) / 200) }}
      accessible={!!label}
      accessibilityLabel={label}
      className={className}
      contentFit="contain"
    />
  );
}

export function Speech({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <View
      className={cx('rounded-lg border-2 border-b-4 border-border bg-surface px-4 py-3', className)}
    >
      <T weight={700} className="text-center">
        {children}
      </T>
    </View>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <T variant="title-1" className={cx('px-2 text-primary', className)}>
      Tomodachi
    </T>
  );
}

export function TextLink({ href, children }: { href: Href; children: ReactNode }) {
  return (
    <Link href={href} accessibilityRole="link" className="font-nunito-extrabold text-primary">
      {children}
    </Link>
  );
}

export function Divider({ className }: { className?: string }) {
  return <View className={cx('h-0.5 bg-border', className)} />;
}

/** Grille de colonnes égales (équivalent de grid-cols-N, absent de React Native). */
export function Grid({
  cols,
  gap = 'gap-2',
  children,
  className,
}: {
  cols: 2 | 3;
  gap?: 'gap-2' | 'gap-2.5';
  children: ReactNode;
  className?: string;
}) {
  const items = Children.toArray(children);
  const rows: ReactNode[][] = [];
  for (let i = 0; i < items.length; i += cols) rows.push(items.slice(i, i + cols));
  return (
    <View className={cx(gap, className)}>
      {rows.map((row, r) => (
        <View key={r} className={cx('flex-row', gap)}>
          {Array.from({ length: cols }, (_, c) => (
            <View key={c} className="flex-1">
              {row[c] ?? null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
