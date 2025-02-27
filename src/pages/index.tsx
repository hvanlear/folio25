"use client";

import React from "react";
import Layout from "../components/common/Layout";
import { getAllProjects, getAllPosts } from "../utils/markdown";
import { Project, Post } from "../types";
import HeroSection from "../components/home/HeroSection";
import FeaturedProjects from "../components/home/FeaturedProjects";
import RecentPosts from "../components/home/RecentPosts";
import ParallaxSection from "../components/effects/ParallaxSection";
import ScrollProgress from "../components/effects/ScrollProgress";

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
      {/* Add scroll progress indicator */}
      <ScrollProgress color="#4ff0b7" position="top" height={3} />

      {/* Main content with parallax effects */}
      <HeroSection />

      <ParallaxSection direction="up" speed={0.3}>
        <FeaturedProjects projects={featuredProjects} />
      </ParallaxSection>

      <ParallaxSection direction="down" speed={0.2}>
        <RecentPosts posts={recentPosts} />
      </ParallaxSection>
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
