import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import { getAllProjects } from "../../utils/markdown";
import { Project } from "../../types";
import ProjectCard from "../../components/portfolio/ProjectCard";

interface PortfolioPageProps {
  projects: Project[];
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ projects }) => {
  const [filter, setFilter] = useState<string>("all");

  // Get all unique tags from projects
  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags))
  );

  // Filter projects based on selected tag
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.tags.includes(filter));

  return (
    <Layout
      title="My Portfolio"
      description="Explore my projects and work samples"
    >
      <section className="portfolio-header">
        <div className="container">
          <h1 className="font-sans ">My Portfolio</h1>
          <p>A collection of my recent work and projects</p>
        </div>
      </section>

      <section className="portfolio-filters">
        <div className="container">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`filter-btn ${filter === tag ? "active" : ""}`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-grid">
        <div className="container">
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-projects">
              <p>No projects found with the selected filter.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const projects = getAllProjects();

  return {
    props: {
      projects,
    },
  };
}

export default PortfolioPage;
