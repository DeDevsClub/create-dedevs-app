import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
}

export function ProjectCard({ id, title, description, image, technologies }: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`}>
      <Card className="card-hover h-full flex flex-col overflow-hidden">
        <div className="relative h-48">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 pt-0">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  )
}

