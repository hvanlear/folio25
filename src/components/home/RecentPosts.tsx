import React from "react";
import Link from "next/link";
import { Post } from "../../types";
import AnimateInView from "../ui/AnimateInView";

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <section className="recent-posts py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimateInView animation="fade" delay={0.1}>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Recent Blog Posts</h2>
        </AnimateInView>
        <div className="post-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <AnimateInView 
              key={post.slug} 
              animation="slide-up" 
              delay={0.2 + index * 0.1}
              threshold={0.1}
            >
              <div className="post-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="post-date text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">{post.description}</p>
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="read-more inline-block text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </AnimateInView>
          ))}
        </div>
        <AnimateInView animation="fade" delay={0.4} threshold={0.2}>
          <div className="section-footer mt-10 text-center">
            <Link 
              href="/blog" 
              className="btn btn-outline inline-block px-6 py-3 border border-current rounded-md hover:opacity-80 transition-opacity"
            >
              View All Posts
            </Link>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default RecentPosts;