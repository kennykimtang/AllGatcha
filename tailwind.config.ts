import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Pretendard", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        keep: "rgb(var(--color-keep) / <alpha-value>)",
        link: "rgb(var(--color-link) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;
