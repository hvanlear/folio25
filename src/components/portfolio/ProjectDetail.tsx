import React from 'react';
import Image from 'next/image';
import { Project } from '../../types';
import AnimateInView from '../ui/AnimateInView';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  return (
    <div className="project-detail">
      <AnimateInView animation="fade" delay={0.1}>
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
      </AnimateInView>
      
      <AnimateInView animation="scale" delay={0.2}>
        <div className="project-image">
          <Image 
            src={project.image} 
            alt={project.title} 
            width={1200} 
            height={675} 
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>
      </AnimateInView>
      
      <AnimateInView animation="slide-up" delay={0.3} threshold={0.05}>
        <div className="project-content">
          {project.contentHtml && (
            <div dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
          )}
        </div>
      </AnimateInView>
    </div>
  );
};

export default ProjectDetail; 