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
        syne: ["var(--font-syne)"],
        dm: ["var(--font-dm)"],
      },
      colors: {
        bg: "#080808",
        bg2: "#0f0f0f",
        bg3: "#161616",
        border: "#222222",
        muted: "#444444",
        text: "#e8e8e8",
        text2: "#888888",
        accent: "#d4d4d4",
        white: "#ffffff",
        "accent-blue": "#3b82f6",
        "accent-purple": "#8b5cf6",
        "accent-cyan": "#06b6d4",
        "accent-green": "#10b981",
        "accent-orange": "#f97316",
        "accent-pink": "#ec4899",
      },
      animation: {
        "spin-slow": "spin-slow 8s linear infinite",
        "spin-reverse": "spin-reverse 12s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "scan-line": "scan-line 8s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        ripple: "ripple 1s ease-out forwards",
        typing: "typing 2s steps(20) forwards",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "scan-line": {
          "0%": { top: "-1px" },
          "100%": { top: "100vh" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        ripple: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(3)", opacity: "0" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
