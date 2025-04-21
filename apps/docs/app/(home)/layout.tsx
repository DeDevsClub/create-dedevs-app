import type { Metadata, Viewport } from 'next'
import "@/app/globals.css";
import { HomeLayout } from '@/components/layouts/home';
import { baseOptions } from '@/app/layout.config';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://docs.dedevs.club"
  ),
  title: {
    default: "DeDevs | Docs",
    template: "%s | DeDevs | Docs"
  },
  description: "Build, Manage, and Customize your DevDocs",
} 

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex-1 flex flex-col items-center justify-start pt-12 md:pt-16 gap-4">
      <HomeLayout {...baseOptions}>
        {children}
      </HomeLayout>
    </main>
  )
}
