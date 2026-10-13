// Écrans plein écran : appels, live, watch party, quiz, niveau supérieur, modération.
export default function ImmersiveLayout({ children }: LayoutProps<'/'>) {
  return <div className="flex min-h-dvh flex-col">{children}</div>;
}
