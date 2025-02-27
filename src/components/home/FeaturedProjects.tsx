import React from "react";
import Link from "next/link";
import ProjectCard from "../portfolio/ProjectCard";
import { Project } from "../../types";
import AnimateInView from "../ui/AnimateInView";

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  return (
    <section className="featured-projects relative">
      <div>
        <AnimateInView animation="fade" delay={0.1}>
          <h2 className="text-display-1 font-bold mb-8 text-left text-inherit">Work</h2>
        </AnimateInView>
        <div className="project-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <AnimateInView
              key={project.slug}
              animation="slide-up"
              delay={0.2 + index * 0.1}
              threshold={0.1}
            >
              <ProjectCard project={project} />
            </AnimateInView>
          ))}
        </div>
        <AnimateInView animation="fade" delay={0.4} threshold={0.2}>
          <div className="section-footer mt-10 text-center">
            <Link
              href="/portfolio"
              className="btn btn-outline inline-block px-6 py-3 border border-current rounded-md hover:opacity-80 transition-opacity"
            >
              View All Projects
            </Link>
          </div>
        </AnimateInView>
      </div>

      {/* Bottom subtle background accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-100 dark:via-blue-900 to-transparent opacity-70"></div>
    </section>
  );
};

export default FeaturedProjects;
