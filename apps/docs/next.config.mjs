/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // Disable static generation to avoid React hooks issues during SSG
  output: 'standalone',
  // Mark next-mdx-remote as external package to handle it properly
  serverExternalPackages: ['next-mdx-remote'],
  // Configure webpack to handle MDX files
  webpack: (config) => {
    // Add MDX file support
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: ['remark-gfm'],
            rehypePlugins: ['rehype-slug', 'rehype-autolink-headings'],
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
