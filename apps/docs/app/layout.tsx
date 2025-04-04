import { RootProvider } from 'fumadocs-ui/provider';
import 'fumadocs-ui/style.css';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

const defaultUrl = `https://docs.dedevs.club`
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "DeDevs | Docs",
  description:
    "Documentation for DeDevs.",
  keywords:
    "DeDevs, Documentation, Docs",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "DeDevs | Docs",
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    title: "DeDevs | Docs",
    description: "Documentation for DeDevs.",
    url: defaultUrl,
    siteName: "DeDevs | Docs",
    images: [
      {
        url: `${defaultUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "DeDevs Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DeDevs | Docs",
    description: "Documentation for DeDevs.",
    images: [`${defaultUrl}/opengraph-image.png`],
    creator: "@DeDevsClub"
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

