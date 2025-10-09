'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { 
  Server, 
  Wrench, 
  GitBranch, 
  Activity, 
  RefreshCw, 
  Code, 
  Zap, 
  Sparkles,
  Star,
  Layers
} from 'lucide-react';
import { Card, CardContent } from './ui/Card';

export default function MCPPlatformSection() {
  const t = useTranslations('mcpPlatform');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* 核心特性 */}
        <Card>
          <CardContent>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow">
                <Star className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {t('coreFeatures.title')}
              </h2>
            </div>

            <ul className="space-y-4">
              {[
                { icon: Server, key: 'dynamicServer' },
                { icon: Wrench, key: 'dynamicTool' },
                { icon: GitBranch, key: 'dynamicRoute' },
                { icon: Activity, key: 'monitoring' },
                { icon: RefreshCw, key: 'hotReload' },
                { icon: Code, key: 'customImpl' },
                { icon: Sparkles, key: 'noCode' },
              ].map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <li
                    key={feature.key}
                    className="group flex items-start gap-4 rounded-lg p-3 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-primary-600 transition-all group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-indigo-600 group-hover:text-white dark:bg-zinc-800">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                        {t(`coreFeatures.${feature.key}.title`)}
                      </div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t(`coreFeatures.${feature.key}.description`)}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        {/* 系统架构 */}
        <Card className="flex flex-col">
          <CardContent>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow">
                <Layers className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {t('architecture.title')}
              </h2>
            </div>

            {/* SVG 架构图 */}
            <div className="flex-1">
              <svg
                className="w-full h-auto"
                viewBox="0 0 800 700"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.12" />
                  </filter>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#7b7fc6'}} />
                    <stop offset="100%" style={{stopColor: '#5a5ea8'}} />
                  </linearGradient>
                  <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#fbbfd4', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#fbbfd4', stopOpacity: 0.9}} />
                  </linearGradient>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#b3d9f2', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#b3d9f2', stopOpacity: 0.9}} />
                  </linearGradient>
                  <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#ffd699', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#ffd699', stopOpacity: 0.9}} />
                  </linearGradient>
                  <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#c8e6c9', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#c8e6c9', stopOpacity: 0.9}} />
                  </linearGradient>
                  <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#fff9c4', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#fff9c4', stopOpacity: 0.9}} />
                  </linearGradient>
                </defs>

                {/* Connection Lines */}
                <g className="connections" stroke="#94a3b8" strokeWidth="2.5" fill="none" opacity="0.5">
                  <path d="M 400 120 L 400 130 L 120 130 L 120 140" />
                  <line x1="400" y1="120" x2="400" y2="140" />
                  <path d="M 400 120 L 400 130 L 680 130 L 680 140" />
                  <line x1="120" y1="190" x2="120" y2="220" />
                  <path d="M 680 190 L 680 205 L 640 205 L 640 220" />
                  <line x1="680" y1="190" x2="680" y2="220" />
                  <line x1="400" y1="420" x2="400" y2="430" />
                  <path d="M 350 540 L 340 555 L 250 555 L 250 580" />
                  <path d="M 450 540 L 460 555 L 550 555 L 550 580" />
                </g>

                {/* 架构图的各个组件保持原样 */}
                {/* Management Page */}
                <g filter="url(#shadow)">
                  <rect x="660" y="20" width="120" height="40" rx="10" fill="url(#pinkGradient)" stroke="#f09cb5" strokeWidth="2.5" />
                  <text x="720" y="44" textAnchor="middle" className="text-xs font-semibold fill-gray-800">管理页</text>
                </g>

                {/* Platform Manager */}
                <g filter="url(#shadow)">
                  <rect x="270" y="70" width="260" height="50" rx="10" fill="url(#blueGradient)" stroke="#7eb8db" strokeWidth="2.5" />
                  <text x="400" y="92" textAnchor="middle" className="text-xs font-semibold fill-gray-800">统一管理平台</text>
                  <text x="400" y="107" textAnchor="middle" className="text-[9.5px] font-medium fill-gray-600">MCPPlatformManager</text>
                </g>

                {/* Transport Manager */}
                <g filter="url(#shadow)">
                  <rect x="20" y="140" width="200" height="50" rx="10" fill="url(#pinkGradient)" stroke="#f09cb5" strokeWidth="2.5" />
                  <text x="120" y="162" textAnchor="middle" className="text-xs font-semibold fill-gray-800">传输层管理</text>
                  <text x="120" y="177" textAnchor="middle" className="text-[9.5px] font-medium fill-gray-600">TransportManager</text>
                </g>

                {/* Server Instance Manager */}
                <g filter="url(#shadow)">
                  <rect x="270" y="140" width="260" height="50" rx="10" fill="url(#blueGradient)" stroke="#7eb8db" strokeWidth="2.5" />
                  <text x="400" y="162" textAnchor="middle" className="text-xs font-semibold fill-gray-800">服务器实例管理器</text>
                  <text x="400" y="177" textAnchor="middle" className="text-[9.5px] font-medium fill-gray-600">ServerInstanceManager</text>
                </g>

                {/* Runtime Code Generator */}
                <g filter="url(#shadow)">
                  <rect x="580" y="140" width="200" height="50" rx="10" fill="url(#blueGradient)" stroke="#7eb8db" strokeWidth="2.5" />
                  <text x="680" y="162" textAnchor="middle" className="text-xs font-semibold fill-gray-800">运行时代码生成</text>
                  <text x="680" y="177" textAnchor="middle" className="text-[9.5px] font-medium fill-gray-600">RuntimeCodeGenerator</text>
                </g>

                {/* Protocol Support */}
                <g filter="url(#shadow)">
                  <rect x="20" y="220" width="200" height="50" rx="10" fill="url(#pinkGradient)" stroke="#f09cb5" strokeWidth="2.5" />
                  <text x="120" y="242" textAnchor="middle" className="text-xs font-semibold fill-gray-800">多传输协议</text>
                  <text x="120" y="257" textAnchor="middle" className="text-[9.5px] font-medium fill-gray-600">HTTP/SSE/WebSocket</text>
                </g>

                {/* API Router */}
                <g filter="url(#shadow)">
                  <rect x="240" y="220" width="160" height="50" rx="10" fill="url(#pinkGradient)" stroke="#f09cb5" strokeWidth="2.5" />
                  <text x="320" y="242" textAnchor="middle" className="text-xs font-semibold fill-gray-800">动态API路由</text>
                  <text x="320" y="257" textAnchor="middle" className="text-[9.5px] font-medium fill-gray-600">APIRouter</text>
                </g>

                {/* Security Code Executor */}
                <g filter="url(#shadow)">
                  <rect x="440" y="220" width="200" height="50" rx="10" fill="url(#orangeGradient)" stroke="#ffb84d" strokeWidth="2.5" />
                  <text x="540" y="242" textAnchor="middle" className="text-xs font-semibold fill-gray-800">安全代码执行</text>
                  <text x="540" y="257" textAnchor="middle" className="text-[9.5px] font-medium fill-gray-600">SecureCodeExecutor</text>
                </g>

                {/* Database Manager */}
                <g filter="url(#shadow)">
                  <rect x="660" y="220" width="120" height="50" rx="10" fill="url(#greenGradient)" stroke="#81c784" strokeWidth="2.5" />
                  <text x="720" y="238" textAnchor="middle" className="text-xs font-semibold fill-gray-800">数据库配置</text>
                  <text x="720" y="253" textAnchor="middle" className="text-[9.5px] font-medium fill-gray-600">管理</text>
                </g>

                {/* MCP Client */}
                <g filter="url(#shadow)">
                  <rect x="20" y="300" width="120" height="40" rx="10" fill="url(#pinkGradient)" stroke="#f09cb5" strokeWidth="2.5" />
                  <text x="80" y="324" textAnchor="middle" className="text-xs font-semibold fill-gray-800">MCP客户端</text>
                </g>

                {/* Database Storage */}
                <g filter="url(#shadow)">
                  <rect x="640" y="300" width="120" height="40" rx="10" fill="url(#greenGradient)" stroke="#81c784" strokeWidth="2.5" />
                  <text x="700" y="324" textAnchor="middle" className="text-xs font-semibold fill-gray-800">数据库配置存储</text>
                </g>

                {/* Worker Process */}
                <g filter="url(#shadow)">
                  <rect x="440" y="300" width="180" height="50" rx="10" fill="url(#yellowGradient)" stroke="#fff176" strokeWidth="2.5" />
                  <text x="530" y="322" textAnchor="middle" className="text-xs font-semibold fill-gray-800">Worker线程</text>
                  <text x="530" y="337" textAnchor="middle" className="text-[9.5px] font-medium fill-gray-600">安全隔离环境</text>
                </g>

                {/* Service A */}
                <g filter="url(#shadow)">
                  <rect x="330" y="380" width="140" height="40" rx="10" fill="url(#blueGradient)" stroke="#7eb8db" strokeWidth="2.5" />
                  <text x="400" y="404" textAnchor="middle" className="text-xs font-semibold fill-gray-800">服务A</text>
                </g>

                {/* MCP Market Circle */}
                <g filter="url(#shadow)">
                  <circle cx="400" cy="500" r="70" fill="url(#purpleGradient)" />
                  <text x="400" y="495" textAnchor="middle" className="text-xl font-bold fill-white">MCP</text>
                  <text x="400" y="515" textAnchor="middle" className="text-xl font-bold fill-white">市场</text>
                </g>

                {/* Service C */}
                <g filter="url(#shadow)">
                  <rect x="180" y="580" width="140" height="40" rx="8" fill="#b3d9f2" stroke="#7eb8db" strokeWidth="2" />
                  <text x="250" y="604" textAnchor="middle" className="text-xs font-semibold fill-gray-800">服务C</text>
                </g>

                {/* Service B */}
                <g filter="url(#shadow)">
                  <rect x="480" y="580" width="140" height="40" rx="8" fill="#b3d9f2" stroke="#7eb8db" strokeWidth="2" />
                  <text x="550" y="604" textAnchor="middle" className="text-xs font-semibold fill-gray-800">服务B</text>
                </g>
              </svg>

              {/* Bottom Services */}
              <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-center gap-12">
                {[
                  { icon: Sparkles, label: t('architecture.services.llm') },
                  { icon: Layers, label: t('architecture.services.vector') },
                  { icon: Activity, label: t('architecture.services.retrieval') },
                ].map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <div key={index} className="flex flex-col items-center gap-3 group cursor-pointer transition-transform hover:-translate-y-1">
                      <div className="w-20 h-20 rounded-lg border-2 border-zinc-200 bg-white flex items-center justify-center text-primary-600 shadow-sm transition-all group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-purple-600 group-hover:text-white group-hover:border-primary-600 group-hover:shadow-md group-hover:scale-110 dark:border-zinc-700 dark:bg-zinc-800">
                        <ServiceIcon className="h-8 w-8" />
                      </div>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{service.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
