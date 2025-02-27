import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../../types';
import { animate, hover } from 'motion';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (!cardRef.current) return;
    
    // Set up hover animation for the card
    hover(cardRef.current, (element) => {
      animate(element, { 
        y: -10,
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }, { 
        duration: 0.3,
        easing: "ease-out" 
      });
      
      return () => {
        animate(element, { 
          y: 0,
          scale: 1,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
        }, { 
          duration: 0.2,
          easing: "ease-out" 
        });
      };
    });
  }, []);
  
  return (
    <div 
      ref={cardRef} 
      className="project-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm transition-all"
    >
      <div className="project-image">
        <Image 
          src={project.image} 
          alt={project.title} 
          width={400} 
          height={250} 
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
      <div className="project-content p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
        <div className="project-tags flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="tag bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
        <Link 
          href={`/portfolio/${project.slug}`} 
          className="project-link inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard; 