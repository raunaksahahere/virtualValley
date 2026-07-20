import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '460.8px',
      md: '552.96px',
      lg: '737.28px',
      xl: '921.6px',
      '2xl': '1105.92px',
    },
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-secondary": "rgb(var(--surface-secondary) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        heading: "rgb(var(--heading) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: {
          cyan: "rgb(var(--accent-cyan) / <alpha-value>)",
          green: "rgb(var(--accent-green) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
      },
      fontFamily: {
        body: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      boxShadow: {
        "premium-card": "0 16px 40px rgb(8 31 92 / 0.1)",
        "premium-card-hover": "0 20px 48px rgb(8 31 92 / 0.12), 0 0 0 3px rgb(51 78 172 / 0.1)",
        "premium-float": "0 24px 56px rgb(8 31 92 / 0.12)",
        "glow-cyan": "0 0 24px rgb(51 78 172 / 0.2)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-vertical": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        shimmer: {
          "0%": { opacity: "0.45" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.45" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        marquee: "marquee 24s linear infinite",
        "marquee-vertical": "marquee-vertical 24s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
      },
      animationDelay: {
        1000: "1000ms",
      },
    },
  },
  plugins: [],
};

export default config;
