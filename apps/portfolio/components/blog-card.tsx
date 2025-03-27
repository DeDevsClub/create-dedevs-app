import Link from "next/link"
import { CalendarIcon, Clock } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface BlogCardProps {
  title: string
  slug: string
  coverImage?: string
  date?: string
  readingTime?: string
  excerpt?: string
}

export function BlogCard({ title, slug, coverImage, date, readingTime, excerpt }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="card-hover h-full flex flex-col overflow-hidden">
        {coverImage && (
          <div className="h-48 overflow-hidden">
            <img 
              src={coverImage} 
              alt={title}
              className="w-full object-cover h-full transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <CalendarIcon size={12} className="mr-1" />
              {date}
            </div>
            <div className="flex items-center">
              <Clock size={12} className="mr-1" />
              {readingTime}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
