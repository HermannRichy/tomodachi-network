// Contrôles interactifs : interrupteur, onglets, mot de passe, code à 6 chiffres, case à cocher.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Icon, type IconName } from './icon';
import { setTheme, useTheme, useTokens } from './theme';
import { Chip, T, cx } from './ui';

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
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: on }}
      onPress={() => onChange(!on)}
      hitSlop={6}
      className={cx(
        'h-8 w-[52px] justify-center rounded-pill px-1',
        on ? 'items-end bg-success' : 'items-start bg-border-depth',
      )}
    >
      <View className="h-6 w-6 rounded-pill bg-surface" />
    </Pressable>
  );
}

/** Onglets segmentés (fond en creux, onglet actif en relief). */
export function SegTabs({
  tabs,
  label,
  initial = 0,
  value,
  onChange,
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
    <View
      accessibilityRole="tablist"
      accessibilityLabel={label}
      className="flex-row gap-1 rounded-lg bg-surface-sunken p-1"
    >
      {tabs.map((t, i) => {
        const tab = typeof t === 'string' ? { label: t } : t;
        const on = i === current;
        return (
          <Pressable
            key={tab.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => {
              setLocal(i);
              onChange?.(i);
            }}
            className={cx(
              'min-h-10 flex-1 flex-row items-center justify-center gap-1.5 rounded-md',
              on && 'border-b-2 border-border-depth bg-surface',
            )}
          >
            {tab.icon && (
              <Icon name={tab.icon} size={18} className={on ? 'text-ink' : 'text-ink-muted'} />
            )}
            <T
              variant="body-sm"
              weight={800}
              className={on ? 'text-ink' : 'text-ink-muted'}
              numberOfLines={1}
            >
              {tab.label}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Rangée de puces filtrantes défilante, une seule active. */
export function ChipTabs({
  tabs,
  label,
  initial = 0,
}: {
  tabs: string[];
  label: string;
  initial?: number;
}) {
  const [current, setCurrent] = useState(initial);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="tablist"
      accessibilityLabel={label}
      className="-mx-4 grow-0"
      contentContainerClassName="gap-2 px-4"
    >
      {tabs.map((t, i) => (
        <Chip
          key={t}
          variant={i === current ? 'on' : 'default'}
          onPress={() => setCurrent(i)}
          role="tab"
          selected={i === current}
        >
          {t}
        </Chip>
      ))}
    </ScrollView>
  );
}

export function PasswordInput({ defaultValue }: { defaultValue?: string }) {
  const [shown, setShown] = useState(false);
  const [focus, setFocus] = useState(false);
  const tokens = useTokens();
  return (
    <View
      className={cx(
        'min-h-[52px] flex-row items-center gap-2.5 rounded-md border-2 border-border bg-surface pl-3.5 pr-1',
        focus && 'border-primary',
      )}
    >
      <Icon name="lock-simple" size={20} className="text-ink-muted" />
      <TextInput
        defaultValue={defaultValue}
        secureTextEntry={!shown}
        accessibilityLabel="Mot de passe"
        autoComplete="password"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholderTextColor={tokens.inkMuted}
        className="flex-1 py-0 font-nunito text-body text-ink"
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={shown ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        onPress={() => setShown(!shown)}
        className="h-11 w-11 items-center justify-center rounded-md"
      >
        <Icon name={shown ? 'eye-slash' : 'eye'} size={20} className="text-ink-muted" />
      </Pressable>
    </View>
  );
}

/** Saisie d'un code à 6 chiffres, une case par chiffre. */
export function OtpInput({ initial = '', label }: { initial?: string; label: string }) {
  const [code, setCode] = useState(initial);
  const ref = useRef<TextInput>(null);
  return (
    <Pressable onPress={() => ref.current?.focus()} accessibilityLabel={label}>
      <TextInput
        ref={ref}
        value={code}
        onChangeText={(v) => setCode(v.replace(/\D/g, '').slice(0, 6))}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        accessibilityLabel={label}
        maxLength={6}
        className="absolute h-px w-px opacity-0"
      />
      <View className="flex-row gap-2" importantForAccessibility="no-hide-descendants">
        {Array.from({ length: 6 }, (_, i) => {
          const cur = i === Math.min(code.length, 5) && code.length < 6;
          return (
            <View
              key={i}
              className={cx(
                'h-[58px] flex-1 items-center justify-center rounded-md border-2 border-b-4 bg-surface',
                cur
                  ? 'border-primary border-b-primary-depth'
                  : 'border-border border-b-border-depth',
              )}
            >
              <T variant="title-1" className="tabular-nums">
                {code[i] ?? ''}
              </T>
            </View>
          );
        })}
      </View>
    </Pressable>
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
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: on }}
      onPress={() => setOn(!on)}
      className="flex-row items-start gap-2.5"
    >
      <View
        className={cx(
          'h-6 w-6 items-center justify-center rounded-sm border-2',
          on ? 'border-primary bg-primary' : 'border-border-depth',
        )}
      >
        {on && <Icon name="check" size={16} className="text-on-primary" />}
      </View>
      <View className="flex-1">{children}</View>
    </Pressable>
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

/** Compte à rebours m:ss. */
export function useCountdown(from: number) {
  const [left, setLeft] = useState(from);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  return `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
}

/** Chronomètre d'appel mm:ss qui démarre à `from` secondes. */
export function useStopwatch(from: number) {
  const [s, setS] = useState(from);
  useEffect(() => {
    const t = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
