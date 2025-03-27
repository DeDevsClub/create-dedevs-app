"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { RocketIcon, HashIcon, BookOpenIcon } from 'lucide-react'
import Link from 'next/link'

interface HeadingProps {
  id?: string
  children: React.ReactNode
  className?: string
}

/**
 * Custom heading components with anchor links and styling
 */

export function H1({ id, children, className }: HeadingProps) {
  return (
    <h1 
      id={id} 
      className={cn(
        "mt-16 mb-6 text-4xl font-bold tracking-tight text-foreground scroll-m-20",
        "bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent",
        className
      )}
    >
      {id && (
        <a 
          href={`#${id}`} 
          className="absolute -ml-8 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Link to ${id}`}
        >
          <HashIcon className="h-5 w-5 text-muted-foreground" />
        </a>
      )}
      <RocketIcon className="inline-block mr-2 mb-1 h-7 w-7 text-primary/80" />
      {children}
    </h1>
  )
}

export function H2({ id, children, className }: HeadingProps) {
  return (
    <h2 
      id={id} 
      className={cn(
        "group relative mt-12 mb-4 text-3xl font-semibold tracking-tight scroll-m-20", 
        className
      )}
    >
      {id && (
        <a 
          href={`#${id}`} 
          className="absolute -ml-6 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Link to ${id}`}
        >
          <HashIcon className="h-4 w-4 text-muted-foreground" />
        </a>
      )}
      <span className="border-b-2 border-primary/40 pb-1">{children}</span>
    </h2>
  )
}

export function H3({ id, children, className }: HeadingProps) {
  return (
    <h3 
      id={id} 
      className={cn(
        "group relative mt-8 mb-3 text-2xl font-medium tracking-tight scroll-m-20",
        className
      )}
    >
      {id && (
        <a 
          href={`#${id}`} 
          className="absolute -ml-5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Link to ${id}`}
        >
          <HashIcon className="h-4 w-4 text-muted-foreground" />
        </a>
      )}
      <BookOpenIcon className="inline-block mr-1 mb-1 h-5 w-5 text-primary/70" />
      {children}
    </h3>
  )
}

export function H4({ id, children, className }: HeadingProps) {
  return (
    <h4 
      id={id} 
      className={cn(
        "group relative mt-6 mb-2 text-xl font-medium tracking-tight scroll-m-20",
        className
      )}
    >
      {id && (
        <a 
          href={`#${id}`} 
          className="absolute -ml-5 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Link to ${id}`}
        >
          <HashIcon className="h-3.5 w-3.5 text-muted-foreground" />
        </a>
      )}
      <span className="text-primary/90">→</span> {children}
    </h4>
  )
}

export function H5({ id, children, className }: HeadingProps) {
  return (
    <h5 
      id={id} 
      className={cn(
        "group relative mt-4 mb-2 text-lg font-medium tracking-tight scroll-m-20",
        className
      )}
    >
      {id && (
        <a 
          href={`#${id}`} 
          className="absolute -ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Link to ${id}`}
        >
          <HashIcon className="h-3 w-3 text-muted-foreground" />
        </a>
      )}
      <span className="text-primary/80">•</span> {children}
    </h5>
  )
}

export function H6({ id, children, className }: HeadingProps) {
  return (
    <h6 
      id={id} 
      className={cn(
        "group relative mt-4 mb-2 text-base font-medium tracking-tight text-muted-foreground scroll-m-20",
        className
      )}
    >
      {id && (
        <a 
          href={`#${id}`} 
          className="absolute -ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Link to ${id}`}
        >
          <HashIcon className="h-3 w-3 text-muted-foreground" />
        </a>
      )}
      {children}
    </h6>
  )
}

/**
 * Table of contents component for blog posts
 */
export interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
  activeId?: string
  className?: string
}

export function TableOfContents({ items, activeId, className }: TableOfContentsProps) {
  return (
    <div className={cn("border rounded-lg p-4 mb-6", className)}>
      <h4 className="text-sm font-semibold mb-3 text-foreground">Table of Contents</h4>
      <nav>
        <ul className="space-y-1 text-sm">
          {items.map((item) => (
            <li 
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
            >
              <a
                href={`#${item.id}`}
                className={cn(
                  "block py-1 text-muted-foreground hover:text-foreground transition-colors",
                  activeId === item.id && "text-primary font-medium"
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

/**
 * Applies styled headings to a rendered markdown content
 * This injects CSS that will style the markdown headings
 */
export function ApplyHeadingStyles() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Add CSS to style markdown headings
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Heading 1 styles */
      .markdown-content h1 {
        position: relative;
        margin-top: 4rem;
        margin-bottom: 1.5rem;
        font-size: 2.25rem;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: -0.025em;
        scroll-margin-top: 5rem;
        background: linear-gradient(to bottom right, var(--foreground), var(--foreground-70));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .markdown-content h1:before {
        content: "";
        display: inline-block;
        width: 1.75rem;
        height: 1.75rem;
        margin-right: 0.5rem;
        margin-bottom: 0.25rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 2L9 15M21 15.9V9h-7M4.9 4H9v4.1M21 16H16v-5M12 8l-7 7M15 6l-3.5-3.5M3 3l18 18'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        opacity: 0.8;
        vertical-align: middle;
      }
      
      /* Heading 2 styles */
      .markdown-content h2 {
        position: relative;
        margin-top: 3rem;
        margin-bottom: 1rem;
        font-size: 1.875rem;
        font-weight: 600;
        line-height: 1.3;
        scroll-margin-top: 5rem;
        border-bottom: 2px solid rgba(var(--primary), 0.4);
        padding-bottom: 0.25rem;
      }
      
      /* Heading 3 styles */
      .markdown-content h3 {
        position: relative;
        margin-top: 2rem;
        margin-bottom: 0.75rem;
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.4;
        scroll-margin-top: 5rem;
      }
      
      .markdown-content h3:before {
        content: "";
        display: inline-block;
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 0.25rem;
        margin-bottom: 0.25rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'/%3E%3Cpath d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        opacity: 0.7;
        vertical-align: middle;
      }
      
      /* Heading 4 styles */
      .markdown-content h4 {
        position: relative;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 1.5;
        scroll-margin-top: 5rem;
      }
      
      .markdown-content h4:before {
        content: "→";
        display: inline-block;
        margin-right: 0.25rem;
        color: rgba(var(--primary), 0.9);
      }
      
      /* Heading 5 styles */
      .markdown-content h5 {
        position: relative;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        font-size: 1.125rem;
        font-weight: 500;
        line-height: 1.5;
        scroll-margin-top: 5rem;
      }
      
      .markdown-content h5:before {
        content: "•";
        display: inline-block;
        margin-right: 0.25rem;
        color: rgba(var(--primary), 0.8);
      }
      
      /* Heading 6 styles */
      .markdown-content h6 {
        position: relative;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.5;
        color: var(--muted-foreground);
        scroll-margin-top: 5rem;
      }
      
      /* Anchor links */
      .markdown-content h1 .anchor-link,
      .markdown-content h2 .anchor-link,
      .markdown-content h3 .anchor-link,
      .markdown-content h4 .anchor-link,
      .markdown-content h5 .anchor-link,
      .markdown-content h6 .anchor-link {
        position: absolute;
        left: -1.5rem;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
        transition: opacity 0.2s;
        color: var(--muted-foreground);
      }
      
      .markdown-content h1:hover .anchor-link,
      .markdown-content h2:hover .anchor-link,
      .markdown-content h3:hover .anchor-link,
      .markdown-content h4:hover .anchor-link,
      .markdown-content h5:hover .anchor-link,
      .markdown-content h6:hover .anchor-link {
        opacity: 1;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    // Function to add anchor links to headings
    const addAnchorLinks = () => {
      document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6').forEach(heading => {
        if (!heading.id || heading.querySelector('.anchor-link')) return;
        
        const anchor = document.createElement('a');
        anchor.className = 'anchor-link';
        anchor.href = `#${heading.id}`;
        anchor.setAttribute('aria-label', `Link to ${heading.textContent}`);
        anchor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`;
        
        heading.insertBefore(anchor, heading.firstChild);
      });
    };
    
    // Initial application and set up mutation observer
    const observer = new MutationObserver((mutations) => {
      addAnchorLinks();
    });
    
    // Start observing
    const markdownContent = document.querySelector('.markdown-content');
    if (markdownContent) {
      addAnchorLinks();
      observer.observe(markdownContent, { 
        childList: true, 
        subtree: true 
      });
    }
    
    return () => {
      document.head.removeChild(styleElement);
      observer.disconnect();
    };
  }, []);
  
  return null;
}
