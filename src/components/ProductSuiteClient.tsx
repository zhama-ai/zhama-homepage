'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { 
  Monitor, 
  Globe, 
  FileSpreadsheet,
  Palette,
  Puzzle,
  ArrowRight,
  Download,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

interface ProductData {
  title: string;
  subtitle: string;
  desktop: {
    title: string;
    description: string;
    features: string[];
    cta: string;
  };
  web: {
    title: string;
    description: string;
    features: string[];
    cta: string;
  };
  office: {
    title: string;
    description: string;
    features: string[];
    cta: string;
  };
  capabilities: {
    title: string;
    subtitle: string;
    a2ui: {
      title: string;
      description: string;
      tags: string[];
    };
    skills: {
      title: string;
      description: string;
      tags: string[];
    };
  };
  footer: {
    text: string;
    link: string;
  };
}

interface ProductSuiteClientProps {
  data: ProductData;
  locale: string;
}

const products = [
  {
    key: 'desktop',
    icon: Monitor,
    color: 'primary',
    bgColor: 'bg-primary-600',
    lightBg: 'bg-primary-50 dark:bg-primary-900/20',
    textColor: 'text-primary-600 dark:text-primary-400',
    borderColor: 'border-primary-200 dark:border-primary-800',
    link: '#download',
    isDownload: true,
    image: '/images/features/home-01.png',
  },
  {
    key: 'web',
    icon: Globe,
    color: 'teal',
    bgColor: 'bg-teal-500',
    lightBg: 'bg-teal-50 dark:bg-teal-900/20',
    textColor: 'text-teal-600 dark:text-teal-400',
    borderColor: 'border-teal-200 dark:border-teal-800',
    link: 'https://tego.zhama.com.cn',
    external: true,
    image: '/images/features/home-02.png',
  },
  {
    key: 'office',
    icon: FileSpreadsheet,
    color: 'emerald',
    bgColor: 'bg-emerald-500',
    lightBg: 'bg-emerald-50 dark:bg-emerald-900/20',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    link: 'https://wps.zhama.com.cn/publish.html',
    external: true,
    image: '/images/features/professional-scenarios.jpg',
  },
];

const capabilities = [
  {
    key: 'a2ui',
    icon: Palette,
    bgColor: 'bg-amber-500',
    lightBg: 'bg-amber-50 dark:bg-amber-900/20',
    textColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    key: 'skills',
    icon: Puzzle,
    bgColor: 'bg-rose-500',
    lightBg: 'bg-rose-50 dark:bg-rose-900/20',
    textColor: 'text-rose-600 dark:text-rose-400',
  },
];

export default function ProductSuiteClient({ data, locale }: ProductSuiteClientProps) {
  const [activeProduct, setActiveProduct] = useState(0);

  const currentProduct = products[activeProduct];
  const productData = data[currentProduct.key as 'desktop' | 'web' | 'office'];
  const IconComponent = currentProduct.icon;

  const renderCTA = () => {
    const ctaContent = (
      <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white ${currentProduct.bgColor} hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl`}>
        {currentProduct.isDownload && <Download className="w-5 h-5" />}
        {productData.cta}
        {currentProduct.external ? (
          <ExternalLink className="w-5 h-5" />
        ) : (
          <ArrowRight className="w-5 h-5" />
        )}
      </span>
    );

    if (currentProduct.external) {
      return (
        <a href={currentProduct.link} target="_blank" rel="noopener noreferrer">
          {ctaContent}
        </a>
      );
    }

    if (currentProduct.link.startsWith('#')) {
      return <a href={currentProduct.link}>{ctaContent}</a>;
    }

    return <Link href={`/${locale}${currentProduct.link}`}>{ctaContent}</Link>;
  };

  return (
    <section id="products" className="section relative overflow-hidden bg-white dark:bg-zinc-900">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="font-bold text-zinc-900 dark:text-zinc-50 animate-fade-in">
            {data.title}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 animate-fade-in animate-delay-100">
            {data.subtitle}
          </p>
        </div>

        {/* 主要产品展示区域 */}
        <div className="card p-8 lg:p-12 mb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* 左侧内容 */}
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${currentProduct.bgColor} text-white shadow-lg`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  {productData.title}
                </h3>
              </div>
              
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {productData.description}
              </p>
              
              {/* 特性列表 */}
              <div className="grid grid-cols-2 gap-3">
                {productData.features.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className={`w-5 h-5 ${currentProduct.textColor} flex-shrink-0`} />
                    <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA 按钮 */}
              <div className="pt-4">
                {renderCTA()}
              </div>
            </div>

            {/* 右侧产品预览 */}
            <div className={`relative rounded-2xl overflow-hidden border ${currentProduct.borderColor} min-h-[350px]`}>
              {/* 背景图 */}
              <Image
                src={currentProduct.image}
                alt={productData.title}
                fill
                className="object-cover"
              />
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              {/* 内容 */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl ${currentProduct.bgColor} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    {productData.title}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {productData.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-full text-sm bg-white/20 text-white backdrop-blur-sm border border-white/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tab 切换按钮 */}
          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              {products.map((product, index) => {
                const TabIcon = product.icon;
                return (
                  <button
                    key={product.key}
                    onClick={() => setActiveProduct(index)}
                    className={cn(
                      'flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300',
                      activeProduct === index
                        ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-md'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                    )}
                  >
                    <TabIcon className="w-5 h-5" />
                    {data[product.key as 'desktop' | 'web' | 'office'].title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 核心能力 */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              {data.capabilities.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              {data.capabilities.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {capabilities.map((capability) => {
              const CapIcon = capability.icon;
              const capData = data.capabilities[capability.key as 'a2ui' | 'skills'];
              return (
                <div
                  key={capability.key}
                  className="group card-hover p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl ${capability.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <CapIcon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                        {capData.title}
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                        {capData.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {capData.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className={`text-xs px-3 py-1 rounded-full ${capability.lightBg} ${capability.textColor}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-12">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            {data.footer.text}
            <Link 
              href={`/${locale}/contact`}
              className="text-primary-600 dark:text-primary-400 hover:underline ml-1"
            >
              {data.footer.link}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
