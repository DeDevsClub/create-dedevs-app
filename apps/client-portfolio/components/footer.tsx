import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github size={18} />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter size={18} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="https://linkedin.com" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin size={18} />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:hello@example.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={18} />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

