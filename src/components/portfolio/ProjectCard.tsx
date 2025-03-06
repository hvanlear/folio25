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
      className="project-card max-w-7xl mx-auto mb-8 text-black dark:text-black"
    >
      <div className="grid grid-cols-12 gap-y-2">
        {/* First row: Headers */}
        <div className="col-span-3 text-sm text-gray-600 font-medium mt-4">
          PROJECT NO
        </div>
        <div className="col-start-5 col-span-3 text-sm text-gray-600 font-medium mt-4 ml-8">
          TECHNOLOGIES
        </div>
        <div className="col-start-9 col-span-2 text-sm text-gray-600 font-medium mt-4">
          CLIENT
        </div>
        <div className="col-start-12 col-span-1 text-sm text-gray-600 font-medium mt-4">
          LINKS
        </div>

        {/* Second row: Values */}
        <div className="col-span-3 text-3xl sm:text-4xl md:text-5xl font-bold mt-4">
          01/06
        </div>
        <div className="col-start-5 col-span-3 flex flex-col space-y-1 mt-4 ml-8">
          {project.tags.map((tag) => (
            <span key={tag} className="text-sm sm:text-base">
              {tag}
            </span>
          ))}
        </div>
        <div className="col-start-9 col-span-2 text-sm sm:text-base mt-4">
          Self
        </div>
        <div className="col-start-12 col-span-1 flex flex-col space-y-1 mt-4">
          <Link
            href={project.github || "#"}
            className="text-sm sm:text-base hover:opacity-70 flex items-center gap-1"
          >
            <Icons.Github className="h-4 w-4" />
            Github
          </Link>
          <Link
            href={project.demo || "#"}
            className="text-sm sm:text-base hover:opacity-70 flex items-center gap-1"
          >
            <Icons.Demo className="h-4 w-4" />
            Demo
          </Link>
        </div>

        <div className="col-span-12 sm:col-span-4 md:mb-0 mt-8">
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

        {/* Description column - starts from column 6 */}
        <div className="col-span-12 sm:col-span-7 flex flex-col ml-8 mt-8">
          <div className="col-span-12 sm:col-span-7 text-3xl sm:text-4xl md:text-5xl  font-bold mb-4">
            {project.title}
          </div>
          <div className=" flex flex-col gap-4">
            <span className="text-sm">INFO</span>
            <div className=" col-span-3 ">
              <div className="text-base sm:text-lg">
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
              <Link href={`/portfolio/${project.slug}`}>Keep reading</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
