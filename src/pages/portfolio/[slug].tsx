import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getAllProjects, getProjectBySlug } from '../../utils/markdown';
import { Project } from '../../types';
import Layout from '../../components/common/Layout';
import ProjectDetail from '../../components/portfolio/ProjectDetail';

interface ProjectPageProps {
  project: Project;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={project.title} description={project.description}>
      <ProjectDetail project={project} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = getAllProjects();
  
  return {
    paths: projects.map(project => ({
      params: { slug: project.slug }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const project = await getProjectBySlug(slug);
  
  return {
    props: {
      project
    }
  };
};

export default ProjectPage; 