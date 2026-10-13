import { SideNav, TabBar } from '@/components/nav';

// Écrans de l'app connectée : barre latérale sur ordinateur, onglets en bas sur mobile.
export default function AppLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl">
      <SideNav />
      <div className="flex min-h-dvh min-w-0 flex-1 flex-col lg:border-r-2 lg:border-border">
        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">{children}</div>
        <TabBar />
      </div>
    </div>
  );
}
