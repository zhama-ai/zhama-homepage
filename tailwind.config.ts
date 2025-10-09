/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 中性基色：zinc
        // 使用 Tailwind 默认的 zinc 色板，不需要自定义
        
        // 主强调色：blue（使用 Tailwind 默认，但添加别名）
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      // 统一的字体大小系统（4-5种）
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px - 说明文字
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px - 次要文字
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px - 正文
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px - 副标题
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px - 小标题
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px - 标题
        '3xl': ['2rem', { lineHeight: '2.5rem' }],      // 32px - 大标题
        '4xl': ['2.5rem', { lineHeight: '3rem' }],      // 40px - 主标题
        '5xl': ['3rem', { lineHeight: '3.5rem' }],      // 48px - 英雄标题
      },
      // 统一的间距系统（4的倍数）
      spacing: {
        '0': '0',
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
      },
      // 简化的阴影系统
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'none': 'none',
      },
      // 简化的背景图案
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, rgb(0 0 0 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.05) 1px, transparent 1px)',
        'grid-pattern-dark': 'linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '24px 24px',
      },
      // 统一的动画时长
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      // 统一的圆角
      borderRadius: {
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px
        '2xl': '1.5rem',   // 24px
        '3xl': '2rem',     // 32px
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
