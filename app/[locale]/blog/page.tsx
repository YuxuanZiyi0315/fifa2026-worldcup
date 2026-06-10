import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';
import type { Metadata } from 'next';

interface BlogPageProps {
  params: {
    locale: string;
  };
}

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const locale = params.locale;
  const isZh = locale === 'zh';
  
  return {
    title: isZh 
      ? 'FIFA世界杯2026博客 - 最新新闻与分析'
      : 'FIFA World Cup 2026 Blog - Latest News & Analysis',
    description: isZh
      ? '获取FIFA世界杯2026的最新新闻、分析、赛程更新和球队信息。'
      : 'Get the latest news, analysis, schedule updates, and team information for FIFA World Cup 2026.',
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        'en': '/en/blog',
        'zh': '/zh/blog',
        'x-default': '/en/blog'
      }
    }
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const locale = params.locale;
  const isZh = locale === 'zh';
  const posts = getAllBlogPosts(locale);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isZh ? '博客' : 'Blog'}
          </h1>
          <p className="text-xl text-blue-100">
            {isZh 
              ? 'FIFA世界杯2026的最新新闻、分析与洞察'
              : 'Latest news, analysis, and insights for FIFA World Cup 2026'
            }
          </p>
        </div>
      </section>
      
      {/* 博客文章列表 */}
      <section className="container mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {isZh ? '暂无博客文章' : 'No blog posts found.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function BlogCard({ post, locale }: { post: any; locale: string }) {
  const isZh = locale === 'zh';
  
  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        {/* 特色图片 */}
        {post.image && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        {/* 文章内容 */}
        <div className="p-6 flex-1 flex flex-col">
          {/* 标签 */}
          {post.featured && (
            <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded mb-3 w-fit">
              {isZh ? '精选' : 'Featured'}
            </span>
          )}
          
          {/* 标题 */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
          
          {/* 描述 */}
          <p className="text-gray-600 text-sm mb-4 flex-1">
            {post.description}
          </p>
          
          {/* 元信息 */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>{post.author}</span>
          </div>
          
          {/* 标签列表 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.slice(0, 3).map((tag: string) => (
                <span 
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
