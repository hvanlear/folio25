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
      <ScrollProgress color="#4ff0b7" position="top" height={3} />

      <ParallaxSection direction="up" speed={0.1}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeroSection />
        </div>
      </ParallaxSection>

      <ParallaxSection direction="up" speed={0.3}>
        <div className="w-full bg-white text-black py-12 md:py-16 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FeaturedProjects projects={featuredProjects} />
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection direction="down" speed={0.5}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <RecentPosts posts={recentPosts} />
        </div>
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
