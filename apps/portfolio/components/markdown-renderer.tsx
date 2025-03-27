"use client"

import React, { JSX, useEffect, useRef, useState } from 'react';
import { CodeBlock } from './code-block';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * A component that renders markdown/HTML content safely with enhanced styling and interactions
 */
export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [processedContent, setProcessedContent] = useState<JSX.Element[]>([]);
  
  // Process content to extract code blocks and render them with our CodeBlock component
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Create a temporary div to parse the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    const codeBlocks = tempDiv.querySelectorAll('pre code');
    
    // If no code blocks are found, we don't need special processing
    if (codeBlocks.length === 0) {
      setProcessedContent([]);
      return;
    }
    
    // Extract code blocks and replace them with placeholders
    const codeBlocksData: {code: string; language: string; id: string}[] = [];

    codeBlocks.forEach((codeBlock, index) => {
      const pre = codeBlock.parentElement;
      if (!pre) return;
      
      const placeholder = document.createElement('div');
      const id = `code-block-${index}`;
      placeholder.id = id;
      placeholder.dataset.placeholder = 'true';
      
      const code = codeBlock.textContent || '';
      
      // Get language from class if available
      const languageClass = Array.from(codeBlock.classList).find(c => c.startsWith('language-'));
      let language = languageClass ? languageClass.replace('language-', '') : '';
      console.log({ language });
      // If no language class, try to detect from first line
      if (!language && code) {
        // Get the first line
        const firstLine = code.split('\n')[0].trim();
        console.log({ firstLine });
        
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
            console.log(`Detected ${language} from extension ${ext} in first line`);
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
        // Check for ```language format 
        else if (firstLine.startsWith('```')) {
          const fenceLang = firstLine.slice(3).trim().toLowerCase();
          if (langMap[fenceLang]) {
            detectedLang = langMap[fenceLang];
            console.log({ fenceLang });

          }
        }
        // Fallback with some extension guessing based on first line content
        else {
          // Map file extensions to languages
          const extensionMap: Record<string, string> = {
            '.ts': 'typescript',
            '.js': 'javascript',
            '.json': 'json',
            '.css': 'css',
            '.html': 'html',
            '.py': 'python',
            '.java': 'java', 
            '.sql': 'sql',
            '.md': 'markdown',
            '.tsx': 'tsx',
            '.jsx': 'jsx',
            '.scss': 'scss',
            '.php': 'php',
            '.rb': 'ruby',
            '.go': 'go',
            '.rs': 'rust',
            '.c': 'c',
            '.cpp': 'cpp',
            '.cs': 'csharp',
            '.sh': 'bash',
            '.yml': 'yaml',
            '.yaml': 'yaml'
          };
          
          // Find if the line includes any of our known extensions
          const matchedExtension = Object.keys(extensionMap).find(ext => 
            firstLine.toLowerCase().includes(ext)
          );
          
          if (matchedExtension) {
            detectedLang = extensionMap[matchedExtension];
          } 
          // If no extension match, try to detect based on syntax patterns
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
            
            if (detectedLang) {
              console.log(`Detected ${detectedLang} from code syntax pattern`);
            }
          }
        }

        // Apply the detected language if found
        if (detectedLang) {
          console.log(`Using detected language: ${detectedLang}`);
          language = detectedLang;
        }
      }
      
      // Default to bash if no language is detected
      language = language || 'bash';
      console.log({ code, language, id });
      codeBlocksData.push({ code, language, id });
      
      // Replace the pre element with our placeholder
      pre.parentNode?.replaceChild(placeholder, pre);
    });

    // Split content by code block placeholders
    const htmlParts = tempDiv.innerHTML.split(/<div id="code-block-[0-9]+" data-placeholder="true"><\/div>/);
    
    // Reconstruct content with CodeBlock components
    const elements: JSX.Element[] = [];
    
    htmlParts.forEach((part, index) => {
      if (part) {
        elements.push(
          <div key={`html-${index}`} dangerouslySetInnerHTML={{ __html: part }} />
        );
      }
      
      if (index < codeBlocksData.length) {
        const { code, language, id } = codeBlocksData[index];
        elements.push(
          <CodeBlock
            key={id}
            code={code}
            language={language}
            showCopyButton
            showLanguageBadge
          />
        );
      }
    });
    
    setProcessedContent(elements);
  }, [content]);
  
  // Use effect to enhance remaining content after rendering
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

    // Note: We're not enhancing code blocks anymore as we're using the CodeBlock component

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

    // Enhance images
    const images = container.querySelectorAll('img');
    images.forEach(image => {
      image.classList.add('rounded-lg', 'shadow-md', 'my-8');
      // Add loading lazy for better performance
      image.setAttribute('loading', 'lazy');
    });
  };

  // Apply default styling plus any additional classes
  const baseClass = "prose prose-lg max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:leading-relaxed prose-p:my-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:my-6 prose-li:my-2 prose-img:rounded-lg prose-img:my-8 prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0 prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-4 prose-blockquote:italic dark:prose-invert";
  
  return (
    <div 
      ref={contentRef}
      className={`${baseClass} ${className}`}
    >
      {processedContent.length > 0 ? (
        processedContent
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
}