import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "../../types";
import { inView } from "motion";
import { Icons } from "../ui/Icons";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const cleanup = inView(
      cardRef.current,
      (element) => {
        element.classList.add("animate");
      },
      {
        amount: 0.2,
      }
    );

    return () => cleanup();
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card max-w-7xl mx-auto text-black dark:text-black"
    >
      <div className="grid grid-cols-12 gap-y-4">
        {/* Project Number Section */}
        <div className="col-span-6 md:col-span-3 flex flex-col">
          <div className="project-card-header text-xs uppercase tracking-wider text-gray-500 font-medium mt-2">
            PROJECT NO
          </div>
          <div className="project-card-header-value text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
            01/06
          </div>
        </div>

        {/* Technologies Section */}
        <div className="col-span-6 md:col-span-3 md:col-start-5 flex flex-col">
          <div className="project-card-header text-xs uppercase tracking-wider text-gray-500 font-medium mt-2 md:ml-8">
            TECHNOLOGIES
          </div>
          <div className="project-card-header-value flex flex-col space-y-1 mt-2 md:ml-8">
            {project.tags.map((tag) => (
              <span key={tag} className="text-sm sm:text-base">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Client Section */}
        <div className="col-span-6 md:col-span-2 md:col-start-9 flex flex-col">
          <div className="project-card-header text-xs uppercase tracking-wider text-gray-500 font-medium mt-2">
            CLIENT
          </div>
          <div className="project-card-header-value text-sm sm:text-base mt-2">
            Self
          </div>
        </div>

        {/* Links Section */}
        <div className="col-span-6 md:col-span-1 md:col-start-12 flex flex-col">
          <div className="project-card-header text-xs uppercase tracking-wider text-gray-500 font-medium mt-2">
            LINKS
          </div>
          <div className="project-card-header-value flex flex-col space-y-2 mt-2">
            <Link
              href={project.github || "#"}
              className="text-sm hover:opacity-70 flex items-center gap-1.5 transition-all"
            >
              <Icons.Github className="h-4 w-4" />
              Github
            </Link>
            <Link
              href={project.demo || "#"}
              className="text-sm hover:opacity-70 flex items-center gap-1.5 transition-all"
            >
              <Icons.Demo className="h-4 w-4" />
              Demo
            </Link>
          </div>
        </div>

        {/* Content section */}
        <div className="col-span-12 sm:col-span-4 mt-12">
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                Image placeholder
              </div>
            )}
          </div>
        </div>

        {/* Description column */}
        <div className="col-span-12 sm:col-span-7 flex flex-col ml-8 mt-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-left">
            {project.title}
          </h2>
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-wider text-gray-500">
              INFO
            </span>
            <div className="col-span-3">
              <div className="text-base sm:text-lg leading-relaxed text-left">
                {Array.isArray(project.description) ? (
                  project.description.map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p>{project.description}</p>
                )}
              </div>
              <Link
                href={`/portfolio/${project.slug}`}
                className="inline-block mt-4 text-sm font-medium hover:opacity-70 transition-all"
              >
                Keep reading
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
