import React from "react";
import Link from "next/link";
import Layout from "../components/common/Layout";
import { getAllProjects, getAllPosts } from "../utils/markdown";
import { Project, Post } from "../types";
import ProjectCard from "../components/portfolio/ProjectCard";

interface HomePageProps {
  featuredProjects: Project[];
  recentPosts: Post[];
}

const HomePage: React.FC<HomePageProps> = ({
  featuredProjects,
  recentPosts,
}) => {
  return (
    <Layout
      title="My Portfolio & Blog"
      description="Welcome to my personal portfolio and blog where I showcase my work and share my thoughts."
    >
      <section className="hero">
        <div className="container">
          <div className="hero-row flex flex-row justify-between items-center">
            <div className="hero-name font-serif ">
              <span className="hero-welcome">welcome, i&apos;m</span>
              <h1 className="text-display-1">Hunter</h1>
            </div>
            <div className="hero-location flex flex-row gap-6 text-body-xs">
              <div className="hero-location-item flex flex-col text-start">
                <span>RALEIGH</span>
                <span>NORTH CAROLINA</span>
              </div>
              <div className="hero-location-item flex flex-col text-start">
                <span>DEC 25 2025</span>
                <span>12:46 AM</span>
              </div>
            </div>
          </div>

          <div className="hero-meta">
            <div className="social-links">
              <ul className="flex flex-row gap-6">
                <li className="text">hvanlear@gmail.com</li>
                <li>
                  <a href="https://www.linkedin.com/in/huntervanlear/">
                    linkedin
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/huntervanlear/">
                    instagram
                  </a>
                </li>
              </ul>
            </div>
            <div className="hero-roles max-w-40 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="hero-role">DESIGN</span>
                <span className="hero-role">DEVELOPE</span>
                <span className="hero-role">& IT</span>
              </div>
              <span className="hero-role-text text-sm opacity-70">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </span>
              <div className="animate-bounce mt-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="section-footer">
            <Link href="/portfolio" className="btn btn-outline">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="recent-posts">
        <div className="container">
          <h2>Recent Blog Posts</h2>
          <div className="post-list">
            {recentPosts.map((post) => (
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
    </Layout>
  );
};

export async function getStaticProps() {
  const allProjects = getAllProjects();
  const allPosts = getAllPosts();

  const featuredProjects = allProjects
    .filter((project) => project.featured)
    .slice(0, 3);

  const recentPosts = allPosts.slice(0, 3);

  return {
    props: {
      featuredProjects,
      recentPosts,
    },
  };
}

export default HomePage;
