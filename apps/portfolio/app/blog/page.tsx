import { BlogCard } from "@/components/blog-card"

export default function BlogPage() {
  const posts = [
    {
      id: "future-of-ai",
      title: "The Future of AI Development",
      excerpt: "Exploring the ethical implications and technological advancements in artificial intelligence.",
      date: "2023-05-15",
      readingTime: "5 min read",
    },
    {
      id: "web3-revolution",
      title: "The Web3 Revolution",
      excerpt: "How blockchain technology is changing the way we think about ownership and digital assets.",
      date: "2023-04-22",
      readingTime: "7 min read",
    },
    {
      id: "cybersecurity-tips",
      title: "Essential Cybersecurity Tips for Developers",
      excerpt: "Practical security measures every developer should implement to protect their applications.",
      date: "2023-03-10",
      readingTime: "6 min read",
    },
    {
      id: "react-performance",
      title: "Optimizing React Performance",
      excerpt: "Advanced techniques to improve the performance of your React applications.",
      date: "2023-02-18",
      readingTime: "8 min read",
    },
  ]

  return (
    <div className="space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-muted-foreground mb-6">
          Thoughts, insights, and tutorials on development, design, and technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}

