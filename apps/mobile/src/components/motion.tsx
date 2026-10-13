// Animations et micro-interactions (Reanimated 4, animations CSS) et vibrations (expo-haptics).
// Tout respecte le réglage « Réduire les animations » du téléphone.
import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Platform, View, useWindowDimensions, type ViewStyle } from 'react-native';
import { colors } from '@tomodachi/design-tokens';
import Animated, {
  cubicBezier,
  useReducedMotion,
  type CSSAnimationKeyframes,
} from 'react-native-reanimated';
import { useTokens } from './theme';

// Vibrations

export function haptic(kind: 'tap' | 'select' | 'success' | 'error' = 'tap') {
  if (Platform.OS === 'web') return;
  const run =
    kind === 'tap'
      ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      : kind === 'select'
        ? Haptics.selectionAsync()
        : Haptics.notificationAsync(
            kind === 'success'
              ? Haptics.NotificationFeedbackType.Success
              : Haptics.NotificationFeedbackType.Error,
          );
  run.catch(() => {});
}

// Images clés partagées

export const keyframes = {
  pop: {
    '0%': { transform: [{ scale: 0.6 }], opacity: 0 },
    '60%': { transform: [{ scale: 1.12 }], opacity: 1 },
    '100%': { transform: [{ scale: 1 }], opacity: 1 },
  },
  shake: {
    '0%': { transform: [{ translateX: 0 }] },
    '20%': { transform: [{ translateX: -6 }] },
    '40%': { transform: [{ translateX: 6 }] },
    '60%': { transform: [{ translateX: -6 }] },
    '80%': { transform: [{ translateX: 6 }] },
    '100%': { transform: [{ translateX: 0 }] },
  },
  ripple: {
    '0%': { transform: [{ scale: 0.85 }], opacity: 0.55 },
    '100%': { transform: [{ scale: 1.35 }], opacity: 0 },
  },
  ping: {
    '0%': { transform: [{ scale: 1 }], opacity: 0.7 },
    '80%': { transform: [{ scale: 2.4 }], opacity: 0 },
    '100%': { transform: [{ scale: 2.4 }], opacity: 0 },
  },
  shimmer: {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.45 },
    '100%': { opacity: 1 },
  },
} satisfies Record<string, CSSAnimationKeyframes>;

type KeyframeName = keyof typeof keyframes;

/** Joue une animation sur ses enfants. Changer `trigger` la rejoue. */
export function Animate({
  name,
  duration = 420,
  delay = 0,
  loop = false,
  trigger,
  style,
  children,
}: {
  name: KeyframeName;
  duration?: number;
  delay?: number;
  loop?: boolean;
  trigger?: string | number | boolean;
  style?: ViewStyle;
  children?: ReactNode;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <View style={style}>{children}</View>;
  return (
    <Animated.View
      key={String(trigger)}
      style={[
        style,
        {
          animationName: keyframes[name],
          animationDuration: duration,
          animationDelay: delay,
          animationIterationCount: loop ? 'infinite' : 1,
          animationTimingFunction: name === 'pop' ? cubicBezier(0.34, 1.56, 0.64, 1) : 'ease-out',
          animationFillMode: 'both',
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

// Confettis

const c = colors.light;
const confettiColors = [c.gold, c.sakura, c.primary, c.slime, c.success, c.goldDepth];
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/** Pluie de confettis par-dessus l'écran, une seule fois. */
export function Confetti({ count = 32, delay = 250 }: { count?: number; delay?: number }) {
  const reduced = useReducedMotion();
  const { width, height } = useWindowDimensions();
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 3600 + delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (reduced || done) return null;
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const drift = (rand(i, 6) - 0.5) * 160;
        const spin = (rand(i, 7) > 0.5 ? 1 : -1) * (360 + rand(i, 8) * 540);
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              top: -20,
              left: rand(i, 1) * width,
              width: 6 + rand(i, 2) * 6,
              height: 10 + rand(i, 3) * 8,
              borderRadius: 2,
              backgroundColor: confettiColors[i % confettiColors.length],
              animationName: {
                '0%': {
                  transform: [{ translateY: 0 }, { translateX: 0 }, { rotate: '0deg' }],
                  opacity: 1,
                },
                '85%': { opacity: 1 },
                '100%': {
                  transform: [
                    { translateY: height + 40 },
                    { translateX: drift },
                    { rotate: `${spin}deg` },
                  ],
                  opacity: 0,
                },
              },
              animationDuration: 2000 + rand(i, 5) * 1200,
              animationDelay: delay + rand(i, 4) * 500,
              animationTimingFunction: cubicBezier(0.25, 0.6, 0.4, 1),
              animationFillMode: 'both',
            }}
          />
        );
      })}
    </View>
  );
}

/** Éclat de particules autour d'un point (réaction Sugoi). */
export function Burst({ color }: { color?: string }) {
  const reduced = useReducedMotion();
  const tokens = useTokens();
  if (reduced) return null;
  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: '50%', left: '50%' }}>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              top: -3,
              left: -3,
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: color ?? tokens.sakura,
              animationName: {
                '0%': {
                  transform: [{ translateX: 0 }, { translateY: 0 }, { scale: 1 }],
                  opacity: 1,
                },
                '100%': {
                  transform: [
                    { translateX: Math.cos(a) * 22 },
                    { translateY: Math.sin(a) * 22 },
                    { scale: 0.2 },
                  ],
                  opacity: 0,
                },
              },
              animationDuration: 520,
              animationFillMode: 'forwards',
            }}
          />
        );
      })}
    </View>
  );
}

/** Éléments qui s'envolent (cœurs du live, +1 des réactions). */
export function useFloaters() {
  const [items, setItems] = useState<{ id: number; drift: number }[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const push = () => {
    const id = Date.now() + Math.random();
    setItems((list) => [...list.slice(-12), { id, drift: (Math.random() - 0.5) * 50 }]);
    timers.current.push(
      setTimeout(() => setItems((list) => list.filter((x) => x.id !== id)), 1200),
    );
  };
  return { items, push };
}

export function Floaters({
  items,
  children,
}: {
  items: { id: number; drift: number }[];
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <View
      pointerEvents="none"
      style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, alignItems: 'center' }}
    >
      {items.map((x) => (
        <Animated.View
          key={x.id}
          style={{
            position: 'absolute',
            bottom: 0,
            animationName: {
              '0%': {
                transform: [{ translateY: 0 }, { translateX: 0 }, { scale: 0.6 }],
                opacity: 0,
              },
              '15%': {
                transform: [{ translateY: -12 }, { translateX: 0 }, { scale: 1.1 }],
                opacity: 1,
              },
              '100%': {
                transform: [{ translateY: -120 }, { translateX: x.drift }, { scale: 1 }],
                opacity: 0,
              },
            },
            animationDuration: 1100,
            animationFillMode: 'forwards',
            animationTimingFunction: 'ease-out',
          }}
        >
          {children}
        </Animated.View>
      ))}
    </View>
  );
}
