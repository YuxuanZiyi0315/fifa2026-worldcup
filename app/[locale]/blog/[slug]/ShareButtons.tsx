'use client';

interface ShareButtonsProps {
  title: string;
  url: string;
  isZh: boolean;
}

export default function ShareButtons({ title, url, isZh }: ShareButtonsProps) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };
  
  return (
    <div className="flex space-x-4">
      <button 
        onClick={() => window.open(shareUrls.twitter, '_blank')}
        className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Twitter
      </button>
      <button 
        onClick={() => window.open(shareUrls.facebook, '_blank')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Facebook
      </button>
      <button 
        onClick={() => window.open(shareUrls.linkedin, '_blank')}
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
      >
        LinkedIn
      </button>
    </div>
  );
}
