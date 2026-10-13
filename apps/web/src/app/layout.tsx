import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { colors } from '@tomodachi/design-tokens';
import './globals.css';

// Nunito auto-hébergée (police variable 200-1000) : pas de dépendance à Google Fonts au build.
const nunito = localFont({
  variable: '--font-nunito',
  src: '../../node_modules/@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2',
  weight: '200 1000',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Tomodachi', template: '%s · Tomodachi' },
  description: 'Le réseau social des otakus : guilds, nakama, watch parties et arcs de saison.',
  applicationName: 'Tomodachi',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: colors.light.background },
    { media: '(prefers-color-scheme: dark)', color: colors.dark.background },
  ],
};

// Applique le thème choisi dans Paramètres avant le premier rendu, sans flash.
const themeScript = `try{var t=localStorage.getItem('tomo-theme');if(t==='dark'||t==='light')document.documentElement.classList.add(t)}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr" className={`${nunito.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans font-semibold text-ink">
        {children}
      </body>
    </html>
  );
}
