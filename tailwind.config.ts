import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'white': '#fff',
        'gray-50': '#f9fafb',
        'gray-100': '#f3f4f6',
        'gray-200': '#e5e7eb',
        'gray-300': '#d1d5db',
        'gray-400': '#9ca3af',
        'gray-500': '#6b7280',
        'gray-600': '#4b5563',
        'gray-700': '#374151',
        'gray-800': '#1f2a37',
        'gray-900': '#111928',
        'green-400': '#31C48D',
        'red-100': '#FDE8E8',
        'red-400': '#F98080',
        'red-700': '#C81E1E',
        'black': '#000',
        'primary': '#c4fbff',
        'success': '#31c48d',
        'danger': '#f98080',
        'warning': '#ff8a4c',
        'info': '#76a9fa'
      },
    },
  },
  plugins: [],
}
export default config
