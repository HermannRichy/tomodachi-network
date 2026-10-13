import type { ReactNode } from 'react';
import { cx } from './ui';

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
    <div
      className={cx(
        'max-w-[268px] px-3.5 py-2.5 text-body-sm font-semibold',
        me
          ? 'self-end rounded-lg rounded-tr-xs border-b-[3px] border-primary-depth bg-primary text-on-primary'
          : 'self-start rounded-lg rounded-tl-xs border-2 border-border bg-surface',
        className,
      )}
    >
      {children}
    </div>
  );
}
