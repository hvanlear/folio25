import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-image">
        <Image 
          src={project.image} 
          alt={project.title} 
          width={400} 
          height={250} 
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <Link href={`/portfolio/${project.slug}`} className="project-link">
          View Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard; 