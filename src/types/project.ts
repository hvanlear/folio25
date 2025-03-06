export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  featured?: boolean;
  contentHtml?: string;
  github?: string;
  demo?: string;
}
