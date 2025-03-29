/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
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
