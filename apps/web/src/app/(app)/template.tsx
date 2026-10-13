// Rejoué à chaque navigation : l'écran entre en fondu avec un léger glissement.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 animate-page flex-col">{children}</div>;
}
