import React from "react";
import Link from "next/link";
import { Post } from "../../types";

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <section className="recent-posts">
      <div className="container">
        <h2>Recent Blog Posts</h2>
        <div className="post-list">
          {posts.map((post) => (
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
          ))}
        </div>
        <div className="section-footer">
          <Link href="/blog" className="btn btn-outline">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;