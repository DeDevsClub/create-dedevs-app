"use client"

import * as React from "react"
import { Check, Copy, Terminal } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

// Import Prism.js CSS
import 'prismjs/themes/prism-tomorrow.css'
// You can alternatively use the Okaidia theme which works well with dark backgrounds
// import 'prismjs/themes/prism-okaidia.css'

// Import custom synthwave styles
import '@/app/synthwave-prism.css'

interface CodeBlockProps {
  code: string
  language?: string
  // showLineNumbers?: boolean
  className?: string
  // highlightLines?: number[]
  caption?: string
  showCopyButton?: boolean
  showLanguageBadge?: boolean
}

export function CodeBlock({
  code,
  language,
  // showLineNumbers = true,
  className,
  // highlightLines = [],
  caption,
  showCopyButton = true,
  showLanguageBadge = true,
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = React.useState(false)
  const [detectedLanguage, setDetectedLanguage] = React.useState<string | null>(null)
  const [isDetecting, setIsDetecting] = React.useState(!language)
  const preRef = React.useRef<HTMLPreElement>(null)

  const displayLanguage = language || detectedLanguage || 'bash'

  // Function to copy code to clipboard
  const copyToClipboard = React.useCallback(async () => {
    if (!navigator?.clipboard) {  
      console.error("Clipboard not supported")
      return
    }

    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy code: ", error)
    }
  }, [code])

  // Language detection effect
  React.useEffect(() => {
    if (!language && code) {
      setIsDetecting(false);
    }
  }, [code, language]);

  // Syntax highlighting effect
  React.useEffect(() => {
    // Skip if we're still detecting the language
    if (isDetecting) return;
    
    // This effect will run on the client side after hydration
    const highlight = async () => {
      if (typeof window !== "undefined" && preRef.current) {
        const Prism = (await import("prismjs")).default
        
        // Determine which language to use
        const langToUse = language || detectedLanguage || 'bash'
        
        // Import language support based on the language
        try {
          await import(`prismjs/components/prism-${langToUse}`)
        } catch (e) {
          console.warn(`Prism language '${langToUse}' not found, falling back to default`)
        }
        
        // Apply highlighting
        Prism.highlightElement(preRef.current)
      }
    }
    
    highlight()
  }, [code, language, detectedLanguage, isDetecting])

  // Split code into lines for line numbers and line highlighting
  // const codeLines = code.trim().split("\n")
  
  // Get a more user-friendly language name for display
  const getLanguageDisplayName = (lang: string): string => {
    const languageNames: Record<string, string> = {
      'js': 'JavaScript',
      'javascript': 'JavaScript',
      'ts': 'TypeScript',
      'typescript': 'TypeScript',
      'jsx': 'React JSX',
      'tsx': 'React TSX',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'py': 'Python',
      'python': 'Python',
      'java': 'Java',
      'c': 'C',
      'cpp': 'C++',
      'csharp': 'C#',
      'go': 'Go',
      'rust': 'Rust',
      'php': 'PHP',
      'ruby': 'Ruby',
      'swift': 'Swift',
      'kotlin': 'Kotlin',
      'sql': 'SQL',
      'json': 'JSON',
      'yaml': 'YAML',
      'yml': 'YAML',
      'markdown': 'Markdown',
      'md': 'Markdown',
      'bash': 'Bash',
      'shell': 'Shell',
      'powershell': 'PowerShell',
      'text': 'Plain Text',
    }
    
    return languageNames[lang] || lang.toUpperCase()
  }
  
  return (
    <div className={cn(
      "relative my-6 rounded-lg border border-purple-800 synthwave-code-block",
      "bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900",
      "shadow-[0_0_15px_rgba(191,89,255,0.3)]",
      className
    )}>
      {/* Grid overlay for synthwave effect */}
      <div className="absolute inset-0 rounded-lg opacity-10 pointer-events-none synthwave-grid"></div>
      
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-800 bg-black/40 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-pink-500" />
          {showLanguageBadge && (
            <Badge 
              variant="outline" 
              className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 synthwave-glow border-purple-700"
            >
              {isDetecting ? 'Detecting...' : getLanguageDisplayName(language || 'bash')}
              {!language && detectedLanguage && !isDetecting && (
                <span className="ml-1 text-xs opacity-70">(detected)</span>
              )}
            </Badge>
          )}
        </div>
        {showCopyButton && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-cyan-400 hover:text-cyan-300 hover:bg-purple-900/30 transition-colors"
                  onClick={copyToClipboard}
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 synthwave-glow-cyan" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {isCopied ? "Copied" : "Copy code"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 border-purple-800 text-cyan-400">
                {isCopied ? "Copied!" : "Copy code"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="relative overflow-auto">
        {/* {showLineNumbers && (
          <div 
            aria-hidden="true"
            className="absolute left-0 top-0 flex flex-col items-end border-r border-purple-800/50 px-3 py-4 text-sm text-purple-400 select-none bg-black/20 mr-12"
          >
            {codeLines.map((_, i) => (
              <div key={i} className="leading-relaxed">
                {i + 1}
              </div>
            ))}
          </div>
        )} */}
        <pre
          ref={preRef}
          className={cn(
            "p-4 text-sm leading-relaxed bg-transparent",
            // showLineNumbers && "pl-12",
            isDetecting && "opacity-70"
          )}
        >
          <code className={`language-${displayLanguage}`}>{code}</code>
        </pre>
      </div>
      {caption && (
        <div className="border-t border-purple-800/50 px-4 py-2 text-center text-xs text-purple-300 bg-black/30">
          {caption}
        </div>
      )}
    </div>
  )
}
