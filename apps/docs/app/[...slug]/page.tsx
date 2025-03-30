import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { MdxContent } from '@/components/mdx-content';
import { notFound } from 'next/navigation';
import { FrontMatter, parseMdxFile } from '@/lib/mdx';

// Force dynamic rendering to avoid React hooks issues during static generation
export const dynamic = 'force-dynamic';

// Generate static params for all MDX files
export async function generateStaticParams() {
  // Return empty array to disable static generation for these pages
  // This is needed because next-mdx-remote uses React hooks which can't be used during SSG
  return [];
}

export async function generateMetadata({ 
  params 
}: {
  params: { slug: string[] } | Promise<{ slug: string[] }>
} & any) {
  // In Next.js 15.2.4, params might be a promise that needs to be awaited
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  
  // Skip metadata generation for static files
  if (slug.length === 1 && isStaticFile(slug[0])) {
    return {
      title: 'Static Asset',
      description: 'Static asset file'
    };
  }
  
  const docPath = getDocPath(slug);
  
  try {
    const mdx = await getMdxBySlug(docPath);
    return {
      title: mdx.frontMatter.title,
      description: mdx.frontMatter.description,
    };
  } catch (error) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }
}

function getDocPath(slug: string[]): string {
  // Don't add .mdx extension for static files
  const path = slug.length === 1 ? slug[0] : slug.join('/');
  
  // Check if the path already has a file extension (like .svg, .png, etc.)
  if (isStaticFile(path)) {
    return path;
  }
  
  // For regular content paths, add .mdx extension
  return `${path}.mdx`;
}

// Helper function to check if a path is a static file
function isStaticFile(path: string): boolean {
  const staticExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.css', '.js'];
  return staticExtensions.some(ext => path.endsWith(ext));
}

interface MdxSource {
  frontMatter: FrontMatter;
  serialized: any;
}

async function getMdxBySlug(docPath: string): Promise<MdxSource> {
  try {
    const fullPath = path.join(process.cwd(), docPath);
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${fullPath}`);
    }
    
    // Skip processing for non-MDX files
    if (!docPath.endsWith('.mdx')) {
      throw new Error(`Not an MDX file: ${fullPath}`);
    }
    
    const doc = parseMdxFile(docPath);
    
    if (!doc) {
      throw new Error(`Failed to parse MDX file: ${docPath}`);
    }
    
    const mdxSource = await serialize(doc.content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
      scope: doc.frontMatter,
    });

    return {
      frontMatter: doc.frontMatter,
      serialized: mdxSource,
    };
  } catch (error) {
    console.error(`Error processing MDX file ${docPath}:`, error);
    throw error;
  }
}

export default async function DocPage({ 
  params 
}: {
  params: { slug: string[] } | Promise<{ slug: string[] }>
  searchParams?: Record<string, string | string[] | undefined>
} & any) {
  // In Next.js 15.2.4, params might be a promise that needs to be awaited
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  
  // Get the full path - we'll check if it's a static file or content
  const path = slug.length === 1 ? slug[0] : slug.join('/');
  
  // For static files, redirect to the correct static file path
  if (isStaticFile(path)) {
    // Return 404 - the static file should be served by Next.js static file handling
    notFound();
    return null;
  }
  
  const docPath = getDocPath(slug);
  
  try {
    const { frontMatter, serialized } = await getMdxBySlug(docPath);
    
    return (
      <div className="max-w-3xl mx-auto py-8">
        <MdxContent mdxSource={serialized} frontMatter={frontMatter} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
