'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import 'highlight.js/styles/github-dark.css';

interface BlogContentProps {
  htmlContent: string;
}

// 初始化 mermaid 配置
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'system-ui, -apple-system, sans-serif',
});

export default function BlogContent({ htmlContent }: BlogContentProps) {
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Add target="_blank" to external links
    const links = document.querySelectorAll('.blog-content a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });

    // 渲染 Mermaid 图表
    const renderMermaid = async () => {
      if (!contentRef.current) return;

      // 查找所有 mermaid 代码块
      const mermaidBlocks = contentRef.current.querySelectorAll('pre code.language-mermaid');
      
      for (let i = 0; i < mermaidBlocks.length; i++) {
        const block = mermaidBlocks[i];
        const pre = block.parentElement;
        if (!pre) continue;

        const code = block.textContent || '';
        const id = `mermaid-${i}-${Date.now()}`;

        try {
          const { svg } = await mermaid.render(id, code);
          
          // 创建容器替换 pre 元素
          const container = document.createElement('div');
          container.className = 'mermaid-diagram my-6 flex justify-center overflow-x-auto';
          container.innerHTML = svg;
          
          pre.replaceWith(container);
        } catch (error) {
          console.error('Mermaid rendering error:', error);
        }
      }
    };

    renderMermaid();
  }, [htmlContent]);

  return (
    <article
      ref={contentRef}
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

