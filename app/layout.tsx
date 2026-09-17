import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from 'next/font/google';
import { appName, siteUrl } from '@/lib/shared';

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

// Used for prose in docs bodies — Suzuri is a writing tool, so the docs read
// like the documents you write in it.
const prose = Newsreader({
  subsets: ['latin'],
  variable: '--font-prose',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${appName} Documentation`,
    template: `%s | ${appName}`,
  },
  description:
    'Suzuri adds a writing environment to Zed: Obsidian-style markdown live preview, Typst and LaTeX preview, a native PDF pane, wikilinks, and citations.',
  icons: {
    icon: '/suzuri-logo.svg',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${prose.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
