import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  lastUpdated: string;
  author: string;
  tags: string[];
  keywords: string[];
  featured: boolean;
  image?: string;
  content: string;
}

export function getAllBlogPosts(locale: string = 'en'): BlogPost[] {
  const localeDir = path.join(contentDirectory, locale);
  
  if (!fs.existsSync(localeDir)) {
    return [];
  }
  
  const files = fs.readdirSync(localeDir).filter(file => 
    file.endsWith('.md') || file.endsWith('.mdx')
  );
  
  const posts = files.map(file => {
    const filePath = path.join(localeDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const slug = file.replace(/\.(md|mdx)$/, '');
    
    return {
      slug,
      locale,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      lastUpdated: data.lastUpdated || data.date || '',
      author: data.author || 'FIFA 2026 Team',
      tags: data.tags || [],
      keywords: data.keywords || [],
      featured: data.featured || false,
      image: data.image || undefined,
      content
    };
  });
  
  // 按日期排序（最新的在前）
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string, locale: string = 'en'): BlogPost | null {
  const filePath = path.join(contentDirectory, locale, `${slug}.md`);
  const mdxPath = path.join(contentDirectory, locale, `${slug}.mdx`);
  
  let actualPath = '';
  if (fs.existsSync(filePath)) {
    actualPath = filePath;
  } else if (fs.existsSync(mdxPath)) {
    actualPath = mdxPath;
  } else {
    return null;
  }
  
  const fileContent = fs.readFileSync(actualPath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return {
    slug,
    locale,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    lastUpdated: data.lastUpdated || data.date || '',
    author: data.author || 'FIFA 2026 Team',
    tags: data.tags || [],
    keywords: data.keywords || [],
    featured: data.featured || false,
    image: data.image || undefined,
    content
  };
}

export function getFeaturedPosts(locale: string = 'en'): BlogPost[] {
  const allPosts = getAllBlogPosts(locale);
  return allPosts.filter(post => post.featured);
}

export function getPostsByTag(tag: string, locale: string = 'en'): BlogPost[] {
  const allPosts = getAllBlogPosts(locale);
  return allPosts.filter(post => post.tags.includes(tag));
}

export function getAllTags(locale: string = 'en'): string[] {
  const allPosts = getAllBlogPosts(locale);
  const tags = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags);
}
