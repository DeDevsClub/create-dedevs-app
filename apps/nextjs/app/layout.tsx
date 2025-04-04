import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultUrl = `https://nextjs.dedevs.club`

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "DeDevs | NextJS App",
  description:
    "Build Your Next App (+ shadcn/ui) in seconds, not hours.",
  keywords:
    "DeDevs, NextJS, shadcn/ui, landing",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "DeDevs | NextJS App",
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    title: "DeDevs | NextJS App",
    description: "Build Your Next App (+ shadcn/ui) in seconds, not hours.",
    url: defaultUrl,
    siteName: "DeDevs | NextJS App",
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
    title: "DeDevs | NextJS App",
    description: "Build Your Next App (+ shadcn/ui) in seconds, not hours.",
    images: [`${defaultUrl}/opengraph-image.png`],
    creator: "@DeDevsClub"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}