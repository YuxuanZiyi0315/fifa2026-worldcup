import Link from 'next/link';
import type { Metadata } from 'next';

interface GroupsPageProps {
  params: {
    locale: string;
  };
}

export function generateMetadata({ params }: GroupsPageProps): Metadata {
  const locale = params.locale;
  const isZh = locale === 'zh';
  
  return {
    title: isZh ? '分组 - FIFA世界杯2026' : 'Groups - FIFA World Cup 2026',
    description: isZh
      ? '2026年FIFA世界杯12个小组的分组情况'
      : 'Group standings for all 12 groups of FIFA World Cup 2026',
  };
}

// 为静态导出生成所有语言版本
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default function GroupsPage({ params }: GroupsPageProps) {
  const locale = params.locale;
  const isZh = locale === 'zh';
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">
          {isZh ? '小组积分榜' : 'Group Standings'}
        </h1>
        <p className="text-gray-600 mb-8">
          {isZh 
            ? '12个小组的实时积分榜即将更新...'
            : 'Real-time standings for all 12 groups coming soon...'
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
