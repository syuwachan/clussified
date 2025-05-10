import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/Search.tsx',
    './src/app/signup/page.tsx',
    './src/components/ui/CardDetail.tsx'  // この行を追加
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config