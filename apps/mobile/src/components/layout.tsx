// Gabarit d'écran : zone sûre, en-tête fixe, contenu défilant, pied fixe.
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { cx } from './ui';

export function Screen({
  header,
  footer,
  children,
  scroll = true,
  className,
  contentClassName,
  bg = 'bg-background',
  bottomInset = true,
}: {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  scroll?: boolean;
  className?: string;
  contentClassName?: string;
  bg?: string;
  /** Ajoute la marge de la barre d'accueil iOS sous le contenu quand il n'y a pas de pied. */
  bottomInset?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const content = cx('grow gap-3.5 px-4 pb-6 pt-2', contentClassName);
  return (
    <SafeAreaView edges={['top']} className={cx('flex-1', bg, className)}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        {header}
        {scroll ? (
          <ScrollView
            className="flex-1"
            contentContainerClassName={content}
            contentContainerStyle={
              !footer && bottomInset ? { paddingBottom: insets.bottom + 24 } : undefined
            }
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <View
            className={cx('flex-1', content)}
            style={!footer && bottomInset ? { paddingBottom: insets.bottom + 24 } : undefined}
          >
            {children}
          </View>
        )}
        {footer}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/** Barre fixe en bas (composer, barre d'outils) avec la marge de la barre d'accueil. */
export function BottomBar({ children, className }: { children: ReactNode; className?: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={cx(
        'flex-row items-center gap-2 border-t-2 border-border bg-surface px-3 pt-2.5',
        className,
      )}
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      {children}
    </View>
  );
}

/** Pousse son contenu en bas de l'écran (boutons principaux). */
export function Bottom({ children, className }: { children: ReactNode; className?: string }) {
  return <View className={cx('mt-auto gap-2.5 pt-4', className)}>{children}</View>;
}
