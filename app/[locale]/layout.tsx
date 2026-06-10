import type { Metadata } from 'next';
import Link from 'next/link';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export function generateMetadata({ params }: LocaleLayoutProps): Metadata {
  const locale = params.locale;
  const isZh = locale === 'zh';
  
  return {
    title: {
      default: isZh ? 'FIFA世界杯2026' : 'FIFA World Cup 2026',
      template: `%s | ${isZh ? 'FIFA世界杯2026' : 'FIFA World Cup 2026'}`,
    },
    description: isZh
      ? '2026年FIFA世界杯官方信息平台 - 赛程、分组、球队和最新新闻'
      : 'Official information platform for FIFA World Cup 2026 - Schedule, Groups, Teams, and Latest News',
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = params.locale;
  const isZh = locale === 'zh';
  
  const navigation = [
    { name: isZh ? '首页' : 'Home', href: `/${locale}` },
    { name: isZh ? '赛程' : 'Schedule', href: `/${locale}/schedule` },
    { name: isZh ? '分组' : 'Groups', href: `/${locale}/groups` },
    { name: isZh ? '球队' : 'Teams', href: `/${locale}/teams` },
    { name: isZh ? '博客' : 'Blog', href: `/${locale}/blog` },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={`/${locale}`} className="text-xl font-bold">
              FIFA 2026
            </Link>
            
            {/* 导航链接 */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-blue-200 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* 语言切换 */}
            <div className="flex items-center space-x-2">
              <Link
                href={`/en${window?.location?.pathname?.replace(/^\/[^\/]+/, '') || '/'}`}
                className={`px-3 py-1 rounded ${locale === 'en' ? 'bg-blue-600' : 'bg-blue-800'}`}
              >
                EN
              </Link>
              <Link
                href={`/zh${window?.location?.pathname?.replace(/^\/[^\/]+/, '') || '/'}`}
                className={`px-3 py-1 rounded ${locale === 'zh' ? 'bg-blue-600' : 'bg-blue-800'}`}
              >
                中文
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 主要内容 */}
      <main>
        {children}
      </main>
      
      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2026 FIFA World Cup 2026. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link href={`/${locale}/about`} className="hover:text-blue-400">
                {isZh ? '关于' : 'About'}
              </Link>
              <Link href={`/${locale}/privacy`} className="hover:text-blue-400">
                {isZh ? '隐私' : 'Privacy'}
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-blue-400">
                {isZh ? '条款' : 'Terms'}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
