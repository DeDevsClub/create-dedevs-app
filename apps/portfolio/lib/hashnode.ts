import { gql } from 'graphql-request';

export interface HashnodePost {
  _id: string;
  slug: string;
  title: string;
  brief: string;
  content: string;
  coverImage: string;
  dateAdded: string;
  totalReactions: number;
  responseCount: number;
  readingTime: {
    minutes: number;
    text: string;
  };
  author: {
    username: string;
    name: string;
    profilePicture: string;
  };
}

export interface HashnodeResponse {
  publication: {
    posts: {
      edges: Array<{
        node: HashnodePost;
      }>;
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
    };
  };
}

export interface HashnodePostResponse {
  publication: {
    post: HashnodePost;
  };
}

// Publication host for Hashnode blog
const PUBLICATION_HOST = "blog.dedevs.club";

export const hashnodeClient = {
  // Function to fetch all blog posts with pagination
  async getPosts(username: string, page = 10, cursor = ""): Promise<HashnodeResponse> {
    const query = gql`
      query Publication($page: Int!, $cursor: String) {
        publication(host: "${PUBLICATION_HOST}") {
          posts(first: $page, after: $cursor) {
            edges {
              node {
                _id
                slug
                title
                brief
                coverImage
                dateAdded
                totalReactions
                responseCount
                readingTime {
                  minutes
                  text
                }
                author {
                  username
                  name
                  profilePicture
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `;

    try {
      const response = await fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { page, cursor }
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Failed to fetch Hashnode posts:', error);
      throw error;
    }
  },

  // Function to fetch a single blog post by slug
  async getPost(slug: string): Promise<HashnodePostResponse> {
    const query = gql`
      query Publication($slug: String!) {
        publication(host: "${PUBLICATION_HOST}") {
          post(slug: $slug) {
            _id
            slug
            title
            brief
            content {
              html
            }
            coverImage
            dateAdded
            totalReactions
            responseCount
            readingTime {
              minutes
              text
            }
            author {
              username
              name
              profilePicture
            }
          }
        }
      }
    `;

    try {
      const response = await fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { slug }
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Failed to fetch Hashnode post:', error);
      throw error;
    }
  }
};
