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
        // 现代深色调色板
        dark: {
          950: '#0A0A0B',  // 极深背景
          900: '#0F0F10',  // 主背景
          800: '#18181B',  // 卡片背景
          700: '#27272A',  // 边框
          600: '#3F3F46',  // 分隔线
          500: '#52525B',  // 文本辅助
          400: '#71717A',  // 占位符
        },
        // 现代浅色调色板
        light: {
          50: '#FAFAFA',   // 极浅背景
          100: '#FFFFFF',  // 纯白
          200: '#F4F4F5',  // 浅背景
          300: '#E4E4E7',  // 边框
          400: '#D4D4D8',  // 分隔线
          500: '#A1A1AA',  // 文本辅助
          600: '#71717A',  // 副标题
          700: '#3F3F46',  // 主文本
        },
        // 现代品牌色
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE', 
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // 主色
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        // 辅助色彩（兼容旧代码）
        accent: {
          50: '#EFF6FF',
          100: '#DBEAFE', 
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // 与 primary-500 相同
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // 成功/错误/警告色
        success: {
          50: '#ECFDF5',
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          50: '#FFFBEB',
          500: '#F59E0B', 
          600: '#D97706',
        },
        error: {
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
        },
        // 现代渐变色
        gradient: {
          primary: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
          surface: 'linear-gradient(135deg, #FAFAFA 0%, #F4F4F5 100%)',
          dark: 'linear-gradient(135deg, #0F0F10 0%, #18181B 100%)',
          glow: 'radial-gradient(circle at center, #3B82F640 0%, transparent 70%)',
        }
      },
      backgroundImage: {
        // 现代网格图案
        'grid-subtle': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.03'%3E%3Cpath d='M30 30h30v30H30V30zm-30 0h30v30H0V30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'dots-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233B82F6' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        // 现代渐变
        'primary-gradient': 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
        'surface-gradient': 'linear-gradient(135deg, #FAFAFA 0%, #F4F4F5 100%)', 
        'dark-gradient': 'linear-gradient(135deg, #0F0F10 0%, #18181B 100%)',
        'glow-gradient': 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        // 高级效果
        'mesh-gradient': 'conic-gradient(from 230.29deg at 51.63% 52.16%, #2563EB 0deg, #3B82F6 67.5deg, #1D4ED8 198.75deg, #2563EB 251.25deg, #3B82F6 301.88deg, #1D4ED8 360deg)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        // 现代阴影系统
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
        // 品牌色发光效果
        'primary-glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'primary-glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)',
        // 深色模式阴影
        'dark-soft': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        'dark-medium': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'dark-large': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        // 玻璃拟态阴影
        'glass': '0 8px 32px rgba(0, 0, 0, 0.06)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
        // 兼容旧样式
        'light-soft': '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'light-medium': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'light-large': '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'accent-glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'accent-glow-hover': '0 0 40px rgba(59, 130, 246, 0.2)',
      },
      // 现代动画曲线
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },
      // 现代字体大小
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '4rem' }],
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}; 