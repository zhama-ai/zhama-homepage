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
        dark: {
          900: '#0B0B0F', // 最深的黑色背景
          800: '#111119', // 略深的黑色
          700: '#16161F', // 略浅的黑色
          600: '#1C1C28', // 更浅的黑色
          500: '#24243C', // 深藏蓝色
        },
        light: {
          50: '#FAFAFA',   // 极浅灰（新增）
          100: '#FFFFFF',  // 纯白色背景
          200: '#F8FAFC',  // 微蓝白色（新增）
          300: '#F1F5F9',  // 浅蓝灰色（新增）
          400: '#E2E8F0',  // 中性灰色
          500: '#CBD5E1',  // 深灰色
          600: '#94A3B8',  // 更深灰色（新增）
          700: '#64748B',  // 深蓝灰色（新增）
        },
        accent: {
          50: '#F0F9FF',   // 极浅蓝色（新增）
          100: '#E0F2FE',  // 很浅蓝色（新增）
          200: '#BAE6FD',  // 浅蓝色（新增）
          300: '#7DD3FC',  // 中浅蓝色（新增）
          400: '#4EAAFF',  // 原有浅蓝色
          500: '#3D9BFF',  // 主要蓝色
          600: '#2987E1',  // 深蓝色
          700: '#1675D1',  // 更深蓝色
          800: '#1E40AF',  // 很深蓝色（新增）
          900: '#1E3A8A',  // 极深蓝色（新增）
        },
        neon: {
          cyan: '#00FFFF',
          blue: '#1E90FF',
          purple: '#9D4EDD',
          pink: '#FF10F0',
        },
        // 新增渐变色彩
        gradient: {
          primary: {
            from: '#3D9BFF',
            to: '#1675D1',
          },
          light: {
            from: '#F8FAFC',
            to: '#E2E8F0',
          },
          surface: {
            from: '#FFFFFF',
            to: '#F1F5F9',
          }
        }
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm1 1h1v1H1V1zM0 1h1v1H0V1z' fill='%232987E1' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        'light-grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233D9BFF' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'light-gradient': 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
        'surface-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)',
        'accent-gradient': 'linear-gradient(135deg, #3D9BFF 0%, #1675D1 100%)',
        'dark-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'light-soft': '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'light-medium': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'light-large': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'light-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'accent-glow': '0 0 20px rgba(61, 155, 255, 0.3)',
        'accent-glow-hover': '0 0 30px rgba(61, 155, 255, 0.4)',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}; 