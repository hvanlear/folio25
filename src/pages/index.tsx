import React from 'react';
import Link from 'next/link';
import Layout from '../components/common/Layout';
import { getAllProjects, getAllPosts } from '../utils/markdown';
import { Project, Post } from '../types';
import ProjectCard from '../components/portfolio/ProjectCard';

interface HomePageProps {
  featuredProjects: Project[];
  recentPosts: Post[];
}

const HomePage: React.FC<HomePageProps> = ({ featuredProjects, recentPosts }) => {
  return (
    <Layout 
      title="My Portfolio & Blog" 
      description="Welcome to my personal portfolio and blog where I showcase my work and share my thoughts."
    >
      <section className="hero">
        <div className="container">
          <span className="hero-welcome">welcome, i&apos;m</span>
          <h1>Hunter</h1>
          <div className="hero-meta">
            <div className="hero-roles">
              <span className="hero-role">DESIGN</span>
              <span className="hero-role">DEVELOPE</span>
              <span className="hero-role">& IT</span>
            </div>
            <div className="hero-location">
              <div>RALEIGH</div>
              <div>NORTH CAROLINA</div>
              <div>12:46 AM</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="featured-projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="project-grid">
            {featuredProjects.map(project => (
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
            {recentPosts.map(post => (
              <div key={post.slug} className="post-card">
                <h3>{post.title}</h3>
                <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
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
    .filter(project => project.featured)
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