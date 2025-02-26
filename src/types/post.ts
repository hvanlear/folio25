export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  contentHtml?: string;
} 