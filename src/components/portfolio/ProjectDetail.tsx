import React from 'react';
import Image from 'next/image';
import { Project } from '../../types';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  return (
    <div className="project-detail">
      <div className="project-header">
        <h1>{project.title}</h1>
        <div className="project-meta">
          <span className="project-date">{new Date(project.date).toLocaleDateString()}</span>
          <div className="project-tags">
            {project.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="project-image">
        <Image 
          src={project.image} 
          alt={project.title} 
          width={1200} 
          height={675} 
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
      
      <div className="project-content">
        {project.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
        )}
      </div>
    </div>
  );
};

export default ProjectDetail; 