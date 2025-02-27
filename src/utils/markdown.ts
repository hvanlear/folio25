import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Project, Post } from '../types';

// Get all portfolio projects
export function getAllProjects(): Project[] {
  const projectsDirectory = path.join(process.cwd(), 'src/content/portfolio');
  
  // Check if directory exists
  if (!fs.existsSync(projectsDirectory)) {
    console.warn(`Directory not found: ${projectsDirectory}`);
    return [];
  }
  
  try {
    const filenames = fs.readdirSync(projectsDirectory);
    
    return filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const slug = filename.replace(/\.md$/, '');
        const fullPath = path.join(projectsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          slug,
          title: data.title || 'Untitled Project',
          description: data.description || '',
          date: data.date || new Date().toISOString(),
          tags: data.tags || [],
          image: data.image || '/assets/images/projects/placeholder.jpg',
          featured: data.featured || false,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error(`Error reading projects: ${error}`);
    return [];
  }
}

// Get all blog posts
export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog');
  
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Directory not found: ${postsDirectory}`);
    return [];
  }
  
  try {
    const filenames = fs.readdirSync(postsDirectory);
    
    return filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const slug = filename.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          slug,
          title: data.title || 'Untitled Post',
          description: data.description || '',
          date: data.date || new Date().toISOString(),
          tags: data.tags || [],
          image: data.image || '/assets/images/blog/placeholder.jpg',
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error(`Error reading posts: ${error}`);
    return [];
  }
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project> {
  try {
    const fullPath = path.join(process.cwd(), 'src/content/portfolio', `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Project not found: ${slug}`);
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(content || '');
      
    const contentHtml = processedContent.toString();
    
    return {
      slug,
      title: data.title || 'Untitled Project',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      image: data.image || '/assets/images/projects/placeholder.jpg',
      featured: data.featured || false,
      contentHtml,
    };
  } catch (error) {
    console.error(`Error getting project by slug: ${error}`);
    throw error;
  }
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post> {
  try {
    const fullPath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post not found: ${slug}`);
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(content || '');
      
    const contentHtml = processedContent.toString();
    
    return {
      slug,
      title: data.title || 'Untitled Post',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      image: data.image || '/assets/images/blog/placeholder.jpg',
      contentHtml,
    };
  } catch (error) {
    console.error(`Error getting post by slug: ${error}`);
    throw error;
  }
} 