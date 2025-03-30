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
  params: { slug: string[] }
} & any) {
  const { slug } = params;
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
  if (slug.length === 1) {
    return `${slug[0]}.mdx`;
  } else {
    return `${slug.join('/')}.mdx`;
  }
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
  params: { slug: string[] }
  searchParams?: Record<string, string | string[] | undefined>
} & any) {
  const { slug } = params;
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
