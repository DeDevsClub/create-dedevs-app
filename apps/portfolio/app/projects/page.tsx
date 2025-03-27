"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const projects = [
    {
      id: "neural-network",
      title: "Neural Network Visualizer",
      description: "Interactive visualization of neural networks with real-time data processing and node connections.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "D3.js", "TensorFlow.js"],
      category: "ai",
    },
    {
      id: "crypto-dashboard",
      title: "Crypto Dashboard",
      description: "Real-time cryptocurrency tracking dashboard with customizable widgets and alerts.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "WebSockets", "Chart.js"],
      category: "web",
    },
    {
      id: "ai-chatbot",
      title: "AI Chatbot",
      description: "Conversational AI assistant with natural language processing and machine learning capabilities.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Python", "NLP", "TensorFlow"],
      category: "ai",
    },
    {
      id: "blockchain-explorer",
      title: "Blockchain Explorer",
      description: "Tool for visualizing and exploring blockchain transactions and smart contracts.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Ethers.js", "GraphQL"],
      category: "blockchain",
    },
    {
      id: "data-visualization",
      title: "Data Visualization Platform",
      description: "Interactive platform for creating and sharing data visualizations and insights.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["D3.js", "React", "Node.js"],
      category: "data",
    },
    {
      id: "ar-navigation",
      title: "AR Navigation System",
      description: "Augmented reality navigation system for indoor and outdoor environments.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Unity", "ARKit", "C#"],
      category: "ar",
    },
  ]

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development" },
    { id: "ai", name: "AI & Machine Learning" },
    { id: "blockchain", name: "Blockchain" },
    { id: "data", name: "Data Visualization" },
    { id: "ar", name: "AR/VR" },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <div className="space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Projects</h1>
        <p className="text-muted-foreground mb-6">
          Browse my portfolio of projects across various technologies and domains.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeFilter === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            technologies={project.technologies}
          />
        ))}
      </div>
    </div>
  )
}

