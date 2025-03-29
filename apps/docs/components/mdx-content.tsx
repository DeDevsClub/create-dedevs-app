import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';
import Image from 'next/image';
import { FrontMatter } from '@/lib/mdx';
import clsx from 'clsx';

// Define custom components for MDX
const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={clsx("text-4xl font-bold mt-8 mb-4", className)} 
      {...props} 
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      className={clsx("text-3xl font-bold mt-8 mb-4", className)} 
      {...props} 
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className={clsx("text-2xl font-bold mt-6 mb-3", className)} 
      {...props} 
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 
      className={clsx("text-xl font-bold mt-4 mb-2", className)} 
      {...props} 
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={clsx("my-4", className)} 
      {...props} 
    />
  ),
  a: ({ href, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/')) {
      return (
        <Link 
          href={href} 
          className={clsx("text-primary hover:underline", className)}
          {...props} 
        />
      );
    }
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx("text-primary hover:underline", className)}
        {...props}
      />
    );
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul 
      className={clsx("list-disc pl-8 my-4", className)} 
      {...props} 
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol 
      className={clsx("list-decimal pl-8 my-4", className)} 
      {...props} 
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li 
      className={clsx("mt-2", className)} 
      {...props} 
    />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote 
      className={clsx("border-l-4 border-primary pl-4 italic my-4", className)} 
      {...props} 
    />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img 
      className={clsx("max-w-full rounded-lg my-4", className)} 
      alt={alt} 
      {...props} 
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre 
      className={clsx("bg-muted p-4 rounded-lg my-4 overflow-x-auto", className)} 
      {...props} 
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code 
      className={clsx("bg-muted px-1.5 py-0.5 rounded text-sm", className)} 
      {...props} 
    />
  ),
  // Custom components
  Card: ({ title, icon, href, children, className }: { 
    title: string, 
    icon?: string, 
    href?: string, 
    children: React.ReactNode,
    className?: string
  }) => {
    const content = (
      <div className={clsx("border rounded-lg p-6", className)}>
        {icon && <div className="text-2xl mb-2">{icon}</div>}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="text-muted-foreground">{children}</div>
      </div>
    );

    if (href) {
      return (
        <Link href={href} className="block hover:opacity-90 transition-opacity">
          {content}
        </Link>
      );
    }
    
    return content;
  },
  CardGroup: ({ children, cols = 1, className }: { 
    children: React.ReactNode, 
    cols?: number,
    className?: string
  }) => (
    <div 
      className={clsx(
        "grid gap-6 my-6", 
        {
          "grid-cols-1": cols === 1,
          "grid-cols-1 md:grid-cols-2": cols === 2,
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": cols === 3,
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-4": cols === 4,
        },
        className
      )}
    >
      {children}
    </div>
  ),
};

interface MdxContentProps {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: FrontMatter;
}

export function MdxContent({ mdxSource, frontMatter }: MdxContentProps) {
  return (
    <div className="mdx-content">
      <h1 className="text-4xl font-bold mb-4">{frontMatter.title}</h1>
      {frontMatter.description && (
        <p className="text-xl text-muted-foreground mb-8">{frontMatter.description}</p>
      )}
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
}
