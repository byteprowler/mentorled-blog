export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publish_date: string;
}