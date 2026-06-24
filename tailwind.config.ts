import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#050505",
          secondary: "#101010",
          card: "#151515",
        },
        white: {
          DEFAULT: "#FFFFFF",
          secondary: "#A1A1AA",
        },
        purple: {
          DEFAULT: "#8B5CF6",
          secondary: "#A855F7",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F5D76E",
        },
      },
      fontFamily: {
        body: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      boxShadow: {
        "glow-white": "0 0 40px rgba(255,255,255,0.12)",
        "glow-gold": "0 0 24px rgba(201,168,76,0.2)",
        "glow-purple": "0 0 24px rgba(139,92,246,0.2)",
      },
      backgroundImage: {
        "purple-gradient": "linear-gradient(135deg, #8B5CF6, #A855F7)",
        "luxury-gradient": "linear-gradient(135deg, #D4AF37, #F5D76E)",
        "premium-blend": "linear-gradient(135deg, #8B5CF6, #A855F7, #D4AF37)",
        "grid-fade":
          "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
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
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
      },
      animationDelay: {
        1000: "1000ms",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
