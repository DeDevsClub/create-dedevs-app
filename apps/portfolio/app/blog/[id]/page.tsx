"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params
      setId(resolvedParams.id)
    }
    fetchParams()
  }, [params])

  if (!id) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading post...</div>
      </div>
    )
  }

  // This would typically come from an API or database
  const posts = {
    "future-of-ai": {
      title: "The Future of AI Development",
      date: "2023-05-15",
      readingTime: "5 min read",
      image: "/blog/ai-future-hero.jpg",
      content: `
        <p>Artificial Intelligence has come a long way since its inception. From rule-based systems to machine learning algorithms that can learn from data, the field has seen tremendous growth and innovation.</p>
        
        <p>Today, we stand at the precipice of a new era in AI development. Large language models like GPT-4 have demonstrated capabilities that were once thought to be uniquely human, such as creative writing, problem-solving, and even coding.</p>
        
        <h2>Ethical Considerations</h2>
        
        <p>As AI systems become more powerful and integrated into our daily lives, ethical considerations become increasingly important. Questions about bias, fairness, transparency, and accountability need to be addressed.</p>
        
        <p>Developers have a responsibility to ensure that AI systems are designed with ethical principles in mind. This includes being aware of potential biases in training data, ensuring transparency in how AI systems make decisions, and establishing mechanisms for accountability when things go wrong.</p>
        
        <h2>Technological Advancements</h2>
        
        <p>On the technological front, we're seeing advancements in several areas:</p>
        
        <ul>
          <li>Multimodal AI systems that can process and generate different types of data (text, images, audio)</li>
          <li>Reinforcement learning from human feedback (RLHF) to align AI systems with human values</li>
          <li>Federated learning to train models across multiple devices while preserving privacy</li>
          <li>Neuromorphic computing to create more efficient AI hardware</li>
        </ul>
        
        <h2>The Road Ahead</h2>
        
        <p>The future of AI development is both exciting and challenging. As we continue to push the boundaries of what's possible, we must also be mindful of the potential risks and ensure that AI systems are developed and deployed responsibly.</p>
        
        <p>By fostering collaboration between researchers, developers, policymakers, and the public, we can work towards a future where AI benefits humanity while minimizing potential harms.</p>
      `,
    },
  }

  const post = posts[id as keyof typeof posts]

  if (!post) {
    return notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Back button with subtle hover effect */}
      <Link href="/blog" className="inline-block group mb-8">
        <Button variant="ghost" className="pl-0 flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to articles
        </Button>
      </Link>
      
      {/* Article header with clear visual hierarchy */}
      <article>
        <header className="mb-10 border-b pb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </header>
        
        {/* Featured Image */}
        {post.image && (
          <div className="my-8 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={post.image} 
              alt={`Featured image for ${post.title}`}
              className="w-full object-cover h-[400px]"
            />
          </div>
        )}
        
        {/* Article content with optimized typography */}
        <div 
          className="prose prose-lg max-w-none prose-headings:font-semibold 
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-p:leading-relaxed prose-p:my-6
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-ul:my-6 prose-li:my-2
                    dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      
      {/* Related articles or share section could go here */}
      <div className="mt-16 pt-8 border-t">
        <h3 className="text-lg font-medium mb-4">Share this article</h3>
        <div className="flex gap-2">
          {/* Social share buttons would go here */}
          <Button variant="outline" size="sm">Twitter</Button>
          <Button variant="outline" size="sm">LinkedIn</Button>
          <Button variant="outline" size="sm">Copy Link</Button>
        </div>
      </div>
    </div>
  )
}