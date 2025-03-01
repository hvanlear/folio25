import React from "react";
import Link from "next/link";
import Layout from "../../components/common/Layout";
import { getAllPosts } from "../../utils/markdown";
import { Post } from "../../types";
import AnimateInView from "../../components/ui/AnimateInView";

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
          <AnimateInView animation="fade" delay={0.1}>
            <h1>Blog</h1>
          </AnimateInView>
          
          <div className="post-list">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <AnimateInView 
                  key={post.slug} 
                  animation="slide-up" 
                  delay={0.2 + index * 0.1}
                  threshold={0.1}
                >
                  <div className="post-card">
                    <h3>{post.title}</h3>
                    <p className="post-date">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                    <p>{post.description}</p>
                    <Link href={`/blog/${post.slug}`} className="read-more">
                      Read More
                    </Link>
                  </div>
                </AnimateInView>
              ))
            ) : (
              <AnimateInView animation="fade" delay={0.2}>
                <p>No posts found. Check back soon!</p>
              </AnimateInView>
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