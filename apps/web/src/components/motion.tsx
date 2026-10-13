'use client';
// Micro-interactions partagées : confettis de récompense, éclats de réaction, éléments qui s'envolent.
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';

const confettiColors = [
  'bg-gold',
  'bg-sakura',
  'bg-primary',
  'bg-slime',
  'bg-success',
  'bg-gold-depth',
];

// Pseudo-aléatoire déterministe : même rendu serveur et client.
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/** Pluie de confettis plein écran, une seule fois. */
export function Confetti({ count = 36, delay = 0 }: { count?: number; delay?: number }) {
  // Rendu côté client seulement : rien à hydrater, et les confettis partent à l'affichage.
  const [phase, setPhase] = useState<'idle' | 'on' | 'done'>('idle');
  useEffect(() => {
    const start = setTimeout(() => setPhase('on'), 0);
    const end = setTimeout(() => setPhase('done'), 3400 + delay);
    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, [delay]);
  if (phase !== 'on') return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const style = {
          left: `${rand(i, 1) * 100}%`,
          width: `${6 + rand(i, 2) * 6}px`,
          height: `${10 + rand(i, 3) * 8}px`,
          animationDelay: `${delay + rand(i, 4) * 500}ms`,
          animationDuration: `${2000 + rand(i, 5) * 1200}ms`,
          '--drift': `${(rand(i, 6) - 0.5) * 160}px`,
          '--spin': `${(rand(i, 7) > 0.5 ? 1 : -1) * (360 + rand(i, 8) * 540)}deg`,
        } as CSSProperties;
        return (
          <span
            key={i}
            style={style}
            className={`absolute -top-5 animate-confetti rounded-xs ${confettiColors[i % confettiColors.length]}`}
          />
        );
      })}
    </div>
  );
}

/** Petit éclat de particules autour d'un élément (réaction Sugoi). */
export function Burst({ tone = 'bg-sakura' }: { tone?: string }) {
  return (
    <span aria-hidden className="pointer-events-none absolute top-1/2 left-1/2">
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const style = {
          '--bx': `${Math.cos(a) * 22}px`,
          '--by': `${Math.sin(a) * 22}px`,
        } as CSSProperties;
        return (
          <span
            key={i}
            style={style}
            className={`absolute -mt-[3px] -ml-[3px] size-1.5 animate-burst rounded-pill ${tone}`}
          />
        );
      })}
    </span>
  );
}

/** Éléments qui s'envolent (cœurs du live, +1 des réactions). Ajouter avec push(), ils disparaissent seuls. */
export function useFloaters() {
  const [items, setItems] = useState<{ id: number; drift: number }[]>([]);
  const push = () =>
    setItems((list) => [
      ...list.slice(-12),
      { id: Date.now() + Math.random(), drift: (Math.random() - 0.5) * 50 },
    ]);
  const remove = (id: number) => setItems((list) => list.filter((x) => x.id !== id));
  return { items, push, remove };
}

export function Floaters({
  items,
  remove,
  children,
  className = '',
}: {
  items: { id: number; drift: number }[];
  remove: (id: number) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span aria-hidden className={`pointer-events-none absolute bottom-full left-1/2 ${className}`}>
      {items.map((x) => (
        <span
          key={x.id}
          onAnimationEnd={() => remove(x.id)}
          style={{ '--drift': `${x.drift}px` } as CSSProperties}
          className="absolute bottom-0 -translate-x-1/2 animate-float-up"
        >
          {children}
        </span>
      ))}
    </span>
  );
}

/** Vibration courte sur les appareils qui la permettent (Android). Rien ailleurs. */
export function haptic(kind: 'tap' | 'success' | 'error' = 'tap') {
  if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;
  // Le navigateur refuse la vibration tant que la personne n'a pas touché la page.
  if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  navigator.vibrate(kind === 'success' ? [12, 60, 24] : kind === 'error' ? [30, 40, 30] : 8);
}

/** Effets d'un écran de récompense : confettis et vibration de succès à l'arrivée. */
export function RewardEffects({ count }: { count?: number }) {
  useEffect(() => haptic('success'), []);
  return <Confetti count={count} delay={250} />;
}
