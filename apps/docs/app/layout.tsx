import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevDocs | NextJS",
  description: "Documentation website built with Next.js and MDX",
  generator: "create-dedevs-app",
  keywords: ['DeDevs', 'Documentation', 'Guides', 'API Reference'],
  openGraph: {
    title: "DeDevs | Docs",
    description: "Technical docs (+ guides) for DeDevs.",
    type: 'website',
    url: 'https://docs.dedevs.club',
    siteName: 'DeDevs | Docs',
  },
  twitter: {
    title: "DeDevs | Docs",
    description: "Technical docs (+ guides) for DeDevs.",
    card: 'summary_large_image',
    site: 'DeDevs | Docs',
  },
  icons: {
    icon: 'https://dedevs.club/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://dedevs.club/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system">
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b bg-background">
              <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-6">
                  <a href="/" className="flex items-center gap-2">
                    <img 
                      src="/logo/light.svg" 
                      alt="Logo" 
                      className="h-8 w-auto block dark:hidden" 
                    />
                    <img 
                      src="/logo/dark.svg" 
                      alt="Logo" 
                      className="h-8 w-auto hidden dark:block" 
                    />
                    <span className="font-bold">DevDocs</span>
                  </a>
                </div>
                <nav className="flex items-center gap-4">
                  <ThemeToggle />
                  <a 
                    href="https://github.com/DeDevsClub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="rounded-md border px-4 py-2 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    GitHub
                  </a>
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} DeDevsClub. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://x.com/DeDevsClub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    X (Twitter)
                  </a>
                  <a 
                    href="https://github.com/DeDevsClub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
