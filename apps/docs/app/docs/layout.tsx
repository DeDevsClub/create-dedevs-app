import { ReactNode } from 'react';
import { type NavItem, SidebarNav } from '@/components/sidebar-nav';

// Navigation structure based on the original docs.json
const docsNav: NavItem[] = [
  {
    title: "Get Started",
    href: '/docs',
    items: [
      {
        title: "Introduction",
        href: "/introduction",
      },
      {
        title: "Quickstart",
        href: "/quickstart",
      },
      {
        title: "Development",
        href: "/development",
      },
    ],
  },
  {
    title: "Essentials",
    href: '/essentials',
    items: [
      {
        title: "Markdown",
        href: "/essentials/markdown",
      },
      {
        title: "Code",
        href: "/essentials/code",
      },
      {
        title: "Images",
        href: "/essentials/images",
      },
      {
        title: "Settings",
        href: "/essentials/settings",
      },
      {
        title: "Navigation",
        href: "/essentials/navigation",
      },
      {
        title: "Reusable Snippets",
        href: "/essentials/reusable-snippets",
      },
    ],
  },
  {
    title: "API Reference",
    href: '/api-reference',
    items: [
      {
        title: "Introduction",
        href: "/api-reference/introduction",
      },
      {
        title: "GET Endpoint",
        href: "/api-reference/endpoint/get",
      },
      {
        title: "CREATE Endpoint",
        href: "/api-reference/endpoint/create",
      },
      {
        title: "DELETE Endpoint",
        href: "/api-reference/endpoint/delete",
      },
    ],
  },
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div className="h-full py-6 pr-6 lg:py-8">
          <SidebarNav 
            items={ docsNav }/>
        </div>
      </aside>
      <main className="relative py-6 lg:py-8">
        <div className="mx-auto w-full min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
}
