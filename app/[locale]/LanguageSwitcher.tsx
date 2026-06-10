'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  
  // 构造新的本地化路径
  const getLocalizedHref = (newLocale: string) => {
    const segments = pathname.split('/');
    if (segments.length >= 2 && ['en', 'zh'].includes(segments[1])) {
      segments[1] = newLocale; // 替换语言段
    } else {
      // 如果没有语言前缀，添加它
      segments.splice(1, 0, newLocale);
    }
    return segments.join('/');
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Link
        href={getLocalizedHref('en')}
        className={`px-3 py-1 rounded transition-colors ${
          currentLocale === 'en' 
            ? 'bg-blue-600 text-white' 
            : 'bg-blue-800 text-white hover:bg-blue-700'
        }`}
      >
        EN
      </Link>
      <Link
        href={getLocalizedHref('zh')}
        className={`px-3 py-1 rounded transition-colors ${
          currentLocale === 'zh' 
            ? 'bg-blue-600 text-white' 
            : 'bg-blue-800 text-white hover:bg-blue-700'
        }`}
      >
        中文
      </Link>
    </div>
  );
}
