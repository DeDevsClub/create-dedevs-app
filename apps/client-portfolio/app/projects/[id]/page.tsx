"use client"

import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()

  // This would typically come from an API or database
  const projects = {
    "neural-network": {
      title: "Neural Network Visualizer",
      description: "Interactive visualization of neural networks with real-time data processing and node connections.",
      image: "/placeholder.svg?height=600&width=800",
      technologies: ["React", "D3.js", "TensorFlow.js"],
      category: "ai",
      github: "https://github.com/example/neural-network",
      demo: "https://neural-network-demo.example.com",
      longDescription:
        "This project provides an interactive visualization of neural networks, allowing users to see how data flows through different layers and nodes. It includes real-time data processing capabilities and visualizes node connections dynamically. The tool is useful for educational purposes and for developers working with neural networks who want to better understand their architecture and behavior.",
    },
    "crypto-dashboard": {
      title: "Crypto Dashboard",
      description: "Real-time cryptocurrency tracking dashboard with customizable widgets and alerts.",
      image: "/placeholder.svg?height=600&width=800",
      technologies: ["Next.js", "WebSockets", "Chart.js"],
      category: "web",
      github: "https://github.com/example/crypto-dashboard",
      demo: "https://crypto-dashboard.example.com",
      longDescription:
        "A comprehensive cryptocurrency tracking dashboard that provides real-time data on various cryptocurrencies. Users can customize their dashboard with widgets for different coins, set price alerts, and view historical data through interactive charts. The application uses WebSockets to ensure data is always up-to-date without requiring page refreshes.",
    },
    "ai-chatbot": {
      title: "AI Chatbot",
      description: "Conversational AI assistant with natural language processing and machine learning capabilities.",
      image: "/placeholder.svg?height=600&width=800",
      technologies: ["Python", "NLP", "TensorFlow"],
      category: "ai",
      github: "https://github.com/example/ai-chatbot",
      demo: "https://ai-chatbot.example.com",
      longDescription:
        "An advanced conversational AI assistant that uses natural language processing and machine learning to understand and respond to user queries. The chatbot can be trained on specific domains and continuously improves its responses based on user interactions. It includes features like context awareness, sentiment analysis, and multi-language support.",
    },
    "blockchain-explorer": {
      title: "Blockchain Explorer",
      description: "Tool for visualizing and exploring blockchain transactions and smart contracts.",
      image: "/placeholder.svg?height=600&width=800",
      technologies: ["React", "Ethers.js", "GraphQL"],
      category: "blockchain",
      github: "https://github.com/example/blockchain-explorer",
      demo: "https://blockchain-explorer.example.com",
      longDescription:
        "A comprehensive tool for exploring and visualizing blockchain transactions and smart contracts. Users can search for specific transactions, view detailed information about blocks and addresses, and analyze smart contract code. The explorer supports multiple blockchain networks and provides real-time updates on new transactions and blocks.",
    },
  }

  const project = projects[id as keyof typeof projects]

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-8 py-8">
      <Button variant="ghost" asChild className="pl-0 mb-4">
        <Link href="/projects" className="inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to projects
        </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="relative h-80 rounded-lg overflow-hidden">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
      </div>

      <div className="flex flex-wrap gap-4">
        <Button asChild variant="outline">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
            <Github size={16} /> View on GitHub
          </a>
        </Button>
        <Button asChild>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
            <ExternalLink size={16} /> Live Demo
          </a>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Project Overview</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{project.longDescription}</p>
        </CardContent>
      </Card>
    </div>
  )
}

