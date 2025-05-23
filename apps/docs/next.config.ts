import createBundleAnalyzer from '@next/bundle-analyzer';
import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    // Replaced by root workspace command
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: [
    'ts-morph',
    'typescript',
    'oxc-transform',
    'twoslash',
    'shiki',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'docs.dedevs.club',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/components/cards',
        permanent: true,
      },
      {
        source: '/docs/components',
        destination: '/docs/components/cards',
        permanent: true,
      },
      {
        source: '/docs/openapi',
        destination: '/docs/openapi/defillama/tvl/chains',
        permanent: true,
      },
      {
        source: '/docs/openapi/defillama',
        destination: '/docs/openapi/defillama/tvl/chains',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX();
// @ts-ignore
export default withAnalyzer(withMDX(config));