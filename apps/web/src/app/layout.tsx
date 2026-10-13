import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Nunito auto-hébergée (police variable 200-1000) : pas de dépendance à Google Fonts au build.
const nunito = localFont({
  variable: '--font-nunito',
  src: '../../node_modules/@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2',
  weight: '200 1000',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tomodachi',
  description: 'Le réseau social des otakus : guilds, nakama, watch parties et arcs de saison.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr" className={`${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans font-semibold text-ink">
        {children}
      </body>
    </html>
  );
}
