import Link from 'next/link';
import type { Metadata } from 'next';

interface SchedulePageProps {
  params: {
    locale: string;
  };
}

export function generateMetadata({ params }: SchedulePageProps): Metadata {
  const locale = params.locale;
  const isZh = locale === 'zh';
  
  return {
    title: isZh ? '赛程 - FIFA世界杯2026' : 'Schedule - FIFA World Cup 2026',
    description: isZh
      ? '2026年FIFA世界杯完整赛程安排'
      : 'Complete match schedule for FIFA World Cup 2026',
  };
}

// 为静态导出生成所有语言版本
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default function SchedulePage({ params }: SchedulePageProps) {
  const locale = params.locale;
  const isZh = locale === 'zh';
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">
          {isZh ? '赛程安排' : 'Match Schedule'}
        </h1>
        <p className="text-gray-600 mb-8">
          {isZh 
            ? '104场比赛的完整赛程即将更新...'
            : 'Complete schedule of 104 matches coming soon...'
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
