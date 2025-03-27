"use client"

import { useState } from "react"
import Link from "next/link"
import { TypingEffect } from "@/components/typing-effect"
import { ProjectCard } from "@/components/project-card"
import { BlogCard } from "@/components/blog-card"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  const featuredProjects = [
    {
      id: "neural-network",
      title: "Neural Network Visualizer",
      description: "Interactive visualization of neural networks with real-time data processing and node connections.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "D3.js", "TensorFlow.js"],
    },
    {
      id: "crypto-dashboard",
      title: "Crypto Dashboard",
      description: "Real-time cryptocurrency tracking dashboard with customizable widgets and alerts.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "WebSockets", "Chart.js"],
    },
    {
      id: "ai-chatbot",
      title: "AI Chatbot",
      description: "Conversational AI assistant with natural language processing and machine learning capabilities.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Python", "NLP", "TensorFlow"],
    },
  ]

  const latestPosts = [
    {
      id: "future-of-ai",
      title: "The Future of AI Development",
      excerpt: "Exploring the ethical implications and technological advancements in artificial intelligence.",
      date: "2023-05-15",
      readingTime: "5 min read",
    },
  ]

  const skills = ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "TensorFlow", "AWS"]

  return (
    <div className="space-y-16 py-8">
      <section className="max-w-3xl mx-auto text-center">
        <Card className="bg-muted/40">
          <CardContent className="pt-6">
            <TypingEffect
              text="Hello, I'm a full-stack developer and AI enthusiast. Welcome to my portfolio."
              typingSpeed={40}
              className="text-lg md:text-xl"
              onComplete={() => setIntroComplete(true)}
            />

            {introComplete && (
              <div className="mt-8">
                <Button asChild>
                  <Link href="/about" className="inline-flex items-center gap-2">
                    Learn more about me <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-muted-foreground hover:text-primary inline-flex items-center gap-1"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Skills</h2>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Technical Expertise</h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Latest from the Blog</h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground hover:text-primary inline-flex items-center gap-1"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </section>
    </div>
  )
}

