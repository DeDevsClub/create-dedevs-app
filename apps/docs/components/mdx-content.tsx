'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';
import Image from 'next/image';
import { FrontMatter } from '@/lib/mdx';
import clsx from 'clsx';
import { useState, Children, isValidElement, ReactElement } from 'react';

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
  // Accordion components
  Accordion: ({ 
    title, 
    icon, 
    children, 
    className 
  }: { 
    title: string, 
    icon?: string, 
    children: React.ReactNode,
    className?: string
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className={clsx("border border-border rounded-lg mb-4 overflow-hidden bg-card/50", className)}>
        <button
          className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            {icon && (
              <span className="flex h-6 w-6 items-center justify-center text-primary">
                {icon}
              </span>
            )}
            <h3 className="text-base font-semibold">{title}</h3>
          </div>
          <svg
            className={`h-5 w-5 text-muted-foreground transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className="px-6 py-4 border-t border-border/50">
            {children}
          </div>
        </div>
      </div>
    );
  },
  AccordionGroup: ({ 
    children, 
    className 
  }: { 
    children: React.ReactNode,
    className?: string
  }) => (
    <div className={clsx("my-8 space-y-3", className)}>
      {children}
    </div>
  ),
  // CodeGroup component for tabbed code blocks
  CodeGroup: ({ children, className }: { children: React.ReactNode, className?: string }) => {
    // Extract code blocks and their titles from children
    const codeBlocks: Array<{ title: string; content: ReactElement; language: string }> = [];
    
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === 'pre') {
        // Add type assertion for child.props
        const preProps = child.props as { children: ReactElement };
        const codeElement = preProps.children;
        
        if (isValidElement(codeElement) && codeElement.type === 'code') {
          // Add type assertion for codeElement.props
          const codeProps = codeElement.props as { className?: string };
          const className = codeProps.className || '';
          const match = className.match(/language-([^\s]+)(?:\s+(.+))?/);
          
          if (match) {
            const language = match[1] || 'text';
            const title = match[2] || language;
            
            codeBlocks.push({
              title,
              content: child,
              language
            });
          } else {
            // Fallback if no language specified
            codeBlocks.push({
              title: 'Code',
              content: child,
              language: 'text'
            });
          }
        }
      }
    });
    
    const [activeTab, setActiveTab] = useState(0);
    
    if (codeBlocks.length === 0) {
      return <div className="my-4">No code blocks found</div>;
    }
    
    return (
      <div className={clsx("my-6 overflow-hidden rounded-lg border border-border", className)}>
        {/* Tabs */}
        <div className="flex overflow-x-auto bg-muted/50 border-b border-border">
          {codeBlocks.map((block, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={clsx(
                "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                activeTab === index
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {block.title}
            </button>
          ))}
        </div>
        
        {/* Code content */}
        <div className="relative">
          {codeBlocks.map((block, index) => (
            <div
              key={index}
              className={clsx(
                "transition-opacity duration-200",
                activeTab === index ? "opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"
              )}
            >
              {block.content}
            </div>
          ))}
        </div>
      </div>
    );
  },
  // Frame component for wrapping images and other content
  Frame: ({ 
    children, 
    className 
  }: { 
    children: React.ReactNode, 
    className?: string 
  }) => (
    <div className={clsx(
      "overflow-hidden border border-border rounded-lg my-6 bg-card/50", 
      className
    )}>
      <div className="p-1">
        {children}
      </div>
    </div>
  ),
  // Callout components
  Info: ({ 
    children, 
    className 
  }: { 
    children: React.ReactNode, 
    className?: string 
  }) => (
    <div className={clsx(
      "p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-600 rounded-r-lg my-6",
      className
    )}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>{children}</div>
      </div>
    </div>
  ),
  Tip: ({ 
    children, 
    className 
  }: { 
    children: React.ReactNode, 
    className?: string 
  }) => (
    <div className={clsx(
      "p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/30 dark:border-green-600 rounded-r-lg my-6",
      className
    )}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>{children}</div>
      </div>
    </div>
  ),
  Note: ({ 
    children, 
    className 
  }: { 
    children: React.ReactNode, 
    className?: string 
  }) => (
    <div className={clsx(
      "p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/30 dark:border-purple-600 rounded-r-lg my-6",
      className
    )}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <div>{children}</div>
      </div>
    </div>
  ),
  Warning: ({ 
    children, 
    className 
  }: { 
    children: React.ReactNode, 
    className?: string 
  }) => (
    <div className={clsx(
      "p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-600 rounded-r-lg my-6",
      className
    )}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>{children}</div>
      </div>
    </div>
  ),
  // LaTeX component for mathematical equations
  Latex: ({ 
    children, 
    className 
  }: { 
    children: React.ReactNode, 
    className?: string 
  }) => (
    <div className={clsx(
      "my-4 py-2 px-3 bg-muted/30 rounded-md overflow-x-auto font-mono text-sm",
      className
    )}>
      {/* This is a simple representation of LaTeX. In a real implementation, 
          you would use a library like KaTeX or MathJax to render the equations properly */}
      <code>{children}</code>
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
