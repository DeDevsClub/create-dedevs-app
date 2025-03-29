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
            remarkPlugins: [require('remark-gfm')],
            rehypePlugins: [
              require('rehype-slug'),
              require('rehype-autolink-headings'),
            ],
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
