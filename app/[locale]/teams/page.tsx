import Link from 'next/link';
import type { Metadata } from 'next';

interface TeamsPageProps {
  params: {
    locale: string;
  };
}

export function generateMetadata({ params }: TeamsPageProps): Metadata {
  const locale = params.locale;
  const isZh = locale === 'zh';
  
  return {
    title: isZh ? '球队 - FIFA世界杯2026' : 'Teams - FIFA World Cup 2026',
    description: isZh
      ? '2026年FIFA世界杯48支参赛球队信息'
      : 'Information about all 48 qualified teams for FIFA World Cup 2026',
  };
}

export default function TeamsPage({ params }: TeamsPageProps) {
  const locale = params.locale;
  const isZh = locale === 'zh';
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">
          {isZh ? '参赛球队' : 'Qualified Teams'}
        </h1>
        <p className="text-gray-600 mb-8">
          {isZh 
            ? '48支参赛球队信息即将更新...'
            : 'Information about all 48 qualified teams coming soon...'
          }
        </p>
        <Link
          href={`/${locale}/blog`}
          className="text-blue-600 hover:text-blue-700"
        >
          ← {isZh ? '返回博客' : 'Back to Blog'}
        </Link>
      </div>
    </div>
  );
}
