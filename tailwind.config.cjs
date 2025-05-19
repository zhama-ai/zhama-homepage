/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
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
          100: '#FFFFFF', // 白色背景
          200: '#F8F9FA', // 略深的白色
          300: '#F1F3F5', // 更深的白色
          400: '#E9ECEF', // 浅灰色
          500: '#DEE2E6', // 深灰色
        },
        accent: {
          500: '#3D9BFF', // 主要蓝色
          400: '#4EAAFF', // 浅蓝色
          600: '#2987E1', // 深蓝色
          700: '#1675D1', // 更深蓝色
        },
        neon: {
          cyan: '#00FFFF',
          blue: '#1E90FF',
          purple: '#9D4EDD',
          pink: '#FF10F0',
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm1 1h1v1H1V1zM0 1h1v1H0V1z' fill='%232987E1' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        'light-grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm1 1h1v1H1V1zM0 1h1v1H0V1z' fill='%232987E1' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        'dark-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} 