import React from "react";
import Link from "next/link";
import Layout from "../../components/common/Layout";
import { getAllPosts } from "../../utils/markdown";
import { Post } from "../../types";

interface BlogPageProps {
  posts: Post[];
}

const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  return (
    <Layout
      title="Blog"
      description="Read my latest thoughts, tutorials, and insights."
    >
      <section className="blog-section">
        <div className="container">
          <h1>Blog</h1>
          <div className="post-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.slug} className="post-card">
                  <h3>{post.title}</h3>
                  <p className="post-date">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <p>{post.description}</p>
                  <Link href={`/blog/${post.slug}`} className="read-more">
                    Read More
                  </Link>
                </div>
              ))
            ) : (
              <p>No posts found. Check back soon!</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

export default BlogPage;