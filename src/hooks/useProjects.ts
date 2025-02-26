import { useState, useEffect } from 'react';
import { getAllProjects, getProjectBySlug } from '../utils/markdown';
import { Project } from '../types';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const allProjects = getAllProjects();
      setProjects(allProjects);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
      setLoading(false);
    }
  }, []);

  return { projects, loading, error };
};

export const useProject = (slug: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProjectBySlug(slug);
        setProject(projectData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch project'));
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  return { project, loading, error };
}; 