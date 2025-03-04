import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="max-w-7xl mx-auto border-t-2 border-gray-300 mb-8 text-black dark:text-black"
    >
      <div className="grid grid-cols-12 gap-x-4 gap-y-2 mt-4">
        {/* First row: Headers */}
        <div className="col-span-6 sm:col-span-8 text-sm text-gray-600 font-medium">
          PROJECT NO{" "}
        </div>
        <div className="col-span-3 sm:col-span-2 text-sm text-gray-600 font-medium">
          EXPERTISE
        </div>
        <div className="col-span-3 sm:col-span-2 text-sm text-gray-600 font-medium">
          CLIENT
        </div>

        {/* Second row: Values */}
        <div className="col-span-6 sm:col-span-8 text-3xl sm:text-4xl md:text-5xl font-bold mt-4">
          01/06
        </div>
        <div className="col-span-3 sm:col-span-2 flex flex-col space-y-1 mt-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-sm sm:text-base">
              {tag}
            </span>
          ))}
        </div>
        <div className="col-span-3 sm:col-span-2 text-sm sm:text-base mt-4">
          {/* {client} */}
          Self
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
        <div className="col-span-12 sm:col-span-7 flex flex-col ml-4 mt-8">
          <div className="col-span-12 sm:col-span-7 text-3xl sm:text-4xl md:text-5xl  font-bold mb-8">
            {project.title}
          </div>
          <div className="flex gap-4 flex-col">
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
  );
};

export default ProjectCard;
