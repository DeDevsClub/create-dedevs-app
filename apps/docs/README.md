# Docs

This is a Next.js documentation application powered by [Fumadocs](https://fumadocs.vercel.app) and generated with [Create DeDevs App](https://github.com/DeDevsClub/create-dedevs-app).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [pnpm](https://pnpm.io/) package manager

### Installation

This docs application is part of a monorepo. You can either install and run just the docs app or the entire project.

#### Option 1: Install and run only the docs app

```bash
# Navigate to the docs directory
cd apps/docs

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

#### Option 2: Install and run the entire monorepo

```bash
# From the root directory
pnpm apps:install  # Install all apps

# Then run the docs app
pnpm docs  # This runs the docs app via 'make docs'
```

Open [http://localhost:3003](http://localhost:3003) with your browser to see the result.

## Project Structure

```
apps/docs/
├── app/                # Next.js app router
│   ├── (home)/        # Home page routes
│   ├── api/           # API routes, including search
│   └── docs/          # Documentation pages
├── content/           # Documentation content
│   └── docs/          # MDX documentation files
├── lib/               # Utility functions and configurations
├── public/            # Static assets
└── README.md          # This file
```

## Scripts

- `pnpm dev` - Run the development server on port 3003
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm postinstall` - Run automatically after install to set up Fumadocs MDX

## Monorepo Structure

This docs application is part of a larger monorepo that includes:

- `apps/api` - Backend API
- `apps/docs` - This documentation app
- `apps/hashnode` - Hashnode blog integration
- `apps/nextjs` - Main Next.js application
- `apps/portfolio` - Portfolio website

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Fumadocs](https://fumadocs.vercel.app) - learn about Fumadocs documentation framework
- [Create DeDevs App](https://github.com/DeDevsClub/create-dedevs-app) - learn about the Create DeDevs App CLI tool
