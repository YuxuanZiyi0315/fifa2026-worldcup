import Link from 'next/link';
import type { Metadata } from 'next';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export function generateMetadata({ params }: HomePageProps): Metadata {
  const locale = params.locale;
  const isZh = locale === 'zh';
  
  return {
    title: isZh ? '首页 - FIFA世界杯2026' : 'Home - FIFA World Cup 2026',
    description: isZh
      ? '2026年FIFA世界杯官方信息平台 - 美国、加拿大、墨西哥联合举办'
      : 'Official information platform for FIFA World Cup 2026 in USA, Canada, and Mexico',
  };
}

export default function HomePage({ params }: HomePageProps) {
  const locale = params.locale;
  const isZh = locale === 'zh';
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            FIFA World Cup 2026
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {isZh 
              ? '美国、加拿大、墨西哥联合举办'
              : 'United States, Canada, and Mexico'
            }
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/schedule`}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {isZh ? '查看赛程' : 'View Schedule'}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
            >
              {isZh ? '阅读博客' : 'Read Blog'}
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isZh ? '快速访问' : 'Quick Access'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href={`/${locale}/schedule`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3">
                {isZh ? '赛程安排' : 'Match Schedule'}
              </h3>
              <p className="text-gray-600">
                {isZh ? '查看所有104场比赛的完整赛程' : 'View complete schedule of all 104 matches'}
              </p>
            </Link>
            
            <Link href={`/${locale}/groups`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3">
                {isZh ? '分组情况' : 'Group Standings'}
              </h3>
              <p className="text-gray-600">
                {isZh ? '查看12个小组的实时积分榜' : 'View real-time standings for all 12 groups'}
              </p>
            </Link>
            
            <Link href={`/${locale}/teams`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-3">
                {isZh ? '参赛球队' : 'Qualified Teams'}
              </h3>
              <p className="text-gray-600">
                {isZh ? '了解所有48支参赛球队信息' : 'Learn about all 48 qualified teams'}
              </p>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Latest Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isZh ? '最新博客文章' : 'Latest Blog Posts'}
          </h2>
          <div className="text-center">
            <Link
              href={`/${locale}/blog`}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {isZh ? '查看所有文章' : 'View All Posts'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
