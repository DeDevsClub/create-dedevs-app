import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "@0xBuns | Portfolio",
  generator: 'create-dedevs-app',
  description: "A modern portfolio showcasing development and design work",
  keywords: ["portfolio", "development", "design", "DeDevs", "0xBuns"],
  openGraph: {
    title: "@0xBuns | Portfolio",
    description: "A modern portfolio showcasing development and design work",
    type: 'website',
    url: 'https://portfolio.dedevs.club',
    siteName: '@0xBuns',
  },
  twitter: {
    title: "@0xBuns | Portfolio",
    description: "A modern portfolio showcasing development and design work",
    card: 'summary_large_image',
    site: 'https://portfolio.dedevs.club',
  },
  icons: {
    icon: '/favicon.svg',
  },
  themeColor: '#F300A8',
  colorScheme: 'dark',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
            <main className="flex-1 container mx-auto px-4 py-8 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}