import * as React from "react"
import NextLink from "next/link"
import { cn } from "@/lib/utils"

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  className?: string
  children: React.ReactNode
  external?: boolean
}

/**
 * A consistent link component that works with both internal and external links
 */
export function Link({
  href,
  className,
  children,
  external = false,
  ...props
}: LinkProps) {
  const isExternal = external || href.startsWith("http") || href.startsWith("mailto:")

  if (isExternal) {
    return (
      <a 
        href={href}
        className={cn("underline-offset-4 hover:underline", className)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <NextLink
      href={href}
      className={cn("underline-offset-4 hover:underline", className)}
      {...props}
    >
      {children}
    </NextLink>
  )
}
