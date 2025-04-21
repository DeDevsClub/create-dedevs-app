import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  dir: 'content/docs',
});

export const openapi = defineDocs({
  dir: 'content/docs/openapi',
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
