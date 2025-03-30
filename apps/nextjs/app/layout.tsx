import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeDevs | NextJS App",
  generator: 'create-dedevs-app',
  description: "Build Your Next App (+ shadcn/ui) in seconds, not hours.",
  keywords: ['DeDevs', 'NextJS', 'shadcn/ui', 'landing'],
  openGraph: {
    title: "DeDevs | NextJS App",
    description: "Build Next App (+ shadcn/ui) in seconds, not hours.",
    type: 'website',
    url: 'https://nextjs.dedevs.club',
    siteName: 'DeDevs | NextJS + shadcn/ui',
  },
  twitter: {
    title: "DeDevs | NextJS App",
    description: "Build Your Next App (+ shadcn/ui) in seconds, not hours.",
    card: 'summary_large_image',
    site: 'https://nextjs.dedevs.club',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}