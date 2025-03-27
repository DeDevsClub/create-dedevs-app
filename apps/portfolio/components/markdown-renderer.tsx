"use client"

import React, { JSX, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CodeBlock } from './code-block';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DOMPurify from 'isomorphic-dompurify';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * A component that renders markdown content with enhanced styling and code blocks
 */
export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [processedContent, setProcessedContent] = useState<string>(content);

  // Clean the markdown content to prevent XSS attacks
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Clean the markdown content
    const cleanContent = DOMPurify.sanitize(content);
    setProcessedContent(cleanContent);
  }, [content]);
  
  // Apply enhancements to rendered markdown content
  useEffect(() => {
    if (contentRef.current) {
      enhanceContent(contentRef.current);
    }
  }, [processedContent]);
  
  // Apply enhancements to content elements
  const enhanceContent = (container: HTMLElement) => {
    // Make external links open in a new tab
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      // Check if it's an external link
      if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });

    // Enhance tables
    const tables = container.querySelectorAll('table');
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

    // Note: We no longer need to enhance images here as we're using Next.js Image component
  };

  // Custom components for ReactMarkdown
  const components = {
    // Handle code blocks with our custom CodeBlock component
    code: ({ node, inline, className, children, ...props }: any) => {
      // Handle inline code (not blocks)
      if (inline) {
        return <code className={className} {...props}>{children}</code>;
      }
      
      // Get content and check if it's a triple backtick code block
      const code = String(children).replace(/\n$/, '');
      
      // Get language from className
      const match = /language-(\w+)/.exec(className || '');
      let language = match ? match[1] : '';
      
      // Add specific checks for triple backtick code blocks:
      // 1. Check if we have raw markdown content with triple backticks
      const tripleBacktickPattern = /^\s*```[\w]*\s*\n[\s\S]*\n\s*```\s*$/;
      
      // 2. Other heuristics to determine if this is a proper code block:
      // - Multiple lines (common in code blocks)
      // - Function definitions
      // - Common code keywords at the beginning
      const isActualCodeBlock = 
        code.includes('\n') || // Multiple lines (typical of triple backtick blocks)
        /^[a-zA-Z0-9_\-]+\s*\(/.test(code) || // Function calls or definitions
        /^(import|export|class|function|const|let|var|if|for|while)\s/.test(code); // Common code patterns
      
      // 3. When ReactMarkdown already processed code, check for properties that suggest it came from triple backticks
      const hasCodeBlockSignature = 
        className?.includes('language-') || // Has language class assigned by markdown processor
        (props.metastring && props.metastring.trim().length > 0); // Has meta information (only possible with ```)
      
      // Only render as code block if it looks like an actual code block from triple backticks
      if (!(isActualCodeBlock || hasCodeBlockSignature)) {
        // Treat as inline code if it doesn't look like a real code block
        return <code className={className} {...props}>{children}</code>;
      }
      
      // If no language class, try to detect from first line
      if (!language && code) {
        // Get the first line
        const firstLine = code.split('\n')[0].trim();
        
        // Create a comprehensive extension map
        const extensionLanguageMap: Record<string, string> = {
          '.ts': 'typescript',
          '.tsx': 'tsx',
          '.js': 'javascript',
          '.jsx': 'jsx',
          '.py': 'python',
          '.rb': 'ruby',
          '.php': 'php',
          '.java': 'java',
          '.c': 'c',
          '.cpp': 'cpp',
          '.cs': 'csharp',
          '.go': 'go',
          '.rs': 'rust',
          '.html': 'html',
          '.css': 'css',
          '.scss': 'scss',
          '.json': 'json',
          '.md': 'markdown',
          '.sql': 'sql',
          '.sh': 'bash',
          '.yml': 'yaml',
          '.yaml': 'yaml',
          '.xml': 'xml',
          '.swift': 'swift',
          '.kt': 'kotlin',
          '.dart': 'dart',
          '.lua': 'lua',
          '.r': 'r',
          '.pl': 'perl',
          '.hs': 'haskell'
        };
        
        // Check for any extension in the first line
        for (const [ext, lang] of Object.entries(extensionLanguageMap)) {
          if (firstLine.includes(ext)) {
            language = lang;
            break; // Stop after first match
          }
        }
        
        // Check for common language identifiers at the beginning
        // Format like: ```javascript or ```js or #!python or // typescript code
        const langMap: Record<string, string> = {
          'js': 'javascript',
          'ts': 'typescript',
          'javascript': 'javascript',
          'typescript': 'typescript',
          'jsx': 'jsx',
          'tsx': 'tsx',
          'html': 'html',
          'css': 'css',
          'scss': 'scss',
          'python': 'python',
          'py': 'python',
          'ruby': 'ruby',
          'rb': 'ruby',
          'go': 'go',
          'rust': 'rust',
          'rs': 'rust',
          'c': 'c',
          'cpp': 'cpp',
          'c++': 'cpp',
          'cs': 'csharp',
          'csharp': 'csharp',
          'java': 'java',
          'php': 'php',
          'sh': 'bash',
          'bash': 'bash',
          'shell': 'bash',
          'yaml': 'yaml',
          'yml': 'yaml',
          'json': 'json',
          'md': 'markdown',
          'markdown': 'markdown',
          'sql': 'sql',
          'graphql': 'graphql',
          'gql': 'graphql'
        };
        
        // Try to match patterns
        let detectedLang = '';
        
        // Check for shebang (#!)
        if (firstLine.startsWith('#!')) {
          const shebangParts = firstLine.slice(2).trim().split('/');
          const lastPart = shebangParts[shebangParts.length - 1];
          if (langMap[lastPart]) {
            detectedLang = langMap[lastPart];
          }
        } 
        // Check for comment-based hints like // javascript or /* css */
        else if (firstLine.startsWith('//') || firstLine.startsWith('/*')) {
          const commentText = firstLine.replace(/^\/\/\s*|^\/\*\s*|\s*\*\/$/g, '').trim().toLowerCase();
          if (langMap[commentText]) {
            detectedLang = langMap[commentText];
          }
        }
        // Check for ```language format (not needed with ReactMarkdown but kept for compatibility)
        else if (firstLine.startsWith('```')) {
          const fenceLang = firstLine.slice(3).trim().toLowerCase();
          if (langMap[fenceLang]) {
            detectedLang = langMap[fenceLang];
          }
        }
        // If no match yet, try to detect based on syntax patterns
        else {
          // Common code patterns for different languages
          // HTML - starts with tags
          if (firstLine.match(/^\s*</)) {
            detectedLang = 'html';
          }
          // JavaScript/TypeScript - variable declarations, imports, exports, functions
          else if (firstLine.match(/^\s*(.ts|import|export|const|let|var|function|class|interface|type|=>)/)) {
            // Check for TypeScript-specific syntax
            if (firstLine.includes(': ') && (firstLine.includes('interface ') || firstLine.includes('type ') || firstLine.match(/:\s*(string|number|boolean|any|void|unknown|never|\[\]|Record|Map)/))) {
              detectedLang = 'typescript';
            } else {
              detectedLang = 'javascript';
            }
          }
          // Python - imports, defs, classes, indentation
          else if (firstLine.match(/^\s*(import|from|def|class|if __name__|@|\s{4})/)) {
            detectedLang = 'python';
          }
          // Ruby - def, class, require, attr_
          else if (firstLine.match(/^\s*(def|class|module|require|attr_|gem|rails|bundle)/)) {
            detectedLang = 'ruby';
          }
          // Java - imports, class declarations, annotations
          else if (firstLine.match(/^\s*(package|import java|public class|@|void main)/)) {
            detectedLang = 'java';
          }
          // C/C++ - includes, define, typedef, namespace
          else if (firstLine.match(/^\s*(#include|#define|typedef|namespace|void|int|char|struct|template)/)) {
            // Check for more C++-specific syntax
            if (firstLine.includes('::') || firstLine.includes('std::') || firstLine.includes('template')) {
              detectedLang = 'cpp';
            } else {
              detectedLang = 'c';
            }
          }
          // C# - using, namespaces, class, etc.
          else if (firstLine.match(/^\s*(using|namespace|public class|private class|internal|async Task)/)) {
            detectedLang = 'csharp';
          }
          // SQL - SELECT, INSERT, UPDATE, etc.
          else if (firstLine.match(/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|WITH|EXEC)/i)) {
            detectedLang = 'sql';
          }
          // CSS - selectors, properties
          else if (firstLine.match(/^\s*[\.\#\@]?[a-zA-Z0-9_\-]+\s*\{/) || 
                  firstLine.match(/^\s*[a-zA-Z\-]+:\s*[^;]+;/)) {
            detectedLang = 'css';
          }
          // SCSS - nesting, variables
          else if (firstLine.match(/^\s*\$[a-zA-Z0-9_\-]+:/) || 
                  firstLine.includes('@mixin') || 
                  firstLine.includes('@include')) {
            detectedLang = 'scss';
          }
          // PHP
          else if (firstLine.includes('<?php') || firstLine.match(/^\s*<\?/)) {
            detectedLang = 'php';
          }
          // Go
          else if (firstLine.match(/^\s*(package|import|func|type|var|const|go|defer|chan)/)) {
            detectedLang = 'go';
          }
          // Shell/Bash
          else if (firstLine.match(/^\s*(echo|cd|export|source|alias|if \[\[)/)) {
            detectedLang = 'bash';
          }
          // Rust
          else if (firstLine.match(/^\s*(fn|let mut|impl|use|pub|mod|struct|enum|match|crate)/)) {
            detectedLang = 'rust';
          }
          // YAML
          else if (firstLine.match(/^\s*[a-zA-Z0-9_\-]+:\s*.+$/) || 
                  firstLine.match(/^\s*- [a-zA-Z0-9_\-]+:\s*.+$/)) {
            detectedLang = 'yaml';
          }
          // JSON (simple heuristic - starts with { or [)
          else if ((firstLine.trim().startsWith('{') || firstLine.trim().startsWith('[')) &&
                  (firstLine.includes('"') || firstLine.includes(':'))) {
            detectedLang = 'json';
          }
        }

        // Apply the detected language if found
        if (detectedLang) {
          language = detectedLang;
        }
      }
      
      // Default to bash if no language is detected
      language = language || 'bash';
      
      // Return our custom CodeBlock component
      return (
        <CodeBlock
          code={code}
          language={language}
          showCopyButton
          showLanguageBadge
        />
      );
    },
    // Handle images with Next.js Image component
    img: ({ node, src, alt, ...props }: any) => {
      if (!src) return null;
      
      // Check if the URL is valid
      let isValidUrl = false;
      try {
        new URL(src);
        isValidUrl = true;
      } catch (e) {
        // If not a valid URL, it might be a relative path
        // Try to handle it as a relative path if needed
        if (src.startsWith('/')) {
          isValidUrl = true;
        }
      }
      
      // Function to get image dimensions from width/height props or defaults
      const getDimensions = () => {
        const width = props.width ? parseInt(props.width, 10) : 800;
        const height = props.height ? parseInt(props.height, 10) : 500;
        return { width, height };
      };
      
      const { width, height } = getDimensions();
      
      // For valid URLs and paths, use Next.js Image
      if (isValidUrl) {
        return (
          <span className="block relative my-8 rounded-lg overflow-hidden shadow-md">
            <Image 
              src={src} 
              alt={alt || ''}
              width={width}
              height={height}
              className="rounded-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
              priority={false} // Set to true only for hero images
            />
          </span>
        );
      }
      
      // Fallback to regular img tag for other cases
      return <img src={src} alt={alt || ''} {...props} className="rounded-lg shadow-md my-8" />;
    }
  };

  // Apply default styling plus any additional classes
  const baseClass = "prose prose-lg max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:leading-relaxed prose-p:my-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:my-6 prose-li:my-2 prose-img:rounded-lg prose-img:my-8 prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0 prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-4 prose-blockquote:italic dark:prose-invert";
  
  return (
    <div ref={contentRef} className={`${baseClass} ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}