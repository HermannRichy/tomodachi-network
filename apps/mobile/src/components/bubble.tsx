import type { ReactNode } from 'react';
import { View } from 'react-native';
import { T, cx } from './ui';

/** Bulle de message : à droite en indigo pour soi, à gauche sur fond carte pour les autres. */
export function Bubble({
  me,
  children,
  className,
}: {
  me?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <View
      className={cx(
        'max-w-[268px] px-3.5 py-2.5',
        me
          ? 'self-end rounded-lg rounded-tr-sm border-b-[3px] border-primary-depth bg-primary'
          : 'self-start rounded-lg rounded-tl-sm border-2 border-border bg-surface',
        className,
      )}
    >
      {typeof children === 'string' ? (
        <T variant="body-sm" className={me ? 'text-on-primary' : 'text-ink'}>
          {children}
        </T>
      ) : (
        children
      )}
    </View>
  );
}
