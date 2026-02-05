import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // From video theme
        'dark-bg': '#1a1a1a',
        'dark-card': '#2a2a2a',
        'dark-input': '#1f1f1f',
        'purple-start': '#7c3aed',
        'purple-end': '#9333ea',
        'blue-start': '#3b82f6',
        'blue-end': '#2563eb',
        'indigo-start': '#6366f1',
        'indigo-end': '#8b5cf6',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
        'gradient-blue': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        'gradient-indigo': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-sidebar': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      },
      // Add custom input styles
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}
export default config