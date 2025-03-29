# Next.js Documentation App

This documentation app is built with Next.js and supports MDX content. The app provides:

- Guide pages with MDX support
- Navigation with sidebar
- Dark/light mode support
- API Reference pages
- Custom MDX components

## Directory Structure

```
docs/
├── app/                    # Next.js app directory
│   ├── docs/               # Docs layout and pages
│   │   └── layout.tsx      # Layout for docs section with sidebar
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # React components
│   ├── mdx-content.tsx     # MDX rendering component
│   └── sidebar-nav.tsx     # Sidebar navigation
├── lib/                    # Utility functions
│   └── mdx.ts              # MDX processing utilities
├── public/                 # Static assets
│   ├── images/             # Images used in docs
│   ├── logo/               # Logo files
│   └── favicon.svg         # Site favicon
├── essentials/             # MDX content for essentials section
├── api-reference/          # MDX content for API reference
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.mjs      # PostCSS configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## Development

To run the documentation site locally:

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm run dev
```

The site will be available at http://localhost:3004

## Building for Production

To build the documentation for production:

```bash
pnpm run build
```

To preview the production build:

```bash
pnpm run start
```

## Customization

- Edit `app/layout.tsx` to update the site header and footer
- Update `app/docs/layout.tsx` to modify the sidebar navigation
- Style changes can be made in `app/globals.css` and `tailwind.config.ts`
- MDX components can be customized in `components/mdx-content.tsx`
