"use client"

import { notFound, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { HashnodePost } from "@/lib/hashnode"
import { gql } from "graphql-request"
import { MarkdownRenderer } from "@/components/markdown-renderer"

// Replace with your Hashnode username
const HASHNODE_USERNAME = "0xbuns";

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

interface HashnodePostResponse {
  key: string;
  slug: string;
  title: string;
  brief?: string;
  content?: {
    markdown?: string;
    html?: string;
  };
  dateAdded?: string;
  readingTime?: {
    text: string;
    minutes: number;
  };
  coverImage?: string;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  console.log({ slug })
  const [post, setPost] = useState<HashnodePost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  // Fetch initial posts
  async function fetchPost(slug: string) {
    try {
      // First try to fetch from Hashnode API
      const query = gql`
      query Publication {
          publication(host: "blog.dedevs.club") {
              isTeam
              title
              post(slug: "${slug}") {
                  title
                  content {
                      markdown
                      html
                  }
              }
          }
      }`;
      const variables = { slug: slug }
      const response = await fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables
        }),
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log({ data });

      if (data?.data?.publication?.post) {
        const fetchedPost = data.data.publication.post as HashnodePostResponse;
        setPost({
          _id: fetchedPost.key || slug,
          slug: slug,
          title: fetchedPost.title || 'Untitled Post',
          brief: fetchedPost.brief || '',
          content: fetchedPost.content?.html || '',
          dateAdded: fetchedPost.dateAdded || new Date().toISOString(),
          coverImage: fetchedPost.coverImage || '',
          totalReactions: 0,
          responseCount: 0,
          readingTime: fetchedPost.readingTime || { text: '5 min read', minutes: 5 },
          author: {
            username: HASHNODE_USERNAME,
            name: "Author",
            profilePicture: ""
          }
        });
        console.log({ post })
        setLoading(false);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching blog post:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPost(slug);
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return notFound();
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
              <time dateTime={post.dateAdded || ''}>
                {post.dateAdded ? new Date(post.dateAdded).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'No date available'}
              </time>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime.text}</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.coverImage && (
          <div className="my-8 rounded-lg overflow-hidden shadow-lg">
            <img
              key={post._id}
              src={post.coverImage}
              alt={`Featured image for ${post.title}`}
              className="w-full object-cover h-[400px]"
            />
          </div>
        )}

        {/* Article content with optimized typography */}
        <MarkdownRenderer content={post.content} />

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