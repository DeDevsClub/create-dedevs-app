"use client";

import { useState, useEffect } from "react";
import { BlogCard } from "@/components/blog-card";
import { HashnodePost } from "@/lib/hashnode";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { gql } from "graphql-request";

export default function BlogPage() {
  const [posts, setPosts] = useState<HashnodePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  // Fetch initial posts
  async function fetchPosts() {
    try {
      // First try to fetch from Hashnode API
      const query = gql`
      query Publication {
        publication(host: "blog.dedevs.club") {
            isTeam
            title
            posts(first: 10) {
                edges {
                    node {
                        id
                        slug
                        title
                        brief
                        url
                    }
                }
            }
        }
    }`;
      const response = await fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query
        }),
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log({ data });

      if (data?.data?.publication?.posts) {
        const fetchedPosts = data.data.publication.posts.edges.map((edge: any) => edge.node);
        setPosts(fetchedPosts);
        // Check if pageInfo exists before trying to access it
        if (data.data.publication.posts.pageInfo) {
          setHasNextPage(data.data.publication.posts.pageInfo.hasNextPage);
          setCursor(data.data.publication.posts.pageInfo.endCursor);
        }
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
    fetchPosts();
  }, []);

  // // Load more posts
  const loadMorePosts = async () => {
    if (!hasNextPage || loadingMore) return;

    setLoadingMore(true);
    try {
      const paginationQuery = gql`
        query Publication($after: String) {
            publication(host: "blog.dedevs.club") {
                isTeam
                title
                posts(first: 10, after: $after) {
                    edges {
                        node {
                        id
                        slug
                        title
                        brief
                        url
                        coverImage
                        }
                    }
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                }
            }
        }`;

      const response = await fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: paginationQuery,
          variables: { after: cursor }
        }),
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      const data = await response.json();
      if (data?.data?.publication?.posts) {
        const newPosts = data.data.publication.posts.edges.map((edge: any) => edge.node);
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        if (data.data.publication.posts.pageInfo) {
          setHasNextPage(data.data.publication.posts.pageInfo.hasNextPage);
          setCursor(data.data.publication.posts.pageInfo.endCursor);
        }
      }
    } catch (error) {
      console.error("Error fetching more blog posts:", error);
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-muted-foreground mb-6">
          Thoughts, insights, and tutorials on development, design, and technology.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[180px] w-full rounded-md" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post: HashnodePost) => (
              <BlogCard
                key={post._id || post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.brief}
                date={post.dateAdded}
                readingTime={post.readingTime?.text}
                coverImage={post.coverImage}
              />
            ))}
          </div>

          {hasNextPage && (
            <div className="mt-12 text-center">
              <Button
                onClick={loadMorePosts}
                disabled={loadingMore}
                variant="outline"
                size="lg"
                className="font-medium min-w-[200px]"
              >
                {loadingMore ? "Loading..." : "Load More Posts"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
