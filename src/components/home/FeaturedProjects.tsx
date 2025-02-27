import React from "react";
import Link from "next/link";
import ProjectCard from "../portfolio/ProjectCard";
import { Project } from "../../types";

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  return (
    <section className="featured-projects">
      <div className="container">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          {projects.map((project) => (
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
  );
};

export default FeaturedProjects;