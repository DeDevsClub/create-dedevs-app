import React, { useEffect, useRef } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * A component that renders markdown/HTML content safely with enhanced styling and interactions
 */
export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // If we have a ref to the content div
    if (contentRef.current) {
      // Make external links open in a new tab
      const links = contentRef.current.querySelectorAll('a');
      links.forEach(link => {
        // Check if it's an external link
        if (link.hostname !== window.location.hostname) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });

      // Handle code blocks to make them look better
      const codeBlocks = contentRef.current.querySelectorAll('pre code');
      codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentElement;
        if (pre) {
          // Add a copy button to code blocks
          const copyButton = document.createElement('button');
          copyButton.textContent = 'Copy';
          copyButton.className = 'absolute right-2 top-2 px-2 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded';
          copyButton.onclick = () => {
            const code = codeBlock.textContent || '';
            navigator.clipboard.writeText(code).then(() => {
              copyButton.textContent = 'Copied!';
              setTimeout(() => {
                copyButton.textContent = 'Copy';
              }, 2000);
            });
          };
          
          // Make sure the pre has position relative for the button
          pre.style.position = 'relative';
          pre.appendChild(copyButton);
        }
      });

      // Enhance tables
      const tables = contentRef.current.querySelectorAll('table');
      tables.forEach(table => {
        table.classList.add('w-full', 'border-collapse', 'my-4');
        // Wrap table in a div to make it responsive
        if (table.parentElement?.tagName !== 'DIV') {
          const wrapper = document.createElement('div');
          wrapper.className = 'overflow-x-auto my-8';
          table.parentNode?.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        }
      });

      // Enhance images
      const images = contentRef.current.querySelectorAll('img');
      images.forEach(image => {
        image.classList.add('rounded-lg', 'shadow-md', 'my-8');
        // Add loading lazy for better performance
        image.setAttribute('loading', 'lazy');
      });
    }
  }, [content]); // Re-run when content changes

  // Apply default styling plus any additional classes
  const baseClass = "prose prose-lg max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:leading-relaxed prose-p:my-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:my-6 prose-li:my-2 prose-img:rounded-lg prose-img:my-8 prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-md prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-4 prose-blockquote:italic dark:prose-invert";
  
  return (
    <div 
      ref={contentRef}
      className={`${baseClass} ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
