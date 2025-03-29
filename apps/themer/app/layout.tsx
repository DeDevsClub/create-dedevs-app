import type React from "react"
import type { Metadata } from "next"
import { Inconsolata } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
})

export const metadata: Metadata = {
  title: "DeDevs | Themer",
  generator: 'create-dedevs-app',
  description: "Generate beautiful color palettes for your Tailwind CSS projects",
  keywords: ['DeDevs', 'Tailwind CSS', 'color palettes'],
  openGraph: {
    title: "DeDevs | Themer",
    description: "Generate beautiful color palettes for your Tailwind CSS projects",
    type: 'website',
    url: 'https://themer.dedevs.club',
    siteName: 'DeDevs | Themer',
  },
  twitter: {
    title: "DeDevs | Themer",
    description: "Generate beautiful color palettes for your Tailwind CSS projects",
    card: 'summary_large_image',
    site: 'https://themer.dedevs.club',
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
      <body className={inconsolata.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'