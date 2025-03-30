import type { Config } from "tailwindcss";
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        typewriter: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        blinkingCursor: {
          "0%": { borderColor: "rgba(255,255,255,.75)" },
          "100%": { borderColor: "transparent" },
        },
      },
      animation: {
        typewriter: "typewriter 5s steps(50) 1s 1 normal both",
        blinkingCursor: "blinkingCursor 500ms steps(50) infinite normal",
      },
      fontFamily: {
        mono: ["'Anonymous Pro'", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
