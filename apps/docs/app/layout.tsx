import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevDocs Starter",
  description: "Documentation website for a dev app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
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
                  <span className="font-bold">DevDocs Starter</span>
                </a>
              </div>
              <nav className="flex items-center gap-4">
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
      </body>
    </html>
  );
}
