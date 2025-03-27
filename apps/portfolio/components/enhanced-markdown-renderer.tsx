"use client"

import React, { useEffect, useState, useRef } from 'react';
import { MarkdownRenderer } from './markdown-renderer';
import { TableOfContents, type TocItem, ApplyHeadingStyles } from './headings';
import { cn } from '@/lib/utils';

interface EnhancedMarkdownRendererProps {
  content: string;
  className?: string;
  extractToc?: boolean;
  showToc?: boolean;
}

/**
 * Enhanced Markdown Renderer that processes headings for anchor links
 * and optionally generates a table of contents
 */
export function EnhancedMarkdownRenderer({
  content,
  className = '',
  extractToc = true,
  showToc = true,
}: EnhancedMarkdownRendererProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);
  const markdownRendered = useRef(false);

  // Process headings to extract TOC after markdown is rendered
  useEffect(() => {
    if (typeof window === 'undefined' || !contentRef.current || markdownRendered.current) return;
    
    // Extract headings from the rendered content
    const extractHeadings = () => {
      // Only process the content once the markdown has been rendered
      if (!contentRef.current) return;
      
      // Find all headings in the rendered content
      const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const toc: TocItem[] = [];
      
      // Process each heading
      headings.forEach((heading) => {
        // Get heading text
        const text = heading.textContent || '';
        
        // Generate ID from text (slugify)
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        
        // Add id attribute to heading
        heading.id = id;
        
        // Add to TOC items
        if (extractToc) {
          toc.push({
            id,
            text,
            level: parseInt(heading.tagName.substring(1), 10),
          });
        }
      });
      
      // Update TOC items
      if (extractToc) {
        setTocItems(toc);
      }
      
      markdownRendered.current = true;
    };
    
    // Use MutationObserver to detect when markdown is rendered
    const observer = new MutationObserver((mutations) => {
      extractHeadings();
    });
    
    observer.observe(contentRef.current, {
      childList: true,
      subtree: true
    });
    
    // Initial check in case content is already rendered
    extractHeadings();
    
    return () => {
      observer.disconnect();
    };
  }, [extractToc]);

  // Set up intersection observer for headings
  useEffect(() => {
    if (typeof window === 'undefined' || !contentRef.current || tocItems.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    );
    
    // Observe all headings
    const headingElements = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headingElements.forEach((element) => {
      observer.observe(element);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [tocItems]);

  return (
    <div className={cn("relative", className)}>
      {showToc && tocItems.length > 2 && (
        <div className="lg:fixed lg:right-8 lg:w-56 lg:top-32 p-3 hidden lg:block">
          <TableOfContents items={tocItems} activeId={activeHeading} />
        </div>
      )}
      
      <div 
        ref={contentRef}
        className={cn(
          "w-full mx-auto markdown-content", 
          showToc && tocItems.length > 2 ? "max-w-3xl pr-64" : "max-w-4xl"
        )}
      >
        {/* Mobile TOC (shown at the top for small screens) */}
        {showToc && tocItems.length > 2 && (
          <div className="lg:hidden mb-6">
            <TableOfContents items={tocItems} activeId={activeHeading} />
          </div>
        )}
        
        {/* Apply heading styles for markdown content */}
        <ApplyHeadingStyles />
        
        {/* Use the existing MarkdownRenderer with raw markdown content */}
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
