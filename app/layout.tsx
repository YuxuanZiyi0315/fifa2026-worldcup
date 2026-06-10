import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'FIFA World Cup 2026',
    template: '%s | FIFA World Cup 2026',
  },
  description: 'Official information platform for FIFA World Cup 2026 in USA, Canada, and Mexico.',
  keywords: ['FIFA', 'World Cup', '2026', 'soccer', 'football'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
