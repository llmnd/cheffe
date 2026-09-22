import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        smoke: '#f5efe8',
        clay: '#8a5e3b',
        sand: '#d5c1a3',
        olive: '#6a7a55',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 24px 90px rgba(17, 17, 17, 0.12)',
      },
      backgroundImage: {
        grain: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};

export default config;
