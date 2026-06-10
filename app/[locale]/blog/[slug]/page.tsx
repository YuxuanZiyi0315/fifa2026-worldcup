import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ShareButtons from './ShareButtons';

interface BlogDetailProps {
  params: {
    locale: string;
    slug: string;
  };
}

export function generateMetadata({ params }: BlogDetailProps): Metadata {
  const { locale, slug } = params;
  const post = getBlogPost(slug, locale);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  const isZh = locale === 'zh';
  
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords?.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastUpdated,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : [],
    },
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        'en': `/en/blog/${slug}`,
        'zh': `/zh/blog/${slug}`,
        'x-default': `/en/blog/${slug}`
      }
    }
  };
}

// 为静态导出生成所有博客文章页面
export function generateStaticParams() {
  const locales = ['en', 'zh'];
  const params: { locale: string; slug: string }[] = [];
  
  locales.forEach(locale => {
    const posts = getAllBlogPosts(locale);
    posts.forEach(post => {
      params.push({
        locale,
        slug: post.slug
      });
    });
  });
  
  return params;
}

export default function BlogDetailPage({ params }: BlogDetailProps) {
  const { locale, slug } = params;
  const post = getBlogPost(slug, locale);
  
  if (!post) {
    notFound();
  }
  
  const isZh = locale === 'zh';
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 文章头部 */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* 面包屑导航 */}
        <nav className="mb-8 text-sm text-gray-500">
          <Link href={`/${locale}`} className="hover:text-blue-600">
            {isZh ? '首页' : 'Home'}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/blog`} className="hover:text-blue-600">
            {isZh ? '博客' : 'Blog'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{post.title}</span>
        </nav>
        
        {/* 文章标题区 */}
        <header className="mb-8">
          {post.featured && (
            <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded mb-4">
              {isZh ? '精选' : 'Featured'}
            </span>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between text-gray-500 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(
                  isZh ? 'zh-CN' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </time>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            
            {post.lastUpdated && post.lastUpdated !== post.date && (
              <div className="text-sm">
                {isZh ? '更新于 ' : 'Updated: '}
                {new Date(post.lastUpdated).toLocaleDateString(
                  isZh ? 'zh-CN' : 'en-US'
                )}
              </div>
            )}
          </div>
        </header>
        
        {/* 特色图片 */}
        {post.image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}
        
        {/* 文章内容 */}
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-blue-600 prose-pre:bg-gray-900">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
        
        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              {isZh ? '标签' : 'Tags'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* 分享按钮 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">
            {isZh ? '分享这篇文章' : 'Share this article'}
          </h3>
          <ShareButtons 
            title={post.title} 
            url={`https://fifa2026.worldtoolx.com/${locale}/blog/${slug}`}
            isZh={isZh}
          />
        </div>
      </article>
      
      {/* 返回博客列表 */}
      <div className="container mx-auto px-4 pb-12 max-w-4xl">
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {isZh ? '返回所有文章' : 'Back to all articles'}
        </Link>
      </div>
    </div>
  );
}

