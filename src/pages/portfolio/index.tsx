import React, { useState, useMemo } from "react";
import Layout from "../../components/common/Layout";
import { getAllProjects } from "../../utils/markdown";
import { Project } from "../../types";
import ProjectCard from "../../components/portfolio/ProjectCard";
import AnimateInView from "../../components/ui/AnimateInView";

// Separate components for better organization
const PortfolioHeader = () => (
  <section className="portfolio-header">
    <div className="container">
      <AnimateInView animation="fade" delay={0.1}>
        <h1 className="font-sans">My Portfolio</h1>
        <p>A collection of my recent work and projects</p>
      </AnimateInView>
    </div>
  </section>
);

const FilterButtons = ({
  tags,
  activeFilter,
  onFilterChange,
}: {
  tags: string[];
  activeFilter: string;
  onFilterChange: (tag: string) => void;
}) => (
  <section className="portfolio-filters">
    <div className="container">
      <AnimateInView animation="slide-up" delay={0.2}>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => onFilterChange("all")}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              className={`filter-btn ${activeFilter === tag ? "active" : ""}`}
              onClick={() => onFilterChange(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </AnimateInView>
    </div>
  </section>
);

const ProjectGrid = ({ projects }: { projects: Project[] }) => (
  <div className="project-grid">
    {projects.map((project, index) => (
      <AnimateInView
        key={project.slug}
        animation="slide-up"
        delay={0.3 + index * 0.1}
        threshold={0.1}
      >
        <ProjectCard project={project} />
      </AnimateInView>
    ))}
  </div>
);

const PortfolioPage: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [filter, setFilter] = useState<string>("all");

  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.tags))),
    [projects]
  );

  const filteredProjects = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.tags.includes(filter)),
    [filter, projects]
  );

  return (
    <Layout
      title="My Portfolio"
      description="Explore my projects and work samples"
    >
      <PortfolioHeader />
      <FilterButtons
        tags={allTags}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
      <section className="portfolio-grid">
        <div className="container">
          {filteredProjects.length > 0 ? (
            <ProjectGrid projects={filteredProjects} />
          ) : (
            <AnimateInView animation="fade" delay={0.3}>
              <div className="no-projects">
                <p>No projects found with the selected filter.</p>
              </div>
            </AnimateInView>
          )}
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps = async () => ({
  props: {
    projects: getAllProjects(),
  },
});

export default PortfolioPage;
