import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Project, Post } from '../types';

// Get all portfolio projects
export function getAllProjects(): Project[] {
  const projectsDirectory = path.join(process.cwd(), 'src/content/portfolio');
  const filenames = fs.readdirSync(projectsDirectory);
  
  return filenames.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      image: data.image,
      featured: data.featured || false,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get all blog posts
export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      image: data.image,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project> {
  const fullPath = path.join(process.cwd(), 'src/content/portfolio', `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark()
    .use(html)
    .process(content);
    
  const contentHtml = processedContent.toString();
  
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    image: data.image,
    featured: data.featured || false,
    contentHtml,
  };
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark()
    .use(html)
    .process(content);
    
  const contentHtml = processedContent.toString();
  
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    image: data.image,
    contentHtml,
  };
} 