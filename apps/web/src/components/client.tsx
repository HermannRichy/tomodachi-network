'use client';
// Composants interactifs partagés (état local, thème).
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Icon, type IconName } from './icon';
import { chipClass, cx, inputBoxClass, inputClass } from './ui';

export function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cx(
        'relative h-8 w-[52px] shrink-0 cursor-pointer rounded-pill transition-colors duration-200',
        on ? 'bg-success' : 'bg-border-depth',
      )}
    >
      <span
        className={cx(
          'absolute top-1 size-6 rounded-pill bg-surface transition-[left] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          on ? 'left-6' : 'left-1',
        )}
      />
    </button>
  );
}

export function useToggle(initial: boolean) {
  const [on, set] = useState(initial);
  return [on, set] as const;
}

/** Onglets segmentés (fond en creux, onglet actif en relief). */
export function SegTabs({
  tabs,
  label,
  initial = 0,
  onChange,
  value,
}: {
  tabs: (string | { label: string; icon?: IconName })[];
  label: string;
  initial?: number;
  value?: number;
  onChange?: (i: number) => void;
}) {
  const [local, setLocal] = useState(initial);
  const current = value ?? local;
  return (
    <div role="tablist" aria-label={label} className="flex gap-1 rounded-lg bg-surface-sunken p-1">
      {tabs.map((t, i) => {
        const tab = typeof t === 'string' ? { label: t } : t;
        const on = i === current;
        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => {
              setLocal(i);
              onChange?.(i);
            }}
            className={cx(
              'flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md text-body-sm font-extrabold transition-colors',
              on
                ? 'bg-surface text-ink shadow-[0_2px_0_var(--tomo-border-depth)]'
                : 'text-ink-muted hover:text-ink',
            )}
          >
            {tab.icon && <Icon name={tab.icon} size={18} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

/** Rangée de puces filtrantes, une seule active. */
export function ChipTabs({
  tabs,
  label,
  initial = 0,
  className,
}: {
  tabs: string[];
  label: string;
  initial?: number;
  className?: string;
}) {
  const [current, setCurrent] = useState(initial);
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cx('flex gap-2 overflow-x-auto [scrollbar-width:none]', className)}
    >
      {tabs.map((t, i) => (
        <button
          key={t}
          type="button"
          role="tab"
          aria-selected={i === current}
          onClick={() => setCurrent(i)}
          className={chipClass(i === current ? 'on' : 'default')}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function PasswordInput({
  defaultValue,
  icon = 'lock-simple',
}: {
  defaultValue?: string;
  icon?: IconName;
}) {
  const [shown, setShown] = useState(false);
  return (
    <span className={inputBoxClass()}>
      <Icon name={icon} size={20} />
      <input
        type={shown ? 'text' : 'password'}
        defaultValue={defaultValue}
        aria-label="Mot de passe"
        className={inputClass}
        autoComplete="current-password"
      />
      <button
        type="button"
        onClick={() => setShown((s) => !s)}
        aria-label={shown ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        className="-mr-1.5 flex size-9 cursor-pointer items-center justify-center rounded-md text-ink-muted hover:bg-ink/5"
      >
        <Icon name={shown ? 'eye-slash' : 'eye'} size={20} />
      </button>
    </span>
  );
}

/** Saisie d'un code à 6 chiffres, une case par chiffre. */
export function OtpInput({ initial = '', label }: { initial?: string; label: string }) {
  const [code, setCode] = useState(initial);
  const ref = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative" onClick={() => ref.current?.focus()}>
      <input
        ref={ref}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        inputMode="numeric"
        autoComplete="one-time-code"
        aria-label={label}
        className="absolute inset-0 opacity-0"
      />
      <div className="grid grid-cols-6 gap-2" aria-hidden>
        {Array.from({ length: 6 }, (_, i) => {
          const cur = i === Math.min(code.length, 5) && (focused || code.length < 6);
          return (
            <span
              key={i}
              className={cx(
                'flex h-[58px] items-center justify-center rounded-md border-2 border-b-4 bg-surface text-title-1 font-black tabular-nums',
                cur
                  ? 'border-primary border-b-primary-depth'
                  : 'border-border border-b-border-depth',
              )}
            >
              {code[i] ?? ''}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function Checkbox({
  initial = false,
  children,
}: {
  initial?: boolean;
  children: ReactNode;
}) {
  const [on, setOn] = useState(initial);
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-body-sm">
      <input
        type="checkbox"
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cx(
          'flex size-6 shrink-0 items-center justify-center rounded-sm border-2 text-on-primary peer-focus-visible:outline-3 peer-focus-visible:outline-primary',
          on ? 'border-primary bg-primary' : 'border-border-depth',
        )}
      >
        {on && (
          <span className="flex animate-pop">
            <Icon name="check" size={16} />
          </span>
        )}
      </span>
      <span>{children}</span>
    </label>
  );
}

// Thème clair ou sombre : classe sur <html>, mémorisée dans localStorage (clé tomo-theme).

type Theme = 'light' | 'dark';
const listeners = new Set<() => void>();
function readTheme(): Theme {
  const c = document.documentElement.classList;
  if (c.contains('dark')) return 'dark';
  if (c.contains('light')) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
export function setTheme(t: Theme) {
  const c = document.documentElement.classList;
  c.remove('light', 'dark');
  c.add(t);
  try {
    localStorage.setItem('tomo-theme', t);
  } catch {}
  listeners.forEach((l) => l());
}
export function useTheme(): Theme {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    readTheme,
    () => 'light',
  );
}

export function ThemeSwitch() {
  const theme = useTheme();
  return (
    <SegTabs
      label="Thème de l'application"
      value={theme === 'dark' ? 1 : 0}
      onChange={(i) => setTheme(i === 1 ? 'dark' : 'light')}
      tabs={[
        { label: 'Clair', icon: 'sun' },
        { label: 'Sombre', icon: 'moon' },
      ]}
    />
  );
}

/** Compte à rebours mm:ss. */
export function Countdown({ from }: { from: number }) {
  const [left, setLeft] = useState(from);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  return <>{`${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`}</>;
}

/** Chronomètre d'appel qui démarre à `from` secondes. */
export function Stopwatch({ from }: { from: number }) {
  const [s, setS] = useState(from);
  useEffect(() => {
    const t = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return <>{`${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`}</>;
}
