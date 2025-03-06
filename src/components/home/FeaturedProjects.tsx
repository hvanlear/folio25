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
    <section className="featured-projects relative py-16">
      <div>
        <AnimateInView animation="fade" delay={0.1}>
          {/* <h2 className="ext-display-1 font-bold mb-8 text-left text-inherit">
            Featured
          </h2> */}
          <div className="featured-projects-title">
            <span className="hero-welcome block text-sm mb-2 text-gray-500 uppercase tracking-wider">
              here&apos;s some featured
            </span>
            <h1 className="text-display-1 font-bold">Work</h1>
          </div>
        </AnimateInView>
        <div className="space-y-24">
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
          <div className="section-footer mt-16 text-center">
            <Link
              href="/portfolio"
              className="btn btn-outline inline-block px-6 py-3 border border-current rounded-md hover:opacity-80 transition-opacity"
            >
              View All Projects
            </Link>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default FeaturedProjects;
