import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出
  output: 'export',
  
  // 启用MDX
  pageExtensions: ["tsx", "ts", "jsx", "js", "md", "mdx"],
  
  // 图片优化（静态导出需要）
  images: {
    unoptimized: true, // 静态导出必须禁用图片优化
  },
  
  // 实验性功能
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  // 添加MDX插件
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
